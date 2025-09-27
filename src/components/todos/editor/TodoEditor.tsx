import { Box } from "@mantine/core";
import { TodoProvider } from "../../../providers/editor/TodoProvider";
import { Placeholder } from "./Placeholder";
import { useTodoContext } from "../../../providers/editor/TodoProvider.Context";
import { EditorMode } from "../../../definitions";
import { Content } from "./Content";
import { Title } from "./Title";
import { Actions } from "./actions/Actions";

export function EditorContent() {
  const { editorMode, setEditorMode, addNewItem, backgroundColor } =
    useTodoContext();
  return (
    <Box
      className="border border-gray-500 rounded-lg max-h-[40rem] flex flex-col"
      style={{
        backgroundColor: backgroundColor,
      }}
    >
      <div
        className="overflow-y-auto flex-1"
        onClick={() => {
          if (editorMode === EditorMode.EDITING) {
            return;
          }
          setEditorMode(EditorMode.EDITING);
          addNewItem();
        }}
      >
        {editorMode === EditorMode.INITIAL && <Placeholder />}
        {editorMode === EditorMode.EDITING && (
          <>
            <Title />
            <Content />
          </>
        )}
      </div>
      <Actions />
    </Box>
  );
}

export function TodoEditor() {
  return (
    <TodoProvider>
      <EditorContent />
    </TodoProvider>
  );
}
