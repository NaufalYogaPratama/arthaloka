import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProfileClient } from "@/components/profile/ProfileClient";

export default async function ProfilePage() {
  const session = await auth();

  // Redirect guest ke login
  if (
    !session ||
    !session.user?.id ||
    (session.user as Record<string, unknown>).authProvider === "GUEST"
  ) {
    redirect("/?message=login-required");
  }

  const userId = session.user.id;

  // Ambil data dari DB — query yang efisien
  const [allSessions, leaderboardEntries] = await Promise.all([
    // Semua game sessions user (max 50 terbaru)
    prisma.gameSession.findMany({
      where: { userId },
      orderBy: { completedAt: "desc" },
      take: 50,
    }),
    // Posisi di leaderboard per level
    prisma.leaderboard.findMany({
      where: { userId },
    }),
  ]);

  // Hitung statistik server-side
  const stats = {
    totalSessions: allSessions.length,
    totalByLevel: {
      easy: allSessions.filter((s) => s.level === "EASY").length,
      medium: allSessions.filter((s) => s.level === "MEDIUM").length,
      hard: allSessions.filter((s) => s.level === "HARD").length,
    },
    bestScores: {
      easy: leaderboardEntries.find((l) => l.level === "EASY")?.highestScore ?? 0,
      medium:
        leaderboardEntries.find((l) => l.level === "MEDIUM")?.highestScore ?? 0,
      hard: leaderboardEntries.find((l) => l.level === "HARD")?.highestScore ?? 0,
    },
    avgScore:
      allSessions.length > 0
        ? Math.round(
            allSessions.reduce((sum, s) => sum + s.score, 0) / allSessions.length
          )
        : 0,
    maxComboEver:
      allSessions.length > 0
        ? Math.max(...allSessions.map((s) => s.maxCombo))
        : 0,
    perfectClears: allSessions.filter((s) => s.livesRemaining === 3).length,
    recentSessions: allSessions.slice(0, 10).map((s) => ({
      id: s.id,
      level: s.level.toLowerCase() as "easy" | "medium" | "hard",
      score: s.score,
      maxCombo: s.maxCombo,
      livesRemaining: s.livesRemaining,
      completedAt: s.completedAt.toISOString(),
    })),
  };

  return (
    <ProfileClient
      userName={session.user.name ?? "Player"}
      userEmail={session.user.email ?? ""}
      stats={stats}
    />
  );
}
