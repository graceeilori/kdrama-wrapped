"use client";

import { EnrichedDrama } from "@/app/actions";
import { VibeType } from "@/lib/vibe-calculator";
import { forwardRef } from "react";
import { IdentifiedDrama } from "@/app/actions";
import { motion } from "framer-motion";
import Image from "next/image";

interface SummaryCardProps {
    dramas: EnrichedDrama[];
    topDramas: IdentifiedDrama[];
    username?: string;
    stats: {
        dramaCount: number;
        episodeCount: number;
        totalHours: number;
    };
    vibeKey: VibeType;
    topGenres: string[];
}

// Vibe Configuration (Matches Slide6Vibe.tsx)
const vibeConfig: Record<VibeType, {
    label: string;
    image: string;
    color: string;
    bgColor: string;
    vibeIcon: string;
}> = {
    wanderer: {
        label: "#wanderer",
        image: "/assets/slide6-vibe-wanderer.svg",
        color: "#D68F8F", // var(--vibe-140)
        bgColor: "#84D1D8", // var(--accent-10)
        vibeIcon: "/assets/slide6-icon-wave.svg"
    },
    detective: {
        label: "#detective",
        image: "/assets/slide6-vibe-detective.svg",
        color: "#8189E4", // var(--vibe-110)
        bgColor: "#B3B3B3", // var(--neutral-20)
        vibeIcon: "/assets/slide6-icon-scale.svg"
    },
    healing: {
        label: "#healingsoul",
        image: "/assets/slide6-vibe-healing.svg",
        color: "#B08FD6", // var(--vibe-20)
        bgColor: "#CBE7B1", // var(--seed-40)
        vibeIcon: "/assets/slide6-icon-leaf.svg"
    },
    romantic: {
        label: "#hopelessromantic",
        image: "/assets/slide6-vibe-hopeless.svg",
        color: "#D88DAE", // var(--vibe-50)
        bgColor: "#E06F6C", // var(--fragment-50)
        vibeIcon: "/assets/slide6-icon-heart.svg"
    },
    time: {
        label: "#timetraveler",
        image: "/assets/slide6-vibe-traveler.svg",
        color: "#D8C08D", // var(--vibe-80)
        bgColor: "#F5F5FF",
        vibeIcon: "/assets/slide6-icon-hourglass.svg"
    }
};

