import { FormDefinition } from "../types";

export const ipicForm: FormDefinition = {
  slug: "ipic",
  title: "Initial Project Information Card (IPIC)",
  subtitle: "External Project Intake",
  category: "assessment",
  description: "Initial client intake capturing project overview, background, strategic alignment, and expected benefits.",
  footerText: "ReFarm Global · IPIC (Initial Project Information Card) · Confidential",
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
      hint: "Provide the essential project, client, and contact information required to initiate the trial and identify the key personnel involved.",
      fields: [
        {
          key: "cpoc_name",
          label: "Client's Project Point of Contact (CPOC) — Name",
          type: "text",
          gridCols: 2,
          placeholder: "Contact name",
        },
        {
          key: "cpoc_designation",
          label: "CPOC — Designation",
          type: "text",
          gridCols: 2,
          placeholder: "e.g. Farm Director / Head of Agronomy",
        },
        {
          key: "cpoc_email",
          label: "CPOC — Email Address",
          type: "email",
          gridCols: 2,
          placeholder: "contact@client.com",
        },
        {
          key: "cpoc_phone",
          label: "CPOC — Phone Number",
          type: "tel",
          gridCols: 2,
          placeholder: "+971 50 000 0000",
        },
      ],
    },
    {
      num: 2,
      title: "Project Background & Rationale",
      hint: "Provide the background of the project by describing the problem or opportunity, explaining its strategic importance, and identifying the expected value of conducting the trial.",
      fields: [
        {
          key: "problem_statement",
          label: "Problem / Opportunity Statement",
          hint: "Briefly describe the problem to be solved or the opportunity the project aims to address.",
          type: "textarea",
          placeholder: "Describe existing challenges, soil condition, water stress, or yield targets...",
        },
        {
          key: "strategic_alignment",
          label: "Strategic Alignment (Why it Matters)",
          hint: "Explain why this project is important to your organization and how it supports your operational, environmental, or business objectives.",
          type: "textarea",
          placeholder: "Explain alignment with organizational and environmental goals...",
        },
        {
          key: "expected_benefits",
          label: "Expected Value / Benefit",
          hint: "Select the primary benefit(s) expected from conducting this trial.",
          type: "multi",
          options: [
            "Water Consumption Reduction",
            "Crop Yield Increase",
            "Soil Health & Organic Carbon Improvement",
            "Chemical Fertilizer Reduction",
            "Pest / Disease Tolerance",
            "Operational Cost Efficiency",
            "Other",
          ],
        },
        {
          key: "expected_benefits_other",
          label: "Other Expected Benefits — please specify",
          type: "text",
          placeholder: "Specify other expected benefits...",
          conditional: { when: "expected_benefits", includes: "Other" },
        },
        {
          key: "benefit_notes",
          label: "Additional Benefit Details & Quantified Targets",
          type: "textarea",
          placeholder: "Provide any specific targets (e.g. 25% water reduction, 15% yield boost)...",
        },
      ],
    },
  ],
};
