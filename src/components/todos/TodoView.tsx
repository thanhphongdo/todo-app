import { Box } from "@mantine/core";
import { TodoProvider } from "../../providers/TodoProvider";
import { useTodoContext } from "../../providers/TodoProvider.Context";
import { Todo } from "../../definitions";
import { IconX } from "@tabler/icons-react";
import { useTodoListStore } from "../../stores/store";
import { Title } from "./shared/Title";
import { Content } from "./shared/contents/Content";
import { Actions } from "./shared/actions/Actions";
import { TagList } from "./shared/tags/TagList";

function RemoveTodo() {
  const { id } = useTodoContext();
  const { removeTodo } = useTodoListStore();
  return (
    <div
      className={[
        "flex justify-start items-center absolute right-2 top-2 z-10",
        true ? "visible" : "hidden",
      ].join(" ")}
    >
      <div
        className="hover:bg-gray-700 hover:text-white rounded-full p-1 cursor-pointer"
        onClick={() => {
          removeTodo(id);
        }}
      >
        <IconX size={16} />
      </div>
    </div>
  );
}

function ViewContent() {
  const { backgroundColor, textColor, title } = useTodoContext();
  return (
    <Box
      className="border border-gray-500 rounded-lg flex flex-col relative"
      style={{
        backgroundColor: backgroundColor,
      }}
    >
      <div
        style={{
          color: textColor === "#00000000" ? "inherit" : textColor,
        }}
      >
        <RemoveTodo />
        <div className="max-h-[24rem] overflow-y-auto flex-1">
          {!!title && <Title />}
          <Content />
        </div>
        <TagList />
        <Actions />
      </div>
    </Box>
  );
}

export function TodoView({ todo }: { todo: Todo }) {
  return (
    <TodoProvider todo={todo}>
      <ViewContent />
    </TodoProvider>
  );
}
