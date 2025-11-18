
import React, { useState, useRef, useEffect } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';
import { AdjustmentsHorizontalIcon, CloseIcon } from './Icons';

const PopoverDemo: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const popoverRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div>
            <LivePreview>
                <div className="flex justify-center py-12">
                    <div className="relative inline-block" ref={popoverRef}>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`p-2 rounded-full bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors ${isOpen ? 'bg-slate-700 text-white ring-2 ring-sky-500/50' : ''}`}
                        >
                            <AdjustmentsHorizontalIcon className="w-6 h-6" />
                        </button>

                        {isOpen && (
                            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-72 bg-slate-900 border border-slate-800 rounded-lg shadow-2xl p-4 z-20 animate-fade-in-up origin-top">
                                {/* Arrow */}
                                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900 border-l border-t border-slate-800 transform rotate-45"></div>
                                
                                <div className="relative z-10">
                                    <div className="flex justify-between items-center mb-3">
                                        <h4 className="font-medium text-slate-200 text-sm">Dimensions</h4>
                                        <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-slate-300">
                                            <CloseIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="grid grid-cols-3 items-center gap-2">
                                            <label className="text-xs text-slate-400">Width</label>
                                            <input type="text" defaultValue="100%" className="col-span-2 bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs text-slate-200 outline-none focus:border-sky-500" />
                                        </div>
                                        <div className="grid grid-cols-3 items-center gap-2">
                                            <label className="text-xs text-slate-400">Height</label>
                                            <input type="text" defaultValue="250px" className="col-span-2 bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs text-slate-200 outline-none focus:border-sky-500" />
                                        </div>
                                        <div className="grid grid-cols-3 items-center gap-2">
                                            <label className="text-xs text-slate-400">Max Width</label>
                                            <input type="text" defaultValue="300px" className="col-span-2 bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs text-slate-200 outline-none focus:border-sky-500" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <style>{`
                    @keyframes fadeInUp {
                        from { opacity: 0; transform: translateX(-50%) translateY(5px); }
                        to { opacity: 1; transform: translateX(-50%) translateY(0); }
                    }
                    .animate-fade-in-up {
                        animation: fadeInUp 0.2s ease-out forwards;
                    }
                `}</style>
            </LivePreview>
            <TechnicalOverview
                library="Radix UI Popover"
                officialName="radix-ui/primitives"
                githubUrl="https://github.com/radix-ui/primitives"
                description="A popover displays rich content in a portal, triggered by a click. Unlike tooltips, popovers can contain interactive elements like inputs and buttons."
                features={[
                    "Focus management (trap focus inside).",
                    "Dismiss on outside click or Escape key.",
                    "Anchor positioning relative to trigger.",
                    "Visual arrow indicating origin."
                ]}
                installation="npm install @radix-ui/react-popover"
                usage={`import * as Popover from '@radix-ui/react-popover';\n\n<Popover.Root>\n  <Popover.Trigger>Settings</Popover.Trigger>\n  <Popover.Portal>\n    <Popover.Content>...</Popover.Content>\n  </Popover.Portal>\n</Popover.Root>`}
            />
        </div>
    );
};

export default PopoverDemo;
