import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

/**
 * 用途：组合项目的 ESLint 规则集与忽略规则。
 * 参数含义：通过数组依次传入 Next.js 推荐规则与全局忽略配置。
 * 返回值：ESLint 最终生效的扁平配置对象。
 */
const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // 覆盖 eslint-config-next 的默认忽略列表，确保忽略范围可读且可维护。
  globalIgnores([
    // 这些目录与文件是构建产物或自动生成文件，不需要参与 lint。
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
