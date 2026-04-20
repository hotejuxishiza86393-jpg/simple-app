import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", // 关键配置：让 Vercel 正确识别 Next.js 输出
};

export default nextConfig;
