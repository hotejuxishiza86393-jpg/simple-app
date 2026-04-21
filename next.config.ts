import type { NextConfig } from "next";

/**
 * 用途：定义 Next.js 构建与运行阶段的全局配置。
 * 参数含义：无（静态配置对象）。
 * 返回值：NextConfig 配置对象，供 Next.js 在启动与打包时读取。
 */
const nextConfig: NextConfig = {
  output: "standalone", // 关键配置：让 Vercel 正确识别 Next.js 输出
};

export default nextConfig;
