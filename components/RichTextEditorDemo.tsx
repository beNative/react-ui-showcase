
import React, { useState, useRef } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';

const RichTextEditorDemo: React.FC = () => {
    const editorRef = useRef<HTMLDivElement>(null);
    const [content, setContent] = useState('<p>Hello <b>World</b>!</p><p>Try editing this rich text content.</p>');

    const execCmd = (command: string, value: string | undefined = undefined) => {
        document.execCommand(command, false, value);
        editorRef.current?.focus();
    };

    const ToolbarButton = ({ cmd, arg, label, icon }: { cmd: string, arg?: string, label?: string, icon?: React.ReactNode }) => (
        <button
            onMouseDown={(e) => {
                e.preventDefault();
                execCmd(cmd, arg);
            }}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
            title={label}
        >
            {icon || label}
        </button>
    );

    return (
        <div>
            <LivePreview>
                <div className="w-full max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
                    {/* Toolbar */}
                    <div className="flex items-center gap-1 p-2 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                        <ToolbarButton cmd="bold" label="B" icon={<span className="font-bold">B</span>} />
                        <ToolbarButton cmd="italic" label="I" icon={<span className="italic">I</span>} />
                        <ToolbarButton cmd="underline" label="U" icon={<span className="underline">U</span>} />
                        <div className="w-px h-6 bg-slate-300 dark:bg-slate-600 mx-2"></div>
                        <ToolbarButton cmd="justifyLeft" label="Left" icon={<span>L</span>} />
                        <ToolbarButton cmd="justifyCenter" label="Center" icon={<span>C</span>} />
                        <ToolbarButton cmd="justifyRight" label="Right" icon={<span>R</span>} />
                        <div className="w-px h-6 bg-slate-300 dark:bg-slate-600 mx-2"></div>
                        <ToolbarButton cmd="insertUnorderedList" label="List" icon={<span>• List</span>} />
                    </div>

                    {/* Editor Area */}
                    <div
                        ref={editorRef}
                        contentEditable
                        className="p-4 min-h-[200px] outline-none text-slate-800 dark:text-slate-200 prose dark:prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: content }}
                        onInput={(e) => setContent(e.currentTarget.innerHTML)}
                    />
                </div>
            </LivePreview>
            <TechnicalOverview
                library="Tiptap / Quill / Slate"
                officialName="ueberdosis/tiptap"
                githubUrl="https://github.com/ueberdosis/tiptap"
                description="A rich text editor allows users to edit content with formatting like bold, italic, lists, and more, visualizing the result immediately."
                features={[
                    "Block-based or document model editing.",
                    "Customizable toolbar and styling.",
                    "Export to HTML, JSON, or Markdown.",
                    "Extensible via plugins."
                ]}
                installation="npm install @tiptap/react @tiptap/starter-kit"
                usage={`import { useEditor, EditorContent } from '@tiptap/react'\n\nconst editor = useEditor({ extensions: [StarterKit] })\n<EditorContent editor={editor} />`}
            />
        </div>
    );
};

export default RichTextEditorDemo;
