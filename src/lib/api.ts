import { supabase } from "@/src/lib/supabase";

export type Item = {
  id: string;
  title: string;
  completed: boolean;
  created_at: string;
};

/**
 * 用途：获取任务列表并按创建时间倒序返回。
 * 参数含义：无。
 * 返回值：Promise<Item[]>，解析为任务数组。
 */
export async function getItems(): Promise<Item[]> {
  // 查询 items 表的核心字段并按时间倒序展示；RLS 需允许当前匿名角色执行 SELECT。
  const { data, error } = await supabase
    .from("items")
    .select("id,title,completed,created_at")
    .order("created_at", { ascending: false });

  // 统一抛出错误，交由上层页面决定如何提示用户。
  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

/**
 * 用途：创建一条新任务记录。
 * 参数含义：
 * - title：任务标题字符串。
 * 返回值：Promise<Item>，解析为新创建的任务对象。
 */
export async function createItem(title: string): Promise<Item> {
  const cleanTitle = title.trim();
  // 在数据层再做一次空值校验，避免非法标题写入数据库。
  if (!cleanTitle) {
    throw new Error("Title is required.");
  }

  // 向 items 表执行 INSERT 并返回新行；RLS 需允许当前匿名角色执行 INSERT 与 SELECT 返回。
  const { data, error } = await supabase
    .from("items")
    .insert({ title: cleanTitle })
    .select("id,title,completed,created_at")
    .single();

  // 统一抛出错误，便于调用方集中处理异常显示。
  if (error) {
    throw new Error(error.message);
  }

  return data;
}

/**
 * 用途：更新指定任务的完成状态。
 * 参数含义：
 * - id：目标任务主键。
 * - completed：更新后的完成状态。
 * 返回值：Promise<Item>，解析为更新后的任务对象。
 */
export async function updateItem(
  id: string,
  completed: boolean
): Promise<Item> {
  // 对 items 表按 id 执行 UPDATE 并返回最新行；RLS 需允许当前匿名角色执行 UPDATE 与 SELECT 返回。
  const { data, error } = await supabase
    .from("items")
    .update({ completed })
    .eq("id", id)
    .select("id,title,completed,created_at")
    .single();

  // 抛出底层错误，保持 API 行为一致。
  if (error) {
    throw new Error(error.message);
  }

  return data;
}

/**
 * 用途：删除指定任务。
 * 参数含义：
 * - id：目标任务主键。
 * 返回值：Promise<void>，删除成功后无返回数据。
 */
export async function deleteItem(id: string): Promise<void> {
  // 对 items 表按 id 执行 DELETE；RLS 需允许当前匿名角色删除目标行。
  const { error } = await supabase.from("items").delete().eq("id", id);

  // 统一错误出口，便于上层复用处理逻辑。
  if (error) {
    throw new Error(error.message);
  }
}
