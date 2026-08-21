import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ConditionalRule } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date | null | undefined): string {
  if (!date) return "-";
  const d = new Date(date);
  if (isNaN(d.getTime())) return String(date);
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatDateTime(date: string | Date | null | undefined): string {
  if (!date) return "-";
  const d = new Date(date);
  if (isNaN(d.getTime())) return String(date);
  return d.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function isConditionMet(
  conditional: ConditionalRule | undefined,
  formData: {
    meta?: Record<string, any>;
    fields?: Record<string, any>;
    tables?: Record<string, any>;
  }
): boolean {
  if (!conditional) return true;

  const { when, equals, includes } = conditional;
  const val = formData.fields?.[when] ?? formData.meta?.[when];

  if (equals !== undefined) {
    if (Array.isArray(equals)) {
      return equals.includes(val);
    }
    return val === equals;
  }

  if (includes !== undefined) {
    if (Array.isArray(val)) {
      if (Array.isArray(includes)) {
        return includes.some((inc) => val.includes(inc));
      }
      return val.includes(includes);
    }
    if (typeof val === "string") {
      if (Array.isArray(includes)) {
        return includes.includes(val);
      }
      return val === includes;
    }
  }

  return Boolean(val);
}

export function generateCSV(submissions: any[]): string {
  const headers = [
    "ID",
    "Form Slug",
    "Form Title",
    "Project Name",
    "Client Name",
    "Status",
    "Created At",
    "Updated At",
    "Full Payload (JSON)",
  ];

  const escapeCSV = (val: any) => {
    if (val === null || val === undefined) return '""';
    const str = typeof val === "object" ? JSON.stringify(val) : String(val);
    return `"${str.replace(/"/g, '""')}"`;
  };

  const rows = submissions.map((s) => [
    escapeCSV(s.id),
    escapeCSV(s.formSlug),
    escapeCSV(s.formTitle),
    escapeCSV(s.projectName || ""),
    escapeCSV(s.clientName || ""),
    escapeCSV(s.status),
    escapeCSV(s.createdAt),
    escapeCSV(s.updatedAt),
    escapeCSV(s.data),
  ]);

  return [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
}
