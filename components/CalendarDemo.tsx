
import React, { useState } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';
import { ChevronRightIcon } from './Icons';

const CalendarDemo: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [showWeekends, setShowWeekends] = useState(true);
    
    // Events demo data
    const events = [
        { date: 5, title: 'Meeting', color: 'bg-blue-500' },
        { date: 12, title: 'Launch', color: 'bg-green-500' },
        { date: 15, title: 'Review', color: 'bg-purple-500' },
    ];

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

    const renderCalendar = () => {
        const daysInMonth = getDaysInMonth(currentDate);
        const firstDay = getFirstDayOfMonth(currentDate);
        const days = [];
        
        // Determine visible columns based on configuration
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const visibleDays = showWeekends ? daysOfWeek : daysOfWeek.slice(1, 6);

        // Empty cells before first day
        // We need to calculate offset based on visible days
        let emptyCells = firstDay;
        if (!showWeekends) {
            // If no weekends, adjust offset. 
            // Sunday(0) -> invalid/skipped, Monday(1) -> 0 offset
            emptyCells = Math.max(0, firstDay - 1); 
        }
        
        for (let i = 0; i < emptyCells; i++) {
            days.push(<div key={`empty-${i}`} className="h-24 bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800/50 transition-colors"></div>);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            const dayOfWeek = date.getDay();

            // Skip weekends if hidden (0=Sun, 6=Sat)
            if (!showWeekends && (dayOfWeek === 0 || dayOfWeek === 6)) {
                continue;
            }

            const event = events.find(e => e.date === day);
            
            days.push(
                <div key={day} className="h-24 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer relative group">
                    <span className={`text-sm font-medium ${day === new Date().getDate() ? 'bg-sky-600 text-white w-6 h-6 rounded-full flex items-center justify-center' : 'text-slate-700 dark:text-slate-400'}`}>
                        {day}
                    </span>
                    {event && (
                        <div className="mt-2 p-1 text-xs rounded bg-sky-100 dark:bg-sky-900/50 border border-sky-200 dark:border-sky-700/50 text-sky-700 dark:text-sky-200 truncate">
                            {event.title}
                        </div>
                    )}
                </div>
            );
        }
        return days;
    };
    
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const visibleHeaders = showWeekends ? daysOfWeek : daysOfWeek.slice(1, 6);

    return (
        <div>
            <LivePreview>
                <div className="w-full max-w-4xl mx-auto space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-200 transition-colors">
                            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                        </h2>
                        <div className="flex space-x-2">
                            <button onClick={prevMonth} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors">
                                <ChevronRightIcon className="w-5 h-5 transform rotate-180" />
                            </button>
                            <button onClick={nextMonth} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors">
                                <ChevronRightIcon className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    
                    <div className={`grid gap-px bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden shadow-sm ${showWeekends ? 'grid-cols-7' : 'grid-cols-5'}`}>
                        {visibleHeaders.map(day => (
                            <div key={day} className="bg-slate-50 dark:bg-slate-950 py-2 text-center text-sm font-semibold text-slate-600 dark:text-slate-500 transition-colors">
                                {day}
                            </div>
                        ))}
                        {renderCalendar()}
                    </div>

                    {/* Configuration */}
                    <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 transition-colors">
                        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">Configuration</h3>
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input 
                                type="checkbox" 
                                checked={showWeekends} 
                                onChange={(e) => setShowWeekends(e.target.checked)}
                                className="form-checkbox h-4 w-4 text-sky-600 rounded border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-sky-500"
                            />
                            <span className="text-sm text-slate-700 dark:text-slate-300">Show Weekends</span>
                        </label>
                    </div>
                </div>
            </LivePreview>
            <TechnicalOverview
                library="React Big Calendar"
                officialName="jquense/react-big-calendar"
                githubUrl="https://github.com/jquense/react-big-calendar"
                description="A full-featured calendar component for managing events and schedules. It supports monthly, weekly, daily, and agenda views, similar to Google Calendar."
                features={[
                    "Drag and drop support for events.",
                    "Multiple views (Month, Week, Day, Agenda).",
                    "Localization support via moment, luxon, etc.",
                    "Customizable event rendering."
                ]}
                installation="npm install react-big-calendar"
                usage={`import { Calendar, momentLocalizer } from 'react-big-calendar'\nimport moment from 'moment'\n\nconst localizer = momentLocalizer(moment)\n\n<Calendar\n  localizer={localizer}\n  events={myEventsList}\n  startAccessor="start"\n  endAccessor="end"\n/>`}
            />
        </div>
    );
};

export default CalendarDemo;
