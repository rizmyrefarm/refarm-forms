import React from "react";
import Link from "next/link";
import { FORMS } from "@/lib/forms";
import { ChevronRight } from "lucide-react";

export const dynamic = "force-static";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#eef2ef] py-6 sm:py-10 px-4">
      <main className="max-w-[640px] mx-auto w-full">
        {/* Header (Forms-only, no Admin link) */}
        <header className="flex items-center pb-4 mb-4 border-b border-[#d3ded7]">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/refarm-logo.png"
              alt="ReFarm Global"
              className="h-8 sm:h-9 w-auto object-contain"
            />
            <span className="text-gray-300">|</span>
            <span className="font-bold text-sm sm:text-base tracking-tight text-[#14532d]">
              Forms Platform
            </span>
          </div>
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
