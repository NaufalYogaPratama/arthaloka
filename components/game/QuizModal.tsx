"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUp, Hand, CheckCircle2, XCircle } from "lucide-react";
import { getMascotAsset } from "@/lib/assets";

// Warna untuk label opsi A/B/C/D — RPG style
const OPTION_COLORS = [
  { bg: "#3b82f6", text: "#fff" }, // A — blue
  { bg: "#22c55e", text: "#fff" }, // B — green
  { bg: "#f59e0b", text: "#fff" }, // C — amber
  { bg: "#a855f7", text: "#fff" }, // D — purple
];

interface QuizModalProps {
  question: {
    id: string;
    questionText: string;
    options: string[];
  };
  quizType: "quiz1" | "quiz2";
  onAnswer: (selectedIndex: number) => Promise<{
    correct: boolean;
    correctIndex: number;
  }>;
  onComplete: () => void;
  qNum?: number;
}

export default function QuizModal({
  question,
  quizType,
  onAnswer,
  onComplete,
  qNum = 0,
}: QuizModalProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [result, setResult] = useState<{
    correct: boolean;
    correctIndex: number;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Animasi mount — delay sedikit untuk slide-up yang smooth
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 30);
    return () => clearTimeout(t);
  }, []);

  const handleSelect = async (index: number) => {
    if (selectedIndex !== null || isSubmitting) return;

    setSelectedIndex(index);
    setIsSubmitting(true);

    try {
      const res = await onAnswer(index);
      setResult(res);

      // Auto-advance after 1.5s
      setTimeout(() => {
        onComplete();
      }, 1500);
    } catch {
      setTimeout(() => {
        onComplete();
      }, 1000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const quizNum = quizType === "quiz1" ? 1 : 2;
  const mascotAsset = getMascotAsset("default");
  const mascotH = 80;
  const mascotW = Math.round(mascotH * (mascotAsset.width / mascotAsset.height));

  return (
    // Full screen overlay — game board terlihat samar di belakang
    <div
      className="fixed inset-0 z-[90] flex flex-col justify-end animate-[fadeOverlay_0.2s_ease]"
      style={{ background: "rgba(0, 0, 0, 0.65)" }}
    >
      {/* ── JRPG BOTTOM PANEL ── */}
      <div
        className="w-full"
        style={{
          background: "linear-gradient(180deg, #0f172a 0%, #1e1b4b 100%)",
          borderTop: "2px solid",
          borderImage: "linear-gradient(90deg, #f59e0b, #fbbf24, #f59e0b) 1",
          transform: mounted ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
          maxHeight: "70vh",
          overflowY: "auto",
        }}
      >
        {/* Gold gradient border line di atas panel */}
        <div
          className="w-full h-0.5 mb-4"
          style={{
            background:
              "linear-gradient(90deg, transparent, #f59e0b, #fbbf24, #f59e0b, transparent)",
          }}
        />

        <div className="px-4 pb-6 pt-0">
          {/* ── ROW 1: Badge + Question Number ── */}
          <div className="flex items-center justify-between mb-4">
            {/* Quiz type badge */}
            <div className="flex items-center gap-2">
              <div
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                style={{
                  background:
                    quizNum === 1
                      ? "rgba(59,130,246,0.25)"
                      : "rgba(245,158,11,0.25)",
                  border: `1px solid ${quizNum === 1 ? "#3b82f6" : "#f59e0b"}`,
                }}
              >
                {quizNum === 1 ? (
                  <ArrowUp className="w-3.5 h-3.5 text-blue-400" />
                ) : (
                  <Hand className="w-3.5 h-3.5 text-amber-400" />
                )}
                <span
                  className="text-xs font-black"
                  style={{ color: quizNum === 1 ? "#93c5fd" : "#fcd34d" }}
                >
                  {quizNum === 1 ? "QUIZ MAJU" : "QUIZ AMBIL BATU"}
                </span>
              </div>
            </div>

            {/* Question counter */}
            {/* <span className="text-xs text-gray-500 font-bold">
              No. {qNum + 1} / 10
            </span> */}
          </div>

          {/* ── ROW 2: Mascot + Question ── */}
          <div className="flex items-start gap-4 mb-5">
            {/* Mascot — kiri panel */}
            <div className="flex-shrink-0 relative">
              {/* Glow effect di belakang mascot */}
              <div
                className="absolute inset-0 rounded-full blur-xl opacity-40"
                style={{
                  background: quizNum === 1 ? "#3b82f6" : "#f59e0b",
                  transform: "scale(0.8)",
                }}
              />
              <Image
                src={mascotAsset.src}
                alt="Maskot ArthaLoka"
                width={mascotW}
                height={mascotH}
                className="object-contain relative z-10"
                style={{ width: mascotW, height: mascotH }}
                priority
              />
            </div>

            {/* Dialogue box — seperti speech bubble RPG */}
            <div className="flex-1 relative">
              {/* Arrow penunjuk ke mascot */}
              <div
                className="absolute -left-2 top-4 w-0 h-0"
                style={{
                  borderTop: "8px solid transparent",
                  borderBottom: "8px solid transparent",
                  borderRight: "8px solid rgba(255,255,255,0.08)",
                }}
              />
              <div
                className="rounded-xl p-3.5"
                style={{
                  background: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                }}
              >
                <p className="text-white font-bold text-sm leading-relaxed">
                  {question.questionText}
                </p>
              </div>
            </div>
          </div>

          {/* ── ROW 3: Option Buttons — 2×2 grid ── */}
          <div className="grid grid-cols-2 gap-2.5">
            {question.options.map((opt, i) => {
              const isSelected = selectedIndex === i;
              const isCorrect =
                selectedIndex !== null && i === result?.correctIndex;
              const isWrong = isSelected && result && !result.correct;
              const color = OPTION_COLORS[i];

              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  disabled={selectedIndex !== null}
                  className="flex items-center gap-2.5 rounded-xl p-3 text-left transition-all duration-150 active:scale-95"
                  style={{
                    background: isCorrect
                      ? "rgba(34, 197, 94, 0.2)"
                      : isWrong
                        ? "rgba(239, 68, 68, 0.2)"
                        : "rgba(255, 255, 255, 0.07)",
                    border: isCorrect
                      ? "1.5px solid #22c55e"
                      : isWrong
                        ? "1.5px solid #ef4444"
                        : "1.5px solid rgba(255, 255, 255, 0.12)",
                    cursor: selectedIndex !== null ? "default" : "pointer",
                  }}
                >
                  {/* Label kotak A/B/C/D atau icon hasil */}
                  {isCorrect ? (
                    <CheckCircle2 className="w-6 h-6 flex-shrink-0 text-green-400" />
                  ) : isWrong ? (
                    <XCircle className="w-6 h-6 flex-shrink-0 text-red-400" />
                  ) : (
                    <div
                      className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 text-xs font-black"
                      style={{ background: color.bg, color: color.text }}
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  )}

                  {/* Teks opsi */}
                  <span
                    className="text-xs font-semibold leading-tight flex-1"
                    style={{
                      color: isCorrect
                        ? "#86efac"
                        : isWrong
                          ? "#fca5a5"
                          : "#e2e8f0",
                    }}
                  >
                    {opt}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ── ROW 4: Feedback hint setelah jawab ── */}
          {selectedIndex !== null && result && (
            <div
              className="mt-3 px-3 py-2 rounded-lg text-center animate-[popIn_0.3s_cubic-bezier(0.34,1.56,0.64,1)]"
              style={{
                background:
                  result.correct
                    ? "rgba(34, 197, 94, 0.1)"
                    : "rgba(239, 68, 68, 0.1)",
                border: `1px solid ${result.correct ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"}`,
              }}
            >
              <p
                className="text-xs font-bold"
                style={{ color: result.correct ? "#86efac" : "#fca5a5" }}
              >
                {result.correct
                  ? "✦ Jawaban tepat! Lanjutkan perjalananmu."
                  : "✦ Bukan itu jawabnya. Tetap semangat!"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
