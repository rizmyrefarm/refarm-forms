import { FormDefinition } from "../types";

export const ecofarmPhase03Form: FormDefinition = {
  slug: "ecofarm-phase-0-3",
  title: "EcoFarm Phase 0.3: Feasibility Review & High Management Approval",
  subtitle: "Phase 0.3 · Final Decision & C-Level Sign-off (2–3 Weeks)",
  category: "assessment",
  description: "Consolidate feasibility findings, preliminary CAPEX estimations (AED), financial justification, and C-Level sign-offs.",
  footerText: "ReFarm Global · EcoFarm Phase 0.3 · High Management Approval · Confidential",
  metaFields: [
    { key: "proj_name", label: "Project Name", placeholder: "Full project name" },
    { key: "client_name", label: "Client / Entity", placeholder: "Full entity name" },
    { key: "date", label: "Date", type: "date" },
    { key: "location", label: "Location", placeholder: "Site location & coordinates" },
  ],
  sections: [
    {
      num: "Intro",
      title: "Phase 0.3 Overview",
      hint: "Final executive decision-making and investment clearance framework.",
      fields: [
        {
          key: "phase_03_note",
          type: "note",
          staticContent:
            "Phase 0.3 represents the final assessment and decision-making stage before project initiation. The objective of this phase is to consolidate the technical findings, evaluate project feasibility, estimate the required investment (CAPEX in AED), and obtain approval from high management (C-Level).",
        },
      ],
    },
    {
      num: 1,
      title: "Preliminary CAPEX Assessment",
      hint: "High Management / C-Level estimation of required capital investment across major cost categories (in AED).",
      fields: [
        {
          key: "tbl_capex",
          type: "table",
          tableConfig: {
            columns: [
              { key: "category", label: "Category", width: "35%", placeholder: "Cost category" },
              { key: "cost", label: "Estimated Cost (AED)", width: "25%", placeholder: "e.g. AED 120,000" },
              { key: "notes", label: "Notes & Specifications", placeholder: "Vendor / technical justification" },
            ],
            initialRows: [
              { category: "Site Preparation & Earthworks", cost: "AED 35,000", notes: "Grading and access road levelling" },
              { category: "Irrigation & Water Treatment Upgrades", cost: "AED 65,000", notes: "RePhlo inline integration and storage buffer" },
              { category: "ReFarm Technology & IoT Hardware (RIOT)", cost: "AED 45,000", notes: "Sensor node network and telemetry hub" },
              { category: "Biological Inputs & Soil Conditioning", cost: "AED 50,000", notes: "Initial ReSoil and EcoCropX application package" },
              { category: "Installation, Commissioning & Agronomy", cost: "AED 30,000", notes: "Technical supervision and training" },
              { category: "Contingency (10%)", cost: "AED 22,500", notes: "Operational reserve" },
            ],
            allowAddRemove: true,
            addButtonLabel: "+ Add CAPEX item",
          },
        },
        {
          key: "total_capex",
          label: "Total Estimated CAPEX (AED)",
          type: "text",
          placeholder: "e.g. AED 247,500",
        },
      ],
    },
    {
      num: 2,
      title: "Feasibility Review & Execution Recommendation",
      hint: "Executive summary evaluating technical, financial, operational, and commercial viability.",
      fields: [
        {
          key: "feasibility_summary",
          label: "Executive Feasibility Summary",
          hint: "Provide clear evaluation of ROI, yield projections, payback timeline, and risk tolerance.",
          type: "textarea",
          placeholder: "Summarize feasibility conclusions and strategic merit...",
        },
        {
          key: "execution_model",
          label: "Recommended Project Execution Model",
          type: "single",
          options: [
            "Turnkey Implementation",
            "Phased Trial-to-Commercial",
            "Technology Licensing & Advisory",
            "Shared Savings / Revenue Model",
          ],
        },
      ],
    },
    {
      num: 3,
      title: "High Management Approval & Sign-off",
      hint: "Executive C-Level endorsement confirming budget allocation and project kick-off.",
      fields: [
        {
          key: "mgmt_approvals",
          type: "sign-block",
          signCards: [
            {
              title: "Client High Management Approval",
              fields: [
                { key: "client_c_name", label: "Name", type: "text" },
                { key: "client_c_pos", label: "Position (C-Level / Director)", type: "text" },
                { key: "client_c_sign", label: "Signature", type: "signature-line" },
                { key: "client_c_date", label: "Date", type: "date" },
              ],
            },
            {
              title: "ReFarm High Management Approval",
              fields: [
                { key: "rf_c_name", label: "Name", type: "text" },
                { key: "rf_c_pos", label: "Position (CFO / CEO / Head of Ops)", type: "text" },
                { key: "rf_c_sign", label: "Signature", type: "signature-line" },
                { key: "rf_c_date", label: "Date", type: "date" },
              ],
            },
          ],
        },
      ],
    },
  ],
};
