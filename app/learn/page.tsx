"use client";

import { useRouter } from "next/navigation";
import { useGameStore } from "@/store/gameStore";
import { motion } from "framer-motion";
import Image from "next/image";
import { RUANG_BELAJAR_HERO, getTopicIconsForLevel } from "@/lib/assets";
import { MascotImage } from "@/components/ui/MascotImage";
import Navbar from "@/components/layout/Navbar";
import { GraduationCap, Lightbulb, RotateCcw, Home } from 'lucide-react';

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

    const topicIcons = level ? getTopicIconsForLevel(level) : [];

    return (
        <main className="min-h-screen bg-brand-pattern-light bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex flex-col items-center px-4 py-6 md:py-10 relative overflow-hidden">
            <Navbar />
            <div className="absolute z-0 top-[-60px] left-[-40px] w-[200px] h-[200px] rounded-full bg-green-200/30 blur-2xl" />
            <div className="relative z-10 w-full max-w-2xl mt-16 md:mt-8">
                {/* Hero illustration */}
                <div className="w-full rounded-2xl overflow-hidden mb-6 shadow-sm border border-white/40">
                    <Image
                        src={RUANG_BELAJAR_HERO.src}
                        alt="Ruang Belajar ArthaLoka"
                        width={RUANG_BELAJAR_HERO.width}
                        height={RUANG_BELAJAR_HERO.height}
                        className="w-full h-auto object-cover"
                        style={{ width: '100%', height: 'auto' }}
                        priority
                    />
                </div>

                <div className="text-center mb-6">
                    <h1 className="font-fredoka text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
                        <GraduationCap className="w-8 h-8 text-blue-500" /> Ruang Belajar
                    </h1>
                    <p className="text-sm text-gray-600 font-medium">
                        Fun facts dari soal tadi
                    </p>
                </div>

                {/* Topic Icons */}
                {topicIcons && topicIcons.length > 0 && (
                    <div className="flex justify-center gap-3 mb-6">
                        {topicIcons.map((icon, i) => (
                            <div key={i} className="flex flex-col items-center gap-1 shadow-sm rounded-xl overflow-hidden bg-white/60 border border-white p-1.5 backdrop-blur-sm">
                                <Image
                                    src={icon.src}
                                    alt="Topik pembelajaran"
                                    width={48}
                                    height={Math.round(48 * (icon.height / icon.width))}
                                    className="object-contain rounded-lg"
                                    style={{ width: 48, height: Math.round(48 * (icon.height / icon.width)) }}
                                />
                            </div>
                        ))}
                    </div>
                )}

                {facts.length === 0 ? (
                    <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl p-6 text-center text-gray-600">
                        Belum ada fun fact. Kembali ke hasil permainan
                        terlebih dahulu.
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {facts.map((fact, idx) => (
                            <div
                                key={idx}
                                className={`bg-white rounded-2xl p-4 border-l-4 shadow-sm flex items-start gap-3 animate-[popIn_0.4s_ease-out_both] ${levelLeftBorder}`}
                                style={{ animationDelay: `${idx * 0.1}s` }}
                            >
                                {/* Mascot hanya di card pertama */}
                                {idx === 0 && (
                                    <div className="flex-shrink-0 mt-1">
                                        <MascotImage variant="pesan" displayHeight={60} />
                                    </div>
                                )}

                                {/* Fact text */}
                                <div className="flex-1">
                                    <p className="text-xs text-gray-400 font-bold mb-1">Fun Fact #{idx + 1}</p>
                                    <p className="text-sm text-gray-700 leading-relaxed font-semibold">{fact}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <div className="mt-8">
                    <div className={`mb-3 flex items-center justify-center gap-2`}>
                        <Lightbulb className="w-6 h-6 text-amber-500" />
                        <span className={`font-fredoka text-lg font-bold ${levelTintText}`}>
                            Ingat Selalu:
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
                        className="flex-1 py-3 rounded-2xl bg-white border-2 border-gray-200 text-gray-700 font-bold hover:border-green-400 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                        onClick={() => router.push("/game")}
                    >
                        <RotateCcw className="w-4 h-4" /> Main Lagi
                    </button>
                    <button
                        className="flex-1 py-3 rounded-2xl bg-white border-2 border-gray-200 text-gray-700 font-bold hover:border-amber-300 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                        onClick={() => router.push("/")}
                    >
                        <Home className="w-4 h-4" /> Menu Utama
                    </button>
                </div>
            </div>
        </main>
    );
}
