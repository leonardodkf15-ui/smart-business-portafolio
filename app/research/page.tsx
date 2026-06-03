"use client";

import { useState, useEffect, useMemo } from "react";

/* ─── Types ─────────────────────────────────────────────────────────────── */

interface ResearchForm {
  venture: string;
  targetUser: string;
  problem: string;
  marketContext: string;
}

interface SavedResearch {
  id: string;
  venture: string;
  output: ResearchOutput;
  created_at: string;
}

interface ResearchOutput {
  form: ResearchForm;
  generatedAt: string;
}

/* ─── Static data ────────────────────────────────────────────────────────── */

const benchmarks = [
  {
    name: "Duolingo",
    country: "USA 🇺🇸",
    flag: "🇺🇸",
    what: "Gamified language learning app with AI-personalized lesson paths and streak-based retention mechanics.",
    works: "Free tier drives massive top-of-funnel. Gamification creates daily habit loops. Adaptive AI keeps lessons at the right difficulty level.",
    doesntTransfer:
      "Duolingo's model assumes users have a device, data plan, and baseline motivation. In Mexico, dropout rates stay high because there's no community accountability or real-world outcome tied to the learning.",
  },
  {
    name: "LinkedIn Learning",
    country: "USA 🇺🇸",
    flag: "🇺🇸",
    what: "Professional video course library integrated with job profiles and recruiter signals on LinkedIn.",
    works: "Direct connection between learning and hiring. Courses mapped to job roles. Completion badges visible to recruiters.",
    doesntTransfer:
      "LinkedIn penetration is low among young Mexicans outside large cities. Content is mostly in English. Monthly subscription price (~USD $40) is prohibitive for the target demographic.",
  },
  {
    name: "Coursera",
    country: "USA 🇺🇸",
    flag: "🇺🇸",
    what: "University-backed online degree and certificate programs from institutions like Google, Meta, and Stanford.",
    works: "Brand credibility from partner universities. Certificates recognized by global employers. Financial aid available for low-income learners.",
    doesntTransfer:
      "Courses are too long and structured for self-directed Mexican learners. Financial aid process is opaque. Mexican employers rarely recognize Coursera credentials over local degrees or direct experience.",
  },
  {
    name: "Andela",
    country: "Nigeria 🇳🇬",
    flag: "🇳🇬",
    what: "Tech talent accelerator that trains African developers and connects them with remote job opportunities at global tech companies.",
    works: "Pairs training with guaranteed employment outcomes. Community cohort model creates accountability. Focuses on local talent with global demand.",
    doesntTransfer:
      "Andela's model requires intensive bootcamp commitment — not compatible with young Mexicans who also work or study part-time. Revenue model depends on placing talent internationally, not building local ecosystem.",
  },
  {
    name: "Preply",
    country: "Ukraine 🇺🇦",
    flag: "🇺🇦",
    what: "Marketplace connecting language learners with live human tutors for 1-on-1 video sessions.",
    works: "Human connection increases trust and accountability. Real-time feedback improves outcomes vs. asynchronous content. Tutor marketplace creates supply flexibility.",
    doesntTransfer:
      "Human tutor cost (~USD $15–40/hr) is inaccessible for most young Mexicans. Scheduling sessions requires consistent time availability. No AI to fill gaps between sessions.",
  },
];

const competitors = [
  {
    name: "Platzi",
    type: "EdTech",
    price: "~MXN $300/mo",
    language: "Spanish",
    mentorship: "No",
    ai: "No",
    mexicoFocus: "Medium",
    weakness: "No personalization, no mentorship, passive video content",
  },
  {
    name: "Duolingo",
    type: "EdTech",
    price: "Free / $7/mo",
    language: "English",
    mentorship: "No",
    ai: "Partial",
    mexicoFocus: "Low",
    weakness: "Language learning only, no career guidance",
  },
  {
    name: "LinkedIn Learning",
    type: "EdTech",
    price: "~USD $40/mo",
    language: "English",
    mentorship: "No",
    ai: "No",
    mexicoFocus: "Low",
    weakness: "Expensive, English-only, no local market context",
  },
  {
    name: "Coursera",
    type: "EdTech",
    price: "Free / $50/mo",
    language: "English",
    mentorship: "No",
    ai: "No",
    mexicoFocus: "Low",
    weakness: "Too academic, certificates not valued locally",
  },
  {
    name: "Udemy",
    type: "EdTech",
    price: "MXN $100–300",
    language: "Mixed",
    mentorship: "No",
    ai: "No",
    mexicoFocus: "Low",
    weakness: "One-time courses, no continuity or community",
  },
  {
    name: "MentorCruise",
    type: "Mentorship",
    price: "USD $50–200/mo",
    language: "English",
    mentorship: "Yes",
    ai: "No",
    mexicoFocus: "None",
    weakness: "Too expensive, English-only, no Mexico context",
  },
  {
    name: "YouTube",
    type: "Substitute",
    price: "Free",
    language: "Mixed",
    mentorship: "No",
    ai: "No",
    mexicoFocus: "Low",
    weakness: "Unstructured, no feedback, requires self-discipline",
  },
  {
    name: "ChatGPT",
    type: "Substitute",
    price: "Free / $20/mo",
    language: "Mixed",
    mentorship: "No",
    ai: "Yes",
    mexicoFocus: "None",
    weakness: "Generic, no career context, not Spanish-first",
  },
];

