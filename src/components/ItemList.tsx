"use client";

import { Item } from "@/src/lib/api";
import TodoItem from "@/src/components/TodoItem";

type ItemListProps = {
  items: Item[];
  onToggle: (item: Item) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
};

export default function ItemList({ items, onToggle, onDelete }: ItemListProps) {
  return (
    <div>
      <p className="mb-2 text-xs text-zinc-400">共 {items.length} 项</p>
      {items.length === 0 ? (
        <p className="text-sm text-zinc-500">暂无任务，添加一条吧</p>
      ) : (
        <ul className="space-y-2">
          {items.map((item) => (
            <TodoItem key={item.id} item={item} onToggle={onToggle} onDelete={onDelete} />
          ))}
        </ul>
      )}
    </div>
  );
}
