
import React, { useState } from 'react';
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

    const navContent = (
      <nav className="flex-1 px-2 py-4 space-y-1">
          {showcases.map((showcase) => (
              <a
                  key={showcase.id}
                  href="#"
                  onClick={(e) => {
                      e.preventDefault();
                      handleSelect(showcase.id);
                  }}
                  className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
                      activeShowcaseId === showcase.id
                          ? 'bg-sky-500/20 text-sky-400'
                          : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
                  }`}
              >
                  {showcase.icon}
                  <span className="ml-3">{showcase.name}</span>
              </a>
          ))}
      </nav>
    );

    return (
        <>
            {/* Mobile Nav Button */}
            <button
                className="lg:hidden fixed top-4 left-4 z-30 p-2 rounded-md bg-slate-800/50 backdrop-blur-sm text-slate-200"
                onClick={() => setIsOpen(true)}
            >
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>

            {/* Mobile Sidebar */}
            <div className={`fixed inset-0 z-40 flex lg:hidden transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="relative flex flex-col w-64 h-full bg-slate-900 border-r border-slate-700/50">
                    <div className="p-4 flex justify-between items-center border-b border-slate-700/50">
                        <div className="flex items-center space-x-2 text-lg font-bold text-slate-100">
                           <GeminiIcon className="w-7 h-7 text-sky-400" /> 
                           <span>UI Showcase</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="p-1 rounded-md hover:bg-slate-700">
                          <CloseIcon className="w-6 h-6"/>
                        </button>
                    </div>
                    {navContent}
                </div>
                <div className="flex-1 bg-black/50" onClick={() => setIsOpen(false)}></div>
            </div>


            {/* Desktop Sidebar */}
            <div className="hidden lg:flex lg:flex-shrink-0">
                <div className="flex flex-col w-64">
                    <div className="flex items-center h-20 flex-shrink-0 px-4 bg-slate-900 border-r border-b border-slate-700/50">
                         <div className="flex items-center space-x-2 text-lg font-bold text-slate-100">
                           <GeminiIcon className="w-7 h-7 text-sky-400" /> 
                           <span>React UI Showcase</span>
                        </div>
                    </div>
                    <div className="flex flex-col flex-1 overflow-y-auto border-r border-slate-700/50">
                        {navContent}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
