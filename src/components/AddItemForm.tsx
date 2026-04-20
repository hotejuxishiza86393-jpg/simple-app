"use client";

import { FormEvent, useState } from "react";

type AddItemFormProps = {
  onAdd: (title: string) => Promise<void>;
};

const TITLE_MAX_LENGTH = 100;

export default function AddItemForm({ onAdd }: AddItemFormProps) {
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanTitle = title.trim();
    if (!cleanTitle) return;

    setIsSubmitting(true);
    try {
      await onAdd(cleanTitle);
      setTitle("");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="mb-4 flex gap-2" onSubmit={handleSubmit}>
      <input
        value={title}
        maxLength={TITLE_MAX_LENGTH}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="输入新任务…"
        className="flex-1 rounded-[8px] border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-500"
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-[8px] border border-zinc-300 bg-white px-3 py-2 text-sm disabled:opacity-60"
      >
        添加
      </button>
    </form>
  );
}
