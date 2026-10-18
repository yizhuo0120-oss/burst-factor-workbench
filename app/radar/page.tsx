"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Card,
  SectionHeader,
  Drawer,
  LayerChip,
  toast,
  EmptyState,
} from "@/components/ui";
import {
  RADAR_NOTES,
  RADAR_FRESH_POOL,
  RADAR_STATUS_LABEL,
  FACTORS,
  type RadarNote,
  type RadarStatus,
} from "@/lib/mock-data";
import { getRadarNotes, subscribeRadar } from "@/lib/radar-store";

const STATUS_STYLE: Record<RadarStatus, string> = {
  pending: "bg-cream-deep text-ink-soft",
  parsing: "bg-gold-soft text-gold-deep",
  stored: "bg-moss-soft text-moss",
};

let freshCursor = 0;

export default function RadarPage() {
  const [notes, setNotes] = useState<RadarNote[]>(() => getRadarNotes());
  const [platform, setPlatform] = useState<"全部" | "小红书" | "抖音">("全部");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<RadarNote | null>(null);
  const [simulating, setSimulating] = useState(false);

  useEffect(() => subscribeRadar(() => setNotes(getRadarNotes())), []);

  const filtered = useMemo(
    () =>
      notes.filter(
        (n) =>
          (platform === "全部" || n.platform === platform) &&
          (query.trim() === "" ||
            n.title.includes(query.trim()) ||
            n.excerpt.includes(query.trim()))
      ),
    [notes, platform, query]
  );

  const stats = useMemo(() => {
    const pending = notes.filter((n) => n.status === "pending").length;
    const stored = notes.filter((n) => n.status === "stored").length;
    return [
      { label: "今日收录", value: String(notes.length), sub: "篇爆款笔记" },
      { label: "待拆解", value: String(pending), sub: "等待进入拆解流" },
      { label: "已入库", value: String(stored), sub: "沉淀为因子语料" },
      { label: "监控平台", value: "2", sub: "小红书 · 抖音" },
    ];
  }, [notes]);

  const simulateFresh = () => {
    if (simulating) return;
    setSimulating(true);
    // 模拟抓取延迟
    setTimeout(() => {
      const pool = RADAR_FRESH_POOL[freshCursor % RADAR_FRESH_POOL.length];
      freshCursor += 1;
      const note: RadarNote = {
        ...pool,
        id: `rx-${Date.now()}`,
        collectedAt: "刚刚",
        status: "pending",
      };
      setNotes((prev) => [note, ...prev]);
      setSimulating(false);
      toast(`新收录：${note.title.slice(0, 14)}…`);
    }, 900);
  };

  return (
    <div>
      <SectionHeader
        no="01"
        title="爆款雷达"
        desc="7×24 监控小红书、抖音的美妆爆款笔记。因子库的活水从这里来——每一篇爆款，都是未来的方法论语料。"
        action={
          <button
            onClick={simulateFresh}
            disabled={simulating}
            className="flex shrink-0 items-center gap-2 rounded-xl bg-night px-5 py-3 text-sm font-medium text-cream transition-all hover:bg-ink-soft disabled:opacity-60"
          >
            <span className={simulating ? "ai-thinking" : ""}>◉</span>
            {simulating ? "正在抓取…" : "模拟新收录"}
          </button>
        }
      />

      {/* banner */}
      <div className="relative mb-6 overflow-hidden rounded-2xl">
        <Image
          src="/hero.jpg"
          alt="美妆精华大片"
          width={1200}
          height={320}
          className="h-[220px] w-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-night/85 via-night/45 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center px-8">
          <div className="text-[11px] tracking-[0.32em] text-gold">发现 · DISCOVERY</div>
          <div className="font-display mt-2 max-w-xl text-[26px] leading-snug font-semibold text-cream">
            爆款，是可以被设计的。
            <br />
            我们不生产内容，我们生产爆款的方法论。
          </div>
          <div className="mt-3 grid max-w-xl grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-2xl font-bold text-cream">
                  {s.value}
                  <span className="ml-1 text-[11px] font-normal text-cream/60">{s.sub}</span>
                </div>
                <div className="text-[11px] tracking-[0.2em] text-cream/60">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* filter bar */}
      <Card className="mb-5 flex flex-wrap items-center gap-3 px-5 py-4">
        <div className="flex rounded-full bg-cream p-1">
          {(["全部", "小红书", "抖音"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPlatform(p)}
              className={`rounded-full px-4 py-1.5 text-[13px] transition-all ${
                platform === p ? "bg-night font-medium text-cream shadow" : "text-muted hover:text-ink"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
        <div className="relative flex-1 min-w-[220px]">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索标题或正文关键词，如「玻色因」「盲测」…"
            className="w-full rounded-xl border border-cream-line bg-cream/60 px-4 py-2.5 text-sm outline-none placeholder:text-muted/70 focus:border-gold focus:bg-paper"
          />
        </div>
        <div className="text-[12px] text-muted">共 {filtered.length} 篇</div>
      </Card>

      {/* feed */}
      {filtered.length === 0 ? (
        <EmptyState title="没有匹配的笔记" desc="换个关键词或平台试试，雷达 7×24 都在工作。" />
      ) : (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {filtered.map((note, i) => (
            <motion.button
              key={note.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.04, 0.4) }}
              onClick={() => setSelected(note)}
              className="rise-in text-left"
            >
              <Card className="group h-full px-5 py-4 transition-all hover:-translate-y-0.5 hover:shadow-[0_2px_4px_rgba(30,24,18,0.06),0_16px_32px_-12px_rgba(30,24,18,0.22)]">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-md px-2 py-0.5 text-[11px] font-medium ${
                          note.platform === "小红书" ? "bg-berry-soft text-berry" : "bg-night text-cream"
                        }`}
                      >
                        {note.platform}
                      </span>
                      <span className="rounded-md bg-cream px-2 py-0.5 text-[11px] text-muted">
                        {note.category}
                      </span>
                      <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${STATUS_STYLE[note.status]}`}>
                        {RADAR_STATUS_LABEL[note.status]}
                      </span>
                    </div>
                    <h3 className="mt-2 font-display text-[16px] leading-snug font-semibold text-ink group-hover:text-gold-deep">
                      {note.title}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-muted">
                      {note.excerpt}
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-cream-line pt-3 text-[12px] text-muted">
                  <div className="flex items-center gap-4">
                    <span>
                      ♥ <b className="text-ink-soft">{note.likes}</b>
                    </span>
                    <span>
                      ✎ <b className="text-ink-soft">{note.comments}</b>
                    </span>
                    <span>{note.collectedAt}收录</span>
                  </div>
                  <span className="text-gold-deep opacity-0 transition-opacity group-hover:opacity-100">
                    查看详情 →
                  </span>
                </div>
              </Card>
            </motion.button>
          ))}
        </div>
      )}

      {/* detail drawer */}
      <Drawer open={!!selected} onClose={() => setSelected(null)}>
        {selected && (
          <div className="p-7">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${STATUS_STYLE[selected.status]}`}>
                  {RADAR_STATUS_LABEL[selected.status]}
                </span>
                <span className="text-[12px] text-muted">{selected.platform} · {selected.category}</span>
              </div>
              <button onClick={() => setSelected(null)} className="text-xl text-muted hover:text-ink">×</button>
            </div>
            <h2 className="font-display mt-4 text-[22px] leading-snug font-semibold">{selected.title}</h2>
            <div className="mt-2 flex items-center gap-4 text-[13px] text-muted">
              <span>♥ {selected.likes}</span>
              <span>✎ {selected.comments} 评论</span>
              <span>{selected.collectedAt}收录</span>
            </div>

            <div className="mt-6">
              <div className="mb-2 text-[11px] tracking-[0.24em] text-muted">笔记正文</div>
              <div className="rounded-xl bg-cream/70 p-4 text-[13.5px] leading-loose text-ink-soft">
                {selected.excerpt}
              </div>
            </div>

            <div className="mt-6">
              <div className="mb-2 text-[11px] tracking-[0.24em] text-muted">已命中因子</div>
              {selected.factors.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {selected.factors.map((fid) => {
                    const f = FACTORS.find((x) => x.id === fid)!;
                    return (
                      <span key={fid} className="flex items-center gap-2 rounded-full border border-cream-line bg-paper px-3 py-1.5 text-[12px]">
                        「{f.name}」
                        <LayerChip layer={f.layer} size="sm" />
                      </span>
                    );
                  })}
                </div>
              ) : (
                <p className="text-[13px] text-muted">尚未拆解——去 02 智能拆解跑一遍 AI 初拆吧。</p>
              )}
            </div>

            <div className="mt-8 flex gap-3">
              <Link
                href="/dissect"
                className="flex-1 rounded-xl bg-night py-3 text-center text-sm font-medium text-cream transition-colors hover:bg-ink-soft"
              >
                去智能拆解 →
              </Link>
              <button
                onClick={() => {
                  toast("已加入「今日拆解队列」", "info");
                  setSelected(null);
                }}
                className="rounded-xl border border-cream-line px-5 py-3 text-sm text-ink-soft transition-colors hover:border-gold hover:text-gold-deep"
              >
                稍后处理
              </button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
