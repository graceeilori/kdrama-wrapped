"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { IdentifiedDrama } from "@/app/actions";
import { ArrowLeft, Share2, Download, RotateCcw, Heart, Coffee, Footprints, Search, Flower2, Fan, Image as ImageIcon } from "lucide-react";
import html2canvas from "html2canvas";
import Image from "next/image";

interface Slide7SummaryProps {
    dramas: IdentifiedDrama[];
    topDramas: IdentifiedDrama[];
    onPrev: () => void;
    onReplay: () => void;
}

// Vibe Configuration
const vibeConfig = {
    romantic: { label: "#hopelessromantic", icon: Heart, color: "#F4C2C2", bg: "#F4C2C2" },
    wanderer: { label: "#wanderer", icon: Footprints, color: "#E7A8A8", bg: "#E7A8A8" },
    detective: { label: "#detective", icon: Search, color: "#A8BBE7", bg: "#A8BBE7" },
    healing: { label: "#healingsoul", icon: Flower2, color: "#BEE9E4", bg: "#BEE9E4" },
    time: { label: "#timetraveler", icon: Fan, color: "#E7A77B", bg: "#E7A77B" },
};

export default function Slide7Summary({ dramas, topDramas, onPrev, onReplay }: Slide7SummaryProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);

    // Stats
    const dramaCount = dramas.length;
    const episodeCount = dramaCount * 16;
    const totalHours = Math.round(episodeCount * 1.17);

    // Mock Vibe & Genres
    const vibe = vibeConfig.romantic;
    const genres = ["Saeguk", "Slice of Life", "Comedy", "Romance", "Thriller"];

    const handleGenerate = async () => {
        if (!cardRef.current) return;
        setIsGenerating(true);
        try {
            // Need to wait a moment for images to fully render
            await new Promise(resolve => setTimeout(resolve, 500));

            const canvas = await html2canvas(cardRef.current, {
                scale: 2, // Higher quality
                backgroundColor: "#FFFBF5",
                useCORS: true, // Crucial for TMDB images
                allowTaint: true,
                ignoreElements: (element) => element.classList.contains("no-capture")
            });
            const image = canvas.toDataURL("image/png");
            setGeneratedImage(image);
        } catch (err) {
            console.error("Generation failed", err);
            alert("Could not generate image. Please try again.");
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
                        {generatedImage ? "Ready to Share!" : "Summary"}
                        {!generatedImage && <img src="/assets/landing-sparkle.svg" className="inline-block w-4 h-4 ml-1 mb-4" />}
                    </div>
                    <div className="w-8"></div>
                </div>

                {/* THE CARD AREA */}
                <div className="w-full relative flex justify-center">

                    {/* Live HTML Card (Visible for preview, Hidden when image is generated) */}
                    <div
                        ref={cardRef}
                        className={`w-full aspect-[9/16] bg-[#FFFBF5] border-2 border-text-primary rounded-xl p-6 flex flex-col items-center relative shadow-xl ${generatedImage ? 'fixed left-[-9999px]' : ''}`}
                    >
                        {/* Card Content ... (Same as before) */}
                        <h1 className="font-heading font-black text-2xl text-center text-text-primary mb-1">My 2025</h1>
                        <h2 className="font-heading font-black text-2xl text-center text-text-primary mb-6">K-Drama Wrapped</h2>

                        {/* Vibe Icon */}
                        <div className={`w-32 h-32 ${vibe.label === "#hopelessromantic" ? "bg-[#F4C2C2]/20" : "bg-secondary-20/10"} rounded-lg flex items-center justify-center mb-2`}>
                            <vibe.icon className="w-20 h-20 opacity-80" strokeWidth={1} style={{ color: vibe.color }} />
                        </div>
                        <p className="font-accent text-xl mb-6" style={{ color: vibe.color }}>{vibe.label}</p>

                        {/* Stats Pill */}
                        <div className="w-full bg-[#E7A77B] rounded-full px-4 py-3 flex justify-between items-center text-white mb-6 shadow-sm">
                            <div className="flex flex-col items-center w-1/3 border-r border-white/30">
                                <span className="font-heading font-black text-lg">{dramaCount}</span>
                                <span className="text-[10px] font-bold uppercase">Dramas</span>
                            </div>
                            <div className="flex flex-col items-center w-1/3 border-r border-white/30">
                                <span className="font-heading font-black text-lg">{episodeCount}</span>
                                <span className="text-[10px] font-bold uppercase">Episodes</span>
                            </div>
                            <div className="flex flex-col items-center w-1/3">
                                <span className="font-heading font-black text-lg">{totalHours}</span>
                                <span className="text-[10px] font-bold uppercase">Hours</span>
                            </div>
                        </div>

                        {/* Content Grid */}
                        <div className="flex w-full gap-4 flex-1">
                            <div className="w-1/2 relative h-32">
                                <p className="font-accent text-sm mb-2 text-center text-text-primary">Top 3</p>
                                <div className="relative w-full h-full">
                                    {topDramas[1]?.posterUrl && (
                                        <img src={topDramas[1].posterUrl} className="absolute top-0 left-0 w-2/3 h-4/5 -rotate-6 object-cover rounded border border-white shadow bg-gray-200" />
                                    )}
                                    {topDramas[2]?.posterUrl && (
                                        <img src={topDramas[2].posterUrl} className="absolute top-4 right-0 w-2/3 h-4/5 rotate-6 object-cover rounded border border-white shadow bg-gray-200" />
                                    )}
                                    {topDramas[0]?.posterUrl && (
                                        <img src={topDramas[0].posterUrl} className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-5/6 object-cover rounded border-2 border-white shadow-lg bg-gray-200 z-10" />
                                    )}
                                </div>
                            </div>

                            <div className="w-1/2 flex flex-col justify-center">
                                <p className="font-accent text-sm mb-2 text-center text-text-primary">Top Genres</p>
                                <div className="flex flex-col gap-1.5">
                                    {genres.map((g, i) => (
                                        <div key={i} className="flex items-baseline gap-1.5">
                                            <span className="font-heading font-black text-sm">{i + 1}.</span>
                                            <span className="font-heading font-bold text-xs whitespace-nowrap">{g}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 text-[10px] opacity-50 font-sans">kdramawrapped.vercel.app</div>
                    </div>

                    {/* Generated Image Preview */}
                    {generatedImage && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative shadow-2xl rounded-xl overflow-hidden border-4 border-text-primary"
                        >
                            <img src={generatedImage} alt="Wrapped Summary" className="w-full h-auto max-w-sm" />
                        </motion.div>
                    )}
                </div>

                {/* Main Actions */}
                <div className="flex flex-col w-full gap-3">
                    {!generatedImage ? (
                        <button
                            onClick={handleGenerate}
                            disabled={isGenerating}
                            className="w-full bg-text-primary text-[#FFFBF5] py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg"
                        >
                            {isGenerating ? (
                                <span className="animate-spin">⌛</span>
                            ) : (
                                <ImageIcon size={20} />
                            )}
                            {isGenerating ? "Generating..." : "Generate Image"}
                        </button>
                    ) : (
                        <>
                            <div className="flex gap-4 w-full">
                                <button
                                    onClick={downloadImage}
                                    className="flex-1 bg-text-primary text-[#FFFBF5] py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg"
                                >
                                    <Download size={20} /> Save Image
                                </button>
                                <button
                                    onClick={() => setGeneratedImage(null)}
                                    className="px-6 bg-white border-2 border-text-primary text-text-primary rounded-full font-bold hover:bg-gray-50"
                                >
                                    Back
                                </button>
                            </div>
                            <p className="text-center text-sm opacity-60 font-medium">Long press image to save on mobile</p>
                        </>
                    )}
                </div>

                {/* Secondary Actions */}
                <button onClick={onReplay} className="flex items-center gap-2 text-text-primary font-medium hover:underline">
                    <RotateCcw size={16} /> Replay
                </button>
                <a href="#" className="w-full bg-[#FFE5E5] text-text-primary py-3 rounded-xl flex items-center justify-center gap-2 font-medium hover:bg-[#FFD1D1] transition-colors">
                    <Coffee size={18} /> Buy me coffee
                </a>

            </div>
        </motion.div>
    );
}
