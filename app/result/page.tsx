"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { PERFECT_CLEAR_BONUS } from "@/lib/scoring";
import { useGameStore } from "@/store/gameStore";
import LeaderboardTable, {
    type LeaderboardRow,
} from "@/components/ui/LeaderboardTable";
import AppLogo from "@/components/ui/AppLogo";

type RecordResponse = {
    isNewRecord: boolean;
    previousBest: number;
};

type ConfettiPiece = {
    dx: number;
    dy: number;
    rot: number;
    delay: number;
    color: string;
};

function makeConfettiPieces(count: number): ConfettiPiece[] {
    const colors = ["#fbbf24", "#f59e0b", "#60a5fa", "#34d399", "#fb7185", "#a78bfa"];
    const pieces: ConfettiPiece[] = [];

    for (let i = 0; i < count; i++) {
        const dx = (Math.random() - 0.5) * 420; // spread left/right
        const dy = 220 + Math.random() * 220; // fall down
        const rot = (Math.random() - 0.5) * 540;
        const delay = Math.random() * 220;
        const color = colors[i % colors.length];
        pieces.push({ dx, dy, rot, delay, color });
    }

    return pieces;
}

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
    const [confettiKey, setConfettiKey] = useState(0);

    const confettiPieces = useMemo(() => {
        if (!record?.isNewRecord) return [];
        return makeConfettiPieces(26);
    }, [record?.isNewRecord]);

    useEffect(() => {
        if (!record?.isNewRecord) return;
        setConfettiKey((k) => k + 1);
    }, [record?.isNewRecord]);

    useEffect(() => {
        const canSubmit =
            phase === "finished" && !!level && !!currentUserId && !postOnceRef.current;

        if (!canSubmit) return;

        postOnceRef.current = true;
        setIsPosting(true);

        const submitAndLoad = async () => {
            try {
                // 1) Submit score (server will add PERFECT CLEAR bonus).
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

                // 2) Load leaderboard for this level.
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
        return `Saya dapat ${totalScore} poin di ArthaLoka level ${levelLabel}! 🎯 #ArthaLoka #LiterasiKeuangan`;
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

    if (phase !== "finished" || !level) {
        return (
            <main className="min-h-screen bg-brand-pattern-light bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center px-4 relative">
                <div className="absolute z-0 top-[-60px] left-[-40px] w-[200px] h-[200px] rounded-full bg-green-200/30 blur-2xl" />
                <div className="absolute z-0 bottom-[-60px] right-[-40px] w-[220px] h-[220px] rounded-full bg-teal-200/25 blur-3xl" />
                <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl shadow-2xl p-8 max-w-md text-center relative z-10">
                    <div className="text-6xl mb-3">🎯</div>
                    <h1 className="font-fredoka text-2xl font-bold text-gray-800 mb-2">
                        Hasil belum siap
                    </h1>
                    <p className="text-gray-600 text-sm mb-6">
                        Selesaikan permainan terlebih dahulu untuk melihat
                        skor dan leaderboard.
                    </p>
                    <button
                        className="w-full py-3 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold shadow-lg shadow-green-500/25 hover:shadow-xl transition-all active:scale-[0.98]"
                        onClick={() => router.push("/level-select")}
                    >
                        ← Kembali pilih level
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-brand-pattern-light bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex flex-col relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute z-0 top-[-60px] left-[-40px] w-[200px] h-[200px] rounded-full bg-green-200/30 blur-2xl" />
            <div className="absolute z-0 bottom-[-60px] right-[-40px] w-[220px] h-[220px] rounded-full bg-teal-200/25 blur-3xl" />

            <div className="relative z-10 max-w-4xl mx-auto px-4 py-10 md:py-14 w-full">
                <div className="flex flex-col items-center text-center">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-3xl">🏆</span>
                        <h1 className="font-fredoka text-3xl md:text-4xl font-bold text-gray-800">
                            Hasil Permainan
                        </h1>
                    </div>

                    {/* NEW RECORD banner */}
                    {record?.isNewRecord && (
                        <div className="w-full max-w-xl mb-4">
                            <div className="animate-popIn animate-glowPulse bg-amber-100/90 border border-amber-200 text-amber-800 font-bold rounded-2xl px-4 py-3 shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2">
                                <span className="text-lg md:text-xl">
                                    🌟 NEW RECORD! 🌟
                                </span>
                            </div>
                        </div>
                    )}

                    {/* PERFECT CLEAR banner */}
                    {perfectClear && (
                        <div className="w-full max-w-xl mb-5">
                            <div className="bg-green-100/90 border border-green-200 text-green-800 font-bold rounded-2xl px-4 py-3 shadow-lg shadow-green-500/10">
                                ⭐ PERFECT CLEAR! +{PERFECT_CLEAR_BONUS} Bonus
                                Poin!
                            </div>
                        </div>
                    )}

                    {/* Confetti */}
                    {record?.isNewRecord && (
                        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                            <div
                                key={confettiKey}
                                className="relative w-full h-full"
                            >
                                {confettiPieces.map((p, idx) => {
                                    const style: CSSProperties =
                                        {
                                            ["--dx" as string]: `${p.dx}px`,
                                            ["--dy" as string]: `${p.dy}px`,
                                            ["--rot" as string]: `${p.rot}deg`,
                                            ["--delay" as string]: `${p.delay}ms`,
                                            ["--pieceColor" as string]:
                                                p.color,
                                        } as CSSProperties;

                                    return (
                                        <span
                                            key={idx}
                                            className="confetti-piece"
                                            style={style}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Total score */}
                    <div className="w-full max-w-xl rounded-3xl bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl p-6 md:p-8 mb-6">
                        <p className="text-sm text-gray-500 mb-1 font-semibold">
                            Total Poin
                        </p>
                        <div className="flex items-baseline justify-center gap-3">
                            <span
                                className={`font-fredoka text-6xl md:text-7xl font-bold text-amber-500 drop-shadow-lg ${record?.isNewRecord
                                        ? "animate-glowPulse"
                                        : ""
                                    }`}
                            >
                                {totalScore}
                            </span>
                            <span className="text-xl md:text-2xl text-amber-400 font-fredoka font-bold">
                                🎯
                            </span>
                        </div>
                    </div>

                    {/* Stats grid */}
                    <div className="w-full max-w-xl grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-2xl p-4 text-center">
                            <p className="text-xs text-gray-500 font-semibold">
                                Level
                            </p>
                            <p className="font-fredoka text-xl font-bold text-gray-800">
                                {levelLabel}
                            </p>
                        </div>
                        <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-2xl p-4 text-center">
                            <p className="text-xs text-gray-500 font-semibold">
                                Max Combo
                            </p>
                            <p className="font-fredoka text-xl font-bold text-gray-800">
                                {maxCombo}
                            </p>
                        </div>
                        <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-2xl p-4 text-center">
                            <p className="text-xs text-gray-500 font-semibold">
                                Nyawa Sisa
                            </p>
                            <p className="font-fredoka text-xl font-bold text-gray-800">
                                {livesRemaining} ❤️
                            </p>
                        </div>
                    </div>
                </div>

                {/* Leaderboard */}
                <section className="mb-8">
                    {isPosting ? (
                        <div className="bg-white/70 border border-white/50 rounded-2xl p-6 text-center text-gray-600">
                            Memuat leaderboard...
                        </div>
                    ) : (
                        <LeaderboardTable
                            rows={leaderboardRows}
                            currentUserId={currentUserId}
                        />
                    )}
                </section>

                {/* Share */}
                <section className="mb-8">
                    <div className="bg-white/70 border border-white/50 rounded-2xl p-5">
                        <h2 className="font-fredoka text-xl font-bold text-gray-800 mb-3">
                            Share Hasil
                        </h2>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                className="flex-1 py-3 rounded-2xl bg-green-500/90 hover:bg-green-500 text-white font-bold shadow-lg shadow-green-500/20 transition-all active:scale-[0.98]"
                                onClick={handleShareWhatsApp}
                            >
                                WhatsApp
                            </button>
                            <button
                                className="flex-1 py-3 rounded-2xl bg-sky-500/90 hover:bg-sky-500 text-white font-bold shadow-lg shadow-sky-500/20 transition-all active:scale-[0.98]"
                                onClick={handleShareTwitter}
                            >
                                Twitter/X
                            </button>
                            <button
                                className="flex-1 py-3 rounded-2xl bg-white border-2 border-gray-200 text-gray-700 font-bold hover:border-amber-300 transition-all active:scale-[0.98]"
                                onClick={handleCopyLink}
                            >
                                {copied ? "Link Disalin!" : "Copy Link"}
                            </button>
                        </div>
                    </div>
                </section>

                {/* Actions */}
                <section className="flex flex-col sm:flex-row gap-3">
                    <button
                        className="flex-1 py-3.5 rounded-2xl bg-white border-2 border-gray-200 text-gray-700 font-bold hover:border-green-400 transition-all active:scale-[0.98]"
                        onClick={() => router.push("/learn")}
                    >
                        📚 Ruang Belajar
                    </button>
                    <button
                        className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 text-white font-bold shadow-lg shadow-amber-500/20 hover:shadow-xl transition-all active:scale-[0.98]"
                        onClick={handleMainAgain}
                    >
                        🔄 Main Lagi
                    </button>
                </section>

                <div className="flex justify-center mt-10 mb-4 pointer-events-none">
                    <AppLogo variant="horizontal" size="sm" className="opacity-60 grayscale hover:grayscale-0 transition-all" />
                </div>
            </div>
        </main>
    );
}

