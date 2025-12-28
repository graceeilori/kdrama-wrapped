'use client';
import DeviceGuard from '@/components/DeviceGuard';
import { useState } from 'react';
import { Theme, themes } from '@/lib/themes';
import WrappedFlow from '@/components/WrappedFlow';
import { IdentifiedDrama } from '@/app/actions';
import InputFlow, { PageState } from '@/components/InputFlow';
import ThemeWrapper from '@/components/ThemeWrapper';
import Image from 'next/image';
import { Palette } from 'lucide-react';

export default function CreatePage() {
    // State to store the user's preferred theme for the FINAL wrapped result
    const [selectedTheme, setSelectedTheme] = useState<Theme>('daylight');
    const [flowState, setFlowState] = useState<PageState>('input');
    const [wrappedData, setWrappedData] = useState<{ dramas: IdentifiedDrama[]; topDramas: IdentifiedDrama[] } | null>(null);

    return (
        <DeviceGuard>
            <ThemeWrapper theme="daylight">
                <main className="min-h-screen w-full relative overflow-x-hidden bg-bg-primary text-text-primary">
                    {/* Render Wrapped Flow if data exists */}
                    {/* Render Wrapped Flow if data exists */}
                    {wrappedData && (
                        <div className="fixed inset-0 z-50">
                            <WrappedFlow
                                dramas={wrappedData.dramas}
                                topDramas={wrappedData.topDramas}
                                onBack={() => setWrappedData(null)}
                            />
                        </div>
                    )}

                    {/* Input Flow - Keep mounted but hide when wrapped is showing */}
                    <div className={`relative z-10 w-full max-w-4xl mx-auto px-5 py-12 flex flex-col items-center text-center ${flowState !== 'input' ? 'min-h-screen justify-center' : ''} ${wrappedData ? 'hidden' : ''}`}>

                        {/* Header */}
                        {flowState === 'input' && (
                            <div className="mb-8">
                                <h1 className="font-heading font-black tracking-tighter text-5xl md:text-7xl mb-6 text-transparent bg-clip-text bg-gradient-to-br from-text-primary to-text-primary/70">
                                    Let&apos;s Create Your Wrapped
                                </h1>
                                <p className="font-sans text-lg md:text-xl opacity-70 max-w-2xl mx-auto leading-relaxed">
                                    Share your watch list and preferences to get started.
                                </p>
                            </div>
                        )}

                        {/* Theme Selection*/}
                        {flowState === 'input' && (
                            <div className="mb-10 w-full rounded-2xl border-2 border-secondary-20 p-6 text-left">
                                <div className="flex items-center gap-2 mb-2">
                                    <Palette className="size-6 text-accent-20" />
                                    <label className="font-heading font-black text-xl tracking-tight text-text-primary">Select a Wrapped Theme</label>
                                </div>
                                <p className="font-sans text-sm mb-6 opacity-70">Choose a theme for your wrapped</p>

                                <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
                                    {(Object.keys(themes) as Theme[]).map((themeKey) => (
                                        <button
                                            key={themeKey}
                                            onClick={() => setSelectedTheme(themeKey)}
                                            className={`relative p-3 rounded-xl border-2 transition-all flex flex-col items-start gap-4 
                                                        ${selectedTheme === themeKey ? 'border-secondary-20 bg-white/20 ring-1 ring-secondary-20/20' : 'border-transparent'}`}>
                                            <Image src={themes[themeKey].image} alt={themeKey} width={144} height={144} className='rounded-md' />
                                            <span className="text-body-sm font-medium text-left">
                                                {themes[themeKey].label}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <InputFlow
                            theme="daylight"
                            onStateChange={setFlowState}
                            onComplete={(dramas, topDramas) => {
                                setWrappedData({ dramas, topDramas });
                            }}
                        />

                    </div>
                </main>
            </ThemeWrapper>
        </DeviceGuard>
    );
}
