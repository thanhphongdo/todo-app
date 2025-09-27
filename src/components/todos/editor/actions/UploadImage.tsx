import { Popover, Text } from "@mantine/core";
import { IconPhoto } from "@tabler/icons-react";

export function UploadImage() {
  return (
    <Popover width={320} position="bottom" withArrow shadow="md">
      <Popover.Target>
        <IconPhoto size={20} className="cursor-pointer" />
      </Popover.Target>
      <Popover.Dropdown>
        <Text>UploadImage feature coming soon!</Text>
      </Popover.Dropdown>
    </Popover>
  );
}
