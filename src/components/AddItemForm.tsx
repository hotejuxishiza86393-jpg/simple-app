"use client";

import { FormEvent, useState } from "react";

type AddItemFormProps = {
  onAdd: (title: string) => Promise<void>;
};

const TITLE_MAX_LENGTH = 100;

/**
 * 组件职责：提供任务输入与提交入口，并在提交完成后清空输入框。
 * 接收的 props：
 * - onAdd：由父组件传入的异步新增任务方法，参数为任务标题。
 * 返回值：React 组件节点。
 */
export default function AddItemForm({ onAdd }: AddItemFormProps) {
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * 用途：处理表单提交，校验标题后触发新增任务请求。
   * 参数含义：
   * - event：表单提交事件对象，用于阻止浏览器默认刷新行为。
   * 返回值：Promise<void>，异步完成后不返回具体数据。
   */
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanTitle = title.trim();
    // 这里先做空值拦截，避免向上层提交无效任务标题。
    if (!cleanTitle) return;

    setIsSubmitting(true);
    try {
      // 交由父组件统一处理数据层新增与错误逻辑。
      await onAdd(cleanTitle);
      // 提交成功后清空输入框，减少重复手动删除输入的操作。
      setTitle("");
    } finally {
      // 无论成功或失败都恢复按钮可点击状态，避免界面卡死。
      setIsSubmitting(false);
    }
  }

  return (
    <form className="mb-10 flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-3 py-3 backdrop-blur-md" onSubmit={handleSubmit}>
      <input
        value={title}
        maxLength={TITLE_MAX_LENGTH}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="输入新任务…"
        className="flex-1 bg-transparent px-2 py-2 text-sm text-white/90 placeholder:text-white/50 outline-none"
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="tidal-fab rounded-full border border-white/20 bg-[#8AA79C]/90 px-5 py-2 text-sm text-white shadow-lg shadow-black/20 transition-transform active:scale-95 disabled:opacity-60"
      >
        添加
      </button>
    </form>
  );
}
