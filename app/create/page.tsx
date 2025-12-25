'use client';

import DeviceGuard from '@/components/DeviceGuard';
import { useState } from 'react';
import { Theme, themes } from '@/lib/themes';
import ThemeWrapper from '@/components/ThemeWrapper';

export default function CreatePage() {
    const [selectedTheme, setSelectedTheme] = useState<Theme>('standard');

    return (
        <DeviceGuard>
            <ThemeWrapper theme={selectedTheme} className="min-h-screen flex flex-col items-center pt-10 px-4">
                <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white font-bold">
                            📝
                        </div>
                        <div>
                            <h1 className="text-h3 font-bold">Let&apos;s Get Started</h1>
                            <p className="text-body-sm opacity-80">Choose your vibe & input stats</p>
                        </div>
                    </div>

                    <div className="mb-8">
                        <label className="block text-body-sm font-medium mb-3">Choose a Theme</label>
                        <div className="grid grid-cols-3 gap-3">
                            {(Object.keys(themes) as Theme[]).map((themeKey) => (
                                <button
                                    key={themeKey}
                                    onClick={() => setSelectedTheme(themeKey)}
                                    className={`
                      relative p-2 rounded-lg border-2 transition-all
                      ${selectedTheme === themeKey ? 'border-accent scale-105' : 'border-transparent opacity-70 hover:opacity-100'}
                    `}
                                >
                                    <div
                                        className="aspect-square rounded-md mb-2 shadow-sm"
                                        style={{
                                            backgroundColor: themes[themeKey].colors['--bg-primary'],
                                            border: `2px solid ${themes[themeKey].colors['--accent-10']}`
                                        }}
                                    />
                                    <span className="block text-body-sm text-center font-medium truncate">
                                        {themes[themeKey].label}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-white/5 rounded-xl p-8 text-center border-2 border-dashed border-white/20 opacity-70">
                            <p className="text-body-md">Form Inputs Coming Soon...</p>
                        </div>

                        <button className="w-full py-3 bg-accent text-white rounded-xl text-body-lg font-bold shadow-lg shadow-accent/20">
                            Generate Wrapped
                        </button>
                    </div>
                </div>
            </ThemeWrapper>
        </DeviceGuard>
    );
}
