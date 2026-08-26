import React from "react";
import Link from "next/link";
import { FORMS } from "@/lib/forms";
import { db } from "@/lib/db";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { CopyFormLinkButton } from "@/components/admin/CopyFormLinkButton";

export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
  const countsMap: Record<string, number> = {};

  try {
    const grouped = await db.submission.groupBy({
      by: ["formSlug"],
      _count: { id: true },
    });

    grouped.forEach((g) => {
      countsMap[g.formSlug] = g._count.id;
    });
  } catch (err) {
    console.error("Failed to fetch submission counts:", err);
  }

  const totalSubmissions = Object.values(countsMap).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-[#eef2ef] py-6 sm:py-10 px-4">
      <main className="max-w-[680px] mx-auto w-full">
        {/* Header */}
        <header className="flex items-center justify-between pb-4 mb-4 border-b border-[#d3ded7]">
          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#1b6b3a] hover:text-[#14532d] hover:underline focus:outline-none focus:ring-2 focus:ring-[#2f9e44] rounded px-1.5 py-1 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <span className="text-gray-300">|</span>
            <div className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/refarm-logo.png"
                alt="ReFarm Global"
                className="h-7 w-auto object-contain"
              />
              <span className="text-gray-300">|</span>
              <h1 className="font-bold text-sm sm:text-base tracking-tight text-[#14532d]">
                Admin Dashboard
              </h1>
            </div>
          </div>

          <span className="text-xs bg-[#e6f4ea] text-[#14532d] font-semibold px-2.5 py-1 rounded-full border border-[#b7c7bd]/60">
            {totalSubmissions} Total
          </span>
        </header>

        {/* Vertical List of Forms with Count Badges & Copy Link */}
        <div className="bg-white rounded-xl border border-[#d3ded7] shadow-sm overflow-hidden divide-y divide-[#d3ded7]">
          {FORMS.map((form) => {
            const count = countsMap[form.slug] || 0;
            return (
              <div
                key={form.slug}
                className="group relative flex items-center justify-between min-h-[60px] px-4 sm:px-5 py-3 hover:bg-[#f2f9f4] active:bg-[#e6f4ea] transition duration-150"
              >
                <Link
                  href={`/admin/forms/${form.slug}`}
                  className="flex-1 text-[13.5px] sm:text-sm font-medium text-[#1a1f1c] group-hover:text-[#14532d] transition pr-3 leading-snug focus:outline-none focus:underline"
                >
                  {form.title}
                </Link>

                <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                  <CopyFormLinkButton slug={form.slug} formTitle={form.title} />

                  <Link
                    href={`/admin/forms/${form.slug}`}
                    tabIndex={-1}
                    aria-hidden="true"
                    className="flex items-center gap-2 focus:outline-none"
                  >
                    <span
                      className={`text-xs font-semibold px-2.5 py-0.5 rounded-full transition ${
                        count > 0
                          ? "bg-[#e6f4ea] text-[#14532d] border border-[#2f9e44]/40"
                          : "bg-gray-100 text-gray-400 border border-gray-200"
                      }`}
                    >
                      {count}
                    </span>
                    <ChevronRight
                      className="w-4 h-4 text-[#5b6b60] group-hover:text-[#14532d] group-hover:translate-x-0.5 transition-transform flex-shrink-0"
                    />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
