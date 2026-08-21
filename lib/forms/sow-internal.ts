import { FormDefinition } from "../types";

export const sowInternalForm: FormDefinition = {
  slug: "sow-internal",
  title: "Scope of Work & Responsibility Matrix (Internal)",
  subtitle: "Internal Operations & Accountability Matrix",
  category: "delivery",
  description: "Define key project tasks, assign operational owners, specify deliverables, and track deadlines across teams.",
  footerText: "ReFarm Global · Scope of Work & Responsibility Matrix · Internal Use",
  metaFields: [
    { key: "proj_name", label: "Project Name", placeholder: "Full project name" },
    { key: "client_name", label: "Client / Partner Name", placeholder: "Full name of partner" },
    { key: "date", label: "Date", type: "date" },
    { key: "location", label: "Location / Site", placeholder: "Farm location or facility" },
  ],
  sections: [
    {
      num: 1,
      title: "Scope of Work & Responsibilities",
      hint: "Record each task, assign the responsible person, define the expected deliverable, and track the due date and status.",
      fields: [
        {
          key: "intro_matrix_note",
          type: "note",
          staticContent:
            "This document defines the key project tasks, assigns ownership, and tracks the expected deliverables and completion status. It is intended to ensure clear accountability, alignment, and timely execution of all project activities.",
        },
        {
          key: "tbl_sow_matrix",
          type: "table",
          tableConfig: {
            columns: [
              { key: "task", label: "Task / Scope", width: "35%", type: "textarea", placeholder: "Describe task or work package" },
              { key: "responsible", label: "Responsible Person", width: "22%", placeholder: "Name / Department" },
              { key: "deliverable", label: "Deliverable / Outcome", type: "textarea", placeholder: "Expected deliverable" },
              { key: "due_status", label: "Due Date / Status", width: "20%", placeholder: "e.g. 15 Oct / Ongoing" },
            ],
            initialRows: [
              { task: "", responsible: "", deliverable: "", due_status: "" },
              { task: "", responsible: "", deliverable: "", due_status: "" },
              { task: "", responsible: "", deliverable: "", due_status: "" },
              { task: "", responsible: "", deliverable: "", due_status: "" },
              { task: "", responsible: "", deliverable: "", due_status: "" },
            ],
            allowAddRemove: true,
            addButtonLabel: "+ Add task row",
          },
        },
      ],
    },
  ],
};
