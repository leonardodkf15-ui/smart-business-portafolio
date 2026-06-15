import Link from "next/link";

const problems = [
  {
    icon: "🧭",
    title: "Feeling lost with no direction",
    desc: "Most young Mexicans don't know where to start in tech. There's no map, no roadmap, and no one to ask.",
  },
  {
    icon: "👤",
    title: "No mentor or guidance available",
    desc: "Real mentors are expensive, hard to find, or gatekept behind elite universities and connections.",
  },
  {
    icon: "💸",
    title: "Too expensive or only in English",
    desc: "The best resources cost money or assume fluency in English — shutting out millions of motivated learners.",
  },
];

const features = [
  {
    icon: "🤖",
    title: "AI Mentor Always Available",
    desc: "Ask anything, any time. MXNTOR answers like a senior tech professional — patient, clear, and always there.",
  },
  {
    icon: "🇲🇽",
    title: "Spanish-First Experience",
    desc: "Every conversation, explanation, and resource is in Spanish. No translation needed. No English barrier.",
  },
  {
    icon: "💼",
    title: "Mexico Job Market Focus",
    desc: "Career advice, skills to learn, and companies to target — all calibrated to the Mexican tech market.",
  },
];

const testimonials = [
  {
    name: "Diego Ramírez",
    age: 22,
    city: "Ciudad de México",
    role: "Aspirante a desarrollador web",
    quote:
      "Llevaba meses tratando de aprender solo y no sabía por dónde empezar. MXNTOR me dio un camino claro en minutos. Siento que por fin tengo a alguien que me guía.",
    initials: "DR",
    color: "bg-blue-600",
  },
  {
    name: "Valeria Torres",
    age: 20,
    city: "Guadalajara",
    role: "Estudiante de ingeniería",
    quote:
      "Lo que más me gusta es que me habla en español y entiende el mercado laboral de México. No es otro recurso pensado para Silicon Valley.",
    initials: "VT",
    color: "bg-indigo-600",
  },
  {
    name: "Carlos Mendoza",
    age: 25,
    city: "Monterrey",
    role: "Trabajador en transición",
    quote:
      "No tenía dinero para pagar un mentor o un bootcamp caro. MXNTOR es gratis para empezar y me ha enseñado más en un mes que años de búsqueda en YouTube.",
    initials: "CM",
    color: "bg-cyan-700",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-white">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-transparent pointer-events-none" />
        <div className="mx-auto max-w-6xl px-4 py-28 sm:px-6 sm:py-36">
          <span className="mb-6 inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-blue-400">
            MXNTOR — AI Mentor Platform
          </span>
          <h1 className="mb-4 max-w-3xl text-5xl font-bold tracking-tight text-white sm:text-7xl leading-tight">
            <span className="text-blue-400">The Mentor</span>
            <br />
            That Mexico Needs
          </h1>
          <p className="mb-10 max-w-2xl text-lg leading-relaxed text-slate-400 sm:text-xl">
            An AI-powered mentor that guides young Mexicans through their tech
            learning journey — in Spanish, for free, personalized to the Mexican
            job market.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/core"
              className="rounded-xl bg-blue-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-500 active:scale-95"
            >
              Seize the Opportunity →
            </Link>
            <Link
              href="/product"
              className="rounded-xl border border-slate-600 px-7 py-3.5 text-base font-semibold text-slate-300 transition hover:border-blue-500 hover:text-white"
            >
              See How It Works
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            {["🇲🇽 Spanish-first", "🤖 AI-powered", "🆓 Free to start", "💼 Mexico job market"].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-slate-700 bg-slate-800/60 px-3 py-1.5 text-sm text-slate-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Problem ── */}
      <section className="border-t border-slate-700/50">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="mb-12 max-w-2xl">
            <span className="inline-block rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-red-400">
              The Problem
            </span>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
              Why young Mexicans get left behind in tech
            </h2>
            <p className="mt-3 text-slate-400">
              Over 30 million young Mexicans want careers in technology. Most
              never get there — not because they lack talent, but because the
              system wasn&apos;t built for them.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {problems.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-slate-700/60 bg-[#1E293B] p-6"
              >
                <span className="text-3xl">{p.icon}</span>
                <h3 className="mt-4 text-base font-bold text-white">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="border-t border-slate-700/50">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="mb-12 max-w-2xl">
            <span className="inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-blue-400">
              The Solution
            </span>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
              Your mentor. Your language. Your market.
            </h2>
            <p className="mt-3 text-slate-400">
              MXNTOR gives every young Mexican the equivalent of having a senior
              tech professional in their corner — always available, always in
              Spanish, always focused on Mexico.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-blue-500/20 bg-gradient-to-b from-blue-600/10 to-[#1E293B] p-6"
              >
                <span className="text-3xl">{f.icon}</span>
                <h3 className="mt-4 text-base font-bold text-white">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Social Proof ── */}
      <section className="border-t border-slate-700/50">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="mb-12 max-w-2xl">
            <span className="inline-block rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-green-400">
              Testimonials
            </span>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
              Lo que dicen nuestros usuarios
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="flex flex-col rounded-2xl border border-slate-700/60 bg-[#1E293B] p-6"
              >
                <div className="flex-1">
                  <p className="text-sm leading-relaxed text-slate-300 italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white ${t.color}`}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}, {t.age}</p>
                    <p className="text-xs text-slate-500">{t.role} · {t.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="border-t border-slate-700/50">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 text-center">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-4xl font-bold text-white sm:text-5xl">
              Mexico&#39;s tech talent
              <br />
              <span className="text-blue-400">starts here.</span>
            </h2>
            <p className="mt-5 text-lg text-slate-400">
              Join thousands of young Mexicans building real tech skills with an
              AI mentor that finally speaks their language.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/core"
                className="rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-500 active:scale-95"
              >
                Seize the Opportunity →
              </Link>
              <Link
                href="/product"
                className="rounded-xl border border-slate-600 px-8 py-4 text-base font-semibold text-slate-300 transition hover:border-blue-500 hover:text-white"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
