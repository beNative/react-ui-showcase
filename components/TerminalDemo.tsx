
import React, { useState, useEffect, useRef } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';
import { CommandLineIcon } from './Icons';

const TerminalDemo: React.FC = () => {
    const [history, setHistory] = useState<string[]>(['Welcome to React UI Shell v1.0', 'Type "help" for commands.']);
    const [input, setInput] = useState('');
    const endRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        const cmd = input.trim();
        
        setHistory(prev => [...prev, `> ${cmd}`]);
        
        switch(cmd.toLowerCase()) {
            case 'help':
                setHistory(prev => [...prev, 'Available commands: help, clear, about, echo [text]']);
                break;
            case 'clear':
                setHistory([]);
                break;
            case 'about':
                setHistory(prev => [...prev, 'This is a simulated terminal component for the UI Showcase app.']);
                break;
            default:
                if (cmd.startsWith('echo ')) {
                    setHistory(prev => [...prev, cmd.slice(5)]);
                } else if (cmd) {
                    setHistory(prev => [...prev, `Command not found: ${cmd}`]);
                }
        }
        setInput('');
    };

    return (
        <div>
            <LivePreview>
                <div className="w-full max-w-2xl mx-auto rounded-lg overflow-hidden shadow-2xl border border-slate-800 bg-slate-950 font-mono text-sm">
                    {/* Header */}
                    <div className="flex items-center px-4 py-2 bg-slate-900 border-b border-slate-800">
                        <div className="flex space-x-2 mr-4">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="flex items-center text-slate-400 text-xs">
                            <CommandLineIcon className="w-3 h-3 mr-2" />
                            bash — 80x24
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 h-64 overflow-y-auto text-slate-300" onClick={() => document.getElementById('terminal-input')?.focus()}>
                        {history.map((line, i) => (
                            <div key={i} className="mb-1 break-words">
                                {line.startsWith('>') ? (
                                    <span className="text-slate-400">{line}</span>
                                ) : (
                                    <span className="text-green-400">{line}</span>
                                )}
                            </div>
                        ))}
                        <form onSubmit={handleCommand} className="flex items-center mt-2">
                            <span className="text-pink-500 mr-2">➜</span>
                            <span className="text-sky-400 mr-2">~</span>
                            <input
                                id="terminal-input"
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="flex-1 bg-transparent border-none outline-none text-slate-200 placeholder-slate-600"
                                autoFocus
                                autoComplete="off"
                            />
                        </form>
                        <div ref={endRef} />
                    </div>
                </div>
            </LivePreview>
            <TechnicalOverview
                library="XTerm.js"
                officialName="xtermjs/xterm.js"
                githubUrl="https://github.com/xtermjs/xterm.js"
                description="A terminal component simulates a command-line interface within the browser. It's useful for developer tools, admin dashboards, or educational platforms."
                features={[
                    "Full terminal emulation.",
                    "Support for colors and styles.",
                    "Fit addons for resizing.",
                    "High performance rendering."
                ]}
                installation="npm install xterm"
                usage={`import { Terminal } from 'xterm';\n\nconst term = new Terminal();\nterm.open(document.getElementById('terminal'));\nterm.write('Hello World');`}
            />
        </div>
    );
};

export default TerminalDemo;
