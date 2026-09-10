'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import {
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'framer-motion';
import { SectionHeading } from './ui/SectionHeading';
import { Atmosphere } from './ui/Atmosphere';
import { homePage, processSteps, type ProcessStep } from '@/lib/content';
import { cn } from '@/lib/utils';

/** Gravity-turn trajectory: top (T-4) to bottom (T+1), left-biased so cards sit to the right. */
const TRAJECTORY =
  'M 56 48 C 56 200, 176 280, 72 430 S 186 620, 64 790 S 150 900, 88 940';
const VIEW_W = 640;
const VIEW_H = 980;

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
      <Atmosphere variant="aurora" />

      <div className="container-shell relative">
        <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-16">
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
            <div className="lg:hidden">
              <MobileRail progress={progress} reduced={Boolean(prefersReducedMotion)} />
            </div>
            <div className="hidden lg:block">
              <TrajectoryCanvas
                progress={progress}
                reduced={Boolean(prefersReducedMotion)}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MobileRail({
  progress,
  reduced,
}: {
  progress: ReturnType<typeof useSpring>;
  reduced: boolean;
}) {
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute top-8 bottom-8 left-[1.35rem] w-px bg-white/[0.08]"
      >
        <motion.div
          className="h-full w-full origin-top bg-gradient-to-b from-electric via-aurora to-aurora-500"
          style={{ scaleY: reduced ? 1 : progress }}
        />
      </div>
      <ol className="relative flex flex-col gap-5">
        {processSteps.map((step, index) => (
          <StepItem key={step.id} step={step} index={index} />
        ))}
      </ol>
    </>
  );
}

function TrajectoryCanvas({
  progress,
  reduced,
}: {
  progress: ReturnType<typeof useSpring>;
  reduced: boolean;
}) {
  const pathRef = useRef<SVGPathElement | null>(null);
  const markerX = useMotionValue(56);
  const markerY = useMotionValue(28);
  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);
  const [passed, setPassed] = useState(0);

  useLayoutEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const length = path.getTotalLength();
    const n = processSteps.length;
    setPoints(
      Array.from({ length: n }, (_, i) => {
        const p = path.getPointAtLength((i / (n - 1)) * length);
        return { x: p.x, y: p.y };
      }),
    );
    const start = path.getPointAtLength(reduced ? length : 0);
    markerX.set(start.x);
    markerY.set(start.y);
  }, [markerX, markerY, reduced]);

  useMotionValueEvent(progress, 'change', (value) => {
    const path = pathRef.current;
    if (!path) return;
    const t = reduced ? 1 : Math.min(1, Math.max(0, value));
    const p = path.getPointAtLength(t * path.getTotalLength());
    markerX.set(p.x);
    markerY.set(p.y);
    setPassed(Math.round(t * (processSteps.length - 1)));
  });

  return (
    <div className="relative min-h-[58rem]">
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        aria-hidden="true"
      >
        <path
          d={TRAJECTORY}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="2"
        />
        <path
          ref={pathRef}
          d={TRAJECTORY}
          fill="none"
          stroke="url(#traj-aurora)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="traj-aurora" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#5ee4f5" />
            <stop offset="0.55" stopColor="#2dd4bf" />
            <stop offset="1" stopColor="#10b981" />
          </linearGradient>
        </defs>
        {points.map((point, index) => (
          <circle
            key={processSteps[index].id}
            cx={point.x}
            cy={point.y}
            r={index <= passed ? 7 : 5}
            fill={index <= passed ? '#2dd4bf' : '#0a1628'}
            stroke={index <= passed ? '#5eead4' : 'rgba(255,255,255,0.2)'}
            strokeWidth="1.5"
          />
        ))}
        <motion.circle
          cx={markerX}
          cy={markerY}
          r="9"
          fill="#1ad4ee"
          className="drop-shadow-[0_0_10px_rgba(26,212,238,0.8)]"
        />
      </svg>

      <ol className="absolute inset-0">
        {processSteps.map((step, index) => {
          const point = points[index];
          if (!point) return null;
          return (
            <li
              key={step.id}
              className="absolute w-[min(100%-7rem,28rem)]"
              style={{
                left: `calc(${(point.x / VIEW_W) * 100}% + 2.25rem)`,
                top: `${(point.y / VIEW_H) * 100}%`,
                transform: 'translateY(-50%)',
              }}
            >
              <StepCard step={step} active={index <= passed} />
            </li>
          );
        })}
      </ol>
    </div>
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
          className="relative grid size-11 place-items-center rounded-full border bg-void"
          animate={{
            borderColor: inView
              ? 'rgba(45,212,191,0.55)'
              : 'rgba(255,255,255,0.10)',
          }}
          transition={{ duration: 0.6, delay: index * 0.06 }}
        >
          <Icon
            className={
              inView ? 'size-5 text-aurora-300' : 'size-5 text-muted-dim'
            }
            strokeWidth={1.6}
            aria-hidden="true"
          />
        </motion.span>
      </div>

      <StepCard step={step} active={inView} />
    </motion.li>
  );
}

function StepCard({ step, active }: { step: ProcessStep; active: boolean }) {
  const Icon = step.icon;
  return (
    <article
      className={cn(
        'border-gradient glass-panel min-w-0 flex-1 rounded-2xl px-5 py-5 transition-colors duration-500 md:px-6',
        active && 'bg-white/[0.03]',
      )}
    >
      <p className="flex items-center gap-3 font-mono text-[0.625rem] tracking-[0.22em] text-aurora-300 uppercase">
        <span>{step.clock}</span>
        <span className="text-muted-dim">{step.phase}</span>
      </p>
      <h3 className="mt-2 flex items-center gap-2 text-xl font-semibold tracking-tight text-cream">
        <Icon
          className="hidden size-4 text-electric-300 lg:inline-block"
          strokeWidth={1.8}
          aria-hidden="true"
        />
        {step.title}
      </h3>
      <p className="mt-2.5 text-sm leading-relaxed text-muted">
        {step.description}
      </p>
    </article>
  );
}
