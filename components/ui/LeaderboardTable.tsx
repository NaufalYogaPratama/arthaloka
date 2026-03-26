import type React from "react";

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
                <h2 className="font-fredoka text-lg font-bold text-gray-800">
                    🏆 Leaderboard
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
                        const medal =
                            row.rank === 1
                                ? "🥇"
                                : row.rank === 2
                                    ? "🥈"
                                    : row.rank === 3
                                        ? "🥉"
                                        : null;
                        return (
                            <tr
                                key={row.userId + row.rank}
                                className={
                                    isCurrent
                                        ? "bg-blue-100/80"
                                        : "hover:bg-gray-50/60"
                                }
                            >
                                <td className="px-4 py-3 font-bold text-gray-700">
                                    <span className="inline-flex items-center gap-2">
                                        <span>{medal ? medal : row.rank}</span>
                                    </span>
                                </td>
                                <td className="px-4 py-3 font-semibold text-gray-800">
                                    {row.playerName}
                                </td>
                                <td className="px-4 py-3 text-right font-fredoka text-amber-500 font-bold">
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

