import { useTodoListStore } from "../stores/store";
import { TodoEditor } from "./todos/editor/TodoEditor";
import { TodoView } from "./todos/editor/TodoView";

export function MainApp() {
  const { todoList } = useTodoListStore();

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full lg:w-2/3 xl:w-1/3">
        <TodoEditor />
      </div>
      <div className="flex-1 w-full lg:w-5/6 xl:w-3/4 2xl:w-2/3">
        <div className="pt-8 w-full">
          <div className="columns-1 sm:columns-2 md:columns-3 xl:columns-4 gap-4 w-full">
            {todoList.map((todo, index) => (
              <div key={index} className="break-inside-avoid mb-4">
                <TodoView todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
