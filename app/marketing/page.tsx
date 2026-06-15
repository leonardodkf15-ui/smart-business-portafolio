"use client";

import { useState } from "react";

/* ─── Types ──────────────────────────────────────────────────────────────── */

interface CampaignForm {
  productName: string;
  targetUser: string;
  problem: string;
  valueProp: string;
  tone: string;
  cta: string;
  channel: string;
  objective: string;
}

/* ─── Static data ─────────────────────────────────────────────────────────── */

const brandColors = [
  { name: "Navy", hex: "#0F172A", role: "Background" },
  { name: "Blue", hex: "#3B82F6", role: "Accent / CTA" },
  { name: "White", hex: "#FFFFFF", role: "Text / UI" },
];

const socialPosts = [
  {
    platform: "Instagram",
    topic: "Problem Awareness",
    text: "¿Llevas meses intentando aprender programación solo y sigues sin saber por dónde empezar? No es tu culpa. Nadie te enseñó el camino. MXNTOR sí lo hace. 🇲🇽",
    hashtags: "#AprendeCodigo #TechMexico #MXNTOR #DesarrolloWeb",
  },
  {
    platform: "Twitter",
    topic: "Problem Awareness",
    text: "El problema no es la falta de talento. Es la falta de acceso. 30 millones de jóvenes mexicanos quieren entrar a tech. La mayoría nunca lo logra porque no tienen mentor. MXNTOR cambia eso.",
    hashtags: "#TechLatam #MentorIA #MXNTOR",
  },
  {
    platform: "LinkedIn",
    topic: "Product Feature",
    text: "MXNTOR es el primer mentor de IA diseñado específicamente para el mercado laboral tech de México. En español. Sin costo para empezar. Con roadmaps personalizados basados en lo que los empleadores mexicanos realmente buscan.",
    hashtags: "#ProductoDigital #TechMexico #InteligenciaArtificial #Empleo",
  },
  {
    platform: "Instagram",
    topic: "Product Feature",
    text: "Con MXNTOR puedes: ✅ Preguntarle lo que sea, cuando sea ✅ Recibir respuestas en español ✅ Conocer qué skills piden las empresas en México ✅ Seguir un plan de aprendizaje personalizado. Todo gratis para empezar. 🚀",
    hashtags: "#IAenEspañol #AprendeTech #MXNTOR",
  },
  {
    platform: "Twitter",
    topic: "Testimonial",
    text: "\"Llevaba meses perdido. MXNTOR me dio un camino claro en minutos.\" — Diego, 22 años, CDMX. Así se siente tener un mentor de verdad. 💙",
    hashtags: "#Testimonial #MXNTOR #TechMexico",
  },
  {
    platform: "Instagram",
    topic: "Testimonial",
    text: "Valeria de Guadalajara llevaba 6 meses tratando de aprender sola. Ahora tiene su primer proyecto completo y una entrevista técnica agendada. Así funciona tener el mentor correcto. 🇲🇽💙",
    hashtags: "#HistoriaReal #MXNTOR #ProgramadoresMexicanos",
  },
  {
    platform: "LinkedIn",
    topic: "Motivation",
    text: "El talento en México no escasea. Lo que escasea es el acceso. Cada joven mexicano que aprende a programar con el apoyo correcto es un futuro ingeniero, fundador, o líder tech. MXNTOR es ese apoyo.",
    hashtags: "#TalentoMexicano #FuturoDigital #MXNTOR #Inclusión",
  },
  {
    platform: "Twitter",
    topic: "Motivation",
    text: "No necesitas hablar inglés para aprender a programar. No necesitas pagar miles de pesos en bootcamps. Solo necesitas dirección. MXNTOR te la da.",
    hashtags: "#AprendeGratis #TechParaTodos #MXNTOR",
  },
  {
    platform: "Instagram",
    topic: "Call to Action",
    text: "¿Listo para empezar? Únete a MXNTOR hoy — tu mentor de IA, en español, para el mercado tech de México. Gratis para comenzar. Sin excusas. 👇",
    hashtags: "#EmpiezaHoy #MXNTOR #DesarrolloWeb #TechMexico",
  },
  {
    platform: "LinkedIn",
    topic: "Call to Action",
    text: "Si conoces a alguien que quiere entrar a tech en México pero no sabe por dónde empezar — comparte MXNTOR con ellos. El mentor que México necesita ya existe.",
    hashtags: "#MXNTOR #Compartir #TechLatam #MentorIA",
  },
];

