import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vibe Venture — венчурная фирма для ИИ-стартапов",
  description:
    "Микрогранты, продуктовая обратная связь, упаковка питча и первые пилотные интро для ИИ-стартапов на ранней стадии.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        <header className="border-b border-slate-200">
          <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
            <Link href="/" className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-slate-900">
              <span className="h-2.5 w-2.5 rounded-[2px] bg-gradient-to-br from-amber-400 to-orange-500" aria-hidden="true" />
              Vibe Venture
            </Link>
            <Link
              href="/about"
              className="text-sm font-semibold text-slate-600 transition-colors hover:text-slate-900"
            >
              О компании
            </Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}