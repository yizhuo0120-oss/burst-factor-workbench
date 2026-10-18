"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Card, SectionHeader, Modal, LayerChip, Sparkline, Bar, EmptyState } from "@/components/ui";
import {
  FACTORS,
  LAYER_LABEL,
  LAYER_DESC,
  type Factor,
  type Layer,
} from "@/lib/mock-data";

export default function FactorsPage() {
  const [query, setQuery] = useState("");
  const [layer, setLayer] = useState<"全部" | Layer>("全部");
  const [selected, setSelected] = useState<Factor | null>(null);

  const filtered = useMemo(
    () =>
      FACTORS.filter(
        (f) =>
          (layer === "全部" || f.layer === layer) &&
          (query.trim() === "" || f.name.includes(query.trim()) || f.definition.includes(query.trim()))
      ),
    [query, layer]
  );

  const layers: Layer[] = ["hook", "persuade", "convert"];

  return (
    <div>
      <SectionHeader
        no="03"
        title="因子图鉴"
        desc="拆解沉淀下的方法论资产。每一篇爆款都可以拆成三段：开头钩子决定打开率，中间话术决定信任，结尾转化决定行动——16 个因子，每一个都有真实爆款率背书。"
      />

      {/* filter */}
      <Card className="mb-6 flex flex-wrap items-center gap-3 px-5 py-4">
        <div className="flex rounded-full bg-cream p-1">
          {(["全部", "hook", "persuade", "convert"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLayer(l)}
              className={`rounded-full px-4 py-1.5 text-[13px] transition-all ${
                layer === l ? "bg-night font-medium text-cream shadow" : "text-muted hover:text-ink"
              }`}
            >
              {l === "全部" ? "全部" : LAYER_LABEL[l]}
            </button>
          ))}
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜索因子名称或定义…"
          className="min-w-[200px] flex-1 rounded-xl border border-cream-line bg-cream/60 px-4 py-2.5 text-sm outline-none placeholder:text-muted/70 focus:border-gold focus:bg-paper"
        />
        <div className="text-[12px] text-muted">{filtered.length} 个因子</div>
      </Card>

      {filtered.length === 0 ? (
        <EmptyState title="没有匹配的因子" desc="换个关键词试试。" />
      ) : (
        layers.map((ly) => {
          const list = filtered.filter((f) => f.layer === ly);
          if (list.length === 0) return null;
          return (
            <div key={ly} className="mb-8">
              <div className="mb-3 flex items-baseline gap-3">
                <h2 className="font-display text-[19px] font-semibold">{LAYER_LABEL[ly]}</h2>
                <span className="text-[12px] text-muted">{LAYER_DESC[ly]}</span>
                <span className="text-[12px] text-gold-deep">{list.length} 个因子</span>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {list.map((f, i) => (
                  <motion.button
                    key={f.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(i * 0.05, 0.3) }}
                    onClick={() => setSelected(f)}
                    className="text-left"
                  >
                    <Card className="group h-full p-5 transition-all hover:-translate-y-0.5 hover:shadow-[0_2px_4px_rgba(30,24,18,0.06),0_16px_32px_-12px_rgba(30,24,18,0.22)]">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-display text-[16px] font-semibold group-hover:text-gold-deep">
                          「{f.name}」
                        </h3>
                        <LayerChip layer={f.layer} size="sm" />
                      </div>
                      <p className="mt-2 line-clamp-2 text-[12.5px] leading-relaxed text-muted">
                        {f.definition}
                      </p>
                      <div className="mt-4 flex items-end justify-between">
                        <div>
                          <div className="font-display text-[26px] font-bold text-ink">
                            {f.hitRate}
                            <span className="text-[13px] font-normal text-muted">%</span>
                          </div>
                          <div className="text-[11px] text-muted">历史爆款率 · 权重 {f.weight.toFixed(1)}</div>
                        </div>
                        <Sparkline
                          data={f.trend}
                          stroke={f.trend[7] >= f.trend[0] ? "#2e7d4f" : "#9c3d54"}
                        />
                      </div>
                    </Card>
                  </motion.button>
                ))}
              </div>
            </div>
          );
        })
      )}

      {/* detail modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)}>
        {selected && (
          <div className="p-8">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <h2 className="font-display text-[24px] font-semibold">「{selected.name}」</h2>
                <LayerChip layer={selected.layer} />
              </div>
              <button onClick={() => setSelected(null)} className="text-2xl text-muted hover:text-ink">×</button>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="rounded-xl bg-cream/70 p-4 text-center">
                <div className="font-display text-[28px] font-bold text-ink">{selected.hitRate}%</div>
                <div className="text-[11px] text-muted">历史爆款率</div>
              </div>
              <div className="rounded-xl bg-cream/70 p-4 text-center">
                <div className="font-display text-[28px] font-bold text-ink">{selected.weight.toFixed(1)}</div>
                <div className="text-[11px] text-muted">当前权重</div>
              </div>
              <div className="rounded-xl bg-cream/70 p-4 text-center">
                <div className={`font-display text-[28px] font-bold ${selected.trend[7] >= selected.trend[0] ? "text-moss" : "text-berry"}`}>
                  {selected.trend[7] >= selected.trend[0] ? "↗" : "↘"}
                </div>
                <div className="text-[11px] text-muted">8 周趋势</div>
              </div>
            </div>

            <div className="mt-6">
              <div className="mb-2 text-[11px] tracking-[0.24em] text-muted">8 周权重走势</div>
              <Sparkline data={selected.trend} width={560} height={72} />
              <div className="mt-1 flex justify-between text-[10px] text-muted">
                <span>8 周前</span>
                <span>本周</span>
              </div>
            </div>

            <div className="mt-6">
              <div className="mb-2 text-[11px] tracking-[0.24em] text-muted">因子定义</div>
              <p className="text-[14px] leading-relaxed text-ink-soft">{selected.definition}</p>
            </div>

            <div className="mt-5">
              <div className="mb-2 text-[11px] tracking-[0.24em] text-muted">示例文案</div>
              <div className="rounded-xl border-l-[3px] border-gold bg-gold-soft/50 p-4 font-display text-[14px] leading-relaxed text-ink">
                {selected.example}
              </div>
            </div>

            <div className="mt-5">
              <div className="mb-2 text-[11px] tracking-[0.24em] text-muted">使用建议</div>
              <p className="text-[13px] leading-relaxed text-muted">{selected.tip}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
