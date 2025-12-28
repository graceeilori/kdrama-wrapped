"use client";

import { motion } from "framer-motion";
import { IdentifiedDrama } from "@/app/actions";
import { ArrowLeft, ArrowRight, Crown, Medal, Award } from "lucide-react";
import Image from "next/image";

interface Slide4TopDramasProps {
    topDramas: IdentifiedDrama[];
    onNext: () => void;
    onPrev: () => void;
}

export default function Slide4TopDramas({ topDramas, onNext, onPrev }: Slide4TopDramasProps) {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
        }
    };

    const itemVariant = {
        hidden: { y: 30, opacity: 0 },
        show: { y: 0, opacity: 1 }
    };

    // Ensure we always have 3 items even if empty (shouldn't happen with strict validation, but good for safety)
    const safeTopDramas = [
        topDramas[0] || { title: "N/A" },
        topDramas[1] || { title: "N/A" },
        topDramas[2] || { title: "N/A" }
    ];

    return (
        <motion.div
            className="w-full h-full flex flex-col items-center justify-center relative p-6 min-h-screen bg-[#FFFBF5] overflow-hidden"
            variants={container}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0 }}
        >
            {/* Title */}
            <motion.div variants={itemVariant} className="mb-8 text-center relative z-10 text-text-primary">
                <div className="flex items-center gap-3 justify-center mb-2">
                    <Crown className="text-secondary-20 w-8 h-8 -rotate-12" strokeWidth={1.5} />
                    <h1 className="font-accent text-5xl">Your Top 3</h1>
                    <Crown className="text-secondary-20 w-8 h-8 rotate-12" strokeWidth={1.5} />
                </div>
                <h2 className="font-accent text-6xl">Dramas</h2>
            </motion.div>

            {/* Poster Grid (Podium Style) */}
            <div className="flex items-end justify-center gap-4 mb-10 w-full max-w-lg h-[250px]">

                {/* #2 - Left */}
                <motion.div
                    variants={itemVariant}
                    className="relative w-1/3 aspect-[2/3] bg-gray-200 rounded-lg shadow-md overflow-hidden transform rotate-[-3deg] z-10 translate-y-4"
                >
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
                    <div className="absolute top-2 left-2 bg-text-primary text-[#FFFBF5] w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs">2</div>
                </motion.div>

                {/* #1 - Center (Largest) */}
                <motion.div
                    variants={itemVariant}
                    className="relative w-2/5 aspect-[2/3] bg-gray-200 rounded-lg shadow-xl overflow-hidden z-20 -translate-y-4 border-2 border-secondary-20"
                >
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-secondary-20 z-30">
                        <Crown size={32} fill="currentColor" />
                    </div>
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
                    <div className="absolute bottom-2 right-2 bg-secondary-20 text-white w-8 h-8 rounded-full flex items-center justify-center font-black text-lg shadow-lg">1</div>
                </motion.div>


                {/* #3 - Right */}
                <motion.div
                    variants={itemVariant}
                    className="relative w-1/3 aspect-[2/3] bg-gray-200 rounded-lg shadow-md overflow-hidden transform rotate-[3deg] z-10 translate-y-8"
                >
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
                    <div className="absolute top-2 right-2 bg-text-primary text-[#FFFBF5] w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs">3</div>
                </motion.div>
            </div>

            {/* List View */}
            <div className="w-full max-w-sm flex flex-col gap-3">
                {safeTopDramas.map((drama, index) => (
                    <motion.div
                        key={index}
                        variants={itemVariant}
                        className={`
                            flex items-center gap-4 p-3 rounded-xl
                            ${index === 0 ? 'bg-[#FAE8B4]/50' : ''}
                            ${index === 1 ? 'bg-[#F4EEB1]/30' : ''}
                            ${index === 2 ? 'bg-[#F2D7C2]/30' : ''}
                        `}
                    >
                        <span className="font-heading font-black text-4xl w-8 text-right text-text-primary">{index + 1}</span>
                        <span className="font-sans font-bold text-lg text-text-primary line-clamp-1">{drama.title}</span>
                    </motion.div>
                ))}
            </div>


            {/* Navigation Footer */}
            <motion.div
                className="absolute bottom-12 w-full max-w-lg px-6 flex items-center justify-between"
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

                <button onClick={onNext} className="w-12 h-12 bg-text-primary rounded-full flex items-center justify-center text-[#FFFBF5] hover:scale-105 transition-transform shadow-lg">
                    <ArrowRight size={24} />
                </button>
            </motion.div>
        </motion.div>
    );
}
