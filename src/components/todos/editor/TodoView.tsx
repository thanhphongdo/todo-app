import { Box } from "@mantine/core";
import { TodoProvider } from "../../../providers/editor/TodoProvider";
import { useTodoContext } from "../../../providers/editor/TodoProvider.Context";
import { Content } from "./Content";
import { Title } from "./Title";
import { Actions } from "./actions/Actions";
import { Todo } from "../../../definitions";

export function ViewContent() {
  const { backgroundColor, title } = useTodoContext();
  return (
    <Box
      className="border border-gray-500 rounded-lg max-h-[40rem] flex flex-col"
      onClick={() => {}}
      style={{
        backgroundColor: backgroundColor,
      }}
    >
      <div className="overflow-y-auto flex-1">
        {!!title && <Title />}
        <Content />
      </div>
      <Actions />
    </Box>
  );
}

export function TodoView({ todo }: { todo: Todo }) {
  console.log(todo.mode);
  return (
    <TodoProvider todo={todo}>
      <ViewContent />
    </TodoProvider>
  );
}
