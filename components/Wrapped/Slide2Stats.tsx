"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
            className="w-full h-full flex flex-col items-center justify-between relative px-6 py-6 bg-bg-primary overflow-hidden"
            variants={container}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0 }}
        >
            <div className="flex-1 w-full flex flex-col items-center justify-center w-full max-w-md">
                {/* Decorative Top Title */}
                <motion.div variants={item} className="mb-8 text-center relative shrink-0">
                    <div className="absolute -top-[1%] -right-6 opacity-70 -rotate-12">
                        <img src="/assets/slide2-celebrate.svg" className="w-6 h-6" alt="" />
                    </div>

                    <h1 className="font-accent text-5xl md:text-6xl text-text-primary mt-4">This Year... <br /> </h1>

                    <div className="absolute -bottom-6 -left-4 opacity-70 rotate-12">
                        <img src="/assets/slide2-celebrate.svg" className="w-5 h-5" alt="" />
                    </div>
                </motion.div>


                <div className="w-full flex flex-col gap-6 shrink-0">
                    {/* Block 1: Dramas (Purple) */}
                    <motion.div variants={item} className="flex flex-col relative">
                        <p className="font-accent text-3xl mb-1 ml-2 text-text-primary">you watched</p>
                        <motion.div className="flex flex-row items-center relative gap-4">
                            <motion.div
                                className="bg-secondary-10 px-6 py-2 shadow-sm shadow-secondary-20/50 flex items-center justify-between w-fit"
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <div className="flex items-center gap-2">
                                    <span className="font-heading font-black text-6xl md:text-8xl text-text-primary">{dramaCount}</span>
                                    <span className="font-sans font-semibold text-3xl text-text-primary">Dramas</span>
                                </div>
                            </motion.div>
                            {/* Decorative icon */}
                            <motion.div
                                className="relative"
                                animate={{ rotate: [-10, 10, -10] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <img src="/assets/slide2-tv.svg" className="w-14 h-14" alt="" />
                            </motion.div>
                        </motion.div>
                    </motion.div>


                    {/* Block 2: Episodes (Gold) */}
                    <motion.div variants={item} className="flex flex-row relative items-center justify-end">
                        <motion.div className="flex flex-col relative ml-8">
                            <p className="font-accent text-3xl mb-1 ml-2 text-text-primary w-full text-left px-12">that totals</p>
                            <motion.div className="flex flex-row relative items-center gap-4">
                                {/* Decorative icon */}
                                <motion.div
                                    className="relative"
                                    animate={{ rotate: [-10, 10, -10] }}
                                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <img src="/assets/slide2-play.svg" className="w-14 h-14" alt="" />
                                </motion.div>
                                <motion.div
                                    className="bg-stat-40 px-6 py-2 shadow-sm shadow-stat-40/50 flex items-center justify-between w-fit"
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="font-heading font-black text-6xl md:text-8xl text-text-primary">{episodeCount}</span>
                                        <span className="font-sans font-semibold text-3xl text-text-primary">Episodes</span>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Block 3: Hours (Teal) */}
                    <motion.div variants={item} className="flex flex-col relative">
                        <p className="font-accent text-3xl mb-1 ml-2 text-text-primary">and adds up to</p>
                        <motion.div className="flex flex-row items-center relative gap-4">
                            <motion.div
                                className="bg-stat-30 px-6 py-2 shadow-sm shadow-stat-30/50 flex items-center justify-between w-fit"
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <div className="flex items-center gap-2">
                                    <span className="font-heading font-black text-6xl md:text-8xl text-text-primary">{totalHours}</span>
                                    <span className="font-sans font-semibold text-3xl text-text-primary">Hours</span>
                                </div>
                            </motion.div>
                            {/* Decorative icon */}
                            <motion.div
                                className="relative"
                                animate={{ rotate: [-10, 10, -10] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <img src="/assets/slide2-clock.svg" className="w-14 h-14" alt="" />
                            </motion.div>
                        </motion.div>
                    </motion.div>
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

                {/* Progress Dots Placeholder */}
                <div className="flex gap-2">
                    {[...Array(7)].map((_, i) => (
                        <div key={i} className={`h-1.5 rounded-full transition-all ${i === 1 ? 'w-6 bg-accent-30' : 'w-1.5 bg-black/10'}`} />
                    ))}
                </div>

                <button onClick={onNext} className="w-18 h-14 bg-text-primary rounded-full flex items-center justify-center text-bg-primary hover:scale-105 transition-transform shadow-md">
                    <ArrowRight size={24} />
                </button>
            </motion.div>

        </motion.div>
    );
}
