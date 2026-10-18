"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  Legend,
} from "recharts";
import { Card, SectionHeader, Bar } from "@/components/ui";
import {
  WEIGHT_DRIFT,
  HIT_RATE_TREND,
  FUNNEL,
  RISING_FACTORS,
  DECLINING_FACTORS,
  TOP_FACTORS_WEEK,
  FACTORS,
} from "@/lib/mock-data";

const LINE_COLORS = ["#9c3d54", "#b3872c", "#2e7d4f", "#4a3f32", "#8a7b68"];

const tooltipStyle = {
  backgroundColor: "#fffdf8",
  border: "1px solid #e9dfce",
  borderRadius: 12,
  fontSize: 12,
};

export default function InsightsPage() {
  const maxFunnel = FUNNEL[0].count;

  return (
    <div>
      <SectionHeader
        no="06"
        title="数据回流看板"
        desc="发布后的真实互动数据回流，校准每一个因子的爆款率——方法论越用越准，这才是资产和工具的区别。"
      />

      {/* TOP5 */}
      <Card className="mb-5 p-6">
        <div className="mb-1 flex items-baseline justify-between">
          <div className="text-[11px] tracking-[0.24em] text-muted">本周因子爆款率 TOP 5</div>
          <div className="text-[11px] text-muted">基于 2,314 篇已发布笔记的真实互动数据</div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-5">
          {TOP_FACTORS_WEEK.map((f, i) => (
            <div key={f.id} className="rounded-xl bg-cream/60 p-4">
              <div className="flex items-center gap-2">
                <span className="font-display text-[13px] text-gold">0{i + 1}</span>
                <span className="text-[13px] font-medium">「{f.name}」</span>
              </div>
              <div className="font-display mt-2 text-[26px] font-bold">
                {f.hitRate}
                <span className="text-[12px] font-normal text-muted">%</span>
              </div>
              <div className="mt-1 text-[11px] text-muted">权重 {f.weight.toFixed(1)}</div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* 权重漂移 */}
        <Card className="p-6">
          <div className="mb-1 text-[11px] tracking-[0.24em] text-muted">因子权重变化</div>
          <div className="mb-4 text-[11px] text-muted">相对上周 · 权重漂移超阈值自动触发复审</div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={WEIGHT_DRIFT} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e9dfce" />
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#8a7b68" }} />
                <YAxis domain={[5.5, 10]} tick={{ fontSize: 11, fill: "#8a7b68" }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                {TOP_FACTORS_WEEK.map((f, i) => (
                  <Line
                    key={f.id}
                    type="monotone"
                    dataKey={f.name}
                    stroke={LINE_COLORS[i % LINE_COLORS.length]}
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* 爆款率趋势 */}
        <Card className="p-6">
          <div className="mb-1 text-[11px] tracking-[0.24em] text-muted">整体爆款率趋势</div>
          <div className="mb-4 text-[11px] text-muted">8 周 · 互动量超阈值笔记占比</div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={HIT_RATE_TREND} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
                <defs>
                  <linearGradient id="hitGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#b3872c" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#b3872c" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e9dfce" />
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#8a7b68" }} />
                <YAxis domain={[28, 40]} tick={{ fontSize: 11, fill: "#8a7b68" }} unit="%" />
                <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v}%`, "爆款率"]} />
                <Area type="monotone" dataKey="rate" stroke="#b3872c" strokeWidth={2.5} fill="url(#hitGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* 漏斗 */}
        <Card className="p-6">
          <div className="mb-1 text-[11px] tracking-[0.24em] text-muted">采纳 / 驳回漏斗</div>
          <div className="mb-5 text-[11px] text-muted">从收录到爆款的全链路转化</div>
          <div className="space-y-4">
            {FUNNEL.map((s, i) => {
              const rate = i === 0 ? 100 : Math.round((s.count / FUNNEL[i - 1].count) * 100);
              return (
                <div key={s.stage}>
                  <div className="mb-1.5 flex items-baseline justify-between text-[13px]">
                    <span>
                      <b className="font-display">{s.stage}</b>
                      <span className="ml-2 text-[11px] text-muted">{s.desc}</span>
                    </span>
                    <span>
                      <b className="font-display text-[16px]">{s.count.toLocaleString()}</b>
                      {i > 0 && <span className="ml-2 text-[11px] text-moss">转化 {rate}%</span>}
                    </span>
                  </div>
                  <Bar value={s.count} max={maxFunnel} color={i === FUNNEL.length - 1 ? "#9c3d54" : "#b3872c"} height={10} />
                </div>
              );
            })}
          </div>
        </Card>

        {/* 涨跌榜 */}
        <div className="space-y-5">
          <Card className="p-6">
            <div className="mb-4 text-[11px] tracking-[0.24em] text-muted">上升最快的因子</div>
            <div className="space-y-3">
              {RISING_FACTORS.map((r) => {
                const f = FACTORS.find((x) => x.id === r.id)!;
                return (
                  <div key={r.id} className="flex items-center justify-between rounded-xl bg-cream/60 px-4 py-3">
                    <div>
                      <div className="text-[13.5px] font-medium">「{f.name}」</div>
                      <div className="text-[11px] text-muted">{r.note}</div>
                    </div>
                    <span className="font-display text-[18px] font-bold text-moss">{r.delta}</span>
                  </div>
                );
              })}
              {DECLINING_FACTORS.map((r) => {
                const f = FACTORS.find((x) => x.id === r.id)!;
                return (
                  <div key={r.id} className="flex items-center justify-between rounded-xl bg-berry-soft/40 px-4 py-3">
                    <div>
                      <div className="text-[13.5px] font-medium">「{f.name}」</div>
                      <div className="text-[11px] text-muted">{r.note}</div>
                    </div>
                    <span className="font-display text-[18px] font-bold text-berry">{r.delta}</span>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card className="border-gold/40 bg-gold-soft/40 p-6">
            <div className="mb-2 text-[11px] tracking-[0.24em] text-gold-deep">本月洞察</div>
            <p className="font-display text-[14.5px] leading-relaxed text-ink">
              「对比实测」连续 3 周登顶因子榜，「痛点暴击型钩子」在精华类目上升最快。建议：下月新品首发优先选用「对比实测 +
              痛点暴击」组合；旧模板中纯「成分党话术」占比过高的，可逐步替换。
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
