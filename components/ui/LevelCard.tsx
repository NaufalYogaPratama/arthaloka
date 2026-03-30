'use client'

import Image from 'next/image'
import { LEVEL_ARTWORK, LEVEL_ICON, getCharacterFull } from '@/lib/assets'
import type { GameLevel } from '@/types/game'
import {
    PiggyBank,
    ShoppingBag,
    AlertTriangle,
    TrendingUp,
    ChevronRight,
    Building2,
    CreditCard,
    BarChart3,
    Hash
} from 'lucide-react'

const LEVEL_CONFIG: Record<GameLevel, {
    label: string
    tagline: string
    topics: string[]
    color: string
    bgGradient: string
    borderColor: string
    badgeBg: string
    badgeColor: string
}> = {
    easy: {
        label: 'Easy',
        tagline: 'Mulai perjalanan finansialmu!',
        topics: ['Budgeting', 'Menabung', 'Needs vs Wants'],
        color: '#15803d',
        bgGradient: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
        borderColor: '#86efac',
        badgeBg: '#dcfce7',
        badgeColor: '#15803d',
    },
    medium: {
        label: 'Medium',
        tagline: 'Hadapi tantangan keuangan nyata!',
        topics: ['Impulsive Buying', 'Pay Later', 'Kelola Hutang'],
        color: '#1d4ed8',
        bgGradient: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
        borderColor: '#93c5fd',
        badgeBg: '#dbeafe',
        badgeColor: '#1d4ed8',
    },
    hard: {
        label: 'Hard',
        tagline: 'Kuasai investasi & risiko finansial!',
        topics: ['Pinjol Ilegal', 'Investasi', 'Bunga Berbunga'],
        color: '#991b1b',
        bgGradient: 'linear-gradient(135deg, #fef2f2, #fee2e2)',
        borderColor: '#fca5a5',
        badgeBg: '#fee2e2',
        badgeColor: '#991b1b',
    },
}

function TopicIcon({ text }: { text: string }) {
    const iconClass = "w-3.5 h-3.5"
    const t = text.toLowerCase();
    if (t.includes('budgeting')) return <PiggyBank className={iconClass} />
    if (t.includes('menabung')) return <Building2 className={iconClass} />
    if (t.includes('wants')) return <CreditCard className={iconClass} />
    if (t.includes('impulsive')) return <ShoppingBag className={iconClass} />
    if (t.includes('hutang')) return <BarChart3 className={iconClass} />
    if (t.includes('pinjol')) return <AlertTriangle className={iconClass} />
    if (t.includes('investasi')) return <TrendingUp className={iconClass} />
    if (t.includes('bunga')) return <Hash className={iconClass} />
    return null
}

interface LevelCardProps {
    level: GameLevel
    onSelect: (level: GameLevel) => void
}

export default function LevelCard({ level, onSelect }: LevelCardProps) {
    const cfg = LEVEL_CONFIG[level]
    const artwork = LEVEL_ARTWORK[level]
    const icon = LEVEL_ICON[level]
    const char = getCharacterFull(level)

    // Artwork: height fixed 100px, width auto (maintain ratio)
    const artH = 100
    const artW = artwork ? Math.round(artH * (artwork.width / artwork.height)) : 0

    // Icon: 32×32 display (dibulatkan dari ratio ~1:1)
    const iconDisplaySize = 32

    // Character: height 110px
    const charH = 110
    const charW = char ? Math.round(charH * (char.width / char.height)) : 0

    return (
        <button
            onClick={() => onSelect(level)}
            className="w-full text-left rounded-2xl border-2 overflow-hidden
                 hover:scale-[1.015] active:scale-[0.985]
                 transition-all duration-200 shadow-sm hover:shadow-md"
            style={{
                borderColor: cfg.borderColor,
                background: cfg.bgGradient,
            }}
        >
            {/* TOP: artwork kiri + karakter kanan */}
            <div className="flex items-end justify-between px-5 pt-4 pb-0 gap-2">
                <div className="flex-shrink-0 rounded-xl overflow-hidden">
                    <Image
                        src={artwork.src}
                        alt={`Ilustrasi ${cfg.label}`}
                        width={artW}
                        height={artH}
                        className="object-contain"
                        style={{ width: artW, height: artH }}
                    />
                </div>

                {/* Character preview — kanan, sedikit lebih besar */}
                <div className="flex-shrink-0">
                    <Image
                        src={char.src}
                        alt={`Karakter ${cfg.label}`}
                        width={charW}
                        height={charH}
                        className="object-contain"
                        style={{ width: charW, height: charH }}
                    />
                </div>
            </div>

            {/* BOTTOM: Info teks */}
            <div className="px-5 pt-2 pb-4">

                {/* Icon + Label level */}
                <div className="flex items-center gap-2 mb-1">
                    <Image
                        src={icon.src}
                        alt={`Icon ${cfg.label}`}
                        width={iconDisplaySize}
                        height={iconDisplaySize}
                        className="object-contain rounded-full"
                        style={{ width: iconDisplaySize, height: iconDisplaySize }}
                    />
                    <span
                        className="text-xl font-black"
                        style={{ color: cfg.color }}
                    >
                        {cfg.label}
                    </span>
                </div>

                {/* Tagline */}
                <p className="text-gray-600 text-sm font-semibold mb-2.5 pl-1">
                    {cfg.tagline}
                </p>

                {/* Topic badges */}
                <div className="flex flex-wrap gap-1.5">
                    {cfg.topics.map(t => (
                        <span
                            key={t}
                            className="text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5"
                            style={{ background: cfg.badgeBg, color: cfg.badgeColor }}
                        >
                            <TopicIcon text={t} /> {t}
                        </span>
                    ))}
                </div>

                {/* Arrow CTA */}
                <div className="flex justify-end mt-2.5">
                    <span
                        className="text-sm font-extrabold flex items-center gap-1"
                        style={{ color: cfg.color }}
                    >
                        Pilih Level <ChevronRight className="w-4 h-4" />
                    </span>
                </div>
            </div>
        </button>
    )
}
