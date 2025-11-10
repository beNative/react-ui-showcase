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

const BarChart: React.FC<{ data: {name: string, value: number}[] }> = ({ data }) => {
    const chartHeight = 200;
    const chartWidth = 400;
    const barPadding = 10;
    const barWidth = (chartWidth / data.length) - barPadding;
    const maxValue = Math.max(...data.map(d => d.value), 100);

    return (
        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto" aria-labelledby="chartTitle" role="img">
            <title id="chartTitle">Monthly usage bar chart</title>
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
                            className="fill-sky-600 group-hover:fill-sky-500 transition-colors"
                        />
                         <text
                            x={x + barWidth / 2}
                            y={chartHeight - barHeight - 5}
                            textAnchor="middle"
                            className="text-xs font-bold fill-slate-200 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            {d.value}
                        </text>
                        <text
                            x={x + barWidth / 2}
                            y={chartHeight + 15}
                            textAnchor="middle"
                            className="text-xs fill-slate-400"
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
    
    const randomizeData = () => {
        setChartData(
            chartData.map(d => ({ ...d, value: Math.floor(Math.random() * 90) + 10 }))
        );
    };

    return (
        <div>
            <LivePreview>
                <div className="space-y-4">
                    <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                         <BarChart data={chartData} />
                    </div>
                    <div className="flex justify-center">
                        <button
                            onClick={randomizeData}
                            className="px-4 py-2 bg-slate-600 text-white rounded-md text-sm font-semibold hover:bg-slate-500 transition-colors"
                        >
                            Randomize Data
                        </button>
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