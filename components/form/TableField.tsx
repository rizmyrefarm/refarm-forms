"use client";

import React from "react";
import { TableConfig } from "@/lib/types";
import { Trash2, Plus } from "lucide-react";
import { FileUploadField } from "./FileUploadField";

interface TableFieldProps {
  config: TableConfig;
  rows: Record<string, any>[];
  onChange?: (rows: Record<string, any>[]) => void;
  disabled?: boolean;
  readOnly?: boolean;
}

export const TableField: React.FC<TableFieldProps> = ({
  config,
  rows,
  onChange,
  disabled = false,
  readOnly = false,
}) => {
  const currentRows = rows && rows.length > 0 ? rows : (config.initialRows || []);

  const handleCellChange = (rowIndex: number, colKey: string, val: any) => {
    if (disabled || readOnly) return;
    const newRows = [...currentRows];
    newRows[rowIndex] = { ...newRows[rowIndex], [colKey]: val };
    onChange?.(newRows);
  };

  const handleAddRow = () => {
    if (disabled || readOnly) return;
    const newRow: Record<string, any> = {};
    config.columns.forEach((c) => {
      newRow[c.key] = "";
    });
    onChange?.([...currentRows, newRow]);
  };

  const handleRemoveRow = (rowIndex: number) => {
    if (disabled || readOnly) return;
    const newRows = currentRows.filter((_, i) => i !== rowIndex);
    onChange?.(newRows);
  };

  return (
    <div className="mt-2 overflow-x-auto">
      <table className="refarm-table">
        <thead>
          <tr>
            {config.columns.map((col) => (
              <th
                key={col.key}
                style={{ width: col.width }}
                className="bg-[#f2f9f4] text-[#14532d] text-left font-bold text-[11px] uppercase tracking-wider px-2.5 py-2 border border-[#d3ded7]"
              >
                {col.label}
              </th>
            ))}
            {!readOnly && config.allowAddRemove && (
              <th className="w-9 text-center border border-[#d3ded7] row-tools no-print"></th>
            )}
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row, rowIndex) => (
            <tr key={rowIndex} className="even:bg-[#fbfdfb] hover:bg-emerald-50/30 transition">
              {config.columns.map((col) => {
                const cellVal = row[col.key] ?? "";
                const isColReadOnly = col.readOnly || readOnly || disabled;

                return (
                  <td
                    key={col.key}
                    className={`border border-[#d3ded7] p-1 align-middle ${
                      col.readOnly ? "label-cell bg-[#f2f9f4] font-semibold text-[#14532d]" : ""
                    }`}
                  >
                    {isColReadOnly ? (
                      col.type === "checkbox" ? (
                        <div className="flex items-center justify-center p-1">
                          <input
                            type="checkbox"
                            checked={Boolean(cellVal)}
                            disabled
                            className="w-4 h-4 accent-[#2f9e44]"
                          />
                        </div>
                      ) : col.type === "file" ? (
                        <FileUploadField value={cellVal} readOnly />
                      ) : (
                        <div className="px-2 py-1 text-xs text-[#1a1f1c] min-h-[28px] flex items-center">
                          {cellVal !== "" && cellVal !== undefined && cellVal !== null
                            ? String(cellVal)
                            : "—"}
                        </div>
                      )
                    ) : col.type === "textarea" ? (
                      <textarea
                        value={cellVal}
                        onChange={(e) => handleCellChange(rowIndex, col.key, e.target.value)}
                        placeholder={col.placeholder || ""}
                        disabled={disabled}
                        rows={1}
                        className="w-full bg-transparent border-0 rounded px-2 py-1 text-xs focus:bg-[#f2f9f4] focus:outline-none resize-y min-h-[32px]"
                      />
                    ) : col.type === "select" ? (
                      <select
                        value={cellVal}
                        onChange={(e) => handleCellChange(rowIndex, col.key, e.target.value)}
                        disabled={disabled}
                        className="w-full bg-transparent border-0 rounded px-2 py-1 text-xs focus:bg-[#f2f9f4] focus:outline-none"
                      >
                        <option value="">Select...</option>
                        {col.options?.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : col.type === "checkbox" ? (
                      <div className="flex items-center justify-center p-1">
                        <input
                          type="checkbox"
                          checked={Boolean(cellVal)}
                          onChange={(e) => handleCellChange(rowIndex, col.key, e.target.checked)}
                          disabled={disabled}
                          className="w-4 h-4 accent-[#2f9e44] cursor-pointer"
                        />
                      </div>
                    ) : col.type === "file" ? (
                      <FileUploadField
                        value={cellVal}
                        onChange={(file) => handleCellChange(rowIndex, col.key, file)}
                        disabled={disabled}
                      />
                    ) : col.type === "date" ? (
                      <input
                        type="date"
                        value={cellVal}
                        onChange={(e) => handleCellChange(rowIndex, col.key, e.target.value)}
                        disabled={disabled}
                        className="w-full bg-transparent border-0 rounded px-2 py-1 text-xs focus:bg-[#f2f9f4] focus:outline-none"
                      />
                    ) : (
                      <input
                        type="text"
                        value={cellVal}
                        onChange={(e) => handleCellChange(rowIndex, col.key, e.target.value)}
                        placeholder={col.placeholder || ""}
                        disabled={disabled}
                        className="w-full bg-transparent border-0 rounded px-2 py-1 text-xs focus:bg-[#f2f9f4] focus:outline-none"
                      />
                    )}
                  </td>
                );
              })}
              {!readOnly && config.allowAddRemove && (
                <td className="w-9 text-center border border-[#d3ded7] row-tools no-print p-0.5">
                  <button
                    type="button"
                    onClick={() => handleRemoveRow(rowIndex)}
                    className="del-row text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded transition inline-flex items-center justify-center"
                    title="Remove row"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {!readOnly && config.allowAddRemove && (
        <button
          type="button"
          onClick={handleAddRow}
          disabled={disabled}
          className="add-row mt-2.5 inline-flex items-center gap-1.5 bg-[#e6f4ea] text-[#14532d] border border-dashed border-[#2f9e44] hover:bg-[#2f9e44] hover:text-white rounded-lg px-3.5 py-1.5 text-xs font-semibold cursor-pointer transition no-print disabled:opacity-50"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{config.addButtonLabel || "+ Add row"}</span>
        </button>
      )}
    </div>
  );
};
