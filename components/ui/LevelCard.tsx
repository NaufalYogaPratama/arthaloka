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

    const difficultyBar = { easy: 1, medium: 2, hard: 3 }[level]

    return (
        <button
            onClick={() => onSelect(level)}
            className="w-full text-left rounded-2xl border-2 overflow-hidden
                 hover:scale-[1.015] active:scale-[0.985]
                 transition-all duration-200 shadow-sm hover:shadow-lg relative"
            style={{
                borderColor: cfg.borderColor,
                background: cfg.bgGradient,
            }}
        >
            {/* Background pattern per level — sangat subtle */}
            <div
                className="absolute inset-0 opacity-[0.035] pointer-events-none"
                style={{
                    backgroundImage: `url('/assets/brand-pattern.png')`,
                    backgroundSize: '200px',
                    backgroundRepeat: 'repeat',
                }}
            />

            {/* TOP: Artwork illustration kiri + Info tengah + Karakter kanan */}
            <div className="relative flex items-end justify-between px-4 pt-4 pb-0 gap-2">

                {/* Artwork — lebih besar dari sebelumnya */}
                <div className="flex-shrink-0 rounded-2xl overflow-hidden bg-white/30 p-1">
                    <Image
                        src={artwork.src}
                        alt={`Ilustrasi ${cfg.label}`}
                        width={artW}
                        height={artH}
                        className="object-contain"
                        style={{ width: artW, height: artH }}
                    />
                </div>

                {/* Center: info singkat di tengah (mengisi whitespace) */}
                <div className="hidden sm:flex flex-1 flex-col items-center gap-1.5 pb-2">
                    {/* Difficulty bar */}
                    <div>
                        <p className="text-center text-[9px] font-bold uppercase tracking-wider mb-1"
                           style={{ color: cfg.color, opacity: 0.7 }}>
                            Tingkat Kesulitan
                        </p>
                        <div className="flex gap-1 justify-center">
                            {[1, 2, 3].map(n => (
                                <div
                                    key={n}
                                    className="h-1.5 w-8 rounded-full transition-all"
                                    style={{
                                        background: n <= difficultyBar ? cfg.color : `${cfg.color}30`,
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Soal & waktu info */}
                    <div className="flex gap-3 mt-1">
                        <div className="text-center">
                            <p className="font-black text-base leading-none" style={{ color: cfg.color }}>10</p>
                            <p className="text-[9px] font-bold text-gray-500">soal</p>
                        </div>
                        <div className="w-px bg-gray-200" />
                        <div className="text-center">
                            <p className="font-black text-base leading-none" style={{ color: cfg.color }}>~5</p>
                            <p className="text-[9px] font-bold text-gray-500">menit</p>
                        </div>
                        <div className="w-px bg-gray-200" />
                        <div className="text-center">
                            <p className="font-black text-base leading-none" style={{ color: cfg.color }}>3</p>
                            <p className="text-[9px] font-bold text-gray-500">nyawa</p>
                        </div>
                    </div>
                </div>

                {/* Character preview — kanan */}
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

            {/* DIVIDER */}
            <div
                className="mx-4 my-2 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${cfg.borderColor}, transparent)` }}
            />

            {/* BOTTOM: Info teks */}
            <div className="px-4 pb-4">

                {/* Icon + Label */}
                <div className="flex items-center gap-2 mb-1.5">
                    <Image
                        src={icon.src}
                        alt={`Icon ${cfg.label}`}
                        width={iconDisplaySize}
                        height={iconDisplaySize}
                        className="object-contain rounded-full"
                        style={{ width: iconDisplaySize, height: iconDisplaySize }}
                    />
                    <span className="text-xl font-black" style={{ color: cfg.color }}>
                        {cfg.label}
                    </span>
                    {/* "Populer" badge untuk Medium */}
                    {level === 'medium' && (
                        <span className="text-[9px] font-black px-2 py-0.5 rounded-full"
                              style={{ background: '#dbeafe', color: '#1d4ed8' }}>
                            POPULER
                        </span>
                    )}
                </div>

                {/* Tagline */}
                <p className="text-gray-600 text-sm font-semibold mb-2.5">
                    {cfg.tagline}
                </p>

                {/* Topic badges */}
                <div className="flex flex-wrap gap-1.5 mb-2.5">
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

                {/* CTA Button */}
                <div
                    className="w-full rounded-xl py-2.5 flex items-center justify-center gap-2
                     font-black text-sm text-white"
                    style={{ background: cfg.color }}
                >
                    <ChevronRight className="w-4 h-4" />
                    Pilih Level Ini
                </div>
            </div>
        </button>
    )
}
