import { supabase } from "@/src/lib/supabase";

export type Item = {
  id: string;
  title: string;
  completed: boolean;
  created_at: string;
};

export async function getItems(): Promise<Item[]> {
  const { data, error } = await supabase
    .from("items")
    .select("id,title,completed,created_at")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function createItem(title: string): Promise<Item> {
  const cleanTitle = title.trim();
  if (!cleanTitle) {
    throw new Error("Title is required.");
  }

  const { data, error } = await supabase
    .from("items")
    .insert({ title: cleanTitle })
    .select("id,title,completed,created_at")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateItem(
  id: string,
  completed: boolean
): Promise<Item> {
  const { data, error } = await supabase
    .from("items")
    .update({ completed })
    .eq("id", id)
    .select("id,title,completed,created_at")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteItem(id: string): Promise<void> {
  const { error } = await supabase.from("items").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}
