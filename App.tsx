
import React, { useState, useMemo, useEffect } from 'react';
import type { Showcase } from './types';
import Sidebar from './components/Sidebar';
import { 
    CodeIcon, BellIcon, ListTreeIcon, DocumentTextIcon, PhotoIcon, PlayCircleIcon, 
    AdjustmentsHorizontalIcon, GeminiIcon, TableCellsIcon, ChevronUpDownIcon, CalendarDaysIcon, 
    ArrowsUpDownIcon, ChartBarIcon, ArrowsRightLeftIcon, RectangleStackIcon, ChevronDownIcon, 
    ComputerDesktopIcon, ChatBubbleLeftRightIcon, CubeTransparentIcon, UserCircleIcon,
    TagIcon, HomeIcon, StarIcon, KeyIcon, ProgressBarIcon, SidebarIcon, CommandIcon,
    ArrowsPointingOutIcon, CursorClickIcon, ScrollIcon, IdentificationIcon, SparklesIcon, ClockIcon,
    ViewColumnsIcon, CreditCardIcon, QueueListIcon, PencilSquareIcon, CloudArrowUpIcon,
    EllipsisHorizontalCircleIcon, Bars3BottomLeftIcon, ChatBubbleOvalLeftIcon, CompareIcon, RocketLaunchIcon,
    AtSymbolIcon, CommandLineIcon, ArrowPathRoundedSquareIcon, PresentationChartLineIcon,
    RectangleGroupIcon, CodeBracketIcon, CalculatorIcon, QrCodeIcon, HandRaisedIcon, FingerPrintIcon, FaceSmileIcon
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
import OtpInputDemo from './components/OtpInputDemo';
import ProgressDemo from './components/ProgressDemo';
import SheetDemo from './components/SheetDemo';
import CommandPaletteDemo from './components/CommandPaletteDemo';
import ResizableDemo from './components/ResizableDemo';
import ContextMenuDemo from './components/ContextMenuDemo';
import ScrollAreaDemo from './components/ScrollAreaDemo';
import HoverCardDemo from './components/HoverCardDemo';
import ConfettiDemo from './components/ConfettiDemo';
import TimelineDemo from './components/TimelineDemo';
import CarouselDemo from './components/CarouselDemo';
import InputMaskDemo from './components/InputMaskDemo';
import VirtualListDemo from './components/VirtualListDemo';
import SignaturePadDemo from './components/SignaturePadDemo';
import DropzoneDemo from './components/DropzoneDemo';
import StepperDemo from './components/StepperDemo';
import MenubarDemo from './components/MenubarDemo';
import PopoverDemo from './components/PopoverDemo';
import ImageCompareDemo from './components/ImageCompareDemo';
import SpeedDialDemo from './components/TourDemo';
import CalendarDemo from './components/CalendarDemo';
import KanbanDemo from './components/KanbanDemo';
import TransferDemo from './components/TransferDemo';
import MentionsDemo from './components/MentionsDemo';
import TerminalDemo from './components/TerminalDemo';
import KnobDemo from './components/KnobDemo';
import FlipCardDemo from './components/FlipCardDemo';
import TypewriterDemo from './components/TypewriterDemo';
import DockDemo from './components/DockDemo';
import SparklineDemo from './components/SparklineDemo';
import MasonryDemo from './components/MasonryDemo';
import SyntaxHighlighterDemo from './components/SyntaxHighlighterDemo';
import JsonViewerDemo from './components/JsonViewerDemo';
import CountUpDemo from './components/CountUpDemo';
import QRCodeDemo from './components/QRCodeDemo';
import SwipeableListDemo from './components/SwipeableListDemo';
import CreditCardDemo from './components/CreditCardDemo';
import RippleDemo from './components/RippleDemo';
import ScrollProgressDemo from './components/ScrollProgressDemo';
import EmojiPickerDemo from './components/EmojiPickerDemo';


const App: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
             return document.documentElement.classList.contains('dark');
        }
        return true;
    });

    useEffect(() => {
        const root = document.documentElement;
        if (isDarkMode) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    const showcases: Showcase[] = useMemo(() => [
        // Inputs
        { id: 'controls', name: 'Controls', icon: <AdjustmentsHorizontalIcon className="w-5 h-5" />, component: <ControlsDemo />, category: 'Inputs' },
        { id: 'select', name: 'Select', icon: <ChevronUpDownIcon className="w-5 h-5" />, component: <SelectDemo />, category: 'Inputs' },
        { id: 'otp', name: 'OTP Input', icon: <KeyIcon className="w-5 h-5" />, component: <OtpInputDemo />, category: 'Inputs' },
        { id: 'inputmask', name: 'Input Mask', icon: <CreditCardIcon className="w-5 h-5" />, component: <InputMaskDemo />, category: 'Inputs' },
        { id: 'creditcard', name: 'Credit Card', icon: <CreditCardIcon className="w-5 h-5" />, component: <CreditCardDemo />, category: 'Inputs' },
        { id: 'datepicker', name: 'Date Picker', icon: <CalendarDaysIcon className="w-5 h-5" />, component: <DatePickerDemo />, category: 'Inputs' },
        { id: 'rangeslider', name: 'Range Slider', icon: <ArrowsRightLeftIcon className="w-5 h-5" />, component: <RangeSliderDemo />, category: 'Inputs' },
        { id: 'rating', name: 'Rating', icon: <StarIcon className="w-5 h-5" />, component: <RatingDemo />, category: 'Inputs' },
        { id: 'knob', name: 'Knob', icon: <AdjustmentsHorizontalIcon className="w-5 h-5 transform rotate-90" />, component: <KnobDemo />, category: 'Inputs' },
        { id: 'mentions', name: 'Mentions', icon: <AtSymbolIcon className="w-5 h-5" />, component: <MentionsDemo />, category: 'Inputs' },
        { id: 'signature', name: 'Signature Pad', icon: <PencilSquareIcon className="w-5 h-5" />, component: <SignaturePadDemo />, category: 'Inputs' },
        { id: 'dropzone', name: 'File Dropzone', icon: <CloudArrowUpIcon className="w-5 h-5" />, component: <DropzoneDemo />, category: 'Inputs' },
        { id: 'transfer', name: 'Transfer', icon: <ArrowsRightLeftIcon className="w-5 h-5" />, component: <TransferDemo />, category: 'Inputs' },
        { id: 'emoji', name: 'Emoji Picker', icon: <FaceSmileIcon className="w-5 h-5" />, component: <EmojiPickerDemo />, category: 'Inputs' },

        // Data Display
        { id: 'datagrid', name: 'Data Grid', icon: <TableCellsIcon className="w-5 h-5" />, component: <DataGridDemo />, category: 'Data Display' },
        { id: 'virtuallist', name: 'Virtual List', icon: <QueueListIcon className="w-5 h-5" />, component: <VirtualListDemo />, category: 'Data Display' },
        { id: 'masonry', name: 'Masonry Grid', icon: <RectangleGroupIcon className="w-5 h-5" />, component: <MasonryDemo />, category: 'Data Display' },
        { id: 'calendar', name: 'Calendar', icon: <CalendarDaysIcon className="w-5 h-5" />, component: <CalendarDemo />, category: 'Data Display' },
        { id: 'kanban', name: 'Kanban', icon: <ViewColumnsIcon className="w-5 h-5" />, component: <KanbanDemo />, category: 'Data Display' },
        { id: 'tree', name: 'Tree View', icon: <ListTreeIcon className="w-5 h-5" />, component: <TreeViewDemo />, category: 'Data Display' },
        { id: 'charts', name: 'Charts', icon: <ChartBarIcon className="w-5 h-5" />, component: <ChartsDemo />, category: 'Data Display' },
        { id: 'sparkline', name: 'Sparkline', icon: <PresentationChartLineIcon className="w-5 h-5" />, component: <SparklineDemo />, category: 'Data Display' },
        { id: 'timeline', name: 'Timeline', icon: <ClockIcon className="w-5 h-5" />, component: <TimelineDemo />, category: 'Data Display' },
        { id: 'avatar', name: 'Avatar Group', icon: <UserCircleIcon className="w-5 h-5" />, component: <AvatarDemo />, category: 'Data Display' },
        { id: 'badge', name: 'Badge', icon: <TagIcon className="w-5 h-5" />, component: <BadgeDemo />, category: 'Data Display' },
        { id: 'hovercard', name: 'Hover Card', icon: <IdentificationIcon className="w-5 h-5" />, component: <HoverCardDemo />, category: 'Data Display' },
        { id: 'flipcard', name: 'Flip Card', icon: <ArrowPathRoundedSquareIcon className="w-5 h-5" />, component: <FlipCardDemo />, category: 'Data Display' },
        { id: 'typewriter', name: 'Typewriter', icon: <CursorClickIcon className="w-5 h-5" />, component: <TypewriterDemo />, category: 'Data Display' },
        { id: 'syntax', name: 'Syntax Highlight', icon: <CodeBracketIcon className="w-5 h-5" />, component: <SyntaxHighlighterDemo />, category: 'Data Display' },
        { id: 'json', name: 'JSON Viewer', icon: <CodeIcon className="w-5 h-5" />, component: <JsonViewerDemo />, category: 'Data Display' },
        { id: 'countup', name: 'CountUp', icon: <CalculatorIcon className="w-5 h-5" />, component: <CountUpDemo />, category: 'Data Display' },
        { id: 'qrcode', name: 'QR Code', icon: <QrCodeIcon className="w-5 h-5" />, component: <QRCodeDemo />, category: 'Data Display' },

        // Feedback
        { id: 'toast', name: 'Toast', icon: <BellIcon className="w-5 h-5" />, component: <ToastDemo />, category: 'Feedback' },
        { id: 'progress', name: 'Progress', icon: <ProgressBarIcon className="w-5 h-5" />, component: <ProgressDemo />, category: 'Feedback' },
        { id: 'scrollprogress', name: 'Scroll Progress', icon: <ProgressBarIcon className="w-5 h-5 transform rotate-90" />, component: <ScrollProgressDemo />, category: 'Feedback' },
        { id: 'dialog', name: 'Dialog', icon: <ComputerDesktopIcon className="w-5 h-5" />, component: <DialogDemo />, category: 'Feedback' },
        { id: 'popover', name: 'Popover', icon: <ChatBubbleOvalLeftIcon className="w-5 h-5" />, component: <PopoverDemo />, category: 'Feedback' },
        { id: 'tooltip', name: 'Tooltip', icon: <ChatBubbleLeftRightIcon className="w-5 h-5" />, component: <TooltipDemo />, category: 'Feedback' },
        { id: 'skeleton', name: 'Skeleton', icon: <CubeTransparentIcon className="w-5 h-5" />, component: <SkeletonDemo />, category: 'Feedback' },
        { id: 'confetti', name: 'Confetti', icon: <SparklesIcon className="w-5 h-5" />, component: <ConfettiDemo />, category: 'Feedback' },
        { id: 'ripple', name: 'Ripple', icon: <FingerPrintIcon className="w-5 h-5" />, component: <RippleDemo />, category: 'Feedback' },

        // Navigation
        { id: 'tabs', name: 'Tabs', icon: <RectangleStackIcon className="w-5 h-5" />, component: <TabsDemo />, category: 'Navigation' },
        { id: 'menubar', name: 'Menubar', icon: <Bars3BottomLeftIcon className="w-5 h-5" />, component: <MenubarDemo />, category: 'Navigation' },
        { id: 'dock', name: 'Dock', icon: <ComputerDesktopIcon className="w-5 h-5" />, component: <DockDemo />, category: 'Navigation' },
        { id: 'stepper', name: 'Stepper', icon: <EllipsisHorizontalCircleIcon className="w-5 h-5" />, component: <StepperDemo />, category: 'Navigation' },
        { id: 'breadcrumb', name: 'Breadcrumb', icon: <HomeIcon className="w-5 h-5" />, component: <BreadcrumbDemo />, category: 'Navigation' },
        { id: 'command', name: 'Command Palette', icon: <CommandIcon className="w-5 h-5" />, component: <CommandPaletteDemo />, category: 'Navigation' },
        { id: 'contextmenu', name: 'Context Menu', icon: <CursorClickIcon className="w-5 h-5" />, component: <ContextMenuDemo />, category: 'Navigation' },
        { id: 'speeddial', name: 'Speed Dial', icon: <RocketLaunchIcon className="w-5 h-5" />, component: <SpeedDialDemo />, category: 'Navigation' },

        // Layout
        { id: 'sheet', name: 'Sheet / Drawer', icon: <SidebarIcon className="w-5 h-5" />, component: <SheetDemo />, category: 'Layout' },
        { id: 'accordion', name: 'Accordion', icon: <ChevronDownIcon className="w-5 h-5 transform rotate-90" />, component: <AccordionDemo />, category: 'Layout' },
        { id: 'resizable', name: 'Resizable Panels', icon: <ArrowsPointingOutIcon className="w-5 h-5" />, component: <ResizableDemo />, category: 'Layout' },
        { id: 'scrollarea', name: 'Scroll Area', icon: <ScrollIcon className="w-5 h-5" />, component: <ScrollAreaDemo />, category: 'Layout' },
        { id: 'dnd', name: 'Drag and Drop', icon: <ArrowsUpDownIcon className="w-5 h-5" />, component: <DragAndDropDemo />, category: 'Layout' },
        { id: 'swipeable', name: 'Swipeable List', icon: <HandRaisedIcon className="w-5 h-5" />, component: <SwipeableListDemo />, category: 'Layout' },

        // Editors
        { id: 'monaco', name: 'Code Editor', icon: <CodeIcon className="w-5 h-5" />, component: <MonacoEditorDemo />, category: 'Editors' },
        { id: 'terminal', name: 'Terminal', icon: <CommandLineIcon className="w-5 h-5" />, component: <TerminalDemo />, category: 'Editors' },
        { id: 'wysiwyg', name: 'Rich Text', icon: <DocumentTextIcon className="w-5 h-5" />, component: <WysiwygDemo />, category: 'Editors' },

        // Media
        { id: 'image', name: 'Image Viewer', icon: <PhotoIcon className="w-5 h-5" />, component: <ImageViewerDemo />, category: 'Media' },
        { id: 'carousel', name: 'Carousel', icon: <ViewColumnsIcon className="w-5 h-5" />, component: <CarouselDemo />, category: 'Media' },
        { id: 'compare', name: 'Image Compare', icon: <CompareIcon className="w-5 h-5" />, component: <ImageCompareDemo />, category: 'Media' },
        { id: 'media', name: 'Media Player', icon: <PlayCircleIcon className="w-5 h-5" />, component: <MediaPlayerDemo />, category: 'Media' },
    ], []);

    const [activeShowcaseId, setActiveShowcaseId] = useState<string>(showcases[0].id);

    const activeShowcase = useMemo(() => showcases.find(s => s.id === activeShowcaseId) || showcases[0], [activeShowcaseId, showcases]);

    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300 text-slate-900 dark:text-slate-300">
            <Sidebar 
                showcases={showcases} 
                activeShowcaseId={activeShowcaseId} 
                setActiveShowcaseId={setActiveShowcaseId} 
                isDarkMode={isDarkMode}
                toggleTheme={toggleTheme}
            />
            <main className="flex-1 overflow-y-auto p-6 lg:p-10 scroll-smooth">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center space-x-4 mb-8 pb-6 border-b border-slate-200 dark:border-slate-800 transition-colors">
                        <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-sky-600 dark:text-sky-500 shadow-sm transition-colors">
                             {activeShowcase?.icon}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight transition-colors">{activeShowcase?.name}</h1>
                            <p className="text-slate-500 text-sm mt-1">{activeShowcase?.category}</p>
                        </div>
                    </div>
                    <div className="animate-fade-in">
                        {activeShowcase?.component}
                    </div>
                </div>
                <footer className="max-w-5xl mx-auto text-center mt-20 py-8 text-slate-500 dark:text-slate-600 text-sm border-t border-slate-200 dark:border-slate-800/50 transition-colors">
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
