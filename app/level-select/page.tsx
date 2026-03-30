"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import LevelCard from "@/components/ui/LevelCard";
import { useGameStore } from "@/store/gameStore";
import type { GameLevel } from "@/types/game";
import { Target, ArrowLeft } from 'lucide-react';

const levels = [
    {
        key: "easy" as const,
        title: "Easy",
        topics: "Budgeting · Menabung · Kebutuhan vs Keinginan",
        description:
            "Pelajari dasar-dasar keuangan: cara mengatur uang, pentingnya menabung, dan membedakan kebutuhan dari keinginan.",
        color: "green" as const,
    },
    {
        key: "medium" as const,
        title: "Medium",
        topics: "Impulsive Buying · Hutang · Pay Later",
        description:
            "Kenali jebakan belanja impulsif, pahami risiko hutang kartu kredit, dan kebijaksanaan menggunakan Pay Later.",
        color: "blue" as const,
    },
    {
        key: "hard" as const,
        title: "Hard",
        topics: "Pinjol · Investasi · Risk Management",
        description:
            "Waspadai bahaya pinjol ilegal, pelajari dasar investasi, diversifikasi, dan manajemen risiko keuangan.",
        color: "red" as const,
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function LevelSelectPage() {
    const router = useRouter();
    const setLevel = useGameStore((s) => s.setLevel);

    const handleSelectLevel = (level: "easy" | "medium" | "hard") => {
        setLevel(level);
        router.push("/game");
    };

    return (
        <main className="min-h-screen bg-brand-pattern-light bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute z-0 top-[-50px] right-[-50px] w-[200px] h-[200px] rounded-full bg-green-200/30 blur-2xl" />
            <div className="absolute z-0 bottom-[-80px] left-[-40px] w-[250px] h-[250px] rounded-full bg-teal-200/25 blur-3xl" />

            <div className="relative z-10 max-w-4xl mx-auto px-4 py-12 md:py-20">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h1 className="font-fredoka text-4xl md:text-5xl font-bold text-green-700 mb-3">
                        Pilih Level
                    </h1>
                    <p className="text-gray-600 text-lg flex items-center justify-center gap-2">
                        Sesuaikan tantangan dengan kemampuanmu! <Target className="w-6 h-6 text-amber-500" />
                    </p>
                </motion.div>

                {/* Level cards stack */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="flex flex-col gap-5 w-full max-w-lg mx-auto px-4"
                >
                    {(['easy', 'medium', 'hard'] as GameLevel[]).map(level => (
                        <motion.div key={level} variants={itemVariants}>
                            <LevelCard
                                level={level}
                                onSelect={handleSelectLevel}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Back button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-center mt-10"
                >
                    <button
                        onClick={() => router.push("/")}
                        className="text-gray-400 hover:text-gray-600 font-medium text-sm transition-colors flex items-center justify-center gap-1 mx-auto"
                    >
                        <ArrowLeft className="w-4 h-4" /> Kembali ke Menu Utama
                    </button>
                </motion.div>
            </div>
        </main>
    );
}
