"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-neutral-200">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 
                          flex items-center justify-center text-white font-bold 
                          shadow-md group-hover:scale-105 transition">
            ⚡
          </div>

          <span className="text-xl font-semibold tracking-tight text-neutral-900">
            DelayLess
          </span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-8 text-sm font-medium">
          <Link href="/" className="navlink">
            Home
          </Link>
          <Link href="/dashboard" className="navlink">
            Dashboard
          </Link>
          <Link href="/report" className="navlink">
            Report
          </Link>

          {/* CTA */}
          <Link
            href="/dashboard"
            className="bg-gradient-to-r from-orange-500 to-amber-500 
                       hover:from-orange-600 hover:to-amber-600
                       text-white px-5 py-2.5 rounded-xl 
                       shadow-md hover:shadow-lg 
                       transition"
          >
            Live Status
          </Link>
        </div>
      </div>
    </nav>
  );
}