import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const count = await prisma.question.count();
    console.log(`Total soal: ${count}`);
    const byLevel = await prisma.question.groupBy({ by: ['level', 'subBab'], _count: true });
    console.log(byLevel);
}

main().catch(console.error).finally(() => prisma.$disconnect());
