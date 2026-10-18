/* ============================================================
 * 爆款因子工作台 · 美妆版 — 集中 mock 数据
 * 数字之间保持内在一致：因子的 trend 末值 = weight，
 * 雷达/看板的 2,314 篇、35% 等口径与 DEMO-V3 口径文档一致。
 * ============================================================ */

export type Layer = "hook" | "persuade" | "convert";

export const LAYER_LABEL: Record<Layer, string> = {
  hook: "开头钩子",
  persuade: "中间话术",
  convert: "结尾转化",
};

export const LAYER_DESC: Record<Layer, string> = {
  hook: "决定打开率：前 3 秒留住人",
  persuade: "决定信任度：让人相信你",
  convert: "决定行动率：让人去买、去互动",
};

export interface Factor {
  id: string;
  name: string;
  layer: Layer;
  definition: string;
  example: string;
  /** 历史爆款率（%）：命中该因子的笔记成为爆款的比例 */
  hitRate: number;
  /** 当前权重（方法论引擎内部权重，8 周趋势末值） */
  weight: number;
  /** 8 周权重趋势 */
  trend: number[];
  /** 命中关键词（预测/拆解引擎用） */
  keywords: string[];
  /** 配方实验室组装模板，{{sell}} 为卖点占位 */
  templates: [string, string];
  /** 优化建议话术（预测模块用） */
  tip: string;
}

