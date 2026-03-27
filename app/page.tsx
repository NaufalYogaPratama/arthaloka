"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import AppLogo from "@/components/ui/AppLogo";

export default function LoginPage() {
  const router = useRouter();

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/level-select" });
  };

  const handleGuestLogin = async () => {
    const result = await signIn("guest", {
      redirect: false,
    });
    if (result?.ok) {
      router.push("/level-select");
    }
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-pattern-light bg-gradient-to-br from-green-100 via-emerald-50 to-teal-100">
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

      {/* Main card */}
      <div className="relative z-10 w-full max-w-md mx-4 px-8 py-12 rounded-3xl bg-white/70 backdrop-blur-xl shadow-xl border border-white/50 text-center">
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <AppLogo variant="horizontal" size="xl" />
        </div>

        {/* Login buttons */}
        <div className="flex flex-col gap-4">
          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-3 w-full py-4 px-6 rounded-2xl bg-white border-2 border-gray-200 text-gray-700 font-bold text-base hover:border-green-400 hover:shadow-lg transition-all duration-200 active:scale-[0.98]"
          >
            {/* Google Icon */}
            <svg width="22" height="22" viewBox="0 0 48 48">
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              />
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              />
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              />
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              />
            </svg>
            Login dengan Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-300/60" />
            <span className="text-sm text-gray-400 font-medium">atau</span>
            <div className="flex-1 h-px bg-gray-300/60" />
          </div>

          {/* Guest Login */}
          <button
            onClick={handleGuestLogin}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-base shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30 hover:from-green-600 hover:to-emerald-600 transition-all duration-200 active:scale-[0.98]"
          >
            🎮 Bermain sebagai Guest
          </button>
        </div>

        {/* Footer text */}
        <p className="mt-8 text-xs text-gray-400">
          Gamifikasi Literasi Keuangan Indonesia 🇮🇩
        </p>
      </div>
    </main>
  );
}
