"use client";

import { useState, useEffect, useCallback } from "react";

/* ─── Types ─────────────────────────────────────────────────────────────── */

interface CalcInputs {
  freeUsers: number;
  usageRate: number;
  conversionRate: number;
  proChurnRate: number;
  enterpriseCount: number;
  pricePerPro: number;
  pricePerEnterprise: number;
}

interface Revenue {
  activeUsers: number;
  grossProUsers: number;
  netProUsers: number;
  proMonthly: number;
  enterpriseMonthly: number;
  totalMonthly: number;
  annualRevenue: number;
}

interface SavedScenario {
  id: string;
  scenario_name: string;
  inputs: CalcInputs;
  revenue: Revenue;
  created_at: string;
}

/* ─── Constants ──────────────────────────────────────────────────────────── */

const PRESETS: Record<string, CalcInputs> = {
  Conservative: {
    freeUsers: 1000,
    usageRate: 40,
    conversionRate: 2,
    proChurnRate: 10,
    enterpriseCount: 2,
    pricePerPro: 9,
    pricePerEnterprise: 299,
  },
  Expected: {
    freeUsers: 5000,
    usageRate: 60,
    conversionRate: 5,
    proChurnRate: 8,
    enterpriseCount: 8,
    pricePerPro: 9,
    pricePerEnterprise: 299,
  },
  Aggressive: {
    freeUsers: 20000,
    usageRate: 75,
    conversionRate: 10,
    proChurnRate: 5,
    enterpriseCount: 25,
    pricePerPro: 9,
    pricePerEnterprise: 299,
  },
};

const DEFAULT_INPUTS: CalcInputs = PRESETS.Expected;

const FEATURES = [
  { label: "AI mentor chat", explorer: "10 questions/day", guided: "Unlimited", institutional: "Unlimited" },
  { label: "Learning path suggestions", explorer: "Basic", guided: "Personalized roadmap", institutional: "Custom paths" },
  { label: "Progress tracking", explorer: false, guided: true, institutional: true },
  { label: "Career path recommendations", explorer: false, guided: "Mexico job market", institutional: "Mexico job market" },
  { label: "Admin dashboard", explorer: false, guided: false, institutional: true },
  { label: "Analytics & reporting", explorer: false, guided: false, institutional: true },
  { label: "Dedicated onboarding", explorer: false, guided: false, institutional: true },
  { label: "Priority response time", explorer: false, guided: true, institutional: true },
  { label: "Spanish-first interface", explorer: true, guided: true, institutional: true },
  { label: "Resource library", explorer: true, guided: true, institutional: true },
];

const ASSUMPTIONS = [
  { label: "Avg. Mexican EdTech conversion rate", value: "2–5%" },
  { label: "Target market size", value: "30M young adults in Mexico" },
  { label: "Enterprise sales cycle", value: "2–4 months" },
  { label: "Pro churn rate", value: "8% monthly" },
  { label: "Enterprise churn rate", value: "5% annual" },
  { label: "Break-even (Enterprise)", value: "15 clients" },
  { label: "Break-even (Pro)", value: "500 users" },
];

const RISKS = [
  {
    title: "Free tier is too generous",
    color: "border-yellow-500/30 bg-yellow-500/5",
    badgeColor: "bg-yellow-500/20 text-yellow-400",
    badge: "Conversion",
    description:
      "If the free Explorer tier fully satisfies users, there is no motivation to upgrade to Pro. Low conversion rates compress revenue and make the unit economics unsustainable without high enterprise volume.",
  },
  {
    title: "Enterprise sales cycle is long and unpredictable",
    color: "border-orange-500/30 bg-orange-500/5",
    badgeColor: "bg-orange-500/20 text-orange-400",
    badge: "Revenue timing",
    description:
      "Selling to universities and companies in Mexico takes 2–4 months on average. Long cycles mean cash burn before revenue arrives and make it hard to forecast quarterly growth — especially in the first year.",
  },
  {
    title: "Platzi could add free AI mentorship",
    color: "border-red-500/30 bg-red-500/5",
    badgeColor: "bg-red-500/20 text-red-400",
    badge: "Competition",
    description:
      "Platzi already has scale, brand trust, and Spanish content in Mexico. If they integrate an AI mentor into their platform, MXNTOR's core differentiator erodes. Speed to lock in institutional partnerships is the primary defense.",
  },
];

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

