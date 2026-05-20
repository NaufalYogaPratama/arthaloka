import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const allQuestions = await prisma.question.findMany();
    for (const q of allQuestions) {
        const opts = q.options as any[];
        if (!Array.isArray(opts) || opts.length !== 3) {
            console.log(`Failed ID: ${q.id}, subBab: ${q.subBab}, level: ${q.level}, options length: ${opts ? opts.length : 'null'}`);
            console.log(`Text: ${q.questionText}`);
            console.log(`Options:`, opts);
        }
    }
}

main().catch(console.error).finally(() => prisma.$disconnect());
