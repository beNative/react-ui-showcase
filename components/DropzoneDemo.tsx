
import React, { useState, useRef } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';
import { CloudArrowUpIcon, DocumentTextIcon, CloseIcon, CheckIcon } from './Icons';

interface FileItem {
    id: string;
    file: File;
    progress: number;
    status: 'pending' | 'uploading' | 'completed' | 'error';
}

const DropzoneDemo: React.FC = () => {
    const [dragActive, setDragActive] = useState(false);
    const [fileItems, setFileItems] = useState<FileItem[]>([]);
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
            addFiles(Array.from(e.dataTransfer.files));
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            addFiles(Array.from(e.target.files));
        }
    };

    const addFiles = (files: File[]) => {
        const newItems: FileItem[] = files.map(f => ({
            id: Math.random().toString(36).substring(7),
            file: f,
            progress: 0,
            status: 'pending'
        }));
        setFileItems(prev => [...prev, ...newItems]);
    };

    const removeFile = (id: string) => {
        setFileItems(prev => prev.filter(item => item.id !== id));
    };

    const onButtonClick = () => {
        inputRef.current?.click();
    };

    const simulateUpload = () => {
        setFileItems(prev => prev.map(item => ({ ...item, status: 'uploading', progress: 0 })));
        
        const interval = setInterval(() => {
            setFileItems(prev => {
                let allComplete = true;
                const nextState = prev.map(item => {
                    if (item.status !== 'uploading') return item;
                    
                    // Random increment
                    const increment = Math.random() * 15;
                    const newProgress = Math.min(item.progress + increment, 100);
                    
                    if (newProgress < 100) {
                        allComplete = false;
                        return { ...item, progress: newProgress };
                    } else {
                        return { ...item, progress: 100, status: 'completed' as const };
                    }
                });

                if (allComplete) clearInterval(interval);
                return nextState;
            });
        }, 200);
    };

    return (
        <div>
            <LivePreview>
                <div className="w-full max-w-md mx-auto space-y-6">
                    <div
                        className={`relative h-48 rounded-xl border-2 border-dashed transition-all duration-200 flex flex-col items-center justify-center text-center p-4 cursor-pointer group ${
                            dragActive ? 'border-sky-500 bg-sky-50 dark:bg-sky-900/20' : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-sky-400 dark:hover:border-slate-600'
                        }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        onClick={onButtonClick}
                    >
                        <input
                            ref={inputRef}
                            type="file"
                            className="hidden"
                            multiple
                            onChange={handleChange}
                        />
                        <div className={`p-4 rounded-full mb-3 transition-colors ${dragActive ? 'bg-sky-100 text-sky-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:text-sky-500 group-hover:bg-sky-50 dark:group-hover:bg-slate-700'}`}>
                             <CloudArrowUpIcon className="w-8 h-8" />
                        </div>
                        <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">
                            <span className="text-sky-500 hover:underline">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                            SVG, PNG, JPG or GIF (max. 10MB)
                        </p>
                    </div>

                    {fileItems.length > 0 && (
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Files</h4>
                                <button 
                                    onClick={simulateUpload}
                                    disabled={fileItems.every(i => i.status === 'completed' || i.status === 'uploading')}
                                    className="text-xs font-medium text-sky-600 hover:text-sky-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Upload All
                                </button>
                            </div>
                            {fileItems.map((item) => (
                                <div key={item.id} className="relative p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
                                    <div className="flex items-center justify-between relative z-10">
                                        <div className="flex items-center min-w-0">
                                            <div className={`p-2 rounded mr-3 ${item.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-slate-100 dark:bg-slate-700 text-slate-500'}`}>
                                                {item.status === 'completed' ? <CheckIcon className="w-4 h-4" /> : <DocumentTextIcon className="w-4 h-4" />}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate max-w-[150px]">{item.file.name}</p>
                                                <p className="text-xs text-slate-500">{(item.file.size / 1024).toFixed(0)} KB</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            {item.status === 'uploading' && <span className="text-xs font-medium text-slate-500">{Math.round(item.progress)}%</span>}
                                            <button onClick={() => removeFile(item.id)} className="p-1 text-slate-400 hover:text-red-500 transition-colors">
                                                <CloseIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                    
                                    {/* Progress Bar Background */}
                                    {item.status !== 'pending' && (
                                        <div 
                                            className={`absolute bottom-0 left-0 h-1 transition-all duration-200 ease-out ${item.status === 'completed' ? 'bg-green-500' : 'bg-sky-500'}`}
                                            style={{ width: `${item.progress}%` }}
                                        ></div>
                                    )}
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
