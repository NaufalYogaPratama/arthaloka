import { create } from "zustand";

export interface QuizQuestion {
    id: string;
    questionText: string;
    options: string[];
}

export type GamePhase =
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
    throwStone: () => void;
    answerQuestion: (answerIndex: number) => Promise<boolean>;
    nextPhase: () => void;
    resetGame: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
    // Player defaults
    playerName: "",
    isGuest: true,
    level: null,

    // Game progress defaults
    phase: "idle",
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

    throwStone: () => {
        // Random position 1–7
        const position = Math.floor(Math.random() * 7) + 1;
        set({ stonePosition: position, phase: "throwing" });
    },

    answerQuestion: async (answerIndex: number): Promise<boolean> => {
        // Stub — will be implemented in Phase 3 with server-side validation
        // For now, always return true (correct)
        const state = get();
        console.log(`Answer ${answerIndex} for question ${state.questionIdx}`);
        return true;
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
                });
            }
        } else if (currentIdx >= 0 && currentIdx < phaseOrder.length - 1) {
            set({ phase: phaseOrder[currentIdx + 1] });
        }
    },

    resetGame: () =>
        set({
            phase: "idle",
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
