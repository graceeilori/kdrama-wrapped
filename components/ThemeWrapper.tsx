'use client';

import { Theme, themes } from '@/lib/themes';

interface ThemeWrapperProps {
    theme: Theme;
    children: React.ReactNode;
    className?: string; // Allow passing extra classes
}

export default function ThemeWrapper({ theme, children, className = '' }: ThemeWrapperProps) {
    const activeTheme = themes[theme];

    return (
        <div
            style={activeTheme.colors as React.CSSProperties}
            className={`bg-bg-primary text-text-primary transition-colors duration-500 ease-in-out ${className}`}
        >
            {children}
        </div>
    );
}
