'use client'

import { Heart, Zap, MapPin, HelpCircle } from 'lucide-react'
import { getComboBadgeAsset } from '@/lib/assets'
import Image from 'next/image'

interface HUDBarProps {
    lives: number
    score: number
    combo: number
    roundNum: number
    questionIdx: number
}

export default function HUDBar({ lives, score, combo, roundNum, questionIdx }: HUDBarProps) {
    const comboBadge = getComboBadgeAsset(combo)
    const comboDisplayH = 28
    const comboDisplayW = comboBadge
        ? Math.round(comboDisplayH * (comboBadge.width / comboBadge.height))
        : 0

    return (
        <div className="sticky top-0 z-20 bg-white border-b border-gray-100"
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>

            {/* ── MAIN HUD ROW ── */}
            <div className="grid grid-cols-3 items-center px-4 py-2.5">

                {/* LEFT: 3 Hearts */}
                <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-1.5">
                        {[1, 2, 3].map((n) => {
                            const alive = n <= lives
                            const danger = lives === 1 && n === 1
                            return (
                                <Heart
                                    key={n}
                                    className={[
                                        'w-6 h-6 transition-all duration-300',
                                        alive
                                            ? 'fill-red-500 text-red-500'
                                            : 'fill-gray-200 text-gray-200',
                                        danger ? 'animate-pulse' : '',
                                    ].join(' ')}
                                />
                            )
                        })}
                    </div>
                    <span className="text-[9px] text-gray-400 font-bold tracking-wide pl-0.5">
                        {lives}/3 nyawa
                    </span>
                </div>

                {/* CENTER: Score — tetap center tapi lebih compact */}
                <div className="text-center">
                    <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest mb-0.5">
                        SKOR
                    </p>
                    <p
                        className="text-2xl font-black text-amber-500 leading-none tabular-nums"
                        style={{ fontFamily: "'Fredoka One', cursive" }}
                    >
                        {score.toLocaleString('id-ID')}
                    </p>
                </div>

                {/* RIGHT: Progress info — aligned kanan */}
                <div className="flex flex-col items-end gap-0.5">
                    <div className="flex items-center gap-1 text-gray-500">
                        <MapPin className="w-3 h-3" />
                        <span className="text-[11px] font-bold">Jalan {roundNum}/5</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                        <HelpCircle className="w-3 h-3" />
                        <span className="text-[11px] font-bold">Soal {Math.min(questionIdx + 1, 10)}/10</span>
                    </div>
                </div>
            </div>

            {/* ── COMBO ROW — hanya muncul jika combo >= 2 ── */}
            {comboBadge && combo >= 2 && (
                <div className="flex justify-center items-center gap-2 pb-2">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
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
