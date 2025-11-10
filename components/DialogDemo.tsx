import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';
import { CloseIcon } from './Icons';

const Dialog: React.FC<{ isOpen: boolean; onClose: () => void; children: React.ReactNode }> = ({ isOpen, onClose, children }) => {
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
        >
            <div
                ref={dialogRef}
                className="relative w-full max-w-md bg-slate-800 rounded-lg shadow-xl border border-slate-700"
                onClick={(e) => e.stopPropagation()}
                tabIndex={-1}
            >
                {children}
            </div>
        </div>,
        document.body
    );
};

const DialogDemo: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <LivePreview>
                <div className="flex justify-center">
                    <button
                        onClick={() => setIsOpen(true)}
                        className="px-5 py-2.5 bg-sky-600 text-white rounded-md text-sm font-semibold hover:bg-sky-500 transition-colors"
                    >
                        Open Dialog
                    </button>
                </div>
            </LivePreview>

            <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <div className="p-6">
                    <div className="flex justify-between items-center pb-3 border-b border-slate-700">
                        <h3 className="text-lg font-medium text-slate-100">Deactivate Account</h3>
                         <button onClick={() => setIsOpen(false)} className="p-1 rounded-full text-slate-400 hover:bg-slate-700 hover:text-slate-100">
                            <CloseIcon className="w-5 h-5"/>
                        </button>
                    </div>
                    <div className="mt-4">
                        <p className="text-sm text-slate-400">
                            Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone.
                        </p>
                    </div>
                    <div className="mt-6 flex justify-end space-x-3">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-2 bg-slate-600 text-white rounded-md text-sm font-medium hover:bg-slate-500 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-500 transition-colors"
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