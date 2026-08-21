import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { getFormBySlug } from "@/lib/forms";
import { FormSubmissionsTable } from "@/components/admin/FormSubmissionsTable";
import { SavedSubmission } from "@/lib/types";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const form = getFormBySlug(params.slug);
  if (!form) return { title: "Form Not Found — ReFarm Admin" };
  return {
    title: `${form.title} Submissions — ReFarm Admin`,
  };
}

export default async function FormSubmissionsPage({ params }: Props) {
  const form = getFormBySlug(params.slug);

  if (!form) {
    notFound();
  }

  let submissionsRaw: any[] = [];
  try {
    submissionsRaw = await db.submission.findMany({
      where: {
        formSlug: params.slug,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (err) {
    console.error(`Failed to fetch submissions for form ${params.slug}:`, err);
  }

  const submissions: SavedSubmission[] = submissionsRaw.map((s) => ({
    id: s.id,
    formSlug: s.formSlug,
    formTitle: s.formTitle,
    projectName: s.projectName,
    clientName: s.clientName,
    status: s.status,
    data: s.data,
    createdAt: s.createdAt.toISOString(),
    updatedAt: s.updatedAt.toISOString(),
  }));

  return (
    <div className="min-h-screen bg-[#eef2ef] py-6 sm:py-10 px-4">
      <main className="max-w-4xl mx-auto w-full">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-6 border-b border-[#d3ded7]">
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#1b6b3a] hover:text-[#14532d] hover:underline focus:outline-none focus:ring-2 focus:ring-[#2f9e44] rounded px-2 py-1 bg-white border border-[#d3ded7] transition shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All forms</span>
            </Link>

            <h1 className="font-bold text-base sm:text-xl tracking-tight text-[#14532d]">
              {form.title}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-[#e6f4ea] text-[#14532d] font-semibold px-2.5 py-1 rounded-full border border-[#2f9e44]/40">
              {submissions.length} {submissions.length === 1 ? "Record" : "Records"}
            </span>
          </div>
        </header>

        {/* Submissions Table List */}
        <FormSubmissionsTable
          formSlug={form.slug}
          formTitle={form.title}
          initialSubmissions={submissions}
        />
      </main>
    </div>
  );
}
