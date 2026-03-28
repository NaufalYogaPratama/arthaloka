import type { GameLevel, CharacterExpression, MascotVariant, ArrowDirection, ArrowStyle, StoneState } from '@/types/game'

// ── Mascot ──────────────────────────────────────────────
const MASCOT_FILES: Record<MascotVariant, string> = {
    default: '/assets/mascot.png',
    senang: '/assets/mascot-senang.png',
    wrong1: '/assets/mascot-wrong1.png',
    wrong2: '/assets/mascot-wrong2.png',
    sedih: '/assets/mascot-sedih.png',
    tunjuk: '/assets/mascot-tunjuk.png',
    pesan: '/assets/mascot-pesan.png',
    badge: '/assets/mascot-badge.png',
}

const MASCOT_DIMENSIONS: Record<MascotVariant, { width: number; height: number }> = {
    default: { width: 775, height: 950 },
    senang: { width: 960, height: 815 },
    wrong1: { width: 800, height: 800 },
    wrong2: { width: 800, height: 800 },
    sedih: { width: 800, height: 800 },
    tunjuk: { width: 800, height: 850 },
    pesan: { width: 800, height: 850 },
    badge: { width: 700, height: 700 },
}

export function getMascotAsset(variant: MascotVariant) {
    return { src: MASCOT_FILES[variant], ...MASCOT_DIMENSIONS[variant] }
}

// ── Character ────────────────────────────────────────────
// Full body (untuk level select & preview)
const CHARACTER_FULL_FILES: Record<GameLevel, string> = {
    easy: '/assets/karakter-easy.png',
    medium: '/assets/karakter-medium.png',
    hard: '/assets/karakter-hard.png',
}

const CHARACTER_FULL_DIMENSIONS: Record<GameLevel, { width: number; height: number }> = {
    easy: { width: 540, height: 975 },
    medium: { width: 585, height: 1005 },
    hard: { width: 605, height: 1035 },
}

// Expression per level
type ExprFile = Partial<Record<CharacterExpression, string>>
type ExprDim = Partial<Record<CharacterExpression, { width: number; height: number }>>

const CHARACTER_EXPR_FILES: Record<GameLevel, ExprFile> = {
    easy: {
        idle: '/assets/karakter-easy-idle.png',
        action: '/assets/karakter-easy-action.png',
        correct: '/assets/karakter-easy-correct.png',
        wrong: '/assets/karakter-easy-wrong.png',
        // easy tidak punya 'over' → fallback ke wrong
    },
    medium: {
        idle: '/assets/karakter-medium-idle.png',
        action: '/assets/karakter-medium-action.png',
        correct: '/assets/karakter-medium-correct.png',
        wrong: '/assets/karakter-medium-wrong.png',
        over: '/assets/karakter-medium-over.png',
    },
    hard: {
        idle: '/assets/karakter-hard-idle.png',
        action: '/assets/karakter-hard-action.png',
        correct: '/assets/karakter-hard-correct.png',
        wrong: '/assets/karakter-hard-wrong.png',
        over: '/assets/karakter-hard-over.png',
    },
}

const CHARACTER_EXPR_DIMENSIONS: Record<GameLevel, ExprDim> = {
    easy: {
        idle: { width: 350, height: 435 },
        action: { width: 410, height: 460 },
        correct: { width: 350, height: 410 },
        wrong: { width: 370, height: 420 },
    },
    medium: {
        idle: { width: 260, height: 320 },
        action: { width: 320, height: 305 },
        correct: { width: 290, height: 305 },
        wrong: { width: 250, height: 305 },
        over: { width: 295, height: 315 },
    },
    hard: {
        idle: { width: 265, height: 320 },
        action: { width: 330, height: 330 },
        correct: { width: 285, height: 325 },
        wrong: { width: 285, height: 325 },
        over: { width: 275, height: 360 },
    },
}

export function getCharacterFull(level: GameLevel) {
    return { src: CHARACTER_FULL_FILES[level], ...CHARACTER_FULL_DIMENSIONS[level] }
}

export function getCharacterExpression(level: GameLevel, expr: CharacterExpression) {
    const files = CHARACTER_EXPR_FILES[level]
    const dims = CHARACTER_EXPR_DIMENSIONS[level]
    // Fallback: 'over' → 'wrong' untuk easy, 'idle' sebagai last resort
    const resolvedExpr = (files[expr] ? expr : expr === 'over' ? 'wrong' : 'idle') as CharacterExpression
    return {
        src: files[resolvedExpr] ?? files.idle!,
        ...(dims[resolvedExpr] ?? dims.idle!),
    }
}

