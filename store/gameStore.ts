import { create } from "zustand";

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

    // Scoring
    score: number;
    combo: number;
    maxCombo: number;
    lives: number; // starts at 3

    // Questions
    questions: QuizQuestion[];
    collectedFacts: string[];

    // Actions
    setLevel: (level: "easy" | "medium" | "hard") => void;
    setPlayerInfo: (name: string, isGuest: boolean) => void;
    setPhase: (phase: GamePhase) => void;
    setCharacterPosition: (position: string) => void;
    throwStone: () => void;
    answerQuestion: (answerIndex: number) => Promise<boolean>;
    nextPhase: () => void;
    incrementQuestionIdx: () => void;
    resetGame: () => void;
}

/**
 * Weighted random stone position (1–7).
 * Petak 1 has half the weight of others to avoid landing there too often.
 */
function weightedRandomPetak(): number {
    // Weights: petak 1 = 1, petaks 2-7 = 2 each → total = 13
    const weights = [1, 2, 2, 2, 2, 2, 2]; // index 0 = petak 1
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    let rand = Math.random() * totalWeight;

    for (let i = 0; i < weights.length; i++) {
        rand -= weights[i];
        if (rand <= 0) return i + 1;
    }
    return 7; // fallback
}

/**
 * Compute the forward path from START to head (petak 7).
 * For side-by-side petaks (2/3, 5/6), character goes to the LEFT petak by default
 * UNLESS the stone is on the left petak — then go to the RIGHT petak.
 * Skip any petak that has the stone.
 */
export function getForwardPath(stonePos: number | null): string[] {
    const path: string[] = [];

    // Petak 1 (center)
    if (stonePos !== 1) path.push("1");

    // Petaks 2/3 (side-by-side) — pick one, skip stone
    if (stonePos === 2) {
        path.push("3");
    } else if (stonePos === 3) {
        path.push("2");
    } else {
        // No stone on 2 or 3, go to both (hop on one foot each)
        path.push("2-3");
    }

    // Petak 4 (center)
    if (stonePos !== 4) path.push("4");

    // Petaks 5/6 (side-by-side) — same logic as 2/3
    if (stonePos === 5) {
        path.push("6");
    } else if (stonePos === 6) {
        path.push("5");
    } else {
        path.push("5-6");
    }

    // Petak 7 (kepala / head)
    if (stonePos !== 7) path.push("7");

    return path;
}

/**
 * Compute the backward path from head (petak 7) back to START.
 * Mirror of forward path logic.
 */
export function getBackwardPath(stonePos: number | null): string[] {
    const path: string[] = [];

    // Petak 7
    if (stonePos !== 7) path.push("7");

    // Petaks 5/6
    if (stonePos === 5) {
        path.push("6");
    } else if (stonePos === 6) {
        path.push("5");
    } else {
        path.push("5-6");
    }

    // Petak 4
    if (stonePos !== 4) path.push("4");

    // Petaks 2/3
    if (stonePos === 2) {
        path.push("3");
    } else if (stonePos === 3) {
        path.push("2");
    } else {
        path.push("2-3");
    }

    // Petak 1
    if (stonePos !== 1) path.push("1");

    // Back to start
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

    // Scoring defaults
    score: 0,
    combo: 0,
    maxCombo: 0,
    lives: 3,

    // Questions defaults
    questions: [],
    collectedFacts: [],

    // Actions
    setLevel: (level) => set({ level }),

    setPlayerInfo: (name, isGuest) => set({ playerName: name, isGuest }),

    setPhase: (phase) => set({ phase }),

    setCharacterPosition: (position) => set({ characterPosition: position }),

    throwStone: () => {
        const position = weightedRandomPetak();
        set({ stonePosition: position, phase: "throwing" });
    },

    answerQuestion: async (answerIndex: number): Promise<boolean> => {
        // Stub — will be implemented in Phase 3 with server-side validation
        const state = get();
        console.log(`Answer ${answerIndex} for question ${state.questionIdx}`);
        return true;
    },

    incrementQuestionIdx: () => {
        set((state) => ({ questionIdx: state.questionIdx + 1 }));
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
        }),
}));
