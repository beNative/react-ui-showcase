import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';

interface Toast {
    id: number;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    // FIX: Replaced JSX.Element with React.ReactNode to resolve "Cannot find namespace 'JSX'" error.
    icon: React.ReactNode;
}

type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

const TOAST_ICONS = {
    success: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    error: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    info: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    warning: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
    ),
};

const getPositionClasses = (position: ToastPosition) => {
    switch (position) {
        case 'top-left': return 'top-5 left-5';
        case 'bottom-right': return 'bottom-5 right-5';
        case 'bottom-left': return 'bottom-5 left-5';
        case 'top-right':
        default: return 'top-5 right-5';
    }
};

const ToastComponent: React.FC<{ toast: Toast; onRemove: (id: number) => void }> = ({ toast, onRemove }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onRemove(toast.id);
        }, 5000);
        return () => clearTimeout(timer);
    }, [toast.id, onRemove]);

    return (
        <div className="bg-slate-800 shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden w-full max-w-sm">
            <div className="p-4">
                <div className="flex items-start">
                    <div className="flex-shrink-0">{toast.icon}</div>
                    <div className="ml-3 w-0 flex-1 pt-0.5">
                        <p className="text-sm font-medium text-slate-200">{toast.message}</p>
                    </div>
                    <div className="ml-4 flex-shrink-0 flex">
                        <button onClick={() => onRemove(toast.id)} className="inline-flex text-slate-400 hover:text-slate-200">
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ToastContainer: React.FC<{ toasts: Toast[], onRemove: (id: number) => void, position: ToastPosition }> = ({ toasts, onRemove, position }) => {
    const el = document.createElement('div');
    el.className = `fixed ${getPositionClasses(position)} z-50 w-full max-w-xs space-y-3`;
    
    useEffect(() => {
        document.body.appendChild(el);
        return () => {
            document.body.removeChild(el);
        }
    }, [el]);

    return ReactDOM.createPortal(
        <>
            {toasts.map((toast) => (
                <ToastComponent key={toast.id} toast={toast} onRemove={onRemove} />
            ))}
        </>,
        el
    );
};

const ToastDemo: React.FC = () => {
    const [toasts, setToasts] = useState<Toast[]>([]);
    const [position, setPosition] = useState<ToastPosition>('top-right');

    const addToast = useCallback((type: Toast['type'], message: string) => {
        const newToast: Toast = {
            id: Date.now(),
            message,
            type,
            icon: TOAST_ICONS[type],
        };
        setToasts(prev => [...prev, newToast]);
    }, []);

    const removeToast = useCallback((id: number) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);

    return (
        <div>
            <ToastContainer toasts={toasts} onRemove={removeToast} position={position} />
            <LivePreview>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="position-select" className="block text-sm font-medium text-slate-300 mb-2">Position</label>
                        <select
                            id="position-select"
                            value={position}
                            onChange={(e) => setPosition(e.target.value as ToastPosition)}
                            className="bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-sm w-full focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
                        >
                            <option value="top-right">Top Right</option>
                            <option value="top-left">Top Left</option>
                            <option value="bottom-right">Bottom Right</option>
                            <option value="bottom-left">Bottom Left</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <button onClick={() => addToast('success', 'Operation completed successfully!')} className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-semibold hover:bg-green-500 transition-colors">Success</button>
                        <button onClick={() => addToast('error', 'An error occurred!')} className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-semibold hover:bg-red-500 transition-colors">Error</button>
                        <button onClick={() => addToast('info', 'Here is some information.')} className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-500 transition-colors">Info</button>
                        <button onClick={() => addToast('warning', 'Please check your input.')} className="px-4 py-2 bg-yellow-600 text-white rounded-md text-sm font-semibold hover:bg-yellow-500 transition-colors">Warning</button>
                    </div>
                </div>
            </LivePreview>
            <TechnicalOverview
                library="Custom Toast System (e.g., react-toastify)"
                officialName="fkhadra/react-toastify"
                githubUrl="https://github.com/fkhadra/react-toastify"
                description="Toast notifications are small, non-modal pop-up messages used to display brief information to the user. This demo implements a custom system using React Portals."
                features={[
                    "Non-intrusive user feedback",
                    "Customizable position, duration, and style",
                    "Can be triggered from anywhere in the app",
                    "Often managed via a React Context for global access"
                ]}
                installation="npm install react-toastify"
                usage={`import { ToastContainer, toast } from 'react-toastify';\n\ntoast.success("Hello!");\n<ToastContainer />`}
            />
        </div>
    );
};

export default ToastDemo;