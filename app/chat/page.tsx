"use client";

import { useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Feedback = "up" | "down" | null;

interface FeedbackImprove {
  text: string;
  submitted: boolean;
}

interface Message {
  id: string;
  role: "assistant" | "user";
  text: string;
  feedback?: Feedback;
  feedbackImprove?: FeedbackImprove;
  feedbackThanks?: boolean;
}

// ─── Response templates ───────────────────────────────────────────────────────

const RESPONSES: { keywords: string[]; text: string }[] = [
  {
    keywords: ["empezar", "start", "inicio", "comenzar", "primero", "primer"],
    text: "Lo primero que recomiendo es aprender los fundamentos de programación con Python — es el lenguaje más amigable para principiantes y muy demandado en México. Empieza con el curso gratuito de Python en freeCodeCamp en español. Dedica 1 hora al día y en 3 meses tendrás una base sólida. ¡El primer paso es el más importante! 🚀",
  },
  {
    keywords: ["python"],
    text: "Python es una excelente elección para el mercado tech mexicano. Te recomiendo esta ruta: (1) Aprende los básicos en freeCodeCamp o CS50P, (2) Practica con proyectos pequeños en GitHub, (3) Aprende frameworks como FastAPI o Django. En 6 meses puedes estar aplicando a trabajos de Backend Junior en empresas como Clip, Konfío o Kueski. 💻",
  },
  {
    keywords: ["javascript", "js", "web", "frontend", "react", "html", "css"],
    text: "Desarrollo web es una de las rutas más rápidas al empleo en México. Domina HTML, CSS y JavaScript vanilla primero, luego React.js. Plataformas como The Odin Project (gratuita) y roadmap.sh te dan un camino claro. Con un portafolio de 3 proyectos reales puedes aplicar a trabajos junior en 6-9 meses. 🌐",
  },
  {
    keywords: ["ia", "ai", "inteligencia artificial", "machine learning", "ml", "datos", "data"],
    text: "IA y Data Science son los campos más emocionantes ahora mismo. Te recomiendo esta ruta: (1) Python sólido, (2) Estadística básica, (3) NumPy, Pandas, Matplotlib, (4) Machine Learning con scikit-learn. El canal de Dot CSV en YouTube (en español) es excelente. En México, empresas como BBVA, Walmart Tech y startups de fintech buscan perfiles de datos constantemente. 🤖",
  },
  {
    keywords: ["trabajo", "job", "empleo", "primer trabajo", "first job", "contratar", "contraten"],
    text: "Para conseguir tu primer trabajo tech en México: (1) Crea un perfil fuerte en LinkedIn, (2) Construye 3-5 proyectos en GitHub, (3) Aplica en LinkedIn, OCC Mundial, Computrabajo y Talentify, (4) Busca empresas como Wizeline, Encora, Nearsoft y EPAM que contratan juniors. El salario inicial en CDMX suele ser entre $15,000-$25,000 MXN/mes. 💼",
  },
  {
    keywords: ["portafolio", "portfolio", "github", "proyectos", "projects"],
    text: "Un buen portafolio para México debe tener: (1) Un README profesional en cada repositorio, (2) 3-5 proyectos completos con descripción del problema que resuelven, (3) Un proyecto que demuestre que puedes trabajar con APIs o bases de datos reales. Publica tus proyectos en Vercel o Railway para que sean visitables en vivo. Los reclutadores lo agradecen. ⭐",
  },
  {
    keywords: ["entrevista", "interview", "pregunta", "technical", "técnica"],
    text: "Para entrevistas técnicas en México: (1) Practica en LeetCode con los problemas de nivel Easy, (2) Estudia preguntas de comportamiento (el método STAR), (3) Repasa los fundamentos de tu stack, (4) Investiga la empresa antes. Muchas empresas mexicanas prefieren proyectos prácticos sobre algoritmos complejos. Practica con amigos haciendo mock interviews. 🎯",
  },
  {
    keywords: ["salario", "salary", "sueldo", "dinero", "money", "pago"],
    text: "Salarios tech en México (2024): Junior Developer (0-2 años): $15,000-$30,000 MXN/mes. Mid-Level (2-4 años): $30,000-$60,000 MXN/mes. Senior (4+ años): $60,000-$120,000 MXN/mes. Empresas con clientes en USD (como Wizeline o agencias remotas) suelen pagar más. El trabajo remoto para empresas extranjeras puede multiplicar tu salario por 2-3x. 💰",
  },
  {
    keywords: ["gratis", "free", "recursos", "resources", "curso", "aprender", "learn"],
    text: "Los mejores recursos gratuitos en español: (1) freeCodeCamp en español — desarrollo web completo, (2) CS50 en español — fundamentos de ciencias de la computación, (3) Dot CSV en YouTube — IA y Data Science, (4) MoureDev en YouTube — Python y apps móviles, (5) Roadmap.sh — rutas de aprendizaje visuales. Todo gratis, todo excelente. 📚",
  },
  {
    keywords: ["tiempo", "cuánto", "how long", "meses", "años", "rápido", "cuando"],
    text: "El tiempo realista para conseguir tu primer trabajo: Con 1-2 horas diarias de estudio constante, la mayoría de personas tarda 8-18 meses en llegar a un nivel empleable. La clave no es la velocidad, sino la consistencia. Construir proyectos reales acelera el proceso más que cualquier curso. ¡La constancia vence al talento! ⏱️",
  },
  {
    keywords: ["síndrome del impostor", "impostor", "no soy bueno", "no puedo", "difícil", "frustrado", "frustración", "rendirse"],
    text: "El síndrome del impostor es increíblemente común en tech — hasta los mejores programadores lo sienten. Lo que debes recordar: (1) Todos empezaron desde cero, (2) Sentirte confundido significa que estás aprendiendo, (3) Compárate con quien eras hace 3 meses, no con otros. Lo que sientes es normal. Sigue adelante. 💙",
  },
  {
    keywords: ["freelance", "freelancer", "independiente", "cliente", "negocio", "propio"],
    text: "Para hacer freelance tech en México: Plataformas recomendadas: Workana (la más grande en LATAM), Upwork, Fiverr. Para empezar: (1) Especialízate en una tecnología, (2) Crea un perfil con proyectos reales, (3) Cobra en dólares si puedes. Un desarrollador web junior puede cobrar entre $500-$1,500 USD por proyecto pequeño. 🖥️",
  },
  {
    keywords: ["certificación", "certificado", "certificate", "cert", "aws", "google", "microsoft"],
    text: "Las certificaciones que realmente importan en México: (1) AWS Cloud Practitioner o Solutions Architect — muy valorada, (2) Google Associate Cloud Engineer, (3) Microsoft AZ-900 para Azure. Para web: Meta Front-End Developer Certificate (Coursera). Para Data: IBM Data Science Certificate. Evita certificaciones de plataformas poco reconocidas. Las de las Big Tech valen más. 🏆",
  },
  {
    keywords: ["cambio de carrera", "cambiar", "career change", "diferente", "vengo de", "antes trabajaba"],
    text: "Cambiar de carrera a tech en México es completamente posible y cada vez más común. Tu experiencia previa es un activo, no un obstáculo. Alguien con experiencia en finanzas que aprende a programar tiene ventaja en fintech; alguien de salud puede trabajar en healthtech. Elige un stack, crea proyectos relevantes a tu industria anterior, y eso será tu diferenciador. 🔄",
  },
  {
    keywords: ["motivación", "motivation", "ánimo", "descanso", "cansado", "burnout"],
    text: "Aprender tech es un maratón, no un sprint. Algunos tips para mantener la motivación: (1) Celebra cada pequeña victoria, (2) Únete a comunidades como Discord de developers mexicanos, (3) Encuentra a alguien más aprendiendo para acompañarse, (4) Descansa cuando lo necesites — el burnout retrasa más que un día libre. ¡Vas muy bien! 🌟",
  },
];

const GUARDRAIL_KEYWORDS = {
  medical: ["médico", "doctor", "enfermedad", "síntoma", "medicamento", "diagnóstico", "salud mental", "terapia", "psicólogo"],
  legal: ["abogado", "legal", "ley", "demanda", "contrato", "derechos", "juicio", "crimen", "delito"],
  financial: ["inversión", "invertir", "cripto", "acciones", "bolsa", "préstamo", "deuda", "impuesto"],
  harmful: ["hack", "piratear", "robar", "atacar", "ddos", "malware", "virus", "phishing", "exploit"],
  competitors: ["platzi", "coursera", "udemy", "edx", "codecademy", "otro mentor", "otra plataforma", "mejor que"],
};

const HUMAN_CHECKPOINT_KEYWORDS = ["no sé qué hacer", "estoy perdido", "ayuda", "confused", "lost", "overwhelmed", "deprimido", "depresión", "no entiendo nada", "me rindo"];

const VAGUE_KEYWORDS = ["hola", "hi", "buenas", "qué haces", "cuéntame", "qué es esto"];

function getMXNTORResponse(text: string, userName: string, userGoal: string, userExperience: string): string {
  const lower = text.toLowerCase();

  // Guardrails
  if (GUARDRAIL_KEYWORDS.medical.some(k => lower.includes(k)) ||
      GUARDRAIL_KEYWORDS.legal.some(k => lower.includes(k)) ||
      GUARDRAIL_KEYWORDS.financial.some(k => lower.includes(k))) {
    return "Eso está fuera de mi área. Soy un mentor de tecnología. Para ese tipo de preguntas te recomiendo consultar con un profesional especializado. ¿En qué puedo ayudarte con tu aprendizaje tecnológico?";
  }

  if (GUARDRAIL_KEYWORDS.harmful.some(k => lower.includes(k))) {
    return "No puedo ayudarte con eso. Estoy aquí para guiarte en tu camino tecnológico. ¿En qué puedo ayudarte con tu aprendizaje?";
  }

  if (GUARDRAIL_KEYWORDS.competitors.some(k => lower.includes(k))) {
    return "Hay muchas plataformas de aprendizaje disponibles, y lo más importante es que encuentres la que funciona mejor para ti. Lo que te puedo ofrecer en MXNTOR es orientación personalizada para el mercado mexicano. ¿Qué área de tecnología quieres explorar?";
  }

  // Human checkpoint
  if (HUMAN_CHECKPOINT_KEYWORDS.some(k => lower.includes(k))) {
    return `Parece que estás pasando por un momento difícil${userName ? `, ${userName}` : ""}. Recuerda que es completamente normal sentirte así al aprender algo nuevo — todos pasamos por eso. Si necesitas apoyo más personalizado, puedes escribirnos a mentor@mxntor.com y un mentor humano te contactará en 24 horas. 💙`;
  }

  // Vague / greeting
  if (VAGUE_KEYWORDS.some(k => lower.includes(k))) {
    return `¡Hola${userName ? `, ${userName}` : ""}! Estoy aquí para guiarte en tu camino tecnológico. ¿Puedes contarme un poco más sobre lo que quieres aprender o lograr? Así puedo darte consejos más personalizados. 😊`;
  }

  // Keyword matching
  for (const { keywords, text: response } of RESPONSES) {
    if (keywords.some(k => lower.includes(k))) {
      // Personalize with name if available
      if (userName && !response.startsWith(userName)) {
        return response;
      }
      return response;
    }
  }

  // Context-aware fallback based on intake
  if (userExperience.includes("principiante") || userExperience.includes("Soy principiante")) {
    return `Buena pregunta${userName ? `, ${userName}` : ""}. Como estás empezando, lo más importante es construir una base sólida. Te recomiendo comenzar por Python o JavaScript (elige uno) y practicar todos los días, aunque sea 30 minutos. ¿Tienes alguna preferencia por el tipo de tecnología que quieres aprender — web, datos, o apps?`;
  }

  return `Gracias por tu pregunta${userName ? `, ${userName}` : ""}. Para darte el mejor consejo, ¿puedes darme más contexto? Por ejemplo: ¿cuál es tu nivel actual, qué tecnologías ya conoces, y cuál es tu objetivo concreto? Con esa información puedo orientarte de manera más precisa. 🎯`;
}

// ─── Intake questions ─────────────────────────────────────────────────────────

const INTAKE_QUESTIONS = [
  "¡Hola! Soy MXNTOR, tu mentor de tecnología 🚀 ¿Cuál es tu nombre?",
  "", // filled dynamically after name
  "¿Cuánto tiempo llevas estudiando tecnología? (Soy principiante / Llevo algunos meses / Ya tengo más de 1 año)",
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [intakeStep, setIntakeStep] = useState(0); // 0=awaiting name, 1=awaiting goal, 2=awaiting experience, 3=done
  const [userName, setUserName] = useState("");
  const [userGoal, setUserGoal] = useState("");
  const [userExperience, setUserExperience] = useState("");
  const [sessionSaved, setSessionSaved] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // First intake question on mount
  useEffect(() => {
    const t = setTimeout(() => {
      setMessages(prev => [...prev, { id: Math.random().toString(36).slice(2), role: "assistant", text: INTAKE_QUESTIONS[0], feedback: null }]);
    }, 600);
    return () => clearTimeout(t);
  }, []);

  function uid() {
    return Math.random().toString(36).slice(2);
  }

  function addAssistantMessage(text: string) {
    setMessages(prev => [...prev, { id: uid(), role: "assistant", text, feedback: null }]);
  }

  function addUserMessage(text: string) {
    setMessages(prev => [...prev, { id: uid(), role: "user", text }]);
  }

  function simulateTypingThenAdd(text: string, delay = 1200) {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addAssistantMessage(text);
    }, delay);
  }

  function handleSend() {
    const trimmed = input.trim();
    if (!trimmed) return;
    setInput("");

    addUserMessage(trimmed);

    // Intake flow
    if (intakeStep === 0) {
      const name = trimmed.split(" ")[0];
      setUserName(name);
      setIntakeStep(1);
      simulateTypingThenAdd(`Mucho gusto, ${name}! ¿Cuál es tu objetivo principal? (Por ejemplo: conseguir mi primer trabajo en tech, aprender a programar, entender inteligencia artificial, cambiar de carrera)`, 1400);
      return;
    }

    if (intakeStep === 1) {
      setUserGoal(trimmed);
      setIntakeStep(2);
      simulateTypingThenAdd(INTAKE_QUESTIONS[2], 1200);
      return;
    }

    if (intakeStep === 2) {
      setUserExperience(trimmed);
      setIntakeStep(3);
      const resp = `¡Perfecto, ${userName}! Ya tengo un buen panorama de dónde estás y hacia dónde quieres ir. A partir de ahora puedes preguntarme cualquier cosa sobre tu camino en tech — tecnologías, empleos, recursos, portafolio, entrevistas... ¡Estoy aquí para guiarte! 💪 ¿Por dónde quieres empezar?`;
      simulateTypingThenAdd(resp, 1600);
      return;
    }

    // Free-form chat
    const response = getMXNTORResponse(trimmed, userName, userGoal, userExperience);
    simulateTypingThenAdd(response, 1200 + Math.random() * 600);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function handleThumbsUp(id: string) {
    setMessages(prev =>
      prev.map(m =>
        m.id === id ? { ...m, feedback: "up", feedbackThanks: true } : m
      )
    );
    setTimeout(() => {
      setMessages(prev =>
        prev.map(m => (m.id === id ? { ...m, feedbackThanks: false } : m))
      );
    }, 2500);
  }

  function handleThumbsDown(id: string) {
    setMessages(prev =>
      prev.map(m =>
        m.id === id
          ? { ...m, feedback: "down", feedbackImprove: { text: "", submitted: false } }
          : m
      )
    );
  }

  function handleImproveChange(id: string, text: string) {
    setMessages(prev =>
      prev.map(m =>
        m.id === id && m.feedbackImprove
          ? { ...m, feedbackImprove: { ...m.feedbackImprove, text } }
          : m
      )
    );
  }

  function handleImproveSubmit(id: string) {
    setMessages(prev =>
      prev.map(m =>
        m.id === id && m.feedbackImprove
          ? { ...m, feedbackImprove: { ...m.feedbackImprove, submitted: true } }
          : m
      )
    );
  }

  function buildTopicsDiscussed(): string[] {
    const userTexts = messages.filter(m => m.role === "user").map(m => m.text.toLowerCase()).join(" ");
    const topicMap: { keywords: string[]; label: string }[] = [
      { keywords: ["python"], label: "Python" },
      { keywords: ["javascript", "js", "react", "html", "css", "web", "frontend"], label: "Desarrollo web / JavaScript" },
      { keywords: ["ia", "ai", "inteligencia artificial", "machine learning", "datos", "data"], label: "IA y Ciencia de datos" },
      { keywords: ["trabajo", "empleo", "job", "contratar"], label: "Búsqueda de empleo" },
      { keywords: ["portafolio", "portfolio", "github", "proyectos"], label: "Portafolio y proyectos" },
      { keywords: ["entrevista", "interview"], label: "Entrevistas técnicas" },
      { keywords: ["salario", "sueldo", "salary", "dinero"], label: "Salarios en México" },
      { keywords: ["gratis", "free", "recursos", "curso"], label: "Recursos gratuitos" },
      { keywords: ["freelance", "independiente", "cliente"], label: "Trabajo freelance" },
      { keywords: ["certificación", "certificado", "aws", "google", "microsoft"], label: "Certificaciones" },
      { keywords: ["cambio de carrera", "cambiar"], label: "Cambio de carrera" },
      { keywords: ["empezar", "inicio", "comenzar", "principiante"], label: "Cómo empezar en tech" },
    ];
    return topicMap.filter(t => t.keywords.some(k => userTexts.includes(k))).map(t => t.label);
  }

  function buildTranscript(): string {
    return messages
      .map(m => `[${m.role === "user" ? "Usuario" : "MXNTOR"}]: ${m.text}`)
      .join("\n");
  }

  function buildSummary(): string {
    const topics = buildTopicsDiscussed();
    const transcript = buildTranscript();
    return [
      `=== RESUMEN DE SESIÓN MXNTOR ===`,
      `Nombre: ${userName || "No proporcionado"}`,
      `Objetivo: ${userGoal || "No proporcionado"}`,
      `Experiencia: ${userExperience || "No proporcionada"}`,
      `Temas tratados: ${topics.length > 0 ? topics.join(", ") : "Conversación general"}`,
      `Mensajes en sesión: ${messages.length}`,
      ``,
      `=== TRANSCRIPCIÓN COMPLETA ===`,
      transcript,
    ].join("\n");
  }

  async function handleSaveSession() {
    setSaving(true);
    const summary = buildSummary();
    const negativeFeedback = messages
      .filter(m => m.feedback === "down" && m.feedbackImprove?.text)
      .map(m => m.feedbackImprove!.text)
      .join(" | ");

    try {
      const res = await fetch("/api/chat-log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_name: userName || "Anónimo",
          session_summary: summary,
          feedback: negativeFeedback || null,
        }),
      });
      if (res.ok) {
        setSessionSaved(true);
        setSaveMsg("¡Sesión guardada exitosamente! ✅");
      } else {
        setSaveMsg("Hubo un error al guardar. Intenta de nuevo.");
      }
    } catch {
      setSaveMsg("Error de conexión. Intenta de nuevo.");
    } finally {
      setSaving(false);
    }
  }

  const intakeDone = intakeStep === 3;

  return (
    <div className="flex min-h-screen flex-col bg-[#0F172A]">
      {/* Page header */}
      <div className="border-b border-slate-700/60 bg-[#0F172A] px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-3xl items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white shadow shadow-blue-600/40">
            MX
          </div>
          <div>
            <p className="text-sm font-semibold text-white">MXNTOR</p>
            <p className="text-xs text-slate-400">Tu mentor de tecnología 🇲🇽</p>
          </div>
          <span className="ml-auto flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/10 px-2.5 py-1 text-xs font-medium text-green-400">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
            En línea
          </span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-3xl space-y-5">
          {messages.map(msg => (
            <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
              {/* Avatar */}
              {msg.role === "assistant" && (
                <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white shadow shadow-blue-600/30">
                  MX
                </div>
              )}

              <div className={`max-w-[80%] space-y-1.5 ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col`}>
                <div
                  className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "rounded-tr-sm bg-blue-600 text-white shadow shadow-blue-600/20"
                      : "rounded-tl-sm border border-slate-700/60 bg-[#1E293B] text-slate-200"
                  }`}
                >
                  {msg.text}
                </div>

                {/* Feedback buttons — only for assistant messages after intake */}
                {msg.role === "assistant" && intakeDone && (
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      {msg.feedback !== "down" && (
                        <button
                          onClick={() => handleThumbsUp(msg.id)}
                          className={`rounded-full p-1.5 text-sm transition ${
                            msg.feedback === "up"
                              ? "bg-green-500/20 text-green-400"
                              : "text-slate-500 hover:bg-slate-700 hover:text-slate-300"
                          }`}
                          aria-label="Útil"
                        >
                          👍
                        </button>
                      )}
                      {msg.feedback !== "up" && (
                        <button
                          onClick={() => handleThumbsDown(msg.id)}
                          className={`rounded-full p-1.5 text-sm transition ${
                            msg.feedback === "down"
                              ? "bg-red-500/20 text-red-400"
                              : "text-slate-500 hover:bg-slate-700 hover:text-slate-300"
                          }`}
                          aria-label="Mejorable"
                        >
                          👎
                        </button>
                      )}
                      {msg.feedbackThanks && (
                        <span className="text-xs text-green-400">¡Gracias por tu feedback positivo! 🌟</span>
                      )}
                    </div>

                    {msg.feedback === "down" && msg.feedbackImprove && !msg.feedbackImprove.submitted && (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={msg.feedbackImprove.text}
                          onChange={e => handleImproveChange(msg.id, e.target.value)}
                          placeholder="¿Cómo podríamos mejorar esta respuesta?"
                          className="rounded-lg border border-slate-600 bg-[#0F172A] px-3 py-1.5 text-xs text-slate-300 placeholder-slate-500 focus:border-blue-500 focus:outline-none w-60"
                        />
                        <button
                          onClick={() => handleImproveSubmit(msg.id)}
                          className="rounded-lg bg-slate-700 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-600 transition"
                        >
                          Enviar
                        </button>
                      </div>
                    )}
                    {msg.feedback === "down" && msg.feedbackImprove?.submitted && (
                      <span className="text-xs text-slate-400">Gracias, tomaremos en cuenta tu sugerencia. 🙏</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex gap-3">
              <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white shadow shadow-blue-600/30">
                MX
              </div>
              <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm border border-slate-700/60 bg-[#1E293B] px-4 py-3">
                <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:0ms]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:150ms]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:300ms]" />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Session summary panel */}
      {showSummary && (
        <div className="border-t border-slate-700/60 bg-[#1E293B] px-4 py-5 sm:px-6">
          <div className="mx-auto max-w-3xl space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-white">Resumen de sesión</p>
              <button onClick={() => setShowSummary(false)} className="text-slate-500 hover:text-slate-300 text-xs transition">
                Cerrar ✕
              </button>
            </div>

            {/* Profile cards */}
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {[
                { label: "Nombre", value: userName || "—" },
                { label: "Objetivo", value: userGoal || "—" },
                { label: "Experiencia", value: userExperience || "—" },
                { label: "Mensajes", value: String(messages.length) },
              ].map(({ label, value }) => (
                <div key={label} className="rounded-lg border border-slate-700/60 bg-[#0F172A] px-3 py-2.5">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">{label}</p>
                  <p className="mt-0.5 text-xs text-slate-200 leading-snug">{value}</p>
                </div>
              ))}
            </div>

            {/* Topics discussed */}
            {(() => {
              const topics = buildTopicsDiscussed();
              return topics.length > 0 ? (
                <div>
                  <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">Temas tratados</p>
                  <div className="flex flex-wrap gap-1.5">
                    {topics.map(t => (
                      <span key={t} className="rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-0.5 text-xs text-blue-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null;
            })()}

            {/* Transcript */}
            <div>
              <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">Transcripción completa</p>
              <div className="max-h-36 overflow-y-auto rounded-xl border border-slate-700/60 bg-[#0F172A] p-3 space-y-1.5">
                {messages.length === 0 ? (
                  <p className="text-xs text-slate-500">No hay mensajes aún.</p>
                ) : messages.map(m => (
                  <p key={m.id} className="text-xs leading-relaxed">
                    <span className={`font-semibold ${m.role === "user" ? "text-blue-400" : "text-slate-400"}`}>
                      {m.role === "user" ? (userName || "Tú") : "MXNTOR"}:
                    </span>{" "}
                    <span className="text-slate-300">{m.text}</span>
                  </p>
                ))}
              </div>
            </div>

            {/* Save button */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleSaveSession}
                disabled={saving || sessionSaved}
                className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-500 disabled:opacity-50"
              >
                {saving ? "Guardando..." : sessionSaved ? "Guardado ✅" : "Guardar en Supabase"}
              </button>
              {saveMsg && <span className="text-xs text-slate-400">{saveMsg}</span>}
            </div>
          </div>
        </div>
      )}

      {/* Input area */}
      <div className="border-t border-slate-700/60 bg-[#0F172A] px-4 py-4 sm:px-6">
        <div className="mx-auto max-w-3xl space-y-3">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              placeholder={
                intakeStep === 0
                  ? "Escribe tu nombre..."
                  : intakeStep === 1
                  ? "Escribe tu objetivo..."
                  : intakeStep === 2
                  ? "Soy principiante / Llevo algunos meses / Ya tengo más de 1 año"
                  : "Escribe tu pregunta..."
              }
              className="flex-1 rounded-xl border border-slate-700 bg-[#1E293B] px-4 py-3 text-sm text-white placeholder-slate-500 transition focus:border-blue-500 focus:outline-none"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow shadow-blue-600/30 transition hover:bg-blue-500 active:scale-95 disabled:opacity-40"
              aria-label="Enviar"
            >
              {isTyping ? (
                <span className="flex gap-0.5">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white [animation-delay:0ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white [animation-delay:300ms]" />
                </span>
              ) : (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              )}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-600">
              MXNTOR — Orientación tech para jóvenes mexicanos 🇲🇽
            </p>
            <button
              onClick={() => setShowSummary(v => !v)}
              className="text-xs text-slate-500 underline underline-offset-2 hover:text-slate-300 transition"
            >
              Ver resumen de sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
