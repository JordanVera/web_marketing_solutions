'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowRight, CheckCircle2, CircleAlert } from 'lucide-react';
import { company } from '@/lib/content';
import { servicePages } from '@/lib/services';
import { SITE_URL, cn } from '@/lib/utils';

const FIELD =
  'w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-cream placeholder:text-muted-dim transition-colors focus:border-electric-400/60 focus:outline-none';

const FORMSUBMIT_ACTION = `https://formsubmit.co/${company.email}`;
const FORMSUBMIT_AJAX = `https://formsubmit.co/ajax/${company.email}`;

type ContactFormProps = {
  className?: string;
};

type Status = 'idle' | 'submitting' | 'success' | 'needs-activation' | 'error';

type FormSubmitResponse = {
  success?: string | boolean;
  message?: string;
};

function isFormSubmitSuccess(payload: FormSubmitResponse) {
  return payload.success === true || payload.success === 'true';
}

export function ContactForm({ className }: ContactFormProps) {
  const nextInputRef = useRef<HTMLInputElement>(null);
  const urlInputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const origin = window.location.origin;
    if (nextInputRef.current) {
      nextInputRef.current.value = `${origin}/contact?sent=1`;
    }
    if (urlInputRef.current) {
      urlInputRef.current.value = window.location.href;
    }
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    data.set('_url', window.location.href);
    data.delete('_next');

    setStatus('submitting');
    setErrorMessage(null);

    try {
      const response = await fetch(FORMSUBMIT_AJAX, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });
      const payload = (await response.json()) as FormSubmitResponse;

      if (isFormSubmitSuccess(payload)) {
        setStatus('success');
        form.reset();
        return;
      }

      const message = payload.message ?? '';
      if (/activation/i.test(message)) {
        setStatus('needs-activation');
        return;
      }

      setStatus('error');
      setErrorMessage(
        message || 'Something went wrong. Please email us directly or try again.',
      );
    } catch {
      setStatus('error');
      setErrorMessage(
        `Could not reach FormSubmit. Email us at ${company.email} and we’ll pick it up from there.`,
      );
    }
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        className="flex items-start gap-3 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-5 py-4"
      >
        <CheckCircle2
          className="mt-0.5 size-5 shrink-0 text-emerald-400"
          aria-hidden="true"
        />
        <div>
          <p className="font-medium text-cream">Message received — we&apos;re on it.</p>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            Expect a reply within two business days.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      action={FORMSUBMIT_ACTION}
      method="POST"
      onSubmit={handleSubmit}
      className={cn('relative flex flex-col gap-5', className)}
    >
      <input
        type="hidden"
        name="_subject"
        value="New inquiry — Web Marketing Solutions"
      />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      <input
        ref={urlInputRef}
        type="hidden"
        name="_url"
        defaultValue={`${SITE_URL}/contact`}
      />
      <input
        ref={nextInputRef}
        type="hidden"
        name="_next"
        defaultValue={`${SITE_URL}/contact?sent=1`}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="contact-name"
            className="font-mono text-[0.625rem] tracking-[0.16em] text-muted uppercase"
          >
            Full name <span className="text-rocket">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
            required
            autoComplete="name"
            placeholder="Jane Smith"
            className={FIELD}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="contact-email"
            className="font-mono text-[0.625rem] tracking-[0.16em] text-muted uppercase"
          >
            Email <span className="text-rocket">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            className={FIELD}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="contact-company"
            className="font-mono text-[0.625rem] tracking-[0.16em] text-muted uppercase"
          >
            Company
          </label>
          <input
            id="contact-company"
            type="text"
            name="company"
            autoComplete="organization"
            placeholder="Your company"
            className={FIELD}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="contact-phone"
            className="font-mono text-[0.625rem] tracking-[0.16em] text-muted uppercase"
          >
            Phone
          </label>
          <input
            id="contact-phone"
            type="tel"
            name="phone"
            autoComplete="tel"
            placeholder="+1 (713) 555-0100"
            className={FIELD}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="contact-service"
          className="font-mono text-[0.625rem] tracking-[0.16em] text-muted uppercase"
        >
          What can we help with?
        </label>
        <select
          id="contact-service"
          name="service"
          defaultValue=""
          className={cn(FIELD, 'cursor-pointer')}
        >
          <option value="" disabled>
            Select a service line
          </option>
          {servicePages.map((service) => (
            <option key={service.slug} value={service.title}>
              {service.title}
            </option>
          ))}
          <option value="Not sure yet">Not sure yet</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="contact-message"
          className="font-mono text-[0.625rem] tracking-[0.16em] text-muted uppercase"
        >
          Project details <span className="text-rocket">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder="Tell us where you want to be twelve months from now — goals, timeline, budget range, anything that helps us prepare a real flight plan."
          className={cn(FIELD, 'resize-y min-h-32')}
        />
      </div>

      {/* Honeypot — leave empty. Kept off-screen and out of autofill. */}
      <div aria-hidden="true" className="sr-only">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          type="text"
          name="_honey"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {status === 'needs-activation' ? (
        <div
          role="status"
          className="flex items-start gap-3 rounded-2xl border border-amber-400/30 bg-amber-400/10 px-5 py-4"
        >
          <CircleAlert
            className="mt-0.5 size-5 shrink-0 text-electric"
            aria-hidden="true"
          />
          <div>
            <p className="font-medium text-cream">One-time FormSubmit activation</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              FormSubmit emailed an activate link to{' '}
              <span className="text-cream">{company.email}</span>. Click it once,
              then send this form again — after that, inquiries land in the inbox.
            </p>
          </div>
        </div>
      ) : null}

      {status === 'error' && errorMessage ? (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-2xl border border-rocket/30 bg-rocket/10 px-5 py-4"
        >
          <CircleAlert
            className="mt-0.5 size-5 shrink-0 text-rocket"
            aria-hidden="true"
          />
          <p className="text-sm leading-relaxed text-muted">{errorMessage}</p>
        </div>
      ) : null}

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-muted-dim">
          By submitting, you agree we may use your details to respond to this
          inquiry. See our{' '}
          <a
            href="/privacy"
            className="text-electric-300 underline underline-offset-4 hover:text-cream"
          >
            privacy policy
          </a>
          .
        </p>

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="group/btn relative inline-flex h-13 shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full bg-electric px-7 text-base font-medium tracking-tight text-void shadow-[0_8px_30px_-8px_rgba(251,146,60,0.7)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-electric-400 hover:shadow-[0_12px_44px_-8px_rgba(251,146,60,0.85)] active:translate-y-0 disabled:pointer-events-none disabled:opacity-60"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover/btn:translate-x-full motion-reduce:hidden"
          />
          <span className="relative z-10 inline-flex items-center gap-2">
            {status === 'submitting' ? 'Sending…' : 'Send message'}
            {status === 'submitting' ? null : (
              <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            )}
          </span>
        </button>
      </div>
    </form>
  );
}
