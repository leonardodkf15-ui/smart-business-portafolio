import Link from "next/link";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-24 sm:px-6">
      {/* Hero */}
      <div className="mb-20 max-w-2xl">
        <span className="mb-4 inline-block rounded-full border border-zinc-200 px-3 py-1 text-xs font-medium text-zinc-500">
          Week 0 — Day 1
        </span>
        <h1 className="mb-4 text-5xl font-bold tracking-tight text-zinc-900 sm:text-6xl">
          Week 0 Build
        </h1>
        <p className="mb-8 text-lg leading-relaxed text-zinc-500">
          A minimal Next.js 14 starter. Clean structure, Tailwind CSS, and a
          sensible baseline to ship from.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/docs"
            className="rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
          >
            Read the docs
          </Link>
          <a
            href="https://github.com"
            className="rounded-lg border border-zinc-200 px-5 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
          >
            View on GitHub
          </a>
        </div>
      </div>

      {/* Feature grid */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          {
            title: "Next.js 14",
            desc: "App Router, server components, and file-based routing out of the box.",
          },
          {
            title: "Tailwind CSS",
            desc: "Utility-first styling with no configuration overhead.",
          },
          {
            title: "TypeScript",
            desc: "Full type safety across components, pages, and props.",
          },
        ].map(({ title, desc }) => (
          <div
            key={title}
            className="rounded-xl border border-zinc-100 bg-zinc-50 p-6"
          >
            <h3 className="mb-2 text-sm font-semibold text-zinc-900">{title}</h3>
            <p className="text-sm leading-relaxed text-zinc-500">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
