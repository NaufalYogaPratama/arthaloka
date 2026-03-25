"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CountdownOverlayProps {
    onComplete: () => void;
}

const countdownItems = [3, 2, 1, "MULAI!"];

export default function CountdownOverlay({ onComplete }: CountdownOverlayProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visible, setVisible] = useState(true);

    const handleComplete = useCallback(onComplete, [onComplete]);

    useEffect(() => {
        if (currentIndex < countdownItems.length) {
            const timer = setTimeout(() => {
                if (currentIndex < countdownItems.length - 1) {
                    setCurrentIndex((prev) => prev + 1);
                } else {
                    // Last item shown, wait a moment then dismiss
                    setTimeout(() => {
                        setVisible(false);
                        handleComplete();
                    }, 600);
                }
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [currentIndex, handleComplete]);

    if (!visible) return null;

    const item = countdownItems[currentIndex];
    const isNumber = typeof item === "number";

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                        scale: [0, 1.3, 1],
                        opacity: [0, 1, 1],
                    }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{
                        duration: 0.5,
                        times: [0, 0.6, 1],
                        ease: "easeOut",
                    }}
                    className="flex items-center justify-center"
                >
                    {isNumber ? (
                        <span className="font-fredoka text-[120px] md:text-[160px] font-bold text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.5)]">
                            {item}
                        </span>
                    ) : (
                        <span className="font-fredoka text-[48px] md:text-[72px] font-bold text-amber-400 drop-shadow-[0_0_30px_rgba(251,191,36,0.6)]">
                            {item}
                        </span>
                    )}
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
}
