export const dynamic = 'force-dynamic';
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/* ─── Domain detection ───────────────────────────────────────────────────── */

type Domain =
  | "edtech"
  | "health"
  | "finance"
  | "food"
  | "environment"
  | "hr"
  | "logistics"
  | "social"
  | "saas"
  | "general";

function detectDomain(text: string): Domain {
  const t = text.toLowerCase();
  if (/learn|course|teach|school|student|education|tutor|mentor|skill|certif|training|bootcamp/.test(t)) return "edtech";
  if (/health|medical|doctor|patient|wellness|mental|fitness|clinic|therapy|hospital/.test(t)) return "health";
  if (/financ|money|payment|bank|invest|credit|loan|wallet|budget|saving|crypto/.test(t)) return "finance";
  if (/food|restaurant|meal|cook|deliver|farm|grocer|recipe|nutrition|diet/.test(t)) return "food";
  if (/climate|environment|carbon|green|sustain|energy|solar|recycl|emission/.test(t)) return "environment";
  if (/job|hire|recruit|talent|workforce|career|employ|resume|interview|salary/.test(t)) return "hr";
  if (/logistic|supply|ship|deliver|warehouse|inventory|transport|freight/.test(t)) return "logistics";
  if (/communit|social|connect|network|friend|dating|group|forum|chat/.test(t)) return "social";
  if (/software|saas|api|platform|dashboard|tool|automat|workflow|integrat/.test(t)) return "saas";
  return "general";
}

/* ─── Extract a short label from the idea ───────────────────────────────── */

function extractLabel(idea: string): string {
  const stopWords = new Set([
    "a","an","the","that","this","for","and","or","but","in","on","at","to",
    "of","with","by","from","is","are","was","were","be","been","as","it","its",
    "which","who","where","when","how","what","can","will","would","could","should",
    "have","has","had","not","do","does","did","our","their","your","my","we",
    "they","i","you","he","she","platform","app","tool","solution","system","service",
  ]);
  const words = idea
    .replace(/[^a-zA-Z0-9 ]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 3 && !stopWords.has(w.toLowerCase()));
  return words.slice(0, 3).join(" ") || "the venture";
}

/* ─── Core generation ────────────────────────────────────────────────────── */

interface GenerativeCore {
  problem: string;
  user: string;
  slice: string;
  technology: string;
  value: string;
  principles: string[];
  useCases: string[];
  venture: string;
  business: string;
  impact: string;
  risk: string;
}

