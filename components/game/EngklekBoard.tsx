'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '@/store/gameStore'
import { CharacterDisplay } from './CharacterDisplay'
import { BOARD_ASSET, STONE_ASSETS, getArrowAsset } from '@/lib/assets'
import type { GameLevel, StoneState, ArrowDirection, ArrowStyle } from '@/types/game'

// Coordinate map as percentages (0-100) relative to the 665x940 board image
const PETAK_POSITIONS: Record<string | number, { topPct: number; leftPct: number }> = {
    'start': { topPct: 88, leftPct: 50 },
    1: { topPct: 74, leftPct: 50 },
    2: { topPct: 58, leftPct: 25 },
    3: { topPct: 58, leftPct: 75 },
    4: { topPct: 44, leftPct: 50 },
    5: { topPct: 33, leftPct: 25 },
    6: { topPct: 33, leftPct: 75 },
    7: { topPct: 16, leftPct: 50 },  // naik dari 12% → 16%
}

interface EngklekBoardProps {
    onStoneAnimationComplete?: () => void
    onCharacterAnimationComplete?: () => void
    animatingPath?: string[]
}

export default function EngklekBoard({
    onStoneAnimationComplete,
    onCharacterAnimationComplete,
    animatingPath,
}: EngklekBoardProps) {
    const level = useGameStore((s) => s.level) as GameLevel | null
    const stonePosition = useGameStore((s) => s.stonePosition)
    const stoneState = useGameStore((s) => s.stoneState)
    const characterPosition = useGameStore((s) => s.characterPosition)
    const characterExpression = useGameStore((s) => s.characterExpression)
    const arrowDirection = useGameStore((s) => s.arrowDirection)
    const arrowStyle = useGameStore((s) => s.arrowStyle)
    const showArrow = useGameStore((s) => s.showArrow)
    const phase = useGameStore((s) => s.phase)
    const setCharacterPosition = useGameStore((s) => s.setCharacterPosition)

    // Animations
    const [stoneAnimating, setStoneAnimating] = useState(false)
    const [stoneVisible, setStoneVisible] = useState(false)
    const [charAnimating, setCharAnimating] = useState(false)

    // Trigger stone throw
    useEffect(() => {
        if (phase === 'throwing' && stonePosition) {
            setStoneAnimating(true)
            setStoneVisible(true)
            // Simulate throw duration
            setTimeout(() => {
                setStoneAnimating(false)
                onStoneAnimationComplete?.()
            }, 1200)
        }
    }, [phase, stonePosition]) // eslint-disable-line react-hooks/exhaustive-deps

    // Animate character along path
    useEffect(() => {
        if (!animatingPath || animatingPath.length === 0 || charAnimating) return

        setCharAnimating(true)
        let currentStep = 0

        const stepThrough = () => {
            if (currentStep < animatingPath.length) {
                setCharacterPosition(animatingPath[currentStep])
                currentStep++
                setTimeout(stepThrough, 400)
            } else {
                setCharAnimating(false)
                onCharacterAnimationComplete?.()
            }
        }

        setTimeout(stepThrough, 200)
    }, [animatingPath]) // eslint-disable-line react-hooks/exhaustive-deps

    const getPositionStyle = (petak: string | number) => {
        // If side-by-side like "2-3", position in center between them
        if (petak === "2-3") {
            const top = PETAK_POSITIONS[2].topPct;
            return { top: `${top}%`, left: '50%' }
        }
        if (petak === "5-6") {
            const top = PETAK_POSITIONS[5].topPct;
            return { top: `${top}%`, left: '50%' }
        }
        const pos = PETAK_POSITIONS[petak]
        if (!pos) return { top: '88%', left: '50%' }
        return { top: `${pos.topPct}%`, left: `${pos.leftPct}%` }
    }

    const charPosStyle = getPositionStyle(characterPosition)
    const stonePosStyle = stonePosition ? getPositionStyle(stonePosition) : null

    return (
        <div
            className="relative w-full max-w-[360px] mx-auto"
            style={{
                paddingTop: '80px',   // ruang untuk kepala karakter di petak 7
                overflow: 'visible',  // WAJIB: karakter boleh overflow ke atas
            }}
        >
            {/* Background Board */}
            <Image
                src={BOARD_ASSET.src}
                alt="Papan Engklek"
                width={BOARD_ASSET.width}
                height={BOARD_ASSET.height}
                className="w-full h-auto pointer-events-none select-none"
                priority
            />

            {/* Frame overlay */}
            <div className="absolute inset-0 pointer-events-none" style={{ overflow: 'visible' }}>

                {/* Stone Layer */}
                <AnimatePresence>
                    {stoneVisible && stonePosition && stonePosStyle && (
                        <motion.div
                            className="absolute"
                            initial={stoneAnimating ? { top: '100%', left: '10%', scale: 2, opacity: 0 } : false}
                            animate={{
                                top: stonePosStyle.top,
                                left: stonePosStyle.left,
                                x: '-50%',
                                y: '-50%',
                                scale: 1,
                                opacity: 1,
                                rotate: stoneAnimating ? [0, 180, 360] : 0,
                            }}
                            transition={{ duration: stoneAnimating ? 1.2 : 0, ease: 'easeInOut' }}
                        >
                            <Image
                                src={STONE_ASSETS[stoneState].src}
                                alt="Batu"
                                width={STONE_ASSETS[stoneState].width}
                                height={STONE_ASSETS[stoneState].height}
                                className="w-[50px] h-auto drop-shadow-md"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Arrow Layer */}
                {showArrow && arrowDirection && (
                    <motion.div
                        className="absolute z-10 opacity-90"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: [0.5, 1, 0.5], scale: 1 }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        style={{
                            top: charPosStyle.top,
                            left: charPosStyle.left,
                            transform: 'translate(-50%, -100%)',
                        }}
                    >
                        <Image
                            src={getArrowAsset(arrowDirection, arrowStyle).src}
                            alt="Arrow indicator"
                            width={60}
                            height={60} // approximate
                            className="w-[60px] h-auto object-contain drop-shadow"
                        />
                    </motion.div>
                )}

                {/* Character Layer */}
                {level && (
                    <motion.div
                        className="absolute z-20"
                        animate={{
                            top: charPosStyle.top,
                            left: charPosStyle.left,
                            x: '-50%',
                            y: '-88%', // Anchor from bottom: character stands on the petak
                        }}
                        transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 20,
                            mass: 0.8,
                        }}
                    >
                        <CharacterDisplay
                            level={level}
                            expression={characterExpression}
                            displayHeight={130}
                        />
                    </motion.div>
                )}
            </div>
        </div>
    )
}
