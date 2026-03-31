import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { DropZoneFileInput } from "@/components/DropZoneFileInput";
import { FileItem } from "@/components/FileItem";
import { getTool, ToolHeader } from "@/components/tool-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { splitPDF } from "@/lib/pdf";
import { cn, downloadBlob } from "@/lib/utils";

export const Route = createFileRoute("/(tools)/split-pdf")({
  component: RouteComponent,
});

function RouteComponent() {
  const tool = getTool("/split-pdf");
  const [file, setFile] = useState<File | null>(null);
  const [pageRange, setPageRange] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileAdded = (newFiles: File[]) => {
    if (newFiles.length > 0) setFile(newFiles[0]);
  };

  const handleSubmit = async () => {
    if (!file || !pageRange.trim()) return;
    setIsLoading(true);
    try {
      const rangeStrings = pageRange
        .split(",")
        .map((r) => r.trim())
        .filter(Boolean);
      const ranges = rangeStrings.map((r) => r.split("-").map((n) => parseInt(n.trim())));
      const pages = new Set<number>();
      for (const range of ranges) {
        if (range.length === 1 && !Number.isNaN(range[0])) {
          pages.add(range[0] - 1);
        } else if (range.length === 2 && !Number.isNaN(range[0]) && !Number.isNaN(range[1])) {
          for (let i = range[0]; i <= range[1]; i++) {
            pages.add(i - 1);
          }
        }
      }

      if (pages.size === 0) {
        setIsLoading(false);
        return;
      }

      const pageArray = Array.from(pages).sort((a, b) => a - b);
      const blob = await splitPDF(file, pageArray);
      downloadBlob(blob, `split-${file.name}`);
    } catch (error) {
      console.error("Error splitting PDF:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-20">
        {/* Header */}
        <ToolHeader toolName="/split-pdf" />

        {/* Drop Zone */}
        {!file ? (
          <DropZoneFileInput multiple={false} onFilesChanged={handleFileAdded} />
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
              size="lg"
              disabled={isLoading}
              onClick={handleSubmit}
              className={cn("w-full", tool.classes.button)}
            >
              {isLoading ? <Spinner /> : null}
              Split PDF
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
