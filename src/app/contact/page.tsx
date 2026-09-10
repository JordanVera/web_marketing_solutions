import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Clock, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { company, contactPage } from "@/lib/content";
import { SITE_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: contactPage.metaTitle,
  description: contactPage.metaDescription,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: contactPage.metaTitle,
    description: contactPage.metaDescription,
    url: `${SITE_URL}/contact`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: contactPage.metaTitle,
    description: contactPage.metaDescription,
  },
};

const PHONE_HREF = `tel:${company.phone.replace(/[^\d+]/g, "")}`;

type ContactPageProps = {
  searchParams: Promise<{ sent?: string }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const { sent } = await searchParams;
  const submitted = sent === "1";

  return (
    <main id="main">
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-1/2 h-[36rem] w-[56rem] -translate-x-1/2 bg-[radial-gradient(ellipse_50%_40%_at_50%_20%,rgba(0,102,255,0.16),transparent_70%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 right-0 size-[28rem] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.12),transparent_65%)] blur-3xl"
        />

        <div className="container-shell relative">
          <Reveal direction="up">
            <nav aria-label="Breadcrumb" className="text-sm">
              <ol className="flex flex-wrap items-center gap-2 text-muted-dim">
                <li>
                  <Link href="/" className="transition-colors hover:text-cream">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-cream" aria-current="page">
                  Contact
                </li>
              </ol>
            </nav>
          </Reveal>

          <Reveal direction="up" delay={0.08}>
            <span className="mt-10 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 font-mono text-[0.6875rem] tracking-[0.22em] text-electric-300 uppercase">
              Mission control
            </span>
          </Reveal>

          <Reveal direction="up" delay={0.14}>
            <h1 className="text-heading mt-6 max-w-3xl font-semibold">{contactPage.h1}</h1>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{contactPage.lede}</p>
          </Reveal>

          {submitted && (
            <Reveal direction="up" delay={0.24}>
              <div
                role="status"
                className="mt-10 flex items-start gap-3 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-5 py-4"
              >
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-400" aria-hidden="true" />
                <div>
                  <p className="font-medium text-cream">Message received — we&apos;re on it.</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    Expect a reply within two business days. If this is your first submission, check your
                    inbox for a FormSubmit confirmation email.
                  </p>
                </div>
              </div>
            </Reveal>
          )}

          <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-12">
            <Reveal direction="up" delay={0.26} className="lg:col-span-7">
              <div className="border-gradient rounded-3xl bg-navy/40 p-6 md:p-8">
                <h2 className="text-xl font-semibold text-cream">Send a message</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Share your goals and we&apos;ll send back scope, timeline, and price within two business
                  days.
                </p>
                <div className="mt-8">
                  <ContactForm />
                </div>
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.32} className="lg:col-span-5">
              <div className="flex flex-col gap-6">
                <div className="rounded-3xl border border-white/[0.09] bg-[radial-gradient(ellipse_100%_100%_at_50%_120%,#16294a_0%,#0a1628_45%,#050b16_85%)] p-6 md:p-8">
                  <h2 className="font-mono text-[0.625rem] tracking-[0.24em] text-electric-300 uppercase">
                    Direct line
                  </h2>
                  <ul className="mt-6 flex flex-col gap-5">
                    <li>
                      <a
                        href={`mailto:${company.email}`}
                        className="group flex items-start gap-4 text-muted transition-colors hover:text-cream"
                      >
                        <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                          <Mail className="size-4 text-electric-300" aria-hidden="true" />
                        </span>
                        <span>
                          <span className="block text-xs font-mono tracking-[0.16em] text-muted-dim uppercase">
                            Email
                          </span>
                          <span className="mt-1 block text-sm text-cream group-hover:text-cream">
                            {company.email}
                          </span>
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href={PHONE_HREF}
                        className="group flex items-start gap-4 text-muted transition-colors hover:text-cream"
                      >
                        <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                          <Phone className="size-4 text-electric-300" aria-hidden="true" />
                        </span>
                        <span>
                          <span className="block text-xs font-mono tracking-[0.16em] text-muted-dim uppercase">
                            Phone
                          </span>
                          <span className="mt-1 block text-sm text-cream">{company.phone}</span>
                        </span>
                      </a>
                    </li>
                    <li className="flex items-start gap-4">
                      <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                        <MapPin className="size-4 text-electric-300" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-xs font-mono tracking-[0.16em] text-muted-dim uppercase">
                          Studio
                        </span>
                        <address className="mt-1 text-sm not-italic leading-relaxed text-cream">
                          {company.address.street}
                          <br />
                          {company.address.locality}, {company.address.region}{" "}
                          {company.address.postalCode}
                        </address>
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 size-4 shrink-0 text-electric-300" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-medium text-cream">Response time</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted">
                        We reply to every serious inquiry within two business days — usually faster.
                      </p>
                    </div>
                  </div>
                  <ul className="mt-6 flex flex-col gap-2.5 border-t border-white/[0.07] pt-6 font-mono text-[0.625rem] tracking-[0.16em] text-muted-dim uppercase">
                    {contactPage.trustSignals.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span aria-hidden="true" className="size-1 rounded-full bg-electric-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
