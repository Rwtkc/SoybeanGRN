import React, { useState, useRef, useEffect } from 'react';
import { Play, FileText, RefreshCw, Settings2, ChevronDown, Check } from 'lucide-react';

// --- 1. 定义两套示例数据 ---
const EXAMPLE_DNA = `>Glyma.15G050200_Actin_CDS
ATGGCTGATGCTGAGGATATTCAGCCACTTGTCTGTGACAATGGAACTGGAATGGTTAAGGCAGGTTTTGCTGGAGATGATGCTCCCAGGGCTGTTTTCCCCAGTATTGTTGGTCGTCCTCGCCACACTGGTGTGATGGTCGGAATGGGACAGAAGGATGCCTATGTTGGTGATGAGGCTCAATCCAAGAGAGGTATCCTGACCCTGAAGTACCCCATTGAGCACGGTATTGTCAGCAACTGGGATGACATGGAGAAGATTTGGCACCACACCTTCTACAATGAGCTCCGTGTTGCTCCCGAGGAGCACCCCGTTCTCCTCACTGAGGCTCCCCTCAACCCCAAGGCCAACAGAGAGAAGATGACCCAGATCATGTTTGAGACCTTCAACGTCCCTGCCATGTATGTCGCTATCCAGGCTGTGCTCTCCCTGTATGCCAGTGGTCGTACCACTGGTATTGTGCTGGATTCTGGTGATGGTGTGAGTCACACTGTCCCCATCTACGAGGGCTATGCCCTCCCCCACGCCATCCTTCGTCTTGATCTTGCTGGTCGTGACCTCACCGACAACCTGATGAAAATCCTCACCGAGAGGGGTTACATGTTCACCACCACTGCTGAGAGGGAAATTGTCCGTGACATCAAGGAGAAGCTTGCTTATGTTGCCCTCGACTATGAGCAGGAGCTGGAGACTGCCAAGAGCAGCTCCTCCGTTGAGAAGAGCTATGAGCTGCCCGATGGGCAGGTCATCACCATCGGAGCTGAGAGGTTCAGATGCCCAGAGGTCTTGTTCCAGCCATCCTTCATTGGTATGGAGTCGGCTGGTATTCATGAGACCACGTACAACAGCATCATGAAGTGTGATGTCGATATCAGGAAGGATCTCTATGGCAACATTGTGCTCAGTGGTGGCTCCACCATGTTCCCTGGTATTGCTGACCGTATGAGCAAGGAGATCACTGCCCTTGCACCGAGCAGCATGAAGATCAAGGTGGTTGCTCCACCCGAGAGGAAGTACAGTGTCTGGATTGGAGGATCCATCCTGGCCTCCCTCAGCACCTTCCAGCAGATGTGGATTGCCAAGCAGGAATACGATGAGTCTGGCCCTTCGATTGTCCACAGGAAGTGCTTCTAA`;

const EXAMPLE_PROTEIN = `>Glyma.15G050200_Actin_Protein
MADAEDIQPLVCDNGTGMVKAGFAGDDAPRAVFPSIVGRPRHTGVMVGMGQKDAYVGDEAQSKRGILTLKYPIEHGIVSNWDDMEKIWHHTFYNELRVAPEEHPVLLTEAPLNPKANREKMTQIMFETFNVPAMYVAIQAVLSLYASGRTTGIVLDSGDGVSHTVPIYEGYALPHAILRLDLAGRDLTDNLMKILTERGYMFTTTAEREIVRDIKEKLAYVALDYEQELETAKSSSSVEKSYELPDGQVITIGAERFRCPEVLFQPSFIGMESAGIHETTYNSIMKCDVDIRKDLYGNIVLSGGSTMFPGIADRMSKEITALAPSSMKIKVVAPPERKYSVWIGGSILASLSTFQQMWIAKQEYDESGPSIVHRKCF`;

