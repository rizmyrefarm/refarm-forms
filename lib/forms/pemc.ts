import { FormDefinition } from "../types";

export const pemcForm: FormDefinition = {
  slug: "pemc",
  title: "Project Evaluation Monitoring Card (PEMC)",
  subtitle: "ReFarm Global",
  category: "monitoring",
  description: "Track project evaluation, milestone progress, 5-point performance scoring, and risk resolution.",
  footerText: "ReFarm Global · Project Evaluation Monitoring Card (PEMC) · Confidential",
  metaFields: [
    { key: "proj_name", label: "Project", placeholder: "Full project name" },
    { key: "client_name", label: "Client", placeholder: "Full name of the client" },
    { key: "date", label: "Date", type: "date" },
    { key: "location", label: "Location", placeholder: "GPS coordinates, county or Emirate" },
  ],
  sections: [
    {
      num: 1,
      title: "Basic Information",
      hint: "Provide the essential project and client details required to identify the project, the responsible personnel, and the location where the challenge occurred.",
      fields: [
        { key: "trial_supervisor", label: "Trial Supervisor", type: "text", gridCols: 2, placeholder: "Insert Name" },
        { key: "trial_manager", label: "Trial Manager", type: "text", gridCols: 2, placeholder: "Insert Name" },
        { key: "poc", label: "Project Point Of Contact (POC)", type: "text", gridCols: 2, placeholder: "Insert Name" },
        { key: "trial_rep", label: "Trial Client Representative", type: "text", gridCols: 2, placeholder: "Name, Designation, Email, Phone Number" },
      ],
    },
    {
      num: 2,
      title: "Project Overview",
      hint: "Provide an overview of the project by defining its objectives, key performance indicators, implementation period, and current status.",
      fields: [
        {
          key: "project_objective",
          label: "Project Objective",
          hint: "State the primary objective(s) the project is intended to achieve.",
          type: "textarea",
        },
        {
          key: "kpis",
          label: "Key Performance Indicators (KPIs)",
          hint: "Define the measurable indicators that will be used to evaluate the success of the project.",
          type: "textarea",
        },
        { key: "start_date", label: "Start Date", type: "date", gridCols: 2 },
        { key: "end_date", label: "End Date", type: "date", gridCols: 2 },
        {
          key: "project_status",
          label: "Project Status",
          type: "single",
          options: ["Planned", "Ongoing", "Stopped", "Completed"],
        },
      ],
    },
    {
      num: 3,
      title: "Progress Monitoring",
      hint: "Record the project's progress by documenting completed milestones and the planned actions required to achieve the remaining objectives.",
      fields: [
        {
          key: "milestones_achieved",
          label: "Milestones Achieved",
          hint: "List the key milestones or deliverables that have been successfully completed.",
          type: "textarea",
          gridCols: 2,
        },
        {
          key: "next_steps",
          label: "Next Steps",
          hint: "Describe the upcoming activities or actions required to progress or complete the project.",
          type: "textarea",
          gridCols: 2,
        },
      ],
    },
    {
      num: 4,
      title: "Project Evaluation",
      hint: "Assess the overall project performance against the predefined evaluation criteria and provide supporting comments where necessary.",
      fields: [
        {
          key: "tbl_evaluation",
          type: "table",
          tableConfig: {
            columns: [
              { key: "criteria", label: "Criteria", width: "30%", readOnly: true },
              {
                key: "rating",
                label: "Rating (1–5)",
                width: "20%",
                type: "select",
                options: ["1 - Unsatisfactory", "2 - Below Expectations", "3 - Meets Expectations", "4 - Exceeds Expectations", "5 - Outstanding"],
              },
              { key: "comments", label: "Comments", placeholder: "Evaluation remarks and justification" },
            ],
            initialRows: [
              { criteria: "Timeliness", rating: "", comments: "" },
              { criteria: "Budget Utilization", rating: "", comments: "" },
              { criteria: "Resource Allocation", rating: "", comments: "" },
              { criteria: "Quality of Output", rating: "", comments: "" },
              { criteria: "Stakeholder Satisfaction", rating: "", comments: "" },
            ],
            allowAddRemove: false,
            seededRows: true,
          },
        },
      ],
    },
    {
      num: 5,
      title: "Risks & Issues",
      hint: "Identify any challenges or risks encountered during the project, describe the corrective actions taken or proposed, and assign responsibility where applicable.",
      fields: [
        {
          key: "challenge_encountered",
          label: "Challenge Encountered (Indicate whether any challenge or issue occurred during the project)",
          type: "single",
          options: ["Yes", "No"],
        },
        {
          key: "risk_solution",
          label: "Risk Identified and Solution",
          type: "textarea",
          placeholder: "Describe the specific issue and immediate corrective actions taken...",
          conditional: { when: "challenge_encountered", equals: "Yes" },
        },
        {
          key: "responsible_party",
          label: "Responsible Party (Identify the individual, team, or organization responsible for implementing the corrective action)",
          type: "text",
          placeholder: "e.g. ReFarm Field Engineer / Client Operations",
          conditional: { when: "challenge_encountered", equals: "Yes" },
        },
      ],
    },
    {
      num: 6,
      title: "Notes / Recommendations",
      hint: "Record any additional observations, lessons learned, recommendations, or follow-up actions to support project completion and future improvements.",
      fields: [
        {
          key: "notes",
          label: "Notes",
          hint: "Provide any additional observations or important information relevant to the project.",
          type: "textarea",
          gridCols: 2,
        },
        {
          key: "recommendations",
          label: "Recommendations",
          hint: "Provide recommendations or proposed actions to improve project performance or support future implementation.",
          type: "textarea",
          gridCols: 2,
        },
      ],
    },
  ],
};
