import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function JBrowseView() {
  // 1. 获取 URL 查询参数
  const [searchParams] = useSearchParams();

  // 2. 计算 iframe src
  const src = useMemo(() => {
    // 基础路径配置 (严格遵循环境策略)
    const JBROWSE_BASE = import.meta.env.DEV
      ? "http://rnainformatics.cn/SoyGRN/api/jbrowse/index.html"
      : "/SoyGRN/api/jbrowse/index.html";
    
    // 基础配置文件路径 (添加时间戳防止缓存)
    const configParams = `config=config.json?v=${Date.now()}`;
    
    // 3. 获取关键参数
    const locationParam = searchParams.get('loc');
    const tracksParam = searchParams.get('tracks') || "gene_models.gff3"; // 默认开启 Gene Models 轨道
    const assemblyParam = "Glycine_max_v2.1"; // 对应 config.json 中的 assemblyName

    // 4. 逻辑分支
    if (locationParam) {
      // --- A. 跳转模式 (From BLAST/Search) ---
      // 当存在 loc 参数时，我们不加载 session，而是直接指定位置和轨道
      // 格式: index.html?config=...&assembly=...&loc=...&tracks=...
      return `${JBROWSE_BASE}?${configParams}&assembly=${assemblyParam}&loc=${encodeURIComponent(locationParam)}&tracks=${encodeURIComponent(tracksParam)}`;
    } else {
      // --- B. 默认模式 (Direct Visit) ---
      // 加载预设的 Session (包含特定的轨道开启状态和视图位置)
      const SESSION_DATA = "encoded-eJyFUl1v4jAQ_CvIzzlKPgiQt2vR0S_1oEXXnqoKGWedWDgxZzvQCPHfu04Q5XqtLm87Ozs7ns2OiJQk5PJmAas_o3k2IB4paQGIPah6CbSc3N91xsBpJW0n6AXxWXAWdPxREoZJ4CN7I2BrSPK8a5XG298_r77PBvML7Nl67ZRuRQlUT6BUBfxCuutoylYnY7J-jGT9dLMdvo_9AGorDXNHRZSpkous0tQKVWI7gxIWhUpBmm7GeYiUVJi1pPWJbp7PZvNxra57H-2cUyPYuB3AXg4iy-1Uw0WzhiTRKPz_zm-faO1f9i8eUZwbsNNXkvQHsUeW6yloV_lxPOr6w8CP_LDfGwwj_2gb0nvIcE9rX8MGtAF8BKfSgIcAv2sv42I3lmpLkp5HoEROPx6GfhxEHqHGQLGU9YE7kTUTzjR9XWyCrn-wxxWrUNxd4-qfsxkwBn1MZZWJxg0ObEWagcViRyZapOdKrQqqV65ugv4LPEZ9ij42CmSPWQvQVLNcMCqb6z6ABGaVPqp9zThKX35FOexp_8yPT-OUgXWh7vb4vQFrPf6Z";
      return `${JBROWSE_BASE}?${configParams}&session=${SESSION_DATA}`;
    }
  }, [searchParams]); // 依赖项加入 searchParams，确保路由参数变化时 iframe 更新

  return (
    <div className="w-full h-[calc(100vh-8rem)] bg-white border rounded-lg shadow-sm border-slate-200 overflow-hidden">
      <iframe 
        src={src} 
        className="w-full h-full border-none" 
        title="SoybeanGRN Genome Browser" 
        allow="fullscreen; clipboard-write" 
      />
    </div>
  );
}