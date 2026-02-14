import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'; // 路由参数钩子
import SearchForm from '../components/Search/SearchForm';
import ResultTable from '../components/Search/ResultTable';
import { Loader2 } from 'lucide-react';

export default function SearchPage() {
  // --- 1. 获取 URL 参数 ---
  const [searchParams, setSearchParams] = useSearchParams();
  
  // --- 2. 状态初始化 (优先使用 URL 参数) ---
  // 如果 URL 是 /search?q=GmbZIP123&type=tf，则自动填入
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [searchType, setSearchType] = useState(searchParams.get('type') || 'tf');
  
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // --- 3. 环境感知 API 地址 ---
  const API_BASE = import.meta.env.DEV 
    ? "http://rnainformatics.cn/SoyGRN/api" 
    : "/SoyGRN/api";

  // --- 4. 核心逻辑：监听状态变化并搜索 ---
  useEffect(() => {
    // 如果搜索框为空，清空结果
    if (!query.trim()) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    // 防抖定时器 (500ms)
    const timer = setTimeout(async () => {
      try {
        // 构造请求 URL
        const url = `${API_BASE}/search?q=${encodeURIComponent(query)}&type=${searchType}`;
        console.log("正在请求 API:", url);

        const res = await fetch(url);
        
        // 检查返回类型 (防止 404 HTML 页面导致 JSON 解析崩溃)
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("text/html")) {
            throw new Error("Received HTML instead of JSON. Check API path.");
        }

        if (!res.ok) throw new Error(`Network error: ${res.status}`);
        
        const data = await res.json();
        setResults(data.results || []);
        
      } catch (error) {
        console.error("Search API Error:", error);
        setResults([]); 
      } finally {
        setIsSearching(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query, searchType]); // 依赖项：只要 query 或 searchType 改变，就触发

  // --- 5. 处理类型切换 ---
  // 当用户在当前页面手动切换 Radio 时，我们更新状态
  const handleTypeChange = (newType) => {
    setSearchType(newType);
    setQuery(''); // 切换类型时清空关键词，避免逻辑混淆
    setResults([]);
    
    // 可选：静默更新 URL，这样用户刷新页面时状态保留 (不推入历史记录)
    setSearchParams({ type: newType, q: '' }, { replace: true });
  };

  // --- 6. 处理输入框变化 ---
  const handleSearchChange = (newVal) => {
    setQuery(newVal);
    // 可选：实时更新 URL q 参数
    // setSearchParams({ type: searchType, q: newVal }, { replace: true });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold font-serif text-slate-900">Search Regulatory Network</h1>
        <p className="text-slate-500">
          Query the interaction database by Transcription Factor or Target Gene ID.
        </p>
      </div>

      <SearchForm 
        searchTerm={query}
        onSearchChange={handleSearchChange}
        searchType={searchType}
        onTypeChange={handleTypeChange}
      />

      {isSearching ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
          <Loader2 className="w-8 h-8 text-soy-600 animate-spin" />
          <p className="text-sm text-slate-500">Searching database...</p>
        </div>
      ) : (
        <ResultTable 
          results={results}
          query={query}
          type={searchType}
        />
      )}
    </div>
  );
}