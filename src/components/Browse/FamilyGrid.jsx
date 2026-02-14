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