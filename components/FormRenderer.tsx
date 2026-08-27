"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { FormDefinition, SubmissionData } from "@/lib/types";
import { isConditionMet, cn } from "@/lib/utils";
import { FormHeader } from "./form/FormHeader";
import { FormToolbar } from "./form/FormToolbar";
import { FieldRenderer } from "./form/FieldRenderer";
import { CheckCircle2, ArrowRight, Save, Printer, History, Trash2, Check } from "lucide-react";
import Link from "next/link";

interface FormRendererProps {
  formDef: FormDefinition;
  initialData?: SubmissionData;
  submissionId?: string; // If editing existing submission
  isEditMode?: boolean;
}

interface StoredDraft {
  data: SubmissionData;
  updatedAt: string;
  version: number;
}

function getRelativeTimeString(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    if (diffMs < 0 || isNaN(diffMs)) return "just now";
    const diffSec = Math.floor(diffMs / 1000);
    if (diffSec < 60) return "just now";
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin} ${diffMin === 1 ? "minute" : "minutes"} ago`;
    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return `${diffHr} ${diffHr === 1 ? "hour" : "hours"} ago`;
    const diffDays = Math.floor(diffHr / 24);
    return `${diffDays} ${diffDays === 1 ? "day" : "days"} ago`;
  } catch {
    return "recently";
  }
}

function isDraftDataNonEmpty(data: SubmissionData): boolean {
  if (!data) return false;
  const hasMeta = Object.values(data.meta || {}).some(
    (v) => v !== "" && v !== null && v !== undefined
  );
  const hasFields = Object.values(data.fields || {}).some((v) => {
    if (Array.isArray(v)) return v.length > 0;
    if (typeof v === "object" && v !== null) return Object.keys(v).length > 0;
    return v !== "" && v !== null && v !== undefined;
  });
  const hasTables = Object.values(data.tables || {}).some((rows) =>
    rows.some((row) =>
      Object.entries(row).some(([k, v]) => v !== "" && v !== null && v !== undefined && k !== "idx")
    )
  );
  return hasMeta || hasFields || hasTables;
}

export const FormRenderer: React.FC<FormRendererProps> = ({
  formDef,
  initialData,
  submissionId,
  isEditMode = false,
}) => {
  const router = useRouter();
  // Standardized draft key format: refarm:draft:<slug>
  const draftKey = `refarm:draft:${formDef.slug}`;

  const [formData, setFormData] = useState<SubmissionData>(() => {
    if (initialData) return initialData;

    // Seed initial defaults
    const initialMeta: Record<string, any> = {};
    formDef.metaFields?.forEach((f) => {
      if (f.defaultValue) initialMeta[f.key] = f.defaultValue;
    });

    const initialFields: Record<string, any> = {};
    const initialTables: Record<string, Record<string, any>[]> = {};

    formDef.sections.forEach((sec) => {
      sec.fields.forEach((f) => {
        if (f.defaultValue !== undefined) initialFields[f.key] = f.defaultValue;
        if (f.type === "table" && f.tableConfig?.initialRows) {
          initialTables[f.key] = f.tableConfig.initialRows;
        }
      });
    });

    return {
      meta: initialMeta,
      fields: initialFields,
      tables: initialTables,
    };
  });

  const [availableDraft, setAvailableDraft] = useState<StoredDraft | null>(null);
  const [saveStatus, setSaveStatus] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const saveTimerRef = useRef<NodeJS.Timeout | null>(null);
  const statusTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(false);

  // Check for unsaved draft on mount (blank forms only)
  useEffect(() => {
    if (isEditMode || initialData) return;

    try {
      const raw = localStorage.getItem(draftKey);
      if (raw) {
        const parsed: StoredDraft = JSON.parse(raw);
        if (parsed && parsed.data && isDraftDataNonEmpty(parsed.data)) {
          setAvailableDraft(parsed);
        }
      }
    } catch (e) {
      console.warn("Could not read local draft:", e);
    }
  }, [draftKey, isEditMode, initialData]);

  // Debounced auto-save on form change (~500ms)
  const scheduleAutosave = useCallback(
    (nextData: SubmissionData) => {
      if (isEditMode) return;

      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);

      saveTimerRef.current = setTimeout(() => {
        try {
          if (isDraftDataNonEmpty(nextData)) {
            const draftPayload: StoredDraft = {
              data: nextData,
              updatedAt: new Date().toISOString(),
              version: 1,
            };
            localStorage.setItem(draftKey, JSON.stringify(draftPayload));
            setSaveStatus("Saved ✓");

            if (statusTimerRef.current) clearTimeout(statusTimerRef.current);
            statusTimerRef.current = setTimeout(() => {
              setSaveStatus("");
            }, 1500);
          }
        } catch (err) {
          // Fail silently on storage quota / private mode errors
          console.warn("Local draft auto-save failed:", err);
        }
      }, 500);
    },
    [draftKey, isEditMode]
  );

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
      if (statusTimerRef.current) clearTimeout(statusTimerRef.current);
    };
  }, []);

  const handleRestoreDraft = () => {
    if (!availableDraft) return;
    setFormData(availableDraft.data);
    setAvailableDraft(null);
    setSaveStatus("Draft restored ✓");
    if (statusTimerRef.current) clearTimeout(statusTimerRef.current);
    statusTimerRef.current = setTimeout(() => setSaveStatus(""), 2000);
  };

  const handleDiscardDraft = () => {
    try {
      localStorage.removeItem(draftKey);
    } catch (e) {}
    setAvailableDraft(null);
  };

  const handleMetaChange = (key: string, val: any) => {
    setFormData((prev) => {
      const next = { ...prev, meta: { ...prev.meta, [key]: val } };
      scheduleAutosave(next);
      return next;
    });
  };

  const handleFieldChange = (key: string, val: any) => {
    setFormData((prev) => {
      const next = { ...prev, fields: { ...prev.fields, [key]: val } };
      scheduleAutosave(next);
      return next;
    });
  };

  const handleTableChange = (key: string, rows: Record<string, any>[]) => {
    setFormData((prev) => {
      const next = { ...prev, tables: { ...prev.tables, [key]: rows } };
      scheduleAutosave(next);
      return next;
    });
  };

  const handleClear = () => {
    if (!window.confirm("Clear all fields? This cannot be undone.")) return;
    try {
      localStorage.removeItem(draftKey);
    } catch (e) {}
    window.location.reload();
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrorMessage(null);

    // Extract project & client name from meta or fields
    const projectName =
      formData.meta.proj_name ||
      formData.meta.project_name ||
      formData.fields.proj_name ||
      formData.fields.project ||
      "";

    const clientName =
      formData.meta.proj_client ||
      formData.meta.client_name ||
      formData.fields.client_name ||
      formData.fields.client ||
      formData.fields.farm_owner ||
      "";

    const payload = {
      formSlug: formDef.slug,
      formTitle: formDef.title,
      projectName: String(projectName).trim() || null,
      clientName: String(clientName).trim() || null,
      status: "submitted",
      data: formData,
    };

    try {
      const url = isEditMode && submissionId
        ? `/api/submissions/${submissionId}`
        : `/api/submissions`;
      const method = isEditMode ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to save submission");
      }

      const result = await res.json();

      // Clear draft key ONLY on successful submission
      if (!isEditMode) {
        try {
          localStorage.removeItem(draftKey);
        } catch (e) {}
      }

      setSubmittedId(result.id || submissionId);
    } catch (err: any) {
      console.error("Submission error:", err);
      // Data remains intact in localStorage for recovery
      setErrorMessage(
        err.message || "An unexpected error occurred during submission. Your draft is safely saved."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#eef2ef]">
      {/* Top sticky toolbar */}
      <FormToolbar
        title={formDef.title}
        saveStatus={saveStatus}
        onClear={!isEditMode ? handleClear : undefined}
        showBack={true}
        backHref={isEditMode ? `/admin/${submissionId}` : "/"}
        backLabel={isEditMode ? "View" : "Hub"}
      />

      {/* Restore Unsaved Draft Banner (non-blocking, accessible) */}
      {availableDraft && (
        <div
          role="region"
          aria-live="polite"
          className="max-w-[980px] mx-auto px-4 sm:px-6 pt-4 no-print animate-fade-in"
        >
          <div className="bg-[#fff8e6] border border-[#e6c766] border-l-4 border-l-[#d4a017] rounded-xl p-3.5 sm:p-4 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#6b5100]">
            <div className="flex items-center gap-2.5">
              <History className="w-4 h-4 text-[#d4a017] flex-shrink-0" />
              <div>
                <span className="font-bold text-[#7a5c00]">
                  Restore your unsaved draft?
                </span>{" "}
                <span className="text-amber-800/90">
                  (saved {getRelativeTimeString(availableDraft.updatedAt)})
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={handleRestoreDraft}
                className="inline-flex items-center gap-1 bg-[#14532d] hover:bg-[#0f3d21] text-white px-3 py-1.5 rounded-lg font-semibold transition focus:outline-none focus:ring-2 focus:ring-[#2f9e44]"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Restore</span>
              </button>
              <button
                type="button"
                onClick={handleDiscardDraft}
                className="inline-flex items-center gap-1 bg-white hover:bg-amber-100 text-[#7a5c00] border border-[#e6c766] px-3 py-1.5 rounded-lg font-semibold transition focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Discard</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Submission Success Modal / Banner */}
      {submittedId && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 no-print animate-fade-in">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl text-center border border-emerald-100">
            <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-[#14532d]" />
            </div>
            <h3 className="text-xl font-bold text-[#14532d] mb-1">
              {isEditMode ? "Submission Updated!" : "Form Successfully Submitted!"}
            </h3>
            <p className="text-xs text-gray-600 mb-6">
              The record has been securely stored in the ReFarm system and is ready for review or export.
            </p>
            <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
              <Link
                href={`/admin/${submittedId}`}
                className="inline-flex items-center justify-center gap-1.5 bg-[#14532d] hover:bg-[#0f3d21] text-white px-4 py-2.5 rounded-lg text-xs font-semibold transition"
              >
                <span>View Saved Record</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                type="button"
                onClick={() => {
                  setSubmittedId(null);
                  if (!isEditMode) {
                    window.location.reload();
                  }
                }}
                className="inline-flex items-center justify-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 rounded-lg text-xs font-semibold transition"
              >
                <span>{isEditMode ? "Continue Editing" : "Submit Another"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="max-w-[980px] mx-auto px-4 mt-4 no-print">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-xs">
            <b>Notice:</b> {errorMessage}
          </div>
        </div>
      )}

      {/* Main Document */}
      <div className="page-container">
        <form
          className="doc-card"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          autoComplete="off"
        >
          {/* Header */}
          <FormHeader
            title={formDef.title}
            subtitle={formDef.subtitle}
            metaFields={formDef.metaFields}
            metaValues={formData.meta}
            onChange={handleMetaChange}
          />

          {/* Body */}
          <div className="doc-body">
            {formDef.sections.map((section, sIdx) => {
              const isSectionEnabled = isConditionMet(section.conditional, formData);
              const sectionClass = isSectionEnabled ? "" : "cond-off";

              return (
                <section
                  key={section.id || sIdx}
                  className={cn("mt-7 first:mt-3", sectionClass)}
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

                  {/* Render fields with optional responsive grid layout */}
                  <div className="space-y-4">
                    {section.fields.map((field) => (
                      <FieldRenderer
                        key={field.key}
                        field={field}
                        formData={formData}
                        onChangeField={handleFieldChange}
                        onChangeTable={handleTableChange}
                      />
                    ))}
                  </div>
                </section>
              );
            })}

            {/* Bottom Action Bar */}
            <div className="mt-10 pt-6 border-t border-[#d3ded7] no-print">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                {/* Submit Button (~65% width on desktop) */}
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  aria-label={isEditMode ? "Update Submission" : "Submit form"}
                  className="flex-[2] sm:min-w-0 h-14 sm:h-[58px] bg-[#2f9e44] hover:bg-[#268a3a] active:bg-[#1b6b3a] text-white font-bold text-base sm:text-lg rounded-xl shadow-sm transition duration-150 flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#2f9e44] focus:ring-offset-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      <span>{isEditMode ? "Update Submission" : "Submit"}</span>
                    </>
                  )}
                </button>

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
        </form>
      </div>
    </div>
  );
};
