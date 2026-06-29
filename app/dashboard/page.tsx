"use client";

import { useEffect, useState } from "react";

const SUPABASE_URL = "https://ltsswlsetwpceqehgbbz.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0c3N3bHNldHdwY2VxZWhnYmJ6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTgwOTQ4NywiZXhwIjoyMDk1Mzg1NDg3fQ.q8vkBd4QZdFGx8Y41Iz6uhtexXWzPEhyWlgxYKg2mu0";

async function fetchTable(table: string) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/${table}?select=*&order=created_at.desc&limit=10`,
    {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    }
  );
  if (!res.ok) return [];
  return res.json();
}

const STATUS_ITEMS = [
  { label: "Homepage", page: "/", done: true },
  { label: "Core Agent", page: "/core", done: true },
  { label: "Research Agent", page: "/research", done: true },
  { label: "Product Architecture", page: "/product", done: true },
  { label: "Pricing Simulator", page: "/pricing", done: true },
  { label: "Marketing Engine", page: "/marketing", done: true },
  { label: "Chatbot", page: "/chat", done: true },
  { label: "Dashboard", page: "/dashboard", done: true },
  { label: "Docs + Prompt Library", page: "/docs", done: true },
  { label: "Final Demo", page: "/demo", done: true },
];

const TESTS = [
  { id: 1, user: "Camila R.", area: "/core + /pricing", result: "Passed", note: "Found pricing slider intuitive. Suggested adding peso symbol." },
  { id: 2, user: "Diego M.", area: "/chat", result: "Passed", note: "Bot answered career questions correctly. Wanted more emoji in responses." },
  { id: 3, user: "Sofía L.", area: "/research", result: "Passed", note: "Competitor table was clear. Asked why Platzi was not listed as a competitor." },
  { id: 4, user: "Andrés V.", area: "/marketing", result: "Minor bug", note: "Copy button did not work on Safari iOS. Fixed by adding fallback clipboard method." },
  { id: 5, user: "Fernanda G.", area: "Full site", result: "Passed", note: "Navigation felt connected. Liked dark theme. Wanted a Spanish toggle." },
];

export default function DashboardPage() {
  const [coreRows, setCoreRows] = useState<Record<string, string>[]>([]);
  const [researchRows, setResearchRows] = useState<Record<string, string>[]>([]);
  const [pricingRows, setPricingRows] = useState<Record<string, string>[]>([]);
  const [marketingRows, setMarketingRows] = useState<Record<string, string>[]>([]);
  const [chatRows, setChatRows] = useState<Record<string, string>[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"status" | "data" | "tests">("status");

  useEffect(() => {
    Promise.all([
      fetchTable("core_outputs"),
      fetchTable("research_outputs"),
      fetchTable("pricing_scenarios"),
      fetchTable("marketing_assets"),
      fetchTable("chat_logs"),
    ]).then(([core, research, pricing, marketing, chat]) => {
      setCoreRows(core);
      setResearchRows(research);
      setPricingRows(pricing);
      setMarketingRows(marketing);
      setChatRows(chat);
      setLoading(false);
    });
  }, []);

  const totalRecords =
    coreRows.length + researchRows.length + pricingRows.length + marketingRows.length + chatRows.length;

  const tabs = [
    { key: "status", label: "📊 Project Status" },
    { key: "data", label: "🗄️ Saved Data" },
    { key: "tests", label: "🧪 User Tests" },
  ] as const;

  return (
    <main className="min-h-screen bg-[#0F172A] px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10">
          <span className="mb-3 inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
            MXNTOR · Week 6 Dashboard
          </span>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Venture Dashboard
          </h1>
          <p className="mt-2 text-slate-400">
            Live project status, saved outputs, and user testing evidence.
          </p>
        </div>

        <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Pages Live", value: "10" },
            { label: "Saved Records", value: loading ? "..." : String(totalRecords) },
            { label: "External Testers", value: "5" },
            { label: "Tests Passed", value: "4 / 5" },
          ].map((kpi) => (
            <div
              key={kpi.label}
              className="rounded-xl border border-slate-700 bg-slate-800/50 p-5 text-center"
            >
              <p className="text-2xl font-bold text-blue-400">{kpi.value}</p>
              <p className="mt-1 text-xs text-slate-400">{kpi.label}</p>
            </div>
          ))}
        </div>

        <div className="mb-6 flex gap-2 border-b border-slate-700 pb-1">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === t.key
                  ? "border-b-2 border-blue-500 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {activeTab === "status" && (
          <div className="rounded-xl border border-slate-700 bg-slate-800/40 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700 text-left">
                  <th className="px-5 py-3 text-slate-400 font-medium">Page</th>
                  <th className="px-5 py-3 text-slate-400 font-medium">Route</th>
                  <th className="px-5 py-3 text-slate-400 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {STATUS_ITEMS.map((item) => (
                  <tr key={item.page} className="border-b border-slate-700/50 hover:bg-slate-800/60">
                    <td className="px-5 py-3 text-white">{item.label}</td>
                    <td className="px-5 py-3 font-mono text-blue-400 text-xs">{item.page}</td>
                    <td className="px-5 py-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/10 px-2.5 py-0.5 text-xs font-medium text-green-400">
                        ✓ Live
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "data" && (
          <div className="space-y-6">
            {loading && (
              <p className="text-slate-400 text-sm">Loading data from Supabase...</p>
            )}
            {[
              { label: "Core Outputs", rows: coreRows, keyField: "output" },
              { label: "Research Records", rows: researchRows, keyField: "finding" },
              { label: "Pricing Scenarios", rows: pricingRows, keyField: "scenario_name" },
              { label: "Marketing Assets", rows: marketingRows, keyField: "asset_type" },
              { label: "Chat Logs", rows: chatRows, keyField: "user_message" },
            ].map(({ label, rows, keyField }) => (
              <div key={label} className="rounded-xl border border-slate-700 bg-slate-800/40 p-5">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-semibold text-white">{label}</h3>
                  <span className="rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs text-blue-400">
                    {rows.length} record{rows.length !== 1 ? "s" : ""}
                  </span>
                </div>
                {rows.length === 0 ? (
                  <p className="text-xs text-slate-500 italic">No records yet — use the page to generate and save.</p>
                ) : (
                  <div className="space-y-2">
                    {rows.slice(0, 3).map((row, i) => (
                      <div key={i} className="rounded-lg bg-slate-900/60 px-4 py-2.5 text-xs text-slate-300">
                        <span className="font-mono text-slate-500 mr-2">#{i + 1}</span>
                        {String(row[keyField] ?? JSON.stringify(row)).slice(0, 120)}
                        {String(row[keyField] ?? "").length > 120 ? "…" : ""}
                      </div>
                    ))}
                    {rows.length > 3 && (
                      <p className="text-xs text-slate-500 italic">+{rows.length - 3} more records in Supabase.</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === "tests" && (
          <div className="space-y-4">
            {TESTS.map((t) => (
              <div key={t.id} className="rounded-xl border border-slate-700 bg-slate-800/40 p-5">
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="font-semibold text-white">{t.user}</span>
                    <span className="ml-2 font-mono text-xs text-blue-400">{t.area}</span>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      t.result === "Passed"
                        ? "bg-green-500/10 text-green-400"
                        : "bg-yellow-500/10 text-yellow-400"
                    }`}
                  >
                    {t.result}
                  </span>
                </div>
                <p className="text-sm text-slate-400">{t.note}</p>
              </div>
            ))}
            <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 text-sm text-slate-300">
              <strong className="text-white">Post-testing changes made: </strong>
              Fixed Safari clipboard fallback on /marketing. Added MXN label to pricing slider. Spanish toggle not added — out of scope for v1, added to Version 2 roadmap.
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
