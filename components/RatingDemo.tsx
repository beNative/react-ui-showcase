import React, { useState } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';
import { StarIcon } from './Icons';

const Rating: React.FC<{ max?: number; initialValue?: number; onChange?: (val: number) => void }> = ({ max = 5, initialValue = 0, onChange }) => {
    const [rating, setRating] = useState(initialValue);
    const [hover, setHover] = useState<number | null>(null);

    return (
        <div className="flex items-center space-x-1">
            {[...Array(max)].map((_, index) => {
                const value = index + 1;
                return (
                    <button
                        key={index}
                        type="button"
                        className={`w-8 h-8 transition-transform hover:scale-110 focus:outline-none ${value <= (hover || rating) ? 'text-yellow-400' : 'text-slate-700'}`}
                        onClick={() => {
                            setRating(value);
                            if(onChange) onChange(value);
                        }}
                        onMouseEnter={() => setHover(value)}
                        onMouseLeave={() => setHover(null)}
                    >
                        <StarIcon className="w-full h-full fill-current" />
                    </button>
                );
            })}
            <span className="ml-2 text-sm font-medium text-slate-400">{rating > 0 ? `${rating} out of ${max}` : 'No rating'}</span>
        </div>
    );
};

const RatingDemo: React.FC = () => {
    return (
        <div>
            <LivePreview>
                <div className="flex flex-col items-center justify-center space-y-6">
                    <div className="text-center">
                        <h3 className="text-lg font-semibold text-slate-200 mb-2">Rate your experience</h3>
                        <Rating />
                    </div>
                    
                    <div className="p-4 bg-slate-800 rounded-lg border border-slate-700 flex items-center gap-4">
                         <div className="text-left">
                            <div className="text-sm font-medium text-slate-300">Product Quality</div>
                            <Rating max={5} initialValue={4} />
                         </div>
                    </div>
                </div>
            </LivePreview>
            <TechnicalOverview
                library="React Rating / MUI Rating"
                officialName="brendanmorrell/react-rating"
                githubUrl="https://github.com/brendanmorrell/react-rating"
                description="Rating components allow users to provide feedback using a scale, commonly stars. They involve complex interaction states like hover, selection, and read-only modes."
                features={[
                    "Customizable icons (stars, hearts, etc.).",
                    "Fractional ratings (half-stars).",
                    "Read-only display mode.",
                    "Keyboard accessibility for selecting values."
                ]}
                installation="npm install react-rating"
                usage={`import Rating from 'react-rating';\n\n<Rating initialRating={3} />`}
            />
        </div>
    );
};

export default RatingDemo;