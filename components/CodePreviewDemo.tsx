
import React, { useState } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';
import { PlayCircleIcon } from './Icons';

const CodePreviewDemo: React.FC = () => {
    const [code, setCode] = useState(`<div className="p-4 bg-sky-100 rounded-lg text-center">
  <h1 className="text-2xl text-sky-700 font-bold">Hello World</h1>
  <p className="text-sky-600">Edit me!</p>
</div>`);

    return (
        <div>
            <LivePreview>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-80">
                    {/* Editor Pane */}
                    <div className="flex flex-col rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                        <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 text-xs font-mono text-slate-500 border-b border-slate-200 dark:border-slate-700">
                            App.js
                        </div>
                        <textarea
                            className="flex-1 p-4 font-mono text-sm bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 resize-none outline-none"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            spellCheck={false}
                        />
                    </div>

                    {/* Preview Pane */}
                    <div className="flex flex-col rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                        <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 text-xs font-mono text-slate-500 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                            <span>Preview</span>
                            <PlayCircleIcon className="w-4 h-4 text-green-500" />
                        </div>
                        <div className="flex-1 p-4 bg-white dark:bg-slate-950 flex items-center justify-center">
                             {/* Dangerous: Basic evaluation simulation */}
                             <div className="w-full">
                                 {/* We simulate render by stripping tags for this safe demo, in real app use Sandpack */}
                                 <div className="p-4 bg-sky-100 rounded-lg text-center">
                                     <h1 className="text-2xl text-sky-700 font-bold">Hello World</h1>
                                     <p className="text-sky-600">Edit me!</p>
                                 </div>
                                 <p className="text-xs text-slate-400 mt-4 text-center">(Preview is static in this demo)</p>
                             </div>
                        </div>
                    </div>
                </div>
            </LivePreview>
            <TechnicalOverview
                library="Sandpack"
                officialName="codesandbox/sandpack"
                githubUrl="https://github.com/codesandbox/sandpack"
                description="Sandpack is a component toolkit for creating live running code editing experiences. It bundles and runs code directly in the browser using CodeSandbox's technology."
                features={[
                    "Live preview of React/Vue/Vanilla code.",
                    "Bundling in the browser.",
                    "Customizable editor and preview layout.",
                    "Preconfigured templates."
                ]}
                installation="npm install @codesandbox/sandpack-react"
                usage={`import { Sandpack } from "@codesandbox/sandpack-react";\n\n<Sandpack template="react" />`}
            />
        </div>
    );
};

export default CodePreviewDemo;
