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

interface PdfPage {
  id: string;
  index: number;
}

interface PdfThumbnailGridProps {
  file: File;
  pages: PdfPage[];
  onOrderChange: (newPages: PdfPage[]) => void;
  onRemovePage: (idToRemove: string) => void;
  onCopyPage: (idToCopy: string) => void;
}

export function PdfThumbnailGrid({
  file,
  pages,
  onOrderChange,
  onRemovePage,
  onCopyPage,
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
      const oldIndex = pages.findIndex((p) => p.id === active.id);
      const newIndex = pages.findIndex((p) => p.id === over.id);
      onOrderChange(arrayMove(pages, oldIndex, newIndex));
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={pages.map((p) => p.id)} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {pages.map((page) => (
            <SortablePdfPage
              key={page.id}
              id={page.id}
              file={file}
              pageIndex={page.index}
              onRemove={() => onRemovePage(page.id)}
              onCopy={() => onCopyPage(page.id)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
