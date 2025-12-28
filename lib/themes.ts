export type Theme = 'daylight' | 'midnight';

export interface ThemeConfig {
    name: string;
    label: string;
    image: string;
    colors: {
        '--bg-primary': string;
        '--text-primary': string;
        '--primary-10': string;
        '--primary-20': string;
        '--primary-30': string;
        '--primary-40': string;
        '--primary-50': string;
        '--secondary-10': string;
        '--secondary-20': string;
        '--secondary-30': string;
        '--accent-10': string;
        '--accent-20': string;
        '--accent-30': string;
        '--neutral-10': string;
        '--neutral-20': string;
        '--neutral-30': string;
        '--fragment-10': string;
        '--fragment-20': string;
        '--fragment-30': string;
        '--fragment-40': string;
        '--fragment-50': string;
        '--fragment-60': string;
        '--stat-10': string;
        '--stat-20': string;
        '--stat-30': string;
        '--stat-40': string;
        '--stat-50': string;
        '--seed-10': string;
        '--seed-20': string;
        '--seed-30': string;
        '--seed-40': string;
        '--seed-50': string;
        '--vibe-10': string; // healingsoul
        '--vibe-20': string; // healingsoul
        '--vibe-30': string; // healingsoul
        '--vibe-40': string; // hopelessromantic
        '--vibe-50': string; // hopelessromantic
        '--vibe-60': string; // hopelessromantic
        '--vibe-70': string; // timetraveller
        '--vibe-80': string; // timetraveller
        '--vibe-90': string; // timetraveller
        '--vibe-100': string; // detective
        '--vibe-110': string; // detective
        '--vibe-120': string; // detective
        '--vibe-130': string; // wanderer
        '--vibe-140': string; // wanderer
        '--vibe-150': string; // wanderer
    };
}

export const themes: Record<Theme, ThemeConfig> = {
    daylight: {
        name: 'daylight',
        label: 'Daylight',
        image: '/assets/theme-daylight.png',
        colors: {
            '--bg-primary': '#FBF9EF', // life
            '--text-primary': '#201C24', // trigger
            '--primary-10': '#FEECF0',
            '--primary-20': '#FBD0DA',
            '--primary-30': '#FABDCB',
            '--primary-40': '#F35E80',
            '--primary-50': '#DA113F',
            '--secondary-10': '#CCD3F0',
            '--secondary-20': '#A4B1E4',
            '--secondary-30': '#566ECD',
            '--accent-10': '#84D1D8', // hongrang
            '--accent-20': '#E18B69', // nemesis
            '--accent-30': '#E7B7B5', // lady
            '--neutral-10': '#FCFCFC',
            '--neutral-20': '#B3B3B3',
            '--neutral-30': '#1A1A1A',
            '--fragment-10': '#E5B3D2',
            '--fragment-20': '#AA8CD9',
            '--fragment-30': '#D6B3E5',
            '--fragment-40': '#F2D184',
            '--fragment-50': '#E06F6C',
            '--fragment-60': '#F49C71',
            '--stat-10': 'var(--secondary-20)',
            '--stat-20': '#E5E0B3',
            '--stat-30': '#B3E5E0',
            '--stat-40': '#F8E5BA',
            '--stat-50': '#EFC25D',
            '--seed-10': '#D6B3E5',
            '--seed-20': '#B1C8E7',
            '--seed-30': '#F3A5AB',
            '--seed-40': '#CBE7B1',
            '--seed-50': '#F3E2A5',
            '--vibe-10': '#8633E3',
            '--vibe-20': '#B08FD6',
            '--vibe-30': '#E9E1F5',
            '--vibe-40': '#EF4F93',
            '--vibe-50': '#D88DAE',
            '--vibe-60': '#F4E1E9',
            '--vibe-70': '#EFB63B',
            '--vibe-80': '#D8C08D',
            '--vibe-90': '#F5EEE1',
            '--vibe-100': '#4653EA',
            '--vibe-110': '#8189E4',
            '--vibe-120': '#DDE0F8',
            '--vibe-130': '#E23E3E',
            '--vibe-140': '#D68F8F',
            '--vibe-150': '#F4E1E1',
        },
    },
    midnight: {
        name: 'midnight',
        label: 'Midnight',
        image: '/assets/theme-midnight-temp.png',
        colors: {
            '--bg-primary': '#1a0510',
            '--text-primary': '#ffe4e6',
            '--accent-10': '#e11d48',
            "--primary-10": "",
            "--primary-20": "",
            "--primary-30": "",
            "--primary-40": "",
            "--primary-50": "",
            "--secondary-10": "",
            "--secondary-20": "",
            "--secondary-30": "",
            "--accent-20": "",
            "--accent-30": "",
            "--neutral-10": "",
            "--neutral-20": "",
            "--neutral-30": "",
            "--fragment-10": "",
            "--fragment-20": "",
            "--fragment-30": "",
            "--fragment-40": "",
            "--fragment-50": "",
            "--fragment-60": "",
            "--stat-10": "",
            "--stat-20": "",
            "--stat-30": "",
            "--stat-40": "",
            "--stat-50": "",
            "--seed-10": "",
            "--seed-20": "",
            "--seed-30": "",
            "--seed-40": "",
            "--seed-50": "",
            "--vibe-10": "",
            "--vibe-20": "",
            "--vibe-30": "",
            "--vibe-40": "",
            "--vibe-50": "",
            "--vibe-60": "",
            "--vibe-70": "",
            "--vibe-80": "",
            "--vibe-90": "",
            "--vibe-100": "",
            "--vibe-110": "",
            "--vibe-120": "",
            "--vibe-130": "",
            "--vibe-140": "",
            "--vibe-150": ""
        },
    },
};
