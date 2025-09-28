import { EditorMode } from "../../../../definitions";
import { useTodoContext } from "../../../../providers/editor/TodoProvider.Context";
import { AddItem } from "../AddItem";
import { CheckedContent } from "./CheckedContent";
import { UncheckedContent } from "./UncheckedContent";

export function Content() {
  const { editorMode } = useTodoContext();
  return (
    <div>
      <div className="flex flex-col gap-2">
        <UncheckedContent />
        {editorMode === EditorMode.EDITING && <AddItem />}
        <CheckedContent />
      </div>
    </div>
  );
}
