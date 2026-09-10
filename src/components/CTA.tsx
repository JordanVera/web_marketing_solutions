import { ArrowRight, Mail } from 'lucide-react';
import { Atmosphere } from './ui/Atmosphere';
import { Button } from './ui/Button';
import { Reveal } from './ui/Reveal';
import { company, homePage } from '@/lib/content';

const AMBER_SHEEN =
  'shadow-[0_8px_36px_-8px_rgba(255,92,0,0.5),0_8px_30px_-8px_rgba(26,212,238,0.55)]';

export function CTA() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden py-24 md:py-32"
    >
      <Atmosphere variant="horizon" />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-electric/40 to-transparent"
      />

      <div className="container-shell relative">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Reveal direction="up">
            <span className="inline-flex items-center gap-3">
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-amber shadow-[0_0_10px_2px_rgba(255,92,0,0.65)]"
              />
              <span className="font-mono text-[0.625rem] tracking-[0.24em] text-muted uppercase">
                {homePage.cta.eyebrow}
              </span>
            </span>
          </Reveal>

          <Reveal direction="up" delay={0.08}>
            <h2 className="text-display mt-8 font-semibold">
              {homePage.cta.title}{' '}
              <span className="text-gradient">{homePage.cta.titleAccent}</span>
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
            <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-mono text-[0.625rem] tracking-[0.16em] text-muted-dim uppercase">
              {homePage.cta.trustSignals.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="size-1 rounded-full bg-amber"
                  />
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
