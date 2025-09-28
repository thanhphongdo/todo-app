import { Box } from "@mantine/core";
import { TodoProvider } from "../../providers/editor/TodoProvider";
import { useTodoContext } from "../../providers/editor/TodoProvider.Context";
import { EditorMode } from "../../definitions";
import { Placeholder } from "./shared/Placeholder";
import { Title } from "./shared/Title";
import { Content } from "./shared/contents/Content";
import { Actions } from "./shared/actions/Actions";
import { TagList } from "./shared/tags/TagList";

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
      <div className="px-2">
        <TagList />
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
