
import React, { useState } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';
import { ChevronRightIcon, HomeIcon } from './Icons';

const BreadcrumbDemo: React.FC = () => {
    const [separator, setSeparator] = useState<'chevron' | 'slash'>('chevron');
    const [showIcon, setShowIcon] = useState(true);

    const SeparatorIcon = () => {
        if (separator === 'slash') return <span className="text-slate-400 dark:text-slate-500 mx-2">/</span>;
        return <ChevronRightIcon className="w-4 h-4 text-slate-400 dark:text-slate-500 mx-1" />;
    };

    return (
        <div>
            <LivePreview>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="w-full flex justify-center">
                        <nav className="flex" aria-label="Breadcrumb">
                            <ol className="inline-flex items-center">
                                <li className="inline-flex items-center">
                                    <a href="#" onClick={e => e.preventDefault()} className="inline-flex items-center text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors">
                                        {showIcon && <HomeIcon className="w-4 h-4 mr-2" />}
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <SeparatorIcon />
                                        <a href="#" onClick={e => e.preventDefault()} className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors">Projects</a>
                                    </div>
                                </li>
                                 <li>
                                    <div className="flex items-center">
                                        <SeparatorIcon />
                                        <a href="#" onClick={e => e.preventDefault()} className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors">UI Library</a>
                                    </div>
                                </li>
                                <li aria-current="page">
                                    <div className="flex items-center">
                                        <SeparatorIcon />
                                        <span className="text-sm font-medium text-slate-900 dark:text-slate-200">Components</span>
                                    </div>
                                </li>
                            </ol>
                        </nav>
                    </div>

                    {/* Configuration */}
                    <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 space-y-4 w-full transition-colors">
                        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Configuration</h3>
                        
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Separator Style</label>
                             <select 
                                value={separator}
                                onChange={(e) => setSeparator(e.target.value as any)}
                                className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md px-3 py-2 text-sm text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-sky-500 outline-none transition-colors"
                            >
                                <option value="chevron">Chevron (&gt;)</option>
                                <option value="slash">Slash (/)</option>
                            </select>
                        </div>

                        <div>
                             <label className="flex items-center space-x-2 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={showIcon} 
                                    onChange={(e) => setShowIcon(e.target.checked)}
                                    className="form-checkbox h-4 w-4 text-sky-600 rounded border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-sky-500"
                                />
                                <span className="text-sm text-slate-700 dark:text-slate-300">Show Home Icon</span>
                            </label>
                        </div>
                    </div>
                </div>
            </LivePreview>
            <TechnicalOverview
                library="React Aria Breadcrumbs"
                officialName="adobe/react-spectrum"
                githubUrl="https://react-spectrum.adobe.com/react-aria/Breadcrumbs.html"
                description="Breadcrumbs provide a trail for users to follow back to the starting or entry point of a website. They are essential for navigating deep hierarchies."
                features={[
                    "Displays current location within hierarchy.",
                    "Clickable links for parent levels.",
                    "Automatically handles separators.",
                    "Accessible with correct aria-label and aria-current."
                ]}
                installation="npm install react-aria"
                usage={`import { Breadcrumbs, Item } from 'react-aria-components';\n\n<Breadcrumbs>\n  <Item>Home</Item>\n  <Item>Page</Item>\n</Breadcrumbs>`}
            />
        </div>
    );
};

export default BreadcrumbDemo;
