// src/utils/annotationLoader.js
export async function loadAnnotations() {
  try {
    // 记得用相对路径 ./ 防止 404
    const res = await fetch("./annotations.json");
    return await res.json();
  } catch (e) {
    console.error("Failed to load annotations", e);
    return {};
  }
}
