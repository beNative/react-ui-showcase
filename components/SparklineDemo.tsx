
import React from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';

const Sparkline: React.FC<{ data: number[]; color?: string; width?: number; height?: number }> = ({ data, color = '#0ea5e9', width = 120, height = 40 }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;

    const points = data.map((val, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - ((val - min) / range) * height;
        return `${x},${y}`;
    }).join(' ');

    return (
        <svg width={width} height={height} className="overflow-visible">
            <polyline
                points={points}
                fill="none"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <circle 
                cx={(data.length - 1) / (data.length - 1) * width} 
                cy={height - ((data[data.length - 1] - min) / range) * height} 
                r="3" 
                fill={color} 
            />
        </svg>
    );
};

const SparklineDemo: React.FC = () => {
    const data1 = [10, 15, 13, 20, 18, 24, 22, 30];
    const data2 = [30, 25, 20, 22, 18, 15, 12, 10];
    const data3 = [15, 18, 12, 20, 14, 25, 18, 22];

    return (
        <div>
            <LivePreview>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-lg flex flex-col items-start shadow-sm transition-colors">
                        <span className="text-xs text-slate-500 dark:text-slate-500 uppercase font-semibold">Revenue</span>
                        <div className="flex items-end justify-between w-full mt-1">
                            <span className="text-xl font-bold text-slate-900 dark:text-white">$24,500</span>
                            <Sparkline data={data1} color="#10b981" />
                        </div>
                        <span className="text-xs text-green-600 dark:text-green-500 mt-2 flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                            +12%
                        </span>
                    </div>

                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-lg flex flex-col items-start shadow-sm transition-colors">
                        <span className="text-xs text-slate-500 dark:text-slate-500 uppercase font-semibold">Users</span>
                        <div className="flex items-end justify-between w-full mt-1">
                            <span className="text-xl font-bold text-slate-900 dark:text-white">1,204</span>
                            <Sparkline data={data2} color="#ef4444" />
                        </div>
                        <span className="text-xs text-red-600 dark:text-red-500 mt-2 flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                            -5%
                        </span>
                    </div>

                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-lg flex flex-col items-start shadow-sm transition-colors">
                        <span className="text-xs text-slate-500 dark:text-slate-500 uppercase font-semibold">Bounce Rate</span>
                        <div className="flex items-end justify-between w-full mt-1">
                            <span className="text-xl font-bold text-slate-900 dark:text-white">42.5%</span>
                            <Sparkline data={data3} color="#0ea5e9" />
                        </div>
                         <span className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                            Avg. 40%
                        </span>
                    </div>
                </div>
            </LivePreview>
            <TechnicalOverview
                library="Recharts (Sparklines)"
                officialName="recharts/recharts"
                githubUrl="https://github.com/recharts/recharts"
                description="Sparklines are small, intense, simple data visualizations, often word-sized graphics. They are used to show trends in a small amount of space, often alongside text or in tables."
                features={[
                    "Minimalist design (no axes or grids).",
                    "Lightweight and fast to render.",
                    "Highlights trends over exact values.",
                    "SVG-based for scalability."
                ]}
                installation="npm install recharts"
                usage={`import { LineChart, Line } from 'recharts';\n\n<LineChart width={100} height={30} data={data}>\n  <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} dot={false} />\n</LineChart>`}
            />
        </div>
    );
};

export default SparklineDemo;
