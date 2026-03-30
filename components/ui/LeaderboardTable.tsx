import type React from "react";
import Image from "next/image";
import { getMedalIcon } from "@/lib/assets";
import { Trophy } from 'lucide-react'

export type LeaderboardRow = {
    rank: number;
    userId: string;
    playerName: string;
    highestScore: number;
    updatedAt: string | Date;
};

function formatDate(value: string | Date) {
    const d = typeof value === "string" ? new Date(value) : value;
    return new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "short",
    }).format(d);
}

export default function LeaderboardTable({
    rows,
    currentUserId,
}: {
    rows: LeaderboardRow[];
    currentUserId: string | null | undefined;
}) {
    return (
        <div
            className="rounded-2xl overflow-hidden"
            style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
            }}
        >
            {/* Header */}
            <div
                className="px-4 py-3 flex items-center justify-between"
                style={{
                    background: "linear-gradient(90deg, rgba(245,158,11,0.2), rgba(251,191,36,0.1))",
                    borderBottom: "1px solid rgba(245,158,11,0.2)",
                }}
            >
                <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-amber-400" />
                    <span className="text-amber-300 font-black text-sm tracking-wide">LEADERBOARD</span>
                </div>
                <span className="text-gray-500 text-xs">Top {Math.min(5, rows.length)} pemain</span>
            </div>

            {/* Column headers */}
            <div
                className="grid grid-cols-[40px_1fr_80px_70px] px-4 py-2"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
            >
                <span className="text-gray-600 text-[10px] font-bold">#</span>
                <span className="text-gray-600 text-[10px] font-bold">Nama</span>
                <span className="text-gray-600 text-[10px] font-bold text-right">Skor</span>
                <span className="text-gray-600 text-[10px] font-bold text-right">Tgl</span>
            </div>

            {/* Rows */}
            <div>
                {rows.slice(0, 5).map((row, idx) => {
                    const rank = idx + 1;
                    const isCurrentUser = row.userId === currentUserId;
                    const medal = getMedalIcon(rank);

                    // Row background per rank
                    const rowBg =
                        rank === 1
                            ? "linear-gradient(90deg, rgba(245,158,11,0.15), rgba(245,158,11,0.05))"
                            : rank === 2
                                ? "linear-gradient(90deg, rgba(148,163,184,0.12), rgba(148,163,184,0.04))"
                                : rank === 3
                                    ? "linear-gradient(90deg, rgba(180,120,60,0.12), rgba(180,120,60,0.04))"
                                    : isCurrentUser
                                        ? "rgba(59,130,246,0.1)"
                                        : "transparent";

                    return (
                        <div
                            key={row.userId + row.rank}
                            className="grid grid-cols-[40px_1fr_80px_70px] px-4 py-2.5 items-center"
                            style={{
                                background: rowBg,
                                borderBottom:
                                    idx < rows.slice(0, 5).length - 1
                                        ? "1px solid rgba(255,255,255,0.04)"
                                        : "none",
                            }}
                        >
                            {/* Rank / Medal */}
                            <div>
                                {rank <= 3 && medal ? (
                                    <Image
                                        src={medal.src}
                                        alt={`Rank ${rank}`}
                                        width={24}
                                        height={Math.round(24 * (medal.height / medal.width))}
                                        className="object-contain"
                                        style={{ width: 24, height: "auto" }}
                                    />
                                ) : (
                                    <div
                                        className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black"
                                        style={{ background: "rgba(255,255,255,0.08)", color: "#9ca3af" }}
                                    >
                                        {rank}
                                    </div>
                                )}
                            </div>

                            {/* Player name */}
                            <div className="min-w-0">
                                <p
                                    className="text-sm font-bold truncate"
                                    style={{
                                        color:
                                            rank === 1
                                                ? "#fcd34d"
                                                : rank === 2
                                                    ? "#cbd5e1"
                                                    : rank === 3
                                                        ? "#d97706"
                                                        : isCurrentUser
                                                            ? "#93c5fd"
                                                            : "#e2e8f0",
                                    }}
                                >
                                    {row.playerName}
                                    {isCurrentUser && (
                                        <span className="ml-1 text-[9px] text-blue-400 font-black">(Kamu)</span>
                                    )}
                                </p>
                            </div>

                            {/* Score */}
                            <p
                                className="text-right font-black tabular-nums text-sm"
                                style={{
                                    fontFamily: "var(--font-fredoka), Fredoka, cursive",
                                    color: rank <= 3 ? "#fbbf24" : "#e2e8f0",
                                }}
                            >
                                {row.highestScore.toLocaleString("id-ID")}
                            </p>

                            {/* Date */}
                            <p className="text-right text-[10px] text-gray-500 font-medium">
                                {formatDate(row.updatedAt)}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
