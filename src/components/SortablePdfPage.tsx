import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVerticalIcon, XIcon } from "lucide-react";
import { PdfThumbnail } from "./PdfThumbnail";
import { Button } from "./ui/button";

interface SortablePdfPageProps {
  id: string; // Use index as ID or a unique string
  file: File;
  pageIndex: number; // 0-indexed
  onRemove: () => void;
}

export function SortablePdfPage({ id, file, pageIndex, onRemove }: SortablePdfPageProps) {
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

        {/* Remove Button */}
        <Button
          variant="destructive"
          size="icon"
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        >
          <XIcon className="w-3 h-3" />
        </Button>

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