// ── Board ────────────────────────────────────────────────
export const BOARD_ASSET = { src: '/assets/papan-engklek-utama.png', width: 665, height: 940 }

export const STONE_ASSETS: Record<StoneState, { src: string; width: number; height: number }> = {
    normal: { src: '/assets/batu-normal.png', width: 370, height: 290 },
    highlight: { src: '/assets/batu-highlight.png', width: 370, height: 290 },
}

export function getArrowAsset(direction: ArrowDirection, style: ArrowStyle) {
    const dims: Record<ArrowDirection, { width: number; height: number }> = {
        upward: { width: 215, height: 260 },
        curved: { width: 320, height: 225 },
        downward: { width: 190, height: 240 },
        circular: { width: 295, height: 255 },
    }
    return {
        src: `/assets/${direction}-${style}.png`,
        ...dims[direction],
    }
}

// ── Level Assets ─────────────────────────────────────────
export const LEVEL_ARTWORK: Record<GameLevel, { src: string; width: number; height: number }> = {
    easy: { src: '/assets/easy-artwork.png', width: 730, height: 745 },
    medium: { src: '/assets/medium-artwork.png', width: 765, height: 610 },
    hard: { src: '/assets/hard-artwork.png', width: 980, height: 615 },
}

// icon-normal.png = level Medium (nama file berbeda dari konvensi)
export const LEVEL_ICON: Record<GameLevel, { src: string; width: number; height: number }> = {
    easy: { src: '/assets/icon-easy.png', width: 415, height: 425 },
    medium: { src: '/assets/icon-normal.png', width: 415, height: 425 },
    hard: { src: '/assets/icon-hard.png', width: 415, height: 425 },
}

// ── Quiz Badge ────────────────────────────────────────────
export const QUIZ_BADGE = {
    quiz1: { src: '/assets/quiz-maju-badge.png', width: 570, height: 180 },
    quiz2: { src: '/assets/quiz-ambil-badge.png', width: 675, height: 180 },
} as const

// ── HUD Hearts ───────────────────────────────────────────
// Gambar hearts menampilkan 3 hearts sekaligus dalam 1 image
// Pilih image berdasarkan jumlah lives yang tersisa
export function getHeartsAsset(lives: number): { src: string; width: number; height: number } {
    if (lives >= 3) return { src: '/assets/full-hearts.png', width: 310, height: 255 }
    if (lives === 1) return { src: '/assets/pulsing-hearts.png', width: 310, height: 255 }
    return { src: '/assets/lost-hearts.png', width: 310, height: 255 }
}

// ── Combo Badge ───────────────────────────────────────────
// Gambar combo badge menampilkan teks combo yang sudah baked-in di gambar
// Gunakan sebagai background/visual, tapi tetap render teks dinamis di atasnya via CSS
export function getComboBadgeAsset(combo: number): { src: string; width: number; height: number } | null {
    if (combo < 2) return null
    if (combo < 4) return { src: '/assets/2xcombo-badge.png', width: 360, height: 95 }
    if (combo < 6) return { src: '/assets/4xcombo-badge.png', width: 330, height: 95 }
    if (combo < 8) return { src: '/assets/6xcombo-badge.png', width: 355, height: 95 }
    return { src: '/assets/8xcombo-badge.png', width: 410, height: 95 }
}

// ── Score Popup ───────────────────────────────────────────
// Pilih gambar score popup berdasarkan poin yang didapat
export function getScorePopupAsset(pts: number): { src: string; width: number; height: number } {
    if (pts >= 200) return { src: '/assets/+200-score.png', width: 400, height: 225 }
    if (pts >= 150) return { src: '/assets/+150-score.png', width: 340, height: 215 }
    return { src: '/assets/+100-score.png', width: 315, height: 205 }
}

// ── Result Banners ────────────────────────────────────────
export const NEW_RECORD_BANNER = { src: '/assets/new-record-banner.png', width: 1345, height: 305 }
export const PERFECT_CLEAR_BANNER = { src: '/assets/perfect-clear-banner.png', width: 865, height: 165 }
