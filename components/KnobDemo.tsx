
import React, { useState, useRef, useEffect } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';

const Knob: React.FC<{ value: number; min: number; max: number; onChange: (val: number) => void; size: number; color: string }> = ({ value, min, max, onChange, size, color }) => {
    const knobRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    // Calculate rotation based on value
    const percentage = (value - min) / (max - min);
    const rotation = -135 + (percentage * 270); // -135deg to +135deg

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging || !knobRef.current) return;
            
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
                className="relative rounded-full bg-slate-100 dark:bg-slate-800 border-4 border-slate-200 dark:border-slate-700 shadow-lg cursor-ns-resize flex items-center justify-center select-none"
                style={{ width: size, height: size }}
            >
                 {/* Track */}
                 <svg className="absolute inset-0 w-full h-full transform rotate-[135deg]" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="none" className="text-slate-300 dark:text-slate-900" strokeDasharray="188.5" />
                 </svg>
                 
                 {/* Active Track */}
                  <svg className="absolute inset-0 w-full h-full transform rotate-[135deg]" viewBox="0 0 100 100">
                    <circle 
                        cx="50" 
                        cy="50" 
                        r="40" 
                        stroke={color} 
                        strokeWidth="8" 
                        fill="none" 
                        className="transition-all duration-75"
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
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-2 h-3 bg-slate-400 dark:bg-slate-500 rounded-full shadow-sm"></div>
                </div>
                
                {/* Value Display */}
                <div className="absolute text-xl font-bold text-slate-700 dark:text-slate-200 select-none pointer-events-none">
                    {Math.round(value)}
                </div>
            </div>
             <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Level</span>
        </div>
    );
};

const KnobDemo: React.FC = () => {
    const [volume, setVolume] = useState(50);
    const [size, setSize] = useState(120);
    const [color, setColor] = useState('#0ea5e9');

    return (
        <div>
            <LivePreview>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="flex justify-center items-center py-8">
                        <Knob value={volume} min={0} max={100} onChange={setVolume} size={size} color={color} />
                    </div>

                    {/* Configuration */}
                    <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 space-y-4 w-full">
                        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Configuration</h3>
                        
                         <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Size: {size}px</label>
                            <input 
                                type="range" 
                                min="80" 
                                max="200" 
                                value={size} 
                                onChange={(e) => setSize(Number(e.target.value))}
                                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
                            />
                        </div>

                         <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Active Color</label>
                            <div className="flex flex-wrap gap-2">
                                {['#0ea5e9', '#ec4899', '#8b5cf6', '#10b981', '#f59e0b'].map((c) => (
                                    <button
                                        key={c}
                                        onClick={() => setColor(c)}
                                        className={`w-6 h-6 rounded-full border-2 transition-all ${color === c ? 'border-slate-900 dark:border-white scale-110' : 'border-transparent hover:scale-110'}`}
                                        style={{ backgroundColor: c }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
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
