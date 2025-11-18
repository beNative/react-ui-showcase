
import React, { useState } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';

const images = [
    { h: 200, color: 'bg-red-400' },
    { h: 300, color: 'bg-blue-400' },
    { h: 250, color: 'bg-green-400' },
    { h: 350, color: 'bg-yellow-400' },
    { h: 180, color: 'bg-purple-400' },
    { h: 280, color: 'bg-pink-400' },
    { h: 320, color: 'bg-indigo-400' },
    { h: 220, color: 'bg-orange-400' },
];

const MasonryDemo: React.FC = () => {
    const [cols, setCols] = useState(3);

    // Simple column distribution logic
    const columns = Array.from({ length: cols }, () => [] as typeof images);
    images.forEach((img, i) => {
        columns[i % cols].push(img);
    });

    return (
        <div>
            <LivePreview>
                <div className="flex flex-col gap-4">
                    <div className="flex gap-4 justify-center">
                        {columns.map((col, colIndex) => (
                            <div key={colIndex} className="flex-1 flex flex-col gap-4">
                                {col.map((item, itemIndex) => (
                                    <div
                                        key={itemIndex}
                                        className={`w-full rounded-lg shadow-sm animate-fade-in ${item.color}`}
                                        style={{ height: item.h }}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>

                     {/* Configuration */}
                     <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 mt-4">
                        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Columns: {cols}</h3>
                        <input 
                            type="range" 
                            min="1" 
                            max="4" 
                            value={cols} 
                            onChange={(e) => setCols(Number(e.target.value))}
                            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
                        />
                    </div>
                </div>
            </LivePreview>
            <TechnicalOverview
                library="react-masonry-css"
                officialName="paulcollett/react-masonry-css"
                githubUrl="https://github.com/paulcollett/react-masonry-css"
                description="Masonry is a grid layout based on columns. Unlike other grid layouts, it doesn't have fixed height rows. Basically, it optimizes the use of space inside the web page by reducing any unnecessary gaps."
                features={[
                    "Responsive breakpoints.",
                    "CSS-driven for performance.",
                    "Easy integration with any content.",
                    "No absolute positioning required."
                ]}
                installation="npm install react-masonry-css"
                usage={`import Masonry from 'react-masonry-css';\n\n<Masonry\n  breakpointCols={3}\n  className="my-masonry-grid"\n  columnClassName="my-masonry-grid_column"\n>\n  {/* Items */}\n</Masonry>`}
            />
        </div>
    );
};

export default MasonryDemo;
