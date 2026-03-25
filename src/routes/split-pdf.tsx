import { createFileRoute } from "@tanstack/react-router";
import { ScissorsIcon } from "lucide-react";
import { useState } from "react";
import { DropZoneFileInput } from "@/components/DropZoneFileInput";
import { FileItem } from "@/components/FileItem";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/split-pdf")({
  component: RouteComponent,
});

function RouteComponent() {
  const [file, setFile] = useState<File | null>(null);
  const [splitMode, setSplitMode] = useState<"range" | "every">("range");
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
          <h1 className="text-4xl font-bold bg-linear-to-r from-white to-violet-300 bg-clip-text text-transparent mb-3">
            Split PDF
          </h1>
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
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 space-y-5">
              <p className="text-sm text-slate-400 font-medium uppercase tracking-wider">
                Split Options
              </p>

              <div className="flex gap-3">
                {(["range", "every"] as const).map((mode) => (
                  <Button
                    key={mode}
                    variant="outline"
                    onClick={() => setSplitMode(mode)}
                    className={cn(
                      "flex-1 border transition-all duration-150",
                      splitMode === mode
                        ? "border-violet-500 bg-violet-500/20 text-violet-300 hover:bg-violet-500/30 hover:text-violet-300"
                        : "border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-600 hover:bg-slate-800/50 hover:text-slate-300",
                    )}
                  >
                    {mode === "range" ? "Page Range" : "Split Every Page"}
                  </Button>
                ))}
              </div>

              {splitMode === "range" && (
                <div>
                  <label className="text-xs text-slate-500 mb-2 block">
                    Page range (e.g. 1-3, 5, 7-9)
                  </label>
                  <input
                    type="text"
                    value={pageRange}
                    onChange={(e) => setPageRange(e.target.value)}
                    placeholder="1-3, 5, 7-9"
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600
                      focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 transition-all"
                  />
                </div>
              )}
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
