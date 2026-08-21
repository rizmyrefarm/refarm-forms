import React from "react";
import Link from "next/link";
import { FORMS } from "@/lib/forms";
import { ChevronRight } from "lucide-react";

export const dynamic = "force-static";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#eef2ef] py-6 sm:py-10 px-4">
      <main className="max-w-[640px] mx-auto w-full">
        {/* Header */}
        <header className="flex items-center justify-between pb-4 mb-4 border-b border-[#d3ded7]">
          <div className="flex items-center gap-2.5">
            <svg
              className="w-6 h-6 flex-shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M4 20c0-8 6-14 16-16 0 10-6 16-16 16z"
                fill="#2f9e44"
              />
              <path
                d="M4 20C8 14 12 11 18 9"
                stroke="#14532d"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
            <span className="font-bold text-base sm:text-lg tracking-tight text-[#14532d]">
              ReFarm Forms
            </span>
          </div>

          <Link
            href="/admin"
            className="text-xs font-semibold text-[#1b6b3a] hover:text-[#14532d] hover:underline focus:outline-none focus:ring-2 focus:ring-[#2f9e44] focus:ring-offset-2 rounded px-1.5 py-1 transition"
          >
            Admin
          </Link>
        </header>

        {/* Clean Vertical Form List */}
        <div className="bg-white rounded-xl border border-[#d3ded7] shadow-sm overflow-hidden divide-y divide-[#d3ded7]">
          {FORMS.map((form) => (
            <Link
              key={form.slug}
              href={`/${form.slug}`}
              className="group flex items-center justify-between min-h-[58px] px-4 sm:px-5 py-3.5 hover:bg-[#f2f9f4] active:bg-[#e6f4ea] transition duration-150 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#2f9e44]"
            >
              <span className="text-[13.5px] sm:text-sm font-medium text-[#1a1f1c] group-hover:text-[#14532d] transition pr-3 leading-snug">
                {form.title}
              </span>
              <ChevronRight
                className="w-4 h-4 text-[#5b6b60] group-hover:text-[#14532d] group-hover:translate-x-0.5 transition-transform flex-shrink-0"
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
