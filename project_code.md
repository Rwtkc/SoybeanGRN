# SoyGRN_web 项目代码导出

生成时间: 2026/2/4 10:51:12

---

## 文件: eslint.config.js

```js
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])

```

---

## 文件: index.html

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>soy-grn</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>

```

---

## 文件: package.json

```json
{
  "name": "soy-grn",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@fontsource/roboto": "^5.2.9",
    "@tailwindcss/vite": "^4.1.18",
    "d3": "^7.9.0",
    "echarts": "^6.0.0",
    "echarts-for-react": "^3.0.5",
    "lucide-react": "^0.562.0",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-router-dom": "^7.12.0"
  },
  "devDependencies": {
    "@eslint/js": "^9.39.1",
    "@types/react": "^19.2.5",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^5.1.1",
    "autoprefixer": "^10.4.23",
    "eslint": "^9.39.1",
    "eslint-plugin-react-hooks": "^7.0.1",
    "eslint-plugin-react-refresh": "^0.4.24",
    "globals": "^16.5.0",
    "postcss": "^8.5.6",
    "rollup-plugin-visualizer": "^6.0.5",
    "tailwindcss": "^4.1.18",
    "vite": "^7.2.4"
  }
}

```

---

## 文件: src\App.css

```css
#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.react:hover {
  filter: drop-shadow(0 0 2em #61dafbaa);
}

@keyframes logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: no-preference) {
  a:nth-of-type(2) .logo {
    animation: logo-spin infinite 20s linear;
  }
}

.card {
  padding: 2em;
}

.read-the-docs {
  color: #888;
}

```

---

## 文件: src\App.jsx

```jsx
import React, { Suspense, lazy, useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'; 
import Layout from './components/Layout';

// --- 1. 动态导入 (Lazy Import) ---
const Home = lazy(() => import('./pages/Home'));
const Browse = lazy(() => import('./pages/Browse'));
const Compare = lazy(() => import('./pages/Compare'));
const SearchPage = lazy(() => import('./pages/Search')); 
const Blast = lazy(() => import('./pages/Blast'));
const JBrowse = lazy(() => import('./pages/JBrowse'));
const Download = lazy(() => import('./pages/Download'));

// --- 2. 加载占位符 ---
const PageLoader = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh]">
    <div className="w-12 h-12 border-4 border-slate-200 border-t-teal-600 rounded-full animate-spin"></div>
    <p className="mt-4 text-sm font-medium text-slate-500 font-serif">Loading SoyGRN Module...</p>
  </div>
);

const Placeholder = ({ title }) => (
  <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
    <h2 className="mb-4 text-3xl font-bold text-slate-300 font-serif">🚧</h2>
    <h3 className="text-xl font-bold text-slate-700">{title}</h3>
    <p className="text-slate-500">Module under construction</p>
  </div>
);

// --- 3. 内部路由逻辑组件 ---
function AppRoutes() {
  const location = useLocation();
  const isJBrowsePath = location.pathname === '/jbrowse';
  const [hasLoadedJBrowse, setHasLoadedJBrowse] = useState(false);

  // 【核心修改点】: 监听路由变化，强制滚动到顶部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (isJBrowsePath && !hasLoadedJBrowse) {
      setHasLoadedJBrowse(true);
    }
  }, [isJBrowsePath, hasLoadedJBrowse]);

  return (
    <Layout>
      <div style={{ display: isJBrowsePath ? 'none' : 'block' }}>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/blast" element={<Blast />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/download" element={<Download />} />
            <Route path="/jbrowse" element={null} />
          </Routes>
        </Suspense>
      </div>

      {hasLoadedJBrowse && (
        <div style={{ display: isJBrowsePath ? 'block' : 'none' }}>
          <Suspense fallback={<PageLoader />}>
            <JBrowse />
          </Suspense>
        </div>
      )}
    </Layout>
  );
}

// --- 4. 主入口 ---
function App() {
  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  );
}

