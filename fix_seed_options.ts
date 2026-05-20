import fs from 'fs';

const text = fs.readFileSync('bank_soal.txt', 'utf-8');
const questionsText = [
  "Ciri utama yang paling valid untuk membuktikan bahwa sebuah aplikasi pinjaman digital berstatus legal adalah",
  "Manakah dari pilihan berikut yang merupakan perbedaan mendasar antara Reksa Dana Pasar Uang dengan Reksa Dana Saham",
  "Budi adalah kepala keluarga dengan seorang istri dan dua anak yang masih kecil. Berapakah jumlah dana darurat ideal",
  "Arus kas bulanan Roni menunjukkan angka negatif Rp500.000 selama tiga bulan berturut-turut",
  "Apa dampak negatif yang terjadi jika bank sentral",
  "Mengapa sektor investasi properti (tanah/bangunan) sering disebut sebagai pelindung inflasi",
  "Apa bahaya psikologis terbesar dari fitur kemudahan berbelanja seperti PayLater",
  "Pak Andi mendapatkan pesan WhatsApp yang menyatakan bahwa dia mendapatkan pinjaman instan",
  "Seorang nasabah mendapati bahwa aplikasi pinjol yang digunakannya tiba-tiba menaikkan suku bunga secara sepihak",
  "Saat terjadi penutupan operasional sebuah Bank Perkreditan Rakyat",
  "Tanti memutuskan membeli mesin cuci otomatis seharga Rp4.500.000 menggunakan tabungannya",
  "Apa interpretasi finansial dari nilai Savings Rate",
  "Mengapa strategi Rebalancing Portofolio secara berkala sangat krusial",
  "Mengapa memiliki mentalitas Delayed Gratification berkorelasi kuat dengan kesuksesan finansial",
  "Maya secara mengejutkan menerima transfer dana sebesar Rp1.200.000 di rekening banknya",
  "Hubungan kausalitas (sebab-akibat) yang paling akurat antara tingkat literasi keuangan masyarakat Indonesia dengan maraknya kasus bunuh diri",
  "Manakah contoh pengeluaran yang tergolong sebagai “Keinginan” (Wants)?"
];

for (const q of questionsText) {
    const idx = text.indexOf(q);
    if (idx !== -1) {
        const snippet = text.substring(idx, idx + 800);
        console.log("----");
        console.log(snippet.split('\n').slice(0, 8).join('\n'));
    }
}
