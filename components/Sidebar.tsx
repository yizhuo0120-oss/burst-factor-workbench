"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const NAV = [
  { href: "/radar", no: "01", name: "爆款雷达", loop: "发现", desc: "7×24 监控收录" },
  { href: "/dissect", no: "02", name: "智能拆解", loop: "拆解", desc: "AI 初拆 + 人工校准" },
  { href: "/factors", no: "03", name: "因子图鉴", loop: "沉淀", desc: "16 因子方法论资产" },
  { href: "/lab", no: "04", name: "配方实验室", loop: "复用", desc: "因子组装生成笔记" },
  { href: "/predict", no: "05", name: "爆款预测", loop: "验证", desc: "发布前打分挑刺" },
  { href: "/insights", no: "06", name: "数据回流看板", loop: "进化", desc: "真实数据校准权重" },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="dark-scroll fixed top-0 left-0 z-40 flex h-screen w-[264px] flex-col overflow-y-auto bg-night text-cream">
      {/* brand */}
      <div className="px-6 pt-7 pb-6">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold font-display text-lg font-bold text-night">
            爆
          </span>
          <div>
            <div className="font-display text-[17px] font-semibold tracking-wide">爆款因子工作台</div>
            <div className="text-[11px] tracking-[0.28em] text-muted">美妆版 · BEAUTY</div>
          </div>
        </div>
      </div>

      <div className="mx-6 h-px bg-night-soft" />

      {/* nav */}
      <nav className="flex-1 px-3 py-5">
        {NAV.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group relative mb-1 flex items-center gap-3.5 rounded-xl px-3.5 py-3 transition-all duration-200 ${
                active ? "bg-night-soft" : "hover:bg-night-soft/60"
              }`}
            >
              <span
                className={`absolute top-1/2 left-0 h-8 w-[3px] -translate-y-1/2 rounded-full bg-gold transition-all duration-200 ${
                  active ? "opacity-100" : "opacity-0 group-hover:opacity-40"
                }`}
              />
              <span
                className={`font-display text-[13px] tracking-[0.2em] ${
                  active ? "text-gold" : "text-muted"
                }`}
              >
                {item.no}
              </span>
              <span className="flex-1">
                <span className={`block text-[14px] font-medium ${active ? "text-cream" : "text-cream/75"}`}>
                  {item.name}
                </span>
                <span className="block text-[11px] text-muted">{item.desc}</span>
              </span>
              <span
                className={`rounded-full border px-2 py-0.5 text-[11px] ${
                  active ? "border-gold/60 text-gold" : "border-night-soft text-muted"
                }`}
              >
                {item.loop}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* loop map */}
      <div className="px-6 pb-7">
        <div className="rounded-xl border border-night-soft bg-night-soft/50 p-4">
          <div className="mb-3 text-[11px] tracking-[0.24em] text-muted">方法论闭环</div>
          <div className="flex items-center justify-between">
            {NAV.map((item, i) => {
              const active = pathname === item.href;
              return (
                <div key={item.href} className="flex items-center">
                  <div
                    title={item.name}
                    className={`flex h-7 w-7 items-center justify-center rounded-full border text-[11px] transition-all ${
                      active
                        ? "border-gold bg-gold text-night"
                        : "border-night-soft text-muted"
                    }`}
                  >
                    {item.loop[0]}
                  </div>
                  {i < NAV.length - 1 && <div className="mx-[3px] h-px w-2 bg-night-soft" />}
                </div>
              );
            })}
          </div>
          <div className="mt-3 text-[11px] leading-relaxed text-muted">
            发现 → 拆解 → 沉淀 → 复用 → 验证 → 进化
          </div>
        </div>
      </div>
    </aside>
  );
}
