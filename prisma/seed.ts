import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const questions = [
    // ═══════════════════════════════════════════
    // EASY — budgeting, menabung, kebutuhan vs keinginan
    // ═══════════════════════════════════════════
    {
        level: "EASY",
        questionText: "Apa yang dimaksud dengan budgeting?",
        options: [
            "Menghabiskan uang sesuka hati",
            "Membuat rencana pengelolaan uang masuk dan keluar",
            "Meminjam uang dari bank",
            "Menyimpan semua uang tanpa digunakan",
        ],
        correctIndex: 1,
        educationalFact:
            "Budgeting adalah proses membuat rencana keuangan dengan mengatur pemasukan dan pengeluaran agar keuanganmu tetap sehat dan terkontrol.",
    },
    {
        level: "EASY",
        questionText:
            "Berapa persen pendapatan yang idealnya dialokasikan untuk tabungan menurut aturan 50/30/20?",
        options: ["10%", "15%", "20%", "50%"],
        correctIndex: 2,
        educationalFact:
            "Aturan 50/30/20 menyarankan 50% untuk kebutuhan pokok, 30% untuk keinginan, dan 20% untuk tabungan dan investasi.",
    },
    {
        level: "EASY",
        questionText: "Apa itu dana darurat?",
        options: [
            "Uang untuk liburan",
            "Uang cadangan untuk situasi mendesak yang tidak terduga",
            "Uang pinjaman dari teman",
            "Uang hasil investasi",
        ],
        correctIndex: 1,
        educationalFact:
            "Dana darurat idealnya mencakup 3–6 bulan pengeluaran. Ini adalah jaring pengaman finansial untuk kondisi tak terduga seperti sakit atau kehilangan pekerjaan.",
    },
    {
        level: "EASY",
        questionText:
            "Mana yang termasuk kebutuhan (bukan keinginan)?",
        options: [
            "Sepatu branded terbaru",
            "Langganan streaming film",
            "Makanan pokok sehari-hari",
            "Gadget keluaran terbaru",
        ],
        correctIndex: 2,
        educationalFact:
            "Kebutuhan adalah hal-hal esensial untuk bertahan hidup seperti makanan, tempat tinggal, dan pakaian dasar. Keinginan adalah hal yang membuat hidup lebih nyaman tapi bukan keharusan.",
    },
    {
        level: "EASY",
        questionText: "Apa manfaat utama dari menabung sejak dini?",
        options: [
            "Bisa membeli barang mahal langsung",
            "Mendapat bunga lebih banyak karena efek compounding",
            "Tidak perlu bekerja lagi",
            "Bisa pinjam uang lebih mudah",
        ],
        correctIndex: 1,
        educationalFact:
            "Menabung sejak dini memanfaatkan efek bunga berbunga (compound interest). Semakin awal menabung, semakin besar pertumbuhan uangmu seiring waktu.",
    },
    {
        level: "EASY",
        questionText: "Apa langkah pertama dalam membuat anggaran keuangan?",
        options: [
            "Langsung belanja",
            "Mencatat semua sumber pemasukan",
            "Meminjam uang",
            "Membeli asuransi",
        ],
        correctIndex: 1,
        educationalFact:
            "Langkah pertama budgeting adalah mengetahui berapa total pemasukanmu. Dari situ, kamu bisa mengalokasikan uang untuk kebutuhan, keinginan, dan tabungan.",
    },
    {
        level: "EASY",
        questionText:
            "Jika gajimu Rp 3.000.000, berapa idealnya untuk tabungan (aturan 20%)?",
        options: [
            "Rp 300.000",
            "Rp 600.000",
            "Rp 900.000",
            "Rp 1.500.000",
        ],
        correctIndex: 1,
        educationalFact:
            "20% dari Rp 3.000.000 adalah Rp 600.000. Menyisihkan tabungan di awal bulan (pay yourself first) lebih efektif daripada menabung sisa gaji.",
    },
    {
        level: "EASY",
        questionText: "Apa yang dimaksud dengan pengeluaran tetap (fixed expense)?",
        options: [
            "Belanja yang berubah-ubah setiap bulan",
            "Pengeluaran yang jumlahnya sama setiap bulan seperti cicilan atau sewa",
            "Uang jajan harian",
            "Biaya tak terduga",
        ],
        correctIndex: 1,
        educationalFact:
            "Pengeluaran tetap seperti sewa rumah, cicilan, dan tagihan listrik jumlahnya relatif sama setiap bulan. Kenali ini untuk mengatur budgetmu lebih akurat.",
    },
    {
        level: "EASY",
        questionText: "Mana cara menabung yang paling efektif?",
        options: [
            "Menabung sisa uang di akhir bulan",
            "Menyisihkan tabungan di awal begitu terima gaji",
            "Menunggu sampai punya banyak uang baru menabung",
            "Menyimpan uang di bawah bantal",
        ],
        correctIndex: 1,
        educationalFact:
            "Metode 'Pay Yourself First' berarti langsung menyisihkan tabungan begitu menerima pemasukan, sebelum digunakan untuk hal lain. Ini terbukti lebih efektif!",
    },
    {
        level: "EASY",
        questionText:
            "Apa risiko utama jika seseorang tidak punya tabungan sama sekali?",
        options: [
            "Tidak bisa beli barang mahal",
            "Harus berhutang saat ada keadaan darurat",
            "Tidak bisa traveling",
            "Tidak bisa ikut tren terbaru",
        ],
        correctIndex: 1,
        educationalFact:
            "Tanpa tabungan, kamu dipaksa berhutang saat ada keadaan darurat. Hutang bisa menumpuk dengan bunga dan menjadi beban keuangan jangka panjang.",
    },

    // ═══════════════════════════════════════════
    // MEDIUM — impulsive buying, FOMO, kartu kredit, Pay Later, hutang
    // ═══════════════════════════════════════════
    {
        level: "MEDIUM",
        questionText: "Apa yang dimaksud dengan impulsive buying?",
        options: [
            "Membeli barang setelah riset mendalam",
            "Membeli barang secara spontan tanpa perencanaan",
            "Membeli barang saat diskon besar",
            "Membeli barang kebutuhan pokok",
        ],
        correctIndex: 1,
        educationalFact:
            "Impulsive buying adalah pembelian spontan yang didorong oleh emosi, bukan kebutuhan. Trik untuk menghindarinya: tunggu 24 jam sebelum membeli barang non-esensial.",
    },
    {
        level: "MEDIUM",
        questionText: "Apa itu FOMO dalam konteks keuangan?",
        options: [
            "Fear Of Missing Out — takut ketinggalan tren sehingga ikut-ikutan membeli",
            "First Order Maximum Offer — diskon pembelian pertama",
            "Financial Obligation Management Order — aturan bayar hutang",
            "Fixed Output Monthly Obligation — cicilan tetap bulanan",
        ],
        correctIndex: 0,
        educationalFact:
            "FOMO (Fear Of Missing Out) membuat kita merasa harus ikut-ikutan membeli atau berinvestasi karena takut ketinggalan. Ini sering menyebabkan keputusan finansial yang buruk.",
    },
    {
        level: "MEDIUM",
        questionText:
            "Berapa kisaran bunga kartu kredit per bulan di Indonesia jika tidak dibayar penuh?",
        options: ["0,5%", "1,75% – 2,25%", "5%", "10%"],
        correctIndex: 1,
        educationalFact:
            "Bunga kartu kredit di Indonesia berkisar 1,75%–2,25% per bulan (sekitar 21%–27% per tahun). Selalu bayar tagihan penuh untuk menghindari bunga ini!",
    },
    {
        level: "MEDIUM",
        questionText: "Apa risiko utama menggunakan fitur Pay Later?",
        options: [
            "Mendapat cashback lebih banyak",
            "Tergoda belanja berlebihan karena merasa uangnya belum keluar",
            "Mendapat poin reward",
            "Harga barang jadi lebih murah",
        ],
        correctIndex: 1,
        educationalFact:
            "Pay Later membuat kamu merasa 'belum bayar' padahal sudah berhutang. Ini bisa mendorong pengeluaran berlebihan dan akumulasi hutang dengan bunga.",
    },
    {
        level: "MEDIUM",
        questionText:
            "Apa yang terjadi jika kamu hanya membayar minimum payment kartu kredit?",
        options: [
            "Hutang langsung lunas",
            "Sisa tagihan dikenai bunga dan bisa berlipat ganda",
            "Bank memberi hadiah loyalitas",
            "Tidak ada konsekuensi apapun",
        ],
        correctIndex: 1,
        educationalFact:
            "Membayar minimum payment hanya mencegah denda keterlambatan, tapi sisa tagihan tetap dikenai bunga. Hutang bisa membengkak karena bunga berbunga!",
    },
    {
        level: "MEDIUM",
        questionText: "Apa itu snowball method dalam melunasi hutang?",
        options: [
            "Membayar hutang terbesar dulu",
            "Membayar hutang terkecil dulu untuk membangun momentum",
            "Meminjam hutang baru untuk bayar hutang lama",
            "Mengabaikan hutang sampai hilang sendiri",
        ],
        correctIndex: 1,
        educationalFact:
            "Snowball method: lunasi hutang terkecil dulu, lalu gunakan momentum dan uang ekstra untuk melunasi hutang berikutnya yang lebih besar. Metode ini efektif secara psikologis.",
    },
    {
        level: "MEDIUM",
        questionText:
            "Mana yang merupakan tanda bahaya keuangan (financial red flag)?",
        options: [
            "Memiliki dana darurat 6 bulan",
            "Menggunakan hutang baru untuk membayar hutang lama",
            "Menabung 20% dari pendapatan",
            "Membayar tagihan tepat waktu",
        ],
        correctIndex: 1,
        educationalFact:
            "Gali lubang tutup lubang (meminjam untuk bayar hutang) adalah spiral hutang yang berbahaya. Jika mengalami ini, segera cari bantuan konselor keuangan.",
    },
    {
        level: "MEDIUM",
        questionText: "Berapa rasio hutang terhadap pendapatan yang dianggap sehat?",
        options: [
            "Maksimal 10%",
            "Maksimal 30%",
            "Maksimal 50%",
            "Tidak ada batasnya",
        ],
        correctIndex: 1,
        educationalFact:
            "Rasio hutang terhadap pendapatan (Debt-to-Income Ratio) sebaiknya tidak lebih dari 30%. Artinya, total cicilan per bulan tidak boleh melebihi 30% dari pendapatanmu.",
    },
    {
        level: "MEDIUM",
        questionText: "Apa dampak telat membayar cicilan atau tagihan?",
        options: [
            "Tidak ada dampak sama sekali",
            "Dikenakan denda, bunga tambahan, dan catatan kredit buruk",
            "Mendapat perpanjangan otomatis gratis",
            "Cicilan menjadi lebih ringan",
        ],
        correctIndex: 1,
        educationalFact:
            "Telat bayar berdampak: (1) denda keterlambatan, (2) bunga tambahan, (3) skor kredit turun — yang akan menyulitkanmu mengajukan pinjaman di masa depan.",
    },
    {
        level: "MEDIUM",
        questionText: "Apa strategi terbaik untuk menghindari impulsive buying online?",
        options: [
            "Simpan barang di keranjang, tunggu 24–48 jam sebelum checkout",
            "Langsung beli saat lihat flash sale",
            "Pakai semua voucher yang tersedia agar hemat",
            "Belanja tengah malam agar lebih tenang memilih",
        ],
        correctIndex: 0,
        educationalFact:
            "Aturan 24–48 jam: simpan barang di keranjang dan tunggu. Jika setelah 2 hari kamu masih merasa butuh, baru pertimbangkan untuk membelinya. 70% impulsive purchase dibatalkan dengan metode ini!",
    },

    // ═══════════════════════════════════════════
    // HARD — pinjol, tenor, bunga, investasi, diversifikasi, risk management
    // ═══════════════════════════════════════════
    {
        level: "HARD",
        questionText:
            "Pinjaman online (pinjol) yang legal di Indonesia harus terdaftar di lembaga apa?",
        options: [
            "Bank Indonesia (BI)",
            "Otoritas Jasa Keuangan (OJK)",
            "Kementerian Keuangan",
            "Badan Perlindungan Konsumen",
        ],
        correctIndex: 1,
        educationalFact:
            "Pinjol legal WAJIB terdaftar dan berizin di OJK. Cek daftar resmi di ojk.go.id sebelum meminjam. Pinjol ilegal tidak tunduk pada regulasi dan sangat berbahaya!",
    },
    {
        level: "HARD",
        questionText:
            "Berapa batas maksimal bunga pinjaman online per hari yang ditetapkan OJK?",
        options: ["0,1% per hari", "0,4% per hari", "1% per hari", "2% per hari"],
        correctIndex: 1,
        educationalFact:
            "OJK menetapkan batas bunga pinjol maksimal 0,4% per hari. Pinjol ilegal sering mengenakan bunga jauh lebih tinggi, bisa mencapai 1%–2% per hari!",
    },
    {
        level: "HARD",
        questionText: "Apa yang dimaksud dengan tenor pinjaman?",
        options: [
            "Jumlah bunga yang harus dibayar",
            "Jangka waktu pengembalian pinjaman",
            "Jenis jaminan yang diberikan",
            "Jumlah angsuran per bulan",
        ],
        correctIndex: 1,
        educationalFact:
            "Tenor adalah jangka waktu pengembalian pinjaman. Tenor lebih panjang berarti cicilan lebih ringan, tapi total bunga yang dibayar akan lebih besar.",
    },
    {
        level: "HARD",
        questionText: "Apa ciri-ciri pinjol ilegal yang harus diwaspadai?",
        options: [
            "Terdaftar di OJK dan transparan soal bunga",
            "Meminta akses kontak, galeri, dan SMS di HP peminjam",
            "Menyediakan layanan customer service 24 jam",
            "Memberikan edukasi keuangan sebelum meminjamkan",
        ],
        correctIndex: 1,
        educationalFact:
            "Pinjol ilegal biasanya: minta akses data pribadi berlebihan, sebar data debitur, intimidasi via kontak, bunga sangat tinggi, dan tidak terdaftar di OJK.",
    },
    {
        level: "HARD",
        questionText: "Apa yang dimaksud dengan diversifikasi investasi?",
        options: [
            "Menaruh semua uang di satu instrumen saja",
            "Menyebar investasi ke berbagai instrumen untuk mengurangi risiko",
            "Hanya berinvestasi di emas",
            "Meminjam uang untuk investasi",
        ],
        correctIndex: 1,
        educationalFact:
            "Diversifikasi adalah prinsip 'jangan taruh semua telur dalam satu keranjang'. Dengan menyebar investasi, kerugian di satu instrumen bisa ditutup keuntungan di instrumen lain.",
    },
    {
        level: "HARD",
        questionText:
            "Apa perbedaan utama antara saham dan obligasi sebagai instrumen investasi?",
        options: [
            "Saham = kepemilikan perusahaan, Obligasi = surat hutang",
            "Saham = surat hutang, Obligasi = kepemilikan perusahaan",
            "Keduanya sama saja",
            "Saham hanya untuk perusahaan besar",
        ],
        correctIndex: 0,
        educationalFact:
            "Saham = membeli bagian kepemilikan perusahaan (return tinggi, risiko tinggi). Obligasi = meminjamkan uang ke pemerintah/perusahaan (return lebih rendah, risiko lebih rendah).",
    },
    {
        level: "HARD",
        questionText: "Apa yang dimaksud dengan compound interest (bunga berbunga)?",
        options: [
            "Bunga yang hanya dihitung dari pokok awal",
            "Bunga yang dihitung dari pokok + bunga sebelumnya",
            "Bunga tetap setiap bulan",
            "Bunga yang berkurang seiring waktu",
        ],
        correctIndex: 1,
        educationalFact:
            "Compound interest menghitung bunga dari pokok + bunga yang sudah terkumpul. Ini bisa jadi sahabat (saat menabung/investasi) atau musuh (saat berhutang)!",
    },
    {
        level: "HARD",
        questionText: "Apa itu risk management dalam konteks investasi?",
        options: [
            "Menghindari semua jenis investasi",
            "Strategi mengelola dan meminimalkan potensi kerugian investasi",
            "Hanya berinvestasi di deposito bank",
            "Meminjam uang untuk menutupi kerugian",
        ],
        correctIndex: 1,
        educationalFact:
            "Risk management meliputi: diversifikasi portofolio, menentukan batas kerugian (stop-loss), menyesuaikan investasi dengan profil risiko, dan tidak menginvestasikan uang yang kamu butuhkan.",
    },
    {
        level: "HARD",
        questionText:
            "Jika meminjam Rp 1.000.000 dari pinjol ilegal dengan bunga 1% per hari selama 30 hari, berapa total yang harus dikembalikan?",
        options: [
            "Rp 1.100.000",
            "Rp 1.300.000",
            "Rp 1.347.849",
            "Rp 1.500.000",
        ],
        correctIndex: 2,
        educationalFact:
            "Dengan bunga berbunga 1% per hari: Rp 1.000.000 × (1.01)^30 ≈ Rp 1.347.849. Hampir 35% bunga dalam sebulan! Ini menunjukkan betapa berbahayanya pinjol ilegal.",
    },
    {
        level: "HARD",
        questionText: "Apa prinsip dasar investasi 'high risk, high return'?",
        options: [
            "Investasi berisiko rendah selalu menghasilkan return tinggi",
            "Semakin tinggi potensi keuntungan, semakin tinggi pula risiko kerugiannya",
            "Semua investasi memiliki tingkat risiko yang sama",
            "Investasi berisiko tinggi pasti untung besar",
        ],
        correctIndex: 1,
        educationalFact:
            "High risk, high return berarti potensi keuntungan besar selalu disertai risiko kerugian besar. Kenali profil risikomu sebelum berinvestasi — jangan tergoda janji return fantastis tanpa risiko!",
    },
];

async function main() {
    console.log("🌱 Seeding 30 questions...");

    for (const q of questions) {
        await prisma.question.create({
            data: {
                level: q.level as "EASY" | "MEDIUM" | "HARD",
                questionText: q.questionText,
                options: q.options,
                correctIndex: q.correctIndex,
                educationalFact: q.educationalFact,
            },
        });
    }

    const count = await prisma.question.count();
    console.log(`✅ Seeded ${count} questions total.`);
}

main()
    .catch((e) => {
        console.error("❌ Seed error:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
