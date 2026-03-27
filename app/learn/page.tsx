"use client";

import { useRouter } from "next/navigation";
import { useGameStore } from "@/store/gameStore";
import { motion } from "framer-motion";

export default function LearnPage() {
    const router = useRouter();
    const level = useGameStore((s) => s.level);
    const facts = useGameStore((s) => s.collectedFacts);

    const levelLeftBorder =
        level === "easy"
            ? "border-l-green-500"
            : level === "medium"
                ? "border-l-blue-500"
                : level === "hard"
                    ? "border-l-red-500"
                    : "border-l-gray-300";

    const levelTintText =
        level === "easy"
            ? "text-green-700"
            : level === "medium"
                ? "text-blue-700"
                : level === "hard"
                    ? "text-red-700"
                    : "text-gray-600";

    return (
        <main className="min-h-screen bg-brand-pattern-light bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex flex-col items-center px-4 py-10 relative overflow-hidden">
            <div className="absolute z-0 top-[-60px] left-[-40px] w-[200px] h-[200px] rounded-full bg-green-200/30 blur-2xl" />
            <div className="relative z-10 w-full max-w-3xl">
                <h1 className="font-fredoka text-3xl font-bold text-gray-800 text-center mb-4">
                    📚 Ruang Belajar
                </h1>
                <p className="text-center text-gray-600 text-sm mb-8">
                    Materi akan muncul setelah Fase 5. Saat ini, berikut
                    ringkasan fun-facts yang kamu dapat selama bermain.
                </p>

                {facts.length === 0 ? (
                    <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl p-6 text-center text-gray-600">
                        Belum ada fun fact. Kembali ke hasil permainan
                        terlebih dahulu.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {facts.map((fact, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 14 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.45,
                                    delay: idx * 0.1,
                                    ease: "easeOut",
                                }}
                                className={`bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl p-4 shadow-sm border-l-4 ${levelLeftBorder}`}
                            >
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {fact}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Tips section */}
                <div className="mt-8">
                    <div className={`mb-3 flex items-center justify-center`}>
                        <span className={`font-fredoka text-lg font-bold ${levelTintText}`}>
                            💡 Ingat Selalu:
                        </span>
                    </div>
                    <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-2xl p-4">
                        <ul className="text-sm text-gray-600 space-y-2 list-disc pl-5">
                            <li>
                                Pisahkan kebutuhan vs keinginan sebelum
                                belanja.
                            </li>
                            <li>
                                Sisihkan dana darurat untuk menghindari
                                keputusan finansial darurat.
                            </li>
                            <li>
                                Cek legalitas & risiko produk keuangan
                                sebelum digunakan.
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-8">
                    <button
                        className="flex-1 py-3 rounded-2xl bg-white border-2 border-gray-200 text-gray-700 font-bold hover:border-green-400 transition-all active:scale-[0.98]"
                        onClick={() => router.push("/game")}
                    >
                        🔄 Main Lagi
                    </button>
                    <button
                        className="flex-1 py-3 rounded-2xl bg-white border-2 border-gray-200 text-gray-700 font-bold hover:border-amber-300 transition-all active:scale-[0.98]"
                        onClick={() => router.push("/")}
                    >
                        ← Menu Utama
                    </button>
                </div>
            </div>
        </main>
    );
}

