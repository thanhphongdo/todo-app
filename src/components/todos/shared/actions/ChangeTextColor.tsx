import { ColorPicker, DEFAULT_THEME, Popover, Text } from "@mantine/core";
import { IconBaseline } from "@tabler/icons-react";
import { useTodoContext } from "../../../../providers/editor/TodoProvider.Context";
import { EditorMode } from "../../../../definitions";
import { useTodoListStore } from "../../../../stores/store";

export function ChangeTextColor() {
  const { textColor, setTextColor, editorMode, getTodo } = useTodoContext();
  const { updateTodo } = useTodoListStore();
  const swatchesColor = [
    "#ffffff",
    "#808080",
    "#000001",
    ...DEFAULT_THEME.colors.red.slice(0, 4),
    ...DEFAULT_THEME.colors.pink.slice(0, 4),
    ...DEFAULT_THEME.colors.orange.slice(0, 4),
    ...DEFAULT_THEME.colors.yellow.slice(0, 4),
    ...DEFAULT_THEME.colors.green.slice(0, 4),
    ...DEFAULT_THEME.colors.lime.slice(0, 4),
    ...DEFAULT_THEME.colors.blue.slice(0, 4),
    ...DEFAULT_THEME.colors.violet.slice(0, 4),
    ...DEFAULT_THEME.colors.gray.slice(0, 4),
  ].map((item) => `${item}ff`);
  return (
    <Popover width={320} position="bottom" withArrow shadow="md">
      <Popover.Target>
        <IconBaseline size={20} className="cursor-pointer" />
      </Popover.Target>
      <Popover.Dropdown>
        <ColorPicker
          value={textColor}
          format="hexa"
          withPicker={false}
          fullWidth
          swatchesPerRow={8}
          swatches={["#00000000", ...swatchesColor]}
          onChange={(color) => {
            if (color === "#000000ff") {
              return;
            }
            setTextColor(color);
            if (editorMode === EditorMode.VIEWING) {
              const todo = getTodo();
              updateTodo({
                ...todo,
                textColor: color,
              });
            }
          }}
        />
      </Popover.Dropdown>
    </Popover>
  );
}
