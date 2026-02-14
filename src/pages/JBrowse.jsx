import React from 'react';
import JBrowseView from '../components/JBrowse/JBrowseView';

export default function JBrowse() {
  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* --- 1. 美化后的标题区域 (Header) --- */}
      <div className="text-center">
        {/* 标题：加大字号，使用衬线体(serif)增加学术感 */}
        <h1 className="text-4xl font-bold text-slate-900 font-serif mb-3 tracking-tight">
          JBrowse Genome Viewer
        </h1>
        
        {/* 描述：居中，物种名使用绿色+斜体强调 */}
        <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Interactive visualization of <span className="font-semibold text-emerald-700 italic">Glycine max v2.1</span> genome 
          and gene structure annotations.
        </p>
        
        {/* 装饰性分割线：增加页面层次感 */}
        <div className="w-16 h-1 bg-emerald-500 mx-auto mt-5 rounded-full opacity-80"></div>
      </div>
      
      {/* --- 2. 核心组件区 (带容器美化 & 懒加载保护) --- */}
      {/* 外层容器：添加白底、圆角、阴影和边框，像一个独立的工作台 */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <React.Suspense fallback={
          // Loading 状态也美化一下，匹配整体高度
          <div className="flex flex-col items-center justify-center h-[800px] bg-slate-50 space-y-4">
            <div className="w-12 h-12 border-4 border-slate-200 border-t-emerald-600 rounded-full animate-spin"></div>
            <span className="text-slate-500 font-medium animate-pulse">Initializing Genome Engine...</span>
          </div>
        }>
          <JBrowseView />
        </React.Suspense>
      </div>
      
    </div>
  );
}