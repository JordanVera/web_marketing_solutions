import Image from 'next/image';
import { ArrowRight, Mail } from 'lucide-react';
import { Atmosphere } from './ui/Atmosphere';
import { Button } from './ui/Button';
import { Reveal } from './ui/Reveal';
import { StatusDot } from './ui/StatusDot';
import { company, homePage } from '@/lib/content';

const AMBER_SHEEN =
  'shadow-[0_8px_36px_-8px_rgba(255,92,0,0.5),0_8px_30px_-8px_rgba(251,146,60,0.55)]';

export function CTA() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden py-24 md:py-32"
    >
      <Atmosphere variant="horizon" />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-px bg-gradient-to-r from-transparent via-aurora/40 to-transparent"
      />

      <div className="container-shell relative z-10">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Reveal direction="up">
            <span className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
              <StatusDot />
              <span className="font-mono text-[0.625rem] tracking-[0.24em] text-muted uppercase">
                {homePage.cta.windowLabel}
              </span>
            </span>
          </Reveal>

          <Reveal direction="up" delay={0.08}>
            <h2 className="text-display mt-8 font-semibold">
              {homePage.cta.title}{' '}
              <span className="text-electric">{homePage.cta.titleAccent}</span>
            </h2>
          </Reveal>

          <Reveal direction="up" delay={0.16}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
              {homePage.cta.lede}
            </p>
          </Reveal>

          <Reveal direction="up" delay={0.24}>
            <div className="mt-11 flex flex-col items-center gap-3 sm:flex-row">
              <Button href="/contact" size="lg" className={AMBER_SHEEN}>
                {homePage.cta.primaryCta}
                <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Button>
              <Button
                href={`mailto:${company.email}`}
                variant="secondary"
                size="lg"
              >
                <Mail className="size-4" aria-hidden="true" />
                {company.email}
              </Button>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.32}>
            <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-mono text-[0.625rem] tracking-[0.16em] text-muted uppercase">
              {homePage.cta.trustSignals.map((item) => (
                <li key={item} className="inline-flex items-center gap-2">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function MoonHorizon() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-40 overflow-hidden md:h-56"
    >
      <div className="glow-aurora absolute -bottom-24 left-1/2 size-[36rem] -translate-x-1/2 rounded-full blur-3xl" />
      <div className="absolute top-[calc(100%-5rem)] left-1/2 aspect-square w-[160vw] -translate-x-1/2 md:top-[calc(100%-7rem)]">
        <Image
          src="/moon/full-moon.webp"
          alt=""
          fill
          sizes="160vw"
          className="scale-[1.01] object-cover object-top opacity-80"
        />
        <div className="absolute inset-0 rounded-full shadow-[inset_0_0_80px_rgba(244,63,154,0.18)]" />
      </div>
    </div>
  );
}
