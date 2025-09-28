import { TodoEditor } from "./todos/TodoEditor";
import { TodoViewList } from "./todos/TodoViewList";

export function MainApp() {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full lg:w-2/3 xl:w-1/3">
        <TodoEditor />
      </div>
      <div className="flex-1 w-full lg:w-5/6 xl:w-3/4 2xl:w-2/3">
        <TodoViewList />
      </div>
    </div>
  );
}
