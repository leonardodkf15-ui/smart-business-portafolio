"use client";

import { useState, useEffect } from "react";

/* ─── Types ─────────────────────────────────────────────────────────────── */

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

interface SavedOutput {
  id: string;
  idea: string;
  output: GenerativeCore;
  created_at: string;
}

/* ─── Static data ────────────────────────────────────────────────────────── */

const chapters = [
  {
    chapter: 1,
    title: "The Skills Gap",
    problem: "Young Mexicans don't know which tech skills are in demand",
    user: "18-28 year olds job hunting",
    slice: "No personalized career roadmap",
    technology: "AI career path generator",
    venture: "App that maps skills to job market demand",
    whoPays: "Users, employers",
    impact: "More young people land tech jobs",
    risk: "AI recommends irrelevant careers",
  },
  {
    chapter: 2,
    title: "Lost in Translation",
    problem: "Best tech courses are in English",
    user: "Young adults with basic English",
    slice: "Language barrier blocking learning",
    technology: "AI real-time course translator",
    venture: "Platform that translates top courses to Spanish",
    whoPays: "Universities, students",
    impact: "Democratizes access to global knowledge",
    risk: "Copyright issues with translated content",
  },
  {
    chapter: 3,
    title: "No Mentor No Problem",
    problem: "Young adults have no tech mentors",
    user: "First-generation college students",
    slice: "No access to professional networks",
    technology: "AI mentor chatbot",
    venture: "MXNTOR — AI mentor for young Mexicans learning tech",
    whoPays: "Schools, students",
    impact: "Levels playing field for low-income students",
    risk: "Generic advice that doesn't fit local context",
  },
  {
    chapter: 4,
    title: "The Dropout Signal",
    problem: "Young adults quit online courses before finishing",
    user: "Self-taught learners",
    slice: "Low completion rates",
    technology: "AI motivation and accountability system",
    venture: "Tool that detects dropout risk and intervenes",
    whoPays: "EdTech platforms",
    impact: "Higher course completion rates",
    risk: "Feeling surveilled or judged",
  },
  {
    chapter: 5,
    title: "Micro-Credential Mexico",
    problem: "Employers don't trust informal learning",
    user: "Young adults with self-taught skills",
    slice: "No way to prove non-formal skills",
    technology: "AI skill verification and badging",
    venture: "Platform that tests and certifies self-taught skills",
    whoPays: "Employers, job seekers",
    impact: "Validates talent that gets ignored",
    risk: "Credentials being gamed or faked",
  },
  {
    chapter: 6,
    title: "The Rural Brain",
    problem: "Young people in rural Mexico can't access tech education",
    user: "Rural 18-25 year olds",
    slice: "No internet, no devices, no local schools",
    technology: "Offline-first AI learning tool",
    venture: "App that works without internet and syncs when connected",
    whoPays: "Government, NGOs",
    impact: "Brings tech education to underserved areas",
    risk: "Low device penetration in rural zones",
  },
  {
    chapter: 7,
    title: "AI Anxiety",
    problem: "Young workers fear AI will replace their jobs",
    user: "Entry-level workers 20-30",
    slice: "Fear and confusion about AI tools",
    technology: "AI literacy and upskilling platform",
    venture: "Tool that teaches workers how to use AI in their current job",
    whoPays: "Companies, HR departments",
    impact: "Reduces fear, increases productivity",
    risk: "Oversimplifying complex AI topics",
  },
  {
    chapter: 8,
    title: "The Freelance Gap",
    problem: "Young Mexicans want to freelance in tech but don't know how",
    user: "Aspiring freelancers",
    slice: "No guidance on how to get first clients",
    technology: "AI business coach for freelancers",
    venture: "Platform that helps young Mexicans launch a tech freelance career",
    whoPays: "Freelancers, small agencies",
    impact: "Creates income independence",
    risk: "Race to the bottom on pricing",
  },
  {
    chapter: 9,
    title: "Women in Tech MX",
    problem: "Young women in Mexico are underrepresented in tech",
    user: "Women 18-28 interested in tech",
    slice: "Cultural and structural barriers to entry",
    technology: "AI community and learning platform for women in tech",
    venture: "Safe space platform with mentorship, courses, and job board",
    whoPays: "Corporations, NGOs, government",
    impact: "Closes gender gap in Mexican tech sector",
    risk: "Tokenism without real structural change",
  },
  {
    chapter: 10,
    title: "The Certification Trap",
    problem: "Expensive certifications block young people from tech jobs",
    user: "Unemployed young adults",
    slice: "Cost of certifications is prohibitive",
    technology: "AI-powered free certification prep tool",
    venture: "Free AI tutor that prepares students for real certifications like AWS and Google",
    whoPays: "Sponsors, companies hiring",
    impact: "Makes high-value certifications accessible to all",
    risk: "Quality gap vs paid prep courses",
  },
];

