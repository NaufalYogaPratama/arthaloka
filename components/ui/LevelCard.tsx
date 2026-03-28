'use client'

import Image from 'next/image'
import { LEVEL_ARTWORK, LEVEL_ICON } from '@/lib/assets'
import { getCharacterFull } from '@/lib/assets'
import type { GameLevel } from '@/types/game'

const LEVEL_CONFIG: Record<GameLevel, {
    label: string
    tagline: string
    topics: string[]
    colorClass: string
    borderClass: string
    bgClass: string
    badgeClass: string
}> = {
    easy: {
        label: 'Easy',
        tagline: 'Mulai perjalanan finansialmu!',
        topics: ['💰 Budgeting', '🏦 Menabung', '💳 Kebutuhan vs Keinginan'],
        colorClass: 'text-green-700',
        borderClass: 'border-green-200 hover:border-green-400',
        bgClass: 'bg-gradient-to-br from-green-50 to-emerald-50',
        badgeClass: 'bg-green-100 text-green-800',
    },
    medium: {
        label: 'Medium',
        tagline: 'Hadapi tantangan keuangan!',
        topics: ['😰 Impulsive Buying', '💳 Pay Later', '📊 Hutang'],
        colorClass: 'text-blue-700',
        borderClass: 'border-blue-200 hover:border-blue-400',
        bgClass: 'bg-gradient-to-br from-blue-50 to-sky-50',
        badgeClass: 'bg-blue-100 text-blue-800',
    },
    hard: {
        label: 'Hard',
        tagline: 'Kuasai investasi & risiko!',
        topics: ['⚠️ Pinjol Ilegal', '📈 Investasi', '🔢 Bunga Berbunga'],
        colorClass: 'text-red-700',
        borderClass: 'border-red-200 hover:border-red-400',
        bgClass: 'bg-gradient-to-br from-red-50 to-orange-50',
        badgeClass: 'bg-red-100 text-red-800',
    },
}

interface LevelCardProps {
    levelKey: GameLevel
    emoji?: string // unused now, for compatibility with old props if any
    title?: string
    topics?: string
    description?: string
    color?: string
    onClick: () => void
}

export default function LevelCard({ levelKey, onClick }: LevelCardProps) {
    const cfg = LEVEL_CONFIG[levelKey]
    const artwork = LEVEL_ARTWORK[levelKey]
    const icon = LEVEL_ICON[levelKey]
    const char = getCharacterFull(levelKey)

    // Displayed sizes — maintain aspect ratio
    // Artwork: display height 120px
    const artworkH = 120
    const artworkW = Math.round(artworkH * (artwork.width / artwork.height))

    // Char preview: height 100px
    const charH = 100
    const charW = Math.round(charH * (char.width / char.height))

    return (
        <button
            onClick={onClick}
            className={`w-full text-left rounded-2xl p-5 border-2 ${cfg.borderClass} ${cfg.bgClass}
                  shadow-sm hover:shadow-md active:scale-[0.98]
                  transition-all duration-200 flex items-center gap-4`}
        >
            {/* Left: Artwork illustration */}
            <div className="flex-shrink-0 w-[110px] sm:w-[130px] rounded-xl overflow-hidden bg-white/50 flex justify-center items-center">
                <Image
                    src={artwork.src}
                    alt={`Level ${cfg.label} artwork`}
                    width={artworkW}
                    height={artworkH}
                    className="object-contain max-h-[120px]"
                    style={{ width: 'auto', height: '100%' }}
                />
            </div>

            {/* Center: Info */}
            <div className="flex-1 min-w-0">
                {/* Header: Icon + Label */}
                <div className="flex items-center gap-2 mb-1">
                    <Image
                        src={icon.src}
                        alt={`Icon ${cfg.label}`}
                        width={28}
                        height={28}
                        className="object-contain rounded-full"
                        style={{ width: 28, height: 28 }}
                    />
                    <span className={`text-xl font-black ${cfg.colorClass}`}>{cfg.label}</span>
                </div>

                <p className="text-gray-500 text-xs mb-3">{cfg.tagline}</p>

                {/* Topics */}
                <div className="flex flex-wrap gap-1">
                    {cfg.topics.map(t => (
                        <span key={t} className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${cfg.badgeClass}`}>
                            {t}
                        </span>
                    ))}
                </div>
            </div>

            {/* Right: Character preview */}
            <div className="flex-shrink-0 hidden sm:block">
                <Image
                    src={char.src}
                    alt={`Karakter ${levelKey}`}
                    width={charW}
                    height={charH}
                    className="object-contain"
                    style={{ width: charW, height: charH }}
                />
            </div>

            {/* Arrow */}
            <span className={`text-2xl ${cfg.colorClass} flex-shrink-0`}>→</span>
        </button>
    )
}
