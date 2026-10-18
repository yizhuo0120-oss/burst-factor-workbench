"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, SectionHeader, LayerChip, ScoreDial, Bar, toast, EmptyState } from "@/components/ui";
import { PREDICT_SAMPLE } from "@/lib/mock-data";
import { scoreNote, scoreLabel, type ScoreResult } from "@/lib/scoring";

export default function PredictPage() {
  const [text, setText] = useState(PREDICT_SAMPLE);
  const [scoring, setScoring] = useState(false);
  const [result, setResult] = useState<ScoreResult | null>(null);

  const run = () => {
    if (!text.trim()) {
      toast("请先粘贴一篇笔记", "error");
      return;
    }
    setScoring(true);
    setResult(null);
    // 模拟模型推理延迟
    setTimeout(() => {
      setResult(scoreNote(text));
      setScoring(false);
    }, 1200);
  };

  const label = result ? scoreLabel(result.score) : null;
  const maxContrib = result && result.hits.length > 0 ? Math.max(...result.hits.map((h) => h.contribution)) : 1;

  return (
    <div>
      <SectionHeader
        no="05"
        title="爆款预测"
        desc="发布之前，先让因子模型给你打个分。粘贴一篇写好的笔记，看它命中了哪些因子、还缺什么——把「凭感觉发布」变成「有依据优化」。"
      />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_1.2fr]">
        {/* 输入 */}
        <Card className="p-6">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-[11px] tracking-[0.24em] text-muted">粘贴你的笔记</div>
            <button
              onClick={() => setText(PREDICT_SAMPLE)}
              className="rounded-lg border border-cream-line px-3 py-1.5 text-[12px] text-muted transition-colors hover:border-gold hover:text-gold-deep"
            >
              填入示例
            </button>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={10}
            placeholder="把写好的种草笔记粘贴到这里…"
            className="w-full resize-none rounded-xl border border-cream-line bg-cream/50 p-4 text-[14px] leading-relaxed outline-none placeholder:text-muted/60 focus:border-gold focus:bg-paper"
          />
          <div className="mt-3 flex items-center justify-between">
            <span className="text-[12px] text-muted">{text.replace(/\s+/g, "").length} 字</span>
            <button
              onClick={run}
              disabled={scoring}
              className="rounded-xl bg-night px-8 py-3 text-sm font-medium text-cream transition-all hover:bg-ink-soft disabled:opacity-60"
            >
              {scoring ? "打分中…" : "开始打分"}
            </button>
          </div>
          <div className="mt-4 rounded-xl bg-cream/60 p-3.5 text-[11.5px] leading-relaxed text-muted">
            评分逻辑：因子命中加权（爆款率 × 权重）+ 化妆品广告合规检查。60 分以下建议回炉，80 分以上可直接发布。
          </div>
        </Card>

        {/* 结果 */}
        <div>
          {!result && !scoring && (
            <EmptyState
              title="等待打分"
              desc="因子模型会逐句扫描：命中了哪些因子、缺了哪些高权重因子、有没有合规风险。"
            />
          )}
          {scoring && (
            <Card className="ai-thinking flex h-[420px] flex-col items-center justify-center">
              <ScoreDial score={0} />
              <div className="mt-4 text-sm text-muted">正在扫描 16 个因子与合规词库…</div>
            </Card>
          )}
          <AnimatePresence>
            {result && label && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
                {/* 总分 */}
                <Card className="flex items-center gap-8 p-6">
                  <ScoreDial score={result.score} />
                  <div className="flex-1">
                    <div
                      className={`inline-block rounded-full px-4 py-1.5 font-display text-[16px] font-semibold ${
                        label.tone === "good"
                          ? "bg-moss-soft text-moss"
                          : label.tone === "mid"
                            ? "bg-gold-soft text-gold-deep"
                            : "bg-berry-soft text-berry"
                      }`}
                    >
                      {label.text}
                    </div>
                    <p className="mt-3 text-[13px] leading-relaxed text-muted">
                      命中 <b className="text-ink">{result.hits.length}</b> 个因子
                      {result.risks.length > 0 && (
                        <>
                          ，检出 <b className="text-berry">{result.risks.length}</b> 处合规风险
                        </>
                      )}
                      。满分 100 分。
                    </p>
                  </div>
                </Card>

                {/* 因子拆解 */}
                <Card className="p-6">
                  <div className="mb-4 text-[11px] tracking-[0.24em] text-muted">因子命中明细</div>
                  {result.hits.length === 0 ? (
                    <p className="text-[13px] text-muted">未命中任何因子——建议回炉重写开头。</p>
                  ) : (
                    <div className="space-y-3">
                      {result.hits
                        .sort((a, b) => b.contribution - a.contribution)
                        .map((h) => (
                          <div key={h.factor.id}>
                            <div className="mb-1 flex items-center justify-between text-[12.5px]">
                              <span className="flex items-center gap-2">
                                <b>「{h.factor.name}」</b>
                                <LayerChip layer={h.factor.layer} size="sm" />
                                <span className="text-muted">命中：{h.matched.join("、")}</span>
                              </span>
                              <span className="text-muted">爆款率 {h.factor.hitRate}%</span>
                            </div>
                            <Bar value={h.contribution} max={maxContrib} />
                          </div>
                        ))}
                    </div>
                  )}
                </Card>

                {/* 合规风险 */}
                {result.risks.length > 0 && (
                  <Card className="border-berry/30 p-6">
                    <div className="mb-3 flex items-center gap-2">
                      <span className="text-[11px] tracking-[0.24em] text-berry">合规风险提示</span>
                      <span className="rounded-full bg-berry-soft px-2 py-0.5 text-[11px] text-berry">
                        {result.risks.length} 处
                      </span>
                    </div>
                    <div className="space-y-2">
                      {result.risks.map((r, i) => (
                        <div key={i} className="flex items-center justify-between rounded-lg bg-berry-soft/50 px-3.5 py-2.5 text-[13px]">
                          <span>
                            <b className="text-berry">「{r.term}」</b>
                            <span className="ml-2 text-muted">{r.category}</span>
                          </span>
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                              r.level === "高风险" ? "bg-berry text-cream" : "bg-gold-soft text-gold-deep"
                            }`}
                          >
                            {r.level} −{r.deduction}分
                          </span>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                {/* 优化建议 */}
                <Card className="p-6">
                  <div className="mb-3 text-[11px] tracking-[0.24em] text-muted">优化建议</div>
                  <ol className="space-y-2.5">
                    {result.suggestions.map((s, i) => (
                      <li key={i} className="flex gap-3 text-[13px] leading-relaxed">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-night text-[11px] text-cream">
                          {i + 1}
                        </span>
                        <span className={s.startsWith("合规风险") ? "text-berry" : "text-ink-soft"}>{s}</span>
                      </li>
                    ))}
                  </ol>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
