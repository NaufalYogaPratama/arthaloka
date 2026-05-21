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

        const allQuestions = await prisma.question.findMany({
            where: { level },
        });

        // Group by subBab
        const bySubBab: Record<number, typeof allQuestions> = {};
        for (const q of allQuestions) {
            if (!bySubBab[q.subBab]) bySubBab[q.subBab] = [];
            bySubBab[q.subBab].push(q);
        }

        const selectedQuestions: typeof allQuestions = [];
        
        // 1. Pick 1 random question from each subBab (7 subBabs total)
        for (let i = 0; i <= 6; i++) {
            if (bySubBab[i] && bySubBab[i].length > 0) {
                const randIdx = Math.floor(Math.random() * bySubBab[i].length);
                selectedQuestions.push(bySubBab[i][randIdx]);
                // Remove the selected question from the pool
                bySubBab[i].splice(randIdx, 1);
            }
        }

        // 2. Pick remaining questions (to make it 10 total) from the rest pool
        const remainingQuestions = Object.values(bySubBab).flat();
        const needed = 10 - selectedQuestions.length;
        for (let i = 0; i < needed; i++) {
            if (remainingQuestions.length > 0) {
                const randIdx = Math.floor(Math.random() * remainingQuestions.length);
                selectedQuestions.push(remainingQuestions[randIdx]);
                remainingQuestions.splice(randIdx, 1);
            }
        }

        // 3. Shuffle the 10 selected questions
        for (let i = selectedQuestions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [selectedQuestions[i], selectedQuestions[j]] = [selectedQuestions[j], selectedQuestions[i]];
        }

        // 4. Remove correctIndex for security
        const safeQuestions = selectedQuestions.map(({ correctIndex, ...safe }) => safe);

        return NextResponse.json(safeQuestions);
    } catch (error) {
        console.error("Quiz fetch error:", error);
        return NextResponse.json(
            { error: "Failed to fetch questions" },
            { status: 500 }
        );
    }
}
