import { FormDefinition } from "../types";

export const challengeCardForm: FormDefinition = {
  slug: "challenge-card",
  title: "Project Challenge Card",
  subtitle: "Incident & Resolution Management",
  category: "monitoring",
  description: "Diagnose on-site issues, document root causes, evaluate resolution options A/B/C, and establish an action plan.",
  footerText: "ReFarm Global · Project Challenge Card · Confidential",
  metaFields: [
    { key: "proj_name", label: "Project Name", placeholder: "Full project name" },
    { key: "client_name", label: "Client Name", placeholder: "Full name of the client" },
    { key: "date", label: "Date", type: "date" },
    { key: "location", label: "Location", placeholder: "GPS coordinates, county or Emirate" },
  ],
  sections: [
    {
      num: 1,
      title: "Basic Information",
      hint: "Provide the essential project, client, and contact information required to identify the trial and the responsible personnel.",
      fields: [
        { key: "trial_supervisor", label: "Trial Supervisor (name)", type: "text", gridCols: 2, placeholder: "Insert name" },
        { key: "trial_manager", label: "Trial Manager (name)", type: "text", gridCols: 2, placeholder: "Insert name" },
        { key: "poc", label: "Point of Contact (name)", type: "text", gridCols: 2, placeholder: "Insert name" },
        { key: "trial_rep", label: "Trial Client Representative", type: "text", gridCols: 2, placeholder: "Name, Designation, Email & Phone" },
      ],
    },
    {
      num: 2,
      title: "Challenge Details",
      hint: "Record the operational details of when and where the challenge occurred.",
      fields: [
        { key: "problem_start_date", label: "Problem Start Date", type: "date", gridCols: 2 },
        { key: "resolution_timeline", label: "Expected Resolution Timeline", type: "text", gridCols: 2, placeholder: "e.g. 5 days / 2 weeks" },
        { key: "problem_location_gps", label: "Problem Location (GPS coordinates / Sector)", type: "text", gridCols: 2, placeholder: "e.g. Block B, Zone 3" },
        { key: "product_used", label: "Product / Solution Used", type: "text", gridCols: 2, placeholder: "e.g. Resoil / ReNox batch 04" },
        {
          key: "responsible_party",
          label: "Responsible Party",
          type: "single",
          options: ["ReFarm Team", "Client Team"],
          gridCols: 2,
        },
        {
          key: "current_status",
          label: "Current Status",
          type: "single",
          options: ["Ongoing", "Completed", "On Hold"],
          gridCols: 2,
        },
      ],
    },
    {
      num: 3,
      title: "Challenge Statement",
      hint: "Clearly describe the issue encountered and explain its impact on the project objectives, deliverables, and key performance indicators.",
      fields: [
        {
          key: "challenge_description",
          label: "Clear, concise description of the challenge",
          type: "textarea",
          placeholder: "Detail the specific operational or technical breakdown...",
        },
        {
          key: "impact",
          label: "Impact on Project (areas affected)",
          type: "multi",
          options: ["Timeline", "Budget", "Quality", "Stakeholders", "Other"],
        },
        {
          key: "impact_other",
          label: "Other Impact — please specify",
          type: "text",
          placeholder: "Specify other impact areas...",
          conditional: { when: "impact", includes: "Other" },
        },
        {
          key: "impact_kpi",
          label: "Impact on Project KPI",
          hint: "Describe how the challenge has affected defined Key Performance Indicators.",
          type: "textarea",
          placeholder: "e.g. 10% reduction in seedling germination speed...",
        },
      ],
    },
    {
      num: 4,
      title: "Root Cause",
      hint: "Identify the underlying cause of the challenge and provide supporting evidence to justify the analysis.",
      fields: [
        {
          key: "underlying_reasons",
          label: "Underlying Reasons For The Issue",
          type: "textarea",
          gridCols: 2,
          placeholder: "Describe primary factors, environmental stress, or mechanical failure...",
        },
        {
          key: "evidence_cause",
          label: "Evidence Supporting The Cause",
          type: "textarea",
          gridCols: 2,
          placeholder: "Measurements, sensor logs, visual symptoms, lab results...",
        },
        {
          key: "challenge_files",
          label: "Attached Photos and Files",
          hint: "Attach any relevant photographs, reports, or supporting documents.",
          type: "file",
        },
      ],
    },
    {
      num: 5,
      title: "Proposed Solution",
      hint: "List all feasible corrective actions that could resolve the identified challenge.",
      fields: [
        { key: "option_a", label: "Option A", type: "textarea", placeholder: "Describe Option A..." },
        { key: "option_b", label: "Option B", type: "textarea", placeholder: "Describe Option B..." },
        { key: "option_c", label: "Option C", type: "textarea", placeholder: "Describe Option C..." },
      ],
    },
    {
      num: 6,
      title: "Recommended Solution",
      hint: "Select the most appropriate solution from the proposed options and justify why it is recommended.",
      fields: [
        {
          key: "selected_option",
          label: "Choose an Option",
          type: "single",
          options: ["Option A", "Option B", "Option C"],
        },
        {
          key: "justification",
          label: "Justify (Why)",
          type: "textarea",
          placeholder: "Explain why this option is superior regarding cost, time, and risk...",
        },
      ],
    },
    {
      num: 7,
      title: "Action Plan",
      hint: "Define the implementation plan for the selected solution, including responsibilities and required actions.",
      fields: [
        {
          key: "action_steps",
          label: "Steps To Implement",
          type: "textarea",
          gridCols: 2,
          placeholder: "Sequence of immediate and follow-up actions...",
        },
        {
          key: "action_responsible",
          label: "Responsible Person(s)",
          type: "textarea",
          gridCols: 2,
          placeholder: "Names and roles of task owners...",
        },
      ],
    },
    {
      num: 8,
      title: "Expected Outcome",
      hint: "Describe the expected results after implementing the recommended solution and assess whether the project can still achieve its objectives.",
      fields: [
        {
          key: "expected_resolution",
          label: "How The Solution Resolves The Challenge",
          type: "textarea",
          placeholder: "Explain the mechanism of recovery and expected crop response...",
        },
        {
          key: "measurable_indicators",
          label: "Measurable Success Indicators (KPIs)",
          type: "textarea",
          placeholder: "Metrics to verify recovery (e.g. soil EC back to normal within 7 days)...",
        },
        {
          key: "will_meet_kpi",
          label: "Will the trial be able to meet the KPI?",
          type: "single",
          options: ["Yes", "No", "Maybe"],
        },
      ],
    },
  ],
};
