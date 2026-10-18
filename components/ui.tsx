"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LAYER_LABEL, type Layer } from "@/lib/mock-data";

/* ---------------- 基础 ---------------- */

export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-cream-line bg-paper shadow-[0_1px_2px_rgba(30,24,18,0.04),0_8px_24px_-12px_rgba(30,24,18,0.12)] ${className}`}
    >
      {children}
    </div>
  );
}

export function SectionHeader({
  no,
  title,
  desc,
  action,
}: {
  no: string;
  title: string;
  desc: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-6">
      <div>
        <div className="flex items-baseline gap-3">
          <span className="font-display text-sm tracking-[0.3em] text-gold">{no}</span>
          <h1 className="font-display text-[32px] leading-none font-semibold text-ink">
            {title}
          </h1>
        </div>
        <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-muted">{desc}</p>
      </div>
      {action}
    </div>
  );
}

export function LayerChip({ layer, size = "md" }: { layer: Layer; size?: "sm" | "md" }) {
  const styles: Record<Layer, string> = {
    hook: "bg-berry-soft text-berry",
    persuade: "bg-gold-soft text-gold-deep",
    convert: "bg-moss-soft text-moss",
  };
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full font-medium ${styles[layer]} ${
        size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs"
      }`}
    >
      {LAYER_LABEL[layer]}
    </span>
  );
}

export function EmptyState({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-cream-line bg-paper/60 px-6 py-14 text-center">
      <div className="font-display text-4xl text-cream-line">✦</div>
      <div className="mt-3 font-display text-lg text-ink-soft">{title}</div>
      <p className="mt-1 max-w-sm text-[13px] text-muted">{desc}</p>
    </div>
  );
}

/* ---------------- Toast ---------------- */

type ToastMsg = { id: number; message: string; tone: "success" | "info" | "error" };

export function toast(message: string, tone: ToastMsg["tone"] = "success") {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("app-toast", { detail: { message, tone, id: Date.now() + Math.random() } })
  );
}

export function Toaster() {
  const [items, setItems] = useState<ToastMsg[]>([]);
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as ToastMsg;
      setItems((prev) => [...prev, detail]);
      setTimeout(() => setItems((prev) => prev.filter((x) => x.id !== detail.id)), 3200);
    };
    window.addEventListener("app-toast", handler);
    return () => window.removeEventListener("app-toast", handler);
  }, []);
  const toneIcon = { success: "✓", info: "ℹ", error: "!" };
  const toneStyle = {
    success: "border-moss/30 bg-night text-cream",
    info: "border-gold/30 bg-night text-cream",
    error: "border-berry/40 bg-night text-cream",
  };
  return (
    <div className="pointer-events-none fixed right-6 bottom-6 z-[100] flex flex-col gap-2">
      <AnimatePresence>
        {items.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            className={`pointer-events-auto flex items-center gap-3 rounded-xl border px-4 py-3 shadow-2xl ${toneStyle[t.tone]}`}
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold text-xs font-bold text-night">
              {toneIcon[t.tone]}
            </span>
            <span className="text-sm">{t.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/* ---------------- Modal / Drawer ---------------- */

export function Modal({
  open,
  onClose,
  children,
  width = "max-w-2xl",
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: string;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-night/60 p-6 backdrop-blur-[2px]"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
            className={`w-full ${width} max-h-[86vh] overflow-y-auto rounded-2xl border border-cream-line bg-paper shadow-2xl`}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Drawer({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-night/50 backdrop-blur-[2px]"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="dark-scroll fixed top-0 right-0 z-[95] h-full w-[480px] overflow-y-auto border-l border-cream-line bg-paper shadow-2xl"
          >
            {children}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

/* ---------------- 图表小件 ---------------- */

export function Sparkline({
  data,
  width = 120,
  height = 36,
  stroke = "#b3872c",
  fill = true,
}: {
  data: number[];
  width?: number;
  height?: number;
  stroke?: string;
  fill?: boolean;
}) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  const pts = data
    .map((v, i) => `${(i / (data.length - 1)) * width},${height - 4 - ((v - min) / span) * (height - 10)}`)
    .join(" ");
  const id = React.useId().replace(/:/g, "");
  return (
    <svg width={width} height={height} className="overflow-visible">
      {fill && (
        <>
          <defs>
            <linearGradient id={`g${id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={stroke} stopOpacity="0.35" />
              <stop offset="100%" stopColor={stroke} stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points={`0,${height} ${pts} ${width},${height}`} fill={`url(#g${id})`} />
        </>
      )}
      <polyline points={pts} fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      <circle
        cx={width}
        cy={height - 4 - ((data[data.length - 1] - min) / span) * (height - 10)}
        r="3"
        fill={stroke}
      />
    </svg>
  );
}

export function ScoreDial({ score, size = 168 }: { score: number; size?: number }) {
  const r = (size - 20) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const startAngle = 135;
  const sweep = 270;
  const a0 = ((startAngle - 90) * Math.PI) / 180;
  const a1 = ((startAngle + sweep - 90) * Math.PI) / 180;
  const arc = (a: number) => `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  const bg = `M ${arc(a0)} A ${r} ${r} 0 1 1 ${arc(a1)}`;
  const frac = Math.max(0, Math.min(1, score / 100));
  const ae = ((startAngle + sweep * frac - 90) * Math.PI) / 180;
  const fg = `M ${arc(a0)} A ${r} ${r} 0 ${frac > 0.75 ? 1 : 0} 1 ${cx + r * Math.cos(ae)},${cy + r * Math.sin(ae)}`;
  const color = score >= 80 ? "#2e7d4f" : score >= 60 ? "#b3872c" : "#9c3d54";
  return (
    <svg width={size} height={size}>
      <path d={bg} fill="none" stroke="#e9dfce" strokeWidth="12" strokeLinecap="round" />
      <motion.path
        d={fg}
        fill="none"
        stroke={color}
        strokeWidth="12"
        strokeLinecap="round"
        initial={{ opacity: 0.2 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      />
      <text x={cx} y={cy - 4} textAnchor="middle" fontSize="40" fontWeight="700" fill="#1e1812" fontFamily="Noto Serif SC, serif">
        {score}
      </text>
      <text x={cx} y={cy + 22} textAnchor="middle" fontSize="12" fill="#8a7b68">
        爆款指数 / 100
      </text>
    </svg>
  );
}

export function Bar({
  value,
  max,
  color = "#b3872c",
  height = 8,
}: {
  value: number;
  max: number;
  color?: string;
  height?: number;
}) {
  return (
    <div className="w-full rounded-full bg-cream-deep" style={{ height }}>
      <motion.div
        className="rounded-full"
        style={{ background: color, height }}
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(100, (value / max) * 100)}%` }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      />
    </div>
  );
}
