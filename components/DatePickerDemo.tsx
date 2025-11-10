import React, { useState } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';

const DatePickerDemo: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startDayOfWeek = startOfMonth.getDay();
    const daysInMonth = endOfMonth.getDate();
    
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const emptyDays = Array.from({ length: startDayOfWeek }, (_, i) => i);
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const handlePrevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    const handleNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    
    const isSameDay = (d1: Date, d2: Date) => d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();

    return (
        <div>
            <LivePreview>
                <div className="w-full max-w-xs mx-auto bg-slate-800 p-4 rounded-lg border border-slate-700">
                    <div className="flex justify-between items-center mb-4">
                        <button onClick={handlePrevMonth} className="p-1 rounded-full hover:bg-slate-700 transition-colors">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        </button>
                        <span className="font-semibold text-lg text-slate-200">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
                        <button onClick={handleNextMonth} className="p-1 rounded-full hover:bg-slate-700 transition-colors">
                             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </button>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center text-sm">
                        {weekDays.map(day => <div key={day} className="font-medium text-slate-500 py-2">{day}</div>)}
                        {emptyDays.map((_, i) => <div key={`empty-${i}`}></div>)}
                        {days.map(day => {
                            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                            const isSelected = selectedDate && isSameDay(date, selectedDate);
                            return (
                                <button
                                    key={day}
                                    onClick={() => setSelectedDate(date)}
                                    className={`w-9 h-9 flex items-center justify-center rounded-full hover:bg-sky-500 hover:text-white transition-colors ${isSelected ? 'bg-sky-600 text-white font-semibold' : 'text-slate-300'}`}
                                >
                                    {day}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </LivePreview>
            <TechnicalOverview
                library="React Day Picker / react-datepicker"
                officialName="gpbl/react-day-picker"
                githubUrl="https://github.com/gpbl/react-day-picker"
                description="A date picker is a graphical user interface component that allows users to select a date from a calendar. It is a common element in forms and booking systems."
                features={[
                    "Easy navigation between months and years",
                    "Support for date ranges and multiple date selection",
                    "Localization and internationalization",
                    "Highly customizable and themeable"
                ]}
                installation="npm install react-day-picker date-fns"
                usage={`import { DayPicker } from 'react-day-picker';\n\n<DayPicker mode="single" selected={date} onSelect={setDate} />`}
            />
        </div>
    );
};
export default DatePickerDemo;