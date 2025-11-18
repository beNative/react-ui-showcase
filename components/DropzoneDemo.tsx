
import React, { useState, useRef } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';
import { CloudArrowUpIcon, DocumentTextIcon, CloseIcon } from './Icons';

const DropzoneDemo: React.FC = () => {
    const [dragActive, setDragActive] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFiles(Array.from(e.dataTransfer.files));
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFiles(Array.from(e.target.files));
        }
    };

    const handleFiles = (newFiles: File[]) => {
        setFiles(prev => [...prev, ...newFiles]);
    };

    const removeFile = (idx: number) => {
        setFiles(prev => prev.filter((_, i) => i !== idx));
    };

    const onButtonClick = () => {
        inputRef.current?.click();
    };

    return (
        <div>
            <LivePreview>
                <div className="w-full max-w-md mx-auto space-y-4">
                    <div
                        className={`relative h-48 rounded-xl border-2 border-dashed transition-all duration-200 flex flex-col items-center justify-center text-center p-4 ${
                            dragActive ? 'border-sky-500 bg-sky-500/10' : 'border-slate-700 bg-slate-900/50 hover:border-slate-600'
                        }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        <input
                            ref={inputRef}
                            type="file"
                            className="hidden"
                            multiple
                            onChange={handleChange}
                        />
                        <CloudArrowUpIcon className={`w-12 h-12 mb-3 ${dragActive ? 'text-sky-500' : 'text-slate-500'}`} />
                        <p className="text-sm text-slate-300 font-medium">
                            Drag & Drop files here
                        </p>
                        <p className="text-xs text-slate-500 mt-1 mb-4">
                            or click to browse from your computer
                        </p>
                        <button
                            onClick={onButtonClick}
                            className="px-4 py-1.5 bg-slate-800 border border-slate-700 rounded-md text-xs font-semibold text-slate-300 hover:bg-slate-700 transition-colors"
                        >
                            Browse Files
                        </button>
                    </div>

                    {files.length > 0 && (
                        <div className="space-y-2">
                            {files.map((file, idx) => (
                                <div key={idx} className="flex items-center justify-between p-2 bg-slate-800/50 rounded-lg border border-slate-800 animate-fade-in">
                                    <div className="flex items-center min-w-0">
                                        <div className="p-1.5 bg-slate-800 rounded mr-3">
                                            <DocumentTextIcon className="w-5 h-5 text-sky-500" />
                                        </div>
                                        <div className="truncate">
                                            <p className="text-sm font-medium text-slate-200 truncate">{file.name}</p>
                                            <p className="text-xs text-slate-500">{(file.size / 1024).toFixed(1)} KB</p>
                                        </div>
                                    </div>
                                    <button onClick={() => removeFile(idx)} className="p-1 text-slate-500 hover:text-red-400 hover:bg-red-900/20 rounded transition-colors">
                                        <CloseIcon className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </LivePreview>
            <TechnicalOverview
                library="react-dropzone"
                officialName="react-dropzone/react-dropzone"
                githubUrl="https://github.com/react-dropzone/react-dropzone"
                description="A dropzone area allows users to drag and drop files for upload. It simplifies file selection and provides a modern alternative to standard file inputs."
                features={[
                    "HTML5 Drag and Drop API integration.",
                    "File validation (type, size).",
                    "Visual feedback for drag states.",
                    "Accessible via keyboard and standard click."
                ]}
                installation="npm install react-dropzone"
                usage={`import { useDropzone } from 'react-dropzone';\n\nconst { getRootProps, getInputProps } = useDropzone({ onDrop });\n\n<div {...getRootProps()}>\n  <input {...getInputProps()} />\n  <p>Drag 'n' drop files here</p>\n</div>`}
            />
        </div>
    );
};

export default DropzoneDemo;
