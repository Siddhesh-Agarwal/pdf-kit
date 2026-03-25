import { createFileRoute } from "@tanstack/react-router";
import { CircleIcon, PackageOpenIcon } from "lucide-react";
import { useState } from "react";
import { DropZoneFileInput } from "@/components/DropZoneFileInput";
import { FileItem } from "@/components/FileItem";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/compress-pdf")({
  component: RouteComponent,
});

type Quality = "high" | "medium" | "low";

const qualityOptions: { value: Quality; label: string; desc: string }[] = [
  {
    value: "high",
    label: "High Quality",
    desc: "Minimal compression, best visuals",
  },
  {
    value: "medium",
    label: "Balanced",
    desc: "Good quality, smaller file size",
  },
  {
    value: "low",
    label: "Maximum Compression",
    desc: "Smallest size, reduced quality",
  },
];

function RouteComponent() {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState<Quality>("medium");

  const handleFileAdded = (newFiles: File[]) => {
    if (newFiles.length > 0) setFile(newFiles[0]);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 mb-6">
            <PackageOpenIcon className="w-8 h-8 text-emerald-400" />
          </div>
          <h1 className="text-4xl font-bold text-emerald-500/75 bg-clip-text mb-3">Compress PDF</h1>
          <p className="text-muted-foreground text-lg">
            Reduce file size while maintaining quality.
          </p>
        </div>

        {/* Drop Zone */}
        {!file ? (
          <DropZoneFileInput multiple={false} onFilesChanged={handleFileAdded} />
        ) : (
          <div className="space-y-6">
            {/* File Card */}
            <FileItem file={file} onRemove={() => setFile(null)} />

            {/* Compression Level */}
            <div className="bg-slate-800/30 border border-border rounded-2xl p-6 space-y-3">
              <p className="text-sm text-slate-400 font-medium uppercase tracking-wider mb-4">
                Compression Level
              </p>
              {qualityOptions.map((opt) => (
                <Button
                  key={opt.value}
                  variant="outline"
                  onClick={() => setQuality(opt.value)}
                  className={cn(
                    "w-full h-auto flex items-center gap-4 p-4 rounded-xl border text-left justify-start transition-all duration-150",
                    quality === opt.value
                      ? "border-emerald-500 bg-emerald-500/10 hover:bg-emerald-500/10"
                      : "border-slate-700 bg-slate-800/30 hover:border-slate-600 hover:bg-slate-800/30",
                  )}
                >
                  <CircleIcon
                    className={cn(
                      "w-4 h-4 shrink-0",
                      quality === opt.value
                        ? "text-emerald-400 fill-emerald-400"
                        : "text-slate-600",
                    )}
                  />
                  <div>
                    <p
                      className={cn(
                        "text-sm font-medium",
                        quality === opt.value ? "text-emerald-300" : "text-slate-300",
                      )}
                    >
                      {opt.label}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">{opt.desc}</p>
                  </div>
                </Button>
              ))}
            </div>

            <Button className="w-full bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-500/20">
              Compress PDF
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
