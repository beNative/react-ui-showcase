
import React, { useState, useEffect, useRef } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';

const ScrollProgressDemo: React.FC = () => {
    const [scrollWidth, setScrollWidth] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        if (containerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
            const scrollPercent = (scrollTop / (scrollHeight - clientHeight)) * 100;
            setScrollWidth(scrollPercent);
        }
    };

    return (
        <div>
            <LivePreview>
                <div className="relative w-full max-w-md mx-auto h-80 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 overflow-hidden">
                    {/* Progress Bar */}
                    <div className="absolute top-0 left-0 h-1.5 bg-slate-100 dark:bg-slate-800 w-full z-10">
                        <div 
                            className="h-full bg-sky-500 transition-all duration-100 ease-out"
                            style={{ width: `${scrollWidth}%` }}
                        ></div>
                    </div>

                    {/* Scrollable Content */}
                    <div 
                        ref={containerRef}
                        onScroll={handleScroll}
                        className="h-full overflow-y-auto p-6 text-sm text-slate-600 dark:text-slate-400 leading-relaxed pt-8"
                    >
                         <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">The Art of Scrolling</h3>
                         <p className="mb-4">
                            Scrolling is one of the most fundamental interactions on the web. It allows us to navigate through content that exceeds the viewport's dimensions.
                         </p>
                         <p className="mb-4">
                            A scroll progress bar provides a subtle yet effective visual cue about the user's current position within a long document or article.
                         </p>
                         <p className="mb-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                         </p>
                         <p className="mb-4">
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                         </p>
                         <p className="mb-4">
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                         </p>
                         <p className="mb-4">
                            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                         </p>
                         <p>
                             You have reached the end of the article. The progress bar should be full.
                         </p>
                    </div>
                </div>
            </LivePreview>
            <TechnicalOverview
                library="Framer Motion (useScroll) / Custom"
                officialName="framer/motion"
                githubUrl="https://www.framer.com/motion/scroll-animations/"
                description="A reading progress bar indicates how far a user has scrolled through a page. It is particularly useful for long-form content like blog posts and documentation."
                features={[
                    "Visualizes scroll depth.",
                    "Stick to top or bottom.",
                    "Smooth animations.",
                    "Lightweight implementation."
                ]}
                installation="npm install framer-motion"
                usage={`import { motion, useScroll } from "framer-motion";\n\nconst { scrollYProgress } = useScroll();\n<motion.div style={{ scaleX: scrollYProgress }} />`}
            />
        </div>
    );
};

export default ScrollProgressDemo;
