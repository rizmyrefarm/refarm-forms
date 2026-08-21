import { FormDefinition } from "../types";

export const salesActivityCardForm: FormDefinition = {
  slug: "sales-activity-card",
  title: "Sales Activity Card",
  subtitle: "ReFarm Global",
  category: "delivery",
  description: "Track commercial opportunities, product quantities, logistics, delivery timelines, payment terms, and attachments.",
  footerText: "ReFarm Global · Sales Activity Card · Confidential",
  metaFields: [
    { key: "proj_name", label: "Project Name (full project name)", placeholder: "Enter project name" },
    { key: "client_name", label: "Client Name (full name of the client)", placeholder: "Enter client name" },
    { key: "date", label: "Date", type: "date" },
    { key: "location", label: "Location (GPS coordinates, county or Emirate)", placeholder: "GPS coordinates, area or Emirate" },
  ],
  sections: [
    {
      num: 1,
      title: "Basic Information",
      hint: "Essential client, project, and contact information required to identify the sales activity and the key stakeholders involved.",
      fields: [
        { key: "sales_rep", label: "Sales Representative (name)", type: "text", gridCols: 2 },
        { key: "tech_rep", label: "Technical Representative (name)", type: "text", gridCols: 2 },
        { key: "poc", label: "Point of Contact (name)", type: "text", gridCols: 2 },
        { key: "trial_rep_name", label: "Trial Client Representative (name / designation)", type: "text", gridCols: 2 },
        { key: "trial_rep_email", label: "Trial Rep — Email", type: "email", gridCols: 2 },
        { key: "trial_rep_phone", label: "Trial Rep — Phone", type: "tel", gridCols: 2 },
        {
          key: "status",
          label: "Status (current sales status vs. overall implementation plan)",
          type: "single",
          options: ["Planned", "Ongoing", "Completed", "On Hold"],
        },
        {
          key: "tech",
          label: "Technologies Applied (which ReFarm technologies have been applied)",
          type: "multi",
          options: ["Refood", "Resoil", "Replant", "ReNox", "Others"],
        },
        {
          key: "tech_other",
          label: "Others — please specify…",
          type: "text",
          placeholder: "Specify other technologies...",
          conditional: { when: "tech", includes: "Others" },
        },
      ],
    },
    {
      num: 2,
      title: "Product Quantities & Specifications",
      hint: "Record the products included in the sales activity, together with their quantities and units of measurement.",
      fields: [
        {
          key: "tbl_products",
          type: "table",
          tableConfig: {
            columns: [
              { key: "product_name", label: "Product Name", placeholder: "Product name" },
              { key: "quantity", label: "Total Quantity", width: "24%", placeholder: "Quantity" },
              { key: "unit", label: "Unit", width: "24%", placeholder: "L / kg / ton" },
            ],
            initialRows: [
              { product_name: "", quantity: "", unit: "" },
              { product_name: "", quantity: "", unit: "" },
              { product_name: "", quantity: "", unit: "" },
              { product_name: "", quantity: "", unit: "" },
            ],
            allowAddRemove: true,
            addButtonLabel: "+ Add product",
          },
        },
      ],
    },
    {
      num: 3,
      title: "Fulfilment Period",
      hint: "Specify the agreed fulfilment period and indicate whether the delivery is on schedule.",
      fields: [
        { key: "fulfil_value", label: "Duration (Value)", type: "number", placeholder: "e.g. 2", gridCols: 2 },
        {
          key: "fulfil_unit",
          label: "Duration (Unit)",
          type: "single",
          options: ["Day", "Week", "Month", "Year"],
          gridCols: 2,
        },
        {
          key: "delivery_status",
          label: "Delivery Status",
          type: "single",
          options: ["On Time", "Delayed"],
        },
      ],
    },
    {
      num: 4,
      title: "Application Timeline",
      hint: "Record the planned implementation period for the products or services.",
      fields: [
        { key: "app_start", label: "Start Date", type: "date", gridCols: 2 },
        { key: "app_end", label: "End Date", type: "date", gridCols: 2 },
      ],
    },
    {
      num: 5,
      title: "Client Engagement",
      hint: "Specify whether the sales opportunity originated through direct client communication or through a tender process.",
      fields: [
        {
          key: "engagement",
          type: "single",
          options: [
            { label: "Yes — Direct contact", value: "Direct" },
            { label: "No — Through Tender", value: "Tender" },
          ],
        },
        {
          key: "tender_poc",
          label: "If Tender — who is it? / POC of Tender",
          type: "text",
          placeholder: "Tender name & point of contact",
          conditional: { when: "engagement", equals: "Tender" },
        },
      ],
    },
    {
      num: 6,
      title: "Commercial Documentation",
      hint: "Record the progress of the commercial documents required to proceed with the sales activity.",
      fields: [
        {
          key: "quotation_sent",
          label: "1. Quotation Sent",
          type: "single",
          options: ["Yes", "No"],
        },
        {
          key: "quote_files_attach",
          label: "Attach Quotation(s)",
          type: "file",
          conditional: { when: "quotation_sent", equals: "Yes" },
        },
        {
          key: "quote_final_attach",
          label: "Attach Final Quotation",
          type: "file",
          conditional: { when: "quotation_sent", equals: "Yes" },
        },
        {
          key: "po_received",
          label: "2. PO Received",
          type: "single",
          options: ["Yes", "No"],
        },
      ],
    },
    {
      num: 7,
      title: "Payment Details",
      hint: "Record the agreed payment terms and payment method.",
      fields: [
        {
          key: "pay_duration",
          label: "1. Payment Duration",
          type: "single",
          options: ["15 Days", "30 Days", "45 Days"],
          gridCols: 2,
        },
        {
          key: "pay_type",
          label: "2. Type of Payment",
          type: "single",
          options: ["Bank Transfer", "Cheques", "Cash"],
          gridCols: 2,
        },
      ],
    },
    {
      num: 8,
      title: "Transportation",
      hint: "Specify who is responsible for transporting the products to the client.",
      fields: [
        {
          key: "transport",
          type: "single",
          options: [
            { label: "No — By Client", value: "Client" },
            { label: "Yes — By ReFarm", value: "ReFarm" },
          ],
        },
      ],
    },
    {
      num: 9,
      title: "Logistics Details",
      hint: "If transportation is arranged by ReFarm, provide the logistics information required for delivery planning.",
      conditional: { when: "transport", equals: "ReFarm" },
      fields: [
        { key: "log_trips", label: "How many trips for the client order?", type: "text", gridCols: 2 },
        { key: "log_truck", label: "Size of the truck?", type: "text", gridCols: 2 },
        { key: "log_distance", label: "Estimated time / distance to destination?", type: "text", gridCols: 2 },
        { key: "log_start_gps", label: "Start Point (GPS coordinates)", type: "text", gridCols: 2 },
        { key: "log_end_gps", label: "End Point (GPS coordinates)", type: "text", gridCols: 2 },
      ],
    },
    {
      num: 10,
      title: "Supporting Documents",
      hint: "Attach the logistics documentation related to the sales activity.",
      fields: [
        {
          key: "logistics_invoice",
          label: "Attach the Invoice for Logistics",
          type: "file",
        },
      ],
    },
  ],
};
