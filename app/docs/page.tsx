import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Docs — Week 0 Build",
};

export default function DocsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="mb-2 text-3xl font-bold tracking-tight text-zinc-900">
        Documentation
      </h1>
      <p className="mb-12 text-zinc-500">
        Everything you need to get Week 0 Build running.
      </p>

      <div className="space-y-12">
        {/* What is it */}
        <section>
          <h2 className="mb-3 text-lg font-semibold text-zinc-900">What is this?</h2>
          <p className="text-sm leading-relaxed text-zinc-600">
            Week 0 Build is a minimal Next.js 14 starter project. It provides a
            clean homepage, a docs page, a shared navbar and footer, and nothing
            else — no bloat, no opinions beyond the basics.
          </p>
        </section>

        {/* Tech stack */}
        <section>
          <h2 className="mb-3 text-lg font-semibold text-zinc-900">Tech stack</h2>
          <div className="overflow-hidden rounded-lg border border-zinc-100">
            {[
              ["Next.js 14", "App Router, server components, file-based routing"],
              ["Tailwind CSS", "Utility-first CSS, configured via tailwind.config.ts"],
              ["TypeScript", "Static typing across all components and pages"],
              ["ESLint", "Linting via eslint-config-next"],
            ].map(([name, desc], i, arr) => (
              <div
                key={name}
                className={`flex gap-4 px-4 py-3 text-sm ${
                  i < arr.length - 1 ? "border-b border-zinc-100" : ""
                }`}
              >
                <span className="w-32 shrink-0 font-medium text-zinc-900">{name}</span>
                <span className="text-zinc-500">{desc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Running the project */}
        <section>
          <h2 className="mb-3 text-lg font-semibold text-zinc-900">
            How to run
          </h2>
          <div className="space-y-4">
            {[
              { label: "Install dependencies", code: "npm install" },
              { label: "Start dev server", code: "npm run dev" },
              { label: "Build for production", code: "npm run build && npm start" },
            ].map(({ label, code }) => (
              <div key={label}>
                <p className="mb-1.5 text-xs font-medium text-zinc-500">{label}</p>
                <pre className="rounded-lg bg-zinc-900 px-4 py-3 text-sm text-zinc-100 font-mono">
                  {code}
                </pre>
              </div>
            ))}
          </div>
        </section>

        {/* Structure */}
        <section>
          <h2 className="mb-3 text-lg font-semibold text-zinc-900">
            Project structure
          </h2>
          <pre className="rounded-lg bg-zinc-50 border border-zinc-100 px-4 py-4 text-sm text-zinc-700 font-mono leading-7 overflow-x-auto">
{`week0build/
├── app/
│   ├── layout.tsx       # Root layout (Navbar + Footer)
│   ├── page.tsx         # Homepage (/)
│   ├── globals.css      # Tailwind directives
│   └── docs/
│       └── page.tsx     # Docs page (/docs)
└── components/
    ├── Navbar.tsx
    └── Footer.tsx`}
          </pre>
        </section>
      </div>
    </div>
  );
}
