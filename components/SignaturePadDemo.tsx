
import React, { useRef, useState, useEffect } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';

const SignaturePadDemo: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [hasSignature, setHasSignature] = useState(false);

    const getContext = () => canvasRef.current?.getContext('2d');

    const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
        const ctx = getContext();
        if (!ctx || !canvasRef.current) return;

        const rect = canvasRef.current.getBoundingClientRect();
        const x = ('touches' in e ? e.touches[0].clientX : e.clientX) - rect.left;
        const y = ('touches' in e ? e.touches[0].clientY : e.clientY) - rect.top;

        ctx.beginPath();
        ctx.moveTo(x, y);
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

    useEffect(() => {
        const ctx = getContext();
        if (ctx) {
            ctx.strokeStyle = '#38bdf8'; // sky-400
            ctx.lineWidth = 2;
            ctx.lineCap = 'round';
        }
    }, []);

    return (
        <div>
            <LivePreview>
                <div className="flex flex-col items-center space-y-4">
                    <div className="relative border-2 border-dashed border-slate-700 rounded-lg bg-slate-900">
                         <canvas
                            ref={canvasRef}
                            width={400}
                            height={200}
                            className="cursor-crosshair touch-none w-full h-auto max-w-full"
                            onMouseDown={startDrawing}
                            onMouseMove={draw}
                            onMouseUp={stopDrawing}
                            onMouseLeave={stopDrawing}
                            onTouchStart={startDrawing}
                            onTouchMove={draw}
                            onTouchEnd={stopDrawing}
                        />
                        {!hasSignature && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-slate-600">
                                Sign here
                            </div>
                        )}
                    </div>
                    <button
                        onClick={clear}
                        disabled={!hasSignature}
                        className="px-4 py-2 bg-slate-800 border border-slate-700 text-slate-300 rounded-md hover:bg-slate-700 transition-colors disabled:opacity-50"
                    >
                        Clear Signature
                    </button>
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
