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
