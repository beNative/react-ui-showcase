
import React, { useState } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';
import { RocketLaunchIcon, DocumentTextIcon, PhotoIcon, UserCircleIcon, CloseIcon } from './Icons';

const SpeedDialDemo: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const actions = [
        { icon: <DocumentTextIcon className="w-5 h-5" />, label: 'New Post', delay: '100ms' },
        { icon: <PhotoIcon className="w-5 h-5" />, label: 'Upload Photo', delay: '50ms' },
        { icon: <UserCircleIcon className="w-5 h-5" />, label: 'Add Contact', delay: '0ms' },
    ];

    return (
        <div>
            <LivePreview>
                <div className="relative h-80 w-full bg-slate-900 rounded-lg border border-slate-800 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-slate-700 text-sm">
                        Application Content...
                    </div>

                    <div className="absolute bottom-6 right-6 flex flex-col items-end space-y-4">
                        {/* Actions */}
                        <div className={`flex flex-col items-end space-y-3 transition-all duration-200 ${isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                            {actions.map((action, index) => (
                                <div key={index} className="flex items-center group" style={{ transitionDelay: isOpen ? action.delay : '0ms' }}>
                                    <span className="mr-3 px-2 py-1 bg-slate-800 text-slate-200 text-xs rounded shadow border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        {action.label}
                                    </span>
                                    <button className="w-10 h-10 rounded-full bg-slate-700 text-slate-200 hover:bg-slate-600 shadow-lg flex items-center justify-center transition-colors border border-slate-600">
                                        {action.icon}
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* FAB */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-white transition-all duration-300 z-10 ${isOpen ? 'bg-slate-600 rotate-45' : 'bg-sky-600 hover:bg-sky-500 rotate-0'}`}
                        >
                            {isOpen ? <CloseIcon className="w-6 h-6" /> : <RocketLaunchIcon className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </LivePreview>
            <TechnicalOverview
                library="MUI Speed Dial"
                officialName="mui/material-ui"
                githubUrl="https://mui.com/material-ui/react-speed-dial/"
                description="A Speed Dial is a floating action button that expands to display related actions. It allows quick access to multiple primary actions without cluttering the interface."
                features={[
                    "Floating action button (FAB) trigger.",
                    "Transition effects for revealing actions.",
                    "Label support for actions.",
                    "Configurable direction (up, down, left, right)."
                ]}
                installation="npm install @mui/material"
                usage={`import SpeedDial from '@mui/material/SpeedDial';\nimport SpeedDialAction from '@mui/material/SpeedDialAction';\n\n<SpeedDial ariaLabel="SpeedDial basic example" icon={<SpeedDialIcon />}>\n  {actions.map((action) => (\n    <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} />\n  ))}\n</SpeedDial>`}
            />
        </div>
    );
};

export default SpeedDialDemo;
