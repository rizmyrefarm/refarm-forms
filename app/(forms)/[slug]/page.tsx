import React from "react";
import { notFound } from "next/navigation";
import { getFormBySlug, FORMS } from "@/lib/forms";
import { FormRenderer } from "@/components/FormRenderer";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

interface Props {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return FORMS.map((f) => ({
    slug: f.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const form = getFormBySlug(params.slug);
  if (!form) {
    return {
      title: "Form Not Found — ReFarm Forms",
    };
  }
  return {
    title: `${form.title} — ReFarm Forms`,
    description: form.description,
  };
}

export default function FormPage({ params }: Props) {
  const form = getFormBySlug(params.slug);

  if (!form) {
    notFound();
  }

  return <FormRenderer formDef={form} />;
}
