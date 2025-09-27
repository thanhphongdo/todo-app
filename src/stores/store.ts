import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Todo } from "../definitions";

export interface TodoListStore {
  todoList: Todo[];
  addTodo: (todo: Todo) => void;
  removeTodo: (id: string | number) => void;
  updateTodo: (todo: Todo) => void;
}

export const useTodoListStore = create<TodoListStore>()(
  persist(
    (set, get) => ({
      todoList: [],

      addTodo: (todo: Todo) =>
        set((state) => ({
          todoList: [todo, ...state.todoList],
        })),

      removeTodo: (id: string | number) =>
        set((state) => ({
          todoList: state.todoList.filter((t) => t.id !== id),
        })),

      updateTodo: (updated: Todo) =>
        set((state) => ({
          todoList: state.todoList.map((t) =>
            t.id === updated.id ? { ...t, ...updated } : t
          ),
        })),
    }),
    {
      name: "todo-list",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
