"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface Slide1IntroProps {
    onNext: () => void;
}

export default function Slide1Intro({ onNext }: Slide1IntroProps) {
    return (
        <motion.div
            className="w-full h-full flex flex-col items-center justify-center relative p-6 min-h-screen overflow-hidden text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {/* Clapperboard Asset - Decoration */}
            <motion.div
                className="absolute bottom-20 left-10 w-24 h-24 opacity-60 pointer-events-none"
                initial={{ rotate: -20, opacity: 0 }}
                animate={{ rotate: 0, opacity: 0.8 }}
                transition={{ delay: 0.5, duration: 0.8 }}
            >
                <img src="/assets/slide1-clapperboard.svg" alt="" className="w-full h-full" />
            </motion.div>

            {/* Spark Asset - Decoration */}
            <motion.div
                className="absolute top-20 right-10 w-16 h-16 opacity-60 pointer-events-none"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.8 }}
                transition={{ delay: 0.8, duration: 0.5 }}
            >
                <img src="/assets/slide1-spark.svg" alt="" className="w-full h-full" />
            </motion.div>

            <div className="relative z-10 flex flex-col items-center">
                <motion.p
                    className="font-accent text-4xl mb-2"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    Your
                </motion.p>

                {/* Layered 2025 Animation */}
                <div className="relative w-full max-w-[400px] h-[150px] flex items-center justify-center mb-4">
                    {/* Background Layer 1: Seed-30 */}
                    <motion.h1
                        className="font-heading font-black text-9xl absolute text-[#e6c8bd] select-none"
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        2025
                    </motion.h1>

                    {/* Background Layer 2: White/Off-white */}
                    <motion.h1
                        className="font-heading font-black text-9xl absolute text-[#F3EFE9] select-none z-10"
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    >
                        2025
                    </motion.h1>

                    {/* Foreground Layer: Main Text */}
                    <motion.h1
                        className="font-heading font-black text-9xl absolute text-text-primary z-20"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                    >
                        2025
                    </motion.h1>
                </div>

                <motion.h2
                    className="font-heading font-black text-4xl mt-2 tracking-tight"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    K-Drama Recap
                </motion.h2>

                <motion.button
                    onClick={onNext}
                    className="mt-16 bg-text-primary text-[#FFFBF5] px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2 hover:opacity-90 transition-opacity"
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ delay: 1.5 }}
                >
                    Continue <ArrowRight size={20} />
                </motion.button>
            </div>
        </motion.div>
    );
}
