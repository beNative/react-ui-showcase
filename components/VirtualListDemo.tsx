
import React, { useState, useRef } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';

const ITEM_HEIGHT = 40;
const CONTAINER_HEIGHT = 300;
const TOTAL_ITEMS = 10000;

const items = Array.from({ length: TOTAL_ITEMS }, (_, i) => ({
    id: i,
    text: `Item ${i + 1} - ${Math.random().toString(36).substring(7)}`,
}));

const VirtualListDemo: React.FC = () => {
    const [scrollTop, setScrollTop] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
        setScrollTop(e.currentTarget.scrollTop);
    };

    const startIndex = Math.floor(scrollTop / ITEM_HEIGHT);
    const endIndex = Math.min(
        TOTAL_ITEMS - 1,
        Math.floor((scrollTop + CONTAINER_HEIGHT) / ITEM_HEIGHT)
    );

    const visibleItems = [];
    // Add a buffer of items above and below for smooth scrolling
    const buffer = 5;
    const start = Math.max(0, startIndex - buffer);
    const end = Math.min(TOTAL_ITEMS - 1, endIndex + buffer);

    for (let i = start; i <= end; i++) {
        visibleItems.push({
            ...items[i],
            index: i,
            style: {
                position: 'absolute' as const,
                top: i * ITEM_HEIGHT,
                height: ITEM_HEIGHT,
                width: '100%',
            },
        });
    }

    return (
        <div>
            <LivePreview>
                <div className="flex flex-col items-center">
                    <p className="text-sm text-slate-400 mb-4">
                        Rendering {TOTAL_ITEMS.toLocaleString()} items efficiently.
                        <br/>
                        Visible node count: {visibleItems.length}
                    </p>
                    <div
                        ref={containerRef}
                        onScroll={onScroll}
                        className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-lg overflow-y-auto relative"
                        style={{ height: CONTAINER_HEIGHT }}
                    >
                        <div style={{ height: TOTAL_ITEMS * ITEM_HEIGHT, position: 'relative' }}>
                            {visibleItems.map((item) => (
                                <div
                                    key={item.id}
                                    style={item.style}
                                    className={`px-4 flex items-center text-sm ${item.index % 2 === 0 ? 'bg-slate-800/30' : ''} text-slate-300 border-b border-slate-800/50`}
                                >
                                    <span className="font-mono text-sky-500 mr-3 w-12 text-right">#{item.index}</span>
                                    {item.text}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </LivePreview>
            <TechnicalOverview
                library="react-window / react-virtualized"
                officialName="bvaughn/react-window"
                githubUrl="https://github.com/bvaughn/react-window"
                description="Virtualization (or windowing) is a technique for efficiently rendering large lists of data. Instead of rendering every item in the list, it only renders the items currently visible in the viewport (window)."
                features={[
                    "Significantly reduces DOM nodes and memory usage.",
                    "Smooth 60fps scrolling for lists with thousands of items.",
                    "Supports fixed or variable height items.",
                    "Can handle grids and tables as well."
                ]}
                installation="npm install react-window"
                usage={`import { FixedSizeList as List } from 'react-window';\n\n<List\n  height={150}\n  itemCount={1000}\n  itemSize={35}\n  width={300}\n>\n  {({ index, style }) => <div style={style}>Row {index}</div>}\n</List>`}
            />
        </div>
    );
};

export default VirtualListDemo;
