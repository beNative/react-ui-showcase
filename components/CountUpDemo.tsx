
import React, { useState, useEffect, useRef } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';
import { CalculatorIcon } from './Icons';

const CountUp: React.FC<{ end: number; duration: number; prefix?: string; suffix?: string }> = ({ end, duration, prefix = '', suffix = '' }) => {
    const [count, setCount] = useState(0);
    const countRef = useRef(end); // track end change

    useEffect(() => {
        let start = 0;
        // If we want to animate from previous value, we'd need state tracking. 
        // For simplicity, always animating from 0 or resetting.
        const endValue = end;
        if (start === endValue) return;

        let startTime: number | null = null;
        let animationFrameId: number;

        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            
            // Ease out quart
            const ease = 1 - Math.pow(1 - progress, 4);
            
            setCount(Math.floor(ease * (endValue - start) + start));

            if (progress < 1) {
                animationFrameId = requestAnimationFrame(step);
            }
        };

        animationFrameId = requestAnimationFrame(step);
        return () => cancelAnimationFrame(animationFrameId);
    }, [end, duration]);

    return (
        <span>{prefix}{count.toLocaleString()}{suffix}</span>
    );
};

const CountUpDemo: React.FC = () => {
    const [target, setTarget] = useState(5000);
    const [key, setKey] = useState(0); // Key to force re-render/reset

    return (
        <div>
            <LivePreview>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                     <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm flex flex-col items-center">
                        <div className="text-4xl font-bold text-sky-600 dark:text-sky-400 mb-2">
                            <CountUp key={key} end={1250} duration={2000} prefix="$" />
                        </div>
                        <div className="text-sm text-slate-500 uppercase tracking-wide font-semibold">Revenue</div>
                    </div>

                    <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm flex flex-col items-center">
                        <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                            <CountUp key={key} end={98} duration={2500} suffix="%" />
                        </div>
                         <div className="text-sm text-slate-500 uppercase tracking-wide font-semibold">Satisfaction</div>
                    </div>

                    <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm flex flex-col items-center">
                         <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                            <CountUp key={key} end={target} duration={3000} />
                        </div>
                         <div className="text-sm text-slate-500 uppercase tracking-wide font-semibold">Users</div>
                    </div>
                </div>

                <div className="flex flex-col items-center mt-8 space-y-4">
                    <button 
                        onClick={() => setKey(k => k + 1)} 
                        className="px-6 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-semibold shadow hover:opacity-90 transition-opacity"
                    >
                        Restart Animation
                    </button>
                </div>
            </LivePreview>
            <TechnicalOverview
                library="react-countup"
                officialName="glennreyes/react-countup"
                githubUrl="https://github.com/glennreyes/react-countup"
                description="A React component wrapper around CountUp.js that creates a compelling number animation. Great for displaying statistics on landing pages or dashboards."
                features={[
                    "Configurable duration and easing.",
                    "Formatting options (decimals, separators).",
                    "Start/End callbacks.",
                    "Scroll spy support (start when visible)."
                ]}
                installation="npm install react-countup"
                usage={`import CountUp from 'react-countup';\n\n<CountUp end={100} duration={2.75} />`}
            />
        </div>
    );
};

export default CountUpDemo;
