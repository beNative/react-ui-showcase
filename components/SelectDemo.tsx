import React, { useState, useRef, useEffect } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';

const options = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'solid', label: 'Solid.js' },
    { value: 'nextjs', label: 'Next.js' },
    { value: 'remix', label: 'Remix' },
];

const SelectDemo: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(options[0]);
    const [searchTerm, setSearchTerm] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    
    const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelect = (option: typeof options[0]) => {
        setSelectedValue(option);
        setIsOpen(false);
        setSearchTerm('');
    };

    return (
        <div>
            <LivePreview>
                <div className="relative w-full max-w-xs" ref={containerRef}>
                    <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-left flex justify-between items-center focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
                    >
                        <span>{selectedValue.label}</span>
                        <svg className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </button>

                    {isOpen && (
                        <div className="absolute z-10 mt-1 w-full bg-slate-800 border border-slate-600 rounded-md shadow-lg">
                            <div className="p-2">
                                <input
                                    type="text"
                                    placeholder="Search frameworks..."
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                    className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-sm placeholder-slate-400 focus:ring-1 focus:ring-sky-500 focus:border-sky-500 outline-none"
                                />
                            </div>
                            <ul className="max-h-60 overflow-y-auto">
                                {filteredOptions.length > 0 ? filteredOptions.map(option => (
                                    <li
                                        key={option.value}
                                        onClick={() => handleSelect(option)}
                                        className="px-4 py-2 text-sm cursor-pointer hover:bg-sky-600 hover:text-white"
                                    >
                                        {option.label}
                                    </li>
                                )) : <li className="px-4 py-2 text-sm text-slate-500">No results found</li>}
                            </ul>
                        </div>
                    )}
                </div>
            </LivePreview>
            <TechnicalOverview
                library="React Select / Headless UI"
                officialName="JedWatson/react-select"
                githubUrl="https://github.com/JedWatson/react-select"
                description="Enhanced select components, often called 'comboboxes' or 'autocompletes', provide a better user experience than native HTML selects by adding features like searching, filtering, and custom option rendering."
                features={[
                    "Filterable and searchable options",
                    "Support for multi-select",
                    "Asynchronous loading of options",
                    "Fully stylable and accessible (especially with Headless UI)"
                ]}
                installation="npm install react-select"
                usage={`import Select from 'react-select';\n\nconst options = [...];\n<Select options={options} />`}
            />
        </div>
    );
};

export default SelectDemo;