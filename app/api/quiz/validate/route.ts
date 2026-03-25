import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ── In-memory rate limiter (per IP, 1 request per 2 seconds) ──
const rateLimitMap = new Map<string, number>();

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const lastRequest = rateLimitMap.get(ip);

    if (lastRequest && now - lastRequest < 2000) {
        return true; // Too soon
    }

    rateLimitMap.set(ip, now);

    // Cleanup old entries every 100 requests
    if (rateLimitMap.size > 1000) {
        const cutoff = now - 10000;
        const entries = Array.from(rateLimitMap.entries());
        for (const [key, time] of entries) {
            if (time < cutoff) rateLimitMap.delete(key);
        }
    }

    return false;
}

export async function POST(request: NextRequest) {
    try {
        // Rate limit check
        const ip =
            request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
            request.headers.get("x-real-ip") ||
            "unknown";

        if (isRateLimited(ip)) {
            return NextResponse.json(
                { error: "Too many requests. Wait 2 seconds." },
                { status: 429 }
            );
        }

        const body = await request.json();
        const { questionId, selectedIndex } = body;

        if (!questionId || selectedIndex === undefined || selectedIndex === null) {
            return NextResponse.json(
                { error: "Missing questionId or selectedIndex" },
                { status: 400 }
            );
        }

        if (
            typeof selectedIndex !== "number" ||
            selectedIndex < 0 ||
            selectedIndex > 3
        ) {
            return NextResponse.json(
                { error: "selectedIndex must be 0-3" },
                { status: 400 }
            );
        }

        // Lookup question from database
        const question = await prisma.question.findUnique({
            where: { id: questionId },
            select: {
                correctIndex: true,
                educationalFact: true,
            },
        });

        if (!question) {
            return NextResponse.json(
                { error: "Question not found" },
                { status: 404 }
            );
        }

        const correct = question.correctIndex === selectedIndex;

        return NextResponse.json({
            correct,
            correctIndex: question.correctIndex,
            educationalFact: question.educationalFact,
        });
    } catch (error) {
        console.error("Quiz validate error:", error);
        return NextResponse.json(
            { error: "Validation failed" },
            { status: 500 }
        );
    }
}
