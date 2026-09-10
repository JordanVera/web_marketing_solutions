'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';
import { homePage, heroStats } from '@/lib/content';
import { Stagger, StaggerItem } from './ui/Reveal';

const METRICS = [
  {
    value: heroStats[1].value,
    label: heroStats[1].label,
  },
  {
    value: heroStats[2].value,
    label: heroStats[2].label,
  },
  {
    value: homePage.telemetry[1].readout,
    label: homePage.telemetry[1].label,
  },
  {
    value: homePage.telemetry[2].readout,
    label: homePage.telemetry[2].label,
  },
  {
    value: homePage.telemetry[3].readout,
    label: homePage.telemetry[3].label,
  },
] as const;

const METRIC_PARTS = /^(.*?)(\d+(?:\.\d+)?)(.*)$/;

function splitMetric(value: string) {
  const match = value.match(METRIC_PARTS);
  if (!match) return null;
  return {
    prefix: match[1],
    number: Number(match[2]),
    suffix: match[3],
  };
}

export function TrustBar() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="proof"
      aria-label="Key results"
      className="relative z-10 -mt-16 scroll-mt-24 pb-8 md:-mt-20 md:pb-12"
    >
      <div className="container-shell">
        <div
          ref={ref}
          className="border-gradient glass-panel overflow-hidden rounded-2xl"
        >
          <Stagger
            className="flex flex-col md:grid md:grid-cols-5"
            staggerChildren={0.08}
          >
            {METRICS.map((metric, index) => {
              const parts = splitMetric(metric.value);
              return (
                <StaggerItem
                  key={metric.label}
                  className="px-6 py-5 md:px-5 md:py-7"
                >
                  <div
                    className={
                      index === 0
                        ? ''
                        : 'border-t border-white/[0.08] pt-5 md:border-t-0 md:border-l md:pl-5'
                    }
                  >
                    <p className="font-display text-2xl font-semibold tracking-tight text-cream tabular-nums sm:text-3xl">
                      {parts ? (
                        <>
                          {parts.prefix}
                          <Counter
                            to={parts.number}
                            inView={inView}
                            prefersReducedMotion={Boolean(prefersReducedMotion)}
                          />
                          {parts.suffix}
                        </>
                      ) : (
                        metric.value
                      )}
                    </p>
                    <p className="mt-2 text-xs leading-snug text-muted-dim">
                      {metric.label}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

function Counter({
  to,
  inView,
  prefersReducedMotion,
}: {
  to: number;
  inView: boolean;
  prefersReducedMotion: boolean;
}) {
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion) {
      setAnimated(to);
      return;
    }
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setAnimated(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, to, prefersReducedMotion]);

  return <span>{animated}</span>;
}
