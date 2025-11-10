import React, { useState, useCallback, useEffect, useRef } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';

const RangeSliderDemo: React.FC = () => {
    const MIN = 0;
    const MAX = 100;
    const [minVal, setMinVal] = useState(25);
    const [maxVal, setMaxVal] = useState(75);
    const minValRef = useRef(minVal);
    const maxValRef = useRef(maxVal);
    const range = useRef<HTMLDivElement>(null);

    // Convert to percentage
    const getPercent = useCallback((value: number) => Math.round(((value - MIN) / (MAX - MIN)) * 100), []);

    // Set width of the range to decrease from the left side
    useEffect(() => {
        const minPercent = getPercent(minVal);
        const maxPercent = getPercent(maxValRef.current);

        if (range.current) {
            range.current.style.left = `${minPercent}%`;
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [minVal, getPercent]);

    // Set width of the range to decrease from the right side
    useEffect(() => {
        const minPercent = getPercent(minValRef.current);
        const maxPercent = getPercent(maxVal);

        if (range.current) {
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [maxVal, getPercent]);
    
    // Update refs
    useEffect(() => {
      minValRef.current = minVal;
      maxValRef.current = maxVal;
    }, [minVal, maxVal]);

    return (
        <div>
            <LivePreview>
                <div className="flex flex-col items-center justify-center h-32">
                    <div className="relative w-full max-w-lg">
                        <input
                            type="range"
                            min={MIN}
                            max={MAX}
                            value={minVal}
                            onChange={(event) => {
                                const value = Math.min(Number(event.target.value), maxVal - 1);
                                setMinVal(value);
                            }}
                            className="thumb thumb--left"
                            style={{ zIndex: minVal > MAX - 100 ? 5 : undefined }}
                        />
                        <input
                            type="range"
                            min={MIN}
                            max={MAX}
                            value={maxVal}
                            onChange={(event) => {
                                const value = Math.max(Number(event.target.value), minVal + 1);
                                setMaxVal(value);
                            }}
                            className="thumb thumb--right"
                        />

                        <div className="relative w-full">
                            <div className="absolute w-full h-2 rounded bg-slate-600 top-[-4px]" />
                            <div ref={range} className="absolute h-2 rounded bg-sky-500 top-[-4px]" />
                            <div className="absolute text-slate-300 -mt-8" style={{ left: `${getPercent(minVal)}%`, transform: 'translateX(-50%)' }}>${minVal}k</div>
                            <div className="absolute text-slate-300 -mt-8" style={{ left: `${getPercent(maxVal)}%`, transform: 'translateX(-50%)' }}>${maxVal}k</div>
                        </div>
                    </div>
                    
                    <style>{`
                        .thumb {
                            pointer-events: none;
                            position: absolute;
                            height: 0;
                            width: 100%;
                            outline: none;
                            top: -4px;
                        }

                        .thumb--left {
                            z-index: 3;
                        }

                        .thumb--right {
                            z-index: 4;
                        }

                        .thumb::-webkit-slider-thumb {
                            -webkit-appearance: none;
                            -moz-appearance: none;
                            appearance: none;
                            pointer-events: all;
                            width: 24px;
                            height: 24px;
                            background-color: #fff;
                            border-radius: 50%;
                            border: 2px solid #0ea5e9; /* sky-500 */
                            cursor: pointer;
                            margin-top: -8px;
                        }
                         .thumb::-moz-range-thumb {
                            pointer-events: all;
                            width: 24px;
                            height: 24px;
                            background-color: #fff;
                            border-radius: 50%;
                            border: 2px solid #0ea5e9; /* sky-500 */
                            cursor: pointer;
                        }
                    `}</style>

                </div>
            </LivePreview>
            <TechnicalOverview
                library="rc-slider / Radix UI Slider"
                officialName="react-component/slider"
                githubUrl="https://github.com/react-component/slider"
                description="A range slider allows users to select a lower and upper bound within a continuous range of values. It's an enhancement of the standard slider, useful for filtering by price, date ranges, or other numerical intervals."
                features={[
                    "Dual handles for setting a range.",
                    "Support for vertical orientation and ticks.",
                    "Customizable styling for tracks, handles, and marks.",
                    "Accessible with keyboard support."
                ]}
                installation="npm install rc-slider"
                usage={`import Slider from 'rc-slider';\n\n<Slider range allowCross={false} defaultValue={[20, 50]} />`}
            />
        </div>
    );
};

export default RangeSliderDemo;