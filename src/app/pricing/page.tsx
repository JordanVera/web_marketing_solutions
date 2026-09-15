import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { CTA } from '@/components/CTA';
import { PricingCategoryFilter } from '@/components/pricing/PricingCategoryFilter';
import { Reveal } from '@/components/ui/Reveal';
import { company } from '@/lib/content';
import { pricingHub } from '@/lib/pricing';
import { SITE_URL } from '@/lib/utils';

export const metadata: Metadata = {
  title: pricingHub.metaTitle,
  description: pricingHub.metaDescription,
  alternates: { canonical: '/pricing' },
  openGraph: {
    title: pricingHub.metaTitle,
    description: pricingHub.metaDescription,
    url: `${SITE_URL}/pricing`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: pricingHub.metaTitle,
    description: pricingHub.metaDescription,
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: pricingHub.metaTitle,
  description: pricingHub.metaDescription,
  url: `${SITE_URL}/pricing`,
  isPartOf: { '@type': 'WebSite', url: SITE_URL },
  provider: {
    '@type': 'ProfessionalService',
    name: company.name,
    url: SITE_URL,
    telephone: company.phone,
  },
};

export default function PricingPage() {
  return (
    <>
      <JsonLd data={structuredData} />

      <main id="main">
        <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-1/2 h-[36rem] w-[56rem] -translate-x-1/2 bg-[radial-gradient(ellipse_50%_40%_at_50%_20%,rgba(251,146,60,0.14),transparent_70%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 right-0 size-[28rem] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.1),transparent_65%)] blur-3xl"
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
                    Pricing
                  </li>
                </ol>
              </nav>
            </Reveal>

            <Reveal direction="up" delay={0.08}>
              <span className="mt-10 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 font-mono text-[0.6875rem] tracking-[0.22em] text-electric-300 uppercase">
                Pricing Plans
              </span>
            </Reveal>

            <Reveal direction="up" delay={0.14}>
              <h1 className="text-heading mt-6 max-w-3xl font-semibold">
                {pricingHub.h1}{' '}
                <span className="text-electric">{pricingHub.h1Accent}</span>
              </h1>
            </Reveal>

            <Reveal direction="up" delay={0.2}>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
                {pricingHub.lede}
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.26}>
              <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
                {pricingHub.trustSignals.map((signal) => (
                  <li
                    key={signal}
                    className="inline-flex items-center gap-2 text-sm text-muted"
                  >
                    <CheckCircle2
                      className="size-4 shrink-0 text-electric-300"
                      aria-hidden="true"
                    />
                    {signal}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <section className="relative pb-20 md:pb-28">
          <div className="container-shell">
            <PricingCategoryFilter />
          </div>
        </section>

        <CTA />
      </main>
    </>
  );
}
