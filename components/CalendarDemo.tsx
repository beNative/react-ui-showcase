
import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';
import { ChevronRightIcon, CalendarDaysIcon, PlusIcon, TrashIcon, ViewColumnsIcon, ListBulletIcon, ClockIcon, CloseIcon, MagnifyingGlassIcon, PencilSquareIcon } from './Icons';

type EventCategory = 'work' | 'personal' | 'urgent';
type CalendarView = 'month' | 'week' | 'day' | 'agenda';

interface CalendarEvent {
    id: number;
    title: string;
    start: Date;
    end: Date;
    category: EventCategory;
    description?: string;
}

// Helper to create dates relative to today
const createDate = (daysOffset: number, hour: number = 0, minute: number = 0) => {
    const d = new Date();
    d.setDate(d.getDate() + daysOffset);
    d.setHours(hour, minute, 0, 0);
    return d;
};

const initialEvents: CalendarEvent[] = [
    { id: 1, title: 'Quarterly Review', start: createDate(0, 9, 0), end: createDate(0, 10, 30), category: 'work', description: 'Review Q3 goals and metrics.' },
    { id: 2, title: 'Team Lunch', start: createDate(0, 12, 0), end: createDate(0, 13, 30), category: 'personal', description: 'Taco Tuesday!' },
    { id: 3, title: 'Client Meeting', start: createDate(1, 14, 0), end: createDate(1, 15, 0), category: 'urgent', description: 'Discuss contract details.' },
    { id: 4, title: 'Code Sprint', start: createDate(2, 10, 0), end: createDate(2, 16, 0), category: 'work', description: 'Focus time for new feature.' },
    { id: 5, title: 'Dentist', start: createDate(-2, 8, 30), end: createDate(-2, 9, 30), category: 'personal' },
    // Add overlapping event for demo
    { id: 6, title: 'Sync with PM', start: createDate(0, 9, 30), end: createDate(0, 10, 30), category: 'work' },
];

