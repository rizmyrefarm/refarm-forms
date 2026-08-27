import { FormDefinition } from "../types";

export const ecofarmPhase02Form: FormDefinition = {
  slug: "ecofarm-phase-0-2",
  title: "EcoFarm Phase 0.2: Detailed Site Assessment & Opportunity Evaluation",
  subtitle: "Phase 0.2 · Technical Feasibility (7–14 Working Days)",
  category: "assessment",
  description: "Detailed evaluation of water, infrastructure readiness, soil profiles, infrastructure gap analysis, risk matrices, and 1-10 scoring.",
  footerText: "ReFarm Global · EcoFarm Phase 0.2 · Detailed Assessment · Confidential",
  metaFields: [
    { key: "proj_name", label: "Project", placeholder: "Full project name" },
    { key: "client_name", label: "Client", placeholder: "Full name of client" },
    { key: "date", label: "Site Visit Date", type: "date" },
    { key: "location", label: "Location", placeholder: "Site location & coordinates" },
  ],
  sections: [
    {
      num: "Intro",
      title: "Phase 0.2 Overview",
      hint: "Detailed site assessment and engineering qualification framework.",
      fields: [
        {
          key: "phase_02_note",
          type: "note",
          staticContent:
            "Phase 0.2 represents the detailed technical assessment stage following initial project qualification. The objective is to collect comprehensive engineering and agronomic data required to evaluate project feasibility, identify infrastructure upgrades, assess risks, and determine the exact suitability of ReFarm solutions.",
        },
      ],
    },
    {
      num: 1,
      title: "Basic Information",
      hint: "Provide the essential project, client, and contact information required to identify the trial and the responsible personnel.",
      fields: [
        { key: "trial_supervisor", label: "Trial Supervisor (name)", type: "text", placeholder: "Insert name" },
        { key: "trial_manager", label: "Trial Manager (name)", type: "text", placeholder: "Insert name" },
        { key: "poc_name", label: "Point of Contact (name)", type: "text", placeholder: "Insert name" },
        { key: "client_rep", label: "Trial Client Representative", type: "text", placeholder: "Name, Designation, Email & Phone" },
      ],
    },
    {
      num: 2,
      title: "Water Evaluation",
      hint: "Evaluates availability, quality, and reliability of water resources at the site.",
      fields: [
        { key: "water_source", label: "Water Source (borehole, municipal, recycled, surface)", type: "text", gridCols: 2 },
        { key: "water_availability", label: "Estimated Water Availability (daily/monthly volume)", type: "text", gridCols: 2 },
        { key: "water_storage", label: "Storage Available (tanks, reservoirs capacity)", type: "text", gridCols: 2 },
        {
          key: "water_quality_report",
          label: "Water Quality Report Available (salinity, pH, EC)",
          type: "single",
          options: ["Yes", "No"],
          gridCols: 2,
        },
        {
          key: "rephlo_opp",
          label: "RePhlo Opportunity (water recycling & treatment potential)",
          type: "textarea",
        },
        {
          key: "water_risk_rating",
          label: "Water Risk Rating",
          type: "single",
          options: ["Low", "Medium", "High"],
        },
      ],
    },
    {
      num: 3,
      title: "Infrastructure Assessment",
      hint: "Evaluate availability and condition of existing infrastructure required for implementation.",
      fields: [
        { key: "road_access", label: "Road Access", type: "text", gridCols: 2, placeholder: "Paved / Unpaved / Heavy machinery access" },
        { key: "power_avail", label: "Power Availability", type: "text", gridCols: 2, placeholder: "Grid power, 3-phase, generator, solar" },
        { key: "irrig_system", label: "Irrigation System", type: "text", gridCols: 2, placeholder: "Drip, sprinkler, automation status" },
        { key: "buildings", label: "Buildings & Greenhouses", type: "text", gridCols: 2, placeholder: "Offices, storage sheds, tunnels" },
        { key: "storage_fac", label: "Storage Facilities", type: "text", gridCols: 2, placeholder: "Fertilizer / chemical / crop storage" },
        { key: "internet_conn", label: "Internet Connectivity (for IoT / RIOT)", type: "text", gridCols: 2, placeholder: "4G/5G coverage, Wi-Fi" },
        { key: "security", label: "Security & Fencing", type: "text", gridCols: 2, placeholder: "Perimeter fence, CCTV, gate control" },
        { key: "infra_score", label: "Infrastructure Readiness Score (1–10)", type: "text", gridCols: 2, placeholder: "e.g. 8/10" },
      ],
    },
    {
      num: 4,
      title: "Soil Evaluation",
      hint: "Evaluate physical and chemical soil properties to determine remediation and product dosage.",
      fields: [
        { key: "soil_type", label: "Soil Type (texture & classification)", type: "text", gridCols: 2, placeholder: "Sandy loam, calcareous, etc." },
        { key: "om_level", label: "Organic Matter Level (%)", type: "text", gridCols: 2, placeholder: "e.g. < 0.5% (very low)" },
        { key: "salinity_signs", label: "Salinity Signs (salt crust, EC)", type: "text", gridCols: 2, placeholder: "Visible crust, stunted growth" },
        { key: "compaction_signs", label: "Compaction Signs (hardpan depth)", type: "text", gridCols: 2, placeholder: "Hardpan at 25cm" },
        { key: "erosion_risk", label: "Erosion Risk (wind / water)", type: "text", gridCols: 2, placeholder: "High wind drift risk" },
        {
          key: "soil_analysis_avail",
          label: "Soil Analysis Available",
          type: "single",
          options: ["Yes", "No"],
          gridCols: 2,
        },
        {
          key: "additional_testing",
          label: "Additional Testing Required",
          hint: "Identify any further lab analysis or deep profile sampling needed.",
          type: "textarea",
        },
      ],
    },
    {
      num: 5,
      title: "Infrastructure Gap Analysis",
      hint: "Identify missing infrastructure components and estimated costs (AED) to prepare the site.",
      fields: [
        {
          key: "tbl_gap_analysis",
          type: "table",
          tableConfig: {
            columns: [
              { key: "item", label: "Missing Item / Upgrade", placeholder: "e.g. Water filtration unit" },
              {
                key: "priority",
                label: "Priority",
                width: "20%",
                type: "select",
                options: ["High", "Medium", "Low"],
              },
              { key: "cost", label: "Estimated Cost (AED)", width: "22%", placeholder: "AED 15,000" },
              { key: "comments", label: "Comments", placeholder: "Vendor / technical notes" },
            ],
            initialRows: [
              { item: "Water Filtration & Pressure Booster", priority: "High", cost: "AED 25,000", comments: "Required for ReSoil uniform fertigation" },
              { item: "Weather Station & Soil Moisture Probes", priority: "High", cost: "AED 12,000", comments: "RIOT deployment requirement" },
              { item: "Shade Netting Repair (Sector B)", priority: "Medium", cost: "AED 8,500", comments: "Temperature regulation" },
            ],
            allowAddRemove: true,
            addButtonLabel: "+ Add gap item",
          },
        },
      ],
    },
    {
      num: 6,
      title: "Risk Assessment",
      hint: "Evaluate potential risks that may affect project execution across key operational domains.",
      fields: [
        {
          key: "tbl_risks",
          type: "table",
          tableConfig: {
            columns: [
              { key: "category", label: "Risk Category", width: "25%", readOnly: true },
              {
                key: "level",
                label: "Risk Level",
                width: "22%",
                type: "select",
                options: ["Low", "Medium", "High"],
              },
              { key: "mitigation", label: "Mitigation Strategy / Remarks", placeholder: "Proposed control measures" },
            ],
            initialRows: [
              { category: "Technical", level: "Low", mitigation: "Standard ReFarm protocols applied" },
              { category: "Water", level: "Medium", mitigation: "Install inline storage buffer and salinity monitor" },
              { category: "Soil", level: "Medium", mitigation: "Initial ReSoil conditioning cycle prior to planting" },
              { category: "Financial", level: "Low", mitigation: "Agreed milestone payment structure" },
              { category: "Regulatory", level: "Low", mitigation: "All biological inputs MOCCAE approved" },
              { category: "Environmental", level: "Medium", mitigation: "Windbreak nets to minimize sand drift" },
              { category: "Market", level: "Low", mitigation: "Offtake agreement in place" },
            ],
            allowAddRemove: false,
            seededRows: true,
          },
        },
      ],
    },
    {
      num: 7,
      title: "Overall Opportunity Scoring",
      hint: "Score each category from 1 to 10 based on technical assessment, resources, and project objectives.",
      fields: [
        {
          key: "tbl_scoring",
          type: "table",
          tableConfig: {
            columns: [
              { key: "category", label: "Category", width: "25%", readOnly: true },
              {
                key: "score",
                label: "Score (1–10)",
                width: "20%",
                type: "select",
                options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
              },
              { key: "comments", label: "Evaluation Comments", placeholder: "Justification for assigned score" },
            ],
            initialRows: [
              { category: "Land", score: "8", comments: "Good topography and accessible acreage" },
              { category: "Water", score: "7", comments: "Adequate volume, moderate salinity" },
              { category: "Soil", score: "6", comments: "Low organic matter, highly responsive to ReSoil" },
              { category: "Infrastructure", score: "8", comments: "Grid power and road access in place" },
              { category: "Climate", score: "7", comments: "Favorable winter growing window" },
              { category: "Technology Fit", score: "9", comments: "High synergy with RIOT + BioCareX" },
              { category: "Scalability", score: "9", comments: "Adjacent 50 ha available for expansion" },
            ],
            allowAddRemove: false,
            seededRows: true,
          },
        },
      ],
    },
  ],
};
