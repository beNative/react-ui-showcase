
import React, { useState } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';
import { ShareIcon } from './Icons';

const DiagramEditorDemo: React.FC = () => {
    const [code, setCode] = useState(`graph TD
    A[Start] --> B{Is it?}
    B -- Yes --> C[OK]
    C --> D[Rethink]
    D --> B
    B -- No ----> E[End]`);

    return (
        <div>
            <LivePreview>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                        <label className="text-xs font-bold text-slate-500 mb-2 uppercase">Mermaid Syntax</label>
                        <textarea
                            className="flex-1 min-h-[200px] bg-slate-900 text-slate-300 font-mono text-xs p-4 rounded-lg border border-slate-700 resize-none outline-none focus:border-sky-500 transition-colors"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                         <label className="text-xs font-bold text-slate-500 mb-2 uppercase">Preview</label>
                        <div className="flex-1 min-h-[200px] bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center p-4">
                            {/* Simulated Diagram */}
                            <div className="flex flex-col items-center space-y-4">
                                <div className="px-4 py-2 rounded border border-slate-800 bg-slate-100 dark:text-slate-900 text-xs font-bold shadow-sm">Start</div>
                                <div className="h-4 w-0.5 bg-slate-400"></div>
                                <div className="px-4 py-2 rounded border border-slate-800 bg-yellow-100 dark:text-slate-900 text-xs font-bold rotate-45 transform"><span className="-rotate-45 block">Is it?</span></div>
                                <div className="flex justify-between w-32 pt-2">
                                     <div className="text-[10px] text-slate-500">Yes</div>
                                     <div className="text-[10px] text-slate-500">No</div>
                                </div>
                                <div className="flex gap-8">
                                    <div className="px-4 py-2 rounded border border-slate-800 bg-green-100 dark:text-slate-900 text-xs font-bold">OK</div>
                                    <div className="px-4 py-2 rounded border border-slate-800 bg-red-100 dark:text-slate-900 text-xs font-bold">End</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LivePreview>
            <TechnicalOverview
                library="Mermaid.js"
                officialName="mermaid-js/mermaid"
                githubUrl="https://github.com/mermaid-js/mermaid"
                description="Mermaid allows you to generate diagrams and flowcharts from text in a similar manner as Markdown. It is widely used in documentation tools like Notion and GitHub."
                features={[
                    "Flowcharts, Sequence diagrams, Gantt charts.",
                    "Text-based definition for version control.",
                    "Automatic layout generation.",
                    "Themeable."
                ]}
                installation="npm install mermaid"
                usage={`import mermaid from 'mermaid';\n// mermaid.initialize({ startOnLoad: true });\n\n<div className="mermaid">{code}</div>`}
            />
        </div>
    );
};

export default DiagramEditorDemo;
