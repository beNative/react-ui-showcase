import React, { useState, useMemo } from 'react';
import type { Showcase } from './types';
import Sidebar from './components/Sidebar';
import { 
    CodeIcon, BellIcon, ListTreeIcon, DocumentTextIcon, PhotoIcon, PlayCircleIcon, 
    AdjustmentsHorizontalIcon, GeminiIcon, TableCellsIcon, ChevronUpDownIcon, CalendarDaysIcon, 
    ArrowsUpDownIcon, ChartBarIcon, ArrowsRightLeftIcon, RectangleStackIcon, ChevronDownIcon, 
    ComputerDesktopIcon, ChatBubbleLeftRightIcon 
} from './components/Icons';
import MonacoEditorDemo from './components/MonacoEditorDemo';
import ToastDemo from './components/ToastDemo';
import TreeViewDemo from './components/TreeViewDemo';
import WysiwygDemo from './components/WysiwygDemo';
import ImageViewerDemo from './components/ImageViewerDemo';
import MediaPlayerDemo from './components/MediaPlayerDemo';
import ControlsDemo from './components/ControlsDemo';
import DataGridDemo from './components/DataGridDemo';
import SelectDemo from './components/SelectDemo';
import DatePickerDemo from './components/DatePickerDemo';
import DragAndDropDemo from './components/DragAndDropDemo';
import ChartsDemo from './components/ChartsDemo';
import RangeSliderDemo from './components/RangeSliderDemo';
import TabsDemo from './components/TabsDemo';
import AccordionDemo from './components/AccordionDemo';
import DialogDemo from './components/DialogDemo';
import TooltipDemo from './components/TooltipDemo';


const App: React.FC = () => {
    const showcases: Showcase[] = useMemo(() => [
        { id: 'monaco', name: 'Monaco Editor', icon: <CodeIcon className="w-5 h-5" />, component: <MonacoEditorDemo /> },
        { id: 'toast', name: 'Toast Notifications', icon: <BellIcon className="w-5 h-5" />, component: <ToastDemo /> },
        { id: 'tree', name: 'Tree View', icon: <ListTreeIcon className="w-5 h-5" />, component: <TreeViewDemo /> },
        { id: 'wysiwyg', name: 'WYSIWYG Editor', icon: <DocumentTextIcon className="w-5 h-5" />, component: <WysiwygDemo /> },
        { id: 'image', name: 'Image Viewer', icon: <PhotoIcon className="w-5 h-5" />, component: <ImageViewerDemo /> },
        { id: 'media', name: 'Media Player', icon: <PlayCircleIcon className="w-5 h-5" />, component: <MediaPlayerDemo /> },
        { id: 'controls', name: 'UI Controls', icon: <AdjustmentsHorizontalIcon className="w-5 h-5" />, component: <ControlsDemo /> },
        { id: 'datagrid', name: 'Data Grid', icon: <TableCellsIcon className="w-5 h-5" />, component: <DataGridDemo /> },
        { id: 'select', name: 'Select / Autocomplete', icon: <ChevronUpDownIcon className="w-5 h-5" />, component: <SelectDemo /> },
        { id: 'datepicker', name: 'Date Picker', icon: <CalendarDaysIcon className="w-5 h-5" />, component: <DatePickerDemo /> },
        { id: 'dnd', name: 'Drag and Drop', icon: <ArrowsUpDownIcon className="w-5 h-5" />, component: <DragAndDropDemo /> },
        { id: 'charts', name: 'Charts', icon: <ChartBarIcon className="w-5 h-5" />, component: <ChartsDemo /> },
        { id: 'rangeslider', name: 'Range Slider', icon: <ArrowsRightLeftIcon className="w-5 h-5" />, component: <RangeSliderDemo /> },
        { id: 'tabs', name: 'Tabs', icon: <RectangleStackIcon className="w-5 h-5" />, component: <TabsDemo /> },
        { id: 'accordion', name: 'Accordion', icon: <ChevronDownIcon className="w-5 h-5 transform rotate-90" />, component: <AccordionDemo /> },
        { id: 'dialog', name: 'Dialog / Modal', icon: <ComputerDesktopIcon className="w-5 h-5" />, component: <DialogDemo /> },
        { id: 'tooltip', name: 'Tooltip', icon: <ChatBubbleLeftRightIcon className="w-5 h-5" />, component: <TooltipDemo /> },
    ], []);

    const [activeShowcaseId, setActiveShowcaseId] = useState<string>(showcases[0].id);

    const activeShowcase = useMemo(() => showcases.find(s => s.id === activeShowcaseId) || showcases[0], [activeShowcaseId, showcases]);

    return (
        <div className="flex h-screen bg-slate-900 font-sans">
            <Sidebar showcases={showcases} activeShowcaseId={activeShowcaseId} setActiveShowcaseId={setActiveShowcaseId} />
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center space-x-4 mb-6">
                        <div className="p-2 bg-slate-700/50 rounded-lg text-sky-400">
                             {activeShowcase?.icon}
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-100">{activeShowcase?.name}</h1>
                    </div>
                    {activeShowcase?.component}
                </div>
                <footer className="max-w-4xl mx-auto text-center mt-12 py-4 text-slate-500 border-t border-slate-700">
                    <p className="flex items-center justify-center space-x-2">
                        <span>Powered by Gemini</span>
                        <GeminiIcon className="w-5 h-5" />
                    </p>
                </footer>
            </main>
        </div>
    );
};

export default App;