import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  const [sessions, leaderboard] = await Promise.all([
    prisma.gameSession.findMany({
      where: { userId },
      orderBy: { completedAt: "desc" },
      take: 50,
      select: {
        id: true,
        level: true,
        score: true,
        maxCombo: true,
        livesRemaining: true,
        completedAt: true,
      },
    }),
    prisma.leaderboard.findMany({ where: { userId } }),
  ]);

  return NextResponse.json({ sessions, leaderboard });
}