const mxntorCore: GenerativeCore = {
  problem:
    "Young Mexicans (18-28) from low-income and first-generation backgrounds have no access to personalized tech mentorship or career guidance in Spanish. Professional networks are gatekept, courses are in English, and human mentors are inaccessible.",
  user: "First-generation college students, self-taught learners, and young adults from low-income backgrounds in Mexico seeking a career in technology.",
  slice:
    "No access to professional networks, language barriers to global learning resources, and no affordable mentorship available in Spanish for the local job market.",
  technology:
    "AI mentor chatbot with contextual understanding of the Mexican tech market, personalized learning path generation, Spanish-language knowledge base, and career simulation tools.",
  value:
    "On-demand, personalized mentorship available 24/7 in Spanish at no initial cost — giving every young Mexican the equivalent of having a senior tech professional in their corner.",
  principles: [
    "Spanish-first by design — built for Mexico, not translated for it",
    "Personalized to the local job market and real employer needs",
    "Free to start — no financial barrier to quality guidance",
    "Community-powered — peer learning and human mentors amplify AI",
  ],
  useCases: [
    "Get a personalized tech learning roadmap based on your current skills and target job",
    "Practice job interviews in Spanish with AI feedback on answers and body language tips",
    "Ask career questions specific to the Mexican tech market at any hour",
    "Connect with vetted human mentors for deeper guidance on critical decisions",
  ],
  venture:
    "B2C freemium app with B2B school and company partnerships. Launch with a free AI chat mentor, then expand to structured learning paths, human mentor marketplace, and employer-sponsored premium tiers.",
  business:
    "Freemium model — free tier for students with core AI mentorship, premium subscriptions (MXN $99/mo) for advanced features. B2B licenses to high schools, universities, and companies running upskilling programs. Employer-sponsored access as a hiring pipeline tool.",
  impact:
    "Democratizes access to tech mentorship across Mexico, closes the opportunity gap between students in elite universities and everyone else, and accelerates the growth of Mexico's tech talent pipeline at national scale.",
  risk: "AI advice may feel generic or fail to capture local nuance. User trust is hard to build without a human touch. Scaling personalization is expensive. Competition from global platforms with larger budgets. Risk of dependency without building real skills.",
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
      {subtitle && (
        <p className="mt-2 text-sm text-slate-400">{subtitle}</p>
      )}
    </div>
  );
}

