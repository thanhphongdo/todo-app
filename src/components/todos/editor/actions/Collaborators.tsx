import { Popover, Text } from "@mantine/core";
import { IconUserPlus } from "@tabler/icons-react";

export function Collaborators() {
  return (
    <Popover width={320} position="bottom" withArrow shadow="md">
      <Popover.Target>
        <IconUserPlus size={20} className="cursor-pointer" />
      </Popover.Target>
      <Popover.Dropdown>
        <Text>Collaborators feature coming soon!</Text>
      </Popover.Dropdown>
    </Popover>
  );
}
