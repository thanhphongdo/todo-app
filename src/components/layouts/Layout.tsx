import { AppShell, Burger, Drawer, Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { PropsWithChildren } from "react";
import { SwitchTheme } from "../SwitchTheme";

export function Layout({ children }: PropsWithChildren) {
  const [opened, { toggle, close }] = useDisclosure();
  return (
    <AppShell
      layout="alt"
      header={{ height: 60 }}
      footer={{ height: 60 }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <div className="flex items-center justify-center w-full relative">
            <Burger
              className="absolute z-10 left-0"
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <div className="flex-1 text-center">
              <Text size="xl" fw={600} className="font-fredoka">
                Todo List App
              </Text>
            </div>
          </div>
        </Group>
      </AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
      <SwitchTheme />
      <Drawer opened={opened} onClose={close} title="Implement later">
        {/* Drawer content */}
      </Drawer>
    </AppShell>
  );
}
