import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const questions = [
    {
        "level": "EASY",
        "subBab": 0,
        "questionText": "Menurut Otoritas Jasa Keuangan (OJK), apa definisi dari literasi keuangan?",
        "options": [
            "A. Kemampuan seseorang untuk mencetak dan mengedarkan mata uang secara mandiri",
            "B. Pengetahuan, keterampilan, dan keyakinan yang memengaruhi sikap dan perilaku untuk meningkatkan kualitas pengambilan keputusan keuangan",
            "C. Kumpulan aturan hukum yang mengatur operasional bank-bank swasta di Indonesia"
        ],
        "correctIndex": 1,
        "educationalFact": "Tahukah kamu? Tingkat literasi keuangan masyarakat Indonesia ternyata belum sejalan dengan tingkat penggunaan produk keuangan. Berdasarkan data Survei Nasional Literasi dan Inklusi Keuangan (SNLIK) oleh OJK, indeks inklusi keuangan kita sudah tinggi, namun indeks literasinya masih tertinggal di angka 65,43%. Fenomena nyata di masyarakat ini membuat banyak orang punya rekening bank atau e-wallet, tapi belum paham betul cara mengelola risiko produk tersebut."
    },
    {
        "level": "EASY",
        "subBab": 0,
        "questionText": "Apa fungsi utama dari Otoritas Jasa Keuangan (OJK) di Indonesia yang wajib diketahui masyarakat?",
        "options": [
            "A. Mencetak uang rupiah dan mengatur tingkat suku bunga acuan negara",
            "B. Mengatur, mengawasi, dan melindungi konsumen di sektor industri jasa keuangan",
            "C. Memberikan pinjaman modal tanpa bunga kepada seluruh masyarakat"
        ],
        "correctIndex": 1,
        "educationalFact": "Tahukah kalian? Literasi keuangan bukan sekadar teori menghitung angka di atas kertas, melainkan sebuah kompetensi hidup. Menurut Organisation for Economic Co-operation and Development (OECD), literasi keuangan adalah kombinasi dari kesadaran, pengetahuan, keterampilan, sikap, dan perilaku yang diperlukan untuk mengambil keputusan keuangan yang sehat demi mencapai kesejahteraan finansial individu."
    },
    {
        "level": "EASY",
        "subBab": 0,
        "questionText": "Manakah di bawah ini yang merupakan ciri dari lembaga keuangan formal yang legal di Indonesia?",
        "options": [
            "A. Terdaftar resmi dan diawasi oleh Otoritas Jasa Keuangan (OJK) atau Bank Indonesia (BI)",
            "B. Menawarkan keuntungan investasi yang sangat tinggi dalam waktu singkat tanpa risiko",
            "C. Meminta data pinjaman melalui pesan pribadi WhatsApp menggunakan nomor tidak dikenal"
        ],
        "correctIndex": 0,
        "educationalFact": "Fakta menarik! Seseorang yang memiliki literasi keuangan mumpuni cenderung terhindar dari stres kronis. Studi psikologi ekonomi menunjukkan bahwa individu yang memahami dasar-dasar keuangan memiliki kesiapan 3 kali lebih tinggi dalam menghadapi krisis hidup (seperti penurunan pendapatan tiba-tiba) dibandingkan mereka yang buta finansial."
    },
    {
        "level": "EASY",
        "subBab": 0,
        "questionText": "Apa yang dimaksud dengan prinsip High Risk, High Return dalam dunia keuangan?",
        "options": [
            "A. Investasi dengan keuntungan besar pasti tidak memiliki risiko kerugian",
            "B. Semakin rendah risiko suatu investasi, semakin besar keuntungan yang didapat",
            "C. Semakin besar potensi keuntungan suatu aset, semakin besar pula potensi risiko kerugiannya"
        ],
        "correctIndex": 2,
        "educationalFact": "Fun fact! Kita bisa mengukur tingkat \"kesehatannya\" sebuah keputusan keuangan melalui konsep paling mendasar dalam ekonomi, yaitu Opportunity Cost (Biaya Peluang). Setiap kali kamu memilih membelanjakan uang untuk hal konsumtif, kamu kehilangan peluang untuk mendapatkan keuntungan dari investasi alternatif dalam periode waktu yang sam"
    },
    {
        "level": "EASY",
        "subBab": 0,
        "questionText": "Manakah pengeluaran berikut yang dikategorikan sebagai investasi leher ke atas (self-development)?",
        "options": [
            "A. Membeli produk perawatan wajah bermerek internasional",
            "B. Membayar biaya seminar atau sertifikasi keahlian profesi untuk meningkatkan kompetensi diri",
            "C. Mengupgrade kecepatan internet rumah untuk bermain game online"
        ],
        "correctIndex": 1,
        "educationalFact": "Money Fact! Untuk mengukur kesiapan pensiun secara sangat sederhana, para perencana keuangan sering memakai Rule of Thumb (Aturan Praktis) berbasis pendapatan. Contoh sederhananya: jika saat ini pendapatan bulananmu adalah Rp"
    },
    {
        "level": "EASY",
        "subBab": 0,
        "questionText": "Apa perbedaan mendasar antara menabung di bank dengan berinvestasi?",
        "options": [
            "A. Menabung fokus pada keamanan dan likuiditas dana, sedangkan investasi fokus pada pertumbuhan nilai aset",
            "B. Menabung pasti merugikan, sedangkan investasi dijamin pasti memberikan keuntungan berlipat",
            "C. Menabung diawasi oleh pemerintah, sedangkan investasi tidak diatur oleh undang-undang"
        ],
        "correctIndex": 0,
        "educationalFact": "Tahukah kamu? Tingkat literasi keuangan masyarakat Indonesia ternyata belum sejalan dengan tingkat penggunaan produk keuangan. Berdasarkan data Survei Nasional Literasi dan Inklusi Keuangan (SNLIK) oleh OJK, indeks inklusi keuangan kita sudah tinggi, namun indeks literasinya masih tertinggal di angka 65,43%. Fenomena nyata di masyarakat ini membuat banyak orang punya rekening bank atau e-wallet, tapi belum paham betul cara mengelola risiko produk tersebut."
    },
    {
        "level": "EASY",
        "subBab": 0,
        "questionText": "Apa risiko utama jika masyarakat memiliki tingkat literasi keuangan yang sangat rendah (illiterate)?",
        "options": [
            "A. Tidak akan diizinkan membuat Kartu Tanda Penduduk (KTP)",
            "B. Sukar mendapatkan jaringan internet di wilayah tempat tinggal",
            "C. Sangat mudah tertipu investasi bodong, judi online, dan terjebak lingkaran utang ekstrem"
        ],
        "correctIndex": 2,
        "educationalFact": "Tahukah kalian? Literasi keuangan bukan sekadar teori menghitung angka di atas kertas, melainkan sebuah kompetensi hidup. Menurut Organisation for Economic Co-operation and Development (OECD), literasi keuangan adalah kombinasi dari kesadaran, pengetahuan, keterampilan, sikap, dan perilaku yang diperlukan untuk mengambil keputusan keuangan yang sehat demi mencapai kesejahteraan finansial individu."
    },
    {
        "level": "EASY",
        "subBab": 0,
        "questionText": "Mengapa bunga berbunga (compound interest) disebut sebagai penemuan penting dalam keuangan?",
        "options": [
            "A. Karena membuat nasabah harus membayar denda dua kali lipat saat terlambat mencicil",
            "B. Karena bunga yang dihasilkan dari investasi awal diinvestasikan kembali sehingga menghasilkan bunga baru",
            "C. Karena sistem ini hanya berlaku untuk pinjaman online legal saja"
        ],
        "correctIndex": 1,
        "educationalFact": "Fakta menarik! Seseorang yang memiliki literasi keuangan mumpuni cenderung terhindar dari stres kronis. Studi psikologi ekonomi menunjukkan bahwa individu yang memahami dasar-dasar keuangan memiliki kesiapan 3 kali lebih tinggi dalam menghadapi krisis hidup (seperti penurunan pendapatan tiba-tiba) dibandingkan mereka yang buta finansial."
    },
    {
        "level": "EASY",
        "subBab": 0,
        "questionText": "Lembaga manakah di Indonesia yang menjamin keamanan dana tabungan nasabah di bank hingga nominal tertentu jika bank tersebut bangkrut?",
        "options": [
            "A. Bank Indonesia (BI)",
            "B. Otoritas Jasa Keuangan (OJK)",
            "C. Lembaga Penjamin Simpanan (LPS)"
        ],
        "correctIndex": 2,
        "educationalFact": "Fun fact! Kita bisa mengukur tingkat \"kesehatannya\" sebuah keputusan keuangan melalui konsep paling mendasar dalam ekonomi, yaitu Opportunity Cost (Biaya Peluang). Setiap kali kamu memilih membelanjakan uang untuk hal konsumtif, kamu kehilangan peluang untuk mendapatkan keuntungan dari investasi alternatif dalam periode waktu yang sam"
    },
    {
        "level": "EASY",
        "subBab": 0,
        "questionText": "Apa tujuan akhir dari memiliki literasi keuangan yang baik bagi setiap individu?",
        "options": [
            "A. Menjadi orang paling kaya dan terkenal di lingkungan sosialnya",
            "B. Mencapai kesejahteraan finansial (financial well-being) dan kebebasan finansial jangka panjang",
            "C. Mampu menghafal seluruh istilah ekonomi global dengan lancar"
        ],
        "correctIndex": 1,
        "educationalFact": "Money Fact! Untuk mengukur kesiapan pensiun secara sangat sederhana, para perencana keuangan sering memakai Rule of Thumb (Aturan Praktis) berbasis pendapatan. Contoh sederhananya: jika saat ini pendapatan bulananmu adalah Rp"
    },
    {
        "level": "EASY",
        "subBab": 1,
        "questionText": "Apa fungsi utama dari memiliki dana darurat dalam perencanaan keuangan?",
        "options": [
            "A. Untuk modal awal berinvestasi saham atau kripto",
            "B. Untuk mengantisipasi pengeluaran tidak terduga seperti sakit atau PHK",
            "C. Untuk membeli barang diskon saat program flash sale"
        ],
        "correctIndex": 1,
        "educationalFact": "Tahukah kamu? Dana darurat (emergency fund) sama sekali berbeda dengan tabungan biasa atau investasi. Fenomena nyata di masyarakat menunjukkan banyak orang menyamakan ketiganya, padahal dana darurat memiliki fungsi tunggal yang sakral: sebagai bemper atau jaring pengaman ketika terjadi musibah tak terduga,"
    },
    {
        "level": "EASY",
        "subBab": 1,
        "questionText": "Di manakah tempat terbaik untuk menyimpan dana darurat agar aman namun tetap mudah diambil saat dibutuhkan?",
        "options": [
            "A. Rekening tabungan terpisah atau reksa dana pasar uang",
            "B. Deposito berjangka 24 bulan yang tidak bisa dicairkan cepat",
            "C. Di dalam celengan target di rumah"
        ],
        "correctIndex": 0,
        "educationalFact": "seperti pemutusan hubungan kerja (PHK) seketika atau biaya perbaikan kendaraan akibat kecelakaan. Tahukah kalian? Dana darurat tidak boleh diinvestasikan ke dalam instrumen yang fluktuatif atau berisiko tinggi seperti saham gorengan atau kripto. Pengetahuan mendasar menetapkan bahwa dana darurat wajib disimpan di tempat yang aman dan sangat mudah diakses, agar ketika kondisi kritis melanda di jam dua pagi, uang tersebut bisa langsung dicairkan tanpa drama penurunan nilai modal. Fakta menarik! Seseorang yang tidak memiliki kesiapan dana darurat terbukti secara psikologis lebih rentan terjebak dalam lingkaran setan finansial. Saat terjadi musibah kecil, mereka terpaksa mengambil keputusan jangka pendek yang merusak, seperti menjual aset produktif dengan harga murah (loss sale) atau beralih menggunakan instrumen utang berbunga tinggi demi menutup kebutuhan darurat tersebut. Fun fact! Aturan praktis yang paling umum digunakan oleh masyarakat umum untuk menentukan jumlah dana darurat minimal bagi seorang individu yang masih lajang/belum menikah adalah sebesar 3 kali pengeluaran bulanan. Jadi, jika pengeluaran riil harian dan bulananmu berjumlah Rp"
    },
    {
        "level": "EASY",
        "subBab": 1,
        "questionText": "Jika seorang lajang memiliki pengeluaran rutin Rp3.000.000 per bulan, berapakah jumlah minimal dana darurat ideal yang disarankan OJK?",
        "options": [
            "A. Rp3.000.000 (1 kali pengeluaran)",
            "B. Rp9.000.000 (3 kali pengeluaran)",
            "C. Rp30.000.000 (10 kali pengeluaran)"
        ],
        "correctIndex": 1,
        "educationalFact": "Tahukah kamu? Dana darurat (emergency fund) sama sekali berbeda dengan tabungan biasa atau investasi. Fenomena nyata di masyarakat menunjukkan banyak orang menyamakan ketiganya, padahal dana darurat memiliki fungsi tunggal yang sakral: sebagai bemper atau jaring pengaman ketika terjadi musibah tak terduga,"
    },
    {
        "level": "EASY",
        "subBab": 1,
        "questionText": "Manakah di bawah ini yang dikategorikan sebagai situasi darurat yang sah untuk menggunakan dana darurat?",
        "options": [
            "A. Tiket konser band favorit akan segera habis (sold out)",
            "B. Gadget utama tiba-tiba rusak total",
            "C. Biaya penggantian ban mobil yang bocor saat perjalanan mudik"
        ],
        "correctIndex": 2,
        "educationalFact": "seperti pemutusan hubungan kerja (PHK) seketika atau biaya perbaikan kendaraan akibat kecelakaan. Tahukah kalian? Dana darurat tidak boleh diinvestasikan ke dalam instrumen yang fluktuatif atau berisiko tinggi seperti saham gorengan atau kripto. Pengetahuan mendasar menetapkan bahwa dana darurat wajib disimpan di tempat yang aman dan sangat mudah diakses, agar ketika kondisi kritis melanda di jam dua pagi, uang tersebut bisa langsung dicairkan tanpa drama penurunan nilai modal. Fakta menarik! Seseorang yang tidak memiliki kesiapan dana darurat terbukti secara psikologis lebih rentan terjebak dalam lingkaran setan finansial. Saat terjadi musibah kecil, mereka terpaksa mengambil keputusan jangka pendek yang merusak, seperti menjual aset produktif dengan harga murah (loss sale) atau beralih menggunakan instrumen utang berbunga tinggi demi menutup kebutuhan darurat tersebut. Fun fact! Aturan praktis yang paling umum digunakan oleh masyarakat umum untuk menentukan jumlah dana darurat minimal bagi seorang individu yang masih lajang/belum menikah adalah sebesar 3 kali pengeluaran bulanan. Jadi, jika pengeluaran riil harian dan bulananmu berjumlah Rp"
    },
    {
        "level": "EASY",
        "subBab": 1,
        "questionText": "Mengapa dana darurat tidak disarankan disimpan dalam bentuk aset saham seluruhnya?",
        "options": [
            "A. Nilai saham fluktuatif dan bisa turun tajam saat dana justru sedang dibutuhkan",
            "B. Saham tidak memiliki likuiditas sama sekali di Indonesia",
            "C. Saham hanya diperuntukkan bagi perusahaan besar"
        ],
        "correctIndex": 0,
        "educationalFact": "Tahukah kamu? Dana darurat (emergency fund) sama sekali berbeda dengan tabungan biasa atau investasi. Fenomena nyata di masyarakat menunjukkan banyak orang menyamakan ketiganya, padahal dana darurat memiliki fungsi tunggal yang sakral: sebagai bemper atau jaring pengaman ketika terjadi musibah tak terduga,"
    },
    {
        "level": "EASY",
        "subBab": 1,
        "questionText": "Kapan waktu terbaik untuk mulai mengumpulkan dana darurat?",
        "options": [
            "A. Setelah semua keinginan dan hobi tahunan terpenuhi",
            "B. Segera setelah menerima pendapatan atau gaji bulanan sebelum dibelanjakan",
            "C. Saat kondisi ekonomi negara sedang mengalami krisis besar"
        ],
        "correctIndex": 1,
        "educationalFact": "seperti pemutusan hubungan kerja (PHK) seketika atau biaya perbaikan kendaraan akibat kecelakaan. Tahukah kalian? Dana darurat tidak boleh diinvestasikan ke dalam instrumen yang fluktuatif atau berisiko tinggi seperti saham gorengan atau kripto. Pengetahuan mendasar menetapkan bahwa dana darurat wajib disimpan di tempat yang aman dan sangat mudah diakses, agar ketika kondisi kritis melanda di jam dua pagi, uang tersebut bisa langsung dicairkan tanpa drama penurunan nilai modal. Fakta menarik! Seseorang yang tidak memiliki kesiapan dana darurat terbukti secara psikologis lebih rentan terjebak dalam lingkaran setan finansial. Saat terjadi musibah kecil, mereka terpaksa mengambil keputusan jangka pendek yang merusak, seperti menjual aset produktif dengan harga murah (loss sale) atau beralih menggunakan instrumen utang berbunga tinggi demi menutup kebutuhan darurat tersebut. Fun fact! Aturan praktis yang paling umum digunakan oleh masyarakat umum untuk menentukan jumlah dana darurat minimal bagi seorang individu yang masih lajang/belum menikah adalah sebesar 3 kali pengeluaran bulanan. Jadi, jika pengeluaran riil harian dan bulananmu berjumlah Rp"
    },
    {
        "level": "EASY",
        "subBab": 1,
        "questionText": "Apa konsekuensi utama jika seseorang sama sekali tidak memiliki dana darurat?",
        "options": [
            "A. Tidak bisa mengikuti tren investasi terbaru",
            "B. Sukar mendapatkan promosi jabatan di tempat kerja",
            "C. Rentan terjerat utang konsumtif atau pinjol ilegal saat ada musibah"
        ],
        "correctIndex": 2,
        "educationalFact": "Tahukah kamu? Dana darurat (emergency fund) sama sekali berbeda dengan tabungan biasa atau investasi. Fenomena nyata di masyarakat menunjukkan banyak orang menyamakan ketiganya, padahal dana darurat memiliki fungsi tunggal yang sakral: sebagai bemper atau jaring pengaman ketika terjadi musibah tak terduga,"
    },
    {
        "level": "EASY",
        "subBab": 1,
        "questionText": "Berapa alokasi persentase minimal dari pendapatan bulanan yang idealnya disisihkan untuk dana darurat hingga mencapai target?",
        "options": [
            "A. 10% hingga 20%",
            "B. 50% ke atas",
            "C. Cukup menggunakan uang sisa di akhir bulan saja"
        ],
        "correctIndex": 0,
        "educationalFact": "seperti pemutusan hubungan kerja (PHK) seketika atau biaya perbaikan kendaraan akibat kecelakaan. Tahukah kalian? Dana darurat tidak boleh diinvestasikan ke dalam instrumen yang fluktuatif atau berisiko tinggi seperti saham gorengan atau kripto. Pengetahuan mendasar menetapkan bahwa dana darurat wajib disimpan di tempat yang aman dan sangat mudah diakses, agar ketika kondisi kritis melanda di jam dua pagi, uang tersebut bisa langsung dicairkan tanpa drama penurunan nilai modal. Fakta menarik! Seseorang yang tidak memiliki kesiapan dana darurat terbukti secara psikologis lebih rentan terjebak dalam lingkaran setan finansial. Saat terjadi musibah kecil, mereka terpaksa mengambil keputusan jangka pendek yang merusak, seperti menjual aset produktif dengan harga murah (loss sale) atau beralih menggunakan instrumen utang berbunga tinggi demi menutup kebutuhan darurat tersebut. Fun fact! Aturan praktis yang paling umum digunakan oleh masyarakat umum untuk menentukan jumlah dana darurat minimal bagi seorang individu yang masih lajang/belum menikah adalah sebesar 3 kali pengeluaran bulanan. Jadi, jika pengeluaran riil harian dan bulananmu berjumlah Rp"
    },
    {
        "level": "EASY",
        "subBab": 1,
        "questionText": "Mengapa jumlah dana darurat ideal bagi orang yang sudah menikah lebih besar daripada yang lajang?",
        "options": [
            "A. Karena orang menikah memiliki gengsi sosial yang lebih tinggi",
            "B. Karena adanya tanggung jawab finansial tambahan terhadap anggota keluarga (anak/pasangan)",
            "C. Karena aturan perbankan mengharuskan demikian"
        ],
        "correctIndex": 1,
        "educationalFact": "Tahukah kamu? Dana darurat (emergency fund) sama sekali berbeda dengan tabungan biasa atau investasi. Fenomena nyata di masyarakat menunjukkan banyak orang menyamakan ketiganya, padahal dana darurat memiliki fungsi tunggal yang sakral: sebagai bemper atau jaring pengaman ketika terjadi musibah tak terduga,"
    },
    {
        "level": "EASY",
        "subBab": 1,
        "questionText": "Jika dana darurat terpakai untuk keperluan mendesak, apa langkah selanjutnya yang harus dilakukan?",
        "options": [
            "A. Membiarkannya saja karena fungsi daruratnya sudah selesai",
            "B. Mengambil pinjaman baru untuk mengganti uang tersebut",
            "C. Menyusun kembali strategi bulanan untuk mengisi ulang dana darurat tersebut hingga penuh"
        ],
        "correctIndex": 2,
        "educationalFact": "seperti pemutusan hubungan kerja (PHK) seketika atau biaya perbaikan kendaraan akibat kecelakaan. Tahukah kalian? Dana darurat tidak boleh diinvestasikan ke dalam instrumen yang fluktuatif atau berisiko tinggi seperti saham gorengan atau kripto. Pengetahuan mendasar menetapkan bahwa dana darurat wajib disimpan di tempat yang aman dan sangat mudah diakses, agar ketika kondisi kritis melanda di jam dua pagi, uang tersebut bisa langsung dicairkan tanpa drama penurunan nilai modal. Fakta menarik! Seseorang yang tidak memiliki kesiapan dana darurat terbukti secara psikologis lebih rentan terjebak dalam lingkaran setan finansial. Saat terjadi musibah kecil, mereka terpaksa mengambil keputusan jangka pendek yang merusak, seperti menjual aset produktif dengan harga murah (loss sale) atau beralih menggunakan instrumen utang berbunga tinggi demi menutup kebutuhan darurat tersebut. Fun fact! Aturan praktis yang paling umum digunakan oleh masyarakat umum untuk menentukan jumlah dana darurat minimal bagi seorang individu yang masih lajang/belum menikah adalah sebesar 3 kali pengeluaran bulanan. Jadi, jika pengeluaran riil harian dan bulananmu berjumlah Rp"
    },
    {
        "level": "EASY",
        "subBab": 2,
        "questionText": "Apa yang dimaksud dengan pengeluaran berdasarkan “Kebutuhan” (Needs)?",
        "options": [
            "A. Pengeluaran yang wajib dipenuhi untuk bertahan hidup dan menjaga produktivitas",
            "B. Pengeluaran untuk meningkatkan status sosial di lingkungan rumah",
            "C. Pengeluaran yang jika ditunda tidak akan mengganggu kelangsungan hidup"
        ],
        "correctIndex": 0,
        "educationalFact": "Tahukah kamu? Keinginan belanja yang tiba-tiba muncul saat kita melihat promosi atau diskon besar di platform belanja daring sebenarnya dipicu oleh reaksi kimia di otak kita sendiri. Fakta unik menunjukkan bahwa hormon dopamin, hormon yang menciptakan rasa senang dan penghargaan, dilepaskan oleh otak bukan saat barang belanjaan tersebut sampai ke rumahmu, melainkan justru pada detik kamu menekan tombol \"Beli sekarang\"."
    },
    {
        "level": "EASY",
        "subBab": 2,
        "questionText": "Manakah contoh pengeluaran yang tergolong sebagai “Keinginan” (Wants)?",
        "options": [
            "A. Membayar tagihan listrik rumah dan air bersih bulanan",
            "B. Membeli beras dan bahan pangan pokok untuk keluarga",
            "C. Mengganti sepatu olahraga dengan model terbaru padahal sepatu lama masih bagus"
        ],
        "correctIndex": 2,
        "educationalFact": "Tahukah kalian? Pemasar modern sering memanfaatkan kelemahan psikologis manusia lewat taktik Scarcity Marketing (Pemasaran Kelangkaan). Kalimat seperti \"Sisa 1 barang lagi di keranjang!\" atau \"Diskon hanya berlaku 5 menit lagi!\" sengaja dirancang secara teknis untuk menciptakan kepanikan buatan agar kamu langsung berbelanja tanpa sempat berpikir logis."
    },
    {
        "level": "EASY",
        "subBab": 2,
        "questionText": "Apa definisi dari Impulsive Buying yang sering merugikan keuangan masyarakat?",
        "options": [
            "A. Membeli barang setelah melakukan riset harga di tiga toko berbeda",
            "B. Tindakan membeli barang secara spontan tanpa perencanaan dan pertimbangan matang",
            "C. Belanja kebutuhan pokok bulanan sesuai dengan catatan yang telah dibuat"
        ],
        "correctIndex": 1,
        "educationalFact": "Fakta menarik! Ada cara paling sederhana dan ampuh di masyarakat untuk meredam hasrat belanja impulsif yang dikenal dengan nama The 24-Hour Rule (Aturan 24 Jam). Jika kamu melihat barang non-primer yang sangat kamu inginkan, paksa dirimu untuk menunda pembelian selama minimal 24 jam. Biasanya, setelah melewati satu hari, ketertarikan emosionalmu terhadap barang tersebut akan menurun drastis atau hilang sama sekali."
    },
    {
        "level": "EASY",
        "subBab": 2,
        "questionText": "Bagaimana cara paling efektif untuk menghindari jebakan diskon palsu di e-commerce?",
        "options": [
            "A. Langsung membeli sebelum kehabisan waktu promo",
            "B. Membuat daftar belanjaan terlebih dahulu sebelum membuka aplikasi belanja online",
            "C. Menggunakan fitur PayLater agar tidak memotong saldo utama"
        ],
        "correctIndex": 1,
        "educationalFact": "Fun fact! Pengetahuan mendasar untuk mengendalikan konsumsi adalah memahami perbedaan mutlak antara Kebutuhan (Needs) dan Keinginan (Wants). Kebutuhan adalah segala sesuatu yang jika tidak terpenuhi akan mengancam kelangsungan hidup atau produktivitas dasar (seperti makanan bergizi, tempat tinggal, dan transportasi kerja), sedangkan keinginan adalah segala bentuk variasi instrumen pemenuhannya yang didorong oleh ego atau gengsi sosial."
    },
    {
        "level": "EASY",
        "subBab": 2,
        "questionText": "Mengapa penting menerapkan prinsip “tunda belanja 24 jam” sebelum membeli barang yang diinginkan?",
        "options": [
            "A. Agar harga barang tersebut turun menjadi lebih murah",
            "B. Memberikan waktu bagi toko untuk menyiapkan stok barang",
            "C. Memberikan waktu bagi logika berpikir untuk meredam emosi sesaat"
        ],
        "correctIndex": 2,
        "educationalFact": "Money Fact! Kita bisa menerapkan metode alokasi belanja sederhana di masyarakat menggunakan sistem amplop fisik atau fitur \"kantong digital\" di aplikasi bank investasi. Dengan membatasi anggaran belanja hiburan ke dalam satu wadah khusus sejak awal bulan, kamu secara otomatis mengunci batas maksimal pengeluaranmu, sehingga ketika saldo di wadah tersebut habis, aktivitas belanjamu wajib berhenti seketik"
    },
    {
        "level": "EASY",
        "subBab": 2,
        "questionText": "Manakah dari pilihan berikut yang merupakan contoh gaya hidup hemat yang benar?",
        "options": [
            "A. Memilih memasak makanan sendiri di rumah sesuai dengan budget yang ada",
            "B. Tidak mau mengeluarkan uang sama sekali termasuk untuk jaminan kesehatan",
            "C. Membeli barang tiruan/palsu demi terlihat menggunakan barang bermerek"
        ],
        "correctIndex": 0,
        "educationalFact": "Tahukah kamu? Keinginan belanja yang tiba-tiba muncul saat kita melihat promosi atau diskon besar di platform belanja daring sebenarnya dipicu oleh reaksi kimia di otak kita sendiri. Fakta unik menunjukkan bahwa hormon dopamin, hormon yang menciptakan rasa senang dan penghargaan, dilepaskan oleh otak bukan saat barang belanjaan tersebut sampai ke rumahmu, melainkan justru pada detik kamu menekan tombol \"Beli sekarang\"."
    },
    {
        "level": "EASY",
        "subBab": 2,
        "questionText": "Apa arti dari istilah “biaya gaya hidup” (lifestyle cost)?",
        "options": [
            "A. Biaya wajib untuk membayar pajak kendaraan bermotor",
            "B. Pengeluaran yang muncul akibat tuntutan sosial atau gengsi individu",
            "C. Biaya asuransi jiwa yang melindungi kepala keluarga"
        ],
        "correctIndex": 1,
        "educationalFact": "Tahukah kalian? Pemasar modern sering memanfaatkan kelemahan psikologis manusia lewat taktik Scarcity Marketing (Pemasaran Kelangkaan). Kalimat seperti \"Sisa 1 barang lagi di keranjang!\" atau \"Diskon hanya berlaku 5 menit lagi!\" sengaja dirancang secara teknis untuk menciptakan kepanikan buatan agar kamu langsung berbelanja tanpa sempat berpikir logis."
    },
    {
        "level": "EASY",
        "subBab": 2,
        "questionText": "Mengapa membuat skala prioritas belanja sangat penting sebelum pergi ke pasar atau supermarket?",
        "options": [
            "A. Agar proses belanja memakan waktu lebih lama",
            "B. Agar kasir lebih mudah menghitung total belanjaan",
            "C. Mencegah terbawa arus promosi visual yang memicu belanja berlebih"
        ],
        "correctIndex": 2,
        "educationalFact": "Fakta menarik! Ada cara paling sederhana dan ampuh di masyarakat untuk meredam hasrat belanja impulsif yang dikenal dengan nama The 24-Hour Rule (Aturan 24 Jam). Jika kamu melihat barang non-primer yang sangat kamu inginkan, paksa dirimu untuk menunda pembelian selama minimal 24 jam. Biasanya, setelah melewati satu hari, ketertarikan emosionalmu terhadap barang tersebut akan menurun drastis atau hilang sama sekali."
    },
    {
        "level": "EASY",
        "subBab": 2,
        "questionText": "Manakah perilaku berikut yang mencerminkan konsumen bijak dalam menghadapi e-commerce sale?",
        "options": [
            "A. Membeli semua barang yang sedang diskon mumpung harganya murah",
            "B. Hanya membeli barang diskon jika barang tersebut memang masuk dalam daftar kebutuhan",
            "C. Menguras dana darurat demi memanfaatkan promo potongan harga besar"
        ],
        "correctIndex": 1,
        "educationalFact": "Fun fact! Pengetahuan mendasar untuk mengendalikan konsumsi adalah memahami perbedaan mutlak antara Kebutuhan (Needs) dan Keinginan (Wants). Kebutuhan adalah segala sesuatu yang jika tidak terpenuhi akan mengancam kelangsungan hidup atau produktivitas dasar (seperti makanan bergizi, tempat tinggal, dan transportasi kerja), sedangkan keinginan adalah segala bentuk variasi instrumen pemenuhannya yang didorong oleh ego atau gengsi sosial."
    },
    {
        "level": "EASY",
        "subBab": 2,
        "questionText": "Apa dampak jangka panjang dari kebiasaan mengutamakan “Keinginan” di atas “Kebutuhan”?",
        "options": [
            "A. Tabungan akan meningkat dengan cepat karena hidup terasa bahagia",
            "B. Terjadinya defisit keuangan kronis dan kegagalan berinvestasi untuk masa depan",
            "C. Menjadi lebih dihormati oleh institusi keuangan saat mengajukan kredit"
        ],
        "correctIndex": 1,
        "educationalFact": "Money Fact! Kita bisa menerapkan metode alokasi belanja sederhana di masyarakat menggunakan sistem amplop fisik atau fitur \"kantong digital\" di aplikasi bank investasi. Dengan membatasi anggaran belanja hiburan ke dalam satu wadah khusus sejak awal bulan, kamu secara otomatis mengunci batas maksimal pengeluaranmu, sehingga ketika saldo di wadah tersebut habis, aktivitas belanjamu wajib berhenti seketik"
    },
    {
        "level": "EASY",
        "subBab": 3,
        "questionText": "Apa komponen utama dalam sebuah laporan arus kas (cash flow) pribadi?",
        "options": [
            "A. Jumlah aset investasi dan utang jangka panjang",
            "B. Total pemasukan (income) dan total pengeluaran (expenses)",
            "C. Batas limit kartu kredit yang dimiliki"
        ],
        "correctIndex": 1,
        "educationalFact": "Tahukah kamu? Kebocoran keuangan terbesar seseorang sering kali bukan disebabkan oleh pengeluaran tunggal dalam jumlah besar (seperti membeli motor atau gawai baru), melainkan oleh akumulasi pengeluaran-pengeluaran kecil tidak sadar yang terjadi secara rutin setiap hari. Fenomena di masyarakat ini populer dengan istilah The Latte Factor, sebuah konsep yang dikenalkan oleh perencana keuangan David Bach."
    },
    {
        "level": "EASY",
        "subBab": 3,
        "questionText": "Kondisi arus kas disebut mengalami “Defisit” apabila...",
        "options": [
            "A. Jumlah pengeluaran lebih besar daripada total pemasukan harian/bulanan",
            "B. Jumlah pemasukan sama persis dengan total pengeluaran",
            "C. Jumlah tabungan meningkat melebihi target investasi"
        ],
        "correctIndex": 0,
        "educationalFact": "Tahukah kalian? Mencatat keuangan harian tidak perlu serumit akuntansi perusahaan besar. Konsep mendasar dari arsitektur arus kas personal hanyalah melacak dua arus utama secara disiplin: Cash Inflow (Uang Masuk, seperti uang saku, gaji, atau hasil komisi) dan Cash Outflow (Uang Keluar, seperti biaya makan, transportasi, dan kosan). Selisih positif di antara keduanya adalah modal utamamu untuk kay"
    },
    {
        "level": "EASY",
        "subBab": 3,
        "questionText": "Apa langkah pertama yang wajib dilakukan saat menyusun anggaran keuangan bulanan?",
        "options": [
            "A. Menghitung berapa target profit investasi saham",
            "B. Mencatat seluruh total pemasukan bersih yang pasti diterima",
            "C. Menentukan target barang mewah yang ingin dibeli akhir bulan"
        ],
        "correctIndex": 1,
        "educationalFact": "Fakta menarik! Orang yang rajin mencatat pengeluaran hariannya secara detail terbukti memiliki tingkat kontrol diri yang jauh lebih stabil. Berdasarkan studi psikologi finansial, tindakan menuliskan nominal uang sesaat setelah dikeluarkan memberikan efek psikologis berupa \"rasa sakit membayar\" (pain of paying), yang secara alami bertindak sebagai rem kognitif agar kita tidak belanja berlebihan pada transaksi berikutny"
    },
    {
        "level": "EASY",
        "subBab": 3,
        "questionText": "Berdasarkan metode alokasi 50/30/20 yang populer, porsi 50% dari pendapatan dialokasikan untuk...",
        "options": [
            "A. Tabungan masa depan dan investasi modal",
            "B. Kebutuhan pokok, cicilan utang sah, dan tagihan wajib",
            "C. Hiburan, hobi, dan liburan akhir tahun"
        ],
        "correctIndex": 1,
        "educationalFact": "Fun fact! Ada aturan praktis penganggaran arus kas yang sangat mendunia dan mudah diterapkan oleh siapa saja, yaitu The 50/30/20 Rule yang dipopulerkan oleh Elizabeth Warren (Pakar Hukum Kebangkrutan dari Universitas Harvard). Aturan ini menyarankan kita membagi pendapatan bulanan bersih menjadi tiga pos utama: 50% untuk Kebutuhan Pokok (Needs), 30% untuk Keinginan (Wants), dan 20% untuk Tabungan atau Investasi (Savings)."
    },
    {
        "level": "EASY",
        "subBab": 3,
        "questionText": "Apa fungsi utama dari mencatat setiap pengeluaran kecil harian, seperti biaya parkir atau jajan kopi?",
        "options": [
            "A. Untuk dilaporkan kepada kantor pajak daerah",
            "B. Agar uang tidak berkurang sedikit pun dari dompet",
            "C. Mengetahui kebocoran halus (latent expenses) yang sering menguras kantong tanpa disadari"
        ],
        "correctIndex": 2,
        "educationalFact": "Money Fact! Fenomena nyata di masyarakat saat ini menunjukkan banyak orang mengalami kebingungan karena merasa uangnya habis tanpa jejak di akhir bulan, meskipun mereka merasa tidak membeli barang mahal. Hal ini terjadi karena mereka melewatkan pencatatan \"biaya-biaya siluman\" kecil seperti biaya admin transfer antar-bank, biaya parkir kendaraan, uang tip, hingga biaya langganan aplikasi digital yang sebenarnya jarang digunakan."
    },
    {
        "level": "EASY",
        "subBab": 3,
        "questionText": "Kapan sebuah arus kas pribadi dikatakan sehat (Surplus)?",
        "options": [
            "A. Jika posisi utang lebih besar daripada total tabungan tunai",
            "B. Jika masih ada sisa dana positif setelah semua kebutuhan dan tabungan terpenuhi",
            "C. Jika limit kartu kredit masih tersisa banyak di akhir bulan"
        ],
        "correctIndex": 1,
        "educationalFact": "Tahukah kamu? Kebocoran keuangan terbesar seseorang sering kali bukan disebabkan oleh pengeluaran tunggal dalam jumlah besar (seperti membeli motor atau gawai baru), melainkan oleh akumulasi pengeluaran-pengeluaran kecil tidak sadar yang terjadi secara rutin setiap hari. Fenomena di masyarakat ini populer dengan istilah The Latte Factor, sebuah konsep yang dikenalkan oleh perencana keuangan David Bach."
    },
    {
        "level": "EASY",
        "subBab": 3,
        "questionText": "Mengapa metode amplop fisik atau amplop digital efektif dalam mengelola arus kas?",
        "options": [
            "A. Membatasi pengeluaran agar tidak melebihi anggaran yang sudah ditentukan per pos",
            "B. Menjamin uang di dalam amplop akan berkembang biak otomatis",
            "C. Memudahkan kita meminjamkan uang kepada kerabat terdekat"
        ],
        "correctIndex": 0,
        "educationalFact": "Tahukah kalian? Mencatat keuangan harian tidak perlu serumit akuntansi perusahaan besar. Konsep mendasar dari arsitektur arus kas personal hanyalah melacak dua arus utama secara disiplin: Cash Inflow (Uang Masuk, seperti uang saku, gaji, atau hasil komisi) dan Cash Outflow (Uang Keluar, seperti biaya makan, transportasi, dan kosan). Selisih positif di antara keduanya adalah modal utamamu untuk kay"
    },
    {
        "level": "EASY",
        "subBab": 3,
        "questionText": "Manakah alat pencatatan keuangan harian yang paling praktis bagi pemula di era digital?",
        "options": [
            "A. Buku besar akuntansi dengan format debit-kredit berlapis",
            "B. Mengandalkan ingatan pikiran saja di setiap akhir minggu",
            "C. Aplikasi pengelola keuangan di smartphone atau spreadsheet sederhana"
        ],
        "correctIndex": 2,
        "educationalFact": "Fakta menarik! Orang yang rajin mencatat pengeluaran hariannya secara detail terbukti memiliki tingkat kontrol diri yang jauh lebih stabil. Berdasarkan studi psikologi finansial, tindakan menuliskan nominal uang sesaat setelah dikeluarkan memberikan efek psikologis berupa \"rasa sakit membayar\" (pain of paying), yang secara alami bertindak sebagai rem kognitif agar kita tidak belanja berlebihan pada transaksi berikutny"
    },
    {
        "level": "EASY",
        "subBab": 3,
        "questionText": "Apa yang dimaksud dengan “Pendapatan Pasif” (Passive Income) dalam arus kas?",
        "options": [
            "A. Gaji pokok yang diterima rutin setiap bulan dari tempat bekerja tetap",
            "B. Pendapatan yang diperoleh dari aset yang bekerja, tanpa keterlibatan aktif sepanjang waktu",
            "C. Uang hasil pinjaman dari bank atau kerabat"
        ],
        "correctIndex": 1,
        "educationalFact": "Fun fact! Ada aturan praktis penganggaran arus kas yang sangat mendunia dan mudah diterapkan oleh siapa saja, yaitu The 50/30/20 Rule yang dipopulerkan oleh Elizabeth Warren (Pakar Hukum Kebangkrutan dari Universitas Harvard). Aturan ini menyarankan kita membagi pendapatan bulanan bersih menjadi tiga pos utama: 50% untuk Kebutuhan Pokok (Needs), 30% untuk Keinginan (Wants), dan 20% untuk Tabungan atau Investasi (Savings)."
    },
    {
        "level": "EASY",
        "subBab": 3,
        "questionText": "Pengeluaran rutin yang nilainya cenderung sama setiap bulan (seperti biaya kos atau paket internet berlangganan) disebut sebagai...",
        "options": [
            "A. Pengeluaran Tetap (Fixed Expenses)",
            "B. Pengeluaran Variabel (Variable Expenses)",
            "C. Pengeluaran Darurat (Emergency Expenses)"
        ],
        "correctIndex": 0,
        "educationalFact": "Money Fact! Fenomena nyata di masyarakat saat ini menunjukkan banyak orang mengalami kebingungan karena merasa uangnya habis tanpa jejak di akhir bulan, meskipun mereka merasa tidak membeli barang mahal. Hal ini terjadi karena mereka melewatkan pencatatan \"biaya-biaya siluman\" kecil seperti biaya admin transfer antar-bank, biaya parkir kendaraan, uang tip, hingga biaya langganan aplikasi digital yang sebenarnya jarang digunakan."
    },
    {
        "level": "EASY",
        "subBab": 4,
        "questionText": "Apa definisi sederhana dari istilah “Inflasi”?",
        "options": [
            "A. Proses penurunan harga barang-barang pokok secara serentak di pasar",
            "B. Penurunan nilai mata uang yang menyebabkan kenaikan harga barang secara umum dan terus-menerus",
            "C. Kebijakan bank sentral menaikkan nilai tukar rupiah terhadap dolar"
        ],
        "correctIndex": 1,
        "educationalFact": "Tahukah kamu? Menyimpan uang tunai di dalam celengan ayam atau di bawah kasur dalam jangka panjang sebenarnya secara perlahan menghancurkan kekayaanmu sendiri. Fenomena di masyarakat ini terjadi karena adanya \"pencuri terselubung\" yang bernama inflasi, yaitu suatu kondisi di mana harga barang dan jasa secara umum mengalami kenaikan terus-menerus, sehingga membuat nilai riil dari nominal uangmu merosot drastis."
    },
    {
        "level": "EASY",
        "subBab": 4,
        "questionText": "Jika terjadi terjadi inflasi, maka apa yang terjadi dengan uang yang anda miliki saat ini?",
        "options": [
            "A. Jumlah nominal uang anda berkurang secara fisik",
            "B. Daya beli uang tersebut menurun, sehingga tidak bisa lagi membeli barang dengan jumlah yang sama seperti tahun ini",
            "C. Nilai uang tersebut otomatis bertambah karena menyesuaikan pasar"
        ],
        "correctIndex": 1,
        "educationalFact": "Tahukah kalian? Inflasi menyebabkan daya beli (purchasing power) uang kita menyusut secara kejam. Sebagai contoh nyata: uang Rp100.000 pada tahun 2000 mungkin bisa digunakan untuk membeli satu keranjang penuh bahan makanan pokok di pasar swalayan, namun di tahun 2026 saat ini, lembaran uang Rp100.000 yang sama mungkin hanya cukup untuk membeli beberapa liter minyak goreng dan sedikit beras."
    },
    {
        "level": "EASY",
        "subBab": 4,
        "questionText": "Mengapa menyimpan uang tunai di bawah kasur dalam jangka panjang (misal 10 tahun) sangat tidak disarankan?",
        "options": [
            "A. Karena uang tersebut pasti akan rusak dimakan rayap saja",
            "B. Karena dilarang oleh peraturan Bank Indonesia",
            "C. Karena nilainya tergerus oleh inflasi sehingga daya belinya turun drastis"
        ],
        "correctIndex": 2,
        "educationalFact": "Fakta menarik! Satu-satunya cara paling efektif bagi masyarakat umum untuk mengalahkan dampak buruk inflasi adalah dengan memindahkan kekayaan dari aset non-produktif (seperti uang tunai) ke dalam aset produktif melalui instrumen investasi. Investasi yang benar adalah instrumen yang mampu menghasilkan tingkat imbal hasil (return) tahunan yang berada di atas laju persentase inflasi resmi di negara tersebut."
    },
    {
        "level": "EASY",
        "subBab": 4,
        "questionText": "Instrumen keuangan manakah yang paling dasar dan aman yang dirancang khusus pemerintah Indonesia untuk membantu masyarakat melawan inflasi?",
        "options": [
            "A. Surat Berharga Negara (SBN) seperti ORI atau SBR",
            "B. Saham perusahaan sektor teknologi baru",
            "C. Menabung di rekening giro biasa"
        ],
        "correctIndex": 0,
        "educationalFact": "Fun fact! Pengetahuan mendasar mengenai inflasi membaginya menjadi beberapa jenis berdasarkan penyebabny"
    },
    {
        "level": "EASY",
        "subBab": 4,
        "questionText": "Apa keuntungan utama berinvestasi pada aset riil seperti emas batangan untuk jangka panjang?",
        "options": [
            "A. Emas memberikan dividen tunai setiap bulan ke rekening kita",
            "B. Harga emas cenderung stabil dan naik mengikuti atau melebihi laju inflasi jangka panjang",
            "C. Emas sangat mudah hancur jika disimpan di rumah"
        ],
        "correctIndex": 1,
        "educationalFact": "Money Fact! Bank Indonesia (BI) selaku bank sentral di negara kita memiliki salah satu tugas pokok yang sangat krusial, yaitu menjaga kestabilan nilai rupiah terhadap barang dan jasa dengan cara menetapkan sasaran target inflasi tahunan (misalnya berada di kisaran rentang persen tertentu menggunakan instrumen kebijakan moneter seperti pengaturan suku bunga acuan (BI-Rate)."
    },
    {
        "level": "EASY",
        "subBab": 4,
        "questionText": "Manakah lembaga resmi di Indonesia yang bertugas memantau dan merilis data inflasi nasional setiap bulannya?",
        "options": [
            "A. Otoritas Jasa Keuangan (OJK)",
            "B. Badan Pusat Statistik (BPS)",
            "C. Lembaga Penjamin Simpanan (LPS)"
        ],
        "correctIndex": 1,
        "educationalFact": "Tahukah kamu? Menyimpan uang tunai di dalam celengan ayam atau di bawah kasur dalam jangka panjang sebenarnya secara perlahan menghancurkan kekayaanmu sendiri. Fenomena di masyarakat ini terjadi karena adanya \"pencuri terselubung\" yang bernama inflasi, yaitu suatu kondisi di mana harga barang dan jasa secara umum mengalami kenaikan terus-menerus, sehingga membuat nilai riil dari nominal uangmu merosot drastis."
    },
    {
        "level": "EASY",
        "subBab": 4,
        "questionText": "Apa yang dimaksud dengan investasi reksa dana pasar uang?",
        "options": [
            "A. Wadah investasi yang menghimpun dana masyarakat untuk dikelola manajer investasi ke instrumen pasar uang berisiko rendah",
            "B. Pembelian lembar saham perusahaan internasional secara langsung",
            "C. Pinjaman modal online kepada masyarakat pelaku UMKM"
        ],
        "correctIndex": 0,
        "educationalFact": "Tahukah kalian? Inflasi menyebabkan daya beli (purchasing power) uang kita menyusut secara kejam. Sebagai contoh nyata: uang Rp100.000 pada tahun 2000 mungkin bisa digunakan untuk membeli satu keranjang penuh bahan makanan pokok di pasar swalayan, namun di tahun 2026 saat ini, lembaran uang Rp100.000 yang sama mungkin hanya cukup untuk membeli beberapa liter minyak goreng dan sedikit beras."
    },
    {
        "level": "EASY",
        "subBab": 4,
        "questionText": "Mengapa investasi dianggap sebagai cara terbaik untuk melawan inflasi dibandingkan hanya menabung biasa?",
        "options": [
            "A. Investasi selalu memberikan jaminan keuntungan pasti kaya tanpa risiko",
            "B. Menabung biasa memerlukan biaya administrasi yang sangat besar di bank",
            "C. Imbal hasil investasi berpotensi lebih tinggi daripada tingkat kenaikan inflasi tahunan"
        ],
        "correctIndex": 2,
        "educationalFact": "Fakta menarik! Satu-satunya cara paling efektif bagi masyarakat umum untuk mengalahkan dampak buruk inflasi adalah dengan memindahkan kekayaan dari aset non-produktif (seperti uang tunai) ke dalam aset produktif melalui instrumen investasi. Investasi yang benar adalah instrumen yang mampu menghasilkan tingkat imbal hasil (return) tahunan yang berada di atas laju persentase inflasi resmi di negara tersebut."
    },
    {
        "level": "EASY",
        "subBab": 4,
        "questionText": "Apa risiko utama dari produk tabungan bank konvensional jika bunga tabungan lebih kecil daripada laju inflasi?",
        "options": [
            "A. Nilai riil atau kekayaan bersih Anda secara tidak sadar mengalami penurunan",
            "B. Bank akan menutup rekening Anda secara sepihak",
            "C. Uang Anda tidak dilindungi oleh Lembaga Penjamin Simpanan (LPS)"
        ],
        "correctIndex": 0,
        "educationalFact": "Fun fact! Pengetahuan mendasar mengenai inflasi membaginya menjadi beberapa jenis berdasarkan penyebabny"
    },
    {
        "level": "EASY",
        "subBab": 4,
        "questionText": "Apa yang dimaksud dengan diversifikasi dalam menghadapi risiko investasi?",
        "options": [
            "A. Mempertaruhkan seluruh modal pada satu instrumen yang paling untung besar",
            "B. Menyebar modal investasi ke beberapa jenis aset berbeda untuk meminimalkan risiko kerugian",
            "C. Menjual seluruh aset investasi saat pasar sedang mengalami sedikit penurunan"
        ],
        "correctIndex": 1,
        "educationalFact": "Money Fact! Bank Indonesia (BI) selaku bank sentral di negara kita memiliki salah satu tugas pokok yang sangat krusial, yaitu menjaga kestabilan nilai rupiah terhadap barang dan jasa dengan cara menetapkan sasaran target inflasi tahunan (misalnya berada di kisaran rentang persen tertentu menggunakan instrumen kebijakan moneter seperti pengaturan suku bunga acuan (BI-Rate)."
    },
    {
        "level": "EASY",
        "subBab": 5,
        "questionText": "Apa kepanjangan dari istilah populer “FOMO” dalam psikologi keuangan?",
        "options": [
            "A. Financial Outlook and Market Opportunity",
            "B. Fear Of Missing Out (Takut Ketinggalan Tren)",
            "C. Focus On Money Only"
        ],
        "correctIndex": 1,
        "educationalFact": "Tahukah kamu? Banyak orang yang terjebak dalam masalah utang parah sebenarnya bukan karena mereka kekurangan uang untuk membiayai kebutuhan hidup mereka, melainkan karena mereka kekurangan uang untuk membiayai pamer gaya hidup. Fenomena di masyarakat modern ini diperparah oleh kehadiran media sosial yang membuat orang terus-menerus membandingkan hidupnya dengan potongan momen terbaik orang lain."
    },
    {
        "level": "EASY",
        "subBab": 5,
        "questionText": "Bagaimana fenomena FOMO biasanya memengaruhi perilaku keuangan seorang remaja atau mahasiswa?",
        "options": [
            "A. Memicu pengeluaran impulsif demi membeli barang atau tiket event agar diakui oleh lingkaran pertemanan",
            "B. Membuat individu tersebut menjadi lebih rajin menabung dan berinvestasi",
            "C. Menyebabkan ketakutan berlebih untuk bertransaksi secara digital"
        ],
        "correctIndex": 0,
        "educationalFact": "Tahukah kalian? Istilah FOMO (Fear of Missing Out) atau ketakutan akan tertinggal tren global bukan sekadar istilah gaul, melainkan sebuah bias psikologis nyata yang menyerang bagian otak emosional kit"
    },
    {
        "level": "EASY",
        "subBab": 5,
        "questionText": "Apa yang dimaksud dengan perilaku Lifestyle Inflation (Inflasi Gaya Hidup)?",
        "options": [
            "A. Kenaikan harga barang-barang mewah akibat pajak bea cukai",
            "B. Kecenderungan meningkatkan pengeluaran gaya hidup seiring dengan meningkatnya pendapatan",
            "C. Penghematan ekstrem yang dilakukan seseorang akibat kondisi ekonomi memburuk"
        ],
        "correctIndex": 1,
        "educationalFact": "Fakta menarik! Kebahagiaan psikologis yang kamu dapatkan saat membeli barang mewah demi kepuasan gengsi (conspicuous consumption) terbukti secara ilmiah memiliki umur yang sangat pendek. Riset psikologi sosial menunjukkan bahwa rasa senang dari membeli barang pajangan status sosial tersebut biasanya akan menguap dan hilang dari ingatan kognitifmu dalam waktu kurang dari dua minggu saja setelah barang tersebut berpindah tangan."
    },
    {
        "level": "EASY",
        "subBab": 5,
        "questionText": "Manakah contoh tindakan yang didorong oleh Social Proof yang salah dalam keuangan?",
        "options": [
            "A. Membeli asuransi kesehatan karena menyadari riwayat penyakit keluarga",
            "B. Mengikuti kelas edukasi keuangan gratis yang diadakan oleh OJK",
            "C. Membeli tipe smartphone terbaru berspesifikasi tinggi hanya karena semua teman kerja menggunakannya"
        ],
        "correctIndex": 2,
        "educationalFact": "Fun fact! Ada filosofi kuno yang sangat populer untuk melawan jebakan psikologi keuangan merusak ini, yaitu hidup minimalis atau mengadopsi prinsip ketenangan finansial. Konsep mendasarnya mengajarkan bahwa kekayaan sejati tidak diukur dari seberapa banyak barang mewah yang bisa kamu tunjukkan kepada dunia, melainkan dari seberapa besar kebebasan waktu dan pilihan hidup yang kamu miliki tanpa tekanan utang."
    },
    {
        "level": "EASY",
        "subBab": 5,
        "questionText": "Bagaimana cara media sosial sering kali merusak psikologi keuangan penggunanya?",
        "options": [
            "A. Menampilkan grafik saham yang rumit setiap hari",
            "B. Menampilkan ilusi standar hidup mewah orang lain yang memicu rasa iri dan keinginan meniru",
            "C. Membatasi waktu akses transaksi perbankan pengguna"
        ],
        "correctIndex": 1,
        "educationalFact": "Money Fact! Salah satu cara paling sederhana di masyarakat untuk mendeteksi apakah kamu sedang mengalami tekanan sosial dalam bergaya hidup adalah dengan melihat perilakumu saat menggunakan kartu kredit atau fitur Paylater. Jika kamu sering menggunakan fitur utang tersebut untuk membeli barang konsumtif non-primer demi mengesankan orang-orang yang sebenarnya tidak terlalu peduli padamu, kamu sedang berada di jalur destruksi finansial."
    },
    {
        "level": "EASY",
        "subBab": 5,
        "questionText": "Apa tanda utama seseorang telah terjebak dalam siklus “You Only Live Once” (YOLO) yang keliru?",
        "options": [
            "A. Menghabiskan seluruh gaji bulanan demi kesenangan sesaat tanpa memikirkan tabungan masa depan",
            "B. Menolak ajakan nongkrong dari teman demi fokus membayar cicilan rumah",
            "C. Menginvestasikan sebagian besar uangnya ke reksa dana jangka panjang"
        ],
        "correctIndex": 0,
        "educationalFact": "Tahukah kamu? Banyak orang yang terjebak dalam masalah utang parah sebenarnya bukan karena mereka kekurangan uang untuk membiayai kebutuhan hidup mereka, melainkan karena mereka kekurangan uang untuk membiayai pamer gaya hidup. Fenomena di masyarakat modern ini diperparah oleh kehadiran media sosial yang membuat orang terus-menerus membandingkan hidupnya dengan potongan momen terbaik orang lain."
    },
    {
        "level": "EASY",
        "subBab": 5,
        "questionText": "Mengapa penting membedakan antara “harga diri” dan “gaya hidup”?",
        "options": [
            "A. Karena gaya hidup tinggi otomatis meningkatkan harga diri di hadapan bank",
            "B. Agar kita tahu berapa anggaran minimal untuk membeli pakaian bermerek",
            "C. Agar keuangan tidak hancur hanya demi mempertahankan citra palsu di mata orang lain"
        ],
        "correctIndex": 2,
        "educationalFact": "Tahukah kalian? Istilah FOMO (Fear of Missing Out) atau ketakutan akan tertinggal tren global bukan sekadar istilah gaul, melainkan sebuah bias psikologis nyata yang menyerang bagian otak emosional kit"
    },
    {
        "level": "EASY",
        "subBab": 5,
        "questionText": "Apa langkah psikologis pertama untuk mengatasi rasa ingin selalu pamer (flexing) di media sosial?",
        "options": [
            "A. Fokus pada pencapaian finansial riil secara privat (silent wealth) daripada validasi orang lain",
            "B. Menghapus semua rekening bank dan beralih ke uang tunai sepenuhnya",
            "C. Mencari pinjaman modal tambahan agar bisa membeli barang yang lebih mewah lagi"
        ],
        "correctIndex": 0,
        "educationalFact": "Fakta menarik! Kebahagiaan psikologis yang kamu dapatkan saat membeli barang mewah demi kepuasan gengsi (conspicuous consumption) terbukti secara ilmiah memiliki umur yang sangat pendek. Riset psikologi sosial menunjukkan bahwa rasa senang dari membeli barang pajangan status sosial tersebut biasanya akan menguap dan hilang dari ingatan kognitifmu dalam waktu kurang dari dua minggu saja setelah barang tersebut berpindah tangan."
    },
    {
        "level": "EASY",
        "subBab": 5,
        "questionText": "Manakah perilaku berikut yang menunjukkan kematangan psikologi keuangan?",
        "options": [
            "A. Merasa cemas jika tidak memegang gadget keluaran tahun terbaru",
            "B. Selalu mentraktir teman-teman menggunakan kartu kredit demi terlihat sukses",
            "C. Tetap merasa nyaman dan percaya diri meskipun menggunakan barang sederhana yang berfungsi baik"
        ],
        "correctIndex": 2,
        "educationalFact": "Fun fact! Ada filosofi kuno yang sangat populer untuk melawan jebakan psikologi keuangan merusak ini, yaitu hidup minimalis atau mengadopsi prinsip ketenangan finansial. Konsep mendasarnya mengajarkan bahwa kekayaan sejati tidak diukur dari seberapa banyak barang mewah yang bisa kamu tunjukkan kepada dunia, melainkan dari seberapa besar kebebasan waktu dan pilihan hidup yang kamu miliki tanpa tekanan utang."
    },
    {
        "level": "EASY",
        "subBab": 5,
        "questionText": "Apa bahaya terbesar dari membandingkan kondisi keuangan diri sendiri dengan apa yang terlihat di akun media sosial orang lain?",
        "options": [
            "A. Kita akan kehilangan kuota internet dengan cepat",
            "B. Munculnya rasa tidak puas yang mendorong kita berutang demi menyamai standar hidup tersebut",
            "C. Bank akan menurunkan skor kredit pribadi kita"
        ],
        "correctIndex": 1,
        "educationalFact": "Money Fact! Salah satu cara paling sederhana di masyarakat untuk mendeteksi apakah kamu sedang mengalami tekanan sosial dalam bergaya hidup adalah dengan melihat perilakumu saat menggunakan kartu kredit atau fitur Paylater. Jika kamu sering menggunakan fitur utang tersebut untuk membeli barang konsumtif non-primer demi mengesankan orang-orang yang sebenarnya tidak terlalu peduli padamu, kamu sedang berada di jalur destruksi finansial."
    },
    {
        "level": "EASY",
        "subBab": 6,
        "questionText": "Lembaga resmi negara yang memiliki fungsi mengatur, mengawasi, dan memberikan izin operasional bagi platform fintech lending (pinjaman online) di Indonesia adalah...",
        "options": [
            "A. Bank Indonesia (BI)",
            "B. Otoritas Jasa Keuangan (OJK)",
            "C. Kementerian Komunikasi dan Digital (Komdigi)"
        ],
        "correctIndex": 1,
        "educationalFact": "Tahukah kamu? Tidak semua aplikasi pinjaman online di internet itu jahat atau merugikan. Industri teknologi finansial (fintech lending) yang resmi sebenarnya diciptakan sebagai solusi inklusi keuangan untuk membantu menyediakan akses pendanaan cepat bagi masyarakat atau UMKM yang belum terjangkau oleh layanan perbankan konvensional (unbanked/underbanked). Kuncinya ada pada kemampuan kita membedakan mana yang legal dan mana yang ilegal."
    },
    {
        "level": "EASY",
        "subBab": 6,
        "questionText": "Ciri utama yang paling valid untuk membuktikan bahwa sebuah aplikasi pinjaman digital berstatus legal adalah...",
        "options": [
            "A. Memiliki jumlah pengunduh (downloads) mencapai jutaan pengguna di toko  aplikasi",
            "B. Nama platform tercantum dalam daftar resmi yang dirilis dan diperbarui berkala oleh OJK",
            "C. Menawarkan suku bunga rendah yang dipromosikan oleh figur publik atau influencer terkenal"
        ],
        "correctIndex": 1,
        "educationalFact": "Tahukah kalian? Cara paling mendasar dan mutlak untuk mengetahui sebuah aplikasi pinjaman online itu aman atau tidak adalah dengan memeriksa status regulasinya di Otoritas Jasa Keuangan (OJK). Platform pinjaman digital yang aman wajib berstatus Terdaftar dan Berizin OJK. Jika nama aplikasinya tidak tercantum dalam daftar resmi OJK, platform tersebut 100% adalah pinjol ilegal yang melanggar hukum."
    },
    {
        "level": "EASY",
        "subBab": 6,
        "questionText": "Salah satu karakteristik mencolok dari modus operandi pinjaman online ilegal dalam menawarkan produknya adalah...",
        "options": [
            "A. Melalui iklan resmi di media massa nasional atau baliho di jalan protokol",
            "B. Mengirimkan proposal penawaran resmi melalui surat elektronik berdomain perusahaan",
            "C. Mengirimkan pesan penawaran massal (blasting) via SMS atau WhatsApp dari nomor tidak dikenal"
        ],
        "correctIndex": 2,
        "educationalFact": "Fakta menarik! Fenomena nyata di masyarakat menunjukkan bahwa korban pinjol ilegal sering kali terjebak dalam perangkap lingkaran setan bernama gali lubang tutup lubang. Karena terdesak tagihan, mereka mengunduh aplikasi pinjol ilegal baru untuk melunasi utang di aplikasi pinjol ilegal lama, hingga dalam hitungan minggu, utang awal yang hanya ratusan ribu rupiah bisa membengkak menjadi puluhan juta rupiah."
    },
    {
        "level": "EASY",
        "subBab": 6,
        "questionText": "Untuk platform pinjaman online yang legal dan berizin, fitur data digital pada smartphone nasabah yang boleh diakses berdasarkan ketentuan OJK adalah...",
        "options": [
            "A. Daftar kontak, riwayat panggilan, dan galeri foto pribadi secara menyeluruh",
            "B. Kamera (Camera), Mikrofon (Microphone), dan Lokasi (Location) untuk keperluan verifikasi",
            "C. Riwayat pesan instan, akun media sosial, dan seluruh berkas di memori internal"
        ],
        "correctIndex": 1,
        "educationalFact": "Fun fact! Cara instan dan sangat mudah disediakan oleh pemerintah bagi masyarakat untuk mengecek legalitas sebuah pinjol adalah lewat kontak resmi WhatsApp OJK di nomor 081-157-157-15"
    },
    {
        "level": "EASY",
        "subBab": 6,
        "questionText": "Mengapa keberadaan regulasi Credit Scoring yang ketat dan selektif pada platform fintech lending legal justru berfungsi sebagai instrumen perlindungan konsumen, bukan bentuk pembatasan akses modal?",
        "options": [
            "A. Agar platform legal hanya memberikan pinjaman kepada kalangan konglomerat yang tidak membutuhkan uang",
            "B. Menjaga konsumen dari risiko over-indebtedness (utang berlebih) yang melampaui batas kemampuan bayar riil arus kas mereka",
            "C. Membantu kantor pajak dalam mendeteksi masyarakat yang"
        ],
        "correctIndex": 1,
        "educationalFact": "Money Fact! Salah satu ciri kasat mata dari penawaran pinjol ilegal di masyarakat adalah jalur komunikasinya yang tidak etis. Platform legal dilarang keras menawarkan pinjaman melalui jalur komunikasi pribadi tanpa persetujuan konsumen. Jadi, jika kamu menerima pesan SMS atau obrolan WhatsApp dari nomor tidak dikenal yang menawarkan pinjaman uang kilat langsung cair, dipastikan itu adalah perangkap pinjol ilegal."
    },
    {
        "level": "EASY",
        "subBab": 6,
        "questionText": "Apa akibat utama yang terjadi pada data pribadi Anda jika menyetujui izin akses kontak pada aplikasi pinjol ilegal?",
        "options": [
            "A. Data kontak akan disimpan di server aman milik Bank Indonesia untuk cadangan finansial",
            "B. Sistem otomatis menghapus kontak yang dianggap tidak aktif atau palsu",
            "C. Seluruh daftar nomor kontak disalin oleh pelaku untuk dijadikan target intimidasi saat terjadi keterlambatan"
        ],
        "correctIndex": 2,
        "educationalFact": "Tahukah kamu? Tidak semua aplikasi pinjaman online di internet itu jahat atau merugikan. Industri teknologi finansial (fintech lending) yang resmi sebenarnya diciptakan sebagai solusi inklusi keuangan untuk membantu menyediakan akses pendanaan cepat bagi masyarakat atau UMKM yang belum terjangkau oleh layanan perbankan konvensional (unbanked/underbanked). Kuncinya ada pada kemampuan kita membedakan mana yang legal dan mana yang ilegal."
    },
    {
        "level": "EASY",
        "subBab": 6,
        "questionText": "Satgas resmi dibentuk oleh pemerintah Indonesia untuk memberantas aktivitas keuangan ilegal, termasuk pinjol ilegal, saat ini dikenal dengan nama...",
        "options": [
            "A. Badan Penyelamat Aset Keuangan Negara",
            "B. Satgas Pemberantasan Aktivitas Keuangan Ilegal (Satgas Pasti)",
            "C. Komite Pengawas Industri Keuangan Mikro"
        ],
        "correctIndex": 1,
        "educationalFact": "Tahukah kalian? Cara paling mendasar dan mutlak untuk mengetahui sebuah aplikasi pinjaman online itu aman atau tidak adalah dengan memeriksa status regulasinya di Otoritas Jasa Keuangan (OJK). Platform pinjaman digital yang aman wajib berstatus Terdaftar dan Berizin OJK. Jika nama aplikasinya tidak tercantum dalam daftar resmi OJK, platform tersebut 100% adalah pinjol ilegal yang melanggar hukum."
    },
    {
        "level": "EASY",
        "subBab": 6,
        "questionText": "Jika Anda ingin melakukan pengecekan cepat mengenai legalitas sebuah platform pinjaman online melalui layanan WhatsApp resmi OJK, cara yang paling benar adalah...",
        "options": [
            "A. Mengirimkan foto KTP dan selfie wajah ke nomor pengaduan masyarakat",
            "B. Mengetikkan nama aplikasi/platform yang ingin dicek secara jelas lalu mengirimkannya ke Kontak OJK",
            "C. Menunggu tautan konfirmasi verifikasi otomatis yang dikirimkan oleh admin grup OJK"
        ],
        "correctIndex": 1,
        "educationalFact": "Fakta menarik! Fenomena nyata di masyarakat menunjukkan bahwa korban pinjol ilegal sering kali terjebak dalam perangkap lingkaran setan bernama gali lubang tutup lubang. Karena terdesak tagihan, mereka mengunduh aplikasi pinjol ilegal baru untuk melunasi utang di aplikasi pinjol ilegal lama, hingga dalam hitungan minggu, utang awal yang hanya ratusan ribu rupiah bisa membengkak menjadi puluhan juta rupiah."
    },
    {
        "level": "EASY",
        "subBab": 6,
        "questionText": "Apa yang dimaksud dengan istilah Fintech Peer-to-Peer (P2P) Lending dalam ekosistem keuangan formal?",
        "options": [
            "A. Layanan perbankan digital untuk mentransfer uang antar-rekening tanpa biaya administrasi",
            "B. Layanan jasa keuangan untuk mempertemukan pemberi dana dengan penerima dana dalam rangka pendanaan digital",
            "C. Aplikasi dompet digital yang digunakan untuk membayar transaksi belanja di pasar modern"
        ],
        "correctIndex": 1,
        "educationalFact": "Fun fact! Cara instan dan sangat mudah disediakan oleh pemerintah bagi masyarakat untuk mengecek legalitas sebuah pinjol adalah lewat kontak resmi WhatsApp OJK di nomor 081-157-157-15"
    },
    {
        "level": "EASY",
        "subBab": 6,
        "questionText": "Perilaku finansial yang paling mencerminkan pemahaman literasi pinjaman digital yang baik sebelum mengajukan pinjaman adalah...",
        "options": [
            "A. Langsung meminjam dari platform pertama yang muncul di mesin pencari tanpa riset tambahan",
            "B. Membaca dan memahami isi kontrak perjanjian, biaya admin, serta skema bunga sebelum menyetujui pinjaman",
            "C. Mengajukan pinjaman dengan nominal maksimal yang ditawarkan tanpa mengukur kapasitas pendapatan"
        ],
        "correctIndex": 1,
        "educationalFact": "Money Fact! Salah satu ciri kasat mata dari penawaran pinjol ilegal di masyarakat adalah jalur komunikasinya yang tidak etis. Platform legal dilarang keras menawarkan pinjaman melalui jalur komunikasi pribadi tanpa persetujuan konsumen. Jadi, jika kamu menerima pesan SMS atau obrolan WhatsApp dari nomor tidak dikenal yang menawarkan pinjaman uang kilat langsung cair, dipastikan itu adalah perangkap pinjol ilegal."
    },
    {
        "level": "MEDIUM",
        "subBab": 0,
        "questionText": "Manakah dari indikator berikut yang menunjukkan seseorang telah masuk ke dalam kategori “Well Literate” menurut standar OJK?",
        "options": [
            "A. Memiliki banyak akun media sosial keuangan dan menghafal nama menteri ekonomi",
            "B. Memiliki pengetahuan, keyakinan, serta keterampilan menggunakan berbagai produk dan layanan jasa keuangan secara tepat",
            "C. Sering meminjam uang dari lembaga keuangan legal maupun ilegal tanpa pernah telat bayar"
        ],
        "correctIndex": 1,
        "educationalFact": "Tahukah kamu? Otak kita sering kali tertipu oleh pecahan uang yang kita pegang karena adanya fenomena psikologis bernama Denomination Effect (Efek Denominasi). Penelitian dalam Journal of Consumer Research membuktikan bahwa masyarakat cenderung lebih impulsif membelanjakan uang kertas pecahan kecil (misal lima lembar Rp20.000) dibandingkan menghabiskan satu lembar uang pecahan besar (misal satu lembar Rp100.000), meskipun nilai nominal totalnya sama persis."
    },
    {
        "level": "MEDIUM",
        "subBab": 0,
        "questionText": "Apa peran utama dari Lembaga Penjamin Simpanan (LPS) dalam menjaga stabilitas sistem perbankan nasional Indonesia?",
        "options": [
            "A. Memberikan izin operasional pendirian bank baru di tingkat daerah",
            "B. Menjamin dana simpanan nasabah di bank maksimal Rp2 miliar per nasabah per bank jika bank dicabut izin usahanya",
            "C. Menentukan harga saham bank-bank pemerintah di Bursa Efek Indonesia"
        ],
        "correctIndex": 1,
        "educationalFact": "Fakta menarik! Tiga pilar utama yang menyokong seluruh keputusan keuangan global berakar pada Corporate Finance Theory yang diadopsi ke dalam keuangan personal. Tiga pilar mendasar tersebut adalah: Investment Decision (bagaimana mengalokasikan dana ke aset), Financing Decision (dari mana sumber dana diperoleh, apakah dari pendapatan atau utang), dan Asset Management (bagaimana mengelola aset yang ada agar produktif)."
    },
    {
        "level": "MEDIUM",
        "subBab": 0,
        "questionText": "Seorang ibu rumah tangga ditawari investasi dengan imbal hasil keuntungan 30% per bulan pasti untung tanpa risiko rugi. Berdasarkan prinsip edukasi OJK, bagaimana status investasi tersebut?",
        "options": [
            "A. Legal dan aman karena membantu ekonomi rakyat kecil",
            "B. Investasi ilegal (bodong) karena melanggar prinsip rasionalitas keuntungan dan manajemen risiko (High Risk, High Return)",
            "C. Program resmi pemerintah khusus untuk pemberdayaan kaum wanita di pedesaan"
        ],
        "correctIndex": 1,
        "educationalFact": "Fun fact! Struktur laporan keuangan pribadi yang sehat selalu mengacu pada format Personal Balance Sheet (Laporan Posisi Keuangan). Pengetahuan teknis ini membagi keuanganmu menjadi tiga akun besar: Aset (apa yang kamu miliki, baik likuid maupun investasi), Liabilitas (apa yang kamu utangkan kepada pihak lain), dan Kekayaan Bersih (Net Worth)."
    },
    {
        "level": "MEDIUM",
        "subBab": 0,
        "questionText": "Apa yang dimaksud dengan Credit Scoring (Skor Kredit) dalam sistem pengajuan pinjaman perbankan di Indonesia melalui SLIK OJK?",
        "options": [
            "A. Penilaian rekam jejak kedisiplinan nasabah dalam membayar cicilan utang masa lalu yang menentukan kelayakan kredit baru",
            "B. Jumlah saldo tabungan minimal yang harus mengendap di dalam rekening nasabah selama setahun",
            "C. Angka acuan tingkat suku bunga pinjaman yang ditetapkan oleh asosiasi fintech nasional"
        ],
        "correctIndex": 0,
        "educationalFact": "Money Fact! Dalam mengukur kesehatan aset, para ahli keuangan menggunakan rasio teknis yang disebut Solvency Ratio (Rasio Solvabilitas) dan batas aman kesehatan keuangan personal menurut standar perencana keuangan adalah minimal 50%. Jika rasiomu di bawah 50%, artinya mayoritas aset yang kamu miliki saat ini sebenarnya dibiayai oleh utang."
    },
    {
        "level": "MEDIUM",
        "subBab": 0,
        "questionText": "Mengapa pemahaman tentang pajak penghasilan pribadi (PPh Pasal 21) tergolong sebagai salah satu pilar literasi keuangan yang penting bagi pekerja?",
        "options": [
            "A. Agar pekerja dapat menghindari kewajiban membayar pajak secara ilegal",
            "B. Membantu pekerja memahami potongan resmi dari pendapatan kotor mereka serta merencanakan pelaporan SPT Tahunan dengan benar",
            "C. Menjamin pekerja mendapatkan kenaikan jabatan otomatis setiap tahun dari perusahaan"
        ],
        "correctIndex": 1,
        "educationalFact": "Tahukah kamu? Otak kita sering kali tertipu oleh pecahan uang yang kita pegang karena adanya fenomena psikologis bernama Denomination Effect (Efek Denominasi). Penelitian dalam Journal of Consumer Research membuktikan bahwa masyarakat cenderung lebih impulsif membelanjakan uang kertas pecahan kecil (misal lima lembar Rp20.000) dibandingkan menghabiskan satu lembar uang pecahan besar (misal satu lembar Rp100.000), meskipun nilai nominal totalnya sama persis."
    },
    {
        "level": "MEDIUM",
        "subBab": 0,
        "questionText": "Manakah dari pilihan berikut yang merupakan perbedaan mendasar antara Reksa Dana Pasar Uang dengan Reksa Dana Saham?",
        "options": [
            "A. Reksa dana pasar uang berisiko jauh lebih tinggi daripada reksa dana saham",
            "B. Reksa dana pasar uang berinvestasi pada instrumen jangka pendek (seperti deposito), sedangkan reksa dana saham pada lembar saham perusahaan",
            "C. Reksa dana pasar uang dikelola oleh bank, sedangkan reksa dana saham dikelola oleh individu sendiri"
        ],
        "correctIndex": 1,
        "educationalFact": "Fakta menarik! Tiga pilar utama yang menyokong seluruh keputusan keuangan global berakar pada Corporate Finance Theory yang diadopsi ke dalam keuangan personal. Tiga pilar mendasar tersebut adalah: Investment Decision (bagaimana mengalokasikan dana ke aset), Financing Decision (dari mana sumber dana diperoleh, apakah dari pendapatan atau utang), dan Asset Management (bagaimana mengelola aset yang ada agar produktif)."
    },
    {
        "level": "MEDIUM",
        "subBab": 0,
        "questionText": "Apa manfaat utama dari keberadaan Fintech Peer-to-Peer Lending yang legal dan terdaftar di OJK bagi pelaku UMKM di Indonesia?",
        "options": [
            "A. Memberikan dana hibah gratis yang tidak perlu dikembalikan sama sekali",
            "B. Membuka akses pembiayaan modal usaha bagi pelaku usaha yang belum memenuhi syarat pinjaman bank konvensional (unbankable)",
            "C. Membantu pelaku UMKM menghindar dari kewajiban pembuatan laporan keuangan bulanan"
        ],
        "correctIndex": 1,
        "educationalFact": "Fun fact! Struktur laporan keuangan pribadi yang sehat selalu mengacu pada format Personal Balance Sheet (Laporan Posisi Keuangan). Pengetahuan teknis ini membagi keuanganmu menjadi tiga akun besar: Aset (apa yang kamu miliki, baik likuid maupun investasi), Liabilitas (apa yang kamu utangkan kepada pihak lain), dan Kekayaan Bersih (Net Worth)."
    },
    {
        "level": "MEDIUM",
        "subBab": 0,
        "questionText": "Bagaimana konsep dasar dari diversifikasi portofolio investasi yang sering digambarkan dengan kalimat Don’t put all your eggs in one basket?",
        "options": [
            "A. Larangan membeli produk investasi dari luar negeri demi mendukung produk dalam negeri",
            "B. Strategi menyebarkan modal ke berbagai jenis instrumen investasi agar jika satu aset rugi, masih ada aset lain yang menopang",
            "C. Saran untuk membeli wadah penyimpanan telur yang terbuat dari bahan besi kuat"
        ],
        "correctIndex": 1,
        "educationalFact": "Money Fact! Dalam mengukur kesehatan aset, para ahli keuangan menggunakan rasio teknis yang disebut Solvency Ratio (Rasio Solvabilitas) dan batas aman kesehatan keuangan personal menurut standar perencana keuangan adalah minimal 50%. Jika rasiomu di bawah 50%, artinya mayoritas aset yang kamu miliki saat ini sebenarnya dibiayai oleh utang."
    },
    {
        "level": "MEDIUM",
        "subBab": 0,
        "questionText": "Mengapa penipuan berkedok judi online atau slot sangat cepat menguras keuangan masyarakat kelas menengah ke bawah di Indonesia?",
        "options": [
            "A. Memanfaatkan kelemahan literasi dan psikologi keserakahan (greed) untuk menang cepat, padahal sistem sudah diatur pasti rugi",
            "B. Judi online mengenakan biaya administrasi bulanan yang memotong saldo rekening otomatis tanpa izin",
            "C. Judi online diwajibkan oleh regulator jasa keuangan internasional"
        ],
        "correctIndex": 0,
        "educationalFact": "Tahukah kamu? Otak kita sering kali tertipu oleh pecahan uang yang kita pegang karena adanya fenomena psikologis bernama Denomination Effect (Efek Denominasi). Penelitian dalam Journal of Consumer Research membuktikan bahwa masyarakat cenderung lebih impulsif membelanjakan uang kertas pecahan kecil (misal lima lembar Rp20.000) dibandingkan menghabiskan satu lembar uang pecahan besar (misal satu lembar Rp100.000), meskipun nilai nominal totalnya sama persis."
    },
    {
        "level": "MEDIUM",
        "subBab": 0,
        "questionText": "Apa perbedaan fungsi yang mendasar antara Bank Indonesia (BI) dengan Otoritas Jasa Keuangan (OJK)?",
        "options": [
            "A. BI mengawasi jalannya perusahaan asuransi; OJK mengawasi jalannya pegadaian swasta di daerah",
            "B. BI fokus pada kebijakan moneter dan stabilitas nilai rupiah; OJK fokus pada pengaturan dan pengawasan industri jasa keuangan mikro",
            "C. BI melayani peminjaman uang untuk masyarakat umum; OJK melayani peminjaman uang untuk korporasi besar saja"
        ],
        "correctIndex": 1,
        "educationalFact": "Fakta menarik! Tiga pilar utama yang menyokong seluruh keputusan keuangan global berakar pada Corporate Finance Theory yang diadopsi ke dalam keuangan personal. Tiga pilar mendasar tersebut adalah: Investment Decision (bagaimana mengalokasikan dana ke aset), Financing Decision (dari mana sumber dana diperoleh, apakah dari pendapatan atau utang), dan Asset Management (bagaimana mengelola aset yang ada agar produktif)."
    },
    {
        "level": "MEDIUM",
        "subBab": 1,
        "questionText": "Budi adalah kepala keluarga dengan seorang istri dan dua anak yang masih kecil. Berapakah jumlah dana darurat ideal yang harus dipersiapkan Budi jika pengeluaran bulanannya Rp5.000.000?",
        "options": [
            "A. Rp15.000.000 (3 kali pengeluaran bulanan)",
            "B. Rp30.000.000 (6 kali pengeluaran bulanan)",
            "C. Rp"
        ],
        "correctIndex": 1,
        "educationalFact": "Tahukah kalian? Kita bisa menghitung tingkat kesehatan kesiapan dana darurat kita secara presisi menggunakan rumus Basic Liquidity Ratio (Rasio Likuiditas Dasar). Rumus teknisnya adalah sebagai berikut: Basic Liquidity Ratio = Aset Likuid / Pengeluaran Bulanan Contoh Sederhana: Jika kamu memiliki total aset likuid (seperti uang tunai di dompet, saldo rekening bank, dan reksa dana pasar uang) sebesar Rp1"
    },
    {
        "level": "MEDIUM",
        "subBab": 1,
        "questionText": "Mengapa investasi properti seperti tanah atau rumah tidak cocok digunakan sebagai instrumen penyimpanan dana darurat?",
        "options": [
            "A. Properti membutuhkan waktu berbulan-bulan bahkan bertahun-tahun untuk dijual (tidak likuid)",
            "B. Nilai tanah selalu turun drastis setiap tahun akibat inflasi fisik",
            "C. Properti tidak sah menjadi jaminan keuangan menurut OJK"
        ],
        "correctIndex": 0,
        "educationalFact": "Tahukah kamu? Dalam menyusun penempatan dana darurat, perencana keuangan profesional menerapkan prinsip teknis 3L: Liquid (mudah dicairkan dalam hitungan menit), Legal (berada di bawah pengawasan regulasi resmi seperti OJK dan dijamin Lembaga Penjamin Simpanan / LPS), serta Low Risk (nilainya stabil dan tidak berkurang akibat fluktuasi pasar)."
    },
    {
        "level": "MEDIUM",
        "subBab": 1,
        "questionText": "Rina baru saja kehilangan pekerjaan utamanya akibat efisiensi perusahaan. Tindakan keuangan manakah yang paling tepat dilakukan Rina terkait dana daruratnya?",
        "options": [
            "A. Menginvestasikan seluruh dana darurat ke saham gorengan agar cepat berlipat ganda",
            "B. Menggunakan dana darurat hanya untuk kebutuhan pokok hidup sembari mencari pekerjaan baru",
            "C. Membeli barang mewah sebagai kompensasi stres akibat kehilangan pekerjaan"
        ],
        "correctIndex": 1,
        "educationalFact": "Fakta menarik! Keberadaan dana darurat memengaruhi ketenangan pikiran seseorang saat bekerj"
    },
    {
        "level": "MEDIUM",
        "subBab": 1,
        "questionText": "Manakah strategi terbaik untuk mengumpulkan dana darurat bagi seseorang yang memiliki pendapatan tidak tetap setiap bulannya (seperti freelancer)?",
        "options": [
            "A. Menunggu hingga akhir tahun untuk menyisihkan sisa uang yang ada",
            "B. Menyisihkan persentase yang lebih besar (misal 20–30%) saat pendapatan sedang tinggi",
            "C. Meminjam uang dari teman sebagai modal awal pembentukan dana darurat"
        ],
        "correctIndex": 1,
        "educationalFact": "Fun fact! Kebutuhan jumlah dana darurat akan berubah secara proporsional mengikuti status siklus hidup dan tanggunganmu. Skala baku perencana keuangan menetapkan: individu lajang membutuhkan 3–6 kali pengeluaran bulanan, pasangan menikah tanpa anak membutuhkan 6 kali pengeluaran bulanan, sedangkan keluarga dengan anak atau pekerja lepas (freelancer) membutuhkan 9–12 kali pengeluaran bulanan karena variabilitas risiko yang lebih tinggi."
    },
    {
        "level": "MEDIUM",
        "subBab": 1,
        "questionText": "Di bawah ini, manakah kombinasi tempat penyimpanan dana darurat yang paling seimbang antara keamanan dan aksesibilitas?",
        "options": [
            "A. 50% di celengan rumah dan 50% di emas perhiasan",
            "B. 50% di rekening tabungan bank digital likuid dan 50% di Reksa Dana Pasar Uang (RDPU)",
            "C. 100% di akun crypto wallet mata uang asing"
        ],
        "correctIndex": 1,
        "educationalFact": "Money Fact! Salah satu kesalahan teknis terbesar di masyarakat dalam mengelola dana darurat adalah membiarkan seluruh dana tersebut mengendap di dalam rekening tabungan utama yang terhubung dengan kartu debit harian. Hal ini melanggar prinsip pengendalian diri karena memicu bias optimisme berlebih, di mana otak mengira saldo tersebut adalah uang bebas yang bisa dibelanjakan kapan saj"
    },
    {
        "level": "MEDIUM",
        "subBab": 1,
        "questionText": "Apa indikator utama yang menunjukkan bahwa target dana darurat seseorang telah tercapai dan aman?",
        "options": [
            "A. Jumlah saldo di pos darurat telah memenuhi kelipatan pengeluaran bulanan sesuai profil risiko",
            "B. Orang tersebut sudah tidak memiliki utang kartu kredit sama sekali",
            "C. Saldo rekening utama terisi penuh tanpa pernah terpakai belanja baju"
        ],
        "correctIndex": 0,
        "educationalFact": "Tahukah kalian? Kita bisa menghitung tingkat kesehatan kesiapan dana darurat kita secara presisi menggunakan rumus Basic Liquidity Ratio (Rasio Likuiditas Dasar). Rumus teknisnya adalah sebagai berikut: Basic Liquidity Ratio = Aset Likuid / Pengeluaran Bulanan Contoh Sederhana: Jika kamu memiliki total aset likuid (seperti uang tunai di dompet, saldo rekening bank, dan reksa dana pasar uang) sebesar Rp1"
    },
    {
        "level": "MEDIUM",
        "subBab": 1,
        "questionText": "Jika inflasi merangkak naik, apa penyesuaian yang harus dilakukan pada dana darurat kita?",
        "options": [
            "A. Mengurangi jumlah nominalnya karena harga barang semakin mahal",
            "B. Menghitung ulang rata-rata pengeluaran bulanan baru dan menambah selisih nominalnya",
            "C. Memindahkan seluruh dana darurat ke instrumen reksa dana saham berisiko tinggi"
        ],
        "correctIndex": 1,
        "educationalFact": "Tahukah kamu? Dalam menyusun penempatan dana darurat, perencana keuangan profesional menerapkan prinsip teknis 3L: Liquid (mudah dicairkan dalam hitungan menit), Legal (berada di bawah pengawasan regulasi resmi seperti OJK dan dijamin Lembaga Penjamin Simpanan / LPS), serta Low Risk (nilainya stabil dan tidak berkurang akibat fluktuasi pasar)."
    },
    {
        "level": "MEDIUM",
        "subBab": 1,
        "questionText": "Seseorang memiliki utang kartu kredit berbunga tinggi sekaligus belum memiliki dana darurat. Strategi mana yang paling rasional menurut perencanaan keuangan?",
        "options": [
            "A. Fokus 100% mengumpulkan dana darurat baru membayar utang kartu kredit",
            "B. Membayar utang kartu kredit secara agresif sembari menyisihkan porsi kecil untuk dana darurat minimum",
            "C. Melakukan gali lubang tutup lubang dengan pinjaman online lainnya"
        ],
        "correctIndex": 1,
        "educationalFact": "Fakta menarik! Keberadaan dana darurat memengaruhi ketenangan pikiran seseorang saat bekerj"
    },
    {
        "level": "MEDIUM",
        "subBab": 1,
        "questionText": "Mengapa asuransi kesehatan tidak bisa sepenuhnya menggantikan peran dana darurat?",
        "options": [
            "A. Asuransi kesehatan tidak diawasi oleh OJK di Indonesia",
            "B. Ada biaya darurat non-medis (seperti transportasi, biaya hidup keluarga yang menemani) yang tidak ditanggung asuransi",
            "C. Asuransi kesehatan hanya berlaku jika nasabah meninggal dunia saja"
        ],
        "correctIndex": 1,
        "educationalFact": "Fun fact! Kebutuhan jumlah dana darurat akan berubah secara proporsional mengikuti status siklus hidup dan tanggunganmu. Skala baku perencana keuangan menetapkan: individu lajang membutuhkan 3–6 kali pengeluaran bulanan, pasangan menikah tanpa anak membutuhkan 6 kali pengeluaran bulanan, sedangkan keluarga dengan anak atau pekerja lepas (freelancer) membutuhkan 9–12 kali pengeluaran bulanan karena variabilitas risiko yang lebih tinggi."
    },
    {
        "level": "MEDIUM",
        "subBab": 1,
        "questionText": "Apa yang dimaksud dengan alokasi otomatis (auto-debit) dalam strategi pengumpulan dana darurat?",
        "options": [
            "A. Sistem perbankan yang otomatis memotong gaji di awal bulan ke rekening khusus dana darurat",
            "B. Sistem penarikan dana otomatis dari investasi saat terjadi musibah",
            "C. Pemotongan saldo e-wallet secara acak untuk keperluan belanja bulanan"
        ],
        "correctIndex": 0,
        "educationalFact": "Money Fact! Salah satu kesalahan teknis terbesar di masyarakat dalam mengelola dana darurat adalah membiarkan seluruh dana tersebut mengendap di dalam rekening tabungan utama yang terhubung dengan kartu debit harian. Hal ini melanggar prinsip pengendalian diri karena memicu bias optimisme berlebih, di mana otak mengira saldo tersebut adalah uang bebas yang bisa dibelanjakan kapan saj"
    },
    {
        "level": "MEDIUM",
        "subBab": 2,
        "questionText": "Citra melihat sepatu idamannya sedang diskon 50% di mall, namun jika dia membelinya, uang untuk membayar kos akhir bulan akan terpakai. Bagaimana Citra harus mengambil keputusan?",
        "options": [
            "A. Membeli sepatu tersebut dengan prinsip bahwa diskon tidak datang dua kali",
            "B. Menolak membeli sepatu karena kos merupakan kebutuhan primer sedangkan sepatu adalah keinginan",
            "C. Membeli sepatu menggunakan fitur PayLater agar kos tetap terbayar bulan ini"
        ],
        "correctIndex": 1,
        "educationalFact": "Tahukah kalian? Sebelum kamu memutuskan membeli suatu barang konsumtif yang cukup mahal, kamu bisa mengukur kelayakan nilai ekonomisnya secara personal dengan menghitung rumus Cost Per Use (Biaya per Pemakaian). Rumus sederhananya adalah: Cost Per Use = Harga Barang / Perkiraan Jumlah Pemakaian"
    },
    {
        "level": "MEDIUM",
        "subBab": 2,
        "questionText": "Apa dampak psikologis dari penggunaan kartu kredit atau e-wallet jika dibandingkan dengan uang tunai saat berbelanja?",
        "options": [
            "A. Membuat kita merasa lebih bersalah saat mengeluarkan uang dalam jumlah besar",
            "B. Mengurangi efek psikologis “rasa sakit membayar” (pain of paying), sehingga memicu belanja berlebih",
            "C. Membantu ingatan kita secara otomatis tanpa perlu mencatat pengeluaran lagi"
        ],
        "correctIndex": 1,
        "educationalFact": "Tahukah kamu? Pola konsumsi manusia sering kali terjebak dalam lingkaran setan yang disebut Diderot Effect (Efek Diderot). Teori sosial-ekonomi ini menyatakan bahwa perolehan suatu barang baru yang dianggap mewah atau berbeda dari biasanya akan menciptakan spiral konsumsi berantai, di mana kamu merasa terdorong untuk terus membeli barang-barang baru lainnya demi mencocokkan atau menyetarakan lingkungan sekitar dengan barang pertama tersebut."
    },
    {
        "level": "MEDIUM",
        "subBab": 2,
        "questionText": "Mengapa produk tiruan bermerek (barang KW) sebenarnya merugikan keuangan jangka panjang pembelinya?",
        "options": [
            "A. Barang KW memiliki nilai investasi yang setara dengan barang asli di pegadaian",
            "B. Kualitasnya rendah sehingga cepat rusak dan memaksa pembeli mengeluarkan uang berulang kali untuk menggantinya",
            "C. Barang KW dilarang digunakan di tempat umum oleh undang-undang nasional"
        ],
        "correctIndex": 1,
        "educationalFact": "Fakta menarik! Dalam ilmu ekonomi mikro, terdapat konsep mendasar yang disebut Law of Diminishing Marginal Utility (Hukum Penurunan Nilai Guna Marjinal) yang dicetuskan oleh Hermann Heinrich Gossen. Teori ini menjelaskan bahwa tambahan kepuasan yang kamu dapatkan dari mengonsumsi suatu barang akan terus menurun seiring dengan bertambahnya jumlah barang yang dikonsumsi. Makan satu porsi es krim terasa sangat nikmat, namun pada porsi kelima, kenikmatannya berubah menjadi rasa mual dan pemborosan uang."
    },
    {
        "level": "MEDIUM",
        "subBab": 2,
        "questionText": "Andi ingin membeli laptop baru seharga Rp8.000.000 untuk menunjang kerja sampingannya sebagai desainer grafis. Tindakan manakah yang termasuk manajemen konsumsi bijak?",
        "options": [
            "A. Meminjam uang dari pinjol ilegal demi langsung mendapatkan laptop hari itu juga",
            "B. Menabung secara konsisten dari pendapatan sampingan selama beberapa bulan hingga dana mencukupi",
            "C. Menggunakan dana darurat keluarga karena menganggap laptop adalah investasi mendesak"
        ],
        "correctIndex": 1,
        "educationalFact": "Fun fact! Struktur prioritas belanja yang matang secara akademik mengadopsi konsep Teori Hierarki Kebutuhan Abraham Maslow. Sebelum mengalokasikan uang untuk kebutuhan penghargaan diri (esteem needs) seperti membeli pakaian bermerek atau gawai terbaru, pastikan kebutuhan fisiologis (physiological needs) dan kebutuhan keamanan finansial (safety needs) seperti asuransi dan dana darurat sudah terpenuhi seutuhny"
    },
    {
        "level": "MEDIUM",
        "subBab": 2,
        "questionText": "Bagaimana cara membedakan antara “kebutuhan yang mendesak” dengan “keinginan yang terasa mendesak” akibat pengaruh iklan?",
        "options": [
            "A. Kebutuhan mendesak berdampak langsung pada kelangsungan hidup/pekerjaan; keinginan hanya berdampak pada kepuasan emosi sesaat",
            "B. Keinginan yang mendesak biasanya memiliki harga yang jauh lebih mahal di pasaran",
            "C. Kebutuhan mendesak selalu muncul di awal tahun, sedangkan keinginan muncul di akhir tahun"
        ],
        "correctIndex": 0,
        "educationalFact": "Money Fact! Pengetahuan teknis untuk melacak kebocoran arus kas akibat konsumsi yang tidak terkendali adalah dengan menghitung Propensity to Consume (Kecenderungan Mengonsumsi). Jika persentase kenaikan pengeluaran belanjamu jauh lebih tinggi daripada persentase kenaikan pendapatan bulananmu, itu adalah tanda bahaya bahwa kamu sedang mengalami gejala inflasi gaya hidup (lifestyle inflation)."
    },
    {
        "level": "MEDIUM",
        "subBab": 2,
        "questionText": "Saat mengaudit pengeluaran bulanan, Tono menyadari dia menghabiskan Rp600.000 per bulan hanya untuk langganan 4 aplikasi streaming video yang jarang ditonton. Tindakan bijak apa yang harus diambil Tono?",
        "options": [
            "A. Tetap berlangganan karena biaya tersebut sudah murah bagi seorang karyawan",
            "B. Membatalkan 3 langganan aplikasi dan hanya menyisakan 1 yang paling sering ditonton",
            "C. Mencari pekerjaan tambahan hanya untuk menutupi biaya langganan tersebut"
        ],
        "correctIndex": 1,
        "educationalFact": "Tahukah kalian? Sebelum kamu memutuskan membeli suatu barang konsumtif yang cukup mahal, kamu bisa mengukur kelayakan nilai ekonomisnya secara personal dengan menghitung rumus Cost Per Use (Biaya per Pemakaian). Rumus sederhananya adalah: Cost Per Use = Harga Barang / Perkiraan Jumlah Pemakaian"
    },
    {
        "level": "MEDIUM",
        "subBab": 2,
        "questionText": "Apa yang dimaksud dengan istilah Opportunity Cost (Biaya Peluang) dalam konsumsi harian?",
        "options": [
            "A. Nilai atau manfaat yang dikorbankan dari satu pilihan alternatif karena memilih pilihan yang lain",
            "B. Total biaya administrasi yang muncul saat bertransaksi di e-commerce",
            "C. Keuntungan ekstra yang didapat konsumen saat membeli barang grosir"
        ],
        "correctIndex": 0,
        "educationalFact": "Tahukah kamu? Pola konsumsi manusia sering kali terjebak dalam lingkaran setan yang disebut Diderot Effect (Efek Diderot). Teori sosial-ekonomi ini menyatakan bahwa perolehan suatu barang baru yang dianggap mewah atau berbeda dari biasanya akan menciptakan spiral konsumsi berantai, di mana kamu merasa terdorong untuk terus membeli barang-barang baru lainnya demi mencocokkan atau menyetarakan lingkungan sekitar dengan barang pertama tersebut."
    },
    {
        "level": "MEDIUM",
        "subBab": 2,
        "questionText": "Mengapa fenomena “makan mewah di tanggal muda” sering kali membuat keuangan mahasiswa hancur di akhir bulan?",
        "options": [
            "A. Karena restoran menaikkan harga makanan secara khusus di awal bulan",
            "B. Karena mahasiswa lupa meminta uang saku tambahan kepada orang tua mereka",
            "C. Karena kegagalan mengontrol kepuasan jangka pendek (delayed gratification) setelah menerima kiriman uang"
        ],
        "correctIndex": 2,
        "educationalFact": "Fakta menarik! Dalam ilmu ekonomi mikro, terdapat konsep mendasar yang disebut Law of Diminishing Marginal Utility (Hukum Penurunan Nilai Guna Marjinal) yang dicetuskan oleh Hermann Heinrich Gossen. Teori ini menjelaskan bahwa tambahan kepuasan yang kamu dapatkan dari mengonsumsi suatu barang akan terus menurun seiring dengan bertambahnya jumlah barang yang dikonsumsi. Makan satu porsi es krim terasa sangat nikmat, namun pada porsi kelima, kenikmatannya berubah menjadi rasa mual dan pemborosan uang."
    },
    {
        "level": "MEDIUM",
        "subBab": 2,
        "questionText": "Manakah indikator yang menunjukkan seseorang telah berbelanja melampaui batas kemampuan ekonominya?",
        "options": [
            "A. Dia mampu membayar seluruh tagihan kebutuhan pokok tepat waktu tanpa menunda",
            "B. Rasio cicilan utang konsumtifnya telah melebihi 30% dari total pendapatan bulanan",
            "C. Dia memilih membeli produk lokal daripada produk impor yang mahal"
        ],
        "correctIndex": 1,
        "educationalFact": "Fun fact! Struktur prioritas belanja yang matang secara akademik mengadopsi konsep Teori Hierarki Kebutuhan Abraham Maslow. Sebelum mengalokasikan uang untuk kebutuhan penghargaan diri (esteem needs) seperti membeli pakaian bermerek atau gawai terbaru, pastikan kebutuhan fisiologis (physiological needs) dan kebutuhan keamanan finansial (safety needs) seperti asuransi dan dana darurat sudah terpenuhi seutuhny"
    },
    {
        "level": "MEDIUM",
        "subBab": 2,
        "questionText": "Bagaimana strategi terbaik mengendalikan diri saat terpapar promo Live Shopping di media sosial?",
        "options": [
            "A. Mematikan notifikasi perbankan agar tidak melihat saldo berkurang",
            "B. Keluar dari sesi live tersebut dan fokus melakukan aktivitas produktif lain yang tidak konsumtif",
            "C. Membeli produk terlebih dahulu, lalu menjualnya kembali ke teman dekat jika menyesal"
        ],
        "correctIndex": 1,
        "educationalFact": "Money Fact! Pengetahuan teknis untuk melacak kebocoran arus kas akibat konsumsi yang tidak terkendali adalah dengan menghitung Propensity to Consume (Kecenderungan Mengonsumsi). Jika persentase kenaikan pengeluaran belanjamu jauh lebih tinggi daripada persentase kenaikan pendapatan bulananmu, itu adalah tanda bahaya bahwa kamu sedang mengalami gejala inflasi gaya hidup (lifestyle inflation)."
    },
    {
        "level": "MEDIUM",
        "subBab": 3,
        "questionText": "Setiap akhir bulan, sisa uang di rekening tabungan Hendra selalu habis tanpa kejelasan. Apa evaluasi utama yang perlu diperbaiki dari manajemen keuangan Hendra?",
        "options": [
            "A. Hendra harus mencari bank yang memberikan bunga tabungan paling tinggi",
            "B. Hendra belum disiplin menerapkan metode penganggaran di awal bulan dan pelacakan pengeluaran harian",
            "C. Hendra harus segera mengajukan kartu kredit baru untuk cadangan akhir bulan"
        ],
        "correctIndex": 1,
        "educationalFact": "Tahukah kamu? Di dalam penyusunan anggaran harian, perencana keuangan memisahkan pengeluaran menjadi dua kategori teknis: Fixed Expenses (Pengeluaran Tetap yang jumlahnya konstan dan wajib dibayarkan, contohnya uang sewa kos atau cicilan resmi) dan Variable Expenses (Pengeluaran Variabel yang jumlahnya berubah-ubah tergantung perilaku konsumsimu, seperti biaya makan, hiburan, dan kuota internet)."
    },
    {
        "level": "MEDIUM",
        "subBab": 3,
        "questionText": "Seseorang memiliki pendapatan tetap Rp6.000.000. Biaya makan, kos, dan tagihan wajib adalah Rp3.500.000. Cicilan utang motor Rp1.500.000. Berapa sisa dana maksimal yang bisa dialokasikan untuk tabungan dan hiburan?",
        "options": [
            "A. Rp2.000.000",
            "B. Rp1.000.000",
            "C. Rp500.000"
        ],
        "correctIndex": 1,
        "educationalFact": "Fakta menarik! Metode pencatatan arus kas tertua dan paling efektif di dunia untuk rumah tangga berasal dari Jepang, bernama Kakeibo (diciptakan oleh Hani Motoko pada tahun 1904). Filosofi dasar Kakeibo bukan sekadar mencatat angka secara mekanis, melainkan mewajibkan pelaku keuangan menjawab empat pertanyaan reflektif setiap akhir bulan mengenai pencapaian target, realisasi pengeluaran, serta cara memperbaikinya di bulan depan."
    },
    {
        "level": "MEDIUM",
        "subBab": 3,
        "questionText": "Apa yang membedakan antara pencatatan keuangan metode Single Entry dengan Double Entry dalam konteks praktis personal?",
        "options": [
            "A. Single entry hanya mencatat alur masuk-keluar uang secara linear sederhana; double entry mencatat dampak transaksi terhadap aset dan kewajiban",
            "B. Single entry digunakan khusus untuk transaksi tunai; double entry khusus untuk transaksi kartu kredit saja",
            "C. Single entry dilakukan setahun sekali; double entry dilakukan dua kali sehari"
        ],
        "correctIndex": 0,
        "educationalFact": "Fun fact! Dalam dunia manajemen keuangan personal, pencatatan arus kas harus dilakukan dengan basis waktu yang konsisten. Pendekatan akuntansi kas (cash basis accounting) adalah yang paling direkomendasikan untuk individu, di mana setiap transaksi dicatat secara real-time tepat pada detik uang tunai atau saldo digital tersebut secara aktual berpindah tangan, bukan saat rencana transaksi itu dibuat."
    },
    {
        "level": "MEDIUM",
        "subBab": 3,
        "questionText": "Mengapa penting memisahkan rekening operasional harian dengan rekening tabungan/investasi?",
        "options": [
            "A. Agar tidak dikenakan pajak ganda oleh lembaga keuangan pemerintah",
            "B. Menghindari pemakaian dana masa depan secara tidak sengaja untuk keperluan konsumsi harian",
            "C. Bank tidak mengizinkan satu nasabah menggabungkan tabungan dengan investasi"
        ],
        "correctIndex": 1,
        "educationalFact": "Money Fact! Salah satu rasio teknis penting untuk memantau kesehatan utang dalam arus kas harian adalah Debt Service Ratio (DSR). Rumus perhitungannya adalah membagi total cicilan utang bulanan dengan total pendapatan bersih bulanan. Standar baku industri keuangan menetapkan batas DSR maksimal adalah 30% s.d. 35% agar arus kas harianmu tidak mengalami sesak likuiditas yang kronis."
    },
    {
        "level": "MEDIUM",
        "subBab": 3,
        "questionText": "Manakah contoh pengeluaran variabel (Variable Expenses) yang pengontrolannya membutuhkan kedisiplinan tinggi?",
        "options": [
            "A. Biaya premi asuransi jiwa berjangka tahunan",
            "B. Tagihan cicilan tetap KPR rumah tinggal",
            "C. Biaya transportasi online dan nongkrong bersama teman di kafe"
        ],
        "correctIndex": 2,
        "educationalFact": "Tahukah kamu? Di dalam penyusunan anggaran harian, perencana keuangan memisahkan pengeluaran menjadi dua kategori teknis: Fixed Expenses (Pengeluaran Tetap yang jumlahnya konstan dan wajib dibayarkan, contohnya uang sewa kos atau cicilan resmi) dan Variable Expenses (Pengeluaran Variabel yang jumlahnya berubah-ubah tergantung perilaku konsumsimu, seperti biaya makan, hiburan, dan kuota internet)."
    },
    {
        "level": "MEDIUM",
        "subBab": 3,
        "questionText": "Bagaimana cara menghitung Net Worth (Kekayaan Bersih) seseorang secara berkala?",
        "options": [
            "A. Total nilai aset yang dimiliki (tunai, investasi, barang) dikurangi total utang/kewajiban",
            "B. Total pemasukan bulanan ditambah dengan limit sisa kartu kredit",
            "C. Jumlah uang tunai yang tersimpan di dalam dompet dan rekening utama bank"
        ],
        "correctIndex": 0,
        "educationalFact": "Fakta menarik! Metode pencatatan arus kas tertua dan paling efektif di dunia untuk rumah tangga berasal dari Jepang, bernama Kakeibo (diciptakan oleh Hani Motoko pada tahun 1904). Filosofi dasar Kakeibo bukan sekadar mencatat angka secara mekanis, melainkan mewajibkan pelaku keuangan menjawab empat pertanyaan reflektif setiap akhir bulan mengenai pencapaian target, realisasi pengeluaran, serta cara memperbaikinya di bulan depan."
    },
    {
        "level": "MEDIUM",
        "subBab": 3,
        "questionText": "Arus kas bulanan Roni menunjukkan angka negatif Rp500.000 selama tiga bulan berturut-turut. Langkah taktis apa yang harus segera diambil Roni?",
        "options": [
            "A. Mengambil pinjaman online tenor panjang untuk menutupi minus arus kas tersebut",
            "B. Mengaudit pengeluaran variabel dan memotong pos hiburan secara drastis  segera",
            "C. Mengurangi porsi makan pokok menjadi satu kali sehari tanpa memotong pos lainnya"
        ],
        "correctIndex": 1,
        "educationalFact": "Fun fact! Dalam dunia manajemen keuangan personal, pencatatan arus kas harus dilakukan dengan basis waktu yang konsisten. Pendekatan akuntansi kas (cash basis accounting) adalah yang paling direkomendasikan untuk individu, di mana setiap transaksi dicatat secara real-time tepat pada detik uang tunai atau saldo digital tersebut secara aktual berpindah tangan, bukan saat rencana transaksi itu dibuat."
    },
    {
        "level": "MEDIUM",
        "subBab": 3,
        "questionText": "Apa kelemahan utama jika seseorang mengelola keuangan hanya dengan mengandalkan sistem “perkiraan di dalam kepala”?",
        "options": [
            "A. Membuat memori otak menjadi terlalu penuh dengan rumus matematika",
            "B. Bias kognitif membuat seseorang merasa pengeluarannya masih sedikit padahal riilnya sudah over-budget",
            "C. Rekening bank otomatis mendeteksi aktivitas mencurigakan karena tidak ada input data"
        ],
        "correctIndex": 1,
        "educationalFact": "Money Fact! Salah satu rasio teknis penting untuk memantau kesehatan utang dalam arus kas harian adalah Debt Service Ratio (DSR). Rumus perhitungannya adalah membagi total cicilan utang bulanan dengan total pendapatan bersih bulanan. Standar baku industri keuangan menetapkan batas DSR maksimal adalah 30% s.d. 35% agar arus kas harianmu tidak mengalami sesak likuiditas yang kronis."
    },
    {
        "level": "MEDIUM",
        "subBab": 3,
        "questionText": "Manakah pengalokasian dana yang paling tepat ketika seseorang menerima bonus tahunan dari tempat kerjanya?",
        "options": [
            "A. Menghabiskannya langsung untuk liburan ke luar negeri sebagai bentuk self-reward total",
            "B. Mengalokasikannya terlebih dahulu untuk melunasi utang berjalan atau memenuhi pos dana darurat yang kurang",
            "C. Menyimpan seluruhnya di rekening operasional harian agar terlihat memiliki saldo besar"
        ],
        "correctIndex": 1,
        "educationalFact": "Tahukah kamu? Di dalam penyusunan anggaran harian, perencana keuangan memisahkan pengeluaran menjadi dua kategori teknis: Fixed Expenses (Pengeluaran Tetap yang jumlahnya konstan dan wajib dibayarkan, contohnya uang sewa kos atau cicilan resmi) dan Variable Expenses (Pengeluaran Variabel yang jumlahnya berubah-ubah tergantung perilaku konsumsimu, seperti biaya makan, hiburan, dan kuota internet)."
    },
    {
        "level": "MEDIUM",
        "subBab": 3,
        "questionText": "Bagaimana konsep dasar dari penganggaran metode Zero-Based Budgeting?",
        "options": [
            "A. Menyisakan saldo tabungan sebesar nol rupiah di akhir tahun tanpa berinvestasi",
            "B. Menugaskan setiap rupiah dari pendapatan ke pos pengeluaran, tabungan, atau investasi tertentu hingga tidak ada uang yang tersisa tanpa tujuan",
            "C. Mengajarkan kita untuk tidak mengeluarkan uang sama sekali alias pelit ekstrem"
        ],
        "correctIndex": 1,
        "educationalFact": "Fakta menarik! Metode pencatatan arus kas tertua dan paling efektif di dunia untuk rumah tangga berasal dari Jepang, bernama Kakeibo (diciptakan oleh Hani Motoko pada tahun 1904). Filosofi dasar Kakeibo bukan sekadar mencatat angka secara mekanis, melainkan mewajibkan pelaku keuangan menjawab empat pertanyaan reflektif setiap akhir bulan mengenai pencapaian target, realisasi pengeluaran, serta cara memperbaikinya di bulan depan."
    },
    {
        "level": "MEDIUM",
        "subBab": 4,
        "questionText": "Mengapa Reksa Dana Pendapatan Tetap (RDPT) umumnya memiliki potensi imbal hasil yang lebih baik melawan inflasi daripada Reksa Dana Pasar Uang (RDPU)?",
        "options": [
            "A. RDPT berinvestasi pada saham-saham perusahaan teknologi dunia yang tumbuh agresif",
            "B. RDPT mengalokasikan dananya pada efek utang/obligasi jangka menengah-panjang yang memberikan kupon rutin",
            "C. RDPT dijamin bebas risiko kerugian oleh Otoritas Jasa Keuangan"
        ],
        "correctIndex": 1,
        "educationalFact": "Tahukah kamu? Dalam dunia investasi teknis, kita wajib membedakan dua istilah penting: Nominal Return (Tingkat Pengembalian Nominal, yaitu angka persentase keuntungan investasi yang tertulis di atas kertas) dan Real Return (Tingkat Pengembalian Riil, yaitu keuntungan bersih yang sebenarnya kamu dapatkan setelah dikurangi dengan laju inflasi aktual)."
    },
    {
        "level": "MEDIUM",
        "subBab": 4,
        "questionText": "Pak Joko ingin menyiapkan dana pendidikan kuliah anaknya yang saat ini masih berusia 2 tahun. Instrumen keuangan mana yang paling rasional untuk melawan inflasi pendidikan jangka panjang?",
        "options": [
            "A. Tabungan berencana di bank konvensional dengan bunga 1% per tahun",
            "B. Menyimpan uang tunai rupiah di dalam brankas besi rumah",
            "C. Investasi berkala pada reksa dana saham atau emas batangan secara disiplin"
        ],
        "correctIndex": 2,
        "educationalFact": "Fakta menarik! Emas sering kali dianggap oleh masyarakat umum sebagai instrumen Safe Haven atau lindung nilai (hedging) terbaik melawan inflasi. Secara empiris, nilai emas tidak bertambah secara agresif, melainkan memiliki fungsi unik untuk menjaga daya beli antargenerasi; satu koin emas peninggalan berabad-abad lalu secara historis tetap memiliki nilai tukar yang setara untuk membeli jumlah komoditas pangan pokok yang sama di era modern."
    },
    {
        "level": "MEDIUM",
        "subBab": 4,
        "questionText": "Apa dampak negatif yang terjadi jika bank sentral (Bank Indonesia) mencetak uang tunai dalam jumlah berlebihan secara instan untuk dibagikan kepada masyarakat?",
        "options": [
            "A. Seluruh masyarakat otomatis menjadi kaya raya dan daya beli nasional stabil",
            "B. Terjadinya hiperinflasi di mana nilai rupiah merosot tajam dan harga barang  melonjak tak terkendali",
            "C. Suku bunga pinjaman di seluruh bank akan turun menjadi nol persen"
        ],
        "correctIndex": 1,
        "educationalFact": "Fun fact! Laju inflasi resmi dihitung secara berkala oleh Badan Pusat Statistik (BPS) dengan menggunakan indikator teknis yang disebut IHK (Indeks Harga Konsumen). IHK melacak perubahan rata-rata harga dari sekeranjang paket komoditas barang dan jasa yang paling sering dikonsumsi oleh perwakilan rumah tangga di berbagai kota besar di Indonesi"
    },
    {
        "level": "MEDIUM",
        "subBab": 4,
        "questionText": "Manakah karakteristik utama dari instrumen investasi Surat Berharga Negara (SBN) ritel jenis Sukuk Tabungan (ST) atau Savings Bond Ritel (SBR)?",
        "options": [
            "A. Memiliki kupon/bunga mengambang dengan batas minimal (floating with floor) yang menguntungkan saat inflasi naik",
            "B. Nilai pokok investasi bisa hilang total jika pasar saham global mengalami kejatuhan",
            "C. Hanya bisa dibeli oleh kalangan konglomerat dengan modal minimal miliaran rupiah"
        ],
        "correctIndex": 0,
        "educationalFact": "Money Fact! Salah satu strategi teknis bagi investor pemula untuk melawan risiko pasar (market timing risk) saat berinvestasi melawan inflasi adalah menerapkan metode Dollar Cost Averaging (DCA). Teknik ini adalah strategi berinvestasi secara rutin dengan nominal uang yang sama secara konsisten di jadwal yang tetap (misal setiap tanggal 1 blok reksa dana), tanpa peduli apakah harga pasar aset tersebut sedang naik atau turun."
    },
    {
        "level": "MEDIUM",
        "subBab": 4,
        "questionText": "Mengapa investasi saham perusahaan blue chip dianggap efektif melawan inflasi jangka panjang?",
        "options": [
            "A. Perusahaan blue chip diwajibkan pemerintah memberikan keuntungan pasti setiap minggu",
            "B. Perusahaan tersebut memiliki kemampuan menaikkan harga produknya mengikuti inflasi sehingga laba dan nilai sahamnya ikut tumbuh",
            "C. Saham blue chip tidak terpengaruh oleh kondisi krisis ekonomi sama sekali"
        ],
        "correctIndex": 1,
        "educationalFact": "Tahukah kamu? Dalam dunia investasi teknis, kita wajib membedakan dua istilah penting: Nominal Return (Tingkat Pengembalian Nominal, yaitu angka persentase keuntungan investasi yang tertulis di atas kertas) dan Real Return (Tingkat Pengembalian Riil, yaitu keuntungan bersih yang sebenarnya kamu dapatkan setelah dikurangi dengan laju inflasi aktual)."
    },
    {
        "level": "MEDIUM",
        "subBab": 4,
        "questionText": "Seseorang menabung di bank dengan suku bunga 3% per tahun. Pada tahun yang sama, laju inflasi riil nasional mencapai 4,5%. Berapakah keuntungan riil (real return) tabungan orang tersebut?",
        "options": [
            "A. Positif 1,5%",
            "B. Negatif 1,5%",
            "C. Positif 7,5%"
        ],
        "correctIndex": 1,
        "educationalFact": "Fakta menarik! Emas sering kali dianggap oleh masyarakat umum sebagai instrumen Safe Haven atau lindung nilai (hedging) terbaik melawan inflasi. Secara empiris, nilai emas tidak bertambah secara agresif, melainkan memiliki fungsi unik untuk menjaga daya beli antargenerasi; satu koin emas peninggalan berabad-abad lalu secara historis tetap memiliki nilai tukar yang setara untuk membeli jumlah komoditas pangan pokok yang sama di era modern."
    },
    {
        "level": "MEDIUM",
        "subBab": 4,
        "questionText": "Apa yang dimaksud dengan Capital Gain dalam keuntungan berinvestasi melawan inflasi?",
        "options": [
            "A. Keuntungan yang diperoleh dari selisih harga jual aset yang lebih tinggi dibandingkan harga belinya",
            "B. Pembagian keuntungan berkala berupa uang tunai dari operasional perusahaan saham",
            "C. Biaya administrasi tahunan yang wajib dibayarkan nasabah kepada manajer investasi"
        ],
        "correctIndex": 0,
        "educationalFact": "Fun fact! Laju inflasi resmi dihitung secara berkala oleh Badan Pusat Statistik (BPS) dengan menggunakan indikator teknis yang disebut IHK (Indeks Harga Konsumen). IHK melacak perubahan rata-rata harga dari sekeranjang paket komoditas barang dan jasa yang paling sering dikonsumsi oleh perwakilan rumah tangga di berbagai kota besar di Indonesi"
    },
    {
        "level": "MEDIUM",
        "subBab": 4,
        "questionText": "Bagaimana strategi Dollar Cost Averaging (DCA) membantu investor pemula menghadapi fluktuasi pasar akibat dinamika ekonomi?",
        "options": [
            "A. Membeli aset investasi dalam jumlah besar hanya saat harga menyentuh titik tertinggi",
            "B. Berinvestasi secara rutin dengan nominal uang yang sama secara konsisten tanpa memedulikan harga aset naik atau turun",
            "C. Selalu mengubah strategi investasi setiap hari mengikuti arahan influencer media sosial"
        ],
        "correctIndex": 1,
        "educationalFact": "Money Fact! Salah satu strategi teknis bagi investor pemula untuk melawan risiko pasar (market timing risk) saat berinvestasi melawan inflasi adalah menerapkan metode Dollar Cost Averaging (DCA). Teknik ini adalah strategi berinvestasi secara rutin dengan nominal uang yang sama secara konsisten di jadwal yang tetap (misal setiap tanggal 1 blok reksa dana), tanpa peduli apakah harga pasar aset tersebut sedang naik atau turun."
    },
    {
        "level": "MEDIUM",
        "subBab": 4,
        "questionText": "Manakah risiko investasi yang paling berkaitan erat dengan ketidakmampuan mencairkan aset investasi menjadi uang tunai dengan cepat saat dibutuhkan?",
        "options": [
            "A. Risiko Pasar (Market Risk)",
            "B. Risiko Likuiditas (Liquidity Risk)",
            "C. Risiko Gagal Bayar (Default Risk)"
        ],
        "correctIndex": 1,
        "educationalFact": "Tahukah kamu? Dalam dunia investasi teknis, kita wajib membedakan dua istilah penting: Nominal Return (Tingkat Pengembalian Nominal, yaitu angka persentase keuntungan investasi yang tertulis di atas kertas) dan Real Return (Tingkat Pengembalian Riil, yaitu keuntungan bersih yang sebenarnya kamu dapatkan setelah dikurangi dengan laju inflasi aktual)."
    },
    {
        "level": "MEDIUM",
        "subBab": 4,
        "questionText": "Mengapa sektor investasi properti (tanah/bangunan) sering disebut sebagai pelindung inflasi (inflation hedge) yang alami?",
        "options": [
            "A. Properti tidak memerlukan biaya perawatan dan pengelolaan sama sekali",
            "B. Properti dapat dicairkan menjadi uang tunai dalam hitungan menit lewat aplikasi  mobile bank",
            "C. Keterbatasan lahan membuat harga tanah secara alami cenderung naik melebihi laju inflasi seiring pertumbuhan penduduk  Sub Bab"
        ],
        "correctIndex": 2,
        "educationalFact": "Fakta menarik! Emas sering kali dianggap oleh masyarakat umum sebagai instrumen Safe Haven atau lindung nilai (hedging) terbaik melawan inflasi. Secara empiris, nilai emas tidak bertambah secara agresif, melainkan memiliki fungsi unik untuk menjaga daya beli antargenerasi; satu koin emas peninggalan berabad-abad lalu secara historis tetap memiliki nilai tukar yang setara untuk membeli jumlah komoditas pangan pokok yang sama di era modern."
    },
    {
        "level": "MEDIUM",
        "subBab": 5,
        "questionText": "Manakah dari situasi berikut yang paling menggambarkan bias psikologi Keeping Up with the Joneses di era modern Indonesia?",
        "options": [
            "A. Mengikuti program beasiswa ke luar negeri demi membanggakan kedua orang tua",
            "B. Memaksakan diri mencicil mobil mewah agar tidak kalah keren dari tetangga atau rekan kerja di kantor",
            "C. Berinvestasi pada sektor UMKM lokal karena ingin memajukan ekonomi daerah"
        ],
        "correctIndex": 1,
        "educationalFact": "Tahukah kamu? Morgan Housel dalam buku mahakaryanya The Psychology of Money menjelaskan satu tesis fundamental yang sangat mendalam mengenai definisi kekayaan: \"Kekayaan yang sebenarnya (wealth) adalah apa yang tidak kamu lihat, yaitu mobil mewah yang tidak dibeli, perhiasan yang dilewatkan, dan aset investasi yang dibiarkan tumbuh.\" Apa yang dipamerkan orang di luar sana hanyalah pengeluaran (spending), bukan kekayaan."
    },
    {
        "level": "MEDIUM",
        "subBab": 5,
        "questionText": "Mengapa perilaku flexing (pamer kekayaan) di media sosial oleh para pembuat konten berbahaya bagi psikologi keuangan penontonnya?",
        "options": [
            "A. Menciptakan standar semu kemakmuran yang memicu rasa tidak aman (insecure) dan perilaku konsumtif tidak rasional",
            "B. Membuat penonton menjadi malas bekerja karena menganggap mencari uang itu sangat mudah",
            "C. Menurunkan minat masyarakat untuk menggunakan layanan perbankan resmi"
        ],
        "correctIndex": 0,
        "educationalFact": "Fakta menarik! Perilaku konsumsi berlebihan akibat tekanan sosial didasarkan pada sindrom sosiologis abad ke-19 yang sangat terkenal bernama Keeping Up with the Joneses. Istilah ini merujuk pada kondisi psikologis di mana seseorang merasa wajib menyamai atau melampaui kepemilikan materi dari tetangga atau kelompok kelas sosialnya sebagai indikator baku keberhasilan hidup, yang pada akhirnya memicu kebangkrutan massal secara terselubung."
    },
    {
        "level": "MEDIUM",
        "subBab": 5,
        "questionText": "Seseorang mendapatkan kenaikan gaji dari Rp5.000.000 menjadi Rp8.000.000, namun tabungannya tidak bertambah karena dia langsung mengganti motor, sering makan di restoran mahal, dan menaikkan paket keanggotaan gym. Fenomena ini disebut...",
        "options": [
            "A. Defisit Arus Kas Tidak Sengaja",
            "B. Lifestyle Inflation (Inflasi Gaya Hidup)",
            "C. Financial Independence (Kemandirian Finansial)"
        ],
        "correctIndex": 1,
        "educationalFact": "Fun fact! Dalam ekonomi perilaku, ada bias kognitif yang disebut Bandwagon Effect. Pengetahuan mendasar ini menjelaskan fenomena di mana probabilitas seseorang untuk mengadopsi suatu perilaku atau membeli suatu produk akan meningkat secara eksponensial jika melihat banyak orang lain dalam kelompok sosialnya melakukan hal yang sama, terlepas dari apakah tindakan tersebut rasional bagi keuangan pribadi mereka atau tidak."
    },
    {
        "level": "MEDIUM",
        "subBab": 5,
        "questionText": "Bagaimana cara yang paling bijak untuk merespons ajakan nongkrong di tempat mewah dari lingkaran pertemanan saat anggaran bulanan Anda sudah habis?",
        "options": [
            "A. Tetap ikut menggunakan kartu kredit demi menjaga gengsi pertemanan",
            "B. Menolak secara jujur dan sopan, atau mengusulkan alternatif tempat kumpul yang lebih terjangkau",
            "C. Meminjam uang dari salah satu teman di grup tersebut tanpa memberi tahu alasan sebenarnya"
        ],
        "correctIndex": 1,
        "educationalFact": "Money Fact! Untuk mengukur ambang batas keamanan dari jeratan utang gaya hidup akibat psikologi yang rapuh, para analis menggunakan indikator teknis Debt-to-Income Ratio (DTI). Rumusnya adalah membagi total kewajiban utang bulanan dengan total pendapatan kotor bulanan. Batas toleransi teknis yang ketat menetapkan angka DTI untuk keperluan konsumtif non-produktif idealnya adalah 0%, alias tidak boleh ada utang untuk gaya hidup."
    },
    {
        "level": "MEDIUM",
        "subBab": 5,
        "questionText": "Apa perbedaan psikologis antara kepuasan instan (instant gratification) dengan kepuasan tertunda (delayed gratification) dalam keuangan?",
        "options": [
            "A. Instant gratification mengejar kesenangan jangka pendek merugikan; delayed gratification menahan diri demi keamanan finansial masa depan",
            "B. Instant gratification hanya dilakukan oleh orang kaya; delayed gratification hanya dilakukan oleh orang miskin",
            "C. Instant gratification berfokus pada investasi; delayed gratification berfokus pada belanja pakaian harian"
        ],
        "correctIndex": 0,
        "educationalFact": "Tahukah kamu? Morgan Housel dalam buku mahakaryanya The Psychology of Money menjelaskan satu tesis fundamental yang sangat mendalam mengenai definisi kekayaan: \"Kekayaan yang sebenarnya (wealth) adalah apa yang tidak kamu lihat, yaitu mobil mewah yang tidak dibeli, perhiasan yang dilewatkan, dan aset investasi yang dibiarkan tumbuh.\" Apa yang dipamerkan orang di luar sana hanyalah pengeluaran (spending), bukan kekayaan."
    },
    {
        "level": "MEDIUM",
        "subBab": 5,
        "questionText": "Apa bahaya psikologis terbesar dari fitur kemudahan berbelanja seperti PayLater atau Buy Now Pay Later (BNPL) bagi konsumen yang kurang literasi?",
        "options": [
            "A. Sistem mengenakan biaya pendaftaran akun yang sangat mahal di awal",
            "B. Memisahkan kesenangan mendapatkan barang dengan rasa sakit  membayar, memicu ilusi bahwa kita mampu membeli",
            "C. Mengurangi poin loyalitas belanja kita di platform e-commerce tersebut"
        ],
        "correctIndex": 1,
        "educationalFact": "Fakta menarik! Perilaku konsumsi berlebihan akibat tekanan sosial didasarkan pada sindrom sosiologis abad ke-19 yang sangat terkenal bernama Keeping Up with the Joneses. Istilah ini merujuk pada kondisi psikologis di mana seseorang merasa wajib menyamai atau melampaui kepemilikan materi dari tetangga atau kelompok kelas sosialnya sebagai indikator baku keberhasilan hidup, yang pada akhirnya memicu kebangkrutan massal secara terselubung."
    },
    {
        "level": "MEDIUM",
        "subBab": 5,
        "questionText": "Mengapa memiliki tujuan keuangan (financial goals) yang spesifik dan tertulis dapat memperkuat psikologi seseorang melawan tren FOMO?",
        "options": [
            "A. Karena tujuan tertulis otomatis disetujui dan dibiayai oleh lembaga keuangan pemerintah",
            "B. Menjadi kompas pengingat yang menjaga fokus kita pada prioritas hidup pribadi daripada mengikuti gaya hidup orang lain",
            "C. Membuat kita tidak perlu lagi berteman dengan orang-orang di luar lingkungan kerja"
        ],
        "correctIndex": 1,
        "educationalFact": "Fun fact! Dalam ekonomi perilaku, ada bias kognitif yang disebut Bandwagon Effect. Pengetahuan mendasar ini menjelaskan fenomena di mana probabilitas seseorang untuk mengadopsi suatu perilaku atau membeli suatu produk akan meningkat secara eksponensial jika melihat banyak orang lain dalam kelompok sosialnya melakukan hal yang sama, terlepas dari apakah tindakan tersebut rasional bagi keuangan pribadi mereka atau tidak."
    },
    {
        "level": "MEDIUM",
        "subBab": 5,
        "questionText": "Seseorang membeli koin kripto baru yang tidak jelas fundamentalnya hanya karena melihat banyak selebritas internet mempromosikannya dan takut kehilangan momen kaya cepat. Tindakan ini murni didasari oleh...",
        "options": [
            "A. Analisis Teknikal dan Fundamental yang Mendalam",
            "B. Psikologi Keuangan berbasis FOMO (Fear of Missing Out)",
            "C. Strategi Diversifikasi Aset Manajemen Risiko"
        ],
        "correctIndex": 1,
        "educationalFact": "Money Fact! Untuk mengukur ambang batas keamanan dari jeratan utang gaya hidup akibat psikologi yang rapuh, para analis menggunakan indikator teknis Debt-to-Income Ratio (DTI). Rumusnya adalah membagi total kewajiban utang bulanan dengan total pendapatan kotor bulanan. Batas toleransi teknis yang ketat menetapkan angka DTI untuk keperluan konsumtif non-produktif idealnya adalah 0%, alias tidak boleh ada utang untuk gaya hidup."
    },
    {
        "level": "MEDIUM",
        "subBab": 5,
        "questionText": "Apa yang dimaksud dengan konsep Mental Accounting yang sering kali membuat pengelolaan keuangan kita menjadi bias?",
        "options": [
            "A. Kecenderungan memperlakukan dan menghabiskan uang secara berbeda berdasarkan asal-usul sumber uang atau pos tujuannya",
            "B. Kemampuan menghitung bunga bank secara cepat di dalam pikiran tanpa kalkulator",
            "C. Sistem pelaporan keuangan yang dilakukan oleh akuntan publik internal perusahaan"
        ],
        "correctIndex": 0,
        "educationalFact": "Tahukah kamu? Morgan Housel dalam buku mahakaryanya The Psychology of Money menjelaskan satu tesis fundamental yang sangat mendalam mengenai definisi kekayaan: \"Kekayaan yang sebenarnya (wealth) adalah apa yang tidak kamu lihat, yaitu mobil mewah yang tidak dibeli, perhiasan yang dilewatkan, dan aset investasi yang dibiarkan tumbuh.\" Apa yang dipamerkan orang di luar sana hanyalah pengeluaran (spending), bukan kekayaan."
    },
    {
        "level": "MEDIUM",
        "subBab": 5,
        "questionText": "Bagaimana menerapkan konsep “Minimalisme Finansial” dalam kehidupan sehari-hari secara tepat?",
        "options": [
            "A. Membatasi makan hanya satu kali sehari dan menolak membeli pakaian seumur hidup",
            "B. Fokus mengalokasikan uang hanya untuk hal-hal yang benar-benar memberi nilai nyata dan kebahagiaan sejati dalam hidup",
            "C. Menaruh seluruh kekayaan di bank luar negeri agar tidak terlihat oleh masyarakat luas"
        ],
        "correctIndex": 1,
        "educationalFact": "Fakta menarik! Perilaku konsumsi berlebihan akibat tekanan sosial didasarkan pada sindrom sosiologis abad ke-19 yang sangat terkenal bernama Keeping Up with the Joneses. Istilah ini merujuk pada kondisi psikologis di mana seseorang merasa wajib menyamai atau melampaui kepemilikan materi dari tetangga atau kelompok kelas sosialnya sebagai indikator baku keberhasilan hidup, yang pada akhirnya memicu kebangkrutan massal secara terselubung."
    },
    {
        "level": "MEDIUM",
        "subBab": 6,
        "questionText": "Pak Andi mendapatkan pesan WhatsApp yang menyatakan bahwa dia mendapatkan pinjaman instan Rp5.000.000 dari PT Maju Sejahtera. Namun, Pak Andi harus mentransfer biaya provisi sebesar Rp500.000 terlebih dahulu ke rekening perorangan agar dana cair. Tindakan apa yang mencerminkan literasi keuangan yang tepat?",
        "options": [
            "A. Segera mentransfer uang tersebut agar sisa pinjaman Rp4.500.000 bisa segera digunakan untuk modal",
            "B. Meminta diskon biaya provisi agar kerugian tidak terlalu besar jika  ternyata penipuan",
            "C. Menolak penawaran tersebut karena platform legal tidak pernah meminta biaya di muka ke rekening perorangan sebelum pencairan"
        ],
        "correctIndex": 2,
        "educationalFact": "Tahukah kamu? Perbedaan teknis paling radikal antara pinjol legal dan ilegal terletak pada izin akses data gawai ponsel pintarmu. Berdasarkan regulasi perlindungan konsumen OJK, aplikasi pinjol legal hanya diperbolehkan mengakses tiga fitur instrumen yang disingkat CAMILAN, yaitu: Camera (Kamera), Microphone (Mikrofon), dan Location (Lokasi). Jika ada aplikasi pinjaman yang meminta izin akses ke daftar kontak telepon, galeri foto pribadi, atau riwayat panggilan, segera batalkan karena itu adalah ciri mutlak pinjol ilegal."
    },
    {
        "level": "MEDIUM",
        "subBab": 6,
        "questionText": "Ketika memeriksa sebuah aplikasi pinjaman digital, Risa mendapati bahwa perusahaan tersebut tidak mencantumkan alamat kantor fisik yang jelas dan tidak memiliki susunan direksi yang transparan di situs webnya. Mengapa hal ini patut dicurigai sebagai pinjol ilegal?",
        "options": [
            "A. Perusahaan tersebut sedang menghemat biaya operasional digital sehingga belum sempat menyewa kantor fisik",
            "B. Anonimitas sengaja dijaga agar pelaku mudah menghilangkan jejak dan menghindari pelacakan hukum oleh aparat kepolisian",
            "C. Aturan OJK memang memperbolehkan perusahaan fintech beroperasi tanpa entitas kantor hukum yang nyata"
        ],
        "correctIndex": 1,
        "educationalFact": "Fakta menarik! Pinjol ilegal menggunakan taktik psikologis penagihan yang sangat destruktif berupa Cyberbullying dan penyebaran data pribadi. Mereka sengaja membuat grup WhatsApp berisi seluruh kontak teman, keluarga, hingga atasan kerja korbannya, lalu menyebarkan foto korban yang dimanipulasi dengan narasi fitnah demi menghancurkan sanksi sosial korban agar terpaksa membayar dengan cara apa pun."
    },
    {
        "level": "MEDIUM",
        "subBab": 6,
        "questionText": "Mengapa praktik penagihan yang dilakukan oleh pinjol legal dilarang keras menggunakan ancaman, kekerasan fisik, atau mempermalukan nasabah di media sosial?",
        "options": [
            "A. Karena pinjol legal terikat oleh Kode Etik Perilaku AFPI dan regulasi perlindungan konsumen OJK yang menjunjung hak asasi",
            "B. Karena penagihan dengan cara kekerasan memerlukan biaya operasional lapangan yang jauh lebih besar",
            "C. Karena sistem penagihan pinjol legal sudah digantikan sepenuhnya oleh kecerdasan buatan (AI)"
        ],
        "correctIndex": 0,
        "educationalFact": "Fun fact! Ekosistem keuangan pinjaman digital legal mengenal mekanisme penilaian kelayakan otomatis yang disebut Alternative Credit Scoring. Berbeda dengan bank konvensional yang membutuhkan slip gaji fisik, algoritma teknologi finansial legal menganalisis rekam jejak digitalmu secara legal (seperti riwayat transaksi belanja di e-commerce dan utilitas pembayaran listrik) untuk menentukan kelayakan kreditmu dalam hitungan menit."
    },
    {
        "level": "MEDIUM",
        "subBab": 6,
        "questionText": "Seseorang terjebak dalam siklus meminjam di platform B untuk melunasi utang lama di platform A, yang dikenal dengan istilah gali lubang tutup lubang. Ditinjau dari arsitektur arus kas harian, dampak jangka panjang paling fatal dari tindakan ini adalah...",
        "options": [
            "A. Skor kredit nasabah di SLIK OJK otomatis akan menjadi sangat baik dan bersih",
            "B. Nilai kekayaan bersih (net worth) individu tersebut akan meningkat secara bertahap",
            "C. Beban bunga dan denda baru akan menumpuk secara eksponensial hingga melampaui kapasitas pendapatan riil"
        ],
        "correctIndex": 2,
        "educationalFact": "Money Fact! Pengetahuan mendasar mengenai struktur biaya di pinjol legal menunjukkan bahwa bunga harian yang ditetapkan saat ini telah diturunkan secara bertahap oleh OJK dan AFPI untuk sektor pinjaman konsumtif jangka pendek menjadi maksimal 0,1% s.d. 0,3% per hari. Komponen ini wajib dicantumkan secara transparan di dalam lembar kontrak digital sebelum konsumen menyetujui perjanjian pinjaman."
    },
    {
        "level": "MEDIUM",
        "subBab": 6,
        "questionText": "Roni memiliki rekam jejak kredit yang buruk akibat sering menunggak pembayaran paylater. Saat dia mengajukan pinjaman ke platform pinjol legal, pengajuannya langsung ditolak secara otomatis. Mengapa hal ini bisa terjadi?",
        "options": [
            "A. Platform pinjol legal tidak menyukai nasabah yang aktif bertransaksi digital",
            "B. Pinjol legal terintegrasi dengan sistem biro kredit atau SLIK OJK untuk melakukan analisis kelayakan nasabah (credit scoring)",
            "C. Penolakan terjadi karena kuota pinjaman harian di bank sentral sudah habis terpakai"
        ],
        "correctIndex": 1,
        "educationalFact": "Tahukah kamu? Perbedaan teknis paling radikal antara pinjol legal dan ilegal terletak pada izin akses data gawai ponsel pintarmu. Berdasarkan regulasi perlindungan konsumen OJK, aplikasi pinjol legal hanya diperbolehkan mengakses tiga fitur instrumen yang disingkat CAMILAN, yaitu: Camera (Kamera), Microphone (Mikrofon), dan Location (Lokasi). Jika ada aplikasi pinjaman yang meminta izin akses ke daftar kontak telepon, galeri foto pribadi, atau riwayat panggilan, segera batalkan karena itu adalah ciri mutlak pinjol ilegal."
    },
    {
        "level": "MEDIUM",
        "subBab": 6,
        "questionText": "Seorang nasabah mendapati bahwa aplikasi pinjol yang digunakannya tiba-tiba menaikkan suku bunga secara sepihak di tengah masa tenor, jauh lebih tinggi dari kesepakatan awal yang tertulis di aplikasi. Berdasarkan karakteristiknya, platform tersebut dapat dipastikan...",
        "options": [
            "A. Lembaga Penjamin Simpanan (LPS) untuk meminta ganti rugi materiil",
            "B. Berstatus legal namun sedang mengalami gangguan teknis pada sistem algoritma",
            "C. Berstatus ilegal karena memanipulasi informasi perjanjian untuk menjebak nasabah dalam utang ekstrem"
        ],
        "correctIndex": 2,
        "educationalFact": "Fakta menarik! Pinjol ilegal menggunakan taktik psikologis penagihan yang sangat destruktif berupa Cyberbullying dan penyebaran data pribadi. Mereka sengaja membuat grup WhatsApp berisi seluruh kontak teman, keluarga, hingga atasan kerja korbannya, lalu menyebarkan foto korban yang dimanipulasi dengan narasi fitnah demi menghancurkan sanksi sosial korban agar terpaksa membayar dengan cara apa pun."
    },
    {
        "level": "MEDIUM",
        "subBab": 6,
        "questionText": "Apabila seorang korban pinjol ilegal mengalami penyebaran data pribadi berupa foto wajah yang direkayasa dan dikirimkan ke daftar kontaknya disertai ancaman pidana, ke manakah korban harus melapor untuk penegakan hukum pidananya?",
        "options": [
            "A. Lembaga Penjamin Simpanan (LPS) untuk meminta ganti rugi materiil",
            "B. Kepolisian Negara Republik Indonesia (Polri) melalui polres terdekat atau laman patrolisiber.id",
            "C. Lembaga Alternatif Penyelesaian Sengketa (LAPS) Sektor Jasa Keuangan"
        ],
        "correctIndex": 1,
        "educationalFact": "Fun fact! Ekosistem keuangan pinjaman digital legal mengenal mekanisme penilaian kelayakan otomatis yang disebut Alternative Credit Scoring. Berbeda dengan bank konvensional yang membutuhkan slip gaji fisik, algoritma teknologi finansial legal menganalisis rekam jejak digitalmu secara legal (seperti riwayat transaksi belanja di e-commerce dan utilitas pembayaran listrik) untuk menentukan kelayakan kreditmu dalam hitungan menit."
    },
    {
        "level": "MEDIUM",
        "subBab": 6,
        "questionText": "Di bawah ini, manakah yang merupakan salah satu bentuk sanksi disiplin yang dijatuhkan AFPI kepada platform pinjol legal yang terbukti melanggar kode etik penagihan data nasabah?",
        "options": [
            "A. Pencabutan keanggotaan asosiasi yang dapat berujung pada rekomendasi pencabutan izin usaha oleh OJK",
            "B. Penurunan paksa jumlah bintang pembaca di aplikasi Google Play Store",
            "C. Kewajiban memberikan pinjaman gratis tanpa bunga kepada seluruh masyarakat selama satu bulan"
        ],
        "correctIndex": 0,
        "educationalFact": "Money Fact! Pengetahuan mendasar mengenai struktur biaya di pinjol legal menunjukkan bahwa bunga harian yang ditetapkan saat ini telah diturunkan secara bertahap oleh OJK dan AFPI untuk sektor pinjaman konsumtif jangka pendek menjadi maksimal 0,1% s.d. 0,3% per hari. Komponen ini wajib dicantumkan secara transparan di dalam lembar kontrak digital sebelum konsumen menyetujui perjanjian pinjaman."
    },
    {
        "level": "MEDIUM",
        "subBab": 6,
        "questionText": "Mengapa pinjol ilegal sering kali menggunakan nama yang sangat mirip dengan platform pinjol legal atau lembaga perbankan terkenal di Indonesia?",
        "options": [
            "A. Untuk mempermudah proses integrasi sistem pembayaran antar-bank nasional",
            "B. Memanfaatkan bias psikologis masyarakat (brand confusion) agar korban mengira mereka meminjam di tempat yang aman",
            "C. Karena adanya aturan kebebasan hak paten nama produk digital di wilayah Asia Tenggara"
        ],
        "correctIndex": 1,
        "educationalFact": "Tahukah kamu? Perbedaan teknis paling radikal antara pinjol legal dan ilegal terletak pada izin akses data gawai ponsel pintarmu. Berdasarkan regulasi perlindungan konsumen OJK, aplikasi pinjol legal hanya diperbolehkan mengakses tiga fitur instrumen yang disingkat CAMILAN, yaitu: Camera (Kamera), Microphone (Mikrofon), dan Location (Lokasi). Jika ada aplikasi pinjaman yang meminta izin akses ke daftar kontak telepon, galeri foto pribadi, atau riwayat panggilan, segera batalkan karena itu adalah ciri mutlak pinjol ilegal."
    },
    {
        "level": "MEDIUM",
        "subBab": 6,
        "questionText": "Ditinjau dari prinsip manajemen risiko keuangan, rasio maksimal total cicilan utang (termasuk pinjaman digital) yang dianggap aman dari seluruh total pendapatan bulanan bersih adalah...",
        "options": [
            "A. Maksimal 10% dari pendapatan bulanan",
            "B. Maksimal 30% hingga 35% dari pendapatan bulanan",
            "C. Maksimal 60% dari pendapatan bulanan"
        ],
        "correctIndex": 1,
        "educationalFact": "Fakta menarik! Pinjol ilegal menggunakan taktik psikologis penagihan yang sangat destruktif berupa Cyberbullying dan penyebaran data pribadi. Mereka sengaja membuat grup WhatsApp berisi seluruh kontak teman, keluarga, hingga atasan kerja korbannya, lalu menyebarkan foto korban yang dimanipulasi dengan narasi fitnah demi menghancurkan sanksi sosial korban agar terpaksa membayar dengan cara apa pun."
    },
    {
        "level": "HARD",
        "subBab": 0,
        "questionText": "Mengapa Bank Indonesia (BI) menaikkan suku bunga acuan ketika inflasi melonjak tajam?",
        "options": [
            "A. Untuk meningkatkan keuntungan bank pemerintah secara instan",
            "B. Menarik minat masyarakat menabung, meredam jumlah uang beredar, dan memperlambat laju konsumsi berlebih untuk menstabilkan harga barang",
            "C. Membantu fintech lending mengenakan bunga lebih mahal"
        ],
        "correctIndex": 1,
        "educationalFact": "Tahukah kalian? Landasan ilmiah modern mengenai literasi keuangan global berakar pada penelitian monumental dari ekonom kenamaan Annamaria Lusardi dan Olivia S. Mitchell (2014). Mereka merancang tiga pertanyaan kunci (The Big Three Questions) mengenai bunga majemuk, inflasi, dan diversifikasi risiko, yang kini menjadi standar baku IMF dan Bank Dunia untuk memetakan tingkat kecerdasan finansial makro di suatu negar"
    },
    {
        "level": "HARD",
        "subBab": 0,
        "questionText": "Mengapa skema Ponzi Scheme selalu berujung gagal dan merugikan massal?",
        "options": [
            "A. Karena dilarang menggunakan rupiah",
            "B. Keuntungan investor lama berasal dari dana investor baru, bukan dari bisnis riil, sehingga pasti kolaps saat aliran dana baru berhenti",
            "C. Karena pengelola lupa mengurus izin usaha"
        ],
        "correctIndex": 1,
        "educationalFact": "Fakta menarik! Kebijakan makroekonomi suatu negara sangat bergantung pada agregat literasi keuangan masyarakatny"
    },
    {
        "level": "HARD",
        "subBab": 0,
        "questionText": "Apa implikasi yuridis dan finansial bagi nasabah yang mengalami gagal bayar dan tercatat di SLIK OJK?",
        "options": [
            "A. Skor kredit memburuk (Kol 5), masuk daftar hitam perbankan, dan sulit memperoleh akses pinjaman legal di masa depan",
            "B. Seluruh tabungan keluarga otomatis disita tanpa sidang",
            "C. Nasabah diwajibkan bekerja paksa di bank"
        ],
        "correctIndex": 0,
        "educationalFact": "Fun fact! Di dalam analisis keuangan lanjutan, terdapat rasio teknis bernama Liquidity Ratio (Rasio Likuiditas) untuk melihat ketahanan jangka pendek. Perhitungannya adalah: Rasio Likuiditas = Aset Likuid / Liabilitas Jangka Pendek Rasio ini menguji apakah kamu memiliki cukup uang tunai atau setara kas yang bisa dicairkan dalam waktu cepat untuk melunasi seluruh utang jatuh tempo dalam waktu kurang dari satu tahun."
    },
    {
        "level": "HARD",
        "subBab": 0,
        "questionText": "Bagaimana Asymmetric Information merugikan nasabah awam dalam pembelian asuransi unit-link?",
        "options": [
            "A. Agen memberikan diskon premi terlalu besar",
            "B. Agen menyembunyikan informasi detail biaya dan risiko investasi, sementara nasabah hanya diberi janji keuntungan manis",
            "C. Nasabah dipaksa membaca polis dalam lima menit"
        ],
        "correctIndex": 1,
        "educationalFact": "Money Fact! Menurut Life-Cycle Hypothesis yang dikembangkan oleh peraih Nobel Franco Modigliani, pola konsumsi dan tabungan seseorang sepanjang hidupnya membentuk kurva cembung. Literasi keuangan bertindak sebagai alat intervensi agar seseorang bisa melakukan consumption smoothing (pemerataan konsumsi), sehingga mereka tidak mengalami lonjakan gaya hidup yang ekstrem saat usia produktif yang kemudian merosot tajam menjadi kemiskinan di masa tu"
    },
    {
        "level": "HARD",
        "subBab": 0,
        "questionText": "Apa makna obligasi korporasi berperingkat BB bagi investor ritel?",
        "options": [
            "A. Obligasi tersebut tergolong spekulatif (junk bond), memiliki risiko gagal bayar tinggi namun menawarkan kupon bunga besar",
            "B. Dijamin aman oleh pemerintah",
            "C. Harganya dipastikan naik dua kali lipat"
        ],
        "correctIndex": 0,
        "educationalFact": "Tahukah kalian? Landasan ilmiah modern mengenai literasi keuangan global berakar pada penelitian monumental dari ekonom kenamaan Annamaria Lusardi dan Olivia S. Mitchell (2014). Mereka merancang tiga pertanyaan kunci (The Big Three Questions) mengenai bunga majemuk, inflasi, dan diversifikasi risiko, yang kini menjadi standar baku IMF dan Bank Dunia untuk memetakan tingkat kecerdasan finansial makro di suatu negar"
    },
    {
        "level": "HARD",
        "subBab": 0,
        "questionText": "Mengapa indeks inklusi keuangan Indonesia lebih tinggi daripada indeks literasi keuangan?",
        "options": [
            "A. Masyarakat dilarang memakai internet banking tanpa sertifikasi",
            "B. Banyak masyarakat sudah memakai produk keuangan, tetapi belum memahami fungsi, risiko, hak, dan kewajibannya secara baik",
            "C. Lembaga keuangan sengaja mempersulit pembukaan rekening"
        ],
        "correctIndex": 1,
        "educationalFact": "Fakta menarik! Kebijakan makroekonomi suatu negara sangat bergantung pada agregat literasi keuangan masyarakatny"
    },
    {
        "level": "HARD",
        "subBab": 0,
        "questionText": "Bagaimana mekanisme perlindungan nasabah oleh OJK melalui Kontak OJK 157?",
        "options": [
            "A. Menyediakan layanan pengaduan resmi, mediasi, dan penyelesaian sengketa melalui LAPS",
            "B. Mengganti seluruh kerugian nasabah dengan dana negara",
            "C. Membantu nasabah melakukan demonstrasi fisik"
        ],
        "correctIndex": 0,
        "educationalFact": "Fun fact! Di dalam analisis keuangan lanjutan, terdapat rasio teknis bernama Liquidity Ratio (Rasio Likuiditas) untuk melihat ketahanan jangka pendek. Perhitungannya adalah: Rasio Likuiditas = Aset Likuid / Liabilitas Jangka Pendek Rasio ini menguji apakah kamu memiliki cukup uang tunai atau setara kas yang bisa dicairkan dalam waktu cepat untuk melunasi seluruh utang jatuh tempo dalam waktu kurang dari satu tahun."
    },
    {
        "level": "HARD",
        "subBab": 0,
        "questionText": "Mengapa Cryptocurrency diawasi oleh Bappebti, bukan OJK?",
        "options": [
            "A. Karena hanya boleh diperdagangkan pelaku ekspor impor",
            "B. Kripto dianggap sebagai komoditas digital dengan volatilitas ekstrem dan bukan efek sekuritas resmi",
            "C. Seluruh aktivitas kripto dikontrol bank sentral AS"
        ],
        "correctIndex": 1,
        "educationalFact": "Money Fact! Menurut Life-Cycle Hypothesis yang dikembangkan oleh peraih Nobel Franco Modigliani, pola konsumsi dan tabungan seseorang sepanjang hidupnya membentuk kurva cembung. Literasi keuangan bertindak sebagai alat intervensi agar seseorang bisa melakukan consumption smoothing (pemerataan konsumsi), sehingga mereka tidak mengalami lonjakan gaya hidup yang ekstrem saat usia produktif yang kemudian merosot tajam menjadi kemiskinan di masa tu"
    },
    {
        "level": "HARD",
        "subBab": 0,
        "questionText": "Apa konsekuensi jangka panjang bagi negara dengan tingkat literasi keuangan sangat rendah saat memasuki Bonus Demografi?",
        "options": [
            "A. Usia produktif berubah menjadi beban sosial akibat tingginya kegagalan finansial, kemiskinan struktural, dan ketergantungan bantuan negara",
            "B. Mata uang negara otomatis dihapus dari perdagangan internasional",
            "C. Pemerintah menutup seluruh pasar modal nasional"
        ],
        "correctIndex": 0,
        "educationalFact": "Tahukah kalian? Landasan ilmiah modern mengenai literasi keuangan global berakar pada penelitian monumental dari ekonom kenamaan Annamaria Lusardi dan Olivia S. Mitchell (2014). Mereka merancang tiga pertanyaan kunci (The Big Three Questions) mengenai bunga majemuk, inflasi, dan diversifikasi risiko, yang kini menjadi standar baku IMF dan Bank Dunia untuk memetakan tingkat kecerdasan finansial makro di suatu negar"
    },
    {
        "level": "HARD",
        "subBab": 0,
        "questionText": "Urutan Piramida Perencanaan Keuangan yang paling tepat adalah...",
        "options": [
            "A. Investasi Saham Agresif → Dana Pensiun → Cicilan Barang Mewah → Dana Darurat Minimal",
            "B. Pengaturan Arus Kas Sehat & Dana Darurat → Proteksi (Asuransi) → Investasi Masa Depan → Warisan/Distribusi Kekayaan",
            "C. Pembelian Properti → Pinjaman Modal Usaha → Proteksi Unit-Link → Tabungan Haji"
        ],
        "correctIndex": 1,
        "educationalFact": "Fakta menarik! Kebijakan makroekonomi suatu negara sangat bergantung pada agregat literasi keuangan masyarakatny"
    },
    {
        "level": "HARD",
        "subBab": 1,
        "questionText": "Doni adalah seorang freelancer desainer grafis dengan pendapatan tidak menentu, mengontrak rumah, dan memiliki riwayat penyakit asma kronis. Mengapa target dana darurat Doni secara teoritis harus disetel pada batas maksimal (minimal 9–12 kali pengeluaran bulanan)?",
        "options": [
            "A. Karena freelancer tidak diizinkan memiliki asuransi kesehatan swasta oleh regulator",
            "B. Tingginya volatilitas pendapatan serta adanya risiko kesehatan berulang yang dapat menghentikan produktivitas kerja sewaktu-waktu",
            "C. Regulasi perbankan mengenakan biaya admin lebih tinggi untuk pekerja sektor informal"
        ],
        "correctIndex": 1,
        "educationalFact": "Tahukah kalian? Mengapa kita harus memisahkan dana darurat ke rekening yang berbeda secara kaku? Hal ini dijelaskan secara ilmiah oleh pemenang Hadiah Nobel Ekonomi, Richard Thaler, lewat teori Mental Accounting (Akuntansi Mental). Teori ini menyatakan bahwa manusia cenderung mengategorikan uang ke dalam \"kotak virtual\" yang berbeda berdasarkan sumber atau tujuannya, dan pemisahan fisik ini secara kognitif membantu meningkatkan kontrol diri (self-control) dari godaan belanj"
    },
    {
        "level": "HARD",
        "subBab": 1,
        "questionText": "Dalam kondisi krisis ekonomi sistemik di mana pasar saham anjlok 30% dan suku bunga bank sentral diturunkan drastis, langkah taktis apa yang paling rasional terkait alokasi dana darurat yang berada di Reksa Dana Pasar Uang (RDPU)?",
        "options": [
            "A. Tetap mempertahankan dana di RDPU atau memindahkannya ke deposito bank digital yang memberikan imbal hasil di atas suku bunga acuan",
            "B. Menarik seluruh dana darurat untuk dibelikan saham yang sedang jatuh dengan harapan mendapat keuntungan instan",
            "C. Mengonversi seluruh dana darurat menjadi mata uang asing fisik dan menyimpannya di rumah"
        ],
        "correctIndex": 0,
        "educationalFact": "Tahukah kamu? Kita bisa mengoptimalkan imbal hasil dana darurat tanpa mengorbankan likuiditas dengan menggunakan teknik manajemen portofolio Tiering Strategy (Strategi Tangga). Perhitungannya membagi total dana darurat ke dalam tiga lapisan instrumen keuangan yang berbeda: Tier 1 (Akses Instan - Kas/Bank) = 20% dari Total Dana Darurat Tier 2 (Akses 1 Hari - RDPU) = 50% dari Total Dana Darurat Tier 3 (Akses Jangka Pendek - Depo) = 30% dari Total Dana Darurat Contoh Sederhana: Jika total target dana daruratmu adalah Rp20.000.000, maka tempatkan Rp"
    },
    {
        "level": "HARD",
        "subBab": 1,
        "questionText": "Keluarga sejahtera mengalami musibah kebakaran rumah yang menghabiskan seluruh aset fisik termasuk dokumen penting. Mereka memiliki dana darurat yang disimpan 100% dalam bentuk emas batangan di dalam brankas rumah yang ikut meleleh. Apa kesalahan strategi mitigasi risiko keuangan keluarga tersebut?",
        "options": [
            "A. Investasi emas batangan adalah kesalahan besar karena emas mudah hancur terbakar",
            "B. Kegagalan melakukan diversifikasi tempat penyimpanan (lokasi fisik vs digital/lembaga keuangan resmi) untuk pos ketahanan darurat",
            "C. Tidak menggunakan jasa dukun keuangan untuk mengamankan brankas dari api"
        ],
        "correctIndex": 1,
        "educationalFact": "Fakta menarik! Terdapat fenomena ekonomi perilaku yang disebut The Emergency Paradox. Studi menunjukkan bahwa individu yang sama sekali tidak memiliki bantalan dana darurat justru sering kali mengeluarkan biaya lebih tinggi secara akumulatif untuk mengatasi krisis minor (misal: menggunakan skema kredit kilat dengan denda keterlambatan tinggi), yang secara struktural memperdalam kemiskinan mereka (poverty trap)."
    },
    {
        "level": "HARD",
        "subBab": 1,
        "questionText": "Sebuah perusahaan startup tempat Maya bekerja mengalami kebangkrutan mendadak dan menunggak gaji Maya selama 2 bulan terakhir. Maya memiliki dana darurat yang setara dengan 6 bulan pengeluaran. Bagaimana Maya menyusun strategi manajemen arus kas daruratnya?",
        "options": [
            "A. Memotong seluruh pengeluaran tersier, mencairkan dana darurat secara bertahap hanya untuk kebutuhan pokok hidup, sambil agresif melamar kerja",
            "B. Langsung mencairkan seluruh dana darurat 6 bulan sekaligus untuk diinvestasikan ke bisnis waralaba franchise agar cepat menghasilkan",
            "C. Menggunakan dana darurat untuk membayar lunas sisa cicilan jangka panjang KPR rumah agar terbebas dari beban utang"
        ],
        "correctIndex": 0,
        "educationalFact": "Fun fact! Dalam analisis laporan keuangan personal tingkat lanjut, perencana keuangan menghitung rasio Liquid Asset to Total Asset Ratio Liquid Asset to Total Asset Ratio = (Total Aset Likuid / Total Aset Keseluruhan) x 100% Angka ini memberikan gambaran teknis apakah portofolio kekayaanmu terlalu \"sakit\" karena terjebak pada aset tidak likuid (seperti tanah atau properti) yang tidak bisa menolongmu dengan cepat saat krisis likuiditas meland"
    },
    {
        "level": "HARD",
        "subBab": 1,
        "questionText": "Analisis situasi: Seseorang memiliki total dana darurat Rp50.000.000. Dia melihat instrumen investasi peer-to-peer (P2P) lending menawarkan imbal hasil bunga 18% per tahun dengan tenor 3 bulan. Bolehkah dia memindahkan dana daruratnya ke sana?",
        "options": [
            "A. Boleh, karena tenornya sangat singkat (3 bulan) dan bunganya tinggi melebihi laju inflasi tahunan",
            "B. Tidak boleh, karena P2P lending memiliki risiko gagal bayar yang tinggi (credit risk) dan dana terkunci selama tenor berjalan (tidak likuid)",
            "C. Boleh, asal perusahaan P2P lending tersebut sudah terdaftar resmi di Kementerian Komunikasi dan Digital"
        ],
        "correctIndex": 1,
        "educationalFact": "Money Fact! Pengetahuan teknis penataan kembali (rebalancing) dana darurat wajib dilakukan secara berkal"
    },
    {
        "level": "HARD",
        "subBab": 1,
        "questionText": "Bagaimana konsep Opportunity Cost bekerja ketika seseorang memutuskan untuk menyimpan dana darurat sebesar Rp100.000.000 di rekening tabungan biasa dengan bunga 0.5% per tahun selama 5 tahun berturut-turut?",
        "options": [
            "A. Nilai riil uang menyusut akibat inflasi dan kehilangan potensi keuntungan jika dana tersebut ditaruh di instrumen likuid lain seperti RDPU/SBN",
            "B. Rekening tabungan biasa tersebut otomatis akan dikenakan denda oleh OJK karena dianggap sebagai dana menganggur",
            "C. Saldo tersebut akan bertambah secara eksponensial karena dilindungi oleh sistem penjaminan simpanan negara"
        ],
        "correctIndex": 0,
        "educationalFact": "Tahukah kalian? Mengapa kita harus memisahkan dana darurat ke rekening yang berbeda secara kaku? Hal ini dijelaskan secara ilmiah oleh pemenang Hadiah Nobel Ekonomi, Richard Thaler, lewat teori Mental Accounting (Akuntansi Mental). Teori ini menyatakan bahwa manusia cenderung mengategorikan uang ke dalam \"kotak virtual\" yang berbeda berdasarkan sumber atau tujuannya, dan pemisahan fisik ini secara kognitif membantu meningkatkan kontrol diri (self-control) dari godaan belanj"
    },
    {
        "level": "HARD",
        "subBab": 1,
        "questionText": "Saat terjadi penutupan operasional sebuah Bank Perkreditan Rakyat (BPR) oleh OJK, nasabah yang memiliki dana darurat di atas Rp2 Miliar di BPR tersebut harus menghadapi kenyataan bahwa...",
        "options": [
            "A. Seluruh uangnya akan dikembalikan utuh oleh",
            "B. Dana yang dijamin oleh LPS hanya maksimal Rp2 Miliar, sisanya menunggu hasil proses likuidasi aset bangunan BPR tersebut",
            "C. Dana tersebut hangus total dan nasabah dikenakan sanksi pidana kelalaian keuangan"
        ],
        "correctIndex": 1,
        "educationalFact": "Tahukah kamu? Kita bisa mengoptimalkan imbal hasil dana darurat tanpa mengorbankan likuiditas dengan menggunakan teknik manajemen portofolio Tiering Strategy (Strategi Tangga). Perhitungannya membagi total dana darurat ke dalam tiga lapisan instrumen keuangan yang berbeda: Tier 1 (Akses Instan - Kas/Bank) = 20% dari Total Dana Darurat Tier 2 (Akses 1 Hari - RDPU) = 50% dari Total Dana Darurat Tier 3 (Akses Jangka Pendek - Depo) = 30% dari Total Dana Darurat Contoh Sederhana: Jika total target dana daruratmu adalah Rp20.000.000, maka tempatkan Rp"
    },
    {
        "level": "HARD",
        "subBab": 1,
        "questionText": "Mengapa strategi menggabungkan asuransi jiwa unit-link dengan fungsi dana darurat dianggap kurang tepat oleh para perencana keuangan independen profesional?",
        "options": [
            "A. Unit-link tidak memiliki izin edar resmi dari Otoritas Jasa Keuangan di Indonesia",
            "B. Nilai investasi pada unit-link fluktuatif dan dikenakan potongan biaya akuisisi yang besar di tahun-tahun awal, sehingga tidak likuid dan nilainya bisa berkurang",
            "C. Unit-link hanya bisa dicairkan apabila pemegang polis mengalami cacat tetap total akibat kecelakaan kerja saja"
        ],
        "correctIndex": 1,
        "educationalFact": "Fakta menarik! Terdapat fenomena ekonomi perilaku yang disebut The Emergency Paradox. Studi menunjukkan bahwa individu yang sama sekali tidak memiliki bantalan dana darurat justru sering kali mengeluarkan biaya lebih tinggi secara akumulatif untuk mengatasi krisis minor (misal: menggunakan skema kredit kilat dengan denda keterlambatan tinggi), yang secara struktural memperdalam kemiskinan mereka (poverty trap)."
    },
    {
        "level": "HARD",
        "subBab": 1,
        "questionText": "Jika sebuah keluarga memiliki rasio utang terhadap pendapatan sebesar 45% (di atas batas aman 30%), bagaimana strategi alokasi pendapatan bulanan mereka antara membangun dana darurat dan melunasi utang?",
        "options": [
            "A. Membayar cicilan utang minimum agar tidak macet, sembari membangun dana darurat mini, lalu menggunakan metode debt snowball untuk melunasi utang terkecil",
            "B. Menghentikan total pembayaran utang selama beberapa bulan untuk memprioritaskan dana darurat penuh terlebih dahulu",
            "C. Menjual seluruh aset darurat yang ada untuk diinvestasikan pada instrumen crypto dengan harapan profit instan menutupi seluruh utang"
        ],
        "correctIndex": 0,
        "educationalFact": "Fun fact! Dalam analisis laporan keuangan personal tingkat lanjut, perencana keuangan menghitung rasio Liquid Asset to Total Asset Ratio Liquid Asset to Total Asset Ratio = (Total Aset Likuid / Total Aset Keseluruhan) x 100% Angka ini memberikan gambaran teknis apakah portofolio kekayaanmu terlalu \"sakit\" karena terjebak pada aset tidak likuid (seperti tanah atau properti) yang tidak bisa menolongmu dengan cepat saat krisis likuiditas meland"
    },
    {
        "level": "HARD",
        "subBab": 1,
        "questionText": "Apa yang dimaksud dengan indikator Liquidity Ratio dalam kesehatan keuangan keluarga, dan bagaimana rumusnya?",
        "options": [
            "A. Total Pemasukan Bersih dibagi dengan Total Utang Jangka Panjang; nilai ideal harus berada di bawah angka 1",
            "B. Total Aset Likuid (Kas/Setara Kas) dibagi dengan Total Pengeluaran Bulanan; nilai ideal minimal adalah 3 hingga 6",
            "C. Nilai Seluruh Aset Investasi dikurangi dengan Nilai Penyusutan Kendaraan; nilai ideal harus selalu positif setiap tahun"
        ],
        "correctIndex": 1,
        "educationalFact": "Money Fact! Pengetahuan teknis penataan kembali (rebalancing) dana darurat wajib dilakukan secara berkal"
    },
    {
        "level": "HARD",
        "subBab": 2,
        "questionText": "Seorang manajer dengan gaji Rp25.000.000 per bulan selalu merasa kekurangan di akhir bulan karena sering melakukan pembelian barang-barang hobi premium lewat kartu kredit dengan alasan self-reward atas tekanan kerja. Berdasarkan psikologi keuangan, bias kognitif apa yang sedang dialami manajer tersebut?",
        "options": [
            "A. Loss Aversion Bias (Ketakutan berlebih terhadap kerugian materi finansial)",
            "B. Hedonic Treadmill (Kecenderungan cepat kembali ke tingkat kebahagiaan standar setelah keinginan terpenuhi, memicu konsumsi lebih tinggi)",
            "C. Anchoring Bias (Ketergantungan berlebih pada informasi pertama yang diterima saat belanja)"
        ],
        "correctIndex": 1,
        "educationalFact": "Tahukah kalian? Perilaku belanja impulsif masyarakat modern secara mendalam dipelajari dalam Behavioral Economics (Ekonomi Perilaku) melalui konsep Intertemporal Choice (Pilihan Antarwaktu) dan Hyperbolic Discounting (Diskon Hiperbolis). Teori ini membuktikan secara ilmiah bahwa otak manusia memiliki bias kognitif inheren yang menilai penghargaan kecil yang didapatkan saat ini jauh lebih berharga daripada penghargaan yang jauh lebih besar namun baru didapatkan di masa depan. Itulah mengapa menabung terasa berat sementara belanja terasa sangat mudah."
    },
    {
        "level": "HARD",
        "subBab": 2,
        "questionText": "Bagaimana cara menganalisis efektivitas sebuah pengeluaran menggunakan prinsip Cost-Benefit Analysis pada keputusan membeli mobil pribadi secara kredit bagi seorang pekerja komuter di Jakarta?",
        "options": [
            "A. Membandingkan total biaya cicilan, bensin, parkir, perawatan, dan penyusutan nilai mobil dengan total biaya transportasi umum serta nilai efisiensi waktu/kenyamanan",
            "B. Menghitung berapa besar peningkatan status sosial di mata rekan kerja dibandingkan dengan harga mobil tersebut di pasar second",
            "C. Memastikan bahwa warna mobil yang dibeli sesuai dengan tren warna kendaraan yang sedang viral di media sosial tahun ini"
        ],
        "correctIndex": 0,
        "educationalFact": "Fakta menarik! Dalam dunia ritel modern, penataan tata letak (layout) toko swalayan didasarkan pada riset analisis perilaku konsumen yang sangat teknis. Barang-barang kebutuhan pokok harian (seperti susu dan telur) selalu diletakkan di area paling belakang toko, sengaja memaksa konsumen berjalan melewati lorong-lorong penuh produk sekunder yang ditata estetik demi memicu impulse buying di sepanjang jalan menuju kasir."
    },
    {
        "level": "HARD",
        "subBab": 2,
        "questionText": "Seseorang terjebak dalam utang konsumtif Paylater di tiga aplikasi berbeda hingga total tagihannya mencapai 60% dari gaji bulanannya. Langkah restrukturisasi keuangan mendesak apa yang harus dia lakukan?",
        "options": [
            "A. Menghapus (uninstall) ketiga aplikasi tersebut dari smartphone agar penagih tidak bisa menghubungi lewat pesan digital",
            "B. Menyetop penggunaan belanja baru, membuat komitmen pembayaran dengan para kreditur, dan memotong gaya hidup secara ekstrem untuk melunasi utang tersebut",
            "C. Mengajukan pinjaman di aplikasi pinjol baru yang keempat untuk melunasi sisa tagihan di tiga aplikasi sebelumnya"
        ],
        "correctIndex": 1,
        "educationalFact": "Fun fact! Pengendalian konsumsi tingkat lanjut melibatkan perhitungan analisis Indifference Curve (Kurva Indiferen) dan Budget Constraint (Garis Kendala Anggaran). Pengetahuan teknis ini membuktikan bahwa kombinasi konsumsi yang optimal bagi seorang individu tercapai secara ilmiah tepat pada titik singgung antara tingkat kepuasan subjektif maksimum yang diinginkan dengan batas kemampuan finansial riil objektif yang tercermin dari pendapatan merek"
    },
    {
        "level": "HARD",
        "subBab": 2,
        "questionText": "Dalam strategi pemasaran ritel modern, terdapat teknik Decoy Effect. Bagaimana konsumen yang cerdas secara literasi keuangan menyikapi teknik ini saat membeli paket makanan/minuman?",
        "options": [
            "A. Selalu memilih ukuran paling besar karena secara matematis harga per mililiter terasa jauh lebih ekonomis dan menguntungkan",
            "B. Fokus membeli ukuran yang benar-benar sesuai dengan kapasitas kebutuhan konsumsinya, bukan tergiur selisih harga kecil yang sengaja dipasang sebagai jebakan",
            "C. Meminta diskon tambahan kepada pelayan toko dengan menunjukkan kartu keanggotaan mahasiswa"
        ],
        "correctIndex": 1,
        "educationalFact": "Money Fact! Untuk memitigasi distorsi psikologis saat berbelanja, investor institusi dan perencana keuangan menggunakan teknik analisis Utility Maximization. Sebelum melakukan transaksi besar, mereka secara teknis membuat matriks penilaian kuantitatif untuk menguji apakah utilitas (daya guna) marjinal per rupiah yang dikeluarkan untuk barang tersebut benar-benar menghasilkan efisiensi operasi atau peningkatan produktivitas yang sebanding bagi kehidupan merek"
    },
    {
        "level": "HARD",
        "subBab": 2,
        "questionText": "Mengapa pembelian barang secara kredit dengan bunga 0% selama 12 bulan di platform e-commerce tetap memerlukan analisis prioritas belanja yang ketat?",
        "options": [
            "A. Karena promo bunga 0% di e-commerce selalu diikuti oleh pencurian data pribadi nasabah secara ilegal",
            "B. Cicilan tersebut tetap mengikat dan mengurangi arus kas bebas (free cash flow) bulanan selama setahun penuh ke depan, mengurangi fleksibilitas keuangan",
            "C. Nilai barang yang dibeli secara kredit otomatis akan diturunkan kualitas fisiknya oleh produsen barang"
        ],
        "correctIndex": 1,
        "educationalFact": "Tahukah kalian? Perilaku belanja impulsif masyarakat modern secara mendalam dipelajari dalam Behavioral Economics (Ekonomi Perilaku) melalui konsep Intertemporal Choice (Pilihan Antarwaktu) dan Hyperbolic Discounting (Diskon Hiperbolis). Teori ini membuktikan secara ilmiah bahwa otak manusia memiliki bias kognitif inheren yang menilai penghargaan kecil yang didapatkan saat ini jauh lebih berharga daripada penghargaan yang jauh lebih besar namun baru didapatkan di masa depan. Itulah mengapa menabung terasa berat sementara belanja terasa sangat mudah."
    },
    {
        "level": "HARD",
        "subBab": 2,
        "questionText": "Evaluasi kasus: Tanti memutuskan membeli mesin cuci otomatis seharga Rp4.500.000 menggunakan tabungannya. Pembelian ini membuat Tanti bisa menghemat waktu mencuci 2 jam setiap hari, yang kemudian dia gunakan untuk memproduksi kue pesanan dengan keuntungan Rp50.000 per hari. Bagaimana penilaian keputusan konsumsi Tanti?",
        "options": [
            "A. Sangat bijak, karena pengeluaran tersebut beralih fungsi menjadi aset produktif yang menghasilkan keuntungan (return on investment) melebihi nilai barang",
            "B. Kurang bijak, karena mesin cuci mengalami penyusutan nilai ekonomis yang sangat cepat setiap tahunnya di pasar elektronik",
            "C. Salah, karena seharusnya Tanti menggunakan dana tersebut untuk membeli emas batangan yang nilainya stabil melawan laju inflasi"
        ],
        "correctIndex": 0,
        "educationalFact": "Fakta menarik! Dalam dunia ritel modern, penataan tata letak (layout) toko swalayan didasarkan pada riset analisis perilaku konsumen yang sangat teknis. Barang-barang kebutuhan pokok harian (seperti susu dan telur) selalu diletakkan di area paling belakang toko, sengaja memaksa konsumen berjalan melewati lorong-lorong penuh produk sekunder yang ditata estetik demi memicu impulse buying di sepanjang jalan menuju kasir."
    },
    {
        "level": "HARD",
        "subBab": 2,
        "questionText": "Apa dampak makro-ekonomi jangka panjang jika mayoritas masyarakat sebuah negara memiliki tingkat impulsivitas belanja yang sangat tinggi yang ditopang oleh utang konsumtif?",
        "options": [
            "A. Meningkatnya ketahanan ekonomi nasional terhadap krisis keuangan global karena perputaran uang cepat",
            "B. Terjadinya gelembung ekonomi (economic bubble) dan tingginya tingkat kepailitan personal yang merusak stabilitas sektor keuangan negara",
            "C. Pemerintah akan menghapuskan seluruh sistem perpajakan untuk merangsang pertumbuhan daya beli masyarakat"
        ],
        "correctIndex": 1,
        "educationalFact": "Fun fact! Pengendalian konsumsi tingkat lanjut melibatkan perhitungan analisis Indifference Curve (Kurva Indiferen) dan Budget Constraint (Garis Kendala Anggaran). Pengetahuan teknis ini membuktikan bahwa kombinasi konsumsi yang optimal bagi seorang individu tercapai secara ilmiah tepat pada titik singgung antara tingkat kepuasan subjektif maksimum yang diinginkan dengan batas kemampuan finansial riil objektif yang tercermin dari pendapatan merek"
    },
    {
        "level": "HARD",
        "subBab": 2,
        "questionText": "Bagaimana prinsip Lifestyle Inflation bekerja secara negatif pada seseorang yang mendapatkan bonus kenaikan jabatan dengan tunjangan yang besar?",
        "options": [
            "A. Perusahaan secara otomatis memotong tabungan karyawan untuk dialokasikan ke pos asuransi jiwa tambahan",
            "B. Keinginan untuk menyamai standar visual rekan kerja selevel membuat pengeluaran naik lebih cepat atau sama dengan kenaikan pendapatan baru",
            "C. Nilai pajak yang harus dibayarkan menjadi lebih kecil akibat adanya insentif pengeluaran konsumsi mewah dari kantor"
        ],
        "correctIndex": 1,
        "educationalFact": "Money Fact! Untuk memitigasi distorsi psikologis saat berbelanja, investor institusi dan perencana keuangan menggunakan teknik analisis Utility Maximization. Sebelum melakukan transaksi besar, mereka secara teknis membuat matriks penilaian kuantitatif untuk menguji apakah utilitas (daya guna) marjinal per rupiah yang dikeluarkan untuk barang tersebut benar-benar menghasilkan efisiensi operasi atau peningkatan produktivitas yang sebanding bagi kehidupan merek"
    },
    {
        "level": "HARD",
        "subBab": 2,
        "questionText": "Seseorang yang mempraktikkan gaya hidup Frugal Living sejati akan memandang sebuah pengeluaran berdasarkan konsep...",
        "options": [
            "A. Harga termurah yang ada di pasar tanpa memedulikan kualitas barang yang dibeli",
            "B. Nilai fungsi maksimal, efisiensi jangka panjang, dan dampak pengeluaran terhadap tujuan keuangan masa depannya",
            "C. Penolakan total terhadap segala bentuk kemajuan teknologi modern yang membutuhkan biaya perawatan"
        ],
        "correctIndex": 1,
        "educationalFact": "Tahukah kalian? Perilaku belanja impulsif masyarakat modern secara mendalam dipelajari dalam Behavioral Economics (Ekonomi Perilaku) melalui konsep Intertemporal Choice (Pilihan Antarwaktu) dan Hyperbolic Discounting (Diskon Hiperbolis). Teori ini membuktikan secara ilmiah bahwa otak manusia memiliki bias kognitif inheren yang menilai penghargaan kecil yang didapatkan saat ini jauh lebih berharga daripada penghargaan yang jauh lebih besar namun baru didapatkan di masa depan. Itulah mengapa menabung terasa berat sementara belanja terasa sangat mudah."
    },
    {
        "level": "HARD",
        "subBab": 2,
        "questionText": "Manakah dari strategi berikut yang paling efektif untuk memutus siklus kecanduan belanja online (retail therapy) akibat stres kerja?",
        "options": [
            "A. Menemukan akar penyebab stres, menghapus data kartu kredit/e-wallet dari aplikasi, dan mengalihkan koping stres ke aktivitas non-finansial",
            "B. Mengalihkan belanja barang fisik ke pembelian aset kripto berisiko tinggi setiap kali merasakan tekanan pekerjaan di kantor",
            "C. Meminta kenaikan limit kartu kredit kepada bank agar batas belanja menjadi lebih longgar dan tidak cepat habis"
        ],
        "correctIndex": 0,
        "educationalFact": "Fakta menarik! Dalam dunia ritel modern, penataan tata letak (layout) toko swalayan didasarkan pada riset analisis perilaku konsumen yang sangat teknis. Barang-barang kebutuhan pokok harian (seperti susu dan telur) selalu diletakkan di area paling belakang toko, sengaja memaksa konsumen berjalan melewati lorong-lorong penuh produk sekunder yang ditata estetik demi memicu impulse buying di sepanjang jalan menuju kasir."
    },
    {
        "level": "HARD",
        "subBab": 3,
        "questionText": "Analisis laporan keuangan pribadi menunjukkan: Pendapatan Rp10.000.000, Pengeluaran Tetap Rp4.000.000, Pengeluaran Variabel Rp5.000.000, Cicilan Utang Produktif KPR Rp2.000.000. Berapakah rasio kemampuan membayar utang (Debt Service Ratio) orang tersebut, dan bagaimana kondisinya?",
        "options": [
            "A. 10%; kondisi sangat aman dan sehat untuk menambah utang baru",
            "B. 20%; kondisi aman karena total cicilan utang masih di bawah batas maksimal 30% dari total pendapatan bulanan",
            "C. 40%; kondisi kritis karena total pengeluaran gabungan sudah melebihi batas kemampuan finansial bersih"
        ],
        "correctIndex": 1,
        "educationalFact": "Tahukah kalian? Mengapa pencatatan keuangan harian secara visual sangat krusial bagi stabilitas ekonomi makro? Berdasarkan kerangka akademik Behavioral Life-Cycle Hypothesis yang dirumuskan oleh Hersh Shefrin dan Richard Thaler, manusia membutuhkan alat bantu eksternal (external control mechanisms) berupa catatan terstruktur untuk mengatasi kelemahan tekad internal (willpower). Catatan keuangan bertindak sebagai jangkar kognitif yang membatasi pengeluaran irasional secara sistematis."
    },
    {
        "level": "HARD",
        "subBab": 3,
        "questionText": "Mengapa metode pencatatan arus kas berbasis akrual (Accrual Basis) kurang disarankan untuk pengelolaan keuangan pribadi harian dibandingkan metode kas (Cash Basis)?",
        "options": [
            "A. Metode akrual dilarang oleh Ikatan Akuntan Indonesia untuk digunakan oleh individu non-korporasi",
            "B. Metode akrual mencatat pendapatan/beban saat terjadi transaksi bukan saat uang tunai diterima, berisiko memicu ilusi saldo tunai yang aman",
            "C. Metode kas memberikan perhitungan bunga berbunga secara otomatis di dalam lembar kerja spreadsheet pribadi"
        ],
        "correctIndex": 1,
        "educationalFact": "Fakta menarik! Dalam analisis laporan keuangan lanjutan, dikenal istilah Net Cash Flow-to-Income Ratio. Studi empiris dalam Journal of Financial Planning menunjukkan bahwa individu yang mampu menjaga rasio arus kas bersih positif di atas 15% secara konsisten sepanjang siklus ekonomi makro memiliki probabilitas kesuksesan investasi jangka panjang 4,2 kali lebih tinggi karena kestabilan likuiditas modal merek"
    },
    {
        "level": "HARD",
        "subBab": 3,
        "questionText": "Seseorang memiliki arus kas bulanan yang surplus tinggi, namun aset likuidnya hampir nol karena seluruh sisa uang langsung dikunci ke dalam bentuk investasi tanah kavling di daerah terpencil. Masalah struktural keuangan apa yang sedang dihadapi orang ini?",
        "options": [
            "A. Kebangkrutan personal akibat salah memilih sektor investasi daerah",
            "B. Risiko likuiditas yang parah (poor liquidity asset allocation), membuat posisi keuangannya rentan jika terjadi guncangan darurat mendasar",
            "C. Pelanggaran terhadap undang-undang pembatasan kepemilikan aset riil oleh masyarakat sipil"
        ],
        "correctIndex": 1,
        "educationalFact": "Money Fact! Untuk melakukan diagnosis mendalam terhadap kebocoran keuangan, perencana keuangan profesional menggunakan analisis varians (Variance Analysis) bulanan. Pengguna membandingkan secara kuantitatif antara anggaran yang direncanakan di awal bulan (Budgeted) dengan pengeluaran riil yang tercatat (Actual). Jika varians negatif pada pos variabel melebihi deviasi standar 10%, maka sistem otomatis mendeteksi adanya kegagalan struktural dalam pengendalian perilaku konsumsi individu."
    },
    {
        "level": "HARD",
        "subBab": 3,
        "questionText": "Bagaimana cara menyusun anggaran menggunakan metode Envelope System (Sistem Amplop) yang terintegrasi di era ekosistem perbankan digital tanpa tunai (cashless) saat ini?",
        "options": [
            "A. Mencetak seluruh uang gaji menjadi uang tunai fisik lalu menyimpannya di bawah kasur kamar tidur",
            "B. Memanfaatkan fitur \"Kantong Digital\" atau sub-rekening virtual yang disediakan oleh aplikasi bank digital resmi untuk memisahkan dana per pos",
            "C. Membuat banyak akun e-wallet menggunakan identitas anggota keluarga yang berbeda-beda untuk membagi limit belanja"
        ],
        "correctIndex": 1,
        "educationalFact": "Tahukah kalian? Mengapa pencatatan keuangan harian secara visual sangat krusial bagi stabilitas ekonomi makro? Berdasarkan kerangka akademik Behavioral Life-Cycle Hypothesis yang dirumuskan oleh Hersh Shefrin dan Richard Thaler, manusia membutuhkan alat bantu eksternal (external control mechanisms) berupa catatan terstruktur untuk mengatasi kelemahan tekad internal (willpower). Catatan keuangan bertindak sebagai jangkar kognitif yang membatasi pengeluaran irasional secara sistematis."
    },
    {
        "level": "HARD",
        "subBab": 3,
        "questionText": "Jika pengeluaran variabel seseorang terus meningkat akibat inflasi riil yang dirasakan pada harga bahan pangan pokok, penyesuaian arsitektur arus kas strategis apa yang harus dilakukan tanpa mengorbankan pos tabungan masa depan?",
        "options": [
            "A. Melakukan substitusi merek barang konsumsi ke alternatif yang lebih ekonomis dan memotong pos pengeluaran gaya hidup (hiburan/tersier)",
            "B. Mengurangi atau menghentikan sementara kontribusi premi asuransi kesehatan keluarga untuk menutupi biaya makan harian",
            "C. Mengambil pinjaman tanpa bunga dari kerabat dekat untuk mempertahankan standar kualitas konsumsi makanan mewah yang lama"
        ],
        "correctIndex": 0,
        "educationalFact": "Fakta menarik! Dalam analisis laporan keuangan lanjutan, dikenal istilah Net Cash Flow-to-Income Ratio. Studi empiris dalam Journal of Financial Planning menunjukkan bahwa individu yang mampu menjaga rasio arus kas bersih positif di atas 15% secara konsisten sepanjang siklus ekonomi makro memiliki probabilitas kesuksesan investasi jangka panjang 4,2 kali lebih tinggi karena kestabilan likuiditas modal merek"
    },
    {
        "level": "HARD",
        "subBab": 3,
        "questionText": "Analisis Kebocoran Halus (Latent Expenses): Seorang karyawan membeli kopi susu kekinian seharga Rp25.000 setiap hari kerja (22 hari per bulan) dan membayar biaya langganan aplikasi keanggotaan gym sebesar Rp400.000 per bulan yang hanya didatangi sekali dalam sebulan. Berapa total dana menguap sia-sia yang sebenarnya bisa dialokasikan ke pos investasi dalam setahun?",
        "options": [
            "A. Rp6.600.000",
            "B. Rp4.800.000",
            "C. Rp11.400.000"
        ],
        "correctIndex": 2,
        "educationalFact": "Money Fact! Untuk melakukan diagnosis mendalam terhadap kebocoran keuangan, perencana keuangan profesional menggunakan analisis varians (Variance Analysis) bulanan. Pengguna membandingkan secara kuantitatif antara anggaran yang direncanakan di awal bulan (Budgeted) dengan pengeluaran riil yang tercatat (Actual). Jika varians negatif pada pos variabel melebihi deviasi standar 10%, maka sistem otomatis mendeteksi adanya kegagalan struktural dalam pengendalian perilaku konsumsi individu."
    },
    {
        "level": "HARD",
        "subBab": 3,
        "questionText": "Bagaimana konsep dasar dari penganggaran Pay Yourself First (Bayar Diri Sendiri Terlebih Dahulu) membalik paradigma penganggaran tradisional yang sering gagal?",
        "options": [
            "A. Mengalokasikan persentase tetap untuk tabungan/investasi di awal segera setelah menerima pendapatan, baru sisa uangnya digunakan untuk pengeluaran hidup",
            "B. Menghabiskan seluruh gaji untuk membeli barang keinginan di awal bulan sebagai bentuk penghargaan diri, lalu mengandalkan utang untuk bertahan hidup",
            "C. Mengajukan permohonan pembebasan pajak penghasilan kepada kantor pajak di awal tahun operasional kerja"
        ],
        "correctIndex": 0,
        "educationalFact": "Tahukah kalian? Mengapa pencatatan keuangan harian secara visual sangat krusial bagi stabilitas ekonomi makro? Berdasarkan kerangka akademik Behavioral Life-Cycle Hypothesis yang dirumuskan oleh Hersh Shefrin dan Richard Thaler, manusia membutuhkan alat bantu eksternal (external control mechanisms) berupa catatan terstruktur untuk mengatasi kelemahan tekad internal (willpower). Catatan keuangan bertindak sebagai jangkar kognitif yang membatasi pengeluaran irasional secara sistematis."
    },
    {
        "level": "HARD",
        "subBab": 3,
        "questionText": "Seseorang yang memiliki usaha katering rumahan sering kali mencampur rekening operasional bisnis dengan rekening belanja rumah tangga pribadinya. Apa dampak jangka panjang paling fatal dari tindakan pencampuran arus kas ini?",
        "options": [
            "A. Pemilik usaha akan dikenakan sanksi denda administrasi tingkat tinggi oleh Bank Indonesia",
            "B. Ketidakjelasan perhitungan profitabilitas riil bisnis, potensi modal usaha terpakai untuk konsumsi pribadi, memicu kebangkrutan usaha",
            "C. Bank akan memblokir otomatis seluruh akses transaksi keluar masuk uang karena dianggap ilegal"
        ],
        "correctIndex": 1,
        "educationalFact": "Fakta menarik! Dalam analisis laporan keuangan lanjutan, dikenal istilah Net Cash Flow-to-Income Ratio. Studi empiris dalam Journal of Financial Planning menunjukkan bahwa individu yang mampu menjaga rasio arus kas bersih positif di atas 15% secara konsisten sepanjang siklus ekonomi makro memiliki probabilitas kesuksesan investasi jangka panjang 4,2 kali lebih tinggi karena kestabilan likuiditas modal merek"
    },
    {
        "level": "HARD",
        "subBab": 3,
        "questionText": "Dalam menyusun perencanaan arus kas masa pensiun, mengapa kita harus memperhitungkan faktor Safe Withdrawal Rate (Tingkat Penarikan Aman) dari total portofolio aset yang dimiliki?",
        "options": [
            "A. Memastikan jumlah dana yang diambil setiap tahun tidak menghabiskan pokok modal investasi terlalu cepat sebelum usia harapan hidup berakhir",
            "B. Menghitung besarnya biaya administrasi penarikan tunai yang dikenakan oleh agen reksa dana internasional",
            "C. Menyesuaikan nilai penarikan dengan batas limit penarikan harian di mesin ATM bank lokal"
        ],
        "correctIndex": 0,
        "educationalFact": "Money Fact! Untuk melakukan diagnosis mendalam terhadap kebocoran keuangan, perencana keuangan profesional menggunakan analisis varians (Variance Analysis) bulanan. Pengguna membandingkan secara kuantitatif antara anggaran yang direncanakan di awal bulan (Budgeted) dengan pengeluaran riil yang tercatat (Actual). Jika varians negatif pada pos variabel melebihi deviasi standar 10%, maka sistem otomatis mendeteksi adanya kegagalan struktural dalam pengendalian perilaku konsumsi individu."
    },
    {
        "level": "HARD",
        "subBab": 3,
        "questionText": "Apa interpretasi finansial dari nilai Savings Rate (Tingkat Tabungan) sebesar 40% dari total pendapatan kotor pada seorang pekerja muda lajang?",
        "options": [
            "A. Pekerja tersebut mengalami masalah kepelitan ekstrem yang mengganggu kualitas kesehatan fisiknya",
            "B. Posisi keuangan sangat prima dan memiliki akselerasi tinggi menuju pencapaian kebebasan finansial jangka panjang jika dialokasikan ke aset produktif",
            "C. Pekerja tersebut melakukan pelanggaran terhadap batas minimal konsumsi yang ditetapkan oleh kementerian ekonomi  Sub Bab"
        ],
        "correctIndex": 1,
        "educationalFact": "Tahukah kalian? Mengapa pencatatan keuangan harian secara visual sangat krusial bagi stabilitas ekonomi makro? Berdasarkan kerangka akademik Behavioral Life-Cycle Hypothesis yang dirumuskan oleh Hersh Shefrin dan Richard Thaler, manusia membutuhkan alat bantu eksternal (external control mechanisms) berupa catatan terstruktur untuk mengatasi kelemahan tekad internal (willpower). Catatan keuangan bertindak sebagai jangkar kognitif yang membatasi pengeluaran irasional secara sistematis."
    },
    {
        "level": "HARD",
        "subBab": 4,
        "questionText": "Mengapa tingkat inflasi medis (biaya rumah sakit dan obat-obatan) di Indonesia umumnya jauh lebih tinggi dibandingkan inflasi umum nasional?",
        "options": [
            "A. Karena rumah sakit swasta di Indonesia tidak tunduk pada aturan hukum OJK",
            "B. Adanya faktor ketergantungan impor alat medis, bahan baku obat, perkembangan teknologi kedokteran mahal, serta perubahan demografi pasien",
            "C. Pemerintah sengaja menaikkan biaya medis agar masyarakat beralih menggunakan pengobatan alternatif tradisional"
        ],
        "correctIndex": 1,
        "educationalFact": "Fakta menarik! Dalam kondisi ekonomi makro yang ekstrem, bisa terjadi fenomena Hyperinflation (hiperinflasi), di mana tingkat inflasi melonjak di atas 50% dalam waktu satu bulan. Kasus historis terkenal terjadi di Zimbabwe dan Venezuela, di mana bank sentral kehilangan kendali moneter sehingga mata uang lokal kehilangan nilainya secara mutlak, memaksa masyarakat bertransaksi menggunakan sistem barter atau mata uang asing yang stabil."
    },
    {
        "level": "HARD",
        "subBab": 4,
        "questionText": "Bagaimana mekanisme instrumen Surat Berharga Negara (SBN) jenis Sukuk Ritel (SR) memberikan perlindungan terhadap daya beli investor ketika terjadi kenaikan laju inflasi domestik?",
        "options": [
            "A. Nilai pokok investasi SR otomatis akan digandakan oleh pemerintah saat inflasi menyentuh angka dua digit",
            "B. Memberikan imbal hasil kupon tetap (fixed rate) yang umumnya didesain sejak awal berada di atas proyeksi laju inflasi rata-rata nasional",
            "C. Kupon SR dibayarkan dalam mata uang asing berkurs kuat seperti USD sehingga bebas dari depresiasi nilai rupiah"
        ],
        "correctIndex": 1,
        "educationalFact": "Fun fact! Struktur portofolio kelembagaan tingkat lanjut untuk melawan inflasi menerapkan strategi alokasi aset taktis (Tactical Asset Allocation). Pengetahuan teknis ini mengalihkan bobot investasi ke dalam instrumen yang memiliki korelasi positif tinggi terhadap inflasi, seperti komoditas energi, infrastruktur riil, atau Surat Berharga Negara berbasis syariah (Sukuk Tabungan) yang memiliki fitur kupon mengambang dengan batasan minimal (floating with floor)."
    },
    {
        "level": "HARD",
        "subBab": 4,
        "questionText": "Seseorang menaruh modal Rp500.000.000 pada instrumen Reksa Dana Saham. Setelah 5 tahun, investasinya tumbuh menjadi Rp750.000.000. Pada periode yang sama, total akumulasi inflasi adalah 20%. Berapa persentase keuntungan riil bersih setelah disesuaikan dengan inflasi?",
        "options": [
            "A. 50%",
            "B. 25%",
            "C. 30%"
        ],
        "correctIndex": 1,
        "educationalFact": "Money Fact! Dalam analisis laporan keuangan korporat dan personal tingkat lanjut, digunakan metode penyesuaian yang disebut Inflation Accounting (Akuntansi Inflasi). Teknik ini secara teknis menyajikan kembali nilai buku dari aset tetap (fixed assets) dan biaya penyusutan berdasarkan nilai biaya penggantian saat ini (current cost) guna menghindari distorsi pelaporan keuangan yang terlalu optimis akibat penurunan daya beli mata uang pembuat laporan."
    },
    {
        "level": "HARD",
        "subBab": 4,
        "questionText": "Dalam kondisi ekonomi yang mengalami Stagflasi, alokasi aset investasi mana yang cenderung paling tangguh bertahan?",
        "options": [
            "A. Saham-saham perusahaan sektor teknologi pertumbuhan dan industri otomotif mewah",
            "B. Emas batangan, komoditas energi pokok, dan surat utang negara dengan kupon mengambang (floating rate)",
            "C. Tabungan jangka panjang di bank konvensional dan investasi properti apartemen mewah"
        ],
        "correctIndex": 1,
        "educationalFact": "Fakta menarik! Dalam kondisi ekonomi makro yang ekstrem, bisa terjadi fenomena Hyperinflation (hiperinflasi), di mana tingkat inflasi melonjak di atas 50% dalam waktu satu bulan. Kasus historis terkenal terjadi di Zimbabwe dan Venezuela, di mana bank sentral kehilangan kendali moneter sehingga mata uang lokal kehilangan nilainya secara mutlak, memaksa masyarakat bertransaksi menggunakan sistem barter atau mata uang asing yang stabil."
    },
    {
        "level": "HARD",
        "subBab": 4,
        "questionText": "Mengapa strategi Rebalancing Portofolio secara berkala sangat krusial dalam manajemen investasi jangka panjang melawan inflasi?",
        "options": [
            "A. Mengembalikan porsi alokasi aset ke target awal setelah terjadinya perubahan nilai akibat fluktuasi pasar, mengontrol risiko sekaligus mengunci keuntungan",
            "B. Memastikan bahwa investor selalu membeli aset yang sedang viral di media sosial setiap bulannya",
            "C. Menghindari pengenaan pajak capital gain dari bursa efek Indonesia untuk investasi mikro"
        ],
        "correctIndex": 0,
        "educationalFact": "Fun fact! Struktur portofolio kelembagaan tingkat lanjut untuk melawan inflasi menerapkan strategi alokasi aset taktis (Tactical Asset Allocation). Pengetahuan teknis ini mengalihkan bobot investasi ke dalam instrumen yang memiliki korelasi positif tinggi terhadap inflasi, seperti komoditas energi, infrastruktur riil, atau Surat Berharga Negara berbasis syariah (Sukuk Tabungan) yang memiliki fitur kupon mengambang dengan batasan minimal (floating with floor)."
    },
    {
        "level": "HARD",
        "subBab": 4,
        "questionText": "Apa yang dimaksud dengan konsep Real Interest Rate (Suku Bunga Riil) negatif, dan apa dampaknya bagi masyarakat penabung kelas menengah?",
        "options": [
            "A. Suku bunga bank yang nilainya berada di bawah angka nol persen akibat kebijakan pemotongan saldo sepihak oleh direksi bank",
            "B. Kondisi di mana tingkat inflasi lebih tinggi daripada suku bunga tabungan/deposito nominal, secara sistematis mengurangi daya beli uang penabung",
            "C. Nilai bunga pinjaman online yang melanggar aturan batas atas aman yang ditetapkan oleh OJK dan Asosiasi Fintech"
        ],
        "correctIndex": 1,
        "educationalFact": "Money Fact! Dalam analisis laporan keuangan korporat dan personal tingkat lanjut, digunakan metode penyesuaian yang disebut Inflation Accounting (Akuntansi Inflasi). Teknik ini secara teknis menyajikan kembali nilai buku dari aset tetap (fixed assets) dan biaya penyusutan berdasarkan nilai biaya penggantian saat ini (current cost) guna menghindari distorsi pelaporan keuangan yang terlalu optimis akibat penurunan daya beli mata uang pembuat laporan."
    },
    {
        "level": "HARD",
        "subBab": 4,
        "questionText": "Bagaimana pengaruh depresiasi nilai tukar rupiah terhadap dolar AS (USD) terhadap laju inflasi dalam negeri?",
        "options": [
            "A. Menurunkan harga barang-barang elektronik impor karena nilai dolar melemah di pasar lokal",
            "B. Menaikkan biaya produksi industri dalam negeri yang menggunakan bahan baku impor, memicu kenaikan harga jual produk ke konsumen",
            "C. Membuat bank-bank dalam negeri menurunkan suku bunga kredit untuk merangsang pinjaman usaha baru"
        ],
        "correctIndex": 1,
        "educationalFact": "Fakta menarik! Dalam kondisi ekonomi makro yang ekstrem, bisa terjadi fenomena Hyperinflation (hiperinflasi), di mana tingkat inflasi melonjak di atas 50% dalam waktu satu bulan. Kasus historis terkenal terjadi di Zimbabwe dan Venezuela, di mana bank sentral kehilangan kendali moneter sehingga mata uang lokal kehilangan nilainya secara mutlak, memaksa masyarakat bertransaksi menggunakan sistem barter atau mata uang asing yang stabil."
    },
    {
        "level": "HARD",
        "subBab": 4,
        "questionText": "Mengapa investasi langsung pada saham individu membutuhkan tingkat literasi dan analisis yang jauh lebih tinggi daripada membeli Reksa Dana Saham?",
        "options": [
            "A. Investor saham individu harus menganalisis laporan keuangan perusahaan, prospek industri, dan mengelola diversifikasi portofolionya secara mandiri",
            "B. Investasi reksa dana saham dijamin 100% pasti untung oleh manajer investasi tanpa ada risiko penurunan nilai aset",
            "C. Bursa Efek Indonesia mengenakan biaya keanggotaan tahunan yang sangat mahal khusus untuk investor saham individu ritel"
        ],
        "correctIndex": 0,
        "educationalFact": "Fun fact! Struktur portofolio kelembagaan tingkat lanjut untuk melawan inflasi menerapkan strategi alokasi aset taktis (Tactical Asset Allocation). Pengetahuan teknis ini mengalihkan bobot investasi ke dalam instrumen yang memiliki korelasi positif tinggi terhadap inflasi, seperti komoditas energi, infrastruktur riil, atau Surat Berharga Negara berbasis syariah (Sukuk Tabungan) yang memiliki fitur kupon mengambang dengan batasan minimal (floating with floor)."
    },
    {
        "level": "HARD",
        "subBab": 4,
        "questionText": "Apa risiko terbesar dari strategi investasi properti berupa bangunan rumah kos-kosan sebagai tameng perlindungan terhadap laju inflasi jangka panjang?",
        "options": [
            "A. Rumah kos tidak diakui sebagai aset kekayaan bersih yang sah oleh sistem perbankan nasional Indonesia",
            "B. Adanya biaya perawatan fisik (maintenance cost), risiko kekosongan penyewa, serta sifat aset yang tidak likuid saat membutuhkan dana cepat",
            "C. Nilai sewa kos-kosan diatur ketat oleh Bank Indonesia tidak boleh naik melebihi inflasi tahunan daerah"
        ],
        "correctIndex": 1,
        "educationalFact": "Money Fact! Dalam analisis laporan keuangan korporat dan personal tingkat lanjut, digunakan metode penyesuaian yang disebut Inflation Accounting (Akuntansi Inflasi). Teknik ini secara teknis menyajikan kembali nilai buku dari aset tetap (fixed assets) dan biaya penyusutan berdasarkan nilai biaya penggantian saat ini (current cost) guna menghindari distorsi pelaporan keuangan yang terlalu optimis akibat penurunan daya beli mata uang pembuat laporan."
    },
    {
        "level": "HARD",
        "subBab": 4,
        "questionText": "Konsep keuangan Time Value of Money menyatakan bahwa satu rupiah hari ini lebih berharga daripada satu rupiah di masa depan. Faktor utama apakah yang mendasari konsep ini?",
        "options": [
            "A. Adanya faktor inflasi yang menggerus daya beli uang serta adanya potensi peluang imbal hasil jika uang tersebut diinvestasikan",
            "B. Aturan hukum tata negara yang menyatakan mata uang lama akan otomatis ditarik dari peredaran pasar ritel",
            "C. Kecenderungan masyarakat dunia yang semakin menyukai transaksi digital non-tunai di masa depan"
        ],
        "correctIndex": 0,
        "educationalFact": "Fakta menarik! Dalam kondisi ekonomi makro yang ekstrem, bisa terjadi fenomena Hyperinflation (hiperinflasi), di mana tingkat inflasi melonjak di atas 50% dalam waktu satu bulan. Kasus historis terkenal terjadi di Zimbabwe dan Venezuela, di mana bank sentral kehilangan kendali moneter sehingga mata uang lokal kehilangan nilainya secara mutlak, memaksa masyarakat bertransaksi menggunakan sistem barter atau mata uang asing yang stabil."
    },
    {
        "level": "HARD",
        "subBab": 5,
        "questionText": "Seorang investor pemula mengalami Loss Aversion Bias yang parah. Bagaimana bias psikologi ini memengaruhi keputusan investasinya saat pasar saham mengalami koreksi wajar?",
        "options": [
            "A. Dia akan langsung membeli lebih banyak saham yang turun tanpa melakukan analisis fundamental lanjutan",
            "B. Menolak menjual saham yang kinerjanya memburuk karena takut merealisasikan kerugian, memicu potensi kerugian yang jauh lebih besar di masa depan",
            "C. Memindahkan seluruh investasinya ke dalam bentuk tabungan tunai di bank asing tanpa memedulikan biaya administrasi"
        ],
        "correctIndex": 1,
        "educationalFact": "Tahukah kalian? Ketidakmampuan seseorang menghentikan gaya hidup konsumtif meskipun pendapatannya sudah meningkat drastis dijelaskan secara ilmiah melalui konsep psikologi ekonomi tingkat lanjut yang disebut Hedonic Treadmill (Injak-injak Hedonis). Teori ini menyatakan bahwa manusia memiliki tingkat kepuasan dasar yang statis; ketika terjadi peningkatan materi (seperti kenaikan jabatan), tingkat kebahagiaan akan melonjak sesaat, namun otak segera beradaptasi secara neurobiologis dan menuntut standar konsumsi yang lebih tinggi lagi untuk mendapatkan sensasi kebahagiaan yang sama, menjebak individu dalam spiral tanpa akhir."
    },
    {
        "level": "HARD",
        "subBab": 5,
        "questionText": "Bagaimana fenomena Diderot Effect bekerja merusak anggaran keuangan seseorang setelah dia membeli sebuah barang baru yang mahal?",
        "options": [
            "A. Munculnya tekanan psikologis untuk membeli barang-barang pelengkap baru yang mewah agar setara dengan keindahan barang tersebut, memicu pengeluaran berantai",
            "B. Ketakutan berlebih barang tersebut akan hilang dicuri orang membuat pemiliknya menguras dana darurat untuk membeli sistem keamanan canggih",
            "C. Keinginan instan untuk menjual kembali barang tersebut dengan harga murah karena merasa bersalah telah menghabiskan banyak tabungan"
        ],
        "correctIndex": 0,
        "educationalFact": "Fakta menarik! Studi neuroekonomi menggunakan pemindaian fMRI (functional Magnetic Resonance Imaging) menunjukkan bahwa penolakan sosial atau perasaan tertinggal dari kelompok (efek FOMO) mengaktifkan wilayah otak bernama anterior cingulate cortex, yaitu area saraf yang sama yang memproses rasa sakit fisik secara aktual. Secara biologis, menahan tekanan sosial untuk tidak ikut bergaya hidup mewah memang memicu rasa sakit nyata dalam sistem saraf manusi"
    },
    {
        "level": "HARD",
        "subBab": 5,
        "questionText": "Seseorang rela mengambil utang jangka panjang demi bisa bergabung dengan komunitas motor mahal. Berdasarkan sosiologi keuangan, tindakan ini digerakkan oleh...",
        "options": [
            "A. Analisis biaya manfaat produktif jangka panjang untuk masa depan",
            "B. Kebutuhan ekstrem akan pengakuan kelompok (Herd Behavior) dan ketakutan dikucilkan secara sosial (Social Exclusion)",
            "C. Strategi diversifikasi portofolio aset riil"
        ],
        "correctIndex": 1,
        "educationalFact": "Fun fact! Strategi intervensi teknis untuk meredam bias psikologis destruktif ini dalam portfolio korporasi personal adalah menerapkan kerangka Pre-commitment Devices (Gawai Pra-Komitmen). Seseorang secara teknis mengunci arus kasnya ke dalam instrumen investasi berbasis autodebit otomatis terkunci jangka panjang (seperti reksa dana saham berjangka atau instrumen anuitas yang tidak bisa dicairkan sebelum jatuh tempo) tepat pada hari gajian, secara paksa menghilangkan likuiditas longgar sebelum sempat dieksploitasi oleh bias FOMO."
    },
    {
        "level": "HARD",
        "subBab": 5,
        "questionText": "Bagaimana konsep psikologi keuangan Anchoring Effect menjebak konsumen saat melihat label harga tercoret?",
        "options": [
            "A. Konsumen langsung mengetahui kualitas pakaian sudah diturunkan",
            "B. Otak terpaku pada informasi harga pertama sebagai acuan nilai barang, membuat harga baru terasa jauh lebih murah dan menguntungkan",
            "C. Memaksa konsumen melakukan tawar-menawar ulang kepada kasir"
        ],
        "correctIndex": 1,
        "educationalFact": "Tahukah kalian? Ketidakmampuan seseorang menghentikan gaya hidup konsumtif meskipun pendapatannya sudah meningkat drastis dijelaskan secara ilmiah melalui konsep psikologi ekonomi tingkat lanjut yang disebut Hedonic Treadmill (Injak-injak Hedonis). Teori ini menyatakan bahwa manusia memiliki tingkat kepuasan dasar yang statis; ketika terjadi peningkatan materi (seperti kenaikan jabatan), tingkat kebahagiaan akan melonjak sesaat, namun otak segera beradaptasi secara neurobiologis dan menuntut standar konsumsi yang lebih tinggi lagi untuk mendapatkan sensasi kebahagiaan yang sama, menjebak individu dalam spiral tanpa akhir."
    },
    {
        "level": "HARD",
        "subBab": 5,
        "questionText": "Seseorang yang mengidap Financial Denial umumnya menunjukkan perilaku seperti...",
        "options": [
            "A. Menolak memikirkan kondisi keuangan, enggan membuka tagihan utang bulanan, dan berpura-pura masalah keuangannya tidak ada",
            "B. Terlalu pelit ekstrem hingga menolak membelanjakan uang untuk kesehatan",
            "C. Selalu mencurigai institusi perbankan resmi sebagai tempat pencucian uang ilegal"
        ],
        "correctIndex": 0,
        "educationalFact": "Fakta menarik! Studi neuroekonomi menggunakan pemindaian fMRI (functional Magnetic Resonance Imaging) menunjukkan bahwa penolakan sosial atau perasaan tertinggal dari kelompok (efek FOMO) mengaktifkan wilayah otak bernama anterior cingulate cortex, yaitu area saraf yang sama yang memproses rasa sakit fisik secara aktual. Secara biologis, menahan tekanan sosial untuk tidak ikut bergaya hidup mewah memang memicu rasa sakit nyata dalam sistem saraf manusi"
    },
    {
        "level": "HARD",
        "subBab": 5,
        "questionText": "Mengapa memiliki mentalitas Delayed Gratification berkorelasi kuat dengan kesuksesan finansial jangka panjang?",
        "options": [
            "A. Menunda kepuasan membuat seseorang otomatis mendapatkan fasilitas  bebas pajak",
            "B. Kemampuan menahan dorongan emosional jangka pendek memungkinkan modal dialokasikan secara konsisten pada aset produktif yang menghasilkan efek bunga berbunga",
            "C. Orang yang menunda kepuasan cenderung disukai oleh pinjol"
        ],
        "correctIndex": 1,
        "educationalFact": "Fun fact! Strategi intervensi teknis untuk meredam bias psikologis destruktif ini dalam portfolio korporasi personal adalah menerapkan kerangka Pre-commitment Devices (Gawai Pra-Komitmen). Seseorang secara teknis mengunci arus kasnya ke dalam instrumen investasi berbasis autodebit otomatis terkunci jangka panjang (seperti reksa dana saham berjangka atau instrumen anuitas yang tidak bisa dicairkan sebelum jatuh tempo) tepat pada hari gajian, secara paksa menghilangkan likuiditas longgar sebelum sempat dieksploitasi oleh bias FOMO."
    },
    {
        "level": "HARD",
        "subBab": 5,
        "questionText": "Kesalahan psikologi keuangan apa yang dilakukan Kevin ketika membeli jam tangan mewah demi terlihat mapan, tetapi tidak memberi hasil bisnis?",
        "options": [
            "A. Salah memilih merek jam tangan",
            "B. Terjebak bias Value Illusion, menganggap pengeluaran konsumtif untuk status sosial otomatis memberikan imbal hasil komersial secara linear",
            "C. Tidak mendaftarkan jam tangan ke asuransi"
        ],
        "correctIndex": 1,
        "educationalFact": "Tahukah kalian? Ketidakmampuan seseorang menghentikan gaya hidup konsumtif meskipun pendapatannya sudah meningkat drastis dijelaskan secara ilmiah melalui konsep psikologi ekonomi tingkat lanjut yang disebut Hedonic Treadmill (Injak-injak Hedonis). Teori ini menyatakan bahwa manusia memiliki tingkat kepuasan dasar yang statis; ketika terjadi peningkatan materi (seperti kenaikan jabatan), tingkat kebahagiaan akan melonjak sesaat, namun otak segera beradaptasi secara neurobiologis dan menuntut standar konsumsi yang lebih tinggi lagi untuk mendapatkan sensasi kebahagiaan yang sama, menjebak individu dalam spiral tanpa akhir."
    },
    {
        "level": "HARD",
        "subBab": 5,
        "questionText": "Bagaimana media sosial merekayasa Scarcity Principle untuk memicu pembelian impulsif?",
        "options": [
            "A. Menggunakan jargon seperti “Stok Terbatas” atau “Edisi Khusus”, menciptakan urgensi palsu yang melompati proses logika berpikir",
            "B. Menampilkan algoritma iklan hanya di malam hari",
            "C. Mewajibkan verifikasi wajah sebelum transaksi"
        ],
        "correctIndex": 0,
        "educationalFact": "Fakta menarik! Studi neuroekonomi menggunakan pemindaian fMRI (functional Magnetic Resonance Imaging) menunjukkan bahwa penolakan sosial atau perasaan tertinggal dari kelompok (efek FOMO) mengaktifkan wilayah otak bernama anterior cingulate cortex, yaitu area saraf yang sama yang memproses rasa sakit fisik secara aktual. Secara biologis, menahan tekanan sosial untuk tidak ikut bergaya hidup mewah memang memicu rasa sakit nyata dalam sistem saraf manusi"
    },
    {
        "level": "HARD",
        "subBab": 5,
        "questionText": "Apa perbedaan esensial antara “Kaya Riil” (Wealthy) dan “Terlihat Kaya” (Rich)?",
        "options": [
            "A. Rich diukur dari luas jaringan sosial; Wealthy dari jumlah mobil mewah",
            "B. Rich berfokus pada pamer pendapatan saat ini melalui konsumsi visual; Wealthy berfokus pada kepemilikan aset bersih tersembunyi yang memberikan kebebasan waktu",
            "C. Rich dicapai melalui warisan; Wealthy hanya lewat bisnis teknologi"
        ],
        "correctIndex": 1,
        "educationalFact": "Fun fact! Strategi intervensi teknis untuk meredam bias psikologis destruktif ini dalam portfolio korporasi personal adalah menerapkan kerangka Pre-commitment Devices (Gawai Pra-Komitmen). Seseorang secara teknis mengunci arus kasnya ke dalam instrumen investasi berbasis autodebit otomatis terkunci jangka panjang (seperti reksa dana saham berjangka atau instrumen anuitas yang tidak bisa dicairkan sebelum jatuh tempo) tepat pada hari gajian, secara paksa menghilangkan likuiditas longgar sebelum sempat dieksploitasi oleh bias FOMO."
    },
    {
        "level": "HARD",
        "subBab": 5,
        "questionText": "Langkah psikologis terpenting agar kebal dari tekanan sosial gaya hidup minimalis palsu adalah...",
        "options": [
            "A. Membangun kepuasan internal berbasis nilai hidup personal (internal locus of control) dan berhenti mencari validasi eksternal",
            "B. Menutup seluruh akses komunikasi sosial dengan dunia luar",
            "C. Selalu membeli barang bermerek bekas agar tetap terlihat mewah"
        ],
        "correctIndex": 0,
        "educationalFact": "Tahukah kalian? Ketidakmampuan seseorang menghentikan gaya hidup konsumtif meskipun pendapatannya sudah meningkat drastis dijelaskan secara ilmiah melalui konsep psikologi ekonomi tingkat lanjut yang disebut Hedonic Treadmill (Injak-injak Hedonis). Teori ini menyatakan bahwa manusia memiliki tingkat kepuasan dasar yang statis; ketika terjadi peningkatan materi (seperti kenaikan jabatan), tingkat kebahagiaan akan melonjak sesaat, namun otak segera beradaptasi secara neurobiologis dan menuntut standar konsumsi yang lebih tinggi lagi untuk mendapatkan sensasi kebahagiaan yang sama, menjebak individu dalam spiral tanpa akhir."
    },
    {
        "level": "HARD",
        "subBab": 6,
        "questionText": "Analisis Kasus: Maya secara mengejutkan menerima transfer dana sebesar Rp1.200.000 di rekening banknya tanpa pernah merasa mengajukan pinjaman di platform mana pun. Tiga hari kemudian, seseorang dari nomor asing meneror Maya dan menuntut pengembalian dana sebesar Rp2.000.000. Metode kejahatan finansial apa yang sedang terjadi, dan bagaimana mitigasi hukumnya?",
        "options": [
            "A. Metode Transfer Nyasar; Maya harus segera mentransfer balik uang tersebut ke nomor rekening pengirim secepatnya tanpa melibatkan bank",
            "B. Metode Pinjaman Paksa oleh pinjol ilegal; Maya tidak boleh  menggunakan uang tersebut, segera melapor ke bank untuk melacak pengirim, dan membuat laporan kepolisian",
            "C. Metode Bagi Hasil Digital; Maya berhak menggunakan uang tersebut karena dianggap sebagai hadiah undian sistem perbankan yang sah"
        ],
        "correctIndex": 1,
        "educationalFact": "Tahukah kalian? Risiko sistemik kegagalan bayar di dalam platform pinjaman digital (P2P Lending) diukur secara teknis menggunakan indikator makroekonomi resmi yang disebut TWP90 (Tingkat Wanprestasi 90 hari). Indikator ini menghitung persentase kelalaian penyelesaian kewajiban pinjaman yang melewati batas waktu 90 hari sejak tanggal jatuh tempo. Jika angka TWP90 suatu platform berada di atas ambang batas pengawasan OJK sebesar 5%, maka platform tersebut terancam pembatasan kegiatan usaha hingga pencabutan izin operasional."
    },
    {
        "level": "HARD",
        "subBab": 6,
        "questionText": "Dalam konteks ekonomi makro, maraknya lingkaran utang pinjol ilegal yang menjerat masyarakat kelas menengah ke bawah di Indonesia dapat memicu risiko sistemik berupa...",
        "options": [
            "A. Peningkatan drastis pada indeks inklusi keuangan nasional yang ditargetkan oleh Bank Indonesia",
            "B. Penurunan daya beli riil masyarakat akibat pendapatan habis untuk membayar bunga non-produktif, serta peningkatan beban sosial ekonomi negara",
            "C. Kenaikan nilai tukar rupiah terhadap mata uang asing karena tingginya sirkulasi uang digital di masyarakat"
        ],
        "correctIndex": 1,
        "educationalFact": "Fakta menarik! Implikasi hukum bagi nasabah yang melakukan wanprestasi (gagal bayar) di pinjol legal akan tercatat secara otomatis di dalam database terintegrasi milik negara bernama SLIK OJK (Sistem Layanan Informasi Keuangan, yang dahulu dikenal sebagai BI Checking). Catatan hitam yang berstatus kolektibilitas buruk ini akan mengakibatkan skor kredit personal individu tersebut hancur secara sistemik, menutup seluruh akses mereka untuk mengajukan Kredit Pemilikan Rumah (KPR), kredit kendaraan, atau modal usaha di seluruh lembaga perbankan resmi se-Indonesi"
    },
    {
        "level": "HARD",
        "subBab": 6,
        "questionText": "Sesuai dengan kesepakatan asosiasi (AFPI) yang diawasi oleh OJK, batas maksimal total biaya pinjaman harian (termasuk bunga dan admin) untuk jenis pinjaman konsumtif jangka pendek adalah...",
        "options": [
            "A. 0,3% per hari",
            "B. 2% per hari",
            "C. 5% per hari"
        ],
        "correctIndex": 0,
        "educationalFact": "Fun fact! Penegakan hukum terhadap ekosistem pinjol ilegal dilakukan secara lintas sektoral oleh wadah resmi bentukan pemerintah bernama Satgas Pasti (Satuan Tugas Pemberantasan Aktivitas Keuangan Ilegal, yang dahulu bernama Satgas Waspada Investasi). Wadah gabungan ini terdiri dari OJK, Bank Indonesia, Kementerian Kominfo, Kejaksaan Agung, hingga Kepolisian RI yang memiliki wewenang teknis melakukan pemblokiran aplikasi, penutupan rekening bank penampung dana ilegal, hingga penangkapan aktor intelektual di balik jaringan fintech ilegal."
    },
    {
        "level": "HARD",
        "subBab": 6,
        "questionText": "Perhatikan dokumen kontrak digital sebuah aplikasi pinjaman. Terdapat klausul tersembunyi yang menyatakan: \"Perusahaan berhak mengubah skema biaya denda keterlambatan sewaktu-waktu tanpa pemberitahuan tertulis kepada pengguna.\"",
        "options": [
            "A. Benar",
            "B. Salah",
            "C. Tidak Tahu"
        ],
        "correctIndex": 0,
        "educationalFact": "Money Fact! Sebelum menandatangani perjanjian pinjaman digital secara elektronik, konsumen secara teknis berhak menerima dokumen hukum terstandarisasi yang disebut Product Disclosure Statement (Lembar Fakta Produk). Dokumen teknis ini wajib menguraikan secara eksplisit mengenai komponen biaya yang sering disembunyikan oleh oknum penipu, seperti biaya originasi (origination fees), biaya platform, denda keterlambatan berjenjang, hingga mekanisme penyelesaian sengketa melalui Lembaga Alternatif Penyelesaian Sengketa Sektor Jasa Keuangan (LAPS SJK) jika terjadi perselisihan di kemudian hari."
    },
    {
        "level": "HARD",
        "subBab": 6,
        "questionText": "Berdasarkan regulasi perlindungan konsumen OJK (UU Jasa Keuangan), klausul ini dikategorikan sebagai...",
        "options": [
            "A. Klausula Baku yang dilarang karena mengandung unsur ketidakseimbangan hak dan kewajiban yang merugikan konsumen",
            "B. Klausula Fleksibel Komersial yang sah demi mengantisipasi volatilitas tingkat suku bunga pasar moneter",
            "C. Klausula Opsional yang otomatis menjadi legal jika nasabah sudah mencentang kotak persetujuan syarat dan ketentuan"
        ],
        "correctIndex": 1,
        "educationalFact": "Tahukah kalian? Risiko sistemik kegagalan bayar di dalam platform pinjaman digital (P2P Lending) diukur secara teknis menggunakan indikator makroekonomi resmi yang disebut TWP90 (Tingkat Wanprestasi 90 hari). Indikator ini menghitung persentase kelalaian penyelesaian kewajiban pinjaman yang melewati batas waktu 90 hari sejak tanggal jatuh tempo. Jika angka TWP90 suatu platform berada di atas ambang batas pengawasan OJK sebesar 5%, maka platform tersebut terancam pembatasan kegiatan usaha hingga pencabutan izin operasional."
    },
    {
        "level": "HARD",
        "subBab": 6,
        "questionText": "Ketika Satgas Pasti melakukan pemblokiran terhadap ribuan aplikasi dan situs web pinjol ilegal, mengapa entitas penipuan ini selalu muncul kembali dengan cepat menggunakan nama baru?",
        "options": [
            "A. Karena biaya pembuatan regulasi izin operasional di OJK jauh lebih murah daripada biaya pembuatan aplikasi baru",
            "B. Rendahnya hambatan masuk (low barrier to entry) teknologi digital serta pemanfaatan server luar negeri yang berada di luar yurisdiksi hukum Indonesia",
            "C. Adanya dukungan modal investasi tanpa batas dari lembaga perbankan resmi internasional"
        ],
        "correctIndex": 1,
        "educationalFact": "Fakta menarik! Implikasi hukum bagi nasabah yang melakukan wanprestasi (gagal bayar) di pinjol legal akan tercatat secara otomatis di dalam database terintegrasi milik negara bernama SLIK OJK (Sistem Layanan Informasi Keuangan, yang dahulu dikenal sebagai BI Checking). Catatan hitam yang berstatus kolektibilitas buruk ini akan mengakibatkan skor kredit personal individu tersebut hancur secara sistemik, menutup seluruh akses mereka untuk mengajukan Kredit Pemilikan Rumah (KPR), kredit kendaraan, atau modal usaha di seluruh lembaga perbankan resmi se-Indonesi"
    },
    {
        "level": "HARD",
        "subBab": 6,
        "questionText": "Hubungan kausalitas (sebab-akibat) yang paling akurat antara tingkat literasi keuangan masyarakat Indonesia dengan maraknya kasus bunuh diri atau depresi akibat jeratan pinjol ilegal adalah...",
        "options": [
            "A. Tingginya literasi keuangan membuat masyarakat sengaja meminjam di pinjol ilegal untuk menuntut balik perusahaan secara hukum",
            "B. Rendahnya literasi membuat masyarakat rentan terjebak manipulasi  visual pinjol ilegal, dan ketika gagal bayar, mereka tidak memiliki kesiapan mental menghadapi intimidasi psikologis penagih",
            "C. Literasi keuangan tidak memiliki korelasi sama sekali dengan stabilitas emosional dan perilaku konsumsi individu"
        ],
        "correctIndex": 1,
        "educationalFact": "Fun fact! Penegakan hukum terhadap ekosistem pinjol ilegal dilakukan secara lintas sektoral oleh wadah resmi bentukan pemerintah bernama Satgas Pasti (Satuan Tugas Pemberantasan Aktivitas Keuangan Ilegal, yang dahulu bernama Satgas Waspada Investasi). Wadah gabungan ini terdiri dari OJK, Bank Indonesia, Kementerian Kominfo, Kejaksaan Agung, hingga Kepolisian RI yang memiliki wewenang teknis melakukan pemblokiran aplikasi, penutupan rekening bank penampung dana ilegal, hingga penangkapan aktor intelektual di balik jaringan fintech ilegal."
    },
    {
        "level": "HARD",
        "subBab": 6,
        "questionText": "Mengapa skema pendanaan pada fintech lending legal tidak dijamin oleh Lembaga Penjamin Simpanan (LPS) sebagaimana dana tabungan masyarakat di bank konvensional?",
        "options": [
            "A. Karena fintech lending legal belum membayar iuran keanggotaan tahunan kepada asosiasi perbankan nasional",
            "B. Karena prinsip fintech lending adalah menyalurkan risiko investasi secara langsung dari pemberi dana (lender) kepada penerima dana (borrower), bukan menghimpun simpanan",
            "C. LPS hanya bertugas menjamin keamanan dana yang dipinjamkan oleh nasabah kepada platform pinjol ilegal"
        ],
        "correctIndex": 1,
        "educationalFact": "Money Fact! Sebelum menandatangani perjanjian pinjaman digital secara elektronik, konsumen secara teknis berhak menerima dokumen hukum terstandarisasi yang disebut Product Disclosure Statement (Lembar Fakta Produk). Dokumen teknis ini wajib menguraikan secara eksplisit mengenai komponen biaya yang sering disembunyikan oleh oknum penipu, seperti biaya originasi (origination fees), biaya platform, denda keterlambatan berjenjang, hingga mekanisme penyelesaian sengketa melalui Lembaga Alternatif Penyelesaian Sengketa Sektor Jasa Keuangan (LAPS SJK) jika terjadi perselisihan di kemudian hari."
    },
    {
        "level": "HARD",
        "subBab": 6,
        "questionText": "Konsep Asymmetric Information (Informasi Asimetris) sering kali dieksploitasi oleh pelaku pinjol ilegal untuk menjebak korban. Bentuk eksploitasi informasi yang dimaksud adalah...",
        "options": [
            "A. Memberikan informasi detail mengenai laporan keuangan tahunan perusahaan kepada calon nasabah secara transparan",
            "B. Menyembunyikan rincian biaya denda akumulatif yang sebenarnya di awal, dan hanya menampilkan jargon \"Proses 5 Menit Cair\" untuk memikat korban",
            "C. Memaksa nasabah membaca seluruh undang-undang hak perlindungan data pribadi sebelum aplikasi diaktifkan"
        ],
        "correctIndex": 1,
        "educationalFact": "Tahukah kalian? Risiko sistemik kegagalan bayar di dalam platform pinjaman digital (P2P Lending) diukur secara teknis menggunakan indikator makroekonomi resmi yang disebut TWP90 (Tingkat Wanprestasi 90 hari). Indikator ini menghitung persentase kelalaian penyelesaian kewajiban pinjaman yang melewati batas waktu 90 hari sejak tanggal jatuh tempo. Jika angka TWP90 suatu platform berada di atas ambang batas pengawasan OJK sebesar 5%, maka platform tersebut terancam pembatasan kegiatan usaha hingga pencabutan izin operasional."
    },
    {
        "level": "HARD",
        "subBab": 6,
        "questionText": "Langkah restrukturisasi keuangan yang paling rasional dan berkekuatan hukum bagi seorang pelaku UMKM yang terlanjur memiliki utang menumpuk di beberapa pinjol legal yang berizin OJK adalah...",
        "options": [
            "A. Melarikan diri ke luar kota dan menonaktifkan seluruh perangkat komunikasi digital secara permanen",
            "B. Mengajukan permohonan restrukturisasi kredit (seperti perpanjangan tenor atau pengurangan bunga) secara resmi dengan menunjukkan bukti penurunan kemampuan finansial usaha",
            "C. Mengambil pinjaman komersial baru dari koperasi ilegal demi menjaga nama baik skor kredit di bank pemerintah"
        ],
        "correctIndex": 0,
        "educationalFact": "Fakta menarik! Implikasi hukum bagi nasabah yang melakukan wanprestasi (gagal bayar) di pinjol legal akan tercatat secara otomatis di dalam database terintegrasi milik negara bernama SLIK OJK (Sistem Layanan Informasi Keuangan, yang dahulu dikenal sebagai BI Checking). Catatan hitam yang berstatus kolektibilitas buruk ini akan mengakibatkan skor kredit personal individu tersebut hancur secara sistemik, menutup seluruh akses mereka untuk mengajukan Kredit Pemilikan Rumah (KPR), kredit kendaraan, atau modal usaha di seluruh lembaga perbankan resmi se-Indonesi"
    }
];

async function main() {
    console.log("🗑️ Clearing old questions...");
    await prisma.question.deleteMany({});
    console.log('✓ Cleared old questions');

    console.log(`🌱 Seeding ${questions.length} questions...`);

    for (const q of questions) {
        await prisma.question.create({
            data: {
                level: q.level as "EASY" | "MEDIUM" | "HARD",
                subBab: q.subBab,
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
