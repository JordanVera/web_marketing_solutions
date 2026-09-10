'use client';

import { useRef } from 'react';
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'framer-motion';
import { SectionHeading } from './ui/SectionHeading';
import { Atmosphere } from './ui/Atmosphere';
import { homePage, processSteps, type ProcessStep } from '@/lib/content';

export function Process() {
  const railRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ['start 0.85', 'end 0.55'],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <section
      id="process"
      className="relative scroll-mt-24 overflow-hidden py-16 md:py-24"
    >
      <Atmosphere variant="violet" />

      <div className="container-shell relative">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 lg:items-start">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                align="left"
                eyebrow={homePage.process.eyebrow}
                title={
                  <>
                    {homePage.process.title}{' '}
                    <span className="text-gradient">
                      {homePage.process.titleAccent}
                    </span>
                  </>
                }
                description={homePage.process.description}
              />
            </div>
          </div>

          <div ref={railRef} className="relative mt-12 lg:col-span-8 lg:mt-0">
            <div
              aria-hidden="true"
              className="absolute top-8 bottom-8 left-[1.35rem] w-px bg-white/[0.08]"
            >
              <motion.div
                className="h-full w-full origin-top bg-gradient-to-b from-electric via-nebula-400 to-amber"
                style={{ scaleY: prefersReducedMotion ? 1 : progress }}
              />
            </div>

            <ol className="relative flex flex-col gap-5">
              {processSteps.map((step, index) => (
                <StepItem key={step.id} step={step} index={index} />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepItem({ step, index }: { step: ProcessStep; index: number }) {
  const ref = useRef<HTMLLIElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.45 });
  const prefersReducedMotion = useReducedMotion();
  const Icon = step.icon;

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.65,
        delay: index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative flex gap-5"
    >
      <div className="relative z-10 shrink-0">
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-electric/35 blur-lg"
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 0.8, delay: index * 0.06 }}
        />
        <motion.span
          className="relative grid size-11 place-items-center rounded-full border bg-void"
          animate={{
            borderColor: inView
              ? 'rgba(26,212,238,0.55)'
              : 'rgba(255,255,255,0.10)',
          }}
          transition={{ duration: 0.6, delay: index * 0.06 }}
        >
          <Icon
            className={
              inView ? 'size-5 text-electric-300' : 'size-5 text-muted-dim'
            }
            strokeWidth={1.6}
            aria-hidden="true"
          />
        </motion.span>
      </div>

      <article className="border-gradient glass-panel min-w-0 flex-1 rounded-2xl px-5 py-5 md:px-6">
        <p className="font-mono text-[0.625rem] tracking-[0.22em] text-amber uppercase">
          {step.phase}
        </p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-cream">
          {step.title}
        </h3>
        <p className="mt-2.5 text-sm leading-relaxed text-muted">
          {step.description}
        </p>
      </article>
    </motion.li>
  );
}
