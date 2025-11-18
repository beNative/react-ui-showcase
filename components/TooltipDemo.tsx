
import React, { useState, useRef } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';

type Placement = 'top' | 'bottom' | 'left' | 'right';

const Tooltip: React.FC<{ 
    content: string; 
    children: React.ReactNode; 
    placement: Placement;
    delay: number;
}> = ({ content, children, placement, delay }) => {
    const [isVisible, setIsVisible] = useState(false);
    const timeoutRef = useRef<any>(null);

    const show = () => {
        timeoutRef.current = setTimeout(() => {
            setIsVisible(true);
        }, delay);
    };

    const hide = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsVisible(false);
    };

    const placementClasses = {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2'
    };

    const arrowClasses = {
        top: 'left-1/2 -translate-x-1/2 top-full border-x-transparent border-t-slate-900 border-b-0 border-x-4 border-t-4',
        bottom: 'left-1/2 -translate-x-1/2 bottom-full border-x-transparent border-b-slate-900 border-t-0 border-x-4 border-b-4',
        left: 'top-1/2 -translate-y-1/2 left-full border-y-transparent border-l-slate-900 border-r-0 border-y-4 border-l-4',
        right: 'top-1/2 -translate-y-1/2 right-full border-y-transparent border-r-slate-900 border-l-0 border-y-4 border-r-4'
    };

    return (
        <div 
            className="relative inline-block" 
            onMouseEnter={show} 
            onMouseLeave={hide}
            onFocus={show}
            onBlur={hide}
        >
            {children}
            <div className={`
                absolute w-max max-w-xs px-3 py-1.5 bg-slate-900 text-white text-sm rounded-md shadow-lg 
                transition-all duration-200 pointer-events-none border border-slate-700 z-10 
                ${placementClasses[placement]}
                ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
            `}>
                {content}
                <div className={`absolute w-0 h-0 ${arrowClasses[placement]}`}></div>
            </div>
        </div>
    );
};

const TooltipDemo: React.FC = () => {
    const [placement, setPlacement] = useState<Placement>('top');
    const [delay, setDelay] = useState(200);

    return (
        <div>
            <LivePreview>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="flex items-center justify-center h-32 space-x-8 text-slate-300">
                        <Tooltip content="This is a tooltip!" placement={placement} delay={delay}>
                            <button className="px-4 py-2 bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-md hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
                                Hover Me
                            </button>
                        </Tooltip>
                    </div>

                     {/* Configuration */}
                     <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 space-y-4 w-full transition-colors">
                        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Configuration</h3>
                        
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Placement</label>
                            <select
                                value={placement}
                                onChange={(e) => setPlacement(e.target.value as Placement)}
                                className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md px-3 py-2 text-sm w-full focus:ring-2 focus:ring-sky-500 outline-none text-slate-900 dark:text-slate-300 transition-colors"
                            >
                                <option value="top">Top</option>
                                <option value="bottom">Bottom</option>
                                <option value="left">Left</option>
                                <option value="right">Right</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Open Delay: {delay}ms</label>
                            <input 
                                type="range" 
                                min="0" 
                                max="1000" 
                                step="100"
                                value={delay} 
                                onChange={(e) => setDelay(Number(e.target.value))}
                                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
                            />
                        </div>
                    </div>
                </div>
            </LivePreview>
            <TechnicalOverview
                library="Tippy.js / Radix UI Tooltip"
                officialName="atomiks/tippyjs-react"
                githubUrl="https://github.com/atomiks/tippyjs-react"
                description="A tooltip is a small pop-up that appears when a user hovers over an element, providing additional information or context. It's a non-intrusive way to add hints and labels to a user interface."
                features={[
                    "Appears on hover or focus for accessibility.",
                    "Smart positioning to avoid screen edges.",
                    "Can contain rich content, not just text.",
                    "Highly configurable delays, animations, and themes."
                ]}
                installation="npm install @tippyjs/react"
                usage={`import Tippy from '@tippyjs/react';\n\n<Tippy content="Tooltip text">\n  <button>Hover</button>\n</Tippy>`}
            />
        </div>
    );
};

export default TooltipDemo;
