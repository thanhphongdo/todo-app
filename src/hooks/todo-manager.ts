import { useEffect, useRef, useState } from "react";
import { EditorMode, Item, ItemMode, Todo } from "../definitions";
import { v4 } from "uuid";
import { useTodoListStore } from "../stores/store";

export function useTodoManager({ initialTodo }: { initialTodo?: Todo }) {
  const { addTodo } = useTodoListStore();
  const [id, setId] = useState<string>(v4());
  const [editorMode, setEditorMode] = useState<EditorMode>(EditorMode.INITIAL);
  const [title, setTitle] = useState<string>("");
  const [itemIds, setItemIds] = useState<string[]>([]);
  const [itemsMap, setItemsMap] = useState<Map<string, Item>>(new Map());
  const [backgroundColor, setBackgroundColor] = useState<string>("#00000000");
  const [tags, setTags] = useState<string[]>([]);

  const textAreaRefs = useRef<
    Map<string, React.RefObject<HTMLTextAreaElement | null>>
  >(new Map());

  useEffect(() => {
    if (initialTodo) {
      setId(initialTodo.id);
      setEditorMode(initialTodo.mode);
      setTitle(initialTodo.title);
      setItemIds(initialTodo.items.map((i) => i.id));
      setItemsMap(
        new Map(initialTodo.items.map((i) => [i.id, { ...i, mode: i.mode }]))
      );
      setTags(initialTodo.tags);
      setBackgroundColor(initialTodo.backgroundColor || "#00000000");
    }
  }, [initialTodo]);

  const addNewItem = (afterId?: string) => {
    const itemId = v4();
    setItemIds((prev) => {
      if (afterId) {
        return [
          ...prev.slice(0, prev.indexOf(afterId) + 1),
          itemId,
          ...prev.slice(prev.indexOf(afterId) + 1),
        ];
      }
      return [...prev, itemId];
    });
    setItemsMap((prev) =>
      prev.set(itemId, {
        id: itemId,
        content: "",
        mode: ItemMode.EDITING,
        checked: false,
      })
    );
    setTimeout(() => {
      textAreaRefs.current.get(itemId)?.current?.focus();
    }, 0);
    return itemId;
  };

  const removeItem = (id: string) => {
    setItemIds(itemIds.filter((itemId) => itemId !== id));
    setItemsMap((prev) => {
      prev.delete(id);
      return prev;
    });
  };

  const registerTextAreaRef = (
    id: string,
    ref: React.RefObject<HTMLTextAreaElement | null>
  ) => {
    textAreaRefs.current.set(id, ref);
  };

  const getItems = () => {
    return itemIds.map((id) => itemsMap.get(id));
  };

  const getUncheckedItems = () => {
    return itemIds
      .map((id) => itemsMap.get(id))
      .filter((item) => !item?.checked);
  };

  const getCheckedItems = () => {
    return itemIds
      .map((id) => itemsMap.get(id))
      .filter((item) => item?.checked);
  };

  const updateItem = (id: string, item: Item) => {
    setItemsMap((prev) => {
      const newMap = new Map(prev);
      newMap.set(id, item);
      return newMap;
    });
  };

  const getTodo = () => {
    const todo: Todo = {
      id,
      mode: editorMode,
      title,
      items: Array.from(itemsMap.values()),
      tags,
      backgroundColor,
    };
    return todo;
  };

  const close = () => {
    setId(v4());
    setEditorMode(EditorMode.INITIAL);
    setTitle("");
    setItemIds([]);
    setItemsMap(new Map());
    setBackgroundColor("#00000000");
    setTags([]);
  };
  const save = () => {
    const todo = getTodo();
    addTodo({
      ...todo,
      mode: EditorMode.VIEWING,
      items: todo.items.map((item) => {
        return {
          ...item,
          mode: ItemMode.VIEWING,
        };
      }),
    });
    close();
  };

  return {
    id,
    editorMode,
    setEditorMode,
    title,
    setTitle,
    itemIds,
    setItemIds,
    itemsMap,
    setItemsMap,
    backgroundColor,
    setBackgroundColor,
    tags,
    setTags,
    textAreaRefs,
    getItems,
    getUncheckedItems,
    getCheckedItems,
    addNewItem,
    removeItem,
    registerTextAreaRef,
    updateItem,
    getTodo,
    save,
    close,
  };
}
