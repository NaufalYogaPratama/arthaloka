"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Trophy,
  Target,
  Zap,
  Heart,
  Award,
  RotateCcw,
  Home,
  TrendingUp,
  Calendar,
  ChevronRight,
  Star,
  ChevronLeft,
  UserRound,
} from "lucide-react";

interface ProfileStats {
  totalSessions: number;
  totalByLevel: { easy: number; medium: number; hard: number };
  bestScores: { easy: number; medium: number; hard: number };
  avgScore: number;
  maxComboEver: number;
  perfectClears: number;
  recentSessions: {
    id: string;
    level: "easy" | "medium" | "hard";
    score: number;
    maxCombo: number;
    livesRemaining: number;
    completedAt: string;
  }[];
}

const LEVEL_COLOR = {
  easy: {
    color: "#16a34a",
    bg: "#f0fdf4",
    border: "#86efac",
    label: "Easy",
  },
  medium: {
    color: "#2563eb",
    bg: "#eff6ff",
    border: "#93c5fd",
    label: "Medium",
  },
  hard: {
    color: "#dc2626",
    bg: "#fef2f2",
    border: "#fca5a5",
    label: "Hard",
  },
};

export function ProfileClient({
  userName,
  userEmail,
  stats,
}: {
  userName: string;
  userEmail: string;
  stats: ProfileStats;
}) {
  const router = useRouter();

  // Tentukan "level favorit" (yang paling sering dimainkan)
  const favLevel = Object.entries(stats.totalByLevel).sort(
    ([, a], [, b]) => b - a
  )[0][0] as "easy" | "medium" | "hard";

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50">
      {/* Navbar */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-gray-500 font-bold text-sm"
        >
          <ChevronLeft className="w-4 h-4" />
          Kembali
        </button>
        <span className="font-black text-gray-800 text-sm">Profil Saya</span>
        <div className="w-16" /> {/* spacer */}
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-5">
        {/* ── PROFILE HEADER ── */}
        <div
          className="rounded-2xl p-5 flex items-center gap-4"
          style={{ background: "linear-gradient(135deg, #0f172a, #1e1b4b)" }}
        >
          {/* Avatar initials */}
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black text-white flex-shrink-0"
            style={{ background: LEVEL_COLOR[favLevel].color }}
          >
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-white font-black text-lg truncate">{userName}</p>
            {userEmail && (
              <p className="text-gray-400 text-xs truncate">{userEmail}</p>
            )}
            <div className="flex items-center gap-1.5 mt-1.5">
              <div
                className="text-[10px] font-black px-2 py-0.5 rounded-full"
                style={{
                  background: LEVEL_COLOR[favLevel].bg,
                  color: LEVEL_COLOR[favLevel].color,
                }}
              >
                Favorit: {LEVEL_COLOR[favLevel].label}
              </div>
              {stats.perfectClears > 0 && (
                <div className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                  ⭐ {stats.perfectClears}× Perfect
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── STAT CARDS GRID ── */}
        <div className="grid grid-cols-2 gap-3">
          {[
            {
              icon: <Target className="w-5 h-5" />,
              label: "Total Main",
              value: stats.totalSessions,
              suffix: "sesi",
              color: "#2563eb",
              bg: "#eff6ff",
            },
            {
              icon: <TrendingUp className="w-5 h-5" />,
              label: "Rata-rata Skor",
              value: stats.avgScore.toLocaleString("id-ID"),
              suffix: "pts",
              color: "#16a34a",
              bg: "#f0fdf4",
            },
            {
              icon: <Zap className="w-5 h-5" />,
              label: "Combo Tertinggi",
              value: stats.maxComboEver,
              suffix: "× combo",
              color: "#f59e0b",
              bg: "#fffbeb",
            },
            {
              icon: <Award className="w-5 h-5" />,
              label: "Perfect Clear",
              value: stats.perfectClears,
              suffix: "kali",
              color: "#a855f7",
              bg: "#faf5ff",
            },
          ].map(({ icon, label, value, suffix, color, bg }) => (
            <div
              key={label}
              className="rounded-2xl p-4"
              style={{ background: bg, border: `1px solid ${color}22` }}
            >
              <div
                className="flex items-center gap-2 mb-2"
                style={{ color }}
              >
                {icon}
                <span
                  className="text-[11px] font-black uppercase tracking-wide"
                  style={{ color }}
                >
                  {label}
                </span>
              </div>
              <p
                className="font-black text-2xl leading-none text-gray-800"
                style={{ fontFamily: "'Fredoka One', cursive" }}
              >
                {value}
              </p>
              <p className="text-[10px] font-semibold text-gray-400 mt-0.5">
                {suffix}
              </p>
            </div>
          ))}
        </div>

        {/* ── BEST SCORES PER LEVEL ── */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: "1px solid #e5e7eb" }}
        >
          <div className="px-4 py-3 bg-white border-b border-gray-100 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span className="font-black text-gray-800 text-sm">
              Skor Terbaik per Level
            </span>
          </div>
          {(["easy", "medium", "hard"] as const).map((lv) => {
            const cfg = LEVEL_COLOR[lv];
            const score = stats.bestScores[lv];
            const count = stats.totalByLevel[lv];
            return (
              <div
                key={lv}
                className="px-4 py-3 flex items-center gap-3 bg-white border-b border-gray-50 last:border-0"
              >
                {/* Level badge */}
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-[11px] font-black flex-shrink-0"
                  style={{ background: cfg.bg, color: cfg.color }}
                >
                  {cfg.label.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-gray-700">{cfg.label}</p>
                  <p className="text-[10px] text-gray-400 font-semibold">
                    {count}× dimainkan
                  </p>
                </div>
                <div className="text-right">
                  {score > 0 ? (
                    <>
                      <p
                        className="font-black text-base leading-tight"
                        style={{
                          color: cfg.color,
                          fontFamily: "'Fredoka One', cursive",
                        }}
                      >
                        {score.toLocaleString("id-ID")}
                      </p>
                      <p className="text-[9px] text-gray-400 font-bold">
                        best score
                      </p>
                    </>
                  ) : (
                    <p className="text-[11px] text-gray-300 font-bold">
                      Belum main
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── RIWAYAT 10 SESI TERAKHIR ── */}
        {stats.recentSessions.length > 0 && (
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: "1px solid #e5e7eb" }}
          >
            <div className="px-4 py-3 bg-white border-b border-gray-100 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-500" />
              <span className="font-black text-gray-800 text-sm">
                10 Sesi Terakhir
              </span>
            </div>

            {stats.recentSessions.map((s, i) => {
              const cfg = LEVEL_COLOR[s.level];
              const date = new Date(s.completedAt);
              const isPerfect = s.livesRemaining === 3;

              return (
                <div
                  key={s.id}
                  className="px-4 py-2.5 flex items-center gap-3 bg-white border-b border-gray-50 last:border-0"
                >
                  {/* Nomor urut */}
                  <span className="text-[11px] text-gray-300 font-black w-4 flex-shrink-0">
                    {i + 1}
                  </span>

                  {/* Level badge */}
                  <div
                    className="text-[10px] font-black px-2 py-0.5 rounded-full flex-shrink-0"
                    style={{ background: cfg.bg, color: cfg.color }}
                  >
                    {cfg.label}
                  </div>

                  {/* Score */}
                  <p
                    className="font-black text-sm flex-1"
                    style={{ fontFamily: "'Fredoka One', cursive" }}
                  >
                    {s.score.toLocaleString("id-ID")}
                    <span className="text-[10px] text-gray-400 font-semibold ml-1">
                      pts
                    </span>
                  </p>

                  {/* Badges */}
                  <div className="flex gap-1 flex-shrink-0">
                    {isPerfect && (
                      <span className="text-[9px] bg-amber-100 text-amber-700 font-black px-1.5 py-0.5 rounded-full">
                        ★ Perfect
                      </span>
                    )}
                    {s.maxCombo >= 6 && (
                      <span className="text-[9px] bg-purple-100 text-purple-700 font-black px-1.5 py-0.5 rounded-full">
                        {s.maxCombo}× Combo
                      </span>
                    )}
                  </div>

                  {/* Date */}
                  <p className="text-[10px] text-gray-400 font-semibold flex-shrink-0">
                    {date.toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                    })}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* ── EMPTY STATE (belum pernah main) ── */}
        {stats.totalSessions === 0 && (
          <div
            className="rounded-2xl p-8 text-center"
            style={{ background: "#f9fafb", border: "1px solid #e5e7eb" }}
          >
            <Star className="w-12 h-12 text-gray-200 mx-auto mb-3" />
            <p className="font-black text-gray-400 text-base mb-1">
              Belum ada sesi main
            </p>
            <p className="text-gray-400 text-sm">
              Mainkan ArthaLoka untuk melihat statistikmu!
            </p>
          </div>
        )}

        {/* ── CTA BUTTONS ── */}
        <div className="grid grid-cols-2 gap-3 pb-8">
          <button
            onClick={() => router.push("/")}
            className="flex items-center justify-center gap-2 py-3.5 rounded-2xl font-black text-sm bg-white border-2 border-gray-200 text-gray-700 transition-all active:scale-95"
          >
            <Home className="w-4 h-4" />
            Menu Utama
          </button>
          <button
            onClick={() => router.push("/level-select")}
            className="flex items-center justify-center gap-2 py-3.5 rounded-2xl font-black text-sm text-white transition-all active:scale-95"
            style={{
              background: "linear-gradient(135deg, #f59e0b, #d97706)",
            }}
          >
            <RotateCcw className="w-4 h-4" />
            Main Sekarang!
          </button>
        </div>
      </div>
    </div>
  );
}
