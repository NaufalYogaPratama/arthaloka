'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { GAME_OVER_ILLUSTRATION } from '@/lib/assets'
import { MascotImage } from '@/components/ui/MascotImage'
import { RotateCcw, Home, Heart } from 'lucide-react'
import { useGameStore } from '@/store/gameStore'

export default function GameOverPage() {
  const router = useRouter()
  const score  = useGameStore(s => s.score)
  const level  = useGameStore(s => s.level) ?? 'easy'
  const resetGame = useGameStore(s => s.resetGame)

  const quotes = [
    "It's okay — every expert was once a beginner.",
    "Ayo kita belajar bersama ya!",
    "We are one step ahead than ever!",
  ]
  const quote = quotes[Math.floor(Math.random() * quotes.length)]

  const handleRestart = () => {
    resetGame()
    router.push('/game')
  }

  const handleHome = () => {
    router.push('/')
  }

  return (
    // Background: warm dark red/maroon — mournful tapi tidak seram
    <div
      className="min-h-screen flex flex-col items-center justify-center px-5 py-8 relative overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #1a0a0a 0%, #2d0a0a 50%, #1a0515 100%)',
      }}
    >
      {/* Subtle particle background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div key={i}
            className="absolute rounded-full animate-pulse opacity-10"
            style={{
              width: `${20 + i * 15}px`,
              height: `${20 + i * 15}px`,
              left: `${(i * 13 + 5) % 90}%`,
              top: `${(i * 17 + 10) % 80}%`,
              background: '#ef4444',
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + i * 0.3}s`,
            }}
          />
        ))}
      </div>

      {/* Main card */}
      <div
        className="relative z-10 w-full max-w-sm rounded-3xl overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.07), rgba(255,255,255,0.03))',
          border: '1px solid rgba(239,68,68,0.3)',
          boxShadow: '0 0 40px rgba(239,68,68,0.15)',
        }}
      >
        {/* Red line di atas */}
        <div className="w-full h-0.5"
             style={{ background: 'linear-gradient(90deg, transparent, #ef4444, transparent)' }} />

        {/* Game over illustration */}
        <div className="relative w-full">
          <Image
            src={GAME_OVER_ILLUSTRATION.src}
            alt="Game Over"
            width={GAME_OVER_ILLUSTRATION.width}
            height={GAME_OVER_ILLUSTRATION.height}
            className="w-full h-auto object-cover"
            style={{ width: '100%', height: 'auto', maxHeight: 220, objectPosition: 'center top' }}
            priority
          />
          {/* Gradient fade bottom dari ilustrasi ke card */}
          <div
            className="absolute bottom-0 inset-x-0 h-16 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(26,5,5,0.9))' }}
          />
        </div>

        {/* Content */}
        <div className="px-6 pb-6 pt-2 text-center">
          {/* Title */}
          <h1
            className="font-black mb-1"
            style={{
              fontFamily: "var(--font-fredoka), Fredoka, cursive",
              fontSize: 36,
              background: 'linear-gradient(180deg, #f87171, #dc2626)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Game Over!
          </h1>

          {/* Empty hearts */}
          <div className="flex justify-center gap-1.5 mb-3">
            {[1,2,3].map(n => (
              <Heart key={n} className="w-5 h-5 fill-gray-700 text-gray-700" />
            ))}
          </div>

          {/* Quote dari mascot */}
          <p className="text-gray-400 text-sm font-semibold italic mb-4 leading-relaxed">
            "{quote}"
          </p>

          {/* Score card */}
          <div
            className="rounded-2xl p-4 mb-5"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">
              Poin dikumpulkan
            </p>
            <p
              className="font-black tabular-nums"
              style={{
                fontFamily: "var(--font-fredoka), Fredoka, cursive",
                fontSize: 40,
                color: '#f97316',
              }}
            >
              {score.toLocaleString('id-ID')}
            </p>
          </div>

          {/* Mascot consoling di pojok (subtle) */}
          <div className="absolute bottom-24 right-4 opacity-80">
            <MascotImage variant="sedih" displayHeight={80} />
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleHome}
              className="flex items-center justify-center gap-2 py-3 rounded-2xl
                         font-black text-sm transition-all active:scale-95"
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1.5px solid rgba(255,255,255,0.15)',
                color: '#d1d5db',
              }}
            >
              <Home className="w-4 h-4" />
              Menu
            </button>
            <button
              onClick={handleRestart}
              className="flex items-center justify-center gap-2 py-3 rounded-2xl
                         font-black text-sm text-white transition-all active:scale-95"
              style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}
            >
              <RotateCcw className="w-4 h-4" />
              Coba Lagi!
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