const risks = [
  {
    name: "AI gives generic advice",
    likelihood: "High" as const,
    impact: "High" as const,
    reduce:
      "Fine-tune on Mexico job market data. Add user profile onboarding to personalize context. Test with real users and iterate on prompt quality.",
  },
  {
    name: "Users don't trust AI as mentor",
    likelihood: "High" as const,
    impact: "High" as const,
    reduce:
      "Launch with a human-in-the-loop layer. Feature real success stories. Let users rate AI answers and escalate to human mentors.",
  },
  {
    name: "No monetization path",
    likelihood: "Medium" as const,
    impact: "High" as const,
    reduce:
      "Validate B2B school partnerships early. Build employer-sponsored access as hiring pipeline. Test MXN $99/mo premium tier with power users.",
  },
  {
    name: "Platzi adds AI mentorship",
    likelihood: "Medium" as const,
    impact: "Medium" as const,
    reduce:
      "Move fast on community and trust. Lock in school/employer partnerships before they do. Differentiate on depth of Mexico-specific career guidance.",
  },
  {
    name: "Low retention after first session",
    likelihood: "High" as const,
    impact: "Medium" as const,
    reduce:
      "Design for habit loops: weekly check-ins, goal tracking, peer accountability groups. Send personalized nudges based on user's learning plan.",
  },
];

const sources = [
  {
    number: 1,
    name: "INEGI — Encuesta Nacional de Ocupación y Empleo (ENOE) 2023",
    description:
      "Mexico's National Institute of Statistics reports that over 60% of employed youth aged 15–29 work in the informal economy with no access to formal training or upskilling programs, underscoring the structural gap MXNTOR targets.",
    url: "https://www.inegi.org.mx/programas/enoe/15ymas/",
  },
  {
    number: 2,
    name: "World Bank — Closing the Skills Gap in Latin America (2023)",
    description:
      "The World Bank identifies a persistent mismatch between the skills taught in Mexican secondary and higher education and the digital competencies demanded by employers, with mentorship and applied learning cited as key levers for closing the gap.",
    url: "https://www.worldbank.org/en/topic/education/publication/closing-the-skills-gap",
  },
  {
    number: 3,
    name: "Platzi — Estado del Aprendizaje Digital en Latinoamérica 2023",
    description:
      "Platzi's annual report shows that 74% of Latin American online learners cite lack of personalized guidance as the primary reason for course abandonment — validating the core problem MXNTOR is solving with AI mentorship.",
    url: "https://platzi.com/blog/estado-del-aprendizaje-digital/",
  },
  {
    number: 4,
    name: "OECD — Education at a Glance: Mexico Country Note 2023",
    description:
      "The OECD notes that only 17% of Mexican adults aged 25–64 have completed tertiary education, and English proficiency remains a critical barrier to accessing global online learning resources, reinforcing the need for a Spanish-first platform.",
    url: "https://www.oecd.org/education/education-at-a-glance/",
  },
  {
    number: 5,
    name: "Statista — EdTech Market Revenue in Mexico 2019–2027",
    description:
      "The Mexican EdTech market is projected to grow from USD $1.0B in 2022 to USD $2.1B by 2027, driven by mobile internet penetration and demand for affordable upskilling — a tailwind directly relevant to MXNTOR's growth thesis.",
    url: "https://www.statista.com/outlook/dmo/edtech/mexico",
  },
  {
    number: 6,
    name: "UNESCO — Youth and Skills: Putting Education to Work (Global Report)",
    description:
      "UNESCO's landmark report on youth skills argues that informal and non-formal learning must be validated and supported by mentorship structures to convert acquired skills into real economic mobility — the exact design philosophy behind MXNTOR.",
    url: "https://www.unesco.org/gem-report/en/youth",
  },
  {
    number: 7,
    name: "HolonIQ — Latin America EdTech Landscape Report 2023",
    description:
      "HolonIQ maps 300+ EdTech startups across Latin America and finds that fewer than 5% offer any form of AI-powered personalization, and none combine free access, Spanish-first UX, and mentorship in a single product — the exact whitespace MXNTOR occupies.",
    url: "https://www.holoniq.com/notes/latin-america-edtech-landscape",
  },
];

