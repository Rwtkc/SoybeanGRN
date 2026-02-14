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
