
import React, { useState } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';
import { QrCodeIcon } from './Icons';

const QRCodeDemo: React.FC = () => {
    const [text, setText] = useState('https://react.dev');
    const [size, setSize] = useState(200);
    const [color, setColor] = useState('#000000');

    // We'll use an image API for the demo to avoid heavy crypto libraries in the client-side demo
    // In production, use `react-qr-code` or `qrcode.react`
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}&color=${color.replace('#', '')}`;

    return (
        <div>
            <LivePreview>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-xl border border-slate-200 shadow-sm">
                        <img src={qrUrl} alt="QR Code" className="mix-blend-multiply" style={{ width: size, height: size }} />
                        <p className="text-xs text-slate-400 mt-4">Scan to visit</p>
                    </div>

                     {/* Configuration */}
                     <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 space-y-4 w-full">
                        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Configuration</h3>
                        
                         <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Content</label>
                            <input 
                                type="text" 
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md px-3 py-2 text-sm text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-sky-500 outline-none"
                            />
                        </div>

                         <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Size: {size}px</label>
                            <input 
                                type="range" 
                                min="100" 
                                max="300" 
                                step="10"
                                value={size} 
                                onChange={(e) => setSize(Number(e.target.value))}
                                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Color</label>
                             <div className="flex flex-wrap gap-2">
                                {['#000000', '#0ea5e9', '#ef4444', '#22c55e', '#6366f1'].map((c) => (
                                    <button
                                        key={c}
                                        onClick={() => setColor(c)}
                                        className={`w-8 h-8 rounded-full border-2 transition-all ${color === c ? 'border-slate-400 dark:border-white scale-110 shadow-sm' : 'border-transparent'}`}
                                        style={{ backgroundColor: c }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </LivePreview>
            <TechnicalOverview
                library="react-qr-code"
                officialName="rosskhanas/react-qr-code"
                githubUrl="https://github.com/rosskhanas/react-qr-code"
                description="A component that generates QR codes from text or URLs. It renders SVGs for crisp scaling and flexibility."
                features={[
                    "SVG rendering for high quality.",
                    "Customizable size and colors.",
                    "Responsive.",
                    "Zero dependencies (mostly)."
                ]}
                installation="npm install react-qr-code"
                usage={`import QRCode from "react-qr-code";\n\n<QRCode value="https://example.com" size={256} />`}
            />
        </div>
    );
};

export default QRCodeDemo;
