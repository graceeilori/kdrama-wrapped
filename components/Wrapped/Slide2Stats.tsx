"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Tv, PlayCircle, Clock } from "lucide-react";

interface Slide2StatsProps {
    dramaCount: number;
    episodeCount: number;
    totalHours: number;
    onNext: () => void;
    onPrev: () => void;
}

export default function Slide2Stats({ dramaCount, episodeCount, totalHours, onNext, onPrev }: Slide2StatsProps) {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    };

    return (
        <motion.div
            className="w-full h-full flex flex-col items-center justify-center relative p-6 min-h-screen bg-[#FFFBF5] overflow-hidden"
            variants={container}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0 }}
        >
            {/* Decorative Top Title */}
            <motion.div variants={item} className="mb-12 text-center relative">
                {/* Decorative Squiggle (CSS or SVG) */}
                <motion.div
                    className="absolute -top-6 -left-8 text-accent-30 opacity-70"
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                >
                    <img src="/assets/spiral-p30.svg" className="w-8 h-8" alt="" />
                </motion.div>

                <h1 className="font-accent text-6xl text-text-primary">This Year...</h1>

                <motion.div
                    className="absolute -bottom-4 -right-6 opacity-70"
                    animate={{ rotate: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 3, delay: 1 }}
                >
                    <img src="/assets/landing-sparkle.svg" className="w-6 h-6" alt="" />
                </motion.div>
            </motion.div>


            <div className="w-full max-w-md flex flex-col gap-8">
                {/* Block 1: Dramas (Purple) */}
                <motion.div variants={item} className="flex flex-col relative group">
                    <p className="font-accent text-2xl mb-1 ml-2 text-text-primary">you watched</p>
                    <div className="bg-[#DCD6F7] p-6 rounded-lg shadow-sm flex items-center justify-between transform transition-transform group-hover:scale-[1.02]">
                        <div className="flex items-baseline gap-2">
                            <span className="font-heading font-black text-7xl text-text-primary">{dramaCount}</span>
                            <span className="font-sans font-bold text-2xl text-text-primary">Dramas</span>
                        </div>
                        <Tv className="text-white/80 w-12 h-12" strokeWidth={1.5} />
                    </div>
                    {/* Decorative icon floating right */}
                    <div className="absolute -right-8 top-1/2 opacity-40">
                        <img src="/assets/tv-white.svg" className="w-8 h-8 rotate-12" alt="" />
                    </div>
                </motion.div>

                {/* Block 2: Episodes (Yellow) */}
                <motion.div variants={item} className="flex flex-col relative ml-8 group">
                    <p className="font-accent text-2xl mb-1 ml-2 text-text-primary">that totals</p>
                    <div className="bg-[#F4EEB1] p-6 rounded-lg shadow-sm flex items-center justify-between transform transition-transform group-hover:scale-[1.02]">
                        <div className="flex items-baseline gap-2">
                            <span className="font-heading font-black text-7xl text-text-primary">{episodeCount}</span>
                            <span className="font-sans font-bold text-2xl text-text-primary">Episodes</span>
                        </div>
                        <PlayCircle className="text-text-primary/20 w-12 h-12" strokeWidth={1.5} />
                    </div>
                </motion.div>

                {/* Block 3: Hours (Teal) */}
                <motion.div variants={item} className="flex flex-col relative mr-4 group">
                    <p className="font-accent text-2xl mb-1 ml-2 text-text-primary">and adds up to</p>
                    <div className="bg-[#BEE9E4] p-6 rounded-lg shadow-sm flex items-center justify-between transform transition-transform group-hover:scale-[1.02]">
                        <div className="flex items-baseline gap-2">
                            <span className="font-heading font-black text-7xl text-text-primary">{totalHours}</span>
                            <span className="font-sans font-bold text-2xl text-text-primary">Hours</span>
                        </div>
                        <Clock className="text-text-primary/20 w-12 h-12" strokeWidth={1.5} />
                    </div>
                </motion.div>
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

                {/* Progress Dots Placeholder */}
                <div className="flex gap-2">
                    {[...Array(7)].map((_, i) => (
                        <div key={i} className={`h-1.5 rounded-full transition-all ${i === 1 ? 'w-6 bg-accent-30' : 'w-1.5 bg-black/10'}`} />
                    ))}
                </div>

                <button onClick={onNext} className="w-12 h-12 bg-text-primary rounded-full flex items-center justify-center text-[#FFFBF5] hover:scale-105 transition-transform shadow-lg">
                    <ArrowRight size={24} />
                </button>
            </motion.div>

        </motion.div>
    );
}
