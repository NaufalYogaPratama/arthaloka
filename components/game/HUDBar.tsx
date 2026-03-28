'use client'

import Image from 'next/image'
import { useGameStore } from '@/store/gameStore'
import { getHeartsAsset, getComboBadgeAsset } from '@/lib/assets'
import { getMultiplier } from '@/lib/scoring'

export default function HUDBar() {
    const lives = useGameStore((s) => s.lives);
    const score = useGameStore((s) => s.score);
    const roundNum = useGameStore((s) => s.roundNum);
    const questionIdx = useGameStore((s) => s.questionIdx);
    const combo = useGameStore((s) => s.combo);

    const heartsAsset = getHeartsAsset(lives)
    const comboBadge = getComboBadgeAsset(combo)

    // Hearts display: height 36px
    const heartsH = 36
    const heartsW = Math.round(heartsH * (heartsAsset.width / heartsAsset.height))

    // Combo badge display: height 32px
    const comboH = 32
    const comboW = comboBadge
        ? Math.round(comboH * (comboBadge.width / comboBadge.height))
        : 0

    return (
        <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100
                    px-4 py-2 flex items-center justify-between shadow-sm">

            {/* LEFT: Lives */}
            <div className="flex items-center gap-2">
                <Image
                    src={heartsAsset.src}
                    alt={`${lives} nyawa tersisa`}
                    width={heartsW}
                    height={heartsH}
                    className="object-contain"
                    style={{ width: heartsW, height: heartsH }}
                    priority
                />
                {/* Tambahkan pulsing ring jika lives === 1 */}
                {lives === 1 && (
                    <span className="text-xs text-red-500 font-bold animate-pulse">!</span>
                )}
            </div>

            {/* CENTER: Score */}
            <div className="text-center">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">SKOR</p>
                <p className="text-xl font-black text-amber-500 leading-tight font-fredoka">
                    {score.toLocaleString('id-ID')}
                </p>
            </div>

            {/* RIGHT: Round + Question info */}
            <div className="text-right">
                <p className="text-[10px] text-gray-400 font-bold">Jalan {roundNum + 1}/5</p>
                <p className="text-[10px] text-gray-400 font-bold">Soal {Math.min(questionIdx + 1, 10)}/10</p>
            </div>

            {/* BOTTOM ROW: Combo badge (kondisional) */}
            {comboBadge && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[85%]
                        z-20 pt-1">
                    <div className="relative flex justify-center items-center">
                        <Image
                            src={comboBadge.src}
                            alt={`${combo}x combo`}
                            width={comboW}
                            height={comboH}
                            className="object-contain drop-shadow-md"
                            style={{ width: comboW, height: comboH }}
                        />
                        <span className="absolute text-white font-black text-sm drop-shadow-md -mt-1" style={{ textShadow: "1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 0 1px 0 #000, 1px 0 0 #000, 0 -1px 0 #000, -1px 0 0 #000" }}>
                            {combo}x
                        </span>
                    </div>
                </div>
            )}
        </div>
    )
}
