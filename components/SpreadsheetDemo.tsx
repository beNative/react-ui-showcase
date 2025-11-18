
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';
import { 
    BoldIcon, ItalicIcon, AlignLeftIcon, AlignCenterIcon, AlignRightIcon, 
    PlusIcon, TrashIcon
} from './Icons';

// --- Types ---

type CellStyle = {
    bold?: boolean;
    italic?: boolean;
    align?: 'left' | 'center' | 'right';
    color?: string;
    bg?: string;
};

type CellData = {
    value: string;      // Raw input (e.g., "=SUM(A1:A5)" or "10")
    computed: string;   // Display value (e.g., "50")
    style?: CellStyle;
};

type Selection = {
    startR: number;
    startC: number;
    endR: number;
    endC: number;
};

// --- Helpers ---

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

// 0 -> A, 1 -> B, ... 26 -> AA
const getColLabel = (index: number) => {
    let label = '';
    let i = index;
    while (i >= 0) {
        label = ALPHABET[i % 26] + label;
        i = Math.floor(i / 26) - 1;
    }
    return label;
};

// "A1" -> {r: 0, c: 0}
const parseCellId = (id: string) => {
    const match = id.match(/^([A-Z]+)([0-9]+)$/);
    if (!match) return null;
    const colStr = match[1];
    const rowStr = match[2];
    const c = colStr.split('').reduce((r, a) => r * 26 + parseInt(a, 36) - 9, 0) - 1;
    const r = parseInt(rowStr) - 1;
    return { r, c };
};

const INITIAL_ROWS = 20;
const INITIAL_COLS = 10;

