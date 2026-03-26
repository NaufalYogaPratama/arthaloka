import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type PrismaLevel = "EASY" | "MEDIUM" | "HARD";

function toPrismaLevel(level: string): PrismaLevel | null {
    switch (level) {
        case "easy":
            return "EASY";
        case "medium":
            return "MEDIUM";
        case "hard":
            return "HARD";
        default:
            return null;
    }
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const levelParam = searchParams.get("level");

        if (!levelParam) {
            return NextResponse.json(
                { error: "Missing level query param" },
                { status: 400 }
            );
        }

        const prismaLevel = toPrismaLevel(levelParam);
        if (!prismaLevel) {
            return NextResponse.json(
                { error: "Invalid level. Use: easy, medium, or hard" },
                { status: 400 }
            );
        }

        const entries = await prisma.leaderboard.findMany({
            where: { level: prismaLevel },
            orderBy: [
                { highestScore: "desc" },
                { updatedAt: "desc" },
            ],
            take: 10,
            include: {
                user: {
                    select: { name: true },
                },
            },
        });

        const rows = entries.map((e, idx) => ({
            rank: idx + 1,
            userId: e.userId,
            playerName: e.user?.name ?? `Pemain_${idx + 1}`,
            highestScore: e.highestScore,
            updatedAt: e.updatedAt,
        }));

        return NextResponse.json(rows);
    } catch (error) {
        console.error("Leaderboard fetch error:", error);
        return NextResponse.json(
            { error: "Failed to fetch leaderboard" },
            { status: 500 }
        );
    }
}

