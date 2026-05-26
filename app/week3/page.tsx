import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Week 3 — Week 0 Build" };

export default function Week3Page() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col items-center justify-center px-4 py-40 text-center sm:px-6">
      <span className="mb-4 inline-block rounded-full border border-zinc-200 px-3 py-1 text-xs font-medium text-zinc-500">
        Week 3
      </span>
      <h1 className="mb-3 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
        Coming Soon
      </h1>
      <p className="mb-8 max-w-sm text-zinc-500">
        Week 3 content is in progress. Check back soon.
      </p>
      <Link
        href="/"
        className="rounded-lg border border-zinc-200 px-5 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
      >
        ← Back to home
      </Link>
    </div>
  );
}
