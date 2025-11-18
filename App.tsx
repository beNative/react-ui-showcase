
import React, { useState, useMemo } from 'react';
import type { Showcase } from './types';
import Sidebar from './components/Sidebar';
import { 
    CodeIcon, BellIcon, ListTreeIcon, DocumentTextIcon, PhotoIcon, PlayCircleIcon, 
    AdjustmentsHorizontalIcon, GeminiIcon, TableCellsIcon, ChevronUpDownIcon, CalendarDaysIcon, 
    ArrowsUpDownIcon, ChartBarIcon, ArrowsRightLeftIcon, RectangleStackIcon, ChevronDownIcon, 
    ComputerDesktopIcon, ChatBubbleLeftRightIcon, CubeTransparentIcon, UserCircleIcon,
    TagIcon, HomeIcon, StarIcon
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
import SkeletonDemo from './components/SkeletonDemo';
import AvatarDemo from './components/AvatarDemo';
import BadgeDemo from './components/BadgeDemo';
import BreadcrumbDemo from './components/BreadcrumbDemo';
import RatingDemo from './components/RatingDemo';


const App: React.FC = () => {
    const showcases: Showcase[] = useMemo(() => [
        // Inputs
        { id: 'controls', name: 'Controls', icon: <AdjustmentsHorizontalIcon className="w-5 h-5" />, component: <ControlsDemo />, category: 'Inputs' },
        { id: 'select', name: 'Select', icon: <ChevronUpDownIcon className="w-5 h-5" />, component: <SelectDemo />, category: 'Inputs' },
        { id: 'datepicker', name: 'Date Picker', icon: <CalendarDaysIcon className="w-5 h-5" />, component: <DatePickerDemo />, category: 'Inputs' },
        { id: 'rangeslider', name: 'Range Slider', icon: <ArrowsRightLeftIcon className="w-5 h-5" />, component: <RangeSliderDemo />, category: 'Inputs' },
        { id: 'rating', name: 'Rating', icon: <StarIcon className="w-5 h-5" />, component: <RatingDemo />, category: 'Inputs' },

        // Data Display
        { id: 'datagrid', name: 'Data Grid', icon: <TableCellsIcon className="w-5 h-5" />, component: <DataGridDemo />, category: 'Data Display' },
        { id: 'tree', name: 'Tree View', icon: <ListTreeIcon className="w-5 h-5" />, component: <TreeViewDemo />, category: 'Data Display' },
        { id: 'charts', name: 'Charts', icon: <ChartBarIcon className="w-5 h-5" />, component: <ChartsDemo />, category: 'Data Display' },
        { id: 'avatar', name: 'Avatar Group', icon: <UserCircleIcon className="w-5 h-5" />, component: <AvatarDemo />, category: 'Data Display' },
        { id: 'badge', name: 'Badge', icon: <TagIcon className="w-5 h-5" />, component: <BadgeDemo />, category: 'Data Display' },

        // Feedback
        { id: 'toast', name: 'Toast', icon: <BellIcon className="w-5 h-5" />, component: <ToastDemo />, category: 'Feedback' },
        { id: 'dialog', name: 'Dialog', icon: <ComputerDesktopIcon className="w-5 h-5" />, component: <DialogDemo />, category: 'Feedback' },
        { id: 'tooltip', name: 'Tooltip', icon: <ChatBubbleLeftRightIcon className="w-5 h-5" />, component: <TooltipDemo />, category: 'Feedback' },
        { id: 'skeleton', name: 'Skeleton', icon: <CubeTransparentIcon className="w-5 h-5" />, component: <SkeletonDemo />, category: 'Feedback' },

        // Navigation
        { id: 'tabs', name: 'Tabs', icon: <RectangleStackIcon className="w-5 h-5" />, component: <TabsDemo />, category: 'Navigation' },
        { id: 'breadcrumb', name: 'Breadcrumb', icon: <HomeIcon className="w-5 h-5" />, component: <BreadcrumbDemo />, category: 'Navigation' },

        // Layout
        { id: 'accordion', name: 'Accordion', icon: <ChevronDownIcon className="w-5 h-5 transform rotate-90" />, component: <AccordionDemo />, category: 'Layout' },
        { id: 'dnd', name: 'Drag and Drop', icon: <ArrowsUpDownIcon className="w-5 h-5" />, component: <DragAndDropDemo />, category: 'Layout' },

        // Editors
        { id: 'monaco', name: 'Code Editor', icon: <CodeIcon className="w-5 h-5" />, component: <MonacoEditorDemo />, category: 'Editors' },
        { id: 'wysiwyg', name: 'Rich Text', icon: <DocumentTextIcon className="w-5 h-5" />, component: <WysiwygDemo />, category: 'Editors' },

        // Media
        { id: 'image', name: 'Image Viewer', icon: <PhotoIcon className="w-5 h-5" />, component: <ImageViewerDemo />, category: 'Media' },
        { id: 'media', name: 'Media Player', icon: <PlayCircleIcon className="w-5 h-5" />, component: <MediaPlayerDemo />, category: 'Media' },
    ], []);

    const [activeShowcaseId, setActiveShowcaseId] = useState<string>(showcases[0].id);

    const activeShowcase = useMemo(() => showcases.find(s => s.id === activeShowcaseId) || showcases[0], [activeShowcaseId, showcases]);

    return (
        <div className="flex h-screen bg-slate-950 font-sans">
            <Sidebar showcases={showcases} activeShowcaseId={activeShowcaseId} setActiveShowcaseId={setActiveShowcaseId} />
            <main className="flex-1 overflow-y-auto p-6 lg:p-10 scroll-smooth">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center space-x-4 mb-8 pb-6 border-b border-slate-800">
                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-sky-500 shadow-sm">
                             {activeShowcase?.icon}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-slate-100 tracking-tight">{activeShowcase?.name}</h1>
                            <p className="text-slate-500 text-sm mt-1">{activeShowcase?.category}</p>
                        </div>
                    </div>
                    <div className="animate-fade-in">
                        {activeShowcase?.component}
                    </div>
                </div>
                <footer className="max-w-5xl mx-auto text-center mt-20 py-8 text-slate-600 text-sm border-t border-slate-800/50">
                    <p className="flex items-center justify-center space-x-2">
                        <span>Powered by Gemini</span>
                        <GeminiIcon className="w-4 h-4" />
                    </p>
                </footer>
            </main>
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fadeIn 0.3s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default App;