
import type React from 'react';

export interface Showcase {
    id: string;
    name: string;
    icon: React.ReactNode;
    component: React.ReactNode;
    category: 'Inputs' | 'Data Display' | 'Feedback' | 'Navigation' | 'Layout' | 'Editors' | 'Media';
}
