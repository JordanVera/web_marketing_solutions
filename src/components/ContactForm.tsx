import { ArrowRight } from "lucide-react";
import { company } from "@/lib/content";
import { servicePages } from "@/lib/services";
import { SITE_URL, cn } from "@/lib/utils";

const FIELD =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-cream placeholder:text-muted-dim transition-colors focus:border-electric-400/60 focus:outline-none";

type ContactFormProps = {
  className?: string;
};

export function ContactForm({ className }: ContactFormProps) {
  const formAction = `https://formsubmit.co/${encodeURIComponent(company.email)}`;

  return (
    <form
      action={formAction}
      method="POST"
      className={cn("flex flex-col gap-5", className)}
    >
      <input type="hidden" name="_subject" value="New inquiry — Web Marketing Solutions" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_next" value={`${SITE_URL}/contact?sent=1`} />
      {/* Honeypot — leave empty */}
      <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-name" className="font-mono text-[0.625rem] tracking-[0.16em] text-muted uppercase">
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
          <label htmlFor="contact-email" className="font-mono text-[0.625rem] tracking-[0.16em] text-muted uppercase">
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
          <label htmlFor="contact-company" className="font-mono text-[0.625rem] tracking-[0.16em] text-muted uppercase">
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
          <label htmlFor="contact-phone" className="font-mono text-[0.625rem] tracking-[0.16em] text-muted uppercase">
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
        <label htmlFor="contact-service" className="font-mono text-[0.625rem] tracking-[0.16em] text-muted uppercase">
          What can we help with?
        </label>
        <select id="contact-service" name="service" defaultValue="" className={cn(FIELD, "cursor-pointer")}>
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
        <label htmlFor="contact-message" className="font-mono text-[0.625rem] tracking-[0.16em] text-muted uppercase">
          Project details <span className="text-rocket">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder="Tell us where you want to be twelve months from now — goals, timeline, budget range, anything that helps us prepare a real flight plan."
          className={cn(FIELD, "resize-y min-h-32")}
        />
      </div>

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-muted-dim">
          By submitting, you agree we may use your details to respond to this inquiry. See our{" "}
          <a href="/privacy" className="text-electric-300 underline underline-offset-4 hover:text-cream">
            privacy policy
          </a>
          .
        </p>

        <button
          type="submit"
          className="group/btn relative inline-flex h-13 shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full bg-electric px-7 text-base font-medium tracking-tight text-white shadow-[0_8px_30px_-8px_rgba(0,102,255,0.85)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-electric-400 hover:shadow-[0_12px_44px_-8px_rgba(0,102,255,0.95)] active:translate-y-0"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover/btn:translate-x-full motion-reduce:hidden"
          />
          <span className="relative z-10 inline-flex items-center gap-2">
            Send message
            <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </span>
        </button>
      </div>
    </form>
  );
}
