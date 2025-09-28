export enum EditorMode {
  INITIAL = "INITIAL",
  EDITING = "EDITING",
  VIEWING = "VIEWING",
}

export enum ItemMode {
  VIEWING = "VIEWING",
  EDITING = "EDITING",
}

export type Item = {
  id: string;
  mode: ItemMode;
  checked: boolean;
  content: string;
};

export type Todo = {
  id: string;
  mode: EditorMode;
  title: string;
  items: Item[];
  backgroundColor: string | null;
  textColor: string | null;
  tags: string[];
};

export type TodoList = Todo[];
