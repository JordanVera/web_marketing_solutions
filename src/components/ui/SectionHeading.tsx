import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Reveal } from './Reveal';

type SectionHeadingProps = {
  /** Small mono label above the title, e.g. "02 — Why choose us". */
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
};

const EYEBROW_INDEX = /^(\d{2})\s+[—–-]\s+(.+)$/;

function splitEyebrow(eyebrow: string) {
  const match = eyebrow.match(EYEBROW_INDEX);
  if (match) {
    return { index: match[1], label: match[2] };
  }
  return { index: null, label: eyebrow };
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}: SectionHeadingProps) {
  const { index, label } = splitEyebrow(eyebrow);

  return (
    <div
      className={cn(
        'flex flex-col gap-5',
        align === 'center'
          ? 'items-center text-center'
          : 'items-start text-left',
        className,
      )}
    >
      <Reveal direction="up">
        <span className="inline-flex items-center gap-3">
          {index && (
            <span className="font-mono text-[0.6875rem] tracking-[0.22em] text-amber tabular-nums">
              {index}
            </span>
          )}
          <span
            aria-hidden="true"
            className="h-px w-8 bg-gradient-to-r from-amber/80 to-transparent"
          />
          <span className="font-mono text-[0.6875rem] tracking-[0.22em] text-muted uppercase">
            {label}
          </span>
        </span>
      </Reveal>

      <Reveal direction="up" delay={0.08}>
        <h2
          className={cn(
            'text-heading font-semibold',
            align === 'center' && 'max-w-3xl',
          )}
        >
          {title}
        </h2>
      </Reveal>

      {description && (
        <Reveal direction="up" delay={0.16}>
          <p
            className={cn(
              'max-w-2xl text-base leading-relaxed text-muted md:text-lg',
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
