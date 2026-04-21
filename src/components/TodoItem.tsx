"use client";

import { useState } from "react";
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
  const [isRippling, setIsRippling] = useState(false);

  function handleToggle() {
    if (!item.completed) {
      setIsRippling(true);
      window.setTimeout(() => setIsRippling(false), 520);
    }
    void onToggle(item);
  }

  return (
    <li className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md">
      {isRippling ? <span className="tidal-ripple" /> : null}
      <div className="flex items-center justify-between">
      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={item.completed}
          onChange={handleToggle}
          aria-label="标记任务为已完成"
          className="h-4 w-4 appearance-none rounded-full border border-white/70 bg-white/10 checked:border-[#8AA79C] checked:bg-[#8AA79C]"
        />
        <span
          className={
            // 完成态使用灰色与删除线，帮助用户快速区分已完成任务。
            item.completed
              ? "text-sm text-white/40 line-through transition-all duration-500"
              : "text-sm text-white/90 transition-all duration-500"
          }
        >
          {item.title}
        </span>
      </label>

      <button
        type="button"
        onClick={() => void onDelete(item.id)}
        className="rounded-full border border-white/15 px-3 py-1 text-[11px] tracking-wide text-white/60 transition hover:bg-white/10"
      >
        删除
      </button>
      </div>
    </li>
  );
}
