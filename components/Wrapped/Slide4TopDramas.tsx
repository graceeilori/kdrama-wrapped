"use client";

import { motion } from "framer-motion";
import { IdentifiedDrama } from "@/app/actions";
import { ArrowLeft, ArrowRight, Crown } from "lucide-react";
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

    const safeTopDramas = [
        topDramas[0] || { title: "N/A" },
        topDramas[1] || { title: "N/A" },
        topDramas[2] || { title: "N/A" }
    ];

    return (
        <motion.div
            className="w-full h-full flex flex-col items-center justify-between relative px-6 py-6 bg-bg-primary overflow-hidden no-scrollbar"
            variants={container}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0 }}
        >
            <div className="flex-1 w-full flex flex-col items-center justify-center shrink-0">
                {/* Decorative Top Title */}
                <motion.div variants={itemVariant} className="mb-4 text-center relative">
                    <div className="absolute -top-[-35%] -left-8">
                        <img src="/assets/slide4-medal.svg" className="w-8 h-8" alt="" />
                    </div>
                    <div className="absolute -top-[-35%] -right-8">
                        <img src="/assets/slide4-medal.svg" className="w-8 h-8" alt="" />
                    </div>
                    <h1 className="font-accent text-6xl text-text-primary">Your Top 3 <br /> Dramas </h1>

                    <div className="absolute -bottom-3 -right-1 opacity-50 rotate-20">
                        <img src="/assets/slide4-heart.svg" className="w-6 h-6" alt="" />
                    </div>
                </motion.div>

                {/* Poster Grid (Podium Style) */}
                <div className="flex items-end justify-center gap-2 mb-4 w-full max-w-lg pt-2 pb-2">

                    {/* #2 - Left */}
                    <motion.div
                        variants={itemVariant}
                        className="relative w-1/3 aspect-[2/3] rounded-sm shadow-sm overflow-hidden transform rotate-[-3deg] z-10 translate-y-4"
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
                    </motion.div>

                    {/* #1 - Center (Largest) */}
                    <motion.div
                        variants={itemVariant}
                        className="relative w-2/5 aspect-[2/3] bg-gray-200 rounded-sm shadow-md overflow-hidden z-20 -translate-y-4"
                    >
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
                    </motion.div>


                    {/* #3 - Right */}
                    <motion.div
                        variants={itemVariant}
                        className="relative w-1/3 aspect-[2/3] bg-gray-200 rounded-sm shadow-sm overflow-hidden transform rotate-[3deg] z-10 translate-y-8"
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
                    </motion.div>
                </div>

                {/* List View */}
                <div className="w-full max-w-sm flex flex-col gap-3 pt-4">
                    {safeTopDramas.map((drama, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariant}
                            className={`
                                flex items-center gap-2 p-4 relative
                                ${index === 0 ? 'bg-[#FAE8B4]/50' : ''}
                                ${index === 1 ? 'bg-[#F4EEB1]/30' : ''}
                                ${index === 2 ? 'bg-[#F2D7C2]/30' : ''}
                            `}
                        >
                            <span className="font-heading font-bold text-4xl w-8 text-right text-text-primary">{index + 1}</span>
                            <span className="font-heading font-bold text-lg text-text-primary line-clamp-1">{drama.title}</span>

                            {/* Crown for #1 */}
                            {index === 0 && (
                                <div className="absolute -top-4 -right-4 transform rotate-[30deg] z-20">
                                    <img src="/assets/slide4-crown.svg" className="w-12 h-12" alt="" />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>



            {/* Navigation Footer */}
            <motion.div
                className="relative shrink-0 w-full max-w-lg pt-4 pb-[env(safe-area-inset-bottom,20px)] flex items-center justify-between z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
            >
                <button onClick={onPrev} className="p-3 hover:bg-black/5 rounded-full transition-colors">
                    <ArrowLeft size={24} className="text-text-primary" />
                </button>

                <div className="flex gap-2">
                    {[...Array(7)].map((_, i) => (
                        <div key={i} className={`h-1.5 rounded-full transition-all ${i === 3 ? 'w-6 bg-accent-30' : 'w-1.5 bg-black/10'}`} />
                    ))}
                </div>

                <button onClick={onNext} className="w-18 h-14 bg-text-primary rounded-full flex items-center justify-center text-bg-primary hover:scale-105 transition-transform shadow-md">
                    <ArrowRight size={24} />
                </button>
            </motion.div>
        </motion.div>
    );
}
