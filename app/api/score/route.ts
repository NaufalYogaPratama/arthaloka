import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { PERFECT_CLEAR_BONUS } from "@/lib/scoring";

type Level = "easy" | "medium" | "hard";
type PrismaLevel = "EASY" | "MEDIUM" | "HARD";

type SessionUser = {
    id?: string;
    name?: string | null;
    email?: string | null;
    authProvider?: string;
};

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

export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        const sessionUser = session?.user as unknown as SessionUser | undefined;
        const sessionUserId = sessionUser?.id;

        if (!sessionUserId) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = (await request.json()) as {
            userId?: string;
            level?: Level | string;
            score?: unknown;
            maxCombo?: unknown;
            livesRemaining?: unknown;
        };

        const prismaLevel = toPrismaLevel(String(body.level ?? ""));
        if (!prismaLevel) {
            return NextResponse.json(
                { error: "Invalid level. Use: easy, medium, or hard" },
                { status: 400 }
            );
        }

        const score = body.score;
        const maxCombo = body.maxCombo;
        const livesRemaining = body.livesRemaining;

        if (typeof score !== "number" || !Number.isFinite(score) || score < 0) {
            return NextResponse.json(
                { error: "Invalid score" },
                { status: 400 }
            );
        }
        if (
            typeof maxCombo !== "number" ||
            !Number.isFinite(maxCombo) ||
            maxCombo < 0
        ) {
            return NextResponse.json(
                { error: "Invalid maxCombo" },
                { status: 400 }
            );
        }
        if (
            typeof livesRemaining !== "number" ||
            !Number.isFinite(livesRemaining) ||
            livesRemaining < 0
        ) {
            return NextResponse.json(
                { error: "Invalid livesRemaining" },
                { status: 400 }
            );
        }

        const requestUserId = body.userId;
        if (
            requestUserId &&
            requestUserId !== sessionUserId
        ) {
            return NextResponse.json(
                { error: "Forbidden" },
                { status: 403 }
            );
        }

        // Ensure user exists — handle email unique constraint
        const sessionUserName = sessionUser?.name ?? undefined;
        const sessionUserEmail = sessionUser?.email ?? undefined;
        const sessionAuthProvider = sessionUser?.authProvider ?? "GUEST";

        // Try to upsert by ID first
        try {
            await prisma.user.upsert({
                where: { id: sessionUserId },
                update: {
                    name: sessionUserName ?? null,
                    email: sessionUserEmail ?? null,
                },
                create: {
                    id: sessionUserId,
                    name: sessionUserName ?? null,
                    email: sessionUserEmail ?? null,
                    authProvider: sessionAuthProvider,
                },
            });
        } catch (e: unknown) {
            // If email conflict (P2002), update the existing user by email
            const isEmailConflict = 
                typeof e === "object" && 
                e !== null && 
                "code" in e && 
                (e as { code: string }).code === "P2002" &&
                "meta" in e &&
                typeof (e as { meta?: { target?: string[] } }).meta?.target?.includes === "function" &&
                (e as { meta: { target: string[] } }).meta.target.includes("email");

            if (isEmailConflict && sessionUserEmail) {
                // Update existing user by email
                await prisma.user.update({
                    where: { email: sessionUserEmail },
                    data: {
                        id: sessionUserId, // Take over this ID
                        name: sessionUserName ?? null,
                        authProvider: sessionAuthProvider,
                    },
                });
            } else {
                throw e; // Re-throw if not an email conflict we can handle
            }
        }

        const computedScore =
            score +
            (livesRemaining === 3 ? PERFECT_CLEAR_BONUS : 0);

        // Get previous best untuk response (optional, bisa null)
        const prevEntry = await prisma.leaderboard.findFirst({
            where: { userId: sessionUserId, level: prismaLevel },
        });
        const previousBest = prevEntry?.highestScore ?? 0;
        const isNewRecord = computedScore > previousBest;

        // Save session history.
        await prisma.gameSession.create({
            data: {
                userId: sessionUserId,
                level: prismaLevel,
                score: computedScore,
                maxCombo: Math.round(maxCombo),
                livesRemaining: Math.round(livesRemaining),
            },
        });

        // Upsert leaderboard — atomic operation, no race condition
        await prisma.leaderboard.upsert({
            where: {
                userId_level: {
                    userId: sessionUserId,
                    level: prismaLevel,
                },
            },
            update: isNewRecord ? { highestScore: computedScore } : {},
            create: {
                userId: sessionUserId,
                level: prismaLevel,
                highestScore: computedScore,
            },
        });

        return NextResponse.json({
            isNewRecord,
            previousBest,
        });
    } catch (error) {
        console.error("Score save error:", error);
        return NextResponse.json(
            { error: "Failed to save score" },
            { status: 500 }
        );
    }
}

