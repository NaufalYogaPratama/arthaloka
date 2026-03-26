"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/store/gameStore";

// ── SVG coordinate map for each position ──
// Board viewBox: 0 0 320 520
const BOARD_WIDTH = 320;
const PETAK_W = 110;
const PETAK_H = 80;
const PETAK_W_HALF = 100; // Narrower for side-by-side petaks
const GAP = 8;

// Center X positions
const CENTER_X = BOARD_WIDTH / 2;
const LEFT_X = 75;
const RIGHT_X = 245;

interface PetakDef {
    id: number;
    x: number;
    y: number;
    w: number;
    h: number;
    label: string;
    color: string;
    stoneColor: string;
    stoneBorder: string;
}

const PETAKS: PetakDef[] = [
    // Petak 7 — KEPALA (top, center)
    {
        id: 7,
        x: CENTER_X - PETAK_W / 2,
        y: 20,
        w: PETAK_W,
        h: PETAK_H,
        label: "7",
        color: "#fde047", // yellow
        stoneColor: "#fecaca",
        stoneBorder: "#ef4444",
    },
    // Petak 5 — left
    {
        id: 5,
        x: LEFT_X - PETAK_W_HALF / 2,
        y: 20 + PETAK_H + GAP,
        w: PETAK_W_HALF,
        h: PETAK_H,
        label: "5",
        color: "#86efac", // green
        stoneColor: "#fecaca",
        stoneBorder: "#ef4444",
    },
    // Petak 6 — right
    {
        id: 6,
        x: RIGHT_X - PETAK_W_HALF / 2,
        y: 20 + PETAK_H + GAP,
        w: PETAK_W_HALF,
        h: PETAK_H,
        label: "6",
        color: "#86efac",
        stoneColor: "#fecaca",
        stoneBorder: "#ef4444",
    },
    // Petak 4 — center
    {
        id: 4,
        x: CENTER_X - PETAK_W / 2,
        y: 20 + (PETAK_H + GAP) * 2,
        w: PETAK_W,
        h: PETAK_H,
        label: "4",
        color: "#93c5fd", // sky blue
        stoneColor: "#fecaca",
        stoneBorder: "#ef4444",
    },
    // Petak 2 — left
    {
        id: 2,
        x: LEFT_X - PETAK_W_HALF / 2,
        y: 20 + (PETAK_H + GAP) * 3,
        w: PETAK_W_HALF,
        h: PETAK_H,
        label: "2",
        color: "#86efac",
        stoneColor: "#fecaca",
        stoneBorder: "#ef4444",
    },
    // Petak 3 — right
    {
        id: 3,
        x: RIGHT_X - PETAK_W_HALF / 2,
        y: 20 + (PETAK_H + GAP) * 3,
        w: PETAK_W_HALF,
        h: PETAK_H,
        label: "3",
        color: "#86efac",
        stoneColor: "#fecaca",
        stoneBorder: "#ef4444",
    },
    // Petak 1 — center
    {
        id: 1,
        x: CENTER_X - PETAK_W / 2,
        y: 20 + (PETAK_H + GAP) * 4,
        w: PETAK_W,
        h: PETAK_H,
        label: "1",
        color: "#93c5fd",
        stoneColor: "#fecaca",
        stoneBorder: "#ef4444",
    },
];

// START area
const START_Y = 20 + (PETAK_H + GAP) * 5;
const START_DEF = {
    x: CENTER_X - PETAK_W / 2,
    y: START_Y,
    w: PETAK_W,
    h: 60,
};

const SVG_HEIGHT = START_Y + START_DEF.h + 20;

// ── Character position coordinate map ──
function getPetakCenter(id: number): { x: number; y: number } {
    const p = PETAKS.find((p) => p.id === id);
    if (!p) return { x: CENTER_X, y: START_DEF.y + START_DEF.h / 2 };
    return { x: p.x + p.w / 2, y: p.y + p.h / 2 };
}

export function getCharacterCoords(position: string): { x: number; y: number } {
    if (position === "start") {
        return { x: CENTER_X, y: START_DEF.y + START_DEF.h / 2 };
    }

    // Handle side-by-side positions like "2-3" or "5-6"
    if (position === "2-3") {
        return { x: CENTER_X, y: getPetakCenter(2).y };
    }
    if (position === "5-6") {
        return { x: CENTER_X, y: getPetakCenter(5).y };
    }

    const num = parseInt(position, 10);
    if (!isNaN(num) && num >= 1 && num <= 7) {
        return getPetakCenter(num);
    }

    return { x: CENTER_X, y: START_DEF.y + START_DEF.h / 2 };
}

