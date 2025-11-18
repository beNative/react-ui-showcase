
import React, { useState } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';

type Task = { id: string, content: string };
type Column = { id: string, title: string, tasks: Task[] };

const KanbanDemo: React.FC = () => {
    const [columns, setColumns] = useState<Column[]>([
        {
            id: 'todo',
            title: 'To Do',
            tasks: [
                { id: '1', content: 'Design System' },
                { id: '2', content: 'Auth Flow' }
            ]
        },
        {
            id: 'inprogress',
            title: 'In Progress',
            tasks: [
                { id: '3', content: 'API Integration' }
            ]
        },
        {
            id: 'done',
            title: 'Done',
            tasks: [
                { id: '4', content: 'Project Setup' },
                { id: '5', content: 'Database Schema' }
            ]
        }
    ]);

    const moveTask = (taskId: string, fromColId: string, toColId: string) => {
        setColumns(prev => {
            const newCols = [...prev];
            const fromCol = newCols.find(c => c.id === fromColId);
            const toCol = newCols.find(c => c.id === toColId);
            
            if (!fromCol || !toCol) return prev;

            const taskIndex = fromCol.tasks.findIndex(t => t.id === taskId);
            const [task] = fromCol.tasks.splice(taskIndex, 1);
            toCol.tasks.push(task);
            
            return newCols;
        });
    };

    return (
        <div>
            <LivePreview>
                <div className="flex flex-col md:flex-row gap-4 overflow-x-auto pb-4">
                    {columns.map(col => (
                        <div key={col.id} className="flex-1 min-w-[250px] bg-slate-100 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 flex flex-col h-96 transition-colors">
                            <div className="p-3 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-200/50 dark:bg-slate-800/50 rounded-t-lg">
                                <h3 className="font-semibold text-slate-700 dark:text-slate-200 text-sm">{col.title}</h3>
                                <span className="text-xs bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-full">
                                    {col.tasks.length}
                                </span>
                            </div>
                            <div className="p-3 space-y-2 flex-1 overflow-y-auto">
                                {col.tasks.map(task => (
                                    <div 
                                        key={task.id} 
                                        className="bg-white dark:bg-slate-800 p-3 rounded border border-slate-300 dark:border-slate-700 shadow-sm hover:border-sky-500 dark:hover:border-sky-500 cursor-grab active:cursor-grabbing transition-colors group relative"
                                    >
                                        <p className="text-sm text-slate-800 dark:text-slate-300">{task.content}</p>
                                        
                                        {/* Mock controls to move items for demo purposes since drag n drop requires complex setup */}
                                        <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 flex space-x-1">
                                            {col.id !== 'todo' && (
                                                <button 
                                                    onClick={() => moveTask(task.id, col.id, columns[columns.indexOf(col) - 1].id)}
                                                    className="p-1 bg-slate-100 dark:bg-slate-700 rounded text-slate-500 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                                                    title="Move Left"
                                                >
                                                    &lt;
                                                </button>
                                            )}
                                            {col.id !== 'done' && (
                                                <button 
                                                    onClick={() => moveTask(task.id, col.id, columns[columns.indexOf(col) + 1].id)}
                                                    className="p-1 bg-slate-100 dark:bg-slate-700 rounded text-slate-500 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                                                    title="Move Right"
                                                >
                                                    &gt;
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                <button className="w-full py-2 text-sm text-slate-500 border border-dashed border-slate-300 dark:border-slate-700 rounded hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-colors">
                                    + Add Task
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </LivePreview>
            <TechnicalOverview
                library="dnd-kit / react-beautiful-dnd"
                officialName="clauderic/dnd-kit"
                githubUrl="https://github.com/clauderic/dnd-kit"
                description="A Kanban board allows for visual project management by moving tasks through different stages of a workflow. It relies heavily on drag-and-drop interactions."
                features={[
                    "Drag and drop between lists.",
                    "Sortable items within lists.",
                    "Keyboard accessibility for moving items.",
                    "Touch device support."
                ]}
                installation="npm install @dnd-kit/core"
                usage={`import { DndContext } from '@dnd-kit/core';\n\n<DndContext onDragEnd={handleDragEnd}>\n  {/* Columns and Sortable Items */}\n</DndContext>`}
            />
        </div>
    );
};

export default KanbanDemo;