function buildCore(idea: string): GenerativeCore {
  const domain = detectDomain(idea);
  const label = extractLabel(idea);

  const templates: Record<Domain, GenerativeCore> = {
    edtech: {
      problem: `Access to quality education remains deeply unequal — most learners lack the personalized guidance, structured curriculum, and feedback loops that ${label} could solve. Existing platforms are generic, English-centric, and designed for learners who already have advantages. The result is low completion rates and skills that don't translate to real jobs.`,
      user: `Self-directed learners aged 18–35 who are trying to upskill or transition into new careers, particularly those without access to traditional institutions or professional networks.`,
      slice: `Learners who have the motivation but lack a personalized roadmap, accountability system, and localized guidance — the gap between wanting to learn and actually building job-ready skills.`,
      technology: `AI-powered adaptive learning engine that personalizes curriculum, predicts dropout risk, and generates contextual exercises. Combines NLP for content localization with spaced repetition and skill graph modeling.`,
      value: `A learning experience that feels built for the individual — right content, right pace, right language — so learners finish what they start and emerge with skills employers actually want.`,
      principles: [
        "Personalized by default — no two learning paths are identical",
        "Outcome-first — every feature connects to a real job or skill outcome",
        "Accessible by design — built for low-bandwidth, low-resource contexts",
        "Completion over consumption — engagement metrics that matter",
      ],
      useCases: [
        "Generate a personalized 12-week learning roadmap from current skill level to target job",
        "Practice exercises that adapt difficulty in real time based on performance",
        "Get localized examples and case studies relevant to your market",
        "Track skill progress with employer-readable proof of completion",
      ],
      venture: `Launch as a B2C freemium mobile app targeting emerging market learners, then layer B2B partnerships with companies and schools as a white-label upskilling solution. Differentiate on depth of personalization and local market relevance.`,
      business: `Freemium individual subscriptions ($9–29/mo) gated on advanced features. B2B SaaS licenses to enterprises and schools for cohort-based deployment. Job placement fees from employer partnerships as a premium tier.`,
      impact: `If ${label} reaches scale, it can meaningfully reduce the skills gap in underserved markets, increase employability for millions of learners who are currently locked out, and create a generation of workers who are AI-literate and globally competitive.`,
      risk: `Low completion rates persist even with personalization if motivation isn't intrinsic. Content quality is hard to scale. Competing against free YouTube content and heavily funded global platforms. Risk of building features users explore but don't pay for.`,
    },

    health: {
      problem: `Healthcare access is fragmented, expensive, and often unavailable exactly when people need it most. ${label} addresses the gap between having a health concern and getting timely, reliable, and affordable guidance. Most people delay care due to cost, stigma, or simply not knowing where to start.`,
      user: `Adults 25–55 managing chronic conditions, navigating mental health, or dealing with acute concerns who want on-demand, trustworthy health guidance without a costly or inconvenient clinic visit.`,
      slice: `The space between Googling symptoms and seeing a doctor — people who need more than a search engine but less than a full medical appointment, especially for ongoing wellness management.`,
      technology: `AI triage and health coaching engine combining symptom assessment, clinical knowledge bases, and longitudinal user health data. Integrates with wearables and EHR systems for context-aware recommendations.`,
      value: `Immediate, personalized health guidance that helps users understand their symptoms, manage chronic conditions, and make better decisions — reducing unnecessary ER visits and delayed diagnoses.`,
      principles: [
        "Evidence-based first — all recommendations grounded in clinical research",
        "Privacy-preserving — user health data is never sold or shared",
        "Empowerment over dependency — build health literacy, not reliance on the app",
        "Clear escalation — always know when to see a real doctor",
      ],
      useCases: [
        "Describe symptoms and get a structured triage assessment with next steps",
        "Track chronic condition metrics and get AI-generated trend analysis",
        "Receive personalized wellness plans adjusted weekly based on progress",
        "Connect with licensed providers for escalated care within the same platform",
      ],
      venture: `Enter via direct-to-consumer app in an underserved condition category (mental health, diabetes management, womens health), prove clinical outcomes, then expand to employer benefits and insurance partnerships.`,
      business: `B2C subscription ($15–40/mo) with premium provider access tier. B2B employer benefits packages sold to HR departments. Per-consult revenue from in-app telemedicine marketplace. Future insurance reimbursement model.`,
      impact: `${label} at scale reduces the burden on primary care systems, closes the access gap for underserved populations, and generates population-level health data that can inform public health policy.`,
      risk: `Regulatory complexity and liability exposure are significant. Clinical accuracy failures erode trust permanently. Users may not follow through on health recommendations. Insurance and provider partnerships take years to establish.`,
    },

    finance: {
      problem: `Financial tools are built for people who already have financial stability. ${label} targets the majority who are excluded from wealth-building because they lack access to advice, instruments, or the literacy to use what exists. The result is a perpetual cycle of financial precarity.`,
      user: `Young adults and middle-income earners aged 22–45 who earn income but struggle to save, invest, or manage debt — people with financial goals but no clear path to reach them.`,
      slice: `The gap between earning money and making it work — users who want to invest or save but find existing tools too complex, too expensive, or too generic to act on.`,
      technology: `AI financial coaching engine with personalized cash flow analysis, goal-based planning algorithms, and behavioral nudge systems. Integrates with bank accounts via open banking APIs for real-time data.`,
      value: `A personal financial advisor in your pocket — one that knows your real numbers, explains things in plain language, and gives you a concrete action to take each week.`,
      principles: [
        "Radical simplicity — one clear action at a time",
        "Transparency first — fees, returns, and risks explained plainly",
        "Goal-anchored — every feature connects to a real financial milestone",
        "Trust through security — bank-grade encryption and no selling of data",
      ],
      useCases: [
        "Connect bank accounts and get an instant breakdown of income vs. spending leaks",
        "Set a financial goal and receive a week-by-week action plan to reach it",
        "Understand investment options in plain language before committing capital",
        "Get alerts when cash flow patterns signal risk or opportunity",
      ],
      venture: `Launch with a free AI financial health score as a top-of-funnel hook, then monetize through premium planning features and embedded financial products (savings accounts, micro-investing, insurance).`,
      business: `Freemium with premium subscription ($8–20/mo). Interchange revenue from co-branded debit/savings products. Referral fees from financial product partners. B2B white-label for credit unions and community banks.`,
      impact: `${label} can bring effective financial guidance to hundreds of millions of people who currently get none, reduce generational wealth gaps, and create a new class of financially literate users who demand better from institutions.`,
      risk: `Regulatory licensing (investment advice, banking) adds cost and friction. User trust is slow to build when money is involved. Monetization through product referrals creates incentive misalignment. High churn if users don't see quick financial wins.`,
    },

    food: {
      problem: `The food system is broken in two directions simultaneously — consumers lack affordable access to quality food while producers struggle with distribution inefficiency and waste. ${label} sits at this intersection, but existing solutions address only one side at a time.`,
      user: `Urban households and small food businesses who want better quality, more sustainable food options without the premium price or logistical friction of today's specialty food market.`,
      slice: `The gap between wanting to eat well and sustainably and actually being able to afford and access it — driven by fragmented supply chains, poor demand forecasting, and opaque pricing.`,
      technology: `AI demand forecasting, dynamic supply chain matching, and personalized meal and sourcing recommendations. Computer vision for quality grading and IoT sensors for cold chain monitoring.`,
      value: `Fresher food, less waste, and fairer prices — achieved by connecting producers and consumers more efficiently and using AI to reduce the guesswork in both demand and supply.`,
      principles: [
        "Zero waste by design — every feature reduces spoilage and over-production",
        "Fair value — producers and consumers both win, not just the middleman",
        "Hyper-local first — start with what's nearby before sourcing far",
        "Transparency in sourcing — know exactly where your food comes from",
      ],
      useCases: [
        "Discover local producers with surplus inventory at below-market prices",
        "Plan a week of meals and auto-generate a sourcing list from local farms",
        "Predict your household food needs and receive pre-filled grocery orders",
        "Get real-time freshness scoring on products before purchase",
      ],
      venture: `Start as a B2C app in one metro area connecting consumers to local producers with surplus, build liquidity, then expand to B2B restaurant procurement and white-label for grocery chains.`,
      business: `Commission on transactions (8–15%). Subscription for premium predictive replenishment. B2B SaaS for restaurant procurement management. Data licensing to food brands for demand insights.`,
      impact: `${label} at scale could reduce global food waste meaningfully, improve nutrition access in food deserts, and strengthen local food economies against the monopoly of large distributors.`,
      risk: `Food logistics is highly perishable — execution risk is enormous. Unit economics are tight with commodity pricing pressure. Regulatory complexity in food safety. Supply liquidity is hard to build in early markets.`,
    },

    environment: {
      problem: `Climate action is stalled by a gap between awareness and behavior change. ${label} addresses the friction between wanting to reduce environmental impact and actually doing it — most tools are informational without being actionable or financially rewarding for users.`,
      user: `Environmentally motivated consumers, small businesses, and municipalities who want to measure, reduce, and communicate their sustainability impact but lack the data infrastructure and incentive systems to act consistently.`,
      slice: `The "intention-action gap" in sustainability — users who care but don't have personalized, real-time guidance on what impact their choices actually make and how to improve.`,
      technology: `AI carbon footprint modeling using transaction data, behavior tracking, and supply chain transparency APIs. Combines LCA (life cycle analysis) databases with behavioral economics nudge engines.`,
      value: `A clear, personalized view of environmental impact — translated into actions, comparisons, and rewards that make sustainable choices feel achievable and worthwhile rather than abstract.`,
      principles: [
        "Measurable over aspirational — real data, not marketing language",
        "Positive reinforcement — reward action, don't shame inaction",
        "Systemic impact — connect individual actions to collective outcomes",
        "Science-backed — all carbon calculations use peer-reviewed methodology",
      ],
      useCases: [
        "Connect spending data and get an instant carbon footprint broken down by category",
        "Receive a ranked list of the 5 highest-impact changes you can make this month",
        "Earn verified carbon credits for behavioral changes and redeem for rewards",
        "Generate a sustainability report for your business for ESG reporting",
      ],
      venture: `Launch B2C as a carbon tracker with rewards, build a community of verified sustainable consumers, then sell that audience and behavior data (anonymized) to brands and B2B sustainability reporting tools.`,
      business: `B2C freemium ($6–18/mo for detailed tracking and credits). B2B SaaS for corporate ESG reporting. Brand sponsorship of user rewards. Carbon credit marketplace commission.`,
      impact: `${label} at scale creates a verified, real-time picture of consumer-driven emissions and creates financial incentives for behavior change at a scale no government program has achieved — essentially making sustainability economically rational.`,
      risk: `Carbon accounting methodologies are contested and lack standardization. Greenwashing accusations if methodology isn't rigorous. Behavior change is notoriously hard to sustain. Regulatory risk around carbon credit markets.`,
    },

    hr: {
      problem: `Hiring is broken for both sides. ${label} addresses the reality that qualified candidates are rejected by automated filters while hiring teams waste time on the wrong candidates. The cost of a bad hire is enormous; the cost of missing the right one is invisible but worse.`,
      user: `Recruiters, hiring managers, and job seekers at the intersection of high-volume hiring — particularly in sectors where skills are non-linear, credentials are misleading, and speed matters.`,
      slice: `The gap between a candidate's real abilities and how those abilities are represented on a resume — and the gap between what a job description says and what a role actually needs.`,
      technology: `AI skills inference engine using portfolio analysis, work samples, and behavioral assessments. NLP for job description decoding and bias detection. Predictive matching based on performance outcomes rather than credentials.`,
      value: `Faster, fairer hiring that matches candidates to roles based on demonstrated ability — reducing time-to-hire, improving quality-of-hire, and opening doors for candidates who'd otherwise be filtered out.`,
      principles: [
        "Skills over credentials — what you can do matters more than where you studied",
        "Bias reduction by design — algorithmic checks at every step",
        "Candidate experience first — rejection is never ghosting",
        "Outcome-driven matching — optimize for job performance, not keyword density",
      ],
      useCases: [
        "Upload a portfolio or work sample and get a structured skills assessment in minutes",
        "Receive matched job opportunities ranked by fit based on demonstrated skills",
        "Hiring teams get ranked shortlists with explainable scores and bias flags",
        "Run structured async video interviews scored against role-specific rubrics",
      ],
      venture: `Launch as a candidate-side tool with free skills assessments to build supply, then monetize on the employer side with ATS integrations and recruiter SaaS licenses.`,
      business: `Freemium for candidates. B2B SaaS subscription for employers ($500–5000/mo based on volume). Premium placement fees for high-stakes roles. ATS integration partnerships for distribution.`,
      impact: `${label} can significantly reduce structural unemployment caused by credential inflation and algorithmic bias, open pathways for self-taught and non-traditional candidates, and improve organizational performance through better hiring signal.`,
      risk: `AI bias is a regulatory and reputational landmine — any discriminatory outcome will be catastrophic. Enterprise HR sales cycles are long and conservative. Candidates distrust AI scoring. Hard to prove ROI on hiring quality without longitudinal data.`,
    },

    logistics: {
      problem: `Supply chains are opaque, fragile, and optimized for average conditions rather than real ones. ${label} targets the costly gap between planned logistics and actual execution — the delays, inefficiencies, and communication breakdowns that cost businesses billions and frustrate customers.`,
      user: `Operations managers, logistics coordinators, and supply chain teams at mid-market businesses who lack the real-time visibility and predictive tooling that only enterprise players can currently afford.`,
      slice: `Mid-market companies too large for spreadsheets but too small for SAP — unable to afford enterprise logistics platforms but losing significant margin to inefficiency and reactive firefighting.`,
      technology: `AI route optimization, real-time shipment tracking aggregation, predictive delay modeling using external signals (weather, port congestion, supplier risk), and automated exception management workflows.`,
      value: `The logistics command center that mid-market teams have always needed — one view of everything, proactive alerts before problems become crises, and AI recommendations that reduce cost and delivery failures.`,
      principles: [
        "Visibility before optimization — you can't improve what you can't see",
        "Proactive over reactive — surface problems before they become emergencies",
        "Integration-first — works with existing tools, doesn't replace them",
        "SMB-priced — enterprise-grade intelligence at mid-market cost",
      ],
      useCases: [
        "Unified dashboard showing real-time status of all shipments across carriers",
        "Predictive delay alerts 24–48 hours before expected disruptions",
        "AI-generated re-routing recommendations when exceptions occur",
        "Automated supplier communication when delays are detected",
      ],
      venture: `Land in one vertical (e.g., food & beverage or e-commerce) with deep integrations, build category authority, then expand to adjacent verticals and add a freight marketplace layer.`,
      business: `SaaS subscription based on shipment volume ($500–5000/mo). Per-transaction fees on freight marketplace. Premium analytics module for trend reporting. API access tier for custom integrations.`,
      impact: `${label} at scale democratizes supply chain intelligence, reduces waste from logistics failures, lowers the cost of goods by reducing inefficiency tax, and makes global supply chains more resilient to disruption.`,
      risk: `Deep integration with fragmented carrier and ERP systems is technically hard. Data quality from suppliers is inconsistent. Sales cycle into operations teams is long. Competing with established TMS vendors who are adding AI features.`,
    },

    social: {
      problem: `Online communities are either too noisy to be useful or too closed to grow. ${label} addresses the reality that people want genuine connection around shared interests and goals — not algorithmic feeds designed for engagement at the expense of meaning.`,
      user: `Adults 22–45 who want to find their people — whether around a niche interest, a shared goal, a professional focus, or a life stage — but find existing social platforms too broad, toxic, or algorithmically manipulative.`,
      slice: `The gap between the communities people want to belong to and the ones that actually exist online — too niche for Facebook Groups, too casual for LinkedIn, too text-heavy for Discord.`,
      technology: `AI community matching, content curation, and conversation facilitation. NLP for identifying shared values and conversation quality. Recommendation engine that surfaces the right people and content without algorithmic addiction patterns.`,
      value: `A community you actually want to spend time in — curated, focused, and run by tools that prioritize real connection over engagement metrics.`,
      principles: [
        "Quality over quantity — smaller, tighter communities beat large, noisy ones",
        "Consent-driven discovery — users control who finds them and how",
        "Anti-addiction by design — no infinite scroll, no outrage optimization",
        "Community ownership — members govern, not the platform",
      ],
      useCases: [
        "Find communities of 10–500 people with genuine shared interests or goals",
        "Get matched with potential collaborators or accountability partners",
        "Participate in structured community events with AI-facilitated discussion",
        "Build a personal reputation within a community through verified contributions",
      ],
      venture: `Launch in one tight niche (e.g., indie founders, new parents, local creatives) with high-curation, then expand to adjacent niches and build a federated community network.`,
      business: `Community subscription model ($5–15/mo per member). Platform fee on community tools and events. Sponsorships that match community values. White-label community infrastructure for brands and organizations.`,
      impact: `${label} can counter the social isolation epidemic and the toxicity of attention-economy platforms by proving that community online can be meaningful, healthy, and economically sustainable.`,
      risk: `Community cold-start problem is severe — value requires critical mass that is expensive to acquire. Moderation at scale is costly and emotionally draining. Easy to clone but hard to replicate community culture. Monetization often conflicts with community trust.`,
    },

    saas: {
      problem: `Teams are drowning in disconnected tools, manual processes, and workflow gaps that ${label} can eliminate. The productivity cost of context-switching, duplicate data entry, and missing automation is enormous — and most SaaS solutions add complexity rather than reduce it.`,
      user: `Operations, product, and business teams at companies with 10–500 employees who are scaling faster than their internal tooling and processes can support.`,
      slice: `The specific workflow gap that existing tools leave unaddressed — the places where humans are acting as expensive, error-prone glue between systems that should talk to each other.`,
      technology: `AI workflow automation engine with natural language configuration, deep integrations across the modern SaaS stack, and intelligent exception handling that escalates to humans only when judgment is actually needed.`,
      value: `Hours of manual work eliminated per team member per week — plus the downstream improvement in data quality, response time, and team morale that comes from not doing repetitive tasks.`,
      principles: [
        "Set-up in minutes, not months — complexity is the enemy",
        "Human in the loop by default — AI augments, never silently decides",
        "Integration-native — plays well with what teams already use",
        "Transparent automation — always know what ran, why, and what it changed",
      ],
      useCases: [
        "Describe a workflow in plain language and have it built and deployed automatically",
        "Connect disparate data sources and get a unified operational view in real time",
        "Auto-route exceptions and approvals based on context and urgency",
        "Generate weekly operational reports from live data without manual aggregation",
      ],
      venture: `Land in one workflow category with deep functionality, expand horizontally across the workflow surface of the same buyer, then build a marketplace of integrations and templates.`,
      business: `Per-seat SaaS subscription ($15–50/user/mo). Usage-based pricing for high-volume automation runs. Marketplace commission on third-party integration templates. Enterprise contracts with SSO and SLA guarantees.`,
      impact: `${label} at scale creates a step-change in organizational productivity — particularly for SMBs who can't afford enterprise automation platforms — and reduces the percentage of human cognitive effort spent on work that should be automated.`,
      risk: `Workflow automation trust is fragile — one bad automation run erodes confidence quickly. Integration maintenance with third-party APIs is expensive. Competing with hyperscalers (Zapier, Make, Microsoft Power Automate) who have massive ecosystems.`,
    },

    general: {
      problem: `The market for ${label} is underserved because existing solutions are either too expensive, too complex, or too generic to create real value for the people who need it most. The problem isn't awareness — it's that no one has built the right solution for the right user at the right price point.`,
      user: `Early adopters and power users who have an acute version of the problem — motivated enough to try new solutions and articulate enough to give feedback that shapes the product.`,
      slice: `The specific underserved sub-segment within the broader market — the group experiencing the problem most acutely and most willing to pay for a tailored solution right now.`,
      technology: `AI-powered core functionality that learns from user behavior to become increasingly personalized and effective over time. Combines generative AI for content and recommendations with predictive models for user intent.`,
      value: `A solution that saves significant time, money, or frustration compared to the next best alternative — with a product experience that feels designed specifically for this user, not adapted from a generic template.`,
      principles: [
        "User obsession — every decision starts with the user's actual problem",
        "Simple by default, powerful when needed",
        "Transparent and trustworthy — no dark patterns, no hidden costs",
        "Build in public — community and product grow together",
      ],
      useCases: [
        `Complete the core ${label} workflow in under 5 minutes with AI assistance`,
        "Get personalized recommendations based on your specific context and history",
        "Collaborate with team members with real-time updates and role-based access",
        "Export, integrate, or automate anything in the platform via open APIs",
      ],
      venture: `Launch with a sharp, narrow use case that solves a painful problem for a specific user type. Nail retention before growth. Expand product scope only as the user base and feedback justify it.`,
      business: `Freemium entry with premium subscription for power features ($10–50/mo). B2B team tier for collaborative use cases. Usage-based pricing layer for AI-intensive features. Eventual enterprise contracts at the top of the funnel.`,
      impact: `${label} succeeds, it creates a template for how AI-native products can solve real problems for real people — demonstrating that the best technology doesn't require complexity to create outsized value.`,
      risk: `The core risk is building something technically impressive that users don't adopt or retain at scale. Distribution is harder than product in most markets. AI outputs require ongoing quality control. Competition from well-funded incumbents adding AI features.`,
    },
  };

  const base = templates[domain];

  return {
    problem: base.problem,
    user: base.user,
    slice: base.slice,
    technology: base.technology,
    value: base.value,
    principles: base.principles,
    useCases: base.useCases,
    venture: base.venture,
    business: base.business,
    impact: base.impact,
    risk: base.risk,
  };
}

/* ─── Route handler ──────────────────────────────────────────────────────── */

export async function POST(req: Request) {
  try {
    const { idea } = await req.json();

    if (!idea || typeof idea !== "string") {
      return Response.json({ error: "idea is required" }, { status: 400 });
    }

    // Simulate AI processing time (1.2 – 2 s)
    await sleep(1200 + Math.random() * 800);

    const core = buildCore(idea.trim());
    return Response.json(core);
  } catch (err) {
    console.error("generate-core error:", err);
    return Response.json({ error: "Failed to generate core" }, { status: 500 });
  }
}
