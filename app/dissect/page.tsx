"use client";

import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, SectionHeader, LayerChip, toast, EmptyState } from "@/components/ui";
import {
  FACTORS,
  DISSECT_SAMPLE,
  LAYER_LABEL,
  type Factor,
  type Layer,
} from "@/lib/mock-data";
import { addRadarNote } from "@/lib/radar-store";

/* ---------- 分段 & 因子指派 ---------- */

interface Segment {
  text: string;
  factorId: string;
  auto: boolean; // 是否为 AI 指派（人工改过则为 false）
}

function splitSegments(text: string): string[] {
  return text
    .split(/(?<=[。！？!?\n])/)
    .map((s) => s.trim())
    .filter((s) => s.length > 1);
}

function assignFactor(seg: string, index: number, total: number): Factor {
  const clean = seg.replace(/\s+/g, "");
  // 特殊规则
  if (/第\d+瓶|空瓶/.test(clean)) return FACTORS.find((f) => f.id === "f15")!;
  if (/评论区/.test(clean)) return FACTORS.find((f) => f.id === "f16")!;
  // 关键词打分
  let best: Factor | null = null;
  let bestScore = 0;
  for (const f of FACTORS) {
    let s = 0;
    for (const kw of f.keywords) {
      if (kw.length > 1 && clean.includes(kw)) s += 2;
    }
    s += f.weight / 20; // 权重平滑，避免零分段全 fallback
    if (s > bestScore) {
      bestScore = s;
      best = f;
    }
  }
  // 关键词完全没命中时按位置兜底
  if (!best || bestScore < 2) {
    if (index === 0) return FACTORS.find((f) => f.id === "f01")!;
    if (index === total - 1) return FACTORS.find((f) => f.id === "f16")!;
    return FACTORS.find((f) => f.id === "f09")!;
  }
  return best;
}

type Phase = "idle" | "thinking" | "revealing" | "done";

