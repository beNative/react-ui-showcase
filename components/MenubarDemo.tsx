
import React, { useState, useRef, useEffect } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';
import { ChevronRightIcon, CheckIcon } from '@heroicons/react/20/solid'; // Assuming we can use heroicons or similar

const Check: React.FC<{ checked: boolean }> = ({ checked }) => (
    <span className="w-4 flex items-center justify-center mr-2">
        {checked && <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7" /></svg>}
    </span>
);

const MenubarItem: React.FC<{ label: string; shortcut?: string; onClick?: () => void; disabled?: boolean }> = ({ label, shortcut, onClick, disabled }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`w-full text-left px-3 py-1.5 text-sm flex items-center justify-between rounded group ${disabled ? 'opacity-50 cursor-default' : 'hover:bg-sky-600 hover:text-white text-slate-300'}`}
    >
        <div className="flex items-center">
            <span className="w-4 mr-2"></span>
            {label}
        </div>
        {shortcut && <span className={`text-xs ml-4 ${disabled ? '' : 'text-slate-500 group-hover:text-sky-100'}`}>{shortcut}</span>}
    </button>
);

const MenubarCheckboxItem: React.FC<{ label: string; checked: boolean; onChange: () => void }> = ({ label, checked, onChange }) => (
    <button
        onClick={onChange}
        className="w-full text-left px-3 py-1.5 text-sm flex items-center rounded hover:bg-sky-600 hover:text-white text-slate-300"
    >
        <Check checked={checked} />
        {label}
    </button>
);

const MenubarMenu: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`px-3 py-1 text-sm font-medium rounded hover:bg-slate-700 transition-colors ${isOpen ? 'bg-slate-700 text-white' : 'text-slate-300'}`}
            >
                {label}
            </button>
            {isOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-slate-800 border border-slate-700 rounded-md shadow-xl py-1 z-50">
                    {children}
                </div>
            )}
        </div>
    );
};

const MenubarDemo: React.FC = () => {
    const [showSidebar, setShowSidebar] = useState(true);
    const [showStatus, setShowStatus] = useState(false);

    return (
        <div>
            <LivePreview>
                <div className="h-48 flex flex-col bg-slate-950 rounded-lg border border-slate-800">
                    <div className="flex items-center px-2 py-1 border-b border-slate-800 bg-slate-900 rounded-t-lg space-x-1">
                        <MenubarMenu label="File">
                            <MenubarItem label="New Tab" shortcut="⌘ T" />
                            <MenubarItem label="New Window" shortcut="⌘ N" />
                            <MenubarItem label="Incognito Window" disabled />
                            <div className="h-px bg-slate-700 my-1 mx-2"></div>
                            <MenubarItem label="Print..." shortcut="⌘ P" />
                        </MenubarMenu>

                        <MenubarMenu label="Edit">
                             <MenubarItem label="Undo" shortcut="⌘ Z" />
                             <MenubarItem label="Redo" shortcut="⇧ ⌘ Z" />
                             <div className="h-px bg-slate-700 my-1 mx-2"></div>
                             <MenubarItem label="Cut" shortcut="⌘ X" />
                             <MenubarItem label="Copy" shortcut="⌘ C" />
                             <MenubarItem label="Paste" shortcut="⌘ V" />
                        </MenubarMenu>

                        <MenubarMenu label="View">
                            <MenubarCheckboxItem label="Show Sidebar" checked={showSidebar} onChange={() => setShowSidebar(!showSidebar)} />
                            <MenubarCheckboxItem label="Show Status Bar" checked={showStatus} onChange={() => setShowStatus(!showStatus)} />
                            <div className="h-px bg-slate-700 my-1 mx-2"></div>
                            <MenubarItem label="Toggle Fullscreen" />
                        </MenubarMenu>
                    </div>
                    <div className="flex-1 flex items-center justify-center p-4 bg-slate-950 text-slate-600 text-sm">
                        Content Area
                    </div>
                </div>
            </LivePreview>
            <TechnicalOverview
                library="Radix UI Menubar"
                officialName="radix-ui/primitives"
                githubUrl="https://github.com/radix-ui/primitives"
                description="A menubar is a horizontal menu that typically appears at the top of an application window. It organizes commands into logical groups like File, Edit, and View."
                features={[
                    "Keyboard navigation (arrow keys).",
                    "Nested submenus and separators.",
                    "Checkboxes and radio items within menus.",
                    "Fully accessible with ARIA menubar role."
                ]}
                installation="npm install @radix-ui/react-menubar"
                usage={`import * as Menubar from '@radix-ui/react-menubar';\n\n<Menubar.Root>\n  <Menubar.Menu>\n    <Menubar.Trigger>File</Menubar.Trigger>\n    <Menubar.Content>...</Menubar.Content>\n  </Menubar.Menu>\n</Menubar.Root>`}
            />
        </div>
    );
};

export default MenubarDemo;
