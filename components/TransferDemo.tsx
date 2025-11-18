
import React, { useState } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';
import { ChevronRightIcon } from './Icons';

type Item = { id: string, label: string, checked: boolean };

const TransferDemo: React.FC = () => {
    const [leftItems, setLeftItems] = useState<Item[]>([
        { id: '1', label: 'Option 1', checked: false },
        { id: '2', label: 'Option 2', checked: false },
        { id: '3', label: 'Option 3', checked: false },
        { id: '4', label: 'Option 4', checked: false },
    ]);
    const [rightItems, setRightItems] = useState<Item[]>([
        { id: '5', label: 'Option 5', checked: false },
    ]);

    const toggleCheck = (id: string, side: 'left' | 'right') => {
        const setter = side === 'left' ? setLeftItems : setRightItems;
        setter(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
    };

    const moveRight = () => {
        const checked = leftItems.filter(i => i.checked).map(i => ({...i, checked: false}));
        setRightItems(prev => [...prev, ...checked]);
        setLeftItems(prev => prev.filter(i => !i.checked));
    };

    const moveLeft = () => {
        const checked = rightItems.filter(i => i.checked).map(i => ({...i, checked: false}));
        setLeftItems(prev => [...prev, ...checked]);
        setRightItems(prev => prev.filter(i => !i.checked));
    };

    const List = ({ items, side }: { items: Item[], side: 'left' | 'right' }) => (
        <div className="w-48 h-64 border border-slate-200 dark:border-slate-700 rounded-lg flex flex-col bg-white dark:bg-slate-900 transition-colors shadow-sm">
            <div className="p-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 rounded-t-lg transition-colors">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{side === 'left' ? 'Source' : 'Target'}</span>
                <span className="text-xs text-slate-500 ml-2">{items.length} items</span>
            </div>
            <div className="overflow-y-auto flex-1 p-2 space-y-1">
                {items.map(item => (
                    <label key={item.id} className={`flex items-center p-2 rounded cursor-pointer transition-colors ${item.checked ? 'bg-sky-50 dark:bg-sky-900/20' : 'hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                        <input 
                            type="checkbox" 
                            checked={item.checked} 
                            onChange={() => toggleCheck(item.id, side)}
                            className="rounded border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-sky-600 focus:ring-sky-500 mr-3"
                        />
                        <span className={`text-sm ${item.checked ? 'text-sky-700 dark:text-sky-300' : 'text-slate-600 dark:text-slate-400'}`}>{item.label}</span>
                    </label>
                ))}
                {items.length === 0 && <div className="text-center text-xs text-slate-400 dark:text-slate-600 mt-10">No Data</div>}
            </div>
        </div>
    );

    return (
        <div>
            <LivePreview>
                <div className="flex items-center justify-center space-x-4">
                    <List items={leftItems} side="left" />
                    <div className="flex flex-col space-y-2">
                        <button 
                            onClick={moveRight}
                            disabled={!leftItems.some(i => i.checked)}
                            className="p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-500 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                        >
                            <ChevronRightIcon className="w-4 h-4" />
                        </button>
                        <button 
                             onClick={moveLeft}
                             disabled={!rightItems.some(i => i.checked)}
                             className="p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-500 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                        >
                            <ChevronRightIcon className="w-4 h-4 transform rotate-180" />
                        </button>
                    </div>
                    <List items={rightItems} side="right" />
                </div>
            </LivePreview>
            <TechnicalOverview
                library="Ant Design Transfer / Custom"
                officialName="ant-design/transfer"
                githubUrl="https://ant.design/components/transfer"
                description="A Transfer component facilitates moving items between two lists. It is commonly used for selecting multiple items from a large dataset, like assigning permissions or selecting contacts."
                features={[
                    "Search functionality within lists.",
                    "Select All / Invert Selection.",
                    "Custom rendering for items.",
                    "One-way or two-way movement."
                ]}
                installation="npm install antd"
                usage={`import { Transfer } from 'antd';\n\n<Transfer\n  dataSource={mockData}\n  titles={['Source', 'Target']}\n  targetKeys={targetKeys}\n  onChange={onChange}\n  render={item => item.title}\n/>`}
            />
        </div>
    );
};

export default TransferDemo;
