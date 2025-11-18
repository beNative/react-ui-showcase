
import React, { useState } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';
import { ChevronRightIcon, ChevronDownIcon } from './Icons';

const data = {
    id: 101,
    name: "Product X",
    active: true,
    tags: ["new", "sale", "featured"],
    details: {
        weight: "1.2kg",
        dimensions: {
            width: 10,
            height: 20
        }
    },
    reviews: null
};

const JsonNode: React.FC<{ label: string; value: any; last: boolean }> = ({ label, value, last }) => {
    const [isOpen, setIsOpen] = useState(true);
    const isObject = value !== null && typeof value === 'object';
    const isArray = Array.isArray(value);

    if (!isObject) {
        let colorClass = 'text-slate-300';
        if (typeof value === 'string') colorClass = 'text-green-400';
        if (typeof value === 'number') colorClass = 'text-blue-400';
        if (typeof value === 'boolean') colorClass = 'text-purple-400';
        if (value === null) colorClass = 'text-red-400';

        return (
            <div className="pl-4 font-mono text-sm hover:bg-slate-800/50 rounded">
                <span className="text-slate-400">"{label}"</span>: <span className={colorClass}>{JSON.stringify(value)}</span>{!last && ','}
            </div>
        );
    }

    return (
        <div className="pl-4 font-mono text-sm">
             <div 
                className="flex items-center cursor-pointer hover:bg-slate-800/50 rounded select-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="w-4 h-4 mr-1 text-slate-500">
                     {isOpen ? <ChevronDownIcon className="w-3 h-3" /> : <ChevronRightIcon className="w-3 h-3" />}
                </span>
                <span className="text-slate-400">"{label}"</span>: <span className="text-slate-500">{isArray ? '[' : '{'}</span>
                 {!isOpen && <span className="text-slate-600 mx-1">...</span>}
                 {!isOpen && <span className="text-slate-500">{isArray ? ']' : '}'}{!last && ','}</span>}
            </div>
            {isOpen && (
                <div>
                     {Object.keys(value).map((key, idx, arr) => (
                        <JsonNode 
                            key={key} 
                            label={key} 
                            value={value[key]} 
                            last={idx === arr.length - 1} 
                        />
                    ))}
                    <div className="pl-6 text-slate-500">{isArray ? ']' : '}'}{!last && ','}</div>
                </div>
            )}
        </div>
    );
};

const JsonViewerDemo: React.FC = () => {
    return (
        <div>
            <LivePreview>
                <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 overflow-auto">
                    <div className="font-mono text-sm text-slate-500 mb-2">root: {'{'}</div>
                     {Object.keys(data).map((key, idx, arr) => (
                        // @ts-ignore
                        <JsonNode key={key} label={key} value={data[key]} last={idx === arr.length - 1} />
                    ))}
                    <div className="font-mono text-sm text-slate-500 mt-2">{'}'}</div>
                </div>
            </LivePreview>
            <TechnicalOverview
                library="react-json-view"
                officialName="mac-s-g/react-json-view"
                githubUrl="https://github.com/mac-s-g/react-json-view"
                description="A JSON viewer component displays JSON data in a readable, collapsible tree format. It is essential for developer tools, debuggers, and data exploration interfaces."
                features={[
                    "Collapsible nodes.",
                    "Data type syntax highlighting.",
                    "Copy to clipboard functionality.",
                    "Editable keys and values (optional)."
                ]}
                installation="npm install react-json-view"
                usage={`import ReactJson from 'react-json-view';\n\n<ReactJson src={myJsonObject} theme="monokai" />`}
            />
        </div>
    );
};

export default JsonViewerDemo;
