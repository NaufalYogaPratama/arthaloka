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
    <main className="min-h-screen flex flex-col">
      {/* HERO SECTION — background image */}
      <div className="relative w-full" style={{ minHeight: '45vh' }}>
        <img
          src="/assets/hero.png"
          alt="ArthaLoka playground"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        {/* Logo overlay di atas hero */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/10 px-6">
          <AppLogo variant="horizontal" size="xl" />
        </div>
      </div>

      {/* CONTENT SECTION — login card */}
      <div className="flex-1 bg-gradient-to-b from-green-50 to-blue-50 flex flex-col items-center justify-center px-6 py-8">

        {/* Ilustrasi kecil */}
        <div className="mb-6">
          <img
            src="/assets/ilustrasi.png"
            alt="Main sambil belajar keuangan"
            width={200} height={174}
            className="object-contain mx-auto drop-shadow-md"
            style={{ width: 'auto', height: 174 }}
          />
        </div>

        {/* Login card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-7 shadow-xl max-w-sm w-full">
          {/* Login buttons */}
          <div className="flex flex-col gap-4">
            {/* Google Login */}
            <button
              onClick={handleGoogleLogin}
              className="flex items-center justify-center gap-3 w-full py-4 px-6 rounded-2xl bg-white border-2 border-gray-200 text-gray-700 font-bold text-base hover:border-green-400 hover:shadow-lg transition-all duration-200 active:scale-[0.98]"
            >
              <svg width="22" height="22" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
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
          <p className="mt-8 text-xs text-center text-gray-400">
            Gamifikasi Literasi Keuangan Indonesia 🇮🇩
          </p>
        </div>
      </div>
    </main>
  );
}
