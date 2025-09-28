import { Popover } from "@mantine/core";
import { useTodoContext } from "../../../../providers/editor/TodoProvider.Context";
import { TagItem } from "./TagItem";

export function TagList() {
  const { tags, id } = useTodoContext();
  const minTag = 2;
  const moreTags = tags.length - minTag;
  return (
    <div className="flex flex-wrap gap-1 p-2">
      {tags.slice(0, minTag).map((tag) => (
        <TagItem key={tag} value={tag} todoId={id} />
      ))}
      {moreTags > 0 && (
        <Popover width={320} position="bottom" withArrow shadow="md">
          <Popover.Target>
            <div className="text-xs flex gap-2 justify-center items-center p-1 min-w-8 max-w-32 border border-gray-600 rounded-md cursor-pointer">
              +{moreTags}
            </div>
          </Popover.Target>
          <Popover.Dropdown>
            <div className="flex flex-wrap gap-1">
              {tags.map((tag) => (
                <TagItem key={tag} value={tag} todoId={id} />
              ))}
            </div>
          </Popover.Dropdown>
        </Popover>
      )}
    </div>
  );
}
