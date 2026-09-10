import { cn } from '@/lib/utils';

type StatusDotProps = {
  /** Visual state. `nominal` blinks; `idle` is a dim static pin. */
  tone?: 'nominal' | 'idle' | 'amber';
  className?: string;
  /** Accessible label; omit when the parent already names the status. */
  label?: string;
};

/** Small HUD LED used on consoles, comms strips, and go/no-go rows. */
export function StatusDot({
  tone = 'nominal',
  className,
  label,
}: StatusDotProps) {
  const color =
    tone === 'amber'
      ? 'bg-amber shadow-[0_0_8px_2px_rgba(255,92,0,0.55)]'
      : tone === 'idle'
        ? 'bg-muted-dim'
        : 'bg-aurora shadow-[0_0_8px_2px_rgba(244,63,154,0.55)]';

  return (
    <span
      aria-hidden={label ? undefined : true}
      aria-label={label}
      className={cn(
        'inline-block size-1.5 shrink-0 rounded-full',
        color,
        tone !== 'idle' && 'animate-blink motion-reduce:animate-none',
        className,
      )}
    />
  );
}
