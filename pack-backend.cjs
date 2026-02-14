const fs = require("fs");
const path = require("path");

// --- 配置区 ---
const OUTPUT_FILE = "backend_code_summary.md";
const IGNORE_DIRS = ["node_modules", "jbrowse_web", ".git", ".vscode"];
const IGNORE_FILES = [
  OUTPUT_FILE,
  "pack-backend.cjs",
  ".gitignore",
  "pnpm-lock.yaml",
  "package-lock.json",
];

// 需要读取内容的文件类型
const CONTENT_EXTENSIONS = [".js", ".json", ".cjs", ".mjs"];

/**
 * 递归处理目录
 */
function processDirectory(dir, markdownContent = "") {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const relativePath = path.relative(".", filePath);
    const stat = fs.statSync(filePath);

    // 1. 忽略特定文件夹
    if (stat.isDirectory()) {
      if (IGNORE_DIRS.includes(file)) return;

      // 2. 特殊处理 data 文件夹：只打印目录结构
      if (file === "data") {
        console.log(`📂 正在罗列 data 目录结构...`);
        const dataItems = fs.readdirSync(filePath);
        markdownContent += `## 📁 目录: ${relativePath} (仅列出文件清单)\n\n`;
        if (dataItems.length > 0) {
          markdownContent +=
            dataItems.map((item) => `- ${item}`).join("\n") + "\n\n";
        } else {
          markdownContent += `*(空目录)*\n\n`;
        }
        markdownContent += `---\n\n`;
        return; // 不再递归进入 data 内部读取内容
      }

      // 3. 递归处理其他文件夹
      markdownContent = processDirectory(filePath, markdownContent);
    } else {
      // 4. 处理文件
      if (IGNORE_FILES.includes(file)) return;

      const ext = path.extname(file).toLowerCase();

      if (CONTENT_EXTENSIONS.includes(ext)) {
        // 读取 JS 和 JSON 内容
        try {
          const content = fs.readFileSync(filePath, "utf-8");
          markdownContent += `## 📄 文件内容: ${relativePath}\n\n`;
          markdownContent += `\`\`\`${
            ext.slice(1) || "text"
          }\n${content}\n\`\`\`\n\n`;
          console.log(`✅ 已读取内容: ${relativePath}`);
        } catch (err) {
          markdownContent += `## 📄 文件: ${relativePath} (读取失败)\n\n`;
        }
      } else {
        // 其他文件只保留名字
        markdownContent += `## 📝 文件占位: ${relativePath} (仅保留文件名)\n\n`;
        console.log(`💡 仅记录名称: ${relativePath}`);
      }
      markdownContent += `---\n\n`;
    }
  });

  return markdownContent;
}

// 主程序
function main() {
  console.log("🚀 开始打包后端项目...");

  let finalMarkdown = `# 后端项目源码汇总\n\n> 生成时间: ${new Date().toLocaleString()}\n\n---\n\n`;

  finalMarkdown = processDirectory(".", finalMarkdown);

  fs.writeFileSync(OUTPUT_FILE, finalMarkdown);

  console.log(`\n🎉 打包完成！`);
  console.log(`💾 输出文件: ${OUTPUT_FILE}`);
}

main();
