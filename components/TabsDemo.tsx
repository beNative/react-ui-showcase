import React, { useState } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';

const tabsData = [
    { id: 'profile', label: 'Profile', content: 'This is the profile content. It contains user details, settings, and other personal information.' },
    { id: 'dashboard', label: 'Dashboard', content: 'Welcome to your dashboard. Here you will find an overview of your account activity and key metrics.' },
    { id: 'settings', label: 'Settings', content: 'Manage your account settings. You can update your email, password, and notification preferences here.' },
];

const TabsDemo: React.FC = () => {
    const [activeTab, setActiveTab] = useState(tabsData[0].id);

    return (
        <div>
            <LivePreview>
                <div className="w-full">
                    <div className="border-b border-slate-700">
                        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                            {tabsData.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`${
                                        activeTab === tab.id
                                            ? 'border-sky-500 text-sky-400'
                                            : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-500'
                                    } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 rounded-t-sm`}
                                    aria-current={activeTab === tab.id ? 'page' : undefined}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>
                    <div className="mt-5">
                        {tabsData.map(tab => (
                            <div key={tab.id} className={`${activeTab === tab.id ? 'block' : 'hidden'}`}>
                                <p className="text-slate-300">{tab.content}</p>
                            </div>
                        ))}
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
        </div>
    );
};

export default TabsDemo;