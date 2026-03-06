import type { Metadata, Viewport } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KINCIRCLE — Семейное приложение",
  description: "Многофункциональное приложение для семьи и друзей. Совместное ведение списков покупок, планирование мероприятий, вишлисты и напоминания о днях рождения.",
  keywords: ["KINCIRCLE", "семья", "друзья", "список покупок", "мероприятия", "вишлист", "Telegram Mini App"],
  authors: [{ name: "KINCIRCLE Team" }],
  icons: {
    icon: "/logo.svg",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "KINCIRCLE",
    description: "Семейное приложение для заботы друг о друге",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#7A7BFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        {/* Telegram WebApp script - must load before React */}
      </head>
      <body
        className={`${manrope.variable} ${spaceGrotesk.variable} antialiased bg-white text-[#1C1C1E]`}
      >
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
