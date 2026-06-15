"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/core", label: "Core" },
  { href: "/product", label: "Product" },
  { href: "/pricing", label: "Pricing" },
  { href: "/research", label: "Research" },
  { href: "/marketing", label: "Marketing" },
  { href: "/docs", label: "Docs" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-700/60 bg-[#0F172A]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-sm font-bold tracking-tight text-white">
          <span className="text-blue-400">MX</span>NTOR
        </Link>

        {/* Desktop */}
        <nav className="hidden items-center gap-6 sm:flex">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium transition-colors ${
                pathname === href
                  ? "text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className="sm:hidden text-slate-400 hover:text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-slate-700/60 sm:hidden bg-[#0F172A]">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`block px-6 py-3 text-sm font-medium transition-colors ${
                pathname === href ? "text-white" : "text-slate-400"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
