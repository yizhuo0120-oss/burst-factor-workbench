import Image from "next/image";

const LOOP = [
  { no: "01", name: "发现", desc: "爆款雷达" },
  { no: "02", name: "拆解", desc: "智能拆解" },
  { no: "03", name: "沉淀", desc: "因子图鉴" },
  { no: "04", name: "复用", desc: "配方实验室" },
  { no: "05", name: "验证", desc: "爆款预测" },
  { no: "06", name: "进化", desc: "数据回流" },
];

const STATS = [
  { value: "16", label: "爆款因子沉淀" },
  { value: "2,314", label: "篇已发布笔记" },
  { value: "6", label: "大功能闭环" },
];

export default function Cover() {
  return (
    <div
      className="fixed inset-0 z-[80] overflow-y-auto text-ink"
      style={{
        background:
          "radial-gradient(1100px 600px at 85% -10%, rgba(179,135,44,.14), transparent 60%), radial-gradient(900px 700px at -10% 110%, rgba(122,46,46,.08), transparent 55%), #F7F0E2",
      }}
    >
      <div className="flex min-h-full flex-col">
        {/* 顶栏 */}
        <header className="flex items-center justify-between px-6 py-5 md:px-11">
          <div className="flex items-center gap-3.5">
            <div
              className="font-display flex h-[46px] w-[46px] items-center justify-center rounded-xl text-2xl font-bold text-[#FFFDF7]"
              style={{
                background: "linear-gradient(135deg,#C99B3A,#8F6C1F)",
                boxShadow: "0 6px 18px rgba(143,108,31,.35)",
              }}
            >
              爆
            </div>
            <div>
              <b className="font-display block text-[19px] tracking-wide">爆款因子工作台</b>
              <small className="text-[11px] tracking-[0.42em] text-ink-soft">美妆版 · BEAUTY</small>
            </div>
          </div>
          <div className="rounded-full border border-gold/55 bg-paper/60 px-5 py-2 text-xs tracking-[0.28em] text-gold-deep">
            概念演示 DEMO
          </div>
        </header>

        {/* 主体 */}
        <main className="mx-auto grid w-full max-w-[1280px] flex-1 items-center gap-10 px-6 py-5 md:grid-cols-[1.05fr_0.95fr] md:px-11">
          <section>
            <div className="rise-in mb-6 inline-flex items-center gap-2.5 text-xs tracking-[0.34em] text-gold-deep">
              <span className="inline-block h-px w-[34px] bg-gold" />
              AI 美妆内容方法论 · 候选人作品
            </div>
            <h1
              className="rise-in font-display mb-5 text-[clamp(40px,4.6vw,64px)] leading-[1.28] font-bold tracking-wide"
              style={{ animationDelay: ".12s" }}
            >
              爆款，是可以
              <br />
              被<span className="text-gold-deep">设计</span>的。
            </h1>
            <p
              className="rise-in mb-9 max-w-[520px] text-base leading-8 text-ink-soft"
              style={{ animationDelay: ".24s" }}
            >
              我们不生产内容，我们生产<b className="text-ink">爆款的方法论</b>。
              <br />
              2,314 篇美妆爆款笔记 → 拆解为 <b className="text-ink">16 个爆款因子</b> →
              因子驱动生成、预测与数据回流，
              <br />
              让每一次内容生产都有据可依、越用越准。
            </p>
            <div className="rise-in mb-11 flex flex-wrap items-center gap-5" style={{ animationDelay: ".36s" }}>
              <a
                href="/radar"
                className="inline-flex items-center gap-3 rounded-full bg-ink px-11 py-[18px] text-base tracking-[0.14em] text-[#FFF8EA] transition-all duration-300 hover:-translate-y-0.5"
                style={{ boxShadow: "0 14px 34px rgba(33,27,20,.28)" }}
              >
                进入工作台 <span className="text-xl">→</span>
              </a>
              <span className="text-xs tracking-wider text-ink-soft">
                约 4 分钟，体验 发现→拆解→沉淀→复用→验证→进化 完整闭环
              </span>
            </div>

            {/* 六步闭环 */}
            <div
              className="rise-in grid max-w-[640px] grid-cols-3 overflow-hidden rounded-2xl border border-ink/10 bg-paper/55 md:flex"
              style={{ animationDelay: ".48s" }}
            >
              {LOOP.map((s, i) => (
                <div key={s.no} className="relative flex-1 px-1.5 py-3.5 text-center">
                  {i > 0 && (
                    <span className="absolute top-1/2 -left-[7px] hidden -translate-y-1/2 text-[13px] text-gold md:block">
                      →
                    </span>
                  )}
                  <b className="font-display mb-1 block text-[13px] tracking-widest">
                    {s.no} {s.name}
                  </b>
                  <span className="text-[11px] tracking-wider text-ink-soft">{s.desc}</span>
                </div>
              ))}
            </div>

            {/* 数据 */}
            <div className="rise-in mt-8 flex gap-9" style={{ animationDelay: ".48s" }}>
              {STATS.map((s) => (
                <div key={s.label}>
                  <b className="font-display block text-[30px] text-ink">
                    <i className="text-gold-deep not-italic">{s.value}</i>
                  </b>
                  <span className="text-xs tracking-[0.14em] text-ink-soft">{s.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 视觉 */}
          <section className="rise-in relative order-first flex justify-center md:order-none" style={{ animationDelay: ".24s" }}>
            <div className="relative w-[min(400px,80%)]">
              <div className="pointer-events-none absolute inset-0 translate-x-[18px] translate-y-[18px] rounded-t-[200px] rounded-b-[22px] border border-gold opacity-65" />
              <div
                className="relative aspect-[3/4.1] overflow-hidden rounded-t-[200px] rounded-b-[22px]"
                style={{ boxShadow: "0 30px 70px rgba(33,27,20,.22)" }}
              >
                <Image
                  src="/hero.jpg"
                  alt="美妆精华大片"
                  fill
                  className="object-cover"
                  priority
                />
                <div
                  className="pointer-events-none absolute inset-0 rounded-t-[200px] rounded-b-[22px] border border-[#FFF8EA]/50"
                  style={{ background: "linear-gradient(180deg,transparent 55%,rgba(33,27,20,.42))" }}
                />
              </div>
              <div
                className="absolute bottom-[8%] -left-[16%] rounded-2xl border border-ink/10 bg-paper/92 px-5 py-3.5 backdrop-blur-md"
                style={{ boxShadow: "0 12px 30px rgba(33,27,20,.14)" }}
              >
                <b className="text-[13px] tracking-widest">
                  <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-moss" />
                  因子库运行中
                </b>
                <small className="mt-1 block text-[11.5px] tracking-wider text-ink-soft">
                  16 因子已沉淀 · 权重每周回流校准
                </small>
              </div>
            </div>
          </section>
        </main>

        {/* 页脚 */}
        <footer className="mx-auto flex w-full max-w-[1280px] flex-wrap justify-between gap-3 border-t border-ink/10 px-6 py-4 text-[11.5px] tracking-widest text-ink-soft md:px-11">
          <span>演示数据为概念构造，仅用于作品展示</span>
          <span>爆款因子工作台 · 美妆版 © 2026</span>
        </footer>
      </div>
    </div>
  );
}
