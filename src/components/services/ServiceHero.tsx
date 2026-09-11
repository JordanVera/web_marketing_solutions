import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { StatusDot } from '@/components/ui/StatusDot';
import { company } from '@/lib/content';
import type { ServicePage as ServicePageData } from '@/lib/services';
import { AMBER_SHEEN, SERVICE_THEME } from '@/components/services/theme';
import { NebulaBackdrop } from '@/components/services/NebulaBackdrop';
import { cn } from '@/lib/utils';

export function ServiceHero({ service }: { service: ServicePageData }) {
  const Icon = service.icon;
  const theme = SERVICE_THEME[service.slug];

  return (
    <section className="relative px-5 pt-6  sm:px-6 ">
      <div className="relative mx-auto">
        <div className="relative min-h-[32rem] overflow-hidden rounded-[1.75rem] md:min-h-[36rem] md:rounded-[2rem]">
          <NebulaBackdrop
            src={theme.src}
            imageClass={theme.imageClass}
            overlayClass={theme.heroOverlay}
            sizes="(min-width: 768px) 80rem, 100vw"
            priority
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_40%,rgba(244,63,154,0.12),transparent_65%)]"
          />

          <div className="relative flex flex-col px-7 py-10 pb-20 sm:px-10 md:px-12 md:py-14 md:pb-24 lg:px-14 lg:py-16">
            <Reveal direction="up">
              <nav aria-label="Breadcrumb" className="text-sm">
                <ol className="flex flex-wrap items-center gap-2 text-cream/55">
                  <li>
                    <Link
                      href="/"
                      className="transition-colors hover:text-cream"
                    >
                      Home
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li>
                    <Link
                      href="/services"
                      className="transition-colors hover:text-cream"
                    >
                      Services
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li className="text-cream" aria-current="page">
                    {service.shortTitle}
                  </li>
                </ol>
              </nav>
            </Reveal>

            <Reveal direction="up" delay={0.06}>
              <span className="mt-10 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-void/40 px-3.5 py-1.5 font-mono text-[0.6875rem] tracking-[0.22em] text-electric uppercase backdrop-blur-sm">
                <Icon className="size-3.5" aria-hidden="true" />
                {theme.callsign} · {company.address.locality} ·{' '}
                {service.shortTitle}
              </span>
            </Reveal>

            <Reveal direction="up" delay={0.12}>
              <h1 className="text-heading mt-6 max-w-3xl font-semibold text-cream drop-shadow-[0_2px_18px_rgba(5,11,22,0.85)]">
                {service.h1}
              </h1>
            </Reveal>

            <Reveal direction="up" delay={0.18}>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/75 drop-shadow-[0_2px_12px_rgba(5,11,22,0.9)]">
                {service.lede}
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.24}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button href="/contact" size="lg" className={AMBER_SHEEN}>
                  {service.primaryCta}
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Button>
                <Button
                  href={service.secondaryHref}
                  variant="secondary"
                  size="lg"
                >
                  {service.secondaryCta}
                </Button>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="relative z-10 -mt-8 px-4 md:-mt-10 md:px-8">
          <Reveal direction="up" delay={0.1}>
            <div className="border-gradient glass-panel overflow-hidden rounded-2xl">
              <div className="flex items-center justify-between border-b border-white/6 px-5 py-3">
                <p className="font-mono text-[0.625rem] tracking-[0.22em] text-muted uppercase">
                  In this engagement
                </p>
                <p className="inline-flex items-center gap-1.5 font-mono text-[0.625rem] tracking-[0.16em] text-aurora-300 uppercase">
                  <StatusDot />
                  Nominal
                </p>
              </div>
              <ul className="grid sm:grid-cols-2 lg:grid-cols-4">
                {service.capabilities.map((item, index) => (
                  <li
                    key={item}
                    className={cn(
                      'flex items-start gap-3 px-5 py-4',
                      index > 0 && 'border-t border-white/8 sm:border-t-0',
                      index >= 2 &&
                        'sm:border-t sm:border-white/8 lg:border-t-0',
                      index % 2 === 1 && 'sm:border-l sm:border-white/8',
                      index > 0 && 'lg:border-l lg:border-white/8',
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className="mt-0.5 font-mono text-[0.625rem] tracking-[0.18em] text-aurora-300 uppercase"
                    >
                      GO
                    </span>
                    <span className="text-sm leading-relaxed text-cream">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
