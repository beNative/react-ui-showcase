
import React, { useState } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';
import { ChevronRightIcon } from './Icons';

const CalendarDemo: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events] = useState<{ date: string, title: string, color: string }[]>([
        { date: '2023-10-05', title: 'Meeting', color: 'bg-blue-500' },
        { date: '2023-10-12', title: 'Launch', color: 'bg-green-500' },
        { date: '2023-10-15', title: 'Review', color: 'bg-purple-500' },
    ]);

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

        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-24 bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800/50 transition-colors"></div>);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            // Simple mock check for events - in a real app, compare full dates
            // This demo just randomly assigns events for visual purposes as date logic is complex
            const hasEvent = Math.random() > 0.85; 
            
            days.push(
                <div key={day} className="h-24 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer relative group">
                    <span className={`text-sm font-medium ${day === new Date().getDate() ? 'bg-sky-600 text-white w-6 h-6 rounded-full flex items-center justify-center' : 'text-slate-700 dark:text-slate-400'}`}>
                        {day}
                    </span>
                    {hasEvent && (
                        <div className="mt-2 p-1 text-xs rounded bg-sky-100 dark:bg-sky-900/50 border border-sky-200 dark:border-sky-700/50 text-sky-700 dark:text-sky-200 truncate">
                            Team Sync
                        </div>
                    )}
                </div>
            );
        }
        return days;
    };

    return (
        <div>
            <LivePreview>
                <div className="w-full max-w-4xl mx-auto">
                    <div className="flex items-center justify-between mb-4">
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
                    <div className="grid grid-cols-7 gap-px bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden shadow-sm">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <div key={day} className="bg-slate-50 dark:bg-slate-950 py-2 text-center text-sm font-semibold text-slate-600 dark:text-slate-500 transition-colors">
                                {day}
                            </div>
                        ))}
                        {renderCalendar()}
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
