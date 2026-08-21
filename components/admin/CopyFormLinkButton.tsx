"use client";

import React, { useState } from "react";
import { Link2, Check } from "lucide-react";

interface CopyFormLinkButtonProps {
  slug: string;
  formTitle: string;
}

export const CopyFormLinkButton: React.FC<CopyFormLinkButtonProps> = ({
  slug,
  formTitle,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const url = `${origin}/${slug}`;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url);
      } else {
        // Fallback for non-secure or older contexts
        const textarea = document.createElement("textarea");
        textarea.value = url;
        textarea.style.position = "fixed";
        textarea.style.left = "-999999px";
        textarea.style.top = "-999999px";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`Copy link to ${formTitle} form`}
      title={`Copy public link to ${formTitle}`}
      className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-md transition duration-150 focus:outline-none focus:ring-2 focus:ring-[#2f9e44] focus:ring-offset-1 ${
        copied
          ? "bg-[#14532d] text-white"
          : "bg-white text-[#1b6b3a] hover:bg-[#e6f4ea] hover:text-[#14532d] border border-[#d3ded7] hover:border-[#2f9e44]"
      }`}
    >
      {copied ? (
        <>
          <Check className="w-3 h-3 text-[#a7e0b4]" />
          <span>Copied ✓</span>
        </>
      ) : (
        <>
          <Link2 className="w-3 h-3 text-[#2f9e44]" />
          <span>Copy link</span>
        </>
      )}
    </button>
  );
};
