import { FormDefinition, FormCategory } from "../types";
import { sowForm } from "./sow";
import { salesActivityCardForm } from "./sales-activity-card";
import { ipicForm } from "./ipic";
import { ipicInternalForm } from "./ipic-internal";
import { pemcForm } from "./pemc";
import { challengeCardForm } from "./challenge-card";
import { sowInternalForm } from "./sow-internal";
import { ecofarmPhase01Form } from "./ecofarm-phase-0-1";
import { ecofarmPhase02Form } from "./ecofarm-phase-0-2";
import { ecofarmPhase03Form } from "./ecofarm-phase-0-3";

export const FORMS: FormDefinition[] = [
  // Assessment
  ecofarmPhase01Form,
  ecofarmPhase02Form,
  ecofarmPhase03Form,
  ipicForm,
  ipicInternalForm,

  // Delivery
  sowForm,
  sowInternalForm,
  salesActivityCardForm,

  // Monitoring
  pemcForm,
  challengeCardForm,
];

export const FORMS_BY_SLUG: Record<string, FormDefinition> = {
  "sow": sowForm,
  "sales-activity-card": salesActivityCardForm,
  "ipic": ipicForm,
  "ipic-internal": ipicInternalForm,
  "pemc": pemcForm,
  "challenge-card": challengeCardForm,
  "sow-internal": sowInternalForm,
  "ecofarm-phase-0-1": ecofarmPhase01Form,
  "ecofarm-phase-0-2": ecofarmPhase02Form,
  "ecofarm-phase-0-3": ecofarmPhase03Form,
};

export function getFormBySlug(slug: string): FormDefinition | undefined {
  return FORMS_BY_SLUG[slug];
}

export const FORM_CATEGORIES: { key: FormCategory; label: string; description: string }[] = [
  {
    key: "assessment",
    label: "Assessment & Qualification",
    description: "Initial scoping, site visits, engineering evaluations, and feasibility approvals.",
  },
  {
    key: "delivery",
    label: "Delivery & Execution",
    description: "Scope of work, trial protocols, responsibility matrices, and commercial activity cards.",
  },
  {
    key: "monitoring",
    label: "Monitoring & Evaluation",
    description: "Performance tracking, 5-point evaluation cards, and issue resolution cards.",
  },
];
