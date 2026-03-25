"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore, getForwardPath, getBackwardPath } from "@/store/gameStore";
import EngklekBoard from "@/components/game/EngklekBoard";
import CountdownOverlay from "@/components/game/CountdownOverlay";
import HUDBar from "@/components/game/HUDBar";

export default function GamePage() {
    const router = useRouter();
    const phase = useGameStore((s) => s.phase);
    const level = useGameStore((s) => s.level);
    const stonePosition = useGameStore((s) => s.stonePosition);
    const roundNum = useGameStore((s) => s.roundNum);
    const setPhase = useGameStore((s) => s.setPhase);
    const throwStone = useGameStore((s) => s.throwStone);
    const nextPhase = useGameStore((s) => s.nextPhase);
    const resetGame = useGameStore((s) => s.resetGame);
    const incrementQuestionIdx = useGameStore((s) => s.incrementQuestionIdx);

    const [showCountdown, setShowCountdown] = useState(true);
    const [animatingPath, setAnimatingPath] = useState<string[]>([]);
    const [statusText, setStatusText] = useState("");
    const phaseHandledRef = useRef<string>("");

    // Redirect if no level selected
    useEffect(() => {
        if (!level) {
            router.push("/level-select");
        }
    }, [level, router]);

    // Reset game on mount
    useEffect(() => {
        resetGame();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Countdown complete → go to idle
    const handleCountdownComplete = useCallback(() => {
        setShowCountdown(false);
        setPhase("idle");
    }, [setPhase]);

    // ── Phase state machine auto-play loop ──
    useEffect(() => {
        // Prevent double-handling the same phase
        const phaseKey = `${phase}-${roundNum}-${stonePosition}`;
        if (phaseHandledRef.current === phaseKey) return;
        phaseHandledRef.current = phaseKey;

        let timer: NodeJS.Timeout;

        switch (phase) {
            case "idle":
                setStatusText("Bersiap melempar batu...");
                timer = setTimeout(() => {
                    throwStone();
                }, 800);
                break;

            case "throwing":
                setStatusText("Melempar batu! 🪨");
                // Stone animation will call onStoneAnimationComplete
                break;

            case "jumping_fwd":
                setStatusText("Melompat maju! 🦘");
                if (stonePosition) {
                    const fwdPath = getForwardPath(stonePosition);

                    // Find the logical position of stone in the sequence
                    const fullSequence = ["1", "2-3", "4", "5-6", "7"];
                    const stoneSeqStr =
                        stonePosition === 2 || stonePosition === 3
                            ? "2-3"
                            : stonePosition === 5 || stonePosition === 6
                                ? "5-6"
                                : stonePosition.toString();
                    const stoneSeqIdx = fullSequence.indexOf(stoneSeqStr);

                    // Jump to positions before the stone (quiz1 triggers before stone)
                    const pathBeforeStone = fwdPath.filter((p) => {
                        const singleIdx = fullSequence.indexOf(
                            p === "2" || p === "3"
                                ? "2-3"
                                : p === "5" || p === "6"
                                    ? "5-6"
                                    : p
                        );
                        return singleIdx < stoneSeqIdx;
                    });

                    setAnimatingPath(pathBeforeStone.length > 0 ? pathBeforeStone : []);

                    // If no steps before stone (stone is on petak 1), go directly to quiz
                    if (pathBeforeStone.length === 0) {
                        timer = setTimeout(() => {
                            setPhase("quiz1");
                            incrementQuestionIdx();
                        }, 500);
                    }
                }
                break;

            case "quiz1":
                setStatusText("📝 Quiz Maju! Jawab pertanyaan...");
                // Phase 3 will add QuizModal. For now, auto-advance after delay.
                timer = setTimeout(() => {
                    setPhase("jumping_continue");
                }, 1500);
                break;

            case "jumping_continue":
                setStatusText("Melanjutkan lompatan! 🦘");
                if (stonePosition) {
                    const fwdPath = getForwardPath(stonePosition);

                    const fullSequence = ["1", "2-3", "4", "5-6", "7"];
                    const stoneStr = stonePosition.toString();
                    const stoneSeqStr =
                        stonePosition === 2 || stonePosition === 3
                            ? "2-3"
                            : stonePosition === 5 || stonePosition === 6
                                ? "5-6"
                                : stoneStr;
                    const stoneSeqIdx = fullSequence.indexOf(stoneSeqStr);

                    // Jump positions AFTER the stone (including stone skip)
                    const pathAfterStone = fwdPath.filter((p) => {
                        const singleIdx = fullSequence.indexOf(
                            p === "2" || p === "3"
                                ? "2-3"
                                : p === "5" || p === "6"
                                    ? "5-6"
                                    : p
                        );
                        return singleIdx > stoneSeqIdx;
                    });

                    setAnimatingPath(pathAfterStone.length > 0 ? pathAfterStone : ["7"]);
                }
                break;

            case "at_head":
                setStatusText("Di ujung! Berbalik... 🔄");
                timer = setTimeout(() => {
                    setPhase("jumping_back");
                }, 800);
                break;

            case "jumping_back":
                setStatusText("Melompat mundur! 🦘");
                if (stonePosition) {
                    const backPath = getBackwardPath(stonePosition);

                    const fullSequence = ["7", "5-6", "4", "2-3", "1", "start"];
                    const stoneStr = stonePosition.toString();
                    const stoneSeqStr =
                        stonePosition === 2 || stonePosition === 3
                            ? "2-3"
                            : stonePosition === 5 || stonePosition === 6
                                ? "5-6"
                                : stoneStr;
                    const stoneSeqIdx = fullSequence.indexOf(stoneSeqStr);

                    // Jump backward until BEFORE the stone (for quiz2)
                    const pathBeforeStone = backPath.filter((p) => {
                        const singleIdx = fullSequence.indexOf(
                            p === "2" || p === "3"
                                ? "2-3"
                                : p === "5" || p === "6"
                                    ? "5-6"
                                    : p
                        );
                        return singleIdx < stoneSeqIdx;
                    });

                    setAnimatingPath(pathBeforeStone.length > 0 ? pathBeforeStone : []);

                    if (pathBeforeStone.length === 0) {
                        timer = setTimeout(() => {
                            setPhase("quiz2");
                            incrementQuestionIdx();
                        }, 500);
                    }
                }
                break;

            case "quiz2":
                setStatusText("📝 Quiz Ambil Batu! Jawab pertanyaan...");
                // Phase 3 will add QuizModal. For now, auto-advance.
                timer = setTimeout(() => {
                    setPhase("pickup");
                }, 1500);
                break;

            case "pickup":
                setStatusText("Mengambil batu! 🪨");
                if (stonePosition) {
                    const backPath = getBackwardPath(stonePosition);

                    const fullSequence = ["7", "5-6", "4", "2-3", "1", "start"];
                    const stoneStr = stonePosition.toString();
                    const stoneSeqStr =
                        stonePosition === 2 || stonePosition === 3
                            ? "2-3"
                            : stonePosition === 5 || stonePosition === 6
                                ? "5-6"
                                : stoneStr;
                    const stoneSeqIdx = fullSequence.indexOf(stoneSeqStr);

                    // Continue from stone position back to start
                    const pathFromStone = backPath.filter((p) => {
                        const singleIdx = fullSequence.indexOf(
                            p === "2" || p === "3"
                                ? "2-3"
                                : p === "5" || p === "6"
                                    ? "5-6"
                                    : p
                        );
                        return singleIdx >= stoneSeqIdx;
                    });

                    // Include 'start' as final destination
                    if (!pathFromStone.includes("start")) {
                        pathFromStone.push("start");
                    }

                    setAnimatingPath(pathFromStone);
                }
                break;

            case "round_done":
                setStatusText(
                    roundNum >= 4
                        ? "🎉 Permainan selesai!"
                        : `✅ Jalan ${roundNum + 1} selesai!`
                );
                timer = setTimeout(() => {
                    nextPhase();
                }, 1200);
                break;

            case "finished":
                setStatusText("🏆 Selesai! Lihat hasil...");
                // In Phase 4, this will redirect to result page
                break;
        }

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [phase, roundNum, stonePosition]); // eslint-disable-line react-hooks/exhaustive-deps

    // ── Animation callbacks ──
    const handleStoneAnimationComplete = useCallback(() => {
        setPhase("jumping_fwd");
    }, [setPhase]);

    const handleCharacterAnimationComplete = useCallback(() => {
        // Determine next phase based on current phase
        const currentPhase = useGameStore.getState().phase;

        if (currentPhase === "jumping_fwd") {
            setPhase("quiz1");
            incrementQuestionIdx();
        } else if (currentPhase === "jumping_continue") {
            setPhase("at_head");
        } else if (currentPhase === "jumping_back") {
            setPhase("quiz2");
            incrementQuestionIdx();
        } else if (currentPhase === "pickup") {
            setPhase("round_done");
        }

        setAnimatingPath([]);
    }, [setPhase, incrementQuestionIdx]);

    if (!level) return null;

    const levelColors = {
        easy: "from-green-50 via-emerald-50 to-teal-50",
        medium: "from-blue-50 via-sky-50 to-cyan-50",
        hard: "from-red-50 via-rose-50 to-pink-50",
    };

    return (
        <main
            className={`min-h-screen bg-gradient-to-br ${levelColors[level]} flex flex-col relative overflow-hidden`}
        >
            {/* Decorative circles */}
            <div className="absolute top-[-60px] left-[-40px] w-[200px] h-[200px] rounded-full bg-green-200/30 blur-2xl" />
            <div className="absolute bottom-[-60px] right-[-40px] w-[220px] h-[220px] rounded-full bg-teal-200/25 blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-emerald-100/20 blur-3xl" />

            {/* Countdown overlay */}
            <AnimatePresence>
                {showCountdown && (
                    <CountdownOverlay onComplete={handleCountdownComplete} />
                )}
            </AnimatePresence>

            {/* HUD */}
            {!showCountdown && (
                <motion.div
                    initial={{ y: -40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                >
                    <HUDBar />
                </motion.div>
            )}

            {/* Game Board */}
            {!showCountdown && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="flex-1 flex flex-col items-center justify-center relative px-4 py-4"
                >
                    {/* Status text */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={statusText}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.3 }}
                            className="mb-4 px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full shadow-sm border border-white/50"
                        >
                            <p className="text-sm font-semibold text-gray-600 text-center">
                                {statusText}
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    {/* Board */}
                    <div className="relative w-full max-w-[360px]">
                        <EngklekBoard
                            onStoneAnimationComplete={handleStoneAnimationComplete}
                            onCharacterAnimationComplete={handleCharacterAnimationComplete}
                            animatingPath={animatingPath}
                        />
                    </div>

                    {/* Finished overlay */}
                    <AnimatePresence>
                        {phase === "finished" && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-3xl"
                            >
                                <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 mx-4 text-center shadow-2xl border border-white/50 max-w-sm">
                                    <div className="text-5xl mb-4">🎉</div>
                                    <h2 className="font-fredoka text-2xl font-bold text-green-600 mb-2">
                                        Permainan Selesai!
                                    </h2>
                                    <p className="text-gray-500 text-sm mb-6">
                                        Kamu telah menyelesaikan 5 jalan engklek!
                                    </p>
                                    <div className="flex flex-col gap-3">
                                        <button
                                            onClick={() => router.push("/level-select")}
                                            className="w-full py-3 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold shadow-lg shadow-green-500/25 hover:shadow-xl transition-all active:scale-[0.98]"
                                        >
                                            🔄 Main Lagi
                                        </button>
                                        <button
                                            onClick={() => router.push("/")}
                                            className="w-full py-3 rounded-2xl bg-white border-2 border-gray-200 text-gray-600 font-bold hover:border-green-400 transition-all active:scale-[0.98]"
                                        >
                                            Menu Utama
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </main>
    );
}
