import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const levelParam = searchParams.get("level");

        if (!levelParam || !["easy", "medium", "hard"].includes(levelParam)) {
            return NextResponse.json(
                { error: "Invalid level. Use: easy, medium, or hard" },
                { status: 400 }
            );
        }

        const level = levelParam.toUpperCase() as "EASY" | "MEDIUM" | "HARD";

        // Fetch 10 random questions for the level
        // Using raw query for random ordering (Prisma doesn't support ORDER BY RANDOM natively)
        const questions = await prisma.$queryRaw<
            Array<{
                id: string;
                questionText: string;
                options: string[];
            }>
        >`
            SELECT id, "questionText", options
            FROM "Question"
            WHERE level = ${level}::"Level"
            ORDER BY RANDOM()
            LIMIT 10
        `;

        // SECURITY: correctIndex is NOT included in the SELECT — never sent to client
        return NextResponse.json(questions);
    } catch (error) {
        console.error("Quiz fetch error:", error);
        return NextResponse.json(
            { error: "Failed to fetch questions" },
            { status: 500 }
        );
    }
}