export default App;
```

---

## 文件: src\components\Blast\BlastForm.jsx

```jsx
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
```

---

## 文件: src\components\Blast\BlastResults.jsx

```jsx
import React from 'react';
import { AlignLeft, ExternalLink, Activity, Percent, MoveHorizontal, Hash, FileText, Table } from 'lucide-react';

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
      hit.eValue,
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
              {results.hits.map((hit, index) => {
                return (
                  <tr key={hit.id + index} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4 valign-top">
                      {isProteinMode ? (
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center px-3 py-1.5 rounded-md bg-blue-50 text-blue-700 border border-blue-100 font-mono text-sm font-bold shadow-sm break-all">
                              {/* 这里只是展示用的清洗，不影响实际链接 */}
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
                        {hit.eValue}
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
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. 详细比对区域 (Detail View) */}
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
    let refName = hit.id;
    refName = refName.replace(/chr\s?/gi, '');
    refName = refName.replace(/^0+/, '');

    const PADDING = 2000;
    let start = parseInt(hit.sStart);
    let end = parseInt(hit.sEnd);

    if (start > end) {
      [start, end] = [end, start];
    }

    const finalStart = Math.max(1, start - PADDING);
    const finalEnd = end + PADDING;
    const locationString = `${refName}:${finalStart}..${finalEnd}`;
    const url = `/#/jbrowse?loc=${encodeURIComponent(locationString)}&tracks=gene_models.gff3`;
    
    window.open(url, '_blank');
  };

  // --- [本次核心修复] 外部数据库跳转 (Protein Mode) ---
  const handleExternalLink = (e) => {
    e.preventDefault();
    
    // 原始 ID 可能是 "gb|KRH43389|"。如果不处理直接用 split('|')[0]，会得到 "gb"，导致链接错误。
    let cleanId = hit.id;
    
    // 1. 去掉常见的前缀 (gb|, ref|, sp|, gi|)
    cleanId = cleanId.replace(/^(gb|ref|sp|gi|emb|dbj|tpg)\|/i, '');
    
    // 2. 去掉剩余的竖线
    cleanId = cleanId.replace(/\|/g, '');
    
    // 3. 去除可能存在的首尾空格
    cleanId = cleanId.trim();

    // 结果 cleanId 应为 "KRH43389"
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
                isProteinMode 
                  ? 'bg-blue-50 text-blue-800 border-blue-200' 
                  : 'bg-soy-100 text-soy-900 border-soy-200'
              }`}>
                 {/* 这里的显示逻辑也同步优化一下，去掉丑陋的 gb| */}
                {hit.id.replace(/^(gb|ref|sp|gi)\|/i, '').replace(/\|/g, '')}
              </h5>
            </div>
            <div className="inline-block px-3 py-1.5 bg-slate-100/80 border border-slate-200 rounded-lg max-w-3xl">
              <p className="text-[13px] font-medium text-slate-700 font-mono leading-snug break-all italic">
                {hit.desc}
              </p>
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
        <MetricItem icon={MoveHorizontal} label="Expect" value={hit.eValue} />
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
        <SequenceViewer 
          qSeq={hit.qSeq} 
          matchSeq={hit.matchSeq} 
          sSeq={hit.sSeq} 
          qStart={parseInt(hit.qStart)} 
          sStart={parseInt(hit.sStart)} 
        />
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
             <span className="w-16 shrink-0"></span>
             <span className="w-20 pr-4 shrink-0"></span>
             <span className="font-bold tracking-wide">{chunk.mChunk}</span>
             <span className="w-20 shrink-0"></span>
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
```

---

## 文件: src\components\Browse\FamilyGrid.jsx

```jsx
import React from 'react';
import { Layers } from 'lucide-react';

export default function FamilyGrid({ families, onSelectFamily }) {
  // families 是一个对象: { "bZIP": [...], "MYB": [...] }
  const familyNames = Object.keys(families);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {familyNames.map((name) => (
        <button
          key={name}
          onClick={() => onSelectFamily(name)}
          className="flex flex-col items-center p-6 bg-white border border-slate-200 rounded-xl hover:shadow-lg hover:border-soy-300 hover:bg-soy-50 transition-all group"
        >
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 mb-3 group-hover:bg-soy-200 group-hover:text-soy-800 transition-colors">
            <Layers size={24} />
          </div>
          <h3 className="font-bold text-slate-700 font-serif text-lg">{name}</h3>
          <span className="text-xs text-slate-400 mt-1">
            {families[name].length} Members
          </span>
        </button>
      ))}
    </div>
  );
}
```

---

## 文件: src\components\Browse\TFDetailTable.jsx

```jsx
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

```

---

## 文件: src\components\Browse\TFList.jsx

```jsx
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
```

---

## 文件: src\components\Compare\AnnotationView.jsx

```jsx
import React from 'react';
import { MapPin, BookOpen, Tag } from 'lucide-react';

const GeneCard = ({ id, data, variant }) => {
  // --- 1. 配色方案配置 (全绿色系) ---
  const styles = {
    primary: { // 左侧：经典 Soy Green (深翡翠)
      wrapperBorder: 'border-emerald-100',
      headerBg: 'bg-emerald-50',
      headerText: 'text-emerald-900',
      iconBg: 'bg-white',
      iconColor: 'text-emerald-600',
      locationBadge: 'bg-emerald-50/50 text-emerald-700 border-emerald-100',
      tagBase: 'bg-emerald-50/30 text-emerald-600 border-emerald-100 hover:border-emerald-300'
    },
    secondary: { // 右侧：Teal/Sage (冷青色/灰绿色) - 区分度高且和谐
      wrapperBorder: 'border-teal-100',
      headerBg: 'bg-teal-50',
      headerText: 'text-teal-900',
      iconBg: 'bg-white',
      iconColor: 'text-teal-600',
      locationBadge: 'bg-teal-50/50 text-teal-700 border-teal-100',
      tagBase: 'bg-teal-50/30 text-teal-600 border-teal-100 hover:border-teal-300'
    }
  };

  const style = styles[variant];

  // 处理 GO Terms
  const getGoTerms = (terms) => {
    if (!terms) return [];
    if (Array.isArray(terms)) return terms;
    if (typeof terms === 'string') {
      return terms.split(';').filter(t => t.trim() !== '');
    }
    return [];
  };

  const goTerms = data ? getGoTerms(data.go_terms) : [];

  return (
    <div className={`flex flex-col h-full rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300 border ${style.wrapperBorder}`}>
      
      {/* Header */}
      <div className={`px-5 py-4 border-b border-slate-50 ${style.headerBg} flex justify-between items-center`}>
        <h3 className={`text-xl font-bold font-serif tracking-tight ${style.headerText}`}>
          {id}
        </h3>
        {/* 装饰性图标 */}
        <div className={`p-2 rounded-full shadow-sm ${style.iconBg} ${style.iconColor}`}>
          <BookOpen size={16} />
        </div>
      </div>
      
      {/* Body */}
      <div className="p-5 flex-1 flex flex-col gap-5">
        
        {data ? (
          <>
            {/* 
               --- 2. 对齐核心修复 --- 
               给 Description 增加 min-h-[3.5rem] (约3行高度)。
               这确保了无论文字长短，下方的 Location 都会从同一水平线开始。
            */}
            <div>
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Description</h4>
              <p className="text-slate-700 leading-relaxed font-medium text-sm min-h-[3.5rem]">
                {data.description || "No description available."}
              </p>
            </div>

            {/* Location */}
            <div>
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Location</h4>
              <div className={`flex items-center gap-2 px-3 py-2 rounded-lg w-fit border ${style.locationBadge}`}>
                <MapPin size={14} className="shrink-0" /> 
                <span className="font-mono text-xs">{data.location || "Unknown"}</span>
              </div>
            </div>

            {/* GO Terms (mt-auto 保持底部对齐) */}
            <div className="mt-auto pt-4 border-t border-slate-50">
              <div className="flex items-center gap-2 mb-2">
                <Tag size={13} className="text-slate-400"/>
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Gene Ontology</h4>
              </div>
              
              {goTerms.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {goTerms.map((go, index) => (
                    <span 
                      key={index} 
                      className={`px-2.5 py-1 border rounded-md text-xs font-mono transition-colors cursor-default ${style.tagBase}`}
                      title={go}
                    >
                      {go}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-xs text-slate-400 italic">No GO terms annotated</span>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-400 text-sm italic min-h-[150px]">
            No data found in database.
          </div>
        )}
      </div>
    </div>
  );
};

export default function AnnotationView({ idA, idB, metaA, metaB }) {
  return (
    <div className="flex flex-col md:flex-row gap-6 animate-in slide-in-from-bottom-4 duration-500 items-stretch">
      
      {/* 左侧：Primary (Emerald Green) */}
      <div className="flex-1">
        <GeneCard 
          id={idA} 
          data={metaA} 
          variant="primary"
        />
      </div>
      
      {/* 右侧：Secondary (Teal Green) - 更协调的深浅绿色搭配 */}
      <div className="flex-1">
        <GeneCard 
          id={idB} 
          data={metaB} 
          variant="secondary"
        />
      </div>
    </div>
  );
}
```

---

## 文件: src\components\Compare\CompareForm.jsx

```jsx
import React from 'react';
import { GitCompare, ArrowRightLeft, MousePointerClick } from 'lucide-react';

export default function CompareForm({ mode, setMode, idA, setIdA, idB, setIdB, onCompare }) {
  
  const config = {
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
    }
  };

  const current = config[mode];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      <div className="flex items-center gap-2 mb-6 text-slate-800 font-bold text-lg">
        <ArrowRightLeft className="text-soy-700" />
        Configuration
      </div>

      <div className="space-y-6">
        {/* 1. 模式切换按钮 */}
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
                mode === m 
                ? 'bg-white text-soy-700 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Compare {m === 'tf' ? 'TFs' : 'Targets'}
            </button>
          ))}
        </div>

        {/* 2. 输入区域 */}
        <div className="grid grid-cols-1 gap-5">
          
          {/* Input A */}
          <div className="space-y-2">
            <div className="flex justify-between items-end">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {current.titleA}
              </label>
              {/* 
                  交互优化：
                  1. text-slate-600: 默认深灰色
                  2. hover:text-blue-600: 悬停变蓝
                  3. active:scale-95: 点击时轻微缩小
                  4. transition-all duration-200: 动画丝滑过渡
              */}
              <button 
                onClick={() => setIdA(current.exampleA)}
                className="group flex items-center gap-1 text-xs font-medium text-slate-600 transition-all duration-200 hover:text-blue-600 active:scale-95 active:text-blue-700"
                title="Click to auto-fill"
              >
                <MousePointerClick size={12} className="transition-transform group-hover:rotate-12"/>
                Try: <span className="font-mono select-all">{current.exampleA}</span>
              </button>
            </div>
            
            <input 
              value={idA}
              onChange={e => setIdA(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-soy-500/50 outline-none font-mono text-sm text-slate-700"
              placeholder="Enter Gene ID..."
            />
          </div>

          {/* Input B */}
          <div className="space-y-2">
             <div className="flex justify-between items-end">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {current.titleB}
              </label>
              {/* 同样的交互效果 */}
              <button 
                onClick={() => setIdB(current.exampleB)}
                className="group flex items-center gap-1 text-xs font-medium text-slate-600 transition-all duration-200 hover:text-blue-600 active:scale-95 active:text-blue-700"
                title="Click to auto-fill"
              >
                <MousePointerClick size={12} className="transition-transform group-hover:rotate-12"/>
                Try: <span className="font-mono select-all">{current.exampleB}</span>
              </button>
            </div>

            <input 
              value={idB}
              onChange={e => setIdB(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-soy-500/50 outline-none font-mono text-sm text-slate-700"
              placeholder="Enter Gene ID..."
            />
          </div>

        </div>

        {/* 3. 运行按钮 */}
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
```

---

## 文件: src\components\Compare\NetworkVenn.jsx

```jsx
import React from 'react';
// --- 1. 按需引入核心模块 ---
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { GraphChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

// --- 2. 注册必须的组件 ---
echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GraphChart,
  CanvasRenderer
]);

export default function NetworkVenn({ idA, idB, listA, listB, mode }) {
  const getOption = () => {
    // 1. 数据处理 (保持原有逻辑)
    const setA = new Set(listA);
    const setB = new Set(listB);
    
    const common = listA.filter(x => setB.has(x));
    const uniqueA = listA.filter(x => !setB.has(x));
    const uniqueB = listB.filter(x => !setA.has(x));

    // --- 🎨 颜色配置 ---
    const colorA = '#059669';       // 主节点 A (深绿)
    const colorB = '#f59e0b';       // 主节点 B (琥珀黄)
    const colorCommon = '#475569';  // 共有节点 (深灰)
    const colorSubA = '#6ee7b7';    // 特异节点 A (浅绿)
    const colorSubB = '#fcd34d';    // 特异节点 B (浅黄)

    // 2. 构建节点
    const nodes = [
      { id: 'rootA', name: idA, symbolSize: 50, itemStyle: { color: colorA }, x: -150, y: 0, fixed: true, category: 0 },
      { id: 'rootB', name: idB, symbolSize: 50, itemStyle: { color: colorB }, x: 150, y: 0, fixed: true, category: 1 }
    ];

    const limit = 20;

    // A 的特异节点
    uniqueA.slice(0, limit).forEach((name, i) => {
      nodes.push({ id: `ua-${i}`, name, symbolSize: 10, itemStyle: { color: colorSubA }, category: 2 });
    });

    // B 的特异节点
    uniqueB.slice(0, limit).forEach((name, i) => {
      nodes.push({ id: `ub-${i}`, name, symbolSize: 10, itemStyle: { color: colorSubB }, category: 3 });
    });

    // 共有节点
    common.slice(0, limit).forEach((name, i) => {
      nodes.push({ id: `com-${i}`, name, symbolSize: 15, itemStyle: { color: colorCommon }, category: 4 });
    });

    // 3. 构建连线
    const links = [];
    uniqueA.slice(0, limit).forEach((_, i) => links.push({ source: 'rootA', target: `ua-${i}` }));
    uniqueB.slice(0, limit).forEach((_, i) => links.push({ source: 'rootB', target: `ub-${i}` }));
    common.slice(0, limit).forEach((_, i) => {
      links.push({ source: 'rootA', target: `com-${i}`, lineStyle: { type: 'dashed' } });
      links.push({ source: 'rootB', target: `com-${i}`, lineStyle: { type: 'dashed' } });
    });

    const legendUniqueA = `Unique to ${idA}`;
    const legendUniqueB = `Unique to ${idB}`;

    return {
      title: { 
        text: 'Interaction Overlap', 
        left: 'center',
        top: 10,
        textStyle: { fontFamily: 'serif', color: '#1e293b' },
        subtext: `Common: ${common.length} | Unique ${idA}: ${uniqueA.length} | Unique ${idB}: ${uniqueB.length}`
      },
      tooltip: {},
      legend: { 
        data: [idA, idB, legendUniqueA, legendUniqueB, 'Shared'], 
        bottom: 10 
      },
      series: [{
        type: 'graph',
        layout: 'force',
        data: nodes,
        links: links,
        categories: [
            { name: idA, itemStyle: { color: colorA } },              
            { name: idB, itemStyle: { color: colorB } },              
            { name: legendUniqueA, itemStyle: { color: colorSubA } }, 
            { name: legendUniqueB, itemStyle: { color: colorSubB } }, 
            { name: 'Shared', itemStyle: { color: colorCommon } }     
        ],
        roam: true,
        center: ['5%', '5%'], 
        zoom: 0.85, 
        label: { show: true, position: 'right', fontSize: 10, color: '#64748b' },
        force: { 
          repulsion: 200, 
          gravity: 0.08, 
          edgeLength: 90,
          layoutAnimation: true 
        }
      }]
    };
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-2 h-[500px]">
      {/* --- 3. 使用 Core 组件并传入注册好的 echarts 实例 --- */}
      <ReactEChartsCore 
        echarts={echarts}
        option={getOption()} 
        style={{ height: '100%', width: '100%' }} 
        notMerge={true} 
      />
    </div>
  );
}

```

---

## 文件: src\components\JBrowse\JBrowseView.jsx

```jsx
import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function JBrowseView() {
  // 1. 获取 URL 查询参数
  const [searchParams] = useSearchParams();

  // 2. 计算 iframe src
  const src = useMemo(() => {
    // 基础路径配置 (严格遵循环境策略)
    const JBROWSE_BASE = import.meta.env.DEV
      ? "http://rnainformatics.cn/SoyGRN/api/jbrowse/index.html"
      : "/SoyGRN/api/jbrowse/index.html";
    
    // 基础配置文件路径 (添加时间戳防止缓存)
    const configParams = `config=config.json?v=${Date.now()}`;
    
    // 3. 获取关键参数
    const locationParam = searchParams.get('loc');
    const tracksParam = searchParams.get('tracks') || "gene_models.gff3"; // 默认开启 Gene Models 轨道
    const assemblyParam = "Glycine_max_v2.1"; // 对应 config.json 中的 assemblyName

    // 4. 逻辑分支
    if (locationParam) {
      // --- A. 跳转模式 (From BLAST/Search) ---
      // 当存在 loc 参数时，我们不加载 session，而是直接指定位置和轨道
      // 格式: index.html?config=...&assembly=...&loc=...&tracks=...
      return `${JBROWSE_BASE}?${configParams}&assembly=${assemblyParam}&loc=${encodeURIComponent(locationParam)}&tracks=${encodeURIComponent(tracksParam)}`;
    } else {
      // --- B. 默认模式 (Direct Visit) ---
      // 加载预设的 Session (包含特定的轨道开启状态和视图位置)
      const SESSION_DATA = "encoded-eJyFUl1v4jAQ_CvIzzlKPgiQt2vR0S_1oEXXnqoKGWedWDgxZzvQCPHfu04Q5XqtLm87Ozs7ns2OiJQk5PJmAas_o3k2IB4paQGIPah6CbSc3N91xsBpJW0n6AXxWXAWdPxREoZJ4CN7I2BrSPK8a5XG298_r77PBvML7Nl67ZRuRQlUT6BUBfxCuutoylYnY7J-jGT9dLMdvo_9AGorDXNHRZSpkous0tQKVWI7gxIWhUpBmm7GeYiUVJi1pPWJbp7PZvNxra57H-2cUyPYuB3AXg4iy-1Uw0WzhiTRKPz_zm-faO1f9i8eUZwbsNNXkvQHsUeW6yloV_lxPOr6w8CP_LDfGwwj_2gb0nvIcE9rX8MGtAF8BKfSgIcAv2sv42I3lmpLkp5HoEROPx6GfhxEHqHGQLGU9YE7kTUTzjR9XWyCrn-wxxWrUNxd4-qfsxkwBn1MZZWJxg0ObEWagcViRyZapOdKrQqqV65ugv4LPEZ9ij42CmSPWQvQVLNcMCqb6z6ABGaVPqp9zThKX35FOexp_8yPT-OUgXWh7vb4vQFrPf6Z";
      return `${JBROWSE_BASE}?${configParams}&session=${SESSION_DATA}`;
    }
  }, [searchParams]); // 依赖项加入 searchParams，确保路由参数变化时 iframe 更新

  return (
    <div className="w-full h-[calc(100vh-8rem)] bg-white border rounded-lg shadow-sm border-slate-200 overflow-hidden">
      <iframe 
        src={src} 
        className="w-full h-full border-none" 
        title="SoybeanGRN Genome Browser" 
        allow="fullscreen; clipboard-write" 
      />
    </div>
  );
}
```

---

## 文件: src\components\Layout.jsx

```jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Database, Flame, Eye, GitCompare, Download, Home, Mail, MapPin } from 'lucide-react';

const tabs = [
  { name: 'Home', path: '/', icon: <Home size={18} /> },
  { name: 'Search', path: '/search', icon: <Search size={18} /> },
  { name: 'Browse', path: '/browse', icon: <Database size={18} /> },
  { name: 'Blast', path: '/blast', icon: <Flame size={18} /> },
  { name: 'JBrowse', path: '/jbrowse', icon: <Eye size={18} /> },
  { name: 'Compare', path: '/compare', icon: <GitCompare size={18} /> },
  { name: 'Download', path: '/download', icon: <Download size={18} /> },
];

export default function Layout({ children }) {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen font-sans text-slate-800 bg-soy-50">
      
      {/* 顶部导航栏 */}
      <header className="sticky top-0 z-50 border-b shadow-sm bg-white/90 backdrop-blur-md border-slate-200">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center flex-shrink-0 gap-3">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="flex items-center justify-center w-8 h-8 font-bold text-white transition-colors rounded-lg shadow-md bg-soy-700 group-hover:bg-soy-800">
                  S
                </div>
                <span className="text-2xl font-bold tracking-tight font-serif text-slate-900">
                  SoybeanGRN
                </span>
              </Link>
            </div>
            <nav className="hidden space-x-1 md:flex">
              {tabs.map((tab) => {
                const isActive = location.pathname === tab.path;
                return (
                  <Link
                    key={tab.name}
                    to={tab.path}
                    className={`
                      flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
                      ${isActive 
                        ? 'bg-soy-100 text-soy-700 ring-1 ring-soy-200 shadow-sm' 
                        : 'text-slate-600 hover:text-soy-700 hover:bg-soy-50'}
                    `}
                  >
                    {tab.icon}
                    {tab.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* 内容区域 */}
      <main className="flex-1 w-full px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {children}
      </main>

      {/* 页脚 */}
      <footer className="py-6 mt-auto border-t bg-white border-slate-200">
        <div className="px-4 mx-auto text-center max-w-7xl">
          
          {/* 第一行：联系方式 */}
          <div className="flex flex-col items-center justify-center gap-3 md:flex-row md:gap-8 text-sm text-slate-600">
            
            {/* 邮箱 */}
            <div className="flex items-center gap-2 transition-colors hover:text-soy-700">
              <Mail className="w-3.5 h-3.5 text-soy-600" />
              <a href="mailto:cuicui001116@163.com" className="hover:underline">
                cuicui001116@163.com
              </a>
            </div>

            {/* 地址：把吉林农业大学放在最前面强调 */}
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-soy-600 flex-shrink-0" />
              <span className="text-slate-500">
                Jilin Agricultural University, No. 2888 Xincheng St, Changchun, China
              </span>
            </div>
            
          </div>

          {/* 第二行：版权信息 */}
          <div className="mt-2 text-xs text-slate-400 font-serif">
            © 2026 SoybeanGRN Database. All rights reserved.
          </div>
          
        </div>
      </footer>
    </div>
  );
}
```

---

## 文件: src\components\Search\ResultTable.jsx

```jsx
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
```

---

## 文件: src\components\Search\SearchForm.jsx

```jsx
import React from 'react';
import { Search } from 'lucide-react';

export default function SearchForm({ searchTerm, onSearchChange, searchType, onTypeChange }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
      
      {/* 搜索类型切换 (Radio Group) */}
      <div className="flex gap-6">
        <label className="flex items-center gap-2 cursor-pointer group">
          <input 
            type="radio" 
            name="searchType" 
            value="tf" 
            checked={searchType === 'tf'} 
            onChange={(e) => onTypeChange(e.target.value)}
            className="accent-soy-700 w-4 h-4"
          />
          <span className={`text-sm font-medium transition-colors ${searchType === 'tf' ? 'text-soy-700' : 'text-slate-500 group-hover:text-slate-700'}`}>
            Search by Transcription Factor
          </span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer group">
          <input 
            type="radio" 
            name="searchType" 
            value="target" 
            checked={searchType === 'target'} 
            onChange={(e) => onTypeChange(e.target.value)}
            className="accent-soy-700 w-4 h-4"
          />
          <span className={`text-sm font-medium transition-colors ${searchType === 'target' ? 'text-soy-700' : 'text-slate-500 group-hover:text-slate-700'}`}>
            Search by Target Gene
          </span>
        </label>
      </div>

      {/* 搜索框 */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <Search className="w-5 h-5 text-slate-400 group-focus-within:text-soy-600 transition-colors" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="block w-full py-3 pl-11 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-soy-500/50 focus:border-soy-500 transition-all"
          placeholder={searchType === 'tf' ? "Enter TF ID (e.g., GLYMA_01G000600)..." : "Enter Target ID (e.g., GLYMA_01G038100)..."}
        />
      </div>
    </div>
  );
}
```

---

## 文件: src\index.css

```css
/* 1. 引入 Tailwind */
@import "tailwindcss";

/* 2. 定义我们的学术风格主题 */
@theme {
  /* 自定义颜色：大豆绿系列 */
  --color-soy-50: #f4fbf5;
  --color-soy-100: #eef8f0;
  --color-soy-200: #dcfce7;
  --color-soy-500: #22c55e;
  --color-soy-700: #15803d;
  --color-soy-900: #14532d;

  /* 自定义字体 */
  --font-serif: "Merriweather", "Georgia", serif;
  --font-sans: "Inter", system-ui, sans-serif;
}

/* 3. 一些全局基础样式 */
body {
  background-color: var(--color-soy-50); /* 使用我们要的淡绿色背景 */
}
```

---

## 文件: src\main.jsx

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

```

---

## 文件: src\pages\Blast.jsx

```jsx
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
```

---

## 文件: src\pages\Browse.jsx

```jsx
import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import FamilyGrid from '../components/Browse/FamilyGrid';
import TFList from '../components/Browse/TFList';
import TFDetailTable from '../components/Browse/TFDetailTable';
import { loadFamilyIndex, loadInteractionDetails } from '../utils/browseLoader';

export default function Browse() {

  const [loading, setLoading] = useState(true);
  const [families, setFamilies] = useState({}); 
  
  const [viewState, setViewState] = useState('families');
  const [selectedFamily, setSelectedFamily] = useState(null);
  
  const [selectedTF, setSelectedTF] = useState(null);
  const [interactionData, setInteractionData] = useState([]);
  const [detailLoading, setDetailLoading] = useState(false);

  // --- Init ---
  useEffect(() => {
    async function init() {
      const data = await loadFamilyIndex();
      setFamilies(data);
      setLoading(false);
    }
    init();
  }, []);

  const handleFamilySelect = (famName) => {
    setSelectedFamily(famName);
    setViewState('tfs');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTFSelect = async (tfId) => {
    setDetailLoading(true); 
    setSelectedTF(tfId);
    
    const data = await loadInteractionDetails(tfId);
    setInteractionData(data);
    
    setDetailLoading(false);
    setViewState('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToFamilies = () => {
    setViewState('families');
    setSelectedFamily(null);
  };

  const handleBackToTFs = () => {
    setViewState('tfs');
    setSelectedTF(null);
    setInteractionData([]); 
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Loader2 className="w-10 h-10 text-soy-600 animate-spin" />
        <p className="text-slate-500 font-medium">Loading Database Index...</p>
      </div>
    );
  }

  if (detailLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Loader2 className="w-10 h-10 text-soy-600 animate-spin" />
        <p className="text-slate-500 font-medium">Fetching interactions for {selectedTF}...</p>
      </div>
    );
  }

  return (
    // 修改：移除了 animate-in fade-in duration-500
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      {viewState === 'families' && (
        <div className="mb-10 text-center space-y-3">
          <h1 className="text-4xl font-bold font-serif text-slate-900">Browse TF Families</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Explore transcription factors classified by DNA-binding domains.
          </p>
        </div>
      )}

      {viewState === 'families' && (
        <FamilyGrid 
          families={families} 
          onSelectFamily={handleFamilySelect} 
        />
      )}

      {viewState === 'tfs' && (
        <TFList 
          family={selectedFamily}
          tfs={families[selectedFamily] || []}
          onSelectTF={handleTFSelect}
          onBack={handleBackToFamilies}
        />
      )}

      {viewState === 'details' && (
        <TFDetailTable 
          tfId={selectedTF}
          interactions={interactionData}
          onBack={handleBackToTFs}
        />
      )}

    </div>
  );
}
```

---

## 文件: src\pages\Compare.jsx

```jsx
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
```

---

## 文件: src\pages\Download.jsx

```jsx
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

```

---

## 文件: src\pages\Home.jsx

```jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Activity, Database, GitCompare, Dna, ChevronDown, Check, Map as MapIcon, Loader2, Maximize } from 'lucide-react';

// --- 核心优化：按需引入 D3 模块 ---
import { 
  select, 
  scaleOrdinal, 
  zoom, 
  zoomIdentity, 
  forceSimulation, 
  forceLink, 
  forceManyBody, 
  forceCenter, 
  forceCollide, 
  drag 
} from 'd3';

const API_BASE = import.meta.env.DEV ? "http://rnainformatics.cn/SoyGRN/api" : "/SoyGRN/api";

const D3RegulatoryNetwork = ({ data }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!svgRef.current || !data) return;

    const { hubs, edges } = data;
    const width = 950;
    const height = 500;

    // 1. 数据准备 (移除 d3. 前缀)
    const colorScale = scaleOrdinal()
      .domain(hubs.map(h => h.tf_id))
      .range(["#059669", "#10b981", "#34d399", "#064e3b", "#047857", "#065f46"]);

    const nodesMap = new Map();
    hubs.forEach(h => {
      nodesMap.set(h.tf_id, { 
        id: h.tf_id, isTF: true, color: colorScale(h.tf_id), radius: 10 
      });
    });

    const links = edges.map(e => {
      if (!nodesMap.has(e.target_id)) {
        nodesMap.set(e.target_id, { 
          id: e.target_id, isTF: false, color: "#cbd5e1", radius: 4 
        });
      }
      return { source: e.tf_id, target: e.target_id };
    });

    const nodes = Array.from(nodesMap.values());

    // 2. 画布与容器
    const svg = select(svgRef.current);
    svg.selectAll("*").remove();
    const mainContainer = svg.append("g").attr("class", "zoom-container");

    const zoomBehavior = zoom()
      .scaleExtent([0.1, 8])
      .on("zoom", (event) => {
        mainContainer.attr("transform", event.transform);
      });
    svg.call(zoomBehavior);

    // 3. 仿真引擎配置
    const simulation = forceSimulation(nodes)
      .force("link", forceLink(links).id(d => d.id).distance(70).strength(0.4))
      .force("charge", forceManyBody().strength(-350).distanceMax(600))
      .force("center", forceCenter(width / 2, height / 2))
      .force("collide", forceCollide().radius(d => d.isTF ? 30 : 12).iterations(2))
      .velocityDecay(0.5); 

    for (let i = 0; i < 120; ++i) simulation.tick();

    // 4. 绘制元素
    const link = mainContainer.append("g")
      .attr("stroke", "#e2e8f0")
      .attr("stroke-opacity", 0.5)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", 0.8);

    const node = mainContainer.append("g")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .call(drag()
        .on("start", (event) => {
          if (!event.active) simulation.alphaTarget(0.01).restart();
          event.subject.fx = event.subject.x;
          event.subject.fy = event.subject.y;
        })
        .on("drag", (event) => {
          event.subject.fx = event.x;
          event.subject.fy = event.y;
        })
        .on("end", (event) => {
          if (!event.active) simulation.alphaTarget(0);
          event.subject.fx = null;
          event.subject.fy = null;
        }));

    node.append("circle")
      .attr("r", d => d.radius)
      .attr("fill", d => d.isTF ? d.color : "#f8fafc")
      .attr("stroke", d => d.isTF ? "#fff" : d.color)
      .attr("stroke-width", 1.5);

    node.append("text")
      .filter(d => d.isTF)
      .text(d => d.id)
      .attr("x", 12)
      .attr("y", 4)
      .style("font-size", "9px")
      .style("fill", "#64748b")
      .style("pointer-events", "none");

    // 5. 逐帧更新
    simulation.on("tick", () => {
      link.attr("x1", d => d.source.x).attr("y1", d => d.source.y)
          .attr("x2", d => d.target.x).attr("y2", d => d.target.y);
      node.attr("transform", d => `translate(${d.x},${d.y})`);
    });

    // 初始缩放 (移除 d3. 前缀)
    svg.call(zoomBehavior.transform, zoomIdentity.translate(0,0).scale(1));

    return () => simulation.stop();
  }, [data]);

  return (
    <div className="relative w-full h-full">
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2 px-3 py-1.5 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-full text-[10px] font-bold text-slate-400 uppercase tracking-widest pointer-events-none">
        <Maximize size={12} />
        Scroll to Zoom / Drag to Pan
      </div>
      <svg 
        ref={svgRef} 
        viewBox="0 0 950 500" 
        className="w-full h-full cursor-grab active:cursor-grabbing outline-none"
      />
    </div>
  );
};

