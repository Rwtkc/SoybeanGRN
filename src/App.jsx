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