import { Popover, Text } from "@mantine/core";
import { IconNotification } from "@tabler/icons-react";

export function Remind() {
  return (
    <Popover width={320} position="bottom" withArrow shadow="md">
      <Popover.Target>
        <IconNotification size={20} className="cursor-pointer" />
      </Popover.Target>
      <Popover.Dropdown>
        <Text>Remind me feature coming soon!</Text>
      </Popover.Dropdown>
    </Popover>
  );
}