export const FACTORS: Factor[] = [
  {
    id: "f01",
    name: "痛点暴击型钩子",
    layer: "hook",
    definition:
      "开篇直击目标人群最痛的肌肤问题，用一句「说中我了」完成 3 秒停留。痛点越具体、越带体感词，打开率越高。",
    example: "换季烂脸第三天，泛红起皮一起来，我悟了……",
    hitRate: 68,
    weight: 9.2,
    trend: [7.8, 8.0, 8.2, 8.5, 8.7, 8.9, 9.0, 9.2],
    keywords: ["烂脸", "泛红", "起皮", "暗沉", "毛孔粗大", "出油", "闷痘", "换季", "熬夜脸", "垮脸", "卡粉", "爆痘"],
    templates: [
      "{{sell}}之前，我的脸又干又垮，直到我换了这个思路——",
      "如果你也受够了换季烂脸，这篇直接抄作业：{{sell}}，亲测有效。",
    ],
    tip: "开头第一句点出具体痛点（泛红/起皮/暗沉），别用「姐妹们好」式寒暄开场。",
  },
  {
    id: "f02",
    name: "反常识开场",
    layer: "hook",
    definition:
      "用一句反常识判断制造认知冲突，激发「倒要看看你说什么」的好奇心。适合成分、功效类选题。",
    example: "别再跟风买贵妇面霜了，先看完这篇。",
    hitRate: 61,
    weight: 8.1,
    trend: [7.9, 7.8, 8.0, 8.0, 8.1, 8.2, 8.1, 8.1],
    keywords: ["别再", "跟风", "其实", "真相", "误区", "反常识", "劝退", "交学费"],
    templates: [
      "关于{{sell}}，有个反常识的真相：",
      "先说结论：{{sell}}值得买，但 90% 的人都用错了方法。",
    ],
    tip: "抛一个反常识判断（如「贵的不一定对」），再给出你的论证，形成钩子。",
  },
  {
    id: "f03",
    name: "数字实证钩子",
    layer: "hook",
    definition:
      "把「有效」翻译成数字：天数、百分比、前后对比。数字带来确定性，是美妆内容信任感最强的货币。",
    example: "7 天实测，毛孔肉眼可见变小，先看对比图。",
    hitRate: 64,
    weight: 8.8,
    trend: [8.2, 8.3, 8.4, 8.5, 8.6, 8.7, 8.8, 8.8],
    keywords: ["7天", "28天", "实测", "数据", "前后对比", "肉眼可见", "两周", "一个月"],
    templates: [
      "{{sell}}，我坚持记录了 28 天，变化直接看图——",
      "先上实测数据：{{sell}}，7 天前后的对比放在第 3 张了。",
    ],
    tip: "给出具体数字（7 天/28 天）并承诺有对比图，数字越具体可信度越高。",
  },
  {
    id: "f04",
    name: "身份代入钩子",
    layer: "hook",
    definition:
      "开篇点名肤质或人群，让目标读者产生「这篇就是写给我的」的专属感，精准过滤泛流量。",
    example: "干敏肌姐妹集合！这篇就是写给你们的。",
    hitRate: 58,
    weight: 7.6,
    trend: [7.2, 7.3, 7.3, 7.4, 7.5, 7.5, 7.6, 7.6],
    keywords: ["干敏肌", "油皮", "姐妹", "打工人", "学生党", "30+", "敏感肌", "混油皮", "痘痘肌"],
    templates: [
      "干敏肌姐妹集合！{{sell}}，这篇就是写给你们的。",
      "{{sell}}——所有跟我一样肤质的人，这篇请直接收藏。",
    ],
    tip: "开篇点名肤质或人群（如干敏肌/油皮），让目标读者感到「专属」。",
  },
  {
    id: "f05",
    name: "悬念提问钩子",
    layer: "hook",
    definition:
      "用一个没公布答案的问题结尾开篇，把读者「勾」进正文。问题必须和读者利益强相关。",
    example: "万元面霜和百元精华盲测，结果离谱了。",
    hitRate: 55,
    weight: 7.2,
    trend: [7.0, 7.1, 7.0, 7.2, 7.1, 7.2, 7.2, 7.2],
    keywords: ["猜猜", "你们觉得", "盲测", "结果", "万万没想到", "?"],
    templates: [
      "{{sell}}，猜猜我连续用了两周后发生了什么？",
      "同样是{{sell}}，为什么有人用完惊艳、有人毫无感觉？",
    ],
    tip: "提一个与读者利益相关的问题（如盲测结果），答案放在正文揭晓。",
  },
  {
    id: "f06",
    name: "场景痛点钩子",
    layer: "hook",
    definition:
      "把产品塞进一个具体的生活场景（带妆、熬夜、出差），场景越有画面感，代入感越强。",
    example: "带妆 8 小时不暗沉，我只服这一套。",
    hitRate: 52,
    weight: 6.9,
    trend: [6.4, 6.5, 6.6, 6.7, 6.8, 6.8, 6.9, 6.9],
    keywords: ["带妆", "熬夜", "出差", "空调房", "素颜", "约会", "通勤", "换季"],
    templates: [
      "带妆 8 小时不暗沉？{{sell}}，我替你们试过了。",
      "出差一周只带它：{{sell}}，行李箱瘦身成功。",
    ],
    tip: "把卖点放进具体场景（带妆/熬夜/出差），用画面感替代功能罗列。",
  },
  {
    id: "f07",
    name: "对比实测",
    layer: "persuade",
    definition:
      "同一张脸、同一光线，用 vs 不用的对照，是美妆内容信任感的天花板。连续 3 周登顶因子榜。",
    example: "左脸没用、右脸用了，差别直接看图说话。",
    hitRate: 72,
    weight: 9.6,
    trend: [8.8, 9.0, 9.1, 9.3, 9.4, 9.5, 9.6, 9.6],
    keywords: ["对比", "左脸", "右脸", "半边脸", "前后", "PK", "用 vs 不用", "一边"],
    templates: [
      "左脸没用、右脸用了{{sell}}，差别直接看——",
      "同一张脸做对照：{{sell}}用和不用的区别，比我说一万句都有用。",
    ],
    tip: "加入左右脸/前后对比实测，这是全场权重最高的因子，优先补上。",
  },
  {
    id: "f08",
    name: "成分党话术",
    layer: "persuade",
    definition:
      "用成分、浓度、配方逻辑建立专业感。注意：该因子权重连续 8 周下滑，纯成分说教正在失效，需搭配体感。",
    example: "15% 玻色因 + 5% 烟酰胺，这个配方思路很正。",
    hitRate: 49,
    weight: 6.2,
    trend: [7.4, 7.2, 7.0, 6.8, 6.6, 6.4, 6.3, 6.2],
    keywords: ["成分", "玻色因", "烟酰胺", "浓度", "配方", "视黄醇", "A醇", "胜肽"],
    templates: [
      "成分党看这里：{{sell}}，配方思路很正。",
      "不讲玄学讲成分——{{sell}}，这套配方逻辑我认可。",
    ],
    tip: "成分话术权重在下滑，别单独使用，务必搭配体感或实测一起讲。",
  },
  {
    id: "f09",
    name: "素人证言",
    layer: "persuade",
    definition:
      "「闺蜜按头安利」「身边第三个回购的人」——用真实人际关系背书，对冲广告感。",
    example: "被闺蜜按头安利的，用完只想说相见恨晚。",
    hitRate: 63,
    weight: 8.4,
    trend: [8.0, 8.1, 8.1, 8.2, 8.3, 8.3, 8.4, 8.4],
    keywords: ["闺蜜", "朋友推荐", "素人", "真实反馈", "身边人", "按头安利", "回购"],
    templates: [
      "是被闺蜜按头安利的{{sell}}，用完我只想说：相见恨晚。",
      "不信广告信素人：{{sell}}，这是我身边第三个回购的人。",
    ],
    tip: "引入真实人际背书（闺蜜/朋友推荐），对冲内容的广告感。",
  },
  {
    id: "f10",
    name: "权威背书",
    layer: "persuade",
    definition:
      "引用医生、研究、实验室等权威信源。注意措辞合规：可以讲「研究支撑」，不要编造「临床证明」。",
    example: "查过文献才敢推，这个作用机制是有研究支撑的。",
    hitRate: 57,
    weight: 7.4,
    trend: [7.3, 7.3, 7.4, 7.4, 7.4, 7.5, 7.4, 7.4],
    keywords: ["皮肤科", "医生", "专家", "研究", "论文", "实验室", "文献"],
    templates: [
      "查过文献才敢推：{{sell}}，作用机制是有研究支撑的。",
      "{{sell}}，皮肤科医生朋友看完配方说：思路没问题。",
    ],
    tip: "引用权威信源时注意合规边界：可讲「研究支撑」，忌编造「临床/治愈」类表述。",
  },
  {
    id: "f11",
    name: "使用仪式感",
    layer: "persuade",
    definition:
      "给产品配一套使用手法和步骤，把「用产品」升级为「享受仪式」，提升种草后的行动意愿。",
    example: "配合这个 3 分钟按摩手法，效果翻倍。",
    hitRate: 54,
    weight: 7.0,
    trend: [6.8, 6.9, 6.9, 7.0, 7.0, 7.0, 7.0, 7.0],
    keywords: ["手法", "按摩", "仪式感", "早晚", "步骤", "搭配", "教程"],
    templates: [
      "{{sell}}的正确打开方式：配合这个 3 分钟手法，吸收感翻倍。",
      "把{{sell}}变成每天最期待的仪式感，附我的完整使用步骤。",
    ],
    tip: "给出一套具体使用手法/步骤，把产品从「物品」变成「仪式」。",
  },
  {
    id: "f12",
    name: "翻车避雷",
    layer: "persuade",
    definition:
      "先讲不适合谁、哪几个坑要避开。「敢说缺点」反而是最强的信任状，精华类目上升最快。",
    example: "这 3 个坑先说清楚，避开了再谈效果。",
    hitRate: 60,
    weight: 7.8,
    trend: [7.0, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 7.8],
    keywords: ["避雷", "踩雷", "坑", "注意", "千万别", "翻车", "不适合", "劝退"],
    templates: [
      "关于{{sell}}，这 3 个坑先说清楚，避开了再谈效果。",
      "先避雷再种草：{{sell}}不适合这几类人，先对号入座。",
    ],
    tip: "主动讲清不适合人群/使用禁忌，「敢说缺点」是最强的信任状。",
  },
  {
    id: "f13",
    name: "限时行动指令",
    layer: "convert",
    definition:
      "结尾给出明确的下一步动作：加购、蹲链接、自取。不要让读者看完后「不知道干嘛」。",
    example: "大促前先加购，价格下来直接冲。",
    hitRate: 51,
    weight: 6.8,
    trend: [6.6, 6.6, 6.7, 6.7, 6.8, 6.8, 6.8, 6.8],
    keywords: ["加购", "冲", "链接", "下单", "赶紧", "趁", "自取", "评论区见"],
    templates: [
      "{{sell}}，大促前先加购，价格下来直接冲。",
      "链接放评论区了，{{sell}}，需要的人自取。",
    ],
    tip: "结尾必须给明确动作指令（加购/蹲链接），别让读者看完无所适从。",
  },
  {
    id: "f14",
    name: "价格锚点",
    layer: "convert",
    definition:
      "用「一杯奶茶钱」「大牌平替」建立价格认知锚点，降低决策门槛。避免绝对化低价话术，注意合规。",
    example: "一杯奶茶钱，效果向大牌看齐。",
    hitRate: 47,
    weight: 6.1,
    trend: [6.0, 6.0, 6.1, 6.1, 6.1, 6.2, 6.1, 6.1],
    keywords: ["奶茶", "平替", "性价比", "一杯", "大牌", "不到", "百元"],
    templates: [
      "一杯奶茶钱的{{sell}}，使用感却向大牌看齐。",
      "{{sell}}，把贵妇面霜的预算省下来吧。",
    ],
    tip: "用生活化价格锚点（一杯奶茶钱）降低决策门槛，忌用「全网最低」类违禁表述。",
  },
  {
    id: "f15",
    name: "复购承诺",
    layer: "convert",
    definition:
      "「空瓶第 3 瓶」「已囤货」——用自己的钱包投票，是比任何形容词都硬的转化话术。",
    example: "这是我的第 3 瓶，空瓶即是答案。",
    hitRate: 59,
    weight: 7.5,
    trend: [7.1, 7.2, 7.3, 7.3, 7.4, 7.5, 7.5, 7.5],
    keywords: ["空瓶", "回购", "囤", "无限回购", "第3瓶", "第N瓶", "见底"],
    templates: [
      "这是我的第 3 瓶{{sell}}，空瓶即是答案。",
      "{{sell}}，这瓶见底前我已经下单囤货了。",
    ],
    tip: "用「空瓶/回购/囤货」等钱包投票式表达，替代空洞的效果形容词。",
  },
  {
    id: "f16",
    name: "互动钩子",
    layer: "convert",
    definition:
      "结尾抛互动诱饵：提问、抽奖、答疑。互动率是平台推流的关键权重，值得单独设计。",
    example: "评论区聊聊，抽 3 位送正装。",
    hitRate: 53,
    weight: 6.6,
    trend: [6.3, 6.4, 6.4, 6.5, 6.5, 6.6, 6.6, 6.6],
    keywords: ["评论区", "抽奖", "送", "留言", "蹲", "提问", "抽"],
    templates: [
      "评论区聊聊：{{sell}}你最想解决什么问题？抽 3 位送正装。",
      "关于{{sell}}的任何问题，评论区见，看到都会回。",
    ],
    tip: "结尾设计互动诱饵（提问/抽奖），互动率直接影响平台推流。",
  },
];

