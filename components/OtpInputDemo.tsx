
import React, { useState, useRef, useEffect } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';

const OtpInput: React.FC<{ length?: number; value: string; onChange: (val: string) => void; isMasked?: boolean }> = ({ length = 6, value, onChange, isMasked = false }) => {
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        inputRefs.current = inputRefs.current.slice(0, length);
    }, [length]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
        const val = e.target.value;
        if (isNaN(Number(val))) return;

        const newValue = value.split('');
        newValue[idx] = val.substring(val.length - 1);
        const combined = newValue.join('');
        onChange(combined);

        if (val && idx < length - 1) {
            inputRefs.current[idx + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
        if (e.key === 'Backspace' && !value[idx] && idx > 0) {
            inputRefs.current[idx - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const data = e.clipboardData.getData('text').slice(0, length);
        if (/^\d+$/.test(data)) {
            onChange(data.padEnd(length, '').slice(0, length));
            inputRefs.current[Math.min(data.length, length - 1)]?.focus();
        }
    };

    return (
        <div className="flex gap-2">
            {Array.from({ length }).map((_, idx) => (
                <input
                    key={idx}
                    ref={el => inputRefs.current[idx] = el}
                    type={isMasked ? "password" : "text"}
                    maxLength={1}
                    value={value[idx] || ''}
                    onChange={e => handleChange(e, idx)}
                    onKeyDown={e => handleKeyDown(e, idx)}
                    onPaste={handlePaste}
                    className="w-12 h-12 text-center text-xl font-bold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all text-slate-900 dark:text-white"
                />
            ))}
        </div>
    );
};

const OtpInputDemo: React.FC = () => {
    const [otp, setOtp] = useState('');
    const [length, setLength] = useState(6);
    const [isMasked, setIsMasked] = useState(false);

    return (
        <div>
            <LivePreview>
                <div className="flex flex-col items-center space-y-8">
                    <div className="text-center">
                        <h3 className="text-slate-700 dark:text-slate-300 mb-4 font-medium">Enter Verification Code</h3>
                        <OtpInput length={length} value={otp} onChange={setOtp} isMasked={isMasked} />
                        <p className="mt-4 text-sm text-slate-500">
                            Current Value: <span className="font-mono text-sky-600 dark:text-sky-400">{otp || '(empty)'}</span>
                        </p>
                    </div>

                    {/* Configuration */}
                    <div className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 space-y-4 transition-colors">
                        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Configuration</h3>
                        
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Length: {length}</label>
                            <input 
                                type="range" 
                                min="4" 
                                max="8" 
                                value={length} 
                                onChange={(e) => {
                                    setLength(Number(e.target.value));
                                    setOtp('');
                                }}
                                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
                            />
                        </div>
                        <div>
                             <label className="flex items-center space-x-2 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={isMasked} 
                                    onChange={(e) => setIsMasked(e.target.checked)}
                                    className="form-checkbox h-4 w-4 text-sky-600 rounded border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-sky-500"
                                />
                                <span className="text-sm text-slate-700 dark:text-slate-300">Mask Input</span>
                            </label>
                        </div>
                    </div>
                </div>
            </LivePreview>
            <TechnicalOverview
                library="react-otp-input / input-otp"
                officialName="guilhermerodz/input-otp"
                githubUrl="https://github.com/guilhermerodz/input-otp"
                description="OTP inputs are specialized form fields for entering verification codes. They automatically handle focus management between fields and pasting logic."
                features={[
                    "Automatic focus switching.",
                    "Paste support for full codes.",
                    "Accessible keyboard navigation.",
                    "Customizable length and styling."
                ]}
                installation="npm install input-otp"
                usage={`import { OTPInput, Slot } from 'input-otp';\n\n<OTPInput maxLength={6} render={({ slots }) => (\n  <div className="flex">{slots.map((slot, idx) => <Slot key={idx} {...slot} />)}</div>\n)} />`}
            />
        </div>
    );
};

export default OtpInputDemo;
