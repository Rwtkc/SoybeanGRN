import React from 'react';
import { 
  Download, 
  FileArchive, 
  Database, 
  ShieldCheck, 
  Info,
  Server,
  FileText
} from 'lucide-react';

// 环境感知 API 基础路径
const API_BASE = import.meta.env.DEV
  ? "http://rnainformatics.cn/SoyGRN/api" 
  : "/SoyGRN/api";

export default function DownloadPage() {
  
  // 数据集配置
  const datasets = [
    {
      id: "big_dt",
      title: "SoybeanGRN Global Regulatory Network Data",
      filename: "big_dt.txt.xz",
      size: "428.5 MB",
      format: "XZ Compressed Text",
      description: "The complete predicted gene regulatory network dataset for Glycine max, containing millions of putative interactions with multiple evidence scores (SoyDAP, cCOE, scRNA-seq, etc.).",
      icon: <Database className="w-6 h-6" />,
      color: "bg-emerald-50 text-emerald-700 border-emerald-100"
    },
    {
      id: "xgboost_result",
      title: "SoybeanGRN XGBoost Prediction Results",
      filename: "xgboost_result.txt.xz", // 已修改文件名
      size: "21.3 MB",
      format: "XZ Compressed Text",
      description: "High-confidence regulatory links predicted by the XGBoost machine learning model. This dataset includes feature importance rankings and integrated confidence probabilities.",
      icon: <ShieldCheck className="w-6 h-6" />,
      color: "bg-blue-50 text-blue-700 border-blue-100"
    }
  ];

  // 处理下载逻辑
  const handleDownload = (filename) => {
    const downloadUrl = `${API_BASE}/download?file=${encodeURIComponent(filename)}`;
    window.open(downloadUrl, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pb-32 space-y-8 animate-in fade-in duration-500 text-left">
      
      {/* 标题区：同步 Compare.jsx 样式 */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold font-serif text-slate-900">Data Download Center</h1>
        <p className="text-slate-500">
          Access the complete Soybean Gene Regulatory Network datasets for offline analysis and large-scale bioinformatics pipelines.
        </p>
      </div>

      {/* 提示公告 */}
      <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 flex items-start gap-4 shadow-sm">
        <div className="p-2 bg-white rounded-lg text-amber-600 shadow-sm shrink-0">
          <Info size={20} />
        </div>
        <div className="space-y-1">
          <h4 className="font-bold text-amber-900 text-sm">Download Note</h4>
          <p className="text-amber-800/80 text-xs leading-relaxed">
            All files are compressed using <b>XZ utils</b> to save bandwidth. For Windows users, please use 7-Zip or WinRAR to extract. For Linux/Mac users, use the <code className="bg-amber-100 px-1 rounded font-mono">tar -xJf [filename]</code> or <code className="bg-amber-100 px-1 rounded font-mono">unxz</code> command.
          </p>
        </div>
      </div>

      {/* 数据集列表 */}
      <div className="grid grid-cols-1 gap-8">
        {datasets.map((ds) => (
          <div 
            key={ds.id} 
            className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-soy-300 transition-all duration-300 overflow-hidden"
          >
            <div className="flex flex-col md:flex-row">
              
              {/* 左侧：图标与基础属性 */}
              <div className={`md:w-64 p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-100 ${ds.color}`}>
                <div className="p-4 bg-white rounded-2xl shadow-md mb-2 group-hover:scale-110 transition-transform duration-500">
                  {ds.icon}
                </div>
                <div className="mt-4 flex flex-col items-center gap-1">
                   <div className="flex items-center gap-1 text-sm font-mono font-bold">
                      <Server size={14} /> {ds.size}
                   </div>
                   <div className="flex items-center gap-1 text-[10px] font-bold opacity-70">
                      <FileArchive size={12} /> {ds.format}
                   </div>
                </div>
              </div>

              {/* 右侧：详细介绍与下载按钮 */}
              <div className="flex-1 p-8 flex flex-col justify-between space-y-6">
                <div>
                  <h3 className="text-2xl font-bold font-serif text-slate-800 mb-3">{ds.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {ds.description}
                  </p>
                  
                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-slate-500 text-xs font-medium">
                      <FileText size={14} />
                      <span className="font-mono">{ds.filename}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end pt-4 border-t border-slate-50">
                  <button 
                    onClick={() => handleDownload(ds.filename)}
                    className="flex items-center gap-2 px-8 py-3.5 bg-soy-700 hover:bg-soy-800 text-white font-bold rounded-xl shadow-lg shadow-soy-700/20 active:scale-95 transition-all group/btn"
                  >
                    <Download className="w-5 h-5 group-hover/btn:translate-y-0.5 transition-transform" />
                    Download Dataset
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* 底部引用提示 */}
      <div className="text-center pt-10 border-t border-slate-100">
        <p className="text-slate-400 text-xs font-serif italic">
          If you use these datasets in your research, please cite the SoybeanGRN publication.
        </p>
      </div>

    </div>
  );
}
