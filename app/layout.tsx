import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VyomAI - Next-Gen Banking Security",
  description: "AI-Powered Banking Security and Fraud Detection Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-slate-900 to-slate-800 text-white min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
