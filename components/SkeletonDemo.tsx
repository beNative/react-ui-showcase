import React from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';

const Skeleton: React.FC<{ className?: string }> = ({ className }) => (
    <div className={`animate-pulse bg-slate-700/50 rounded ${className}`}></div>
);

const CardSkeleton = () => (
    <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 w-full max-w-sm">
        <div className="flex items-center space-x-4 mb-4">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
            </div>
        </div>
        <div className="space-y-3">
            <Skeleton className="h-20 w-full rounded-md" />
            <div className="space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-5/6" />
                <Skeleton className="h-3 w-4/6" />
            </div>
        </div>
    </div>
);

const SkeletonDemo: React.FC = () => {
    return (
        <div>
            <LivePreview>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-items-center">
                    <CardSkeleton />
                    <CardSkeleton />
                </div>
            </LivePreview>
            <TechnicalOverview
                library="React Loading Skeleton"
                officialName="dvtng/react-loading-skeleton"
                githubUrl="https://github.com/dvtng/react-loading-skeleton"
                description="Skeleton screens provide a visual placeholder for content while it is loading. They improve perceived performance by giving users an immediate structure of the incoming data, reducing cognitive load compared to generic spinners."
                features={[
                    "Animates smoothly to indicate loading activity.",
                    "Customizable shapes, sizes, and colors.",
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