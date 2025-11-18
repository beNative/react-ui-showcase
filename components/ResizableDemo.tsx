
import React, { useState, useRef, useEffect } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';
import { ArrowsPointingOutIcon, AdjustmentsHorizontalIcon } from './Icons';

const ResizableDemo: React.FC = () => {
    const [dimension, setDimension] = useState(50); // Percentage
    const [isDragging, setIsDragging] = useState(false);
    const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>('horizontal');
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging || !containerRef.current) return;
            
            const containerRect = containerRef.current.getBoundingClientRect();
            let newDim = 0;

            if (orientation === 'horizontal') {
                 newDim = ((e.clientX - containerRect.left) / containerRect.width) * 100;
            } else {
                 newDim = ((e.clientY - containerRect.top) / containerRect.height) * 100;
            }
            
            // Constrain between 20% and 80%
            setDimension(Math.min(Math.max(newDim, 20), 80));
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            document.body.style.cursor = 'default';
            document.body.style.userSelect = 'auto';
        };

        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = orientation === 'horizontal' ? 'col-resize' : 'row-resize';
            document.body.style.userSelect = 'none';
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, orientation]);

    return (
        <div>
            <LivePreview>
                <div className="flex flex-col gap-6">
                    <div className="w-full h-80 rounded-xl border border-slate-800 bg-slate-950 overflow-hidden flex flex-col justify-center p-4 shadow-xl">
                        <div ref={containerRef} className={`flex ${orientation === 'horizontal' ? 'flex-row' : 'flex-col'} w-full h-full border border-slate-700 rounded-lg overflow-hidden relative bg-slate-900`}>
                            {/* First Panel */}
                            <div 
                                style={{ [orientation === 'horizontal' ? 'width' : 'height']: `${dimension}%` }} 
                                className="bg-slate-800/50 p-4 flex items-center justify-center min-w-[20%] min-h-[20%] transition-colors"
                            >
                                <div className="text-center">
                                    <span className="font-semibold text-slate-300">Panel A</span>
                                    <p className="text-xs text-slate-500 mt-1">{Math.round(dimension)}%</p>
                                </div>
                            </div>

                            {/* Handle */}
                            <div
                                className={`
                                    ${orientation === 'horizontal' ? 'w-1 cursor-col-resize hover:w-1.5 -ml-0.5' : 'h-1 cursor-row-resize hover:h-1.5 -mt-0.5'}
                                    bg-slate-700 hover:bg-sky-500 transition-all z-10 flex items-center justify-center group relative
                                `}
                                onMouseDown={() => setIsDragging(true)}
                            >
                                <div className={`${orientation === 'horizontal' ? 'h-8 w-1' : 'w-8 h-1'} rounded-full bg-slate-500 group-hover:bg-white transition-colors`}></div>
                            </div>

                            {/* Second Panel */}
                            <div className="flex-1 bg-slate-900/50 p-4 flex items-center justify-center min-w-[20%] min-h-[20%]">
                                <div className="text-center">
                                    <span className="font-semibold text-slate-300">Panel B</span>
                                    <p className="text-xs text-slate-500 mt-1">{Math.round(100 - dimension)}%</p>
                                </div>
                            </div>
                        </div>
                    </div>

                     {/* Configuration */}
                     <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 flex justify-between items-center">
                        <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                            <ArrowsPointingOutIcon className="w-4 h-4 mr-2"/>
                            <span>Drag the handle to resize</span>
                        </div>
                        
                        <div className="flex bg-white dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
                             <button
                                onClick={() => setOrientation('horizontal')}
                                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${orientation === 'horizontal' ? 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                            >
                                Horizontal
                            </button>
                            <button
                                onClick={() => setOrientation('vertical')}
                                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${orientation === 'vertical' ? 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                            >
                                Vertical
                            </button>
                        </div>
                    </div>
                </div>
            </LivePreview>
            <TechnicalOverview
                library="react-resizable-panels"
                officialName="bvaughn/react-resizable-panels"
                githubUrl="https://github.com/bvaughn/react-resizable-panels"
                description="Resizable panel groups allow users to customize their workspace by dragging handles between sections. It's essential for IDEs, dashboards, and complex data views."
                features={[
                    "Supports horizontal and vertical groups.",
                    "Min/Max constraints for panels.",
                    "Keyboard support for resizing.",
                    "Persistent layout state storage."
                ]}
                installation="npm install react-resizable-panels"
                usage={`import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";\n\n<PanelGroup direction="horizontal">\n  <Panel>Left</Panel>\n  <PanelResizeHandle />\n  <Panel>Right</Panel>\n</PanelGroup>`}
            />
        </div>
    );
};

export default ResizableDemo;
