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
  title: "Japan Population Trends",
  description:
    "A project for visualizing Japan's population trends. Built with Next.js, and TypeScript. Uses Tanstack Query for data fetching.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} flex min-h-screen flex-col antialiased`}
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
