import { useState, useCallback } from "react";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface DropZoneFileInputProps {
  onFilesChanged: (files: File[]) => void;
  multiple?: boolean;
  title?: string;
  subtitle?: string;
}

export function DropZoneFileInput({
  onFilesChanged,
  multiple = false,
  title,
  subtitle = "or click to browse",
}: DropZoneFileInputProps) {
  const [dragging, setDragging] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const dropped = Array.from(e.dataTransfer.files).filter(
        (f) => f.type === "application/pdf"
      );
      if (dropped.length > 0) {
        onFilesChanged(multiple ? dropped : [dropped[0]]);
      }
    },
    [multiple, onFilesChanged]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(e.target.files ?? []);
    if (picked.length > 0) {
      onFilesChanged(multiple ? picked : [picked[0]]);
    }
  };

  const getThemeClasses = () => {
    return dragging
      ? "border-primary bg-primary/10"
      : "border-border bg-muted/30 hover:border-primary/60 hover:bg-muted/50";
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      className={cn(
        "relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-200 cursor-pointer",
        getThemeClasses()
      )}
    >
      <input
        type="file"
        multiple={multiple}
        accept="application/pdf"
        className="absolute inset-0 opacity-0 cursor-pointer"
        onChange={handleChange}
      />
      <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
      <p className="text-foreground font-medium mb-1">
        {title || (multiple ? "Drop PDF files here" : "Drop a PDF file here")}
      </p>
      <p className="text-muted-foreground text-sm">{subtitle}</p>
    </div>
  );
}
