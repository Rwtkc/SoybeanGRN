/**
 * 解析 TF-Target 文本数据的工具函数
 * 采用 Map 数据结构以支持 O(1) 复杂度的快速查找
 */

export async function loadAndParseNetworkData(url) {
  try {
    const response = await fetch(url);
    const text = await response.text();

    // 初始化两个索引 Map
    // Map<String, Array<String>>
    const tfToTargets = new Map();
    const targetToTFs = new Map();

    const lines = text.split("\n");

    // 使用 for 循环比 forEach 性能略好，适合处理大数组
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue; // 跳过空行

      // 分割每行数据
      const [tf, target] = line.split("\t");

      if (tf && target) {
        // 1. 构建 TF -> Target 索引
        if (!tfToTargets.has(tf)) {
          tfToTargets.set(tf, []);
        }
        tfToTargets.get(tf).push(target);

        // 2. 构建 Target -> TF 索引
        if (!targetToTFs.has(target)) {
          targetToTFs.set(target, []);
        }
        targetToTFs.get(target).push(tf);
      }
    }

    return { tfToTargets, targetToTFs, totalLines: lines.length };
  } catch (error) {
    console.error("Failed to load network data:", error);
    return { tfToTargets: new Map(), targetToTFs: new Map(), totalLines: 0 };
  }
}
