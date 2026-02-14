import React, { useState } from 'react';
import CompareForm from '../components/Compare/CompareForm';
import AnnotationView from '../components/Compare/AnnotationView';
import NetworkVenn from '../components/Compare/NetworkVenn';
import { Loader2, AlertCircle } from 'lucide-react';

// 环境感知 API 地址
const API_BASE = import.meta.env.DEV
  ? "http://rnainformatics.cn/SoyGRN/api"
  : "/SoyGRN/api";

export default function Compare() {
  // 状态管理
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // 输入状态
  const [mode, setMode] = useState('tf');
  const [idA, setIdA] = useState('');
  const [idB, setIdB] = useState('');
  
  // 结果状态
  const [result, setResult] = useState(null);

  const handleCompare = async () => {
    // 1. 基础校验
    if (!idA.trim() || !idB.trim()) {
      alert("Please enter both IDs to compare.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // 2. 发起 API 请求
      const params = new URLSearchParams({
        idA: idA.trim(),
        idB: idB.trim(),
        mode: mode // 'tf' or 'target'
      });

      const response = await fetch(`${API_BASE}/compare?${params}`);
      
      if (!response.ok) {
        throw new Error(`Server Error: ${response.status}`);
      }

      const data = await response.json();

      // 3. 设置结果
      setResult(data);

    } catch (err) {
      console.error(err);
      setError("Failed to fetch comparison data. Please check network or ID validity.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // 保持底部的 padding (pb-32)，确保内容不贴底
    <div className="max-w-7xl mx-auto px-4 pt-8 pb-32 space-y-8 animate-in fade-in">
      
      {/* 标题区 */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold font-serif text-slate-900">Comparative Analysis</h1>
        <p className="text-slate-500">
          Visualize conserved and specific regulatory modules via set operations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 左侧：控制面板 */}
        {/* 
            🔴 修改点: 移除了 sticky top-24 z-10
            现在它只是一个普通的 Grid 元素，会跟随页面一起滚动
        */}
        <div className="lg:col-span-1 h-fit">
          <CompareForm 
            mode={mode} setMode={setMode}
            idA={idA} setIdA={setIdA}
            idB={idB} setIdB={setIdB}
            onCompare={handleCompare}
          />
        </div>

        {/* 右侧：结果展示 */}
        <div className="lg:col-span-2 space-y-6 min-h-[500px]">
          
          {/* Loading 状态 */}
          {loading && (
            <div className="flex flex-col items-center justify-center h-64 text-soy-600">
              <Loader2 className="w-10 h-10 animate-spin mb-4"/>
              <p className="font-serif text-lg">Calculating Set Intersections...</p>
            </div>
          )}

          {/* Error 状态 */}
          {error && (
            <div className="p-6 bg-red-50 border border-red-100 rounded-xl flex items-center gap-4 text-red-700">
              <AlertCircle size={24} />
              <div>
                <h4 className="font-bold">Analysis Failed</h4>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Empty State (初始状态) */}
          {!loading && !result && !error && (
            <div className="h-full flex flex-col items-center justify-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 text-slate-400 p-10 min-h-[400px]">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <p>Select inputs on the left to start comparison.</p>
              <p className="text-sm mt-2 opacity-60">Database contains {mode === 'tf' ? 'TFs' : 'Targets'} interactions.</p>
            </div>
          )}

          {/* Success State (结果展示) */}
          {!loading && result && (
            <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
              {/* 1. 基因详情卡片 */}
              <AnnotationView 
                idA={result.idA} 
                idB={result.idB} 
                metaA={result.metaA} 
                metaB={result.metaB} 
              />
              
              {/* 2. 网络韦恩图 */}
              <NetworkVenn 
                idA={result.idA}
                idB={result.idB}
                listA={result.listA}
                listB={result.listB}
                mode={result.mode}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}