
import React, { useState } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';

const Skeleton: React.FC<{ className?: string; variant?: 'text' | 'circular' | 'rectangular' }> = ({ className, variant = 'text' }) => {
    const baseStyles = "animate-pulse bg-slate-200 dark:bg-slate-700/50";
    const variantStyles = {
        text: "rounded",
        circular: "rounded-full",
        rectangular: "rounded-md"
    };
    return (
        <div className={`${baseStyles} ${variantStyles[variant]} ${className}`}></div>
    );
};

const CardSkeleton = ({ showImage, lines }: { showImage: boolean, lines: number }) => (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 w-full max-w-sm transition-colors shadow-sm">
        <div className="flex items-center space-x-4 mb-4">
            {showImage && <Skeleton variant="circular" className="w-12 h-12" />}
            <div className="space-y-2 flex-1">
                <Skeleton variant="text" className="h-4 w-3/4" />
                <Skeleton variant="text" className="h-3 w-1/2" />
            </div>
        </div>
        <div className="space-y-3">
            <Skeleton variant="rectangular" className="h-20 w-full" />
            <div className="space-y-2">
                {Array.from({ length: lines }).map((_, i) => (
                    <Skeleton key={i} variant="text" className={`h-3 ${i === lines - 1 ? 'w-4/6' : 'w-full'}`} />
                ))}
            </div>
        </div>
    </div>
);

const SkeletonDemo: React.FC = () => {
    const [showImage, setShowImage] = useState(true);
    const [lines, setLines] = useState(3);

    return (
        <div>
            <LivePreview>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    <div className="flex justify-center w-full">
                        <CardSkeleton showImage={showImage} lines={lines} />
                    </div>
                    
                    {/* Configuration Panel */}
                    <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 space-y-4 w-full transition-colors">
                        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Configuration</h3>
                        
                        <div>
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={showImage} 
                                    onChange={(e) => setShowImage(e.target.checked)}
                                    className="form-checkbox h-4 w-4 text-sky-600 rounded border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-sky-500"
                                />
                                <span className="text-sm text-slate-700 dark:text-slate-300">Show Avatar</span>
                            </label>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Number of Lines: {lines}</label>
                            <input 
                                type="range" 
                                min="1" 
                                max="6" 
                                value={lines} 
                                onChange={(e) => setLines(Number(e.target.value))}
                                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
                            />
                        </div>
                    </div>
                </div>
            </LivePreview>
            <TechnicalOverview
                library="React Loading Skeleton"
                officialName="dvtng/react-loading-skeleton"
                githubUrl="https://github.com/dvtng/react-loading-skeleton"
                description="Skeleton screens provide a visual placeholder for content while it is loading. They improve perceived performance by giving users an immediate structure of the incoming data, reducing cognitive load compared to generic spinners."
                features={[
                    "Animates smoothly to indicate loading activity.",
                    "Customizable shapes (circle, rectangle, text).",
                    "Matches the layout of the actual content.",
                    "Accessible with ARIA attributes for screen readers."
                ]}
                installation="npm install react-loading-skeleton"
                usage={`import Skeleton from 'react-loading-skeleton';\nimport 'react-loading-skeleton/dist/skeleton.css';\n\n<Skeleton count={5} />`}
            />
        </div>
    );
};

export default SkeletonDemo;
