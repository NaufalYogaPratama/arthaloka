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

        const questions = await prisma.question.findMany({
            where: { level },
        });

        const safeQuestions = questions.map(({ correctIndex, ...safe }) => safe);

        return NextResponse.json(safeQuestions);
    } catch (error) {
        console.error("Quiz fetch error:", error);
        return NextResponse.json(
            { error: "Failed to fetch questions" },
            { status: 500 }
        );
    }
}
