"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, SectionHeader, LayerChip, toast, EmptyState } from "@/components/ui";
import { FACTORS, LAYER_LABEL, type Layer } from "@/lib/mock-data";

interface Para {
  text: string;
  factorId: string;
}

const DEFAULT_SET = ["f01", "f07", "f16"];

export default function LabPage() {
  const [sell, setSell] = useState("15% 玻色因精华，专为干敏肌设计的维稳配方");
  const [selected, setSelected] = useState<string[]>(["f01", "f07", "f09", "f16"]);
  const [variant, setVariant] = useState(0);
  const [result, setResult] = useState<Para[] | null>(null);
  const [generating, setGenerating] = useState(false);

  const toggle = (id: string) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const grouped = useMemo(() => {
    const g: Record<Layer, typeof FACTORS> = { hook: [], persuade: [], convert: [] };
    FACTORS.forEach((f) => g[f.layer].push(f));
    return g;
  }, []);

  const buildNote = (ids: string[], v: number): Para[] => {
    const byId = (id: string) => FACTORS.find((f) => f.id === id)!;
    const hooks = ids.filter((id) => byId(id).layer === "hook");
    const pers = ids.filter((id) => byId(id).layer === "persuade").slice(0, 3);
    const convs = ids.filter((id) => byId(id).layer === "convert");
    const pick = (f: (typeof FACTORS)[number]) =>
      f.templates[v % f.templates.length].replaceAll("{{sell}}", sell.trim() || "这款产品");
    const paras: Para[] = [];
    paras.push({ text: pick(byId(hooks[0] ?? "f01")), factorId: hooks[0] ?? "f01" });
    (pers.length > 0 ? pers : ["f07"]).forEach((id) => paras.push({ text: pick(byId(id)), factorId: id }));
    paras.push({ text: pick(byId(convs[0] ?? "f16")), factorId: convs[0] ?? "f16" });
    return paras;
  };

  const generate = (v: number) => {
    if (!sell.trim()) {
      toast("请先输入产品卖点", "error");
      return;
    }
    setGenerating(true);
    setResult(null);
    const ids = selected.length > 0 ? selected : DEFAULT_SET;
    if (selected.length === 0) toast("已为你预选高权重因子组合", "info");
    setTimeout(() => {
      setResult(buildNote(ids, v));
      setGenerating(false);
      toast("笔记已生成，每段均标注因子来源");
    }, 900);
  };

  const copyText = async () => {
    if (!result) return;
    const plain = result.map((p) => p.text).join("\n\n");
    try {
      await navigator.clipboard.writeText(plain);
      toast("文案已复制，去小红书发布吧 ✓");
    } catch {
      toast("复制失败，请手动选择文本", "error");
    }
  };

  return (
    <div>
      <SectionHeader
        no="04"
        title="配方实验室"
        desc="因子库的应用层：挑选因子、输入卖点，一键组装带方法论标注的种草笔记——每一段都知道自己为什么这样写。"
      />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_1.1fr]">
        {/* 左：输入 + 选因子 */}
        <div className="space-y-5">
          <Card className="p-6">
            <div className="mb-3 text-[11px] tracking-[0.24em] text-muted">STEP 1 — 输入产品卖点</div>
            <input
              value={sell}
              onChange={(e) => setSell(e.target.value)}
              placeholder="如：15% 玻色因精华，专为干敏肌设计"
              className="w-full rounded-xl border border-cream-line bg-cream/50 px-4 py-3 text-[14px] outline-none placeholder:text-muted/60 focus:border-gold focus:bg-paper"
            />
          </Card>

          <Card className="p-6">
            <div className="mb-1 flex items-center justify-between">
              <div className="text-[11px] tracking-[0.24em] text-muted">STEP 2 — 挑选爆款因子</div>
              <div className="text-[12px] text-muted">
                已选 <b className="text-gold-deep">{selected.length}</b> 个（建议 3–5 个）
              </div>
            </div>
            {(Object.keys(grouped) as Layer[]).map((layer) => (
              <div key={layer} className="mt-4">
                <div className="mb-2 flex items-center gap-2">
                  <LayerChip layer={layer} size="sm" />
                  <span className="text-[11px] text-muted">
                    {layer === "hook" ? "选 1 个开场" : layer === "persuade" ? "选 1–3 个说服" : "选 1 个收尾"}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {grouped[layer].map((f) => {
                    const on = selected.includes(f.id);
                    return (
                      <button
                        key={f.id}
                        onClick={() => toggle(f.id)}
                        className={`rounded-full border px-3.5 py-1.5 text-[12.5px] transition-all ${
                          on
                            ? "border-gold bg-gold font-medium text-night shadow-sm"
                            : "border-cream-line bg-paper text-ink-soft hover:border-gold/60"
                        }`}
                      >
                        {on ? "✓ " : ""}{f.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
            <div className="mt-5 text-[11px] text-muted">{LAYER_LABEL.hook}等三层的说明见 03 因子图鉴。</div>
          </Card>

          <button
            onClick={() => generate(variant)}
            disabled={generating}
            className="w-full rounded-2xl bg-night py-4 font-display text-[16px] font-semibold tracking-[0.2em] text-cream transition-all hover:bg-ink-soft disabled:opacity-60"
          >
            {generating ? "组装中…" : "✦ 生成笔记"}
          </button>
        </div>

        {/* 右：结果 */}
        <div>
          <Card className="min-h-[560px] p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="text-[11px] tracking-[0.24em] text-muted">STEP 3 — 生成结果</div>
              {result && (
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      const v = variant + 1;
                      setVariant(v);
                      generate(v);
                    }}
                    className="rounded-lg border border-cream-line px-3.5 py-1.5 text-[12px] text-ink-soft transition-colors hover:border-gold hover:text-gold-deep"
                  >
                    ↻ 重新生成
                  </button>
                  <button
                    onClick={copyText}
                    className="rounded-lg bg-gold px-3.5 py-1.5 text-[12px] font-medium text-night transition-colors hover:bg-gold-deep hover:text-cream"
                  >
                    复制文案
                  </button>
                </div>
              )}
            </div>

            {!result && !generating && (
              <EmptyState
                title="实验室待命"
                desc="输入卖点、挑选因子，点击生成——看方法论如何变成一篇结构完整的种草笔记。"
              />
            )}
            {generating && (
              <div className="ai-thinking flex h-[420px] flex-col items-center justify-center text-sm text-muted">
                <div className="font-display text-2xl text-gold">✦</div>
                <div className="mt-3">正在按因子组装段落…</div>
              </div>
            )}
            <AnimatePresence>
              {result && (
                <motion.div
                  key={variant}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  {result.map((p, i) => {
                    const f = FACTORS.find((x) => x.id === p.factorId)!;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.18 }}
                        className="rounded-xl border border-cream-line bg-cream/40 p-4"
                      >
                        <p className="font-display text-[15px] leading-relaxed text-ink">{p.text}</p>
                        <div className="mt-2.5 flex items-center gap-2">
                          <span className="text-[11px] text-muted">因子来源</span>
                          <span className="factor-tag rounded px-1 text-[12px] font-medium text-gold-deep">
                            「{f.name}」
                          </span>
                          <LayerChip layer={f.layer} size="sm" />
                          <span className="text-[11px] text-muted">爆款率 {f.hitRate}%</span>
                        </div>
                      </motion.div>
                    );
                  })}
                  <div className="rounded-xl bg-moss-soft/60 p-4 text-[12.5px] leading-relaxed text-moss">
                    ✓ 全篇命中 {new Set(result.map((p) => p.factorId)).size} 个因子，覆盖钩子 / 话术 / 转化三层——可直接进入 05 爆款预测打分。
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </div>
      </div>
    </div>
  );
}
