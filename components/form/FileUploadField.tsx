"use client";

import React, { useState, useRef } from "react";
import { Upload, FileText, X, ExternalLink, Loader2, Image as ImageIcon } from "lucide-react";
import { isImageFile } from "@/lib/utils";
import { ImageLightbox } from "../admin/ImageLightbox";

export interface FileData {
  name: string;
  url: string;
  size?: number;
}

interface FileUploadFieldProps {
  value?: FileData | string | Array<FileData | string> | null;
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
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Normalize single or array values
  const fileList: FileData[] = Array.isArray(value)
    ? value.map((v) =>
        typeof v === "string" ? { name: v.split("/").pop() || v, url: v } : (v as FileData)
      )
    : value
    ? [
        typeof value === "string"
          ? { name: value.split("/").pop() || value, url: value }
          : (value as FileData),
      ]
    : [];

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
    if (fileList.length === 0) {
      return <div className="text-xs italic text-gray-500 py-1">No file attached</div>;
    }

    return (
      <div className="space-y-3 py-1">
        {fileList.map((file, idx) => {
          const isImg = isImageFile(file.name || file.url);

          return (
            <div key={idx} className="break-inside-avoid">
              {isImg ? (
                <div>
                  {/* Screen view: Clickable thumbnail with Lightbox */}
                  <div className="no-print">
                    <button
                      type="button"
                      onClick={() => setLightboxImage({ src: file.url, alt: file.name })}
                      className="group relative inline-block rounded-lg overflow-hidden border border-[#b7c7bd] hover:border-[#2f9e44] focus:outline-none focus:ring-2 focus:ring-[#2f9e44] transition shadow-sm bg-[#f2f9f4]"
                      title={`Click to view full image: ${file.name}`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={file.url}
                        alt={file.name}
                        className="w-24 h-24 sm:w-28 sm:h-28 object-cover group-hover:scale-105 transition duration-200"
                        onError={(e) => {
                          // Fallback to text icon if image fails
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 flex items-center justify-center transition">
                        <ImageIcon className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 drop-shadow" />
                      </div>
                    </button>
                    <div className="text-[11px] font-medium text-[#14532d] mt-1 truncate max-w-xs">
                      {file.name}
                    </div>
                  </div>

                  {/* Print view: Inline embedded image (max ~11cm wide) */}
                  <div className="hidden print:block print-image-container break-inside-avoid">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={file.url}
                      alt={file.name}
                      style={{
                        maxWidth: "420px",
                        width: "auto",
                        maxHeight: "280px",
                        objectFit: "contain",
                        borderRadius: "4px",
                        border: "1px solid #d3ded7",
                        WebkitPrintColorAdjust: "exact",
                        printColorAdjust: "exact",
                      }}
                    />
                    <div className="text-[10px] text-gray-700 italic mt-1">
                      {file.name}
                    </div>
                  </div>
                </div>
              ) : (
                /* Non-image file (PDF / DOCX / etc.) */
                <div>
                  <div className="flex items-center gap-2 py-1 no-print">
                    <FileText className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-emerald-800 hover:underline inline-flex items-center gap-1"
                    >
                      <span>{file.name}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  {/* Print view: Plain text file label */}
                  <div className="hidden print:block text-xs text-black">
                    <span className="font-semibold">Attached File: </span>
                    <span>{file.name}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {lightboxImage && (
          <ImageLightbox
            src={lightboxImage.src}
            alt={lightboxImage.alt}
            onClose={() => setLightboxImage(null)}
          />
        )}
      </div>
    );
  }

  // Interactive Form Upload Mode
  const singleFile = fileList[0];
  const isImg = singleFile && isImageFile(singleFile.name || singleFile.url);

  return (
    <div className="mt-1">
      {label && (
        <label className="block text-xs font-semibold text-emerald-900 mb-1.5">
          {label}
        </label>
      )}

      <div className="flex items-center gap-2.5 flex-wrap">
        {!singleFile && (
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

        {singleFile ? (
          <div className="flex items-center gap-2 bg-[#f2f9f4] border border-[#d3ded7] px-3 py-1.5 rounded-lg text-xs">
            {isImg ? (
              <button
                type="button"
                onClick={() => setLightboxImage({ src: singleFile.url, alt: singleFile.name })}
                className="flex items-center gap-1.5 hover:opacity-80 transition"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={singleFile.url}
                  alt={singleFile.name}
                  className="w-6 h-6 object-cover rounded border border-emerald-300"
                />
                <span className="font-medium text-[#14532d] hover:underline max-w-[220px] truncate">
                  {singleFile.name}
                </span>
              </button>
            ) : (
              <>
                <FileText className="w-3.5 h-3.5 text-[#14532d]" />
                <a
                  href={singleFile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[#14532d] hover:underline max-w-[220px] sm:max-w-xs truncate"
                >
                  {singleFile.name}
                </a>
              </>
            )}

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

      {/* Inline print embedding when form itself is printed */}
      {singleFile && (
        <div className="hidden print:block print-image-container mt-2 break-inside-avoid">
          {isImg ? (
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={singleFile.url}
                alt={singleFile.name}
                style={{
                  maxWidth: "420px",
                  width: "auto",
                  maxHeight: "280px",
                  objectFit: "contain",
                  borderRadius: "4px",
                  border: "1px solid #d3ded7",
                  WebkitPrintColorAdjust: "exact",
                  printColorAdjust: "exact",
                }}
              />
              <div className="text-[10px] text-gray-700 italic mt-0.5">{singleFile.name}</div>
            </div>
          ) : (
            <div className="text-xs text-black">
              <span className="font-semibold">Attached File: </span>
              <span>{singleFile.name}</span>
            </div>
          )}
        </div>
      )}

      {error && <div className="text-[11px] text-red-600 mt-1">{error}</div>}

      {lightboxImage && (
        <ImageLightbox
          src={lightboxImage.src}
          alt={lightboxImage.alt}
          onClose={() => setLightboxImage(null)}
        />
      )}
    </div>
  );
};
