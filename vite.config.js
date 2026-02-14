import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  base: "./",
  plugins: [
    react(),
    tailwindcss(),
    visualizer({
      open: false,
      gzipSize: true,
      filename: "stats.html",
    }),
  ],
  // 使用内置的 esbuild 进行优化，无需额外安装 terser
  esbuild: {
    // 同样可以实现丢弃 console 和 debugger
    drop: ["console", "debugger"],
  },
  build: {
    chunkSizeWarningLimit: 2000, // 调高阈值，因为合并后的 ECharts 包较大
    rollupOptions: {
      output: {
        // 优化后的分块策略，解决初始化顺序导致的 TDZ (暂时性死区) 错误
        manualChunks(id) {
          if (id.includes("node_modules")) {
            // 【核心修改】：将 echarts、zrender 以及包装层 echarts-for-react 强制打包在一起
            // 这能确保 ECharts 在被 React 组件引用前已经完全初始化
            if (
              id.includes("echarts") ||
              id.includes("zrender") ||
              id.includes("echarts-for-react")
            ) {
              return "vendor-echarts";
            }

            // D3 库相对独立，可以继续保持独立分包
            if (id.includes("d3")) {
              return "vendor-d3";
            }

            // 其他基础库（React、Lucide 等）合并，确保加载逻辑简单化
            return "vendor-base";
          }
        },
      },
    },
  },
});
