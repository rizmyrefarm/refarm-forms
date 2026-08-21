"use client";

import React from "react";
import Link from "next/link";
import { FormDefinition, SavedSubmission } from "@/lib/types";
import { isConditionMet, cn, formatDateTime } from "@/lib/utils";
import { FormHeader } from "./form/FormHeader";
import { FieldRenderer } from "./form/FieldRenderer";
import { ArrowLeft, Printer, Edit, ShieldCheck, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface SubmissionViewProps {
  submission: SavedSubmission;
  formDef: FormDefinition;
}

export const SubmissionView: React.FC<SubmissionViewProps> = ({
  submission,
  formDef,
}) => {
  const router = useRouter();
  const formData = submission.data || { meta: {}, fields: {}, tables: {} };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to permanently delete this submission?")) {
      return;
    }

    try {
      const res = await fetch(`/api/submissions/${submission.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        alert("Failed to delete submission.");
      }
    } catch (e) {
      console.error(e);
      alert("Error deleting submission.");
    }
  };

  return (
    <div className="min-h-screen bg-[#eef2ef] pb-16">
      {/* Top action toolbar */}
      <div className="toolbar sticky top-0 z-50 bg-[#14532d] text-white flex items-center gap-3 px-4 py-2.5 shadow-md no-print">
        <Link
          href="/admin"
          className="flex items-center gap-1 text-xs font-semibold text-emerald-200 hover:text-white bg-emerald-950/40 hover:bg-emerald-900/60 px-2.5 py-1.5 rounded-md transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Dashboard</span>
        </Link>

        <div className="flex items-center gap-2 font-bold tracking-tight text-sm">
          <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none">
            <path d="M4 20c0-8 6-14 16-16 0 10-6 16-16 16z" fill="#8fd19e" />
            <path d="M4 20C8 14 12 11 18 9" stroke="#14532d" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <span className="hidden sm:inline">ReFarm · {formDef.title}</span>
          <span className="sm:hidden">View</span>
        </div>

        <div className="flex-1" />

        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-1.5 bg-white/15 hover:bg-white/25 text-white text-xs font-semibold px-3 py-1.5 rounded-md transition"
        >
          <Printer className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Export / Print PDF</span>
          <span className="sm:hidden">Print</span>
        </button>

        <Link
          href={`/admin/${submission.id}/edit`}
          className="inline-flex items-center gap-1.5 bg-[#2f9e44] hover:bg-[#268a3a] text-white text-xs font-semibold px-3.5 py-1.5 rounded-md transition"
        >
          <Edit className="w-3.5 h-3.5" />
          <span>Edit</span>
        </Link>

        <button
          type="button"
          onClick={handleDelete}
          className="inline-flex items-center gap-1 bg-red-700/80 hover:bg-red-700 text-white text-xs font-semibold px-2.5 py-1.5 rounded-md transition"
          title="Delete submission"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Meta info bar */}
      <div className="max-w-[980px] mx-auto px-4 mt-4 no-print">
        <div className="bg-white/80 backdrop-blur border border-[#d3ded7] rounded-lg px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#14532d]">Status:</span>
            <span className="bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded text-[11px] uppercase tracking-wider">
              {submission.status}
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-gray-500 font-mono text-[11px]">ID: {submission.id}</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Submitted: <b>{formatDateTime(submission.createdAt)}</b></span>
            {submission.updatedAt && submission.updatedAt !== submission.createdAt && (
              <span>Updated: <b>{formatDateTime(submission.updatedAt)}</b></span>
            )}
          </div>
        </div>
      </div>

      {/* Document View */}
      <div className="page-container">
        <div className="doc-card">
          {/* Header */}
          <FormHeader
            title={formDef.title}
            subtitle={formDef.subtitle}
            metaFields={formDef.metaFields}
            metaValues={formData.meta || {}}
            readOnly={true}
          />

          {/* Body */}
          <div className="doc-body">
            {formDef.sections.map((section, sIdx) => {
              const isSectionEnabled = isConditionMet(section.conditional, formData);
              if (!isSectionEnabled) return null; // Hide non-applicable conditional sections in read-only

              return (
                <section
                  key={section.id || sIdx}
                  className="mt-7 first:mt-3"
                >
                  <div className="sec-head">
                    {section.num !== undefined && (
                      <span className="sec-num">{section.num}</span>
                    )}
                    <h2 className="sec-title">{section.title}</h2>
                  </div>
                  {section.hint && <p className="hint">{section.hint}</p>}

                  <div className="space-y-4">
                    {section.fields.map((field) => {
                      const isFieldEnabled = isConditionMet(field.conditional, formData);
                      if (!isFieldEnabled) return null;

                      return (
                        <FieldRenderer
                          key={field.key}
                          field={field}
                          formData={formData}
                          onChangeField={() => {}}
                          onChangeTable={() => {}}
                          readOnly={true}
                        />
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>

          {/* Footer */}
          {formDef.footerText && (
            <div className="py-4 px-8 bg-[#f2f9f4] border-t border-[#d3ded7] text-[#5b6b60] text-xs text-center font-medium">
              {formDef.footerText}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
