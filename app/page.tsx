"use client";

import { useEffect, useState } from "react";
import { useRef } from "react";
import AddItemForm from "@/src/components/AddItemForm";
import ItemList from "@/src/components/ItemList";
import {
  createItem,
  deleteItem,
  getItems,
  Item,
  updateItem,
} from "@/src/lib/api";

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const touchStartYRef = useRef<number | null>(null);
  const isPullingRef = useRef(false);

  async function loadItems() {
    const data = await getItems();
    setItems(data);
  }

  useEffect(() => {
    async function load() {
      try {
        await loadItems();
      } catch (err) {
        setError(err instanceof Error ? err.message : "加载任务失败。");
      } finally {
        setIsLoading(false);
      }
    }

    void load();
  }, []);

  async function refreshItems() {
    setError(null);
    setIsRefreshing(true);
    try {
      await loadItems();
    } catch (err) {
      setError(err instanceof Error ? err.message : "刷新任务失败。");
    } finally {
      setIsRefreshing(false);
    }
  }

  function handleTouchStart(event: React.TouchEvent<HTMLElement>) {
    if (window.scrollY > 0) return;
    touchStartYRef.current = event.touches[0]?.clientY ?? null;
    isPullingRef.current = true;
  }

  function handleTouchMove(event: React.TouchEvent<HTMLElement>) {
    if (!isPullingRef.current || touchStartYRef.current === null) return;
    const currentY = event.touches[0]?.clientY ?? touchStartYRef.current;
    const delta = Math.max(0, currentY - touchStartYRef.current);
    const cappedDelta = Math.min(delta, 120);
    setPullDistance(cappedDelta);
  }

  function handleTouchEnd() {
    const shouldRefresh = pullDistance >= 70;
    setPullDistance(0);
    touchStartYRef.current = null;
    isPullingRef.current = false;
    if (shouldRefresh && !isRefreshing) {
      void refreshItems();
    }
  }

  async function handleAdd(title: string) {
    setError(null);
    try {
      const newItem = await createItem(title);
      setItems((prev) => [newItem, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "添加任务失败。");
    }
  }

  async function handleToggle(item: Item) {
    setError(null);
    try {
      const updated = await updateItem(item.id, !item.completed);
      setItems((prev) => prev.map((current) => (current.id === item.id ? updated : current)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "更新任务失败。");
    }
  }

  async function handleDelete(id: string) {
    setError(null);
    try {
      await deleteItem(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "删除任务失败。");
    }
  }

  return (
    <main
      className="min-h-screen bg-white px-4 py-10 font-sans"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="mx-auto w-full max-w-xl">
        <div
          className="mb-3 h-5 text-center text-xs text-zinc-400 transition-all"
          style={{ opacity: pullDistance > 0 || isRefreshing ? 1 : 0 }}
        >
          {isRefreshing
            ? "刷新中..."
            : pullDistance >= 70
              ? "松开即可刷新"
              : "下拉刷新"}
        </div>
        <h1 className="mb-4 text-2xl text-zinc-900">极简待办</h1>
        <AddItemForm onAdd={handleAdd} />
        {error ? (
          <p className="mb-3 rounded-[8px] border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </p>
        ) : null}
        {isLoading ? (
          <p className="text-sm text-zinc-500">加载中...</p>
        ) : (
          <ItemList items={items} onToggle={handleToggle} onDelete={handleDelete} />
        )}
      </div>
    </main>
  );
}
