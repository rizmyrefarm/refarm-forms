import { FormDefinition } from "../types";

export const sowForm: FormDefinition = {
  slug: "sow",
  title: "Scope of Work & Trial Protocol",
  subtitle: "ReFarm Global",
  category: "delivery",
  description: "Comprehensive scope of work, baseline assessment, application protocols, sampling, monitoring and sign-offs for field trials.",
  footerText: "ReFarm Global · Scope of Work & Trial Protocol · This document is subject to the laws of Dubai, UAE.",
  metaFields: [
    { key: "proj_name", label: "Project Name / Title", placeholder: "e.g. ReFarm Field Trial — Al Ain" },
    { key: "proj_location", label: "Project Location / Site", placeholder: "Farm, city, country" },
    { key: "proj_client", label: "Client / Partner", placeholder: "Client organisation" },
    { key: "proj_date", label: "Date", type: "date" },
  ],
  sections: [
    {
      num: 1,
      title: "Project Overview",
      hint: "General introduction of the project: location, involved parties, collaboration framework, main purpose, the ReFarm solution(s) involved, and the expected impact or value generated.",
      fields: [
        { key: "overview", type: "textarea", placeholder: "Describe the project overview..." },
      ],
    },
    {
      num: 2,
      title: "Objective",
      hint: "Main purpose of the project and why it is being conducted — expected outcomes, problems addressed, and the goals the project aims to achieve.",
      fields: [
        { key: "objective", type: "textarea", placeholder: "State project objectives..." },
      ],
    },
    {
      num: 3,
      title: "Scope of Work",
      hint: "Activities, tasks, and boundaries of the project — what is included in implementation and which activities are performed by each party.",
      fields: [
        { key: "scope", type: "textarea", placeholder: "Detail the scope of work..." },
      ],
    },
    {
      num: 4,
      title: "Timeline (Overview)",
      hint: "Expected project duration & implementation period — overview of the project phases and estimated completion dates.",
      fields: [
        { key: "timeline_overview", type: "textarea", placeholder: "Outline the project timeline..." },
      ],
    },
    {
      num: 5,
      title: "Deliverables",
      hint: "Expected outputs and results provided during each phase. Each deliverable includes the responsible workstream and expected completion timing.",
      fields: [
        {
          key: "tbl_deliverables",
          type: "table",
          tableConfig: {
            columns: [
              { key: "phase", label: "Phase", width: "12%", placeholder: "1" },
              { key: "deliverable", label: "Deliverable", type: "textarea", placeholder: "Deliverable description" },
              { key: "workstream", label: "Workstream", width: "22%", placeholder: "Agronomy / R&D" },
              { key: "timing", label: "Indicative Timing", width: "20%", placeholder: "Month 1" },
            ],
            initialRows: [
              { phase: "1", deliverable: "", workstream: "", timing: "" },
              { phase: "2", deliverable: "", workstream: "", timing: "" },
            ],
            allowAddRemove: true,
            addButtonLabel: "+ Add deliverable",
          },
        },
      ],
    },
    {
      num: 6,
      title: "Responsibilities",
      hint: "Roles and responsibilities of each party — ownership of activities, required support, and accountability throughout implementation.",
      fields: [
        {
          key: "tbl_resp",
          type: "table",
          tableConfig: {
            columns: [
              { key: "activity", label: "Activity", type: "textarea", placeholder: "Action / Activity" },
              { key: "refarm", label: "ReFarm", width: "25%", placeholder: "ReFarm responsibility" },
              { key: "client", label: "Client", width: "25%", placeholder: "Client responsibility" },
            ],
            initialRows: [
              { activity: "ACTION 1", refarm: "", client: "" },
              { activity: "ACTION 2", refarm: "", client: "" },
              { activity: "ACTION 3", refarm: "", client: "" },
              { activity: "ACTION 4", refarm: "", client: "" },
              { activity: "ACTION 5", refarm: "", client: "" },
            ],
            allowAddRemove: true,
            addButtonLabel: "+ Add activity",
          },
        },
        {
          key: "sow_note",
          type: "note",
          staticContent:
            "Any intentional sabotage, interference, or unauthorized actions that compromise the trial may result in fees. The party responsible for such actions shall be liable for any resulting losses or damages. Any legal action shall be subject to Dubai laws and handled through the appropriate legal channels.",
        },
      ],
    },
    {
      num: 7,
      title: "Protocol — Baseline Assessment",
      hint: "Initial conditions of the site before implementing ReFarm solutions. Baseline data is the reference point to evaluate improvements and measure performance.",
      fields: [
        {
          key: "subhead_soil",
          subhead: "Soil Baseline",
          type: "table",
          tableConfig: {
            columns: [
              { key: "parameter", label: "Parameter", width: "40%", readOnly: true },
              { key: "value", label: "Baseline Value / Observation", placeholder: "e.g. 7.4 pH or 2.1 dS/m" },
            ],
            initialRows: [
              { parameter: "pH" },
              { parameter: "EC (Electrical Conductivity)" },
              { parameter: "Organic Matter (%)" },
              { parameter: "Soil Texture (Sand / Silt / Clay %)" },
              { parameter: "Nitrogen (N)" },
              { parameter: "Phosphorus (P)" },
              { parameter: "Potassium (K)" },
              { parameter: "Calcium (Ca)" },
              { parameter: "Magnesium (Mg)" },
            ],
            allowAddRemove: false,
            seededRows: true,
          },
        },
        {
          key: "subhead_plant_irrig",
          subhead: "Plant & Irrigation Baseline",
          type: "table",
          tableConfig: {
            columns: [
              { key: "parameter", label: "Parameter", width: "40%", readOnly: true },
              { key: "value", label: "Baseline Value / Observation" },
            ],
            initialRows: [
              { parameter: "Crop Variety / Cultivar" },
              { parameter: "Growth Stage at Trial Start" },
              { parameter: "Plant Density / Spacing" },
              { parameter: "Irrigation Water Source" },
              { parameter: "Flow Rate / Volume" },
              { parameter: "Irrigation System Type" },
            ],
            allowAddRemove: false,
            seededRows: true,
          },
        },
        {
          key: "tbl_products",
          subhead: "Products Used",
          hint: "All ReFarm products or solutions applied during the project — purpose, application rate, and frequency of use.",
          type: "table",
          tableConfig: {
            columns: [
              { key: "product", label: "Product / Solution", width: "24%", placeholder: "e.g. Resoil" },
              { key: "purpose", label: "Purpose", placeholder: "Soil conditioning" },
              { key: "rate", label: "Application Rate", width: "20%", placeholder: "e.g. 5 L/ha" },
              { key: "freq", label: "Frequency", width: "20%", placeholder: "Bi-weekly" },
            ],
            initialRows: [
              { product: "", purpose: "", rate: "", freq: "" },
              { product: "", purpose: "", rate: "", freq: "" },
            ],
            allowAddRemove: true,
            addButtonLabel: "+ Add product",
          },
        },
        {
          key: "trial_design",
          subhead: "Trial Design",
          hint: "Specify the trial category.",
          type: "single",
          options: [
            "Commercial Trial",
            "Semi Commercial Trial",
            "Proof of Concept Trial",
            "Other",
          ],
        },
        {
          key: "trial_design_other",
          type: "text",
          placeholder: "Other — please specify…",
          conditional: { when: "trial_design", equals: "Other" },
        },
      ],
    },
    {
      num: 8,
      title: "Application Protocol",
      hint: "Detailed procedure for applying ReFarm solutions, ensuring consistency and traceability of all applications.",
      fields: [
        {
          key: "tbl_application",
          type: "table",
          tableConfig: {
            columns: [
              { key: "idx", label: "#", width: "5%", placeholder: "1" },
              { key: "date", label: "Date", width: "12%", type: "date" },
              { key: "product", label: "Product", width: "14%", placeholder: "Product name" },
              { key: "dosage", label: "Dosage", width: "11%", placeholder: "Rate" },
              { key: "dilution", label: "Dilution Rate", width: "12%", placeholder: "1:100" },
              { key: "method", label: "Application Method", placeholder: "Foliar / Fertigation" },
              { key: "operator", label: "Operator", width: "12%", placeholder: "Name" },
              { key: "weather", label: "Weather", width: "11%", placeholder: "Sunny, 28°C" },
              { key: "remarks", label: "Remarks", placeholder: "Notes" },
            ],
            initialRows: [
              { idx: "1", date: "", product: "", dosage: "", dilution: "", method: "", operator: "", weather: "", remarks: "" },
              { idx: "2", date: "", product: "", dosage: "", dilution: "", method: "", operator: "", weather: "", remarks: "" },
            ],
            allowAddRemove: true,
            addButtonLabel: "+ Add application row",
          },
        },
      ],
    },
    {
      num: 9,
      title: "Irrigation Protocol",
      hint: "Irrigation management strategy — initial conditions, reduction targets, and monitoring approach.",
      fields: [
        {
          key: "tbl_irrigprot",
          type: "table",
          tableConfig: {
            columns: [
              { key: "element", label: "Protocol Element", width: "35%", readOnly: true },
              { key: "details", label: "Details / Specifications", placeholder: "Enter specification" },
            ],
            initialRows: [
              { element: "Baseline Irrigation Schedule" },
              { element: "Target Water Reduction (%)" },
              { element: "Adjusted Irrigation Protocol" },
              { element: "Monitoring / Soil Moisture Sensors" },
            ],
            allowAddRemove: false,
            seededRows: true,
          },
        },
      ],
    },
    {
      num: 10,
      title: "Sampling Protocol",
      hint: "Sampling methodology for evaluating soil and product performance — sampling locations, frequency, and laboratory requirements.",
      fields: [
        {
          key: "tbl_sampling",
          subhead: "Soil Sampling Matrix",
          type: "table",
          tableConfig: {
            columns: [
              { key: "param", label: "Parameter / Depth", width: "25%", readOnly: true },
              { key: "s1", label: "Sample 1", placeholder: "" },
              { key: "s2", label: "Sample 2", placeholder: "" },
              { key: "s3", label: "Sample 3", placeholder: "" },
              { key: "s4", label: "Sample 4", placeholder: "" },
              { key: "s5", label: "Sample 5", placeholder: "" },
            ],
            initialRows: [
              { param: "Depth: 0–15 cm (Topsoil)" },
              { param: "Depth: 15–30 cm (Subsoil)" },
              { param: "Sampling Frequency" },
              { param: "Location / GPS" },
            ],
            allowAddRemove: false,
            seededRows: true,
          },
        },
        {
          key: "lab_required",
          subhead: "Laboratory Analysis Required?",
          type: "single",
          options: ["Yes", "No"],
        },
        {
          key: "lab_name",
          label: "Laboratory Name",
          type: "text",
          placeholder: "e.g. Dubai Central Laboratory",
          gridCols: 2,
          conditional: { when: "lab_required", equals: "Yes" },
        },
        {
          key: "lab_method",
          label: "Analysis Method / Parameters",
          type: "text",
          placeholder: "e.g. ICP-OES, standard soil fertility package",
          gridCols: 2,
          conditional: { when: "lab_required", equals: "Yes" },
        },
        {
          key: "tbl_plantsamp",
          subhead: "Plant Sampling",
          hint: "Plant sampling requirements to evaluate plant health, development, and response to ReFarm solutions.",
          type: "table",
          tableConfig: {
            columns: [
              { key: "item", label: "Evaluation Item", width: "35%", readOnly: true },
              { key: "details", label: "Sampling Details / Frequency" },
            ],
            initialRows: [
              { item: "Leaf Tissue Nutrient Content" },
              { item: "Chlorophyll / SPAD Index" },
              { item: "Biomass / Root Growth" },
              { item: "Yield & Quality Parameters" },
            ],
            allowAddRemove: false,
            seededRows: true,
          },
        },
        {
          key: "sap_analysis",
          subhead: "Sap Analysis Required?",
          type: "single",
          options: ["Yes", "No"],
        },
        {
          key: "sap_detail",
          label: "Sap Analysis — Laboratory & Target Elements",
          type: "text",
          placeholder: "e.g. NovaCropControl sap test for NO3, K, Ca, Mg, sugars",
          conditional: { when: "sap_analysis", equals: "Yes" },
        },
      ],
    },
    {
      num: 11,
      title: "Monitoring Plan",
      hint: "Monitoring approach, frequency, and parameters used to evaluate progress and measure performance against KPIs.",
      fields: [
        {
          key: "mon_freq",
          subhead: "Monitoring Frequency",
          type: "single",
          options: ["Weekly", "Every two weeks", "Monthly"],
        },
        {
          key: "tbl_monitor",
          subhead: "Monitoring Parameters",
          type: "table",
          tableConfig: {
            columns: [
              { key: "parameter", label: "Parameter", width: "25%", readOnly: true },
              { key: "monitor", label: "Monitor?", width: "10%", type: "checkbox" },
              { key: "method", label: "Method / Instrument", width: "25%", placeholder: "e.g. Moisture sensor / visual" },
              { key: "frequency", label: "Frequency", width: "20%", placeholder: "Weekly" },
              { key: "notes", label: "Notes", placeholder: "Remarks" },
            ],
            initialRows: [
              { parameter: "Soil Moisture & Temp", monitor: true, method: "IoT sensor probe", frequency: "Continuous / Daily", notes: "" },
              { parameter: "Plant Height & Canopy", monitor: true, method: "Manual caliper & photo", frequency: "Weekly", notes: "" },
              { parameter: "Pest & Disease Pressure", monitor: true, method: "Visual scout index", frequency: "Weekly", notes: "" },
              { parameter: "NDVI / Aerial Imagery", monitor: false, method: "Drone / Satellite", frequency: "Bi-weekly", notes: "" },
              { parameter: "Water Consumption", monitor: true, method: "Water meter log", frequency: "Daily", notes: "" },
              { parameter: "Yield / Fruit Count", monitor: true, method: "Harvest weighing", frequency: "At harvest", notes: "" },
            ],
            allowAddRemove: false,
            seededRows: true,
          },
        },
        {
          key: "tbl_datacoll",
          subhead: "Data Collection Responsibilities",
          hint: "Responsibility of each stakeholder for collecting, recording, and providing project data required for evaluation.",
          type: "table",
          tableConfig: {
            columns: [
              { key: "activity", label: "Data / Activity", placeholder: "e.g. Daily irrigation logs" },
              { key: "responsible", label: "Responsible Party", width: "25%", placeholder: "Farm Manager" },
              { key: "method", label: "Collection Method", width: "25%", placeholder: "Digital log sheet" },
            ],
            initialRows: [
              { activity: "Irrigation volume logs", responsible: "Client farm staff", method: "Digital form" },
              { activity: "Agronomy field visits", responsible: "ReFarm Agronomist", method: "Field inspection app" },
            ],
            allowAddRemove: true,
            addButtonLabel: "+ Add data item",
          },
        },
      ],
    },
    {
      num: 12,
      title: "KPI",
      hint: "Measurable indicators used to evaluate project success and determine whether the objectives have been achieved.",
      fields: [
        { key: "kpi", type: "textarea", placeholder: "Define measurable success criteria and target KPI numbers..." },
      ],
    },
    {
      num: 13,
      title: "Timeline (Detailed Schedule)",
      hint: "Detailed implementation schedule showing project phases, duration, and responsible parties.",
      fields: [
        {
          key: "tbl_schedule",
          type: "table",
          tableConfig: {
            columns: [
              { key: "phase", label: "Phase", width: "40%", placeholder: "Phase name" },
              { key: "duration", label: "Duration", width: "30%", placeholder: "Weeks / Days" },
              { key: "responsible", label: "Responsible", placeholder: "Lead person" },
            ],
            initialRows: [
              { phase: "Baseline Assessment & Prep", duration: "Weeks 1–2", responsible: "ReFarm Agronomy" },
              { phase: "Product Application & Initial Setup", duration: "Week 3", responsible: "ReFarm & Farm Team" },
              { phase: "Monitoring & Mid-Trial Review", duration: "Weeks 4–10", responsible: "ReFarm Supervisor" },
              { phase: "Final Harvest & Evaluation Report", duration: "Weeks 11–12", responsible: "ReFarm R&D & Client" },
            ],
            allowAddRemove: true,
            addButtonLabel: "+ Add schedule row",
          },
        },
      ],
    },
    {
      num: 14,
      title: "Roles & Responsibilities",
      hint: "Key personnel involved in project execution and their responsibilities throughout the project lifecycle.",
      fields: [
        {
          key: "tbl_roles",
          type: "table",
          tableConfig: {
            columns: [
              { key: "role", label: "Role", width: "26%", readOnly: true },
              { key: "name", label: "Name", width: "28%", placeholder: "Assigned person" },
              { key: "responsibilities", label: "Responsibilities", placeholder: "Key responsibilities" },
            ],
            initialRows: [
              { role: "Trial Supervisor (ReFarm)", name: "", responsibilities: "On-site protocol execution and data logging" },
              { role: "Trial Manager (ReFarm)", name: "", responsibilities: "Trial design, technical oversight, client liaison" },
              { role: "Project POC (Client)", name: "", responsibilities: "Farm access, resource provision, coordination" },
              { role: "Farm Operations Lead", name: "", responsibilities: "Daily farm labor, irrigation operation" },
            ],
            allowAddRemove: true,
            addButtonLabel: "+ Add role",
          },
        },
      ],
    },
    {
      num: 15,
      title: "Approvals & Sign-off",
      fields: [
        {
          key: "approvals",
          type: "sign-block",
          signCards: [
            {
              title: "Client Approval",
              fields: [
                { key: "client_name", label: "Name", type: "text" },
                { key: "client_position", label: "Position", type: "text" },
                { key: "client_sign", label: "Signature", type: "signature-line" },
                { key: "client_sign_date", label: "Date", type: "date" },
              ],
            },
            {
              title: "ReFarm Approval",
              fields: [
                { key: "rf_supervisor", label: "Trial Supervisor — Name", type: "text" },
                { key: "rf_manager", label: "Trial Manager — Name", type: "text" },
                { key: "rf_highmgmt", label: "High Management — Name & Position", type: "text" },
                { key: "rf_sign", label: "Signature", type: "signature-line" },
                { key: "rf_sign_date", label: "Date", type: "date" },
              ],
            },
          ],
        },
      ],
    },
  ],
};
