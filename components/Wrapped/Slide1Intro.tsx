"use client";

import { motion } from "framer-motion";

interface Slide1IntroProps {
    onNext: () => void;
}

export default function Slide1Intro({ onNext }: Slide1IntroProps) {
    return (
        <div className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden no-scrollbar text-center">
            {/* Clapperboard Asset - Decoration */}
            <motion.div
                className="absolute bottom-[37%] left-[32%] w-8 h-8 pointer-events-none"
                initial={{ rotate: -30, opacity: 0 }}
                animate={{ rotate: -4, opacity: 0.8 }}
                transition={{ delay: 0.8, duration: 0.8 }}
            >
                <img src="/assets/slide1-clapperboard.svg" alt="" className="w-full h-full" />
            </motion.div>

            {/* Spark Asset - Decoration */}
            <motion.div
                className="absolute top-20 right-10 w-8 h-8 opacity-60 pointer-events-none"
                initial={{ scale: 0, opacity: 0, rotate: 0 }}
                animate={{ scale: 1, opacity: 0.8, rotate: 360 }}
                transition={{
                    scale: { delay: 0.8, duration: 0.5 },
                    opacity: { delay: 0.8, duration: 0.5 },
                    rotate: { duration: 10, repeat: Infinity, ease: "linear" }
                }}
            >
                <img src="/assets/slide1-spark.svg" alt="" className="w-full h-full" />
            </motion.div>


            {/* Spark Asset - Decoration */}
            <motion.div
                className="absolute bottom-[10%] left-[10%] w-8 h-8 opacity-60 pointer-events-none"
                initial={{ scale: 0, opacity: 0, rotate: 0 }}
                animate={{ scale: 1, opacity: 0.8, rotate: 360 }}
                transition={{
                    scale: { delay: 0.8, duration: 0.5 },
                    opacity: { delay: 0.8, duration: 0.5 },
                    rotate: { duration: 10, repeat: Infinity, ease: "linear" }
                }}
            >
                <img src="/assets/slide1-spark.svg" alt="" className="w-full h-full" />
            </motion.div>

            <div className="relative z-10 flex flex-col items-center">
                <motion.p
                    className="font-accent text-5xl"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    Your
                </motion.p>

                {/* Layered 2025 Animation */}
                <div className="relative w-full h-[144px] flex items-center justify-center">
                    {/* Background Layer 1: Vibe-90 Slide In From Left */}
                    <motion.h1
                        className="font-heading font-black text-[120px] md:text-[188px] absolute text-vibe-90 mix-blend-soft-light select-none"
                        initial={{ x: -400, rotate: -45, opacity: 0 }}
                        animate={{ x: 0, rotate: 0, opacity: 1 }}
                        transition={{ duration: 1.2, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                    >
                        2025
                    </motion.h1>

                    {/* Background Layer 2: Seed-30 Slide In From Right */}
                    <motion.h1
                        className="font-heading font-black text-[120px] md:text-[172px] absolute text-seed-30 mix-blend-multiply select-none z-10"
                        initial={{ x: 400, rotate: 45, opacity: 0 }}
                        animate={{ x: 0, rotate: 0, opacity: 1 }}
                        transition={{ duration: 1.2, delay: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                    >
                        2025
                    </motion.h1>

                    {/* Foreground Layer: Main Text Spring Pop */}
                    <motion.h1
                        className="font-heading font-black text-[120px] md:text-[144px] absolute text-text-primary z-20"
                        initial={{ opacity: 0, scale: 0.3, rotate: -10 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{
                            duration: 0.8,
                            delay: 1.1,
                            ease: [0.34, 1.56, 0.64, 1],
                            scale: {
                                type: "spring",
                                damping: 8,
                                stiffness: 100
                            }
                        }}
                    >
                        2025
                    </motion.h1>
                </div>

                <motion.h2
                    className="font-heading font-black text-4xl tracking-tight"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    K-Drama Wrapped
                </motion.h2>

                <motion.button
                    onClick={onNext}
                    className="mt-10 bg-text-primary text-bg-primary px-10 py-4 rounded-full font-bold text-lg flex items-center hover:opacity-90 transition-opacity"
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ delay: 1.5 }}
                >
                    View
                </motion.button>
            </div>
        </div>
    );
}
