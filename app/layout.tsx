import type { Metadata } from "next";
import { Noto_Serif_SC, Noto_Sans_SC } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { Toaster } from "@/components/ui";

const serif = Noto_Serif_SC({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-noto-serif",
  display: "swap",
});

const sans = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "爆款因子工作台 · 美妆版",
  description: "把美妆爆款的偶然性，变成可复制的方法论 — AI 美妆内容方法论工作台概念演示",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="zh-CN" className={`${serif.variable} ${sans.variable}`}>
      <body className="min-h-screen bg-cream text-ink">
        <Sidebar />
        <Topbar />
        <main className="ml-[264px] min-w-0 px-8 py-8">
          <div className="mx-auto max-w-[1200px]">{children}</div>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
