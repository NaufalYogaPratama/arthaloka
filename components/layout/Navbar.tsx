"use client";

import { usePathname } from "next/navigation";
import AppLogo from "@/components/ui/AppLogo";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Navbar() {
    const pathname = usePathname();
    const { data: session } = useSession();

    if (pathname === "/game") {
        return null;
    }

    return (
        <header className="sticky top-0 z-50 h-[64px] bg-white border-b border-gray-100 shadow-sm transition-all duration-300">
            <div className="max-w-6xl mx-auto h-full px-4 flex items-center justify-between">
                <Link href="/" className="hover:opacity-90 transition-opacity">
                    <AppLogo variant="horizontal" size="md" priority />
                </Link>

                <div className="flex items-center gap-4">
                    {/* Placeholder slot for right side of navbar */}
                    {session?.user && (
                        <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-700 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                            <span className="w-6 h-6 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center text-white text-xs font-bold shadow-inner">
                                {session.user.name?.[0]?.toUpperCase() || "G"}
                            </span>
                            <span className="truncate max-w-[120px]">
                                {session.user.name || "Guest Hero"}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
