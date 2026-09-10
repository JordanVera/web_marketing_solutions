import type { Metadata } from "next";
import { company } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${company.name} collects, uses, and protects information submitted through this website.`,
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <article className="flex flex-col gap-6">
      <h1 className="text-heading font-semibold">Privacy Policy</h1>

      <p className="rounded-xl border border-rocket/25 bg-rocket/5 px-5 py-4 text-sm text-cream/80">
        Placeholder copy. Replace with a policy reviewed by your own counsel before going live.
      </p>

      <p className="leading-relaxed text-muted">
        {company.name} collects only the information you choose to send us — typically your name,
        email address, and details about your project — plus aggregate analytics about how this site
        is used.
      </p>

      <h2 className="mt-4 text-xl font-semibold text-cream">What we collect</h2>
      <ul className="flex list-disc flex-col gap-2 pl-5 leading-relaxed text-muted">
        <li>Contact details you submit through a form or email.</li>
        <li>Anonymous usage analytics, including pages viewed and referring source.</li>
        <li>Standard server logs such as IP address and browser user agent.</li>
      </ul>

      <h2 className="mt-4 text-xl font-semibold text-cream">How we use it</h2>
      <p className="leading-relaxed text-muted">
        To reply to your inquiry, deliver work you have engaged us for, and improve this website. We
        do not sell personal information.
      </p>

      <h2 className="mt-4 text-xl font-semibold text-cream">Contact</h2>
      <p className="leading-relaxed text-muted">
        Questions about this policy? Email{" "}
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
