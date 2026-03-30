'use client'

import { MascotImage } from '@/components/ui/MascotImage'
import type { MascotVariant } from '@/types/game'
import { Sparkles, AlertTriangle, ChevronRight } from 'lucide-react'

const MESSAGES: Record<string, string[]> = {
    wrong1: [
        'Ayo, kamu pasti bisa! Pikirkan lagi ya!',
        'Hampir benar kok! Tetap semangat!',
        'Jangan menyerah! Masih ada harapan!',
    ],
    wrong2: [
        'Hati-hati! Nyawa tinggal 1!',
        'Satu nyawa lagi! Pikirkan baik-baik!',
        'Kita bisa! Jangan sampai salah lagi!',
    ],
    gameover: [
        "It's okay, you did your best!",
        'Ayo kita belajar bersama ya!',
        'We are one step ahead than ever!',
    ],
}

// Map popup type ke MascotVariant
const VARIANT_MAP: Record<string, MascotVariant> = {
    wrong1: 'wrong1',
    wrong2: 'wrong2',
    gameover: 'sedih',
    correct: 'senang',
}

export interface MascotPopupProps {
    type: 'wrong1' | 'wrong2' | 'gameover' | 'correct'
    onClose?: () => void
    message?: string  // override message jika perlu
}

export function MascotPopup({ type, onClose, message }: MascotPopupProps) {
    const variant = VARIANT_MAP[type]
    const msgs = MESSAGES[type] ?? []
    const displayMessage = message ?? msgs[Math.floor(Math.random() * msgs.length)]
    const isGameOver = type === 'gameover'
    const isCorrect = type === 'correct'
    const isBottomBanner = type === 'wrong1' || type === 'wrong2'

    // ─────────────────────────────────────────────────────────────
    // WRONG1 & WRONG2: Bottom Banner Style (JRPG notification)
    // ─────────────────────────────────────────────────────────────
    if (isBottomBanner) {
        return (
            <div className="fixed inset-0 z-[300] flex flex-col justify-end pointer-events-none">
                {/* Blur/dim ringan di atas game — tapi tidak sehitam quiz */}
                <div className="absolute inset-0 bg-black/30 pointer-events-auto" />

                <div
                    className="relative w-full pointer-events-auto animate-[slideUp_0.3s_ease]"
                    style={{
                        background: type === 'wrong1'
                            ? 'linear-gradient(180deg, #1c1917, #292524)'
                            : 'linear-gradient(180deg, #1c0505, #2d0a0a)',
                        borderTop: `2px solid ${type === 'wrong1' ? '#f59e0b' : '#ef4444'}`,
                    }}
                >
                    {/* Gold/Red line */}
                    <div
                        className="w-full h-0.5"
                        style={{
                            background: type === 'wrong1'
                                ? 'linear-gradient(90deg, transparent, #f59e0b, transparent)'
                                : 'linear-gradient(90deg, transparent, #ef4444, transparent)',
                        }}
                    />

                    <div className="flex items-center gap-4 px-5 py-4">
                        {/* Mascot — lebih besar dengan animasi extra */}
                        <div className={`flex-shrink-0 ${type === 'wrong2' ? 'animate-bounce' : 'animate-[shake_0.4s_ease-in-out]'}`}>
                            <MascotImage variant={variant} displayHeight={85} priority />
                        </div>

                        {/* Pesan + sub-pesan */}
                        <div className="flex-1 min-w-0">
                            <p className="text-white font-black text-sm leading-tight mb-1">
                                {displayMessage}
                            </p>
                            <p
                                className="font-bold text-xs"
                                style={{ color: type === 'wrong1' ? '#fcd34d' : '#fca5a5' }}
                            >
                                {type === 'wrong1' ? '— Nyawa tersisa: 2' : '⚠ Nyawa tersisa: 1 — Hati-hati!'}
                            </p>
                        </div>

                        {/* Tombol lanjut */}
                        {onClose && (
                            <button
                                onClick={onClose}
                                className="flex-shrink-0 px-4 py-2 rounded-xl font-black text-sm text-white transition-all active:scale-95"
                                style={{
                                    background: type === 'wrong1' ? '#d97706' : '#dc2626',
                                }}
                            >
                                Lanjut
                            </button>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    // ─────────────────────────────────────────────────────────────
    // GAMEOVER & CORRECT: Center Modal Style (lebih dramatis)
    // ─────────────────────────────────────────────────────────────
    const bgColors = {
        gameover: 'bg-red-50 border-red-200',
        correct: 'bg-green-50 border-green-200',
    }

    const iconColors = {
        gameover: 'text-red-500',
        correct: 'text-green-500',
    }

    return (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/50 p-4">
            <div
                className={`relative bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl border-2 ${bgColors[type]} animate-[popIn_0.3s_cubic-bezier(0.34,1.56,0.64,1)]`}
            >
                {/* Icon */}
                <div className="flex justify-center mb-3">
                    {isCorrect ? (
                        <Sparkles className={`w-12 h-12 ${iconColors[type]}`} />
                    ) : (
                        <AlertTriangle className={`w-12 h-12 ${iconColors[type]}`} />
                    )}
                </div>

                {/* Mascot Image */}
                <div className="flex justify-center mb-4">
                    <MascotImage
                        variant={variant}
                        displayHeight={180}
                        priority
                    />
                </div>

                {/* Message */}
                <p className="text-lg font-bold text-gray-800 leading-relaxed mb-2">
                    {displayMessage}
                </p>

                {/* Sub-message */}
                {isGameOver && (
                    <p className="text-sm text-gray-500 mb-6">Jangan menyerah! Coba lagi ya!</p>
                )}
                {isCorrect && (
                    <p className="text-sm text-green-600 font-semibold mb-6">Keren! Lanjutkan perjalananmu!</p>
                )}

                {/* CTA Button */}
                {onClose && (
                    <button
                        onClick={onClose}
                        className={`${isCorrect ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'} active:scale-95 text-white font-extrabold text-base py-3 px-10 rounded-2xl transition-all duration-150 flex items-center gap-1 mx-auto`}
                    >
                        {isCorrect ? 'Lanjut' : 'Coba Lagi'} <ChevronRight className="w-5 h-5" />
                    </button>
                )}
            </div>
        </div>
    )
}

export default MascotPopup;
