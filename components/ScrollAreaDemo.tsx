import React from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';
import { ScrollIcon } from './Icons';

const ScrollAreaDemo: React.FC = () => {
    const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);

    return (
        <div>
            <LivePreview>
                <div className="flex justify-center">
                    <div className="w-full max-w-sm h-72 rounded-md border border-slate-700 bg-slate-900 overflow-hidden flex flex-col">
                        <div className="p-4 border-b border-slate-800 bg-slate-900 z-10">
                            <h4 className="text-sm font-medium text-slate-200 flex items-center">
                                <ScrollIcon className="w-4 h-4 mr-2 text-sky-500"/>
                                Release History
                            </h4>
                        </div>
                        <div className="relative flex-1 overflow-hidden group">
                            {/* Custom scroll container */}
                            <div className="absolute inset-0 overflow-y-auto pr-2 custom-scroll-area p-4 space-y-4">
                                <div>
                                    <h5 className="text-sm font-semibold text-slate-300 mb-2">Stable Releases</h5>
                                    <div className="space-y-2">
                                        {tags.slice(0, 5).map(tag => (
                                            <div key={tag} className="text-sm text-slate-400 pl-2 border-l-2 border-slate-700 hover:border-sky-500 transition-colors cursor-default">
                                                {tag}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h5 className="text-sm font-semibold text-slate-300 mb-2">Beta Versions</h5>
                                    <div className="space-y-2">
                                        {tags.slice(5).map(tag => (
                                            <div key={tag} className="text-sm text-slate-500 pl-2 border-l-2 border-slate-800 hover:border-sky-500/50 transition-colors cursor-default">
                                                {tag}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            
                            {/* Visual representation of a custom scrollbar track - in reality handled by CSS or Radix */}
                            <div className="absolute right-0 top-0 bottom-0 w-2 bg-slate-800/0 group-hover:bg-slate-800/50 transition-colors">
                                 {/* This is just visual for the demo, generic CSS scrollbars are used above */}
                            </div>
                        </div>
                    </div>
                </div>
                <style>{`
                    .custom-scroll-area::-webkit-scrollbar {
                        width: 8px;
                    }
                    .custom-scroll-area::-webkit-scrollbar-track {
                        background: transparent;
                    }
                    .custom-scroll-area::-webkit-scrollbar-thumb {
                        background-color: #334155;
                        border-radius: 4px;
                        border: 2px solid #0f172a; /* Matches bg to create padding effect */
                    }
                    .custom-scroll-area::-webkit-scrollbar-thumb:hover {
                        background-color: #475569;
                    }
                `}</style>
            </LivePreview>
            <TechnicalOverview
                library="Radix UI Scroll Area"
                officialName="radix-ui/primitives"
                githubUrl="https://github.com/radix-ui/primitives"
                description="Native scrollbars vary significantly between browsers and OSs. A Scroll Area component provides a consistent, custom-styled, cross-browser scrollbar that doesn't affect layout width."
                features={[
                    "Consistent styling across browsers.",
                    "Hides when not interacting (optional).",
                    "Supports vertical and horizontal scrolling.",
                    "Touch-friendly."
                ]}
                installation="npm install @radix-ui/react-scroll-area"
                usage={`import * as ScrollArea from '@radix-ui/react-scroll-area';\n\n<ScrollArea.Root>\n  <ScrollArea.Viewport>...</ScrollArea.Viewport>\n  <ScrollArea.Scrollbar orientation="vertical">\n    <ScrollArea.Thumb />\n  </ScrollArea.Scrollbar>\n</ScrollArea.Root>`}
            />
        </div>
    );
};

export default ScrollAreaDemo;