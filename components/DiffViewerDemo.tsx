
import React from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';

const oldCode = `function add(a, b) {
  return a + b;
}

console.log(add(2, 3));`;

const newCode = `function add(a, b) {
  // Adding two numbers
  const sum = a + b;
  return sum;
}

console.log(add(5, 10));`;

const DiffViewerDemo: React.FC = () => {
    // Naive line-by-line diff for visual demo
    const renderDiff = () => {
        const oldLines = oldCode.split('\n');
        const newLines = newCode.split('\n');
        const maxLines = Math.max(oldLines.length, newLines.length);

        const rows = [];
        for (let i = 0; i < maxLines; i++) {
            const oldLine = oldLines[i] || '';
            const newLine = newLines[i] || '';
            
            let type = 'unchanged';
            if (oldLine !== newLine) type = 'modified';
            if (!oldLine && newLine) type = 'added';
            if (oldLine && !newLine) type = 'removed';

            rows.push(
                <div key={i} className="grid grid-cols-2 text-xs font-mono border-b border-slate-800 last:border-0">
                    <div className={`p-1 px-2 whitespace-pre ${type === 'modified' || type === 'removed' ? 'bg-red-900/20 text-red-200' : 'text-slate-400'}`}>
                        <span className="inline-block w-6 text-slate-600 select-none">{i + 1}</span>
                        {oldLine}
                    </div>
                    <div className={`p-1 px-2 whitespace-pre border-l border-slate-800 ${type === 'modified' || type === 'added' ? 'bg-green-900/20 text-green-200' : 'text-slate-400'}`}>
                        <span className="inline-block w-6 text-slate-600 select-none">{i + 1}</span>
                        {newLine}
                    </div>
                </div>
            );
        }
        return rows;
    };

    return (
        <div>
            <LivePreview>
                <div className="w-full bg-slate-950 rounded-lg border border-slate-800 overflow-hidden">
                    <div className="flex bg-slate-900 border-b border-slate-800 text-xs text-slate-400 font-medium">
                        <div className="flex-1 p-2 text-center border-r border-slate-800">Original</div>
                        <div className="flex-1 p-2 text-center">Modified</div>
                    </div>
                    <div className="overflow-x-auto">
                        <div className="min-w-[500px]">
                             {renderDiff()}
                        </div>
                    </div>
                </div>
            </LivePreview>
            <TechnicalOverview
                library="Monaco Diff Editor / react-diff-viewer"
                officialName="praneshr/react-diff-viewer"
                githubUrl="https://github.com/praneshr/react-diff-viewer"
                description="A diff viewer component visualizes changes between two versions of text or code. It highlights additions and deletions, usually in a split-view or unified format."
                features={[
                    "Split (side-by-side) or Unified view.",
                    "Syntax highlighting.",
                    "Word-level diffing.",
                    "Line number alignment."
                ]}
                installation="npm install react-diff-viewer"
                usage={`import ReactDiffViewer from 'react-diff-viewer';\n\n<ReactDiffViewer oldValue={oldCode} newValue={newCode} splitView={true} />`}
            />
        </div>
    );
};

export default DiffViewerDemo;
