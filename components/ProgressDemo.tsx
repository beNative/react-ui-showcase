
import React, { useState, useEffect } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';

const ProgressDemo: React.FC = () => {
    const [progress, setProgress] = useState(13);
    const [variant, setVariant] = useState<'linear' | 'circular'>('linear');

    useEffect(() => {
        const timer = setTimeout(() => setProgress(66), 500);
        return () => clearTimeout(timer);
    }, []);

    const randomize = () => setProgress(Math.floor(Math.random() * 100));

    return (
        <div>
            <LivePreview>
                <div className="flex flex-col items-center space-y-10 w-full max-w-md mx-auto">
                    
                    {variant === 'linear' ? (
                        <div className="w-full space-y-2">
                             <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                                <span>Progress</span>
                                <span>{progress}%</span>
                            </div>
                            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden transition-colors">
                                <div 
                                    className="bg-sky-500 h-2.5 rounded-full transition-all duration-1000 ease-out" 
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        </div>
                    ) : (
                        <div className="relative w-32 h-32">
                            <svg className="w-full h-full" viewBox="0 0 100 100">
                                <circle 
                                    className="text-slate-200 dark:text-slate-700 stroke-current transition-colors" 
                                    strokeWidth="10" 
                                    cx="50" 
                                    cy="50" 
                                    r="40" 
                                    fill="transparent" 
                                ></circle>
                                <circle 
                                    className="text-sky-500 progress-ring__circle stroke-current transition-all duration-1000 ease-out" 
                                    strokeWidth="10" 
                                    strokeLinecap="round" 
                                    cx="50" 
                                    cy="50" 
                                    r="40" 
                                    fill="transparent" 
                                    strokeDasharray="251.2" 
                                    strokeDashoffset={251.2 - (251.2 * progress) / 100}
                                    transform="rotate(-90 50 50)"
                                ></circle>
                            </svg>
                            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-xl font-bold text-slate-800 dark:text-slate-200">
                                {progress}%
                            </div>
                        </div>
                    )}

                    <button onClick={randomize} className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 rounded text-sm text-slate-700 dark:text-slate-300 transition-colors">
                        Randomize Value
                    </button>

                    {/* Configuration */}
                    <div className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 space-y-4 transition-colors">
                        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Configuration</h3>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Variant</label>
                            <div className="flex space-x-4">
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input 
                                        type="radio" 
                                        name="variant"
                                        checked={variant === 'linear'} 
                                        onChange={() => setVariant('linear')}
                                        className="h-4 w-4 text-sky-600 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-sky-500"
                                    />
                                    <span className="text-sm text-slate-700 dark:text-slate-300">Linear</span>
                                </label>
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input 
                                        type="radio" 
                                        name="variant"
                                        checked={variant === 'circular'} 
                                        onChange={() => setVariant('circular')}
                                        className="h-4 w-4 text-sky-600 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-sky-500"
                                    />
                                    <span className="text-sm text-slate-700 dark:text-slate-300">Circular</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </LivePreview>
            <TechnicalOverview
                library="Radix UI Progress"
                officialName="radix-ui/primitives"
                githubUrl="https://github.com/radix-ui/primitives"
                description="Progress indicators inform users about the status of ongoing processes, such as loading an app, submitting a form, or saving updates."
                features={[
                    "Accessible with WAI-ARIA roles.",
                    "Smooth CSS transitions.",
                    "Indeterminate state support.",
                    "Customizable styling via CSS or Tailwind."
                ]}
                installation="npm install @radix-ui/react-progress"
                usage={`import * as Progress from '@radix-ui/react-progress';\n\n<Progress.Root value={50}>\n  <Progress.Indicator style={{ width: '50%' }} />\n</Progress.Root>`}
            />
        </div>
    );
};

export default ProgressDemo;
