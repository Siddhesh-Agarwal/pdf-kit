import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CopyIcon, GripVerticalIcon, XIcon } from "lucide-react";
import { PdfThumbnail } from "./PdfThumbnail";
import { Button } from "./ui/button";

interface SortablePdfPageProps {
  id: string; // Unique ID for dnd-kit
  file: File;
  pageIndex: number; // 0-indexed original page number
  onRemove: () => void;
  onCopy: () => void;
}

export function SortablePdfPage({ id, file, pageIndex, onRemove, onCopy }: SortablePdfPageProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group relative flex flex-col items-center gap-2 p-2 bg-background border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="relative w-full">
        <PdfThumbnail file={file} pageIndex={pageIndex} />

        {/* Action Buttons */}
        <div className="absolute -top-2 -right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="secondary"
            size="icon"
            className="w-6 h-6 rounded-full shadow-sm border border-border bg-background hover:bg-muted"
            onClick={(e) => {
              e.stopPropagation();
              onCopy();
            }}
            title="Copy Page"
          >
            <CopyIcon className="w-3 h-3 text-blue-500" />
          </Button>
          <Button
            variant="destructive"
            size="icon"
            className="w-6 h-6 rounded-full shadow-sm"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            title="Remove Page"
          >
            <XIcon className="w-3 h-3" />
          </Button>
        </div>

        {/* Drag Handle */}
        <div
          {...attributes}
          {...listeners}
          className="absolute bottom-2 right-2 p-1.5 bg-background/80 backdrop-blur-sm rounded-lg border border-border cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <GripVerticalIcon className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>

      <span className="text-xs font-medium text-muted-foreground">Page {pageIndex + 1}</span>
    </div>
  );
}
