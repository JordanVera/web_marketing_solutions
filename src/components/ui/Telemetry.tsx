'use client';

import { useEffect, useRef } from 'react';
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'framer-motion';
import { cn } from '@/lib/utils';

type TelemetryRow = {
  label: string;
  readout: string;
  fill: number;
};

type TelemetryProps = {
  rows: readonly TelemetryRow[];
  className?: string;
};

/**
 * Mission-control telemetry board. Numeric readouts count up and bars fill
 * the first time the panel scrolls into view. Reduced motion renders the
 * settled state immediately.
 */
export function Telemetry({ rows, className }: TelemetryProps) {
  return (
    <div
      className={cn(
        'border-gradient glass-panel overflow-hidden rounded-2xl',
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3">
        <p className="font-mono text-[0.625rem] tracking-[0.22em] text-muted uppercase">
          Telemetry
        </p>
        <p className="font-mono text-[0.625rem] tracking-[0.18em] text-aurora-300 uppercase">
          Live
        </p>
      </div>
      <ul className="divide-y divide-white/[0.06]">
        {rows.map((row) => (
          <li key={row.label}>
            <TelemetryRowItem row={row} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function TelemetryRowItem({ row }: { row: TelemetryRow }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const prefersReducedMotion = useReducedMotion();
  const progress = useMotionValue(prefersReducedMotion ? 1 : 0);
  const width = useTransform(progress, (p) => `${p * row.fill * 100}%`);
  const display = useTransform(progress, (p) =>
    interpolateReadout(row.readout, p),
  );

  useEffect(() => {
    if (prefersReducedMotion) {
      progress.set(1);
      return;
    }
    if (!inView) return;
    const controls = animate(progress, 1, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [inView, prefersReducedMotion, progress]);

  return (
    <div ref={ref} className="px-5 py-4">
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-sm text-muted">{row.label}</p>
        <motion.p className="font-mono text-sm tracking-tight text-cream tabular-nums">
          {display}
        </motion.p>
      </div>
      <div className="mt-2.5 h-px overflow-hidden bg-white/[0.08]">
        <motion.div
          style={{ width }}
          className="h-full bg-gradient-to-r from-electric to-aurora"
        />
      </div>
    </div>
  );
}

/** Animate the first numeric run in a readout, preserving prefix/suffix. */
function interpolateReadout(readout: string, t: number) {
  const match = readout.match(/^([^0-9]*)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return readout;
  const [, prefix, digits, suffix] = match;
  const target = Number(digits);
  const current = target * t;
  const decimals = digits.includes('.') ? digits.split('.')[1].length : 0;
  return `${prefix}${current.toFixed(decimals)}${suffix}`;
}
