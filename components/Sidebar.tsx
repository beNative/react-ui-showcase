
import React, { useState, useMemo } from 'react';
import type { Showcase } from '../types';
import { GeminiIcon, CloseIcon } from './Icons';

interface SidebarProps {
    showcases: Showcase[];
    activeShowcaseId: string;
    setActiveShowcaseId: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ showcases, activeShowcaseId, setActiveShowcaseId }) => {
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
                                      ? 'bg-sky-500/10 text-sky-400 border-l-2 border-sky-500'
                                      : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 border-l-2 border-transparent'
                              }`}
                          >
                              <span className={`mr-3 transition-colors ${activeShowcaseId === showcase.id ? 'text-sky-400' : 'text-slate-500 group-hover:text-slate-300'}`}>
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
                className="lg:hidden fixed top-4 left-4 z-30 p-2 rounded-md bg-slate-900/80 backdrop-blur-md border border-slate-700/50 text-slate-200 shadow-lg"
                onClick={() => setIsOpen(true)}
            >
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>

            {/* Mobile Sidebar */}
            <div className={`fixed inset-0 z-40 flex lg:hidden transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="relative flex flex-col w-72 h-full bg-slate-950 border-r border-slate-800 shadow-2xl">
                    <div className="p-4 flex justify-between items-center border-b border-slate-800">
                        <div className="flex items-center space-x-2 text-lg font-bold text-slate-100">
                           <GeminiIcon className="w-7 h-7 text-sky-500" /> 
                           <span>UI Showcase</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="p-2 rounded-md hover:bg-slate-800 text-slate-400">
                          <CloseIcon className="w-5 h-5"/>
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                         {navContent}
                    </div>
                </div>
                <div className="flex-1 bg-slate-950/80 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden lg:flex lg:flex-shrink-0">
                <div className="flex flex-col w-72 bg-slate-950/50">
                    <div className="flex items-center h-20 flex-shrink-0 px-6 bg-slate-950 border-r border-b border-slate-800">
                         <div className="flex items-center space-x-3 text-lg font-bold text-slate-100">
                           <GeminiIcon className="w-7 h-7 text-sky-500" /> 
                           <span>React UI Showcase</span>
                        </div>
                    </div>
                    <div className="flex flex-col flex-1 overflow-y-auto border-r border-slate-800 custom-scrollbar">
                        {navContent}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;