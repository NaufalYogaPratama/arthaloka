import type { Metadata } from "next";
import { Nunito, Fredoka } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import AnimatedRoute from "@/components/layout/AnimatedRoute";
import Navbar from "@/components/layout/Navbar";

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
    "Game edukasi literasi keuangan berbasis permainan tradisional Engklek.",
  icons: {
    icon: [
      { url: '/assets/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/assets/favicon.png', sizes: '48x48', type: 'image/png' },
      { url: '/assets/favicon.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      { url: '/assets/favicon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/assets/favicon.png',
  },
  openGraph: {
    title: 'ArthaLoka',
    description: 'Belajar Keuangan, Main Engklek!',
    images: [{ url: '/assets/logo.png', width: 1200, height: 440 }],
  },
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
          <Navbar />
          <AnimatedRoute>{children}</AnimatedRoute>
        </SessionProvider>
      </body>
    </html>
  );
}
