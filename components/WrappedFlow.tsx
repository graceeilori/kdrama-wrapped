"use client";

import { useState, useEffect } from "react";
import { EnrichedDrama } from "@/app/actions";
import { AnimatePresence, motion } from "framer-motion";
import Slide1Intro from "./Wrapped/Slide1Intro";
import Slide2Stats from "./Wrapped/Slide2Stats";
import Slide3Genres from "./Wrapped/Slide3Genres";
import Slide4TopDramas from "./Wrapped/Slide4TopDramas";
import Slide5FamiliarFace from "./Wrapped/Slide5FamiliarFace";
import Slide6Vibe from "./Wrapped/Slide6Vibe";
import Slide7Summary from "./Wrapped/Slide7Summary";

interface WrappedFlowProps {
    dramas: EnrichedDrama[];
    topDramas: EnrichedDrama[];
    onBack: () => void;
}

export default function WrappedFlow({ dramas, topDramas, onBack }: WrappedFlowProps) {
    const [currentSlide, setCurrentSlide] = useState(1);

    const handleNext = () => {
        setCurrentSlide(prev => prev + 1);
    };

    const handlePrev = () => {
        if (currentSlide === 1) {
            onBack();
        } else {
            setCurrentSlide(prev => prev - 1);
        }
    };

    const handleReplay = () => {
        setCurrentSlide(1);
    };

    // Real Stats Calculation
    const dramaCount = dramas.length;

    // Sum episodes. Default to 16 if missing to avoid showing 0.
    const episodeCount = dramas.reduce((acc, drama) => acc + (drama.episodeCount || 16), 0);

    // Sum runtime. Default to 16 * 60 (16 hrs) if missing.
    const totalMinutes = dramas.reduce((acc, drama) => acc + (drama.totalRuntime || (16 * 60)), 0);
    const totalHours = Math.round(totalMinutes / 60);

    // Scroll (Wheel) Navigation
    useEffect(() => {
        let lastScrollTime = 0;
        const SCROLL_COOLDOWN = 800; // ms

        const handleWheel = (e: WheelEvent) => {
            const now = Date.now();
            if (now - lastScrollTime < SCROLL_COOLDOWN) return;

            if (e.deltaY > 0) {
                // Scroll Down -> Next
                if (currentSlide < 7) { // Max slides currently 7
                    handleNext();
                    lastScrollTime = now;
                }
            } else if (e.deltaY < 0) {
                // Scroll Up -> Prev
                if (currentSlide > 1) {
                    handlePrev();
                    lastScrollTime = now;
                }
            }
        };

        window.addEventListener("wheel", handleWheel);
        return () => window.removeEventListener("wheel", handleWheel);
    }, [currentSlide]);

    return (
        <div className="w-full h-full min-h-screen bg-[#FFFBF5] text-text-primary overflow-hidden relative">
            {/* Temporary Back Button for Testing */}
            <button
                onClick={onBack}
                className="absolute top-4 left-4 z-50 bg-black/10 hover:bg-black/20 text-text-primary px-3 py-1 rounded-full text-sm font-bold backdrop-blur-sm"
            >
                ← Exit Testing
            </button>

            <AnimatePresence mode="wait">
                {currentSlide === 1 && (
                    <Slide1Intro key="slide1" onNext={handleNext} />
                )}
                {currentSlide === 2 && (
                    <Slide2Stats
                        key="slide2"
                        dramaCount={dramaCount}
                        episodeCount={episodeCount}
                        totalHours={totalHours}
                        onNext={handleNext}
                        onPrev={handlePrev}
                    />
                )}
                {/* SLIDE 3: Genres */}
                {currentSlide === 3 && (
                    <Slide3Genres
                        key="slide3"
                        dramas={dramas}
                        onNext={handleNext}
                        onPrev={handlePrev}
                    />
                )}
                {/* SLIDE 4: Top Dramas */}
                {currentSlide === 4 && (
                    <Slide4TopDramas
                        key="slide4"
                        topDramas={topDramas}
                        onNext={handleNext}
                        onPrev={handlePrev}
                    />
                )}
                {currentSlide === 5 && (
                    <Slide5FamiliarFace
                        key="slide5"
                        onNext={handleNext}
                        onPrev={handlePrev}
                    />
                )}
                {currentSlide === 6 && (
                    <Slide6Vibe
                        key="slide6"
                        onNext={handleNext}
                        onPrev={handlePrev}
                    />
                )}
                {currentSlide === 7 && (
                    <Slide7Summary
                        key="slide7"
                        dramas={dramas}
                        topDramas={topDramas}
                        onPrev={handlePrev}
                        onReplay={handleReplay} // Pass replay handler
                    />
                )}
                {/* Future slides will go here */}
            </AnimatePresence>
        </div>
    );
}
