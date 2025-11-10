import React from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';

const Tooltip: React.FC<{ content: string; children: React.ReactNode }> = ({ content, children }) => {
    return (
        <div className="relative inline-block group">
            {children}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs px-3 py-1.5 bg-slate-900 text-white text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border border-slate-700">
                {content}
                <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-slate-900"></div>
            </div>
        </div>
    );
};

const TooltipDemo: React.FC = () => {
    return (
        <div>
            <LivePreview>
                <div className="flex items-center justify-center h-24 space-x-8 text-slate-300">
                    <Tooltip content="This is a button. Click it!">
                        <button className="px-4 py-2 bg-slate-600 rounded-md hover:bg-slate-500">
                            Hover Me
                        </button>
                    </Tooltip>
                    
                    <Tooltip content="Profile settings and user information.">
                        <span className="border-b border-dashed border-slate-500 cursor-help">
                            User Profile
                        </span>
                    </Tooltip>
                    
                    <Tooltip content="API is currently stable.">
                       <div className="flex items-center space-x-2">
                            <span className="relative flex h-3 w-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                            <span>API Status</span>
                       </div>
                    </Tooltip>
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