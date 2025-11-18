
import React, { useState } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';
import { TableCellsIcon } from './Icons';

const SpreadsheetDemo: React.FC = () => {
    const rows = 10;
    const cols = 6;
    const colHeaders = ['A', 'B', 'C', 'D', 'E', 'F'];

    // Initial data
    const initialGrid = Array.from({ length: rows }, () => Array(cols).fill(''));
    initialGrid[0][0] = 'Item';
    initialGrid[0][1] = 'Cost';
    initialGrid[0][2] = 'Qty';
    initialGrid[0][3] = 'Total';
    initialGrid[1][0] = 'Apple';
    initialGrid[1][1] = '1.50';
    initialGrid[1][2] = '10';
    initialGrid[1][3] = '15.00';

    const [grid, setGrid] = useState(initialGrid);
    const [selectedCell, setSelectedCell] = useState<{r: number, c: number} | null>(null);

    const handleChange = (r: number, c: number, value: string) => {
        const newGrid = [...grid];
        newGrid[r] = [...newGrid[r]];
        newGrid[r][c] = value;
        setGrid(newGrid);
    };

    return (
        <div>
            <LivePreview>
                <div className="w-full overflow-x-auto rounded-lg border border-slate-300 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-900">
                    <table className="w-full border-collapse text-sm">
                        <thead>
                            <tr>
                                <th className="w-10 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"></th>
                                {colHeaders.map((h, i) => (
                                    <th key={i} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 px-2 py-1 font-normal text-slate-500 dark:text-slate-400 select-none">
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {grid.map((row, r) => (
                                <tr key={r}>
                                    <td className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-center text-xs text-slate-500 dark:text-slate-400 select-none">
                                        {r + 1}
                                    </td>
                                    {row.map((cell, c) => (
                                        <td key={`${r}-${c}`} className="border border-slate-300 dark:border-slate-700 p-0 relative">
                                            <input
                                                className={`w-full h-full px-2 py-1 outline-none bg-transparent ${selectedCell?.r === r && selectedCell?.c === c ? 'ring-2 ring-sky-500 z-10 relative' : ''}`}
                                                value={cell}
                                                onChange={(e) => handleChange(r, c, e.target.value)}
                                                onFocus={() => setSelectedCell({ r, c })}
                                                onBlur={() => setSelectedCell(null)}
                                            />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </LivePreview>
            <TechnicalOverview
                library="react-spreadsheet / Handsontable"
                officialName="iddan/react-spreadsheet"
                githubUrl="https://github.com/iddan/react-spreadsheet"
                description="A spreadsheet component provides an Excel-like grid for editing tabular data. It supports features like cell selection, formulas, and keyboard navigation."
                features={[
                    "Virtual rendering for performance.",
                    "Keyboard navigation (arrows, tab, enter).",
                    "Formula support.",
                    "Custom cell renderers."
                ]}
                installation="npm install react-spreadsheet"
                usage={`import Spreadsheet from "react-spreadsheet";\n\n<Spreadsheet data={data} onChange={setData} />`}
            />
        </div>
    );
};

export default SpreadsheetDemo;
