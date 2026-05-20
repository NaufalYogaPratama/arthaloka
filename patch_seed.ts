import fs from 'fs';

const bankSoal = fs.readFileSync('bank_soal.txt', 'utf-8');
let seedContent = fs.readFileSync('prisma/seed.ts', 'utf-8');

// We have a list of failed questions from the previous check
const failedTexts = [
  "Ciri utama yang paling valid untuk membuktikan bahwa sebuah aplikasi pinjaman digital berstatus legal adalah...",
  "Manakah dari pilihan berikut yang merupakan perbedaan mendasar antara Reksa Dana Pasar Uang dengan Reksa Dana Saham?",
  "Budi adalah kepala keluarga dengan seorang istri dan dua anak yang masih kecil. Berapakah jumlah dana darurat ideal yang harus dipersiapkan Budi jika pengeluaran bulanannya Rp5.000.000?",
  "Arus kas bulanan Roni menunjukkan angka negatif Rp500.000 selama tiga bulan berturut-turut. Langkah taktis apa yang harus segera diambil Roni?",
  "Apa dampak negatif yang terjadi jika bank sentral (Bank Indonesia) mencetak uang tunai dalam jumlah berlebihan secara instan untuk dibagikan kepada masyarakat?",
  "Mengapa sektor investasi properti (tanah/bangunan) sering disebut sebagai pelindung inflasi (inflation hedge) yang alami?",
  "Apa bahaya psikologis terbesar dari fitur kemudahan berbelanja seperti PayLater atau Buy Now Pay Later (BNPL) bagi konsumen yang kurang literasi?",
  "Pak Andi mendapatkan pesan WhatsApp yang menyatakan bahwa dia mendapatkan pinjaman instan Rp5.000.000 dari PT Maju Sejahtera. Namun, Pak Andi harus mentransfer biaya provisi sebesar Rp500.000 terlebih dahulu ke rekening perorangan agar dana cair. Tindakan apa yang mencerminkan literasi keuangan yang tepat?",
  "Seorang nasabah mendapati bahwa aplikasi pinjol yang digunakannya tiba-tiba menaikkan suku bunga secara sepihak di tengah masa tenor, jauh lebih tinggi dari kesepakatan awal yang tertulis di aplikasi. Berdasarkan karakteristiknya, platform tersebut dapat dipastikan...",
  "Saat terjadi penutupan operasional sebuah Bank Perkreditan Rakyat (BPR) oleh OJK, nasabah yang memiliki dana darurat di atas Rp2 Miliar di BPR tersebut harus menghadapi kenyataan bahwa...",
  "Evaluasi kasus: Tanti memutuskan membeli mesin cuci otomatis seharga Rp4.500.000 menggunakan tabungannya. Pembelian ini membuat Tanti bisa menghemat waktu mencuci 2 jam setiap hari, yang kemudian dia gunakan untuk memproduksi kue pesanan dengan keuntungan Rp50.000 per hari. Bagaimana penilaian keputusan konsumsi Tanti?",
  "Apa interpretasi finansial dari nilai Savings Rate (Tingkat Tabungan) sebesar 40% dari total pendapatan kotor pada seorang pekerja muda lajang?",
  "Mengapa strategi Rebalancing Portofolio secara berkala sangat krusial dalam manajemen investasi jangka panjang melawan inflasi?",
  "Mengapa memiliki mentalitas Delayed Gratification berkorelasi kuat dengan kesuksesan finansial jangka panjang?",
  "Analisis Kasus: Maya secara mengejutkan menerima transfer dana sebesar Rp1.200.000 di rekening banknya tanpa pernah merasa mengajukan pinjaman di platform mana pun. Tiga hari kemudian, seseorang dari nomor asing meneror Maya dan menuntut pengembalian dana sebesar Rp2.000.000. Metode kejahatan finansial apa yang sedang terjadi, dan bagaimana mitigasi hukumnya?",
  "Hubungan kausalitas (sebab-akibat) yang paling akurat antara tingkat literasi keuangan masyarakat Indonesia dengan maraknya kasus bunuh diri atau depresi akibat jeratan pinjol ilegal adalah...",
  "Manakah contoh pengeluaran yang tergolong sebagai “Keinginan” (Wants)?"
];

// Clean up bankSoal: remove weird characters and join lines for options
const cleanText = bankSoal.replace(/\u200B/g, '').replace(/\f/g, '').replace(/\r/g, '');

for (const q of failedTexts) {
  // Find question in bank_soal.txt
  // Since text might have newlines inside the question, we just search for the first 50 chars
  const qPrefix = q.substring(0, 50);
  const qIdx = cleanText.indexOf(qPrefix);
  if (qIdx === -1) {
    console.log("Could not find in bank_soal:", qPrefix);
    continue;
  }
  
  // Extract options
  const snippet = cleanText.substring(qIdx, qIdx + 1000);
  const optA_match = snippet.match(/A\.\s+([^B]+)/);
  const optB_match = snippet.match(/B\.\s+([^C]+)/);
  let optC_match = snippet.match(/C\.\s+([^0-9]+)/);
  if(!optC_match) {
     optC_match = snippet.match(/C\.\s+([\s\S]*?)\n\d+\./);
  }
  
  if (optA_match && optB_match && optC_match) {
    let optA = "A. " + optA_match[1].replace(/\n/g, ' ').trim();
    let optB = "B. " + optB_match[1].replace(/\n/g, ' ').trim();
    let optC = "C. " + optC_match[1].replace(/\n/g, ' ').trim();
    
    // Now replace in seed.ts
    // The structure in seed.ts is:
    // "questionText": "...",
    // "options": [
    //    ...
    // ],
    
    // We can use a regex to find the question and replace its options array
    const escapedQ = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`("questionText":\\s*"${escapedQ}",\\s*"options":\\s*\\[)[^\\]]+(\\])`, 'g');
    
    const newOptionsStr = `\n            ${JSON.stringify(optA)},\n            ${JSON.stringify(optB)},\n            ${JSON.stringify(optC)}\n        `;
    
    seedContent = seedContent.replace(regex, `$1${newOptionsStr}$2`);
    console.log("Patched:", qPrefix);
  } else {
    console.log("Failed to parse options for:", qPrefix);
  }
}

fs.writeFileSync('prisma/seed.ts', seedContent);
