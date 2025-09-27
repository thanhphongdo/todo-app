import { PropsWithChildren } from "react";
import { TodoContext } from "./TodoProvider.Context";
import { useTodoManager } from "../../hooks/todo-manager";
import { Todo } from "../../definitions";

export const TodoProvider = ({
  children,
  todo,
}: PropsWithChildren & { todo?: Todo }) => {
  const todoEditor = useTodoManager({ initialTodo: todo });

  return (
    <TodoContext.Provider value={{ ...todoEditor }}>
      {children}
    </TodoContext.Provider>
  );
};
