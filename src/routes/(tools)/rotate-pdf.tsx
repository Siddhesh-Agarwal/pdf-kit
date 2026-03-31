import { createFileRoute } from "@tanstack/react-router";
import { DownloadIcon, RotateCcwIcon, RotateCwIcon, Undo2Icon } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import { useEffect, useState } from "react";
import { DropZoneFileInput } from "@/components/DropZoneFileInput";
import { FileItem } from "@/components/FileItem";
import { PdfThumbnail } from "@/components/PdfThumbnail";
import { getTool, ToolHeader } from "@/components/tool-header";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Spinner } from "@/components/ui/spinner";
import { rotatePDF } from "@/lib/pdf";
import { downloadBlob } from "@/lib/utils";

export const Route = createFileRoute("/(tools)/rotate-pdf")({
  component: RouteComponent,
});

interface PageRotation {
  pageIndex: number;
  angle: 0 | 90 | 180 | 270;
}

function RouteComponent() {
  const [file, setFile] = useState<File | null>(null);
  const [rotations, setRotations] = useState<PageRotation[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const tool = getTool("/rotate-pdf");

  useEffect(() => {
    if (file) {
      const loadPdf = async () => {
        const arrayBuffer = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const count = pdfDoc.getPageCount();
        setRotations(
          Array.from({ length: count }, (_, i) => ({ pageIndex: i, angle: 0 as const })),
        );
      };
      loadPdf();
    } else {
      setRotations([]);
    }
  }, [file]);

  const handleFileAdded = (newFiles: File[]) => {
    if (newFiles.length > 0) setFile(newFiles[0]);
  };

  const rotatePage = (pageIndex: number, clockwise: boolean) => {
    setRotations((prev) =>
      prev.map((r) =>
        r.pageIndex === pageIndex
          ? {
              ...r,
              angle: ((r.angle + (clockwise ? 90 : 270)) % 360) as 0 | 90 | 180 | 270,
            }
          : r,
      ),
    );
  };

  const rotateAll = (clockwise: boolean) => {
    setRotations((prev) =>
      prev.map((r) => ({
        ...r,
        angle: ((r.angle + (clockwise ? 90 : 270)) % 360) as 0 | 90 | 180 | 270,
      })),
    );
  };

  const resetRotations = () => {
    setRotations((prev) => prev.map((r) => ({ ...r, angle: 0 })));
  };

  const handleDownload = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const nonZero = rotations.filter(
        (r): r is { pageIndex: number; angle: 90 | 180 | 270 } => r.angle !== 0,
      );
      const blob = await rotatePDF(file, nonZero);
      downloadBlob(blob, `rotated-${file.name}`);
    } catch (error) {
      console.error("Error rotating PDF:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <ToolHeader toolName="/rotate-pdf" />

        {!file ? (
          <DropZoneFileInput multiple={false} onFilesChanged={handleFileAdded} />
        ) : (
          <div className="space-y-6">
            <FileItem file={file} onRemove={() => setFile(null)} />
            <div className="flex flex-col items-center">
              <ButtonGroup>
                <Button className={tool.classes.outlineHover} onClick={() => rotateAll(true)}>
                  <RotateCwIcon className="size-4 mr-1" />
                  All CW
                </Button>
                <Button className={tool.classes.outlineHover} onClick={() => rotateAll(false)}>
                  <RotateCcwIcon className="size-4 mr-1" />
                  All CCW
                </Button>
                <Button className={tool.classes.outlineHover} onClick={resetRotations}>
                  <Undo2Icon className="size-4 mr-1" />
                  Reset
                </Button>
                <Button
                  onClick={handleDownload}
                  disabled={isProcessing}
                  className={tool.classes.button}
                >
                  {isProcessing ? <Spinner /> : <DownloadIcon className="size-4" />}
                  Download
                </Button>
              </ButtonGroup>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {rotations.map((r) => (
                <div
                  key={r.pageIndex}
                  className="group relative flex flex-col items-center gap-2 p-2 bg-background border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative w-full">
                    <div style={{ transform: `rotate(${r.angle}deg)` }}>
                      <PdfThumbnail file={file} pageIndex={r.pageIndex} />
                    </div>
                    <div className="absolute -top-2 -right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="secondary"
                        size="icon"
                        className="size-6 rounded-full shadow-sm border border-border bg-background hover:bg-muted"
                        onClick={() => rotatePage(r.pageIndex, true)}
                        title="Rotate 90° CW"
                      >
                        <RotateCwIcon className="size-3" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="size-6 rounded-full shadow-sm border border-border bg-background hover:bg-muted"
                        onClick={() => rotatePage(r.pageIndex, false)}
                        title="Rotate 90° CCW"
                      >
                        <RotateCcwIcon className="size-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground">
                      Page {r.pageIndex + 1}
                    </span>
                    {r.angle !== 0 && <span className="text-xs font-medium">{r.angle}°</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
