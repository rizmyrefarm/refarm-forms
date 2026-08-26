"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SavedSubmission } from "@/lib/types";
import { formatDateTime, generateCSV } from "@/lib/utils";
import { Eye, Edit, Trash2, Download, FileText, Plus, Printer } from "lucide-react";

interface Props {
  formSlug: string;
  formTitle: string;
  initialSubmissions: SavedSubmission[];
}

export const FormSubmissionsTable: React.FC<Props> = ({
  formSlug,
  formTitle,
  initialSubmissions,
}) => {
  const [submissions, setSubmissions] = useState<SavedSubmission[]>(initialSubmissions);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!window.confirm("Are you sure you want to permanently delete this submission?")) {
      return;
    }

    try {
      const res = await fetch(`/api/submissions/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setSubmissions((prev) => prev.filter((s) => s.id !== id));
      } else {
        alert("Failed to delete submission.");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting submission.");
    }
  };

  const handleExportCSV = () => {
    if (submissions.length === 0) return;
    const csvContent = generateCSV(submissions);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `refarm_${formSlug}_submissions_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="text-xs text-[#5b6b60]">
          Showing <b>{submissions.length}</b> {submissions.length === 1 ? "submission" : "submissions"} (newest first)
        </div>

        <div className="flex items-center gap-2">
          {submissions.length > 0 && (
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 bg-white border border-[#b7c7bd] hover:border-[#2f9e44] text-[#14532d] text-xs font-semibold px-3 py-1.5 rounded-lg transition shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          )}

          <Link
            href={`/${formSlug}`}
            className="inline-flex items-center gap-1.5 bg-[#2f9e44] hover:bg-[#268a3a] text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Submission</span>
          </Link>
        </div>
      </div>

      {/* Submissions Table / Empty State */}
      <div className="bg-white border border-[#d3ded7] rounded-xl shadow-sm overflow-hidden">
        {submissions.length === 0 ? (
          <div className="py-16 text-center space-y-3 px-4">
            <FileText className="w-10 h-10 text-gray-300 mx-auto" />
            <div className="text-sm font-semibold text-gray-700">
              No submissions yet for this form.
            </div>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              Any submissions filled through the digital form will appear here, sorted by date with full drill-down.
            </p>
            <div className="pt-2">
              <Link
                href={`/${formSlug}`}
                className="inline-flex items-center gap-1.5 bg-[#14532d] text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-emerald-900 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Open Blank Form</span>
              </Link>
            </div>
          </div>
        ) : (
          <>
          {/* Desktop table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#f2f9f4] border-b border-[#d3ded7] text-[#14532d] uppercase tracking-wider text-[11px] font-bold">
                  <th className="px-4 py-3">Project</th>
                  <th className="px-4 py-3">Client</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Submitted Date/Time</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {submissions.map((sub) => (
                  <tr
                    key={sub.id}
                    className="hover:bg-emerald-50/40 transition group cursor-pointer"
                    onClick={() => (window.location.href = `/admin/${sub.id}`)}
                  >
                    <td className="px-4 py-3 font-semibold text-[#14532d] group-hover:text-emerald-700">
                      {sub.projectName || <span className="text-gray-400 font-normal italic">—</span>}
                    </td>
                    <td className="px-4 py-3 text-gray-800">
                      {sub.clientName || <span className="text-gray-400 italic">—</span>}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10.5px] font-semibold uppercase bg-[#e6f4ea] text-[#14532d] border border-[#2f9e44]/30">
                        {sub.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-[11.5px] whitespace-nowrap">
                      {formatDateTime(sub.createdAt)}
                    </td>
                    <td className="px-4 py-3 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/admin/${sub.id}`} className="p-1.5 text-gray-600 hover:text-[#14532d] hover:bg-emerald-50 rounded transition" title="View submission" aria-label="View submission"><Eye className="w-3.5 h-3.5" /></Link>
                        <Link href={`/admin/${sub.id}/print`} className="p-1.5 text-gray-600 hover:text-[#14532d] hover:bg-emerald-50 rounded transition" title="Print submission" aria-label="Print submission"><Printer className="w-3.5 h-3.5" /></Link>
                        <Link href={`/admin/${sub.id}/edit`} className="p-1.5 text-gray-600 hover:text-[#14532d] hover:bg-emerald-50 rounded transition" title="Edit submission" aria-label="Edit submission"><Edit className="w-3.5 h-3.5" /></Link>
                        <button type="button" onClick={(e) => handleDelete(sub.id, e)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition" title="Delete submission" aria-label="Delete submission"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile card layout */}
          <div className="sm:hidden divide-y divide-[#d3ded7]">
            {submissions.map((sub) => (
              <div
                key={sub.id}
                className="p-3.5 hover:bg-emerald-50/40 active:bg-[#e6f4ea] transition cursor-pointer"
                onClick={() => (window.location.href = `/admin/${sub.id}`)}
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-[13px] text-[#14532d] truncate">
                      {sub.projectName || <span className="text-gray-400 font-normal italic">—</span>}
                    </div>
                    <div className="text-xs text-gray-600 truncate mt-0.5">
                      {sub.clientName || <span className="text-gray-400 italic">No client</span>}
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-[#e6f4ea] text-[#14532d] border border-[#2f9e44]/30 flex-shrink-0">
                    {sub.status}
                  </span>
                </div>
                <div className="text-[11px] text-gray-500 mb-2">
                  {formatDateTime(sub.createdAt)}
                </div>
                <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                  <Link href={`/admin/${sub.id}`} className="p-1.5 text-gray-500 hover:text-[#14532d] hover:bg-emerald-50 rounded transition" title="View" aria-label="View submission"><Eye className="w-4 h-4" /></Link>
                  <Link href={`/admin/${sub.id}/print`} className="p-1.5 text-gray-500 hover:text-[#14532d] hover:bg-emerald-50 rounded transition" title="Print" aria-label="Print submission"><Printer className="w-4 h-4" /></Link>
                  <Link href={`/admin/${sub.id}/edit`} className="p-1.5 text-gray-500 hover:text-[#14532d] hover:bg-emerald-50 rounded transition" title="Edit" aria-label="Edit submission"><Edit className="w-4 h-4" /></Link>
                  <button type="button" onClick={(e) => handleDelete(sub.id, e)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition" title="Delete" aria-label="Delete submission"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
          </>
        )}
      </div>
    </div>
  );
};
