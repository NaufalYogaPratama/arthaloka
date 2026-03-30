"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { QUIZ_BADGE } from "@/lib/assets";
import { CheckCircle2, XCircle } from "lucide-react";

interface QuizModalProps {
    question: {
        id: string;
        questionText: string;
        options: string[];
    };
    quizType: "quiz1" | "quiz2";
    onAnswer: (selectedIndex: number) => Promise<{
        correct: boolean;
        correctIndex: number;
    }>;
    onComplete: () => void;
}

const letterLabels = ["A", "B", "C", "D"];

const letterColors = [
    "bg-blue-500",
    "bg-emerald-500",
    "bg-amber-500",
    "bg-purple-500",
];

export default function QuizModal({
    question,
    quizType,
    onAnswer,
    onComplete,
}: QuizModalProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [result, setResult] = useState<{
        correct: boolean;
        correctIndex: number;
    } | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSelect = async (index: number) => {
        if (selectedIndex !== null || isSubmitting) return; // already answered

        setSelectedIndex(index);
        setIsSubmitting(true);

        try {
            const res = await onAnswer(index);
            setResult(res);

            // Auto-advance after 1.5s
            setTimeout(() => {
                onComplete();
            }, 1500);
        } catch {
            // Fallback: advance anyway
            setTimeout(() => {
                onComplete();
            }, 1000);
        } finally {
            setIsSubmitting(false);
        }
    };

    const getButtonStyle = (index: number) => {
        if (result === null) {
            // Not answered yet
            return "bg-white border-2 border-gray-200 hover:border-green-400 hover:bg-green-50 active:scale-[0.98]";
        }

        // After answer
        if (index === result.correctIndex) {
            // Correct answer — always show green
            return "bg-green-100 border-2 border-green-500 ring-2 ring-green-300";
        }

        if (index === selectedIndex && !result.correct) {
            // Wrong selected answer — show red
            return "bg-red-100 border-2 border-red-500 ring-2 ring-red-300";
        }

        // Other unselected options
        return "bg-gray-50 border-2 border-gray-200 opacity-50";
    };

    const getResultIcon = (index: number) => {
        if (result === null) return null;

        if (index === result.correctIndex) {
            return <CheckCircle2 className="w-5 h-5 text-green-600" />;
        }

        if (index === selectedIndex && !result.correct) {
            return <XCircle className="w-5 h-5 text-red-500" />;
        }

        return null;
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        >
            <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.7, opacity: 0 }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 relative"
            >
                {/* Quiz type badge */}
                <div className="flex justify-center mb-4">
                    {(() => {
                        const badge = QUIZ_BADGE[quizType];
                        const badgeDisplayH = 36;
                        const badgeDisplayW = Math.round(badgeDisplayH * (badge.width / badge.height));
                        return (
                            <Image
                                src={badge.src}
                                alt={quizType === 'quiz1' ? 'Quiz Maju' : 'Quiz Ambil Batu'}
                                width={badgeDisplayW}
                                height={badgeDisplayH}
                                className="object-contain drop-shadow-sm"
                                style={{ width: badgeDisplayW, height: badgeDisplayH }}
                            />
                        );
                    })()}
                </div>

                {/* Question text */}
                <h3 className="text-[17px] font-bold text-gray-800 text-center mb-5 leading-relaxed">
                    {question.questionText}
                </h3>

                {/* Answer buttons */}
                <div className="flex flex-col gap-3">
                    {question.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleSelect(index)}
                            disabled={selectedIndex !== null}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all duration-200 ${getButtonStyle(
                                index
                            )} ${selectedIndex !== null
                                ? "cursor-default"
                                : "cursor-pointer"
                                }`}
                        >
                            {/* Letter circle */}
                            <span
                                className={`w-8 h-8 rounded-full ${letterColors[index]} text-white text-sm font-bold flex items-center justify-center flex-shrink-0`}
                            >
                                {letterLabels[index]}
                            </span>

                            {/* Option text */}
                            <span className="text-sm font-medium text-gray-700 flex-1">
                                {option}
                            </span>

                            {/* Result icon */}
                            {getResultIcon(index)}
                        </button>
                    ))}
                </div>

                {/* Result feedback */}
                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`mt-4 p-3 rounded-2xl text-center text-sm font-semibold ${result.correct
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : "bg-red-50 text-red-700 border border-red-200"
                            }`}
                    >
                        {result.correct
                            ? "Benar! Keren!"
                            : "Salah! Coba lagi nanti ya..."}
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    );
}
