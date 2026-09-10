import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { ContactForm } from '@/components/ContactForm';
import { company, contactPage, socials } from '@/lib/content';
import { SITE_URL } from '@/lib/utils';

export const metadata: Metadata = {
  title: contactPage.metaTitle,
  description: contactPage.metaDescription,
  alternates: { canonical: '/contact' },
  openGraph: {
    title: contactPage.metaTitle,
    description: contactPage.metaDescription,
    url: `${SITE_URL}/contact`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: contactPage.metaTitle,
    description: contactPage.metaDescription,
  },
};

const PHONE_HREF = `tel:${company.phone.replace(/[^\d+]/g, '')}`;

type ContactPageProps = {
  searchParams: Promise<{ sent?: string }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const { sent } = await searchParams;
  const submitted = sent === '1';

  return (
    <main id="main" className=" p-6">
      <div className="relative min-h-[calc(100svh-6.5rem)] overflow-hidden rounded-[1.75rem] md:min-h-[calc(100svh-7rem)] md:rounded-[2rem]">
        <Image
          src="/space/pillars-of-creation.webp"
          alt=""
          fill
          priority
          sizes="(min-width: 768px) 80rem, 100vw"
          className="object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-br from-void/82 via-void/62 to-void/48"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_50%,rgba(244,63,154,0.12),transparent_65%)]"
        />

        <div className="relative flex min-h-[inherit] flex-col lg:grid lg:grid-cols-[3fr_2fr]">
          <div className="flex flex-col justify-between px-7 py-10 sm:px-10 md:px-12 md:py-14 lg:px-14 lg:py-16">
            <div>
              <p className="font-mono text-[0.6875rem] tracking-[0.24em] text-electric-300 uppercase">
                Mission control
              </p>
              <h1 className="text-heading mt-5 max-w-xl font-semibold text-cream">
                {contactPage.h1}
              </h1>
              <p className="mt-5 max-w-md text-base leading-relaxed text-cream/75 md:text-lg">
                {contactPage.lede}
              </p>

              {submitted && (
                <div
                  role="status"
                  className="mt-8 flex max-w-md items-start gap-3 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-5 py-4"
                >
                  <CheckCircle2
                    className="mt-0.5 size-5 shrink-0 text-emerald-400"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-medium text-cream">
                      Message received — we&apos;re on it.
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-cream/70">
                      Expect a reply within two business days.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-6">
              <div>
                <p className="font-mono text-[0.625rem] tracking-[0.2em] text-cream/50 uppercase">
                  Location
                </p>
                <address className="mt-3 text-sm not-italic leading-relaxed text-cream/85">
                  {company.name}
                  <br />
                  {company.address.street}
                  <br />
                  {company.address.locality}, {company.address.region}{' '}
                  {company.address.postalCode}
                </address>
                <p className="mt-3 text-xs leading-relaxed text-cream/60">
                  Monday – Friday
                  <br />
                  9:00 AM – 6:00 PM CT
                </p>
              </div>

              <div>
                <p className="font-mono text-[0.625rem] tracking-[0.2em] text-cream/50 uppercase">
                  Social media
                </p>
                <ul className="mt-3 flex flex-col gap-2">
                  {socials.map((social) => (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-cream/85 transition-colors hover:text-cream"
                      >
                        {social.label}
                      </a>
                    </li>
                  ))}
                  <li>
                    <Link
                      href="/"
                      className="text-sm text-cream/85 transition-colors hover:text-cream"
                    >
                      Home
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <p className="font-mono text-[0.625rem] tracking-[0.2em] text-cream/50 uppercase">
                  Email
                </p>
                <a
                  href={`mailto:${company.email}`}
                  className="mt-3 block text-sm text-cream/85 transition-colors hover:text-cream"
                >
                  {company.email}
                </a>
              </div>

              <div>
                <p className="font-mono text-[0.625rem] tracking-[0.2em] text-cream/50 uppercase">
                  Contact
                </p>
                <a
                  href={PHONE_HREF}
                  className="mt-3 block text-sm text-cream/85 transition-colors hover:text-cream"
                >
                  {company.phone}
                </a>
              </div>
            </div>
          </div>

          <div className="flex items-stretch px-5 pb-8 sm:px-8 lg:px-8 lg:py-10 lg:pr-10 xl:pr-12">
            <div className="flex w-full flex-col rounded-3xl bg-cream px-7 py-8 shadow-[0_24px_80px_-20px_rgba(5,11,22,0.55)] sm:px-9 sm:py-10 lg:px-10">
              <h2 className="text-2xl font-semibold tracking-tight text-void">
                Tell us what you need
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Our team is ready to assist you with scope, timeline, and
                pricing — usually within two business days.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
