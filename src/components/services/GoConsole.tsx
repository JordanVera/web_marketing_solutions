import { StatusDot } from '@/components/ui/StatusDot';
import { cn } from '@/lib/utils';

type GoConsoleProps = {
  items: string[];
  label?: string;
  className?: string;
};

export function GoConsole({
  items,
  label = 'Flight check',
  className,
}: GoConsoleProps) {
  return (
    <div
      className={cn(
        'border-gradient glass-panel overflow-hidden rounded-2xl',
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-white/6 px-5 py-3">
        <p className="font-mono text-[0.625rem] tracking-[0.22em] text-muted uppercase">
          {label}
        </p>
        <p className="inline-flex items-center gap-1.5 font-mono text-[0.625rem] tracking-[0.16em] text-aurora-300 uppercase">
          <StatusDot />
          GO
        </p>
      </div>
      <ul className="divide-y divide-white/6">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 px-5 py-3.5">
            <span
              aria-hidden="true"
              className="mt-0.5 shrink-0 font-mono text-[0.625rem] tracking-[0.18em] text-aurora-300 uppercase"
            >
              GO
            </span>
            <span className="text-sm leading-relaxed text-cream">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
