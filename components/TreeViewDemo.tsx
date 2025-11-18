
import React, { useState, useEffect, useMemo } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';
import { ChevronRightIcon, ChevronDownIcon, FolderIcon, DocumentTextIcon, MagnifyingGlassIcon, CheckIcon, MinusIcon } from './Icons';

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
            id: 'src',
            name: 'src',
            children: [
                {
                    id: 'components',
                    name: 'components',
                    children: [
                        { id: 'Button.tsx', name: 'Button.tsx' },
                        { id: 'Modal.tsx', name: 'Modal.tsx' },
                        { id: 'Input.tsx', name: 'Input.tsx' },
                    ],
                },
                {
                    id: 'services',
                    name: 'services',
                    children: [
                        { id: 'api.ts', name: 'api.ts' },
                        { id: 'auth.ts', name: 'auth.ts' },
                    ],
                },
                { id: 'App.tsx', name: 'App.tsx' },
                { id: 'index.tsx', name: 'index.tsx' },
                { id: 'types.ts', name: 'types.ts' },
            ],
        },
        {
            id: 'public',
            name: 'public',
            children: [
                { id: 'favicon.ico', name: 'favicon.ico' },
                { id: 'index.html', name: 'index.html' },
                { id: 'manifest.json', name: 'manifest.json' },
            ]
        },
        { id: 'package.json', name: 'package.json' },
        { id: 'tsconfig.json', name: 'tsconfig.json' },
    ],
};

// Helper to flatten tree for easier operations
const getAllIds = (nodes: TreeNodeData[]): string[] => {
    let ids: string[] = [];
    nodes.forEach(node => {
        ids.push(node.id);
        if (node.children) {
            ids = ids.concat(getAllIds(node.children));
        }
    });
    return ids;
};

