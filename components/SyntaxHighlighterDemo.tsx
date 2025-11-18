
import React, { useState } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';

const codeSnippet = `function greet(name) {
  const message = "Hello, " + name + "!";
  console.log(message);
  return message;
}

// Call the function
greet("World");`;

const SyntaxHighlighterDemo: React.FC = () => {
    const [showLineNumbers, setShowLineNumbers] = useState(true);

    // Naive highlighting for demo
    const highlight = (code: string) => {
        return code.split('\n').map((line, i) => (
            <div key={i} className="table-row">
                {showLineNumbers && (
                    <span className="table-cell text-right pr-4 text-slate-400 select-none text-xs align-top w-8 border-r border-slate-700 mr-4">{i + 1}</span>
                )}
                <span className="table-cell pl-4 whitespace-pre-wrap font-mono text-sm">
                    {line.split(/(\bfunction\b|\bconst\b|\breturn\b|".*?"|\/\/.*)/g).map((part, j) => {
                        if (part === 'function' || part === 'const' || part === 'return') return <span key={j} className="text-purple-400">{part}</span>;
                        if (part.startsWith('"')) return <span key={j} className="text-green-400">{part}</span>;
                        if (part.startsWith('//')) return <span key={j} className="text-slate-500 italic">{part}</span>;
                        if (['console', 'log'].includes(part)) return <span key={j} className="text-blue-400">{part}</span>;
                         if (part.match(/^\w+\(/)) return <span key={j} className="text-yellow-300">{part}</span>;
                        return <span key={j} className="text-slate-200">{part}</span>;
                    })}
                </span>
            </div>
        ));
    };

    return (
        <div>
            <LivePreview>
                <div className="w-full max-w-2xl mx-auto bg-slate-900 rounded-lg overflow-hidden shadow-xl border border-slate-800">
                    <div className="flex items-center px-4 py-2 bg-slate-950 border-b border-slate-800">
                        <div className="flex space-x-2">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                        </div>
                        <div className="ml-4 text-xs text-slate-400">script.js</div>
                    </div>
                    <div className="p-4 overflow-x-auto bg-slate-900">
                        <div className="table w-full">
                            {highlight(codeSnippet)}
                        </div>
                    </div>
                </div>

                 {/* Configuration */}
                 <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 mt-8">
                    <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Configuration</h3>
                    <label className="flex items-center space-x-2 cursor-pointer">
                        <input 
                            type="checkbox" 
                            checked={showLineNumbers} 
                            onChange={(e) => setShowLineNumbers(e.target.checked)}
                            className="form-checkbox h-4 w-4 text-sky-600 rounded border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-sky-500"
                        />
                        <span className="text-sm text-slate-700 dark:text-slate-300">Show Line Numbers</span>
                    </label>
                </div>
            </LivePreview>
            <TechnicalOverview
                library="react-syntax-highlighter / PrismJS"
                officialName="react-syntax-highlighter/react-syntax-highlighter"
                githubUrl="https://github.com/react-syntax-highlighter/react-syntax-highlighter"
                description="A syntax highlighter renders code snippets with coloring based on the language grammar, improving readability for developers."
                features={[
                    "Supports dozens of languages.",
                    "PrismJS or Highlight.js under the hood.",
                    "Custom themes (Dracula, Atom One Dark, etc.).",
                    "Line numbering and line highlighting."
                ]}
                installation="npm install react-syntax-highlighter"
                usage={`import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';\nimport { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';\n\n<SyntaxHighlighter language="javascript" style={dark}>\n  {codeString}\n</SyntaxHighlighter>`}
            />
        </div>
    );
};

export default SyntaxHighlighterDemo;
