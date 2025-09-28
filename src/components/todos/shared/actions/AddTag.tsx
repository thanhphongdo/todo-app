import { Popover, TagsInput } from "@mantine/core";
import { IconTag } from "@tabler/icons-react";
import { useTodoContext } from "../../../../providers/editor/TodoProvider.Context";
import { useTodoListStore } from "../../../../stores/store";
import { EditorMode } from "../../../../definitions";

export function AddTag() {
  const { tags, editorMode, setTags, getTodo } = useTodoContext();
  const { updateTodo } = useTodoListStore();
  return (
    <Popover width={320} position="bottom" withArrow shadow="md">
      <Popover.Target>
        <IconTag size={20} className="cursor-pointer" />
      </Popover.Target>
      <Popover.Dropdown>
        <TagsInput
          placeholder="Input your tags and enter"
          value={tags}
          onChange={(tags) => {
            setTags(tags);
            if (editorMode === EditorMode.VIEWING) {
              const todo = getTodo();
              updateTodo({
                ...todo,
                tags,
              });
            }
          }}
        />
      </Popover.Dropdown>
    </Popover>
  );
}
