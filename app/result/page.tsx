"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { PERFECT_CLEAR_BONUS } from "@/lib/scoring";
import { useGameStore } from "@/store/gameStore";
import LeaderboardTable, {
    type LeaderboardRow,
} from "@/components/ui/LeaderboardTable";
import AppLogo from "@/components/ui/AppLogo";
import Image from "next/image";
import { NEW_RECORD_BANNER, PERFECT_CLEAR_BANNER, VICTORY_ILLUSTRATION } from "@/lib/assets";
import {
    Target,
    Trophy,
    Heart,
    Zap,
    MessageCircle,
    Share2,
    Copy,
    GraduationCap,
    RotateCcw,
    ArrowLeft,
} from 'lucide-react'

type RecordResponse = {
    isNewRecord: boolean;
    previousBest: number;
};

export default function ResultPage() {
    const router = useRouter();
    const { data: session } = useSession();
    type SessionUser = {
        id?: string;
        name?: string | null;
        email?: string | null;
        authProvider?: string;
    };
    const currentUserId = (session?.user as unknown as SessionUser | undefined)
        ?.id;

    const phase = useGameStore((s) => s.phase);
    const level = useGameStore((s) => s.level);
    const score = useGameStore((s) => s.score);
    const maxCombo = useGameStore((s) => s.maxCombo);
    const livesRemaining = useGameStore((s) => s.lives);
    const questionIdx = useGameStore((s) => s.questionIdx);
    const resetGame = useGameStore((s) => s.resetGame);

    const levelLabel = level
        ? ({
            easy: "Easy",
            medium: "Medium",
            hard: "Hard",
        } as const)[level]
        : "—";

    const perfectClear = phase === "finished" && livesRemaining === 3;

    const totalScore = useMemo(() => {
        return score + (perfectClear ? PERFECT_CLEAR_BONUS : 0);
    }, [perfectClear, score]);

    const [isPosting, setIsPosting] = useState(true);
    const [record, setRecord] = useState<RecordResponse | null>(null);
    const [leaderboardRows, setLeaderboardRows] = useState<LeaderboardRow[]>(
        []
    );
    const [copied, setCopied] = useState(false);
    const postOnceRef = useRef(false);

    useEffect(() => {
        const canSubmit =
            phase === "finished" && !!level && !!currentUserId && !postOnceRef.current;

        if (!canSubmit) return;

        postOnceRef.current = true;
        setIsPosting(true);

        const submitAndLoad = async () => {
            try {
                const scoreRes = await fetch("/api/score", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        userId: currentUserId,
                        level,
                        score,
                        maxCombo,
                        livesRemaining,
                    }),
                });

                if (!scoreRes.ok) {
                    throw new Error("Failed to submit score");
                }

                const recordData = (await scoreRes.json()) as RecordResponse;
                setRecord(recordData);

                const lbRes = await fetch(
                    `/api/leaderboard?level=${encodeURIComponent(level)}`
                );

                if (!lbRes.ok) {
                    throw new Error("Failed to fetch leaderboard");
                }

                const lbData = (await lbRes.json()) as LeaderboardRow[];
                setLeaderboardRows(lbData);
            } catch (error) {
                console.error("Result load error:", error);
            } finally {
                setIsPosting(false);
            }
        };

        void submitAndLoad();
    }, [currentUserId, level, livesRemaining, maxCombo, phase, questionIdx, score]);

    const shareText = useMemo(() => {
        return `Saya dapat ${totalScore} poin di ArthaLoka level ${levelLabel}! #ArthaLoka #LiterasiKeuangan`;
    }, [levelLabel, totalScore]);

    const shareUrl = useMemo(() => {
        if (typeof window === "undefined") return "";
        return window.location.href;
    }, []);

    const fullShareText = useMemo(() => {
        return shareUrl ? `${shareText} ${shareUrl}` : shareText;
    }, [shareText, shareUrl]);

    const handleCopyLink = async () => {
        try {
            if (!shareUrl) return;
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 1400);
        } catch (error) {
            console.error("Copy link failed:", error);
        }
    };

    const handleMainAgain = () => {
        resetGame();
        router.push("/game");
    };

    const handleShareWhatsApp = () => {
        const url = `https://wa.me/?text=${encodeURIComponent(fullShareText)}`;
        window.open(url, "_blank", "noopener,noreferrer");
    };

    const handleShareTwitter = () => {
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            fullShareText
        )}`;
        window.open(url, "_blank", "noopener,noreferrer");
    };

    const handleLearn = () => {
        router.push("/learn");
    };

    // Not finished state
    if (phase !== "finished" || !level) {
        return (
            <main
                className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
                style={{
                    background: "linear-gradient(160deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
                }}
            >
                <div className="relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 max-w-md text-center">
                    <Trophy className="w-16 h-16 text-amber-400 mx-auto mb-3" />
                    <h1 className="font-fredoka text-2xl font-bold text-white mb-2">
                        Hasil belum siap
                    </h1>
                    <p className="text-gray-300 text-sm mb-6">
                        Selesaikan permainan terlebih dahulu untuk melihat skor dan leaderboard.
                    </p>
                    <button
                        className="w-full py-3 rounded-2xl font-bold shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-white"
                        style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}
                        onClick={() => router.push("/level-select")}
                    >
                        <ArrowLeft className="w-4 h-4" /> Kembali pilih level
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main
            className="min-h-screen flex flex-col relative overflow-hidden"
            style={{
                background: "linear-gradient(160deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
            }}
        >
            {/* Confetti CSS particles — purely decorative */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
                {Array.from({ length: 20 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full animate-[confettiFall_4s_ease-in_infinite]"
                        style={{
                            width: `${4 + (i % 4) * 3}px`,
                            height: `${4 + (i % 4) * 3}px`,
                            left: `${(i * 5 + 3) % 100}%`,
                            top: "-20px",
                            background: ["#f59e0b", "#22c55e", "#3b82f6", "#a855f7", "#ef4444"][i % 5],
                            animationDelay: `${(i * 0.3) % 3}s`,
                            animationDuration: `${3 + (i % 3)}s`,
                            opacity: 0.7,
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 max-w-lg mx-auto px-4 py-6 w-full">
                {/* Header */}
                <div className="flex items-center justify-center gap-2 mb-6">
                    <Trophy className="w-6 h-6 text-amber-400" />
                    <h1 className="font-fredoka text-xl font-black text-white tracking-wide">
                        HASIL PERMAINAN
                    </h1>
                </div>

                {/* VICTORY ILLUSTRATION */}
                <div className="rounded-2xl overflow-hidden mb-5 shadow-2xl"
                    style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                    <Image
                        src={VICTORY_ILLUSTRATION.src}
                        alt="Selamat! Kamu berhasil menyelesaikan ArthaLoka!"
                        width={VICTORY_ILLUSTRATION.width}
                        height={VICTORY_ILLUSTRATION.height}
                        className="w-full h-auto object-cover"
                        style={{ width: "100%", height: "auto" }}
                        priority
                    />
                </div>

                {/* Score Hero Number */}
                <div className="text-center mb-5">
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">
                        TOTAL POIN
                    </p>

                    {/* Score number dengan glow */}
                    <div className="relative inline-block">
                        {/* Glow layer */}
                        <p
                            className="absolute inset-0 text-center blur-xl opacity-60 select-none font-black"
                            style={{
                                fontSize: "clamp(56px, 12vw, 80px)",
                                color: "#fbbf24",
                                lineHeight: 1,
                            }}
                        >
                            {totalScore.toLocaleString("id-ID")}
                        </p>
                        {/* Actual text */}
                        <p
                            className="relative font-black tabular-nums"
                            style={{
                                fontSize: "clamp(56px, 12vw, 80px)",
                                lineHeight: 1,
                                background: "linear-gradient(180deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            {totalScore.toLocaleString("id-ID")}
                        </p>
                    </div>

                    {/* New Record & Perfect Clear banners */}
                    {record?.isNewRecord && (
                        <div className="mt-3 flex justify-center">
                            <Image
                                src={NEW_RECORD_BANNER.src}
                                alt="New Record!"
                                width={280}
                                height={Math.round(280 * (305 / 1345))}
                                className="object-contain animate-[popIn_0.4s_cubic-bezier(0.34,1.56,0.64,1)]"
                                style={{ width: 280, height: "auto" }}
                                priority
                            />
                        </div>
                    )}
                    {perfectClear && (
                        <div className="mt-2 flex justify-center">
                            <Image
                                src={PERFECT_CLEAR_BANNER.src}
                                alt="Perfect Clear!"
                                width={220}
                                height={Math.round(220 * (165 / 865))}
                                className="object-contain"
                                style={{ width: 220, height: "auto" }}
                            />
                        </div>
                    )}
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                    {[
                        { label: "Level", value: levelLabel, icon: <Target className="w-4 h-4" />, color: "#22c55e" },
                        { label: "Max Combo", value: `${maxCombo}×`, icon: <Zap className="w-4 h-4" />, color: "#f59e0b" },
                        { label: "Nyawa Sisa", value: livesRemaining > 0 ? livesRemaining : "—", icon: <Heart className="w-4 h-4" />, color: "#ef4444" },
                    ].map(({ label, value, icon, color }) => (
                        <div
                            key={label}
                            className="rounded-xl p-3 text-center"
                            style={{
                                background: "rgba(255,255,255,0.06)",
                                border: `1px solid ${color}33`,
                            }}
                        >
                            <div className="flex justify-center mb-1" style={{ color }}>{icon}</div>
                            <p className="text-gray-400 text-[9px] font-bold uppercase tracking-wide mb-0.5">{label}</p>
                            <p
                                className="text-white font-black text-lg leading-tight"
                                style={{ fontFamily: "var(--font-fredoka), Fredoka, cursive" }}
                            >
                                {value}
                            </p>
                            {/* Heart icons untuk nyawa sisa */}
                            {label === "Nyawa Sisa" && typeof value === "number" && (
                                <div className="flex justify-center gap-0.5 mt-1">
                                    {[1, 2, 3].map((n) => (
                                        <Heart
                                            key={n}
                                            className={`w-3 h-3 ${n <= livesRemaining ? "fill-red-500 text-red-500" : "fill-gray-700 text-gray-700"}`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Leaderboard */}
                <section className="mb-5">
                    {isPosting ? (
                        <div
                            className="rounded-2xl p-6 text-center text-gray-400"
                            style={{
                                background: "rgba(255,255,255,0.04)",
                                border: "1px solid rgba(255,255,255,0.1)",
                            }}
                        >
                            Memuat leaderboard...
                        </div>
                    ) : (
                        <LeaderboardTable
                            rows={leaderboardRows}
                            currentUserId={currentUserId}
                        />
                    )}
                </section>

                {/* Share Section */}
                <section className="mb-5">
                    <div
                        className="rounded-2xl p-4"
                        style={{
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.08)",
                        }}
                    >
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest text-center mb-3">
                            Bagikan Hasilmu
                        </p>

                        {/* Share buttons */}
                        <div className="grid grid-cols-3 gap-2">
                            <button
                                onClick={handleShareWhatsApp}
                                className="flex flex-col items-center gap-1 py-2.5 px-2 rounded-xl font-bold text-white text-xs active:scale-95 transition-all"
                                style={{ background: "#25D366" }}
                            >
                                <MessageCircle className="w-4 h-4" />
                                WhatsApp
                            </button>
                            <button
                                onClick={handleShareTwitter}
                                className="flex flex-col items-center gap-1 py-2.5 px-2 rounded-xl font-bold text-white text-xs active:scale-95 transition-all"
                                style={{ background: "#1DA1F2" }}
                            >
                                <Share2 className="w-4 h-4" />
                                Twitter
                            </button>
                            <button
                                onClick={handleCopyLink}
                                className="flex flex-col items-center gap-1 py-2.5 px-2 rounded-xl font-bold text-white text-xs active:scale-95 transition-all"
                                style={{ background: "#6b7280" }}
                            >
                                <Copy className="w-4 h-4" />
                                {copied ? "Disalin!" : "Salin"}
                            </button>
                        </div>
                    </div>
                </section>

                {/* CTA Buttons */}
                <section className="grid grid-cols-2 gap-3 mb-6">
                    <button
                        onClick={handleLearn}
                        className="flex items-center justify-center gap-2 py-3.5 rounded-2xl font-black text-sm transition-all active:scale-95"
                        style={{
                            background: "rgba(255,255,255,0.08)",
                            border: "1.5px solid rgba(255,255,255,0.15)",
                            color: "#e2e8f0",
                        }}
                    >
                        <GraduationCap className="w-4 h-4" />
                        Ruang Belajar
                    </button>
                    <button
                        onClick={handleMainAgain}
                        className="flex items-center justify-center gap-2 py-3.5 rounded-2xl font-black text-sm text-white transition-all active:scale-95"
                        style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}
                    >
                        <RotateCcw className="w-4 h-4" />
                        Main Lagi
                    </button>
                </section>

                {/* Footer Logo */}
                <div className="flex justify-center mb-4 pointer-events-none">
                    <AppLogo variant="horizontal" size="sm" className="opacity-40" />
                </div>
            </div>
        </main>
    );
}
