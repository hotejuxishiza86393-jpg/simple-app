import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// 从公开环境变量读取 Supabase 项目地址与匿名密钥，用于前端受限访问。
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// 启动时立即校验关键配置，避免请求阶段才暴露错误。
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase env vars: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY"
  );
}

// 在全局类型上声明缓存字段，用于开发环境热更新时复用客户端实例。
declare global {
  var __supabaseClient__: SupabaseClient | undefined;
}

// 复用单例客户端，避免开发模式下重复创建连接导致资源浪费与行为不一致。
export const supabase =
  globalThis.__supabaseClient__ ??
  createClient(supabaseUrl, supabaseAnonKey);

// 仅在非生产环境写回全局缓存，生产环境保持无副作用初始化。
if (process.env.NODE_ENV !== "production") {
  globalThis.__supabaseClient__ = supabase;
}
