import { Text } from "@mantine/core";
import { TodoItem } from "../TodoItem";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { useTodoContext } from "../../../../providers/editor/TodoProvider.Context";

export function CheckedContent() {
  const [opened, { toggle }] = useDisclosure(true);
  const { getCheckedItems } = useTodoContext();
  return getCheckedItems().length > 0 ? (
    <>
      <div
        className="flex items-center gap-1 p-2 cursor-pointer select-none"
        onClick={toggle}
      >
        {opened && <IconChevronDown />}
        {!opened && <IconChevronUp />}
        <Text size="md" fw={800}>
          {getCheckedItems().length} Completed Item(s)
        </Text>
      </div>
      {opened && (
        <>
          {getCheckedItems().map((item) => (
            <TodoItem key={item!.id} id={item!.id} mode={item!.mode} />
          ))}
        </>
      )}
    </>
  ) : (
    <></>
  );
}
