import { createContext, useContext } from "react";
import { useTodoManager } from "../hooks/use-todo-manager";

export type ContextValue = ReturnType<typeof useTodoManager>;

export const TodoContext = createContext<ContextValue | undefined>(undefined);

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within TodoProvider");
  }
  return context;
};
