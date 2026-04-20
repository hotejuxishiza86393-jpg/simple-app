"use client";

import { Item } from "@/src/lib/api";
import TodoItem from "@/src/components/TodoItem";

type ItemListProps = {
  items: Item[];
  onToggle: (item: Item) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
};

export default function ItemList({ items, onToggle, onDelete }: ItemListProps) {
  if (items.length === 0) {
    return <p className="text-sm text-zinc-500">No items yet.</p>;
  }

  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <TodoItem key={item.id} item={item} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
}