/* ---------------- 雷达 ---------------- */

export type RadarStatus = "pending" | "parsing" | "stored";

export const RADAR_STATUS_LABEL: Record<RadarStatus, string> = {
  pending: "待拆解",
  parsing: "拆解中",
  stored: "已入库",
};

export interface RadarNote {
  id: string;
  title: string;
  platform: "小红书" | "抖音";
  likes: string;
  comments: string;
  collectedAt: string;
  status: RadarStatus;
  category: string;
  excerpt: string;
  factors: string[];
}

export const RADAR_NOTES: RadarNote[] = [
  {
    id: "r01",
    title: "空瓶3瓶才敢说：这瓶玻色因精华是干皮亲妈",
    platform: "小红书",
    likes: "12.4w",
    comments: "3,208",
    collectedAt: "2小时前",
    status: "pending",
    category: "精华",
    excerpt: "干敏肌集合！换季烂脸靠它续命。15%玻色因复配5%烟酰胺，质地清爽不搓泥。左脸没用右脸用了7天，泛红肉眼可见退下去。这是我的第3瓶空瓶，评论区抽2位送小样。",
    factors: [],
  },
  {
    id: "r02",
    title: "万元面霜 vs 百元面霜盲测，结果离谱了",
    platform: "抖音",
    likes: "28.1w",
    comments: "9,412",
    collectedAt: "3小时前",
    status: "pending",
    category: "面霜",
    excerpt: "同样是保湿面霜，为什么价格差20倍？今天做个盲测，猜猜哪边是贵的。先说结论：贵的不一定对，关键看配方思路和你的肤质。",
    factors: [],
  },
  {
    id: "r03",
    title: "换季烂脸自救指南，7天实测有效",
    platform: "小红书",
    likes: "8.7w",
    comments: "1,956",
    collectedAt: "5小时前",
    status: "parsing",
    category: "精华",
    excerpt: "熬夜+换季，脸垮得不像话。这7天我只做三件事：精简护肤、厚敷急救、早睡。先上前后对比图，毛孔和泛红都有改善。",
    factors: ["f01"],
  },
  {
    id: "r04",
    title: "早C晚A劝退？这套搭配思路先码住",
    platform: "小红书",
    likes: "6.2w",
    comments: "1,104",
    collectedAt: "6小时前",
    status: "stored",
    category: "精华",
    excerpt: "关于早C晚A，这3个坑先说清楚：建立耐受别心急、浓度不是越高越好、敏感肌先从低频开始。成分党看配方逻辑，这套搭配思路是正的。",
    factors: ["f12", "f08", "f04"],
  },
  {
    id: "r05",
    title: "油皮夏天的救星，持妆8小时不暗沉",
    platform: "抖音",
    likes: "15.3w",
    comments: "4,730",
    collectedAt: "8小时前",
    status: "stored",
    category: "底妆",
    excerpt: "带妆8小时是什么体验？油皮姐妹懂的都懂。这套持妆流程我测了两周，控油但不拔干，附我的上妆手法。链接放评论区，需要自取。",
    factors: ["f06", "f04", "f11", "f13"],
  },
  {
    id: "r06",
    title: "28天毛孔实测，素颜也敢怼脸拍",
    platform: "小红书",
    likes: "9.8w",
    comments: "2,345",
    collectedAt: "10小时前",
    status: "stored",
    category: "精华",
    excerpt: "先上28天实测数据，毛孔对比图在第3张。是被闺蜜按头安利的，用完只想说相见恨晚。左脸没用右脸用了，差别直接看。",
    factors: ["f03", "f07", "f09"],
  },
  {
    id: "r07",
    title: "敏肌刷酸翻车实录，这3个坑别踩",
    platform: "小红书",
    likes: "5.4w",
    comments: "986",
    collectedAt: "12小时前",
    status: "stored",
    category: "精华",
    excerpt: "敏肌刷酸翻车过的人举手。这3个坑我替你们踩完了：贪高浓度、叠加使用、不做保湿。不适合的人先对号入座，再谈效果。",
    factors: ["f12", "f04"],
  },
  {
    id: "r08",
    title: "熬夜脸垮了？这套急救流程抄作业",
    platform: "抖音",
    likes: "11.2w",
    comments: "3,102",
    collectedAt: "1天前",
    status: "pending",
    category: "面膜",
    excerpt: "连续熬夜一周，脸垮到亲妈不认。这套急救流程亲测：清洁-厚敷-按摩，三步回血。干敏肌姐妹直接抄作业。",
    factors: [],
  },
  {
    id: "r09",
    title: "大牌平替清单，一杯奶茶钱搞定全套",
    platform: "小红书",
    likes: "7.9w",
    comments: "1,587",
    collectedAt: "1天前",
    status: "pending",
    category: "套装",
    excerpt: "一杯奶茶钱搞定全套护肤？这份大牌平替清单请收好。把贵妇面霜的预算省下来，效果不打折。",
    factors: [],
  },
  {
    id: "r10",
    title: "皮肤科医生不会告诉你的3个真相",
    platform: "抖音",
    likes: "19.6w",
    comments: "6,208",
    collectedAt: "1天前",
    status: "parsing",
    category: "护肤科普",
    excerpt: "查过文献才敢说这期。关于屏障修复，有3个反常识的真相：不是越贵越好、不是成分越多越好、建立耐受比换产品更重要。",
    factors: ["f02", "f10"],
  },
  {
    id: "r11",
    title: "空瓶记：回购5次的防晒是它",
    platform: "小红书",
    likes: "4.3w",
    comments: "872",
    collectedAt: "2天前",
    status: "stored",
    category: "防晒",
    excerpt: "这是我的第5瓶，空瓶即是答案。成膜快不搓泥，后续上妆不打架。一杯奶茶钱，学生党闭眼入。",
    factors: ["f15", "f14"],
  },
  {
    id: "r12",
    title: "评论区抽正装！你们问爆的那瓶来了",
    platform: "小红书",
    likes: "3.8w",
    comments: "2,914",
    collectedAt: "2天前",
    status: "stored",
    category: "精华",
    excerpt: "换季烂脸的姐妹看过来，这瓶我回购3次了。评论区聊聊你最想解决什么问题，抽3位送正装，看到都会回。",
    factors: ["f16", "f01", "f15"],
  },
];

