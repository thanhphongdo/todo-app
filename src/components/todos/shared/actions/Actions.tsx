import { Button } from "@mantine/core";
import { ChangeBackground } from "./ChangeBackground";
import { AddTag } from "./AddTag";
import { Remind } from "./Remind";
import { Collaborators } from "./Collaborators";
import { UploadImage } from "./UploadImage";
import { useTodoContext } from "../../../../providers/TodoProvider.Context";
import { EditorMode } from "../../../../definitions";
import { ChangeTextColor } from "./ChangeTextColor";

export function Actions() {
  const { close, save, editorMode } = useTodoContext();
  return (
    <div className="px-4 py-2 flex items-center gap-4">
      <ChangeBackground />
      <ChangeTextColor />
      <AddTag />
      <Remind />
      <Collaborators />
      <UploadImage />
      {editorMode === EditorMode.EDITING && (
        <>
          <div className="flex-1 flex justify-end gap-2">
            <Button
              variant="light"
              size="xs"
              color="gray"
              onClick={() => save()}
            >
              Save
            </Button>
            <Button
              variant="light"
              size="xs"
              color="#ffa8a8"
              onClick={() => close()}
            >
              Close
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