// ── Stone throw animation: compute parabolic arc keyframes ──
function getParabolicArc(
    targetX: number,
    targetY: number
): { xKeyframes: number[]; yKeyframes: number[] } {
    // Stone starts from above the board, slightly to the left
    const startX = 40;
    const startY = -60;
    // Higher arc for farther throws (more distance -> higher peak).
    const peakPadding = 120 + Math.abs(targetX - CENTER_X) * 0.25;
    const peakY = Math.min(startY, targetY) - peakPadding; // Arc peak above both points

    const easeInOutQuad = (t: number) =>
        t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

    const steps = 12;
    const xKeyframes: number[] = [];
    const yKeyframes: number[] = [];

    for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const te = easeInOutQuad(t);

        // Smooth interpolation for X
        const x = startX + (targetX - startX) * te;

        // Parabolic interpolation for Y (quadratic bezier-like)
        const y =
            (1 - te) * (1 - te) * startY +
            2 * (1 - te) * te * peakY +
            te * te * targetY;
        xKeyframes.push(x);
        yKeyframes.push(y);
    }

    return { xKeyframes, yKeyframes };
}

// ── Main Component ──
interface EngklekBoardProps {
    onStoneAnimationComplete?: () => void;
    onCharacterAnimationComplete?: () => void;
    animatingPath?: string[];
    level?: "easy" | "medium" | "hard" | null;
}

