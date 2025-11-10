import React from 'react';

interface ShowcaseContainerProps {
    title: string;
    children: React.ReactNode;
    className?: string;
}

const ShowcaseContainer: React.FC<ShowcaseContainerProps> = ({ title, children, className = '' }) => {
    return (
        <div className={`mt-8 ${className}`}>
            <h2 className="text-xl font-semibold text-slate-200 mb-4 pb-2 border-b border-slate-700">{title}</h2>
            <div className="text-slate-400">
                {children}
            </div>
        </div>
    );
};

export const LivePreview: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
    <ShowcaseContainer title="Live Preview" className={className}>
        <div className="p-6 bg-slate-800/50 rounded-lg border border-slate-700">
            {children}
        </div>
    </ShowcaseContainer>
);

export const TechnicalOverview: React.FC<{
    library: string;
    officialName: string;
    githubUrl: string;
    description: string;
    features: string[];
    installation: string;
    usage: string;
}> = ({ library, officialName, githubUrl, description, features, installation, usage }) => (
    <ShowcaseContainer title="Technical Overview">
        <div className="space-y-6">
            <div>
                 <div className="flex items-center justify-between flex-wrap gap-2">
                    <h3 className="text-lg font-medium text-slate-300">{library}</h3>
                    <a 
                        href={githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-sm text-slate-400 hover:text-sky-400 transition-colors"
                    >
                        <svg viewBox="0 0 16 16" fill="currentColor" height="16" width="16" className="w-4 h-4 flex-shrink-0"><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.19.01-.82.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21-.15.46-.55.38A8.013 8.013 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path></svg>
                        <span>{officialName}</span>
                    </a>
                </div>
                <p className="mt-1">{description}</p>
            </div>
            <div>
                <h4 className="font-medium text-slate-300">Core Features</h4>
                <ul className="list-disc list-inside mt-2 space-y-1">
                    {features.map((feature, index) => <li key={index}>{feature}</li>)}
                </ul>
            </div>
            <div>
                <h4 className="font-medium text-slate-300">Installation</h4>
                <pre className="mt-2 p-3 bg-slate-800 rounded-md text-sm text-cyan-400 overflow-x-auto">
                    <code>{installation}</code>
                </pre>
            </div>
            <div>
                <h4 className="font-medium text-slate-300">Basic Usage</h4>
                <pre className="mt-2 p-3 bg-slate-800 rounded-md text-sm text-cyan-400 overflow-x-auto">
                    <code>{usage}</code>
                </pre>
            </div>
        </div>
    </ShowcaseContainer>
);

export default ShowcaseContainer;