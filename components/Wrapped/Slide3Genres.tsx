"use client";

import { useMemo } from "react";
import { EnrichedDrama } from "@/app/actions";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getTopGenres, CustomGenre } from "@/lib/genre-mapping";

interface Slide3GenresProps {
    dramas: EnrichedDrama[];
    onNext: () => void;
    onPrev: () => void;
}

// Map Genres to Icons and Colors
const GENRE_CONFIG: Record<CustomGenre, { imgSrc?: string, bg: string }> = {
    "Romance": { imgSrc: "/assets/slide3-genre-icon-romance.svg", bg: "bg-primary-20" },
    "Sci-Fi": { imgSrc: "/assets/slide3-genre-icon-sci.svg", bg: "bg-[#D0D5FB]" },
    "Comedy": { imgSrc: "/assets/slide3-genre-icon-comedy.svg", bg: "bg-[#FBE5D0]" },
    "Thriller": { imgSrc: "/assets/slide3-genre-icon-thriller.svg", bg: "bg-[#EFDCDC]" },
    "Fantasy": { imgSrc: "/assets/slide3-genre-icon-fantasy.svg", bg: "bg-[#F0D0FB]" },
    "Action": { imgSrc: "/assets/slide3-genre-icon-action.svg", bg: "bg-[#E1E3D5]" },
    "Historical": { imgSrc: "/assets/slide3-genre-icon-historical.svg", bg: "bg-[#F2EFD9]" },
    "Slice of Life": { imgSrc: "/assets/slide3-genre-icon-sol.svg", bg: "bg-[#EEFDF4]" },
    "Melodrama": { imgSrc: "/assets/slide3-genre-icon-melodrama.svg", bg: "bg-[#EEEEEE]" },
    "Medical": { imgSrc: "/assets/slide3-genre-icon-med.svg", bg: "bg-[#E6E5E5]" },
    "Legal": { imgSrc: "/assets/slide3-genre-icon-legal.svg", bg: "bg-[#FDEEF1]" },
    "School": { imgSrc: "/assets/slide3-genre-icon-school.svg", bg: "bg-[#F7EEFD]" },
    "Youth": { imgSrc: "/assets/slide3-genre-icon-youth.svg", bg: "bg-[#D1F4FA]" },
    "Drama": { imgSrc: "/assets/slide3-genre-icon-drama.svg", bg: "bg-[#D8DAF3]" },
};

const getGenreConfig = (genre: CustomGenre) => {
    return GENRE_CONFIG[genre] || GENRE_CONFIG["Drama"];
};

export default function Slide3Genres({ dramas, onNext, onPrev }: Slide3GenresProps) {

    // Aggregation Logic
    const topGenres = useMemo(() => {
        const counts: Record<string, number> = {};
        dramas.forEach(drama => {
            const genres = getTopGenres(drama);
            genres.forEach(g => {
                counts[g] = (counts[g] || 0) + 1;
            });
        });

        const sorted = Object.entries(counts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 3)
            .map(([name, count]) => ({
                name: name as CustomGenre,
                count
            }));

        // Normalize heights for bar chart
        const maxCount = sorted[0]?.count || 1;
        return sorted.map(g => ({
            ...g,
            heightPercent: (g.count / maxCount) * 100
        }));
    }, [dramas]);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariant = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    };

    return (
        <motion.div
            className="w-full h-full flex flex-col items-center justify-start relative px-6 pt-16 min-h-screen bg-bg-primary overflow-hidden"
            variants={container}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0 }}
        >
            {/* Decorative Top Title */}
            <motion.div variants={itemVariant} className="mb-12 text-center relative">
                <div className="absolute -top-[1%] -left-8 opacity-70 -rotate-12">
                    <img src="/assets/slide3-sparkle.svg" className="w-6 h-6" alt="" />
                </div>
                <div className="absolute -top-[1%] -right-8 opacity-70 rotate-[-12deg]">
                    <img src="/assets/slide3-star.svg" className="w-8 h-8" alt="" />
                </div>
                <h1 className="font-accent text-6xl text-text-primary">Your Top <br /> Genres </h1>

                <div className="absolute -bottom-3 -right-6 opacity-70 rotate-12">
                    <img src="/assets/slide3-sparkle.svg" className="w-6 h-6" alt="" />
                </div>
            </motion.div>

            {/* Bar Chart Area */}
            <div className="w-full max-w-[320px] h-64 flex items-end justify-center gap-6 mb-12 px-8 relative">
                {/* Ground Line */}
                <img src="/assets/slide3-chartline.svg" className="absolute bottom-[-2px] w-full z-[10]" alt="" />

                {topGenres.map((g, i) => {
                    const config = getGenreConfig(g.name);
                    const isFirst = i === 0;

                    return (
                        <motion.div
                            key={g.name}
                            className={`w-20 rounded-t-lg relativer ${config.bg} `}
                            initial={{ height: 0 }}
                            animate={{ height: `${Math.max(g.heightPercent, 20)}%` }} // Min height 20% so text visible
                            transition={{ type: "spring", stiffness: 60, delay: 0.3 + (i * 0.1) }}
                        >
                        </motion.div>
                    );
                })}
            </div>

            {/* Ranked List */}
            <div className="w-full max-w-xs flex flex-col gap-6">
                {topGenres.map((g, i) => {
                    const config = getGenreConfig(g.name);
                    return (
                        <motion.div
                            key={g.name}
                            variants={itemVariant}
                            className="flex items-center justify-between"
                        >
                            <div className="flex items-center gap-3">
                                <span className="font-heading font-bold text-4xl text-center text-text-primary w-12">{i + 1}.</span>
                                <span className="font-heading font-bold text-4xl text-text-primary">{g.name}</span>
                            </div>

                            {/* Icon Tag */}
                            <motion.div
                                className={`${config.bg} w-18 h-12 rounded-full text-white flex items-center justify-center transform ${i === 0 ? 'rotate-12' : i === 1 ? '-rotate-2' : 'rotate-[-10deg]'}`}
                                animate={{ scale: [1, 1.15, 1] }}
                                transition={{ duration: 4, repeat: Infinity, repeatDelay: 2, ease: "easeInOut", delay: i * 0.6 }}
                            >
                                {config.imgSrc && (
                                    <img src={config.imgSrc} alt={g.name} className="w-9 h-9 object-contain" />
                                )}
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Navigation Footer */}
            <motion.div
                className="relative w-full max-w-lg pt-6 flex items-center justify-between"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
            >
                <button onClick={onPrev} className="p-3 hover:bg-black/5 rounded-full transition-colors">
                    <ArrowLeft size={24} className="text-text-primary" />
                </button>

                <div className="flex gap-2">
                    {[...Array(7)].map((_, i) => (
                        <div key={i} className={`h-1.5 rounded-full transition-all ${i === 2 ? 'w-6 bg-accent-30' : 'w-1.5 bg-black/10'}`} />
                    ))}
                </div>

                <button onClick={onNext} className="w-18 h-14 bg-text-primary rounded-full flex items-center justify-center text-bg-primary hover:scale-105 transition-transform shadow-md">
                    <ArrowRight size={24} />
                </button>
            </motion.div>
        </motion.div>
    );
}
