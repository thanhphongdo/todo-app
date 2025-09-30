import { ColorPicker, DEFAULT_THEME, Popover, Text } from "@mantine/core";
import { IconPalette } from "@tabler/icons-react";
import { useTodoContext } from "../../../../providers/TodoProvider.Context";
import { EditorMode } from "../../../../definitions";
import { useTodoListStore } from "../../../../stores/store";

export function ChangeBackground() {
  const { backgroundColor, setBackgroundColor, editorMode, getTodo } =
    useTodoContext();
  const { updateTodo } = useTodoListStore();
  const swatchesColor = [
    "#ffffff",
    "#808080",
    "#000000",
    ...DEFAULT_THEME.colors.red.slice(6, 10),
    ...DEFAULT_THEME.colors.pink.slice(6, 10),
    ...DEFAULT_THEME.colors.orange.slice(6, 10),
    ...DEFAULT_THEME.colors.yellow.slice(6, 10),
    ...DEFAULT_THEME.colors.green.slice(6, 10),
    ...DEFAULT_THEME.colors.lime.slice(6, 10),
    ...DEFAULT_THEME.colors.blue.slice(6, 10),
    ...DEFAULT_THEME.colors.violet.slice(6, 10),
    ...DEFAULT_THEME.colors.gray.slice(6, 10),
  ].map((item) => `${item}ff`);
  return (
    <Popover width={320} position="bottom" withArrow shadow="md">
      <Popover.Target>
        <IconPalette size={20} className="cursor-pointer" />
      </Popover.Target>
      <Popover.Dropdown>
        <ColorPicker
          value={backgroundColor}
          format="hexa"
          withPicker={false}
          fullWidth
          swatchesPerRow={8}
          swatches={["#00000000", ...swatchesColor]}
          onChange={(color) => {
            setBackgroundColor(color);
            if (editorMode === EditorMode.VIEWING) {
              const todo = getTodo();
              updateTodo({
                ...todo,
                backgroundColor: color,
              });
            }
          }}
        />
      </Popover.Dropdown>
    </Popover>
  );
}
