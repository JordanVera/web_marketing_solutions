'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { CheckCircle2, CircleAlert } from 'lucide-react';
import { company } from '@/lib/content';
import { servicePages } from '@/lib/services';
import { SITE_URL, cn } from '@/lib/utils';

const FIELD =
  'w-full rounded-xl border border-navy-500/15 bg-white px-4 py-3 text-sm text-void placeholder:text-muted-dim transition-colors focus:border-electric focus:outline-none focus:ring-2 focus:ring-electric/20';

const FORMSUBMIT_ACTION = `https://formsubmit.co/${company.email}`;
const FORMSUBMIT_AJAX = `https://formsubmit.co/ajax/${company.email}`;

const INQUIRY_OPTIONS = [
  'General',
  ...servicePages.map((service) => service.shortTitle),
  'Other',
] as const;

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
  const [inquiry, setInquiry] = useState<string>('General');

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

    const firstName = String(data.get('first_name') ?? '').trim();
    const lastName = String(data.get('last_name') ?? '').trim();
    data.set('name', `${firstName} ${lastName}`.trim());
    data.delete('first_name');
    data.delete('last_name');
    data.set('service', inquiry);
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
        setInquiry('General');
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
        className="flex items-start gap-3 rounded-2xl border border-emerald-500/25 bg-emerald-50 px-5 py-4"
      >
        <CheckCircle2
          className="mt-0.5 size-5 shrink-0 text-emerald-600"
          aria-hidden="true"
        />
        <div>
          <p className="font-medium text-void">Message received — we&apos;re on it.</p>
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

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact-first-name" className="text-sm text-void/80">
            First name <span className="text-rocket">*</span>
          </label>
          <input
            id="contact-first-name"
            type="text"
            name="first_name"
            required
            autoComplete="given-name"
            placeholder="Jane"
            className={FIELD}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact-last-name" className="text-sm text-void/80">
            Last name <span className="text-rocket">*</span>
          </label>
          <input
            id="contact-last-name"
            type="text"
            name="last_name"
            required
            autoComplete="family-name"
            placeholder="Smith"
            className={FIELD}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact-country" className="text-sm text-void/80">
            Country
          </label>
          <input
            id="contact-country"
            type="text"
            name="country"
            autoComplete="country-name"
            placeholder="United States"
            className={FIELD}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact-phone" className="text-sm text-void/80">
            Phone number
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

      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-email" className="text-sm text-void/80">
          Email address <span className="text-rocket">*</span>
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

      <fieldset className="flex flex-col gap-3">
        <legend className="text-sm text-void/80">Type of inquiry</legend>
        <div className="flex flex-wrap gap-2">
          {INQUIRY_OPTIONS.map((option) => {
            const selected = inquiry === option;
            return (
              <button
                key={option}
                type="button"
                onClick={() => setInquiry(option)}
                aria-pressed={selected}
                className={cn(
                  'rounded-full border px-4 py-2 text-sm transition-colors',
                  selected
                    ? 'border-void bg-void/5 font-medium text-void'
                    : 'border-navy-500/20 text-muted hover:border-navy-500/40 hover:text-void',
                )}
              >
                {option}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-message" className="text-sm text-void/80">
          Message <span className="text-rocket">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder="Tell us about your project — goals, timeline, budget range, anything that helps us prepare a real flight plan."
          className={cn(FIELD, 'min-h-32 resize-y')}
        />
      </div>

      <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-muted">
        <input
          type="checkbox"
          name="updates"
          value="yes"
          className="mt-0.5 size-4 shrink-0 rounded border-navy-500/25 accent-electric"
        />
        I&apos;d like to receive project updates and insights.
      </label>

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
          className="flex items-start gap-3 rounded-2xl border border-amber-500/25 bg-amber-50 px-5 py-4"
        >
          <CircleAlert
            className="mt-0.5 size-5 shrink-0 text-amber-600"
            aria-hidden="true"
          />
          <div>
            <p className="font-medium text-void">One-time FormSubmit activation</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              FormSubmit emailed an activate link to{' '}
              <span className="text-void">{company.email}</span>. Click it once,
              then send this form again — after that, inquiries land in the inbox.
            </p>
          </div>
        </div>
      ) : null}

      {status === 'error' && errorMessage ? (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-2xl border border-rocket/25 bg-red-50 px-5 py-4"
        >
          <CircleAlert
            className="mt-0.5 size-5 shrink-0 text-rocket"
            aria-hidden="true"
          />
          <p className="text-sm leading-relaxed text-muted">{errorMessage}</p>
        </div>
      ) : null}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-1 w-full rounded-full border-2 border-void py-3.5 text-sm font-semibold text-void transition-colors hover:bg-void hover:text-cream disabled:pointer-events-none disabled:opacity-60"
      >
        {status === 'submitting' ? 'Sending…' : 'Submit'}
      </button>

      <p className="text-center text-xs leading-relaxed text-muted-dim">
        By submitting, you agree we may use your details to respond to this
        inquiry. See our{' '}
        <a
          href="/privacy"
          className="text-void/70 underline underline-offset-4 hover:text-void"
        >
          privacy policy
        </a>
        .
      </p>
    </form>
  );
}
