
import React, { useState } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';
import { VariableIcon } from './Icons';

const MathEditorDemo: React.FC = () => {
    const [latex, setLatex] = useState('f(x) = \\int_{-\\infty}^\\infty \\hat f(\\xi)\\,e^{2\\pi i \\xi x}\\,d\\xi');

    return (
        <div>
            <LivePreview>
                <div className="flex flex-col items-center gap-6">
                    <div className="p-6 bg-white dark:bg-slate-100 rounded-lg shadow-md text-slate-900 text-2xl font-serif">
                        {/* In a real app, use React-KaTeX to render this */}
                        <span className="italic">f(x)</span> = ∫ <sup className="-top-2 text-sm">-∞</sup><sub className="top-2 text-sm">∞</sub> <span className="italic">f̂(ξ)e</span><sup>2πiξx</sup> <span className="italic">dξ</span>
                    </div>
                    
                    <div className="w-full max-w-lg relative">
                        <label className="block text-xs font-medium text-slate-500 mb-2 font-mono">LaTeX Input</label>
                        <div className="relative">
                            <VariableIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                value={latex}
                                onChange={(e) => setLatex(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-slate-900 text-green-400 font-mono text-sm rounded-lg border border-slate-700 focus:ring-2 focus:ring-green-500 outline-none"
                            />
                        </div>
                    </div>
                </div>
            </LivePreview>
            <TechnicalOverview
                library="React KaTeX / MathQuill"
                officialName="katex"
                githubUrl="https://github.com/KaTeX/KaTeX"
                description="Math editors allow users to input and visualize complex mathematical formulas using LaTeX syntax. They are essential for educational and scientific applications."
                features={[
                    "Fast LaTeX rendering.",
                    "Accessible math output (MathML).",
                    "Server-side rendering support.",
                    "Interactive editing (MathQuill)."
                ]}
                installation="npm install react-katex katex"
                usage={`import 'katex/dist/katex.min.css';\nimport { InlineMath, BlockMath } from 'react-katex';\n\n<BlockMath math="c = \\pm\\sqrt{a^2 + b^2}" />`}
            />
        </div>
    );
};

export default MathEditorDemo;