const SummaryCard = forwardRef<HTMLDivElement, SummaryCardProps>(function SummaryCard({ dramas, topDramas, stats, vibeKey, topGenres, username = "My 2025" }, ref) {
    // Vibe Lookup
    const vibe = vibeConfig[vibeKey] || vibeConfig.romantic;

    const safeTopDramas = [
        topDramas[0] || { title: "N/A" },
        topDramas[1] || { title: "N/A" },
        topDramas[2] || { title: "N/A" }
    ];

    return (
        <div
            ref={ref}
            className="w-[1080px] h-[1920px] bg-[#FBF9EF] relative flex flex-col items-center p-12 overflow-hidden text-[#201C24]"
            // Fixed dimensions for HD capture (scale down with CSS transform for preview)
            style={{ width: 1080, height: 1920 }}
        >

            {/* Header */}
            <div className="w-full flex flex-col justify-between items-center mb-16 pt-12 px-8">
                <h1 className="font-heading font-bold text-7xl mb-2">My 2025</h1>
                <h2 className="font-heading font-bold text-6xl text-[rgba(32,28,36,0.8)] mb-2">K-Drama Wrapped</h2>
            </div>

            {/* Vibe */}
            <div className="flex flex-col items-center mb-20 relative">
                <div className="relative w-120 h-120 mb-12">
                    <img src={vibe.image} alt={vibe.label} className="w-full h-full object-contain relative z-10" />
                </div>
                <h3 className="font-accent text-7xl" style={{ color: vibe.color }}>{vibe.label}</h3>
            </div>

            {/* Stats Bar */}
            <div className="w-full rounded-full px-12 py-8 flex justify-between items-center text-white mb-18" style={{ backgroundColor: vibe.bgColor }}>
                <div className="flex flex-col items-center flex-1 gap-2">
                    <span className="font-heading font-black text-7xl mb-1">{stats.dramaCount}</span>
                    <span className="text-3xl font-semibold tracking-widest opacity-90">Dramas</span>
                    <Image src="/assets/summary-tv.svg" alt=" " width={65} height={65} className="absolute bottom-[820px] left-[124px]" />
                </div>
                <div className="flex flex-col items-center flex-1 gap-2">
                    <span className="font-heading font-black text-7xl mb-1">{stats.episodeCount}</span>
                    <span className="text-3xl font-semibold tracking-widest opacity-90">Episodes</span>
                    <Image src="/assets/summary-play.svg" alt=" " width={61} height={61} className="absolute bottom-[780px] left-[610px] translate-y-4 transform rotate-[28deg]" />
                </div>
                <div className="flex flex-col items-center flex-1 gap-2">
                    <span className="font-heading font-black text-7xl mb-1">{stats.totalHours}</span>
                    <span className="text-3xl font-semibold tracking-widest opacity-90">Hours</span>
                    <Image src="/assets/summary-clock.svg" alt=" " width={68} height={68} className="absolute bottom-[860px] right-[116px]" />
                </div>
            </div>

            {/* Bottom Grid: Top Dramas & Genres */}
            <div className="w-full flex flex-row items-start justify-between gap-16 px-12 pb-24">

                {/* Top Dramas */}
                <div className="flex flex-col justify-center">
                    <h4 className="font-accent text-6xl mb-12 text-center">Your Top Dramas</h4>
                    <div className="flex items-end justify-center gap-2 mb-10 w-full max-w-lg pt-2 pb-2">
                        {/* #2 - Left */}
                        <div className="relative w-64 aspect-[2/3] rounded-sm shadow-sm overflow-hidden transform rotate-[-3deg] z-10 translate-y-4">
                            {safeTopDramas[1].posterUrl ? (
                                <Image
                                    src={safeTopDramas[1].posterUrl}
                                    alt={safeTopDramas[1].title || "Drama 2"}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-[#FFE5B4] text-text-primary font-bold p-2 text-center text-sm">
                                    {safeTopDramas[1].title}
                                </div>
                            )}
                        </div>

                        {/* #1 - Center (Largest) */}
                        <div className="relative w-80 aspect-[2/3] bg-gray-200 rounded-sm shadow-md overflow-hidden z-20 -translate-y-4">
                            {safeTopDramas[0].posterUrl ? (
                                <Image
                                    src={safeTopDramas[0].posterUrl}
                                    alt={safeTopDramas[0].title || "Drama 1"}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-[#FFD700] text-text-primary font-bold p-2 text-center">
                                    {safeTopDramas[0].title}
                                </div>
                            )}
                        </div>

                        {/* #3 - Right */}
                        <div className="relative w-64 aspect-[2/3] bg-gray-200 rounded-sm shadow-sm overflow-hidden transform rotate-[3deg] z-10 translate-y-8">
                            {safeTopDramas[2].posterUrl ? (
                                <Image
                                    src={safeTopDramas[2].posterUrl}
                                    alt={safeTopDramas[2].title || "Drama 3"}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-[#FFCC99] text-text-primary font-bold p-2 text-center text-sm">
                                    {safeTopDramas[2].title}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Top Genres List */}
                <div className="flex flex-col justify-end">
                    <h4 className="font-accent text-6xl mb-12 text-center w-88">Your Top Genres</h4>
                    <div className="flex flex-col gap-12 items-start justify-start">
                        {topGenres.map((g, i) => (
                            <div key={i} className="flex items-baseline gap-4">
                                <span className="font-heading font-bold text-5xl w-12 text-center">{i + 1}.</span>
                                <span className="font-heading font-bold text-5xl whitespace-nowrap overflow-hidden text-ellipsis max-w-md text-right">{g}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="mt-auto pb-4 flex justify-end">
                <span className="font-accent text-5xl opacity-80">kdramawrapped.com</span>
            </div>
        </div>
    );
});

export default SummaryCard;
