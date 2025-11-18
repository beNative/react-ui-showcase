
import React, { useState } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';
import { EyeIcon, EyeSlashIcon } from './Icons';

const MarkdownEditorDemo: React.FC = () => {
    const [markdown, setMarkdown] = useState('# Hello Markdown\n\nThis is a **live** editor.\n\n- List item 1\n- List item 2');
    const [showPreview, setShowPreview] = useState(true);

    // Simple regex-based markdown parser for demo purposes
    const parseMarkdown = (text: string) => {
        let html = text
            .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mb-2">$1</h1>')
            .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mb-2">$1</h2>')
            .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
            .replace(/\*(.*)\*/gim, '<i>$1</i>')
            .replace(/^- (.*$)/gim, '<li class="ml-4 list-disc">$1</li>')
            .replace(/\n/gim, '<br />');
        return { __html: html };
    };

    return (
        <div>
            <LivePreview>
                <div className="w-full h-96 flex flex-col rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <div className="flex justify-between items-center px-4 py-2 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                        <span className="text-xs font-bold text-slate-500 uppercase">Markdown Editor</span>
                        <button 
                            onClick={() => setShowPreview(!showPreview)}
                            className="text-slate-500 hover:text-sky-500 transition-colors"
                        >
                            {showPreview ? <EyeSlashIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                        </button>
                    </div>
                    <div className="flex-1 flex overflow-hidden">
                        <textarea
                            value={markdown}
                            onChange={(e) => setMarkdown(e.target.value)}
                            className={`flex-1 p-4 resize-none outline-none bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-mono text-sm ${showPreview ? 'w-1/2 border-r border-slate-200 dark:border-slate-700' : 'w-full'}`}
                            placeholder="Type markdown here..."
                        />
                        {showPreview && (
                            <div 
                                className="flex-1 p-4 bg-slate-50 dark:bg-slate-950 overflow-y-auto text-slate-800 dark:text-slate-300"
                                dangerouslySetInnerHTML={parseMarkdown(markdown)}
                            />
                        )}
                    </div>
                </div>
            </LivePreview>
            <TechnicalOverview
                library="react-markdown / remark"
                officialName="remarkjs/react-markdown"
                githubUrl="https://github.com/remarkjs/react-markdown"
                description="A Markdown editor typically consists of a raw text input and a live preview pane that renders the markdown syntax into HTML."
                features={[
                    "Safe rendering (prevents XSS).",
                    "Support for GFM (GitHub Flavored Markdown).",
                    "Syntax highlighting for code blocks.",
                    "Custom component mapping."
                ]}
                installation="npm install react-markdown"
                usage={`import ReactMarkdown from 'react-markdown'\n\n<ReactMarkdown>{markdownString}</ReactMarkdown>`}
            />
        </div>
    );
};

export default MarkdownEditorDemo;
