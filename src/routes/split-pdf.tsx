import { createFileRoute } from "@tanstack/react-router";
import { ScissorsIcon } from "lucide-react";
import { useState } from "react";
import { DropZoneFileInput } from "@/components/DropZoneFileInput";
import { FileItem } from "@/components/FileItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { splitPDF } from "@/lib/pdf";

export const Route = createFileRoute("/split-pdf")({
  component: RouteComponent,
});

function RouteComponent() {
  const [file, setFile] = useState<File | null>(null);
  const [pageRange, setPageRange] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileAdded = (newFiles: File[]) => {
    if (newFiles.length > 0) setFile(newFiles[0]);
  };

  const handleSubmit = async () => {
    if (!file) return;
    setIsLoading(true);
    const rangeStrings = pageRange.split(",").map((r) => r.trim());
    const ranges = rangeStrings.map((r) =>
      r.split("-").map((n) => parseInt(n.trim())),
    );
    const pages = new Set<number>();
    for (const range of ranges) {
      if (range.length === 1) {
        pages.add(range[0] - 1);
      } else if (range.length === 2) {
        for (let i = range[0]; i <= range[1]; i++) {
          pages.add(i - 1);
        }
      } else {
        throw new Error("Invalid range: " + range);
      }
    }
    const pageArray = Array.from(pages).sort((a, b) => a - b);
    const blob = await splitPDF(file, pageArray);
    setIsLoading(false);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "split.pdf";
    a.click();
    URL.revokeObjectURL(url);
    a.remove();
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-violet-500/20 border border-violet-500/30 mb-6">
            <ScissorsIcon className="w-8 h-8 text-violet-400" />
          </div>
          <h1 className="text-4xl font-bold text-violet-400/75 bg-clip-text mb-3">
            Split PDF
          </h1>
          <p className="text-muted-foreground text-lg">
            Extract pages or split a PDF into multiple files.
          </p>
        </div>

        {/* Drop Zone */}
        {!file ? (
          <DropZoneFileInput
            multiple={false}
            onFilesChanged={handleFileAdded}
          />
        ) : (
          <div className="space-y-6">
            {/* Selected File Card */}
            <FileItem file={file} onRemove={() => setFile(null)} />

            {/* Split Options */}
            <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
              <p className="text-sm text-card-foreground font-medium uppercase tracking-wider">
                Split Options
              </p>

              <div className="flex flex-col gap-2">
                <Label>Page range (e.g. 1-3, 5, 7-9)</Label>
                <Input
                  type="text"
                  value={pageRange}
                  onChange={(e) => setPageRange(e.target.value)}
                  placeholder="1-3, 5, 7-9"
                  className="w-full border-border"
                />
              </div>
            </div>

            <Button
              disabled={isLoading}
              onClick={handleSubmit}
              className="w-full bg-violet-600 hover:bg-violet-500 shadow-lg shadow-violet-500/20"
            >
              Split PDF
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
