"use client";

import { motion } from "framer-motion";

interface MascotPopupProps {
    livesRemaining: number; // 0, 1, or 2
    onContinue: () => void;
    onRestart?: () => void;
}

const messages: Record<number, { text: string; subtext: string }> = {
    2: {
        text: "Ayo, kamu pasti bisa! Pikirkan lagi ya! 💪",
        subtext: "Jangan menyerah, masih ada kesempatan!",
    },
    1: {
        text: "Hati-hati! Nyawa tinggal 1! ⚠️ Pikirkan baik-baik!",
        subtext: "Satu kesalahan lagi dan permainan berakhir...",
    },
    0: {
        text: "It's okay, you did your best! 🦧",
        subtext: "Gagal itu guru terbaik. Ayo coba lagi!",
    },
};

export default function MascotPopup({
    livesRemaining,
    onContinue,
    onRestart,
}: MascotPopupProps) {
    const msg = messages[livesRemaining] || messages[2];
    const isGameOver = livesRemaining === 0;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[95] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        >
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6 text-center"
            >
                {/* Mascot emoji with bounce */}
                <motion.div
                    animate={{
                        y: [0, -15, 0, -8, 0],
                    }}
                    transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        repeatDelay: 1.5,
                    }}
                    className="text-7xl mb-4"
                >
                    🦧
                </motion.div>

                {/* Lives indicator */}
                <div className="flex justify-center gap-1 mb-3">
                    {[0, 1, 2].map((i) => (
                        <span
                            key={i}
                            className={`text-xl transition-all duration-300 ${i < livesRemaining
                                    ? "opacity-100"
                                    : "opacity-30 grayscale"
                                }`}
                        >
                            ❤️
                        </span>
                    ))}
                </div>

                {/* Message */}
                <h3 className="font-fredoka text-lg font-bold text-gray-800 mb-2">
                    {msg.text}
                </h3>
                <p className="text-sm text-gray-500 mb-6">{msg.subtext}</p>

                {/* Action buttons */}
                {isGameOver ? (
                    <div className="flex flex-col gap-3">
                        <button
                            onClick={onRestart}
                            className="w-full py-3 rounded-2xl bg-gradient-to-r from-orange-400 to-red-500 text-white font-bold shadow-lg shadow-orange-500/25 hover:shadow-xl transition-all active:scale-[0.98]"
                        >
                            🔄 Coba Lagi!
                        </button>
                        <button
                            onClick={() =>
                                (window.location.href = "/")
                            }
                            className="w-full py-3 rounded-2xl bg-white border-2 border-gray-200 text-gray-600 font-bold hover:border-orange-400 transition-all active:scale-[0.98]"
                        >
                            Menu Utama
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={onContinue}
                        className="w-full py-3 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold shadow-lg shadow-green-500/25 hover:shadow-xl transition-all active:scale-[0.98]"
                    >
                        Lanjut →
                    </button>
                )}
            </motion.div>
        </motion.div>
    );
}
