
import React, { useState, useMemo } from 'react';
import type { Showcase } from '../types';
import { GeminiIcon, CloseIcon, SunIcon, MoonIcon } from './Icons';

interface SidebarProps {
    showcases: Showcase[];
    activeShowcaseId: string;
    setActiveShowcaseId: (id: string) => void;
    isDarkMode: boolean;
    toggleTheme: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ showcases, activeShowcaseId, setActiveShowcaseId, isDarkMode, toggleTheme }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (id: string) => {
        setActiveShowcaseId(id);
        setIsOpen(false);
    };

    const groupedShowcases = useMemo(() => {
        const groups: Record<string, Showcase[]> = {};
        showcases.forEach(s => {
            if (!groups[s.category]) groups[s.category] = [];
            groups[s.category].push(s);
        });
        return groups;
    }, [showcases]);

    // Defined order for categories
    const categories = ['Inputs', 'Data Display', 'Feedback', 'Navigation', 'Layout', 'Editors', 'Media'];

    const navContent = (
      <nav className="flex-1 px-3 py-6 space-y-8">
          {categories.filter(cat => groupedShowcases[cat]).map(category => (
              <div key={category}>
                  <h3 className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                      {category}
                  </h3>
                  <div className="space-y-1">
                      {groupedShowcases[category].map((showcase) => (
                          <a
                              key={showcase.id}
                              href="#"
                              onClick={(e) => {
                                  e.preventDefault();
                                  handleSelect(showcase.id);
                              }}
                              className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                                  activeShowcaseId === showcase.id
                                      ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-l-2 border-sky-500'
                                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200 border-l-2 border-transparent'
                              }`}
                          >
                              <span className={`mr-3 transition-colors ${activeShowcaseId === showcase.id ? 'text-sky-500' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300'}`}>
                                {showcase.icon}
                              </span>
                              {showcase.name}
                          </a>
                      ))}
                  </div>
              </div>
          ))}
      </nav>
    );

    return (
        <>
            {/* Mobile Nav Button */}
            <button
                className="lg:hidden fixed top-4 left-4 z-30 p-2 rounded-md bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-700/50 text-slate-700 dark:text-slate-200 shadow-lg transition-colors"
                onClick={() => setIsOpen(true)}
            >
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>

            {/* Mobile Sidebar */}
            <div className={`fixed inset-0 z-40 flex lg:hidden transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="relative flex flex-col w-72 h-full bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 shadow-2xl transition-colors">
                    <div className="p-4 flex justify-between items-center border-b border-slate-200 dark:border-slate-800">
                        <div className="flex items-center space-x-2 text-lg font-bold text-slate-900 dark:text-slate-100">
                           <GeminiIcon className="w-7 h-7 text-sky-500" /> 
                           <span>UI Showcase</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400">
                          <CloseIcon className="w-5 h-5"/>
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                         {navContent}
                    </div>
                     <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                        <button 
                            onClick={toggleTheme}
                            className="flex items-center w-full px-3 py-2 rounded-md text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                            {isDarkMode ? <SunIcon className="w-5 h-5 mr-2" /> : <MoonIcon className="w-5 h-5 mr-2" />}
                            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                        </button>
                    </div>
                </div>
                <div className="flex-1 bg-slate-900/20 dark:bg-slate-950/80 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden lg:flex lg:flex-shrink-0">
                <div className="flex flex-col w-72 bg-white/50 dark:bg-slate-950/50 transition-colors">
                    <div className="flex items-center h-20 flex-shrink-0 px-6 bg-white dark:bg-slate-950 border-r border-b border-slate-200 dark:border-slate-800 transition-colors">
                         <div className="flex items-center space-x-3 text-lg font-bold text-slate-900 dark:text-slate-100">
                           <GeminiIcon className="w-7 h-7 text-sky-500" /> 
                           <span>React UI Showcase</span>
                        </div>
                    </div>
                    <div className="flex flex-col flex-1 overflow-y-auto border-r border-slate-200 dark:border-slate-800 custom-scrollbar transition-colors">
                        {navContent}
                    </div>
                    <div className="p-4 border-t border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 transition-colors">
                        <button 
                            onClick={toggleTheme}
                            className="flex items-center justify-center w-full px-4 py-2 rounded-md border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm"
                        >
                            {isDarkMode ? (
                                <>
                                    <SunIcon className="w-4 h-4 mr-2 text-amber-400" />
                                    <span>Light Mode</span>
                                </>
                            ) : (
                                <>
                                    <MoonIcon className="w-4 h-4 mr-2 text-indigo-400" />
                                    <span>Dark Mode</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;