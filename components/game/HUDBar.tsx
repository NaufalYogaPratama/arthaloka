'use client'

import Image from 'next/image'
import { getComboBadgeAsset } from '@/lib/assets'

interface HUDBarProps {
    lives: number      // 0, 1, 2, atau 3
    score: number
    combo: number
    roundNum: number
    questionIdx: number
}

export default function HUDBar({ lives, score, combo, roundNum, questionIdx }: HUDBarProps) {
    const comboBadge = getComboBadgeAsset(combo)
    const comboDisplayH = 30
    const comboDisplayW = comboBadge
        ? Math.round(comboDisplayH * (comboBadge.width / comboBadge.height))
        : 0

    return (
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm
                    border-b border-gray-100 shadow-sm">

            {/* Main HUD Row */}
            <div className="flex items-center justify-between px-4 py-2.5">

                {/* LEFT: 3 Hearts Individual */}
                <div className="flex flex-col items-start gap-0.5">
                    <div className="flex items-center gap-1.5">
                        {[1, 2, 3].map((heartNum) => {
                            const isAlive = heartNum <= lives
                            const isLast = lives === 1 && heartNum === 1
                            return (
                                <span
                                    key={heartNum}
                                    className={[
                                        'text-[28px] leading-none select-none',
                                        'transition-all duration-300',
                                        isAlive ? 'opacity-100' : 'opacity-20 grayscale',
                                        isLast ? 'animate-pulse drop-shadow-[0_0_6px_rgba(239,68,68,0.8)]' : '',
                                    ].join(' ')}
                                >
                                    ❤️
                                </span>
                            )
                        })}
                    </div>
                    <span className="text-[9px] text-gray-400 font-bold pl-0.5">
                        {lives}/3 nyawa
                    </span>
                </div>

                {/* CENTER: Score */}
                <div className="text-center">
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">
                        SKOR
                    </p>
                    <p className="text-2xl font-black text-amber-500 leading-none"
                        style={{ fontFamily: "'Fredoka One', cursive" }}>
                        {score.toLocaleString('id-ID')}
                    </p>
                </div>

                {/* RIGHT: Round + Question */}
                <div className="text-right">
                    <p className="text-[11px] text-gray-600 font-bold">
                        Jalan {roundNum + 1}/5
                    </p>
                    <p className="text-[11px] text-gray-600 font-bold">
                        Soal {Math.min(questionIdx + 1, 10)}/10
                    </p>
                </div>
            </div>

            {/* Combo Badge Row */}
            {comboBadge && combo >= 2 && (
                <div className="flex justify-center pb-1.5">
                    <Image
                        src={comboBadge.src}
                        alt={`${combo}x combo`}
                        width={comboDisplayW}
                        height={comboDisplayH}
                        className="object-contain"
                        style={{ width: comboDisplayW, height: comboDisplayH }}
                    />
                </div>
            )}
        </div>
    )
}
