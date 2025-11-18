
import React, { useState, useEffect } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';

const Typewriter: React.FC<{ text: string; speed?: number; delay?: number; loop?: boolean }> = ({ text, speed = 100, delay = 1000, loop = true }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(speed);

    useEffect(() => {
        let timer: any;

        const handleType = () => {
            const fullText = text;
            
            setDisplayedText(current => 
                isDeleting ? fullText.substring(0, current.length - 1) : fullText.substring(0, current.length + 1)
            );

            setTypingSpeed(isDeleting ? speed / 2 : speed);

            if (!isDeleting && displayedText === fullText) {
                if (!loop) return;
                setTypingSpeed(delay);
                setIsDeleting(true);
            } else if (isDeleting && displayedText === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
                setTypingSpeed(500);
            }
        };

        timer = setTimeout(handleType, typingSpeed);
        return () => clearTimeout(timer);
    }, [displayedText, isDeleting, loopNum, typingSpeed, text, speed, delay, loop]);

    return (
        <span className="font-mono text-xl md:text-3xl font-bold text-slate-100">
            {displayedText}
            <span className="animate-pulse text-sky-500 ml-1">|</span>
        </span>
    );
};

const TypewriterDemo: React.FC = () => {
    const phrases = [
        "Build beautiful UIs.",
        "Ship faster with React.",
        "Accessible by default.",
        "Dark mode included."
    ];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex(prev => (prev + 1) % phrases.length);
        }, 4000); // Change phrase every 4s (approx cycle time)
        return () => clearInterval(interval);
    }, [phrases.length]);

    return (
        <div>
            <LivePreview>
                <div className="h-32 flex flex-col items-center justify-center bg-slate-900 rounded-lg border border-slate-800">
                     <Typewriter key={index} text={phrases[index]} speed={80} delay={1500} loop={false} />
                </div>
            </LivePreview>
            <TechnicalOverview
                library="Typewriter Effect"
                officialName="tameemsafi/typewriter-effect"
                githubUrl="https://github.com/tameemsafi/typewriter-effect"
                description="A typewriter effect animates text as if it were being typed in real-time. It's commonly used in hero sections to display rotating headlines or value propositions."
                features={[
                    "Configurable typing and deleting speeds.",
                    "Looping support.",
                    "Custom cursor styling.",
                    "Can type HTML strings."
                ]}
                installation="npm install typewriter-effect"
                usage={`import Typewriter from 'typewriter-effect';\n\n<Typewriter\n  options={{ strings: ['Hello', 'World'], autoStart: true, loop: true }}\n/>`}
            />
        </div>
    );
};

export default TypewriterDemo;
