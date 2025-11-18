
import React, { useState } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';
import { ChevronRightIcon, ChevronDownIcon, FolderIcon, DocumentTextIcon } from './Icons';

interface TreeNodeData {
    id: string;
    name: string;
    children?: TreeNodeData[];
}

const treeData: TreeNodeData = {
    id: 'root',
    name: 'Project Root',
    children: [
        {
            id: '1',
            name: 'components',
            children: [
                { id: '1-1', name: 'Button.tsx' },
                { id: '1-2', name: 'Modal.tsx' },
            ],
        },
        {
            id: '2',
            name: 'services',
            children: [
                { id: '2-1', name: 'api.ts' },
                { id: '2-2', name: 'auth.ts' },
            ],
        },
        { id: '3', name: 'App.tsx' },
        { id: '4', name: 'index.tsx' },
    ],
};

const TreeNode: React.FC<{ node: TreeNodeData; level: number; showIcons: boolean; showLines: boolean }> = ({ node, level, showIcons, showLines }) => {
    const [isOpen, setIsOpen] = useState(true);
    const hasChildren = node.children && node.children.length > 0;

    return (
        <div className="relative">
            <div
                className={`flex items-center p-1 rounded-md cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors ${hasChildren ? '' : 'cursor-default'}`}
                style={{ paddingLeft: `${level * 20 + 4}px` }}
                onClick={() => hasChildren && setIsOpen(!isOpen)}
            >
                <div className="flex items-center w-5 mr-1 flex-shrink-0">
                    {hasChildren ? (
                         <div className={`transform transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}>
                            <ChevronRightIcon className="w-4 h-4 text-slate-500" />
                         </div>
                    ) : <span className="w-4"></span>}
                </div>
                
                {showIcons && (
                    <div className="mr-2 text-sky-500 dark:text-sky-400">
                        {hasChildren ? <FolderIcon className="w-4 h-4" /> : <DocumentTextIcon className="w-4 h-4" />}
                    </div>
                )}
                
                <span className="text-slate-700 dark:text-slate-300 text-sm select-none">{node.name}</span>
            </div>
            {hasChildren && isOpen && (
                <div className="relative">
                    {showLines && (
                         <div 
                            className="absolute left-0 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-700"
                            style={{ left: `${level * 20 + 12}px` }}
                         ></div>
                    )}
                    {node.children!.map((child) => (
                        <TreeNode key={child.id} node={child} level={level + 1} showIcons={showIcons} showLines={showLines} />
                    ))}
                </div>
            )}
        </div>
    );
};

const TreeViewDemo: React.FC = () => {
    const [showIcons, setShowIcons] = useState(true);
    const [showLines, setShowLines] = useState(true);

    return (
        <div>
            <LivePreview>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 min-h-[200px]">
                        <TreeNode node={treeData} level={0} showIcons={showIcons} showLines={showLines} />
                    </div>

                    {/* Configuration */}
                    <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 space-y-4">
                        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Configuration</h3>
                        
                        <div className="space-y-3">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={showIcons} 
                                    onChange={(e) => setShowIcons(e.target.checked)}
                                    className="form-checkbox h-4 w-4 text-sky-600 rounded border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-sky-500"
                                />
                                <span className="text-sm text-slate-700 dark:text-slate-300">Show Type Icons</span>
                            </label>
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={showLines} 
                                    onChange={(e) => setShowLines(e.target.checked)}
                                    className="form-checkbox h-4 w-4 text-sky-600 rounded border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-sky-500"
                                />
                                <span className="text-sm text-slate-700 dark:text-slate-300">Show Guide Lines</span>
                            </label>
                        </div>
                    </div>
                </div>
            </LivePreview>
            <TechnicalOverview
                library="Custom Recursive Component (e.g., react-arborist)"
                officialName="brimdata/react-arborist"
                githubUrl="https://github.com/brimdata/react-arborist"
                description="A tree view is a hierarchical list that displays items in a parent-child relationship. This is a fundamental component for displaying file systems, organizational charts, or any nested data."
                features={[
                    "Represents hierarchical data structures",
                    "Expandable and collapsible nodes",
                    "Can be implemented efficiently with recursion in React",
                    "Libraries can add features like drag-and-drop, lazy loading, and virtualization"
                ]}
                installation="npm install react-arborist"
                usage={`import { Tree } from "react-arborist";\n\n<Tree initialData={data} />`}
            />
        </div>
    );
};

export default TreeViewDemo;
