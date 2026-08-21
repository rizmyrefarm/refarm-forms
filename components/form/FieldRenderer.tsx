"use client";

import React from "react";
import { FormField } from "@/lib/types";
import { isConditionMet, cn } from "@/lib/utils";
import { TableField } from "./TableField";
import { FileUploadField } from "./FileUploadField";

interface FieldRendererProps {
  field: FormField;
  formData: {
    meta: Record<string, any>;
    fields: Record<string, any>;
    tables: Record<string, Record<string, any>[]>;
  };
  onChangeField: (key: string, value: any) => void;
  onChangeTable: (key: string, rows: Record<string, any>[]) => void;
  readOnly?: boolean;
}

export const FieldRenderer: React.FC<FieldRendererProps> = ({
  field,
  formData,
  onChangeField,
  onChangeTable,
  readOnly = false,
}) => {
  const isEnabled = isConditionMet(field.conditional, formData);
  const fieldValue = formData.fields[field.key];
  const tableValue = formData.tables[field.key] || field.tableConfig?.initialRows || [];

  // Conditional off state
  const condClass = isEnabled ? "" : "cond-off";

  const renderChips = (isMulti: boolean) => {
    const options = field.options || [];

    return (
      <div className="choices">
        {options.map((opt) => {
          const optLabel = typeof opt === "string" ? opt : opt.label;
          const optVal = typeof opt === "string" ? opt : opt.value;

          let isChecked = false;
          if (isMulti) {
            isChecked = Array.isArray(fieldValue) && fieldValue.includes(optVal);
          } else {
            isChecked = fieldValue === optVal;
          }

          if (readOnly) {
            return (
              <span
                key={optVal}
                className={cn(
                  "chip text-xs px-3 py-1.5 rounded-lg border",
                  isChecked
                    ? "bg-[#e6f4ea] border-[#2f9e44] text-[#14532d] font-semibold"
                    : "opacity-40 border-gray-200 text-gray-400 no-print"
                )}
              >
                <input
                  type={isMulti ? "checkbox" : "radio"}
                  checked={isChecked}
                  disabled
                  className="w-3.5 h-3.5 accent-[#2f9e44]"
                />
                <span>{optLabel}</span>
              </span>
            );
          }

          return (
            <label
              key={optVal}
              className={cn(
                "chip text-xs px-3.5 py-2 rounded-lg border border-[#b7c7bd] bg-white cursor-pointer transition flex items-center gap-2",
                isChecked ? "checked bg-[#e6f4ea] border-[#2f9e44] text-[#14532d] font-semibold" : "hover:border-[#2f9e44]"
              )}
            >
              <input
                type={isMulti ? "checkbox" : "radio"}
                name={field.key}
                value={optVal}
                checked={isChecked}
                disabled={!isEnabled}
                onChange={(e) => {
                  if (isMulti) {
                    const currentArr = Array.isArray(fieldValue) ? [...fieldValue] : [];
                    if (e.target.checked) {
                      onChangeField(field.key, [...currentArr, optVal]);
                    } else {
                      onChangeField(
                        field.key,
                        currentArr.filter((item) => item !== optVal)
                      );
                    }
                  } else {
                    onChangeField(field.key, optVal);
                  }
                }}
                className="w-3.5 h-3.5 accent-[#2f9e44]"
              />
              <span>{optLabel}</span>
            </label>
          );
        })}
      </div>
    );
  };

  const renderSignCards = () => {
    const cards = field.signCards || [];
    return (
      <div className="sign-grid">
        {cards.map((card, cIdx) => (
          <div key={cIdx} className="sign-card">
            <h4>{card.title}</h4>
            {card.fields.map((f) => {
              const val = formData.fields[f.key] ?? "";
              return (
                <div key={f.key} className="sign-field">
                  <label>{f.label}</label>
                  {f.type === "signature-line" ? (
                    <div className="sign-line flex items-end pb-1 text-xs text-[#14532d] font-medium">
                      {val ? `Signed: ${val}` : ""}
                    </div>
                  ) : readOnly ? (
                    <div className="text-xs font-medium text-[#1a1f1c] py-1 border-b border-gray-200 min-h-[26px]">
                      {val || "—"}
                    </div>
                  ) : (
                    <input
                      type={f.type || "text"}
                      value={val}
                      onChange={(e) => onChangeField(f.key, e.target.value)}
                      disabled={!isEnabled}
                      className="form-input text-xs py-1.5"
                    />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={cn("form-field-wrapper mt-3", condClass)}>
      {field.subhead && <div className="subhead">{field.subhead}</div>}
      {field.label && (
        <label className="block text-xs font-semibold text-[#14532d] mb-1">
          {field.label}
        </label>
      )}
      {field.hint && <p className="hint">{field.hint}</p>}

      {/* Field Types */}
      {field.type === "textarea" ? (
        readOnly ? (
          <div className="bg-gray-50/70 border border-gray-200 rounded-lg p-3 text-xs leading-relaxed min-h-[50px] whitespace-pre-wrap">
            {fieldValue || "—"}
          </div>
        ) : (
          <textarea
            value={fieldValue || ""}
            onChange={(e) => onChangeField(field.key, e.target.value)}
            placeholder={field.placeholder}
            disabled={!isEnabled}
            className="form-textarea"
          />
        )
      ) : field.type === "single" ? (
        renderChips(false)
      ) : field.type === "multi" ? (
        renderChips(true)
      ) : field.type === "table" && field.tableConfig ? (
        <TableField
          config={field.tableConfig}
          rows={tableValue}
          onChange={(newRows) => onChangeTable(field.key, newRows)}
          disabled={!isEnabled}
          readOnly={readOnly}
        />
      ) : field.type === "file" ? (
        <FileUploadField
          value={fieldValue}
          onChange={(val) => onChangeField(field.key, val)}
          disabled={!isEnabled}
          readOnly={readOnly}
        />
      ) : field.type === "note" ? (
        <div className="note-box">{field.staticContent}</div>
      ) : field.type === "sign-block" ? (
        renderSignCards()
      ) : readOnly ? (
        <div className="bg-gray-50/70 border border-gray-200 rounded-lg px-3 py-2 text-xs font-medium text-[#1a1f1c] min-h-[36px] flex items-center">
          {fieldValue !== undefined && fieldValue !== "" ? String(fieldValue) : "—"}
        </div>
      ) : (
        <input
          type={field.type}
          value={fieldValue || ""}
          onChange={(e) => onChangeField(field.key, e.target.value)}
          placeholder={field.placeholder}
          disabled={!isEnabled}
          className="form-input"
        />
      )}
    </div>
  );
};
