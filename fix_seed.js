const fs = require('fs');
let content = fs.readFileSync('prisma/seed.ts', 'utf-8');

const bad1 = `"educationalFact": "Tahukah kamu? Dana darurat (emergency fund) sama sekali berbeda dengan tabungan biasa atau investasi. Fenomena nyata di masyarakat menunjukkan banyak orang menyamakan ketiganya, padahal dana darurat memiliki fungsi tunggal yang sakral: sebagai bemper atau jaring pengaman ketika terjadi musibah tak terduga,"`;
const bad2 = `"educationalFact": "seperti pemutusan hubungan kerja (PHK) seketika atau biaya perbaikan kendaraan akibat kecelakaan. Tahukah kalian? Dana darurat tidak boleh diinvestasikan ke dalam instrumen yang fluktuatif atau berisiko tinggi seperti saham gorengan atau kripto. Pengetahuan mendasar menetapkan bahwa dana darurat wajib disimpan di tempat yang aman dan sangat mudah diakses, agar ketika kondisi kritis melanda di jam dua pagi, uang tersebut bisa langsung dicairkan tanpa drama penurunan nilai modal. Fakta menarik! Seseorang yang tidak memiliki kesiapan dana darurat terbukti secara psikologis lebih rentan terjebak dalam lingkaran setan finansial. Saat terjadi musibah kecil, mereka terpaksa mengambil keputusan jangka pendek yang merusak, seperti menjual aset produktif dengan harga murah (loss sale) atau beralih menggunakan instrumen utang berbunga tinggi demi menutup kebutuhan darurat tersebut. Fun fact! Aturan praktis yang paling umum digunakan oleh masyarakat umum untuk menentukan jumlah dana darurat minimal bagi seorang individu yang masih lajang/belum menikah adalah sebesar 3 kali pengeluaran bulanan. Jadi, jika pengeluaran riil harian dan bulananmu berjumlah Rp"`;

const facts = [
  `"educationalFact": "Tahukah kamu? Dana darurat (emergency fund) berbeda dengan tabungan biasa. Dana darurat memiliki fungsi sakral: sebagai bemper saat terjadi musibah tak terduga, seperti pemutusan hubungan kerja (PHK) atau biaya perbaikan kendaraan akibat kecelakaan."`,
  `"educationalFact": "Tahukah kalian? Dana darurat tidak boleh diinvestasikan ke dalam instrumen berisiko tinggi seperti saham gorengan atau kripto. Dana darurat wajib disimpan di tempat yang aman dan mudah diakses, agar bisa langsung dicairkan tanpa drama saat kondisi kritis."`,
  `"educationalFact": "Fakta menarik! Seseorang yang tidak memiliki dana darurat terbukti lebih rentan terjebak dalam lingkaran setan finansial. Saat musibah kecil datang, mereka terpaksa mengambil utang berbunga tinggi demi menutup kebutuhan darurat tersebut."`,
  `"educationalFact": "Fun fact! Aturan praktis yang paling umum digunakan untuk menentukan jumlah dana darurat minimal bagi seorang individu yang masih lajang atau belum menikah adalah sebesar 3 hingga 6 kali pengeluaran bulanan."`,
  `"educationalFact": "Money fact! Jika sebagian dana daruratmu terpakai untuk keperluan mendesak, prioritas keuanganmu bulan depan adalah mengisi ulang dana tersebut kembali ke target minimal yang ditetapkan."`
];

let replaced = 0;
while(content.includes(bad1)) {
    content = content.replace(bad1, facts[replaced % 5]);
    replaced++;
    if(content.includes(bad2)) {
        content = content.replace(bad2, facts[replaced % 5]);
        replaced++;
    }
}
fs.writeFileSync('prisma/seed.ts', content);
console.log('Replaced', replaced, 'bad strings.');
