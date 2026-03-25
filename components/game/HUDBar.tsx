"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/store/gameStore";
import { getMultiplier } from "@/lib/scoring";

export default function HUDBar() {
    const lives = useGameStore((s) => s.lives);
    const score = useGameStore((s) => s.score);
    const roundNum = useGameStore((s) => s.roundNum);
    const questionIdx = useGameStore((s) => s.questionIdx);
    const combo = useGameStore((s) => s.combo);

    const multiplier = getMultiplier(combo);

    return (
        <div className="w-full bg-white/80 backdrop-blur-md border-b border-green-100 px-3 py-2 flex items-center justify-between gap-2 z-50">
            {/* Lives */}
            <div className="flex items-center gap-0.5">
                {[0, 1, 2].map((i) => (
                    <span
                        key={i}
                        className={`text-lg transition-all duration-300 ${i < lives
                                ? "opacity-100"
                                : "opacity-30 grayscale"
                            }`}
                    >
                        ❤️
                    </span>
                ))}
            </div>

            {/* Score */}
            <div className="flex items-center gap-1">
                <span className="text-xs text-gray-400 font-medium">Poin</span>
                <span className="font-fredoka text-xl font-bold text-amber-500 min-w-[50px] text-center">
                    {score}
                </span>
            </div>

            {/* Round & Question */}
            <div className="flex flex-col items-center text-xs leading-tight">
                <span className="text-gray-500 font-semibold">
                    Jalan {roundNum + 1}/5
                </span>
                <span className="text-gray-400">
                    Soal {Math.min(questionIdx + 1, 10)}/10
                </span>
            </div>

            {/* Combo Badge */}
            <AnimatePresence>
                {combo >= 2 && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                        className="bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg shadow-orange-500/30 whitespace-nowrap"
                    >
                        🔥 {combo}x COMBO · {multiplier}× pts
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
