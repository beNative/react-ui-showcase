
import React, { useState } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';
import { DocumentIcon, ChevronRightIcon, MagnifyingGlassIcon } from './Icons';

const PdfViewerDemo: React.FC = () => {
    const [page, setPage] = useState(1);
    const totalPages = 12;
    const [zoom, setZoom] = useState(100);

    return (
        <div>
            <LivePreview>
                <div className="flex flex-col h-[500px] bg-slate-500 rounded-lg overflow-hidden border border-slate-600">
                    {/* Toolbar */}
                    <div className="bg-slate-800 p-2 flex items-center justify-between text-slate-200 shadow-md z-10">
                        <div className="flex items-center space-x-2">
                            <DocumentIcon className="w-5 h-5 text-slate-400" />
                            <span className="text-xs font-medium">contract_final.pdf</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-slate-900 rounded px-2 py-1">
                             <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="disabled:opacity-30 hover:text-white"><ChevronRightIcon className="w-4 h-4 rotate-180" /></button>
                             <span className="text-xs font-mono w-16 text-center">{page} / {totalPages}</span>
                             <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="disabled:opacity-30 hover:text-white"><ChevronRightIcon className="w-4 h-4" /></button>
                        </div>
                        <div className="flex items-center space-x-2">
                             <button onClick={() => setZoom(z => Math.max(50, z - 10))} className="text-xl leading-none hover:text-white">-</button>
                             <span className="text-xs w-10 text-center">{zoom}%</span>
                             <button onClick={() => setZoom(z => Math.min(200, z + 10))} className="text-xl leading-none hover:text-white">+</button>
                        </div>
                    </div>

                    {/* Document Area */}
                    <div className="flex-1 overflow-auto flex justify-center p-8 bg-slate-500/50">
                        <div 
                            className="bg-white w-[400px] min-h-[500px] shadow-2xl transition-transform duration-200 ease-out p-8"
                            style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
                        >
                            {/* Simulated PDF Content */}
                            <div className="h-4 w-24 bg-slate-200 mb-6"></div>
                            <div className="space-y-3">
                                <div className="h-2 w-full bg-slate-100"></div>
                                <div className="h-2 w-full bg-slate-100"></div>
                                <div className="h-2 w-3/4 bg-slate-100"></div>
                                <div className="h-2 w-full bg-slate-100"></div>
                            </div>
                            <div className="h-32 w-full bg-slate-50 border-2 border-dashed border-slate-200 mt-8 flex items-center justify-center text-slate-300 text-xs">
                                Chart Placeholder
                            </div>
                             <div className="space-y-3 mt-8">
                                <div className="h-2 w-full bg-slate-100"></div>
                                <div className="h-2 w-5/6 bg-slate-100"></div>
                            </div>
                             <div className="mt-12 pt-4 border-t border-slate-100 flex justify-between text-[10px] text-slate-400">
                                 <span>Confidential</span>
                                 <span>Page {page}</span>
                             </div>
                        </div>
                    </div>
                </div>
            </LivePreview>
            <TechnicalOverview
                library="react-pdf"
                officialName="wojtekmaj/react-pdf"
                githubUrl="https://github.com/wojtekmaj/react-pdf"
                description="A React component to easily display PDF files. It works by rendering PDF pages as HTML5 Canvas elements."
                features={[
                    "Page-by-page rendering.",
                    "Text selection layer.",
                    "Annotation layer support.",
                    "Customizable scaling and rotation."
                ]}
                installation="npm install react-pdf pdfjs-dist"
                usage={`import { Document, Page } from 'react-pdf';\n\n<Document file="somefile.pdf">\n  <Page pageNumber={1} />\n</Document>`}
            />
        </div>
    );
};

export default PdfViewerDemo;
