
import React, { useState, useRef, useEffect } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';
import { CompareIcon } from './Icons';

const ImageCompareDemo: React.FC = () => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = (event: MouseEvent | TouchEvent) => {
        if (!containerRef.current) return;
        
        const rect = containerRef.current.getBoundingClientRect();
        const x = 'touches' in event ? event.touches[0].clientX : event.clientX;
        const position = ((x - rect.left) / rect.width) * 100;
        
        setSliderPosition(Math.min(Math.max(position, 0), 100));
    };

    const handleMouseDown = () => setIsDragging(true);
    const handleMouseUp = () => setIsDragging(false);

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMove);
            window.addEventListener('touchmove', handleMove);
            window.addEventListener('mouseup', handleMouseUp);
            window.addEventListener('touchend', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('touchmove', handleMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchend', handleMouseUp);
        };
    }, [isDragging]);

    return (
        <div>
            <LivePreview>
                <div className="flex justify-center">
                    <div 
                        ref={containerRef}
                        className="relative w-full max-w-2xl aspect-video rounded-xl overflow-hidden select-none cursor-ew-resize group"
                        onMouseDown={handleMouseDown}
                        onTouchStart={handleMouseDown}
                    >
                        {/* After Image (Background) */}
                        <img 
                            src="https://picsum.photos/id/28/800/500?grayscale" 
                            alt="After" 
                            className="absolute inset-0 w-full h-full object-cover"
                            draggable={false}
                        />
                         <div className="absolute top-4 right-4 bg-black/60 px-2 py-1 rounded text-xs font-bold text-white pointer-events-none">
                            Grayscale
                        </div>

                        {/* Before Image (Foreground, Clipped) */}
                        <div 
                            className="absolute inset-0 w-full h-full overflow-hidden"
                            style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
                        >
                            <img 
                                src="https://picsum.photos/id/28/800/500" 
                                alt="Before" 
                                className="absolute inset-0 w-full h-full object-cover"
                                draggable={false}
                            />
                            <div className="absolute top-4 left-4 bg-black/60 px-2 py-1 rounded text-xs font-bold text-white pointer-events-none">
                                Color
                            </div>
                        </div>

                        {/* Slider Handle */}
                        <div 
                            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-10"
                            style={{ left: `${sliderPosition}%` }}
                        >
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-600">
                                <CompareIcon className="w-5 h-5" />
                            </div>
                        </div>
                    </div>
                </div>
            </LivePreview>
            <TechnicalOverview
                library="react-compare-slider"
                officialName="nerdyman/react-compare-slider"
                githubUrl="https://github.com/nerdyman/react-compare-slider"
                description="An image comparison slider is a UI pattern for comparing two images (like before/after effects) by dragging a slider over them to reveal portions of each."
                features={[
                    "Support for images or any React component.",
                    "Touch-friendly dragging.",
                    "Horizontal and vertical orientation.",
                    "Responsive sizing."
                ]}
                installation="npm install react-compare-slider"
                usage={`import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';\n\n<ReactCompareSlider\n  itemOne={<ReactCompareSliderImage src="..." />}\n  itemTwo={<ReactCompareSliderImage src="..." />}\n/>`}
            />
        </div>
    );
};

export default ImageCompareDemo;
