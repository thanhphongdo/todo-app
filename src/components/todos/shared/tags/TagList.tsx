import { Popover } from "@mantine/core";
import { useTodoContext } from "../../../../providers/editor/TodoProvider.Context";
import { TagItem } from "./TagItem";

export function TagList() {
  const { tags, id, textColor } = useTodoContext();
  const minTag = 3;
  const moreTags = tags.length - minTag;
  return tags.length > 0 ? (
    <div className="flex flex-wrap gap-1 p-2">
      {tags.slice(0, minTag).map((tag) => (
        <TagItem key={tag} value={tag} todoId={id} />
      ))}
      {moreTags > 0 && (
        <Popover width={320} position="bottom" withArrow shadow="md">
          <Popover.Target>
            <div
              className="text-xs flex gap-2 justify-center items-center p-1 min-w-8 max-w-32 border rounded-md cursor-pointer"
              style={{
                borderColor: textColor === "#00000000" ? "#4b5563" : textColor,
              }}
            >
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
  ) : (
    <></>
  );
}
