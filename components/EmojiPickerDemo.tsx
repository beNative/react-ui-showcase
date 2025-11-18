
import React, { useState } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';
import { FaceSmileIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const emojis = {
    smileys: ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳'],
    animals: ['🐶', '🐱', '🐭', '🐹', '🐰', 'fox', '🐻', '🐼', '🐨', '🐯', '🦁', 'cow', '🐷', '🐽', '🐸', '🐵', '🙈', '🙉', '🙊', '🐒', '🐔', '🐧', '🐦', '🐤', '🐣', '🐥', 'duck', '🦅', '🦉', 'bat', 'wolf', 'boar', 'horse'],
    food: ['🍏', '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦', '🥬', '🥒', '🌶', '🌽', '🥕', '🧄', '🧅', '🥔', '🍠', '🥐', '🥯', '🍞']
};

const EmojiPickerDemo: React.FC = () => {
    const [activeTab, setActiveTab] = useState<keyof typeof emojis>('smileys');
    const [search, setSearch] = useState('');
    const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);

    const filteredEmojis = emojis[activeTab].filter(e => e.includes(search)); // Simple filter, ideally match names

    return (
        <div>
            <LivePreview>
                <div className="flex flex-col items-center">
                    {selectedEmoji && (
                        <div className="mb-6 text-6xl animate-bounce">
                            {selectedEmoji}
                        </div>
                    )}

                    <div className="w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl overflow-hidden flex flex-col">
                        {/* Search */}
                        <div className="p-2 border-b border-slate-100 dark:border-slate-800">
                            <div className="relative">
                                <MagnifyingGlassIcon className="w-4 h-4 absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full bg-slate-100 dark:bg-slate-800 rounded-full pl-8 pr-3 py-1.5 text-xs text-slate-700 dark:text-slate-200 focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="h-48 overflow-y-auto p-2 grid grid-cols-6 gap-1 content-start scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700">
                             {filteredEmojis.map((emoji, i) => (
                                <button 
                                    key={i} 
                                    onClick={() => setSelectedEmoji(emoji)}
                                    className="aspect-square flex items-center justify-center text-xl hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"
                                >
                                    {emoji}
                                </button>
                             ))}
                        </div>

                        {/* Tabs */}
                        <div className="flex border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                             {(['smileys', 'animals', 'food'] as const).map(cat => (
                                 <button
                                    key={cat}
                                    onClick={() => setActiveTab(cat)}
                                    className={`flex-1 py-2 text-center text-xs font-medium transition-colors ${activeTab === cat ? 'text-sky-600 dark:text-sky-400 bg-white dark:bg-slate-800' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                                 >
                                     {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                 </button>
                             ))}
                        </div>
                    </div>
                </div>
            </LivePreview>
            <TechnicalOverview
                library="emoji-picker-react"
                officialName="ealush/emoji-picker-react"
                githubUrl="https://github.com/ealush/emoji-picker-react"
                description="An emoji picker allows users to insert emojis into text fields. It handles the complexity of Unicode versions, skin tone variations, and categorization."
                features={[
                    "Search functionality.",
                    "Skin tone selection.",
                    "Recently used emojis.",
                    "Category navigation."
                ]}
                installation="npm install emoji-picker-react"
                usage={`import Picker from 'emoji-picker-react';\n\n<Picker onEmojiClick={onEmojiClick} />`}
            />
        </div>
    );
};

export default EmojiPickerDemo;
