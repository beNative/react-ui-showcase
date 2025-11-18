
import React, { useState, useMemo } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';

// Mock Data
const mockData = [
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

type DataItem = typeof mockData[0];
type SortKey = keyof DataItem;
type SortOrder = 'asc' | 'desc';

const DataGridDemo: React.FC = () => {
    const [sortKey, setSortKey] = useState<SortKey>('id');
    const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [isStriped, setIsStriped] = useState(false);
    const [isCompact, setIsCompact] = useState(false);
    const [isBordered, setIsBordered] = useState(true);

    const itemsPerPage = 5;

    const sortedData = useMemo(() => {
        return [...mockData].sort((a, b) => {
            const valA = a[sortKey];
            const valB = b[sortKey];
            if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
            if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
    }, [sortKey, sortOrder]);
    
    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return sortedData.slice(startIndex, startIndex + itemsPerPage);
    }, [currentPage, sortedData]);

    const totalPages = Math.ceil(mockData.length / itemsPerPage);

    const handleSort = (key: SortKey) => {
        if (sortKey === key) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortOrder('asc');
        }
    };
    
    const SortIcon: React.FC<{ columnKey: SortKey }> = ({ columnKey }) => {
        if (sortKey !== columnKey) return <svg className="w-4 h-4 text-slate-400 dark:text-slate-500 inline-block ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" /></svg>;
        if (sortOrder === 'asc') return <svg className="w-4 h-4 inline-block ml-1 text-sky-600 dark:text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>;
        return <svg className="w-4 h-4 inline-block ml-1 text-sky-600 dark:text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>;
    };

    return (
        <div>
            <LivePreview>
                <div className="grid grid-cols-1 gap-8">
                    <div>
                        <div className={`overflow-hidden rounded-lg ${isBordered ? 'border border-slate-200 dark:border-slate-700' : ''}`}>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left text-slate-600 dark:text-slate-400">
                                    <thead className="text-xs text-slate-700 dark:text-slate-300 uppercase bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                                        <tr>
                                            {(Object.keys(mockData[0]) as SortKey[]).map(key => (
                                                <th key={key} scope="col" className={`${isCompact ? 'px-4 py-2' : 'px-6 py-3'} cursor-pointer select-none hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors`} onClick={() => handleSort(key)}>
                                                    {key} <SortIcon columnKey={key} />
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginatedData.map((item, idx) => (
                                            <tr key={item.id} className={`
                                                border-b border-slate-200 dark:border-slate-800 last:border-0 transition-colors
                                                ${isStriped && idx % 2 === 1 ? 'bg-slate-50 dark:bg-slate-800/30' : 'bg-white dark:bg-slate-900'}
                                                hover:bg-slate-50 dark:hover:bg-slate-800/50
                                            `}>
                                                <td className={`${isCompact ? 'px-4 py-2' : 'px-6 py-4'} font-medium text-slate-900 dark:text-slate-200`}>{item.id}</td>
                                                <td className={`${isCompact ? 'px-4 py-2' : 'px-6 py-4'} text-slate-700 dark:text-slate-300`}>{item.name}</td>
                                                <td className={`${isCompact ? 'px-4 py-2' : 'px-6 py-4'}`}>{item.age}</td>
                                                <td className={`${isCompact ? 'px-4 py-2' : 'px-6 py-4'}`}>{item.city}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="flex justify-between items-center mt-4 px-2">
                            <span className="text-sm text-slate-600 dark:text-slate-400">Page {currentPage} of {totalPages}</span>
                            <div className="inline-flex mt-2 xs:mt-0">
                                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-white bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-l hover:bg-slate-50 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                                    Prev
                                </button>
                                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-white bg-white dark:bg-slate-700 border border-l-0 border-slate-300 dark:border-slate-600 rounded-r hover:bg-slate-50 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
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
