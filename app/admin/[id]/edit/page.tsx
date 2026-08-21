import React from "react";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { getFormBySlug } from "@/lib/forms";
import { FormRenderer } from "@/components/FormRenderer";
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
    title: `Edit Submission ${params.id} — ReFarm Forms`,
  };
}

export default async function EditSubmissionPage({ params }: Props) {
  let submissionRaw = null;

  try {
    submissionRaw = await db.submission.findUnique({
      where: { id: params.id },
    });
  } catch (e) {
    console.error("Database query error in edit page:", e);
  }

  if (!submissionRaw) {
    notFound();
  }

  const formDef = getFormBySlug(submissionRaw.formSlug);
  if (!formDef) {
    notFound();
  }

  const initialData = (submissionRaw.data as any) || { meta: {}, fields: {}, tables: {} };

  return (
    <FormRenderer
      formDef={formDef}
      initialData={initialData}
      submissionId={submissionRaw.id}
      isEditMode={true}
    />
  );
}
