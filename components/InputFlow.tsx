'use client';

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Lock, ChevronDown, ChevronUp, AlertCircle, CheckCircle, X, Trophy } from "lucide-react";
import { Theme } from "@/lib/themes";

interface InputFlowProps {
    onComplete?: (dramas: string[], topDramas: string[]) => void;
    theme: Theme;
}

type PageState = "input" | "loading" | "confirmation";
type ErrorType = "no-dramas" | "file-too-large" | "invalid-file" | "missing-top3" | null;

export default function InputFlow({ onComplete, theme }: InputFlowProps) {
    const [inputText, setInputText] = useState("");
    const [showExamples, setShowExamples] = useState(false);
    const [error, setError] = useState<ErrorType>(null);
    const [pageState, setPageState] = useState<PageState>("input");
    const [loadingStep, setLoadingStep] = useState(0);
    const [parsedDramas, setParsedDramas] = useState<string[]>([]);
    const [uncertainMatches, setUncertainMatches] = useState<Array<{ input: string; suggestion: string }>>([]);

    // Top 3 Dramas State
    const [topDramas, setTopDramas] = useState<[string, string, string]>(["", "", ""]);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const colors = {
        bg: "var(--bg-primary)",
        text: "var(--text-primary)",
        accent: "var(--accent-10)", // dynamic accent
        border: "var(--secondary-20)",
        inputBg: "rgba(255, 255, 255, 0.05)", // slightly transparent
        errorBg: "var(--primary-10)",
        errorText: "var(--primary-50)",
        dropzoneBg: "rgba(0,0,0,0.02)",
        exampleBg: "rgba(0,0,0,0.03)",
        buttonBg: "var(--accent-10)",
        buttonText: "white" // assuming accent is dark enough or light enough? usually white works
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputText(e.target.value);
        setError(null);
        // Auto-resize
        e.target.style.height = "auto";
        e.target.style.height = e.target.scrollHeight + "px";
    };

    const handleTopDramaChange = (index: 0 | 1 | 2, value: string) => {
        const newTopDramas = [...topDramas] as [string, string, string];
        newTopDramas[index] = value;
        setTopDramas(newTopDramas);
        setError(null);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Check file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError("file-too-large");
            return;
        }

        // Check file type
        const validTypes = [".txt", ".csv", ".xlsx"];
        const fileExt = file.name.substring(file.name.lastIndexOf("."));
        if (!validTypes.includes(fileExt.toLowerCase())) {
            setError("invalid-file");
            return;
        }

        // Read file
        const reader = new FileReader();
        reader.onload = (event) => {
            const text = event.target?.result as string;
            setInputText(text);
            setError(null);
        };
        reader.readAsText(file);
    };

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            const fakeEvent = {
                target: { files: [file] }
            } as unknown as React.ChangeEvent<HTMLInputElement>;
            handleFileSelect(fakeEvent);
        }
    }, []);

    const parseDramas = (text: string): string[] => {
        if (!text.trim()) return [];

        const lines = text.split("\n");
        const dramas: string[] = [];

        lines.forEach(line => {
            // Remove bullets, numbers, extra whitespace
            let cleaned = line.trim();
            cleaned = cleaned.replace(/^[-•*]\s*/, ""); // Remove bullets
            cleaned = cleaned.replace(/^\d+\.\s*/, ""); // Remove numbers
            cleaned = cleaned.replace(/\s*\(\d{4}\)\s*$/, ""); // Remove year
            cleaned = cleaned.replace(/\s*-\s*.+$/, ""); // Remove details after dash

            if (cleaned.length > 2) {
                dramas.push(cleaned);
            }
        });

        return dramas;
    };

    const handleGenerate = () => {
        let dramas = parseDramas(inputText);

        // Validate Top 3
        if (topDramas.some(d => !d.trim())) {
            setError("missing-top3");
            return;
        }

        // Merge and Deduplicate
        const validTop3 = topDramas.filter(d => d.trim().length > 0);
        const uniqueMap = new Map<string, string>();

        // Priority: Main list matching casing
        dramas.forEach(d => uniqueMap.set(d.toLowerCase().trim(), d));

        // Add Top 3 if not already present
        validTop3.forEach(d => {
            const key = d.toLowerCase().trim();
            if (!uniqueMap.has(key)) {
                uniqueMap.set(key, d.trim());
            }
        });

        dramas = Array.from(uniqueMap.values());

        if (dramas.length === 0) {
            setError("no-dramas");
            return;
        }

        // Start loading
        setPageState("loading");
        setError(null);

        // Simulate loading steps
        const steps = [
            { delay: 500, step: 0 },
            { delay: 1000, step: 1 },
            { delay: 1500, step: 2 },
            { delay: 2000, step: 3 },
        ];

        steps.forEach(({ delay, step }) => {
            setTimeout(() => setLoadingStep(step), delay);
        });

        // Show confirmation screen
        setTimeout(() => {
            setParsedDramas(dramas);

            // Simulate uncertain matches (demo)
            if (dramas.length > 15) { // Just a dummy condition for demo
                setUncertainMatches([
                    { input: dramas[dramas.length - 1], suggestion: "Lovely Runner" }
                ]);
            }

            setPageState("confirmation");
            setLoadingStep(0);
        }, 2500);
    };

    const handleConfirm = () => {
        if (onComplete) {
            onComplete(parsedDramas, topDramas);
        }
    };

    const handleBack = () => {
        setPageState("input");
        setParsedDramas([]);
        setUncertainMatches([]);
    };

    const handleRemoveUncertain = (index: number) => {
        const newUncertain = [...uncertainMatches];
        newUncertain.splice(index, 1);
        setUncertainMatches(newUncertain);
    };

    const handleUsesuggestion = (index: number) => {
        const match = uncertainMatches[index];
        const newDramas = [...parsedDramas];
        const dramaIndex = newDramas.findIndex(d => d === match.input);
        if (dramaIndex !== -1) {
            newDramas[dramaIndex] = match.suggestion;
            setParsedDramas(newDramas);
        }
        handleRemoveUncertain(index);
    };

    if (pageState === "loading") {
        return <LoadingScreen step={loadingStep} />;
    }

    if (pageState === "confirmation") {
        return (
            <ConfirmationScreen
                dramas={parsedDramas}
                uncertainMatches={uncertainMatches}
                onBack={handleBack}
                onConfirm={handleConfirm}
                onRemoveUncertain={handleRemoveUncertain}
                onUseSuggestion={handleUsesuggestion}
            />
        );
    }

    const dramaCount = parseDramas(inputText).length;
    const hasTop3 = topDramas.every(d => d.trim().length > 0);
    const isValid = dramaCount > 0 && hasTop3;

    return (
        <div className="w-full flex flex-col items-center justify-center">

            {/* Top 3 Dramas */}
            <div className="mb-10 w-full rounded-2xl border-2 border-secondary-20 p-6 text-left">
                <div className="flex items-center gap-2 mb-2">
                    <Trophy className="size-6 text-accent-10" />
                    <label className="font-heading font-black text-xl tracking-tight text-text-primary">Your Top 3 K-Dramas</label>
                </div>
                <p className="font-sans text-sm mb-6 opacity-70">Enter your ultimate favorites of the year!</p>

                <div className="grid grid-cols-1 gap-4">
                    {[0, 1, 2].map((idx) => (
                        <div key={idx} className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-heading font-bold text-lg opacity-50 text-text-primary">
                                #{idx + 1}
                            </span>
                            <input
                                type="text"
                                value={topDramas[idx as 0 | 1 | 2]}
                                onChange={(e) => handleTopDramaChange(idx as 0 | 1 | 2, e.target.value)}
                                placeholder={idx === 0 ? "Your Best Drama of 2025" : idx === 1 ? "Second" : "Third"}
                                className="w-full rounded-xl py-4 pl-12 pr-4 font-sans text-[16px] focus:outline-none transition-all placeholder:text-text-primary/30 focus:ring-2 focus:ring-accent-10"
                                style={{
                                    backgroundColor: colors.inputBg,
                                    color: colors.text,
                                    border: `2px solid ${colors.border}`,
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <motion.div
                className="w-full max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* Error Messages */}
                <AnimatePresence>
                    {error && (
                        <motion.div
                            className="mb-6 rounded-2xl p-4 flex items-start gap-3"
                            style={{ backgroundColor: colors.errorBg }}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            <AlertCircle className="size-5 shrink-0 mt-0.5" style={{ color: colors.errorText }} />
                            <div className="flex-1">
                                <p className="font-sans font-bold text-[16px] mb-1" style={{ color: colors.errorText }}>
                                    {error === "no-dramas" && "We couldn't find any dramas"}
                                    {error === "file-too-large" && "File too large"}
                                    {error === "invalid-file" && "File type not supported"}
                                    {error === "missing-top3" && "Please list your Top 3 dramas"}
                                </p>
                                <p className="font-sans font-medium text-[14px]" style={{ color: colors.errorText, opacity: 0.9 }}>
                                    {error === "no-dramas" && "Please check your list and try again. Make sure drama names are spelled correctly."}
                                    {error === "file-too-large" && "Please upload a file under 5MB. Try a text file instead of a spreadsheet with images."}
                                    {error === "invalid-file" && "Please upload: TXT, CSV, or XLSX"}
                                    {error === "missing-top3" && "We need your favorites to generate your wrapped!"}
                                </p>
                            </div>
                            <button onClick={() => setError(null)}>
                                <X className="size-5" style={{ color: colors.errorText }} />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main Textarea */}
                <motion.div
                    className="mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <textarea
                        value={inputText}
                        onChange={handleTextChange}
                        placeholder={`📝 Paste your drama list here...\n\nTry any format:\n- Lovely Runner\n- When the Phone Rings\n- 1. The Judge From Hell\n- • Squid Game Season 2`}
                        className="w-full rounded-2xl p-6 font-sans text-[18px] resize-none focus:outline-none transition-all placeholder:text-text-primary/40 focus:ring-2 focus:ring-accent-10"
                        style={{
                            backgroundColor: colors.inputBg,
                            color: colors.text,
                            border: `2px solid ${colors.border}`,
                            minHeight: "300px", // Reduced slightly to make room
                            maxHeight: "500px"
                        }}
                    />
                    <div className="mt-3 flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                            <p className="font-sans font-medium text-[14px]" style={{ color: colors.text, opacity: 0.6 }}>
                                ✓ Bullets, numbers, plain text—all work
                            </p>
                        </div>
                        {dramaCount > 0 && (
                            <motion.p
                                className="font-sans font-bold text-[16px]"
                                style={{ color: colors.border }}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                            >
                                {dramaCount} drama{dramaCount !== 1 ? "s" : ""} detected
                            </motion.p>
                        )}
                    </div>
                </motion.div>

                {/* Divider */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="flex-1 h-px" style={{ backgroundColor: colors.text, opacity: 0.2 }} />
                    <p className="font-sans font-bold text-[14px]" style={{ color: colors.text, opacity: 0.5 }}>
                        OR IMPORT FILE
                    </p>
                    <div className="flex-1 h-px" style={{ backgroundColor: colors.text, opacity: 0.2 }} />
                </div>

                {/* File Upload */}
                <motion.div
                    className="mb-8 rounded-2xl p-8 text-center cursor-pointer transition-all border-2 border-dashed group"
                    style={{
                        backgroundColor: colors.dropzoneBg,
                        borderColor: colors.border
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => fileInputRef.current?.click()}
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                >
                    <Upload className="size-12 mx-auto mb-3 transition-colors group-hover:text-accent-10" style={{ color: colors.border }} />
                    <p className="font-heading font-bold text-[18px] mb-2" style={{ color: colors.text }}>
                        📄 Drop a file here or click to browse
                    </p>
                    <p className="font-sans font-medium text-[14px]" style={{ color: colors.text, opacity: 0.6 }}>
                        Accepted: TXT, CSV, XLSX • Max size: 5MB
                    </p>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".txt,.csv,.xlsx"
                        onChange={handleFileSelect}
                        className="hidden"
                    />
                </motion.div>

                {/* Format Examples */}
                <motion.div
                    className="mb-8 rounded-2xl overflow-hidden"
                    style={{ backgroundColor: showExamples ? colors.exampleBg : "transparent" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    <button
                        className="w-full flex items-center justify-between p-4 transition-all hover:bg-black/5 rounded-2xl"
                        onClick={() => setShowExamples(!showExamples)}
                        style={{ color: colors.text }}
                    >
                        <span className="font-sans font-bold text-[16px]">
                            ❓ What formats work?
                        </span>
                        {showExamples ? <ChevronUp className="size-5" /> : <ChevronDown className="size-5" />}
                    </button>

                    <AnimatePresence>
                        {showExamples && (
                            <motion.div
                                className="px-6 pb-6"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                            >
                                <p className="font-sans font-medium text-[16px] mb-4" style={{ color: colors.text }}>
                                    All of these formats work perfectly:
                                </p>

                                <div className="space-y-4 font-sans font-medium text-[14px]" style={{ color: colors.text }}>
                                    <div>
                                        <p className="font-bold mb-2">✓ Simple list:</p>
                                        <p className="ml-4 opacity-80">Lovely Runner<br />When the Phone Rings<br />The Judge From Hell</p>
                                    </div>
                                    <div>
                                        <p className="font-bold mb-2">✓ With bullets:</p>
                                        <p className="ml-4 opacity-80">- Lovely Runner<br />- When the Phone Rings<br />• The Judge From Hell</p>
                                    </div>
                                    <div>
                                        <p className="font-bold mb-2">✓ Numbered:</p>
                                        <p className="ml-4 opacity-80">1. Lovely Runner<br />2. When the Phone Rings<br />3. The Judge From Hell</p>
                                    </div>
                                </div>

                                <p className="font-sans font-medium text-[14px] mt-6" style={{ color: colors.text, opacity: 0.8 }}>
                                    💡 Tip: Copy directly from your notes, MyDramaList, or spreadsheet!
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Privacy Note */}
                <motion.div
                    className="mb-8 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <Lock className="size-5" style={{ color: colors.text, opacity: 0.6 }} />
                        <p className="font-sans font-bold text-[16px]" style={{ color: colors.text, opacity: 0.7 }}>
                            Your data stays private
                        </p>
                    </div>
                    <p className="font-sans font-medium text-[14px]" style={{ color: colors.text, opacity: 0.6 }}>
                        We don&apos;t store your drama list. We just analyze it to create your Wrapped, then forget it.
                    </p>
                </motion.div>

                {/* CTA Button */}
                <motion.button
                    className="w-full rounded-full py-5 font-heading font-black tracking-tight text-[24px] shadow-xl transition-all"
                    style={{
                        backgroundColor: isValid ? colors.buttonBg : colors.border,
                        color: colors.buttonText,
                        opacity: isValid ? 1 : 0.5,
                        cursor: isValid ? "pointer" : "not-allowed"
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isValid ? 1 : 0.5, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    whileHover={isValid ? { scale: 1.02, y: -2, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" } : {}}
                    whileTap={isValid ? { scale: 0.98 } : {}}
                    onClick={handleGenerate}
                    disabled={!isValid}
                >
                    {isValid ? "Generate My Wrapped →" : "Fill details to continue"}
                </motion.button>
            </motion.div>
        </div>
    );
}

// Loading Screen Component
function LoadingScreen({ step }: { step: number }) {
    const colors = {
        bg: "var(--bg-primary)",
        text: "var(--text-primary)",
        accent: "var(--accent-10)",
    };

    const steps = [
        "Parsing your list...",
        "Finding your dramas...",
        "Calculating insights...",
        "Creating your Wrapped..."
    ];

    const progress = ((step + 1) / steps.length) * 100;

    return (
        <div className="w-full h-96 flex items-center justify-center">
            <motion.div
                className="text-center max-w-md px-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                {/* Spinner */}
                <motion.div
                    className="size-20 mx-auto mb-8 rounded-full border-4"
                    style={{
                        borderColor: "var(--primary-20)",
                        borderTopColor: "var(--primary-50)"
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />

                {/* Step Text */}
                <motion.p
                    className="font-heading font-bold text-[28px] mb-6"
                    style={{
                        color: colors.text
                    }}
                    key={step}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                >
                    {steps[step]}
                </motion.p>

                {/* Progress Bar */}
                <div className="w-full h-2 rounded-full overflow-hidden bg-primary-10">
                    <motion.div
                        className="h-full rounded-full bg-primary-50"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>

                <p className="font-sans font-medium text-[14px] mt-3 opacity-60">
                    {Math.round(progress)}%
                </p>
            </motion.div>
        </div>
    );
}

// Confirmation Screen Component
interface ConfirmationScreenProps {
    dramas: string[];
    uncertainMatches: Array<{ input: string; suggestion: string }>;
    onBack: () => void;
    onConfirm: () => void;
    onRemoveUncertain: (index: number) => void;
    onUseSuggestion: (index: number) => void;
}

function ConfirmationScreen({
    dramas,
    uncertainMatches,
    onBack,
    onConfirm,
    onRemoveUncertain,
    onUseSuggestion
}: ConfirmationScreenProps) {
    const colors = {
        bg: "var(--bg-primary)",
        text: "var(--text-primary)",
        accent: "var(--accent-10)",
        cardBg: "rgba(255,255,255,0.1)", // slightly transparent
        successBg: "var(--seed-40)", // light green
        warningBg: "var(--stat-50)", // yellow
        buttonBg: "var(--accent-10)"
    };

    return (
        <div className="w-full flex flex-col items-center justify-center py-12">
            <motion.div
                className="w-full max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                {/* Title */}
                <div className="text-center mb-8">
                    <motion.h1
                        className="font-heading font-black tracking-tight text-5xl mb-2"
                    >
                        We found {dramas.length} dramas!
                    </motion.h1>
                    <p className="font-sans font-medium text-[18px] opacity-70">
                        Review your list before generating your Wrapped
                    </p>
                </div>

                {/* Matched Dramas */}
                <div className="mb-6 rounded-3xl p-6 max-h-[400px] overflow-y-auto bg-white/5 border border-white/10">
                    <div className="space-y-3">
                        {dramas.slice(0, 10).map((drama, index) => (
                            <motion.div
                                key={index}
                                className="flex items-center gap-3 p-3 rounded-xl bg-seed-40/30"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <CheckCircle className="size-5 shrink-0 text-seed-50" />
                                <p className="font-sans font-medium text-[16px]">
                                    {drama}
                                </p>
                            </motion.div>
                        ))}
                        {dramas.length > 10 && (
                            <p className="font-sans font-medium text-[14px] text-center py-2 opacity-60">
                                ... and {dramas.length - 10} more
                            </p>
                        )}
                    </div>
                </div>

                {/* Uncertain Matches */}
                {uncertainMatches.length > 0 && (
                    <div className="mb-6 rounded-3xl p-6 bg-white/5 border border-white/10 backdrop-blur-sm">
                        <p className="font-bold text-[16px] mb-4 flex items-center gap-2">
                            <AlertCircle className="size-5 text-stat-50" />
                            Couldn&apos;t match:
                        </p>
                        <div className="space-y-4">
                            {uncertainMatches.map((match, index) => (
                                <div
                                    key={index}
                                    className="p-4 rounded-xl bg-stat-40/20"
                                >
                                    <p className="font-medium text-[14px] mb-3">
                                        &quot;{match.input}&quot; (typo?)<br />
                                        <span style={{ opacity: 0.7 }}>Did you mean: <strong>{match.suggestion}</strong>?</span>
                                    </p>
                                    <div className="flex gap-2">
                                        <button
                                            className="px-4 py-2 rounded-full font-semibold text-[14px] transition-all bg-accent-10 text-white"
                                            onClick={() => onUseSuggestion(index)}
                                        >
                                            Use This
                                        </button>
                                        <button
                                            className="px-4 py-2 rounded-full font-semibold text-[14px] transition-all border-2 border-accent-10"
                                            onClick={() => onRemoveUncertain(index)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4">
                    <motion.button
                        className="flex-1 rounded-full py-4 font-bold text-[18px] border-2 border-secondary-20 transition-all hover:bg-secondary-20/10"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onBack}
                    >
                        ← Edit List
                    </motion.button>
                    <motion.button
                        className="flex-1 rounded-full py-4 font-heading font-bold text-[20px] shadow-xl transition-all bg-accent-10 text-white"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onConfirm}
                    >
                        Generate Wrapped →
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
}
