'use client'

import Image from 'next/image'
import { getMascotAsset } from '@/lib/assets'
import type { MascotVariant } from '@/types/game'

interface MascotImageProps {
    variant: MascotVariant
    displayHeight: number
    className?: string
    priority?: boolean
}

export function MascotImage({ variant, displayHeight, className = '', priority = false }: MascotImageProps) {
    const asset = getMascotAsset(variant)
    const aspectRatio = asset.width / asset.height
    const displayWidth = Math.round(displayHeight * aspectRatio)

    const animationClass = {
        senang: 'animate-bounce',
        wrong1: 'animate-[shake_0.4s_ease-in-out]',
        wrong2: 'animate-[shake_0.4s_ease-in-out]',
        sedih: 'animate-pulse',
        default: '',
        tunjuk: '',
        pesan: '',
        badge: '',
    }[variant] ?? ''

    return (
        <Image
            src={asset.src}
            alt={`Maskot ArthaLoka — ${variant}`}
            width={displayWidth}
            height={displayHeight}
            className={`object-contain ${animationClass} ${className}`}
            priority={priority}
            style={{ width: displayWidth, height: displayHeight }}
        />
    )
}