function CoreCard({
  core,
  idea,
  accent = false,
}: {
  core: GenerativeCore;
  idea?: string;
  accent?: boolean;
}) {
  const fields: { label: string; key: keyof GenerativeCore; list?: boolean }[] =
    [
      { label: "Problem", key: "problem" },
      { label: "User", key: "user" },
      { label: "Slice", key: "slice" },
      { label: "Technology Pattern", key: "technology" },
      { label: "Value Created", key: "value" },
      { label: "Core Principles", key: "principles", list: true },
      { label: "Use Cases", key: "useCases", list: true },
      { label: "Venture Direction", key: "venture" },
      { label: "Business Logic", key: "business" },
      { label: "Impact", key: "impact" },
      { label: "Risk", key: "risk" },
    ];

  return (
    <div
      className={`rounded-2xl border ${
        accent
          ? "border-blue-500/40 bg-[#1E293B]"
          : "border-slate-700/60 bg-[#1E293B]"
      } overflow-hidden`}
    >
      {idea && (
        <div className="border-b border-slate-700/60 bg-blue-600/10 px-6 py-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-400">
            Venture Idea
          </p>
          <p className="mt-1 text-base font-medium text-white">{idea}</p>
        </div>
      )}
      <div className="divide-y divide-slate-700/40">
        {fields.map(({ label, key, list }) => {
          const value = core[key];
          return (
            <div key={key} className="px-6 py-4">
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-blue-400">
                {label}
              </p>
              {list && Array.isArray(value) ? (
                <ul className="space-y-1">
                  {value.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-200">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm leading-relaxed text-slate-200">
                  {String(value)}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Main page ──────────────────────────────────────────────────────────── */

export default function CorePage() {
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<GenerativeCore | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [savedId, setSavedId] = useState<string | null>(null);
  const [savedOutputs, setSavedOutputs] = useState<SavedOutput[]>([]);
  const [loadingSaved, setLoadingSaved] = useState(true);

  useEffect(() => {
    fetchSaved();
  }, []);

  async function fetchSaved() {
    try {
      const res = await fetch("/api/save-core");
      if (res.ok) {
        const data = await res.json();
        setSavedOutputs(Array.isArray(data) ? data : []);
      }
    } catch {
      // silently fail — saved section just stays empty
    } finally {
      setLoadingSaved(false);
    }
  }

  async function handleGenerate() {
    if (!idea.trim()) return;
    setLoading(true);
    setOutput(null);
    setError(null);
    setSavedId(null);

    try {
      const res = await fetch("/api/generate-core", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea: idea.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");
      setOutput(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!output) return;
    setSaving(true);

    try {
      const res = await fetch("/api/save-core", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea: idea.trim(), output }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      setSavedId(data.id);
      fetchSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">

        {/* Page hero */}
        <div className="mb-16 max-w-3xl">
          <span className="inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-blue-400">
            Week 1 Assignment
          </span>
          <h1 className="mt-4 text-5xl font-bold tracking-tight text-white sm:text-6xl">
            MXNTOR
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-400">
            An AI mentor platform for young Mexicans learning technology and AI
            skills. Always available, in Spanish, personalized, and free to
            start.
          </p>
        </div>

        {/* ── Section 1: Book Architecture Table ── */}
        <section className="mb-20">
          <SectionHeader
            number="Section 01"
            title="10-Chapter Book Architecture"
            subtitle="The problem space mapped across 10 chapters — each one a distinct venture opportunity."
          />

          <div className="overflow-x-auto rounded-2xl border border-slate-700/60">
            <table className="w-full min-w-[1100px] text-sm">
              <thead>
                <tr className="border-b border-slate-700/60 bg-[#1E293B]">
                  {[
                    "Ch.",
                    "Title",
                    "Problem",
                    "User",
                    "Slice",
                    "Technology",
                    "Venture Idea",
                    "Who Pays",
                    "Impact",
                    "Risk",
                  ].map((col) => (
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
                {chapters.map((ch, i) => (
                  <tr
                    key={ch.chapter}
                    className={`border-b border-slate-700/30 transition-colors hover:bg-blue-500/5 ${
                      ch.chapter === 3
                        ? "bg-blue-600/10 hover:bg-blue-600/15"
                        : i % 2 === 0
                        ? "bg-[#0F172A]"
                        : "bg-[#1a2438]"
                    }`}
                  >
                    <td className="px-4 py-3 font-semibold text-blue-400">
                      {ch.chapter}
                    </td>
                    <td className="px-4 py-3 font-medium text-white">
                      {ch.title}
                      {ch.chapter === 3 && (
                        <span className="ml-2 rounded-full bg-blue-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                          ★
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-slate-300">{ch.problem}</td>
                    <td className="px-4 py-3 text-slate-300">{ch.user}</td>
                    <td className="px-4 py-3 text-slate-300">{ch.slice}</td>
                    <td className="px-4 py-3 text-slate-300">{ch.technology}</td>
                    <td className="px-4 py-3 text-slate-300">{ch.venture}</td>
                    <td className="px-4 py-3 text-slate-300">{ch.whoPays}</td>
                    <td className="px-4 py-3 text-slate-300">{ch.impact}</td>
                    <td className="px-4 py-3 text-slate-300">{ch.risk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Section 2: MXNTOR Venture Card ── */}
        <section className="mb-20">
          <SectionHeader
            number="Section 02"
            title="Selected Venture — MXNTOR"
            subtitle="Chapter 3 selected as the core venture. Full Generative Core below."
          />

          <div className="mb-6 rounded-2xl border border-blue-500/40 bg-gradient-to-br from-blue-600/20 to-blue-900/10 p-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-blue-500 px-3 py-1 text-xs font-bold text-white">
                Chapter 3
              </span>
              <span className="rounded-full border border-blue-500/30 px-3 py-1 text-xs font-medium text-blue-300">
                No Mentor No Problem
              </span>
              <span className="rounded-full border border-slate-600 px-3 py-1 text-xs font-medium text-slate-400">
                EdTech · AI · Mexico
              </span>
            </div>
            <h3 className="mt-4 text-2xl font-bold text-white">MXNTOR</h3>
            <p className="mt-2 text-base leading-relaxed text-slate-300">
              An AI mentor platform for young Mexicans learning technology and
              AI skills. Always available, in Spanish, personalized, and free to
              start.
            </p>
          </div>

          <CoreCard core={mxntorCore} accent />
        </section>

        {/* ── Section 3: Generate Form ── */}
        <section className="mb-12">
          <SectionHeader
            number="Section 03"
            title="Generate Your Generative Core"
            subtitle="Describe any venture idea and Claude will analyze it using the Generative Core framework."
          />

          <div className="rounded-2xl border border-slate-700/60 bg-[#1E293B] p-6">
            <label
              htmlFor="idea-input"
              className="mb-2 block text-sm font-semibold text-slate-200"
            >
              Your Venture Idea
            </label>
            <textarea
              id="idea-input"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="Describe your venture idea... e.g. 'A platform that connects rural Mexican farmers with urban consumers via AI-powered logistics and quality grading'"
              rows={4}
              className="w-full resize-none rounded-xl border border-slate-600 bg-[#0F172A] px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={handleGenerate}
                disabled={loading || !idea.trim()}
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <svg
                      className="h-4 w-4 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Generating…
                  </>
                ) : (
                  <>
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    Generate
                  </>
                )}
              </button>
              {output && (
                <p className="text-xs text-green-400">
                  ✓ Core generated successfully
                </p>
              )}
            </div>

            {error && (
              <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}
          </div>
        </section>

        {/* ── Section 4 + 5: Output Card + Save ── */}
        {output && (
          <section className="mb-20">
            <SectionHeader
              number="Section 04"
              title="Generated Generative Core"
            />

            <CoreCard core={output} idea={idea} />

            <div className="mt-6 flex items-center gap-4">
              <button
                onClick={handleSave}
                disabled={saving || !!savedId}
                className="flex items-center gap-2 rounded-xl bg-green-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-green-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? (
                  <>
                    <svg
                      className="h-4 w-4 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Saving…
                  </>
                ) : savedId ? (
                  <>
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Saved
                  </>
                ) : (
                  <>
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                      />
                    </svg>
                    Save to Database
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
          </section>
        )}

        {/* ── Section 6: Saved Outputs ── */}
        <section className="mb-8">
          <SectionHeader
            number="Section 05"
            title="Saved Outputs"
            subtitle="Last 3 saved Generative Cores from the database."
          />

          {loadingSaved ? (
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <svg
                className="h-4 w-4 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Loading saved outputs…
            </div>
          ) : savedOutputs.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-700 p-10 text-center">
              <p className="text-sm text-slate-500">
                No saved outputs yet. Generate and save a Generative Core above.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {savedOutputs.map((saved) => (
                <div key={saved.id}>
                  <div className="mb-3 flex items-center gap-3">
                    <span className="text-xs font-mono text-slate-500">
                      {new Date(saved.created_at).toLocaleString()}
                    </span>
                    <span className="h-px flex-1 bg-slate-700/60" />
                  </div>
                  <CoreCard core={saved.output} idea={saved.idea} />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
