import { createFileRoute } from "@tanstack/react-router";
import { Circle, FileText, PackageOpen, X } from "lucide-react";
import { useState } from "react";
import { DropZoneFileInput } from "@/components/DropZoneFileInput";
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
            <PackageOpen className="w-8 h-8 text-emerald-400" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-emerald-300 bg-clip-text text-transparent mb-3">
            Compress PDF
          </h1>
          <p className="text-slate-400 text-lg">Reduce file size while maintaining quality.</p>
        </div>

        {/* Drop Zone */}
        {!file ? (
          <DropZoneFileInput multiple={false} onFilesChanged={handleFileAdded} />
        ) : (
          <div className="space-y-6">
            {/* File Card */}
            <div className="flex items-center gap-3 bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3">
              <FileText className="w-5 h-5 text-emerald-400 shrink-0" />
              <span className="flex-1 text-sm text-slate-300 truncate">{file.name}</span>
              <span className="text-xs text-slate-500">{(file.size / 1024).toFixed(0)} KB</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setFile(null)}
                className="w-6 h-6 text-slate-600 hover:text-red-400 hover:bg-transparent"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Compression Level */}
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 space-y-3">
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
                  <Circle
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
