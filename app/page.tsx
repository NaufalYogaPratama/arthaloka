'use client'

import Image from 'next/image'
import AppLogo from '@/components/ui/AppLogo'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()

  const handleGoogle = () => signIn('google', { callbackUrl: '/level-select' })
  const handleGuest = () => router.push('/level-select')

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-pattern bg-gradient-to-br from-green-100 via-emerald-50 to-teal-100">
      {/* Decorative background circles */}
      <div className="absolute top-[-80px] left-[-60px] w-[250px] h-[250px] rounded-full bg-green-200/40 blur-2xl z-0" />
      <div className="absolute top-[20%] right-[-40px] w-[200px] h-[200px] rounded-full bg-teal-200/40 blur-2xl z-0" />
      <div className="absolute bottom-[-60px] left-[30%] w-[300px] h-[300px] rounded-full bg-emerald-200/30 blur-3xl z-0" />
      <div className="absolute bottom-[20%] right-[10%] w-[150px] h-[150px] rounded-full bg-lime-200/40 blur-2xl z-0" />
      <div className="absolute top-[60%] left-[10%] w-[120px] h-[120px] rounded-full bg-green-300/25 blur-xl z-0" />

      {/* Decorative small circles */}
      <div className="absolute top-[15%] left-[20%] w-4 h-4 rounded-full bg-green-300/60 animate-pulse z-0" />
      <div className="absolute top-[30%] right-[25%] w-3 h-3 rounded-full bg-teal-300/60 animate-pulse delay-500 z-0" />
      <div className="absolute bottom-[25%] left-[15%] w-5 h-5 rounded-full bg-emerald-300/50 animate-pulse delay-1000 z-0" />
      <div className="absolute top-[50%] right-[15%] w-3 h-3 rounded-full bg-lime-400/50 animate-pulse delay-700 z-0" />

      {/* Floating leaf emojis */}
      <div className="absolute top-[10%] right-[30%] text-3xl animate-bounce opacity-30 z-0">
        🌿
      </div>
      <div className="absolute bottom-[15%] right-[20%] text-2xl animate-bounce delay-300 opacity-30 z-0">
        🍃
      </div>
      <div className="absolute top-[40%] left-[8%] text-2xl animate-bounce delay-700 opacity-25 z-0">
        🌱
      </div>

      {/* Content section */}
      
      <div className="relative z-10 min-h-screen w-full flex flex-col bg-gradient-to-b from-green-50/70 via-emerald-50/50 to-blue-50/70 px-5 py-8 gap-5 items-center justify-center">
        {/* Ilustrasi "main sambil belajar" */}
        {/* Original: 995×865 → ratio 1.151 */}
        {/* Display height 150px → width = 150 * (995/865) = 173px */}

        {/* Login card */}
        <div className="relative bg-white rounded-3xl shadow-xl border border-gray-100 p-7 pt-8 w-full max-w-[360px] overflow-hidden">
          {/* Ilustrasi */}
          <div className="flex justify-center mb-4">
            <AppLogo variant="horizontal" size="xl" />
          </div>
          <div className="flex justify-center mb-4">
            <Image
              src="/assets/ilustrasi.png"
              alt="Main engklek sambil belajar keuangan"
              width={173}
              height={150}
              className="object-contain"
              style={{ width: 'auto', height: 150 }}
            />
          </div>

          {/* TEXT */}
          <p className="text-center text-gray-500 text-sm font-bold mb-5">
            Masuk untuk mulai bermain
          </p>

          {/* Google Login */}
          <button
            onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-3 mb-3 bg-white hover:bg-gray-50 active:scale-[0.98] border-2 border-gray-200 hover:border-gray-300 rounded-2xl py-3.5 text-gray-700 font-bold text-sm transition-all duration-150 shadow-sm"
          >
            {/* svg tetap */}
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Login dengan Google
          </button>

          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-gray-400 text-xs font-bold">atau</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          {/* Guest */}
          <button
            onClick={handleGuest}
            className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 active:scale-[0.98] text-white font-extrabold text-base rounded-2xl py-3.5 transition-all duration-150 shadow-md"
          >
            Bermain sebagai Guest
          </button>

          <p className="text-center text-gray-400 text-[11px] mt-4 leading-relaxed">
            Gamifikasi Literasi Keuangan
          </p>
        </div>
      </div>
    </main>
  )
}