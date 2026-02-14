import React from 'react';
import { MapPin, BookOpen, Tag } from 'lucide-react';

const CARD_STYLES = {
  primary: {
    wrapperBorder: 'border-emerald-100',
    headerBg: 'bg-emerald-50',
    headerText: 'text-emerald-900',
    iconBg: 'bg-white',
    iconColor: 'text-emerald-600',
    locationBadge: 'bg-emerald-50/50 text-emerald-700 border-emerald-100',
    tagBase: 'bg-emerald-50/30 text-emerald-600 border-emerald-100 hover:border-emerald-300',
  },
  secondary: {
    wrapperBorder: 'border-teal-100',
    headerBg: 'bg-teal-50',
    headerText: 'text-teal-900',
    iconBg: 'bg-white',
    iconColor: 'text-teal-600',
    locationBadge: 'bg-teal-50/50 text-teal-700 border-teal-100',
    tagBase: 'bg-teal-50/30 text-teal-600 border-teal-100 hover:border-teal-300',
  },
};

function getGoTerms(terms) {
  if (!terms) return [];
  if (Array.isArray(terms)) return terms;
  if (typeof terms === 'string') {
    return terms
      .split(';')
      .map((t) => t.trim())
      .filter(Boolean);
  }
  return [];
}

function GeneCard({ id, data, variant }) {
  const style = CARD_STYLES[variant] ?? CARD_STYLES.primary;
  const goTerms = data ? getGoTerms(data.go_terms) : [];

  return (
    <div className={`flex flex-col h-full rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300 border ${style.wrapperBorder}`}>
      <div className={`px-5 py-4 border-b border-slate-50 ${style.headerBg} flex justify-between items-center`}>
        <h3 className={`text-xl font-bold font-serif tracking-tight ${style.headerText}`}>{id}</h3>
        <div className={`p-2 rounded-full shadow-sm ${style.iconBg} ${style.iconColor}`}>
          <BookOpen size={16} />
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col gap-5">
        {data ? (
          <>
            <div>
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Description</h4>
              <p className="text-slate-700 leading-relaxed font-medium text-sm min-h-[3.5rem]">
                {data.description || 'No description available.'}
              </p>
            </div>

            <div>
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Location</h4>
              <div className={`flex items-center gap-2 px-3 py-2 rounded-lg w-fit border ${style.locationBadge}`}>
                <MapPin size={14} className="shrink-0" />
                <span className="font-mono text-xs">{data.location || 'Unknown'}</span>
              </div>
            </div>

            <div className="mt-auto pt-4 border-t border-slate-50">
              <div className="flex items-center gap-2 mb-2">
                <Tag size={13} className="text-slate-400" />
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
}

export default function AnnotationView({ idA, idB, metaA, metaB }) {
  return (
    <div className="flex flex-col md:flex-row gap-6 animate-in slide-in-from-bottom-4 duration-500 items-stretch">
      <div className="flex-1">
        <GeneCard id={idA} data={metaA} variant="primary" />
      </div>
      <div className="flex-1">
        <GeneCard id={idB} data={metaB} variant="secondary" />
      </div>
    </div>
  );
}
