"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { FormDefinition, SavedSubmission, FormField } from "@/lib/types";
import { formatDateTime, isImageFile } from "@/lib/utils";
import { ArrowLeft, Printer } from "lucide-react";

interface Props {
  submission: SavedSubmission;
  formDef: FormDefinition;
}

export const CleanPrintDocument: React.FC<Props> = ({ submission, formDef }) => {
  const formData = submission.data || { meta: {}, fields: {}, tables: {} };

  // Auto-trigger window.print() on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      window.print();
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const renderSingleFile = (fileObj: any) => {
    if (!fileObj) return "—";

    const name = typeof fileObj === "object" && fileObj.name ? fileObj.name : String(fileObj).split("/").pop() || String(fileObj);
    const url = typeof fileObj === "object" && fileObj.url ? fileObj.url : String(fileObj);
    const isImg = isImageFile(name || url);

    if (isImg && url) {
      return (
        <div className="my-2 break-inside-avoid print:break-inside-avoid">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={url}
            alt={name}
            style={{
              maxWidth: "420px",
              width: "auto",
              maxHeight: "280px",
              objectFit: "contain",
              borderRadius: "4px",
              border: "1px solid #000",
              WebkitPrintColorAdjust: "exact",
              printColorAdjust: "exact",
            }}
            onError={(e) => {
              // Graceful fallback to text if image cannot be loaded
              (e.target as HTMLElement).style.display = "none";
            }}
          />
          <div className="text-[10px] text-gray-700 italic mt-1 font-mono">
            {name}
          </div>
        </div>
      );
    }

    return (
      <div className="text-xs text-gray-900">
        <span className="font-semibold">Attached File: </span>
        <span>{name}</span>
        {url && url.startsWith("http") && (
          <span className="text-[10.5px] text-gray-600 block font-mono mt-0.5">{url}</span>
        )}
      </div>
    );
  };

  const renderFieldValue = (field: FormField) => {
    const val = formData.fields?.[field.key];

    if (field.type === "multi") {
      if (Array.isArray(val) && val.length > 0) {
        return val.join(", ");
      }
      return "—";
    }

    if (field.type === "file") {
      if (Array.isArray(val)) {
        if (val.length === 0) return "—";
        return (
          <div className="space-y-2">
            {val.map((f, i) => (
              <div key={i}>{renderSingleFile(f)}</div>
            ))}
          </div>
        );
      }
      return renderSingleFile(val);
    }

    if (field.type === "table" && field.tableConfig) {
      const rows = formData.tables?.[field.key] || field.tableConfig.initialRows || [];
      if (rows.length === 0) return "—";

      return (
        <div className="my-2 overflow-x-auto">
          <table className="w-full border-collapse border border-black text-[11px]">
            <thead>
              <tr className="bg-gray-100 border-b border-black">
                {field.tableConfig.columns.map((col) => (
                  <th
                    key={col.key}
                    className="border border-black px-2 py-1.5 text-left font-bold text-black"
                    style={{ width: col.width }}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rIdx) => (
                <tr key={rIdx} className="border-b border-black break-inside-avoid">
                  {field.tableConfig?.columns.map((col) => {
                    const cellVal = row[col.key];

                    if (col.type === "checkbox") {
                      return (
                        <td key={col.key} className="border border-black px-2 py-1.5 align-top text-black">
                          {cellVal ? "[✓] Yes" : "[ ] No"}
                        </td>
                      );
                    }

                    if (col.type === "file") {
                      if (!cellVal) {
                        return (
                          <td key={col.key} className="border border-black px-2 py-1.5 align-top text-gray-500 italic">
                            —
                          </td>
                        );
                      }

                      const name = typeof cellVal === "object" && cellVal.name ? cellVal.name : String(cellVal).split("/").pop() || String(cellVal);
                      const url = typeof cellVal === "object" && cellVal.url ? cellVal.url : String(cellVal);
                      const isImg = isImageFile(name || url);

                      return (
                        <td key={col.key} className="border border-black px-2 py-1.5 align-top text-black">
                          {isImg && url ? (
                            <div className="my-1">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={url}
                                alt={name}
                                style={{
                                  maxWidth: "180px",
                                  width: "auto",
                                  maxHeight: "120px",
                                  objectFit: "contain",
                                  borderRadius: "2px",
                                  border: "1px solid #000",
                                  WebkitPrintColorAdjust: "exact",
                                  printColorAdjust: "exact",
                                }}
                                onError={(e) => {
                                  (e.target as HTMLElement).style.display = "none";
                                }}
                              />
                              <div className="text-[9.5px] text-gray-700 italic mt-0.5 truncate max-w-[180px]">{name}</div>
                            </div>
                          ) : (
                            <span className="text-xs">{name}</span>
                          )}
                        </td>
                      );
                    }

                    return (
                      <td key={col.key} className="border border-black px-2 py-1.5 align-top text-black">
                        {cellVal !== undefined && cellVal !== null && cellVal !== "" ? String(cellVal) : "—"}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (field.type === "sign-block" && field.signCards) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
          {field.signCards.map((card, cIdx) => (
            <div key={cIdx} className="border border-black p-3 rounded break-inside-avoid">
              <div className="font-bold border-b border-black pb-1 mb-2 uppercase text-xs">
                {card.title}
              </div>
              {card.fields.map((f) => (
                <div key={f.key} className="text-xs mb-1.5">
                  <span className="font-semibold">{f.label}: </span>
                  <span>{formData.fields?.[f.key] || "—"}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      );
    }

    if (field.type === "note") {
      return (
        <div className="text-xs italic border-l-2 border-black pl-3 py-1 my-1 text-gray-800">
          {field.staticContent}
        </div>
      );
    }

    if (val !== undefined && val !== null && val !== "") {
      return String(val);
    }

    return "—";
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans antialiased p-4 sm:p-8">
      {/* Screen-only top action bar (hidden on print) */}
      <div className="max-w-4xl mx-auto mb-6 pb-3 border-b border-gray-200 flex items-center justify-between no-print">
        <Link
          href={`/admin/forms/${formDef.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 hover:text-black bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Submissions</span>
        </Link>

        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-1.5 bg-black text-white text-xs font-semibold px-4 py-1.5 rounded hover:bg-gray-800 transition shadow-sm"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print Document</span>
        </button>
      </div>

      {/* Printable Document (Plain Black & White, Inline Embedded Images) */}
      <article className="max-w-4xl mx-auto text-black">
        {/* Document Header */}
        <header className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-black mb-1.5">
            {formDef.title}
          </h1>
          <div className="text-xs text-gray-800 flex flex-wrap items-center gap-y-1 gap-x-2 font-medium">
            <span>
              <b>Project:</b> {submission.projectName || "—"}
            </span>
            <span>·</span>
            <span>
              <b>Client:</b> {submission.clientName || "—"}
            </span>
            <span>·</span>
            <span>
              <b>Status:</b> {submission.status}
            </span>
            <span>·</span>
            <span>
              <b>Submitted:</b> {formatDateTime(submission.createdAt)}
            </span>
            {submission.updatedAt &&
              new Date(submission.updatedAt).getTime() - new Date(submission.createdAt).getTime() > 1000 && (
                <>
                  <span>·</span>
                  <span>
                    <b>Last Edited:</b> {formatDateTime(submission.updatedAt)}
                  </span>
                </>
              )}
            <span>·</span>
            <span>
              <b>Record ID:</b> {submission.id}
            </span>
          </div>
          <hr className="border-t border-black my-3" />
        </header>

        {/* Metadata Fields */}
        {formDef.metaFields && formDef.metaFields.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 mb-6 pb-4 border-b border-gray-300 text-xs">
            {formDef.metaFields.map((f) => (
              <div key={f.key}>
                <span className="font-bold">{f.label}: </span>
                <span>{formData.meta?.[f.key] || "—"}</span>
              </div>
            ))}
          </div>
        )}

        {/* Form Sections */}
        <div className="space-y-6">
          {formDef.sections.map((section, sIdx) => (
            <section key={section.id || sIdx} className="page-section">
              <div className="flex items-center justify-between border-b border-black pb-1 mb-3">
                <h2 className="text-sm font-bold uppercase tracking-wider text-black">
                  {section.title}
                </h2>
                {section.badge && (
                  <span className="text-[10px] font-semibold uppercase tracking-wider border border-black px-1.5 py-0.5 rounded">
                    {section.badge}
                  </span>
                )}
              </div>

              <div className="space-y-3">
                {section.fields.map((field) => (
                  <div key={field.key} className="text-xs break-inside-avoid">
                    {field.type !== "table" && field.type !== "sign-block" && field.type !== "note" ? (
                      <div className="flex flex-col sm:flex-row sm:items-baseline gap-1">
                        <span className="font-bold text-gray-900 min-w-[220px]">
                          {field.label || field.placeholder || field.key}:
                        </span>
                        <span className="text-gray-900 whitespace-pre-wrap flex-1">
                          {renderFieldValue(field)}
                        </span>
                      </div>
                    ) : (
                      <div>
                        {field.label && (
                          <div className="font-bold text-gray-900 mb-1">
                            {field.label}:
                          </div>
                        )}
                        {renderFieldValue(field)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Plain Footer */}
        {formDef.footerText && (
          <footer className="mt-8 pt-4 border-t border-gray-300 text-[10.5px] text-gray-600 text-center">
            {formDef.footerText}
          </footer>
        )}
      </article>

      {/* Global Print Stylesheet */}
      <style jsx global>{`
        @media print {
          @page {
            margin: 15mm 15mm 15mm 15mm;
            size: auto;
          }
          body {
            background: #fff !important;
            color: #000 !important;
            font-size: 11pt !important;
          }
          .no-print {
            display: none !important;
          }
          a {
            color: #000 !important;
            text-decoration: none !important;
          }
          table {
            page-break-inside: avoid;
          }
          .page-section {
            page-break-inside: avoid;
          }
          img {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
        }
      `}</style>
    </div>
  );
};