function FeatureCell({ value }: { value: boolean | string }) {
  if (value === false) {
    return <span className="text-slate-600">—</span>;
  }
  if (value === true) {
    return (
      <svg className="mx-auto h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    );
  }
  return <span className="text-xs text-slate-200">{value}</span>;
}

function fmt(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

/* ─── Recommendation engine ──────────────────────────────────────────────── */

function Recommendation({ inputs, revenue }: { inputs: CalcInputs; revenue: Revenue }) {
  const proShare = revenue.totalMonthly > 0 ? revenue.proMonthly / revenue.totalMonthly : 0;
  const enterpriseShare = revenue.totalMonthly > 0 ? revenue.enterpriseMonthly / revenue.totalMonthly : 0;

  const signals: { text: string; severity: "warn" | "ok" | "info" }[] = [];

  if (inputs.usageRate < 40) {
    signals.push({ text: `Only ${inputs.usageRate}% of registered users are active monthly. Fix activation before pushing conversion — upgrading dormant users doesn't work.`, severity: "warn" });
  } else if (inputs.usageRate >= 70) {
    signals.push({ text: `${inputs.usageRate}% monthly active rate is strong. Your funnel top is healthy and conversion pressure is real.`, severity: "ok" });
  } else {
    signals.push({ text: `${inputs.usageRate}% monthly active rate is moderate. There's room to improve activation with onboarding nudges and habit-building mechanics.`, severity: "info" });
  }

  if (inputs.proChurnRate > 12) {
    signals.push({ text: `${inputs.proChurnRate}% monthly Pro churn is critical — you're losing more than 1 in 8 paying users every month. New acquisition can't keep up with this rate.`, severity: "warn" });
  } else if (inputs.proChurnRate > 8) {
    signals.push({ text: `${inputs.proChurnRate}% monthly Pro churn is above the EdTech benchmark of 8%. Focus on progress tracking and streak mechanics to improve retention.`, severity: "warn" });
  } else {
    signals.push({ text: `${inputs.proChurnRate}% monthly Pro churn is within the healthy EdTech range. Retention is not your primary constraint.`, severity: "ok" });
  }

  if (inputs.conversionRate < 2) {
    signals.push({ text: `${inputs.conversionRate}% conversion from active → Pro is below market. The free tier may be too generous — consider capping AI mentor responses more aggressively at 5–7/day to create real friction.`, severity: "warn" });
  } else if (inputs.conversionRate >= 7) {
    signals.push({ text: `${inputs.conversionRate}% active-to-Pro conversion is above market — strong signal the free-to-paid gap is well-calibrated.`, severity: "ok" });
  }

  if (revenue.totalMonthly === 0) {
    signals.push({ text: "No revenue yet. Focus on closing your first 2–3 enterprise clients before optimizing Pro pricing — enterprise revenue is faster to land than building a large free user base.", severity: "info" });
  }

  // Primary direction
  let direction: { label: string; color: string; badgeColor: string; headline: string; rationale: string; actions: string[] };

  const isPreRevenue = revenue.totalMonthly < 500;
  const enterpriseDominant = enterpriseShare > 0.65;
  const proDominant = proShare > 0.65;
  const highChurn = inputs.proChurnRate > 10;
  const lowUsage = inputs.usageRate < 40;

  if (isPreRevenue) {
    direction = {
      label: "Enterprise-first",
      color: "border-green-500/40 bg-green-500/5",
      badgeColor: "bg-green-500/20 text-green-400",
      headline: "Land enterprise clients before scaling the free tier.",
      rationale: "You're pre-revenue. One enterprise client at $299/mo contributes more than 33 Pro subscribers and closes in a defined sales cycle. Build the institutional case study first — it validates MXNTOR to B2C users and creates a flywheel.",
      actions: [
        "Target 3–5 bootcamps or universities for a pilot at $0 or discounted rate",
        "Document student outcomes from the pilot — placement rate, completion rate",
        "Use pilot data to anchor the $299/mo enterprise price",
      ],
    };
  } else if (highChurn && proDominant) {
    direction = {
      label: "Retention-first",
      color: "border-yellow-500/40 bg-yellow-500/5",
      badgeColor: "bg-yellow-500/20 text-yellow-400",
      headline: "Stop the Pro churn leak before scaling acquisition.",
      rationale: `Pro revenue is your dominant stream but ${inputs.proChurnRate}% monthly churn is eroding it. Adding new Pro users while churn is this high is filling a leaking bucket. Every percentage point of churn you recover is worth more than a proportional increase in new conversions.`,
      actions: [
        "Ship weekly progress summaries and streak notifications for Pro users",
        "Add a pause-subscription option to reduce full cancellations",
        "Interview churned users: identify the top 3 reasons they left",
      ],
    };
  } else if (lowUsage) {
    direction = {
      label: "Activation-first",
      color: "border-orange-500/40 bg-orange-500/5",
      badgeColor: "bg-orange-500/20 text-orange-400",
      headline: "Improve activation before pushing conversion.",
      rationale: `Only ${inputs.usageRate}% of registered users are active monthly — which means ${100 - inputs.usageRate}% never see a reason to upgrade. Conversion optimization is wasted until you fix what happens in the first 3 sessions after signup.`,
      actions: [
        "Redesign the onboarding flow to force a concrete first win (set a goal, see a roadmap)",
        "Send a Day 3 re-engagement message to users who haven't returned after signup",
        "Test reducing the free question limit to 5/day to accelerate the 'I need more' moment",
      ],
    };
  } else if (enterpriseDominant) {
    direction = {
      label: "Double down on enterprise",
      color: "border-blue-500/40 bg-blue-500/5",
      badgeColor: "bg-blue-500/20 text-blue-400",
      headline: "Enterprise is your revenue engine — protect and expand it.",
      rationale: `${Math.round(enterpriseShare * 100)}% of your revenue comes from enterprise. This is a strong signal that institutional buyers see clear ROI. Your priority should be deepening these relationships, not chasing Pro volume that takes longer to compound.`,
      actions: [
        "Build a dedicated admin dashboard and reporting module — it's the most-cited enterprise upsell lever",
        "Pursue expansion revenue: price by student seat count above a base threshold",
        "Use enterprise clients as distribution: ask them to promote MXNTOR Explorer to their students",
      ],
    };
  } else if (proDominant) {
    direction = {
      label: "Scale Pro top-of-funnel",
      color: "border-blue-500/40 bg-blue-500/5",
      badgeColor: "bg-blue-500/20 text-blue-400",
      headline: "Pro-led growth is working — scale the free user base.",
      rationale: `${Math.round(proShare * 100)}% of revenue comes from Pro subscribers with healthy conversion and churn rates. The lever that moves your number most is growing the free user base, because conversion is already working. Focus on acquisition channels.`,
      actions: [
        "Run Spanish-language content marketing (TikTok/YouTube) targeting 18–28 job seekers",
        "Partner with UNAM, Tec de Monterrey, and coding bootcamps for free tier distribution",
        "Test a referral program: free users get 1 extra week of Pro for every friend they invite",
      ],
    };
  } else {
    direction = {
      label: "Balanced hybrid",
      color: "border-slate-600/40 bg-slate-700/10",
      badgeColor: "bg-slate-700 text-slate-300",
      headline: "Run both tracks in parallel — neither is dominant yet.",
      rationale: "Revenue is balanced between Pro and Enterprise, which means neither channel has broken out. This is early-stage normal. Run both tracks simultaneously but measure them separately so you can see which compounds faster and double down.",
      actions: [
        "Set a 90-day target: either 15 enterprise clients OR 500 Pro users — whichever you hit first becomes the primary track",
        "Assign separate OKRs to the B2B pipeline and the B2C activation funnel",
        "Don't optimize pricing yet — volume and data come first",
      ],
    };
  }

  const severityStyles = {
    warn: "border-yellow-500/30 bg-yellow-500/5 text-yellow-300",
    ok: "border-green-500/30 bg-green-500/5 text-green-300",
    info: "border-blue-500/20 bg-blue-500/5 text-slate-300",
  };

  return (
    <div className="space-y-5">
      {/* Primary direction card */}
      <div className={`rounded-2xl border overflow-hidden ${direction.color}`}>
        <div className="border-b border-slate-700/30 px-6 py-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${direction.badgeColor}`}>
              Recommended direction
            </span>
            <span className="text-sm font-bold text-white">{direction.label}</span>
          </div>
          <h3 className="mt-3 text-xl font-bold text-white">{direction.headline}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">{direction.rationale}</p>
        </div>
        <div className="px-6 py-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-blue-400">Recommended actions</p>
          <ol className="space-y-2">
            {direction.actions.map((action, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-slate-200">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/10 text-[10px] font-bold text-blue-400">
                  {i + 1}
                </span>
                {action}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Signal cards */}
      <div className="grid gap-3 sm:grid-cols-3">
        {signals.map((signal, i) => (
          <div key={i} className={`rounded-xl border px-4 py-3 text-xs leading-relaxed ${severityStyles[signal.severity]}`}>
            {signal.text}
          </div>
        ))}
      </div>

      {/* Revenue split bar */}
      {revenue.totalMonthly > 0 && (
        <div className="rounded-2xl border border-slate-700/60 bg-[#1E293B] px-6 py-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">Revenue split</p>
          <div className="flex h-3 overflow-hidden rounded-full">
            <div
              className="bg-blue-500 transition-all duration-500"
              style={{ width: `${Math.round(proShare * 100)}%` }}
            />
            <div
              className="bg-green-500 transition-all duration-500"
              style={{ width: `${Math.round(enterpriseShare * 100)}%` }}
            />
          </div>
          <div className="mt-2 flex gap-4 text-xs text-slate-400">
            <span><span className="mr-1 inline-block h-2 w-2 rounded-full bg-blue-500" />{Math.round(proShare * 100)}% Pro</span>
            <span><span className="mr-1 inline-block h-2 w-2 rounded-full bg-green-500" />{Math.round(enterpriseShare * 100)}% Enterprise</span>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Main page ──────────────────────────────────────────────────────────── */

export default function PricingPage() {
  const [inputs, setInputs] = useState<CalcInputs>(DEFAULT_INPUTS);
  const [activePreset, setActivePreset] = useState<string>("Expected");
  const [revenue, setRevenue] = useState<Revenue>({ activeUsers: 0, grossProUsers: 0, netProUsers: 0, proMonthly: 0, enterpriseMonthly: 0, totalMonthly: 0, annualRevenue: 0 });
  const [scenarioName, setScenarioName] = useState("");
  const [saving, setSaving] = useState(false);
  const [savedId, setSavedId] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [savedScenarios, setSavedScenarios] = useState<SavedScenario[]>([]);
  const [loadingSaved, setLoadingSaved] = useState(true);

  const calcRevenue = useCallback((inp: CalcInputs): Revenue => {
    const activeUsers = Math.floor((inp.freeUsers * inp.usageRate) / 100);
    const grossProUsers = Math.floor((activeUsers * inp.conversionRate) / 100);
    const netProUsers = Math.floor(grossProUsers * (1 - inp.proChurnRate / 100));
    const proMonthly = netProUsers * inp.pricePerPro;
    const enterpriseMonthly = inp.enterpriseCount * inp.pricePerEnterprise;
    const totalMonthly = proMonthly + enterpriseMonthly;
    return { activeUsers, grossProUsers, netProUsers, proMonthly, enterpriseMonthly, totalMonthly, annualRevenue: totalMonthly * 12 };
  }, []);

  useEffect(() => {
    setRevenue(calcRevenue(inputs));
  }, [inputs, calcRevenue]);

  useEffect(() => {
    fetchSaved();
  }, []);

  async function fetchSaved() {
    try {
      const res = await fetch("/api/save-pricing");
      if (res.ok) {
        const data = await res.json();
        setSavedScenarios(Array.isArray(data) ? data : []);
      }
    } catch {
      // silently fail
    } finally {
      setLoadingSaved(false);
    }
  }

  function applyPreset(name: string) {
    setActivePreset(name);
    setInputs(PRESETS[name]);
    setSavedId(null);
    setSaveError(null);
  }

  function handleInput(key: keyof CalcInputs, value: number) {
    setActivePreset("");
    setSavedId(null);
    setSaveError(null);
    setInputs((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    if (!scenarioName.trim()) {
      setSaveError("Please enter a scenario name before saving.");
      return;
    }
    setSaving(true);
    setSaveError(null);
    try {
      const res = await fetch("/api/save-pricing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scenario_name: scenarioName.trim(),
          inputs,
          revenue,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      setSavedId(data.id);
      setScenarioName("");
      fetchSaved();
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">

        {/* Hero */}
        <div className="mb-16 max-w-3xl">
          <span className="inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-blue-400">
            MXNTOR — Pricing
          </span>
          <h1 className="mt-4 text-5xl font-bold tracking-tight text-white sm:text-6xl">
            Business model &amp; pricing
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-400">
            Interactive revenue projections, assumptions, and risk analysis for MXNTOR.
            Adjust the inputs to model different growth scenarios.
          </p>
        </div>

        {/* ── Section 01: Pricing Table ── */}
        <section className="mb-20">
          <SectionHeader
            number="Section 01"
            title="Plan Comparison"
            subtitle="Feature-by-feature breakdown across all three tiers."
          />

          <div className="overflow-x-auto rounded-2xl border border-slate-700/60">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-slate-700/60 bg-[#1E293B]">
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-widest text-slate-400 w-1/2">
                    Feature
                  </th>
                  {[
                    { name: "Explorer", sub: "Free", accent: false },
                    { name: "Guided", sub: "$9/mo", accent: true },
                    { name: "Institutional", sub: "$299/mo", accent: false },
                  ].map((col) => (
                    <th
                      key={col.name}
                      className={`px-5 py-4 text-center w-[16%] ${col.accent ? "text-blue-400" : "text-slate-300"}`}
                    >
                      <p className={`font-bold ${col.accent ? "text-blue-400" : "text-white"}`}>{col.name}</p>
                      <p className="mt-0.5 text-xs font-normal text-slate-500">{col.sub}</p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FEATURES.map((row, i) => (
                  <tr
                    key={row.label}
                    className={`border-b border-slate-700/30 transition-colors hover:bg-blue-500/5 ${
                      i % 2 === 0 ? "bg-[#0F172A]" : "bg-[#1a2438]"
                    }`}
                  >
                    <td className="px-5 py-3 text-sm text-slate-300">{row.label}</td>
                    <td className="px-5 py-3 text-center"><FeatureCell value={row.explorer} /></td>
                    <td className="px-5 py-3 text-center bg-blue-600/5"><FeatureCell value={row.guided} /></td>
                    <td className="px-5 py-3 text-center"><FeatureCell value={row.institutional} /></td>
                  </tr>
                ))}
                <tr className="border-t border-slate-700/60 bg-[#1E293B]">
                  <td className="px-5 py-4 font-semibold text-white">Price</td>
                  <td className="px-5 py-4 text-center font-bold text-white">$0</td>
                  <td className="px-5 py-4 text-center font-bold text-blue-400 bg-blue-600/5">$9/mo</td>
                  <td className="px-5 py-4 text-center font-bold text-white">$299/mo</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Section 02: Revenue Calculator ── */}
        <section className="mb-20">
          <SectionHeader
            number="Section 02"
            title="Revenue Calculator"
            subtitle="Adjust inputs to model your growth scenario. Revenue updates live."
          />

          {/* Preset toggle */}
          <div className="mb-6 flex flex-wrap gap-2">
            {Object.keys(PRESETS).map((name) => (
              <button
                key={name}
                onClick={() => applyPreset(name)}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                  activePreset === name
                    ? "bg-blue-600 text-white"
                    : "border border-slate-600 text-slate-300 hover:border-blue-500 hover:text-white"
                }`}
              >
                {name}
              </button>
            ))}
            {activePreset === "" && (
              <span className="flex items-center rounded-xl border border-slate-700 px-3 py-2 text-xs text-slate-500">
                Custom
              </span>
            )}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Inputs */}
            <div className="rounded-2xl border border-slate-700/60 bg-[#1E293B] p-6 space-y-5">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-blue-400">Inputs</h3>

              {/* Free users */}
              <div>
                <label className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-200">Free users</span>
                  <span className="font-mono text-blue-400">{inputs.freeUsers.toLocaleString()}</span>
                </label>
                <input
                  type="range"
                  min={100}
                  max={50000}
                  step={100}
                  value={inputs.freeUsers}
                  onChange={(e) => handleInput("freeUsers", Number(e.target.value))}
                  className="w-full accent-blue-500"
                />
                <div className="mt-1 flex justify-between text-[10px] text-slate-600">
                  <span>100</span><span>50,000</span>
                </div>
              </div>

              {/* Usage rate */}
              <div>
                <label className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-200">Monthly active usage rate</span>
                  <span className="font-mono text-blue-400">{inputs.usageRate}%</span>
                </label>
                <input
                  type="range"
                  min={5}
                  max={100}
                  step={5}
                  value={inputs.usageRate}
                  onChange={(e) => handleInput("usageRate", Number(e.target.value))}
                  className="w-full accent-blue-500"
                />
                <div className="mt-1 flex justify-between text-[10px] text-slate-600">
                  <span>5% (dormant base)</span><span>100%</span>
                </div>
                <p className="mt-1 text-[10px] text-slate-600">
                  Active users = {revenue.activeUsers.toLocaleString()} · only active users are exposed to upgrade prompts
                </p>
              </div>

              {/* Conversion rate */}
              <div>
                <label className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-200">Active → Pro conversion rate</span>
                  <span className="font-mono text-blue-400">{inputs.conversionRate}%</span>
                </label>
                <input
                  type="range"
                  min={0.5}
                  max={20}
                  step={0.5}
                  value={inputs.conversionRate}
                  onChange={(e) => handleInput("conversionRate", Number(e.target.value))}
                  className="w-full accent-blue-500"
                />
                <div className="mt-1 flex justify-between text-[10px] text-slate-600">
                  <span>0.5%</span><span>20%</span>
                </div>
              </div>

              {/* Pro churn rate */}
              <div>
                <label className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-200">Pro monthly churn rate</span>
                  <span className="font-mono text-blue-400">{inputs.proChurnRate}%</span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={30}
                  step={1}
                  value={inputs.proChurnRate}
                  onChange={(e) => handleInput("proChurnRate", Number(e.target.value))}
                  className="w-full accent-blue-500"
                />
                <div className="mt-1 flex justify-between text-[10px] text-slate-600">
                  <span>1% (best-in-class)</span><span>30% (critical)</span>
                </div>
                <p className="mt-1 text-[10px] text-slate-600">
                  Gross Pro: {revenue.grossProUsers.toLocaleString()} → Net after churn: {revenue.netProUsers.toLocaleString()}
                </p>
              </div>

              {/* Enterprise count */}
              <div>
                <label className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-200">Enterprise institutions</span>
                  <span className="font-mono text-blue-400">{inputs.enterpriseCount}</span>
                </label>
                <input
                  type="number"
                  min={0}
                  max={500}
                  value={inputs.enterpriseCount}
                  onChange={(e) => handleInput("enterpriseCount", Math.max(0, Number(e.target.value)))}
                  className="w-full rounded-xl border border-slate-600 bg-[#0F172A] px-4 py-2.5 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              {/* Price overrides */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-blue-400">
                    Pro price ($/mo)
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={inputs.pricePerPro}
                    onChange={(e) => handleInput("pricePerPro", Math.max(1, Number(e.target.value)))}
                    className="w-full rounded-xl border border-slate-600 bg-[#0F172A] px-4 py-2.5 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-blue-400">
                    Enterprise price ($/mo)
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={inputs.pricePerEnterprise}
                    onChange={(e) => handleInput("pricePerEnterprise", Math.max(1, Number(e.target.value)))}
                    className="w-full rounded-xl border border-slate-600 bg-[#0F172A] px-4 py-2.5 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              {/* Conversion funnel summary */}
              <div className="rounded-xl border border-slate-700/40 bg-slate-800/40 px-4 py-3 text-xs space-y-1.5">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-blue-400">Conversion funnel</p>
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="font-semibold text-white">{inputs.freeUsers.toLocaleString()}</span>
                  <span className="text-slate-600">registered</span>
                  <span className="text-slate-600">→</span>
                  <span className="font-semibold text-white">{revenue.activeUsers.toLocaleString()}</span>
                  <span className="text-slate-600">active ({inputs.usageRate}%)</span>
                  <span className="text-slate-600">→</span>
                  <span className="font-semibold text-white">{revenue.grossProUsers.toLocaleString()}</span>
                  <span className="text-slate-600">convert</span>
                  <span className="text-slate-600">→</span>
                  <span className="font-semibold text-blue-400">{revenue.netProUsers.toLocaleString()}</span>
                  <span className="text-slate-600">net paying</span>
                </div>
              </div>
            </div>

            {/* Revenue output */}
            <div className="flex flex-col gap-4">
              {[
                { label: "Monthly Pro revenue", value: revenue.proMonthly, sub: `${revenue.netProUsers.toLocaleString()} net users × $${inputs.pricePerPro}`, color: "text-blue-400" },
                { label: "Monthly Enterprise revenue", value: revenue.enterpriseMonthly, sub: `${inputs.enterpriseCount} institutions × $${inputs.pricePerEnterprise}`, color: "text-green-400" },
                { label: "Total monthly revenue", value: revenue.totalMonthly, sub: "Pro + Enterprise", color: "text-white" },
                { label: "Annual revenue (est.)", value: revenue.annualRevenue, sub: "Total monthly × 12", color: "text-yellow-400" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-slate-700/60 bg-[#1E293B] px-6 py-5"
                >
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">{stat.label}</p>
                  <p className={`mt-1.5 text-4xl font-bold tabular-nums ${stat.color}`}>
                    {fmt(stat.value)}
                  </p>
                  <p className="mt-1 text-xs text-slate-600">{stat.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 03: Assumptions ── */}
        <section className="mb-20">
          <SectionHeader
            number="Section 03"
            title="Key Assumptions"
            subtitle="The market and behavioral assumptions underlying the revenue model."
          />

          <div className="rounded-2xl border border-slate-700/60 bg-[#1E293B] overflow-hidden divide-y divide-slate-700/40">
            {ASSUMPTIONS.map((a) => (
              <div key={a.label} className="flex items-center justify-between px-6 py-4">
                <p className="text-sm text-slate-300">{a.label}</p>
                <span className="ml-4 shrink-0 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">
                  {a.value}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 04: Business Risks ── */}
        <section className="mb-20">
          <SectionHeader
            number="Section 04"
            title="Business Risks"
            subtitle="Three risks that could materially impact the revenue model."
          />

          <div className="grid gap-5 sm:grid-cols-3">
            {RISKS.map((risk) => (
              <div key={risk.title} className={`rounded-2xl border overflow-hidden ${risk.color}`}>
                <div className="border-b border-slate-700/30 px-5 py-4">
                  <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${risk.badgeColor}`}>
                    {risk.badge}
                  </span>
                  <h3 className="mt-2 font-bold text-white">{risk.title}</h3>
                </div>
                <div className="px-5 py-4">
                  <p className="text-sm leading-relaxed text-slate-300">{risk.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 05: Recommendation ── */}
        <section className="mb-20">
          <SectionHeader
            number="Section 05"
            title="Pricing Direction Recommendation"
            subtitle="Computed analysis of your current inputs — updates live as you adjust the calculator."
          />
          <Recommendation inputs={inputs} revenue={revenue} />
        </section>

        {/* ── Section 06: Save Scenario ── */}
        <section className="mb-20">
          <SectionHeader
            number="Section 06"
            title="Save Scenario"
            subtitle="Name and save the current inputs to the database for future reference."
          />

          <div className="rounded-2xl border border-slate-700/60 bg-[#1E293B] p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <div className="flex-1">
                <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-blue-400">
                  Scenario name
                </label>
                <input
                  type="text"
                  value={scenarioName}
                  onChange={(e) => { setScenarioName(e.target.value); setSavedId(null); setSaveError(null); }}
                  placeholder="e.g. Q1 Launch — conservative estimate"
                  className="w-full rounded-xl border border-slate-600 bg-[#0F172A] px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
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
                    Save scenario
                  </>
                )}
              </button>
            </div>

            {savedId && (
              <p className="mt-3 text-xs text-slate-400">
                Saved with ID: <span className="font-mono text-blue-400">{savedId}</span>
              </p>
            )}
            {saveError && (
              <div className="mt-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {saveError}
              </div>
            )}
          </div>
        </section>

        {/* ── Section 07: Saved Scenarios ── */}
        <section className="mb-8">
          <SectionHeader
            number="Section 07"
            title="Saved Scenarios"
            subtitle="Last 3 saved scenarios from the database."
          />

          {loadingSaved ? (
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <Spinner /> Loading saved scenarios…
            </div>
          ) : savedScenarios.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-700 p-10 text-center">
              <p className="text-sm text-slate-500">
                No saved scenarios yet. Configure inputs above and save.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {savedScenarios.map((s) => (
                <div key={s.id} className="rounded-2xl border border-slate-700/60 bg-[#1E293B] p-5">
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-blue-500/20 px-3 py-1 text-sm font-semibold text-blue-400">
                      {s.scenario_name}
                    </span>
                    <span className="font-mono text-xs text-slate-500">
                      {new Date(s.created_at).toLocaleString()}
                    </span>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">Inputs</p>
                      <ul className="mt-2 space-y-1 text-xs text-slate-300">
                        <li>{s.inputs.freeUsers.toLocaleString()} free users</li>
                        <li>{s.inputs.conversionRate}% conversion</li>
                        <li>{s.inputs.enterpriseCount} enterprise clients</li>
                      </ul>
                    </div>
                    {[
                      { label: "Monthly Pro", value: s.revenue.proMonthly },
                      { label: "Monthly Enterprise", value: s.revenue.enterpriseMonthly },
                      { label: "Annual revenue", value: s.revenue.annualRevenue },
                    ].map((stat) => (
                      <div key={stat.label}>
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">{stat.label}</p>
                        <p className="mt-2 text-xl font-bold text-white">{fmt(stat.value)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
