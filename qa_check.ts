import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log("=== QA CHECKLIST START ===");
    
    // 1. Migration berhasil, field subBab ada
    // Jika tidak ada, script ini akan error saat compile/run
    
    // 2. Total soal = 210
    const count = await prisma.question.count();
    console.log(`[QA] Total soal di database: ${count} (Harus 210) => ${count === 210 ? 'PASSED' : 'FAILED'}`);
    
    // 3. Setiap level x subBab = tepat 10 soal
    const byLevel = await prisma.question.groupBy({ by: ['level', 'subBab'], _count: true });
    let distributionPassed = true;
    const levels = ['EASY', 'MEDIUM', 'HARD'];
    const subBabs = [0, 1, 2, 3, 4, 5, 6];
    
    if (byLevel.length !== 21) { // 3 * 7 = 21 combinations
        distributionPassed = false;
        console.log(`[QA] Kombinasi level x subBab tidak lengkap (Hanya ada ${byLevel.length}/21) => FAILED`);
    } else {
        for (const group of byLevel) {
            if (group._count !== 10) {
                distributionPassed = false;
                console.log(`[QA] Level ${group.level} SubBab ${group.subBab} memiliki ${group._count} soal (Harus 10) => FAILED`);
            }
        }
        if (distributionPassed) {
            console.log(`[QA] Setiap level x subBab = tepat 10 soal => PASSED`);
        }
    }
    
    // 4 & 5 & 6. Options (3 elemen), correctIndex (0,1,2), educationalFact (!empty)
    const allQuestions = await prisma.question.findMany();
    let optionsPassed = true;
    let correctIndexPassed = true;
    let factPassed = true;
    
    let failedOptionIds = [];
    let failedIndexIds = [];
    let failedFactIds = [];
    
    for (const q of allQuestions) {
        // Options check
        const opts = q.options as any[];
        if (!Array.isArray(opts) || opts.length !== 3) {
            optionsPassed = false;
            failedOptionIds.push(q.id);
        }
        // correctIndex check
        if (![0, 1, 2].includes(q.correctIndex)) {
            correctIndexPassed = false;
            failedIndexIds.push(q.id);
        }
        // educationalFact check
        if (!q.educationalFact || q.educationalFact.trim() === '') {
            factPassed = false;
            failedFactIds.push(q.id);
        }
    }
    
    console.log(`[QA] Setiap soal memiliki options array dengan 3 elemen (A,B,C) => ${optionsPassed ? 'PASSED' : `FAILED (Invalid IDs: ${failedOptionIds.slice(0,5).join(', ')}...)`}`);
    console.log(`[QA] correctIndex bernilai 0, 1, atau 2 => ${correctIndexPassed ? 'PASSED' : `FAILED (Invalid IDs: ${failedIndexIds.slice(0,5).join(', ')}...)`}`);
    console.log(`[QA] educationalFact tidak kosong => ${factPassed ? 'PASSED' : `FAILED (Invalid IDs: ${failedFactIds.slice(0,5).join(', ')}...)`}`);
    
    console.log("=== QA CHECKLIST END ===");
}

main().catch(console.error).finally(() => prisma.$disconnect());
