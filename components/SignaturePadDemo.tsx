
import React, { useRef, useState, useEffect } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';

const SignaturePadDemo: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [hasSignature, setHasSignature] = useState(false);
    const [penColor, setPenColor] = useState('#38bdf8');
    const [penWidth, setPenWidth] = useState(2);

    const getContext = () => canvasRef.current?.getContext('2d');

    const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
        const ctx = getContext();
        if (!ctx || !canvasRef.current) return;

        const rect = canvasRef.current.getBoundingClientRect();
        const x = ('touches' in e ? e.touches[0].clientX : e.clientX) - rect.left;
        const y = ('touches' in e ? e.touches[0].clientY : e.clientY) - rect.top;

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.strokeStyle = penColor;
        ctx.lineWidth = penWidth;
        ctx.lineCap = 'round';
        setIsDrawing(true);
    };

    const draw = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDrawing) return;
        const ctx = getContext();
        if (!ctx || !canvasRef.current) return;
        e.preventDefault(); // Prevent scrolling on touch

        const rect = canvasRef.current.getBoundingClientRect();
        const x = ('touches' in e ? e.touches[0].clientX : e.clientX) - rect.left;
        const y = ('touches' in e ? e.touches[0].clientY : e.clientY) - rect.top;

        ctx.lineTo(x, y);
        ctx.stroke();
        setHasSignature(true);
    };

    const stopDrawing = () => {
        const ctx = getContext();
        if (ctx) ctx.closePath();
        setIsDrawing(false);
    };

    const clear = () => {
        const ctx = getContext();
        if (ctx && canvasRef.current) {
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            setHasSignature(false);
        }
    };

    return (
        <div>
            <LivePreview>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 flex flex-col items-center space-y-4">
                        <div className="relative border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 w-full">
                             <canvas
                                ref={canvasRef}
                                width={600}
                                height={300}
                                className="cursor-crosshair touch-none w-full h-auto max-w-full rounded-lg"
                                onMouseDown={startDrawing}
                                onMouseMove={draw}
                                onMouseUp={stopDrawing}
                                onMouseLeave={stopDrawing}
                                onTouchStart={startDrawing}
                                onTouchMove={draw}
                                onTouchEnd={stopDrawing}
                            />
                            {!hasSignature && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-slate-400 dark:text-slate-600">
                                    Sign here
                                </div>
                            )}
                        </div>
                        <button
                            onClick={clear}
                            disabled={!hasSignature}
                            className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50 shadow-sm"
                        >
                            Clear Signature
                        </button>
                    </div>

                     {/* Configuration */}
                     <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 space-y-4 h-fit">
                        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Configuration</h3>
                        
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Pen Color</label>
                             <div className="flex flex-wrap gap-2">
                                {['#38bdf8', '#ef4444', '#22c55e', '#f59e0b', '#6366f1', '#1e293b'].map((color) => (
                                    <button
                                        key={color}
                                        onClick={() => setPenColor(color)}
                                        className={`w-8 h-8 rounded-full border-2 transition-all ${penColor === color ? 'border-slate-400 dark:border-white scale-110 shadow-sm' : 'border-transparent'}`}
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                        </div>

                         <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Stroke Width: {penWidth}px</label>
                            <input 
                                type="range" 
                                min="1" 
                                max="10" 
                                value={penWidth} 
                                onChange={(e) => setPenWidth(Number(e.target.value))}
                                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
                            />
                        </div>
                    </div>
                </div>
            </LivePreview>
            <TechnicalOverview
                library="react-signature-canvas"
                officialName="agilgur5/react-signature-canvas"
                githubUrl="https://github.com/agilgur5/react-signature-canvas"
                description="A signature pad component allows users to draw their signature using mouse or touch interactions. It essentially wraps an HTML5 Canvas element."
                features={[
                    "Supports mouse and touch events.",
                    "Smooth line rendering with variable width.",
                    "Export to base64 or blob for saving.",
                    "Customizable stroke color and background."
                ]}
                installation="npm install react-signature-canvas"
                usage={`import SignatureCanvas from 'react-signature-canvas'\n\n<SignatureCanvas \n  penColor='green'\n  canvasProps={{width: 500, height: 200, className: 'sigCanvas'}} \n/>`}
            />
        </div>
    );
};

export default SignaturePadDemo;
