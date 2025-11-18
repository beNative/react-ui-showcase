import React from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';

const Badge: React.FC<{ children: React.ReactNode; variant?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral'; rounded?: boolean }> = ({ children, variant = 'neutral', rounded = false }) => {
    const variants = {
        primary: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
        success: 'bg-green-500/10 text-green-400 border-green-500/20',
        warning: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
        danger: 'bg-red-500/10 text-red-400 border-red-500/20',
        neutral: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 border text-xs font-medium ${rounded ? 'rounded-full' : 'rounded-md'} ${variants[variant]}`}>
            {children}
        </span>
    );
};

const BadgeDemo: React.FC = () => {
    return (
        <div>
            <LivePreview>
                <div className="flex flex-col space-y-8">
                    <div>
                        <h4 className="text-sm text-slate-400 mb-3">Status Indicators</h4>
                        <div className="flex flex-wrap gap-3">
                            <Badge variant="primary">Processing</Badge>
                            <Badge variant="success">Completed</Badge>
                            <Badge variant="warning">Pending</Badge>
                            <Badge variant="danger">Failed</Badge>
                            <Badge variant="neutral">Archived</Badge>
                        </div>
                    </div>
                    <div>
                         <h4 className="text-sm text-slate-400 mb-3">Pill Shape</h4>
                         <div className="flex flex-wrap gap-3">
                             <Badge variant="primary" rounded>New Feature</Badge>
                             <Badge variant="success" rounded>Online</Badge>
                             <Badge variant="danger" rounded>Bug</Badge>
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