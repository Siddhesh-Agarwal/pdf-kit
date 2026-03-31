import { Upload } from "lucide-react";
import { useState } from "react";
import z from "zod";
import { FieldDescription, FieldTitle } from "@/components/ui/field";
import { cn } from "@/lib/utils";

const PDF_MIME_TYPE = "application/pdf";

const pdfFileSchema = z.file().mime(PDF_MIME_TYPE, {
  message: "File must be a PDF",
});

const pdfFilesSchema = z.array(pdfFileSchema).min(1, "At least one PDF file is required");

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

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const dropped = Array.from(e.dataTransfer.files).filter((f) => f.type === PDF_MIME_TYPE);
    const result = pdfFilesSchema.safeParse(dropped);
    if (result.success) {
      onFilesChanged(multiple ? result.data : [result.data[0]]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(e.target.files ?? []);
    const result = pdfFilesSchema.safeParse(picked);
    if (result.success) {
      onFilesChanged(multiple ? result.data : [result.data[0]]);
    }
  };

  const themeClasses = dragging
    ? "border-primary bg-primary/10"
    : "border-border bg-muted/30 hover:border-primary/60 hover:bg-muted/50";

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
        themeClasses,
      )}
    >
      <input
        type="file"
        multiple={multiple}
        accept={PDF_MIME_TYPE}
        className="absolute inset-0 opacity-0 cursor-pointer"
        onChange={handleChange}
      />
      <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
      <FieldTitle className="justify-center text-base">
        {title || (multiple ? "Drop PDF files here" : "Drop a PDF file here")}
      </FieldTitle>
      <FieldDescription className="text-center">{subtitle}</FieldDescription>
    </div>
  );
}
