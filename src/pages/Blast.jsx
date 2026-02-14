import React, { useState } from 'react';
import BlastForm from '../components/Blast/BlastForm';
import BlastResults from '../components/Blast/BlastResults';
import { Activity, Database, FileSearch, Dna, Cpu } from 'lucide-react';

// 环境感知 API 基础路径
const API_BASE = import.meta.env.DEV
  ? "http://rnainformatics.cn/SoyGRN/api" 
  : "/SoyGRN/api";

export default function Blast() {
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [currentProgram, setCurrentProgram] = useState('');

  const handleSearch = async (params) => {
    setIsSearching(true);
    setCurrentProgram(params.program);
    setResults(null);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/blast`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Error ${response.status}: Failed to run BLAST`);
      }

      const data = await response.json();
      const finalResults = {
        ...data,
        program: params.program, 
        queryId: params.sequence.substring(0, 15) + (params.sequence.length > 15 ? "..." : "")
      };
      setResults(finalResults);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pb-20 text-left">
      {/* 标题部分：严格参照 Browse.jsx 样式 */}
      <div className="mb-10 text-center space-y-3">
        <h1 className="text-4xl font-bold font-serif text-slate-900">BLAST Search</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Basic Local Alignment Search Tool against 
          <span className="font-semibold text-soy-700 ml-1">Glycine_max.Glycine_max_v2.1</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
        {/* 左侧：输入表单 */}
        <div className="lg:col-span-1">
             <BlastForm onSearch={handleSearch} isSearching={isSearching} />
        </div>

        {/* 右侧：加载动画/结果展示 */}
        <div className="lg:col-span-2 min-h-[400px]">
          {error && (
            <div className="p-4 mb-6 text-sm text-red-800 rounded-xl bg-red-50 border border-red-100 shadow-sm animate-in fade-in flex items-center gap-2">
               <div className="w-1 h-8 bg-red-500 rounded-full"></div>
               <div>
                  <span className="font-bold block text-sm">Analysis Failed</span>
                  <span className="opacity-80 text-xs font-mono">{error}</span>
               </div>
            </div>
          )}

          {/* 1. 初始空状态 */}
          {!results && !isSearching && !error && (
            <div className="h-[300px] lg:h-[400px] flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 p-6 transition-all group hover:border-soy-200">
              <div className="p-4 bg-white rounded-full shadow-sm mb-4 group-hover:scale-110 transition-transform duration-500">
                <Dna className="w-10 h-10 text-slate-200 group-hover:text-soy-400 transition-colors" />
              </div>
              <h3 className="font-serif font-bold text-slate-600 text-lg mb-1">Awaiting Sequence Input</h3>
              <p className="font-medium text-slate-400 text-center text-xs lg:text-sm max-w-xs">
                Paste your FASTA formatted sequences in the left panel to begin alignment.
              </p>
            </div>
          )}
          
          {/* 2. 加载状态：工程化看板 */}
          {isSearching && (
            <div className="h-[300px] lg:h-[400px] flex flex-col items-center justify-center bg-white border border-slate-100 rounded-2xl shadow-sm relative overflow-hidden">
              {/* 顶部流光条 */}
              <div className="absolute top-0 left-0 w-full h-1 bg-slate-50 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-soy-200 via-soy-500 to-soy-200 w-1/3 animate-[shimmer_2s_infinite_linear]"></div>
              </div>
              
              {/* 核心中央动画 */}
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-soy-100 rounded-full animate-ping opacity-25"></div>
                <div className="relative bg-white p-4 rounded-full border border-soy-100 shadow-sm z-10">
                  <Activity className="w-10 h-10 text-soy-600 animate-[pulse_2s_infinite]" />
                </div>
              </div>

              {/* 状态文字 */}
              <div className="text-center space-y-3">
                <h3 className="text-xl font-serif font-bold text-slate-800 animate-pulse">
                  Running BLAST Alignment...
                </h3>
                
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-soy-700 bg-soy-50 px-3 py-1 rounded-full border border-soy-100 uppercase tracking-widest">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>Engine: {currentProgram || 'BLAST'}</span>
                  </div>
                  <p className="text-slate-400 text-[11px] font-medium flex items-center gap-1.5">
                    <Database className="w-3 h-3" />
                    Querying: <span className="text-slate-600">Glycine_max.Glycine_max_v2.1</span>
                  </p>
                </div>
              </div>

              {/* 底部进度条 */}
              <div className="absolute bottom-10 w-48 h-1 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-soy-500 rounded-full animate-[loading_1.5s_ease-in-out_infinite_alternate] w-1/2"></div>
              </div>
            </div>
          )}

          {results && <BlastResults results={results} />}
        </div>
      </div>
      
      {/* 动画定义 */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
        @keyframes loading {
          0% { transform: translateX(-20%); width: 10%; }
          100% { transform: translateX(120%); width: 60%; }
        }
      `}</style>
    </div>
  );
}