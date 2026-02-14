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