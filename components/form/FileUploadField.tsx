"use client";

import React, { useState, useRef } from "react";
import { Upload, FileText, X, Download, ExternalLink, Loader2 } from "lucide-react";

export interface FileData {
  name: string;
  url: string;
  size?: number;
}

interface FileUploadFieldProps {
  value?: FileData | string | null;
  onChange?: (val: FileData | null) => void;
  disabled?: boolean;
  readOnly?: boolean;
  label?: string;
}

export const FileUploadField: React.FC<FileUploadFieldProps> = ({
  value,
  onChange,
  disabled = false,
  readOnly = false,
  label,
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fileData: FileData | null =
    typeof value === "string" && value.length > 0
      ? { name: value.split("/").pop() || value, url: value }
      : value && typeof value === "object" && "name" in value
      ? (value as FileData)
      : null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to upload file");
      }

      const data = await res.json();
      onChange?.({
        name: file.name,
        url: data.url,
        size: file.size,
      });
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Upload error");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemove = () => {
    onChange?.(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  if (readOnly) {
    if (!fileData) {
      return <div className="text-xs italic text-gray-500 py-1">No file attached</div>;
    }
    return (
      <div className="flex items-center gap-2 py-1">
        <FileText className="w-4 h-4 text-emerald-700 flex-shrink-0" />
        <a
          href={fileData.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-emerald-800 hover:underline inline-flex items-center gap-1"
        >
          <span>{fileData.name}</span>
          <ExternalLink className="w-3 h-3 no-print" />
        </a>
      </div>
    );
  }

  return (
    <div className="mt-1">
      {label && <label className="block text-xs font-semibold text-emerald-900 mb-1.5">{label}</label>}

      <div className="flex items-center gap-2.5 flex-wrap">
        {!fileData && (
          <label
            className={`file-btn inline-flex items-center gap-1.5 bg-[#e6f4ea] text-[#14532d] border border-dashed border-[#2f9e44] hover:bg-[#2f9e44] hover:text-white rounded-lg px-3 py-2 text-xs font-semibold cursor-pointer transition ${
              disabled || uploading ? "opacity-50 pointer-events-none cursor-not-allowed" : ""
            }`}
          >
            {uploading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <Upload className="w-3.5 h-3.5" />
                <span>Choose file</span>
              </>
            )}
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              disabled={disabled || uploading}
              className="hidden"
            />
          </label>
        )}

        {fileData ? (
          <div className="flex items-center gap-2 bg-[#f2f9f4] border border-[#d3ded7] px-3 py-1.5 rounded-lg text-xs">
            <FileText className="w-3.5 h-3.5 text-[#14532d]" />
            <a
              href={fileData.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#14532d] hover:underline max-w-[240px] sm:max-w-xs truncate"
            >
              {fileData.name}
            </a>
            {!disabled && (
              <button
                type="button"
                onClick={handleRemove}
                className="text-red-500 hover:text-red-700 ml-1 p-0.5 rounded hover:bg-red-50 no-print"
                title="Remove file"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        ) : (
          <div className="text-xs text-gray-500 italic py-1 no-print">
            {uploading ? "Uploading..." : "No file chosen"}
          </div>
        )}
      </div>

      {error && <div className="text-[11px] text-red-600 mt-1">{error}</div>}
    </div>
  );
};
