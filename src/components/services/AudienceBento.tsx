import { Reveal, Stagger, StaggerItem } from '@/components/ui/Reveal';
import { StatusDot } from '@/components/ui/StatusDot';
import type { ServiceBlock } from '@/lib/services';
import { cn } from '@/lib/utils';

export function AudienceBento({ items }: { items: ServiceBlock[] }) {
  const [featured, ...rest] = items;
  if (!featured) return null;

  const stacked = rest.slice(0, 2);
  const trailing = rest.slice(2);

  return (
    <div className="mt-14 grid gap-4 lg:grid-cols-12">
      <Reveal direction="up" className="lg:col-span-7">
        <AudienceTile
          block={featured}
          sys="SYS-01"
          featured
        />
      </Reveal>

      {stacked.length > 0 && (
        <Stagger className="grid gap-4 lg:col-span-5">
          {stacked.map((block, index) => (
            <StaggerItem key={block.title}>
              <AudienceTile
                block={block}
                sys={`SYS-${String(index + 2).padStart(2, '0')}`}
              />
            </StaggerItem>
          ))}
        </Stagger>
      )}

      {trailing.length > 0 && (
        <Stagger
          className={cn(
            'grid gap-4 lg:col-span-12',
            trailing.length > 1 && 'sm:grid-cols-2',
          )}
        >
          {trailing.map((block, index) => (
            <StaggerItem key={block.title}>
              <AudienceTile
                block={block}
                sys={`SYS-${String(index + stacked.length + 2).padStart(2, '0')}`}
              />
            </StaggerItem>
          ))}
        </Stagger>
      )}
    </div>
  );
}

function AudienceTile({
  block,
  sys,
  featured = false,
}: {
  block: ServiceBlock;
  sys: string;
  featured?: boolean;
}) {
  return (
    <article
      className={cn(
        'border-gradient glass-panel group relative h-full overflow-hidden rounded-2xl p-6 transition-transform duration-500 ease-out hover:-translate-y-1 motion-reduce:transform-none md:p-7',
        featured && 'md:p-8',
      )}
    >
      <div
        aria-hidden="true"
        className="bg-scanlines pointer-events-none absolute inset-0 opacity-60"
      />
      <div className="relative flex items-center justify-between">
        <span className="font-mono text-[0.625rem] tracking-[0.2em] text-muted-dim uppercase">
          {sys}
        </span>
        <span className="inline-flex items-center gap-1.5 font-mono text-[0.625rem] tracking-[0.16em] text-aurora-300 uppercase">
          <StatusDot />
          Nominal
        </span>
      </div>
      <h3
        className={cn(
          'relative mt-5 font-semibold tracking-tight text-cream',
          featured ? 'text-xl md:text-2xl' : 'text-lg',
        )}
      >
        {block.title}
      </h3>
      <p className="relative mt-3 text-[0.9375rem] leading-relaxed text-muted">
        {block.body}
      </p>
    </article>
  );
}
