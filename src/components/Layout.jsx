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