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
              <div className="bg-white px-2 py-1 rounded-md shadow-sm inline-flex items-center flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/refarm-logo.png"
                  alt="ReFarm Global"
                  className="h-5 sm:h-6 w-auto object-contain"
                />
              </div>
              <span className="hidden sm:inline-block ml-2 text-[10px] uppercase tracking-wider bg-emerald-950/60 text-emerald-300 font-semibold px-2 py-0.5 rounded border border-emerald-700/40">
                Forms Platform
              </span>
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
