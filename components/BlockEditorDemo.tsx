
import React, { useState, useRef, useEffect } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';
import { PlusIcon, PhotoIcon, ListBulletIcon, DocumentTextIcon } from './Icons';

type BlockType = 'paragraph' | 'heading' | 'image' | 'list';

interface Block {
    id: string;
    type: BlockType;
    content: string;
}

const BlockEditorDemo: React.FC = () => {
    const [blocks, setBlocks] = useState<Block[]>([
        { id: '1', type: 'heading', content: 'Project Roadmap' },
        { id: '2', type: 'paragraph', content: 'This is a block-based editor. Try clicking the + button or typing / to see options.' },
    ]);
    const [menuOpen, setMenuOpen] = useState<string | null>(null); // ID of block where menu is open

    const addBlock = (type: BlockType) => {
        const newBlock: Block = {
            id: Date.now().toString(),
            type,
            content: ''
        };
        setBlocks([...blocks, newBlock]);
        setMenuOpen(null);
    };

    const updateBlock = (id: string, content: string) => {
        setBlocks(blocks.map(b => b.id === id ? { ...b, content } : b));
    };

    const renderBlockInput = (block: Block) => {
        switch (block.type) {
            case 'heading':
                return <input className="w-full bg-transparent text-2xl font-bold outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400" value={block.content} onChange={e => updateBlock(block.id, e.target.value)} placeholder="Heading..." />;
            case 'image':
                return <div className="h-32 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-700 text-slate-400"><PhotoIcon className="w-6 h-6 mr-2" /> Add Image</div>;
            case 'list':
                return <div className="flex items-center"><span className="mr-2 text-slate-900 dark:text-slate-100">•</span><input className="w-full bg-transparent outline-none text-slate-800 dark:text-slate-200" value={block.content} onChange={e => updateBlock(block.id, e.target.value)} placeholder="List item..." /></div>;
            default:
                return <input className="w-full bg-transparent outline-none text-slate-700 dark:text-slate-300 placeholder-slate-400" value={block.content} onChange={e => updateBlock(block.id, e.target.value)} placeholder="Type '/' for commands" />;
        }
    };

    return (
        <div>
            <LivePreview>
                <div className="max-w-2xl mx-auto min-h-[300px] p-8 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
                    {blocks.map((block, index) => (
                        <div key={block.id} className="group relative mb-4 flex items-center">
                            {/* Handle / Menu Trigger */}
                            <button 
                                onClick={() => setMenuOpen(menuOpen === block.id ? null : block.id)}
                                className="absolute -left-8 p-1 text-slate-300 hover:text-slate-600 dark:hover:text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <PlusIcon className="w-5 h-5" />
                            </button>
                            
                            {/* Block Content */}
                            <div className="w-full">
                                {renderBlockInput(block)}
                            </div>

                            {/* Menu Popover */}
                            {menuOpen === block.id && (
                                <div className="absolute top-8 left-0 z-10 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden animate-fade-in">
                                    <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase">Turn into</div>
                                    <button onClick={() => addBlock('paragraph')} className="w-full text-left px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center text-slate-700 dark:text-slate-300">
                                        <DocumentTextIcon className="w-4 h-4 mr-2" /> Text
                                    </button>
                                    <button onClick={() => addBlock('heading')} className="w-full text-left px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center text-slate-700 dark:text-slate-300">
                                        <span className="font-bold w-4 mr-2 text-center">H1</span> Heading
                                    </button>
                                    <button onClick={() => addBlock('list')} className="w-full text-left px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center text-slate-700 dark:text-slate-300">
                                        <ListBulletIcon className="w-4 h-4 mr-2" /> List
                                    </button>
                                    <button onClick={() => addBlock('image')} className="w-full text-left px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center text-slate-700 dark:text-slate-300">
                                        <PhotoIcon className="w-4 h-4 mr-2" /> Image
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                    <div className="text-slate-300 dark:text-slate-700 italic text-sm mt-8">Click + to add new blocks</div>
                </div>
            </LivePreview>
            <TechnicalOverview
                library="Editor.js / Notion Clone"
                officialName="codex-team/editor.js"
                githubUrl="https://github.com/codex-team/editor.js"
                description="A block-style editor treats content as independent blocks (paragraphs, headings, images) rather than a single text blob. This is the pattern made popular by Notion."
                features={[
                    "Structured JSON output.",
                    "Clean, distraction-free interface.",
                    "Drag and drop blocks (reordering).",
                    "Plugin-based architecture for new block types."
                ]}
                installation="npm install @editorjs/editorjs"
                usage={`import EditorJS from '@editorjs/editorjs';\n\nconst editor = new EditorJS({ holder: 'editorjs', tools: { ... } });`}
            />
        </div>
    );
};

export default BlockEditorDemo;
