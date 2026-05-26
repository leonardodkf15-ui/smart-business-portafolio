import type { Metadata } from "next";

export const metadata: Metadata = { title: "Docs — Week 0 Build" };

export default function DocsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="mb-2 text-3xl font-bold tracking-tight text-zinc-900">
        Documentation
      </h1>
      <p className="mb-12 text-zinc-500">
        Architecture, tech stack, and setup guide for Week 0 Build.
      </p>

      <div className="space-y-12">
        {/* Overview */}
        <section>
          <h2 className="mb-3 text-lg font-semibold text-zinc-900">Overview</h2>
          <p className="text-sm leading-relaxed text-zinc-600">
            Week 0 Build is a Next.js 14 project that serves as the foundation for a
            weekly build series. It includes a homepage, weekly placeholder pages
            (Week 1–3), a documentation page, a shared navbar and footer, and is
            wired up to GitHub, Vercel, and Supabase.
          </p>
        </section>

        {/* Architecture */}
        <section>
          <h2 className="mb-3 text-lg font-semibold text-zinc-900">Architecture</h2>
          <div className="overflow-hidden rounded-lg border border-zinc-100">
            {[
              ["Homepage /", "Hero section, feature grid, links to docs and GitHub"],
              ["Week 1 /week1", "Placeholder — Coming Soon"],
              ["Week 2 /week2", "Placeholder — Coming Soon"],
              ["Week 3 /week3", "Placeholder — Coming Soon"],
              ["Docs /docs", "Project documentation (this page)"],
              ["GitHub", "Source repository and version control"],
              ["Vercel", "Deployment — auto-deploys on push to main"],
              ["Supabase", "Backend database and auth (connected, ready to use)"],
            ].map(([name, desc], i, arr) => (
              <div
                key={name}
                className={`flex gap-4 px-4 py-3 text-sm ${
                  i < arr.length - 1 ? "border-b border-zinc-100" : ""
                }`}
              >
                <span className="w-36 shrink-0 font-medium text-zinc-900">{name}</span>
                <span className="text-zinc-500">{desc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Tech stack */}
        <section>
          <h2 className="mb-3 text-lg font-semibold text-zinc-900">Tech stack</h2>
          <div className="overflow-hidden rounded-lg border border-zinc-100">
            {[
              ["Next.js 14", "App Router, server components, file-based routing"],
              ["Tailwind CSS", "Utility-first CSS, configured via tailwind.config.ts"],
              ["TypeScript", "Static typing across all components and pages"],
              ["Supabase", "Postgres database, auth, and real-time subscriptions"],
              ["Vercel", "Edge deployment with preview URLs per branch"],
              ["ESLint", "Linting via eslint-config-next"],
            ].map(([name, desc], i, arr) => (
              <div
                key={name}
                className={`flex gap-4 px-4 py-3 text-sm ${
                  i < arr.length - 1 ? "border-b border-zinc-100" : ""
                }`}
              >
                <span className="w-36 shrink-0 font-medium text-zinc-900">{name}</span>
                <span className="text-zinc-500">{desc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* How to run */}
        <section>
          <h2 className="mb-3 text-lg font-semibold text-zinc-900">How to run</h2>
          <div className="space-y-4">
            {[
              { label: "1. Install dependencies", code: "npm install" },
              { label: "2. Start dev server", code: "npm run dev" },
              { label: "3. Build for production", code: "npm run build && npm start" },
            ].map(({ label, code }) => (
              <div key={label}>
                <p className="mb-1.5 text-xs font-medium text-zinc-500">{label}</p>
                <pre className="rounded-lg bg-zinc-900 px-4 py-3 text-sm text-zinc-100 font-mono">
                  {code}
                </pre>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-zinc-500">
            Requires Node.js 18.17+. The dev server runs at{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs font-mono text-zinc-700">
              http://localhost:3000
            </code>
            .
          </p>
        </section>

        {/* Project structure */}
        <section>
          <h2 className="mb-3 text-lg font-semibold text-zinc-900">
            Project structure
          </h2>
          <pre className="overflow-x-auto rounded-lg border border-zinc-100 bg-zinc-50 px-4 py-4 font-mono text-sm leading-7 text-zinc-700">
{`week0build/
├── app/
│   ├── layout.tsx        # Root layout — Navbar + Footer
│   ├── page.tsx          # Homepage (/)
│   ├── globals.css       # Tailwind directives
│   ├── week1/
│   │   └── page.tsx      # /week1 — Coming Soon
│   ├── week2/
│   │   └── page.tsx      # /week2 — Coming Soon
│   ├── week3/
│   │   └── page.tsx      # /week3 — Coming Soon
│   └── docs/
│       └── page.tsx      # /docs — Documentation
└── components/
    ├── Navbar.tsx         # Sticky nav with all route links
    └── Footer.tsx`}
          </pre>
        </section>
      </div>
    </div>
  );
}
