export const BASE_SCORE = 100;
export const PERFECT_CLEAR_BONUS = 500;

export function getMultiplier(combo: number): number {
    if (combo >= 8) return 3.0;
    if (combo >= 6) return 2.5;
    if (combo >= 4) return 2.0;
    if (combo >= 2) return 1.5;
    return 1.0;
}

export function calculateScore(combo: number): number {
    return Math.round(BASE_SCORE * getMultiplier(combo));
}
