import React, { useEffect, useRef, useState } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';
import { SparklesIcon } from './Icons';

const ConfettiDemo: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isActive, setIsActive] = useState(false);

    const triggerConfetti = () => {
        setIsActive(true);
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Simple confetti implementation
        const particles: any[] = [];
        const colors = ['#0ea5e9', '#ec4899', '#eab308', '#22c55e'];
        
        canvas.width = canvas.parentElement?.clientWidth || 500;
        canvas.height = 300;

        for (let i = 0; i < 100; i++) {
            particles.push({
                x: canvas.width / 2,
                y: canvas.height / 2,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10 - 5, // Upward bias
                size: Math.random() * 5 + 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                life: 100
            });
        }

        const animate = () => {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            let activeParticles = false;
            particles.forEach(p => {
                if (p.life > 0) {
                    activeParticles = true;
                    p.x += p.vx;
                    p.y += p.vy;
                    p.vy += 0.2; // Gravity
                    p.life--;
                    
                    ctx.fillStyle = p.color;
                    ctx.fillRect(p.x, p.y, p.size, p.size);
                }
            });

            if (activeParticles) {
                requestAnimationFrame(animate);
            } else {
                setIsActive(false);
            }
        };

        animate();
    };

    return (
        <div>
            <LivePreview>
                <div className="relative h-64 w-full bg-slate-900 rounded-lg overflow-hidden border border-slate-800 flex items-center justify-center">
                    <canvas 
                        ref={canvasRef} 
                        className="absolute inset-0 pointer-events-none z-10"
                    />
                    
                    <button
                        onClick={triggerConfetti}
                        disabled={isActive}
                        className="relative z-20 px-6 py-3 bg-gradient-to-r from-pink-500 to-violet-600 text-white rounded-full font-bold shadow-lg transform transition hover:scale-105 active:scale-95 disabled:opacity-50 flex items-center"
                    >
                         <SparklesIcon className="w-5 h-5 mr-2" />
                         {isActive ? 'Celebrating!' : 'Trigger Confetti'}
                    </button>
                </div>
            </LivePreview>
            <TechnicalOverview
                library="canvas-confetti"
                officialName="catdad/canvas-confetti"
                githubUrl="https://github.com/catdad/canvas-confetti"
                description="Confetti is a visual effect often used to reward users for completing a task. It adds a moment of delight and engagement to the UI."
                features={[
                    "High performance using HTML5 Canvas.",
                    "Physics-based animation.",
                    "Customizable shapes, colors, and spread.",
                    "Works without React (vanilla JS compatible)."
                ]}
                installation="npm install canvas-confetti"
                usage={`import confetti from 'canvas-confetti';\n\nconfetti({\n  particleCount: 100,\n  spread: 70,\n  origin: { y: 0.6 }\n});`}
            />
        </div>
    );
};

export default ConfettiDemo;