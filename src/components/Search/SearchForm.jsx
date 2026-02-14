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