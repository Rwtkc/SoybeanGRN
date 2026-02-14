const API_BASE = import.meta.env.DEV
  ? "http://rnainformatics.cn/SoyGRN/api"
  : "/SoyGRN/api";

export async function loadFamilyIndex() {
  try {
    const res = await fetch(`${API_BASE}/browse/families`);
    // 增加更详细的错误日志
    if (!res.ok) {
      const text = await res.text(); // 尝试读取错误信息
      console.error("API Error Response:", text);
      throw new Error(`Failed to fetch families: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Loader Error:", error);
    return {};
  }
}

export async function loadInteractionDetails(tfId) {
  try {
    const params = new URLSearchParams({ tf: tfId });
    const res = await fetch(`${API_BASE}/browse/interactions?${params}`);
    if (!res.ok) throw new Error("Failed to fetch interactions");
    return await res.json();
  } catch (error) {
    console.error(`Loader Error (${tfId}):`, error);
    return [];
  }
}
