import { Popover, TagsInput } from "@mantine/core";
import { IconTag } from "@tabler/icons-react";

export function AddTag() {
  return (
    <Popover width={320} position="bottom" withArrow shadow="md">
      <Popover.Target>
        <IconTag size={20} className="cursor-pointer" />
      </Popover.Target>
      <Popover.Dropdown>
        <TagsInput placeholder="Input your tags and enter" />
      </Popover.Dropdown>
    </Popover>
  );
}
