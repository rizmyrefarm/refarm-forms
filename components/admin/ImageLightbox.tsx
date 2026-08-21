"use client";

import React, { useEffect, useRef } from "react";
import { X, Download, ExternalLink } from "lucide-react";

interface ImageLightboxProps {
  src: string;
  alt: string;
  onClose: () => void;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  src,
  alt,
  onClose,
}) => {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Save previously focused element to restore focus on close
    previouslyFocusedElementRef.current = document.activeElement as HTMLElement;

    // Focus close button
    closeBtnRef.current?.focus();

    // Prevent body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Handle Esc key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      // Return focus to thumbnail
      previouslyFocusedElementRef.current?.focus();
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Image preview for ${alt}`}
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center p-4 sm:p-6 no-print animate-fade-in"
      onClick={onClose}
    >
      {/* Top action bar */}
      <div
        className="w-full max-w-4xl flex items-center justify-between text-white pb-3 mb-2 border-b border-white/20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 max-w-md truncate">
          <span className="text-sm font-semibold truncate text-gray-200">
            {alt}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            download={alt}
            className="p-1.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition"
            title="Download or open original"
            aria-label="Download image"
          >
            <Download className="w-4 h-4" />
          </a>

          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            className="p-1.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-emerald-400"
            title="Close (Esc)"
            aria-label="Close image preview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Enlarged image container */}
      <div
        className="relative max-h-[85vh] max-w-[90vw] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="max-h-[80vh] max-w-[90vw] object-contain rounded-lg shadow-2xl border border-white/10"
        />
      </div>
    </div>
  );
};
