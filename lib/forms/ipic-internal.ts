import { FormDefinition } from "../types";

export const ipicInternalForm: FormDefinition = {
  slug: "ipic-internal",
  title: "IPIC Internal",
  subtitle: "Internal Trial Scoping & Multi-Department Review",
  category: "assessment",
  description: "Internal trial qualification covering department alignment, resource budgeting, risk avoidance, and sign-offs.",
  footerText: "ReFarm Global · IPIC Internal · Internal & Confidential",
  metaFields: [
    { key: "proj_name", label: "Project Name", placeholder: "Full project name" },
    { key: "client_name", label: "Client Name", placeholder: "Full name of the client" },
    { key: "trial_client_supervisor", label: "Trial Client Supervisor", placeholder: "Insert supervisor name" },
    { key: "date", label: "Date", type: "date" },
    { key: "location", label: "Location", placeholder: "GPS coordinates, county or Emirate" },
  ],
  sections: [
    {
      num: 1,
      title: "Basic Information",
      hint: "Provide the essential project, client, and contact information required to initiate the trial and identify the key personnel involved.",
      fields: [
        {
          key: "departments",
          label: "Departments Involved",
          type: "multi",
          options: ["Agronomy", "R&D", "Engineers", "Other"],
        },
        {
          key: "dept_other",
          label: "Other Department(s) — please specify",
          type: "text",
          placeholder: "Specify other departments...",
          conditional: { when: "departments", includes: "Other" },
        },
        { key: "poc", label: "Project Point of Contact (POC)", type: "text", gridCols: 2, placeholder: "Insert Name" },
        { key: "key_person", label: "Key Person", type: "text", gridCols: 2, placeholder: "Insert Name" },
        { key: "trial_manager", label: "Trial Manager", type: "text", gridCols: 2, placeholder: "Insert Name" },
        { key: "trial_supervisor", label: "Trial Supervisor", type: "text", gridCols: 2, placeholder: "Insert Name" },
      ],
    },
    {
      num: 2,
      title: "Project Scope",
      hint: "Define the scope of the trial by outlining its objectives, proposed solutions, responsibilities, performance indicators, and trial resources.",
      fields: [
        {
          key: "objectives",
          label: "Objectives",
          hint: "State the main objectives the trial is expected to achieve.",
          type: "textarea",
        },
        {
          key: "proposed_solutions",
          label: "Proposed Products / Solutions / Quantities",
          hint: "List the proposed products or solutions to be used, including the required quantities.",
          type: "textarea",
        },
        {
          key: "refarm_resp",
          label: "Scope of Work (SOW) — ReFarm Responsibilities",
          type: "textarea",
          gridCols: 2,
          placeholder: "List ReFarm tasks and commitments...",
        },
        {
          key: "client_resp",
          label: "Scope of Work (SOW) — Client Responsibilities",
          type: "textarea",
          gridCols: 2,
          placeholder: "List Client tasks and resource provisions...",
        },
        {
          key: "protocol_shared",
          label: "Protocol Shared with Client (Indicate whether the trial protocol has been shared and acknowledged)",
          type: "single",
          options: ["Yes", "No"],
        },
        {
          key: "soil_results",
          label: "Soil Analysis Result",
          hint: "Provide summary of available soil analysis results relevant to the trial site.",
          type: "textarea",
        },
        {
          key: "soil_file",
          label: "Attach Soil Analysis Document",
          type: "file",
        },
        {
          key: "kpis",
          label: "Key Performance Indicators (KPIs)",
          hint: "Define the measurable criteria that will be used to evaluate the success of the trial.",
          type: "textarea",
        },
        {
          key: "trial_products_quantities",
          label: "Product Name / Quantities (for Trial Use)",
          hint: "Specify the products that will be used during the trial and the quantities allocated.",
          type: "textarea",
        },
      ],
    },
    {
      num: 3,
      title: "Initial Assessment",
      hint: "Provide the preliminary planning information required before the trial begins, including timelines, resources, budget considerations, and potential risks.",
      fields: [
        {
          key: "estimated_timeline",
          label: "Estimated Timeline (expected overall duration)",
          type: "text",
          gridCols: 2,
          placeholder: "e.g. 12 weeks / 3 months",
        },
        {
          key: "trial_start_date",
          label: "Trial Start Date (planned start date)",
          type: "date",
          gridCols: 2,
        },
        {
          key: "estimated_budget",
          label: "Estimated Budget (AED, if known)",
          type: "text",
          placeholder: "e.g. AED 45,000",
        },
        {
          key: "resource_needs",
          label: "Resource Needs (Staff, Tools, Partners)",
          hint: "List the personnel, equipment, materials, or external support required to conduct the trial.",
          type: "textarea",
        },
        {
          key: "risks_assumptions",
          label: "Risks & Assumptions",
          hint: "Identify any potential risks, constraints, or assumptions that may affect the trial.",
          type: "textarea",
          gridCols: 2,
        },
        {
          key: "risk_avoidance",
          label: "Risk Avoidance",
          hint: "Describe the actions that will be taken to minimize or manage the identified risks.",
          type: "textarea",
          gridCols: 2,
        },
      ],
    },
    {
      num: 4,
      title: "Decision & Next Steps",
      hint: "Record the recommended course of action for the project and obtain the necessary approvals before proceeding.",
      fields: [
        {
          key: "recommended_action",
          label: "Recommended Action",
          type: "single",
          options: ["Proceed", "Revise", "Hold"],
        },
        {
          key: "decision_notes",
          label: "Decision Comments / Next Step Directives",
          type: "textarea",
          placeholder: "Enter justification or specific prerequisites...",
        },
      ],
    },
    {
      num: 5,
      title: "Approval & Sign-off",
      hint: "The authorized representatives should review the information provided and sign below to confirm their approval or acknowledgement.",
      fields: [
        {
          key: "tbl_signoff",
          type: "table",
          tableConfig: {
            columns: [
              { key: "role", label: "Role", width: "25%", readOnly: true },
              { key: "name", label: "Name", width: "25%", placeholder: "Enter name" },
              { key: "signature", label: "Signature", width: "25%", placeholder: "Sign / Initials" },
              { key: "sign_date", label: "Signature Date", width: "25%", type: "date" },
            ],
            initialRows: [
              { role: "Trial Supervisor", name: "", signature: "", sign_date: "" },
              { role: "Trial Manager", name: "", signature: "", sign_date: "" },
              { role: "POC", name: "", signature: "", sign_date: "" },
              { role: "High Management (CFO)", name: "", signature: "", sign_date: "" },
            ],
            allowAddRemove: false,
            seededRows: true,
          },
        },
      ],
    },
  ],
};
