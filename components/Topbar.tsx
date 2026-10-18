"use client";

import { usePathname } from "next/navigation";
import { NAV } from "./Sidebar";

export default function Topbar() {
  const pathname = usePathname();
  const current = NAV.find((n) => pathname === n.href || pathname.startsWith(n.href + "/"));

  return (
    <header className="sticky top-0 z-30 ml-[264px] border-b border-cream-line bg-cream/90 backdrop-blur">
      <div className="flex h-[68px] items-center justify-between px-8">
        <div className="flex items-center gap-3">
          <span className="text-[13px] text-muted">工作台</span>
          <span className="text-cream-line">/</span>
          <span className="font-display text-[15px] font-semibold text-ink">
            {current ? `${current.no} ${current.name}` : "爆款因子工作台"}
          </span>
          {current && (
            <span className="rounded-full bg-gold-soft px-2.5 py-0.5 text-[11px] font-medium text-gold-deep">
              {current.loop}阶段
            </span>
          )}
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 text-[12px] text-muted xl:flex">
            <span className="inline-block h-2 w-2 rounded-full bg-moss" />
            因子库运行中 · 基于 2,314 篇已发布笔记
          </div>
          <span className="rounded-full border border-gold/50 bg-paper px-3 py-1 text-[11px] font-medium tracking-[0.18em] text-gold-deep">
            概念演示 DEMO
          </span>
        </div>
      </div>
    </header>
  );
}
