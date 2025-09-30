import { Checkbox, Text, Textarea } from "@mantine/core";
import { IconGripVertical, IconX } from "@tabler/icons-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { EditorMode, ItemMode } from "../../../definitions";
import { useTodoContext } from "../../../providers/editor/TodoProvider.Context";
import { useTodoListStore } from "../../../stores/store";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export type Props = { id: string; mode: ItemMode };

export function TodoItem({ id, mode }: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const [isShowRemoveIcon, setIsShowRemoveIcon] = useState(false);
  const { editorMode } = useTodoContext();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={[
        "flex gap-1 border-y pb-1 p-2 items-start",
        mode === ItemMode.EDITING ? "pt-3" : "pt-1",
        isFocused ? "border-gray-600" : "border-transparent",
        isDragging ? "bg-gray-800/50" : "",
      ].join(" ")}
      onMouseEnter={() => setIsShowRemoveIcon(true)}
      onMouseLeave={() => setIsShowRemoveIcon(false)}
    >
      <ItemLeftSide
        id={id}
        mode={mode}
        dragHandleProps={{ ...listeners, ...attributes }}
      />
      <ItemContent id={id} mode={mode} setIsFocused={setIsFocused} />
      {editorMode === EditorMode.EDITING && (
        <ItemRightSide
          id={id}
          mode={mode}
          isShowRemoveIcon={isShowRemoveIcon}
        />
      )}
    </div>
  );
}

function ItemLeftSide({
  id,
  mode,
  dragHandleProps,
}: Props & { dragHandleProps?: any }) {
  const { updateItem, getTodo, itemsMap, editorMode } = useTodoContext();
  const { updateTodo } = useTodoListStore();
  const currentItem = useMemo(() => itemsMap.get(id), [itemsMap, id]);

  return (
    <div className="flex justify-start items-center">
      {mode === ItemMode.EDITING && editorMode === EditorMode.EDITING && (
        <span
          {...dragHandleProps}
          className="cursor-grab active:cursor-grabbing touch-none"
        >
          <IconGripVertical size={20} />
        </span>
      )}
      {mode === ItemMode.VIEWING && editorMode === EditorMode.EDITING && (
        <div className="w-5"></div>
      )}
      <Checkbox
        checked={currentItem?.checked ?? false}
        size="xs"
        color="#424242"
        styles={{ input: { cursor: "pointer", userSelect: "none" } }}
        onChange={(e) => {
          updateItem(id, {
            ...currentItem!,
            checked: e.target.checked,
            mode: e.target.checked ? ItemMode.VIEWING : ItemMode.EDITING,
          });
          if (editorMode === EditorMode.VIEWING) {
            const todo = getTodo();
            updateTodo({
              ...todo,
              items: todo.items.map((item) =>
                item.id === id
                  ? {
                      ...item,
                      checked: e.target.checked,
                    }
                  : item
              ),
            });
          }
        }}
      />
    </div>
  );
}

function ItemRightSide({
  id,
  isShowRemoveIcon,
}: Props & { isShowRemoveIcon: boolean }) {
  const { removeItem } = useTodoContext();
  return (
    <div
      className={[
        "flex justify-start items-center",
        isShowRemoveIcon ? "visible" : "hidden",
      ].join(" ")}
    >
      <div
        className="hover:bg-gray-700 hover:text-white rounded-full p-1 cursor-pointer"
        onClick={() => {
          removeItem(id);
        }}
      >
        <IconX size={16} />
      </div>
    </div>
  );
}

function ItemContent({
  id,
  mode,
  setIsFocused,
}: Props & { setIsFocused: React.Dispatch<React.SetStateAction<boolean>> }) {
  const { addNewItem, updateItem, itemsMap, registerTextAreaRef } =
    useTodoContext();

  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    registerTextAreaRef(id, ref);
  }, []);

  const currentItem = useMemo(() => itemsMap.get(id), [itemsMap, id]);
  return (
    <div className="flex-1 pl-2">
      {mode === ItemMode.EDITING && (
        <Textarea
          ref={ref}
          value={currentItem?.content ?? ""}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          rows={1}
          autosize
          bd={0}
          size="xs"
          styles={{
            input: {
              border: "none",
              backgroundColor: "transparent",
              padding: 0,
              color: "inherit",
            },
          }}
          onChange={(e) => {
            updateItem(id, { ...currentItem!, content: e.target.value });
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              addNewItem(id);
            }
          }}
        />
      )}
      {mode === ItemMode.VIEWING && (
        <div className="min-h-6">
          <Text size="xs" className="whitespace-pre-line">
            {currentItem?.content}
          </Text>
        </div>
      )}
    </div>
  );
}
