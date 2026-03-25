import { createFileRoute } from "@tanstack/react-router";
import { CopyIcon, FileTextIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { DropZoneFileInput } from "@/components/DropZoneFileInput";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/merge-pdf")({
  component: RouteComponent,
});

function RouteComponent() {
  const [files, setFiles] = useState<File[]>([]);

  const handleFilesAdded = (newFiles: File[]) => {
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 mb-6">
            <CopyIcon className="w-8 h-8 text-indigo-400" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent mb-3">
            Merge PDF
          </h1>
          <p className="text-slate-400 text-lg">Combine multiple PDF files into one document.</p>
        </div>

        {/* Drop Zone */}
        <DropZoneFileInput multiple onFilesChanged={handleFilesAdded} />

        {/* File List */}
        {files.length > 0 && (
          <div className="mt-6 space-y-3">
            {files.map((file, i) => (
              <div
                key={file.name}
                className="flex items-center gap-3 bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3"
              >
                <FileTextIcon className="w-5 h-5 text-indigo-400 shrink-0" />
                <span className="flex-1 text-sm text-slate-300 truncate">{file.name}</span>
                <span className="text-xs text-slate-500">{(file.size / 1024).toFixed(0)} KB</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFile(i)}
                  className="w-6 h-6 text-slate-600 hover:text-red-400 hover:bg-transparent"
                >
                  <XIcon className="w-4 h-4" />
                </Button>
              </div>
            ))}

            <Button
              disabled={files.length < 2}
              className="w-full mt-4 bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-500/20"
            >
              Merge {files.length} Files
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
