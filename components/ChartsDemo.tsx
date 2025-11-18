
import React, { useState } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';

const initialData = [
    { name: 'Jan', value: 65 },
    { name: 'Feb', value: 59 },
    { name: 'Mar', value: 80 },
    { name: 'Apr', value: 81 },
    { name: 'May', value: 56 },
    { name: 'Jun', value: 55 },
];

const BarChart: React.FC<{ data: {name: string, value: number}[], showGrid: boolean, showValues: boolean, color: string }> = ({ data, showGrid, showValues, color }) => {
    const chartHeight = 200;
    const chartWidth = 400;
    const barPadding = 10;
    const barWidth = (chartWidth / data.length) - barPadding;
    const maxValue = Math.max(...data.map(d => d.value), 100);

    return (
        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto" aria-labelledby="chartTitle" role="img">
            <title id="chartTitle">Monthly usage bar chart</title>
            {showGrid && (
                <g className="stroke-slate-200 dark:stroke-slate-700" strokeDasharray="4 4">
                     {[0, 0.25, 0.5, 0.75, 1].map((tick, i) => {
                        const y = chartHeight - (tick * chartHeight);
                        return <line key={i} x1="0" y1={y === chartHeight ? y - 1 : y} x2={chartWidth} y2={y === chartHeight ? y - 1 : y} strokeWidth="1" />;
                     })}
                </g>
            )}
            {data.map((d, i) => {
                const barHeight = (d.value / maxValue) * chartHeight;
                const x = i * (barWidth + barPadding) + (barPadding / 2);
                return (
                    <g key={d.name} className="group">
                        <rect
                            x={x}
                            y={chartHeight - barHeight}
                            width={barWidth}
                            height={barHeight}
                            rx="2"
                            fill={color}
                            className="transition-all duration-300 hover:opacity-80"
                        />
                        {showValues && (
                             <text
                                x={x + barWidth / 2}
                                y={chartHeight - barHeight - 5}
                                textAnchor="middle"
                                className="text-xs font-bold fill-slate-700 dark:fill-slate-200 transition-opacity"
                            >
                                {d.value}
                            </text>
                        )}
                        <text
                            x={x + barWidth / 2}
                            y={chartHeight + 15}
                            textAnchor="middle"
                            className="text-xs fill-slate-500 dark:fill-slate-400"
                        >
                            {d.name}
                        </text>
                    </g>
                );
            })}
        </svg>
    );
};

const ChartsDemo: React.FC = () => {
    const [chartData, setChartData] = useState(initialData);
    const [showGrid, setShowGrid] = useState(true);
    const [showValues, setShowValues] = useState(false);
    const [barColor, setBarColor] = useState('#0ea5e9');
    
    const randomizeData = () => {
        setChartData(
            chartData.map(d => ({ ...d, value: Math.floor(Math.random() * 90) + 10 }))
        );
    };

    return (
        <div>
            <LivePreview>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="p-6 bg-white dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                             <BarChart data={chartData} showGrid={showGrid} showValues={showValues} color={barColor} />
                        </div>
                        <div className="flex justify-center">
                            <button
                                onClick={randomizeData}
                                className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 rounded-md text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                            >
                                Randomize Data
                            </button>
                        </div>
                    </div>

                    {/* Configuration */}
                    <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 space-y-4 h-fit">
                        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Configuration</h3>
                        
                        <div className="space-y-3">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={showGrid} 
                                    onChange={(e) => setShowGrid(e.target.checked)}
                                    className="form-checkbox h-4 w-4 text-sky-600 rounded border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-sky-500"
                                />
                                <span className="text-sm text-slate-700 dark:text-slate-300">Show Grid Lines</span>
                            </label>
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={showValues} 
                                    onChange={(e) => setShowValues(e.target.checked)}
                                    className="form-checkbox h-4 w-4 text-sky-600 rounded border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-sky-500"
                                />
                                <span className="text-sm text-slate-700 dark:text-slate-300">Show Value Labels</span>
                            </label>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Bar Color</label>
                            <div className="flex space-x-2">
                                {['#0ea5e9', '#ec4899', '#8b5cf6', '#10b981', '#f59e0b'].map((color) => (
                                    <button
                                        key={color}
                                        onClick={() => setBarColor(color)}
                                        className={`w-6 h-6 rounded-full border-2 transition-all ${barColor === color ? 'border-slate-900 dark:border-white scale-110' : 'border-transparent hover:scale-110'}`}
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </LivePreview>
            <TechnicalOverview
                library="Recharts / Chart.js / Nivo"
                officialName="recharts/recharts"
                githubUrl="https://github.com/recharts/recharts"
                description="Data visualization is key to making complex data understandable. Charting libraries provide a set of reusable and composable components to build interactive charts and graphs in React."
                features={[
                    "Wide range of chart types (bar, line, pie, etc.)",
                    "Composable and declarative components (Recharts)",
                    "Highly customizable with animations and tooltips",
                    "Server-side rendering support (Nivo)"
                ]}
                installation="npm install recharts"
                usage={`import { BarChart, Bar, XAxis, YAxis } from 'recharts';\n\n<BarChart data={data}><XAxis dataKey="name" /><Bar dataKey="uv" /></BarChart>`}
            />
        </div>
    );
};
export default ChartsDemo;
