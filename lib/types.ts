export type FormCategory = "assessment" | "delivery" | "monitoring";

export type FieldType =
  | "text"
  | "textarea"
  | "date"
  | "number"
  | "email"
  | "tel"
  | "single"
  | "multi"
  | "table"
  | "file"
  | "static"
  | "note"
  | "sign-block";

export interface ConditionalRule {
  when: string; // key of field that controls condition
  equals?: string | string[]; // matches value (e.g. "Yes", "Tender", "ReFarm", "Other")
  includes?: string | string[]; // for multi-select arrays (e.g. "Others", "Other")
}

export interface TableColumn {
  key: string;
  label: string;
  type?: "text" | "textarea" | "date" | "number" | "select" | "checkbox" | "file";
  placeholder?: string;
  options?: string[];
  width?: string;
  readOnly?: boolean;
}

export interface TableConfig {
  columns: TableColumn[];
  initialRows?: Record<string, any>[];
  allowAddRemove?: boolean;
  addButtonLabel?: string;
  seededRows?: boolean;
}

export interface SignCardField {
  key: string;
  label: string;
  type: "text" | "date" | "signature-line";
}

export interface SignCard {
  title: string;
  fields: SignCardField[];
}

export interface FormField {
  key: string;
  label?: string;
  hint?: string;
  subhead?: string;
  type: FieldType;
  placeholder?: string;
  options?: string[] | { label: string; value: string }[];
  defaultValue?: any;
  gridCols?: 1 | 2 | 3 | 4;
  conditional?: ConditionalRule;
  tableConfig?: TableConfig;
  staticContent?: string;
  signCards?: SignCard[];
  required?: boolean;
}

export interface FormSection {
  id?: string;
  num?: number | string;
  title: string;
  badge?: string;
  badgeVariant?: "green" | "amber" | "blue";
  hint?: string;
  conditional?: ConditionalRule;
  fields: FormField[];
}

export interface HeaderField {
  key: string;
  label: string;
  type?: "text" | "date" | "number";
  placeholder?: string;
  defaultValue?: string;
}

export interface FormDefinition {
  slug: string;
  title: string;
  subtitle?: string;
  category: FormCategory;
  duration?: string;
  description: string;
  metaFields: HeaderField[];
  sections: FormSection[];
  footerText?: string;
}

export interface SubmissionData {
  meta: Record<string, any>;
  fields: Record<string, any>;
  tables: Record<string, Record<string, any>[]>;
}

export interface SavedSubmission {
  id: string;
  formSlug: string;
  formTitle: string;
  projectName: string | null;
  clientName: string | null;
  status: string;
  data: SubmissionData;
  createdAt: string | Date;
  updatedAt: string | Date;
}