/** 模拟新收录用的候选池 */
export const RADAR_FRESH_POOL: Omit<RadarNote, "id" | "collectedAt" | "status">[] = [
  {
    title: "油痘肌早晚流程，28天战痘记录",
    platform: "小红书",
    likes: "6.6w",
    comments: "1,432",
    category: "精华",
    excerpt: "痘痘肌集合！这28天我只用精简流程：温和清洁+祛痘精华+保湿。先上前后对比，红肿痘肉眼可见瘪下去。",
    factors: [],
  },
  {
    title: "贵妇眼霜值得吗？我做了半边脸测试",
    platform: "抖音",
    likes: "13.8w",
    comments: "4,021",
    category: "眼霜",
    excerpt: "左眼贵妇眼霜、右眼平价眼霜，28天半边脸测试。猜猜结果？先说好，贵的赢了，但没赢多少。",
    factors: [],
  },
  {
    title: "通勤包里的3件护肤好物，打工人抄作业",
    platform: "小红书",
    likes: "4.9w",
    comments: "763",
    category: "套装",
    excerpt: "打工人的包里永远缺一件护肤品。这3件是我回购最多的：喷雾、润唇膏、护手霜，空调房续命全靠它们。",
    factors: [],
  },
  {
    title: "敏感肌换季维稳，这套「少即是多」流程",
    platform: "小红书",
    likes: "7.2w",
    comments: "1,208",
    category: "精华",
    excerpt: "换季期我的原则是少即是多：停掉所有猛药，只留修复保湿。干敏肌姐妹，这篇请收藏，维稳比折腾重要。",
    factors: [],
  },
];

