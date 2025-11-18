import React, { useState } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';
import { IdentificationIcon, CalendarDaysIcon } from './Icons';

const HoverCardDemo: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false);
    const timeoutRef = React.useRef<any>(null);

    const handleMouseEnter = () => {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setIsHovered(true), 300); // Open delay
    };

    const handleMouseLeave = () => {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setIsHovered(false), 100); // Close delay
    };

    return (
        <div>
            <LivePreview>
                <div className="flex items-center justify-center h-32">
                    <div className="relative inline-block">
                        <a
                            href="#"
                            className="text-sm font-medium text-sky-400 hover:underline underline-offset-4"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            onClick={(e) => e.preventDefault()}
                        >
                            @nextjs
                        </a>

                        {/* Card Content */}
                        <div
                            className={`absolute z-20 bottom-full left-1/2 -translate-x-1/2 mb-2 w-80 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-4 transition-all duration-200 origin-bottom ${isHovered ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-2 pointer-events-none'}`}
                            onMouseEnter={handleMouseEnter} // Keep open when hovering content
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="flex justify-between space-x-4">
                                <div className="flex-shrink-0">
                                     <div className="h-12 w-12 rounded-full bg-white text-black flex items-center justify-center text-xl font-bold">
                                         <span className="text-black">N</span>
                                     </div>
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-sm font-semibold text-slate-100">Next.js</h4>
                                    <p className="text-sm text-slate-400">The React Framework – created and maintained by @vercel.</p>
                                    <div className="flex items-center pt-2">
                                        <CalendarDaysIcon className="mr-2 h-4 w-4 opacity-70 text-slate-500" />
                                        <span className="text-xs text-slate-500">Joined December 2010</span>
                                    </div>
                                </div>
                            </div>
                            {/* Arrow */}
                             <div className="absolute left-1/2 -translate-x-1/2 bottom-[-6px] w-3 h-3 bg-slate-900 border-r border-b border-slate-800 transform rotate-45"></div>
                        </div>
                    </div>
                </div>
            </LivePreview>
            <TechnicalOverview
                library="Radix UI Hover Card"
                officialName="radix-ui/primitives"
                githubUrl="https://github.com/radix-ui/primitives"
                description="A hover card allows sighted users to preview content available behind a link, such as user profiles or article summaries, triggered by hover."
                features={[
                    "Opens after a delay to prevent accidental triggers.",
                    "Keeps open when moving mouse to content.",
                    "Accessible via keyboard focus.",
                    "Collision awareness (stays on screen)."
                ]}
                installation="npm install @radix-ui/react-hover-card"
                usage={`import * as HoverCard from '@radix-ui/react-hover-card';\n\n<HoverCard.Root>\n  <HoverCard.Trigger>@nextjs</HoverCard.Trigger>\n  <HoverCard.Content>...</HoverCard.Content>\n</HoverCard.Root>`}
            />
        </div>
    );
};

export default HoverCardDemo;