import React, { useState, useEffect, useRef } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';
import { CommandIcon, HomeIcon, UserCircleIcon,  AdjustmentsHorizontalIcon } from './Icons';

const CommandPaletteDemo: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    // Toggle with Cmd+K
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setIsOpen((open) => !open);
            }
             if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };
        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 50);
        } else {
             setQuery('');
        }
    }, [isOpen]);

    const items = [
        { id: 'home', label: 'Go to Home', icon: <HomeIcon className="w-4 h-4 mr-2" /> },
        { id: 'profile', label: 'View Profile', icon: <UserCircleIcon className="w-4 h-4 mr-2" /> },
        { id: 'settings', label: 'Settings', icon: <AdjustmentsHorizontalIcon className="w-4 h-4 mr-2" /> },
        { id: 'theme', label: 'Toggle Theme', icon: <CommandIcon className="w-4 h-4 mr-2" /> },
    ];

    const filteredItems = items.filter(item => item.label.toLowerCase().includes(query.toLowerCase()));

    return (
        <div>
            <LivePreview>
                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                    <p className="text-slate-400 text-sm">
                        Press <kbd className="px-2 py-1 bg-slate-800 rounded border border-slate-700 font-sans text-xs text-slate-300">⌘ K</kbd> or <kbd className="px-2 py-1 bg-slate-800 rounded border border-slate-700 font-sans text-xs text-slate-300">Ctrl K</kbd> to open
                    </p>
                    <button 
                        onClick={() => setIsOpen(true)}
                        className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-md text-slate-300 hover:bg-slate-700 transition-colors text-sm"
                    >
                        Open Command Palette
                    </button>
                </div>

                {/* Palette Modal */}
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4">
                        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
                        <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden animate-fade-in-up">
                            <div className="flex items-center px-4 border-b border-slate-800">
                                <CommandIcon className="w-5 h-5 text-slate-500 mr-3" />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    placeholder="Type a command or search..."
                                    value={query}
                                    onChange={e => setQuery(e.target.value)}
                                    className="w-full h-14 bg-transparent border-none focus:ring-0 text-slate-200 placeholder-slate-500 outline-none"
                                />
                                <button onClick={() => setIsOpen(false)} className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded border border-slate-700">ESC</button>
                            </div>
                            <div className="max-h-64 overflow-y-auto p-2">
                                {filteredItems.length > 0 ? (
                                    <div className="space-y-1">
                                        <div className="px-2 py-1.5 text-xs font-medium text-slate-500 uppercase tracking-wider">Suggestions</div>
                                        {filteredItems.map(item => (
                                            <button
                                                key={item.id}
                                                className="w-full flex items-center px-3 py-2.5 rounded-md text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors group text-left"
                                                onClick={() => {
                                                    alert(`Selected: ${item.label}`);
                                                    setIsOpen(false);
                                                }}
                                            >
                                                <span className="text-slate-500 group-hover:text-sky-400 transition-colors">{item.icon}</span>
                                                {item.label}
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-6 text-center text-sm text-slate-500">
                                        No results found.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </LivePreview>
             <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(10px) scale(0.98); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.2s ease-out forwards;
                }
            `}</style>
            <TechnicalOverview
                library="CMDK"
                officialName="pacocoursey/cmdk"
                githubUrl="https://github.com/pacocoursey/cmdk"
                description="A command palette is a fast, composable, unstyled command menu for React apps. It allows users to perform actions and navigate the app using the keyboard."
                features={[
                    "Filtering and grouping items.",
                    "Keyboard navigation (arrows, enter).",
                    "Completely unstyled and accessible.",
                    "Fast performance with virtualization support."
                ]}
                installation="npm install cmdk"
                usage={`import { Command } from 'cmdk';\n\n<Command.Dialog open={open} onOpenChange={setOpen}>\n  <Command.Input />\n  <Command.List>\n    <Command.Item>...</Command.Item>\n  </Command.List>\n</Command.Dialog>`}
            />
        </div>
    );
};

export default CommandPaletteDemo;