const CATEGORY_STYLES = {
    work: { base: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/50 dark:text-blue-100 dark:border-blue-700', dot: 'bg-blue-500' },
    personal: { base: 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/50 dark:text-green-100 dark:border-green-700', dot: 'bg-green-500' },
    urgent: { base: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/50 dark:text-red-100 dark:border-red-700', dot: 'bg-red-500' },
};

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const PIXELS_PER_HOUR = 60;
const PIXELS_PER_MINUTE = PIXELS_PER_HOUR / 60;
const SNAP_MINUTES = 15;

const CalendarDemo: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
    const [view, setView] = useState<CalendarView>('week');
    const [searchQuery, setSearchQuery] = useState('');
    const [showWeekends, setShowWeekends] = useState(true);
    const [now, setNow] = useState(new Date());

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
    
    // Drag & Resize State
    const [dragState, setDragState] = useState<{
        type: 'move' | 'resize';
        event: CalendarEvent;
        startY: number;
        initialStart: Date;
        initialEnd: Date;
    } | null>(null);
    const [tempEvent, setTempEvent] = useState<CalendarEvent | null>(null);

    // Form State
    const [formData, setFormData] = useState<{
        title: string;
        date: string;
        startTime: string;
        endTime: string;
        category: EventCategory;
        description: string;
    }>({
        title: '',
        date: '',
        startTime: '09:00',
        endTime: '10:00',
        category: 'work',
        description: ''
    });

    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Update current time every minute
    useEffect(() => {
        const interval = setInterval(() => setNow(new Date()), 60000);
        return () => clearInterval(interval);
    }, []);

    // Scroll to 8 AM on view change
    useEffect(() => {
        if ((view === 'week' || view === 'day') && scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = 8 * PIXELS_PER_HOUR; 
        }
    }, [view]);

    // Drag and Drop Handlers
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!dragState) return;

            const deltaY = e.clientY - dragState.startY;
            const deltaMinutes = Math.round(deltaY / (PIXELS_PER_MINUTE * SNAP_MINUTES)) * SNAP_MINUTES; // Snap logic

            if (dragState.type === 'move') {
                const newStart = new Date(dragState.initialStart.getTime() + deltaMinutes * 60000);
                const newEnd = new Date(dragState.initialEnd.getTime() + deltaMinutes * 60000);
                
                // Prevent moving across days for simplicity in this demo (though logic could support it)
                // We just update time here.
                setTempEvent({ ...dragState.event, start: newStart, end: newEnd });
            } else if (dragState.type === 'resize') {
                const newEnd = new Date(dragState.initialEnd.getTime() + deltaMinutes * 60000);
                // Min duration 15 mins
                if (newEnd.getTime() - dragState.initialStart.getTime() >= 15 * 60000) {
                    setTempEvent({ ...dragState.event, end: newEnd });
                }
            }
        };

        const handleMouseUp = () => {
            if (dragState && tempEvent) {
                setEvents(prev => prev.map(ev => ev.id === tempEvent.id ? tempEvent : ev));
            }
            setDragState(null);
            setTempEvent(null);
        };

        if (dragState) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = dragState.type === 'move' ? 'grabbing' : 'ns-resize';
            document.body.style.userSelect = 'none';
        } else {
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [dragState, tempEvent]);

    const filteredEvents = useMemo(() => {
        let activeEvents = events;
        if (tempEvent) {
            // Replace the event being dragged with the temp one in the list for rendering
            activeEvents = events.map(e => e.id === tempEvent.id ? tempEvent : e);
        }

        if (!searchQuery) return activeEvents;
        return activeEvents.filter(e => 
            e.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
            e.description?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [events, searchQuery, tempEvent]);

    // --- Helpers ---
    const isSameDay = (d1: Date, d2: Date) => 
        d1.getFullYear() === d2.getFullYear() && 
        d1.getMonth() === d2.getMonth() && 
        d1.getDate() === d2.getDate();

    const formatTime = (date: Date) => date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    
    // Layout Logic for Overlapping Events
    const getDayEventsLayout = (dayEvents: CalendarEvent[]) => {
        // Sort by start time, then duration (longer first)
        const sorted = [...dayEvents].sort((a, b) => {
            if (a.start.getTime() !== b.start.getTime()) return a.start.getTime() - b.start.getTime();
            return (b.end.getTime() - b.start.getTime()) - (a.end.getTime() - a.start.getTime());
        });

        const clusters: CalendarEvent[][] = [];
        
        // Group overlapping events
        for (const event of sorted) {
            let placed = false;
            for (const cluster of clusters) {
                const clusterEnd = Math.max(...cluster.map(e => e.end.getTime()));
                // If this event starts before the current cluster ends, it belongs here
                if (event.start.getTime() < clusterEnd) {
                    cluster.push(event);
                    placed = true;
                    break;
                }
            }
            if (!placed) {
                clusters.push([event]);
            }
        }

        const layoutMap: Record<number, { left: string, width: string }> = {};

        // Calculate positions within clusters
        for (const cluster of clusters) {
            // Simple column strategy: arrange in columns
            // Find max concurrent events at any point in this cluster to determine width
            const columns: CalendarEvent[][] = [];
            
            for (const event of cluster) {
                let colIndex = 0;
                while (true) {
                    const col = columns[colIndex];
                    if (!col) {
                        columns[colIndex] = [event];
                        break;
                    }
                    // Check if this column has space (last event ends before this one starts)
                    const lastInCol = col[col.length - 1];
                    if (lastInCol.end.getTime() <= event.start.getTime()) {
                        col.push(event);
                        break;
                    }
                    colIndex++;
                }
            }

            const widthPercent = 100 / columns.length;
            columns.forEach((col, colIndex) => {
                col.forEach(event => {
                    layoutMap[event.id] = {
                        left: `${colIndex * widthPercent}%`,
                        width: `${widthPercent}%`
                    };
                });
            });
        }

        return layoutMap;
    };

    // --- Navigation ---
    const navigate = (direction: 'prev' | 'next' | 'today') => {
        const newDate = new Date(currentDate);
        if (direction === 'today') {
            setCurrentDate(new Date());
            return;
        }
        const offset = direction === 'next' ? 1 : -1;
        
        switch (view) {
            case 'month': newDate.setMonth(newDate.getMonth() + offset); break;
            case 'week': newDate.setDate(newDate.getDate() + (offset * 7)); break;
            case 'day': newDate.setDate(newDate.getDate() + offset); break;
            default: newDate.setMonth(newDate.getMonth() + offset);
        }
        setCurrentDate(newDate);
    };

    // --- Actions ---
    const openModal = (event?: CalendarEvent, slotDate?: Date) => {
        if (dragState) return; // Don't open if we just finished dragging

        if (event) {
            setEditingEvent(event);
            setFormData({
                title: event.title,
                date: event.start.toISOString().split('T')[0],
                startTime: event.start.toTimeString().slice(0, 5),
                endTime: event.end.toTimeString().slice(0, 5),
                category: event.category,
                description: event.description || ''
            });
        } else {
            setEditingEvent(null);
            const d = slotDate || new Date();
            setFormData({
                title: '',
                date: d.toISOString().split('T')[0],
                startTime: slotDate ? slotDate.toTimeString().slice(0, 5) : '09:00',
                endTime: slotDate ? new Date(slotDate.getTime() + 60 * 60000).toTimeString().slice(0, 5) : '10:00',
                category: 'work',
                description: ''
            });
        }
        setIsModalOpen(true);
    };

    const saveEvent = () => {
        const startDateTime = new Date(`${formData.date}T${formData.startTime}`);
        const endDateTime = new Date(`${formData.date}T${formData.endTime}`);

        if (startDateTime >= endDateTime) {
            alert("End time must be after start time.");
            return;
        }

        if (editingEvent) {
            setEvents(events.map(e => e.id === editingEvent.id ? {
                ...e,
                title: formData.title,
                start: startDateTime,
                end: endDateTime,
                category: formData.category,
                description: formData.description
            } : e));
        } else {
            setEvents([...events, {
                id: Date.now(),
                title: formData.title || '(No Title)',
                start: startDateTime,
                end: endDateTime,
                category: formData.category,
                description: formData.description
            }]);
        }
        setIsModalOpen(false);
    };

    const deleteEvent = (id: number) => {
        setEvents(events.filter(e => e.id !== id));
        if (editingEvent?.id === id) setIsModalOpen(false);
    };

    const startDrag = (e: React.MouseEvent, event: CalendarEvent) => {
        e.stopPropagation();
        setDragState({
            type: 'move',
            event,
            startY: e.clientY,
            initialStart: event.start,
            initialEnd: event.end
        });
        setTempEvent(event);
    };

    const startResize = (e: React.MouseEvent, event: CalendarEvent) => {
        e.stopPropagation();
        setDragState({
            type: 'resize',
            event,
            startY: e.clientY,
            initialStart: event.start,
            initialEnd: event.end
        });
        setTempEvent(event);
    };

    // --- Renderers ---

    const renderMonthView = () => {
        const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const startDay = monthStart.getDay(); 
        const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
        
        const cells = [];
        for (let i = 0; i < startDay; i++) {
            if (!showWeekends && (i === 0 || i === 6)) continue;
            cells.push(<div key={`empty-${i}`} className="bg-slate-50/50 dark:bg-slate-900/20 border-b border-r border-slate-200 dark:border-slate-800 min-h-[100px]" />);
        }

        for (let d = 1; d <= daysInMonth; d++) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), d);
            const dayOfWeek = date.getDay();
            if (!showWeekends && (dayOfWeek === 0 || dayOfWeek === 6)) continue;

            const dayEvents = filteredEvents.filter(e => isSameDay(e.start, date));
            const isToday = isSameDay(date, now);

            cells.push(
                <div 
                    key={d} 
                    className={`min-h-[100px] p-2 border-b border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group relative flex flex-col`}
                    onClick={() => openModal(undefined, date)}
                >
                    <span className={`text-sm w-7 h-7 flex items-center justify-center rounded-full mb-1 ${isToday ? 'bg-sky-600 text-white font-bold' : 'text-slate-700 dark:text-slate-300'}`}>
                        {d}
                    </span>
                    <div className="flex-1 space-y-1 overflow-hidden">
                        {dayEvents.map(ev => (
                            <div 
                                key={ev.id}
                                onClick={(e) => { e.stopPropagation(); openModal(ev); }}
                                className={`text-[10px] px-1.5 py-0.5 rounded truncate border ${CATEGORY_STYLES[ev.category].base} hover:brightness-95 cursor-pointer shadow-sm`}
                            >
                                {formatTime(ev.start)} {ev.title}
                            </div>
                        ))}
                    </div>
                    <button className="absolute top-2 right-2 text-slate-400 opacity-0 group-hover:opacity-100 hover:text-sky-600">
                        <PlusIcon className="w-4 h-4" />
                    </button>
                </div>
            );
        }

        const headers = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        if (!showWeekends) {
            headers.shift(); 
            headers.pop();   
        }

        return (
            <div className="border-l border-t border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
                <div className={`grid ${showWeekends ? 'grid-cols-7' : 'grid-cols-5'}`}>
                    {headers.map(h => (
                        <div key={h} className="py-2 text-center text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 border-b border-r border-slate-200 dark:border-slate-800 uppercase">
                            {h}
                        </div>
                    ))}
                    {cells}
                </div>
            </div>
        );
    };

    const renderTimeGrid = (type: 'week' | 'day') => {
        const startOfWeek = new Date(currentDate);
        if (type === 'week') {
            const day = startOfWeek.getDay();
            const diff = startOfWeek.getDate() - day; 
            startOfWeek.setDate(diff);
        }

        const gridDates = [];
        if (type === 'day') {
            gridDates.push(currentDate);
        } else {
             const curr = new Date(startOfWeek); // Start Sunday
             for(let i=0; i<7; i++) {
                 const next = new Date(curr);
                 next.setDate(startOfWeek.getDate() + i);
                 if (!showWeekends && (next.getDay() === 0 || next.getDay() === 6)) continue;
                 gridDates.push(next);
             }
        }

        return (
            <div className="flex flex-col h-[600px] bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden select-none">
                {/* Header Row */}
                <div className="flex border-b border-slate-200 dark:border-slate-800">
                    <div className="w-16 flex-shrink-0 bg-slate-50 dark:bg-slate-800 border-r border-slate-200 dark:border-slate-800"></div>
                    {gridDates.map(date => (
                        <div key={date.toString()} className={`flex-1 py-2 text-center border-r border-slate-100 dark:border-slate-800 last:border-0 ${isSameDay(date, now) ? 'bg-sky-50 dark:bg-sky-900/20' : ''}`}>
                            <div className={`text-xs font-medium uppercase ${isSameDay(date, now) ? 'text-sky-600' : 'text-slate-500'}`}>{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                            <div className={`text-xl font-bold ${isSameDay(date, now) ? 'text-sky-600' : 'text-slate-700 dark:text-slate-200'}`}>
                                {date.getDate()}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Time Body */}
                <div className="flex-1 overflow-y-auto relative scroll-smooth" ref={scrollContainerRef}>
                    <div className="flex relative min-h-[1440px]" style={{ height: 24 * PIXELS_PER_HOUR }}> 
                        
                        {/* Time Axis */}
                        <div className="w-16 flex-shrink-0 flex flex-col text-xs text-slate-400 bg-slate-50 dark:bg-slate-800 border-r border-slate-200 dark:border-slate-800 select-none">
                            {HOURS.map(h => (
                                <div key={h} className="border-b border-transparent relative" style={{ height: PIXELS_PER_HOUR }}>
                                    <span className="absolute -top-2.5 right-2">
                                        {h === 0 ? '12 AM' : h < 12 ? `${h} AM` : h === 12 ? '12 PM' : `${h-12} PM`}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Grid Columns */}
                        {gridDates.map(date => {
                            const dayEvents = filteredEvents.filter(e => isSameDay(e.start, date));
                            const layout = getDayEventsLayout(dayEvents);

                            return (
                                <div key={date.toString()} className="flex-1 relative border-r border-slate-100 dark:border-slate-800 last:border-0 min-w-[100px]">
                                    {/* Horizontal Hour Lines */}
                                    {HOURS.map(h => (
                                        <div 
                                            key={h} 
                                            className="border-b border-slate-100 dark:border-slate-800 w-full absolute w-full"
                                            style={{ height: 1, top: h * PIXELS_PER_HOUR }}
                                            onClick={() => {
                                                const d = new Date(date);
                                                d.setHours(h, 0, 0, 0);
                                                openModal(undefined, d);
                                            }}
                                        ></div>
                                    ))}

                                    {/* Events */}
                                    {dayEvents.map(ev => {
                                        const startMin = ev.start.getHours() * 60 + ev.start.getMinutes();
                                        const endMin = ev.end.getHours() * 60 + ev.end.getMinutes();
                                        const durationMin = endMin - startMin;
                                        const height = Math.max(durationMin * PIXELS_PER_MINUTE, 25);
                                        const top = startMin * PIXELS_PER_MINUTE;
                                        const eventStyle = layout[ev.id] || { left: '0%', width: '100%' };
                                        const isDraggingThis = dragState?.event.id === ev.id;

                                        return (
                                            <div
                                                key={ev.id}
                                                onMouseDown={(e) => startDrag(e, ev)}
                                                className={`absolute rounded border-l-4 p-1.5 text-xs cursor-pointer overflow-hidden z-10 transition-all duration-75
                                                    ${CATEGORY_STYLES[ev.category].base}
                                                    ${isDraggingThis ? 'opacity-80 shadow-xl ring-2 ring-sky-400 z-50 scale-[1.02]' : 'shadow-sm hover:brightness-95'}
                                                `}
                                                style={{
                                                    top: `${top}px`,
                                                    height: `${height}px`,
                                                    left: eventStyle.left,
                                                    width: eventStyle.width,
                                                    paddingBottom: isDraggingThis ? 0 : '10px' // space for resize handle
                                                }}
                                            >
                                                <div className="font-bold truncate leading-tight">{ev.title}</div>
                                                <div className="opacity-90 truncate text-[10px] mt-0.5">{formatTime(ev.start)} - {formatTime(ev.end)}</div>
                                                
                                                {/* Resize Handle */}
                                                <div 
                                                    className="absolute bottom-0 left-0 w-full h-2 cursor-ns-resize hover:bg-black/10 dark:hover:bg-white/20"
                                                    onMouseDown={(e) => startResize(e, ev)}
                                                ></div>
                                            </div>
                                        );
                                    })}

                                    {/* Current Time Indicator */}
                                    {isSameDay(date, now) && (
                                        <div 
                                            className="absolute left-0 right-0 border-t-2 border-red-500 z-20 pointer-events-none flex items-center"
                                            style={{ top: `${(now.getHours() * 60 + now.getMinutes()) * PIXELS_PER_MINUTE}px` }}
                                        >
                                            <div className="absolute -left-1.5 w-3 h-3 rounded-full bg-red-500"></div>
                                            <div className="ml-2 text-[10px] text-red-500 font-bold bg-white dark:bg-slate-900 px-1 rounded">{formatTime(now)}</div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    };

    const renderAgendaView = () => {
        const sorted = [...filteredEvents].sort((a, b) => a.start.getTime() - b.start.getTime());
        
        return (
            <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden h-[600px] overflow-y-auto">
                {sorted.length === 0 ? (
                    <div className="p-8 text-center text-slate-500">No events found.</div>
                ) : sorted.map((ev, i) => {
                    const showHeader = i === 0 || !isSameDay(ev.start, sorted[i-1].start);
                    return (
                        <React.Fragment key={ev.id}>
                            {showHeader && (
                                <div className="sticky top-0 bg-slate-50 dark:bg-slate-800 px-4 py-2 text-xs font-bold text-slate-500 uppercase border-b border-slate-200 dark:border-slate-700 z-10">
                                    {ev.start.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                                </div>
                            )}
                            <div className="group flex items-center p-4 border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer" onClick={() => openModal(ev)}>
                                <div className="flex flex-col items-center mr-4 w-16">
                                    <span className="text-xs text-slate-400 font-medium">{formatTime(ev.start)}</span>
                                    <div className={`h-full w-0.5 my-1 ${CATEGORY_STYLES[ev.category].base.split(' ')[0]}`}></div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center mb-1">
                                        <span className={`w-2 h-2 rounded-full mr-2 ${CATEGORY_STYLES[ev.category].dot}`}></span>
                                        <span className="font-semibold text-slate-900 dark:text-slate-100">{ev.title}</span>
                                    </div>
                                    {ev.description && <p className="text-sm text-slate-500 dark:text-slate-400 ml-4">{ev.description}</p>}
                                </div>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); deleteEvent(ev.id); }}
                                    className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-red-500 transition-all"
                                >
                                    <TrashIcon className="w-4 h-4" />
                                </button>
                            </div>
                        </React.Fragment>
                    );
                })}
            </div>
        );
    };

    return (
        <div>
            <LivePreview>
                <div className="space-y-4 select-none">
                    {/* Header & Toolbar */}
                    <div className="flex flex-col xl:flex-row gap-4 justify-between items-start xl:items-center bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-md p-1 shadow-sm">
                                <button onClick={() => navigate('prev')} className="p-1.5 hover:bg-white dark:hover:bg-slate-700 rounded text-slate-600 dark:text-slate-300 transition-colors"><ChevronRightIcon className="w-4 h-4 rotate-180" /></button>
                                <button onClick={() => navigate('today')} className="px-3 py-1 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-sky-600 transition-colors">Today</button>
                                <button onClick={() => navigate('next')} className="p-1.5 hover:bg-white dark:hover:bg-slate-700 rounded text-slate-600 dark:text-slate-300 transition-colors"><ChevronRightIcon className="w-4 h-4" /></button>
                            </div>
                            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 min-w-[200px]">
                                {currentDate.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
                            </h2>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto">
                            <div className="relative flex-1 sm:flex-none">
                                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input 
                                    type="text" 
                                    placeholder="Search events..." 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full sm:w-48 pl-9 pr-4 py-1.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md focus:ring-2 focus:ring-sky-500 outline-none transition-colors"
                                />
                            </div>

                            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-md">
                                {(['month', 'week', 'day', 'agenda'] as const).map((v) => (
                                    <button
                                        key={v}
                                        onClick={() => setView(v)}
                                        className={`px-3 py-1.5 text-xs font-medium rounded flex items-center gap-2 transition-all ${view === v ? 'bg-white dark:bg-slate-700 shadow text-sky-600 dark:text-sky-400' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
                                    >
                                        {v === 'month' && <CalendarDaysIcon className="w-4 h-4" />}
                                        {v === 'week' && <ViewColumnsIcon className="w-4 h-4" />}
                                        {v === 'day' && <ClockIcon className="w-4 h-4" />}
                                        {v === 'agenda' && <ListBulletIcon className="w-4 h-4" />}
                                        <span className="capitalize hidden sm:inline">{v}</span>
                                    </button>
                                ))}
                            </div>
                            
                            <button onClick={() => openModal()} className="bg-sky-600 hover:bg-sky-500 text-white px-4 py-2 rounded-md text-sm font-medium shadow flex items-center justify-center gap-2 transition-colors">
                                <PlusIcon className="w-4 h-4" />
                                <span className="hidden sm:inline">Add Event</span>
                            </button>
                        </div>
                    </div>

                    {/* Main Content */}
                    {view === 'month' && renderMonthView()}
                    {(view === 'week' || view === 'day') && renderTimeGrid(view)}
                    {view === 'agenda' && renderAgendaView()}
                
                    {/* Footer Config */}
                    <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 px-2 gap-2">
                        <label className="flex items-center gap-2 cursor-pointer hover:text-slate-800 dark:hover:text-slate-300 transition-colors">
                            <input type="checkbox" checked={showWeekends} onChange={e => setShowWeekends(e.target.checked)} className="rounded border-slate-300 text-sky-600 focus:ring-sky-500" />
                            Show Weekends
                        </label>
                        <div className="flex gap-4">
                            {Object.entries(CATEGORY_STYLES).map(([cat, style]) => (
                                <div key={cat} className="flex items-center gap-1.5">
                                    <span className={`w-2 h-2 rounded-full ${style.dot}`}></span>
                                    <span className="capitalize">{cat}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </LivePreview>

            {/* Event Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}>
                    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200 dark:border-slate-700 animate-fade-in" onClick={e => e.stopPropagation()}>
                        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                {editingEvent ? <PencilSquareIcon className="w-5 h-5 text-sky-500" /> : <PlusIcon className="w-5 h-5 text-sky-500" />}
                                {editingEvent ? 'Edit Event' : 'New Event'}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                                <CloseIcon className="w-5 h-5" />
                            </button>
                        </div>
                        
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Title</label>
                                <input 
                                    type="text" 
                                    value={formData.title}
                                    onChange={e => setFormData({...formData, title: e.target.value})}
                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-sky-500 outline-none text-slate-900 dark:text-white"
                                    placeholder="Event Title"
                                    autoFocus
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Date</label>
                                    <input 
                                        type="date" 
                                        value={formData.date}
                                        onChange={e => setFormData({...formData, date: e.target.value})}
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-sky-500 outline-none text-slate-900 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Start</label>
                                    <input 
                                        type="time" 
                                        value={formData.startTime}
                                        onChange={e => setFormData({...formData, startTime: e.target.value})}
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-sky-500 outline-none text-slate-900 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">End</label>
                                    <input 
                                        type="time" 
                                        value={formData.endTime}
                                        onChange={e => setFormData({...formData, endTime: e.target.value})}
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-sky-500 outline-none text-slate-900 dark:text-white"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Category</label>
                                <div className="flex gap-2">
                                    {(['work', 'personal', 'urgent'] as const).map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => setFormData({...formData, category: cat})}
                                            className={`flex-1 py-2 text-xs font-bold rounded border uppercase tracking-wide transition-all ${formData.category === cat ? `${CATEGORY_STYLES[cat].base} ring-2 ring-offset-1 dark:ring-offset-slate-900 ring-sky-500` : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Description</label>
                                <textarea 
                                    value={formData.description}
                                    onChange={e => setFormData({...formData, description: e.target.value})}
                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-sky-500 outline-none resize-none h-20 text-slate-900 dark:text-white"
                                    placeholder="Add details..."
                                />
                            </div>

                            <div className="flex gap-3 pt-2">
                                {editingEvent && (
                                    <button 
                                        onClick={() => deleteEvent(editingEvent.id)}
                                        className="px-4 py-2 border border-red-200 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md text-sm font-medium transition-colors"
                                    >
                                        Delete
                                    </button>
                                )}
                                <div className="flex-1"></div>
                                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md text-sm font-medium transition-colors">Cancel</button>
                                <button onClick={saveEvent} className="px-6 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-md text-sm font-bold shadow-lg shadow-sky-500/20 transition-all">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <TechnicalOverview
                library="React Big Calendar"
                officialName="jquense/react-big-calendar"
                githubUrl="https://github.com/jquense/react-big-calendar"
                description="A fully featured calendar component for managing events. Supports complex views like Month, Week, Day, and Agenda, along with drag-and-drop capabilities."
                features={[
                    "Time grid for precise scheduling.",
                    "Multiple views (Day, Week, Month).",
                    "Event overlap handling.",
                    "Drag and drop to move or resize events."
                ]}
                installation="npm install react-big-calendar"
                usage={`import { Calendar, momentLocalizer } from 'react-big-calendar';\n\n<Calendar\n  localizer={localizer}\n  events={events}\n  startAccessor="start"\n  endAccessor="end"\n  defaultView="week"\n/>`}
            />
        </div>
    );
};

export default CalendarDemo;
