
import React, { useState, useEffect } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';

const Typewriter: React.FC<{ text: string; speed?: number; cursorChar?: string }> = ({ text, speed = 100, cursorChar = '|' }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingSpeed, setTypingSpeed] = useState(speed);

    useEffect(() => {
        setDisplayedText('');
        setIsDeleting(false);
        setTypingSpeed(speed);
    }, [text, speed]); // Reset on prop change

    useEffect(() => {
        let timer: any;

        const handleType = () => {
            const fullText = text;
            
            setDisplayedText(current => 
                isDeleting ? fullText.substring(0, current.length - 1) : fullText.substring(0, current.length + 1)
            );

            setTypingSpeed(isDeleting ? speed / 2 : speed);

            if (!isDeleting && displayedText === fullText) {
                setTypingSpeed(1500); // Pause at end
                setIsDeleting(true);
            } else if (isDeleting && displayedText === '') {
                setIsDeleting(false);
                setTypingSpeed(500); // Pause before restart
            }
        };

        timer = setTimeout(handleType, typingSpeed);
        return () => clearTimeout(timer);
    }, [displayedText, isDeleting, typingSpeed, text, speed]);

    return (
        <span className="font-mono text-xl md:text-3xl font-bold text-slate-900 dark:text-slate-100">
            {displayedText}
            <span className="animate-pulse text-sky-500 ml-1">{cursorChar}</span>
        </span>
    );
};

const TypewriterDemo: React.FC = () => {
    const [text, setText] = useState("Build beautiful UIs.");
    const [speed, setSpeed] = useState(100);
    const [cursor, setCursor] = useState("|");

    return (
        <div>
            <LivePreview>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="h-40 flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 transition-colors">
                         <Typewriter text={text} speed={speed} cursorChar={cursor} />
                    </div>

                    {/* Configuration */}
                    <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 space-y-4 w-full transition-colors">
                        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Configuration</h3>
                        
                         <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Text to Type</label>
                            <input 
                                type="text" 
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md px-3 py-2 text-sm text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-sky-500 outline-none transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Typing Delay: {speed}ms</label>
                            <input 
                                type="range" 
                                min="20" 
                                max="200" 
                                step="10"
                                value={speed} 
                                onChange={(e) => setSpeed(Number(e.target.value))}
                                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
                            />
                        </div>

                         <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Cursor Character</label>
                            <input 
                                type="text" 
                                maxLength={1}
                                value={cursor}
                                onChange={(e) => setCursor(e.target.value)}
                                className="w-16 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md px-3 py-2 text-sm text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-sky-500 outline-none text-center transition-colors"
                            />
                        </div>
                    </div>
                </div>
            </LivePreview>
            <TechnicalOverview
                library="Typewriter Effect"
                officialName="tameemsafi/typewriter-effect"
                githubUrl="https://github.com/tameemsafi/typewriter-effect"
                description="A typewriter effect animates text as if it were being typed in real-time. It's commonly used in hero sections to display rotating headlines or value propositions."
                features={[
                    "Configurable typing and deleting speeds.",
                    "Looping support.",
                    "Custom cursor styling.",
                    "Can type HTML strings."
                ]}
                installation="npm install typewriter-effect"
                usage={`import Typewriter from 'typewriter-effect';\n\n<Typewriter\n  options={{ strings: ['Hello', 'World'], autoStart: true, loop: true }}\n/>`}
            />
        </div>
    );
};

export default TypewriterDemo;
