import { useTodoListStore } from "../../stores/store";
import { TodoView } from "./TodoView";

export function TodoViewList() {
  const { todoList } = useTodoListStore();
  return (
    <div className="pt-8 w-full">
      <div className="columns-1 sm:columns-2 md:columns-3 xl:columns-4 gap-4 w-full">
        {todoList.map((todo, index) => (
          <div key={index} className="break-inside-avoid mb-4">
            <TodoView todo={todo} />
          </div>
        ))}
      </div>
    </div>
  );
}
