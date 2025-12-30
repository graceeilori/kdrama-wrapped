"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { EnrichedDrama } from "@/app/actions";
import { Download, RotateCcw, Coffee, Image as ImageIcon } from "lucide-react";
import html2canvas from "html2canvas";
import SummaryCard from "./SummaryCard";

interface Slide7SummaryProps {
    dramas: EnrichedDrama[];
    topDramas: EnrichedDrama[];
    stats: {
        dramaCount: number;
        episodeCount: number;
        totalHours: number;
    };
    vibe: any; // Type comes from lib/vibe-calculator but we can infer or import it if needed. Using any/string to be safe or import VibeType
    topGenres: string[];
    onPrev: () => void;
    onReplay: () => void;
}

export default function Slide7Summary({ dramas, topDramas, stats, vibe, topGenres, onPrev, onReplay }: Slide7SummaryProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);

    // Auto-generate on mount (optional, or wait for user)
    // Let's auto-generate for a smooth "it's ready" experience
    useEffect(() => {
        const timer = setTimeout(() => {
            handleGenerate();
        }, 1000); // Short delay to ensure standard fonts load? formatting
        return () => clearTimeout(timer);
    }, []);

    const handleGenerate = async () => {
        if (!cardRef.current || isGenerating) return; // Prevent double trigger
        setIsGenerating(true);
        try {
            // Wait for images to render
            await new Promise(resolve => setTimeout(resolve, 1000));

            const canvas = await html2canvas(cardRef.current, {
                scale: 1, // Card is already 1080x1920 (HD)
                backgroundColor: "#FFFBF5",
                useCORS: true,
                allowTaint: true,
                logging: true,
                width: 1080,
                height: 1920,
                scrollX: 0,
                scrollY: 0,
                x: 0,
                y: 0,
            });
            const image = canvas.toDataURL("image/png");
            setGeneratedImage(image);
        } catch (err: any) {
            console.error("Generation failed", err);
            alert(`Generation failed: ${err?.message || err}`);
        } finally {
            setIsGenerating(false);
        }
    };

    const downloadImage = () => {
        if (!generatedImage) return;
        const link = document.createElement("a");
        link.href = generatedImage;
        link.download = "my-kdrama-wrapped-2025.png";
        link.click();
    };

    return (
        <motion.div
            className="w-full h-full flex flex-col items-center justify-center relative p-4 min-h-screen bg-[#FFFBF5] overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <div className="w-full max-w-sm flex flex-col items-center gap-6 mt-10 mb-24">

                {/* Header */}
                <div className="flex items-center justify-between w-full">
                    <div className="font-accent text-4xl text-text-primary">K</div>
                    <div className="font-accent text-3xl text-text-primary text-center">
                        {generatedImage ? "Ready to Share!" : "Creating Summary..."}
                        {!generatedImage && <span className="animate-pulse ml-1">✨</span>}
                    </div>
                    <div className="w-8"></div>
                </div>

                {/* THE CARD AREA */}
                <div className="w-full relative flex justify-center items-center min-h-[400px]">

                    {/* Hidden Capture Target (Off-screen) */}
                    <div className="fixed left-[200vw] top-0 pointer-events-none">
                        <SummaryCard
                            ref={cardRef}
                            dramas={dramas}
                            topDramas={topDramas}
                            stats={stats}
                            vibeKey={vibe}
                            topGenres={topGenres}
                        />
                    </div>

                    {/* Preview Area */}
                    {!generatedImage ? (
                        <div className="flex flex-col items-center justify-center h-96 w-full bg-white/50 rounded-xl border-2 border-dashed border-text-primary/20">
                            <span className="animate-spin text-4xl mb-4">⏳</span>
                            <p className="font-accent text-xl opacity-60">Wrapping up your year...</p>
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative shadow-2xl rounded-xl overflow-hidden border-4 border-text-primary w-full"
                        >
                            <img src={generatedImage} alt="Wrapped Summary" className="w-full h-auto" />
                        </motion.div>
                    )}
                </div>

                {/* Main Actions */}
                <div className="flex flex-col w-full gap-3">
                    {generatedImage && (
                        <>
                            <button
                                onClick={downloadImage}
                                className="w-full bg-text-primary text-[#FFFBF5] py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg"
                            >
                                <Download size={20} /> Save Image
                            </button>
                            <p className="text-center text-sm opacity-60 font-medium">Long press image to save on mobile</p>
                        </>
                    )}
                </div>

                {/* Secondary Actions */}
                <div className="w-full grid grid-cols-2 gap-4">
                    <button onClick={onReplay} className="flex items-center justify-center gap-2 text-text-primary font-medium hover:underline py-3">
                        <RotateCcw size={16} /> Replay
                    </button>
                    <a href="https://www.buymeacoffee.com/graceilori" target="_blank" rel="noopener noreferrer" className="bg-[#FFE5E5] text-text-primary py-3 rounded-xl flex items-center justify-center gap-2 font-medium hover:bg-[#FFD1D1] transition-colors">
                        <Coffee size={18} /> Buy me coffee
                    </a>
                </div>

            </div>
        </motion.div>
    );
}
