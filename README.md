爆款因子工作台 · 美妆版
爆款，是可以被设计的。
AI 美妆内容方法论工作台 · 概念演示（Concept Demo）
这是什么
为珀莱雅 AI 产品经理面试准备的 Web Coding 作品（第二件）。它回答一个问题：美妆爆款能不能从"靠玄学"变成"可复制的方法论"？
产品把一条完整的方法论闭环做成可交互的工作台：
发现 → 拆解 → 沉淀 → 复用 → 验证 → 进化
发现：爆款雷达实时收录各平台高互动美妆笔记
拆解：AI 初拆 + 人工校准，把一篇爆款笔记拆成"因子"
沉淀：16 个爆款因子进入图鉴，成为团队资产
复用：配方实验室用因子拼装新笔记
验证：爆款预测给内容打分、给优化建议
进化：数据回流看板让因子权重越用越准
一句话：方法论是资产，工具只是载体，数据回流让因子库越用越准。
在线体验
入口
说明
在线 Demo
https://burst-factor-workbench-pab5.vercel.app（Vercel 部署，即本仓库源码构建），打开先是杂志风封面页，点「进入工作台」开始体验
产品落地页
独立落地页，给不了解这个产品的人讲清楚它是做什么的，CTA 可跳回在线 Demo
离线包
burst-factor-demo.zip（13MB），解压后双击 index.html 即可离线体验全部 6 个功能
本地运行（源码）
cd burst-factor-app
npm install
npm run dev
# 打开 http://localhost:3000
构建静态导出：
npm run build
# 产物在 burst-factor-app/out/
技术栈：Next.js 16（App Router）+ React 19 + TypeScript + Tailwind CSS v4 + recharts，纯静态导出，无后端。
功能模块
#
模块
能点的交互
00
封面页
杂志风叙事 + 6 步闭环 + 进入工作台 CTA
01
爆款雷达
平台筛选 / 搜索 / 模拟新收录 / 笔记详情抽屉
02
智能拆解
粘贴笔记 → AI 初拆（逐段揭示+因子标注）→ 人工校准 → 确认入库回写雷达
03
因子图鉴
16 因子三层分类 / 检索 / 对比实测详情弹窗
04
配方实验室
选因子组装笔记 / 复制成稿
05
爆款预测
规则引擎打分 / 合规风险提示 / 优化建议
06
数据回流看板
TOP5 / 权重漂移多线图 / 爆款率面积图 / 漏斗 / 涨跌榜
工作台左上角品牌区可点击返回封面，来回闭环。
数据说明（重要）
演示数据为构造数据：2,314 篇笔记、16 个因子、35% 爆款率提升等数字均为演示用 mock，不代表真实业务数据。
AI 能力为本地规则模拟：AI 初拆、爆款预测打分、笔记生成均为前端本地规则引擎，未接入真实大模型 API（刻意为之：零成本、离线可用、演示稳定）。
合规词库是真实的：fixtures/compliance-banned-words.json 为真实 fixture，预测打分的合规风险真实命中该词库。
面试演示口径
4 分钟演示脚本 + 8 个高频面试 Q&A：见 DEMO-V3-演示与面试口径.md
诚实声明原则：主动说明哪些是 mock、哪些是模拟，并讲清真实版本的接法（prompt 约束 / 结构化抽取 / 评测），避免穿帮。
目录结构
proya-works/
├── README.md                          # 本文件
├── PRD-01-launch-agent.md             # 作品一：美妆新品上市营销 Agent（PRD）
├── PRD-02-content-factory.md          # 作品二 PRD（本 demo 的前身方向）
├── DEMO-V3-演示与面试口径.md            # 演示脚本 + 面试 Q&A + 诚实声明
├── demo-v2.html / demo-v3.html        # 早期 HTML 原型
├── fixtures/compliance-banned-words.json
├── burst-factor-app/                  # Next.js 源码
│   ├── app/ (radar/dissect/factors/lab/predict/insights/cover)
│   ├── lib/ (mock-data.ts, scoring.ts)
│   └── out/                           # 静态导出产物（含 file:// 离线补丁）
├── burst-factor-demo.zip              # 离线文件包（解压双击即用）
└── shots/                             # 各页面截图
开发者备注
Vercel 在线版即本仓库源码的构建产物（含封面页），与本地 npm run build 结果一致。
burst-factor-app/out/ 曾为 file:// 离线打开打过补丁；如需重新生成离线包，打包前需重走补丁流程。
作者
龚玉卓（giannis）· AI 产品经理 · 2026-10
