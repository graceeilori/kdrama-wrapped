"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Footprints, Search, Flower2, Heart, Fan, Sparkles, Scale } from "lucide-react";

interface Slide6VibeProps {
    onNext: () => void;
    onPrev: () => void;
}

type VibeType = "wanderer" | "detective" | "healing" | "romantic" | "time";

// Mock Logic to select a vibe (random for now until we have stats)
const getVibe = (): VibeType => {
    const vibes: VibeType[] = ["wanderer", "detective", "healing", "romantic", "time"];
    return vibes[Math.floor(Math.random() * vibes.length)];
};

const vibeConfig: Record<VibeType, {
    label: string;
    description: string;
    color: string;
    bg: string;
    icon: React.ElementType;
    subIcon?: React.ElementType;
}> = {
    wanderer: {
        label: "#wanderer",
        description: "You explored every genre this year. Romance, thriller, comedy, historical, you refused to be boxed in.",
        color: "#E7A8A8", // Muted Coral
        bg: "bg-[#E7A8A8]/20",
        icon: Footprints,
        subIcon: Sparkles
    },
    detective: {
        label: "#detective",
        description: "You're addicted to plot twists. This year was all about solving cases and watching justice unfold.",
        color: "#A8BBE7", // Periwinkle
        bg: "bg-[#A8BBE7]/20",
        icon: Search,
        subIcon: Scale
    },
    healing: {
        label: "#healingsoul",
        description: "Slow burns, daily stories, and characters healing were your comfort zone.",
        color: "#BEE9E4", // Teal-ish
        bg: "bg-[#BEE9E4]/30",
        icon: Flower2
    },
    romantic: {
        label: "#hopelessromantic",
        description: "Your heart lives in rom-coms. You believe in fate, coincidence, and love at first sight.",
        color: "#F4C2C2", // Pastel Pink
        bg: "bg-[#F4C2C2]/20",
        icon: Heart,
        subIcon: Heart // Use Heart again for subIcon
    },
    time: {
        label: "#timetraveler",
        description: "The past called, and you answered. Modern dramas couldn't compete.",
        color: "#E7A77B", // Terracotta
        bg: "bg-[#E7A77B]/20",
        icon: Fan
    }
};

export default function Slide6Vibe({ onNext, onPrev }: Slide6VibeProps) {
    // Determine vibe (Static for demo, normally passed as prop)
    const currentVibeKey: VibeType = "romantic"; // Force one for consistent review, or use getVibe()
    const vibe = vibeConfig[currentVibeKey];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
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
                <img src="/assets/star-sec10.svg" className="absolute -top-2 left-0 w-6 h-6 rotate-[-15deg] text-accent-30" alt="" />
                <img src="/assets/landing-sparkle.svg" className="absolute top-2 right-0 w-5 h-5 opacity-60" alt="" />

                <h1 className="font-accent text-6xl text-text-primary">Your Vibe</h1>
            </motion.div>

            {/* Vibe Card */}
            <motion.div
                variants={itemVariant}
                className={`w-64 h-64 rounded-2xl flex items-center justify-center mb-6 shadow-sm ${vibe.bg}`}
            >
                {/* Specific Icon Styling */}
                {currentVibeKey === 'romantic' ? (
                    <div className="relative">
                        <Heart className="w-32 h-32 text-[#F4C2C2]" strokeWidth={1.5} />
                        <Heart className="w-20 h-20 text-[#F4C2C2] absolute bottom-0 right-[-10px] fill-[#F4C2C2]/20" strokeWidth={1.5} />
                    </div>
                ) : (
                    <vibe.icon className="w-32 h-32 opacity-80" style={{ color: vibe.color }} strokeWidth={1.5} />
                )}
            </motion.div>

            {/* Vibe Text */}
            <motion.div variants={itemVariant} className="max-w-md text-center">
                <p className="font-accent text-3xl mb-6" style={{ color: vibe.color }}>{vibe.label}</p>

                <h2 className="font-heading font-black text-4xl text-text-primary leading-tight tracking-tight relative inline-block">
                    {vibe.description}
                    {vibe.subIcon && (
                        <vibe.subIcon className="inline-block ml-2 w-8 h-8 opacity-40 align-bottom" style={{ color: vibe.color }} />
                    )}
                </h2>
            </motion.div>


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
                        <div key={i} className={`h-1.5 rounded-full transition-all ${i === 5 ? 'w-6 bg-accent-30' : 'w-1.5 bg-black/10'}`} />
                    ))}
                </div>

                <button onClick={onNext} className="w-12 h-12 bg-text-primary rounded-full flex items-center justify-center text-[#FFFBF5] hover:scale-105 transition-transform shadow-lg">
                    <ArrowRight size={24} />
                </button>
            </motion.div>
        </motion.div>
    );
}
