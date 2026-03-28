'use client'

import Image from 'next/image'
import { getCharacterExpression } from '@/lib/assets'
import type { GameLevel, CharacterExpression } from '@/types/game'

interface CharacterDisplayProps {
    level: GameLevel
    expression: CharacterExpression
    displayHeight?: number
    className?: string
}

export function CharacterDisplay({
    level,
    expression,
    displayHeight = 200,
    className = '',
}: CharacterDisplayProps) {
    const asset = getCharacterExpression(level, expression)
    const aspectRatio = asset.width / asset.height
    const displayWidth = Math.round(displayHeight * aspectRatio)

    // Tambahkan animasi berdasarkan expression
    const animClass = {
        action: 'transition-all duration-500 ease-in-out',
        correct: 'animate-bounce',
        wrong: 'animate-[shake_0.4s_ease-in-out]',
        idle: 'transition-all duration-300',
        over: '',
    }[expression] ?? ''

    return (
        <div className={`relative flex items-end justify-center ${className}`}
            style={{ width: displayWidth, height: displayHeight }}>
            <Image
                src={asset.src}
                alt={`Karakter ${level} — ${expression}`}
                width={displayWidth}
                height={displayHeight}
                className={`object-contain ${animClass}`}
                style={{ width: displayWidth, height: displayHeight }}
                priority
            />
        </div>
    )
}
