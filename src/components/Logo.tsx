import { cn } from '@/lib/utils';

type RocketMarkProps = {
  className?: string;
  /** Renders the animated exhaust plume beneath the rocket. */
  withFlame?: boolean;
};

/**
 * The brand mark: a geometric rocket drawn as inline SVG so it stays crisp at
 * any size, inherits theme colors, and costs no extra network request.
 */
export function RocketMark({ className, withFlame = true }: RocketMarkProps) {
  return (
    <svg
      viewBox="0 0 32 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('size-8', className)}
      aria-hidden="true"
    >
      <defs>
        {/* Horizontal gradient reads as a machined metal cylinder */}
        <linearGradient
          id="rocket-body"
          x1="11"
          y1="0"
          x2="21"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#c9d8ee" />
          <stop offset="0.32" stopColor="#ffffff" />
          <stop offset="0.72" stopColor="#dae4f4" />
          <stop offset="1" stopColor="#8ca3c4" />
        </linearGradient>
        <linearGradient
          id="rocket-fin"
          x1="6"
          y1="19"
          x2="11"
          y2="29"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#e02424" />
          <stop offset="1" stopColor="#7f1010" />
        </linearGradient>
        <linearGradient
          id="rocket-nozzle"
          x1="16"
          y1="28"
          x2="16"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#7c8ba3" />
          <stop offset="1" stopColor="#38455c" />
        </linearGradient>
        <linearGradient
          id="rocket-flame"
          x1="16"
          y1="30"
          x2="16"
          y2="39"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#bcd9ff" />
          <stop offset="0.35" stopColor="#0066ff" />
          <stop offset="1" stopColor="#0066ff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {withFlame && (
        <path
          d="M16 30.4c-1.85 3.1-2.75 5.5-2.75 7.2 0 .9.9 1.4 2.75 1.4s2.75-.5 2.75-1.4c0-1.7-.9-4.1-2.75-7.2Z"
          fill="url(#rocket-flame)"
          className="animate-pulse-glow"
        />
      )}

      {/* Swept fins */}
      <path d="M11 18.6 6.1 25.9v3.2L11 25.9V18.6Z" fill="url(#rocket-fin)" />
      <path d="M21 18.6l4.9 7.3v3.2L21 25.9V18.6Z" fill="url(#rocket-fin)" />

      {/* Fuselage */}
      <path
        d="M16 1.1c3.35 4.4 5.02 10.4 5.02 17.5v7l-1.6 2.6h-6.84l-1.6-2.6v-7C11 11.5 12.65 5.5 16 1.1Z"
        fill="url(#rocket-body)"
      />

      {/* Panel seams */}
      <path
        d="M11.2 22.3h9.6"
        stroke="#0a1628"
        strokeOpacity="0.16"
        strokeWidth="0.7"
      />
      <path
        d="M12.6 25.9h6.8"
        stroke="#0a1628"
        strokeOpacity="0.16"
        strokeWidth="0.7"
      />
      {/* Accent stripe */}
      <path d="M11.05 19.5h9.9" stroke="#e02424" strokeWidth="1.4" />

      {/* Cockpit */}
      <circle cx="16" cy="12.2" r="2.5" fill="#081120" />
      <circle
        cx="16"
        cy="12.2"
        r="2.5"
        fill="none"
        stroke="#3b8cff"
        strokeWidth="0.8"
      />
      <path
        d="M14.7 11.1a1.9 1.9 0 0 1 1.5-.75"
        stroke="#9ec8ff"
        strokeWidth="0.7"
        strokeLinecap="round"
      />

      {/* Nozzle */}
      <path
        d="M13.1 28.2h5.8l-1.05 2.5h-3.7L13.1 28.2Z"
        fill="url(#rocket-nozzle)"
      />
    </svg>
  );
}

export function Logo({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <RocketMark className="size-7 shrink-0 transition-transform duration-500 ease-out group-hover:-translate-y-0.5" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[0.9375rem] font-bold tracking-tight text-cream">
          WEB MARKETING
        </span>
        {!compact && (
          <span className="mt-1 font-mono text-[0.5625rem] tracking-[0.34em] text-muted-dim">
            SOLUTIONS · HOUSTON
          </span>
        )}
      </span>
    </span>
  );
}
