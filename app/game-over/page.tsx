"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useGameStore } from "@/store/gameStore";
import Image from "next/image";
import { GAME_OVER_ILLUSTRATION } from "@/lib/assets";
import { MascotImage } from "@/components/ui/MascotImage";

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

    const handleHome = () => {
        router.push("/");
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
                {/* Hero Illustration */}
                <div className="w-full rounded-2xl overflow-hidden mb-4 relative drop-shadow-md">
                    <Image
                        src={GAME_OVER_ILLUSTRATION.src}
                        alt="Game Over"
                        width={GAME_OVER_ILLUSTRATION.width}
                        height={GAME_OVER_ILLUSTRATION.height}
                        className="w-full h-auto object-cover"
                        style={{ width: '100%', height: 'auto' }}
                        priority
                    />

                    {/* Mascot sedih overlay di pojok bawah kanan gambar */}
                    <div className="absolute bottom-2 right-2">
                        <MascotImage variant="sedih" displayHeight={100} />
                    </div>
                </div>

                {/* Game Over title */}
                <h1 className="font-fredoka text-3xl font-bold text-red-500 mb-2">
                    Game Over!
                </h1>

                {/* Motivational message */}
                <p className="text-gray-600 font-medium text-sm mb-6">
                    Nyawa habis! Tapi jangan menyerah ya!
                </p>

                {/* Score card */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4 mb-6">
                    <p className="text-sm text-amber-600 font-medium mb-1">
                        Poin dikumpulkan
                    </p>
                    <p className="font-fredoka text-4xl font-bold text-amber-500">
                        {score}
                    </p>
                </div>

                {/* Action buttons */}
                <div className="flex gap-3 mt-6">
                    <button
                        onClick={handleRestart}
                        className="flex-1 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-extrabold text-base py-3.5 px-5 rounded-2xl transition-all duration-150 flex items-center justify-center gap-2 shadow-sm"
                    >
                        🔄 Coba Lagi!
                    </button>
                    <button
                        onClick={handleHome}
                        className="flex-1 bg-white hover:bg-gray-50 active:scale-95 text-gray-700 font-extrabold text-base py-3.5 px-5 rounded-2xl border-2 border-gray-200 transition-all duration-150 flex items-center justify-center gap-2"
                    >
                        🏠 Menu
                    </button>
                </div>
            </motion.div>
        </main>
    );
}
