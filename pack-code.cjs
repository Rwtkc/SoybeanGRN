const fs = require("fs");
const path = require("path");

// --- 配置区 ---
const OUTPUT_FILE = "project_code.md"; // 输出文件名
const IGNORE_DIRS = ["node_modules", "dist", ".git", "public", ".vscode"]; // 忽略的文件夹
const IGNORE_FILES = [
  "bun.lock",
  ".npmrc",
  "stats.html",
  "project_code.md",
  ".gitignore",
]; // 忽略的具体文件
const ALLOWED_EXTENSIONS = [
  ".js",
  ".ts",
  ".vue",
  ".json",
  ".html",
  ".css",
  ".scss",
  ".config.js",
  ".jsx",
]; // 包含的文件后缀

// 递归遍历函数
function getFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (!IGNORE_DIRS.includes(file)) {
        getFiles(filePath, fileList);
      }
    } else {
      const ext = path.extname(file);
      if (!IGNORE_FILES.includes(file) && ALLOWED_EXTENSIONS.includes(ext)) {
        fileList.push(filePath);
      }
    }
  });
  return fileList;
}

// 主程序
function main() {
  console.log("🚀 开始打包代码...");
  const allFiles = getFiles(".");
  let markdownContent = `# SoyGRN_web 项目代码导出\n\n生成时间: ${new Date().toLocaleString()}\n\n---\n\n`;

  allFiles.forEach((file) => {
    const relativePath = path.relative(".", file);
    const content = fs.readFileSync(file, "utf-8");
    const ext = path.extname(file).slice(1) || "text";

    markdownContent += `## 文件: ${relativePath}\n\n`;
    markdownContent += `\`\`\`${ext}\n${content}\n\`\`\`\n\n---\n\n`;
    console.log(`✅ 已添加: ${relativePath}`);
  });

  fs.writeFileSync(OUTPUT_FILE, markdownContent);
  console.log(`\n🎉 打包完成！生成文件: ${OUTPUT_FILE}`);
}

main();
