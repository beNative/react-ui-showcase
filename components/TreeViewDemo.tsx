import React, { useState } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';
import { ChevronRightIcon, ChevronDownIcon } from './Icons';

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

const TreeNode: React.FC<{ node: TreeNodeData; level: number }> = ({ node, level }) => {
    const [isOpen, setIsOpen] = useState(true);
    const hasChildren = node.children && node.children.length > 0;

    return (
        <div>
            <div
                className={`flex items-center p-1 rounded-md cursor-pointer hover:bg-slate-700/50 ${hasChildren ? '' : 'cursor-default'}`}
                style={{ paddingLeft: `${level * 20 + 4}px` }}
                onClick={() => hasChildren && setIsOpen(!isOpen)}
            >
                {hasChildren ? (
                    isOpen ? <ChevronDownIcon className="w-4 h-4 mr-1 flex-shrink-0" /> : <ChevronRightIcon className="w-4 h-4 mr-1 flex-shrink-0" />
                ) : (
                    <span className="w-4 mr-1"></span>
                )}
                <span className="text-slate-300">{node.name}</span>
            </div>
            {hasChildren && isOpen && (
                <div>
                    {node.children!.map((child) => (
                        <TreeNode key={child.id} node={child} level={level + 1} />
                    ))}
                </div>
            )}
        </div>
    );
};

const TreeViewDemo: React.FC = () => {
    return (
        <div>
            <LivePreview>
                <div className="p-4 bg-slate-900/50 rounded-lg">
                    <TreeNode node={treeData} level={0} />
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