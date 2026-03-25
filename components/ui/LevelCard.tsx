"use client";

import { motion } from "framer-motion";

interface LevelCardProps {
    emoji: string;
    title: string;
    topics: string;
    description: string;
    color: "green" | "blue" | "red";
    onClick: () => void;
}

const colorMap = {
    green: {
        bg: "bg-gradient-to-br from-green-50 to-emerald-50",
        border: "border-green-200",
        hoverBorder: "hover:border-green-400",
        title: "text-green-700",
        emoji_bg: "bg-green-100",
        tag: "bg-green-100 text-green-700",
        btn: "bg-gradient-to-r from-green-500 to-emerald-500 shadow-green-500/25 hover:shadow-green-500/40",
    },
    blue: {
        bg: "bg-gradient-to-br from-blue-50 to-sky-50",
        border: "border-blue-200",
        hoverBorder: "hover:border-blue-400",
        title: "text-blue-700",
        emoji_bg: "bg-blue-100",
        tag: "bg-blue-100 text-blue-700",
        btn: "bg-gradient-to-r from-blue-500 to-sky-500 shadow-blue-500/25 hover:shadow-blue-500/40",
    },
    red: {
        bg: "bg-gradient-to-br from-red-50 to-orange-50",
        border: "border-red-200",
        hoverBorder: "hover:border-red-400",
        title: "text-red-700",
        emoji_bg: "bg-red-100",
        tag: "bg-red-100 text-red-700",
        btn: "bg-gradient-to-r from-red-500 to-orange-500 shadow-red-500/25 hover:shadow-red-500/40",
    },
};

export default function LevelCard({
    emoji,
    title,
    topics,
    description,
    color,
    onClick,
}: LevelCardProps) {
    const c = colorMap[color];

    return (
        <motion.div
            whileHover={{ scale: 1.04, y: -4 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={onClick}
            className={`cursor-pointer rounded-3xl p-6 border-2 ${c.bg} ${c.border} ${c.hoverBorder} shadow-md hover:shadow-xl transition-shadow duration-300`}
        >
            {/* Emoji */}
            <div
                className={`w-16 h-16 rounded-2xl ${c.emoji_bg} flex items-center justify-center text-3xl mb-4 mx-auto`}
            >
                {emoji}
            </div>

            {/* Title */}
            <h3
                className={`font-fredoka text-2xl font-bold ${c.title} text-center mb-2`}
            >
                {title}
            </h3>

            {/* Topics tag */}
            <div className="flex justify-center mb-3">
                <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${c.tag}`}
                >
                    {topics}
                </span>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-500 text-center leading-relaxed mb-5">
                {description}
            </p>

            {/* Play button */}
            <div
                className={`w-full py-3 rounded-2xl ${c.btn} text-white font-bold text-center text-sm shadow-lg transition-all duration-200`}
            >
                Mulai Bermain →
            </div>
        </motion.div>
    );
}
