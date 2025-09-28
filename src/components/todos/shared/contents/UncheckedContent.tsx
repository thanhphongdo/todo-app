import { useTodoContext } from "../../../../providers/editor/TodoProvider.Context";
import { TodoItem } from "../TodoItem";

export function UncheckedContent() {
  const { getUncheckedItems } = useTodoContext();
  return (
    <>
      {getUncheckedItems().map((item) => (
        <TodoItem key={item!.id} id={item!.id} mode={item!.mode} />
      ))}
    </>
  );
}
