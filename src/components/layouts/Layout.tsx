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
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          Todo List App
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
