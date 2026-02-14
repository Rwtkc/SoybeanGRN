import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Download, Check, Minus, ChevronDown, 
  FileText, Table, ChevronLeft, ChevronRight 
} from 'lucide-react';

export default function TFDetailTable({ tfId, interactions, onBack }) {
  const [isExportOpen, setIsExportOpen] = useState(false);
  
  // --- 分页状态 ---
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15; // 每页 15 行

  // 当切换 TF 时，重置页码到第一页
  useEffect(() => {
    setCurrentPage(1);
  }, [tfId]);

  // --- 格式化辅助函数 ---
  const formatScore = (val) => {
    if (val === null || val === undefined || val === '') return '-';
    const num = parseFloat(val);
    if (isNaN(num)) return val;
    if (num === 0) return '0';
    return num.toFixed(4);
  };

  // --- 分页计算 ---
  const totalPages = Math.ceil(interactions.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = interactions.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // 切换页面时回到顶部
  };

  // --- 导出函数 (导出全部数据) ---
  const handleDownload = (format) => {
    const separator = format === 'csv' ? ',' : '\t';
    const mimeType = format === 'csv' ? 'text/csv' : 'text/plain';
    const extension = format === 'csv' ? '.csv' : '.txt';

    const columns = [
      "TF_ID", "Target_Gene", "SoyDAP", "cCOE", "PWM", "scRNA", "OCR",
      "ATdap", "ZMAdap", "PCC", "GENIE3"
    ];
    const header = columns.join(separator) + "\n";

    const content = interactions.map(row => {
      const values = [
        tfId,           
        row.target,
        formatScore(row.soyDAP),
        formatScore(row.cCOE),
        formatScore(row.pwm),
        formatScore(row.scRNA_Score),
        formatScore(row.ocr), 
        row.atDAP,      
        row.zmDAP,
        formatScore(row.pcc),
        formatScore(row.genie3)
      ];
      return values.join(separator);
    }).join("\n");

    const blob = new Blob([header + content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${tfId}_SoyGRN_data${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setIsExportOpen(false); 
  };

  if (!interactions || interactions.length === 0) return null;

  return (
    <div className="space-y-6 pb-20">
      
      {/* 顶部操作区 */}
      <div className="flex justify-between items-end">
        <div className="space-y-3">
          <button 
            onClick={onBack} 
            className="group flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-600 font-medium hover:border-soy-500 hover:text-soy-700 hover:bg-soy-50 transition-all shadow-sm"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
            Back to Members
          </button>
          
          <div className="flex items-baseline gap-3 pt-2">
            <h2 className="text-3xl font-bold font-serif text-slate-900">{tfId}</h2>
            <span className="text-lg text-slate-500 font-normal border-l pl-3 border-slate-300">
              Interaction Details
            </span>
          </div>
        </div>

        {/* 导出菜单 */}
        <div className="relative">
          <button 
            onClick={() => setIsExportOpen(!isExportOpen)}
            onBlur={() => setTimeout(() => setIsExportOpen(false), 200)} 
            className={`flex items-center gap-2 px-5 py-2.5 bg-soy-700 text-white font-medium hover:bg-soy-800 transition-all shadow-md hover:shadow-lg ${isExportOpen ? 'rounded-t-lg' : 'rounded-lg'}`}
          >
            <Download size={18} /> Export Data 
            <ChevronDown size={16} className={`transition-transform duration-200 ${isExportOpen ? 'rotate-180' : ''}`} />
          </button>

          {isExportOpen && (
            <div className="absolute right-0 top-full w-full bg-white border border-slate-200 rounded-b-lg shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100 origin-top">
              <button onClick={() => handleDownload('csv')} className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm text-slate-700 hover:bg-soy-50 border-b border-slate-100">
                <Table size={16} className="text-emerald-600" /> CSV Format (.csv)
              </button>
              <button onClick={() => handleDownload('txt')} className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm text-slate-700 hover:bg-soy-50">
                <FileText size={16} className="text-blue-600" /> TXT Format (.txt)
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 表格主体 */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-700 border-b border-slate-200 font-semibold">
              <tr>
                <th className="px-6 py-4 min-w-[160px]">Target Gene</th>
                <th className="px-4 py-4 text-center">SoyDAP</th>
                <th className="px-4 py-4 text-center">cCOE</th>
                <th className="px-4 py-4 text-center">PWM</th>
                <th className="px-4 py-4 text-center">scRNA</th>
                <th className="px-4 py-4 text-center">OCR</th>
                <th className="px-4 py-4 text-center border-l border-slate-100">ATdap</th>
                <th className="px-4 py-4 text-center">ZMAdap</th>
                <th className="px-4 py-4 text-center border-l border-slate-100">PCC</th>
                <th className="px-4 py-4 text-center">GENIE3</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentData.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors text-slate-700">
                  <td className="px-6 py-3 font-mono text-soy-700 font-medium">{row.target}</td>
                  <td className="px-4 py-3 text-center">{formatScore(row.soyDAP)}</td>
                  <td className="px-4 py-3 text-center">{formatScore(row.cCOE)}</td>
                  <td className="px-4 py-3 text-center">{formatScore(row.pwm)}</td>
                  <td className="px-4 py-3 text-center">{formatScore(row.scRNA_Score)}</td>
                  <td className="px-4 py-3 text-center">{formatScore(row.ocr)}</td>
                  <td className="px-4 py-3 text-center border-l border-slate-100">
                    <div className="flex justify-center">
                      {row.atDAP === '1' ? <Check size={18} className="text-emerald-600 stroke-[3]" /> : <Minus size={16} className="text-slate-300" />}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center">
                      {row.zmDAP === '1' ? <Check size={18} className="text-emerald-600 stroke-[3]" /> : <Minus size={16} className="text-slate-300" />}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center border-l border-slate-100">{formatScore(row.pcc)}</td>
                  <td className="px-4 py-3 text-center">{formatScore(row.genie3)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 分页控件 */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-500 font-medium">
            Showing <span className="text-slate-900">{startIndex + 1}</span> to <span className="text-slate-900">{Math.min(startIndex + pageSize, interactions.length)}</span> of <span className="text-slate-900">{interactions.length}</span> results
          </div>
          
          <div className="flex items-center gap-1">
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-soy-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={16} />
            </button>
            
            {/* 简易页码显示 (当前页/总页数) */}
            <div className="flex items-center px-4">
              <span className="text-sm font-bold text-soy-700">{currentPage}</span>
              <span className="mx-2 text-slate-300">/</span>
              <span className="text-sm text-slate-500">{totalPages}</span>
            </div>

            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-soy-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
