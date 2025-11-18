
import React, { useState, useRef } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';
import { HandRaisedIcon } from './Icons';

const SwipeableItem: React.FC<{ 
    item: string; 
    onDelete: () => void; 
}> = ({ item, onDelete }) => {
    const [offsetX, setOffsetX] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const startX = useRef(0);
    const threshold = 100;

    const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
        setIsDragging(true);
        startX.current = 'touches' in e ? e.touches[0].clientX : e.clientX;
    };

    const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
        if (!isDragging) return;
        const currentX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const diff = currentX - startX.current;
        // Only allow swiping left
        setOffsetX(Math.min(0, Math.max(-150, diff)));
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
        if (offsetX < -threshold) {
            // Snap open or trigger delete? For demo, snap open
            setOffsetX(-100);
        } else {
            setOffsetX(0);
        }
    };

    return (
        <div className="relative overflow-hidden h-16 select-none">
            {/* Background Actions */}
            <div className="absolute inset-y-0 right-0 w-full flex justify-end items-center bg-red-500 rounded-lg px-4">
                <span className="font-bold text-white mr-4">Delete</span>
            </div>
            
            {/* Foreground Item */}
            <div 
                className="relative h-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg flex items-center px-4 transition-transform duration-200 ease-out z-10 cursor-grab active:cursor-grabbing"
                style={{ transform: `translateX(${offsetX}px)`, transition: isDragging ? 'none' : 'transform 0.2s ease-out' }}
                onMouseDown={handleTouchStart}
                onMouseMove={handleTouchMove}
                onMouseUp={handleTouchEnd}
                onMouseLeave={handleTouchEnd}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div className="flex-1">
                    <span className="text-slate-900 dark:text-slate-200 font-medium">{item}</span>
                </div>
                 {/* Delete Button visible when swiped */}
                 <div className="absolute right-[-90px] top-0 bottom-0 w-[90px]" onClick={(e) => { e.stopPropagation(); onDelete(); }}></div>
            </div>
             {/* Actual clickable action layer for mouse users who swiped */}
             {offsetX <= -80 && (
                 <button 
                    onClick={onDelete}
                    className="absolute right-0 top-0 bottom-0 w-24 z-20 flex items-center justify-center opacity-0 hover:opacity-0"
                    aria-label="Delete"
                 >
                 </button>
             )}
        </div>
    );
};

const SwipeableListDemo: React.FC = () => {
    const [items, setItems] = useState(['Swipe me left!', 'Check your email', 'Meeting at 10am', 'Buy groceries']);

    const handleDelete = (index: number) => {
        setItems(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <div>
            <LivePreview>
                <div className="max-w-sm mx-auto w-full space-y-3">
                    <div className="text-center text-xs text-slate-500 mb-2 flex items-center justify-center">
                        <HandRaisedIcon className="w-4 h-4 mr-1" />
                        Drag items to the left
                    </div>
                    {items.length > 0 ? (
                        items.map((item, index) => (
                            <SwipeableItem 
                                key={item} 
                                item={item} 
                                onDelete={() => handleDelete(index)} 
                            />
                        ))
                    ) : (
                        <div className="text-center py-10 text-slate-500">All items deleted! <button onClick={() => setItems(['Swipe me left!', 'Check your email', 'Meeting at 10am', 'Buy groceries'])} className="text-sky-500 underline">Reset</button></div>
                    )}
                </div>
            </LivePreview>
            <TechnicalOverview
                library="react-swipeable-list"
                officialName="sandstreamdev/react-swipeable-list"
                githubUrl="https://github.com/sandstreamdev/react-swipeable-list"
                description="A swipeable list pattern allows users to reveal actions (like delete or archive) by swiping list items horizontally. It's a common pattern in mobile apps."
                features={[
                    "Configurable left and right actions.",
                    "Thresholds for triggering actions.",
                    "Animations for swiping and returning.",
                    "Touch and mouse support."
                ]}
                installation="npm install @sandstreamdev/react-swipeable-list"
                usage={`import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';\n\n<SwipeableList>\n  <SwipeableListItem swipeLeft={{ content: <div>Delete</div>, action: () => {} }}>\n    Item Content\n  </SwipeableListItem>\n</SwipeableList>`}
            />
        </div>
    );
};

export default SwipeableListDemo;
