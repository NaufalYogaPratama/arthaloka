import type { Metadata } from "next";
import { Nunito, Fredoka } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import AnimatedRoute from "@/components/layout/AnimatedRoute";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ArthaLoka — Belajar Keuangan, Main Engklek!",
  description:
    "Tingkatkan literasi keuanganmu melalui permainan tradisional Engklek yang seru dan edukatif!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${nunito.variable} ${fredoka.variable} font-sans antialiased`}
      >
        <SessionProvider>
          <AnimatedRoute>{children}</AnimatedRoute>
        </SessionProvider>
      </body>
    </html>
  );
}