/* ---------------- 看板 ---------------- */

export const WEEKS = ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"];

/** 本周因子爆款率 TOP5（基于 2,314 篇已发布笔记） */
export const TOP_FACTORS_WEEK = ["f07", "f01", "f09", "f03", "f12"].map((id) => {
  const f = FACTORS.find((x) => x.id === id)!;
  return { id, name: f.name, hitRate: f.hitRate, weight: f.weight };
});

/** 爆款率周趋势（%） */
export const HIT_RATE_TREND = [31, 32, 31, 33, 34, 35, 36, 35].map((rate, i) => ({
  week: WEEKS[i],
  rate,
}));

/** 因子权重漂移：取 TOP5 因子的 8 周趋势 */
export const WEIGHT_DRIFT = WEEKS.map((week, i) => {
  const row: Record<string, number | string> = { week };
  TOP_FACTORS_WEEK.forEach(({ id, name }) => {
    row[name] = FACTORS.find((x) => x.id === id)!.trend[i];
  });
  return row;
});

/** 采纳 / 驳回漏斗 */
export const FUNNEL = [
  { stage: "AI 初拆", count: 2314, desc: "雷达收录并自动拆解" },
  { stage: "人工校准", count: 1876, desc: "运营确认 / 修正因子标注" },
  { stage: "确认入库", count: 1652, desc: "沉淀为因子库语料" },
  { stage: "已发布", count: 1204, desc: "经实验室组装并发布" },
  { stage: "成为爆款", count: 438, desc: "互动量超阈值（>5w）" },
];

