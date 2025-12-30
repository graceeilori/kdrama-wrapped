"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { EnrichedDrama } from "@/app/actions";
import { Download, RotateCcw, Coffee, Image as ImageIcon } from "lucide-react";
import html2canvas from "html2canvas";
import SummaryCard from "./SummaryCard";
import { LoadingScreen } from "@/components/InputFlow";
import Link from "next/link";

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
            await document.fonts.ready; // Ensure fonts are loaded
            // Wait for images to render
            await new Promise(resolve => setTimeout(resolve, 3000));

            const canvas = await html2canvas(cardRef.current, {
                scale: 1, // Card is already 1080x1920 (HD)
                backgroundColor: "#FFFBF5",
                useCORS: true,
                allowTaint: true,
                logging: true,
                width: 1080,
                height: 1920,
                windowWidth: 1080, // Force desktop viewport simulation
                windowHeight: 1920,
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
            <div className="w-full max-w-sm flex flex-col items-center gap-2 mt-1 mb-12">


                {/* Header */}
                <div className="flex flex-col items-center justify-center w-full gap-1">
                    <Link href="/" className="font-heading font-black text-left w-full text-4xl text-text-primary hover:opacity-70 transition-opacity no-underline">
                        K
                    </Link>
                    <div className="font-accent text-3xl text-text-primary text-center">
                        {generatedImage ? "Ready to Share!" : "Your Summary..."}
                    </div>
                </div>

                {/* THE CARD AREA */}
                <div className="w-full relative flex justify-center items-center">

                    {/* Hidden Capture Target (Behind content, correct viewport) */}
                    <div style={{ position: "absolute", top: 0, left: 0, width: "1080px", height: "1920px", zIndex: -50, opacity: 0, pointerEvents: "none" }}>
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
                        <div className="flex flex-col items-center justify-center h-72 w-full">
                            <LoadingScreen step={0} customSteps={["Wrapping up your year..."]} />
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 0.9 }}
                            className="relative shadow-md rounded-xl overflow-hidden border-2 border-text-primary w-[85%]"
                        >
                            <img src={generatedImage} alt="Wrapped Summary" className="w-full h-auto object-contain" />
                        </motion.div>
                    )}
                </div>

                {/* Main Actions */}
                <div className="flex flex-col w-full gap-2 px-4">
                    {generatedImage && (
                        <>
                            <button
                                onClick={downloadImage}
                                className="w-full bg-text-primary text-[#FFFBF5] py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-sm"
                            >
                                <Download size={20} /> Save Image
                            </button>
                        </>
                    )}
                </div>

                {/* Secondary Actions */}
                <div className="w-full grid grid-cols-2 gap-4 px-4 py-4">
                    <button onClick={onReplay} className="flex items-center justify-center gap-2 bg-[#FFFFFF] rounded-full text-text-primary font-medium hover:underline py-3">
                        <RotateCcw size={16} /> Replay
                    </button>
                    <a href="https://ko-fi.com/kdramawrapped" target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#FFE5E5] text-text-primary py-3 flex items-center justify-center gap-2 font-medium hover:bg-[#FFD1D1] transition-colors">
                        <Coffee size={18} /> Buy me coffee
                    </a>
                </div>

            </div>
        </motion.div>
    );
}
