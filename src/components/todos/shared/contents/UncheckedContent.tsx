import {
  DndContext,
  closestCenter,
  DragEndEvent,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { useTodoContext } from "../../../../providers/TodoProvider.Context";
import { TodoItem } from "../TodoItem";
import { useState } from "react";
import { createPortal } from "react-dom";
import { ItemMode } from "../../../../definitions";

export function UncheckedContent() {
  const { getUncheckedItems, itemIds, setItemIds } = useTodoContext();
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = itemIds.indexOf(active.id as string);
      const newIndex = itemIds.indexOf(over.id as string);
      setItemIds((prev) => arrayMove(prev, oldIndex, newIndex));
    }
    setActiveId(null);
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={(e) => setActiveId(e.active.id as string)}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveId(null)}
    >
      <div className="max-h-[400px] overflow-y-auto">
        <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
          {getUncheckedItems().map((item) => (
            <TodoItem key={item!.id} id={item!.id} mode={item!.mode} />
          ))}
        </SortableContext>
      </div>

      {createPortal(
        <DragOverlay>
          {activeId ? <TodoItem id={activeId} mode={ItemMode.EDITING} /> : null}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
}
