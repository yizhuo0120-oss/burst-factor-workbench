/* ============================================================
 * 爆款预测 · 规则引擎（纯前端模拟）
 * 分数 = 命中因子的 (爆款率 × 权重) 加权 / 全量因子加权总和
 * 合规：命中 fixtures/compliance-banned-words.json 中的违禁词扣分
 * ============================================================ */

import { FACTORS, Factor } from "./mock-data";
import bannedRaw from "./compliance-banned-words.json";

interface BannedDB {
  absolute_terms: string[];
  derogatory_terms: string[];
  fabricated_data_terms: string[];
  medical_claim_terms: string[];
  misleading_safety_terms: string[];
}
const banned = bannedRaw as BannedDB;

export interface FactorHit {
  factor: Factor;
  matched: string[];
  contribution: number;
}

export interface RiskItem {
  term: string;
  category: string;
  level: "高风险" | "中风险";
  deduction: number;
}

export interface ScoreResult {
  score: number;
  hits: FactorHit[];
  missing: Factor[];
  risks: RiskItem[];
  suggestions: string[];
}

const CATEGORY_META: {
  key: keyof BannedDB;
  label: string;
  level: "高风险" | "中风险";
  deduction: number;
}[] = [
  { key: "absolute_terms", label: "绝对化用语", level: "高风险", deduction: 8 },
  { key: "medical_claim_terms", label: "医疗功效宣称", level: "高风险", deduction: 8 },
  { key: "fabricated_data_terms", label: "虚构数据/时效承诺", level: "高风险", deduction: 6 },
  { key: "derogatory_terms", label: "贬损/诱导用语", level: "中风险", deduction: 5 },
  { key: "misleading_safety_terms", label: "误导性安全宣称", level: "中风险", deduction: 4 },
];

const MAX_TOTAL = FACTORS.reduce((s, f) => s + f.hitRate * f.weight, 0);

export function scoreNote(text: string): ScoreResult {
  const clean = text.replace(/\s+/g, "");

  // ---- 因子命中 ----
  const hits: FactorHit[] = [];
  for (const factor of FACTORS) {
    const matched = factor.keywords.filter((kw) => kw.length > 1 && clean.includes(kw));
    // 单字关键词（如 "?"）单独处理
    if (factor.keywords.includes("?") && text.includes("?")) {
      if (!matched.includes("?")) matched.push("?");
    }
    if (matched.length > 0) {
      hits.push({ factor, matched, contribution: factor.hitRate * factor.weight });
    }
  }
  const hitSum = hits.reduce((s, h) => s + h.contribution, 0);
  let score = Math.round((hitSum / MAX_TOTAL) * 100);
  score = Math.max(5, Math.min(98, score));

  // ---- 合规检查 ----
  const risks: RiskItem[] = [];
  const seen = new Set<string>();
  for (const meta of CATEGORY_META) {
    for (const term of banned[meta.key]) {
      if (term.length < 2) continue;
      // 支持 "最后X件" 这类模板词：只匹配字面部分
      const literal = term.replace(/X/g, "");
      if (literal && clean.includes(literal) && !seen.has(term)) {
        seen.add(term);
        risks.push({ term, category: meta.label, level: meta.level, deduction: meta.deduction });
      }
    }
  }
  const totalDeduction = Math.min(
    30,
    risks.reduce((s, r) => s + r.deduction, 0)
  );
  score = Math.max(5, score - totalDeduction);

  // ---- 缺失的高权重因子 ----
  const hitIds = new Set(hits.map((h) => h.factor.id));
  const missing = FACTORS.filter((f) => !hitIds.has(f.id))
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 3);

  // ---- 优化建议 ----
  const suggestions: string[] = [];
  for (const m of missing) {
    suggestions.push(`建议加入「${m.name}」：${m.tip}`);
  }
  for (const r of risks.slice(0, 3)) {
    suggestions.push(
      `合规风险（${r.level}·${r.category}）：「${r.term}」建议改写或删除，化妆品广告禁用${r.category}表述。`
    );
  }
  if (hits.length === 0) {
    suggestions.unshift("未命中任何爆款因子：建议先从「痛点暴击型钩子」重写开头，再补一个实测类话术。");
  }

  return { score, hits, missing, risks, suggestions };
}

export function scoreLabel(score: number): { text: string; tone: "good" | "mid" | "bad" } {
  if (score >= 80) return { text: "可直接发布", tone: "good" };
  if (score >= 60) return { text: "优化后发布", tone: "mid" };
  return { text: "建议回炉", tone: "bad" };
}
