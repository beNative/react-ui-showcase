
import React, { useState, useRef, useEffect } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';
import { ChevronRightIcon } from './Icons';

const slides = [
    { id: 1, color: 'bg-red-500', text: 'Slide 1' },
    { id: 2, color: 'bg-blue-500', text: 'Slide 2' },
    { id: 3, color: 'bg-green-500', text: 'Slide 3' },
    { id: 4, color: 'bg-yellow-500', text: 'Slide 4' },
    { id: 5, color: 'bg-purple-500', text: 'Slide 5' },
];

const CarouselDemo: React.FC = () => {
    const scrollContainer = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const scrollToSlide = (index: number) => {
        if (!scrollContainer.current) return;
        const width = scrollContainer.current.offsetWidth;
        scrollContainer.current.scrollTo({
            left: width * index,
            behavior: 'smooth',
        });
        setCurrentIndex(index);
    };

    const nextSlide = () => {
        const newIndex = (currentIndex + 1) % slides.length;
        scrollToSlide(newIndex);
    };

    const prevSlide = () => {
        const newIndex = (currentIndex - 1 + slides.length) % slides.length;
        scrollToSlide(newIndex);
    };

    // Sync internal state with manual scrolling
    useEffect(() => {
        const container = scrollContainer.current;
        if (!container) return;

        const handleScroll = () => {
            const index = Math.round(container.scrollLeft / container.offsetWidth);
            if (index !== currentIndex) {
                setCurrentIndex(index);
            }
        };

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, [currentIndex]);

    return (
        <div>
            <LivePreview>
                <div className="relative w-full max-w-lg mx-auto group">
                    <div 
                        ref={scrollContainer}
                        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide rounded-xl aspect-video"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {slides.map((slide) => (
                            <div 
                                key={slide.id} 
                                className={`flex-shrink-0 w-full h-full snap-center flex items-center justify-center text-white text-3xl font-bold ${slide.color}`}
                            >
                                {slide.text}
                            </div>
                        ))}
                    </div>

                    {/* Controls */}
                    <button 
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <ChevronRightIcon className="w-6 h-6 transform rotate-180" />
                    </button>
                    <button 
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <ChevronRightIcon className="w-6 h-6" />
                    </button>

                    {/* Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                        {slides.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => scrollToSlide(idx)}
                                className={`w-2.5 h-2.5 rounded-full transition-colors ${currentIndex === idx ? 'bg-white' : 'bg-white/50 hover:bg-white/75'}`}
                            />
                        ))}
                    </div>
                </div>
            </LivePreview>
            <TechnicalOverview
                library="Embla Carousel / Swiper"
                officialName="davidjerleke/embla-carousel"
                githubUrl="https://github.com/davidjerleke/embla-carousel"
                description="A carousel (or slider) allows users to cycle through a series of content, such as images or cards. Modern libraries prioritize touch interactions, fluid animations, and accessibility."
                features={[
                    "Touch/Swipe support with 1:1 physics.",
                    "Infinite looping and autoplay.",
                    "Lazy loading of slides.",
                    "Accessible navigation controls."
                ]}
                installation="npm install embla-carousel-react"
                usage={`import useEmblaCarousel from 'embla-carousel-react'\n\nconst [emblaRef] = useEmblaCarousel()\n\n<div className="embla" ref={emblaRef}>\n  <div className="embla__container">\n    <div className="embla__slide">Slide 1</div>\n    ...\n  </div>\n</div>`}
            />
        </div>
    );
};

export default CarouselDemo;
