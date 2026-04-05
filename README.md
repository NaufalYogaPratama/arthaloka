# ArthaLoka

<p align="center">
  <img src="/assets/logo-horizontal.png" alt="ArthaLoka Logo" width="400">
</p>

<p align="center">
  <strong>Belajar Literasi Keuangan Sambil Bermain Engklek!</strong>
</p>

<p align="center">
  <a href="#-fitur-utama">Fitur</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-project-structure">Struktur</a>
</p>

---

## 🎮 Tentang ArthaLoka

**ArthaLoka** adalah aplikasi web game edukasi yang mengajarkan literasi keuangan kepada siswa Indonesia melalui permainan tradisional **Engklek** (hopscotch). Dengan menggabungkan mekanik permainan klasik dan kuis interaktif, ArthaLoka membuat pembelajaran keuangan menjadi menyenangkan dan engaging.

### Konsep Permainan
- 🎯 **Engklek Digital**: Lompat di papan virtual seperti permainan tradisional
- ❓ **Kuis Literasi Keuangan**: Jawab pertanyaan tentang tabungan, anggaran, dan investasi
- 🏆 **Sistem Skor & Combo**: Kumpulkan poin dengan jawaban benar beruntun
- 🧠 **Ruang Belajar**: Pelajari fun facts keuangan setelah bermain (Tinder-style swipe cards)
- 👤 **Player Dashboard**: Statistik personal untuk user yang login

---

## ✨ Fitur Utama

### 🎯 Core Game Mechanics
| Fitur | Deskripsi |
|-------|-----------|
| **3 Tingkat Kesulitan** | Easy (SD/MI), Medium (SMP/MTs), Hard (SMA/SMK/MA) |
| **Sistem Nyawa** | 3 lives — salah jawaban = -1 nyawa |
| **Combo System** | Multiplier skor untuk jawaban benar beruntun |
| **Perfect Clear** | Bonus untuk menyelesaikan dengan 3 nyawa utuh |
| **Mascot System** | Orangutan maskot memberikan feedback & motivasi |

### 📚 Educational Features
| Fitur | Deskripsi |
|-------|-----------|
| **Ruang Belajar** | Swipeable cards dengan fun facts literasi keuangan |
| **Bank Soal** | 30+ pertanyaan per level dengan validasi server-side |
| **Educational Facts** | Fakta menarik muncul setelah setiap jawaban |

### 👤 User Features
| Fitur | Deskripsi |
|-------|-----------|
| **Google OAuth** | Login dengan Google untuk menyimpan progress |
| **Guest Mode** | Main tanpa login (progress tidak tersimpan) |
| **Player Dashboard** | Statistik personal: total sesi, best scores, riwayat |
| **Leaderboard** | Peringkat global per level |
| **Share Results** | Bagikan hasil ke WhatsApp, Twitter/X, atau copy link |

---

## 🛠 Tech Stack

### Frontend
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Icons**: [Lucide React](https://lucide.dev/)

### Backend & Database
- **Authentication**: [NextAuth.js v5](https://next-auth.js.org/) (Auth.js)
- **Database**: PostgreSQL
- **ORM**: [Prisma](https://www.prisma.io/)
- **API**: Next.js API Routes

### Fonts
- **Display**: Fredoka One (game numbers, scores)
- **Body**: Nunito (UI elements, buttons)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Google OAuth credentials (opsional, untuk login Google)

### Installation

1. **Clone repository**
```bash
git clone https://github.com/yourusername/arthaloka.git
cd arthaloka
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/arthaloka"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (opsional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

4. **Setup database**
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed database dengan soal kuis (opsional)
npx prisma db seed
```

5. **Run development server**
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

---

## 📁 Project Structure

```
arthaloka/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── auth/[...nextauth]/   # NextAuth configuration
│   │   ├── leaderboard/          # Leaderboard API
│   │   ├── quiz/                 # Quiz questions & validation
│   │   └── profile/              # Profile data API
│   ├── game/                     # Main game page
│   ├── game-over/                # Game over screen
│   ├── learn/                    # Ruang Belajar (Learning Room)
│   ├── level-select/             # Difficulty selection
│   ├── profile/                  # Player dashboard
│   ├── result/                   # Victory screen
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Login/Home page
├── components/
│   ├── game/                     # Game-specific components
│   ├── layout/                   # Layout components
│   ├── profile/                  # Profile components
│   └── ui/                       # Shared UI components
├── lib/                          # Utilities & configs
│   ├── assets.ts                 # Asset constants
│   ├── auth.ts                   # Auth configuration
│   └── prisma.ts                 # Prisma client
├── prisma/
│   ├── schema.prisma             # Database schema
│   └── seed.ts                   # Seed data
├── store/
│   └── gameStore.ts              # Zustand game state
└── public/
    └── assets/                   # Static assets
```

---

## 🎨 Design System

### Color Palette
| Token | Value | Usage |
|-------|-------|-------|
| `--color-easy` | `#16a34a` | Easy level accent |
| `--color-medium` | `#2563eb` | Medium level accent |
| `--color-hard` | `#dc2626` | Hard level accent |
| `--color-bg` | `#f0fdf4` | Light green background |
| `--color-accent` | `#fbbf24` | Score/gold accent |
| `--color-mascot` | `#f97316` | Mascot/orangutan |

---

## 🔐 Security Features

- **Server-side answer validation** — Jawaban kuis tidak diekspos ke client
- **Rate limiting** — Maksimal 1 request per 3 detik per sesi
- **Secure authentication** — NextAuth dengan JWT strategy
- **Input sanitization** — Prisma ORM mencegah SQL injection

---

## 🤝 Contributing

Kontribusi selalu diterima! Silakan buat issue atau pull request untuk:
- 🐛 Bug fixes
- ✨ Feature requests
- 📚 Documentation improvements
- 🎨 UI/UX enhancements

---

## 📄 License

[MIT License](LICENSE) © 2024 ArthaLoka Team

---

<p align="center">
  <strong>Made with ❤️ for Indonesian students</strong>
</p>

