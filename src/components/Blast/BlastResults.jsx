import React from 'react';
import { AlignLeft, ExternalLink, Activity, Percent, MoveHorizontal, Hash, FileText, Table } from 'lucide-react';

// --- 辅助函数：格式化 E-Value 展示 (解决 0.0e+0 问题) ---
const formatEValue = (eVal) => {
  if (eVal === null || eVal === undefined || eVal === '') return '-';
  const num = parseFloat(eVal);
  if (num === 0) {
    return "< 1e-180"; // 学术占位符，表示极显著
  }
  return eVal;
};

export default function BlastResults({ results }) {
  if (!results) return null;

  const isProteinMode = results.program === 'blastp' || results.program === 'blastx';

  // --- 下载逻辑 ---
  const downloadFile = (format) => {
    const headers = ["Accession", "Description", "Score", "E-Value", "Identity", "Match_Len", "Total_Len", "Gaps"];
    const delimiter = format === 'csv' ? ',' : '\t';
    
    const rows = results.hits.map(hit => [
      hit.id,
      format === 'csv' ? `"${hit.desc.replace(/"/g, '""')}"` : hit.desc.replace(/\t|\n/g, ' '),
      hit.score,
      formatEValue(hit.eValue), // 下载也应用格式化
      hit.identity,
      hit.matchLen,
      hit.totalLen,
      hit.gaps || 0
    ]);

    const content = [
      headers.join(delimiter),
      ...rows.map(row => row.join(delimiter))
    ].join('\n');

    const blobContent = format === 'csv' ? ["\ufeff" + content] : [content];
    const blob = new Blob(blobContent, { type: 'text/plain;charset=utf-8' });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SoyGRN_Blast_${new Date().getTime()}.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const scrollToAlignment = (index) => {
    const element = document.getElementById(`alignment-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 text-left">
      
      {/* 1. 结果摘要卡片 */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold font-serif text-slate-800">Results Summary</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className={`flex h-2 w-2 rounded-full ${results.hits.length > 0 ? 'bg-emerald-500' : 'bg-slate-300'}`}></span>
            <p className="text-sm text-slate-500">
              Program: <strong className="font-mono text-soy-700 uppercase">{results.program}</strong> — Found <strong>{results.hits.length}</strong> hits
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => downloadFile('csv')}
            className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-soy-700 bg-soy-50 border border-soy-200 rounded-lg hover:bg-soy-100 transition-all shadow-sm"
          >
            <Table className="w-3.5 h-3.5" />
            CSV
          </button>
          <button 
            onClick={() => downloadFile('txt')}
            className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-all shadow-sm"
          >
            <FileText className="w-3.5 h-3.5" />
            TXT
          </button>
        </div>
      </div>

      {/* 2. 概览表格 */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse table-auto">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider min-w-[140px]">
                  {isProteinMode ? 'Protein ID' : 'Accession'}
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider whitespace-nowrap">Score</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider whitespace-nowrap">E-Value</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider whitespace-nowrap">Identity</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-center w-32">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {results.hits.map((hit, index) => (
                <tr key={hit.id + index} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 valign-top">
                    {isProteinMode ? (
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center px-3 py-1.5 rounded-md bg-blue-50 text-blue-700 border border-blue-100 font-mono text-sm font-bold shadow-sm break-all">
                            {hit.id.replace(/^(gb|ref|sp|gi)\|/i, '').replace(/\|/g, '')}
                        </span>
                      </div>
                    ) : (
                      <span className="inline-flex items-center px-4 py-1.5 rounded-md bg-soy-100 text-soy-900 border border-soy-200 font-mono text-sm font-bold shadow-sm tracking-tight">
                        {hit.id.replace('CHR', 'Chr')}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-baseline gap-1">
                      <span className="text-base font-black text-slate-800 leading-none">{hit.score}</span>
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">BITS</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-mono text-sm font-bold text-slate-600">
                      {formatEValue(hit.eValue)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col items-start gap-1 w-24">
                      <span className="text-xs font-bold text-soy-700">
                        {hit.identity}% Match
                      </span>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${isProteinMode && hit.identity < 50 ? 'bg-amber-400' : 'bg-soy-500'}`}
                          style={{ width: `${hit.identity}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button 
                      onClick={() => scrollToAlignment(index)}
                      className="inline-flex items-center justify-center px-4 py-2 text-xs font-bold text-soy-700 bg-white border border-soy-200 rounded-lg hover:bg-soy-50 hover:border-soy-500 transition-all shadow-sm active:scale-95 whitespace-nowrap"
                    >
                      View Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-200 pb-4 mt-8">
          <AlignLeft className="w-6 h-6 text-soy-700" />
          <h4 className="text-2xl font-bold font-serif text-slate-800 text-left">Alignments Detail</h4>
        </div>
        {results.hits.map((hit, index) => (
          <SingleAlignmentView key={hit.id + index} hit={hit} index={index} isProteinMode={isProteinMode} />
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 核心修复区域：SingleAlignmentView
// ----------------------------------------------------------------------
function SingleAlignmentView({ hit, index, isProteinMode }) {
  const coveragePercent = Math.min(100, (hit.matchLen / hit.totalLen) * 100);

  // --- 跳转 JBrowse 的处理逻辑 (DNA Mode) ---
  const handleGenomeBrowser = (e) => {
    e.preventDefault();
    let refName = hit.id.replace(/chr\s?/gi, '').replace(/^0+/, '');

    const PADDING = 2000;
    let start = parseInt(hit.sStart);
    let end = parseInt(hit.sEnd);
    if (start > end) [start, end] = [end, start];

    const finalStart = Math.max(1, start - PADDING);
    const finalEnd = end + PADDING;
    const locationString = `${refName}:${finalStart}..${finalEnd}`;

    // 【核心修复】：去掉开头的 /，改用相对路径 construct 
    // 这样在服务器部署子目录下也能正确找到项目路由
    const url = `#/jbrowse?loc=${encodeURIComponent(locationString)}&tracks=gene_models.gff3`;
    
    window.open(url, '_blank');
  };

  const handleExternalLink = (e) => {
    e.preventDefault();
    let cleanId = hit.id.replace(/^(gb|ref|sp|gi|emb|dbj|tpg)\|/i, '').replace(/\|/g, '').trim();
    window.open(`https://www.ncbi.nlm.nih.gov/protein/${cleanId}`, '_blank');
  };

  return (
    <div id={`alignment-${index}`} className="group bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden scroll-mt-28 text-left">
      <div className="bg-slate-50/50 px-6 py-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-start gap-4">
        <div className="flex items-center gap-4">
          <span className="flex items-center justify-center w-10 h-10 shrink-0 rounded-full bg-soy-700 text-white text-base font-bold shadow-md">
            {index + 1}
          </span>
          <div className="overflow-hidden">
            <div className="flex items-center gap-2 mb-1.5">
              <h5 className={`px-3 py-1 rounded-md font-bold text-lg font-mono tracking-tight shadow-sm border ${
                isProteinMode ? 'bg-blue-50 text-blue-800 border-blue-200' : 'bg-soy-100 text-soy-900 border-soy-200'
              }`}>
                {hit.id.replace(/^(gb|ref|sp|gi)\|/i, '').replace(/\|/g, '')}
              </h5>
            </div>
            <div className="inline-block px-3 py-1.5 bg-slate-100/80 border border-slate-200 rounded-lg max-w-3xl">
              <p className="text-[13px] font-medium text-slate-700 font-mono leading-snug break-all italic">{hit.desc}</p>
            </div>
          </div>
        </div>
        
        <button 
          onClick={isProteinMode ? handleExternalLink : handleGenomeBrowser}
          className="flex items-center gap-1.5 text-xs font-bold text-soy-700 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm hover:border-soy-500 hover:bg-soy-50 transition-all shrink-0 active:scale-95"
        >
          {isProteinMode ? 'External DB' : 'Browse Genome'} <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-100 border-b border-slate-100 bg-white">
        <MetricItem icon={Activity} label="Score" value={`${hit.score} bits`} />
        <MetricItem icon={MoveHorizontal} label="Expect" value={formatEValue(hit.eValue)} />
        <MetricItem icon={Hash} label="Identities" value={`${hit.matchLen}/${hit.totalLen}`} sub={`(${hit.identity}%)`} highlight={hit.identity > 90} />
        <MetricItem icon={Percent} label="Gaps" value={`${hit.gaps || 0}/${hit.totalLen}`} sub={`(${hit.gaps ? ((hit.gaps/hit.totalLen)*100).toFixed(0) : 0}%)`} />
      </div>

      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/30">
        <div className="flex items-center gap-4 text-xs text-slate-500 mb-2 text-left">
          <span className="font-mono font-bold uppercase tracking-wider text-[10px]">Query Coverage</span>
          <span className="ml-auto font-bold text-soy-700 text-sm">{Math.round(coveragePercent)}%</span>
        </div>
        <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden shadow-inner">
          <div className="h-full bg-soy-500 rounded-full transition-all duration-500" style={{ width: `${coveragePercent}%` }} />
        </div>
      </div>

      <div className="p-6 bg-white overflow-x-auto">
        <SequenceViewer qSeq={hit.qSeq} matchSeq={hit.matchSeq} sSeq={hit.sSeq} qStart={parseInt(hit.qStart)} sStart={parseInt(hit.sStart)} />
      </div>
    </div>
  );
}

function MetricItem({ icon: Icon, label, value, sub, highlight }) {
  return (
    <div className="p-4 flex flex-col items-center justify-center text-center">
      <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
        <Icon className="w-3.5 h-3.5" /> {label}
      </div>
      <div className={`font-mono font-bold text-sm ${highlight ? 'text-emerald-700' : 'text-slate-700'}`}>
        {value} {sub && <span className="text-slate-400 text-xs ml-1 font-normal">{sub}</span>}
      </div>
    </div>
  );
}

function SequenceViewer({ qSeq, matchSeq, sSeq, qStart, sStart }) {
  const CHUNK_SIZE = 60; 
  const totalLen = qSeq.length;
  const chunks = [];
  for (let i = 0; i < totalLen; i += CHUNK_SIZE) {
    chunks.push({
      qChunk: qSeq.slice(i, i + CHUNK_SIZE),
      mChunk: matchSeq.slice(i, i + CHUNK_SIZE),
      sChunk: sSeq.slice(i, i + CHUNK_SIZE),
      qCurrentStart: qStart + i,
      qCurrentEnd: Math.min(qStart + i + CHUNK_SIZE - 1, qStart + totalLen - 1),
      sCurrentStart: sStart + i,
      sCurrentEnd: Math.min(sStart + i + CHUNK_SIZE - 1, sStart + totalLen - 1),
    });
  }
  return (
    <div style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' }} className="text-[13px] leading-[1.6]">
      {chunks.map((chunk, idx) => (
        <div key={idx} className="mb-6 last:mb-0 flex flex-col text-left">
          <div className="flex items-center whitespace-pre">
            <span className="w-16 text-slate-400 text-[10px] font-bold uppercase shrink-0">Query</span>
            <span className="w-20 text-slate-400 text-xs text-right pr-4 shrink-0">{chunk.qCurrentStart}</span>
            <span className="text-slate-800 font-medium tracking-wide">{chunk.qChunk}</span>
            <span className="w-20 text-slate-400 text-xs text-left pl-4 shrink-0">{chunk.qCurrentEnd}</span>
          </div>
          <div className="flex items-center whitespace-pre text-soy-500 h-4">
             <span className="w-16 shrink-0"></span><span className="w-20 pr-4 shrink-0"></span>
             <span className="font-bold tracking-wide">{chunk.mChunk}</span><span className="w-20 shrink-0"></span>
          </div>
          <div className="flex items-center whitespace-pre text-left">
            <span className="w-16 text-slate-400 text-[10px] font-bold uppercase shrink-0">Sbjct</span>
            <span className="w-20 text-slate-400 text-xs text-right pr-4 shrink-0">{chunk.sCurrentStart}</span>
            <span className="text-slate-800 font-medium tracking-wide">{chunk.sChunk}</span>
            <span className="w-20 text-slate-400 text-xs text-left pl-4 shrink-0">{chunk.sCurrentEnd}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
