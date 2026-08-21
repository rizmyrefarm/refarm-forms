"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { FORMS } from "@/lib/forms";
import { SavedSubmission } from "@/lib/types";
import { formatDate, formatDateTime, generateCSV } from "@/lib/utils";
import {
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  RefreshCw,
  FileText,
  Calendar,
  AlertCircle,
  Plus,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default function AdminDashboardPage() {
  const [submissions, setSubmissions] = useState<SavedSubmission[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [selectedForm, setSelectedForm] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const fetchSubmissions = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (selectedForm && selectedForm !== "all") params.append("formSlug", selectedForm);
      if (selectedStatus && selectedStatus !== "all") params.append("status", selectedStatus);
      if (searchQuery.trim()) params.append("search", searchQuery.trim());
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);

      const res = await fetch(`/api/submissions?${params.toString()}`);
      if (!res.ok) {
        throw new Error("Failed to load submissions");
      }
      const data = await res.json();
      setSubmissions(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to load submissions");
    } finally {
      setLoading(false);
    }
  }, [selectedForm, selectedStatus, searchQuery, startDate, endDate]);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!window.confirm("Are you sure you want to delete this submission? This cannot be undone.")) {
      return;
    }

    try {
      const res = await fetch(`/api/submissions/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete");
      }
      setSubmissions((prev) => prev.filter((s) => s.id !== id));
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Delete failed");
    }
  };

  const handleExportCSV = () => {
    if (submissions.length === 0) {
      alert("No submissions to export.");
      return;
    }
    const csvContent = generateCSV(submissions);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `refarm_submissions_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleResetFilters = () => {
    setSelectedForm("all");
    setSelectedStatus("all");
    setSearchQuery("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#eef2ef]">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-[#14532d]">
                Submissions Dashboard
              </h1>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2.5 py-0.5 rounded-full">
                {submissions.length} Total
              </span>
            </div>
            <p className="text-xs text-[#5b6b60] mt-1">
              Review, filter, export, and manage submitted lifecycle form records.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={handleExportCSV}
              disabled={submissions.length === 0}
              className="inline-flex items-center gap-1.5 bg-white border border-[#b7c7bd] hover:border-emerald-600 text-emerald-900 text-xs font-semibold px-3.5 py-2 rounded-lg transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={() => fetchSubmissions()}
              disabled={loading}
              className="inline-flex items-center gap-1.5 bg-white border border-[#b7c7bd] hover:border-emerald-600 text-emerald-900 text-xs font-semibold px-3 py-2 rounded-lg transition shadow-sm"
              title="Refresh submissions"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <Link
              href="/"
              className="inline-flex items-center gap-1.5 bg-[#2f9e44] hover:bg-[#268a3a] text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Submission</span>
            </Link>
          </div>
        </div>

        {/* Filter Controls Card */}
        <div className="bg-white border border-[#d3ded7] rounded-xl p-4 shadow-sm mb-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Search Input */}
            <div>
              <label className="block text-[11px] font-semibold text-[#14532d] uppercase tracking-wider mb-1">
                Search Project / Client
              </label>
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Type project or client..."
                  className="w-full text-xs pl-8 pr-3 py-2 border border-[#b7c7bd] rounded-lg focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                />
              </div>
            </div>

            {/* Form Slug Filter */}
            <div>
              <label className="block text-[11px] font-semibold text-[#14532d] uppercase tracking-wider mb-1">
                Form Type
              </label>
              <select
                value={selectedForm}
                onChange={(e) => setSelectedForm(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-[#b7c7bd] rounded-lg focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 bg-white"
              >
                <option value="all">All 10 Forms</option>
                {FORMS.map((f) => (
                  <option key={f.slug} value={f.slug}>
                    {f.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-[11px] font-semibold text-[#14532d] uppercase tracking-wider mb-1">
                Status
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-[#b7c7bd] rounded-lg focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 bg-white"
              >
                <option value="all">All Statuses</option>
                <option value="submitted">Submitted</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            {/* Date Range Start & End */}
            <div>
              <label className="block text-[11px] font-semibold text-[#14532d] uppercase tracking-wider mb-1">
                Date Range
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full text-[11px] px-2 py-1.5 border border-[#b7c7bd] rounded-lg focus:outline-none focus:border-emerald-600"
                  placeholder="From"
                />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full text-[11px] px-2 py-1.5 border border-[#b7c7bd] rounded-lg focus:outline-none focus:border-emerald-600"
                  placeholder="To"
                />
              </div>
            </div>
          </div>

          {(selectedForm !== "all" || selectedStatus !== "all" || searchQuery || startDate || endDate) && (
            <div className="flex justify-end pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs text-emerald-800 hover:text-emerald-950 font-medium underline"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Submissions Table */}
        <div className="bg-white border border-[#d3ded7] rounded-xl shadow-sm overflow-hidden">
          {error && (
            <div className="p-4 bg-red-50 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}

          {loading ? (
            <div className="py-16 text-center text-xs text-gray-500 flex flex-col items-center justify-center gap-2">
              <RefreshCw className="w-5 h-5 animate-spin text-emerald-600" />
              <span>Loading submissions...</span>
            </div>
          ) : submissions.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <FileText className="w-10 h-10 text-gray-300 mx-auto" />
              <div className="text-sm font-semibold text-gray-700">No submissions found</div>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                No matching submissions match your current filters. Try resetting the filters or submit a new form.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 bg-[#14532d] text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-emerald-900 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create New Form Submission</span>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#f2f9f4] border-b border-[#d3ded7] text-[#14532d] uppercase tracking-wider text-[11px] font-bold">
                    <th className="px-4 py-3">Form Name & Slug</th>
                    <th className="px-4 py-3">Project Name</th>
                    <th className="px-4 py-3">Client / Partner</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Created</th>
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
                      <td className="px-4 py-3 font-medium">
                        <div className="text-[#14532d] font-bold group-hover:text-emerald-700">
                          {sub.formTitle}
                        </div>
                        <div className="text-[10.5px] font-mono text-gray-500">
                          {sub.formSlug}
                        </div>
                      </td>

                      <td className="px-4 py-3 text-gray-800">
                        {sub.projectName || <span className="text-gray-400 italic">—</span>}
                      </td>

                      <td className="px-4 py-3 text-gray-800">
                        {sub.clientName || <span className="text-gray-400 italic">—</span>}
                      </td>

                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10.5px] font-semibold uppercase bg-emerald-100 text-emerald-800">
                          {sub.status}
                        </span>
                      </td>

                      <td className="px-4 py-3 text-gray-600 text-[11.5px] whitespace-nowrap">
                        {formatDateTime(sub.createdAt)}
                      </td>

                      <td className="px-4 py-3 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={`/admin/${sub.id}`}
                            className="p-1.5 text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 rounded transition"
                            title="View submission"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>

                          <Link
                            href={`/admin/${sub.id}/edit`}
                            className="p-1.5 text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 rounded transition"
                            title="Edit submission"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>

                          <button
                            type="button"
                            onClick={(e) => handleDelete(sub.id, e)}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition"
                            title="Delete submission"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
