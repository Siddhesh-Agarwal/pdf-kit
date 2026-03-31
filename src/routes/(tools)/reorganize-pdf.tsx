import { createFileRoute } from "@tanstack/react-router";
import { DownloadIcon, RotateCcwIcon } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import { useEffect, useState } from "react";
import { DropZoneFileInput } from "@/components/DropZoneFileInput";
import { FileItem } from "@/components/FileItem";
import { PdfThumbnailGrid } from "@/components/PdfThumbnailGrid";
import { getTool, ToolHeader } from "@/components/tool-header";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { reorganizePDF } from "@/lib/pdf";
import { cn, downloadBlob } from "@/lib/utils";

export const Route = createFileRoute("/(tools)/reorganize-pdf")({
  component: RouteComponent,
});

interface PdfPage {
  id: string;
  index: number;
}

function RouteComponent() {
  const tool = getTool("/reorganize-pdf");
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<PdfPage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (file) {
      const loadPdf = async () => {
        const arrayBuffer = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const count = pdfDoc.getPageCount();
        setPages(
          Array.from({ length: count }, (_, i) => ({
            id: `page-${i}-${crypto.randomUUID()}`,
            index: i,
          })),
        );
      };
      loadPdf();
    } else {
      setPages([]);
    }
  }, [file]);

  const handleFileAdded = (newFiles: File[]) => {
    if (newFiles.length > 0) setFile(newFiles[0]);
  };

  const handleDownload = async () => {
    if (!file || pages.length === 0) return;
    setIsProcessing(true);
    try {
      const pageIndices = pages.map((p) => p.index);
      const blob = await reorganizePDF(file, pageIndices);
      downloadBlob(blob, `reorganized-${file.name}`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const resetOrder = async () => {
    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      setPages(
        Array.from({ length: pdfDoc.getPageCount() }, (_, i) => ({
          id: `page-${i}-${crypto.randomUUID()}`,
          index: i,
        })),
      );
    }
  };

  const handleCopyPage = (idToCopy: string) => {
    setPages((prev) => {
      const index = prev.findIndex((p) => p.id === idToCopy);
      if (index === -1) return prev;
      const pageToCopy = prev[index];
      const newPage = {
        ...pageToCopy,
        id: `page-${pageToCopy.index}-${crypto.randomUUID()}`,
      };
      const nextPages = [...prev];
      nextPages.splice(index + 1, 0, newPage);
      return nextPages;
    });
  };

  const handleRemovePage = (idToRemove: string) => {
    setPages((prev) => prev.filter((p) => p.id !== idToRemove));
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-20">
        {/* Header */}
        <ToolHeader toolName="/reorganize-pdf" />

        {/* Drop Zone */}
        {!file ? (
          <div className="max-w-3xl mx-auto">
            <DropZoneFileInput multiple={false} onFilesChanged={handleFileAdded} />
          </div>
        ) : (
          <div className="space-y-8">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-muted/30 border border-border rounded-2xl sticky top-4 z-10 backdrop-blur-md">
              <div className="flex items-center gap-4">
                <FileItem file={file} onRemove={() => setFile(null)} />
                <div className="h-8 w-px bg-border hidden sm:block" />
                <span className="text-sm text-muted-foreground font-medium">
                  {pages.length} Pages selected
                </span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Button
                  size="sm"
                  onClick={resetOrder}
                  disabled={isProcessing}
                  className={cn("flex-1 sm:flex-none", tool.classes.outlineHover)}
                >
                  <RotateCcwIcon className="size-4 mr-2" />
                  Reset
                </Button>
                <Button
                  onClick={handleDownload}
                  disabled={isProcessing || pages.length === 0}
                  className={cn("flex-1 sm:flex-none", tool.classes.button)}
                >
                  {isProcessing ? <Spinner /> : <DownloadIcon className="size-4 mr-2" />}
                  Download PDF
                </Button>
              </div>
            </div>

            {/* Thumbnail Grid */}
            <PdfThumbnailGrid
              file={file}
              pages={pages}
              onOrderChange={setPages}
              onRemovePage={handleRemovePage}
              onCopyPage={handleCopyPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}
