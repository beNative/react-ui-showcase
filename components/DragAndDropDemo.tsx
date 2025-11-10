import React, { useState } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';

const initialItems = [
    { id: 1, text: 'Task 1: Design Mockups' },
    { id: 2, text: 'Task 2: Develop Components' },
    { id: 3, text: 'Task 3: Write Unit Tests' },
    { id: 4, text: 'Task 4: Deploy to Staging' },
];

const DragAndDropDemo: React.FC = () => {
    const [items, setItems] = useState(initialItems);
    const [draggedItemId, setDraggedItemId] = useState<number | null>(null);

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: number) => {
        setDraggedItemId(id);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetId: number) => {
        e.preventDefault();
        if (draggedItemId === null || draggedItemId === targetId) {
            setDraggedItemId(null);
            return;
        };
        
        const draggedItemIndex = items.findIndex(item => item.id === draggedItemId);
        const targetItemIndex = items.findIndex(item => item.id === targetId);
        
        const newItems = [...items];
        const [draggedItem] = newItems.splice(draggedItemIndex, 1);
        newItems.splice(targetItemIndex, 0, draggedItem);
        
        setItems(newItems);
        setDraggedItemId(null);
    };

    return (
        <div>
            <LivePreview>
                <div className="w-full max-w-sm mx-auto bg-slate-800 p-4 rounded-lg space-y-2 border border-slate-700">
                    <h3 className="text-center font-semibold text-slate-300 mb-2">Project Tasks (Draggable)</h3>
                    {items.map(item => (
                        <div
                            key={item.id}
                            draggable
                            onDragStart={e => handleDragStart(e, item.id)}
                            onDragOver={handleDragOver}
                            onDrop={e => handleDrop(e, item.id)}
                            onDragEnd={() => setDraggedItemId(null)}
                            className={`p-3 bg-slate-700 rounded-md cursor-grab transition-all ${draggedItemId === item.id ? 'opacity-50 scale-105' : 'opacity-100'}`}
                        >
                            {item.text}
                        </div>
                    ))}
                </div>
            </LivePreview>
            <TechnicalOverview
                library="dnd-kit / React DnD"
                officialName="clauderic/dnd-kit"
                githubUrl="https://github.com/clauderic/dnd-kit"
                description="Drag and drop interfaces allow users to intuitively move and reorder elements. Modern libraries provide a clean, accessible API for building complex dnd experiences, from simple list sorting to full-fledged Kanban boards."
                features={[
                    "Designed for React with a modern API (dnd-kit)",
                    "Extensible with sensors for pointer, mouse, and keyboard input",
                    "Supports various dnd patterns (sorting, dropping, etc.)",
                    "Lightweight and performant"
                ]}
                installation="npm install @dnd-kit/core @dnd-kit/sortable"
                usage={`import { DndContext } from '@dnd-kit/core';\n\n<DndContext onDragEnd={handleDragEnd}>...</DndContext>`}
            />
        </div>
    );
};
export default DragAndDropDemo;