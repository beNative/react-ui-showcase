
import React, { useState, useRef, useEffect } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';

const Knob: React.FC<{ value: number; min: number; max: number; onChange: (val: number) => void }> = ({ value, min, max, onChange }) => {
    const knobRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    // Calculate rotation based on value
    const percentage = (value - min) / (max - min);
    const rotation = -135 + (percentage * 270); // -135deg to +135deg

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging || !knobRef.current) return;
            
            const rect = knobRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            // Calculate angle from center
            const dx = e.clientX - centerX;
            const dy = e.clientY - centerY;
            let angle = Math.atan2(dy, dx) * (180 / Math.PI);
            
            // Shift angle to be 0 at bottom (rotate 90deg)
            angle = (angle + 90); 
            
            // Normalize
            if (angle < 0) angle += 360;
            
            // Map circular angle to linear value (approximate bottom gap)
            // 135 to 225 degrees is the dead zone (bottom)
            // Effective range: 0-135 (left side) and 225-360 (right side)
            // ...simplifying logic for vertical drag is often better UX for knobs:
            
            // Vertical drag implementation
            const sensitivity = 2; // pixels per unit
            const deltaY = e.movementY;
            const deltaVal = -deltaY / sensitivity * ((max - min) / 100);
            
            const newValue = Math.min(Math.max(value + deltaVal, min), max);
            onChange(newValue);
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            document.body.style.cursor = 'default';
        };

        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = 'ns-resize';
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, value, min, max, onChange]);

    return (
        <div className="flex flex-col items-center gap-2">
            <div 
                ref={knobRef}
                onMouseDown={() => setIsDragging(true)}
                className="relative w-24 h-24 rounded-full bg-slate-800 border-4 border-slate-700 shadow-lg cursor-ns-resize flex items-center justify-center"
            >
                 {/* Track */}
                 <svg className="absolute inset-0 w-full h-full transform rotate-[135deg]" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="none" className="text-slate-900" strokeDasharray="188.5" /> {/* 75% of circum */ }
                 </svg>
                 
                 {/* Active Track */}
                  <svg className="absolute inset-0 w-full h-full transform rotate-[135deg]" viewBox="0 0 100 100">
                    <circle 
                        cx="50" 
                        cy="50" 
                        r="40" 
                        stroke="currentColor" 
                        strokeWidth="8" 
                        fill="none" 
                        className="text-sky-500 transition-all duration-75"
                        strokeDasharray="251.2" 
                        strokeDashoffset={251.2 - (251.2 * 0.75 * percentage)}
                        strokeLinecap="round"
                    />
                 </svg>

                {/* Pointer */}
                <div 
                    className="absolute w-full h-full rounded-full"
                    style={{ transform: `rotate(${rotation}deg)` }}
                >
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-2 h-4 bg-slate-300 rounded-full shadow-md"></div>
                </div>
                
                {/* Value Display */}
                <div className="absolute text-xl font-bold text-slate-200 select-none">
                    {Math.round(value)}
                </div>
            </div>
             <span className="text-xs text-slate-500 uppercase tracking-widest">Volume</span>
        </div>
    );
};

const KnobDemo: React.FC = () => {
    const [volume, setVolume] = useState(50);

    return (
        <div>
            <LivePreview>
                <div className="flex justify-center items-center py-8">
                    <Knob value={volume} min={0} max={100} onChange={setVolume} />
                </div>
            </LivePreview>
            <TechnicalOverview
                library="react-knob-headless"
                officialName="satya164/react-knob-headless"
                githubUrl="https://github.com/satya164/react-knob-headless"
                description="Knob controls provide a rotary input, often mimicking physical dials found on audio equipment. They are useful for adjusting values within a range, especially where vertical space is limited."
                features={[
                    "Accessible with keyboard support.",
                    "Customizable drag sensitivity.",
                    "Supports min, max, and step values.",
                    "ARIA attributes for screen readers."
                ]}
                installation="npm install react-knob-headless"
                usage={`import { useKnob } from 'react-knob-headless';\n\nconst { value, ...knobProps } = useKnob({ ... });\n<div {...knobProps} />`}
            />
        </div>
    );
};

export default KnobDemo;
