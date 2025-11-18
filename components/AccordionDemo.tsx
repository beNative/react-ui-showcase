import React, { useState } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';
import { ChevronDownIcon } from './Icons';

const accordionItems = [
    { id: 1, title: 'What is a UI component library?', content: 'A UI component library is a collection of pre-built, reusable user interface elements that developers can use to build applications faster and more consistently.' },
    { id: 2, title: 'Why is accessibility important?', content: 'Accessibility (a11y) ensures that applications can be used by people with disabilities, including those who rely on screen readers or keyboard navigation. It is a crucial aspect of inclusive design.' },
    { id: 3, title: 'What are headless components?', content: 'Headless components provide the logic, state, and API for a UI element but do not ship with any predefined styles. This gives developers full control over the look and feel, promoting design system consistency.' },
];

const AccordionItem: React.FC<{
    item: typeof accordionItems[0];
    isOpen: boolean;
    onToggle: () => void;
}> = ({ item, isOpen, onToggle }) => {
    return (
        <div className="border-b border-slate-700 last:border-0">
            <h3>
                <button
                    onClick={onToggle}
                    className="flex w-full items-center justify-between py-4 text-left font-medium text-slate-200 hover:bg-slate-700/50 px-4 transition-colors"
                    aria-expanded={isOpen}
                    aria-controls={`accordion-content-${item.id}`}
                >
                    <span>{item.title}</span>
                    <ChevronDownIcon className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180 text-sky-400' : 'text-slate-500'}`} />
                </button>
            </h3>
            <div
                id={`accordion-content-${item.id}`}
                className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
                <div className="overflow-hidden">
                    <div className="p-4 pt-0 text-slate-400 text-sm leading-relaxed">
                        {item.content}
                    </div>
                </div>
            </div>
        </div>
    );
};


const AccordionDemo: React.FC = () => {
    const [openIds, setOpenIds] = useState<number[]>([accordionItems[0].id]);
    const [allowMultiple, setAllowMultiple] = useState(false);

    const handleToggle = (id: number) => {
        if (allowMultiple) {
            setOpenIds(prev => 
                prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
            );
        } else {
            setOpenIds(prev => prev.includes(id) ? [] : [id]);
        }
    };

    // Reset when toggling mode
    const toggleMultipleMode = (checked: boolean) => {
        setAllowMultiple(checked);
        setOpenIds([]); // Close all to avoid confusion
    };

    return (
        <div>
            <LivePreview>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    <div className="w-full max-w-md mx-auto rounded-lg border border-slate-700 bg-slate-800/30 overflow-hidden">
                        {accordionItems.map(item => (
                            <AccordionItem
                                key={item.id}
                                item={item}
                                isOpen={openIds.includes(item.id)}
                                onToggle={() => handleToggle(item.id)}
                            />
                        ))}
                    </div>

                    {/* Configuration */}
                    <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 space-y-4 w-full">
                        <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider">Configuration</h3>
                        
                        <div>
                             <label className="flex items-center space-x-2 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={allowMultiple} 
                                    onChange={(e) => toggleMultipleMode(e.target.checked)}
                                    className="form-checkbox h-4 w-4 text-sky-600 rounded border-slate-700 bg-slate-800 focus:ring-sky-500"
                                />
                                <span className="text-sm text-slate-300">Allow Multiple Open</span>
                            </label>
                            <p className="text-xs text-slate-500 mt-1 pl-6">
                                If enabled, multiple panels can be expanded simultaneously.
                            </p>
                        </div>
                    </div>
                </div>
            </LivePreview>
            <TechnicalOverview
                library="Headless UI Disclosure / Radix UI Accordion"
                officialName="radix-ui/primitives"
                githubUrl="https://github.com/radix-ui/primitives"
                description="An accordion is a set of vertically stacked collapsible panels that reveal their content one at a time. It's an effective way to present a large amount of content in a compact space, such as in an FAQ section."
                features={[
                    "Allows one or multiple panels to be open at once.",
                    "Handles keyboard navigation between headers.",
                    "Fully accessible with ARIA attributes.",
                    "Clean API for controlling state and animations."
                ]}
                installation="npm install @radix-ui/react-accordion"
                usage={`import * as Accordion from '@radix-ui/react-accordion';\n\n<Accordion.Root type="single" collapsible>...</Accordion.Root>`}
            />
        </div>
    );
};

export default AccordionDemo;