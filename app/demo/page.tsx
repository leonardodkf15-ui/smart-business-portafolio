"use client";

import { useState } from "react";
import Link from "next/link";

const STEPS = [
  {
    id: 1,
    emoji: "🧩",
    title: "The Problem",
    route: "/",
    description:
      "Millions of young Mexicans want to learn technology skills but have no affordable, Spanish-language mentor to guide them. Most are stuck watching YouTube videos with no personalized path forward.",
    evidence: "72% of Mexican youth aged 18–28 report lacking guidance when starting to learn technology (INEGI, 2023). The mentorship gap is real — and expensive to solve with human coaches.",
    color: "blue",
  },
  {
    id: 2,
    emoji: "🧬",
    title: "Generative Core",
    route: "/core",
    description:
      "The Core Agent takes a student's goal, experience level, and available time, and generates a personalized AI mentor profile — their learning path, motivational style, and first 3 steps.",
    evidence: "Outputs are saved to Supabase and visible in /dashboard. The agent uses Claude claude-sonnet-4-6 with a structured prompt enforcing Spanish-first, actionable, non-generic responses.",
    color: "purple",
  },
  {
    id: 3,
    emoji: "🔎",
    title: "Market Research",
    route: "/research",
    description:
      "The Research Agent benchmarks MXNTOR against 6 direct competitors — Platzi, Coursera, edX, LinkedIn Learning, Duolingo for Business, and local bootcamps — across price, language, personalization, and mentorship.",
    evidence: "MXNTOR is the only free, Spanish-first platform with AI-powered personalization. No competitor combines all four attributes simultaneously.",
    color: "green",
  },
  {
    id: 4,
    emoji: "📦",
    title: "Product Architecture",
    route: "/product",
    description:
      "Three-tier product: Free (individual students), Pro (advanced learners, $9/month), and Enterprise (institutions, $299/month). Each tier is built around a different user persona and outcome.",
    evidence: "Enterprise tier targets universities and companies with HR teams who need scalable skill verification. This is the primary revenue driver and where the unit economics work.",
    color: "orange",
  },
  {
    id: 5,
    emoji: "💰",
    title: "Pricing Simulator",
    route: "/pricing",
    description:
      "An interactive revenue model that lets users simulate how many Enterprise clients MXNTOR needs to be sustainable. Includes break-even scenarios and team growth projections.",
    evidence: "At 30 Enterprise clients ($299/mo each), MXNTOR reaches $8,970/month — enough to cover a 3-person team. At 100 clients, the venture is fully profitable.",
    color: "yellow",
  },
  {
    id: 6,
    emoji: "📣",
    title: "Marketing Engine",
    route: "/marketing",
    description:
      "A content system with 10 social posts, 3 video scripts, a 14-day launch calendar, visual prompt suggestions, and A/B headline + CTA tests — all exportable with one click.",
    evidence: "A/B test results: 'Seize the Opportunity' outperformed 'Start Your Journey' in simulated click intent by 23%. Instagram Reels and LinkedIn posts are the highest-priority channels.",
    color: "pink",
  },
  {
    id: 7,
    emoji: "💬",
    title: "Chatbot",
    route: "/chat",
    description:
      "A Spanish-language guided assistant that helps students figure out where to start, what to learn, and how MXNTOR can help them. Includes intake flow, guardrails, and feedback system.",
    evidence: "5 external testers used the chatbot. 4 found it helpful on first try. 1 tester (Andrés V.) hit a Safari clipboard bug on /marketing — fixed in the same session.",
    color: "teal",
  },
  {
    id: 8,
    emoji: "📊",
    title: "Dashboard",
    route: "/dashboard",
    description:
      "Live dashboard showing all 10 pages, saved Supabase records across 5 tables, and structured user testing evidence from 5 external testers.",
    evidence: "All data is real — fetched live from Supabase on page load. The dashboard is the single source of truth for build evidence and testing documentation.",
    color: "indigo",
  },
  {
    id: 9,
    emoji: "📚",
    title: "Docs + Prompt Library",
    route: "/docs",
    description:
      "Complete prompt library with 8 documented prompts, build logs per week, architecture diagram, and tech stack notes. Serves as the technical memory of the entire venture.",
    evidence: "Every major Claude Code prompt is logged. The architecture section shows how Supabase connects to the Next.js API routes and how data flows from user input to saved record.",
    color: "slate",
  },
];

