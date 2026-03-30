'use client'

import {
  useRef,
  useState,
  useCallback,
  type ReactNode,
  type PointerEvent,
} from 'react'

interface SwipeCardProps {
  children: ReactNode
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  // Posisi dalam stack: 0 = depan, 1 = di belakang 1 layer, 2 = di belakang 2 layer
  stackIndex: number
  // Total cards dalam stack (untuk depth scaling)
  total: number
  // Apakah ini kartu paling depan (interaktif)?
  isActive: boolean
}

const SWIPE_THRESHOLD = 80  // px minimal untuk trigger swipe
const ROTATION_MAX    = 18  // derajat rotasi saat ditarik

export function SwipeCard({
  children,
  onSwipeLeft,
  onSwipeRight,
  stackIndex,
  total,
  isActive,
}: SwipeCardProps) {
  const cardRef    = useRef<HTMLDivElement>(null)
  const [drag, setDrag]   = useState({ x: 0, y: 0, active: false })
  const [exiting, setExiting] = useState<'left' | 'right' | null>(null)
  const startPos   = useRef({ x: 0, y: 0 })

  // ── DEPTH STYLING berdasarkan posisi dalam stack ──
  // stackIndex 0 = depan, 1 = layer 1 di belakang, dst
  const scale      = 1 - stackIndex * 0.04
  const translateY = stackIndex * 8        // px ke atas per layer
  const opacity    = stackIndex <= 2 ? 1 - stackIndex * 0.15 : 0
  const zIndex     = total - stackIndex

  // ── DRAG TRANSFORM untuk kartu aktif ──
  const dragRotation   = isActive ? (drag.x / SWIPE_THRESHOLD) * ROTATION_MAX : 0
  const dragTranslateX = isActive ? drag.x : 0
  const dragTranslateY = isActive ? drag.y * 0.3 : 0

  // ── EXIT ANIMATION ──
  const exitTranslateX = exiting === 'left'  ? -window.innerWidth * 1.5
                        : exiting === 'right' ?  window.innerWidth * 1.5
                        : 0
  const exitRotation   = exiting === 'left'  ? -30
                        : exiting === 'right' ?  30
                        : 0

  const transform = exiting
    ? `translateX(${exitTranslateX}px) rotate(${exitRotation}deg) scale(${scale})` 
    : `translateX(${dragTranslateX}px) translateY(${translateY - dragTranslateY}px) rotate(${dragRotation}deg) scale(${scale})` 

  const transition = exiting
    ? 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)'
    : drag.active
      ? 'none'
      : 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)'

  // ── POINTER EVENTS ──
  const handlePointerDown = useCallback((e: PointerEvent<HTMLDivElement>) => {
    if (!isActive || exiting) return
    e.currentTarget.setPointerCapture(e.pointerId)
    startPos.current = { x: e.clientX, y: e.clientY }
    setDrag({ x: 0, y: 0, active: true })
  }, [isActive, exiting])

  const handlePointerMove = useCallback((e: PointerEvent<HTMLDivElement>) => {
    if (!drag.active || !isActive) return
    setDrag({
      x: e.clientX - startPos.current.x,
      y: e.clientY - startPos.current.y,
      active: true,
    })
  }, [drag.active, isActive])

  const handlePointerUp = useCallback(() => {
    if (!drag.active || !isActive) return
    setDrag(d => ({ ...d, active: false }))

    if (drag.x < -SWIPE_THRESHOLD) {
      setExiting('left')
      setTimeout(() => { onSwipeLeft?.(); setExiting(null) }, 400)
    } else if (drag.x > SWIPE_THRESHOLD) {
      setExiting('right')
      setTimeout(() => { onSwipeRight?.(); setExiting(null) }, 400)
    } else {
      setDrag({ x: 0, y: 0, active: false })
    }
  }, [drag, isActive, onSwipeLeft, onSwipeRight])

  // Apakah drag cukup jauh untuk swipe?
  const swipeIndicator =
    drag.x < -SWIPE_THRESHOLD * 0.6 ? 'left'  :
    drag.x >  SWIPE_THRESHOLD * 0.6 ? 'right' : null

  return (
    <div
      ref={cardRef}
      className="absolute w-full"
      style={{
        transform,
        transition,
        zIndex,
        opacity,
        touchAction: isActive ? 'none' : 'auto',
        cursor: isActive ? (drag.active ? 'grabbing' : 'grab') : 'default',
        userSelect: 'none',
        willChange: 'transform',
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* Swipe indicator overlay */}
      {isActive && swipeIndicator && (
        <>
          {swipeIndicator === 'left' && (
            <div className="absolute inset-0 rounded-2xl z-10 pointer-events-none
                            flex items-start justify-start p-5"
                 style={{ background: 'rgba(239,68,68,0.15)', border: '2.5px solid #ef4444' }}>
              <div className="px-3 py-1.5 rounded-xl font-black text-red-500 text-sm rotate-[-15deg]"
                   style={{ border: '2px solid #ef4444', background: 'white' }}>
                SKIP
              </div>
            </div>
          )}
          {swipeIndicator === 'right' && (
            <div className="absolute inset-0 rounded-2xl z-10 pointer-events-none
                            flex items-start justify-end p-5"
                 style={{ background: 'rgba(34,197,94,0.15)', border: '2.5px solid #22c55e' }}>
              <div className="px-3 py-1.5 rounded-xl font-black text-green-600 text-sm rotate-[15deg]"
                   style={{ border: '2px solid #22c55e', background: 'white' }}>
                PAHAM ✓
              </div>
            </div>
          )}
        </>
      )}

      {children}
    </div>
  )
}
