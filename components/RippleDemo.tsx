
import React, { useState, useEffect } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';
import { FingerPrintIcon } from './Icons';

const RippleButton: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
    const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

    const createRipple = (event: React.MouseEvent) => {
        const button = event.currentTarget.getBoundingClientRect();
        const diameter = Math.max(button.width, button.height);
        const radius = diameter / 2;
        
        const x = event.clientX - button.left - radius;
        const y = event.clientY - button.top - radius;

        const newRipple = { x, y, id: Date.now() };
        setRipples(prev => [...prev, newRipple]);
    };

    useEffect(() => {
        if (ripples.length > 0) {
            const timer = setTimeout(() => {
                setRipples(prev => prev.slice(1));
            }, 600);
            return () => clearTimeout(timer);
        }
    }, [ripples]);

    return (
        <button
            className={`relative overflow-hidden focus:outline-none ${className}`}
            onClick={createRipple}
        >
            {ripples.map((ripple) => (
                <span
                    key={ripple.id}
                    className="absolute bg-white/30 rounded-full animate-ripple pointer-events-none"
                    style={{
                        top: ripple.y,
                        left: ripple.x,
                        width: Math.max(100, 200), // Simplified size for demo
                        height: Math.max(100, 200),
                    }}
                ></span>
            ))}
            <span className="relative z-10 pointer-events-none">{children}</span>
        </button>
    );
};

const RippleDemo: React.FC = () => {
    return (
        <div>
            <LivePreview>
                <div className="flex flex-col items-center justify-center space-y-8 h-64">
                    <div className="flex gap-6">
                        <RippleButton className="px-8 py-3 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded shadow-lg transition-colors">
                            Click Me
                        </RippleButton>
                        
                        <RippleButton className="px-8 py-3 bg-pink-600 hover:bg-pink-500 text-white font-semibold rounded shadow-lg transition-colors">
                            Or Me
                        </RippleButton>
                    </div>
                    
                    <div className="p-8 bg-slate-800 rounded-xl cursor-pointer relative overflow-hidden group" onClick={(e) => { /* Add same ripple logic here for generic containers */ }}>
                         <div className="flex flex-col items-center text-slate-300 select-none pointer-events-none">
                             <FingerPrintIcon className="w-8 h-8 mb-2 opacity-50" />
                             <span>Ripple on Container</span>
                         </div>
                         {/* For full container demo, recreate logic or reuse component */}
                    </div>
                </div>
                <style>{`
                    @keyframes ripple {
                        to { transform: scale(4); opacity: 0; }
                    }
                    .animate-ripple {
                        animation: ripple 0.6s linear;
                        transform: scale(0);
                    }
                `}</style>
            </LivePreview>
            <TechnicalOverview
                library="MUI (Ripple) / react-ripple"
                officialName="mui/material-ui"
                githubUrl="https://mui.com/material-ui/react-button/#complex-button"
                description="The ripple effect provides immediate visual feedback at the point of contact, confirming that an input has been received. It is a hallmark of Material Design."
                features={[
                    "Originates from click coordinates.",
                    "Expands outwards.",
                    "Fades out gracefully.",
                    "Works on buttons, cards, and list items."
                ]}
                installation="npm install @mui/material"
                usage={`import Button from '@mui/material/Button';\n\n<Button variant="contained">Ripple Effect</Button>`}
            />
        </div>
    );
};

export default RippleDemo;