const likelihoodColor = {
  High: "bg-red-500/20 text-red-400 border-red-500/30",
  Medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Low: "bg-green-500/20 text-green-400 border-green-500/30",
};

const impactColor = {
  High: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  Medium: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Low: "bg-slate-500/20 text-slate-400 border-slate-500/30",
};

/* ─── Sub-components ─────────────────────────────────────────────────────── */

function SectionHeader({
  number,
  title,
  subtitle,
}: {
  number: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-8">
      <span className="inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-blue-400">
        {number}
      </span>
      <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">{title}</h2>
      {subtitle && <p className="mt-2 text-sm text-slate-400">{subtitle}</p>}
    </div>
  );
}

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

/* ─── Main page ──────────────────────────────────────────────────────────── */

export default function ResearchPage() {
  const [form, setForm] = useState<ResearchForm>({
    venture: "",
    targetUser: "",
    problem: "",
    marketContext: "",
  });
  const [generated, setGenerated] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedId, setSavedId] = useState<string | null>(null);
  const [savedOutputs, setSavedOutputs] = useState<SavedResearch[]>([]);
  const [loadingSaved, setLoadingSaved] = useState(true);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchSaved();
  }, []);

  async function fetchSaved() {
    try {
      const res = await fetch("/api/save-research");
      if (res.ok) {
        const data = await res.json();
        setSavedOutputs(Array.isArray(data) ? data : []);
      }
    } catch {
      // silently fail
    } finally {
      setLoadingSaved(false);
    }
  }

  function handleGenerate() {
    if (!form.venture.trim()) return;
    setGenerated(true);
    setSavedId(null);
    setSaveError(null);
    window.setTimeout(() => {
      document.getElementById("research-output")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }

  async function handleSave() {
    if (!generated) return;
    setSaving(true);
    setSaveError(null);
    try {
      const res = await fetch("/api/save-research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          venture: form.venture,
          output: { form, generatedAt: new Date().toISOString() },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      setSavedId(data.id);
      fetchSaved();
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  const filteredCompetitors = useMemo(() => {
    if (!filter.trim()) return competitors;
    const q = filter.toLowerCase();
    return competitors.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.type.toLowerCase().includes(q)
    );
  }, [filter]);

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">

        {/* Hero */}
        <div className="mb-16 max-w-3xl">
          <span className="inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-blue-400">
            Week 2 Assignment
          </span>
          <h1 className="mt-4 text-5xl font-bold tracking-tight text-white sm:text-6xl">
            Market Research
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-400">
            Deep competitive analysis and opportunity mapping for MXNTOR — the
            AI mentor platform for young Mexicans learning tech.
          </p>
        </div>

        {/* ── Section 01: Research Intake Form ── */}
        <section className="mb-20">
          <SectionHeader
            number="Section 01"
            title="Research Intake"
            subtitle="Fill in the four fields below, then generate the full research output."
          />

          <div className="rounded-2xl border border-slate-700/60 bg-[#1E293B] p-6 sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-blue-400">
                  Venture Idea
                </label>
                <textarea
                  rows={3}
                  value={form.venture}
                  onChange={(e) => setForm({ ...form, venture: e.target.value })}
                  placeholder="e.g. MXNTOR — AI mentor platform for young Mexicans learning tech skills"
                  className="w-full resize-none rounded-xl border border-slate-600 bg-[#0F172A] px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-blue-400">
                  Target User
                </label>
                <textarea
                  rows={3}
                  value={form.targetUser}
                  onChange={(e) => setForm({ ...form, targetUser: e.target.value })}
                  placeholder="e.g. Young Mexicans aged 18–28 from low-income or first-gen college backgrounds"
                  className="w-full resize-none rounded-xl border border-slate-600 bg-[#0F172A] px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-blue-400">
                  Problem Being Solved
                </label>
                <textarea
                  rows={3}
                  value={form.problem}
                  onChange={(e) => setForm({ ...form, problem: e.target.value })}
                  placeholder="e.g. No access to affordable, Spanish-first tech mentorship aligned with the Mexican job market"
                  className="w-full resize-none rounded-xl border border-slate-600 bg-[#0F172A] px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-blue-400">
                  Market Context
                </label>
                <textarea
                  rows={3}
                  value={form.marketContext}
                  onChange={(e) => setForm({ ...form, marketContext: e.target.value })}
                  placeholder="e.g. Mexico has 30M young adults, rising tech sector, low English proficiency, and limited EdTech penetration"
                  className="w-full resize-none rounded-xl border border-slate-600 bg-[#0F172A] px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <button
                onClick={handleGenerate}
                disabled={!form.venture.trim()}
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Generate Research
              </button>
              {generated && (
                <p className="text-xs text-green-400">✓ Research generated — scroll down</p>
              )}
            </div>
          </div>
        </section>

        {/* ── Research Output (shown after generate) ── */}
        {generated && (
          <div id="research-output">

            {/* ── Section 02: Global Benchmarks ── */}
            <section className="mb-20">
              <SectionHeader
                number="Section 02"
                title="Global Benchmark Analysis"
                subtitle="Five global platforms studied for what works — and what doesn't translate to Mexico."
              />

              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {benchmarks.map((b) => (
                  <div
                    key={b.name}
                    className="flex flex-col rounded-2xl border border-slate-700/60 bg-[#1E293B] overflow-hidden"
                  >
                    <div className="border-b border-slate-700/60 bg-blue-600/10 px-5 py-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-bold text-white">{b.name}</h3>
                        <span className="text-sm text-slate-400">{b.country}</span>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col divide-y divide-slate-700/40">
                      <div className="px-5 py-4">
                        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-blue-400">What it does</p>
                        <p className="text-sm leading-relaxed text-slate-200">{b.what}</p>
                      </div>
                      <div className="px-5 py-4">
                        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-green-400">What works</p>
                        <p className="text-sm leading-relaxed text-slate-200">{b.works}</p>
                      </div>
                      <div className="px-5 py-4">
                        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-red-400">Doesn't transfer to Mexico</p>
                        <p className="text-sm leading-relaxed text-slate-200">{b.doesntTransfer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Section 03: Mexico Localization ── */}
            <section className="mb-20">
              <SectionHeader
                number="Section 03"
                title="Mexico Localization Analysis"
                subtitle="What can MXNTOR borrow from global examples — and what must be built from scratch."
              />

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-2xl border border-green-500/30 bg-green-500/5 p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-500/20 text-green-400 text-sm font-bold">✓</span>
                    <h3 className="font-bold text-white">What Transfers</h3>
                  </div>
                  <ul className="space-y-3">
                    {[
                      { from: "Duolingo", lesson: "Gamified daily habit loops and streak mechanics increase retention" },
                      { from: "Andela", lesson: "Cohort-based community creates accountability and peer support" },
                      { from: "Preply", lesson: "Human-in-the-loop builds trust — AI + human hybrid model" },
                      { from: "Coursera", lesson: "Free tier drives top-of-funnel; financial aid model as inspiration" },
                      { from: "LinkedIn Learning", lesson: "Connecting learning directly to employment outcomes" },
                    ].map((item) => (
                      <li key={item.from} className="flex items-start gap-3">
                        <span className="mt-0.5 shrink-0 rounded-full border border-green-500/40 bg-green-500/10 px-2 py-0.5 text-[10px] font-semibold text-green-400">
                          {item.from}
                        </span>
                        <p className="text-sm leading-relaxed text-slate-200">{item.lesson}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-500/20 text-red-400 text-sm font-bold">✗</span>
                    <h3 className="font-bold text-white">What Doesn't Transfer</h3>
                  </div>
                  <ul className="space-y-3">
                    {[
                      "English-only content — Mexico requires Spanish-first by design, not translation afterthought",
                      "USD pricing — even $7/mo is prohibitive for the 18-28 low-income segment in Mexico",
                      "Assumed high-speed internet — offline-capable or low-bandwidth design is needed",
                      "Western job market framing — LinkedIn, Google, AWS certifications need Mexico context",
                      "Long-form structured courses — Mexican learners need micro-sessions and flexible pacing",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                        <p className="text-sm leading-relaxed text-slate-200">{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* ── Section 04: Competitor Table ── */}
            <section className="mb-20">
              <SectionHeader
                number="Section 04"
                title="Competitor & Substitute Map"
                subtitle="8 alternatives a young Mexican might use instead of MXNTOR — and why they fall short."
              />

              <div className="mb-4">
                <input
                  type="text"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  placeholder="Filter by name or type (e.g. EdTech, Substitute)…"
                  className="w-full max-w-sm rounded-xl border border-slate-600 bg-[#1E293B] px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-700/60">
                <table className="w-full min-w-[900px] text-sm">
                  <thead>
                    <tr className="border-b border-slate-700/60 bg-[#1E293B]">
                      {["Name", "Type", "Price", "Language", "Mentorship", "AI", "Mexico Focus", "Weakness"].map((col) => (
                        <th
                          key={col}
                          className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-blue-400"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCompetitors.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="px-4 py-8 text-center text-sm text-slate-500">
                          No results for "{filter}"
                        </td>
                      </tr>
                    ) : (
                      filteredCompetitors.map((c, i) => (
                        <tr
                          key={c.name}
                          className={`border-b border-slate-700/30 transition-colors hover:bg-blue-500/5 ${
                            i % 2 === 0 ? "bg-[#0F172A]" : "bg-[#1a2438]"
                          }`}
                        >
                          <td className="px-4 py-3 font-semibold text-white">{c.name}</td>
                          <td className="px-4 py-3">
                            <span className="rounded-full border border-slate-600 px-2 py-0.5 text-xs text-slate-400">
                              {c.type}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-slate-300">{c.price}</td>
                          <td className="px-4 py-3 text-slate-300">{c.language}</td>
                          <td className="px-4 py-3">
                            <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${c.mentorship === "Yes" ? "bg-green-500/20 text-green-400" : "bg-slate-700 text-slate-400"}`}>
                              {c.mentorship}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${c.ai === "Yes" ? "bg-blue-500/20 text-blue-400" : c.ai === "Partial" ? "bg-yellow-500/20 text-yellow-400" : "bg-slate-700 text-slate-400"}`}>
                              {c.ai}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${c.mexicoFocus === "None" ? "bg-red-500/20 text-red-400" : c.mexicoFocus === "Low" ? "bg-orange-500/20 text-orange-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                              {c.mexicoFocus}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-slate-300 text-xs">{c.weakness}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            {/* ── Section 05: Opportunity Gap ── */}
            <section className="mb-20">
              <SectionHeader
                number="Section 05"
                title="The Opportunity Gap"
                subtitle="Why the gap exists and why MXNTOR is positioned to fill it."
              />

              <div className="rounded-2xl border border-blue-500/40 bg-gradient-to-br from-blue-600/20 to-blue-900/10 p-8">
                <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    { label: "Free to start", icon: "🆓", desc: "No financial barrier for low-income users" },
                    { label: "Spanish-first", icon: "🇲🇽", desc: "Built for Mexico, not translated for it" },
                    { label: "AI Mentorship", icon: "🤖", desc: "24/7 personalized guidance at scale" },
                    { label: "Mexico Job Market", icon: "💼", desc: "Local context, real employer intelligence" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-4 text-center">
                      <div className="mb-2 text-2xl">{item.icon}</div>
                      <p className="mb-1 text-sm font-bold text-white">{item.label}</p>
                      <p className="text-xs text-slate-400">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl border border-blue-500/20 bg-[#0F172A]/60 p-5">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-blue-400">The Gap in One Sentence</p>
                  <p className="text-lg font-semibold leading-relaxed text-white">
                    Nobody combines{" "}
                    <span className="text-blue-400">free</span> +{" "}
                    <span className="text-blue-400">Spanish-first</span> +{" "}
                    <span className="text-blue-400">AI mentorship</span> +{" "}
                    <span className="text-blue-400">Mexico job market focus</span>.{" "}
                    MXNTOR fills this gap.
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    Platzi has Spanish content but no mentorship and no AI. Duolingo has AI and gamification but covers only language learning.
                    MentorCruise has human mentors but costs USD $50–200/mo and operates entirely in English. ChatGPT has AI but zero Mexico
                    context and no career guidance structure. Every existing option fails on at least two of the four dimensions
                    that matter most to young Mexicans trying to break into tech.
                  </p>
                </div>
              </div>
            </section>

            {/* ── Section 06: Risk Map ── */}
            <section className="mb-20">
              <SectionHeader
                number="Section 06"
                title="Risk Map"
                subtitle="Five key risks — with likelihood, impact, and mitigation strategy for each."
              />

              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {risks.map((risk) => (
                  <div
                    key={risk.name}
                    className="flex flex-col rounded-2xl border border-slate-700/60 bg-[#1E293B] overflow-hidden"
                  >
                    <div className="border-b border-slate-700/60 bg-slate-800/50 px-5 py-4">
                      <h3 className="font-bold text-white">{risk.name}</h3>
                      <div className="mt-2 flex gap-2">
                        <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${likelihoodColor[risk.likelihood]}`}>
                          Likelihood: {risk.likelihood}
                        </span>
                        <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${impactColor[risk.impact]}`}>
                          Impact: {risk.impact}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 px-5 py-4">
                      <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-blue-400">How to reduce</p>
                      <p className="text-sm leading-relaxed text-slate-200">{risk.reduce}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Save Button ── */}
            <section className="mb-20">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleSave}
                  disabled={saving || !!savedId}
                  className="flex items-center gap-2 rounded-xl bg-green-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-green-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? (
                    <><Spinner /> Saving…</>
                  ) : savedId ? (
                    <>
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      Saved
                    </>
                  ) : (
                    <>
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                      </svg>
                      Save Research to Database
                    </>
                  )}
                </button>
                {savedId && (
                  <p className="text-xs text-slate-400">
                    Saved with ID:{" "}
                    <span className="font-mono text-blue-400">{savedId}</span>
                  </p>
                )}
              </div>
              {saveError && (
                <div className="mt-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  {saveError}
                </div>
              )}
            </section>

          {/* ── Section 07: Sources & References ── */}
          <section className="mb-20">
            <SectionHeader
              number="Section 07"
              title="Sources & References"
              subtitle="Primary research and data sources supporting the MXNTOR market analysis."
            />

            <div className="rounded-2xl border border-slate-700/60 bg-[#1E293B] divide-y divide-slate-700/40 overflow-hidden">
              {sources.map((source) => (
                <div key={source.number} className="flex gap-5 px-6 py-5 transition-colors hover:bg-blue-500/5">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/10 text-xs font-bold text-blue-400">
                    {source.number}
                  </span>
                  <div className="min-w-0">
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 font-semibold text-white transition hover:text-blue-400"
                    >
                      {source.name}
                      <svg
                        className="h-3.5 w-3.5 shrink-0 opacity-40 transition group-hover:opacity-100"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                    <p className="mt-1 text-sm leading-relaxed text-slate-400">{source.description}</p>
                    <p className="mt-1.5 truncate font-mono text-xs text-slate-600">{source.url}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          </div>
        )}

        {/* ── Section 08: Saved Research ── */}
        <section className="mb-8">
          <SectionHeader
            number="Section 08"
            title="Saved Research"
            subtitle="Last 3 saved research outputs from the database."
          />

          {loadingSaved ? (
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <Spinner /> Loading saved research…
            </div>
          ) : savedOutputs.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-700 p-10 text-center">
              <p className="text-sm text-slate-500">
                No saved research yet. Fill in the form above and save.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {savedOutputs.map((saved) => (
                <div
                  key={saved.id}
                  className="rounded-2xl border border-slate-700/60 bg-[#1E293B] p-5"
                >
                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-400">
                      {saved.venture}
                    </span>
                    <span className="font-mono text-xs text-slate-500">
                      {new Date(saved.created_at).toLocaleString()}
                    </span>
                    <span className="font-mono text-xs text-slate-600">
                      ID: {saved.id}
                    </span>
                  </div>
                  {saved.output?.form && (
                    <div className="grid gap-3 sm:grid-cols-2">
                      {[
                        { label: "Target User", value: saved.output.form.targetUser },
                        { label: "Problem", value: saved.output.form.problem },
                        { label: "Market Context", value: saved.output.form.marketContext },
                      ].filter((f) => f.value).map((field) => (
                        <div key={field.label}>
                          <p className="mb-0.5 text-xs font-semibold uppercase tracking-widest text-blue-400">
                            {field.label}
                          </p>
                          <p className="text-sm text-slate-300">{field.value}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
