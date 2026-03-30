"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import dynamic from "next/dynamic";
import {
    useGameStore,
    getForwardPath,
    getBackwardPath,
} from "@/store/gameStore";
const EngklekBoard = dynamic(() => import("@/components/game/EngklekBoard"), {
    ssr: false,
});
const CountdownOverlay = dynamic(
    () => import("@/components/game/CountdownOverlay"),
    { ssr: false }
);
const HUDBar = dynamic<{
    lives: number;
    score: number;
    combo: number;
    roundNum: number;
    questionIdx: number;
}>(() => import("@/components/game/HUDBar"), {
    ssr: false,
});
const QuizModal = dynamic(() => import("@/components/game/QuizModal"), {
    ssr: false,
});
const MascotPopup = dynamic(() => import("@/components/game/MascotPopup"), {
    ssr: false,
});
import { ScorePopup } from "@/components/game/ScorePopup";
import { TutorialModal } from "@/components/game/TutorialModal";

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
    const wobbleKey = useGameStore((s) => s.wobbleKey);
    const setPhase = useGameStore((s) => s.setPhase);
    const throwStone = useGameStore((s) => s.throwStone);
    const nextPhase = useGameStore((s) => s.nextPhase);
    const resetGame = useGameStore((s) => s.resetGame);
    const incrementQuestionIdx = useGameStore((s) => s.incrementQuestionIdx);
    const answerQuestion = useGameStore((s) => s.answerQuestion);
    const fetchQuestions = useGameStore((s) => s.fetchQuestions);
    const dismissMascot = useGameStore((s) => s.dismissMascot);
    const setCharacterExpression = useGameStore((s) => s.setCharacterExpression);
    const setStoneState = useGameStore((s) => s.setStoneState);

    const wobbleControls = useAnimation();

    const [showCountdown, setShowCountdown] = useState(true);
    const [animatingPath, setAnimatingPath] = useState<string[]>([]);
    const [statusText, setStatusText] = useState("");
    const [showQuiz, setShowQuiz] = useState(false);
    const [scorePopupKey, setScorePopupKey] = useState(0);
    const [showTutorial, setShowTutorial] = useState(false);
    const [currentQuizType, setCurrentQuizType] = useState<"quiz1" | "quiz2">(
        "quiz1"
    );
    const phaseHandledRef = useRef<string>("");

    // BUG FIX #5: Use refs for sequential counters to avoid stale state
    const roundRef = useRef(0);
    const qIdxRef = useRef(0);
    const pendingPhaseRef = useRef<{
        quizNum: number;
        stonePos: number;
        round: number;
    } | null>(null);

    // Sync refs with store state
    useEffect(() => {
        roundRef.current = roundNum;
    }, [roundNum]);

    useEffect(() => {
        qIdxRef.current = questionIdx;
    }, [questionIdx]);

    const setQIdx = (val: number) => {
        // We'll just rely on incrementQuestionIdx() for store sync
    };

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

    // Redirect to result page on finished phase
    const redirectedToResultRef = useRef(false);
    useEffect(() => {
        if (phase !== "finished") return;
        if (redirectedToResultRef.current) return;
        redirectedToResultRef.current = true;
        router.push("/result");
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

    useEffect(() => {
        try {
            const seen = localStorage.getItem("arthaloka_tutorial_seen");
            if (!seen) setShowTutorial(true);
        } catch { }
    }, []);

    // ── Phase state machine auto-play loop ──
    useEffect(() => {
        // Handle character expression based on phase
        if (phase === "countdown" || phase === "idle") {
            setCharacterExpression("idle");
        } else if (
            phase === "jumping_fwd" ||
            phase === "jumping_continue" ||
            phase === "jumping_back" ||
            phase === "at_head" ||
            phase === "pickup"
        ) {
            setCharacterExpression("action");
        } else if (phase === "game_over") {
            setCharacterExpression(level === "easy" ? "wrong" : "over");
        }

        // Handle stone state
        if (phase === "throwing") {
            setStoneState("highlight");
        } else {
            setStoneState("normal");
        }

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
                setStatusText("Melempar batu!");
                break;

            case "jumping_fwd":
                setStatusText("Melompat maju!");
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
                            setPhase("quiz1");
                        }, 500);
                    }
                }
                break;

            case "quiz1":
                setStatusText("Quiz Maju! Jawab pertanyaan...");
                // Quiz modal handles this phase
                break;

            case "jumping_continue":
                setStatusText("Melanjutkan lompatan!");
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
                setStatusText("Di ujung! Berbalik...");
                timer = setTimeout(() => {
                    setPhase("jumping_back");
                }, 800);
                break;

            case "jumping_back":
                setStatusText("Melompat mundur!");
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
                            setPhase("quiz2");
                        }, 500);
                    }
                }
                break;

            case "quiz2":
                setStatusText("Quiz Ambil Batu! Jawab pertanyaan...");
                break;

            case "pickup":
                setStatusText("Mengambil batu!");
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
                        ? "Permainan selesai!"
                        : `Jalan ${roundNum + 1} selesai!`
                );
                timer = setTimeout(() => {
                    nextPhase();
                }, 1200);
                break;

            case "finished":
                setStatusText("Selesai! Lihat hasil...");
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
            setPhase("quiz1");
        } else if (currentPhase === "jumping_continue") {
            setPhase("at_head");
        } else if (currentPhase === "jumping_back") {
            setCurrentQuizType("quiz2");
            setShowQuiz(true);
            setPhase("quiz2");
        } else if (currentPhase === "pickup") {
            setPhase("round_done");
        }

        setAnimatingPath([]);
    }, [setPhase]);

    // ── Quiz answer handler ──
    // ── Helper handlers for continuation ──
    const continueAfterQuiz1 = useCallback((stone: number | null, r: number) => {
        setPhase("jumping_continue");
    }, [setPhase]);

    const continueAfterQuiz2 = useCallback((stone: number | null, r: number) => {
        setPhase("pickup");
    }, [setPhase]);

    const handleQuizAnswer = useCallback(
        async (selectedIndex: number) => {
            const q = questions[qIdxRef.current];
            if (!q) return { correct: false, correctIndex: -1 };

            // Capture NOW - before any state updates
            const capturedStonePos = stonePosition;
            const capturedRound = roundRef.current;
            const capturedQuizNum = currentQuizType === "quiz1" ? 1 : 2;

            const res = await answerQuestion(selectedIndex);

            // Wait for answer animation in QuizModal (900ms)
            setTimeout(() => {
                setShowQuiz(false);

                // Increment question index AFTER quiz modal is dismissed
                qIdxRef.current += 1;
                incrementQuestionIdx(); // sync with store

                if (res.correct) {
                    setScorePopupKey((prev) => prev + 1);
                    setCharacterExpression("correct");

                    if (capturedQuizNum === 1) {
                        continueAfterQuiz1(capturedStonePos, capturedRound);
                    } else {
                        continueAfterQuiz2(capturedStonePos, capturedRound);
                    }

                    setTimeout(() => {
                        const currentPhase = useGameStore.getState().phase;
                        if (currentPhase !== "game_over") {
                            setCharacterExpression("idle");
                        }
                    }, 3000);
                } else {
                    setCharacterExpression("wrong");
                    // Save context for mascot close
                    pendingPhaseRef.current = {
                        quizNum: capturedQuizNum,
                        stonePos: capturedStonePos || 0,
                        round: capturedRound,
                    };

                    setTimeout(() => {
                        const currentPhase = useGameStore.getState().phase;
                        if (currentPhase !== "game_over") {
                            setCharacterExpression("idle");
                        }
                    }, 1500);
                }
            }, 900);

            return res;
        },
        [
            questions,
            stonePosition,
            currentQuizType,
            answerQuestion,
            incrementQuestionIdx,
            setCharacterExpression,
            continueAfterQuiz1,
            continueAfterQuiz2,
        ]
    );

    // ── Mascot dismiss → continue game ──
    const handleMascotContinue = useCallback(() => {
        dismissMascot();
        const pending = pendingPhaseRef.current;
        if (!pending) return;
        pendingPhaseRef.current = null;

        const state = useGameStore.getState();
        if (state.lives <= 0) return;

        if (pending.quizNum === 1) {
            continueAfterQuiz1(pending.stonePos, pending.round);
        } else {
            continueAfterQuiz2(pending.stonePos, pending.round);
        }
    }, [dismissMascot, continueAfterQuiz1, continueAfterQuiz2]);

    const handleRestart = useCallback(() => {
        resetGame();
        if (level) {
            fetchQuestions(level);
        }
        setShowCountdown(true);
        setShowQuiz(false);
        phaseHandledRef.current = "";
    }, [resetGame, fetchQuestions, level]);

    // Character wobble (screen shake) on wrong answer.
    useEffect(() => {
        if (wobbleKey <= 0) return;

        wobbleControls.start({
            x: [0, -10, 10, -7, 7, 0],
            rotate: [0, -1.5, 1.5, -0.8, 0.8, 0],
            transition: { duration: 0.45, ease: "easeInOut" },
        });
    }, [wobbleKey, wobbleControls]);

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
                    <HUDBar
                        lives={mascotLives}
                        score={useGameStore.getState().score}
                        combo={useGameStore.getState().combo}
                        roundNum={roundNum}
                        questionIdx={qIdxRef.current}
                    />
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
                                initial={{
                                    opacity: 0,
                                    y: 14,
                                    scale: 0.75,
                                }}
                                animate={{
                                    opacity: 0,
                                    y: -90,
                                    scale: 1.2,
                                }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none"
                            >
                                <span className="font-fredoka text-3xl font-bold text-amber-500 drop-shadow-lg">
                                    +{lastScoreGain}
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Board */}
                    <motion.div
                        className="relative w-full max-w-[360px]"
                        animate={wobbleControls}
                    >
                        <EngklekBoard
                            onStoneAnimationComplete={
                                handleStoneAnimationComplete
                            }
                            onCharacterAnimationComplete={
                                handleCharacterAnimationComplete
                            }
                            animatingPath={animatingPath}
                        />
                    </motion.div>

                    {/* finished phase is handled by redirect to /result */}
                </motion.div>
            )}

            {/* Quiz Modal */}
            <AnimatePresence>
                {showQuiz && qIdxRef.current < questions.length && questions[qIdxRef.current] && (
                    <QuizModal
                        question={questions[qIdxRef.current]}
                        quizType={currentQuizType}
                        onAnswer={handleQuizAnswer}
                        onComplete={() => { }} // Now handled inside handleQuizAnswer
                    />
                )}
            </AnimatePresence>
            <ScorePopup pts={lastScoreGain ?? 0} triggerKey={scorePopupKey} />
            <AnimatePresence>
                {showMascot && (
                    <MascotPopup
                        type={
                            mascotLives === 2
                                ? "wrong1"
                                : mascotLives === 1
                                    ? "wrong2"
                                    : "gameover"
                        }
                        onClose={mascotLives > 0 ? handleMascotContinue : handleRestart}
                    />
                )}
            </AnimatePresence>

            {showTutorial && (
                <TutorialModal onClose={() => setShowTutorial(false)} />
            )}
        </main>
    );
}
