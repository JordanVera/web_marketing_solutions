import type { Metadata } from "next";
import { company } from "@/lib/content";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms that govern use of the ${company.name} website.`,
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <article className="flex flex-col gap-6">
      <h1 className="text-heading font-semibold">Terms of Service</h1>

      <p className="rounded-xl border border-rocket/25 bg-rocket/5 px-5 py-4 text-sm text-cream/80">
        Placeholder copy. Replace with terms reviewed by your own counsel before going live.
      </p>

      <p className="leading-relaxed text-muted">
        By using this website you agree to these terms. Client engagements are governed by a
        separate signed statement of work, which takes precedence over anything on this page.
      </p>

      <h2 className="mt-4 text-xl font-semibold text-cream">Use of this site</h2>
      <p className="leading-relaxed text-muted">
        Content on this site is provided for general information. Case study metrics reflect
        specific engagements and are not a guarantee of comparable results.
      </p>

      <h2 className="mt-4 text-xl font-semibold text-cream">Intellectual property</h2>
      <p className="leading-relaxed text-muted">
        All site content, design, and code are owned by {company.name} unless otherwise noted.
        Client work is shown with permission.
      </p>

      <h2 className="mt-4 text-xl font-semibold text-cream">Contact</h2>
      <p className="leading-relaxed text-muted">
        Questions? Email{" "}
        <a
          href={`mailto:${company.email}`}
          className="text-electric-300 underline underline-offset-4 hover:text-cream"
        >
          {company.email}
        </a>
        .
      </p>
    </article>
  );
}
