import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

import QueryProvider from "@/providers/query-provider";
import Footer from "@/components/footer";
import Header from "@/components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "日本人口推移グラフアプリ",
  description:
    "このアプリについて： 本アプリは、ゆめみ フロントエンドコーディングテストの課題として作成されました。Next.js、TypeScript、Tailwind CSS を用いて開発し、状態管理には TanstackQuery と Zustand を、ホスティングには Vercel を利用しています。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full">
      <body
        className={`${geistSans.variable} flex min-h-screen flex-col bg-gray-50 antialiased`}
      >
        <Header />
        <main className="flex-grow">
          <QueryProvider>{children}</QueryProvider>
        </main>
        <Footer />
      </body>
    </html>
  );
}
