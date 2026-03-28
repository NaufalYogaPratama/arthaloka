import { create } from "zustand";
import { calculateScore, getMultiplier } from "@/lib/scoring";
import type { CharacterExpression, StoneState, ArrowDirection, ArrowStyle } from "@/types/game";

export interface QuizQuestion {
    id: string;
    questionText: string;
    options: string[];
}

export type GamePhase =
    | "countdown"
    | "idle"
    | "throwing"
    | "jumping_fwd"
    | "quiz1"
    | "jumping_continue"
    | "at_head"
    | "jumping_back"
    | "quiz2"
    | "pickup"
    | "round_done"
    | "finished"
    | "game_over";

export interface GameState {
    // Player
    playerName: string;
    isGuest: boolean;
    level: "easy" | "medium" | "hard" | null;

    // Game progress
    phase: GamePhase;
    roundNum: number; // 0–4 (5 rounds total)
    questionIdx: number; // 0–9 (10 questions total)

    // Board state
    stonePosition: number | null; // 1–7
    characterPosition: string; // 'start' | '1'–'7'
    characterExpression: CharacterExpression;
    stoneState: StoneState;
    arrowDirection: ArrowDirection | null;
    arrowStyle: ArrowStyle;
    showArrow: boolean;

    // Scoring
    score: number;
    combo: number;
    maxCombo: number;
    lives: number; // starts at 3

    // Questions
    questions: QuizQuestion[];
    collectedFacts: string[];

    // Mascot popup state
    showMascot: boolean;
    mascotLives: number;

    // Score animation
    lastScoreGain: number | null;
    // Used to trigger a shake/wobble animation when answering wrong.
    wobbleKey: number;

    // Actions
    setLevel: (level: "easy" | "medium" | "hard") => void;
    setPlayerInfo: (name: string, isGuest: boolean) => void;
    setPhase: (phase: GamePhase) => void;
    setCharacterPosition: (position: string) => void;
    setCharacterExpression: (expr: CharacterExpression) => void;
    setStoneState: (state: StoneState) => void;
    showPathArrow: (direction: ArrowDirection, style: ArrowStyle) => void;
    hideArrow: () => void;
    setQuestions: (questions: QuizQuestion[]) => void;
    throwStone: () => void;
    answerQuestion: (
        answerIndex: number
    ) => Promise<{ correct: boolean; correctIndex: number }>;
    fetchQuestions: (level: string) => Promise<void>;
    nextPhase: () => void;
    incrementQuestionIdx: () => void;
    dismissMascot: () => void;
    resetGame: () => void;
}

/**
 * Weighted random stone position (1–7).
 * Petak 1 has half the weight of others to avoid landing there too often.
 */
function weightedRandomPetak(): number {
    const weights = [1, 2, 2, 2, 2, 2, 2];
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    let rand = Math.random() * totalWeight;

    for (let i = 0; i < weights.length; i++) {
        rand -= weights[i];
        if (rand <= 0) return i + 1;
    }
    return 7;
}

/**
 * Compute the forward path from START to head (petak 7).
 */
export function getForwardPath(stonePos: number | null): string[] {
    const path: string[] = [];

    if (stonePos !== 1) path.push("1");

    if (stonePos === 2) {
        path.push("3");
    } else if (stonePos === 3) {
        path.push("2");
    } else {
        path.push("2-3");
    }

    if (stonePos !== 4) path.push("4");

    if (stonePos === 5) {
        path.push("6");
    } else if (stonePos === 6) {
        path.push("5");
    } else {
        path.push("5-6");
    }

    if (stonePos !== 7) path.push("7");

    return path;
}

/**
 * Compute the backward path from head (petak 7) back to START.
 */
export function getBackwardPath(stonePos: number | null): string[] {
    const path: string[] = [];

    if (stonePos !== 7) path.push("7");

    if (stonePos === 5) {
        path.push("6");
    } else if (stonePos === 6) {
        path.push("5");
    } else {
        path.push("5-6");
    }

    if (stonePos !== 4) path.push("4");

    if (stonePos === 2) {
        path.push("3");
    } else if (stonePos === 3) {
        path.push("2");
    } else {
        path.push("2-3");
    }

    if (stonePos !== 1) path.push("1");

    path.push("start");

    return path;
}

