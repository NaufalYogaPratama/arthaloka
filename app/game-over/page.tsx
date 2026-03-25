"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useGameStore } from "@/store/gameStore";

export default function GameOverPage() {
    const router = useRouter();
    const score = useGameStore((s) => s.score);
    const level = useGameStore((s) => s.level);
    const resetGame = useGameStore((s) => s.resetGame);

    const levelLabel = level
        ? { easy: "Easy 🌱", medium: "Medium 🌊", hard: "Hard 🔥" }[level]
        : "—";

    const handleRestart = () => {
        resetGame();
        router.push("/game");
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 flex items-center justify-center relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-[-60px] left-[-40px] w-[200px] h-[200px] rounded-full bg-red-200/30 blur-2xl" />
            <div className="absolute bottom-[-60px] right-[-40px] w-[220px] h-[220px] rounded-full bg-rose-200/25 blur-3xl" />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-pink-100/30 blur-3xl" />

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 250, damping: 20 }}
                className="relative z-10 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 max-w-sm mx-4 text-center"
            >
                {/* Orang utan mascot with bounce */}
                <motion.div
                    animate={{
                        y: [0, -20, 0, -12, 0],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 2,
                    }}
                    className="text-8xl mb-4"
                >
                    🦧
                </motion.div>

                {/* Game Over title */}
                <h1 className="font-fredoka text-3xl font-bold text-red-500 mb-2">
                    Game Over
                </h1>

                {/* Motivational message */}
                <p className="text-gray-600 text-base mb-2">
                    Jangan menyerah! Setiap kesalahan adalah pelajaran berharga.
                </p>
                <p className="text-gray-400 text-sm mb-6">
                    &quot;Gagal itu biasa, yang penting kamu belajar dan mencoba
                    lagi!&quot; 💪
                </p>

                {/* Score card */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4 mb-6">
                    <p className="text-sm text-amber-600 font-medium mb-1">
                        Poin yang dikumpulkan
                    </p>
                    <p className="font-fredoka text-4xl font-bold text-amber-500">
                        {score}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                        Level: {levelLabel}
                    </p>
                </div>

                {/* Hearts display (all gone) */}
                <div className="flex justify-center gap-1 mb-6">
                    <span className="text-2xl opacity-30 grayscale">❤️</span>
                    <span className="text-2xl opacity-30 grayscale">❤️</span>
                    <span className="text-2xl opacity-30 grayscale">❤️</span>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col gap-3">
                    <button
                        onClick={handleRestart}
                        className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-orange-400 to-red-500 text-white font-bold text-lg shadow-lg shadow-orange-500/25 hover:shadow-xl transition-all duration-200 active:scale-[0.98]"
                    >
                        🔄 Coba Lagi!
                    </button>
                    <button
                        onClick={() => router.push("/level-select")}
                        className="w-full py-3 rounded-2xl bg-white border-2 border-gray-200 text-gray-600 font-bold hover:border-orange-400 transition-all duration-200 active:scale-[0.98]"
                    >
                        📋 Pilih Level Lain
                    </button>
                    <button
                        onClick={() => router.push("/")}
                        className="w-full py-3 rounded-2xl text-gray-400 font-medium text-sm hover:text-gray-600 transition-colors"
                    >
                        Menu Utama
                    </button>
                </div>
            </motion.div>
        </main>
    );
}
