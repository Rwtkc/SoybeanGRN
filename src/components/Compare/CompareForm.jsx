import React from 'react';
import { GitCompare, ArrowRightLeft, MousePointerClick } from 'lucide-react';

const FORM_CONFIG = {
  tf: {
    titleA: 'Transcription Factor A',
    exampleA: 'GmbZIP123',
    titleB: 'Transcription Factor B',
    exampleB: 'GmMYB45',
  },
  target: {
    titleA: 'Target Gene A',
    exampleA: 'Glyma.01G012300',
    titleB: 'Target Gene B',
    exampleB: 'Glyma.02G145200',
  },
};

export default function CompareForm({ mode, setMode, idA, setIdA, idB, setIdB, onCompare }) {
  const current = FORM_CONFIG[mode] ?? FORM_CONFIG.tf;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      <div className="flex items-center gap-2 mb-6 text-slate-800 font-bold text-lg">
        <ArrowRightLeft className="text-soy-700" />
        Configuration
      </div>

      <div className="space-y-6">
        <div className="flex p-1 bg-slate-100 rounded-lg">
          {['tf', 'target'].map((m) => (
            <button
              key={m}
              onClick={() => {
                setMode(m);
                setIdA('');
                setIdB('');
              }}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                mode === m ? 'bg-white text-soy-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Compare {m === 'tf' ? 'TFs' : 'Targets'}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5">
          <div className="space-y-2">
            <div className="flex justify-between items-end">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {current.titleA}
              </label>
              <button
                onClick={() => setIdA(current.exampleA)}
                className="group flex items-center gap-1 text-xs font-medium text-slate-600 transition-all duration-200 hover:text-blue-600 active:scale-95 active:text-blue-700"
                title="Click to auto-fill"
              >
                <MousePointerClick size={12} className="transition-transform group-hover:rotate-12" />
                Try: <span className="font-mono select-all">{current.exampleA}</span>
              </button>
            </div>

            <input
              value={idA}
              onChange={(e) => setIdA(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-soy-500/50 outline-none font-mono text-sm text-slate-700"
              placeholder="Enter Gene ID..."
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-end">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {current.titleB}
              </label>
              <button
                onClick={() => setIdB(current.exampleB)}
                className="group flex items-center gap-1 text-xs font-medium text-slate-600 transition-all duration-200 hover:text-blue-600 active:scale-95 active:text-blue-700"
                title="Click to auto-fill"
              >
                <MousePointerClick size={12} className="transition-transform group-hover:rotate-12" />
                Try: <span className="font-mono select-all">{current.exampleB}</span>
              </button>
            </div>

            <input
              value={idB}
              onChange={(e) => setIdB(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-soy-500/50 outline-none font-mono text-sm text-slate-700"
              placeholder="Enter Gene ID..."
            />
          </div>
        </div>

        <button
          onClick={onCompare}
          className="w-full py-3 bg-soy-700 hover:bg-soy-800 text-white font-bold rounded-xl transition-colors flex justify-center items-center gap-2 shadow-lg shadow-soy-700/20 active:scale-[0.98] duration-200"
        >
          <GitCompare size={18} />
          Run Comparison
        </button>
      </div>
    </div>
  );
}
