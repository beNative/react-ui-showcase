
import React, { useState, useRef } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';
import { PlusIcon, TrashIcon } from './Icons';

type Task = { id: string, content: string };
type Column = { id: string, title: string, tasks: Task[], color: string };

const KanbanDemo: React.FC = () => {
    const [columns, setColumns] = useState<Column[]>([
        {
            id: 'todo',
            title: 'To Do',
            color: 'bg-pink-500',
            tasks: [
                { id: '1', content: 'Research Competitors' },
                { id: '2', content: 'Draft Prd' }
            ]
        },
        {
            id: 'inprogress',
            title: 'In Progress',
            color: 'bg-sky-500',
            tasks: [
                { id: '3', content: 'Build Component Library' }
            ]
        },
        {
            id: 'review',
            title: 'Review',
            color: 'bg-yellow-500',
            tasks: []
        },
        {
            id: 'done',
            title: 'Done',
            color: 'bg-emerald-500',
            tasks: [
                { id: '4', content: 'Project Setup' },
                { id: '5', content: 'Database Schema' }
            ]
        }
    ]);

    const [draggedTask, setDraggedTask] = useState<{ taskId: string, sourceColId: string } | null>(null);
    const [dragOverCol, setDragOverCol] = useState<string | null>(null);

    const handleDragStart = (e: React.DragEvent, taskId: string, sourceColId: string) => {
        setDraggedTask({ taskId, sourceColId });
        e.dataTransfer.effectAllowed = 'move';
        // Set a transparent drag image or keep default
    };

    const handleDragOver = (e: React.DragEvent, colId: string) => {
        e.preventDefault(); // Necessary to allow dropping
        setDragOverCol(colId);
    };

    const handleDragLeave = () => {
        setDragOverCol(null);
    };

    const handleDrop = (e: React.DragEvent, targetColId: string) => {
        e.preventDefault();
        setDragOverCol(null);

        if (!draggedTask) return;
        const { taskId, sourceColId } = draggedTask;

        // If dropped in same column, do nothing (or reorder if implemented)
        if (sourceColId === targetColId) {
            setDraggedTask(null);
            return;
        }

        setColumns(prev => {
            const newCols = [...prev];
            const sourceCol = newCols.find(c => c.id === sourceColId);
            const targetCol = newCols.find(c => c.id === targetColId);

            if (!sourceCol || !targetCol) return prev;

            const taskIndex = sourceCol.tasks.findIndex(t => t.id === taskId);
            if (taskIndex === -1) return prev;

            const [task] = sourceCol.tasks.splice(taskIndex, 1);
            targetCol.tasks.push(task);

            return newCols;
        });
        setDraggedTask(null);
    };

    const addTask = (colId: string) => {
        const text = prompt("Enter task details:");
        if (!text) return;
        
        setColumns(prev => prev.map(col => {
            if (col.id === colId) {
                return {
                    ...col,
                    tasks: [...col.tasks, { id: Date.now().toString(), content: text }]
                };
            }
            return col;
        }));
    };

    const deleteTask = (colId: string, taskId: string) => {
         setColumns(prev => prev.map(col => {
            if (col.id === colId) {
                return {
                    ...col,
                    tasks: col.tasks.filter(t => t.id !== taskId)
                };
            }
            return col;
        }));
    };

    return (
        <div>
            <LivePreview>
                <div className="flex flex-col lg:flex-row gap-6 overflow-x-auto pb-4 min-h-[500px]">
                    {columns.map(col => (
                        <div 
                            key={col.id} 
                            className={`
                                flex-1 min-w-[260px] rounded-xl flex flex-col h-full max-h-[600px] transition-colors duration-200
                                border-2
                                ${dragOverCol === col.id ? 'border-sky-400 bg-sky-50 dark:bg-sky-900/10' : 'border-transparent bg-slate-100 dark:bg-slate-900/50'}
                            `}
                            onDragOver={(e) => handleDragOver(e, col.id)}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => handleDrop(e, col.id)}
                        >
                            {/* Column Header */}
                            <div className="p-4 flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <div className={`w-3 h-3 rounded-full ${col.color}`}></div>
                                    <h3 className="font-bold text-slate-700 dark:text-slate-200 text-sm uppercase tracking-wide">{col.title}</h3>
                                    <span className="text-xs font-mono text-slate-400 bg-white dark:bg-slate-800 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700">
                                        {col.tasks.length}
                                    </span>
                                </div>
                                <button 
                                    onClick={() => addTask(col.id)}
                                    className="p-1 text-slate-400 hover:text-sky-600 hover:bg-white dark:hover:bg-slate-800 rounded transition-colors"
                                >
                                    <PlusIcon className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Tasks Area */}
                            <div className="px-3 pb-3 space-y-3 flex-1 overflow-y-auto">
                                {col.tasks.length === 0 && (
                                    <div className="h-24 border-2 border-dashed border-slate-200 dark:border-slate-700/50 rounded-lg flex items-center justify-center text-slate-400 text-xs italic">
                                        Drop items here
                                    </div>
                                )}
                                {col.tasks.map(task => (
                                    <div 
                                        key={task.id} 
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, task.id, col.id)}
                                        className={`
                                            bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm 
                                            cursor-grab active:cursor-grabbing group relative select-none
                                            hover:shadow-md hover:border-sky-300 dark:hover:border-sky-700 transition-all
                                            ${draggedTask?.taskId === task.id ? 'opacity-50 scale-95 grayscale' : 'opacity-100'}
                                        `}
                                    >
                                        <p className="text-sm text-slate-800 dark:text-slate-300 leading-relaxed">{task.content}</p>
                                        <div className="flex justify-between items-center mt-3">
                                            <div className="flex -space-x-2">
                                                 <div className="w-6 h-6 rounded-full bg-orange-200 border-2 border-white dark:border-slate-800 flex items-center justify-center text-[10px] font-bold text-orange-700">JD</div>
                                            </div>
                                            <div className="text-[10px] text-slate-400 font-mono">#{task.id}</div>
                                        </div>
                                        
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); deleteTask(col.id, task.id); }}
                                            className="absolute top-2 right-2 p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded opacity-0 group-hover:opacity-100 transition-all"
                                        >
                                            <TrashIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </LivePreview>
            <TechnicalOverview
                library="dnd-kit / react-beautiful-dnd"
                officialName="clauderic/dnd-kit"
                githubUrl="https://github.com/clauderic/dnd-kit"
                description="A Kanban board allows for visual project management by moving tasks through different stages of a workflow. This demo uses the native HTML5 Drag and Drop API for a lightweight implementation without external dependencies."
                features={[
                    "Drag and drop between columns.",
                    "Visual feedback for drop targets.",
                    "Dynamic state updates.",
                    "Column specific task management."
                ]}
                installation="npm install @dnd-kit/core"
                usage={`// This demo uses native HTML5 DnD API (draggable, onDragStart, onDrop).\n// For production, libraries like dnd-kit are recommended for accessibility and touch support.`}
            />
        </div>
    );
};

export default KanbanDemo;
