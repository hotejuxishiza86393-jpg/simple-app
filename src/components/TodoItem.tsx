"use client";

import { Item } from "@/src/lib/api";

type TodoItemProps = {
  item: Item;
  onToggle: (item: Item) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
};

/**
 * 组件职责：渲染单个任务条目，并提供完成状态切换与删除入口。
 * 接收的 props：
 * - item：当前任务数据。
 * - onToggle：切换当前任务完成状态的方法。
 * - onDelete：删除当前任务的方法。
 * 返回值：React 组件节点。
 */
export default function TodoItem({ item, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className="flex items-center justify-between rounded-[8px] border border-zinc-200 bg-white px-3 py-2">
      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={item.completed}
          onChange={() => void onToggle(item)}
          aria-label="标记任务为已完成"
          className="h-4 w-4"
        />
        <span
          className={
            // 完成态使用灰色与删除线，帮助用户快速区分已完成任务。
            item.completed ? "text-sm text-zinc-400 line-through" : "text-sm text-zinc-800"
          }
        >
          {item.title}
        </span>
      </label>

      <button
        type="button"
        onClick={() => void onDelete(item.id)}
        className="rounded-[8px] border border-zinc-200 px-2 py-1 text-xs text-zinc-600"
      >
        删除
      </button>
    </li>
  );
}
