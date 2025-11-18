import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';
import { CloseIcon } from './Icons';

const Dialog: React.FC<{ isOpen: boolean; onClose: () => void; children: React.ReactNode; blur?: boolean }> = ({ isOpen, onClose, children, blur = true }) => {
    const dialogRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            dialogRef.current?.focus();
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 ${blur ? 'backdrop-blur-sm' : ''} transition-all`}
            onClick={onClose}
            role="dialog"
            aria-modal="true"
        >
            <div
                ref={dialogRef}
                className="relative w-full max-w-md bg-slate-900 rounded-lg shadow-2xl border border-slate-700 scale-100 animate-scale-in"
                onClick={(e) => e.stopPropagation()}
                tabIndex={-1}
            >
                {children}
            </div>
             <style>{`
                @keyframes scaleIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-scale-in {
                    animation: scaleIn 0.2s ease-out forwards;
                }
            `}</style>
        </div>,
        document.body
    );
};

const DialogDemo: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [useBlur, setUseBlur] = useState(true);

    return (
        <div>
            <LivePreview>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="flex justify-center">
                        <button
                            onClick={() => setIsOpen(true)}
                            className="px-5 py-2.5 bg-sky-600 text-white rounded-md text-sm font-semibold hover:bg-sky-500 transition-colors shadow-lg shadow-sky-900/20"
                        >
                            Open Dialog
                        </button>
                    </div>

                     {/* Configuration */}
                     <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 space-y-4 w-full">
                        <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider">Configuration</h3>
                        <div>
                             <label className="flex items-center space-x-2 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={useBlur} 
                                    onChange={(e) => setUseBlur(e.target.checked)}
                                    className="form-checkbox h-4 w-4 text-sky-600 rounded border-slate-700 bg-slate-800 focus:ring-sky-500"
                                />
                                <span className="text-sm text-slate-300">Enable Backdrop Blur</span>
                            </label>
                        </div>
                    </div>
                </div>
            </LivePreview>

            <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)} blur={useBlur}>
                <div className="p-6">
                    <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                        <h3 className="text-lg font-semibold text-slate-100">Deactivate Account</h3>
                         <button onClick={() => setIsOpen(false)} className="p-1 rounded-md text-slate-400 hover:bg-slate-800 hover:text-slate-100 transition-colors">
                            <CloseIcon className="w-5 h-5"/>
                        </button>
                    </div>
                    <div className="mt-4">
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone.
                        </p>
                    </div>
                    <div className="mt-8 flex justify-end space-x-3">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-2 bg-slate-800 border border-slate-700 text-slate-300 rounded-md text-sm font-medium hover:bg-slate-700 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-md text-sm font-medium hover:bg-red-500/20 transition-colors"
                        >
                            Deactivate
                        </button>
                    </div>
                </div>
            </Dialog>

            <TechnicalOverview
                library="Headless UI Dialog / Radix UI Dialog"
                officialName="tailwindlabs/headlessui"
                githubUrl="https://github.com/tailwindlabs/headlessui"
                description="A dialog (or modal) is an overlay that requires user interaction. It's used for critical information, user decisions, or tasks that need to interrupt the main workflow. Modern libraries handle accessibility aspects like focus trapping."
                features={[
                    "Traps focus within the dialog for accessibility.",
                    "Closes on Escape key or overlay click.",
                    "Manages scroll locking on the body.",
                    "Rendered in a Portal to avoid z-index issues."
                ]}
                installation="npm install @radix-ui/react-dialog"
                usage={`import * as Dialog from '@radix-ui/react-dialog';\n\n<Dialog.Root>\n  <Dialog.Trigger>...</Dialog.Trigger>\n  <Dialog.Portal>...</Dialog.Portal>\n</Dialog.Root>`}
            />
        </div>
    );
};

export default DialogDemo;