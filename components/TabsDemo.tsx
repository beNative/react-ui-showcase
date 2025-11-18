import React, { useState } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';

const tabsData = [
    { id: 'profile', label: 'Profile', content: 'This is the profile content. It contains user details, settings, and other personal information.' },
    { id: 'dashboard', label: 'Dashboard', content: 'Welcome to your dashboard. Here you will find an overview of your account activity and key metrics.' },
    { id: 'settings', label: 'Settings', content: 'Manage your account settings. You can update your email, password, and notification preferences here.' },
];

const TabsDemo: React.FC = () => {
    const [activeTab, setActiveTab] = useState(tabsData[0].id);
    const [variant, setVariant] = useState<'underline' | 'pills'>('underline');

    return (
        <div>
            <LivePreview>
                <div className="grid grid-cols-1 gap-8">
                    <div className="w-full">
                        <div className={`${variant === 'underline' ? 'border-b border-slate-700' : ''}`}>
                            <nav className={`flex ${variant === 'pills' ? 'space-x-2 bg-slate-800 p-1 rounded-lg inline-flex' : 'space-x-6'}`} aria-label="Tabs">
                                {tabsData.map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`${
                                            variant === 'underline'
                                                ? (activeTab === tab.id
                                                    ? 'border-sky-500 text-sky-400'
                                                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-500') + ' whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors focus:outline-none'
                                                : (activeTab === tab.id
                                                    ? 'bg-slate-600 text-white shadow'
                                                    : 'text-slate-400 hover:text-slate-200') + ' px-4 py-2 rounded-md text-sm font-medium transition-all duration-200'
                                        }`}
                                        aria-current={activeTab === tab.id ? 'page' : undefined}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </nav>
                        </div>
                        <div className="mt-5 p-4 bg-slate-800/30 rounded-lg border border-slate-800 min-h-[120px]">
                            {tabsData.map(tab => (
                                <div key={tab.id} className={`${activeTab === tab.id ? 'block animate-fade-in' : 'hidden'}`}>
                                    <h3 className="text-lg font-medium text-slate-200 mb-2">{tab.label}</h3>
                                    <p className="text-slate-400">{tab.content}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Configuration */}
                     <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 space-y-4">
                        <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider">Configuration</h3>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Style Variant</label>
                            <div className="flex space-x-4">
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input 
                                        type="radio" 
                                        name="variant"
                                        checked={variant === 'underline'} 
                                        onChange={() => setVariant('underline')}
                                        className="h-4 w-4 text-sky-600 border-slate-700 bg-slate-800 focus:ring-sky-500"
                                    />
                                    <span className="text-sm text-slate-300">Underline</span>
                                </label>
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input 
                                        type="radio" 
                                        name="variant"
                                        checked={variant === 'pills'} 
                                        onChange={() => setVariant('pills')}
                                        className="h-4 w-4 text-sky-600 border-slate-700 bg-slate-800 focus:ring-sky-500"
                                    />
                                    <span className="text-sm text-slate-300">Pills / Segmented</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </LivePreview>
            <TechnicalOverview
                library="Headless UI Tabs"
                officialName="tailwindlabs/headlessui"
                githubUrl="https://github.com/tailwindlabs/headlessui"
                description="Tabs are a navigation component used to switch between different views or sets of content within the same context. They are a great way to organize related information without overwhelming the user."
                features={[
                    "Manages focus and keyboard navigation automatically.",
                    "Fully accessible with appropriate ARIA attributes.",
                    "Unstyled primitives for complete design control.",
                    "Supports both automatic and manual tab activation."
                ]}
                installation="npm install @headlessui/react"
                usage={`import { Tab } from '@headlessui/react';\n\n<Tab.Group>\n  <Tab.List>...</Tab.List>\n  <Tab.Panels>...</Tab.Panels>\n</Tab.Group>`}
            />
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fade-in {
                    animation: fadeIn 0.2s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default TabsDemo;