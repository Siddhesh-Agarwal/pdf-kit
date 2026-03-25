import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { createFileRoute } from "@tanstack/react-router";
import { CopyIcon, FileTextIcon, GripVerticalIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { DropZoneFileInput } from "@/components/DropZoneFileInput";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/merge-pdf")({
  component: RouteComponent,
});

function RouteComponent() {
  const [files, setFiles] = useState<File[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setFiles((items) => {
        const oldIndex = items.findIndex((i) => i.name === active.id);
        const newIndex = items.findIndex((i) => i.name === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleFilesAdded = (newFiles: File[]) => {
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 mb-6">
            <CopyIcon className="w-8 h-8 text-indigo-400" />
          </div>
          <h1 className="text-4xl font-bold bg-indigo-500/75 bg-clip-text text-transparent mb-3">
            Merge PDF
          </h1>
          <p className="text-slate-400 text-lg">Combine multiple PDF files into one document.</p>
        </div>

        {/* Drop Zone */}
        <DropZoneFileInput multiple onFilesChanged={handleFilesAdded} />

        {/* File List */}
        {files.length > 0 && (
          <div className="mt-6 space-y-3">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={files.map((f) => f.name)}
                strategy={verticalListSortingStrategy}
              >
                {files.map((file, i) => (
                  <SortableFileItem
                    key={file.name}
                    file={file}
                    index={i}
                    removeFile={removeFile}
                    isMultiple={files.length > 1}
                  />
                ))}
              </SortableContext>
            </DndContext>

            <Button
              disabled={files.length < 2}
              className="w-full mt-4 bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-500/20"
            >
              Merge {files.length} Files
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function SortableFileItem({
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
          {(file.size / 1024).toFixed(0)} KB
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
