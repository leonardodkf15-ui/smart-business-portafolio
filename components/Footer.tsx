export default function Footer() {
  return (
    <footer className="border-t border-zinc-100">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-6 sm:px-6">
        <p className="text-xs text-zinc-400">
          © {new Date().getFullYear()} Week 0 Build
        </p>
        <p className="text-xs text-zinc-400">
          Built with Next.js &amp; Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
