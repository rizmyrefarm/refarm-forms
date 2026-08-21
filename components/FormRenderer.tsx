"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { FormDefinition, SubmissionData } from "@/lib/types";
import { isConditionMet, cn } from "@/lib/utils";
import { FormHeader } from "./form/FormHeader";
import { FormToolbar } from "./form/FormToolbar";
import { FieldRenderer } from "./form/FieldRenderer";
import { CheckCircle2, ArrowRight, ExternalLink, RefreshCw } from "lucide-react";
import Link from "next/link";

interface FormRendererProps {
  formDef: FormDefinition;
  initialData?: SubmissionData;
  submissionId?: string; // If editing existing submission
  isEditMode?: boolean;
}

export const FormRenderer: React.FC<FormRendererProps> = ({
  formDef,
  initialData,
  submissionId,
  isEditMode = false,
}) => {
  const router = useRouter();
  const storageKey = `refarm_draft_${formDef.slug}`;

  const [formData, setFormData] = useState<SubmissionData>(() => {
    if (initialData) return initialData;

    // Seed defaults
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

  const [saveStatus, setSaveStatus] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load from localStorage if not edit mode
  useEffect(() => {
    if (isEditMode || initialData) return;
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object") {
          setFormData((prev) => ({
            meta: { ...prev.meta, ...(parsed.meta || {}) },
            fields: { ...prev.fields, ...(parsed.fields || {}) },
            tables: { ...prev.tables, ...(parsed.tables || {}) },
          }));
        }
      }
    } catch (e) {
      console.error("Failed to load local draft", e);
    }
  }, [storageKey, isEditMode, initialData]);

  // Flash save note
  const triggerAutosave = useCallback(
    (newData: SubmissionData) => {
      if (isEditMode) return;
      try {
        localStorage.setItem(storageKey, JSON.stringify(newData));
        setSaveStatus("Saved ✓");
        if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
        saveTimeoutRef.current = setTimeout(() => {
          setSaveStatus("");
        }, 1500);
      } catch (e) {
        console.error("Draft save failed", e);
      }
    },
    [storageKey, isEditMode]
  );

  const handleMetaChange = (key: string, val: any) => {
    setFormData((prev) => {
      const next = { ...prev, meta: { ...prev.meta, [key]: val } };
      triggerAutosave(next);
      return next;
    });
  };

  const handleFieldChange = (key: string, val: any) => {
    setFormData((prev) => {
      const next = { ...prev, fields: { ...prev.fields, [key]: val } };
      triggerAutosave(next);
      return next;
    });
  };

  const handleTableChange = (key: string, rows: Record<string, any>[]) => {
    setFormData((prev) => {
      const next = { ...prev, tables: { ...prev.tables, [key]: rows } };
      triggerAutosave(next);
      return next;
    });
  };

  const handleClear = () => {
    if (!window.confirm("Clear all fields? This cannot be undone.")) return;
    try {
      localStorage.removeItem(storageKey);
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
      if (!isEditMode) {
        try {
          localStorage.removeItem(storageKey);
        } catch (e) {}
      }

      setSubmittedId(result.id || submissionId);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "An unexpected error occurred during submission.");
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
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitButtonText={isEditMode ? "Update Submission" : "Submit / Save to system"}
        showBack={true}
        backHref={isEditMode ? `/admin/${submissionId}` : "/"}
        backLabel={isEditMode ? "View" : "Hub"}
      />

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
            <b>Error:</b> {errorMessage}
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
                  <div className="sec-head">
                    {section.num !== undefined && (
                      <span className="sec-num">{section.num}</span>
                    )}
                    <h2 className="sec-title">{section.title}</h2>
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
