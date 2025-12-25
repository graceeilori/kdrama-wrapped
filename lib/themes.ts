export type Theme = 'standard' | 'dark-romance' | 'sage-calm';

export interface ThemeConfig {
    name: string;
    label: string;
    colors: {
        '--bg-primary': string;
        '--text-primary': string;
        '--accent': string;
    };
}

export const themes: Record<Theme, ThemeConfig> = {
    standard: {
        name: 'standard',
        label: 'Standard',
        colors: {
            '--bg-primary': '#ffffff',
            '--text-primary': '#171717',
            '--accent': '#ec4899', // pink-500
        },
    },
    'dark-romance': {
        name: 'dark-romance',
        label: 'Dark Romance',
        colors: {
            '--bg-primary': '#1a0510',
            '--text-primary': '#ffe4e6',
            '--accent': '#e11d48', // rose-600
        },
    },
    'sage-calm': {
        name: 'sage-calm',
        label: 'Sage Calm',
        colors: {
            '--bg-primary': '#f0fdf4',
            '--text-primary': '#14532d',
            '--accent': '#16a34a', // green-600
        },
    },
};
