import { TextInput } from "@mantine/core";
import { useTodoContext } from "../../../providers/TodoProvider.Context";

export function Title() {
  const { title, setTitle } = useTodoContext();
  return (
    <div className="p-2">
      <TextInput
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        size="lg"
        placeholder="Title"
        bd={0}
        fw={800}
        styles={{
          input: {
            border: "none",
            backgroundColor: "transparent",
          },
        }}
      />
    </div>
  );
}