const TreeNode: React.FC<{ 
    node: TreeNodeData; 
    level: number; 
    expandedIds: Set<string>;
    selectedId: string | null;
    checkedIds: Set<string>;
    onToggle: (id: string) => void;
    onSelect: (id: string) => void;
    onCheck: (id: string, checked: boolean) => void;
    showIcons: boolean; 
    showLines: boolean;
    isCheckable: boolean;
    searchTerm: string;
}> = ({ 
    node, level, expandedIds, selectedId, checkedIds, 
    onToggle, onSelect, onCheck, 
    showIcons, showLines, isCheckable, searchTerm
}) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expandedIds.has(node.id);
    const isSelected = selectedId === node.id;
    const isChecked = checkedIds.has(node.id);

    // Simple recursive check for indeterminate state (visual only for demo simplification)
    // In a real app, you'd calculate this bottom-up
    const isIndeterminate = false; 

    // Highlight search term
    const renderName = () => {
        if (!searchTerm) return node.name;
        const index = node.name.toLowerCase().indexOf(searchTerm.toLowerCase());
        if (index === -1) return node.name;
        return (
            <span>
                {node.name.substring(0, index)}
                <span className="bg-yellow-200 dark:bg-yellow-900/50 text-slate-900 dark:text-white font-medium rounded-sm px-0.5">{node.name.substring(index, index + searchTerm.length)}</span>
                {node.name.substring(index + searchTerm.length)}
            </span>
        );
    };

    return (
        <div className="relative">
            <div
                className={`flex items-center p-1.5 rounded-md cursor-pointer transition-colors border border-transparent
                    ${isSelected ? 'bg-sky-100 dark:bg-sky-900/30 border-sky-200 dark:border-sky-800' : 'hover:bg-slate-100 dark:hover:bg-slate-800/50'}
                `}
                style={{ paddingLeft: `${level * 20 + 4}px` }}
                onClick={() => {
                    onSelect(node.id);
                    if (hasChildren && !isCheckable) onToggle(node.id); // Auto-toggle on click if not in check mode (optional UX choice)
                }}
            >
                {/* Toggle Button */}
                <div 
                    className="flex items-center justify-center w-5 mr-1 flex-shrink-0 hover:text-sky-500 transition-colors"
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggle(node.id);
                    }}
                >
                    {hasChildren ? (
                         <div className={`transform transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
                            <ChevronRightIcon className="w-4 h-4 text-slate-400" />
                         </div>
                    ) : <span className="w-4"></span>}
                </div>
                
                {/* Checkbox */}
                {isCheckable && (
                    <div 
                        className="mr-2 flex items-center justify-center"
                        onClick={(e) => {
                            e.stopPropagation();
                            onCheck(node.id, !isChecked);
                        }}
                    >
                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${isChecked ? 'bg-sky-500 border-sky-500 text-white' : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600'}`}>
                            {isChecked && <CheckIcon className="w-3 h-3" />}
                            {isIndeterminate && !isChecked && <MinusIcon className="w-3 h-3 text-sky-500" />}
                        </div>
                    </div>
                )}

                {/* Icon */}
                {showIcons && (
                    <div className={`mr-2 ${hasChildren ? 'text-amber-400' : 'text-sky-500'}`}>
                        {hasChildren ? <FolderIcon className="w-4 h-4" /> : <DocumentTextIcon className="w-4 h-4" />}
                    </div>
                )}
                
                {/* Label */}
                <span className={`text-sm select-none ${isSelected ? 'text-sky-700 dark:text-sky-300 font-medium' : 'text-slate-700 dark:text-slate-300'}`}>
                    {renderName()}
                </span>
            </div>

            {/* Children */}
            {hasChildren && isExpanded && (
                <div className="relative">
                    {showLines && (
                         <div 
                            className="absolute top-0 bottom-2 w-px bg-slate-200 dark:bg-slate-800"
                            style={{ left: `${level * 20 + 12}px` }}
                         ></div>
                    )}
                    {node.children!.map((child) => (
                        <TreeNode 
                            key={child.id} 
                            node={child} 
                            level={level + 1} 
                            expandedIds={expandedIds}
                            selectedId={selectedId}
                            checkedIds={checkedIds}
                            onToggle={onToggle}
                            onSelect={onSelect}
                            onCheck={onCheck}
                            showIcons={showIcons}
                            showLines={showLines}
                            isCheckable={isCheckable}
                            searchTerm={searchTerm}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const TreeViewDemo: React.FC = () => {
    const [showIcons, setShowIcons] = useState(true);
    const [showLines, setShowLines] = useState(true);
    const [isCheckable, setIsCheckable] = useState(false);
    
    const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(['root', 'src']));
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());
    const [searchTerm, setSearchTerm] = useState('');

    // Filter logic
    const getFilteredNodes = (nodes: TreeNodeData[], term: string): TreeNodeData[] => {
        if (!term) return nodes;
        return nodes.map(node => {
            const children = node.children ? getFilteredNodes(node.children, term) : undefined;
            const matches = node.name.toLowerCase().includes(term.toLowerCase());
            const hasMatchingChildren = children && children.length > 0;
            
            if (matches || hasMatchingChildren) {
                return { ...node, children };
            }
            return null;
        }).filter(Boolean) as TreeNodeData[];
    };

    const filteredTree = useMemo(() => getFilteredNodes([treeData], searchTerm), [searchTerm]);

    // Auto-expand on search
    useEffect(() => {
        if (searchTerm) {
            const allIds = getAllIds(filteredTree);
            setExpandedIds(new Set(allIds));
        }
    }, [searchTerm, filteredTree]);

    const handleToggle = (id: string) => {
        const newExpanded = new Set(expandedIds);
        if (newExpanded.has(id)) {
            newExpanded.delete(id);
        } else {
            newExpanded.add(id);
        }
        setExpandedIds(newExpanded);
    };

    const handleSelect = (id: string) => setSelectedId(id);

    const handleCheck = (id: string, checked: boolean) => {
        const newChecked = new Set(checkedIds);
        if (checked) {
            newChecked.add(id);
        } else {
            newChecked.delete(id);
        }
        setCheckedIds(newChecked);
    };

    const expandAll = () => setExpandedIds(new Set(getAllIds([treeData])));
    const collapseAll = () => setExpandedIds(new Set(['root']));

    return (
        <div>
            <LivePreview>
                <div className="grid grid-cols-1 gap-6">
                    {/* Toolbar */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                        <div className="relative w-full sm:w-64">
                            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input 
                                type="text" 
                                placeholder="Search files..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-9 pr-4 py-1.5 text-sm bg-slate-100 dark:bg-slate-800 border-transparent focus:bg-white dark:focus:bg-slate-900 border focus:border-sky-500 rounded-md outline-none transition-all text-slate-900 dark:text-slate-200 placeholder-slate-500"
                            />
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto">
                            <button onClick={expandAll} className="flex-1 sm:flex-none px-3 py-1.5 text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded transition-colors border border-slate-200 dark:border-slate-700">
                                Expand All
                            </button>
                            <button onClick={collapseAll} className="flex-1 sm:flex-none px-3 py-1.5 text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded transition-colors border border-slate-200 dark:border-slate-700">
                                Collapse All
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                        {/* Tree Area */}
                        <div className="md:col-span-2 p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 min-h-[300px] overflow-y-auto max-h-[400px] shadow-sm">
                            {filteredTree.length > 0 ? (
                                filteredTree.map(node => (
                                    <TreeNode 
                                        key={node.id} 
                                        node={node} 
                                        level={0} 
                                        expandedIds={expandedIds}
                                        selectedId={selectedId}
                                        checkedIds={checkedIds}
                                        onToggle={handleToggle}
                                        onSelect={handleSelect}
                                        onCheck={handleCheck}
                                        showIcons={showIcons}
                                        showLines={showLines}
                                        isCheckable={isCheckable}
                                        searchTerm={searchTerm}
                                    />
                                ))
                            ) : (
                                <div className="text-center py-8 text-slate-500 text-sm">No results found</div>
                            )}
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
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        checked={isCheckable} 
                                        onChange={(e) => setIsCheckable(e.target.checked)}
                                        className="form-checkbox h-4 w-4 text-sky-600 rounded border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-sky-500"
                                    />
                                    <span className="text-sm text-slate-700 dark:text-slate-300">Show Checkboxes</span>
                                </label>
                            </div>
                            
                            <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                                <div className="text-xs text-slate-500 mb-1">Selected Node:</div>
                                <div className="text-sm font-mono text-slate-700 dark:text-slate-300 truncate">
                                    {selectedId || 'None'}
                                </div>
                            </div>
                            
                            {isCheckable && (
                                <div className="pt-2">
                                    <div className="text-xs text-slate-500 mb-1">Checked Count:</div>
                                    <div className="text-sm font-mono text-slate-700 dark:text-slate-300">
                                        {checkedIds.size} items
                                    </div>
                                </div>
                            )}
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
