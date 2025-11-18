import React from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';

const Avatar: React.FC<{ src?: string; fallback: string; alt: string; status?: 'online' | 'busy' | 'offline' }> = ({ src, fallback, alt, status }) => {
    const statusColors = {
        online: 'bg-green-500',
        busy: 'bg-red-500',
        offline: 'bg-slate-500'
    };

    return (
        <div className="relative inline-block">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-slate-800 bg-slate-700 flex items-center justify-center text-slate-300 font-medium">
                {src ? <img src={src} alt={alt} className="w-full h-full object-cover" /> : fallback}
            </div>
            {status && (
                <span className={`absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-slate-900 ${statusColors[status]}`} />
            )}
        </div>
    );
};

const AvatarGroup: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="flex -space-x-4 overflow-hidden p-1">
        {children}
    </div>
);

const AvatarDemo: React.FC = () => {
    return (
        <div>
            <LivePreview>
                <div className="flex flex-col items-center space-y-8">
                    <div className="flex items-center gap-6">
                        <Avatar src="https://i.pravatar.cc/150?u=1" fallback="JD" alt="John Doe" status="online" />
                        <Avatar src="https://i.pravatar.cc/150?u=2" fallback="AB" alt="Alice Bob" status="busy" />
                        <Avatar fallback="CK" alt="Clark Kent" status="offline" />
                    </div>
                    
                    <div className="flex flex-col items-center">
                        <h4 className="text-sm font-medium text-slate-400 mb-3">Stacked Group</h4>
                        <AvatarGroup>
                             <Avatar src="https://i.pravatar.cc/150?u=3" fallback="U1" alt="User 1" />
                             <Avatar src="https://i.pravatar.cc/150?u=4" fallback="U2" alt="User 2" />
                             <Avatar src="https://i.pravatar.cc/150?u=5" fallback="U3" alt="User 3" />
                             <Avatar src="https://i.pravatar.cc/150?u=6" fallback="U4" alt="User 4" />
                             <div className="relative inline-flex items-center justify-center w-12 h-12 text-xs font-medium text-white bg-slate-700 border-2 border-slate-800 rounded-full hover:bg-slate-600 cursor-pointer transition-colors">
                                +99
                             </div>
                        </AvatarGroup>
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