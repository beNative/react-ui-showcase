import React from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';
import { ChevronRightIcon, HomeIcon } from './Icons';

const BreadcrumbDemo: React.FC = () => {
    return (
        <div>
            <LivePreview>
                <nav className="flex" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li className="inline-flex items-center">
                            <a href="#" onClick={e => e.preventDefault()} className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-sky-400 transition-colors">
                                <HomeIcon className="w-4 h-4 mr-2" />
                                Home
                            </a>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <ChevronRightIcon className="w-4 h-4 text-slate-500" />
                                <a href="#" onClick={e => e.preventDefault()} className="ml-1 text-sm font-medium text-slate-400 hover:text-sky-400 md:ml-2 transition-colors">Projects</a>
                            </div>
                        </li>
                         <li>
                            <div className="flex items-center">
                                <ChevronRightIcon className="w-4 h-4 text-slate-500" />
                                <a href="#" onClick={e => e.preventDefault()} className="ml-1 text-sm font-medium text-slate-400 hover:text-sky-400 md:ml-2 transition-colors">UI Library</a>
                            </div>
                        </li>
                        <li aria-current="page">
                            <div className="flex items-center">
                                <ChevronRightIcon className="w-4 h-4 text-slate-500" />
                                <span className="ml-1 text-sm font-medium text-slate-200 md:ml-2">Components</span>
                            </div>
                        </li>
                    </ol>
                </nav>
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