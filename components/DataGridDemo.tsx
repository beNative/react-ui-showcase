
import React, { useState, useMemo, useEffect } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon, CheckIcon } from './Icons';

// Initial Mock Data
const initialData = [
    { id: 1, name: 'Alice', age: 30, city: 'New York' },
    { id: 2, name: 'Bob', age: 25, city: 'Los Angeles' },
    { id: 3, name: 'Charlie', age: 35, city: 'Chicago' },
    { id: 4, name: 'Diana', age: 28, city: 'Houston' },
    { id: 5, name: 'Ethan', age: 40, city: 'Phoenix' },
    { id: 6, name: 'Fiona', age: 22, city: 'Philadelphia' },
    { id: 7, name: 'George', age: 33, city: 'San Antonio' },
    { id: 8, name: 'Hannah', age: 29, city: 'San Diego' },
    { id: 9, name: 'Ian', age: 45, city: 'Dallas' },
    { id: 10, name: 'Jane', age: 27, city: 'San Jose' },
];

type DataItem = typeof initialData[0];
type SortKey = keyof DataItem;
type SortOrder = 'asc' | 'desc';

const DataGridDemo: React.FC = () => {
    const [data, setData] = useState(initialData);
    const [sortKey, setSortKey] = useState<SortKey>('id');
    const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [isStriped, setIsStriped] = useState(false);
    const [isCompact, setIsCompact] = useState(false);
    const [isBordered, setIsBordered] = useState(true);
    
    // New Features State
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
    const [visibleColumns, setVisibleColumns] = useState<Record<SortKey, boolean>>({
        id: true,
        name: true,
        age: true,
        city: true
    });
    const [showColumnMenu, setShowColumnMenu] = useState(false);
    const [editingCell, setEditingCell] = useState<{ id: number, field: SortKey } | null>(null);
    const [editValue, setEditValue] = useState('');

    const itemsPerPage = 5;

    // 1. Filter Data
    const filteredData = useMemo(() => {
        if (!searchQuery) return data;
        const lowerQuery = searchQuery.toLowerCase();
        return data.filter(item => 
            Object.values(item).some(val => 
                String(val).toLowerCase().includes(lowerQuery)
            )
        );
    }, [data, searchQuery]);

    // 2. Sort Data
    const sortedData = useMemo(() => {
        return [...filteredData].sort((a, b) => {
            const valA = a[sortKey];
            const valB = b[sortKey];
            if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
            if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
    }, [filteredData, sortKey, sortOrder]);
    
    // 3. Paginate Data
    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return sortedData.slice(startIndex, startIndex + itemsPerPage);
    }, [currentPage, sortedData]);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    // Reset pagination when filtering
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    // Handlers
    const handleSort = (key: SortKey) => {
        if (sortKey === key) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortOrder('asc');
        }
    };

    const toggleSelectAll = () => {
        if (selectedRows.size === paginatedData.length) {
            setSelectedRows(new Set());
        } else {
            const newSelected = new Set(selectedRows);
            paginatedData.forEach(item => newSelected.add(item.id));
            setSelectedRows(newSelected);
        }
    };

    const toggleSelectRow = (id: number) => {
        const newSelected = new Set(selectedRows);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedRows(newSelected);
    };

    const startEditing = (id: number, field: SortKey, value: any) => {
        if (field === 'id') return; // ID is not editable
        setEditingCell({ id, field });
        setEditValue(String(value));
    };

    const saveEdit = () => {
        if (editingCell) {
            setData(prev => prev.map(item => {
                if (item.id === editingCell.id) {
                    return { 
                        ...item, 
                        [editingCell.field]: isNaN(Number(editValue)) ? editValue : Number(editValue) 
                    };
                }
                return item;
            }));
            setEditingCell(null);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') saveEdit();
        if (e.key === 'Escape') setEditingCell(null);
    };

    const SortIcon: React.FC<{ columnKey: SortKey }> = ({ columnKey }) => {
        if (sortKey !== columnKey) return <svg className="w-4 h-4 text-slate-400 dark:text-slate-500 inline-block ml-1 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" /></svg>;
        if (sortOrder === 'asc') return <svg className="w-4 h-4 inline-block ml-1 text-sky-600 dark:text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>;
        return <svg className="w-4 h-4 inline-block ml-1 text-sky-600 dark:text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>;
    };

    return (
        <div>
            <LivePreview>
                <div className="grid grid-cols-1 gap-8">
                    <div>
                        {/* Toolbar */}
                        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                            <div className="relative w-full sm:w-64">
                                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input 
                                    type="text" 
                                    placeholder="Search..." 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md focus:ring-2 focus:ring-sky-500 outline-none transition-colors"
                                />
                            </div>
                            <div className="relative">
                                <button 
                                    onClick={() => setShowColumnMenu(!showColumnMenu)}
                                    className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                >
                                    <AdjustmentsHorizontalIcon className="w-4 h-4" />
                                    <span>Columns</span>
                                </button>
                                {showColumnMenu && (
                                    <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md shadow-lg z-20 p-2">
                                        {(Object.keys(visibleColumns) as SortKey[]).map(key => (
                                            <label key={key} className="flex items-center px-2 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded cursor-pointer">
                                                <input 
                                                    type="checkbox" 
                                                    checked={visibleColumns[key]} 
                                                    onChange={() => setVisibleColumns(prev => ({ ...prev, [key]: !prev[key] }))}
                                                    className="rounded border-slate-300 text-sky-600 focus:ring-sky-500 mr-2"
                                                />
                                                <span className="text-sm text-slate-700 dark:text-slate-200 capitalize">{key}</span>
                                            </label>
                                        ))}
                                    </div>
                                )}
                                {/* Backdrop to close menu */}
                                {showColumnMenu && <div className="fixed inset-0 z-10" onClick={() => setShowColumnMenu(false)}></div>}
                            </div>
                        </div>

                        <div className={`overflow-hidden rounded-lg ${isBordered ? 'border border-slate-200 dark:border-slate-700' : ''}`}>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left text-slate-600 dark:text-slate-400">
                                    <thead className="text-xs text-slate-700 dark:text-slate-300 uppercase bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                                        <tr>
                                            <th scope="col" className="p-4 w-4">
                                                <div className="flex items-center">
                                                    <input 
                                                        type="checkbox" 
                                                        checked={paginatedData.length > 0 && paginatedData.every(item => selectedRows.has(item.id))}
                                                        onChange={toggleSelectAll}
                                                        className="w-4 h-4 text-sky-600 bg-gray-100 border-gray-300 rounded focus:ring-sky-500 dark:focus:ring-sky-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                                                    />
                                                </div>
                                            </th>
                                            {(Object.keys(visibleColumns) as SortKey[]).filter(key => visibleColumns[key]).map(key => (
                                                <th key={key} scope="col" className={`${isCompact ? 'px-4 py-2' : 'px-6 py-3'} cursor-pointer select-none hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group`} onClick={() => handleSort(key)}>
                                                    <div className="flex items-center">
                                                        {key} <SortIcon columnKey={key} />
                                                    </div>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginatedData.length > 0 ? (
                                            paginatedData.map((item, idx) => {
                                                const isSelected = selectedRows.has(item.id);
                                                return (
                                                    <tr key={item.id} className={`
                                                        border-b border-slate-200 dark:border-slate-800 last:border-0 transition-colors
                                                        ${isSelected ? 'bg-sky-50 dark:bg-sky-900/20' : (isStriped && idx % 2 === 1 ? 'bg-slate-50 dark:bg-slate-800/30' : 'bg-white dark:bg-slate-900')}
                                                        hover:bg-slate-100 dark:hover:bg-slate-800
                                                    `}>
                                                        <td className="w-4 p-4">
                                                            <div className="flex items-center">
                                                                <input 
                                                                    type="checkbox" 
                                                                    checked={isSelected}
                                                                    onChange={() => toggleSelectRow(item.id)}
                                                                    className="w-4 h-4 text-sky-600 bg-gray-100 border-gray-300 rounded focus:ring-sky-500 dark:focus:ring-sky-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                                                                />
                                                            </div>
                                                        </td>
                                                        {(Object.keys(visibleColumns) as SortKey[]).filter(key => visibleColumns[key]).map(key => (
                                                            <td 
                                                                key={key} 
                                                                className={`${isCompact ? 'px-4 py-2' : 'px-6 py-4'} ${key !== 'id' ? 'cursor-pointer hover:text-sky-600 dark:hover:text-sky-400' : ''}`}
                                                                onClick={() => startEditing(item.id, key, item[key])}
                                                                title={key !== 'id' ? "Click to edit" : ""}
                                                            >
                                                                {editingCell?.id === item.id && editingCell?.field === key ? (
                                                                    <div className="relative">
                                                                        <input 
                                                                            type="text" 
                                                                            value={editValue}
                                                                            onChange={(e) => setEditValue(e.target.value)}
                                                                            onBlur={saveEdit}
                                                                            onKeyDown={handleKeyDown}
                                                                            autoFocus
                                                                            className="w-full bg-white dark:bg-slate-950 border border-sky-500 rounded px-2 py-1 text-sm -ml-2 -my-1 shadow-sm outline-none"
                                                                        />
                                                                        <CheckIcon className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-sky-500 pointer-events-none" />
                                                                    </div>
                                                                ) : (
                                                                    <span className={`${key === 'id' ? 'font-medium text-slate-900 dark:text-slate-200' : ''} ${key === 'age' ? 'font-mono' : ''}`}>
                                                                        {item[key]}
                                                                    </span>
                                                                )}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <tr>
                                                <td colSpan={Object.values(visibleColumns).filter(Boolean).length + 1} className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">
                                                    No results found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                        {/* Pagination */}
                        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 px-2 gap-4">
                            <span className="text-sm text-slate-600 dark:text-slate-400">
                                Showing <span className="font-semibold text-slate-900 dark:text-slate-200">{paginatedData.length}</span> of <span className="font-semibold text-slate-900 dark:text-slate-200">{filteredData.length}</span> results
                                {selectedRows.size > 0 && <span className="ml-2 text-sky-600">({selectedRows.size} selected)</span>}
                            </span>
                            <div className="inline-flex mt-2 xs:mt-0">
                                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-white bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-l hover:bg-slate-50 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                                    Prev
                                </button>
                                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages || totalPages === 0} className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-white bg-white dark:bg-slate-700 border border-l-0 border-slate-300 dark:border-slate-600 rounded-r hover:bg-slate-50 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Configuration */}
                    <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 space-y-4">
                        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Configuration</h3>
                        <div className="flex flex-wrap gap-6">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={isStriped} 
                                    onChange={(e) => setIsStriped(e.target.checked)}
                                    className="form-checkbox h-4 w-4 text-sky-600 rounded border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-sky-500"
                                />
                                <span className="text-sm text-slate-700 dark:text-slate-300">Striped Rows</span>
                            </label>
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={isCompact} 
                                    onChange={(e) => setIsCompact(e.target.checked)}
                                    className="form-checkbox h-4 w-4 text-sky-600 rounded border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-sky-500"
                                />
                                <span className="text-sm text-slate-700 dark:text-slate-300">Compact Mode</span>
                            </label>
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={isBordered} 
                                    onChange={(e) => setIsBordered(e.target.checked)}
                                    className="form-checkbox h-4 w-4 text-sky-600 rounded border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-sky-500"
                                />
                                <span className="text-sm text-slate-700 dark:text-slate-300">Bordered</span>
                            </label>
                        </div>
                    </div>
                </div>
            </LivePreview>
            <TechnicalOverview
                library="TanStack Table / AG Grid"
                officialName="TanStack/table"
                githubUrl="https://github.com/TanStack/table"
                description="Data grids are powerful components for displaying and interacting with large, complex datasets. They typically include features like sorting, filtering, pagination, and in-place editing."
                features={[
                    "High performance with virtualization for large datasets",
                    "Declarative API for defining columns and data",
                    "Headless core for full styling control (TanStack Table)",
                    "Rich feature set including pivoting and aggregation (AG Grid)"
                ]}
                installation="npm install @tanstack/react-table"
                usage={`import { useReactTable, getCoreRowModel } from '@tanstack/react-table';\n\nconst table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });`}
            />
        </div>
    );
};
export default DataGridDemo;
