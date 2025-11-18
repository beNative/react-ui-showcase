
import React, { useState, useMemo, useEffect, useCallback } from 'react';
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
    RectangleGroupIcon, CodeBracketIcon, CalculatorIcon, QrCodeIcon, HandRaisedIcon, FingerPrintIcon, FaceSmileIcon,
    EyeIcon, ShareIcon, CpuChipIcon, DocumentIcon, ChevronRightIcon, ChevronLeftIcon,
    ExpandIcon, ContractIcon, StarFilledIcon, MagnifyingGlassIcon
} from './components/Icons';

// Component Imports
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
import RichTextEditorDemo from './components/RichTextEditorDemo';
import MarkdownEditorDemo from './components/MarkdownEditorDemo';
import BlockEditorDemo from './components/BlockEditorDemo';
import DiffViewerDemo from './components/DiffViewerDemo';
import SpreadsheetDemo from './components/SpreadsheetDemo';
import CodePreviewDemo from './components/CodePreviewDemo';
import MathEditorDemo from './components/MathEditorDemo';
import DiagramEditorDemo from './components/DiagramEditorDemo';
import HexEditorDemo from './components/HexEditorDemo';
import PdfViewerDemo from './components/PdfViewerDemo';


const App: React.FC = () => {
    // --- State Management ---
    
    // Theme
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
             return localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
        return true;
    });

    // Layout
    const [isCompact, setIsCompact] = useState(() => localStorage.getItem('sidebar_compact') === 'true');
    const [zenMode, setZenMode] = useState(false);
    const [isRTL, setIsRTL] = useState(false);
    const [fontSize, setFontSize] = useState(16);

    // Navigation & Content
    const [activeShowcaseId, setActiveShowcaseId] = useState('controls'); // Default fallback
    const [favorites, setFavorites] = useState<Set<string>>(() => {
        const saved = localStorage.getItem('favorites');
        return saved ? new Set(JSON.parse(saved)) : new Set();
    });
    const [recents, setRecents] = useState<string[]>(() => {
        const saved = localStorage.getItem('recents');
        return saved ? JSON.parse(saved) : [];
    });
    const [primaryColor, setPrimaryColor] = useState('#0ea5e9'); // Sky-500

    // Command Palette
    const [showCmdPalette, setShowCmdPalette] = useState(false);
    const [cmdQuery, setCmdQuery] = useState('');

    // --- Data Definition ---
    
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
        { id: 'spreadsheet', name: 'Spreadsheet', icon: <TableCellsIcon className="w-5 h-5 text-green-500" />, component: <SpreadsheetDemo />, category: 'Data Display' },
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
        { id: 'diff', name: 'Diff Viewer', icon: <ArrowsRightLeftIcon className="w-5 h-5" />, component: <DiffViewerDemo />, category: 'Data Display' },
        { id: 'hex', name: 'Hex Editor', icon: <CpuChipIcon className="w-5 h-5" />, component: <HexEditorDemo />, category: 'Data Display' },
        { id: 'pdf', name: 'PDF Viewer', icon: <DocumentIcon className="w-5 h-5" />, component: <PdfViewerDemo />, category: 'Data Display' },
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
        { id: 'richtext', name: 'Rich Text Editor', icon: <PencilSquareIcon className="w-5 h-5" />, component: <RichTextEditorDemo />, category: 'Editors' },
        { id: 'markdown', name: 'Markdown Editor', icon: <EyeIcon className="w-5 h-5" />, component: <MarkdownEditorDemo />, category: 'Editors' },
        { id: 'monaco', name: 'Code Editor', icon: <CodeIcon className="w-5 h-5" />, component: <MonacoEditorDemo />, category: 'Editors' },
        { id: 'block', name: 'Block Editor', icon: <RectangleGroupIcon className="w-5 h-5" />, component: <BlockEditorDemo />, category: 'Editors' },
        { id: 'codepreview', name: 'Code Playground', icon: <PlayCircleIcon className="w-5 h-5" />, component: <CodePreviewDemo />, category: 'Editors' },
        { id: 'math', name: 'Math Editor', icon: <CalculatorIcon className="w-5 h-5" />, component: <MathEditorDemo />, category: 'Editors' },
        { id: 'diagram', name: 'Diagram Editor', icon: <ShareIcon className="w-5 h-5" />, component: <DiagramEditorDemo />, category: 'Editors' },
        { id: 'terminal', name: 'Terminal', icon: <CommandLineIcon className="w-5 h-5" />, component: <TerminalDemo />, category: 'Editors' },
        { id: 'wysiwyg', name: 'Legacy WYSIWYG', icon: <DocumentTextIcon className="w-5 h-5" />, component: <WysiwygDemo />, category: 'Editors' },

        // Media
        { id: 'image', name: 'Image Viewer', icon: <PhotoIcon className="w-5 h-5" />, component: <ImageViewerDemo />, category: 'Media' },
        { id: 'carousel', name: 'Carousel', icon: <ViewColumnsIcon className="w-5 h-5" />, component: <CarouselDemo />, category: 'Media' },
        { id: 'compare', name: 'Image Compare', icon: <CompareIcon className="w-5 h-5" />, component: <ImageCompareDemo />, category: 'Media' },
        { id: 'media', name: 'Media Player', icon: <PlayCircleIcon className="w-5 h-5" />, component: <MediaPlayerDemo />, category: 'Media' },
    ], []);

    // --- Effects & Logic ---

    // 1. Sync Theme
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

    // 2. URL Routing (Deep Linking)
    useEffect(() => {
        const hash = window.location.hash.replace('#', '');
        if (hash) {
            const found = showcases.find(s => s.id === hash);
            if (found) setActiveShowcaseId(found.id);
        }
    }, [showcases]);

    const updateActiveShowcase = (id: string) => {
        setActiveShowcaseId(id);
        window.location.hash = id;
        
        // Update Recents
        setRecents(prev => {
            const filtered = prev.filter(i => i !== id);
            const newRecents = [id, ...filtered].slice(0, 10);
            localStorage.setItem('recents', JSON.stringify(newRecents));
            return newRecents;
        });
    };

    // 3. Keyboard Shortcuts (Global Command Palette)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === '/') {
                e.preventDefault();
                setShowCmdPalette(prev => !prev);
            }
            if (e.key === 'Escape') {
                setShowCmdPalette(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // --- Actions ---

    const toggleTheme = () => setIsDarkMode(!isDarkMode);
    const toggleCompact = () => {
        const newVal = !isCompact;
        setIsCompact(newVal);
        localStorage.setItem('sidebar_compact', String(newVal));
    };
    const toggleFavorite = (id: string) => {
        const newFavs = new Set(favorites);
        if (newFavs.has(id)) newFavs.delete(id);
        else newFavs.add(id);
        setFavorites(newFavs);
        localStorage.setItem('favorites', JSON.stringify(Array.from(newFavs)));
    };
    
    const resetSettings = () => {
        if (confirm("Reset all settings (theme, favorites, history)?")) {
            localStorage.clear();
            window.location.reload();
        }
    };
    
    const navigateShowcase = (direction: 'prev' | 'next') => {
        const idx = showcases.findIndex(s => s.id === activeShowcaseId);
        if (idx === -1) return;
        
        let newIdx = direction === 'next' ? idx + 1 : idx - 1;
        // Wrap around
        if (newIdx >= showcases.length) newIdx = 0;
        if (newIdx < 0) newIdx = showcases.length - 1;
        
        updateActiveShowcase(showcases[newIdx].id);
    };

    // --- Derived State ---
    const activeShowcase = useMemo(() => showcases.find(s => s.id === activeShowcaseId) || showcases[0], [activeShowcaseId, showcases]);
    
    const activeIndex = showcases.findIndex(s => s.id === activeShowcaseId);
    const prevShowcase = activeIndex > 0 ? showcases[activeIndex - 1] : null;
    const nextShowcase = activeIndex < showcases.length - 1 ? showcases[activeIndex + 1] : null;

    const filteredCommands = showcases.filter(s => s.name.toLowerCase().includes(cmdQuery.toLowerCase()));

    return (
        <div className={`flex h-screen bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300 text-slate-900 dark:text-slate-300 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`} dir={isRTL ? 'rtl' : 'ltr'} style={{ fontSize: `${fontSize}px` }}>
            
            {/* Sidebar (Hidden in Zen Mode) */}
            {!zenMode && (
                <Sidebar 
                    showcases={showcases} 
                    activeShowcaseId={activeShowcaseId} 
                    setActiveShowcaseId={updateActiveShowcase} 
                    isDarkMode={isDarkMode}
                    toggleTheme={toggleTheme}
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                    recents={recents}
                    isCompact={isCompact}
                    toggleCompact={toggleCompact}
                    primaryColor={primaryColor}
                    setPrimaryColor={setPrimaryColor}
                    resetSettings={resetSettings}
                />
            )}

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto relative scroll-smooth">
                 {/* Header Bar */}
                <div className="sticky top-0 z-20 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 py-3 flex items-center justify-between transition-colors">
                    <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
                         <button onClick={() => setZenMode(!zenMode)} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors" title="Toggle Zen Mode">
                            {zenMode ? <ContractIcon className="w-4 h-4" /> : <ExpandIcon className="w-4 h-4" />}
                         </button>
                         {/* Breadcrumbs */}
                         <span className="hidden sm:inline text-slate-300 dark:text-slate-600">/</span>
                         <span className="hidden sm:inline">{activeShowcase?.category}</span>
                         <span className="text-slate-300 dark:text-slate-600">/</span>
                         <span className="font-medium text-slate-900 dark:text-slate-200">{activeShowcase?.name}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                         <button onClick={() => setShowCmdPalette(true)} className="hidden md:flex items-center px-2 py-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded text-xs text-slate-500 dark:text-slate-400 hover:border-sky-500 transition-colors">
                             <span className="mr-2">Search</span>
                             <kbd className="font-mono bg-white dark:bg-slate-800 px-1 rounded border border-slate-300 dark:border-slate-700">⌘ /</kbd>
                         </button>
                         
                         <div className="w-px h-4 bg-slate-300 dark:bg-slate-700 mx-2 hidden sm:block"></div>

                         {/* Font Size & RTL Toggles (Quick Settings) */}
                         <button onClick={() => setFontSize(s => s === 16 ? 18 : (s === 18 ? 14 : 16))} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-500" title="Toggle Font Size">
                             <span className="font-serif font-bold">A</span>
                         </button>
                         <button onClick={() => setIsRTL(r => !r)} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-500 text-xs font-bold" title="Toggle RTL">
                             {isRTL ? 'LTR' : 'RTL'}
                         </button>
                    </div>
                </div>

                <div className="p-6 lg:p-10 max-w-5xl mx-auto min-h-[calc(100vh-64px)] flex flex-col">
                    <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-200 dark:border-slate-800 transition-colors">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors" style={{ color: primaryColor }}>
                                {activeShowcase?.icon}
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight transition-colors">{activeShowcase?.name}</h1>
                                    {/* Mock Status Badge */}
                                    {['kanban', 'calendar', 'dock'].includes(activeShowcaseId) && (
                                        <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-bold rounded-full uppercase tracking-wide border border-purple-200 dark:border-purple-800">New</span>
                                    )}
                                </div>
                                <p className="text-slate-500 text-sm mt-1">{activeShowcase?.category} Component</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => toggleFavorite(activeShowcaseId)}
                            className={`p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${favorites.has(activeShowcaseId) ? 'text-amber-400' : 'text-slate-300 dark:text-slate-600'}`}
                        >
                            {favorites.has(activeShowcaseId) ? <StarFilledIcon className="w-6 h-6" /> : <StarIcon className="w-6 h-6" />}
                        </button>
                    </div>
                    
                    <div className="animate-fade-in flex-1">
                        {activeShowcase?.component}
                    </div>

                    {/* Navigation Footer */}
                    <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
                        {prevShowcase ? (
                            <button 
                                onClick={() => updateActiveShowcase(prevShowcase.id)}
                                className="flex items-center group"
                            >
                                <div className="p-2 rounded-full border border-slate-200 dark:border-slate-700 text-slate-500 group-hover:border-sky-500 group-hover:text-sky-500 transition-colors mr-3">
                                    <ChevronLeftIcon className="w-4 h-4" />
                                </div>
                                <div className="text-left">
                                    <div className="text-xs text-slate-500 uppercase">Previous</div>
                                    <div className="text-sm font-medium text-slate-900 dark:text-slate-200 group-hover:text-sky-500">{prevShowcase.name}</div>
                                </div>
                            </button>
                        ) : <div></div>}

                        {nextShowcase ? (
                            <button 
                                onClick={() => updateActiveShowcase(nextShowcase.id)}
                                className="flex items-center group"
                            >
                                <div className="text-right">
                                    <div className="text-xs text-slate-500 uppercase">Next</div>
                                    <div className="text-sm font-medium text-slate-900 dark:text-slate-200 group-hover:text-sky-500">{nextShowcase.name}</div>
                                </div>
                                <div className="p-2 rounded-full border border-slate-200 dark:border-slate-700 text-slate-500 group-hover:border-sky-500 group-hover:text-sky-500 transition-colors ml-3">
                                    <ChevronRightIcon className="w-4 h-4" />
                                </div>
                            </button>
                        ) : <div></div>}
                    </div>
                </div>
            </main>
            
            {/* Global Command Palette Overlay */}
            {showCmdPalette && (
                <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4" style={{ fontSize: '16px' }}>
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowCmdPalette(false)}></div>
                    <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 animate-fade-in-up">
                        <div className="flex items-center px-4 py-3 border-b border-slate-200 dark:border-slate-800">
                             <MagnifyingGlassIcon className="w-5 h-5 text-slate-400 mr-3" />
                             <input 
                                autoFocus
                                type="text" 
                                placeholder="Go to component..." 
                                value={cmdQuery}
                                onChange={e => setCmdQuery(e.target.value)}
                                className="flex-1 bg-transparent outline-none text-slate-900 dark:text-slate-100 placeholder-slate-500"
                             />
                             <span className="text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-1 rounded text-slate-500">ESC</span>
                        </div>
                        <div className="max-h-[60vh] overflow-y-auto py-2">
                             {filteredCommands.length > 0 ? (
                                 filteredCommands.map(s => (
                                     <button 
                                        key={s.id}
                                        onClick={() => {
                                            updateActiveShowcase(s.id);
                                            setShowCmdPalette(false);
                                            setCmdQuery('');
                                        }}
                                        className="w-full text-left px-4 py-3 flex items-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
                                     >
                                         <span className="text-slate-400 group-hover:text-sky-500 mr-3">{s.icon}</span>
                                         <div>
                                             <div className="text-sm font-medium text-slate-900 dark:text-slate-100">{s.name}</div>
                                             <div className="text-xs text-slate-500">{s.category}</div>
                                         </div>
                                         {favorites.has(s.id) && <StarFilledIcon className="w-4 h-4 text-amber-400 ml-auto" />}
                                     </button>
                                 ))
                             ) : (
                                 <div className="p-4 text-center text-slate-500 text-sm">No components found.</div>
                             )}
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fadeIn 0.3s ease-out forwards;
                }
                .animate-fade-in-up {
                    animation: fadeIn 0.2s ease-out forwards;
                }
                 /* Custom Scrollbar */
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #cbd5e1;
                    border-radius: 4px;
                }
                .dark .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #334155;
                }
                .custom-scrollbar:hover::-webkit-scrollbar-thumb {
                    background: #94a3b8;
                }
                .dark .custom-scrollbar:hover::-webkit-scrollbar-thumb {
                    background: #475569;
                }
            `}</style>
        </div>
    );
};

export default App;
