"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { EnrichedDrama } from "@/app/actions";
import { calculateVibe, VibeType } from "@/lib/vibe-calculator";

interface Slide6VibeProps {
    dramas: EnrichedDrama[];
    onNext: () => void;
    onPrev: () => void;
}

const vibeConfig: Record<VibeType, {
    label: string;
    descriptions: string[];
    image: string;
    color: string;
    sparkleImage: string;
    vibeIcon: string;
}> = {
    wanderer: {
        label: "#wanderer",
        descriptions: [
            "You explored every genre this year. Romance, thriller, comedy, historical, you refused to be boxed in.",
            "A little bit of this, a little bit of that. Your watchlist is as diverse as a buffet plate at a wedding.",
            "Genre? What genre? You just want a good story, and you'll go anywhere, be it the past, present, or future to find it."
        ],
        image: "/assets/slide6-vibe-wanderer.svg",
        color: "var(--vibe-140)",
        sparkleImage: "/assets/slide6-sparkle-red.svg",
        vibeIcon: "/assets/slide6-icon-wave.svg"
    },
    detective: {
        label: "#detective",
        descriptions: [
            "You're addicted to plot twists. This year was all about solving cases and watching justice unfold.",
            "Trust issues? Maybe. But your deduction skills are top tier after watching these many suspects get caught.",
            "The truth is out there, and you watched 16 episodes to find it. Plot twists don't shock you anymore."
        ],
        image: "/assets/slide6-vibe-detective.svg",
        color: "var(--vibe-110)",
        sparkleImage: "/assets/slide6-sparkle-blue.svg",
        vibeIcon: "/assets/slide6-icon-scale.svg"
    },
    healing: {
        label: "#healingsoul",
        descriptions: [
            "Slow burns, daily stories, and characters healing were your comfort zone.",
            "You came for the vibes and stayed for the comfort. No stress, just soft lighting and warm hugs.",
            "While everyone else wanted drama, you chose peace. Green flags and gentle plots only."
        ],
        image: "/assets/slide6-vibe-healing.svg",
        color: "var(--vibe-20)",
        sparkleImage: "/assets/slide6-sparkle-purple.svg",
        vibeIcon: "/assets/slide6-icon-leaf.svg"
    },
    romantic: {
        label: "#hopelessromantic",
        descriptions: [
            "Your heart lives in rom-coms. You believe in fate, coincidence, and love at first sight.",
            "You're just a romantic, standing in front of a screen, asking it to give you a fictional soulmate.",
            "The back hugs, the umbrella scenes, the slow motion staring... you ate it all up. Zero regrets."
        ],
        image: "/assets/slide6-vibe-hopeless.svg",
        color: "var(--vibe-50)",
        sparkleImage: "/assets/slide6-sparkle-pink.svg",
        vibeIcon: "/assets/slide6-icon-heart.svg"
    },
    time: {
        label: "#timetraveler",
        descriptions: [
            "The past called, and you answered. Modern dramas couldn't compete.",
            "Hanboks look better than hoodies anyway. You spent more time in the Joseon era than 2025.",
            "Royal politics and forbidden love. Why live in the present when the past is this dramatic?"
        ],
        image: "/assets/slide6-vibe-traveler.svg",
        color: "var(--vibe-80)",
        sparkleImage: "/assets/slide6-sparkle-gold.svg",
        vibeIcon: "/assets/slide6-icon-hourglass.svg"
    }
};

export default function Slide6Vibe({ dramas, onNext, onPrev }: Slide6VibeProps) {
    // Calculate vibe based on user's dramas
    const currentVibeKey: VibeType = calculateVibe(dramas);
    const vibe = vibeConfig[currentVibeKey];

    // Select description variation based on stable seed (e.g., drama count)
    const seed = dramas.length + (dramas[0]?.title?.length || 0);
    const description = vibe.descriptions[seed % vibe.descriptions.length];

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
            className="w-full h-full flex flex-col items-center justify-start relative px-6 pt-16 min-h-screen bg-bg-primary overflow-hidden"
            variants={container}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0 }}
        >
            {/* Decorative Top Title */}
            <motion.div variants={itemVariant} className="mb-8 text-center relative">
                <div className="absolute -top-[-2%] -left-10 rotate-[85deg]">
                    <img src={vibe.sparkleImage} className="w-5 h-5" alt="" />
                </div>
                <div className="absolute -bottom-[2%] -right-8 rotate-[-65deg]">
                    <img src={vibe.sparkleImage} className="w-5 h-5" alt="" />
                </div>
                <h1 className="font-accent text-6xl text-text-primary">Your Vibe <br /> </h1>
            </motion.div>

            {/* Vibe Image */}
            <motion.div
                variants={itemVariant}
                className="w-48 h-48 flex items-center justify-center m-6"
            >
                <img src={vibe.image} alt={vibe.label} className="w-full h-full object-contain" />
            </motion.div>

            {/* Vibe Text */}
            <motion.div variants={itemVariant} className="max-w-md text-center">
                <p className="font-accent text-4xl mb-6" style={{ color: vibe.color }}>{vibe.label}</p>

                <h2 className="font-heading font-black text-4xl text-text-primary leading-tight tracking-tight text-left relative inline-block">
                    {description}
                    {/* Vibe Icon */}
                    <motion.div
                        variants={itemVariant}
                        className="absolute -top-6 -right-0 w-8 h-8 rotate-[20deg]"
                    >
                        <motion.img
                            src={vibe.vibeIcon}
                            alt={vibe.label}
                            className="w-full h-full object-contain"
                            animate={{
                                rotate: [-5, 5, -5],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    </motion.div>
                </h2>
            </motion.div>


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
                        <div key={i} className={`h-1.5 rounded-full transition-all ${i === 5 ? 'w-6 bg-accent-30' : 'w-1.5 bg-black/10'}`} />
                    ))}
                </div>

                <button onClick={onNext} className="w-18 h-14 bg-text-primary rounded-full flex items-center justify-center text-bg-primary hover:scale-105 transition-transform shadow-md">
                    <ArrowRight size={24} />
                </button>
            </motion.div>
        </motion.div>
    );
}
