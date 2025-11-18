import React, { useState } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';
import { StarIcon } from './Icons';

const Rating: React.FC<{ max?: number; initialValue?: number; onChange?: (val: number) => void; readOnly?: boolean }> = ({ max = 5, initialValue = 0, onChange, readOnly = false }) => {
    const [rating, setRating] = useState(initialValue);
    const [hover, setHover] = useState<number | null>(null);

    return (
        <div className="flex items-center space-x-1">
            {[...Array(max)].map((_, index) => {
                const value = index + 1;
                const isActive = value <= (hover || rating);
                return (
                    <button
                        key={index}
                        type="button"
                        disabled={readOnly}
                        className={`w-8 h-8 transition-transform ${readOnly ? 'cursor-default' : 'hover:scale-110 cursor-pointer'} focus:outline-none ${isActive ? 'text-yellow-400' : 'text-slate-700'}`}
                        onClick={() => {
                            if (!readOnly) {
                                setRating(value);
                                if(onChange) onChange(value);
                            }
                        }}
                        onMouseEnter={() => !readOnly && setHover(value)}
                        onMouseLeave={() => !readOnly && setHover(null)}
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
    const [maxStars, setMaxStars] = useState(5);
    const [isReadOnly, setIsReadOnly] = useState(false);

    return (
        <div>
            <LivePreview>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="flex flex-col items-center justify-center space-y-6 w-full">
                        <div className="text-center">
                            <h3 className="text-lg font-semibold text-slate-200 mb-2">Rate your experience</h3>
                            <Rating max={maxStars} readOnly={isReadOnly} initialValue={3} />
                        </div>
                    </div>

                    {/* Configuration */}
                    <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 space-y-4 w-full">
                         <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider">Configuration</h3>
                         
                         <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Max Stars: {maxStars}</label>
                            <input 
                                type="range" 
                                min="3" 
                                max="10" 
                                value={maxStars} 
                                onChange={(e) => setMaxStars(Number(e.target.value))}
                                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
                            />
                        </div>

                        <div>
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={isReadOnly} 
                                    onChange={(e) => setIsReadOnly(e.target.checked)}
                                    className="form-checkbox h-4 w-4 text-sky-600 rounded border-slate-700 bg-slate-800 focus:ring-sky-500"
                                />
                                <span className="text-sm text-slate-300">Read Only</span>
                            </label>
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