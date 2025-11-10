import React, { useRef, useState } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';

const WysiwygDemo: React.FC = () => {
    const editorRef = useRef<HTMLDivElement>(null);
    const [htmlContent, setHtmlContent] = useState('<h2>Hello World</h2><p>This is a simple <strong>What You See Is What You Get</strong> editor. Try selecting some text and applying formatting using the toolbar above.</p>');
    
    const applyFormat = (command: string, value: string | null = null) => {
        document.execCommand(command, false, value);
        editorRef.current?.focus();
    };

    const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
        setHtmlContent(e.currentTarget.innerHTML);
    };

    const ToolbarButton: React.FC<{ onClick: () => void, children: React.ReactNode, title: string }> = ({ onClick, children, title }) => (
        <button
            title={title}
            onClick={onClick}
            onMouseDown={(e) => e.preventDefault()}
            className="p-2 rounded-md hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
            {children}
        </button>
    );

    return (
        <div>
            <LivePreview>
                <div className="border border-slate-700 rounded-lg">
                    <div className="flex items-center p-2 border-b border-slate-700 bg-slate-800 rounded-t-lg space-x-1">
                        <ToolbarButton onClick={() => applyFormat('bold')} title="Bold">
                            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 2.5a.75.75 0 0 1 .75.75V5h1.75a2.75 2.75 0 0 1 2.75 2.75v.5a2.75 2.75 0 0 1-2.75 2.75H10.75v3.25a.75.75 0 0 1-1.5 0V2.5zM10.75 6.5h1.75a1.25 1.25 0 0 0 0-2.5H10.75v2.5zM10.75 9.5v2.5H12a1.25 1.25 0 0 0 0-2.5h-1.25z" clipRule="evenodd"/></svg>
                        </ToolbarButton>
                        <ToolbarButton onClick={() => applyFormat('italic')} title="Italic">
                            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path d="M7.75 4a.75.75 0 0 1 .75.75V6h1.278a.75.75 0 0 1 0 1.5H8.5v3.75h2.278a.75.75 0 0 1 0 1.5H8.5v1.25a.75.75 0 0 1-1.5 0V4.75a.75.75 0 0 1 .75-.75z"/></svg>
                        </ToolbarButton>
                         <ToolbarButton onClick={() => applyFormat('underline')} title="Underline">
                            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path d="M4.5 3a.75.75 0 0 1 .75.75V11a4.75 4.75 0 0 0 9.5 0V3.75a.75.75 0 0 1 1.5 0v7.25a6.25 6.25 0 0 1-12.5 0V3.75A.75.75 0 0 1 4.5 3zM3.75 16a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H4.5a.75.75 0 0 1-.75-.75z"/></svg>
                        </ToolbarButton>
                        <ToolbarButton onClick={() => applyFormat('insertUnorderedList')} title="Bullet List">
                           <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M2.5 4A1.5 1.5 0 0 1 4 2.5h12A1.5 1.5 0 0 1 17.5 4v0A1.5 1.5 0 0 1 16 5.5H4A1.5 1.5 0 0 1 2.5 4zm0 6A1.5 1.5 0 0 1 4 8.5h12A1.5 1.5 0 0 1 17.5 10v0A1.5 1.5 0 0 1 16 11.5H4A1.5 1.5 0 0 1 2.5 10zm0 6A1.5 1.5 0 0 1 4 14.5h12A1.5 1.5 0 0 1 17.5 16v0A1.5 1.5 0 0 1 16 17.5H4A1.5 1.5 0 0 1 2.5 16z" clipRule="evenodd"/></svg>
                        </ToolbarButton>
                    </div>
                    <div
                        ref={editorRef}
                        contentEditable
                        onInput={handleInput}
                        dangerouslySetInnerHTML={{ __html: htmlContent }}
                        className="p-4 min-h-[150px] focus:outline-none text-slate-300"
                    />
                </div>
            </LivePreview>
            <TechnicalOverview
                library="Tiptap / Quill.js / Slate.js"
                officialName="ueberdosis/tiptap"
                githubUrl="https://github.com/ueberdosis/tiptap"
                description="A WYSIWYG editor allows users to edit content in a form that resembles its final appearance. Modern editors are built on frameworks that provide a modular and extensible architecture for rich text editing."
                features={[
                    "Schema-driven content model",
                    "Extensible with custom nodes and marks",
                    "Collaborative editing capabilities",
                    "Framework agnostic core (for some libraries)"
                ]}
                installation="npm install @tiptap/react @tiptap/starter-kit"
                usage={`import { useEditor, EditorContent } from '@tiptap/react';\nimport StarterKit from '@tiptap/starter-kit';\n\nconst editor = useEditor({ extensions: [StarterKit] });\n<EditorContent editor={editor} />`}
            />
        </div>
    );
};

export default WysiwygDemo;