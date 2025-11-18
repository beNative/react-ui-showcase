
import React, { useState, useMemo, useEffect } from 'react';
import type { Showcase } from '../types';
import { 
    GeminiIcon, CloseIcon, SunIcon, MoonIcon, MagnifyingGlassIcon, 
    StarIcon, StarFilledIcon, ClockIcon, ChevronRightIcon,
    Cog6ToothIcon, ArrowsPointingOutIcon
} from './Icons';

interface SidebarProps {
    showcases: Showcase[];
    activeShowcaseId: string;
    setActiveShowcaseId: (id: string) => void;
    isDarkMode: boolean;
    toggleTheme: () => void;
    favorites: Set<string>;
    toggleFavorite: (id: string) => void;
    recents: string[];
    isCompact: boolean;
    toggleCompact: () => void;
    primaryColor: string;
    setPrimaryColor: (color: string) => void;
    resetSettings: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
    showcases, activeShowcaseId, setActiveShowcaseId, 
    isDarkMode, toggleTheme, favorites, toggleFavorite, recents,
    isCompact, toggleCompact, primaryColor, setPrimaryColor, resetSettings
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['Inputs', 'Data Display', 'Feedback', 'Navigation', 'Layout', 'Editors', 'Media']));
    
    // Defined order for categories
    const categories = ['Inputs', 'Data Display', 'Feedback', 'Navigation', 'Layout', 'Editors', 'Media'];

    const handleSelect = (id: string) => {
        setActiveShowcaseId(id);
        setIsOpen(false);
    };
    
    const toggleCategory = (cat: string) => {
        setExpandedCategories(prev => {
            const next = new Set(prev);
            if (next.has(cat)) next.delete(cat);
            else next.add(cat);
            return next;
        });
    };

    const filteredShowcases = useMemo(() => {
        if (!searchQuery) return showcases;
        return showcases.filter(s => 
            s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
            s.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [showcases, searchQuery]);

    const groupedShowcases = useMemo(() => {
        const groups: Record<string, Showcase[]> = {};
        filteredShowcases.forEach(s => {
            if (!groups[s.category]) groups[s.category] = [];
            groups[s.category].push(s);
        });
        return groups;
    }, [filteredShowcases]);

    // Render Item Helper
    const renderItem = (showcase: Showcase) => {
        const isFav = favorites.has(showcase.id);
        return (
            <div key={showcase.id} className="flex items-center group relative">
                <a
                    href={`#${showcase.id}`}
                    onClick={(e) => {
                        e.preventDefault();
                        handleSelect(showcase.id);
                    }}
                    className={`flex-1 flex items-center ${isCompact ? 'px-2 py-1.5 text-xs' : 'px-3 py-2 text-sm'} font-medium rounded-md transition-all duration-200 ${
                        activeShowcaseId === showcase.id
                            ? `bg-sky-500/10 text-sky-600 dark:text-sky-400 border-l-2 border-sky-500` // Dynamic color simulated
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200 border-l-2 border-transparent'
                    }`}
                >
                    <span className={`mr-3 transition-colors ${activeShowcaseId === showcase.id ? 'text-sky-500' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300'}`}>
                    {showcase.icon}
                    </span>
                    {showcase.name}
                </a>
                <button 
                    onClick={(e) => { e.preventDefault(); toggleFavorite(showcase.id); }}
                    className={`absolute right-2 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-slate-200 dark:hover:bg-slate-700 ${isFav ? 'opacity-100 text-amber-400' : 'text-slate-400'}`}
                >
                    {isFav ? <StarFilledIcon className="w-3 h-3" /> : <StarIcon className="w-3 h-3" />}
                </button>
            </div>
        );
    };

    const navContent = (
        <div className={`flex-1 overflow-y-auto custom-scrollbar px-3 ${isCompact ? 'py-2' : 'py-6'} space-y-6`}>
            {/* Search */}
            <div className="relative mb-4">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                    type="text" 
                    placeholder="Search components..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-md py-1.5 pl-9 pr-4 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-sky-500"
                />
            </div>

            {/* Favorites */}
            {favorites.size > 0 && !searchQuery && (
                <div>
                    <h3 className="px-3 text-xs font-semibold text-amber-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                        <StarIcon className="w-3 h-3" /> Favorites
                    </h3>
                    <div className="space-y-0.5">
                        {showcases.filter(s => favorites.has(s.id)).map(renderItem)}
                    </div>
                </div>
            )}

             {/* Recents */}
             {recents.length > 0 && !searchQuery && (
                <div>
                    <h3 className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                        <ClockIcon className="w-3 h-3" /> Recently Viewed
                    </h3>
                    <div className="space-y-0.5">
                         {recents.slice(0, 5).map(id => {
                             const s = showcases.find(x => x.id === id);
                             return s ? renderItem(s) : null;
                         })}
                    </div>
                </div>
            )}

            {/* Categories */}
            {categories.filter(cat => groupedShowcases[cat]).map(category => (
                <div key={category}>
                    <button 
                        onClick={() => toggleCategory(category)}
                        className="w-full flex items-center justify-between px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 hover:text-slate-800 dark:hover:text-slate-300 transition-colors"
                    >
                        {category}
                        <ChevronRightIcon className={`w-3 h-3 transition-transform ${expandedCategories.has(category) ? 'rotate-90' : ''}`} />
                    </button>
                    
                    {expandedCategories.has(category) && (
                        <div className="space-y-0.5 animate-fade-in">
                            {groupedShowcases[category].map(renderItem)}
                        </div>
                    )}
                </div>
            ))}
        </div>
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
                    {navContent}
                </div>
                <div className="flex-1 bg-slate-900/20 dark:bg-slate-950/80 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden lg:flex lg:flex-shrink-0">
                <div className={`flex flex-col ${isCompact ? 'w-64' : 'w-72'} bg-white/50 dark:bg-slate-950/50 transition-all duration-300 border-r border-slate-200 dark:border-slate-800`}>
                    <div className="flex items-center h-16 flex-shrink-0 px-6 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors justify-between">
                         <div className="flex items-center space-x-3 text-lg font-bold text-slate-900 dark:text-slate-100 overflow-hidden whitespace-nowrap">
                           <GeminiIcon className="w-6 h-6 text-sky-500 flex-shrink-0" /> 
                           <span className={`${isCompact ? 'text-sm' : ''} transition-all`}>React UI</span>
                        </div>
                        <button onClick={toggleCompact} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                            {isCompact ? <ArrowsPointingOutIcon className="w-4 h-4" /> : <div className="border-2 border-current w-3 h-3 rounded-sm"></div>}
                        </button>
                    </div>
                    
                    {navContent}
                    
                    {/* Footer Controls */}
                    <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 transition-colors space-y-3">
                         <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-slate-500">Theme</span>
                            <button 
                                onClick={toggleTheme}
                                className="p-1.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-sky-600 transition-colors"
                            >
                                {isDarkMode ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
                            </button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                             <span className="text-xs font-medium text-slate-500">Accent</span>
                             <div className="flex gap-1">
                                 {['#0ea5e9', '#8b5cf6', '#ec4899', '#10b981'].map(color => (
                                     <button 
                                        key={color}
                                        onClick={() => setPrimaryColor(color)}
                                        className={`w-3 h-3 rounded-full ${primaryColor === color ? 'ring-2 ring-offset-1 ring-offset-white dark:ring-offset-slate-950 ring-slate-400' : ''}`}
                                        style={{ backgroundColor: color }}
                                     />
                                 ))}
                             </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                            <button onClick={resetSettings} className="text-xs text-slate-400 hover:text-red-500 flex items-center gap-1 transition-colors" title="Reset Settings">
                                <Cog6ToothIcon className="w-3 h-3" /> Reset
                            </button>
                             <div className="text-[10px] text-slate-300 dark:text-slate-600 font-mono">v2.1</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
