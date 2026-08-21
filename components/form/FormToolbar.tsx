"use client";

import React from "react";
import Link from "next/link";
import { Printer, RotateCcw, Check, Save, ArrowLeft } from "lucide-react";

interface FormToolbarProps {
  title: string;
  saveStatus?: string;
  onClear?: () => void;
  onSubmit?: () => void;
  isSubmitting?: boolean;
  submitButtonText?: string;
  showBack?: boolean;
  backHref?: string;
  backLabel?: string;
}

export const FormToolbar: React.FC<FormToolbarProps> = ({
  title,
  saveStatus,
  onClear,
  onSubmit,
  isSubmitting = false,
  submitButtonText = "Submit / Save to system",
  showBack = true,
  backHref = "/",
  backLabel = "Hub",
}) => {
  return (
    <div className="toolbar sticky top-0 z-50 bg-[#14532d] text-white flex items-center gap-3 px-4 py-2.5 shadow-md no-print">
      <div className="flex items-center gap-3">
        {showBack && (
          <Link
            href={backHref}
            className="flex items-center gap-1 text-xs font-semibold text-emerald-200 hover:text-white bg-emerald-950/40 hover:bg-emerald-900/60 px-2.5 py-1.5 rounded-md transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{backLabel}</span>
          </Link>
        )}
        <div className="flex items-center gap-2 font-bold tracking-tight text-sm">
          <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none">
            <path d="M4 20c0-8 6-14 16-16 0 10-6 16-16 16z" fill="#8fd19e" />
            <path d="M4 20C8 14 12 11 18 9" stroke="#14532d" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <span className="hidden sm:inline">ReFarm · {title}</span>
          <span className="sm:hidden">ReFarm</span>
        </div>
      </div>

      <div className="flex-1" />

      {saveStatus && (
        <span className="text-xs text-emerald-200 opacity-90 hidden sm:inline-block font-medium">
          {saveStatus}
        </span>
      )}

      {onClear && (
        <button
          type="button"
          onClick={onClear}
          className="inline-flex items-center gap-1.5 bg-white/15 hover:bg-white/25 text-white text-xs font-semibold px-3 py-1.5 rounded-md transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Clear</span>
        </button>
      )}

      <button
        type="button"
        onClick={() => window.print()}
        className="inline-flex items-center gap-1.5 bg-white/15 hover:bg-white/25 text-white text-xs font-semibold px-3 py-1.5 rounded-md transition"
      >
        <Printer className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Export / Print PDF</span>
        <span className="sm:hidden">Print</span>
      </button>

      {onSubmit && (
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="inline-flex items-center gap-1.5 bg-[#2f9e44] hover:bg-[#268a3a] text-white text-xs font-semibold px-3.5 py-1.5 rounded-md transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save className="w-3.5 h-3.5" />
              <span>{submitButtonText}</span>
            </>
          )}
        </button>
      )}
    </div>
  );
};
