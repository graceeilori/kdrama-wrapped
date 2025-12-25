'use client';

import { QRCodeSVG } from 'qrcode.react';
import { useEffect, useState } from 'react';

export default function QRCodeDisplay() {
    const [currentUrl, setCurrentUrl] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setCurrentUrl(window.location.href);
        }
    }, []);

    if (!currentUrl) return null;

    return (
        <div className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-xl shadow-2xl border border-gray-100 max-w-sm mx-auto">
            <div className="mb-6 p-4 bg-white rounded-lg shadow-inner">
                <QRCodeSVG
                    value={currentUrl}
                    size={200}
                    level="H"
                    className="mx-auto"
                />
            </div>
            <h2 className="text-2xl font-bold mb-3 text-gray-800">Mobile Experience</h2>
            <p className="text-gray-600 mb-6">
                This interactive experience is designed exclusively for mobile devices.
                Please scan the QR code to continue on your phone.
            </p>
            <div className="text-xs text-gray-400 font-mono bg-gray-50 px-3 py-2 rounded">
                {currentUrl}
            </div>
        </div>
    );
}
