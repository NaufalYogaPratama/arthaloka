'use client'

import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { SwipeCard } from '@/components/ui/SwipeCard'
import { MascotImage } from '@/components/ui/MascotImage'
import { RUANG_BELAJAR_HERO, getTopicIconsForLevel } from '@/lib/assets'
import { useGameStore } from '@/store/gameStore'
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Home,
  GraduationCap,
  Lightbulb,
  CheckCircle2,
  FastForward,
} from 'lucide-react'
import type { GameLevel } from '@/types/game'

// ── WARNA PER LEVEL untuk kartu ──
const CARD_THEMES: Record<GameLevel, {
  gradient: string
  accent: string
  border: string
  labelBg: string
  labelText: string
}> = {
  easy: {
    gradient: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
    accent: '#16a34a',
    border: '#86efac',
    labelBg: '#dcfce7',
    labelText: '#15803d',
  },
  medium: {
    gradient: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
    accent: '#2563eb',
    border: '#93c5fd',
    labelBg: '#dbeafe',
    labelText: '#1d4ed8',
  },
  hard: {
    gradient: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
    accent: '#dc2626',
    border: '#fca5a5',
    labelBg: '#fee2e2',
    labelText: '#991b1b',
  },
}

// ── FALLBACK FACTS jika collectedFacts kosong (game over cepat) ──
const FALLBACK_FACTS: Record<GameLevel, string[]> = {
  easy: [
    '💡 Budgeting adalah cara mengatur pengeluaran agar tidak melebihi pendapatan. Coba metode 50-30-20!',
    '💡 Dana darurat idealnya 3-6x pengeluaran bulanan. Ini pelindungmu dari situasi tak terduga.',
    '💡 Menabung di awal bulan (pay yourself first) jauh lebih efektif daripada menabung sisa.',
  ],
  medium: [
    '💡 Impulsive buying bisa menguras 20-30% anggaran. Tunggu 24 jam sebelum beli barang non-esensial!',
    '💡 Bunga kartu kredit di Indonesia bisa mencapai 24-36% per tahun. Bayar tagihan PENUH tiap bulan!',
    '💡 Pay Later mudah tapi bisa menjebak. Baca syarat & biaya sebelum menggunakannya.',
  ],
  hard: [
    '💡 Pinjol legal WAJIB terdaftar di OJK. Cek di ojk.go.id sebelum meminjam!',
    '💡 Diversifikasi investasi mengurangi risiko. Jangan taruh semua telur dalam satu keranjang.',
    '💡 Bunga berbunga bisa menggandakan hutang dengan cepat. Hati-hati dengan pinjol berbunga harian!',
  ],
}

