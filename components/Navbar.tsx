"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, LayoutDashboard, Shield, ExternalLink } from "lucide-react";
import { FORMS } from "@/lib/forms";

export const Navbar: React.FC = () => {
  const pathname = usePathname();

  return (
    <header className="bg-[#14532d] text-white border-b border-emerald-800/60 sticky top-0 z-40 shadow-sm no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <svg className="w-7 h-7 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                <path d="M4 20c0-8 6-14 16-16 0 10-6 16-16 16z" fill="#8fd19e" />
                <path d="M4 20C8 14 12 11 18 9" stroke="#14532d" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <div>
                <span className="font-bold tracking-tight text-base sm:text-lg group-hover:text-emerald-200 transition">
                  ReFarm Forms
                </span>
                <span className="hidden sm:inline-block ml-2 text-[10px] uppercase tracking-wider bg-emerald-950/60 text-emerald-300 font-semibold px-2 py-0.5 rounded border border-emerald-700/40">
                  Internal
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                pathname === "/"
                  ? "bg-emerald-800 text-white shadow-inner"
                  : "text-emerald-100 hover:bg-emerald-800/60 hover:text-white"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Forms Hub</span>
            </Link>

            <Link
              href="/admin"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                pathname.startsWith("/admin")
                  ? "bg-emerald-800 text-white shadow-inner"
                  : "text-emerald-100 hover:bg-emerald-800/60 hover:text-white"
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Admin Dashboard</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
