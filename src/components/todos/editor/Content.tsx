import { EditorMode } from "../../../definitions";
import { useTodoContext } from "../../../providers/editor/TodoProvider.Context";
import { AddItem } from "./AddItem";
import { ContentChecked } from "./ContentChecked";
import { ContentUnchecked } from "./ContentUnchecked";

export function Content() {
  const { editorMode } = useTodoContext();
  return (
    <div>
      <div className="flex flex-col gap-2">
        <ContentUnchecked />
        {editorMode === EditorMode.EDITING && <AddItem />}
        <ContentChecked />
      </div>
    </div>
  );
}