/** 上升最快的因子 */
export const RISING_FACTORS = [
  { id: "f01", delta: "+18%", note: "精华类目上升最快" },
  { id: "f06", delta: "+15%", note: "场景种草需求旺季" },
  { id: "f12", delta: "+12%", note: "信任状内容受青睐" },
  { id: "f07", delta: "+9%", note: "连续 3 周登顶因子榜" },
  { id: "f15", delta: "+6%", note: "空瓶记内容稳定输出" },
];

/** 下滑因子（给洞察用） */
export const DECLINING_FACTORS = [{ id: "f08", delta: "-16%", note: "纯成分说教正在失效" }];

/* ---------------- 拆解示例 ---------------- */

export const DISSECT_SAMPLE = `最近换季皮肤很干，试了这瓶玻色因精华。成分是15%玻色因，质地很清爽，吸收也快。用了一周感觉皮肤状态稳定了不少，干敏肌可以试试。左脸没用右脸用了，对比还是挺明显的。这已经是我的第2瓶了，评论区有问题都可以问。`;

/* ---------------- 预测示例 ---------------- */

export const PREDICT_SAMPLE = `最近换季皮肤很干，试了这瓶玻色因精华。成分是15%玻色因，质地很清爽，吸收也快。用了一周感觉皮肤状态稳定了不少，干敏肌可以试试。`;
