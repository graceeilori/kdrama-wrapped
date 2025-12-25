'use client';

import { useEffect, useState } from 'react';
import QRCodeDisplay from './QRCodeDisplay';

export default function DeviceGuard({ children }: { children: React.ReactNode }) {
    const [isMobile, setIsMobile] = useState<boolean | null>(null);

    useEffect(() => {
        const checkMobile = () => {
            // Standard mobile breakpoint check (768px is common for tablets/mobile)
            setIsMobile(window.innerWidth < 768);
        };

        // Check on mount
        checkMobile();

        // Check on resize
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Avoid hydration mismatch by waiting for client-side check
    if (isMobile === null) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-pulse flex space-x-2">
                    <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                </div>
            </div>
        );
    }

    if (!isMobile) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 p-4">
                <QRCodeDisplay />
            </div>
        );
    }

    return <>{children}</>;
}
