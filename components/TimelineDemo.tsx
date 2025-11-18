import React from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';
import { ClockIcon } from './Icons';

const TimelineDemo: React.FC = () => {
    const steps = [
        { title: 'Order Placed', description: 'We have received your order.', date: 'Today, 9:00 AM', active: true },
        { title: 'Processing', description: 'Your order is being prepared.', date: 'Today, 11:30 AM', active: true },
        { title: 'Shipped', description: 'Order has been sent to courier.', date: 'Expected Tomorrow', active: false },
        { title: 'Delivered', description: 'Package arrived at destination.', date: 'Expected Fri, 14th', active: false },
    ];

    return (
        <div>
            <LivePreview>
                <div className="max-w-md mx-auto p-4">
                    <div className="relative border-l border-slate-700 ml-3 space-y-8">
                        {steps.map((step, index) => (
                            <div key={index} className="relative pl-8 group">
                                {/* Dot */}
                                <div 
                                    className={`absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full border-2 transition-colors duration-300 ${step.active ? 'bg-sky-500 border-sky-500' : 'bg-slate-900 border-slate-600 group-hover:border-slate-500'}`}
                                ></div>
                                
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                                     <h3 className={`text-sm font-medium ${step.active ? 'text-slate-200' : 'text-slate-500'}`}>{step.title}</h3>
                                     <span className="text-xs text-slate-500 font-mono mt-1 sm:mt-0">{step.date}</span>
                                </div>
                                <p className="text-sm text-slate-400 mt-1">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </LivePreview>
            <TechnicalOverview
                library="MUI Timeline / Ant Design Timeline"
                officialName="mui/material-ui"
                githubUrl="https://mui.com/material-ui/react-timeline/"
                description="A timeline displays a list of events in chronological order. It is commonly used for activity logs, order tracking, or process steps."
                features={[
                    "Vertical and horizontal layouts.",
                    "Custom connectors and separators.",
                    "Alternating positions (left/right).",
                    "Support for icons within dots."
                ]}
                installation="npm install @mui/lab"
                usage={`import Timeline from '@mui/lab/Timeline';\nimport TimelineItem from '@mui/lab/TimelineItem';\n\n<Timeline>\n  <TimelineItem>...</TimelineItem>\n</Timeline>`}
            />
        </div>
    );
};

export default TimelineDemo;