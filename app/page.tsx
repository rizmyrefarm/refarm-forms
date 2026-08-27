import React from "react";
import Link from "next/link";
import { FORMS, FORM_RESPONSIBLE_MAP } from "@/lib/forms";
import { ChevronRight } from "lucide-react";

export const dynamic = "force-static";

const CLIENT_SLUGS = new Set(["ecofarm-phase-0-1", "ipic"]);

export default function HomePage() {
  const clientForms = FORMS.filter((f) => CLIENT_SLUGS.has(f.slug));
  const refarmForms = FORMS.filter((f) => !CLIENT_SLUGS.has(f.slug));

  const FormList = ({ forms }: { forms: typeof FORMS }) => (
    <div className="bg-white rounded-xl border border-[#d3ded7] shadow-sm overflow-hidden divide-y divide-[#d3ded7]">
      {forms.map((form) => {
        const responsible = FORM_RESPONSIBLE_MAP[form.slug];
        return (
          <Link
            key={form.slug}
            href={`/${form.slug}`}
            className="group flex items-center justify-between min-h-[58px] px-4 sm:px-5 py-3 hover:bg-[#f2f9f4] active:bg-[#e6f4ea] transition duration-150 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#2f9e44]"
          >
            <div className="flex-1 pr-3 min-w-0">
              <div className="text-[13px] sm:text-sm font-medium text-[#1a1f1c] group-hover:text-[#14532d] transition leading-snug">
                {form.title}
              </div>
              {responsible && (
                <div className="text-[11px] text-[#5b6b60] group-hover:text-[#1b6b3a] font-normal mt-0.5 leading-tight">
                  <span className="text-gray-400">Filled by:</span> {responsible}
                </div>
              )}
            </div>
            <ChevronRight
              className="w-4 h-4 text-[#5b6b60] group-hover:text-[#14532d] group-hover:translate-x-0.5 transition-transform flex-shrink-0"
              aria-hidden="true"
            />
          </Link>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#eef2ef] py-6 sm:py-10 px-4">
      <main className="max-w-[960px] mx-auto w-full">
        {/* Header */}
        <header className="flex items-center pb-4 mb-5 border-b border-[#d3ded7]">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/refarm-logo.png"
              alt="ReFarm Global"
              className="h-8 sm:h-9 w-auto object-contain max-w-[140px]"
            />
            <span className="text-gray-300">|</span>
            <span className="font-bold text-sm sm:text-base tracking-tight text-[#14532d]">
              Forms Platform
            </span>
          </div>
        </header>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {/* Left Column — Client */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#5b6b60] mb-2.5 px-1">
              Client
            </h2>
            <FormList forms={clientForms} />
          </div>

          {/* Right Column — ReFarm */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#5b6b60] mb-2.5 px-1">
              ReFarm
            </h2>
            <FormList forms={refarmForms} />
          </div>
        </div>
      </main>
    </div>
  );
}
