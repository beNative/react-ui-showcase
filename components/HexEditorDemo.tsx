
import React from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';
import { CpuChipIcon } from './Icons';

const HexEditorDemo: React.FC = () => {
    // Simulated binary data
    const data = new Uint8Array([
        0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x20, 0x57, 0x6f, 0x72, 0x6c, 0x64, 0x21, 0x00, 0x00, 0x00, 0x00,
        0xca, 0xfe, 0xba, 0xbe, 0x00, 0x00, 0x00, 0x01, 0xff, 0xff, 0xff, 0xff, 0x12, 0x34, 0x56, 0x78,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x52, 0x65, 0x61, 0x63, 0x74, 0x20, 0x55, 0x49, 0x20, 0x4b, 0x69, 0x74, 0x00, 0x00, 0x00, 0x00,
    ]);

    const renderHex = () => {
        const rows = [];
        for (let i = 0; i < data.length; i += 16) {
            const chunk = data.slice(i, i + 16);
            const hex = Array.from(chunk).map(b => b.toString(16).padStart(2, '0')).join(' ');
            const ascii = Array.from(chunk).map(b => (b >= 32 && b <= 126 ? String.fromCharCode(b) : '.')).join('');
            
            rows.push(
                <div key={i} className="flex font-mono text-xs hover:bg-slate-800 transition-colors cursor-default">
                    <div className="w-20 text-slate-500 select-none border-r border-slate-800 mr-3">{i.toString(16).padStart(8, '0')}</div>
                    <div className="w-96 text-slate-300 mr-4">{hex}</div>
                    <div className="w-40 text-slate-400 opacity-70 border-l border-slate-800 pl-3">{ascii}</div>
                </div>
            );
        }
        return rows;
    };

    return (
        <div>
            <LivePreview>
                <div className="bg-slate-950 border border-slate-800 rounded-lg overflow-hidden shadow-2xl">
                    <div className="flex items-center px-4 py-2 bg-slate-900 border-b border-slate-800 text-slate-400 text-xs">
                        <CpuChipIcon className="w-4 h-4 mr-2" />
                        binary_file.bin
                    </div>
                    <div className="p-4 overflow-x-auto">
                        <div className="min-w-[600px]">
                            <div className="flex font-mono text-xs text-sky-600 mb-2 border-b border-slate-800 pb-2">
                                <div className="w-20 mr-3">Offset</div>
                                <div className="w-96 mr-4">00 01 02 03 04 05 06 07 08 09 0A 0B 0C 0D 0E 0F</div>
                                <div className="w-40 pl-3">Decoded text</div>
                            </div>
                            {renderHex()}
                        </div>
                    </div>
                </div>
            </LivePreview>
            <TechnicalOverview
                library="Custom / react-hex-editor"
                officialName="Hex Editor"
                githubUrl="#"
                description="A Hex Editor displays the raw binary data of a file. It is typically used for low-level debugging, editing binary files, or inspecting data structures."
                features={[
                    "Hexadecimal and ASCII views.",
                    "Offset addressing.",
                    "Editing capabilities (insert/overwrite).",
                    "Handling large buffers."
                ]}
                installation="npm install react-hex-editor"
                usage={`// Often custom implemented using virtualized lists for large files\n// or using specific libraries like react-hex-editor`}
            />
        </div>
    );
};

export default HexEditorDemo;
