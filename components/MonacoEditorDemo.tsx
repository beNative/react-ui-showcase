
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';
import { generateCode } from '../services/geminiService';
import { GeminiIcon } from './Icons';

// Minimal Monaco Editor types to avoid full dependency
declare const monaco: any;

const MonacoEditorDemo: React.FC = () => {
    const editorRef = useRef<HTMLDivElement>(null);
    const monacoInstanceRef = useRef<any>(null);
    const [code, setCode] = useState<string>('function helloWorld() {\n  console.log("Hello, world!");\n}');
    const [language, setLanguage] = useState<string>('javascript');
    const [theme, setTheme] = useState<'vs-dark' | 'vs-light'>('vs-dark');
    const [showMinimap, setShowMinimap] = useState(false);
    const [geminiPrompt, setGeminiPrompt] = useState<string>('a React component for a login form');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const loadMonaco = useCallback(() => {
        if ((window as any).monaco) {
            initializeMonaco();
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/monaco-editor@0.44.0/min/vs/loader.js';
        script.onload = () => {
            (window as any).require.config({ paths: { 'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.44.0/min/vs' } });
            (window as any).require(['vs/editor/editor.main'], () => {
                initializeMonaco();
            });
        };
        document.body.appendChild(script);
    }, []);

    const initializeMonaco = () => {
        if (editorRef.current && !monacoInstanceRef.current) {
            monacoInstanceRef.current = monaco.editor.create(editorRef.current, {
                value: code,
                language: language,
                theme: theme,
                automaticLayout: true,
                minimap: { enabled: showMinimap },
                padding: { top: 10 },
                fontSize: 14
            });
            monacoInstanceRef.current.onDidChangeModelContent(() => {
                setCode(monacoInstanceRef.current.getValue());
            });
        }
    };
    
    useEffect(() => {
        loadMonaco();
        return () => {
            monacoInstanceRef.current?.dispose();
            monacoInstanceRef.current = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (monacoInstanceRef.current) {
            monaco.editor.setModelLanguage(monacoInstanceRef.current.getModel(), language);
            monaco.editor.setTheme(theme);
            monacoInstanceRef.current.updateOptions({ minimap: { enabled: showMinimap } });
        }
    }, [language, theme, showMinimap]);
    
    const handleGenerateCode = async () => {
        setIsLoading(true);
        const generated = await generateCode(geminiPrompt);
        if (monacoInstanceRef.current) {
            monacoInstanceRef.current.setValue(generated);
        }
        setCode(generated);
        setIsLoading(false);
    };

    return (
        <div>
            <LivePreview>
                <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg transition-colors">
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex items-center">
                                <label className="mr-2 text-sm font-medium text-slate-600 dark:text-slate-400">Language:</label>
                                <select
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-sky-500 outline-none text-slate-700 dark:text-slate-200"
                                >
                                    <option value="javascript">JavaScript</option>
                                    <option value="typescript">TypeScript</option>
                                    <option value="python">Python</option>
                                    <option value="html">HTML</option>
                                    <option value="css">CSS</option>
                                </select>
                            </div>
                            <div className="flex items-center">
                                <label className="mr-2 text-sm font-medium text-slate-600 dark:text-slate-400">Theme:</label>
                                <select
                                    value={theme}
                                    onChange={(e) => setTheme(e.target.value as any)}
                                    className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-sky-500 outline-none text-slate-700 dark:text-slate-200"
                                >
                                    <option value="vs-dark">Dark</option>
                                    <option value="vs-light">Light</option>
                                </select>
                            </div>
                        </div>
                         <label className="flex items-center space-x-2 cursor-pointer">
                            <input 
                                type="checkbox" 
                                checked={showMinimap} 
                                onChange={(e) => setShowMinimap(e.target.checked)}
                                className="form-checkbox h-4 w-4 text-sky-600 rounded border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-sky-500"
                            />
                            <span className="text-sm text-slate-600 dark:text-slate-400">Minimap</span>
                        </label>
                    </div>

                    <div className="h-96 w-full rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm" ref={editorRef} />
                    
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors">
                        <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 flex items-center"><GeminiIcon className="w-5 h-5 mr-2 text-sky-500"/>Generate Code with Gemini</h3>
                        <div className="flex flex-col sm:flex-row gap-2">
                           <input 
                             type="text"
                             value={geminiPrompt}
                             onChange={(e) => setGeminiPrompt(e.target.value)}
                             placeholder="Describe the code you want to generate..."
                             className="flex-grow bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md px-3 py-2 text-sm placeholder-slate-400 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
                           />
                           <button
                             onClick={handleGenerateCode}
                             disabled={isLoading}
                             className="px-4 py-2 bg-sky-600 text-white rounded-md text-sm font-semibold hover:bg-sky-500 transition-colors disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed flex items-center justify-center"
                           >
                            {isLoading ? (
                                <>
                                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                 </svg>
                                 Generating...
                                </>
                            ) : "Generate"}
                           </button>
                        </div>
                    </div>
                </div>
            </LivePreview>
            <TechnicalOverview
                library="Monaco Editor"
                officialName="microsoft/monaco-editor"
                githubUrl="https://github.com/microsoft/monaco-editor"
                description="The Monaco Editor is the code editor that powers VS Code. It's a browser-based editor that provides code intelligence features like syntax highlighting, smart completions, and error checking."
                features={[
                    "Rich IntelliSense and validation",
                    "Support for dozens of languages",
                    "Diff editor and other advanced features",
                    "Highly extensible and customizable"
                ]}
                installation="npm install monaco-editor"
                usage={`import * as monaco from 'monaco-editor';\n\nmonaco.editor.create(document.getElementById('container'), {\n  value: 'console.log("Hello, world!");',\n  language: 'javascript'\n});`}
            />
        </div>
    );
};

export default MonacoEditorDemo;
