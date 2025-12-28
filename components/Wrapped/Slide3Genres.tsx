"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Slide3GenresProps {
    onNext: () => void;
    onPrev: () => void;
}

// Placeholder Genre Data
const genres = [
    { name: "Romance", percent: 55, color: "#F4C2C2", tailwindBg: "bg-[#F4C2C2]" }, // Pastel Pink
    { name: "Slice of Life", percent: 25, color: "#E7A8A8", tailwindBg: "bg-[#E7A8A8]" }, // Muted Coral
    { name: "Comedy", percent: 10, color: "#A8BBE7", tailwindBg: "bg-[#A8BBE7]" }, // Periwinkle
    { name: "Thriller", percent: 7, color: "#8CD4D8", tailwindBg: "bg-[#8CD4D8]" }, // Teal
    { name: "Saeguk", percent: 3, color: "#E7A77B", tailwindBg: "bg-[#E7A77B]" }, // Terracotta
];

export default function Slide3Genres({ onNext, onPrev }: Slide3GenresProps) {
    // Calculate Conic Gradient for Pie Chart
    let accumulatedPercent = 0;
    const gradientStops = genres.map(g => {
        const start = accumulatedPercent;
        accumulatedPercent += g.percent;
        return `${g.color} ${start}% ${accumulatedPercent}%`;
    }).join(", ");

    const conicGradient = `conic-gradient(${gradientStops})`;

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariant = {
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
            {/* Title */}
            <motion.div variants={itemVariant} className="mb-10 text-center relative z-10">
                {/* Decorative Stars */}
                <img src="/assets/star-sec10.svg" className="absolute -top-4 -left-12 w-8 h-8 opacity-70 rotate-[-15deg]" alt="" />
                <img src="/assets/landing-sparkle.svg" className="absolute -bottom-2 -right-10 w-6 h-6 opacity-60" alt="" />

                <h1 className="font-accent text-5xl text-text-primary mb-2">Your Top</h1>
                <h2 className="font-accent text-6xl text-text-primary">Genres</h2>
            </motion.div>

            {/* Pie Chart */}
            <motion.div
                className="relative w-64 h-64 rounded-full border-2 border-text-primary mb-12 shadow-inner"
                style={{ background: conicGradient }}
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
            >
                {/* Inner White Circle (Donut hole optional, keeping full pie for now based on sketch) */}
                {/* <div className="absolute inset-0 m-auto w-16 h-16 bg-[#FFFBF5] rounded-full" /> */}

                {/* Optional: 'Others' label logic could go here if implemented specifically */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[10px] font-sans text-text-primary/70 rotate-[15deg]">

                </div>
            </motion.div>

            {/* Legend List */}
            <div className="w-full max-w-xs flex flex-col gap-4">
                {genres.map((g, i) => (
                    <motion.div
                        key={g.name}
                        variants={itemVariant}
                        className="flex items-center justify-between"
                    >
                        <div className="flex items-center gap-3">
                            <span className="font-heading font-black text-3xl text-text-primary w-6">{i + 1}.</span>
                            <span className="font-heading font-bold text-2xl text-text-primary">{g.name}</span>
                        </div>
                        <div className={`${g.tailwindBg} px-3 py-1 rounded-full border border-text-primary/10 shadow-sm min-w-[60px] text-center`}>
                            <span className="font-accent text-lg text-text-primary">{g.percent}%</span>
                        </div>
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
                        <div key={i} className={`h-1.5 rounded-full transition-all ${i === 3 ? 'w-6 bg-accent-30' : 'w-1.5 bg-black/10'}`} />
                    ))}
                </div>

                <button onClick={onNext} className="w-12 h-12 bg-text-primary rounded-full flex items-center justify-center text-[#FFFBF5] hover:scale-105 transition-transform shadow-lg">
                    <ArrowRight size={24} />
                </button>
            </motion.div>
        </motion.div>
    );
}
