'use client'

import Image from 'next/image'
import { getScorePopupAsset } from '@/lib/assets'
import { useEffect, useState } from 'react'

interface ScorePopupProps {
    pts: number
    triggerKey: number
}

export function ScorePopup({ pts, triggerKey }: ScorePopupProps) {
    const [visible, setVisible] = useState(false)
    const asset = getScorePopupAsset(pts)

    // Display size: height 80px
    const displayH = 80
    const displayW = Math.round(displayH * (asset.width / asset.height))

    useEffect(() => {
        if (triggerKey === 0) return
        setVisible(true)
        const t = setTimeout(() => setVisible(false), 1200)
        return () => clearTimeout(t)
    }, [triggerKey])

    if (!visible) return null

    return (
        <div className="fixed top-1/3 left-1/2 -translate-x-1/2 z-[400]
                    pointer-events-none
                    animate-scoreFloat">
            <Image
                src={asset.src}
                alt={`+${pts} poin`}
                width={displayW}
                height={displayH}
                className="object-contain"
                style={{ width: displayW, height: displayH }}
            />
        </div>
    )
}
