import React, { useState } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';

const Badge: React.FC<{ children: React.ReactNode; variant?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral'; rounded?: boolean; outline?: boolean }> = ({ children, variant = 'neutral', rounded = false, outline = false }) => {
    const variants = {
        primary: outline ? 'border-sky-500 text-sky-400' : 'bg-sky-500/10 text-sky-400 border-sky-500/20',
        success: outline ? 'border-green-500 text-green-400' : 'bg-green-500/10 text-green-400 border-green-500/20',
        warning: outline ? 'border-yellow-500 text-yellow-400' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
        danger: outline ? 'border-red-500 text-red-400' : 'bg-red-500/10 text-red-400 border-red-500/20',
        neutral: outline ? 'border-slate-500 text-slate-400' : 'bg-slate-500/10 text-slate-400 border-slate-500/20',
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 border text-xs font-medium transition-all duration-200 ${rounded ? 'rounded-full' : 'rounded-md'} ${variants[variant]}`}>
            {children}
        </span>
    );
};

const BadgeDemo: React.FC = () => {
    const [rounded, setRounded] = useState(false);
    const [outline, setOutline] = useState(false);
    const [labelText, setLabelText] = useState("Badge");

    return (
        <div>
            <LivePreview>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="flex flex-col items-center justify-center space-y-6 w-full">
                         <div className="flex flex-wrap justify-center gap-3">
                            <Badge variant="primary" rounded={rounded} outline={outline}>{labelText}</Badge>
                            <Badge variant="success" rounded={rounded} outline={outline}>Success</Badge>
                            <Badge variant="warning" rounded={rounded} outline={outline}>Warning</Badge>
                            <Badge variant="danger" rounded={rounded} outline={outline}>Error</Badge>
                            <Badge variant="neutral" rounded={rounded} outline={outline}>Neutral</Badge>
                        </div>
                    </div>

                    {/* Configuration */}
                    <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 space-y-4 w-full">
                         <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider">Configuration</h3>
                         
                         <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Label Text</label>
                            <input 
                                type="text" 
                                value={labelText}
                                onChange={(e) => setLabelText(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm text-slate-300 focus:ring-2 focus:ring-sky-500 outline-none"
                            />
                        </div>

                        <div className="flex flex-col space-y-3">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={rounded} 
                                    onChange={(e) => setRounded(e.target.checked)}
                                    className="form-checkbox h-4 w-4 text-sky-600 rounded border-slate-700 bg-slate-800 focus:ring-sky-500"
                                />
                                <span className="text-sm text-slate-300">Rounded (Pill)</span>
                            </label>
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={outline} 
                                    onChange={(e) => setOutline(e.target.checked)}
                                    className="form-checkbox h-4 w-4 text-sky-600 rounded border-slate-700 bg-slate-800 focus:ring-sky-500"
                                />
                                <span className="text-sm text-slate-300">Outline Variant</span>
                            </label>
                        </div>
                    </div>
                </div>
            </LivePreview>
            <TechnicalOverview
                library="Tailwind UI (Badge)"
                officialName="shadcn/ui"
                githubUrl="https://ui.shadcn.com/docs/components/badge"
                description="Badges (or Chips) are small UI elements used to display status, categories, or metadata. They effectively communicate state without taking up much space."
                features={[
                    "Semantic colors for status (success, error, etc.).",
                    "Different shapes (pill vs rounded rect).",
                    "Outline and solid variants.",
                    "Can include icons or remove buttons."
                ]}
                installation="npx shadcn-ui@latest add badge"
                usage={`import { Badge } from "@/components/ui/badge"\n\n<Badge variant="outline">Badge</Badge>`}
            />
        </div>
    );
};

export default BadgeDemo;