const AGENT_MAP = [
  { from: "/ Homepage", to: "/core Generative Core" },
  { from: "/core Generative Core", to: "/research Market Research" },
  { from: "/research Market Research", to: "/product Product Architecture" },
  { from: "/product Product Architecture", to: "/pricing Pricing Simulator" },
  { from: "/pricing Pricing Simulator", to: "/marketing Marketing Engine" },
  { from: "/marketing Marketing Engine", to: "/chat Chatbot" },
  { from: "/chat Chatbot", to: "/dashboard Dashboard" },
  { from: "/dashboard Dashboard", to: "/docs Docs" },
  { from: "/docs Docs", to: "/demo Final Demo" },
];

const V2_ROADMAP = [
  { icon: "🌐", title: "Spanish / English toggle", desc: "Full bilingual UI — top user request from testing." },
  { icon: "🧠", title: "Adaptive learning paths", desc: "Core Agent remembers past sessions and evolves the plan." },
  { icon: "🏫", title: "University SSO integration", desc: "Enterprise clients can log in with institutional credentials." },
  { icon: "⚡", title: "Edge deployment", desc: "Move from Vercel serverless to edge functions for faster response times." },
  { icon: "📱", title: "Mobile-first redesign", desc: "60% of testers were on mobile — full responsive overhaul." },
  { icon: "🗄️", title: "Row-level security in Supabase", desc: "Per-user data isolation for multi-tenant Enterprise accounts." },
  { icon: "📋", title: "Structured user interviews", desc: "Replace informal testing with scripted usability sessions." },
];

const colorMap: Record<string, string> = {
  blue: "border-blue-500/30 bg-blue-500/10 text-blue-400",
  purple: "border-purple-500/30 bg-purple-500/10 text-purple-400",
  green: "border-green-500/30 bg-green-500/10 text-green-400",
  orange: "border-orange-500/30 bg-orange-500/10 text-orange-400",
  yellow: "border-yellow-500/30 bg-yellow-500/10 text-yellow-400",
  pink: "border-pink-500/30 bg-pink-500/10 text-pink-400",
  teal: "border-teal-500/30 bg-teal-500/10 text-teal-400",
  indigo: "border-indigo-500/30 bg-indigo-500/10 text-indigo-400",
  slate: "border-slate-500/30 bg-slate-500/10 text-slate-400",
};

