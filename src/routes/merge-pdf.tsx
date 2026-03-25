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
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { createFileRoute } from "@tanstack/react-router";
import { CopyIcon } from "lucide-react";
import { useState } from "react";
import { DropZoneFileInput } from "@/components/DropZoneFileInput";
import { SortableFileItem } from "@/components/SortableFileItem";
import { Button } from "@/components/ui/button";
import { mergePDFs } from "@/lib/pdf";

export const Route = createFileRoute("/merge-pdf")({
  component: RouteComponent,
});

function RouteComponent() {
  const [files, setFiles] = useState<File[]>([]);
  const [isMerging, setIsMerging] = useState(false);

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

  const handleMergePDFs = async () => {
    setIsMerging(true);
    const mergedPdf = await mergePDFs(files);
    setIsMerging(false);
    const url = URL.createObjectURL(mergedPdf);
    const a = document.createElement("a");
    a.href = url;
    a.download = "merged.pdf";
    a.click();
    URL.revokeObjectURL(url);
    a.remove();
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 mb-6">
            <CopyIcon className="w-8 h-8 text-indigo-400" />
          </div>
          <h1 className="text-4xl font-bold text-indigo-500/75 bg-clip-text mb-3">Merge PDF</h1>
          <p className="text-muted-foreground text-lg">
            Combine multiple PDF files into one document.
          </p>
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
              disabled={files.length < 2 || isMerging}
              className="w-full mt-4 bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-500/20"
              onClick={handleMergePDFs}
            >
              Merge {files.length} Files
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
