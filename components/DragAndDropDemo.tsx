
import React, { useState } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';
import { UserCircleIcon, CheckIcon } from './Icons';

type Person = { id: number; name: string; role: string };

const initialAvailable: Person[] = [
    { id: 1, name: 'Alice Johnson', role: 'Designer' },
    { id: 2, name: 'Bob Smith', role: 'Developer' },
    { id: 3, name: 'Charlie Brown', role: 'Manager' },
    { id: 4, name: 'Diana Prince', role: 'Product' },
    { id: 5, name: 'Evan Wright', role: 'Developer' },
];

const DragAndDropDemo: React.FC = () => {
    const [available, setAvailable] = useState<Person[]>(initialAvailable);
    const [selected, setSelected] = useState<Person[]>([]);
    const [draggedItem, setDraggedItem] = useState<Person | null>(null);
    const [sourceList, setSourceList] = useState<'available' | 'selected' | null>(null);

    const handleDragStart = (e: React.DragEvent, item: Person, source: 'available' | 'selected') => {
        setDraggedItem(item);
        setSourceList(source);
        e.dataTransfer.effectAllowed = 'move';
        // Transparent drag image or default
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent, target: 'available' | 'selected') => {
        e.preventDefault();
        if (!draggedItem || !sourceList || sourceList === target) return;

        if (target === 'selected') {
            setAvailable(prev => prev.filter(i => i.id !== draggedItem.id));
            setSelected(prev => [...prev, draggedItem]);
        } else {
            setSelected(prev => prev.filter(i => i.id !== draggedItem.id));
            setAvailable(prev => [...prev, draggedItem]);
        }
        
        setDraggedItem(null);
        setSourceList(null);
    };

    const DraggableCard = ({ item, source }: { item: Person, source: 'available' | 'selected' }) => (
        <div
            draggable
            onDragStart={(e) => handleDragStart(e, item, source)}
            className={`
                flex items-center p-3 mb-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm cursor-grab active:cursor-grabbing hover:border-sky-400 transition-all
                ${draggedItem?.id === item.id ? 'opacity-40 bg-slate-100 dark:bg-slate-800' : 'opacity-100'}
            `}
        >
            <UserCircleIcon className="w-8 h-8 text-slate-400 mr-3" />
            <div className="flex-1">
                <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">{item.name}</div>
                <div className="text-xs text-slate-500">{item.role}</div>
            </div>
             {source === 'selected' && <CheckIcon className="w-4 h-4 text-green-500" />}
        </div>
    );

    return (
        <div>
            <LivePreview>
                <div className="flex flex-col md:flex-row gap-8 justify-center items-start h-[400px]">
                    {/* Available List */}
                    <div 
                        className={`flex-1 w-full h-full bg-slate-50 dark:bg-slate-900/50 rounded-xl border-2 ${sourceList === 'selected' ? 'border-sky-400 bg-sky-50 dark:bg-sky-900/20' : 'border-dashed border-slate-300 dark:border-slate-700'} p-4 flex flex-col transition-colors`}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, 'available')}
                    >
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Available Candidates</h3>
                        <div className="flex-1 overflow-y-auto">
                            {available.map(item => <DraggableCard key={item.id} item={item} source="available" />)}
                            {available.length === 0 && <div className="text-center text-slate-400 text-sm mt-10">No candidates available</div>}
                        </div>
                    </div>

                    {/* Selected List */}
                    <div 
                         className={`flex-1 w-full h-full bg-slate-50 dark:bg-slate-900/50 rounded-xl border-2 ${sourceList === 'available' ? 'border-sky-400 bg-sky-50 dark:bg-sky-900/20' : 'border-dashed border-slate-300 dark:border-slate-700'} p-4 flex flex-col transition-colors`}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, 'selected')}
                    >
                        <h3 className="text-sm font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider mb-4 flex items-center">
                            Selected Team
                            <span className="ml-2 bg-sky-100 dark:bg-sky-900 text-sky-600 dark:text-sky-300 text-xs px-2 py-0.5 rounded-full">{selected.length}</span>
                        </h3>
                        <div className="flex-1 overflow-y-auto">
                             {selected.map(item => <DraggableCard key={item.id} item={item} source="selected" />)}
                             {selected.length === 0 && <div className="text-center text-slate-400 text-sm mt-10 italic">Drag candidates here to select them</div>}
                        </div>
                    </div>
                </div>
            </LivePreview>
            <TechnicalOverview
                library="dnd-kit / React DnD"
                officialName="clauderic/dnd-kit"
                githubUrl="https://github.com/clauderic/dnd-kit"
                description="Drag and drop interfaces allow users to intuitively move and reorder elements. This demo showcases transferring items between two distinct containers."
                features={[
                    "Transfer between multiple lists.",
                    "Visual feedback for drop zones.",
                    "Candidate selection logic.",
                    "Accessible drag handles."
                ]}
                installation="npm install @dnd-kit/core @dnd-kit/sortable"
                usage={`import { DndContext } from '@dnd-kit/core';\n\n<DndContext onDragEnd={handleDragEnd}>...</DndContext>`}
            />
        </div>
    );
};
export default DragAndDropDemo;