export default function DissectPage() {
  const [text, setText] = useState(DISSECT_SAMPLE);
  const [phase, setPhase] = useState<Phase>("idle");
  const [segments, setSegments] = useState<Segment[]>([]);
  const [revealed, setRevealed] = useState(0);
  const [category, setCategory] = useState("精华");
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const startDissect = () => {
    if (!text.trim()) {
      toast("请先粘贴一篇笔记", "error");
      return;
    }
    clearTimers();
    const segs = splitSegments(text);
    const assigned = segs.map((s, i) => ({
      text: s,
      factorId: assignFactor(s, i, segs.length).id,
      auto: true,
    }));
    setSegments(assigned);
    setRevealed(0);
    setPhase("thinking");
    // 模拟 AI 思考
    timers.current.push(
      window.setTimeout(() => {
        setPhase("revealing");
        assigned.forEach((_, i) => {
          timers.current.push(
            window.setTimeout(() => {
              setRevealed(i + 1);
              if (i === assigned.length - 1) setPhase("done");
            }, 420 * (i + 1))
          );
        });
      }, 1400)
    );
  };

  const changeFactor = (idx: number, factorId: string) => {
    setSegments((prev) =>
      prev.map((s, i) => (i === idx ? { ...s, factorId, auto: false } : s))
    );
  };

  const confirmStore = () => {
    if (phase !== "done") return;
    addRadarNote({
      id: `rx-${Date.now()}`,
      title: text.replace(/\s+/g, "").slice(0, 20) + "…",
      platform: "小红书",
      likes: "—",
      comments: "—",
      collectedAt: "刚刚",
      status: "stored",
      category,
      excerpt: text.replace(/\s+/g, " ").slice(0, 120),
      factors: segments.map((s) => s.factorId),
    });
    toast("确认入库 ✓ 因子库语料 +1，雷达已同步");
  };

  const layerCoverage = useMemo(() => {
    const layers = new Set<Layer>();
    segments.forEach((s) => {
      const f = FACTORS.find((x) => x.id === s.factorId);
      if (f) layers.add(f.layer);
    });
    return layers;
  }, [segments]);

  const grouped = useMemo(() => {
    const g: Record<Layer, Factor[]> = { hook: [], persuade: [], convert: [] };
    FACTORS.forEach((f) => g[f.layer].push(f));
    return g;
  }, []);

  return (
    <div>
      <SectionHeader
        no="02"
        title="智能拆解"
        desc="粘贴一篇笔记，AI 先做初拆，再由人工校准——12 分钟入库。AI 做召回，人做判定，这是整套方法论的人机分工原则。"
      />

      {/* 输入区 */}
      <Card className="mb-5 p-6">
        <div className="mb-3 flex items-center justify-between">
          <div className="text-[11px] tracking-[0.24em] text-muted">STEP 1 — 粘贴笔记正文</div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setText(DISSECT_SAMPLE)}
              className="rounded-lg border border-cream-line px-3 py-1.5 text-[12px] text-muted transition-colors hover:border-gold hover:text-gold-deep"
            >
              填入示例
            </button>
            <button
              onClick={() => {
                setText("");
                setPhase("idle");
                setSegments([]);
                setRevealed(0);
                clearTimers();
              }}
              className="rounded-lg border border-cream-line px-3 py-1.5 text-[12px] text-muted transition-colors hover:border-berry hover:text-berry"
            >
              清空
            </button>
          </div>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
          placeholder="把小红书 / 抖音的爆款笔记正文粘贴到这里…"
          className="w-full resize-none rounded-xl border border-cream-line bg-cream/50 p-4 text-[14px] leading-relaxed outline-none placeholder:text-muted/60 focus:border-gold focus:bg-paper"
        />
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[13px] text-muted">
            <span>类目</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-lg border border-cream-line bg-paper px-3 py-1.5 text-[13px] outline-none focus:border-gold"
            >
              {["精华", "面霜", "面膜", "底妆", "防晒", "眼霜", "套装", "护肤科普"].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <span className="ml-2">{text.replace(/\s+/g, "").length} 字</span>
          </div>
          <button
            onClick={startDissect}
            disabled={phase === "thinking" || phase === "revealing"}
            className="rounded-xl bg-night px-8 py-3 text-sm font-medium text-cream transition-all hover:bg-ink-soft disabled:opacity-60"
          >
            {phase === "idle" || phase === "done" ? "✦ AI 初拆" : "拆解中…"}
          </button>
        </div>
      </Card>

      {/* 结果区 */}
      {phase === "idle" && segments.length === 0 && (
        <EmptyState
          title="等待投喂第一篇笔记"
          desc="点击「填入示例」或粘贴真实笔记，看 AI 如何把一段文字拆成带方法论标注的因子片段。"
        />
      )}

      {(phase === "thinking" || phase === "revealing" || phase === "done") && (
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="text-[11px] tracking-[0.24em] text-muted">
              STEP 2 — AI 初拆 {phase !== "done" && <span className="ai-thinking text-gold">● 思考中</span>}
            </div>
            {phase === "done" && (
              <div className="flex items-center gap-2 text-[12px] text-muted">
                <span>
                  命中 <b className="text-ink">{new Set(segments.map((s) => s.factorId)).size}</b> 个因子
                </span>
                <span>·</span>
                <span>
                  覆盖 <b className="text-ink">{layerCoverage.size}</b>/3 层
                </span>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <AnimatePresence>
              {segments.slice(0, revealed).map((seg, i) => {
                const f = FACTORS.find((x) => x.id === seg.factorId)!;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-start gap-4 rounded-xl border p-4 transition-colors ${
                      seg.auto ? "border-cream-line bg-cream/40" : "border-gold/50 bg-gold-soft/40"
                    }`}
                  >
                    <span className="font-display mt-0.5 text-[12px] text-muted">{String(i + 1).padStart(2, "0")}</span>
                    <p className="flex-1 text-[14px] leading-relaxed text-ink">{seg.text}</p>
                    <div className="flex w-[240px] shrink-0 flex-col gap-1.5">
                      <div className="flex items-center gap-2">
                        <LayerChip layer={f.layer} size="sm" />
                        {!seg.auto && (
                          <span className="text-[11px] text-gold-deep">人工已校准</span>
                        )}
                      </div>
                      <select
                        value={seg.factorId}
                        onChange={(e) => changeFactor(i, e.target.value)}
                        className="w-full rounded-lg border border-cream-line bg-paper px-2.5 py-2 text-[12.5px] outline-none focus:border-gold"
                      >
                        {(Object.keys(grouped) as Layer[]).map((layer) => (
                          <optgroup key={layer} label={LAYER_LABEL[layer]}>
                            {grouped[layer].map((opt) => (
                              <option key={opt.id} value={opt.id}>
                                {opt.name}（爆款率{opt.hitRate}%）
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
            {phase === "thinking" && (
              <div className="ai-thinking rounded-xl border border-dashed border-cream-line p-8 text-center text-sm text-muted">
                正在识别钩子 / 话术 / 转化三层结构…
              </div>
            )}
          </div>

          {phase === "done" && (
            <div className="mt-6 flex items-center justify-between rounded-xl bg-night px-6 py-4">
              <div className="text-[13px] text-cream/80">
                STEP 3 — 人工校准完成？确认后将进入雷达「已入库」。
              </div>
              <button
                onClick={confirmStore}
                className="rounded-xl bg-gold px-8 py-2.5 text-sm font-medium text-night transition-all hover:bg-gold-deep hover:text-cream"
              >
                确认入库 →
              </button>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