const videoScripts = [
  {
    label: "Script 1",
    format: "30-second Instagram Reel",
    duration: "30 seg",
    platform: "Instagram",
    icon: "📱",
    script: `[0–3s] HOOK (texto en pantalla + voz en off)
"¿Por qué es tan difícil aprender tech en México?"

[3–10s] PROBLEMA
Corte rápido: joven frente a laptop confundido. Voz en off:
"Millones de jóvenes mexicanos quieren aprender a programar. Pero no saben por dónde empezar. Los recursos están en inglés. Los mentores son caros. Y nadie tiene tiempo para ellos."

[10–22s] SOLUCIÓN
Animación del chat de MXNTOR. Voz en off:
"MXNTOR es un mentor de IA que responde tus preguntas, te da un roadmap personalizado y te orienta al mercado laboral de México. En español. Sin costo."

[22–28s] PRUEBA SOCIAL
"Miles de jóvenes mexicanos ya están aprendiendo con MXNTOR."

[28–30s] CTA
Texto en pantalla: "Empieza gratis hoy. Link en bio → MXNTOR"`,
  },
  {
    label: "Script 2",
    format: "60-second YouTube Ad",
    duration: "60 seg",
    platform: "YouTube",
    icon: "▶️",
    script: `[0–5s] HOOK
Imagen: joven mexicano mirando pantalla con frustración.
"Quiero aprender a programar. Pero no sé por dónde empezar."

[5–20s] PROBLEMA
Voz en off sobre clips de jóvenes estudiando solos:
"En México hay más de 30 millones de jóvenes que quieren entrar a la industria tech. La mayoría no lo logra. No porque les falte talento. Sino porque no tienen acceso. Los cursos están en inglés. Los mentores cuestan miles de pesos. Y las universidades de élite no son para todos."

[20–40s] SOLUCIÓN — DEMO
Pantalla con MXNTOR en acción. Voz en off:
"MXNTOR es el primer mentor de inteligencia artificial diseñado específicamente para jóvenes mexicanos. Puedes preguntarle absolutamente cualquier cosa sobre tecnología. Te responde en español. Te da un plan de aprendizaje personalizado. Y te orienta hacia las habilidades que realmente piden las empresas en México."

[40–52s] TESTIMONIAL
Joven en cámara: "Antes gastaba horas buscando tutoriales que no entendía. Con MXNTOR fue diferente. Me dijo exactamente qué aprender y en qué orden."

[52–58s] MISIÓN
"Enterprise funds the free tier. Porque creemos que el talento mexicano no debería depender de dónde naciste."

[58–60s] CTA
"Empieza gratis en mxntor.com — El mentor que México necesita."`,
  },
  {
    label: "Script 3",
    format: "15-second TikTok",
    duration: "15 seg",
    platform: "TikTok",
    icon: "🎵",
    script: `[0–3s] HOOK BRUTAL
Texto on screen: "¿Por qué aprender tech en México es tan difícil?"

[3–10s] GIRO RÁPIDO
"Todo está en inglés. Los cursos cuestan miles. Y los mentores... ni de broma."
Corte: pantalla de MXNTOR.
"Hasta ahora."

[10–13s] BENEFICIO CLAVE
"MXNTOR: tu mentor de IA, en español, para el mercado tech de México. Gratis."

[13–15s] CTA
Texto animado: "Link en bio. Empieza hoy. 🇲🇽"`,
  },
];

