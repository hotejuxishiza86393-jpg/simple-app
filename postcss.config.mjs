/**
 * 用途：声明 PostCSS 处理链，启用 Tailwind CSS 的 PostCSS 插件。
 * 参数含义：无（静态配置对象）。
 * 返回值：PostCSS 配置对象，供构建工具在样式编译阶段读取。
 */
const config = {
  plugins: {
    // 启用 Tailwind 的 PostCSS 插件以解析实用类并生成最终样式。
    "@tailwindcss/postcss": {},
  },
};

export default config;
