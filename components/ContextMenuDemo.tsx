import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';
import { CursorClickIcon, DocumentTextIcon, CloseIcon } from './Icons';

const ContextMenuDemo: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const triggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = () => setVisible(false);
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        setVisible(true);
        setCoords({ x: e.clientX, y: e.clientY });
    };

    return (
        <div>
            <LivePreview>
                <div
                    ref={triggerRef}
                    onContextMenu={handleContextMenu}
                    className="w-full h-48 rounded-xl border-2 border-dashed border-slate-700 bg-slate-900/50 flex flex-col items-center justify-center cursor-context-menu hover:border-slate-600 transition-colors"
                >
                    <CursorClickIcon className="w-10 h-10 text-slate-500 mb-2" />
                    <span className="text-slate-400 font-medium">Right click here</span>
                </div>

                {/* Menu Portal */}
                {visible && ReactDOM.createPortal(
                    <div
                        className="fixed z-50 w-48 rounded-md border border-slate-700 bg-slate-800 shadow-xl py-1 animate-scale-in origin-top-left"
                        style={{ top: coords.y, left: coords.x }}
                    >
                         <div className="px-2 py-1.5 text-xs font-semibold text-slate-500 uppercase">Actions</div>
                        <button className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:bg-sky-600 hover:text-white flex items-center transition-colors">
                            <DocumentTextIcon className="w-4 h-4 mr-2" />
                            Open
                        </button>
                        <button className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:bg-sky-600 hover:text-white transition-colors">
                            Rename
                        </button>
                        <button className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:bg-sky-600 hover:text-white transition-colors">
                            Duplicate
                        </button>
                        <div className="h-px bg-slate-700 my-1"></div>
                         <button className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-900/30 transition-colors flex items-center">
                             <CloseIcon className="w-4 h-4 mr-2" />
                            Delete
                        </button>
                    </div>,
                    document.body
                )}
            </LivePreview>
             <style>{`
                @keyframes scaleIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-scale-in {
                    animation: scaleIn 0.1s ease-out forwards;
                }
            `}</style>
            <TechnicalOverview
                library="Radix UI Context Menu"
                officialName="radix-ui/primitives"
                githubUrl="https://github.com/radix-ui/primitives"
                description="A context menu displays a list of actions triggered by a right-click (or long press). It is context-aware, providing relevant options for the selected element."
                features={[
                    "Right-click trigger support.",
                    "Nested submenus.",
                    "Keyboard navigation (arrows).",
                    "Screen boundary collision detection."
                ]}
                installation="npm install @radix-ui/react-context-menu"
                usage={`import * as ContextMenu from '@radix-ui/react-context-menu';\n\n<ContextMenu.Root>\n  <ContextMenu.Trigger>Right click me</ContextMenu.Trigger>\n  <ContextMenu.Content>...</ContextMenu.Content>\n</ContextMenu.Root>`}
            />
        </div>
    );
};

export default ContextMenuDemo;