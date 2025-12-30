"use client";

import { useMemo } from "react";
import { EnrichedDrama } from "@/app/actions";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Slide5FamiliarFaceProps {
    dramas: EnrichedDrama[];
    onNext: () => void;
    onPrev: () => void;
}

// Helper to determine pill color based on random or index?
const PILL_COLORS = [
    "bg-seed-10",
    "bg-seed-20",
    "bg-seed-30",
    "bg-seed-40",
    "bg-seed-50"
];

const ROTATIONS = [
    "rotate-2", "-rotate-3", "rotate-6", "-rotate-2", "rotate-3", "-rotate-6", "rotate-1"
];

export default function Slide5FamiliarFace({ dramas, onNext, onPrev }: Slide5FamiliarFaceProps) {
    const familiarFace = useMemo(() => {
        const actorCounts: Record<number, { name: string; profilePath: string | null; count: number; dramas: { title: string; color: string; rotation: string }[] }> = {};

        dramas.forEach((drama, dIndex) => {
            if (!drama.cast) return;

            // Deduplicate actors per drama to avoid double counting if API returns duplicates
            const seenActors = new Set<number>();

            drama.cast.forEach(actor => {
                if (seenActors.has(actor.id)) return;
                seenActors.add(actor.id);

                if (!actorCounts[actor.id]) {
                    actorCounts[actor.id] = {
                        name: actor.name,
                        profilePath: actor.profilePath,
                        count: 0,
                        dramas: []
                    };
                }

                actorCounts[actor.id].count += 1;
                actorCounts[actor.id].dramas.push({
                    title: drama.title || "Unknown",
                    color: PILL_COLORS[dIndex % PILL_COLORS.length],
                    rotation: ROTATIONS[dIndex % ROTATIONS.length]
                });
            });
        });

        // Find max
        let maxActor: any = null;
        Object.values(actorCounts).forEach(actor => {
            if (!maxActor || actor.count > maxActor.count) {
                maxActor = actor;
            }
        });

        if (!maxActor) {
            return {
                name: "Unknown Actor",
                count: 0,
                image: null,
                dramas: [],
                remainingCount: 0
            };
        }

        const displayedDramas = maxActor.dramas.slice(0, 5);
        const remainingCount = Math.max(0, maxActor.dramas.length - 5);

        return {
            name: maxActor.name,
            count: maxActor.count,
            image: maxActor.profilePath,
            dramas: displayedDramas,
            remainingCount
        };
    }, [dramas]);

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

    const pillVariant = {
        hidden: { y: -50, opacity: 0 },
        show: {
            y: 0,
            opacity: 1,
            transition: { type: "spring" as const, stiffness: 120, damping: 12 }
        }
    };

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
                    <div className="absolute -top-[2%] -left-8 transform rotate-[-72deg]">
                        <img src="/assets/slide5-wave.svg" className="w-8 h-8" alt="" />
                    </div>
                    <div className="absolute -bottom-[2%] -right-0 transform rotate-[-72deg]">
                        <img src="/assets/slide5-wave.svg" className="w-7 h-7" alt="" />
                    </div>
                    <h1 className="font-accent text-6xl text-text-primary">A familiar <br /> Face </h1>

                    <div className="absolute -bottom-1 -left-1">
                        <img src="/assets/spiral-p30.svg" className="w-12 h-12" alt="" />
                    </div>
                </motion.div>

                {/* Actor Image */}
                <motion.div
                    variants={itemVariant}
                    className="relative w-40 h-40 mb-4 shrink-0 aspect-square"
                >
                    <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#E5E0D8] shadow-md relative bg-gray-300">
                        {familiarFace.image ? (
                            <img
                                src={familiarFace.image}
                                alt={familiarFace.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-500 font-bold text-center p-2">
                                {familiarFace.name}
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Actor Stats */}
                <motion.div variants={itemVariant} className="text-center mb-2">
                    <h2 className="font-heading font-black text-3xl text-text-primary mb-3">{familiarFace.name}</h2>
                    <p className="font-accent text-3xl text-text-primary mb-2">you saw them</p>
                    <p className="font-heading font-black text-2xl text-text-primary mb-1">{familiarFace.count} times</p>
                    <p className="font-accent text-3xl text-text-primary">in:</p>
                </motion.div>

                {/* Drama List (Falling Pills Grid) */}
                <motion.div className="flex flex-wrap justify-center items-start gap-1 w-full max-w-xl">
                    {/* Pill 1 */}
                    {familiarFace.dramas[0] && (
                        <motion.div
                            variants={pillVariant}
                            className={`bg-seed-10 ${familiarFace.dramas[0].rotation} px-6 py-3 rounded-full flex items-center justify-center transform transition-transform hover:scale-110 hover:rotate-0 hover:z-10 relative`}
                        >
                            <span className="font-sans font-medium text-text-primary text-md whitespace-nowrap">{familiarFace.dramas[0].title}</span>
                        </motion.div>
                    )}

                    {/* Pill 2 */}
                    {familiarFace.dramas[1] && (
                        <motion.div
                            variants={pillVariant}
                            className={`bg-seed-20 ${familiarFace.dramas[1].rotation} px-6 py-3 rounded-full flex items-center justify-center transform transition-transform hover:scale-110 hover:rotate-0 hover:z-10 relative`}
                        >
                            <span className="font-sans font-medium text-text-primary text-md whitespace-nowrap">{familiarFace.dramas[1].title}</span>
                        </motion.div>
                    )}

                    {/* Pill 3 */}
                    {familiarFace.dramas[2] && (
                        <motion.div
                            variants={pillVariant}
                            className={`bg-seed-30 ${familiarFace.dramas[2].rotation} px-6 py-3 rounded-full flex items-center justify-center transform transition-transform hover:scale-110 hover:rotate-0 hover:z-10 relative`}
                        >
                            <span className="font-sans font-medium text-text-primary text-md whitespace-nowrap">{familiarFace.dramas[2].title}</span>
                        </motion.div>
                    )}

                    {/* Pill 4 */}
                    {familiarFace.dramas[3] && (
                        <motion.div
                            variants={pillVariant}
                            className={`bg-seed-40 ${familiarFace.dramas[3].rotation} px-6 py-3 rounded-full flex items-center justify-center transform transition-transform hover:scale-110 hover:rotate-0 hover:z-10 relative`}
                        >
                            <span className="font-sans font-medium text-text-primary text-md whitespace-nowrap">{familiarFace.dramas[3].title}</span>
                        </motion.div>
                    )}

                    {/* Pill 5 */}
                    {familiarFace.dramas[4] && (
                        <motion.div
                            variants={pillVariant}
                            className={`bg-seed-50 ${familiarFace.dramas[4].rotation} px-6 py-3 rounded-full flex items-center justify-center transform transition-transform hover:scale-110 hover:rotate-0 hover:z-10 relative`}
                        >
                            <span className="font-sans font-medium text-text-primary text-md whitespace-nowrap">{familiarFace.dramas[4].title}</span>
                        </motion.div>
                    )}

                    {/* Overflow Text */}
                    {familiarFace.remainingCount > 0 && (
                        <motion.div
                            variants={pillVariant}
                            className="flex items-center justify-center px-2 py-1 w-full"
                        >
                            <span className="font-handwriting text-sm text-text-primary opacity-60">
                                ...and {familiarFace.remainingCount} more
                            </span>
                        </motion.div>
                    )}
                </motion.div>
            </div>

            {/* Navigation Footer */}
            <motion.div
                className="relative shrink-0 w-full max-w-lg pt-4 flex items-center justify-between"
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

                <button onClick={onNext} className="w-18 h-14 bg-text-primary rounded-full flex items-center justify-center text-bg-primary hover:scale-105 transition-transform shadow-md">
                    <ArrowRight size={24} />
                </button>
            </motion.div>
        </motion.div>
    );
}