export default function DemoPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [tab, setTab] = useState<"walkthrough" | "agentmap" | "impact" | "v2">("walkthrough");

  const step = STEPS[activeStep];

  return (
    <main className="min-h-screen bg-[#0F172A] px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-5xl">

        {/* Hero */}
        <div className="mb-12 text-center">
          <span className="mb-4 inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
            Week 6 · Final Agentic Venture Studio
          </span>
          <h1 className="text-4xl font-bold text-white sm:text-5xl">MXNTOR</h1>
          <p className="mt-3 text-lg text-slate-400">The Mentor That Mexico Needs</p>
          <p className="mx-auto mt-4 max-w-xl text-sm text-slate-500">
            A complete AI-powered venture system — built, tested, and deployed over 6 weeks.
            10 live pages. 5 Supabase tables. 5 external testers. Real AI, real data, real impact.
          </p>
        </div>

        {/* Tab bar */}
        <div className="mb-8 flex flex-wrap gap-2 border-b border-slate-700 pb-1">
          {[
            { key: "walkthrough", label: "🎯 Guided Walkthrough" },
            { key: "agentmap", label: "🧭 Agent Map" },
            { key: "impact", label: "🌱 Impact + Risks" },
            { key: "v2", label: "🔮 Version 2" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key as typeof tab)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                tab === t.key
                  ? "border-b-2 border-blue-500 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* WALKTHROUGH */}
        {tab === "walkthrough" && (
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Step selector */}
            <div className="lg:col-span-1">
              <p className="mb-3 text-xs font-medium uppercase tracking-wider text-slate-500">
                Venture Modules
              </p>
              <div className="space-y-1">
                {STEPS.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveStep(i)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                      activeStep === i
                        ? "bg-blue-500/10 text-white border border-blue-500/30"
                        : "text-slate-400 hover:bg-slate-800/60 hover:text-white"
                    }`}
                  >
                    <span className="text-base">{s.emoji}</span>
                    <span className="font-medium">{s.title}</span>
                    <span className="ml-auto font-mono text-xs text-slate-600">{s.route}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step detail */}
            <div className="lg:col-span-2">
              <div className="rounded-xl border border-slate-700 bg-slate-800/40 p-6">
                <div className="mb-1 flex items-center gap-3">
                  <span className="text-3xl">{step.emoji}</span>
                  <div>
                    <h2 className="text-xl font-bold text-white">{step.title}</h2>
                    <span className={`mt-0.5 inline-block rounded-full border px-2.5 py-0.5 text-xs font-mono ${colorMap[step.color]}`}>
                      {step.route}
                    </span>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-300">
                  {step.description}
                </p>
                <div className="mt-4 rounded-lg bg-slate-900/60 p-4">
                  <p className="mb-1 text-xs font-medium uppercase tracking-wider text-slate-500">
                    Build Evidence
                  </p>
                  <p className="text-sm text-slate-400">{step.evidence}</p>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href={step.route}
                    target="_blank"
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-500"
                  >
                    Open Live Page →
                  </Link>
                  {activeStep < STEPS.length - 1 && (
                    <button
                      onClick={() => setActiveStep(activeStep + 1)}
                      className="rounded-lg border border-slate-600 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:border-slate-500 hover:text-white"
                    >
                      Next Module →
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AGENT MAP */}
        {tab === "agentmap" && (
          <div className="space-y-4">
            <p className="text-sm text-slate-400">
              The MXNTOR venture is a connected system — each module feeds into the next, forming a complete user journey from problem awareness to documented impact.
            </p>
            <div className="rounded-xl border border-slate-700 bg-slate-800/40 p-6">
              <div className="space-y-3">
                {AGENT_MAP.map((link, i) => (
                  <div key={i} className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-4">
                    <span className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-1.5 font-mono text-xs text-blue-400 whitespace-nowrap">
                      {link.from}
                    </span>
                    <span className="text-slate-600 font-mono text-xs pl-2 sm:pl-0">↓</span>
                    <span className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-1.5 font-mono text-xs text-blue-400 whitespace-nowrap">
                      {link.to}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-700 bg-slate-800/40 p-5">
                <h3 className="mb-3 font-semibold text-white">Data Flow</h3>
                <p className="text-sm text-slate-400">
                  User inputs on /core, /pricing, /marketing, and /chat are sent to Next.js API routes, which forward them to Supabase via the REST API. All 5 tables are live and readable from /dashboard in real time.
                </p>
              </div>
              <div className="rounded-xl border border-slate-700 bg-slate-800/40 p-5">
                <h3 className="mb-3 font-semibold text-white">AI Integration</h3>
                <p className="text-sm text-slate-400">
                  /core and /chat call the Anthropic API via server-side Next.js routes. Prompts enforce Spanish-first responses, structured output, and guardrails against harmful content.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* IMPACT */}
        {tab === "impact" && (
          <div className="space-y-6">
            <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-6">
              <h3 className="mb-4 font-semibold text-white">🌱 Practical Impact Check</h3>
              <div className="space-y-3 text-sm">
                {[
                  { q: "What real problem does this reduce?", a: "The mentorship gap for young Mexicans entering the tech industry — most cannot afford human coaches or access high-quality Spanish-language guidance." },
                  { q: "Who specifically benefits?", a: "Mexican students aged 18–28 with internet access, studying or self-teaching technology skills without institutional support." },
                  { q: "What result improves?", a: "Students get a personalized learning path in under 2 minutes, reducing the time lost to unfocused self-study." },
                  { q: "What evidence from testing supports this?", a: "5 testers. All 5 said the Core Agent gave them a more specific starting point than they had before. 4 said they would use it again." },
                  { q: "Who would pay?", a: "Universities with digital transformation programs and companies with junior tech hiring needs — both pay $299/month for Enterprise access." },
                  { q: "What positive effect if it scaled?", a: "Closing the tech skills gap in Mexico could unlock economic mobility for millions. Each student with a clearer path is less likely to drop out of tech careers." },
                ].map(({ q, a }) => (
                  <div key={q} className="rounded-lg bg-slate-900/60 p-4">
                    <p className="font-medium text-white mb-1">{q}</p>
                    <p className="text-slate-400">{a}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6">
              <h3 className="mb-4 font-semibold text-white">🛡️ Risks + Guardrails</h3>
              <div className="space-y-3 text-sm">
                {[
                  { risk: "Misuse risk", detail: "Students could over-rely on AI guidance and skip critical thinking. Guardrail: chatbot always encourages verifying information and consulting human mentors for career decisions." },
                  { risk: "Bias / exclusion risk", detail: "AI models trained predominantly on English content may give lower-quality advice in Spanish. Guardrail: prompts enforce Spanish-first, and responses are manually reviewed for quality." },
                  { risk: "Data privacy", detail: "Chat logs and core outputs are stored in Supabase without user authentication in v1. Risk: all data is currently public-readable. Fix planned for v2 via row-level security." },
                  { risk: "Bad incentive risk", detail: "If Enterprise clients are incentivized by volume of completions rather than real learning, the platform could optimize for false progress. Guardrail: outcome metrics, not engagement metrics, define success." },
                ].map(({ risk, detail }) => (
                  <div key={risk} className="rounded-lg bg-slate-900/60 p-4">
                    <p className="font-medium text-red-400 mb-1">{risk}</p>
                    <p className="text-slate-400">{detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VERSION 2 */}
        {tab === "v2" && (
          <div className="space-y-4">
            <p className="text-sm text-slate-400">
              Version 2 focuses on making MXNTOR production-ready — with real authentication, bilingual UI, adaptive learning memory, and structured user research.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {V2_ROADMAP.map((item) => (
                <div key={item.title} className="rounded-xl border border-slate-700 bg-slate-800/40 p-5">
                  <div className="mb-2 text-2xl">{item.icon}</div>
                  <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-sm text-slate-400">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-5 text-sm text-slate-300">
              <strong className="text-white">If I had 4 more weeks: </strong>
              I would build a real login system with Supabase Auth, add adaptive memory so the Core Agent remembers a student&apos;s past sessions, launch a pilot with one real Mexican university, and run 20 structured usability sessions to validate the product before charging Enterprise clients.
            </div>
          </div>
        )}

        {/* Footer CTA */}
        <div className="mt-16 rounded-xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 to-slate-800/60 p-8 text-center">
          <h2 className="text-2xl font-bold text-white">MXNTOR is live.</h2>
          <p className="mt-2 text-slate-400">Built in 6 weeks. Deployed. Tested. Ready.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-500 transition-colors"
            >
              Seize the Opportunity →
            </Link>
            <Link
              href="/dashboard"
              className="rounded-lg border border-slate-600 px-5 py-2.5 text-sm font-medium text-slate-300 hover:border-slate-500 hover:text-white transition-colors"
            >
              View Dashboard
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
