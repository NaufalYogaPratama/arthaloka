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
        year: "numeric",
        month: "short",
        day: "2-digit",
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
        <div className="overflow-hidden rounded-2xl border border-white/50 bg-white/70 backdrop-blur-xl shadow-sm">
            <div className="px-4 py-3 border-b border-white/50 flex items-center justify-between">
                <h2 className="font-fredoka text-lg font-bold text-gray-800 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-amber-500" /> Leaderboard
                </h2>
                <p className="text-xs text-gray-500">
                    Top {Math.min(10, rows.length)} pemain
                </p>
            </div>

            <table className="w-full text-left">
                <thead className="text-xs text-gray-500 bg-white/50">
                    <tr>
                        <th className="px-4 py-3">#</th>
                        <th className="px-4 py-3">Nama</th>
                        <th className="px-4 py-3 text-right">Skor</th>
                        <th className="px-4 py-3 text-right">
                            Terakhir Main
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => {
                        const isCurrent = row.userId === currentUserId;
                        const medal = getMedalIcon(row.rank);
                        const medalDisplaySize = 28;
                        return (
                            <tr
                                key={row.userId + row.rank}
                                className={
                                    isCurrent
                                        ? "bg-blue-100/80 font-bold"
                                        : row.rank <= 3
                                            ? "hover:bg-gray-50/60 font-bold"
                                            : "hover:bg-gray-50/60 font-medium"
                                }
                            >
                                <td className="px-4 py-3">
                                    <div className="flex justify-start flex-shrink-0 w-8">
                                        {medal ? (
                                            <Image
                                                src={medal.src}
                                                alt={`Rank ${row.rank}`}
                                                width={Math.round(medalDisplaySize * (medal.width / medal.height))}
                                                height={medalDisplaySize}
                                                className="object-contain"
                                                style={{
                                                    width: Math.round(medalDisplaySize * (medal.width / medal.height)),
                                                    height: medalDisplaySize
                                                }}
                                            />
                                        ) : (
                                            <span className="text-sm text-gray-500 font-bold inline-block px-1">{row.rank}</span>
                                        )}
                                    </div>
                                </td>
                                <td className={`px-4 py-3 font-semibold ${row.rank === 1 ? 'text-amber-700' : row.rank === 2 ? 'text-gray-600' : row.rank === 3 ? 'text-orange-700' : 'text-gray-800'}`}>
                                    {row.playerName} {isCurrent && <span className="text-blue-600 text-xs ml-1">(Kamu)</span>}
                                </td>
                                <td className={`px-4 py-3 text-right font-fredoka font-black ${row.rank === 1 ? 'text-amber-600' : 'text-amber-500'}`}>
                                    {row.highestScore}
                                </td>
                                <td className="px-4 py-3 text-right text-xs text-gray-500">
                                    {formatDate(row.updatedAt)}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