const calendarDays = [
  { day: 1, date: "Lun 16 Jun", platform: "Instagram", type: "Reel", topic: "Hook del problema", preview: "¿Por qué es tan difícil aprender tech en México? 🇲🇽" },
  { day: 2, date: "Mar 17 Jun", platform: "Twitter", type: "Hilo", topic: "Estadísticas de acceso a tech en México", preview: "30M jóvenes mexicanos quieren entrar a tech. Solo el 3% lo logra. Hilo 🧵" },
  { day: 3, date: "Mié 18 Jun", platform: "LinkedIn", type: "Artículo", topic: "Por qué lanzamos MXNTOR", preview: "El talento en México no escasea. Lo que escasea es el acceso." },
  { day: 4, date: "Jue 19 Jun", platform: "Instagram", type: "Carrusel", topic: "Demo de producto", preview: "Así se ve tener un mentor de IA en tu bolsillo 📱" },
  { day: 5, date: "Vie 20 Jun", platform: "TikTok", type: "Video corto", topic: "Hook viral de 15 seg", preview: "POV: Finalmente tienes un mentor que te habla en español 🤯" },
  { day: 6, date: "Sáb 21 Jun", platform: "Instagram", type: "Story", topic: "Poll / encuesta", preview: "¿Cuál es tu mayor obstáculo para aprender tech? 🔽" },
  { day: 7, date: "Dom 22 Jun", platform: "Twitter", type: "Tweet", topic: "Motivacional", preview: "No necesitas inglés para aprender a programar. Solo dirección." },
  { day: 8, date: "Lun 23 Jun", platform: "Instagram", type: "Testimonial", topic: "Historia de Diego", preview: "\"MXNTOR me dio un camino claro en minutos.\" — Diego, 22, CDMX" },
  { day: 9, date: "Mar 24 Jun", platform: "LinkedIn", type: "Post", topic: "Feature spotlight: español", preview: "Por primera vez, un mentor de IA que piensa en México." },
  { day: 10, date: "Mié 25 Jun", platform: "YouTube", type: "Ad 60 seg", topic: "Video ad completo", preview: "Lanzamiento del anuncio de YouTube — historia completa de MXNTOR." },
  { day: 11, date: "Jue 26 Jun", platform: "Instagram", type: "Reel", topic: "Feature: roadmap personalizado", preview: "¿Sabes cuál es el siguiente skill que necesitas aprender? MXNTOR sí. 🎯" },
  { day: 12, date: "Vie 27 Jun", platform: "Twitter", type: "Hilo", topic: "Comparativa: aprender solo vs con MXNTOR", preview: "Aprender tech solo en México vs con MXNTOR. El hilo 🧵" },
  { day: 13, date: "Sáb 28 Jun", platform: "Instagram", type: "Carrusel", topic: "Testimoniales múltiples", preview: "3 jóvenes mexicanos. 3 historias. 1 mentor. 💙" },
  { day: 14, date: "Dom 29 Jun", platform: "Todos", type: "CTA final", topic: "Cierre de campaña", preview: "El mentor que México necesita ya existe. Empieza hoy — gratis. 🇲🇽" },
];

const imagePrompts = [
  {
    number: "01",
    title: "Hero Visual",
    prompt: "Young Mexican man, 22 years old, sitting at a desk with a laptop, warm ambient lighting, small apartment in Mexico City, looking confident and focused at the screen showing a chat interface, photorealistic, cinematic, navy blue color grading, 16:9",
  },
  {
    number: "02",
    title: "Problem Moment",
    prompt: "Young Mexican woman looking frustrated at a laptop screen full of English text, dimly lit room, feeling overwhelmed and lost, photorealistic, desaturated color palette, emotional storytelling photography, 16:9",
  },
  {
    number: "03",
    title: "Solution / AI Chat",
    prompt: "Smartphone screen showing a clean AI chat interface in Spanish with blue accent colors on dark navy background, hand holding phone, blurred Mexico City background at night, product photography, 9:16 vertical",
  },
  {
    number: "04",
    title: "Celebration / Success",
    prompt: "Young Mexican developer celebrating, fist pump, laptop showing code on screen, small home office setup, vibrant and warm lighting, authentic documentary photography, 16:9",
  },
  {
    number: "05",
    title: "Brand Pattern",
    prompt: "Abstract geometric background with interconnected nodes and circuit patterns, navy blue #0F172A base, electric blue #3B82F6 accent lines, subtle Mexican geometric motifs, dark tech aesthetic, suitable for digital backgrounds, 16:9",
  },
  {
    number: "06",
    title: "Community / Diversity",
    prompt: "Group of diverse young Mexicans (18-25) working on laptops together in a co-working space in Mexico City, collaborative atmosphere, authentic documentary style, warm natural light, cinematic color grading, 16:9",
  },
  {
    number: "07",
    title: "Mentor Metaphor",
    prompt: "Stylized illustration of a glowing AI entity represented as a wise guide standing beside a young Mexican person pointing toward a path made of code and light, dark blue and electric blue color palette, modern flat illustration, 1:1 square",
  },
  {
    number: "08",
    title: "Mexico Flag Accent",
    prompt: "Abstract Mexican flag colors integrated into a modern tech aesthetic — green, white, red as subtle data visualization streams and particles on a dark navy background, motion graphic still, cinematic, 16:9",
  },
];