export default function BlastForm({ onSearch, isSearching }) {
  const [sequence, setSequence] = useState('');
  const [program, setProgram] = useState('blastn');
  const [eValue, setEValue] = useState('1e-5');
  const [openSelect, setOpenSelect] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setOpenSelect(null);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!sequence.trim()) return;
    onSearch({ sequence, program, eValue });
  };

  // --- 2. 智能加载示例逻辑 ---
  const handleLoadExample = () => {
    // 如果是 blastp，加载蛋白序列；否则（blastn/blastx）加载 DNA 序列
    if (program === 'blastp') {
      setSequence(EXAMPLE_PROTEIN);
    } else {
      setSequence(EXAMPLE_DNA);
    }
  };

  // 当用户切换程序时，如果输入框里正好是“错误的示例数据”，自动帮他切换（可选优化体验）
  useEffect(() => {
    if (program === 'blastp' && sequence === EXAMPLE_DNA) {
        setSequence(EXAMPLE_PROTEIN);
    } else if ((program === 'blastn' || program === 'blastx') && sequence === EXAMPLE_PROTEIN) {
        setSequence(EXAMPLE_DNA);
    }
  }, [program]);

  const programs = [
    { id: 'blastn', label: 'blastn (Nucleotide to Nucleotide)' },
    { id: 'blastp', label: 'blastp (Protein to Protein)' },
    { id: 'blastx', label: 'blastx (Translated DNA to Protein)' },
  ];

  const eVals = [
    { id: '1e-5', label: '1e-5 (Default)' },
    { id: '1e-10', label: '1e-10 (Strict)' },
    { id: '0.001', label: '0.001 (Loose)' },
    { id: '1.0', label: '1.0 (All matches)' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 lg:p-6" ref={dropdownRef}>
      <div className="flex items-center justify-between mb-4 lg:mb-5 gap-2">
        <h2 className="text-base lg:text-xl font-bold font-serif text-slate-800 flex items-center gap-1 lg:gap-2 truncate">
          <FileText className="w-4 h-4 lg:w-5 h-5 text-soy-700 shrink-0" />
          <span className="truncate">Sequence Input</span>
        </h2>
        <button 
          type="button"
          onClick={handleLoadExample} // 使用新的处理函数
          className="shrink-0 group flex items-center gap-1 px-2 py-1 lg:px-3 lg:py-1.5 text-[10px] lg:text-xs font-medium text-soy-700 bg-soy-50 hover:bg-soy-100 rounded-lg transition-colors whitespace-nowrap"
        >
          <RefreshCw className="w-3 h-3 lg:w-3.5 lg:h-3.5 transition-transform group-hover:rotate-180" />
          Example
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-5">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1.5">
            Enter FASTA Sequence
          </label>
          <textarea
            value={sequence}
            onChange={(e) => setSequence(e.target.value)}
            className="w-full h-32 lg:h-48 p-3 lg:p-4 font-mono text-[10px] lg:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-soy-500 focus:border-soy-500 outline-none transition-all resize-none placeholder:text-slate-400"
            placeholder={program === 'blastp' ? ">Protein_ID\nMADA..." : ">DNA_ID\nATGC..."} // placeholder 也动态化
            spellCheck="false"
          />
        </div>

        <div className="bg-slate-50 p-3 lg:p-4 rounded-xl border border-slate-100 space-y-3 lg:space-y-4">
          <div className="flex items-center gap-2 text-slate-800 font-serif font-bold text-xs lg:text-sm border-b border-slate-200/60 pb-2 mb-1">
            <Settings2 className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-soy-600" />
            Parameters
          </div>
          
          {/* Program Select */}
          <div className="relative">
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1 ml-1">Program</label>
            <div 
              onClick={() => setOpenSelect(openSelect === 'program' ? null : 'program')}
              className={`flex items-center justify-between w-full bg-white border border-slate-200 text-slate-700 text-[11px] lg:text-sm rounded-lg p-2 lg:p-2.5 cursor-pointer hover:border-soy-300 transition-all ${openSelect === 'program' ? 'ring-2 ring-soy-500 border-soy-500' : ''}`}
            >
              <span className="truncate pr-4">{programs.find(p => p.id === program).label}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform shrink-0 ${openSelect === 'program' ? 'rotate-180 text-soy-600' : ''}`} />
            </div>
            {openSelect === 'program' && (
              <ul className="absolute z-[100] w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-xl overflow-hidden py-1">
                {programs.map((p) => (
                  <li key={p.id}
                    onClick={() => { if(!p.disabled) { setProgram(p.id); setOpenSelect(null); } }}
                    className={`flex items-center justify-between px-3 py-2 text-[11px] lg:text-sm transition-colors ${p.disabled ? 'text-slate-300 cursor-not-allowed bg-slate-50/50' : 'text-slate-700 hover:bg-soy-50 hover:text-soy-700 cursor-pointer'} ${program === p.id ? 'bg-soy-50/50 text-soy-700 font-bold' : ''}`}
                  >
                    {p.label} {program === p.id && <Check className="w-3 h-3 text-soy-600" />}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* E-Value Select */}
          <div className="relative">
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1 ml-1">E-Value Cutoff</label>
            <div 
              onClick={() => setOpenSelect(openSelect === 'eValue' ? null : 'eValue')}
              className={`flex items-center justify-between w-full bg-white border border-slate-200 text-slate-700 text-[11px] lg:text-sm rounded-lg p-2 lg:p-2.5 cursor-pointer hover:border-soy-300 transition-all ${openSelect === 'eValue' ? 'ring-2 ring-soy-500 border-soy-500' : ''}`}
            >
              <span className="truncate pr-4">{eVals.find(e => e.id === eValue).label}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform shrink-0 ${openSelect === 'eValue' ? 'rotate-180 text-soy-600' : ''}`} />
            </div>
            {openSelect === 'eValue' && (
              <ul className="absolute z-[100] w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-xl overflow-hidden py-1">
                {eVals.map((e) => (
                  <li key={e.id}
                    onClick={() => { setEValue(e.id); setOpenSelect(null); }}
                    className={`flex items-center justify-between px-3 py-2 text-[11px] lg:text-sm transition-colors hover:bg-soy-50 hover:text-soy-700 cursor-pointer ${eValue === e.id ? 'bg-soy-50/50 text-soy-700 font-bold' : 'text-slate-700'}`}
                  >
                    {e.label} {eValue === e.id && <Check className="w-3 h-3 text-soy-600" />}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSearching || !sequence}
          className={`w-full flex items-center justify-center gap-2 px-4 py-3 lg:py-3.5 rounded-xl font-bold text-xs lg:text-sm text-white shadow-md transition-all ${isSearching || !sequence ? 'bg-slate-300 cursor-not-allowed shadow-none' : 'bg-soy-700 hover:bg-soy-800 hover:shadow-lg active:scale-[0.98]'}`}
        >
          {isSearching ? <><RefreshCw className="w-4 h-4 animate-spin" /><span>Aligning...</span></> : <><Play className="w-4 h-4 fill-current" /><span>Run BLAST</span></>}
        </button>
      </form>
    </div>
  );
}