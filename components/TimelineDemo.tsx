
import React, { useState } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';
import { ClockIcon } from './Icons';

const TimelineDemo: React.FC = () => {
    const [align, setAlign] = useState<'left' | 'alternate'>('left');

    const steps = [
        { title: 'Order Placed', description: 'We have received your order.', date: 'Today, 9:00 AM', active: true },
        { title: 'Processing', description: 'Your order is being prepared.', date: 'Today, 11:30 AM', active: true },
        { title: 'Shipped', description: 'Order has been sent to courier.', date: 'Expected Tomorrow', active: false },
        { title: 'Delivered', description: 'Package arrived at destination.', date: 'Expected Fri, 14th', active: false },
    ];

    return (
        <div>
            <LivePreview>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 max-w-xl mx-auto w-full p-4">
                        <div className={`relative ${align === 'left' ? 'border-l border-slate-200 dark:border-slate-700 ml-3' : ''} space-y-8 transition-colors`}>
                            {align === 'alternate' && (
                                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-700 -translate-x-1/2"></div>
                            )}

                            {steps.map((step, index) => (
                                <div key={index} className={`relative group ${align === 'left' ? 'pl-8' : (index % 2 === 0 ? 'flex flex-row-reverse' : 'flex flex-row')}`}>
                                    
                                    {/* Dot */}
                                    <div 
                                        className={`
                                            absolute w-3 h-3 rounded-full border-2 transition-colors duration-300 z-10
                                            ${step.active ? 'bg-sky-500 border-sky-500' : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 group-hover:border-slate-400 dark:group-hover:border-slate-500'}
                                            ${align === 'left' ? '-left-[7px] top-1.5' : 'left-1/2 -translate-x-1/2 top-1.5'}
                                        `}
                                    ></div>
                                    
                                    <div className={`${align === 'alternate' ? 'w-1/2 ' + (index % 2 === 0 ? 'pl-8' : 'pr-8 text-right') : ''}`}>
                                        <div className={`flex flex-col ${align === 'left' ? 'sm:flex-row sm:justify-between sm:items-baseline' : ''}`}>
                                             <h3 className={`text-sm font-medium ${step.active ? 'text-slate-900 dark:text-slate-200' : 'text-slate-500 dark:text-slate-500'}`}>{step.title}</h3>
                                             <span className={`text-xs text-slate-400 dark:text-slate-500 font-mono mt-1 ${align === 'left' ? 'sm:mt-0' : ''}`}>{step.date}</span>
                                        </div>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{step.description}</p>
                                    </div>
                                    {align === 'alternate' && <div className="w-1/2"></div>}
                                </div>
                            ))}
                        </div>
                    </div>

                     {/* Configuration */}
                     <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 space-y-4 h-fit">
                        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Configuration</h3>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Alignment</label>
                            <div className="flex space-x-2 bg-white dark:bg-slate-800 p-1 rounded-md border border-slate-200 dark:border-slate-700">
                                <button
                                    onClick={() => setAlign('left')}
                                    className={`flex-1 px-3 py-1.5 text-sm rounded transition-colors ${align === 'left' ? 'bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                                >
                                    Left
                                </button>
                                <button
                                    onClick={() => setAlign('alternate')}
                                    className={`flex-1 px-3 py-1.5 text-sm rounded transition-colors ${align === 'alternate' ? 'bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                                >
                                    Alternate
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </LivePreview>
            <TechnicalOverview
                library="MUI Timeline / Ant Design Timeline"
                officialName="mui/material-ui"
                githubUrl="https://mui.com/material-ui/react-timeline/"
                description="A timeline displays a list of events in chronological order. It is commonly used for activity logs, order tracking, or process steps."
                features={[
                    "Vertical and horizontal layouts.",
                    "Custom connectors and separators.",
                    "Alternating positions (left/right).",
                    "Support for icons within dots."
                ]}
                installation="npm install @mui/lab"
                usage={`import Timeline from '@mui/lab/Timeline';\nimport TimelineItem from '@mui/lab/TimelineItem';\n\n<Timeline>\n  <TimelineItem>...</TimelineItem>\n</Timeline>`}
            />
        </div>
    );
};

export default TimelineDemo;
