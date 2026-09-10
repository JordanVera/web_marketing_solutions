"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { SectionHeading } from "./ui/SectionHeading";
import { RocketMark } from "./Logo";
import { processSteps, type ProcessStep } from "@/lib/content";

export function Process() {
  const railRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Progress of the connector is tied to how far the rail has scrolled through
  // the viewport, so the line "draws" as the reader moves down the steps.
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 0.85", "end 0.55"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });
  const rocketLeft = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" className="relative scroll-mt-24 overflow-hidden py-16 md:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_30%_at_50%_72%,rgba(124,58,237,0.12),transparent_70%)]"
      />

      <div className="container-shell relative">
        <SectionHeading
          eyebrow="04 — How we work"
          title={
            <>
              A flight plan, not a <span className="text-gradient">guessing game</span>
            </>
          }
          description="Five phases, fixed deliverables, and a written go/no-go at every gate. You always know what's shipping next and why."
        />

        <div ref={railRef} className="relative mt-12">
          {/* Vertical rail (mobile / tablet) */}
          <div
            aria-hidden="true"
            className="absolute top-7 bottom-7 left-7 w-px bg-white/[0.09] lg:hidden"
          >
            <motion.div
              className="h-full w-full origin-top bg-gradient-to-b from-electric via-electric-300 to-nebula-400"
              style={{ scaleY: prefersReducedMotion ? 1 : progress }}
            />
          </div>

          {/* Horizontal rail (desktop) */}
          <div
            aria-hidden="true"
            className="absolute top-7 left-7 hidden h-px bg-white/[0.09] lg:block"
            // Ends at the centre of the fifth node: one column (20%) minus half a node + column gap.
            style={{ right: "calc(20% - 3.4rem)" }}
          >
            <motion.div
              className="h-full w-full origin-left bg-gradient-to-r from-electric via-electric-300 to-nebula-400"
              style={{ scaleX: prefersReducedMotion ? 1 : progress }}
            />
            {!prefersReducedMotion && (
              <motion.div
                className="absolute -top-4 -ml-3 w-6"
                style={{ left: rocketLeft }}
              >
                <RocketMark
                  withFlame={false}
                  className="size-6 rotate-90 drop-shadow-[0_0_10px_rgba(0,102,255,0.9)]"
                />
              </motion.div>
            )}
          </div>

          <ol className="relative flex flex-col gap-12 lg:grid lg:grid-cols-5 lg:gap-8">
            {processSteps.map((step, index) => (
              <StepItem key={step.id} step={step} index={index} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function StepItem({ step, index }: { step: ProcessStep; index: number }) {
  const ref = useRef<HTMLLIElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const prefersReducedMotion = useReducedMotion();
  const Icon = step.icon;

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex gap-6 lg:flex-col lg:gap-0"
    >
      <div className="relative z-10 shrink-0">
        {/* Halo that lights up once the step is reached */}
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-electric/40 blur-lg"
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 0.8, delay: index * 0.06 }}
        />
        <motion.span
          className="relative grid size-14 place-items-center rounded-full border bg-void"
          animate={{
            borderColor: inView ? "rgba(59,140,255,0.55)" : "rgba(255,255,255,0.10)",
          }}
          transition={{ duration: 0.6, delay: index * 0.06 }}
        >
          <Icon
            className={inView ? "size-6 text-electric-300" : "size-6 text-muted-dim"}
            strokeWidth={1.6}
            aria-hidden="true"
          />
        </motion.span>
      </div>

      <div className="lg:mt-7 lg:pr-6">
        <p className="font-mono text-[0.625rem] tracking-[0.22em] text-muted-dim uppercase">
          {step.phase}
        </p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-cream">{step.title}</h3>
        <p className="mt-2.5 text-sm leading-relaxed text-muted">{step.description}</p>
      </div>
    </motion.li>
  );
}
