"use client";

import React from "react";
import { HeaderField } from "@/lib/types";

interface FormHeaderProps {
  title: string;
  subtitle?: string;
  metaFields: HeaderField[];
  metaValues: Record<string, any>;
  onChange?: (key: string, value: any) => void;
  readOnly?: boolean;
}

export const FormHeader: React.FC<FormHeaderProps> = ({
  title,
  subtitle = "ReFarm Global",
  metaFields,
  metaValues,
  onChange,
  readOnly = false,
}) => {
  return (
    <div className="doc-header">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3.5 mb-5">
        <div className="bg-white px-2.5 py-1.5 rounded-lg shadow-sm inline-flex items-center flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/refarm-logo.png"
            alt="ReFarm Global"
            className="h-6 sm:h-7 w-auto object-contain max-w-[120px]"
          />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-wide m-0 text-white">
            {title}
          </h1>
          <div className="text-xs uppercase tracking-widest text-emerald-100 opacity-90 mt-0.5">
            {subtitle}
          </div>
        </div>
      </div>

      {metaFields && metaFields.length > 0 && (
        <div
          className={`grid gap-3 md:gap-4 mt-5 ${
            metaFields.length <= 4
              ? "grid-cols-1 sm:grid-cols-2"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {metaFields.map((field) => {
            const val = metaValues[field.key] ?? "";
            return (
              <div key={field.key} className="meta-field">
                <label className="block text-[11px] uppercase tracking-wider text-emerald-100 opacity-90 mb-1 font-medium">
                  {field.label}
                </label>
                {readOnly ? (
                  <div className="w-full bg-white/10 border border-white/20 rounded-md px-2.5 py-1.5 text-white text-sm min-h-[34px] flex items-center">
                    {val || "—"}
                  </div>
                ) : (
                  <input
                    type={field.type || "text"}
                    value={val}
                    onChange={(e) => onChange?.(field.key, e.target.value)}
                    placeholder={field.placeholder || ""}
                    className="w-full bg-white/15 border border-white/30 rounded-md px-2.5 py-1.5 text-white text-sm placeholder:text-white/60 focus:outline-none focus:border-white focus:bg-white/25 transition"
                  />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
