export default function Footer() {
  return (
    <footer className="border-t border-slate-700/60 bg-[#0F172A]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 sm:px-6">
        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} <span className="text-blue-400 font-semibold">MX</span><span className="text-slate-300 font-semibold">NTOR</span> — El mentor que México necesita
        </p>
        <p className="text-xs text-slate-500">
          Built with Next.js &amp; Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