const SpreadsheetDemo: React.FC = () => {
    // --- State ---
    const [data, setData] = useState<CellData[][]>(() => {
        // Init empty grid
        return Array.from({ length: INITIAL_ROWS }, () => 
            Array.from({ length: INITIAL_COLS }, () => ({ value: '', computed: '' }))
        );
    });

    const [selection, setSelection] = useState<Selection | null>({ startR: 1, startC: 1, endR: 1, endC: 1 });
    const [activeCell, setActiveCell] = useState<{ r: number, c: number } | null>({ r: 1, c: 1 });
    const [isDragging, setIsDragging] = useState(false);
    const [editing, setEditing] = useState(false);
    const [editValue, setEditValue] = useState('');

    const gridRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // --- Formula Logic ---

    const evaluateFormula = useCallback((expression: string, currentData: CellData[][]) => {
        if (!expression.startsWith('=')) return expression;
        
        const cleanExp = expression.substring(1).toUpperCase();

        try {
            // 1. Replace Range Functions: SUM(A1:B2)
            // Regex looks for FUNC(RANGE)
            const processedExp = cleanExp.replace(/(SUM|AVG|COUNT|MAX|MIN)\(([A-Z]+[0-9]+):([A-Z]+[0-9]+)\)/g, (match, func, start, end) => {
                const s = parseCellId(start);
                const e = parseCellId(end);
                if (!s || !e) return '0';

                const values: number[] = [];
                const rStart = Math.min(s.r, e.r);
                const rEnd = Math.max(s.r, e.r);
                const cStart = Math.min(s.c, e.c);
                const cEnd = Math.max(s.c, e.c);

                for (let r = rStart; r <= rEnd; r++) {
                    for (let c = cStart; c <= cEnd; c++) {
                        if (currentData[r] && currentData[r][c]) {
                            const val = parseFloat(currentData[r][c].computed);
                            if (!isNaN(val)) values.push(val);
                        }
                    }
                }

                if (values.length === 0) return '0';

                switch (func) {
                    case 'SUM': return values.reduce((a, b) => a + b, 0).toString();
                    case 'AVG': return (values.reduce((a, b) => a + b, 0) / values.length).toString();
                    case 'COUNT': return values.length.toString();
                    case 'MAX': return Math.max(...values).toString();
                    case 'MIN': return Math.min(...values).toString();
                    default: return '0';
                }
            });

            // 2. Replace Single Cell References: A1 -> value
            const finalExp = processedExp.replace(/[A-Z]+[0-9]+/g, (match) => {
                const pos = parseCellId(match);
                if (!pos || !currentData[pos.r] || !currentData[pos.r][pos.c]) return '0';
                const val = currentData[pos.r][pos.c].computed;
                return isNaN(Number(val)) ? `"${val}"` : val; // Quote strings
            });

            // 3. Evaluate
            // eslint-disable-next-line no-new-func
            const result = new Function(`return ${finalExp}`)();
            return result.toString();

        } catch (err) {
            return '#ERROR';
        }
    }, []);

    // Recompute entire grid (naive approach for demo)
    const recomputeGrid = useCallback((newData: CellData[][]) => {
        // We do 2 passes to allow simple forward dependencies
        let passData = newData.map(row => row.map(c => ({ ...c })));
        
        for (let i = 0; i < 2; i++) {
            for (let r = 0; r < passData.length; r++) {
                for (let c = 0; c < passData[r].length; c++) {
                    if (passData[r][c].value.startsWith('=')) {
                        passData[r][c].computed = evaluateFormula(passData[r][c].value, passData);
                    } else {
                        passData[r][c].computed = passData[r][c].value;
                    }
                }
            }
        }
        return passData;
    }, [evaluateFormula]);

    // --- Actions ---

    const commitEdit = () => {
        if (!activeCell) return;
        const newData = [...data];
        newData[activeCell.r] = [...newData[activeCell.r]];
        newData[activeCell.r][activeCell.c] = {
            ...newData[activeCell.r][activeCell.c],
            value: editValue
        };
        
        const computedData = recomputeGrid(newData);
        setData(computedData);
        setEditing(false);
    };

    const startEdit = () => {
        if (!activeCell) return;
        setEditValue(data[activeCell.r][activeCell.c].value);
        setEditing(true);
        setTimeout(() => inputRef.current?.focus(), 0);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (editing) {
            if (e.key === 'Enter') {
                e.preventDefault();
                commitEdit();
                // Move down
                if (activeCell && activeCell.r < data.length - 1) {
                    const next = { r: activeCell.r + 1, c: activeCell.c };
                    setActiveCell(next);
                    setSelection({ startR: next.r, startC: next.c, endR: next.r, endC: next.c });
                }
            }
            return;
        }

        if (!activeCell) return;

        // Navigation
        let next = { ...activeCell };
        if (e.key === 'ArrowUp') next.r = Math.max(0, next.r - 1);
        if (e.key === 'ArrowDown') next.r = Math.min(data.length - 1, next.r + 1);
        if (e.key === 'ArrowLeft') next.c = Math.max(0, next.c - 1);
        if (e.key === 'ArrowRight') next.c = Math.min(data[0].length - 1, next.c + 1);

        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            startEdit();
            return; // Don't move selection yet
        }

        if (e.key === 'Backspace' || e.key === 'Delete') {
            // Clear selection
            const newData = [...data];
            if (selection) {
                const rStart = Math.min(selection.startR, selection.endR);
                const rEnd = Math.max(selection.startR, selection.endR);
                const cStart = Math.min(selection.startC, selection.endC);
                const cEnd = Math.max(selection.startC, selection.endC);

                for (let r = rStart; r <= rEnd; r++) {
                    newData[r] = [...newData[r]];
                    for (let c = cStart; c <= cEnd; c++) {
                        newData[r][c] = { ...newData[r][c], value: '', computed: '' };
                    }
                }
                const recomputed = recomputeGrid(newData);
                setData(recomputed);
            }
            return;
        }

        if (next.r !== activeCell.r || next.c !== activeCell.c) {
            e.preventDefault();
            setActiveCell(next);
            if (e.shiftKey && selection) {
                // Extend selection
                setSelection({ ...selection, endR: next.r, endC: next.c });
            } else {
                // Reset selection
                setSelection({ startR: next.r, startC: next.c, endR: next.r, endC: next.c });
            }
            
            // Scroll into view logic could go here
        }
    };

    // Mouse Selection
    const handleMouseDown = (r: number, c: number, e: React.MouseEvent) => {
        if (e.button !== 0) return; // Only left click
        setIsDragging(true);
        setActiveCell({ r, c });
        setSelection({ startR: r, startC: c, endR: r, endC: c });
        if (editing) commitEdit();
    };

    const handleMouseEnter = (r: number, c: number) => {
        if (isDragging && selection) {
            setSelection({ ...selection, endR: r, endC: c });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // Formatting
    const applyStyle = (key: keyof CellStyle, value: any) => {
        if (!selection) return;
        const newData = [...data];
        const rStart = Math.min(selection.startR, selection.endR);
        const rEnd = Math.max(selection.startR, selection.endR);
        const cStart = Math.min(selection.startC, selection.endC);
        const cEnd = Math.max(selection.startC, selection.endC);

        for (let r = rStart; r <= rEnd; r++) {
            newData[r] = [...newData[r]];
            for (let c = cStart; c <= cEnd; c++) {
                const currentStyle = newData[r][c].style || {};
                // Toggle boolean styles if value not provided, else set value
                let newValue = value;
                if (typeof value === 'boolean' && value === true) { 
                     // Logic for toggle buttons passed as true/false usually requires checking current state
                     // Simplified: just set it
                }
                
                newData[r][c] = {
                    ...newData[r][c],
                    style: { ...currentStyle, [key]: value }
                };
            }
        }
        setData(newData);
    };
    
    const addRow = () => {
        setData(prev => [...prev, Array.from({ length: prev[0].length }, () => ({ value: '', computed: '' }))]);
    };
    
    const addCol = () => {
        setData(prev => prev.map(row => [...row, { value: '', computed: '' }]));
    };

    // Populate Initial Demo Data if empty
    useEffect(() => {
        if (data[1][1].value === '') {
             const newData = [...data];
             const set = (r: number, c: number, val: string, style: CellStyle = {}) => {
                 newData[r][c] = { value: val, computed: val, style };
             };
             
             set(0, 0, 'PRODUCT', { bold: true, bg: '#f1f5f9', align: 'center' });
             set(0, 1, 'Q1', { bold: true, bg: '#f1f5f9', align: 'center' });
             set(0, 2, 'Q2', { bold: true, bg: '#f1f5f9', align: 'center' });
             set(0, 3, 'GROWTH', { bold: true, bg: '#f1f5f9', align: 'center' });

             set(1, 0, 'Widgets', { bold: true });
             set(1, 1, '5000', { align: 'right' });
             set(1, 2, '6200', { align: 'right' });
             set(1, 3, '=(C2-B2)/B2', { align: 'right', color: 'green' }); // TODO: Percentage formatting support in future

             set(2, 0, 'Gadgets', { bold: true });
             set(2, 1, '3200', { align: 'right' });
             set(2, 2, '2800', { align: 'right' });
             set(2, 3, '=(C3-B3)/B3', { align: 'right', color: 'red' });

             set(3, 0, 'Total', { bold: true, bg: '#e2e8f0' });
             set(3, 1, '=SUM(B2:B3)', { bold: true, bg: '#e2e8f0', align: 'right' });
             set(3, 2, '=SUM(C2:C3)', { bold: true, bg: '#e2e8f0', align: 'right' });
             set(3, 3, '', { bg: '#e2e8f0' });

             setData(recomputeGrid(newData));
        }
    }, []);

    // Stats Calculation
    const getStats = () => {
        if (!selection) return null;
        const rStart = Math.min(selection.startR, selection.endR);
        const rEnd = Math.max(selection.startR, selection.endR);
        const cStart = Math.min(selection.startC, selection.endC);
        const cEnd = Math.max(selection.startC, selection.endC);
        
        let sum = 0;
        let count = 0;
        let numericCount = 0;
        
        for (let r = rStart; r <= rEnd; r++) {
            for (let c = cStart; c <= cEnd; c++) {
                if (data[r] && data[r][c] && data[r][c].computed !== '') {
                    count++;
                    const val = parseFloat(data[r][c].computed);
                    if (!isNaN(val)) {
                        sum += val;
                        numericCount++;
                    }
                }
            }
        }
        return { sum, count, avg: numericCount ? (sum / numericCount).toFixed(2) : 0 };
    };
    
    const stats = getStats();

    return (
        <div className="flex flex-col h-screen max-h-[800px] select-none outline-none" onMouseUp={handleMouseUp} tabIndex={0} onKeyDown={handleKeyDown}>
            <LivePreview>
                <div className="flex flex-col h-[600px] border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-950 shadow-xl overflow-hidden">
                    
                    {/* 1. Toolbar */}
                    <div className="flex items-center gap-2 p-2 border-b border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
                        <div className="flex rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 shadow-sm">
                            <button onClick={() => applyStyle('bold', true)} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300" title="Bold">
                                <BoldIcon className="w-4 h-4" />
                            </button>
                            <button onClick={() => applyStyle('italic', true)} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border-l border-slate-300 dark:border-slate-700" title="Italic">
                                <ItalicIcon className="w-4 h-4" />
                            </button>
                        </div>
                        
                        <div className="w-px h-6 bg-slate-300 dark:bg-slate-700"></div>
                        
                        <div className="flex rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 shadow-sm">
                            <button onClick={() => applyStyle('align', 'left')} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300" title="Align Left"><AlignLeftIcon className="w-4 h-4" /></button>
                            <button onClick={() => applyStyle('align', 'center')} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border-l border-slate-300 dark:border-slate-700" title="Align Center"><AlignCenterIcon className="w-4 h-4" /></button>
                            <button onClick={() => applyStyle('align', 'right')} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border-l border-slate-300 dark:border-slate-700" title="Align Right"><AlignRightIcon className="w-4 h-4" /></button>
                        </div>

                        <div className="w-px h-6 bg-slate-300 dark:bg-slate-700"></div>
                        
                        {/* Colors */}
                        <div className="flex gap-1">
                             <button onClick={() => applyStyle('color', '#ef4444')} className="w-6 h-6 rounded-full bg-red-500 border border-white dark:border-slate-700 shadow-sm"></button>
                             <button onClick={() => applyStyle('color', '#3b82f6')} className="w-6 h-6 rounded-full bg-blue-500 border border-white dark:border-slate-700 shadow-sm"></button>
                             <button onClick={() => applyStyle('color', '#10b981')} className="w-6 h-6 rounded-full bg-emerald-500 border border-white dark:border-slate-700 shadow-sm"></button>
                             <button onClick={() => applyStyle('bg', '#fef3c7')} className="w-6 h-6 rounded-full bg-amber-100 border border-white dark:border-slate-700 shadow-sm" title="Highlight Yellow"></button>
                             <button onClick={() => applyStyle('bg', undefined)} className="w-6 h-6 rounded-full bg-white border border-slate-300 dark:border-slate-700 flex items-center justify-center text-red-500 text-[10px]" title="Clear Fill">✕</button>
                        </div>

                        <div className="flex-1"></div>

                        <button onClick={addRow} className="flex items-center px-2 py-1 text-xs font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-700">
                            <PlusIcon className="w-3 h-3 mr-1" /> Row
                        </button>
                        <button onClick={addCol} className="flex items-center px-2 py-1 text-xs font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-700">
                            <PlusIcon className="w-3 h-3 mr-1" /> Col
                        </button>
                    </div>

                    {/* 2. Formula Bar */}
                    <div className="flex items-center px-2 py-1 border-b border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950">
                        <div className="w-10 text-center text-xs font-bold text-slate-500 border-r border-slate-300 dark:border-slate-700 mr-2">
                             {activeCell ? `${getColLabel(activeCell.c)}${activeCell.r + 1}` : ''}
                        </div>
                        <span className="text-slate-400 dark:text-slate-600 font-serif italic mr-2">fx</span>
                        <input 
                            className="flex-1 bg-transparent outline-none text-sm text-slate-800 dark:text-slate-200"
                            value={activeCell ? (editing ? editValue : data[activeCell.r][activeCell.c].value) : ''}
                            onChange={(e) => {
                                if (activeCell) {
                                    if (!editing) startEdit();
                                    setEditValue(e.target.value);
                                }
                            }}
                            onKeyDown={(e) => { if (e.key === 'Enter') commitEdit(); }}
                            disabled={!activeCell}
                        />
                    </div>

                    {/* 3. Grid Area */}
                    <div className="flex-1 overflow-auto bg-slate-100 dark:bg-slate-900 relative" ref={gridRef}>
                        <table className="border-collapse w-full table-fixed">
                            <thead className="sticky top-0 z-20">
                                <tr>
                                    <th className="w-10 h-8 bg-slate-100 dark:bg-slate-800 border-b border-r border-slate-300 dark:border-slate-700"></th>
                                    {data[0].map((_, index) => (
                                        <th key={index} className={`w-24 h-8 bg-slate-100 dark:bg-slate-800 border-b border-r border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-500 ${activeCell?.c === index ? 'bg-slate-200 dark:bg-slate-700 text-sky-600' : ''}`}>
                                            {getColLabel(index)}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((row, rIndex) => (
                                    <tr key={rIndex}>
                                        <td className={`sticky left-0 z-10 w-10 h-8 bg-slate-100 dark:bg-slate-800 border-b border-r border-slate-300 dark:border-slate-700 text-center text-xs font-bold text-slate-500 ${activeCell?.r === rIndex ? 'bg-slate-200 dark:bg-slate-700 text-sky-600' : ''}`}>
                                            {rIndex + 1}
                                        </td>
                                        {row.map((cell, cIndex) => {
                                            // Selection Logic
                                            let isSelected = false;
                                            let isTop = false, isBottom = false, isLeft = false, isRight = false;
                                            
                                            if (selection) {
                                                const rMin = Math.min(selection.startR, selection.endR);
                                                const rMax = Math.max(selection.startR, selection.endR);
                                                const cMin = Math.min(selection.startC, selection.endC);
                                                const cMax = Math.max(selection.startC, selection.endC);
                                                
                                                if (rIndex >= rMin && rIndex <= rMax && cIndex >= cMin && cIndex <= cMax) {
                                                    isSelected = true;
                                                    if (rIndex === rMin) isTop = true;
                                                    if (rIndex === rMax) isBottom = true;
                                                    if (cIndex === cMin) isLeft = true;
                                                    if (cIndex === cMax) isRight = true;
                                                }
                                            }

                                            const isActive = activeCell?.r === rIndex && activeCell?.c === cIndex;

                                            return (
                                                <td
                                                    key={`${rIndex}-${cIndex}`}
                                                    onMouseDown={(e) => handleMouseDown(rIndex, cIndex, e)}
                                                    onMouseEnter={() => handleMouseEnter(rIndex, cIndex)}
                                                    onDoubleClick={startEdit}
                                                    className={`
                                                        relative border border-slate-300 dark:border-slate-700 h-8 px-1 text-sm whitespace-nowrap cursor-cell
                                                        ${isSelected ? 'bg-sky-100/50 dark:bg-sky-900/30' : 'bg-white dark:bg-slate-950'}
                                                        ${isTop ? 'border-t-2 border-t-sky-500' : ''}
                                                        ${isBottom ? 'border-b-2 border-b-sky-500' : ''}
                                                        ${isLeft ? 'border-l-2 border-l-sky-500' : ''}
                                                        ${isRight ? 'border-r-2 border-r-sky-500' : ''}
                                                    `}
                                                    style={{
                                                        textAlign: cell.style?.align || 'left',
                                                        fontWeight: cell.style?.bold ? 'bold' : 'normal',
                                                        fontStyle: cell.style?.italic ? 'italic' : 'normal',
                                                        color: cell.style?.color,
                                                        backgroundColor: isSelected ? undefined : cell.style?.bg
                                                    }}
                                                >
                                                    {isActive && editing ? (
                                                        <input
                                                            ref={inputRef}
                                                            className="absolute inset-0 w-full h-full border-2 border-sky-500 outline-none px-1 text-sm z-50"
                                                            value={editValue}
                                                            onChange={(e) => setEditValue(e.target.value)}
                                                            onBlur={commitEdit}
                                                            autoFocus
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center overflow-hidden">
                                                            {cell.computed}
                                                        </div>
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* 4. Status Bar */}
                    <div className="flex justify-end gap-6 px-4 py-1 bg-slate-50 dark:bg-slate-900 border-t border-slate-300 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400 font-medium">
                        {stats && (
                            <>
                                <span>AVG: {stats.avg}</span>
                                <span>COUNT: {stats.count}</span>
                                <span>SUM: {stats.sum}</span>
                            </>
                        )}
                        {!stats && <span>Ready</span>}
                    </div>
                </div>
            </LivePreview>

            <TechnicalOverview
                library="React Spreadsheet"
                officialName="iddan/react-spreadsheet"
                githubUrl="https://github.com/iddan/react-spreadsheet"
                description="A feature-rich spreadsheet component built from scratch to demonstrate complex state management in React. It includes a custom formula parser, range selection engine, and dynamic styling capabilities similar to Excel or Google Sheets."
                features={[
                    "Advanced Formula Engine (SUM, AVG, MAX, MIN, References).",
                    "Multi-cell Range Selection with drag support.",
                    "Rich Text Formatting (Bold, Italic, Color, Bg, Align).",
                    "Dynamic Grid Structure (Add Rows/Cols)."
                ]}
                installation="npm install react-spreadsheet"
                usage={`// This demo implements the grid logic from scratch.\n// For production, consider libraries like Handsontable or AG Grid.`}
            />
        </div>
    );
};

export default SpreadsheetDemo;
