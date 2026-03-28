import * as pdfjs from "pdfjs-dist";
import { useEffect, useRef, useState } from "react";

// Configure worker using the version from the package
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfThumbnailProps {
  file: File;
  pageIndex: number;
}

export function PdfThumbnail({ file, pageIndex }: PdfThumbnailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const renderPage = async () => {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(pageIndex + 1); // 1-indexed

        const viewport = page.getViewport({ scale: 0.5 });
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext("2d");
        if (!context) return;

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        await page.render(renderContext).promise;
        if (isMounted) setLoading(false);
      } catch (error) {
        console.error("Error rendering thumbnail:", error);
      }
    };

    renderPage();
    return () => {
      isMounted = false;
    };
  }, [file, pageIndex]);

  return (
    <div className="relative aspect-[3/4] bg-muted rounded-lg overflow-hidden border border-border shadow-sm">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse">
          <span className="text-xs text-muted-foreground">Loading...</span>
        </div>
      )}
      <canvas ref={canvasRef} className="w-full h-full object-contain" />
    </div>
  );
}
