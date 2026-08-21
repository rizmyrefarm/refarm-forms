import React from "react";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { getFormBySlug } from "@/lib/forms";
import { CleanPrintDocument } from "@/components/admin/CleanPrintDocument";
import { SavedSubmission } from "@/lib/types";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

interface Props {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Print Submission ${params.id} — ReFarm Admin`,
  };
}

export default async function PrintSubmissionPage({ params }: Props) {
  let submissionRaw = null;

  try {
    submissionRaw = await db.submission.findUnique({
      where: { id: params.id },
    });
  } catch (e) {
    console.error("Database query error in print page:", e);
  }

  if (!submissionRaw) {
    notFound();
  }

  const formDef = getFormBySlug(submissionRaw.formSlug);
  if (!formDef) {
    notFound();
  }

  const submission: SavedSubmission = {
    id: submissionRaw.id,
    formSlug: submissionRaw.formSlug,
    formTitle: submissionRaw.formTitle,
    projectName: submissionRaw.projectName,
    clientName: submissionRaw.clientName,
    status: submissionRaw.status,
    data: (submissionRaw.data as any) || { meta: {}, fields: {}, tables: {} },
    createdAt: submissionRaw.createdAt.toISOString(),
    updatedAt: submissionRaw.updatedAt.toISOString(),
  };

  return <CleanPrintDocument submission={submission} formDef={formDef} />;
}
