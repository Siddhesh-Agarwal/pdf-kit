import { createFileRoute } from "@tanstack/react-router";
import { ScissorsIcon } from "lucide-react";
import { useState } from "react";
import { DropZoneFileInput } from "@/components/DropZoneFileInput";
import { FileItem } from "@/components/FileItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/split-pdf")({
  component: RouteComponent,
});

function RouteComponent() {
  const [file, setFile] = useState<File | null>(null);
  const [pageRange, setPageRange] = useState("");

  const handleFileAdded = (newFiles: File[]) => {
    if (newFiles.length > 0) setFile(newFiles[0]);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-violet-500/20 border border-violet-500/30 mb-6">
            <ScissorsIcon className="w-8 h-8 text-violet-400" />
          </div>
          <h1 className="text-4xl font-bold text-violet-400/75 bg-clip-text mb-3">Split PDF</h1>
          <p className="text-muted-foreground text-lg">
            Extract pages or split a PDF into multiple files.
          </p>
        </div>

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

            <Button className="w-full bg-violet-600 hover:bg-violet-500 shadow-lg shadow-violet-500/20">
              Split PDF
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
