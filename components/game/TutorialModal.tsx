'use client'

import React, { useCallback } from 'react'
import Image from 'next/image'
import { MascotImage } from '@/components/ui/MascotImage'
import { TUTORIAL_ILLUSTRATION } from '@/lib/assets'
import { Circle, MoveUp, MessageSquare, AlertTriangle, Sparkles } from 'lucide-react'

// tutorial-ilustration.png: 1350×410 → ratio 3.29:1 (sangat wide/landscape)
// Display: full width, height auto → di 360px wide, height ≈ 110px
const TUTO_DISPLAY_H = (displayW: number) => Math.round(displayW / (1350 / 410))

export function TutorialModal({ onClose }: { onClose: () => void }) {
    const handleClose = useCallback(() => {
        try { localStorage.setItem('arthaloka_tutorial_seen', '1') } catch { }
        onClose()
    }, [onClose])

    return (
        <div className="fixed inset-0 z-[500] flex items-center justify-center
                    bg-black/60 p-4">
            <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl
                      animate-[popIn_0.35s_cubic-bezier(0.34,1.56,0.64,1)]">

                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                    <MascotImage variant="tunjuk" displayHeight={64} />
                    <div>
                        <h2 className="text-lg font-black text-gray-800">Cara Bermain</h2>
                        <p className="text-xs text-gray-500">Baca sebelum mulai ya!</p>
                    </div>
                </div>

                {/* Tutorial illustration — 3-panel comic strip */}
                <div className="w-full rounded-xl overflow-hidden mb-5 bg-gray-50 border border-gray-100 shadow-sm">
                    <Image
                        src={TUTORIAL_ILLUSTRATION.src}
                        alt="Cara bermain ArthaLoka: lempar batu, lompati petak, jawab pertanyaan"
                        width={TUTORIAL_ILLUSTRATION.width}
                        height={TUTORIAL_ILLUSTRATION.height}
                        className="w-full h-auto object-contain"
                        style={{ width: '100%', height: 'auto' }}
                        priority
                    />
                </div>

                {/* Step labels di bawah ilustrasi */}
                <div className="grid grid-cols-3 gap-2 mb-5 text-center">
                    {[
                        ['Lempar Batu', <Circle key="step-1" className="w-5 h-5 fill-gray-500 mx-auto" />],
                        ['Lompati Petak', <MoveUp key="step-2" className="w-5 h-5 mx-auto" />],
                        ['Jawab Kuis', <MessageSquare key="step-3" className="w-5 h-5 mx-auto" />],
                    ].map(([label, icon], idx) => (
                        <div key={idx} className="bg-green-50 rounded-xl p-2 border border-green-100 flex flex-col items-center justify-center">
                            {icon}
                            <p className="text-[10px] font-bold text-green-800 mt-1">{label}</p>
                        </div>
                    ))}
                </div>

                {/* Rules ringkas */}
                <div className="bg-amber-50 rounded-xl p-3 mb-5 border border-amber-200 shadow-sm">
                    <p className="text-xs font-bold text-amber-800 mb-1 flex items-center gap-1">
                        <AlertTriangle className="w-4 h-4" /> Ingat!
                    </p>
                    <ul className="text-xs text-amber-700 space-y-0.5 list-disc list-inside font-medium">
                        <li>3 nyawa total untuk 10 level</li>
                        <li>Jawab beruntun -{">"} combo multiplier naik!</li>
                        <li>Selesaikan tanpa salah -{">"} Perfect Clear +500 pts</li>
                    </ul>
                </div>

                {/* CTA */}
                <button
                    onClick={handleClose}
                    className="w-full bg-green-500 hover:bg-green-600 active:scale-95
                     text-white font-extrabold text-base py-3.5 rounded-2xl shadow-md cursor-pointer
                     transition-all duration-150"
                >
                    Siap Bermain! <Sparkles className="w-5 h-5" />
                </button>
            </div>
        </div>
    )
}
