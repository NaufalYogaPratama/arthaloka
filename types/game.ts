export type GameLevel = 'easy' | 'medium' | 'hard'

export type CharacterExpression =
    | 'idle'
    | 'action'   // jumping / moving
    | 'correct'  // benar
    | 'wrong'    // salah
    | 'over'     // game over (medium dan hard saja, easy tidak punya)

export type MascotVariant =
    | 'default'   // mascot.png — neutral/ruang belajar
    | 'senang'    // mascot-senang.png — jawaban benar
    | 'wrong1'    // mascot-wrong1.png — salah pertama
    | 'wrong2'    // mascot-wrong2.png — salah kedua
    | 'sedih'     // mascot-sedih.png — game over
    | 'tunjuk'    // mascot-tunjuk.png — tutorial
    | 'pesan'     // mascot-pesan.png — fun fact card
    | 'badge'     // mascot-badge.png — UI kecil

export type ArrowDirection = 'upward' | 'curved' | 'downward' | 'circular'
export type ArrowStyle = 'solid' | 'dashed'

export type StoneState = 'normal' | 'highlight'
