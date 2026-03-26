import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { DropZoneFileInput } from "@/components/DropZoneFileInput";
import { FileItem } from "@/components/FileItem";
import { Repeat2Icon } from "lucide-react";

export const Route = createFileRoute("/reorganize-pdf")({
  component: RouteComponent,
});

function RouteComponent() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileAdded = (newFiles: File[]) => {
    if (newFiles.length > 0) setFile(newFiles[0]);
  };

  // blue theme
  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-500/20 border border-blue-500/30 mb-6">
            <Repeat2Icon className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold text-blue-400/75 bg-clip-text mb-3">
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
          </div>
        )}
      </div>
    </div>
  );
}
