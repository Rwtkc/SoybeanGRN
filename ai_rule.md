🛠️ SoyGRN 项目 AI 协作与开发规范指南 (V2 - 增强版)

1. 项目概况 🧬
   SoyGRN 是一个专门用于大豆基因调控网络（Soybean Gene Regulatory Network）可视化与分析的系统。

前端: React + JavaScript (Vite 构建)，涉及 D3.js/ECharts 绘图。

后端: Node.js (Express) + SQLite3。

2. 数据库层规范 (重点补充) 🗄️
   后端核心逻辑高度依赖 db.sqlite，AI 在修改后端时必须遵循以下规则：

核心数据库架构
引擎: SQLite3 (使用 sqlite3 驱动)。

性能配置: 必须开启 WAL 模式 (PRAGMA journal_mode = WAL;) 以支持高并发读写。

核心表结构:

SoyGRN_families: 存储家族索引 (family_name, tf_id)。

SoyGRN_interactions: 存储详细调控证据 (含 scRNA_Score, DAP-seq 等 10+ 个维度)。

SoyGRN_compare_interactions: 用于快速比对的“瘦表”。

SoyGRN_compare_metadata: 存储基因注释、GO、Location 等详细信息。

SoyGRN_search_data: 用于全局搜索的索引表。

数据导入逻辑 (import\_\*.js)
所有导入脚本均采用 事务 (BEGIN TRANSACTION) 模式以保证百万级数据入库性能。

AI 严禁随意更改现有的字段分隔符（通常为 \t）或表索引策略。

3. AI 交互核心准则 (严格执行) ⚠️
   准则项目 详细描述与执行标准
   完整代码输出 必须提供修改后文件的完整源码。严禁使用 // ... 缩减代码。
   指令范围控制 禁止擅自修改当前指令以外的功能。禁止添加任何未经授权的新特性或 API 路由。
   UI/UX 一致性 严格遵循 index.css 定义。样式、边距、圆角（通常为 rounded-xl）必须与现有学术风格高度统一。
   环境与语法 前端：ESM (import)；后端：CommonJS (require)。

4. 技术栈细节 🏗️
   💻 前端 (Frontend)
   路由: React Router (HashRouter)，支持通过 URL 参数 (?q=, ?loc=) 跨页面联动。

可视化:

ECharts: 用于 Network 和 Venn 图。

JBrowse: 通过 iframe 嵌入，后端提供 API 支持 Range 请求。

⚙️ 后端 (Backend)
API 设计: 统一使用 /api/ 前缀。

中间件: 必须处理跨域 (CORS) 及 JBrowse 所需的 Range 请求头。

文件处理: data/ 目录仅作为原始 TXT 存放地，生产环境查询必须通过 SQLite 索引。

5. 开发任务提问模板 (推荐) 📝
   当前任务: [描述需求]
   参考代码: [发送 project_code.md 和 backend_code_summary.md]
   开发约束:

修改后端逻辑时，请务必考虑对 db.sqlite 的影响。

如果涉及数据表变更，请同步更新 import\_\*.js 导入脚本。

必须提供修改后文件的 100% 完整代码。

严禁修改网页现有的学术绿色调样式。
