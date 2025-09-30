import { IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useTodoContext } from "../../../../providers/TodoProvider.Context";
import { EditorMode } from "../../../../definitions";
import { useTodoListStore } from "../../../../stores/store";

export function TagItem({ value, todoId }: { value: string; todoId: string }) {
  const [showRemoveIcon, setShowRemoveIcon] = useState(false);
  const { tags, editorMode, textColor, setTags, getTodo } = useTodoContext();
  const { updateTodo } = useTodoListStore();
  return (
    <div
      className="text-xs flex gap-2 justify-center items-center p-1 min-w-14 max-w-32 border rounded-xl"
      style={{
        borderColor: textColor === "#00000000" ? "#4b5563" : textColor,
        color: textColor === "#00000000" ? "inherit" : textColor,
      }}
      onMouseEnter={() => setShowRemoveIcon(true)}
      onMouseLeave={() => setShowRemoveIcon(false)}
    >
      <div className="truncate flex-1 text-center">{value}</div>
      {showRemoveIcon && (
        <IconX
          className="cursor-pointer hover:bg-gray-700 hover:text-white rounded-full"
          size={14}
          onClick={() => {
            setTags(tags.filter((tag) => tag !== value));
            if (editorMode === EditorMode.VIEWING) {
              const todo = getTodo();
              updateTodo({
                ...todo,
                tags: tags.filter((tag) => tag !== value),
              });
            }
          }}
        />
      )}
    </div>
  );
}
