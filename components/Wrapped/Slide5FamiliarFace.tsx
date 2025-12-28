"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";

interface Slide5FamiliarFaceProps {
    onNext: () => void;
    onPrev: () => void;
}

// Mock Data for "Familiar Face"
// In the future this will come from analyzing the Cast list of input dramas
const familiarFace = {
    name: "Nam Kee Ae",
    count: 3,
    image: "/assets/nam-kee-ae-placeholder.jpg", // We'll need a placeholder or use a real URL if we had one. using a color div for now if image missing.
    dramas: [
        { title: "Dynamite Kiss", color: "bg-[#F4C2C2]" }, // Pink
        { title: "Moon River", color: "bg-[#A8BBE7]" }, // Blue
        { title: "The First Night with the Duke", color: "bg-[#DCD6F7]" } // Purple
    ]
};

export default function Slide5FamiliarFace({ onNext, onPrev }: Slide5FamiliarFaceProps) {
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
            {/* Title Section */}
            <motion.div variants={itemVariant} className="mb-8 text-center relative z-10">
                {/* Decorative elements based on image */}
                <div className="absolute -top-4 -left-6 text-accent-30">
                    <span className="text-3xl">〰️</span>
                </div>
                <div className="absolute top-8 right-[-20px] text-accent-30 opacity-60">
                    <span className="text-2xl">✨</span>
                </div>

                <h1 className="font-accent text-5xl text-text-primary mb-2">A Familiar</h1>
                <div className="flex items-center justify-center gap-2">
                    <span className="text-3xl text-[#F4C2C2]">🌀</span> {/* Swirl placeholder */}
                    <h1 className="font-accent text-6xl text-text-primary">Face</h1>
                </div>
            </motion.div>

            {/* Actor Image */}
            <motion.div
                variants={itemVariant}
                className="relative w-48 h-48 mb-6"
            >
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#E5E0D8] shadow-lg relative bg-gray-300">
                    {/* Placeholder for Actor Image - Using a real image URL from TMDB if we had it, or a placeholder */}
                    {/* Since I don't have the specific image file, I'll use a placeholder logic or external if allowed. Use a gray div with text for now. */}
                    <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-500 font-bold">
                        Actor Photo
                    </div>
                    {/* <Image src={familiarFace.image} alt={familiarFace.name} fill className="object-cover" /> */}
                </div>
            </motion.div>

            {/* Actor Stats */}
            <motion.div variants={itemVariant} className="text-center mb-8">
                <h2 className="font-heading font-black text-3xl text-text-primary mb-2">{familiarFace.name}</h2>
                <p className="font-accent text-xl text-text-primary opacity-80 mb-1">you saw them</p>
                <p className="font-heading font-black text-2xl text-text-primary mb-1">{familiarFace.count} times</p>
                <p className="font-accent text-xl text-text-primary opacity-80">in:</p>
            </motion.div>

            {/* Drama List (Pills) */}
            <motion.div variants={itemVariant} className="flex flex-col gap-3 w-full max-w-xs items-center">
                {familiarFace.dramas.map((drama, i) => (
                    <motion.div
                        key={i}
                        className={`${drama.color} px-6 py-3 rounded-full shadow-sm w-full text-center transform transition-transform hover:scale-105 hover:-rotate-1`}
                        initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + (i * 0.1) }}
                    >
                        <span className="font-bold text-text-primary text-sm md:text-base whitespace-nowrap">{drama.title}</span>
                    </motion.div>
                ))}
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
                        <div key={i} className={`h-1.5 rounded-full transition-all ${i === 4 ? 'w-6 bg-accent-30' : 'w-1.5 bg-black/10'}`} />
                    ))}
                </div>

                <button onClick={onNext} className="w-12 h-12 bg-text-primary rounded-full flex items-center justify-center text-[#FFFBF5] hover:scale-105 transition-transform shadow-lg">
                    <ArrowRight size={24} />
                </button>
            </motion.div>
        </motion.div>
    );
}
