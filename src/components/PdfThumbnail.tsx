import * as pdfjs from "pdfjs-dist";
import { useEffect, useRef, useState } from "react";

// Configure worker using the version from the package
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfThumbnailProps {
  file: File;
  pageIndex: number;
}

// Simple cache for loaded PDF documents to avoid re-parsing for every thumbnail
const pdfCache = new Map<File, Promise<pdfjs.PDFDocumentProxy>>();

export function PdfThumbnail({ file, pageIndex }: PdfThumbnailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const renderPage = async () => {
      try {
        // Get or create the loading task for this file
        let loadingTask = pdfCache.get(file);
        if (!loadingTask) {
          const arrayBuffer = await file.arrayBuffer();
          loadingTask = pdfjs.getDocument({ data: arrayBuffer }).promise;
          pdfCache.set(file, loadingTask);
        }

        const pdf = await loadingTask;
        if (!isMounted) return;

        const page = await pdf.getPage(pageIndex + 1); // 1-indexed

        // Use a scale that provides a decent thumbnail size (e.g., width around 200-300px)
        // We set rotation to 0 initially to get the base viewport,
        // but PDF.js handles the page's internal rotation automatically
        // if we don't override it.
        const viewport = page.getViewport({ scale: 0.5 });

        const canvas = canvasRef.current;
        if (!canvas || !isMounted) return;

        const context = canvas.getContext("2d", { alpha: false });
        if (!context) return;

        // Set dimensions based on the viewport which respects PDF rotation
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Ensure background is white before rendering
        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
          canvas: canvas,
        };

        await page.render(renderContext).promise;
        if (isMounted) setLoading(false);
      } catch (error) {
        if (isMounted) {
          console.error("Error rendering thumbnail:", error);
          setLoading(false);
        }
      }
    };

    renderPage();
    return () => {
      isMounted = false;
    };
  }, [file, pageIndex]);

  return (
    <div className="relative aspect-[3/4] bg-muted rounded-lg overflow-hidden border border-border shadow-sm flex items-center justify-center">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse z-10">
          <span className="text-[10px] text-muted-foreground">Loading...</span>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="max-w-full max-h-full object-contain"
        style={{ visibility: loading ? "hidden" : "visible" }}
      />
    </div>
  );
}
