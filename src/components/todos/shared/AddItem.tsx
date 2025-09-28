import { Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useTodoContext } from "../../../providers/editor/TodoProvider.Context";

export function AddItem() {
  const { addNewItem } = useTodoContext();
  return (
    <div
      className="opacity-60 hover:opacity-100 flex gap-1 items-center cursor-pointer select-none"
      onClick={() => addNewItem()}
    >
      <div className="flex justify-start items-center">
        <div className="w-5"></div>
        <IconPlus size={20} />
      </div>
      <div className="flex-1 p-2">
        <Text>More items...</Text>
      </div>
    </div>
  );
}