export default function Home() {
  const navigate = useNavigate();
  const [homeQuery, setHomeQuery] = useState('');
  const [homeType, setHomeType] = useState('tf');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [networkData, setNetworkData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const searchOptions = [
    { value: 'tf', label: 'TF ID', placeholder: 'e.g., GLYMA_01G000600...' },
    { value: 'target', label: 'Target ID', placeholder: 'e.g., GLYMA_01G038100...' }
  ];
  const currentOption = searchOptions.find(opt => opt.value === homeType);

  useEffect(() => {
    fetch(`${API_BASE}/network/home-summary`)
      .then(res => res.json())
      .then(data => {
        setNetworkData(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Fetch Error:", err);
        setIsLoading(false);
      });
  }, []);

  const handleHomeSearch = () => {
    if (homeQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(homeQuery)}&type=${homeType}`);
    }
  };

  return (
    <div className="space-y-20 pb-20 animate-in fade-in duration-700 font-sans text-left">
      <section className="pt-16 text-center space-y-8 px-4">
        <h1 className="text-5xl font-bold leading-tight font-serif text-slate-900 md:text-6xl tracking-tight">
          Soybean <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-soy-700 to-emerald-600">
            Gene Regulatory Network
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-slate-600">
          A comprehensive database identifying transcription factors and their target genes in <i>Glycine max</i>.
        </p>
        
        <div className="relative max-w-2xl mx-auto mt-12 z-20">
            <div className={`relative flex items-center bg-white border rounded-full shadow-lg h-16 pl-2 pr-2 transition-all ${isDropdownOpen ? 'border-soy-400 ring-4 ring-soy-500/10' : 'border-slate-200'}`}>
                <div className="relative h-full flex items-center border-r border-slate-100">
                    <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center gap-2 px-4 h-full text-slate-600 font-semibold text-sm outline-none">
                        <span>{currentOption.label}</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-slate-100 rounded-xl shadow-xl overflow-hidden z-50">
                            {searchOptions.map((opt) => (
                                <button key={opt.value} onClick={() => { setHomeType(opt.value); setIsDropdownOpen(false); }}
                                    className={`w-full text-left px-4 py-3 text-sm hover:bg-slate-50 ${homeType === opt.value ? 'bg-soy-50 text-soy-900 font-bold' : 'text-slate-600'}`}>
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                <input type="text" value={homeQuery} onChange={(e) => setHomeQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleHomeSearch()}
                    className="flex-1 h-full pl-4 pr-4 text-lg bg-transparent border-none focus:ring-0 outline-none text-slate-900"
                    placeholder={currentOption.placeholder} />
                <button onClick={handleHomeSearch} className="bg-soy-700 hover:bg-soy-800 text-white h-12 px-8 rounded-full font-semibold transition-all">
                    Search
                </button>
            </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4">
         <div className="relative bg-white shadow-xl shadow-slate-200/50 rounded-3xl border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <div className="flex items-center gap-2 text-soy-800 font-semibold text-sm">
                    <Activity className="w-4 h-4" />
                    <span>Global Regulatory Landscape (100 Top Hub TFs & 100 Targets)</span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-emerald-600"></span>
                        <span className="text-[10px] text-slate-500 font-bold">TF HUB</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-slate-200 border border-slate-400"></span>
                        <span className="text-[10px] text-slate-500 font-bold">TARGET</span>
                    </div>
                </div>
            </div>
            <div className="relative h-[500px] w-full bg-slate-50/10">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center h-full space-y-3">
                    <Loader2 className="w-10 h-10 text-soy-600 animate-spin" />
                    <p className="text-sm font-medium text-slate-400 font-mono">SIMULATING 200 REGULATORY NODES...</p>
                  </div>
                ) : (
                  networkData && <D3RegulatoryNetwork data={networkData} />
                )}
            </div>
         </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Browse Families", desc: "Explore TF families by DNA-binding domains.", icon: Database, path: "/browse" },
            { title: "Genome Browser", desc: "Interactive visualization of genome annotations.", icon: MapIcon, path: "/jbrowse" },
            { title: "Comparative", desc: "Visualize conserved regulatory modules.", icon: GitCompare, path: "/compare" },
            { title: "Blast Search", desc: "Sequence alignment with local soybean data.", icon: Dna, path: "/blast" }
          ].map((item, idx) => (
            <div key={idx} onClick={() => navigate(item.path)} className="group p-6 bg-white border border-slate-100 shadow-sm cursor-pointer rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col h-full">
              <div className="w-12 h-12 bg-soy-50 rounded-xl flex items-center justify-center text-soy-700 mb-4 group-hover:bg-soy-700 group-hover:text-white transition-all">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold font-serif text-slate-900">{item.title}</h3>
              <p className="mb-4 text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              <div className="mt-auto flex items-center text-sm font-bold text-soy-700">Explore <ArrowRight className="w-4 h-4 ml-1" /></div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

```

---

## 文件: src\pages\JBrowse.jsx

```jsx
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
```

---

## 文件: src\pages\Search.jsx

```jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'; // 路由参数钩子
import SearchForm from '../components/Search/SearchForm';
import ResultTable from '../components/Search/ResultTable';
import { Loader2 } from 'lucide-react';

export default function SearchPage() {
  // --- 1. 获取 URL 参数 ---
  const [searchParams, setSearchParams] = useSearchParams();
  
  // --- 2. 状态初始化 (优先使用 URL 参数) ---
  // 如果 URL 是 /search?q=GmbZIP123&type=tf，则自动填入
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [searchType, setSearchType] = useState(searchParams.get('type') || 'tf');
  
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // --- 3. 环境感知 API 地址 ---
  const API_BASE = import.meta.env.DEV 
    ? "http://rnainformatics.cn/SoyGRN/api" 
    : "/SoyGRN/api";

  // --- 4. 核心逻辑：监听状态变化并搜索 ---
  useEffect(() => {
    // 如果搜索框为空，清空结果
    if (!query.trim()) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    // 防抖定时器 (500ms)
    const timer = setTimeout(async () => {
      try {
        // 构造请求 URL
        const url = `${API_BASE}/search?q=${encodeURIComponent(query)}&type=${searchType}`;
        console.log("正在请求 API:", url);

        const res = await fetch(url);
        
        // 检查返回类型 (防止 404 HTML 页面导致 JSON 解析崩溃)
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("text/html")) {
            throw new Error("Received HTML instead of JSON. Check API path.");
        }

        if (!res.ok) throw new Error(`Network error: ${res.status}`);
        
        const data = await res.json();
        setResults(data.results || []);
        
      } catch (error) {
        console.error("Search API Error:", error);
        setResults([]); 
      } finally {
        setIsSearching(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query, searchType]); // 依赖项：只要 query 或 searchType 改变，就触发

  // --- 5. 处理类型切换 ---
  // 当用户在当前页面手动切换 Radio 时，我们更新状态
  const handleTypeChange = (newType) => {
    setSearchType(newType);
    setQuery(''); // 切换类型时清空关键词，避免逻辑混淆
    setResults([]);
    
    // 可选：静默更新 URL，这样用户刷新页面时状态保留 (不推入历史记录)
    setSearchParams({ type: newType, q: '' }, { replace: true });
  };

  // --- 6. 处理输入框变化 ---
  const handleSearchChange = (newVal) => {
    setQuery(newVal);
    // 可选：实时更新 URL q 参数
    // setSearchParams({ type: searchType, q: newVal }, { replace: true });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold font-serif text-slate-900">Search Regulatory Network</h1>
        <p className="text-slate-500">
          Query the interaction database by Transcription Factor or Target Gene ID.
        </p>
      </div>

      <SearchForm 
        searchTerm={query}
        onSearchChange={handleSearchChange}
        searchType={searchType}
        onTypeChange={handleTypeChange}
      />

      {isSearching ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
          <Loader2 className="w-8 h-8 text-soy-600 animate-spin" />
          <p className="text-sm text-slate-500">Searching database...</p>
        </div>
      ) : (
        <ResultTable 
          results={results}
          query={query}
          type={searchType}
        />
      )}
    </div>
  );
}
```

---

## 文件: src\utils\annotationLoader.js

```js
// src/utils/annotationLoader.js
export async function loadAnnotations() {
  try {
    // 记得用相对路径 ./ 防止 404
    const res = await fetch("./annotations.json");
    return await res.json();
  } catch (e) {
    console.error("Failed to load annotations", e);
    return {};
  }
}

```

---

## 文件: src\utils\browseLoader.js

```js
const API_BASE = import.meta.env.DEV
  ? "http://rnainformatics.cn/SoyGRN/api"
  : "/SoyGRN/api";

export async function loadFamilyIndex() {
  try {
    const res = await fetch(`${API_BASE}/browse/families`);
    // 增加更详细的错误日志
    if (!res.ok) {
      const text = await res.text(); // 尝试读取错误信息
      console.error("API Error Response:", text);
      throw new Error(`Failed to fetch families: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Loader Error:", error);
    return {};
  }
}

export async function loadInteractionDetails(tfId) {
  try {
    const params = new URLSearchParams({ tf: tfId });
    const res = await fetch(`${API_BASE}/browse/interactions?${params}`);
    if (!res.ok) throw new Error("Failed to fetch interactions");
    return await res.json();
  } catch (error) {
    console.error(`Loader Error (${tfId}):`, error);
    return [];
  }
}

```

---

## 文件: src\utils\networkLoader.js

```js
/**
 * 解析 TF-Target 文本数据的工具函数
 * 采用 Map 数据结构以支持 O(1) 复杂度的快速查找
 */

export async function loadAndParseNetworkData(url) {
  try {
    const response = await fetch(url);
    const text = await response.text();

    // 初始化两个索引 Map
    // Map<String, Array<String>>
    const tfToTargets = new Map();
    const targetToTFs = new Map();

    const lines = text.split("\n");

    // 使用 for 循环比 forEach 性能略好，适合处理大数组
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue; // 跳过空行

      // 分割每行数据
      const [tf, target] = line.split("\t");

      if (tf && target) {
        // 1. 构建 TF -> Target 索引
        if (!tfToTargets.has(tf)) {
          tfToTargets.set(tf, []);
        }
        tfToTargets.get(tf).push(target);

        // 2. 构建 Target -> TF 索引
        if (!targetToTFs.has(target)) {
          targetToTFs.set(target, []);
        }
        targetToTFs.get(target).push(tf);
      }
    }

    return { tfToTargets, targetToTFs, totalLines: lines.length };
  } catch (error) {
    console.error("Failed to load network data:", error);
    return { tfToTargets: new Map(), targetToTFs: new Map(), totalLines: 0 };
  }
}

```

---

## 文件: vite.config.js

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  base: "./",
  plugins: [
    react(),
    tailwindcss(),
    visualizer({
      open: false,
      gzipSize: true,
      filename: "stats.html",
    }),
  ],
  // 使用内置的 esbuild 进行优化，无需额外安装 terser
  esbuild: {
    // 同样可以实现丢弃 console 和 debugger
    drop: ["console", "debugger"],
  },
  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        // 优化后的分块策略，防止循环依赖
        manualChunks(id) {
          if (id.includes("node_modules")) {
            // 1. 将大型图表库独立拆出 (ECharts, D3)
            if (id.includes("echarts") || id.includes("zrender")) {
              return "vendor-charts";
            }
            if (id.includes("d3")) {
              return "vendor-d3";
            }
            // 2. 其他第三方库（如 lucide, react 等）合并为一个 vendor
            // 这样可以避免 echarts-for-react 与 react 分开导致的循环引用
            return "vendor-libs";
          }
        },
      },
    },
  },
});

```

---