/* ─── Sub-components ──────────────────────────────────────────────────────── */

function SectionBadge({ color, label }: { color: string; label: string }) {
  return (
    <span className={`inline-block rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-widest ${color}`}>
      {label}
    </span>
  );
}

function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={copy}
      className="rounded-lg border border-slate-600 px-3 py-1.5 text-xs font-medium text-slate-400 transition hover:border-blue-500 hover:text-white"
    >
      {copied ? "✓ Copied" : label}
    </button>
  );
}

const platformColors: Record<string, string> = {
  Instagram: "bg-pink-500/20 text-pink-400 border-pink-500/30",
  Twitter: "bg-sky-500/20 text-sky-400 border-sky-500/30",
  LinkedIn: "bg-blue-600/20 text-blue-400 border-blue-600/30",
  TikTok: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  YouTube: "bg-red-500/20 text-red-400 border-red-500/30",
  Todos: "bg-slate-500/20 text-slate-300 border-slate-500/30",
};

/* ─── Main Page ───────────────────────────────────────────────────────────── */

export default function MarketingPage() {
  const [form, setForm] = useState<CampaignForm>({
    productName: "MXNTOR",
    targetUser: "Jóvenes mexicanos de 18-28 años que quieren aprender tech",
    problem: "Sin mentor, sin dirección, recursos en inglés y demasiado caros",
    valueProp: "Mentor de IA en español, gratis para empezar, enfocado en el mercado laboral de México",
    tone: "Profesional y motivador",
    cta: "Empieza gratis hoy",
    channel: "Instagram, TikTok, LinkedIn",
    objective: "Generar conciencia y primeros usuarios",
  });
  const [generated, setGenerated] = useState(false);
  const [abWinner, setAbWinner] = useState<"A" | "B" | null>(null);
  const [abNotes, setAbNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setGenerated(true);
  };

  const handleSaveAll = async () => {
    setSaving(true);
    setSaveMsg("");
    try {
      const res = await fetch("/api/save-marketing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          campaign_name: form.productName,
          assets: {
            form,
            socialPosts,
            videoScripts,
            calendar: calendarDays,
            imagePrompts,
            abTest: { winner: abWinner, notes: abNotes },
          },
        }),
      });
      if (res.ok) {
        setSaveMsg("✓ Assets saved to Supabase.");
      } else {
        setSaveMsg("Save failed. Check your API route.");
      }
    } catch {
      setSaveMsg("Save failed. Check your API route.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">

        {/* Page header */}
        <div className="mb-16 max-w-3xl">
          <SectionBadge color="border-blue-500/30 bg-blue-500/10 text-blue-400" label="MXNTOR — Marketing Hub" />
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Campaign Generator
          </h1>
          <p className="mt-4 text-lg text-slate-400">
            Generate a complete go-to-market campaign for MXNTOR — social posts,
            video scripts, content calendar, visual prompts, and more.
          </p>
        </div>

        {/* ── Section 01: Campaign Form ── */}
        <section className="mb-20">
          <div className="mb-8">
            <SectionBadge color="border-blue-500/30 bg-blue-500/10 text-blue-400" label="Section 01" />
            <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">Campaign Input</h2>
            <p className="mt-2 text-sm text-slate-400">Fill in your campaign details, then click Generate.</p>
          </div>

          <form onSubmit={handleGenerate} className="rounded-2xl border border-slate-700/60 bg-[#1E293B] p-8">
            <div className="grid gap-6 sm:grid-cols-2">
              {(
                [
                  { key: "productName", label: "Product Name" },
                  { key: "targetUser", label: "Target User" },
                  { key: "problem", label: "Problem to Solve" },
                  { key: "valueProp", label: "Value Proposition" },
                  { key: "tone", label: "Tone of Voice" },
                  { key: "cta", label: "Call to Action" },
                  { key: "channel", label: "Marketing Channel" },
                  { key: "objective", label: "Campaign Objective" },
                ] as { key: keyof CampaignForm; label: string }[]
              ).map(({ key, label }) => (
                <div key={key}>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-slate-400">
                    {label}
                  </label>
                  <input
                    type="text"
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="w-full rounded-xl border border-slate-600 bg-[#0F172A] px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-blue-500 transition"
                  />
                </div>
              ))}
            </div>
            <div className="mt-8">
              <button
                type="submit"
                className="rounded-xl bg-blue-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-500 active:scale-95"
              >
                {generated ? "✓ Campaign Generated — Regenerate" : "Generate Campaign →"}
              </button>
            </div>
          </form>
        </section>

        {/* Everything below only shows after generate */}
        {generated && (
          <>
            {/* ── Section 02: Brand System ── */}
            <section className="mb-20">
              <div className="mb-8">
                <SectionBadge color="border-purple-500/30 bg-purple-500/10 text-purple-400" label="Section 02" />
                <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">Brand System</h2>
              </div>

              <div className="rounded-2xl border border-slate-700/60 bg-[#1E293B] p-8">
                <div className="grid gap-8 sm:grid-cols-2">
                  <div className="space-y-5">
                    {[
                      { label: "Brand Name", value: "MXNTOR" },
                      { label: "Tagline", value: "The Mentor That Mexico Needs" },
                      { label: "Value Promise", value: "Every young Mexican deserves a knowledgeable, patient, always-available mentor that guides their tech learning journey" },
                      { label: "Tone of Voice", value: "Professional and encouraging" },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-blue-400">{label}</p>
                        <p className="mt-1 text-sm text-slate-200">{value}</p>
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-blue-400">Brand Colors</p>
                    <div className="space-y-3">
                      {brandColors.map((c) => (
                        <div key={c.name} className="flex items-center gap-3">
                          <div
                            className="h-10 w-10 rounded-lg border border-slate-600 flex-shrink-0"
                            style={{ backgroundColor: c.hex }}
                          />
                          <div>
                            <p className="text-sm font-semibold text-white">{c.name} <span className="font-mono text-blue-400">{c.hex}</span></p>
                            <p className="text-xs text-slate-500">{c.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ── Section 03: Target Persona ── */}
            <section className="mb-20">
              <div className="mb-8">
                <SectionBadge color="border-green-500/30 bg-green-500/10 text-green-400" label="Section 03" />
                <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">Target Persona</h2>
              </div>

              <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-b from-blue-600/10 to-[#1E293B] p-8">
                <div className="flex items-start gap-5">
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
                    D
                  </div>
                  <div className="flex-1 grid gap-6 sm:grid-cols-2">
                    <div className="space-y-4">
                      {[
                        { label: "Name", value: "Diego" },
                        { label: "Age", value: "22 años" },
                        { label: "Location", value: "Ciudad de México" },
                        { label: "Goal", value: "Aprender desarrollo web para conseguir su primer trabajo tech" },
                      ].map(({ label, value }) => (
                        <div key={label}>
                          <p className="text-[10px] font-semibold uppercase tracking-widest text-blue-400">{label}</p>
                          <p className="mt-0.5 text-sm text-slate-200">{value}</p>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-4">
                      {[
                        { label: "Pain", value: "Se siente perdido, no sabe qué aprender primero, no puede pagar un mentor real" },
                        { label: "Motivation", value: "Quiere salir del trabajo informal y construir una carrera real en tech" },
                        { label: "Channel", value: "Instagram, TikTok, YouTube" },
                        { label: "Language", value: "Español — prefiere contenido en su idioma" },
                      ].map(({ label, value }) => (
                        <div key={label}>
                          <p className="text-[10px] font-semibold uppercase tracking-widest text-blue-400">{label}</p>
                          <p className="mt-0.5 text-sm text-slate-200">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ── Section 04: Landing Page Copy ── */}
            <section className="mb-20">
              <div className="mb-8">
                <SectionBadge color="border-yellow-500/30 bg-yellow-500/10 text-yellow-400" label="Section 04" />
                <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">Landing Page Copy</h2>
              </div>

              <div className="rounded-2xl border border-slate-700/60 bg-[#1E293B] p-8 space-y-6">
                {[
                  {
                    label: "Headline",
                    value: "El Mentor que México Necesita",
                  },
                  {
                    label: "Subheadline",
                    value: "Un mentor de inteligencia artificial que guía a los jóvenes mexicanos en su aprendizaje tech — en español, gratis, personalizado al mercado laboral de México.",
                  },
                  {
                    label: "Body Copy",
                    value: "Más de 30 millones de jóvenes mexicanos quieren entrar a la industria tech. La mayoría no lo logra porque no tiene acceso a un mentor. Los cursos están en inglés. Los bootcamps son caros. Y nadie tiene tiempo para ellos.\n\nMXNTOR lo cambia. Con MXNTOR tienes un mentor de IA disponible 24/7, que responde en español, que conoce el mercado laboral mexicano, y que te da un roadmap personalizado para llegar a tu primer trabajo tech.\n\nEmpieza hoy. Sin costo.",
                  },
                  {
                    label: "CTA",
                    value: "Empieza gratis hoy →",
                  },
                ].map(({ label, value }) => (
                  <div key={label} className="rounded-xl border border-slate-700/40 bg-[#0F172A] p-5">
                    <div className="mb-2 flex items-center justify-between">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-blue-400">{label}</p>
                      <CopyButton text={value} />
                    </div>
                    <p className="text-sm leading-relaxed text-slate-200 whitespace-pre-line">{value}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Section 05: Social Posts ── */}
            <section className="mb-20">
              <div className="mb-8">
                <SectionBadge color="border-pink-500/30 bg-pink-500/10 text-pink-400" label="Section 05" />
                <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">Social Media Posts</h2>
                <p className="mt-2 text-sm text-slate-400">10 posts listos para publicar en distintas plataformas.</p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {socialPosts.map((post, i) => (
                  <div key={i} className="flex flex-col rounded-2xl border border-slate-700/60 bg-[#1E293B] p-5">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${platformColors[post.platform] ?? "bg-slate-700 text-slate-300"}`}>
                          {post.platform}
                        </span>
                        <span className="text-xs text-slate-500">{post.topic}</span>
                      </div>
                      <span className="text-xs font-mono text-slate-600">#{i + 1}</span>
                    </div>
                    <p className="flex-1 text-sm leading-relaxed text-slate-200">{post.text}</p>
                    <p className="mt-3 text-xs text-blue-400/80">{post.hashtags}</p>
                    <div className="mt-4">
                      <CopyButton text={`${post.text}\n\n${post.hashtags}`} label="Copy Post" />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Section 06: Video Scripts ── */}
            <section className="mb-20">
              <div className="mb-8">
                <SectionBadge color="border-red-500/30 bg-red-500/10 text-red-400" label="Section 06" />
                <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">Video Scripts</h2>
                <p className="mt-2 text-sm text-slate-400">3 scripts listos para producción.</p>
              </div>

              <div className="space-y-6">
                {videoScripts.map((s) => (
                  <div key={s.label} className="rounded-2xl border border-slate-700/60 bg-[#1E293B] overflow-hidden">
                    <div className="flex items-center justify-between border-b border-slate-700/60 px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{s.icon}</span>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-widest text-blue-400">{s.label}</p>
                          <h3 className="font-bold text-white">{s.format}</h3>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${platformColors[s.platform] ?? ""}`}>
                          {s.platform}
                        </span>
                        <span className="rounded-full border border-slate-600 bg-slate-800 px-2.5 py-0.5 text-xs text-slate-400">
                          {s.duration}
                        </span>
                        <CopyButton text={s.script} label="Copy Script" />
                      </div>
                    </div>
                    <div className="px-6 py-5">
                      <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-slate-300">{s.script}</pre>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Section 07: 14-Day Calendar ── */}
            <section className="mb-20">
              <div className="mb-8">
                <SectionBadge color="border-cyan-500/30 bg-cyan-500/10 text-cyan-400" label="Section 07" />
                <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">14-Day Campaign Calendar</h2>
                <p className="mt-2 text-sm text-slate-400">Plan diario de contenido para el lanzamiento de MXNTOR.</p>
              </div>

              <div className="rounded-2xl border border-slate-700/60 bg-[#1E293B] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-700/60">
                        {["Día", "Fecha", "Plataforma", "Tipo", "Tema", "Preview"].map((h) => (
                          <th key={h} className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {calendarDays.map((row, i) => (
                        <tr key={row.day} className={`border-b border-slate-700/30 ${i % 2 === 0 ? "bg-slate-800/20" : ""}`}>
                          <td className="px-4 py-3 font-mono text-xs text-blue-400">{String(row.day).padStart(2, "0")}</td>
                          <td className="px-4 py-3 text-xs text-slate-400 whitespace-nowrap">{row.date}</td>
                          <td className="px-4 py-3">
                            <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${platformColors[row.platform] ?? "bg-slate-700 text-slate-300"}`}>
                              {row.platform}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-xs text-slate-300 whitespace-nowrap">{row.type}</td>
                          <td className="px-4 py-3 text-xs text-slate-300">{row.topic}</td>
                          <td className="px-4 py-3 text-xs text-slate-400 max-w-xs">{row.preview}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* ── Section 08: Visual Prompt Pack ── */}
            <section className="mb-20">
              <div className="mb-8">
                <SectionBadge color="border-orange-500/30 bg-orange-500/10 text-orange-400" label="Section 08" />
                <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">Visual Prompt Pack</h2>
                <p className="mt-2 text-sm text-slate-400">8 prompts para generar imágenes de marketing con IA (Midjourney / DALL·E / Stable Diffusion).</p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {imagePrompts.map((p) => (
                  <div key={p.number} className="rounded-2xl border border-slate-700/60 bg-[#1E293B] p-5">
                    <div className="mb-3 flex items-center justify-between">
                      <div>
                        <span className="font-mono text-xs text-blue-400">#{p.number}</span>
                        <p className="font-semibold text-white">{p.title}</p>
                      </div>
                      <CopyButton text={p.prompt} label="Copy Prompt" />
                    </div>
                    <p className="text-sm leading-relaxed text-slate-400 italic">{p.prompt}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Section 09: A/B Headline Tester ── */}
            <section className="mb-20">
              <div className="mb-8">
                <SectionBadge color="border-violet-500/30 bg-violet-500/10 text-violet-400" label="Section 09" />
                <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">A/B Headline Tester</h2>
              </div>

              <div className="rounded-2xl border border-slate-700/60 bg-[#1E293B] p-8">
                <div className="grid gap-6 sm:grid-cols-2">
                  {(
                    [
                      {
                        version: "A" as const,
                        headline: "El Mentor que México Necesita",
                        cta: "Empieza gratis hoy →",
                        note: "Directo a la identidad nacional. Apela al orgullo y la pertenencia.",
                      },
                      {
                        version: "B" as const,
                        headline: "Tu primer trabajo tech empieza aquí",
                        cta: "Seize the Opportunity →",
                        note: "Orientado al resultado final. Apela a la ambición y el empleo.",
                      },
                    ] as const
                  ).map(({ version, headline, cta, note }) => (
                    <div
                      key={version}
                      onClick={() => setAbWinner(version)}
                      className={`cursor-pointer rounded-2xl border-2 p-6 transition ${
                        abWinner === version
                          ? "border-blue-500 bg-blue-600/10"
                          : "border-slate-700/60 bg-[#0F172A] hover:border-slate-600"
                      }`}
                    >
                      <div className="mb-4 flex items-center justify-between">
                        <span className={`rounded-full px-3 py-0.5 text-xs font-bold uppercase ${abWinner === version ? "bg-blue-500 text-white" : "bg-slate-700 text-slate-300"}`}>
                          Version {version}
                        </span>
                        {abWinner === version && (
                          <span className="text-xs font-semibold text-blue-400">✓ Selected Winner</span>
                        )}
                      </div>
                      <p className="text-xl font-bold text-white">{headline}</p>
                      <p className="mt-2 text-sm font-semibold text-blue-400">{cta}</p>
                      <p className="mt-3 text-xs text-slate-400">{note}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-slate-400">
                    Notes / Reasoning
                  </label>
                  <textarea
                    value={abNotes}
                    onChange={(e) => setAbNotes(e.target.value)}
                    placeholder="Why did you choose this headline? What data or insight supports it?"
                    rows={3}
                    className="w-full rounded-xl border border-slate-600 bg-[#0F172A] px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-blue-500 transition resize-none"
                  />
                </div>
              </div>
            </section>

            {/* ── Section 10: Save / Export ── */}
            <section className="mb-8">
              <div className="mb-8">
                <SectionBadge color="border-slate-400/30 bg-slate-400/10 text-slate-300" label="Section 10" />
                <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">Save &amp; Export</h2>
                <p className="mt-2 text-sm text-slate-400">
                  Copy individual assets or save everything to Supabase.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-700/60 bg-[#1E293B] p-8">
                <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    { label: "Social Posts (all 10)", text: socialPosts.map((p, i) => `[${i + 1}] ${p.platform} — ${p.topic}\n${p.text}\n${p.hashtags}`).join("\n\n---\n\n") },
                    { label: "Video Scripts (all 3)", text: videoScripts.map((s) => `${s.label} — ${s.format}\n\n${s.script}`).join("\n\n===\n\n") },
                    { label: "14-Day Calendar", text: calendarDays.map((d) => `Día ${d.day} | ${d.date} | ${d.platform} | ${d.type}\n${d.topic}\n${d.preview}`).join("\n\n") },
                    { label: "Image Prompts (all 8)", text: imagePrompts.map((p) => `#${p.number} ${p.title}\n${p.prompt}`).join("\n\n") },
                    { label: "Landing Page Copy", text: `Headline: El Mentor que México Necesita\n\nSubheadline: Un mentor de inteligencia artificial que guía a los jóvenes mexicanos en su aprendizaje tech — en español, gratis, personalizado al mercado laboral de México.\n\nCTA: Empieza gratis hoy →` },
                    { label: "A/B Test Results", text: `Winner: Version ${abWinner ?? "Not selected"}\nNotes: ${abNotes || "None"}` },
                  ].map(({ label, text }) => (
                    <div key={label} className="flex items-center justify-between rounded-xl border border-slate-700/40 bg-[#0F172A] px-4 py-3">
                      <p className="text-sm text-slate-300">{label}</p>
                      <CopyButton text={text} />
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={handleSaveAll}
                    disabled={saving}
                    className="rounded-xl bg-blue-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-500 active:scale-95 disabled:opacity-50"
                  >
                    {saving ? "Saving…" : "Save All Assets to Supabase →"}
                  </button>
                  {saveMsg && (
                    <p className={`text-sm font-medium ${saveMsg.startsWith("✓") ? "text-green-400" : "text-red-400"}`}>
                      {saveMsg}
                    </p>
                  )}
                </div>

                <p className="mt-3 text-xs text-slate-500">
                  Saves to Supabase table <code className="text-blue-400">marketing_assets</code> — columns: id uuid, campaign_name text, assets jsonb, created_at timestamptz.
                </p>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
