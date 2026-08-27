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
          <div className="bg-white px-2 py-0.5 rounded shadow-sm inline-flex items-center flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/refarm-logo.png"
              alt="ReFarm Global"
              className="h-5 w-auto object-contain max-w-[100px]"
            />
          </div>
          <span className="hidden sm:inline text-emerald-100 font-semibold text-xs">· {formDef.title}</span>
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
          <div className="flex flex-wrap items-center gap-3 text-[11.5px]">
            <span>
              Submitted: <b>{formatDateTime(submission.createdAt)}</b>
            </span>
            {submission.updatedAt &&
              new Date(submission.updatedAt).getTime() - new Date(submission.createdAt).getTime() > 1000 && (
                <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded font-medium">
                  <span>Last Edited:</span>
                  <b>{formatDateTime(submission.updatedAt)}</b>
                </span>
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
                  <div className="sec-head flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-baseline gap-2.5">
                      {section.num !== undefined && (
                        <span className="sec-num">{section.num}</span>
                      )}
                      <h2 className="sec-title">{section.title}</h2>
                    </div>
                    {section.badge && (
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#e6f4ea] text-[#14532d] border border-[#2f9e44]/40 flex-shrink-0 mb-0.5">
                        {section.badge}
                      </span>
                    )}
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

            {/* Bottom Action Bar */}
            <div className="mt-10 pt-6 border-t border-[#d3ded7] no-print">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                {/* Edit Submission Button (~65% width on desktop) */}
                <Link
                  href={`/admin/${submission.id}/edit`}
                  className="flex-[2] sm:min-w-0 h-14 sm:h-[58px] bg-[#2f9e44] hover:bg-[#268a3a] active:bg-[#1b6b3a] text-white font-bold text-base sm:text-lg rounded-xl shadow-sm transition duration-150 flex items-center justify-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-[#2f9e44] focus:ring-offset-2"
                >
                  <Edit className="w-5 h-5" />
                  <span>Edit Submission</span>
                </Link>

                {/* Export / Print PDF Button (~35% width on desktop) */}
                <button
                  type="button"
                  onClick={() => window.print()}
                  aria-label="Export or Print PDF"
                  className="flex-[1] sm:min-w-0 h-14 sm:h-[58px] bg-white hover:bg-[#e6f4ea] active:bg-[#d3ded7] text-[#14532d] border-2 border-[#14532d] font-bold text-base sm:text-lg rounded-xl transition duration-150 flex items-center justify-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-[#14532d] focus:ring-offset-2"
                >
                  <Printer className="w-5 h-5 text-[#14532d]" />
                  <span>Export / Print PDF</span>
                </button>
              </div>
            </div>
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
