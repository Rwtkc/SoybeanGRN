import React, { useState, useRef, useEffect } from 'react';
import { Database, Download, FileText, FileSpreadsheet, ChevronDown } from 'lucide-react';

export default function ResultTable({ results, query, type }) {
  const [showExportMenu, setShowExportMenu] = useState(false);
  const menuRef = useRef(null);

  // --- 点击外部关闭 ---
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowExportMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef]);

  // --- 导出逻辑 ---
  const handleExport = (format) => {
    if (!results || results.length === 0) return;

    const isCsv = format === 'csv';
    const separator = isCsv ? ',' : '\t';
    const mimeType = isCsv ? 'text/csv;charset=utf-8;' : 'text/plain;charset=utf-8;';
    const extension = isCsv ? '.csv' : '.txt';

    const sourceTitle = type === 'tf' ? 'Transcription Factor' : 'Transcription Factor (Regulator)';
    const targetTitle = type === 'tf' ? 'Target Gene' : 'Target Gene (Query)';
    const headers = [sourceTitle, targetTitle, 'Interaction Type'].join(separator);

    const rows = results.map(item => {
      const tf = type === 'tf' ? query : item;
      const target = type === 'target' ? query : item;
      const interaction = 'Putative Binding';
      return [tf, target, interaction].join(separator);
    });

    const content = [headers, ...rows].join('\n');
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    const timestamp = new Date().toISOString().slice(0, 10);
    link.href = url;
    link.setAttribute('download', `SoyGRN_Results_${query}_${timestamp}${extension}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setShowExportMenu(false);
  };

  // --- 空状态处理 ---
  if (!query) {
    return (
      <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200 animate-in fade-in duration-500">
        <Database className="w-10 h-10 text-slate-300 mx-auto mb-3" />
        <p className="text-slate-500">Enter a gene ID above to start searching</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-2xl border border-slate-100 shadow-sm animate-in fade-in duration-500">
        <p className="text-lg text-slate-700 font-medium">No results found for "{query}"</p>
        <p className="text-slate-500 text-sm mt-1">Try checking your spelling or the gene ID format.</p>
      </div>
    );
  }

  const sourceTitle = type === 'tf' ? 'Transcription Factor (Query)' : 'Transcription Factor (Regulator)';
  const targetTitle = type === 'tf' ? 'Target Gene (Regulated)' : 'Target Gene (Query)';

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
      
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 rounded-t-2xl">
        <h3 className="font-bold text-slate-700 flex items-center gap-2">
          Search Results
          <span className="bg-soy-100 text-soy-700 px-2 py-0.5 rounded-full text-xs font-mono">
            {results.length} Found
          </span>
        </h3>

        {/* Export Dropdown Wrapper */}
        {/* 修改：添加 min-w-[100px] 保证按钮和下拉菜单有一个舒适的最小宽度 */}
        <div className="relative min-w-[110px]" ref={menuRef}>
          <button 
            onClick={() => setShowExportMenu(!showExportMenu)}
            // 修改：w-full 让按钮撑满容器，justify-between 让图标分布在两端，看起来更像下拉控件
            className={`
              w-full text-xs flex items-center justify-between px-3 py-1.5 rounded-lg font-medium transition-all
              ${showExportMenu ? 'bg-soy-100 text-soy-700' : 'text-slate-600 hover:bg-slate-100 hover:text-soy-700'}
            `}
          >
            <div className="flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5" /> 
              <span>Export</span>
            </div>
            <ChevronDown className={`w-3 h-3 transition-transform ${showExportMenu ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {showExportMenu && (
            // 修改：w-full (让菜单宽度 = 父容器宽度)，min-w-0 (防止被撑开)
            <div className="absolute left-0 top-full mt-1 w-full bg-white border border-slate-100 rounded-xl shadow-xl z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-100 origin-top-left">
              <div className="p-1">
                <button 
                  onClick={() => handleExport('csv')}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-600 hover:bg-soy-50 hover:text-soy-700 rounded-lg transition-colors text-left whitespace-nowrap"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 flex-shrink-0" />
                  CSV
                </button>
                <button 
                  onClick={() => handleExport('txt')}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-600 hover:bg-soy-50 hover:text-soy-700 rounded-lg transition-colors text-left whitespace-nowrap"
                >
                  <FileText className="w-3.5 h-3.5 flex-shrink-0" />
                  TXT
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Table Wrapper */}
      <div className="overflow-x-auto rounded-b-2xl">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600 font-serif border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 font-semibold whitespace-nowrap">{sourceTitle}</th>
              <th className="px-6 py-3 font-semibold whitespace-nowrap">{targetTitle}</th>
              <th className="px-6 py-3 font-semibold whitespace-nowrap">Interaction Type</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {results.map((item, index) => (
              <tr key={index} className="hover:bg-slate-50/80 transition-colors">
                <td className={`px-6 py-3 font-mono ${type === 'tf' ? 'text-soy-700 font-bold' : 'text-slate-700'}`}>
                  {type === 'tf' ? query : item}
                </td>
                
                <td className={`px-6 py-3 font-mono ${type === 'target' ? 'text-soy-700 font-bold' : 'text-slate-700'}`}>
                  {type === 'target' ? query : item}
                </td>

                <td className="px-6 py-3 text-slate-500 italic">
                  Putative Binding
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}