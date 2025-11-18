import React from 'react';

interface ShowcaseContainerProps {
    title: string;
    children: React.ReactNode;
    className?: string;
}

const ShowcaseContainer: React.FC<ShowcaseContainerProps> = ({ title, children, className = '' }) => {
    return (
        <div className={`mt-8 ${className}`}>
            <h2 className="text-xl font-semibold text-slate-100 mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-sky-500 rounded-full inline-block"></span>
                {title}
            </h2>
            <div className="text-slate-400">
                {children}
            </div>
        </div>
    );
};

export const LivePreview: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
    <ShowcaseContainer title="Live Preview" className={className}>
        <div className="p-8 bg-slate-900 rounded-xl border border-slate-800 shadow-sm">
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
        <div className="space-y-6 bg-slate-900/50 rounded-xl border border-slate-800 p-6">
            <div>
                 <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                    <h3 className="text-lg font-medium text-slate-200">{library}</h3>
                    <a 
                        href={githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-sm text-slate-400 hover:text-sky-400 transition-colors bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-700 hover:border-slate-600"
                    >
                        <svg viewBox="0 0 16 16" fill="currentColor" height="16" width="16" className="w-4 h-4 flex-shrink-0"><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.19.01-.82.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21-.15.46-.55.38A8.013 8.013 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path></svg>
                        <span>{officialName}</span>
                    </a>
                </div>
                <p className="text-slate-400 leading-relaxed">{description}</p>
            </div>
            <div>
                <h4 className="font-medium text-slate-200 mb-2">Core Features</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-start text-sm text-slate-400">
                            <span className="mr-2 mt-1.5 w-1.5 h-1.5 bg-sky-500 rounded-full flex-shrink-0"></span>
                            {feature}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    <h4 className="font-medium text-slate-200 mb-2">Installation</h4>
                    <pre className="p-4 bg-slate-950 rounded-lg border border-slate-800 text-sm text-cyan-400 overflow-x-auto font-mono">
                        <code>{installation}</code>
                    </pre>
                </div>
                <div>
                    <h4 className="font-medium text-slate-200 mb-2">Basic Usage</h4>
                    <pre className="p-4 bg-slate-950 rounded-lg border border-slate-800 text-sm text-cyan-400 overflow-x-auto font-mono">
                        <code>{usage}</code>
                    </pre>
                </div>
            </div>
        </div>
    </ShowcaseContainer>
);

export default ShowcaseContainer;