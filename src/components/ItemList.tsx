"use client";

import { Item } from "@/src/lib/api";
import TodoItem from "@/src/components/TodoItem";

type ItemListProps = {
  items: Item[];
  onToggle: (item: Item) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
};

/**
 * 组件职责：承载任务列表区域，负责展示任务总数、空状态与任务项集合。
 * 接收的 props：
 * - items：待展示的任务数组。
 * - onToggle：切换任务完成状态的方法。
 * - onDelete：删除任务的方法。
 * 返回值：React 组件节点。
 */
export default function ItemList({ items, onToggle, onDelete }: ItemListProps) {
  return (
    <div>
      <p className="mb-2 text-xs text-zinc-400">共 {items.length} 项</p>
      {/* 空状态单独展示，帮助用户在初始场景快速理解下一步操作。 */}
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
