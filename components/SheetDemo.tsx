import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';
import { CloseIcon } from './Icons';

type SheetSide = 'top' | 'right' | 'bottom' | 'left';

const Sheet: React.FC<{ isOpen: boolean; onClose: () => void; side: SheetSide; children: React.ReactNode }> = ({ isOpen, onClose, side, children }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setVisible(true);
            document.body.style.overflow = 'hidden';
        } else {
            const timer = setTimeout(() => setVisible(false), 300);
            document.body.style.overflow = 'unset';
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!visible && !isOpen) return null;

    const sideClasses = {
        top: 'inset-x-0 top-0 border-b h-1/2',
        bottom: 'inset-x-0 bottom-0 border-t h-1/2',
        left: 'inset-y-0 left-0 border-r w-3/4 max-w-sm',
        right: 'inset-y-0 right-0 border-l w-3/4 max-w-sm'
    };

    const translateClasses = {
        top: isOpen ? 'translate-y-0' : '-translate-y-full',
        bottom: isOpen ? 'translate-y-0' : 'translate-y-full',
        left: isOpen ? 'translate-x-0' : '-translate-x-full',
        right: isOpen ? 'translate-x-0' : 'translate-x-full'
    };

    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <div 
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} 
                onClick={onClose}
            ></div>
            
            {/* Sheet Content */}
            <div className={`fixed bg-slate-950 border-slate-800 shadow-2xl transition-transform duration-300 ease-in-out ${sideClasses[side]} ${translateClasses[side]}`}>
                <div className="p-6 h-full flex flex-col">
                     <div className="flex justify-end">
                        <button onClick={onClose} className="p-2 rounded-md hover:bg-slate-800 text-slate-400 transition-colors">
                            <CloseIcon className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {children}
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

const SheetDemo: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [side, setSide] = useState<SheetSide>('right');

    return (
        <div>
            <LivePreview>
                <div className="flex flex-col items-center space-y-8">
                    <button
                        onClick={() => setIsOpen(true)}
                        className="px-6 py-3 bg-slate-100 text-slate-900 rounded-md text-sm font-semibold hover:bg-white transition-colors"
                    >
                        Open Sheet
                    </button>

                    {/* Configuration */}
                     <div className="w-full max-w-md bg-slate-950 border border-slate-800 rounded-lg p-4 space-y-4">
                        <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider">Configuration</h3>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Position</label>
                            <div className="grid grid-cols-2 gap-2">
                                {(['top', 'bottom', 'left', 'right'] as const).map(s => (
                                    <button
                                        key={s}
                                        onClick={() => setSide(s)}
                                        className={`px-3 py-2 rounded text-sm border ${side === s ? 'bg-sky-500/20 border-sky-500 text-sky-400' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'}`}
                                    >
                                        {s.charAt(0).toUpperCase() + s.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </LivePreview>

            <Sheet isOpen={isOpen} onClose={() => setIsOpen(false)} side={side}>
                <div className="space-y-6">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-100">Edit Profile</h2>
                        <p className="text-slate-400 mt-1">Make changes to your profile here. Click save when you're done.</p>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Name</label>
                            <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-slate-200 focus:ring-2 focus:ring-sky-500 outline-none" defaultValue="Pedro Duarte" />
                        </div>
                         <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Username</label>
                            <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-slate-200 focus:ring-2 focus:ring-sky-500 outline-none" defaultValue="@peduarte" />
                        </div>
                    </div>
                    <div className="pt-4 flex justify-end">
                         <button onClick={() => setIsOpen(false)} className="px-4 py-2 bg-sky-600 text-white rounded-md text-sm font-semibold hover:bg-sky-500">Save changes</button>
                    </div>
                </div>
            </Sheet>

            <TechnicalOverview
                library="Vaul / Radix UI Dialog"
                officialName="emilkowalski/vaul"
                githubUrl="https://github.com/emilkowalski/vaul"
                description="Sheets (or Drawers) are overlay panels that slide out from the edge of the screen. They are commonly used for navigation, details, or editing forms that don't require a full page load."
                features={[
                    "Slide animations from any direction.",
                    "Focus trapping and scroll locking.",
                    "Click-outside to dismiss.",
                    "Mobile-friendly touch gestures (Vaul)."
                ]}
                installation="npm install vaul"
                usage={`import { Drawer } from 'vaul';\n\n<Drawer.Root>\n  <Drawer.Trigger>Open</Drawer.Trigger>\n  <Drawer.Portal>\n    <Drawer.Content>...</Drawer.Content>\n  </Drawer.Portal>\n</Drawer.Root>`}
            />
        </div>
    );
};

export default SheetDemo;