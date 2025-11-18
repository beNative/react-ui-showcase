
import React, { useRef } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';
import { HomeIcon, ChatBubbleLeftRightIcon, PhotoIcon, Cog6ToothIcon, MusicalNoteIcon, FolderIcon } from '@heroicons/react/24/solid';

const DockItem: React.FC<{ icon: React.ReactNode; mouseX: number | null }> = ({ icon, mouseX }) => {
    const ref = useRef<HTMLDivElement>(null);

    let width = 40;

    if (mouseX !== null && ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const xDiff = mouseX - (rect.left + rect.width / 2);
        const distance = Math.abs(xDiff);
        
        // Magnification formula
        if (distance < 150) {
             width = 40 + 40 * (1 - distance / 150);
        }
    }

    return (
        <div 
            ref={ref}
            className="aspect-square rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 transition-colors shadow-lg shadow-slate-300/20 dark:shadow-black/40"
            style={{ width: `${width}px`, height: `${width}px` }}
        >
            <div style={{ transform: `scale(${width / 40})` }}>
                {icon}
            </div>
        </div>
    );
};

const DockDemo: React.FC = () => {
    const [mouseX, setMouseX] = React.useState<number | null>(null);

    const icons = [
        <HomeIcon className="w-6 h-6 text-blue-500 dark:text-blue-400" />,
        <ChatBubbleLeftRightIcon className="w-6 h-6 text-green-500 dark:text-green-400" />,
        <PhotoIcon className="w-6 h-6 text-yellow-500 dark:text-yellow-400" />,
        <MusicalNoteIcon className="w-6 h-6 text-pink-500 dark:text-pink-400" />,
        <FolderIcon className="w-6 h-6 text-sky-500 dark:text-sky-400" />,
        <Cog6ToothIcon className="w-6 h-6 text-slate-500 dark:text-slate-400" />,
    ];

    return (
        <div>
            <LivePreview>
                <div className="h-40 flex items-end justify-center pb-6 bg-slate-50 dark:bg-slate-950/50 rounded-lg transition-colors">
                    <div 
                        className="flex items-end gap-3 px-4 py-3 bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl backdrop-blur-md shadow-2xl transition-colors"
                        onMouseMove={(e) => setMouseX(e.clientX)}
                        onMouseLeave={() => setMouseX(null)}
                    >
                        {icons.map((icon, i) => (
                            <DockItem key={i} icon={icon} mouseX={mouseX} />
                        ))}
                    </div>
                </div>
            </LivePreview>
            <TechnicalOverview
                library="React Spring / Framer Motion"
                officialName="pmndrs/react-spring"
                githubUrl="https://github.com/pmndrs/react-spring"
                description="A macOS-style dock uses physics-based animations to magnify icons based on the mouse position. This creates a fluid and organic feel compared to standard linear CSS transitions."
                features={[
                    "Physics-based interpolation for smooth resizing.",
                    "Proximity detection.",
                    "Highly interactive and playful.",
                    "Responsive layout adjustment."
                ]}
                installation="npm install framer-motion"
                usage={`// Complex logic involving mouse position tracking\n// and calculating scale based on distance from cursor.`}
            />
        </div>
    );
};

export default DockDemo;
