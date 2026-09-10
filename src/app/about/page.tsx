import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Rocket, Target, Users } from 'lucide-react';
import { CTA } from '@/components/CTA';
import { Button } from '@/components/ui/Button';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Reveal';
import { aboutPage, company, processSteps } from '@/lib/content';
import { servicePages, servicePath } from '@/lib/services';
import { SITE_URL } from '@/lib/utils';

export const metadata: Metadata = {
  title: aboutPage.metaTitle,
  description: aboutPage.metaDescription,
  alternates: { canonical: '/about' },
  openGraph: {
    title: aboutPage.metaTitle,
    description: aboutPage.metaDescription,
    url: `${SITE_URL}/about`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: aboutPage.metaTitle,
    description: aboutPage.metaDescription,
  },
};

const highlights = [
  {
    icon: Rocket,
    label: 'Founded',
    value: company.founded,
    detail: 'Shipping from Houston ever since',
  },
  {
    icon: Target,
    label: 'Focus',
    value: '4 disciplines',
    detail: 'Web apps, native apps, websites, SEO',
  },
  {
    icon: Users,
    label: 'Clients',
    value: '60+ brands',
    detail: 'Launched since day one',
  },
] as const;

export default function AboutPage() {
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
                  About
                </li>
              </ol>
            </nav>
          </Reveal>

          <Reveal direction="up" delay={0.08}>
            <span className="mt-10 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 font-mono text-[0.6875rem] tracking-[0.22em] text-electric-300 uppercase">
              {company.city} · Est. {company.founded}
            </span>
          </Reveal>

          <Reveal direction="up" delay={0.14}>
            <h1 className="text-heading mt-6 max-w-3xl font-semibold">
              {aboutPage.h1}
            </h1>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              {aboutPage.lede}
            </p>
          </Reveal>

          <Stagger className="mt-16 grid gap-4 sm:grid-cols-3">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={item.label}>
                  <div className="border-gradient h-full rounded-2xl bg-navy/40 p-6">
                    <Icon
                      className="size-5 text-electric-300"
                      aria-hidden="true"
                    />
                    <p className="mt-4 font-mono text-[0.625rem] tracking-[0.2em] text-muted-dim uppercase">
                      {item.label}
                    </p>
                    <p className="mt-1 text-2xl font-semibold text-cream">
                      {item.value}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {item.detail}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      <section className="border-t border-white/[0.07] py-20 md:py-28">
        <div className="container-shell">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal direction="up" className="lg:col-span-5">
              <span className="font-mono text-[0.625rem] tracking-[0.24em] text-electric-300 uppercase">
                What we do
              </span>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-cream md:text-4xl">
                A studio for the whole stack
              </h2>
              <p className="mt-6 text-base leading-relaxed text-muted">
                {aboutPage.mission}
              </p>
              <div className="mt-8">
                <Button href="/services" variant="secondary">
                  Explore services
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Button>
              </div>
            </Reveal>

            <Stagger className="lg:col-span-7 grid gap-4 sm:grid-cols-2">
              {servicePages.map((service) => {
                const Icon = service.icon;
                return (
                  <StaggerItem key={service.slug}>
                    <Link
                      href={servicePath(service.slug)}
                      className="group flex h-full flex-col rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition-colors hover:border-electric/30 hover:bg-white/[0.04]"
                    >
                      <span className="inline-flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                        <Icon
                          className="size-4 text-electric-300"
                          aria-hidden="true"
                        />
                      </span>
                      <h3 className="mt-5 text-lg font-semibold text-cream">
                        {service.shortTitle}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                        {service.homepageDescription}
                      </p>
                      <span className="mt-4 font-mono text-[0.625rem] tracking-[0.16em] text-muted uppercase transition-colors group-hover:text-cream">
                        Learn more →
                      </span>
                    </Link>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </div>
      </section>

      <section className="border-t border-white/[0.07] py-20 md:py-28">
        <div className="container-shell">
          <Reveal direction="up">
            <span className="font-mono text-[0.625rem] tracking-[0.24em] text-electric-300 uppercase">
              How we work
            </span>
            <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-cream md:text-4xl">
              Launch discipline, not agency theater
            </h2>
          </Reveal>

          <Stagger className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {aboutPage.pillars.map((pillar) => (
              <StaggerItem key={pillar.title}>
                <div className="border-gradient h-full rounded-2xl bg-navy/40 p-7">
                  <h3 className="text-lg font-semibold text-cream">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {pillar.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal direction="up" delay={0.1} className="mt-16">
            <div className="rounded-3xl border border-white/[0.08] bg-[radial-gradient(ellipse_100%_100%_at_50%_120%,#16294a_0%,#0a1628_45%,#050b16_85%)] p-8 md:p-10">
              <h3 className="font-mono text-[0.625rem] tracking-[0.24em] text-electric-300 uppercase">
                Our process
              </h3>
              <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
                {processSteps.map((step) => {
                  const Icon = step.icon;
                  return (
                    <li key={step.id}>
                      <Icon
                        className="size-4 text-electric-300"
                        aria-hidden="true"
                      />
                      <p className="mt-3 font-mono text-[0.625rem] tracking-[0.18em] text-muted-dim uppercase">
                        {step.phase}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-cream">
                        {step.title}
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-muted">
                        {step.description}
                      </p>
                    </li>
                  );
                })}
              </ol>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-white/[0.07] py-20 md:py-28">
        <div className="container-shell">
          <Reveal direction="up">
            <div className="mx-auto max-w-3xl text-center">
              <span className="font-mono text-[0.625rem] tracking-[0.24em] text-electric-300 uppercase">
                By the numbers
              </span>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-cream md:text-4xl">
                Results we measure, not promises we make
              </h2>
            </div>
          </Reveal>

          <Stagger className="mt-14 grid gap-6 sm:grid-cols-3">
            {aboutPage.stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="text-center">
                  <p className="text-4xl font-semibold tracking-tight text-cream md:text-5xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 font-mono text-[0.6875rem] tracking-[0.16em] text-muted uppercase">
                    {stat.label}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CTA />
    </main>
  );
}
