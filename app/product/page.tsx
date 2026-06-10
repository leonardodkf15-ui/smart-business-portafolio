"use client";

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

/* ─── Data ───────────────────────────────────────────────────────────────── */

const packages = [
  {
    name: "Explorer",
    tier: "Free",
    price: "$0",
    period: "forever",
    badge: null,
    accent: false,
    description: "For individual students exploring the platform.",
    features: [
      "AI mentor chat — 10 questions/day",
      "Basic learning path suggestions",
      "Spanish-first interface",
      "Access to resource library",
    ],
    cta: "Get started free",
    ctaStyle: "border border-slate-600 text-slate-200 hover:border-blue-500 hover:text-white",
  },
  {
    name: "Guided",
    tier: "Pro",
    price: "$9",
    period: "per month",
    badge: "Most popular",
    accent: true,
    description: "For motivated individual learners.",
    features: [
      "Unlimited AI mentor conversations",
      "Personalized learning roadmap",
      "Progress tracking and streaks",
      "Career path recommendations for Mexican job market",
      "Priority response time",
    ],
    cta: "Start Pro",
    ctaStyle: "bg-blue-600 text-white hover:bg-blue-500",
  },
  {
    name: "Institutional",
    tier: "Enterprise",
    price: "$299",
    period: "per institution / month",
    badge: null,
    accent: false,
    description: "For universities, bootcamps, and companies.",
    features: [
      "Everything in Pro for all students",
      "Admin dashboard",
      "Custom learning paths",
      "Dedicated onboarding",
      "Analytics and reporting",
    ],
    cta: "Contact sales",
    ctaStyle: "border border-slate-600 text-slate-200 hover:border-blue-500 hover:text-white",
  },
];

const segments = [
  {
    label: "B2C",
    title: "Individual Students",
    icon: "👩‍💻",
    color: "border-blue-500/40 bg-blue-500/5",
    badgeColor: "bg-blue-500/20 text-blue-400",
    details: [
      { label: "Age range", value: "18–28" },
      { label: "Context", value: "Self-teaching tech skills" },
      { label: "Language", value: "Spanish-first" },
      { label: "Tiers", value: "Explorer (Free) or Guided (Pro)" },
    ],
    description:
      "Young Mexicans from low-income or first-generation college backgrounds who lack access to professional networks and affordable mentorship. They are self-directed, mobile-first, and motivated by real employment outcomes.",
  },
  {
    label: "B2B",
    title: "Institutions",
    icon: "🏛️",
    color: "border-green-500/40 bg-green-500/5",
    badgeColor: "bg-green-500/20 text-green-400",
    details: [
      { label: "Type", value: "Universities, bootcamps, companies" },
      { label: "Geography", value: "Mexico" },
      { label: "Decision-maker", value: "Rector, VP People, Program Director" },
      { label: "Tier", value: "Institutional (Enterprise)" },
    ],
    description:
      "Mexican educational institutions and employers who need a scalable upskilling tool for their students or workforce. They buy on outcomes: placement rates, completion rates, and admin visibility.",
  },
];

