import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import contentMatrix from '../../content/website/content-matrix.json';
import { BRAND_NAME, SUPPORT_EMAIL } from '@/content/brand';
import { LeadFormField, LeadFormPrefill, subscribeToLeadFormPrefill } from '@/utils/leadForm';
import { openFounderCall } from '@/utils/contact';

const leadFormContent = contentMatrix.lead_form;

const stageOptions = ['Idea', 'MVP', 'Post-revenue', 'Scaling', 'Other'];
const timelineOptions = ['Immediately', '2-4 weeks', '1-2 months', 'Flexible'];

interface FieldConfig {
  label: string;
  placeholder?: string;
  type: 'text' | 'email' | 'textarea' | 'select' | 'radio';
  options?: string[];
  required?: boolean;
  helper?: string;
}

const fieldConfig: Record<LeadFormField, FieldConfig> = {
  name: {
    label: 'Your name',
    placeholder: 'Aarav Patel',
    type: 'text',
    required: true
  },
  email: {
    label: 'Work email',
    placeholder: 'founder@startup.com',
    type: 'email',
    required: true
  },
  company: {
    label: 'Startup / company',
    placeholder: BRAND_NAME,
    type: 'text',
    required: true
  },
  role: {
    label: 'Role',
    placeholder: 'Founder, Growth lead…',
    type: 'text'
  },
  stage: {
    label: 'Current stage',
    type: 'select',
    options: stageOptions,
    required: true
  },
  goal: {
    label: 'What should we ship in 30 days?',
    placeholder: 'Conversion site, paid experiments, growth ops…',
    type: 'textarea',
    required: true
  },
  timeline: {
    label: 'Ideal timeline',
    type: 'select',
    options: timelineOptions,
    required: true
  },
  budget_band: {
    label: 'Budget band',
    type: 'radio',
    options: leadFormContent.budget_bands,
    required: true,
    helper: 'Pick the closest band. We use this to plan sprint velocity.'
  },
  referral: {
    label: 'How did you hear about us?',
    placeholder: 'Referral, LinkedIn, community, etc.',
    type: 'text'
  }
};

const createInitialState = () =>
  leadFormContent.fields.reduce<Record<LeadFormField, string>>((acc, field) => {
    acc[field as LeadFormField] = '';
    return acc;
  }, {} as Record<LeadFormField, string>);

const orderedFields = leadFormContent.fields as LeadFormField[];

