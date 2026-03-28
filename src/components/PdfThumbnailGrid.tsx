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
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { SortablePdfPage } from "./SortablePdfPage";

interface PdfThumbnailGridProps {
  file: File;
  pageIndices: number[];
  onOrderChange: (newIndices: number[]) => void;
  onRemovePage: (indexToRemove: number) => void;
}

export function PdfThumbnailGrid({
  file,
  pageIndices,
  onOrderChange,
  onRemovePage,
}: PdfThumbnailGridProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = pageIndices.findIndex((idx) => `page-${idx}` === active.id);
      const newIndex = pageIndices.findIndex((idx) => `page-${idx}` === over.id);
      onOrderChange(arrayMove(pageIndices, oldIndex, newIndex));
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={pageIndices.map((idx) => `page-${idx}`)}
        strategy={rectSortingStrategy}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {pageIndices.map((pageIndex) => (
            <SortablePdfPage
              key={`page-${pageIndex}`}
              id={`page-${pageIndex}`}
              file={file}
              pageIndex={pageIndex}
              onRemove={() => onRemovePage(pageIndex)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