/* ─── Main page ──────────────────────────────────────────────────────────── */

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">

        {/* Hero */}
        <div className="mb-16 max-w-3xl">
          <span className="inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-blue-400">
            MXNTOR — Product
          </span>
          <h1 className="mt-4 text-5xl font-bold tracking-tight text-white sm:text-6xl">
            AI mentorship,<br />
            <span className="text-blue-400">built for Mexico</span>
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-400">
            MXNTOR gives every young Mexican the equivalent of having a senior tech professional
            in their corner — available 24/7, in Spanish, personalized to the Mexican job market,
            and free to start. No English required. No expensive subscription. No gatekeeping.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {[
              { icon: "🇲🇽", text: "Spanish-first" },
              { icon: "🤖", text: "AI-powered mentorship" },
              { icon: "🆓", text: "Free to start" },
              { icon: "💼", text: "Mexico job market focus" },
            ].map((tag) => (
              <span
                key={tag.text}
                className="flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800/60 px-3 py-1.5 text-sm text-slate-300"
              >
                <span>{tag.icon}</span>
                {tag.text}
              </span>
            ))}
          </div>
        </div>

        {/* ── Section 01: Product Packages ── */}
        <section className="mb-20">
          <SectionHeader
            number="Section 01"
            title="Product Packages"
            subtitle="Three tiers built for two customer segments — students and institutions."
          />

          <div className="grid gap-6 sm:grid-cols-3">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative flex flex-col rounded-2xl border overflow-hidden ${
                  pkg.accent
                    ? "border-blue-500/60 bg-gradient-to-b from-blue-600/10 to-[#1E293B]"
                    : "border-slate-700/60 bg-[#1E293B]"
                }`}
              >
                {pkg.badge && (
                  <div className="absolute right-4 top-4">
                    <span className="rounded-full bg-blue-500 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                      {pkg.badge}
                    </span>
                  </div>
                )}

                <div className={`border-b px-6 py-6 ${pkg.accent ? "border-blue-500/30" : "border-slate-700/60"}`}>
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-semibold uppercase tracking-widest text-blue-400">{pkg.tier}</p>
                  </div>
                  <h3 className="mt-1 text-xl font-bold text-white">{pkg.name}</h3>
                  <div className="mt-3 flex items-end gap-1">
                    <span className="text-4xl font-bold text-white">{pkg.price}</span>
                    <span className="mb-1 text-sm text-slate-400">/{pkg.period}</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-400">{pkg.description}</p>
                </div>

                <div className="flex flex-1 flex-col px-6 py-5">
                  <ul className="flex-1 space-y-3">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-slate-200">
                        <svg className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`mt-6 w-full rounded-xl px-4 py-2.5 text-sm font-semibold transition ${pkg.ctaStyle}`}
                  >
                    {pkg.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 02: Customer Segments ── */}
        <section className="mb-20">
          <SectionHeader
            number="Section 02"
            title="Customer Segments"
            subtitle="MXNTOR serves two distinct segments with different needs, purchase triggers, and success metrics."
          />

          <div className="grid gap-6 sm:grid-cols-2">
            {segments.map((seg) => (
              <div
                key={seg.label}
                className={`rounded-2xl border overflow-hidden ${seg.color}`}
              >
                <div className="border-b border-slate-700/40 px-6 py-5">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{seg.icon}</span>
                    <div>
                      <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider ${seg.badgeColor}`}>
                        {seg.label}
                      </span>
                      <h3 className="mt-0.5 text-lg font-bold text-white">{seg.title}</h3>
                    </div>
                  </div>
                </div>

                <div className="px-6 py-5">
                  <div className="mb-4 grid gap-3 sm:grid-cols-2">
                    {seg.details.map((d) => (
                      <div key={d.label}>
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-blue-400">{d.label}</p>
                        <p className="mt-0.5 text-sm font-medium text-slate-200">{d.value}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-slate-300">{seg.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 03: Mission Note ── */}
        <section className="mb-8">
          <SectionHeader
            number="Section 03"
            title="The Mission Behind the Model"
          />

          <div className="rounded-2xl border border-blue-500/40 bg-gradient-to-br from-blue-600/20 to-blue-900/10 p-8">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-400">
                Why students stay free
              </p>
              <h3 className="mt-3 text-2xl font-bold text-white">
                Enterprise funds the free tier — by design.
              </h3>
              <p className="mt-4 text-base leading-relaxed text-slate-300">
                MXNTOR is built on a simple premise: the biggest talent gap in Mexico is not a skills problem,
                it&apos;s an access problem. Students from low-income backgrounds shouldn&apos;t have to pay for
                the mentorship that students at elite universities get for free through alumni networks and
                internship pipelines.
              </p>
              <p className="mt-3 text-base leading-relaxed text-slate-300">
                Every Institutional client — a university, bootcamp, or company — that pays{" "}
                <span className="font-semibold text-white">$299/month</span> directly subsidizes
                the free tier used by students. Breaking even requires just{" "}
                <span className="font-semibold text-white">15 enterprise clients</span> or{" "}
                <span className="font-semibold text-white">500 Pro subscribers</span>.
                The model is designed so that commercial success and social impact are the same thing.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {[
                  { label: "Enterprise break-even", value: "15 clients" },
                  { label: "Pro break-even", value: "500 users" },
                  { label: "Target free users", value: "30M young adults" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-4 text-center">
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="mt-1 text-xs text-slate-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
