import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import hr from "@tsmx/human-readable";
import { FileTextIcon, GripVerticalIcon, XIcon } from "lucide-react";
import { Button } from "./ui/button";

export function SortableFileItem({
  file,
  index,
  removeFile,
  isMultiple,
}: {
  file: File;
  index: number;
  removeFile: (i: number) => void;
  isMultiple: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: file.name,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3 cursor-grab active:cursor-grabbing touch-none"
    >
      {isMultiple && <GripVerticalIcon className="size-5 text-muted-foreground hidden sm:block" />}
      <div className="flex-1 flex items-center gap-2 truncate">
        <FileTextIcon className="size-4 text-indigo-400 shrink-0" />
        <span className="text-sm text-card-foreground truncate">{file.name}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          {hr.fromBytes(file.size, { fixedPrecision: 1 })}
        </span>
        <div onPointerDown={(e) => e.stopPropagation()}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeFile(index)}
            className="w-6 h-6 text-slate-600 hover:text-red-400 hover:bg-transparent relative z-50 shrink-0"
          >
            <XIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
