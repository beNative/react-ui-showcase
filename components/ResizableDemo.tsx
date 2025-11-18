import React, { useState, useRef, useEffect } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';
import { ArrowsPointingOutIcon } from './Icons';

const ResizableDemo: React.FC = () => {
    const [width, setWidth] = useState(50); // Percentage
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging || !containerRef.current) return;
            
            const containerRect = containerRef.current.getBoundingClientRect();
            const newWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
            
            // Constrain between 20% and 80%
            setWidth(Math.min(Math.max(newWidth, 20), 80));
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            document.body.style.cursor = 'default';
            document.body.style.userSelect = 'auto';
        };

        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = 'col-resize';
            document.body.style.userSelect = 'none';
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    return (
        <div>
            <LivePreview>
                <div className="w-full h-64 rounded-xl border border-slate-800 bg-slate-950 overflow-hidden flex flex-col justify-center p-4">
                    <div ref={containerRef} className="flex w-full h-full border border-slate-700 rounded-lg overflow-hidden relative">
                        {/* Left Panel */}
                        <div style={{ width: `${width}%` }} className="bg-slate-900/50 p-4 flex items-center justify-center min-w-[20%]">
                            <div className="text-center">
                                <span className="font-semibold text-slate-300">Panel A</span>
                                <p className="text-xs text-slate-500 mt-1">{Math.round(width)}%</p>
                            </div>
                        </div>

                        {/* Handle */}
                        <div
                            className={`w-1 hover:w-1.5 bg-slate-700 hover:bg-sky-500 cursor-col-resize transition-all z-10 flex items-center justify-center group relative -ml-0.5`}
                            onMouseDown={() => setIsDragging(true)}
                        >
                            <div className="h-8 w-1 rounded-full bg-slate-500 group-hover:bg-white transition-colors"></div>
                        </div>

                        {/* Right Panel */}
                        <div style={{ width: `${100 - width}%` }} className="bg-slate-800/50 p-4 flex items-center justify-center flex-1 min-w-[20%]">
                            <div className="text-center">
                                <span className="font-semibold text-slate-300">Panel B</span>
                                <p className="text-xs text-slate-500 mt-1">{Math.round(100 - width)}%</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 text-center text-sm text-slate-500 flex items-center justify-center gap-2">
                        <ArrowsPointingOutIcon className="w-4 h-4"/>
                        Drag the center bar to resize panels
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