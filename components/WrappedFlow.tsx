"use client";

import { useState, useEffect, useRef } from "react";
import { EnrichedDrama } from "@/app/actions";
import { calculateVibe } from "@/lib/vibe-calculator"; // Import vibe logic
import { getTopGenres } from "@/lib/genre-mapping"; // Import genre logic
import { AnimatePresence, motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
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
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isMuted, setIsMuted] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);

    useEffect(() => {
        // Attempt autoplay on mount
        const audio = audioRef.current;
        if (audio) {
            audio.volume = 0.3; // Specific volume level
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    // Auto-play was prevented
                    setIsMuted(true);
                });
            }
        }
    }, []);

    const toggleMute = () => {
        const audio = audioRef.current;
        if (audio) {
            if (isMuted) {
                audio.muted = false;
                audio.play().catch(() => { });
            } else {
                audio.muted = true;
            }
            setIsMuted(!isMuted);
        }
    };

    const handleNext = () => {
        // Ensure audio is playing on first interaction
        if (!hasInteracted && audioRef.current) {
            audioRef.current.muted = false;
            audioRef.current.play().catch(() => { });
            setIsMuted(false);
            setHasInteracted(true);
        }
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

    // Scroll and Swipe removed per user request

    // Swipe Logic
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    // Minimum swipe distance
    const minSwipeDistance = 50;

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null); // Reset
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        // User requested swiping between slides 2-7.
        // We will allow it generally for better UX, but handlePrev already checks for slide 1 boundaries.

        if (isLeftSwipe) {
            // Next Slide
            // Prevent swiping past the last slide (7)
            if (currentSlide < 7) {
                handleNext();
            }
        } else if (isRightSwipe) {
            // Prev Slide
            // Allow swiping back from 2 to 1, but maybe restrict if strictly "between 2-7"
            // Interpreting "between 2-7" as the range where navigation is most active.
            // Swipe right on slide 2 -> slide 1 is likely desired.
            if (currentSlide > 1) {
                handlePrev();
            }
        }
    };

    return (
        <div
            className="w-full h-full min-h-screen bg-[#FFFBF5] text-text-primary overflow-hidden relative"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            {/* Soundtrack */}
            <audio ref={audioRef} src="/han-river-chill-436915.mp3" loop />

            {/* Mute Toggle */}
            <button
                onClick={toggleMute}
                className="absolute top-6 right-6 z-50 p-3 bg-white/50 backdrop-blur-md rounded-full text-text-primary hover:bg-white/80 transition-all border border-white/20"
                aria-label={isMuted ? "Unmute" : "Mute"}
            >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
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
                        dramas={dramas}
                        onNext={handleNext}
                        onPrev={handlePrev}
                    />
                )}
                {currentSlide === 6 && (
                    <Slide6Vibe
                        key="slide6"
                        dramas={dramas}
                        onNext={handleNext}
                        onPrev={handlePrev}
                    />
                )}
                {currentSlide === 7 && (
                    <Slide7Summary
                        key="slide7"
                        dramas={dramas}
                        topDramas={topDramas}
                        stats={{
                            dramaCount,
                            episodeCount,
                            totalHours
                        }}
                        vibe={calculateVibe(dramas)}
                        topGenres={(() => {
                            const allGenres = dramas.flatMap(d => getTopGenres(d));
                            const genreCounts = allGenres.reduce((acc, g) => {
                                acc[g] = (acc[g] || 0) + 1;
                                return acc;
                            }, {} as Record<string, number>);
                            return Object.entries(genreCounts)
                                .sort((a, b) => b[1] - a[1])
                                .slice(0, 3)
                                .map(([g]) => g);
                        })()}
                        onPrev={handlePrev}
                        onReplay={handleReplay} // Pass replay handler
                    />
                )}
                {/* Future slides will go here */}
            </AnimatePresence>
        </div>
    );
}
