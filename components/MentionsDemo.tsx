
import React, { useState, useRef } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';
import { AtSymbolIcon } from './Icons';

const users = [
    { id: 'john', display: 'John Doe' },
    { id: 'jane', display: 'Jane Smith' },
    { id: 'alice', display: 'Alice Johnson' },
    { id: 'bob', display: 'Bob Williams' },
];

const MentionsDemo: React.FC = () => {
    const [text, setText] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    // In a real app, use a library to calculate caret coordinates
    const [cursorPos, setCursorPos] = useState({ top: 0, left: 0 }); 
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.target.value;
        setText(val);
        
        const index = e.target.selectionStart;
        const lastChar = val.slice(index - 1, index);
        
        if (lastChar === '@') {
            setShowSuggestions(true);
            // Mock position calculation for demo simplicity
            setCursorPos({ top: 40, left: Math.min(index * 8, 300) }); 
        } else if (lastChar === ' ' || val.length === 0) {
             setShowSuggestions(false);
        }
    };

    const insertMention = (user: typeof users[0]) => {
        const parts = text.split('@');
        // Remove the empty part created by the last @
        if (parts.length > 1) parts.pop();
        
        const newText = parts.join('@') + '@' + user.id + ' ';
        setText(newText);
        setShowSuggestions(false);
        textareaRef.current?.focus();
    };

    return (
        <div>
            <LivePreview>
                <div className="relative w-full max-w-md mx-auto">
                    <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Comment</label>
                    <div className="relative">
                        <textarea
                            ref={textareaRef}
                            value={text}
                            onChange={handleInput}
                            placeholder="Type '@' to mention someone..."
                            className="w-full h-32 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md p-3 text-slate-900 dark:text-slate-200 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none resize-none font-mono text-sm transition-colors"
                        />
                         <div className="absolute bottom-3 right-3 text-slate-400 dark:text-slate-600">
                            <AtSymbolIcon className="w-5 h-5" />
                        </div>
                    </div>

                    {/* Suggestions Popover */}
                    {showSuggestions && (
                        <div 
                            className="absolute bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md shadow-xl z-10 w-48 overflow-hidden animate-fade-in transition-colors"
                            style={{ top: `${cursorPos.top + 20}px`, left: `${cursorPos.left + 10}px` }}
                        >
                            <div className="px-3 py-2 text-xs font-semibold text-slate-500 dark:text-slate-500 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                                Suggestions
                            </div>
                            {users.map(user => (
                                <button
                                    key={user.id}
                                    onClick={() => insertMention(user)}
                                    className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-sky-50 dark:hover:bg-sky-600 hover:text-sky-700 dark:hover:text-white transition-colors flex items-center"
                                >
                                    <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-600 flex items-center justify-center text-xs mr-2 font-bold text-slate-600 dark:text-slate-300">
                                        {user.display.charAt(0)}
                                    </div>
                                    {user.display}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                <style>{`
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(-5px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    .animate-fade-in {
                        animation: fadeIn 0.1s ease-out forwards;
                    }
                `}</style>
            </LivePreview>
            <TechnicalOverview
                library="React Mentions"
                officialName="signavio/react-mentions"
                githubUrl="https://github.com/signavio/react-mentions"
                description="Mentions inputs allow users to tag other users or entities within a text area, typically triggered by a special character like '@'. It's a staple of social and collaborative apps."
                features={[
                    "Supports multiple trigger characters (@, #).",
                    "Customizable rendering for suggestions and mentions.",
                    "Accessibility support.",
                    "Dynamic data loading."
                ]}
                installation="npm install react-mentions"
                usage={`import { MentionsInput, Mention } from 'react-mentions';\n\n<MentionsInput value={value} onChange={handleChange}>\n  <Mention trigger="@" data={users} />\n</MentionsInput>`}
            />
        </div>
    );
};

export default MentionsDemo;
