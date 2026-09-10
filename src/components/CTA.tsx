'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';
import { Starfield } from './ui/Starfield';
import { Button } from './ui/Button';
import { Reveal } from './ui/Reveal';
import { company } from '@/lib/content';

export function CTA() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="contact" className="relative scroll-mt-24 py-12 md:py-20">
      <div className="container-shell">
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.09] bg-[radial-gradient(ellipse_100%_100%_at_50%_120%,#16294a_0%,#0a1628_45%,#050b16_85%)] px-6 py-16 text-center md:px-16 md:py-20">
          <Starfield density={0.12} speed={3} className="opacity-80" />

          {/* Slowly counter-rotating orbit rings */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            {[
              { size: '44rem', duration: 60, color: 'rgba(124,178,255,0.16)' },
              { size: '32rem', duration: 45, color: 'rgba(168,85,247,0.16)' },
              { size: '22rem', duration: 30, color: 'rgba(255,107,92,0.14)' },
            ].map((ring, index) => (
              <motion.span
                key={ring.size}
                className="absolute rounded-full border border-dashed"
                style={{
                  width: ring.size,
                  height: ring.size,
                  borderColor: ring.color,
                }}
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { rotate: index % 2 ? -360 : 360 }
                }
                transition={{
                  duration: ring.duration,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            ))}
          </div>

          <div
            aria-hidden="true"
            className="animate-pulse-glow pointer-events-none absolute -bottom-32 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,102,255,0.35),transparent_65%)] blur-3xl"
          />

          <div className="relative mx-auto flex max-w-3xl flex-col items-center">
            <Reveal direction="up">
              <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-mono text-[0.625rem] tracking-[0.24em] text-electric-300 uppercase backdrop-blur-sm">
                <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
                Launch window open
              </span>
            </Reveal>

            <Reveal direction="up" delay={0.08}>
              <h2 className="text-display mt-8 font-semibold">
                Ready for <span className="text-gradient">liftoff?</span>
              </h2>
            </Reveal>

            <Reveal direction="up" delay={0.16}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
                Tell us where you want to be twelve months from now. We&apos;ll
                send back a real flight plan — scope, timeline, and price —
                within two business days.
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.24}>
              <div className="mt-11 flex flex-col items-center gap-3 sm:flex-row">
                <Button href="/contact" size="lg">
                  Start Your Launch
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
                {[
                  'No long-term contracts',
                  'Houston-based team',
                  'Reply in 2 business days',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="size-1 rounded-full bg-electric-400"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
