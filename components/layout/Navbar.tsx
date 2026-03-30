"use client";

import { usePathname } from "next/navigation";
import AppLogo from "@/components/ui/AppLogo";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { UserRound } from "lucide-react";

export default function Navbar() {
    const pathname = usePathname();
    const { data: session } = useSession();
    const isGoogle =
        (session?.user as Record<string, unknown>)?.authProvider === "GOOGLE";

    if (pathname === "/game") {
        return null;
    }

    return (
        <header className="sticky top-0 z-50 h-[64px] bg-white border-b border-gray-100 shadow-sm transition-all duration-300">
            <div className="max-w-6xl mx-auto h-full px-4 flex items-center justify-between">
                <Link href="/" className="hover:opacity-90 transition-opacity">
                    <AppLogo variant="horizontal" size="md" priority />
                </Link>

                <div className="flex items-center gap-2">
                    {session?.user && (
                        <>
                            {/* Nama user */}
                            <span className="text-gray-600 text-sm font-bold truncate max-w-[120px] hidden sm:block">
                                {session.user.name}
                            </span>

                            {/* Avatar/Profile button — hanya untuk Google user */}
                            {isGoogle ? (
                                <Link href="/profile">
                                    <div
                                        className="w-8 h-8 rounded-full flex items-center justify-center text-white font-black text-sm transition-all hover:opacity-80"
                                        style={{ background: "#16a34a" }}
                                        title="Lihat Profil"
                                    >
                                        {session?.user?.name?.charAt(0).toUpperCase() ??
                                            "P"}
                                    </div>
                                </Link>
                            ) : (
                                /* Guest indicator — tidak ada link ke profile */
                                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-200">
                                    <UserRound className="w-4 h-4 text-gray-500" />
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
