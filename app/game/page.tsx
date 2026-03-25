"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useGameStore } from "@/store/gameStore";

export default function GamePage() {
    const router = useRouter();
    const level = useGameStore((s) => s.level);

    const levelLabels = {
        easy: { emoji: "🌱", label: "Easy", color: "text-green-600" },
        medium: { emoji: "🌊", label: "Medium", color: "text-blue-600" },
        hard: { emoji: "🔥", label: "Hard", color: "text-red-600" },
    };

    const info = level ? levelLabels[level] : null;

    return (
        <main className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-[-60px] left-[-40px] w-[200px] h-[200px] rounded-full bg-green-200/30 blur-2xl" />
            <div className="absolute bottom-[-60px] right-[-40px] w-[220px] h-[220px] rounded-full bg-teal-200/25 blur-3xl" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-10 max-w-md mx-4 text-center"
            >
                {/* Game icon */}
                <div className="text-6xl mb-6">🏗️</div>

                <h1 className="font-fredoka text-3xl font-bold text-gray-700 mb-3">
                    Papan Engklek
                </h1>

                {info && (
                    <p className={`text-lg font-semibold ${info.color} mb-4`}>
                        Level: {info.emoji} {info.label}
                    </p>
                )}

                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-8">
                    <p className="text-amber-700 text-sm font-medium">
                        🚧 Game engine sedang dalam pengembangan (Fase 2). Nantikan
                        papan engklek digital dengan animasi karakter dan batu!
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => router.push("/level-select")}
                        className="w-full py-3 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold shadow-lg shadow-green-500/25 hover:shadow-xl transition-all duration-200 active:scale-[0.98]"
                    >
                        ← Pilih Level Lain
                    </button>
                    <button
                        onClick={() => router.push("/")}
                        className="w-full py-3 rounded-2xl bg-white border-2 border-gray-200 text-gray-600 font-bold hover:border-green-400 transition-all duration-200 active:scale-[0.98]"
                    >
                        Menu Utama
                    </button>
                </div>
            </motion.div>
        </main>
    );
}
