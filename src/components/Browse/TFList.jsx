import React from 'react';
import { Dna, ArrowLeft } from 'lucide-react';

export default function TFList({ family, tfs, onSelectTF, onBack }) {
  return (
    // 修改：移除了动画类名
    <div className="space-y-6">
      
      {/* 顶部导航区 */}
      <div>
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-600 font-medium hover:border-soy-500 hover:text-soy-700 hover:bg-soy-50 transition-all shadow-sm"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
          Back to Families
        </button>
      </div>

      {/* 内容卡片区 */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
        <h2 className="text-3xl font-bold font-serif text-slate-800 mb-8 flex items-center gap-3">
          <span className="bg-soy-100 text-soy-800 px-4 py-1.5 rounded-xl text-xl border border-soy-200">
            {family}
          </span>
          <span className="text-slate-700">Family Members</span>
        </h2>

        {/* 成员列表网格 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {tfs.map((tf) => (
            <button
              key={tf}
              onClick={() => onSelectTF(tf)}
              className="group flex items-center gap-3 p-4 text-left border border-slate-100 rounded-xl hover:border-soy-300 hover:bg-soy-50 hover:shadow-md transition-all duration-200 bg-slate-50/50"
            >
              <div className="w-10 h-10 bg-white text-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                <Dna size={18} />
              </div>
              <span className="font-mono text-sm font-semibold text-slate-600 group-hover:text-soy-800 transition-colors">
                {tf}
              </span>
            </button>
          ))}
        </div>
        
        {/* 底部数量统计 */}
        <div className="mt-8 pt-4 border-t border-slate-100 text-right text-xs text-slate-400">
          Total {tfs.length} transcription factors
        </div>
      </div>
    </div>
  );
}