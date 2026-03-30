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

    const bgColors = {
        wrong1: 'bg-green-50  border-green-200',
        wrong2: 'bg-amber-50  border-amber-200',
        gameover: 'bg-red-50    border-red-200',
        correct: 'bg-green-50  border-green-200',
    }

    return (
        // Backdrop
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/50 p-4">
            <div className={`relative bg-white rounded-3xl p-8 max-w-sm w-full text-center
                       shadow-2xl border-2 ${bgColors[type]}
                       animate-[popIn_0.3s_cubic-bezier(0.34,1.56,0.64,1)]`}>

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

                {/* Sub-message per type */}
                {type === 'wrong1' && (
                    <p className="text-sm text-gray-500 mb-6">Nyawa berkurang 1. Masih semangat!</p>
                )}
                {type === 'wrong2' && (
                    <p className="text-sm text-red-500 font-semibold mb-6 flex items-center justify-center gap-1">
                        <AlertTriangle className="w-4 h-4" /> Nyawa tinggal 1!
                    </p>
                )}

                {/* CTA Button — hanya untuk wrong1 & wrong2 */}
                {!isGameOver && onClose && (
                    <button
                        onClick={onClose}
                        className="bg-green-500 hover:bg-green-600 active:scale-95
                       text-white font-extrabold text-base py-3 px-10
                       rounded-2xl transition-all duration-150 flex items-center gap-1 mx-auto"
                    >
                        Lanjut <ChevronRight className="w-5 h-5" />
                    </button>
                )}
            </div>
        </div>
    )
}

export default MascotPopup;