export default function LearnPage() {
  const router = useRouter()
  const collectedFacts = useGameStore(s => s.collectedFacts)
  const level = (useGameStore(s => s.level) ?? 'easy') as GameLevel
  const theme = CARD_THEMES[level]
  const topicIcons = getTopicIconsForLevel(level)

  // State untuk stack cards
  const [dismissed, setDismissed] = useState<number[]>([])
  const [showComplete, setShowComplete] = useState(false)

  // Detect touch device untuk keyboard hint
  const [isTouch, setIsTouch] = useState(true)

  useEffect(() => {
    setIsTouch(typeof window !== 'undefined' && 'ontouchstart' in window)
  }, [])

  // Fallback facts jika collectedFacts kosong (misal game over terlalu cepat)
  const facts = collectedFacts.length > 0
    ? collectedFacts.slice(0, 10)
    : FALLBACK_FACTS[level]
  const remaining = facts.length - dismissed.length

  // Stack: tampilkan max 3 kartu dari atas tumpukan
  const activeStack = facts
    .map((f, i) => ({ fact: f, originalIdx: i }))
    .filter(({ originalIdx }) => !dismissed.includes(originalIdx))
    .slice(0, 3)

  const handleSwipe = useCallback((_direction: 'left' | 'right') => {
    if (activeStack.length === 0) return
    const topCard = activeStack[0]
    setDismissed(prev => [...prev, topCard.originalIdx])

    if (dismissed.length + 1 >= facts.length) {
      setTimeout(() => setShowComplete(true), 400)
    }
  }, [activeStack, dismissed, facts])

  // Keyboard support
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handleSwipe('left')
      if (e.key === 'ArrowRight') handleSwipe('right')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [handleSwipe])

  // ── COMPLETE SCREEN ──
  if (showComplete) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-5 py-8 bg-gradient-to-b from-green-50 to-blue-50">
        <div className="w-full max-w-md mx-auto">
          <div className="text-center mb-8">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-black text-gray-800 mb-2">
              Semua Fakta Selesai!
            </h2>
            <p className="text-gray-500 text-sm">
              Kamu sudah membaca {facts.length} fun facts. Luar biasa!
            </p>
          </div>

          {/* Topic icons summary */}
          <div className="flex justify-center gap-4 mb-8">
            {topicIcons.map((icon, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <Image
                  src={icon.src}
                  alt="Topik"
                  width={56}
                  height={Math.round(56 * (icon.height / icon.width))}
                  className="object-contain rounded-xl"
                  style={{ width: 56, height: 'auto' }}
                />
              </div>
            ))}
          </div>

          {/* Ingat selalu box */}
          <div
            className="w-full rounded-2xl p-4 mb-6"
            style={{ background: '#f0fdf4', border: '1.5px solid #86efac' }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-4 h-4 text-yellow-500" />
              <p className="text-green-800 font-black text-sm">Ingat Selalu:</p>
            </div>
            <ul className="space-y-1">
              {[
                'Pisahkan kebutuhan vs keinginan sebelum belanja',
                'Sisihkan dana darurat untuk kondisi tak terduga',
                'Cek legalitas & risiko produk keuangan sebelum digunakan',
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-2">
                  <ChevronRight className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-green-700 text-xs font-semibold">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => router.push('/')}
              className="flex items-center justify-center gap-2 py-3.5 rounded-2xl
                         font-black text-sm bg-white border-2 border-gray-200
                         text-gray-700 transition-all active:scale-95"
            >
              <Home className="w-4 h-4" />
              Menu Utama
            </button>
            <button
              onClick={() => router.push('/level-select')}
              className="flex items-center justify-center gap-2 py-3.5 rounded-2xl
                         font-black text-sm text-white transition-all active:scale-95"
              style={{ background: theme.accent }}
            >
              <RotateCcw className="w-4 h-4" />
              Main Lagi!
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── MAIN SWIPE SCREEN ──
  return (
    <div className="min-h-dvh flex flex-col bg-gradient-to-b from-slate-50 via-blue-50 to-slate-100 overflow-hidden">
      <div className="w-full max-w-md mx-auto flex flex-col flex-1 min-h-dvh px-3 sm:px-4">
        {/* Header */}
        <div className="bg-white/85 backdrop-blur-md border-b border-gray-100 px-4 py-3 sticky top-0 z-20 rounded-b-2xl shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: theme.labelBg }}
              >
                <GraduationCap className="w-4 h-4" style={{ color: theme.accent }} />
              </div>
              <div className="min-w-0">
                <p className="font-black text-gray-800 text-sm leading-tight truncate">Ruang Belajar</p>
                <p className="text-gray-400 text-[9px] font-bold truncate">Fun facts dari soal tadi</p>
              </div>
            </div>

            <div className="text-right shrink-0">
              <p className="font-black text-sm leading-tight" style={{ color: theme.accent }}>
                {dismissed.length}/{facts.length}
              </p>
              <p className="text-gray-400 text-[9px] font-bold">selesai</p>
            </div>
          </div>

          <div className="mt-2 h-1 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${facts.length ? (dismissed.length / facts.length) * 100 : 0}%`,
                background: theme.accent,
              }}
            />
          </div>

          {/* Tombol skip ke complete screen */}
          {!showComplete && facts.length > 0 && dismissed.length < facts.length && (
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowComplete(true)}
                className="text-xs text-gray-400 font-bold flex items-center gap-1
               hover:text-gray-600 transition-colors"
              >
                <FastForward className="w-3 h-3" />
                Lewati semua
              </button>
            </div>
          )}
        </div>

        {/* Hero illustration */}
        <div className="px-0 sm:px-1 pt-3">
          <div
            className="relative w-full overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100"
            style={{ aspectRatio: '16 / 6' }}
          >
            <Image
              src={RUANG_BELAJAR_HERO.src}
              alt="Ruang Belajar"
              fill
              className="object-contain object-center p-1 sm:p-2"
              sizes="(max-width: 448px) 100vw, 448px"
              priority
            />
            <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-slate-50 to-transparent" />
          </div>
        </div>

        {/* Instructions */}
        <div className="px-2 sm:px-4 py-2.5 flex items-center justify-center gap-3 sm:gap-4">
          <div className="flex items-center gap-1 text-gray-400">
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold">Skip</span>
          </div>
          <div className="h-3 w-px bg-gray-300" />
          <p className="text-[10px] text-gray-500 font-bold">Geser kartu</p>
          <div className="h-3 w-px bg-gray-300" />
          <div className="flex items-center gap-1 text-gray-400">
            <span className="text-[10px] font-bold">Paham</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* ── CARD STACK AREA ── */}
        <div className="flex-none flex items-start justify-center px-0 sm:px-1 pt-1 pb-1">
          {facts.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              <GraduationCap className="w-10 h-10 mx-auto mb-2 opacity-40" />
              <p className="font-bold text-sm">Tidak ada fun facts.</p>
            </div>
          ) : (
            <div
              className="relative w-full mx-auto"
              style={{
                height: 'clamp(240px, 38vh, 330px)',
                maxWidth: '100%',
              }}
            >
              {activeStack.map(({ fact, originalIdx }, stackIdx) => (
                <SwipeCard
                  key={originalIdx}
                  stackIndex={stackIdx}
                  total={activeStack.length}
                  isActive={stackIdx === 0}
                  onSwipeLeft={() => handleSwipe('left')}
                  onSwipeRight={() => handleSwipe('right')}
                >
                  {/* ── KARTU INDIVIDUAL ── */}
                  <div
                    className="w-full rounded-2xl overflow-hidden"
                    style={{
                      background: theme.gradient,
                      border: `2px solid ${theme.border}`,
                      boxShadow: stackIdx === 0
                        ? '0 8px 24px rgba(0,0,0,0.08)'
                        : '0 4px 14px rgba(0,0,0,0.04)',
                    }}
                  >
                    {/* Card header */}
                    <div
                      className="px-4 py-3 flex items-center justify-between"
                      style={{ borderBottom: `1px solid ${theme.border}` }}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div
                          className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
                          style={{ background: theme.labelBg }}
                        >
                          <Lightbulb className="w-3 h-3" style={{ color: theme.accent }} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[8px] font-black uppercase tracking-wider text-gray-400">
                            Fun Fact
                          </p>
                          <p className="text-[9px] font-bold" style={{ color: theme.accent }}>
                            #{(dismissed.length + stackIdx + 1).toString().padStart(2, '0')} / {facts.length}
                          </p>
                        </div>
                      </div>

                      {topicIcons[0] && (
                        <Image
                          src={topicIcons[0].src}
                          alt="Topik"
                          width={28}
                          height={Math.round(28 * (topicIcons[0].height / topicIcons[0].width))}
                          className="object-contain shrink-0"
                          style={{ width: 28, height: 'auto', opacity: 0.6 }}
                        />
                      )}
                    </div>

                    {/* Card body */}
                    <div className="px-4 py-3 flex gap-3 items-start">
                      {stackIdx === 0 && (
                        <div className="flex-shrink-0">
                          <MascotImage variant="pesan" displayHeight={52} />
                        </div>
                      )}

                      <div className="flex-1 min-w-0 flex items-center">
                        <p className="text-gray-800 text-sm sm:text-[15px] font-medium leading-relaxed">
                          {fact}
                        </p>
                      </div>
                    </div>

                    {/* Card footer */}
                    {stackIdx === 0 && (
                      <div
                        className="px-4 py-2.5 flex items-center justify-between"
                        style={{ borderTop: `1px solid ${theme.border}` }}
                      >
                        <span className="text-[9px] text-gray-400 font-bold flex items-center gap-1">
                          <ChevronLeft className="w-3 h-3" /> Skip
                        </span>
                        <span
                          className="text-[9px] font-bold flex items-center gap-1"
                          style={{ color: theme.accent }}
                        >
                          Paham <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    )}
                  </div>
                </SwipeCard>
              ))}
            </div>
          )}
        </div>

        {/* Keyboard hint untuk desktop */}
        {!isTouch && (
          <div className="text-center pt-1 pb-1">
            <p className="text-[9px] text-gray-300 font-medium">
              Keyboard: ← Skip | → Paham
            </p>
          </div>
        )}

        {/* Bottom action buttons */}
        <div className="px-4 pt-1 pb-[calc(0.5rem+env(safe-area-inset-bottom))] grid grid-cols-2 gap-2.5">
          <button
            onClick={() => handleSwipe('left')}
            disabled={remaining === 0}
            className="flex items-center justify-center gap-1.5 py-3 rounded-2xl
                       font-bold text-sm text-gray-600 bg-white border border-gray-200
                       shadow-sm transition-all active:scale-95 disabled:opacity-40"
          >
            <ChevronLeft className="w-4 h-4" />
            Skip
          </button>
          <button
            onClick={() => handleSwipe('right')}
            disabled={remaining === 0}
            className="flex items-center justify-center gap-1.5 py-3 rounded-2xl
                       font-bold text-sm text-white shadow-sm transition-all active:scale-95 disabled:opacity-40"
            style={{ background: theme.accent }}
          >
            Paham
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}