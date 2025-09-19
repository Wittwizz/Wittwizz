export type LeadFormField =
  | 'name'
  | 'email'
  | 'company'
  | 'role'
  | 'stage'
  | 'goal'
  | 'timeline'
  | 'budget_band'
  | 'referral';

export type LeadFormPrefill = Partial<Record<LeadFormField, string>> & {
  context?: string;
};

const LEAD_FORM_EVENT = 'lead-form:prefill';

const getLeadFormElement = () => {
  if (typeof document === 'undefined') {
    return null;
  }

  return (
    document.getElementById('lead_form') ||
    document.getElementById('lead_form_section') ||
    document.querySelector('[data-section="lead-form"]')
  );
};

export const openLeadForm = (prefill?: LeadFormPrefill) => {
  if (typeof window === 'undefined') {
    return;
  }

  if (prefill && Object.keys(prefill).length > 0) {
    window.dispatchEvent(
      new CustomEvent<LeadFormPrefill>(LEAD_FORM_EVENT, {
        detail: prefill
      })
    );
  }

  const section = getLeadFormElement();
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

export const subscribeToLeadFormPrefill = (
  callback: (payload: LeadFormPrefill) => void
) => {
  if (typeof window === 'undefined') {
    return () => undefined;
  }

  const handler = (event: Event) => {
    const customEvent = event as CustomEvent<LeadFormPrefill>;
    callback(customEvent.detail);
  };

  window.addEventListener(LEAD_FORM_EVENT, handler as EventListener);

  return () => {
    window.removeEventListener(LEAD_FORM_EVENT, handler as EventListener);
  };
};
