
import React, { useState } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';
import { ArrowPathRoundedSquareIcon } from './Icons';

const FlipCardDemo: React.FC = () => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div>
            <LivePreview>
                <div className="flex justify-center perspective-1000 py-8">
                    <div 
                        className="group w-64 h-80 cursor-pointer perspective-1000"
                        onClick={() => setIsFlipped(!isFlipped)}
                    >
                        <div 
                            className={`relative w-full h-full duration-700 preserve-3d transition-transform ${isFlipped ? 'rotate-y-180' : ''}`}
                        >
                            {/* Front */}
                            <div className="absolute w-full h-full backface-hidden rounded-xl shadow-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-6 flex flex-col items-center justify-center text-center">
                                <div className="w-20 h-20 bg-sky-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-sky-900/50">
                                    <ArrowPathRoundedSquareIcon className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Hover or Click</h3>
                                <p className="text-slate-400 text-sm">To reveal the details on the back of this card.</p>
                            </div>

                            {/* Back */}
                            <div className="absolute w-full h-full backface-hidden rotate-y-180 rounded-xl shadow-2xl bg-gradient-to-bl from-sky-600 to-blue-700 p-6 flex flex-col items-center justify-center text-center">
                                <h3 className="text-2xl font-bold text-white mb-4">Secret Revealed!</h3>
                                <p className="text-blue-100 text-sm leading-relaxed">
                                    Flip cards are great for flashcards, product details, or profile bios. They use CSS 3D transforms.
                                </p>
                                <button className="mt-6 px-4 py-2 bg-white text-sky-600 rounded-full text-sm font-bold shadow hover:bg-blue-50 transition-colors">
                                    Action
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <style>{`
                    .perspective-1000 {
                        perspective: 1000px;
                    }
                    .preserve-3d {
                        transform-style: preserve-3d;
                    }
                    .backface-hidden {
                        backface-visibility: hidden;
                    }
                    .rotate-y-180 {
                        transform: rotateY(180deg);
                    }
                `}</style>
            </LivePreview>
            <TechnicalOverview
                library="CSS Transforms / React Flip Move"
                officialName="joshwcomeau/react-flip-move"
                githubUrl="https://github.com/joshwcomeau/react-flip-move"
                description="A flip card effect uses CSS 3D transforms to rotate an element 180 degrees, revealing its back face. It's a playful interaction used for gamification or information hiding."
                features={[
                    "Uses hardware-accelerated CSS transforms.",
                    "Requires 'preserve-3d' and 'backface-visibility'.",
                    "Can be triggered by hover or click.",
                    "Supports horizontal or vertical flipping."
                ]}
                installation="npm install react-card-flip"
                usage={`import ReactCardFlip from 'react-card-flip';\n\n<ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="vertical">\n  <div key="front">...</div>\n  <div key="back">...</div>\n</ReactCardFlip>`}
            />
        </div>
    );
};

export default FlipCardDemo;