export const useGameStore = create<GameState>((set, get) => ({
    // Player defaults
    playerName: "",
    isGuest: true,
    level: null,

    // Game progress defaults
    phase: "countdown",
    roundNum: 0,
    questionIdx: 0,

    // Board defaults
    stonePosition: null,
    characterPosition: "start",
    characterExpression: "idle",
    stoneState: "normal",
    arrowDirection: null,
    arrowStyle: "dashed",
    showArrow: false,

    // Scoring defaults
    score: 0,
    combo: 0,
    maxCombo: 0,
    lives: 3,

    // Questions defaults
    questions: [],
    collectedFacts: [],

    // Mascot state
    showMascot: false,
    mascotLives: 3,

    // Score animation
    lastScoreGain: null,
    wobbleKey: 0,

    // Actions
    setLevel: (level) => set({ level }),

    setPlayerInfo: (name, isGuest) => set({ playerName: name, isGuest }),

    setPhase: (phase) => set({ phase }),

    setCharacterPosition: (position) => set({ characterPosition: position }),

    setCharacterExpression: (expr) => set({ characterExpression: expr }),

    setStoneState: (state) => set({ stoneState: state }),

    showPathArrow: (direction, style) => set({ arrowDirection: direction, arrowStyle: style, showArrow: true }),

    hideArrow: () => set({ showArrow: false, arrowDirection: null }),

    setQuestions: (questions) => set({ questions }),

    throwStone: () => {
        const position = weightedRandomPetak();
        set({ stonePosition: position, phase: "throwing" });
    },

    fetchQuestions: async (level: string) => {
        try {
            const res = await fetch(`/api/quiz?level=${level}`);
            if (!res.ok) throw new Error("Failed to fetch questions");
            const questions = await res.json();
            set({ questions });
        } catch (error) {
            console.error("Failed to fetch questions:", error);
        }
    },

    answerQuestion: async (answerIndex: number) => {
        const state = get();
        const currentQuestion = state.questions[state.questionIdx];

        if (!currentQuestion) {
            // Fallback if no question loaded
            return { correct: true, correctIndex: answerIndex };
        }

        try {
            const res = await fetch("/api/quiz/validate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    questionId: currentQuestion.id,
                    selectedIndex: answerIndex,
                }),
            });

            if (!res.ok) throw new Error("Validation failed");

            const data = await res.json();
            const { correct, educationalFact, correctIndex } = data;

            if (correct) {
                // ✅ Correct answer
                const newCombo = state.combo + 1;
                const points = calculateScore(newCombo);
                const newMaxCombo = Math.max(state.maxCombo, newCombo);

                set({
                    combo: newCombo,
                    maxCombo: newMaxCombo,
                    score: state.score + points,
                    lastScoreGain: points,
                    collectedFacts: [...state.collectedFacts, educationalFact],
                });

                // Clear score gain display after animation
                setTimeout(() => set({ lastScoreGain: null }), 1500);
            } else {
                // ❌ Wrong answer
                const newLives = state.lives - 1;
                const newWobbleKey = state.wobbleKey + 1;

                set({
                    lives: newLives,
                    combo: 0,
                    lastScoreGain: null,
                    collectedFacts: [...state.collectedFacts, educationalFact],
                    showMascot: true,
                    mascotLives: newLives,
                    wobbleKey: newWobbleKey,
                });

                if (newLives <= 0) {
                    set({ phase: "game_over" });
                }
            }

            return { correct, correctIndex };
        } catch (error) {
            console.error("Answer validation error:", error);
            // Fallback: treat as correct to not block game
            return { correct: true, correctIndex: answerIndex };
        }
    },

    incrementQuestionIdx: () => {
        set((state) => ({ questionIdx: state.questionIdx + 1 }));
    },

    dismissMascot: () => {
        set({ showMascot: false });
    },

    nextPhase: () => {
        const state = get();
        const phaseOrder: GamePhase[] = [
            "idle",
            "throwing",
            "jumping_fwd",
            "quiz1",
            "jumping_continue",
            "at_head",
            "jumping_back",
            "quiz2",
            "pickup",
            "round_done",
        ];

        const currentIdx = phaseOrder.indexOf(state.phase);

        if (state.phase === "round_done") {
            if (state.roundNum >= 4) {
                set({ phase: "finished" });
            } else {
                set({
                    phase: "idle",
                    roundNum: state.roundNum + 1,
                    stonePosition: null,
                    characterPosition: "start",
                });
            }
        } else if (currentIdx >= 0 && currentIdx < phaseOrder.length - 1) {
            set({ phase: phaseOrder[currentIdx + 1] });
        }
    },

    resetGame: () =>
        set({
            phase: "countdown",
            roundNum: 0,
            questionIdx: 0,
            stonePosition: null,
            characterPosition: "start",
            score: 0,
            combo: 0,
            maxCombo: 0,
            lives: 3,
            questions: [],
            collectedFacts: [],
            showMascot: false,
            mascotLives: 3,
            lastScoreGain: null,
            wobbleKey: 0,
            characterExpression: "idle",
            stoneState: "normal",
            arrowDirection: null,
            arrowStyle: "dashed",
            showArrow: false,
        }),
}));
