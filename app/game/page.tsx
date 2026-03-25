"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    useGameStore,
    getForwardPath,
    getBackwardPath,
} from "@/store/gameStore";
import EngklekBoard from "@/components/game/EngklekBoard";
import CountdownOverlay from "@/components/game/CountdownOverlay";
import HUDBar from "@/components/game/HUDBar";
import QuizModal from "@/components/game/QuizModal";
import MascotPopup from "@/components/game/MascotPopup";

export default function GamePage() {
    const router = useRouter();
    const phase = useGameStore((s) => s.phase);
    const level = useGameStore((s) => s.level);
    const stonePosition = useGameStore((s) => s.stonePosition);
    const roundNum = useGameStore((s) => s.roundNum);
    const questionIdx = useGameStore((s) => s.questionIdx);
    const questions = useGameStore((s) => s.questions);
    const showMascot = useGameStore((s) => s.showMascot);
    const mascotLives = useGameStore((s) => s.mascotLives);
    const lastScoreGain = useGameStore((s) => s.lastScoreGain);
    const setPhase = useGameStore((s) => s.setPhase);
    const throwStone = useGameStore((s) => s.throwStone);
    const nextPhase = useGameStore((s) => s.nextPhase);
    const resetGame = useGameStore((s) => s.resetGame);
    const incrementQuestionIdx = useGameStore((s) => s.incrementQuestionIdx);
    const answerQuestion = useGameStore((s) => s.answerQuestion);
    const fetchQuestions = useGameStore((s) => s.fetchQuestions);
    const dismissMascot = useGameStore((s) => s.dismissMascot);

    const [showCountdown, setShowCountdown] = useState(true);
    const [animatingPath, setAnimatingPath] = useState<string[]>([]);
    const [statusText, setStatusText] = useState("");
    const [showQuiz, setShowQuiz] = useState(false);
    const [currentQuizType, setCurrentQuizType] = useState<"quiz1" | "quiz2">(
        "quiz1"
    );
    const phaseHandledRef = useRef<string>("");
    const quizPendingPhaseRef = useRef<GamePhase | null>(null);

    // Type import for quiz phase tracking
    type GamePhase = Parameters<typeof setPhase>[0];

    // Redirect if no level selected
    useEffect(() => {
        if (!level) {
            router.push("/level-select");
        }
    }, [level, router]);

    // Reset game & fetch questions on mount
    useEffect(() => {
        resetGame();
        if (level) {
            fetchQuestions(level);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Redirect to game-over on game_over phase
    useEffect(() => {
        if (phase === "game_over") {
            router.push("/game-over");
        }
    }, [phase, router]);

    // Countdown complete → go to idle
    const handleCountdownComplete = useCallback(() => {
        setShowCountdown(false);
        setPhase("idle");
    }, [setPhase]);

    // ── Path position helpers ──
    const getStoneSeqIdx = useCallback(
        (sp: number) => {
            const fullSequence = ["1", "2-3", "4", "5-6", "7"];
            const stoneSeqStr =
                sp === 2 || sp === 3
                    ? "2-3"
                    : sp === 5 || sp === 6
                        ? "5-6"
                        : sp.toString();
            return fullSequence.indexOf(stoneSeqStr);
        },
        []
    );

    const filterBySequence = useCallback(
        (
            path: string[],
            sequence: string[],
            stoneSeqIdx: number,
            before: boolean
        ) => {
            return path.filter((p) => {
                const singleIdx = sequence.indexOf(
                    p === "2" || p === "3"
                        ? "2-3"
                        : p === "5" || p === "6"
                            ? "5-6"
                            : p
                );
                return before
                    ? singleIdx < stoneSeqIdx
                    : singleIdx > stoneSeqIdx;
            });
        },
        []
    );

    // ── Phase state machine auto-play loop ──
    useEffect(() => {
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
                break;

            case "jumping_fwd":
                setStatusText("Melompat maju! 🦘");
                if (stonePosition) {
                    const fwdPath = getForwardPath(stonePosition);
                    const fwdSeq = ["1", "2-3", "4", "5-6", "7"];
                    const stoneIdx = getStoneSeqIdx(stonePosition);

                    const pathBeforeStone = filterBySequence(
                        fwdPath,
                        fwdSeq,
                        stoneIdx,
                        true
                    );

                    setAnimatingPath(
                        pathBeforeStone.length > 0 ? pathBeforeStone : []
                    );

                    if (pathBeforeStone.length === 0) {
                        timer = setTimeout(() => {
                            // Show quiz
                            setCurrentQuizType("quiz1");
                            setShowQuiz(true);
                            quizPendingPhaseRef.current = "jumping_continue";
                            setPhase("quiz1");
                        }, 500);
                    }
                }
                break;

            case "quiz1":
                setStatusText("📝 Quiz Maju! Jawab pertanyaan...");
                // Quiz modal handles this phase
                break;

            case "jumping_continue":
                setStatusText("Melanjutkan lompatan! 🦘");
                if (stonePosition) {
                    const fwdPath = getForwardPath(stonePosition);
                    const fwdSeq = ["1", "2-3", "4", "5-6", "7"];
                    const stoneIdx = getStoneSeqIdx(stonePosition);

                    const pathAfterStone = filterBySequence(
                        fwdPath,
                        fwdSeq,
                        stoneIdx,
                        false
                    );

                    setAnimatingPath(
                        pathAfterStone.length > 0 ? pathAfterStone : ["7"]
                    );
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
                    const backSeq = [
                        "7",
                        "5-6",
                        "4",
                        "2-3",
                        "1",
                        "start",
                    ];
                    const stoneStr = stonePosition.toString();
                    const stoneSeqStr =
                        stonePosition === 2 || stonePosition === 3
                            ? "2-3"
                            : stonePosition === 5 || stonePosition === 6
                                ? "5-6"
                                : stoneStr;
                    const stoneSeqIdx = backSeq.indexOf(stoneSeqStr);

                    const pathBeforeStone = backPath.filter((p) => {
                        const singleIdx = backSeq.indexOf(
                            p === "2" || p === "3"
                                ? "2-3"
                                : p === "5" || p === "6"
                                    ? "5-6"
                                    : p
                        );
                        return singleIdx < stoneSeqIdx;
                    });

                    setAnimatingPath(
                        pathBeforeStone.length > 0 ? pathBeforeStone : []
                    );

                    if (pathBeforeStone.length === 0) {
                        timer = setTimeout(() => {
                            setCurrentQuizType("quiz2");
                            setShowQuiz(true);
                            quizPendingPhaseRef.current = "pickup";
                            setPhase("quiz2");
                        }, 500);
                    }
                }
                break;

            case "quiz2":
                setStatusText("📝 Quiz Ambil Batu! Jawab pertanyaan...");
                break;

            case "pickup":
                setStatusText("Mengambil batu! 🪨");
                if (stonePosition) {
                    const backPath = getBackwardPath(stonePosition);
                    const backSeq = [
                        "7",
                        "5-6",
                        "4",
                        "2-3",
                        "1",
                        "start",
                    ];
                    const stoneStr = stonePosition.toString();
                    const stoneSeqStr =
                        stonePosition === 2 || stonePosition === 3
                            ? "2-3"
                            : stonePosition === 5 || stonePosition === 6
                                ? "5-6"
                                : stoneStr;
                    const stoneSeqIdx = backSeq.indexOf(stoneSeqStr);

                    const pathFromStone = backPath.filter((p) => {
                        const singleIdx = backSeq.indexOf(
                            p === "2" || p === "3"
                                ? "2-3"
                                : p === "5" || p === "6"
                                    ? "5-6"
                                    : p
                        );
                        return singleIdx >= stoneSeqIdx;
                    });

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
        const currentPhase = useGameStore.getState().phase;

        if (currentPhase === "jumping_fwd") {
            setCurrentQuizType("quiz1");
            setShowQuiz(true);
            quizPendingPhaseRef.current = "jumping_continue";
            setPhase("quiz1");
            incrementQuestionIdx();
        } else if (currentPhase === "jumping_continue") {
            setPhase("at_head");
        } else if (currentPhase === "jumping_back") {
            setCurrentQuizType("quiz2");
            setShowQuiz(true);
            quizPendingPhaseRef.current = "pickup";
            setPhase("quiz2");
            incrementQuestionIdx();
        } else if (currentPhase === "pickup") {
            setPhase("round_done");
        }

        setAnimatingPath([]);
    }, [setPhase, incrementQuestionIdx]);

    // ── Quiz answer handler ──
    const handleQuizAnswer = useCallback(
        async (selectedIndex: number) => {
            return await answerQuestion(selectedIndex);
        },
        [answerQuestion]
    );

    // ── Quiz complete (auto-close modal and advance) ──
    const handleQuizComplete = useCallback(() => {
        setShowQuiz(false);
        const state = useGameStore.getState();

        // Don't advance if game over
        if (state.lives <= 0 || state.phase === "game_over") return;

        // If mascot is showing (wrong answer), wait for mascot dismiss
        if (state.showMascot) return;

        // Advance to next phase
        const pendingPhase = quizPendingPhaseRef.current;
        if (pendingPhase) {
            setPhase(pendingPhase);
            quizPendingPhaseRef.current = null;
        }
    }, [setPhase]);

    // ── Mascot dismiss → continue game ──
    const handleMascotContinue = useCallback(() => {
        dismissMascot();
        const state = useGameStore.getState();

        if (state.lives <= 0) return;

        // Advance to the pending phase
        const pendingPhase = quizPendingPhaseRef.current;
        if (pendingPhase) {
            setPhase(pendingPhase);
            quizPendingPhaseRef.current = null;
        }
    }, [dismissMascot, setPhase]);

    const handleRestart = useCallback(() => {
        resetGame();
        if (level) {
            fetchQuestions(level);
        }
        setShowCountdown(true);
        setShowQuiz(false);
        phaseHandledRef.current = "";
    }, [resetGame, fetchQuestions, level]);

    if (!level) return null;

    const levelColors = {
        easy: "from-green-50 via-emerald-50 to-teal-50",
        medium: "from-blue-50 via-sky-50 to-cyan-50",
        hard: "from-red-50 via-rose-50 to-pink-50",
    };

    const currentQuestion = questions[questionIdx] || null;

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

                    {/* Floating score gain */}
                    <AnimatePresence>
                        {lastScoreGain && (
                            <motion.div
                                key={`score-${Date.now()}`}
                                initial={{ opacity: 1, y: 0, scale: 0.5 }}
                                animate={{ opacity: 0, y: -60, scale: 1.2 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="absolute top-1/3 left-1/2 -translate-x-1/2 z-30"
                            >
                                <span className="font-fredoka text-3xl font-bold text-amber-500 drop-shadow-lg">
                                    +{lastScoreGain}
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Board */}
                    <div className="relative w-full max-w-[360px]">
                        <EngklekBoard
                            onStoneAnimationComplete={
                                handleStoneAnimationComplete
                            }
                            onCharacterAnimationComplete={
                                handleCharacterAnimationComplete
                            }
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
                                        Kamu telah menyelesaikan 5 jalan
                                        engklek!
                                    </p>
                                    <div className="flex flex-col gap-3">
                                        <button
                                            onClick={() =>
                                                router.push("/level-select")
                                            }
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

            {/* Quiz Modal */}
            <AnimatePresence>
                {showQuiz && currentQuestion && (
                    <QuizModal
                        question={currentQuestion}
                        quizType={currentQuizType}
                        onAnswer={handleQuizAnswer}
                        onComplete={handleQuizComplete}
                    />
                )}
            </AnimatePresence>

            {/* Mascot Popup */}
            <AnimatePresence>
                {showMascot && (
                    <MascotPopup
                        livesRemaining={mascotLives}
                        onContinue={handleMascotContinue}
                        onRestart={handleRestart}
                    />
                )}
            </AnimatePresence>
        </main>
    );
}
