
import React, { useState } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';

const Avatar: React.FC<{ src?: string; fallback: string; alt: string; status?: 'online' | 'busy' | 'offline' | 'none'; size?: 'sm' | 'md' | 'lg' }> = ({ src, fallback, alt, status = 'none', size = 'md' }) => {
    const statusColors = {
        online: 'bg-green-500',
        busy: 'bg-red-500',
        offline: 'bg-slate-500',
        none: 'hidden'
    };

    const sizeClasses = {
        sm: 'w-8 h-8 text-xs',
        md: 'w-12 h-12 text-base',
        lg: 'w-16 h-16 text-lg'
    };

    const indicatorSize = {
        sm: 'h-2 w-2',
        md: 'h-3 w-3',
        lg: 'h-4 w-4'
    };

    return (
        <div className="relative inline-block">
            <div className={`${sizeClasses[size]} rounded-full overflow-hidden border-2 border-white dark:border-slate-800 bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 font-medium shadow-sm transition-colors`}>
                {src ? <img src={src} alt={alt} className="w-full h-full object-cover" /> : fallback}
            </div>
            {status !== 'none' && (
                <span className={`absolute bottom-0 right-0 block ${indicatorSize[size]} rounded-full ring-2 ring-white dark:ring-slate-900 ${statusColors[status]}`} />
            )}
        </div>
    );
};

const AvatarGroup: React.FC<{ children: React.ReactNode; spacing?: 'tight' | 'normal' }> = ({ children, spacing = 'tight' }) => (
    <div className={`flex ${spacing === 'tight' ? '-space-x-4' : '-space-x-2'} overflow-hidden p-1`}>
        {children}
    </div>
);

const AvatarDemo: React.FC = () => {
    const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md');
    const [showStatus, setShowStatus] = useState(true);
    const [groupSpacing, setGroupSpacing] = useState<'tight' | 'normal'>('tight');

    return (
        <div>
            <LivePreview>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="flex flex-col items-center space-y-8 w-full">
                        {/* Single Avatars */}
                        <div className="flex items-center gap-6">
                            <Avatar src="https://i.pravatar.cc/150?u=1" fallback="JD" alt="John Doe" status={showStatus ? 'online' : 'none'} size={size} />
                            <Avatar src="https://i.pravatar.cc/150?u=2" fallback="AB" alt="Alice Bob" status={showStatus ? 'busy' : 'none'} size={size} />
                            <Avatar fallback="CK" alt="Clark Kent" status={showStatus ? 'offline' : 'none'} size={size} />
                        </div>
                        
                        {/* Avatar Group */}
                        <div className="flex flex-col items-center pt-4 border-t border-slate-200 dark:border-slate-800 w-full transition-colors">
                            <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">Stacked Group</h4>
                            <AvatarGroup spacing={groupSpacing}>
                                 <Avatar src="https://i.pravatar.cc/150?u=3" fallback="U1" alt="User 1" size="md" />
                                 <Avatar src="https://i.pravatar.cc/150?u=4" fallback="U2" alt="User 2" size="md" />
                                 <Avatar src="https://i.pravatar.cc/150?u=5" fallback="U3" alt="User 3" size="md" />
                                 <Avatar src="https://i.pravatar.cc/150?u=6" fallback="U4" alt="User 4" size="md" />
                                 <div className="relative inline-flex items-center justify-center w-12 h-12 text-xs font-medium text-white bg-slate-700 rounded-full border-2 border-white dark:border-slate-800 hover:bg-slate-600 cursor-pointer transition-colors shadow-sm">
                                    +99
                                 </div>
                            </AvatarGroup>
                        </div>
                    </div>

                    {/* Configuration */}
                    <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 space-y-4 w-full self-stretch transition-colors">
                        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Configuration</h3>
                        
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Size</label>
                            <div className="flex space-x-2 bg-white dark:bg-slate-800 p-1 rounded-md border border-slate-200 dark:border-slate-700">
                                {(['sm', 'md', 'lg'] as const).map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => setSize(s)}
                                        className={`flex-1 px-3 py-1.5 text-sm rounded ${size === s ? 'bg-slate-100 dark:bg-slate-600 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                                    >
                                        {s.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={showStatus} 
                                    onChange={(e) => setShowStatus(e.target.checked)}
                                    className="form-checkbox h-4 w-4 text-sky-600 rounded border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-sky-500"
                                />
                                <span className="text-sm text-slate-700 dark:text-slate-300">Show Status Indicator</span>
                            </label>
                        </div>

                         <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Group Spacing</label>
                            <select 
                                value={groupSpacing}
                                onChange={(e) => setGroupSpacing(e.target.value as any)}
                                className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md px-3 py-2 text-sm text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-colors"
                            >
                                <option value="tight">Tight Overlap</option>
                                <option value="normal">Normal Overlap</option>
                            </select>
                        </div>
                    </div>
                </div>
            </LivePreview>
            <TechnicalOverview
                library="Radix UI Avatar"
                officialName="radix-ui/primitives"
                githubUrl="https://github.com/radix-ui/primitives"
                description="Avatars represent users or entities, usually with a profile picture or initials. They often support fallback states (e.g., loading delays or missing images) and can be grouped to show a list of users."
                features={[
                    "Automatic fallback to initials or icon.",
                    "Status indicators for online presence.",
                    "Clamping/Group support for multiple avatars.",
                    "Accessible image loading states."
                ]}
                installation="npm install @radix-ui/react-avatar"
                usage={`import * as Avatar from '@radix-ui/react-avatar';\n\n<Avatar.Root>\n  <Avatar.Image src="..." />\n  <Avatar.Fallback>AB</Avatar.Fallback>\n</Avatar.Root>`}
            />
        </div>
    );
};

export default AvatarDemo;