const LeadForm: React.FC = () => {
  const [formData, setFormData] = useState<Record<LeadFormField, string>>(() => createInitialState());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [contextNote, setContextNote] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToLeadFormPrefill((payload: LeadFormPrefill) => {
      setFormData((prev) => {
        const next = { ...prev };
        (Object.keys(payload) as Array<keyof LeadFormPrefill>).forEach((key) => {
          if (!payload[key]) {
            return;
          }

          if (key in next) {
            next[key as LeadFormField] = payload[key] as string;
          }
        });
        return next;
      });

      if (payload.context) {
        setContextNote(payload.context);
      } else if (payload.goal) {
        setContextNote(`Goal updated: ${payload.goal}`);
      }
    });

    return unsubscribe;
  }, []);

  const handleChange = (field: LeadFormField, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (status !== 'idle') {
      setStatus('idle');
      setStatusMessage('');
    }
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const missingField = orderedFields.find((fieldKey) => {
      const config = fieldConfig[fieldKey];
      return config?.required && !formData[fieldKey];
    });

    if (missingField) {
      setStatus('error');
      setStatusMessage('Please complete all required fields before submitting.');
      return;
    }

    const endpoint = import.meta.env.VITE_LEAD_FORM_ENDPOINT as string | undefined;

    if (!endpoint) {
      setStatus('error');
      setStatusMessage('Lead capture endpoint is missing. Set VITE_LEAD_FORM_ENDPOINT in your environment.');
      return;
    }

    setIsSubmitting(true);
    setStatus('idle');
    setStatusMessage('');

    try {
      const payload = {
        ...formData,
        submittedAt: new Date().toISOString(),
        source: 'wittwizz-site',
        pageUrl: typeof window !== 'undefined' ? window.location.href : '',
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : ''
      };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      setStatus('success');
      setStatusMessage("Thanks! We'll reply within a business day.");
      setFormData(createInitialState());
      setContextNote(null);
    } catch (error) {
      console.error('Lead form submission failed', error);
      setStatus('error');
      setStatusMessage(`Something went wrong. Please retry or email ${SUPPORT_EMAIL}.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="lead_form" className="relative py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-bg-tertiary/70 backdrop-blur-xl border border-accent-primary/20 rounded-3xl p-10 shadow-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="mb-10 text-center"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-accent-primary/10 text-accent-primary text-sm font-semibold mb-4">
              Plan my launch sprint
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-text-primary mb-4">
              {leadFormContent.intro}
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Share a few details so the team can scope the right sprint, budget, and first-week deliverables.
            </p>

            {contextNote && (
              <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent-secondary/40 bg-accent-secondary/10 text-accent-secondary text-sm font-medium">
                <span>✨</span>
                <span>{contextNote}</span>
              </div>
            )}
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {orderedFields.map((fieldKey) => {
                const config = fieldConfig[fieldKey];

                if (!config) {
                  return null;
                }

                const value = formData[fieldKey] ?? '';

                if (config.type === 'textarea') {
                  return (
                    <label key={fieldKey} className="md:col-span-2 block">
                      <span className="block text-sm font-semibold text-text-primary mb-2">
                        {config.label}
                        {config.required && <span className="text-accent-secondary"> *</span>}
                      </span>
                      <textarea
                        value={value}
                        onChange={(event) => handleChange(fieldKey, event.target.value)}
                        required={config.required}
                        placeholder={config.placeholder}
                        className="w-full h-32 md:h-40 rounded-2xl border border-accent-primary/20 bg-bg-secondary/70 backdrop-blur-sm px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/60 transition"
                      />
                    </label>
                  );
                }

                if (config.type === 'select') {
                  return (
                    <label key={fieldKey} className="block">
                      <span className="block text-sm font-semibold text-text-primary mb-2">
                        {config.label}
                        {config.required && <span className="text-accent-secondary"> *</span>}
                      </span>
                      <div className="relative">
                        <select
                          value={value}
                          onChange={(event) => handleChange(fieldKey, event.target.value)}
                          required={config.required}
                          className="w-full appearance-none rounded-2xl border border-accent-primary/20 bg-bg-secondary/70 backdrop-blur-sm px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/60 transition"
                        >
                          <option value="" disabled>
                            {config.placeholder ?? 'Select one'}
                          </option>
                          {config.options?.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-text-secondary">▾</span>
                      </div>
                    </label>
                  );
                }

                if (config.type === 'radio') {
                  return (
                    <fieldset key={fieldKey} className="md:col-span-2">
                      <legend className="block text-sm font-semibold text-text-primary mb-2">
                        {config.label}
                        {config.required && <span className="text-accent-secondary"> *</span>}
                      </legend>
                      {config.helper && <p className="text-xs text-text-secondary mb-4">{config.helper}</p>}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {config.options?.map((option) => {
                          const isActive = value === option;
                          return (
                            <button
                              key={option}
                              type="button"
                              onClick={() => handleChange(fieldKey, option)}
                              className={`rounded-2xl border px-4 py-3 text-left transition-all duration-200 ${
                                isActive
                                  ? 'border-accent-primary bg-accent-primary/10 text-accent-primary shadow-lg'
                                  : 'border-accent-primary/20 bg-bg-secondary/70 text-text-secondary hover:border-accent-primary/40 hover:text-text-primary'
                              }`}
                            >
                              {option}
                            </button>
                          );
                        })}
                      </div>
                    </fieldset>
                  );
                }

                return (
                  <label key={fieldKey} className="block">
                    <span className="block text-sm font-semibold text-text-primary mb-2">
                      {config.label}
                      {config.required && <span className="text-accent-secondary"> *</span>}
                    </span>
                    <input
                      type={config.type}
                      value={value}
                      onChange={(event) => handleChange(fieldKey, event.target.value)}
                      required={config.required}
                      placeholder={config.placeholder}
                      className="w-full rounded-2xl border border-accent-primary/20 bg-bg-secondary/70 backdrop-blur-sm px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/60 transition"
                    />
                  </label>
                );
              })}
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="text-sm text-text-secondary md:max-w-md">
                {leadFormContent.privacy_note}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-accent-primary to-accent-secondary text-bg-primary font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending…' : leadFormContent.submit_text}
                </button>
                <button
                  type="button"
                  onClick={openFounderCall}
                  className="inline-flex items-center justify-center gap-3 px-6 py-3 rounded-xl border-2 border-accent-primary text-accent-primary font-semibold hover:bg-accent-primary hover:text-bg-primary transition-all duration-300"
                >
                  Prefer a call?
                </button>
              </div>
            </div>

            {status !== 'idle' && (
              <div
                role="alert"
                className={`rounded-2xl border px-4 py-3 text-sm font-medium ${
                  status === 'success'
                    ? 'border-emerald-400 bg-emerald-500/10 text-emerald-200'
                    : 'border-red-400 bg-red-500/10 text-red-200'
                }`}
              >
                {statusMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default LeadForm;