export default function EngklekBoard({
    onStoneAnimationComplete,
    onCharacterAnimationComplete,
    animatingPath,
    level,
}: EngklekBoardProps) {
    const stonePosition = useGameStore((s) => s.stonePosition);
    const characterPosition = useGameStore((s) => s.characterPosition);
    const phase = useGameStore((s) => s.phase);
    const setCharacterPosition = useGameStore((s) => s.setCharacterPosition);

    // Stone throw animation state
    const [stoneAnimating, setStoneAnimating] = useState(false);
    const [stoneVisible, setStoneVisible] = useState(false);
    const [stoneArc, setStoneArc] = useState<{
        xKeyframes: number[];
        yKeyframes: number[];
    } | null>(null);

    // Character hop animation
    const [charAnimating, setCharAnimating] = useState(false);

    // Trigger stone throw animation when phase becomes "throwing"
    useEffect(() => {
        if (phase === "throwing" && stonePosition) {
            const target = getPetakCenter(stonePosition);
            const arc = getParabolicArc(target.x, target.y);
            setStoneArc(arc);
            setStoneAnimating(true);
            setStoneVisible(true);
        }
    }, [phase, stonePosition]);

    // Animate character along path
    useEffect(() => {
        if (!animatingPath || animatingPath.length === 0 || charAnimating) return;

        setCharAnimating(true);
        let currentStep = 0;

        const stepThrough = () => {
            if (currentStep < animatingPath.length) {
                setCharacterPosition(animatingPath[currentStep]);
                currentStep++;
                setTimeout(stepThrough, 400);
            } else {
                setCharAnimating(false);
                onCharacterAnimationComplete?.();
            }
        };

        // Start after a brief delay
        setTimeout(stepThrough, 200);
    }, [animatingPath]); // eslint-disable-line react-hooks/exhaustive-deps

    const charCoords = getCharacterCoords(characterPosition);

    return (
        <div className="w-full flex justify-center px-2">
            <svg
                viewBox={`0 0 ${BOARD_WIDTH} ${SVG_HEIGHT}`}
                className="w-full max-w-[360px] h-auto drop-shadow-lg"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Background */}
                <rect
                    x="0"
                    y="0"
                    width={BOARD_WIDTH}
                    height={SVG_HEIGHT}
                    rx="16"
                    fill="#f0fdf4"
                    stroke="#bbf7d0"
                    strokeWidth="2"
                />

                {/* Ground pattern — subtle grass lines */}
                {[...Array(8)].map((_, i) => (
                    <line
                        key={`grass-${i}`}
                        x1={30 + i * 38}
                        y1={SVG_HEIGHT - 10}
                        x2={35 + i * 38}
                        y2={SVG_HEIGHT - 18}
                        stroke="#86efac"
                        strokeWidth="2"
                        strokeLinecap="round"
                        opacity={0.5}
                    />
                ))}

                {/* START area */}
                <rect
                    x={START_DEF.x}
                    y={START_DEF.y}
                    width={START_DEF.w}
                    height={START_DEF.h}
                    rx="12"
                    fill="#22c55e"
                    stroke="#16a34a"
                    strokeWidth="2.5"
                />
                <text
                    x={CENTER_X}
                    y={START_DEF.y + START_DEF.h / 2 + 5}
                    textAnchor="middle"
                    fill="white"
                    fontWeight="800"
                    fontSize="16"
                    fontFamily="var(--font-fredoka), Fredoka, cursive"
                >
                    START
                </text>

                {/* Petaks */}
                {PETAKS.map((petak) => {
                    const hasStone = stonePosition === petak.id && stoneVisible;
                    const bg = hasStone ? petak.stoneColor : petak.color;
                    const border = hasStone ? petak.stoneBorder : "#00000020";
                    const borderW = hasStone ? 3 : 1.5;

                    return (
                        <g key={petak.id}>
                            <rect
                                x={petak.x}
                                y={petak.y}
                                width={petak.w}
                                height={petak.h}
                                rx="10"
                                fill={bg}
                                stroke={border}
                                strokeWidth={borderW}
                                className="transition-colors duration-300"
                            />
                            {/* Petak number label */}
                            <text
                                x={petak.x + petak.w / 2}
                                y={petak.y + petak.h / 2 + 6}
                                textAnchor="middle"
                                fill={hasStone ? "#dc2626" : "#00000040"}
                                fontWeight="700"
                                fontSize="22"
                                fontFamily="var(--font-fredoka), Fredoka, cursive"
                            >
                                {petak.id === 7 ? "★" : petak.label}
                            </text>

                            {/* Stone emoji on petak */}
                            {hasStone && !stoneAnimating && (
                                <text
                                    x={petak.x + petak.w / 2}
                                    y={petak.y + 22}
                                    textAnchor="middle"
                                    fontSize="18"
                                >
                                    🪨
                                </text>
                            )}
                        </g>
                    );
                })}

                {/* Dashed path connecting petaks */}
                <path
                    d={`
                        M ${CENTER_X} ${START_DEF.y}
                        L ${CENTER_X} ${PETAKS[6].y + PETAKS[6].h}
                        L ${CENTER_X} ${PETAKS[6].y}
                        L ${LEFT_X} ${PETAKS[4].y + PETAKS[4].h}
                        M ${CENTER_X} ${PETAKS[6].y}
                        L ${RIGHT_X} ${PETAKS[5].y + PETAKS[5].h}
                        M ${CENTER_X} ${PETAKS[3].y + PETAKS[3].h}
                        L ${CENTER_X} ${PETAKS[3].y}
                        L ${LEFT_X} ${PETAKS[1].y + PETAKS[1].h}
                        M ${CENTER_X} ${PETAKS[3].y}
                        L ${RIGHT_X} ${PETAKS[2].y + PETAKS[2].h}
                        M ${CENTER_X} ${PETAKS[3].y + PETAKS[3].h}
                        L ${CENTER_X} ${PETAKS[0].y + PETAKS[0].h}
                    `}
                    stroke="#00000010"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    fill="none"
                />
            </svg>

            {/* ── Framer Motion overlay layer (positioned on top of SVG) ── */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ maxWidth: "360px", margin: "0 auto" }}
            >
                {/* Stone throw animation */}
                <AnimatePresence>
                    {stoneAnimating && stoneArc && (
                        <motion.div
                            className="absolute text-2xl"
                            style={{ left: 0, top: 0 }}
                            initial={{ opacity: 1 }}
                            animate={{
                                x: stoneArc.xKeyframes,
                                y: stoneArc.yKeyframes,
                                opacity: 1,
                                rotate: [0, 180, 360],
                            }}
                            transition={{
                                duration: 1.2,
                                ease: "easeInOut",
                            }}
                            onAnimationComplete={() => {
                                setStoneAnimating(false);
                                onStoneAnimationComplete?.();
                            }}
                        >
                            🪨
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Character */}
                <motion.div
                    className="absolute text-3xl"
                    style={{
                        // Position relative to the SVG's coordinate system 
                        // This will be offset by the parent wrapper
                        left: 0,
                        top: 0,
                    }}
                    animate={{
                        x: charCoords.x - 16,
                        y: charCoords.y - 20,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                        mass: 0.8,
                    }}
                >
                    {level === "easy"
                        ? "🎒👦"
                        : level === "medium"
                            ? "👕👦"
                            : level === "hard"
                                ? "👔👦"
                                : "👦"}
                </motion.div>
            </div>
        </div>
    );
}
