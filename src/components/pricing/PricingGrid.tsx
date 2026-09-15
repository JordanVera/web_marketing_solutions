import { Reveal, Stagger, StaggerItem } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { PricingCard } from '@/components/pricing/PricingCard';
import type { PricingPackage } from '@/lib/pricing';
import { cn } from '@/lib/utils';

type PricingGridProps = {
  packages: PricingPackage[];
  className?: string;
  columns?: 2 | 3;
  /** Animate on mount — use when the grid is toggled in-place (e.g. category tabs). */
  immediate?: boolean;
};

export function PricingGrid({
  packages,
  className,
  columns = 3,
  immediate = false,
}: PricingGridProps) {
  if (packages.length === 0) return null;

  return (
    <Stagger
      immediate={immediate}
      className={cn(
        'grid gap-5',
        columns === 3
          ? 'md:grid-cols-2 lg:grid-cols-3'
          : 'md:grid-cols-2',
        packages.length === 2 && 'mx-auto max-w-4xl',
        className,
      )}
    >
      {packages.map((pkg) => (
        <StaggerItem key={pkg.id}>
          <PricingCard pkg={pkg} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}

type PricingCustomCtaProps = {
  className?: string;
};

export function PricingCustomCta({ className }: PricingCustomCtaProps) {
  return (
    <Reveal direction="up" className={className}>
      <div className="border-gradient glass-panel relative overflow-hidden rounded-2xl p-8 md:p-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-16 -right-16 size-48 rounded-full bg-[radial-gradient(circle,rgba(251,146,60,0.15),transparent_65%)] blur-2xl"
        />
        <div className="relative grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h3 className="text-2xl font-semibold tracking-tight text-cream">
              Need something custom?
            </h3>
            <p className="mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-muted">
              Every business is different. Tell us what you need and we&apos;ll
              build a package around your exact goals, timeline, and budget.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
            <Button href="/contact" size="md">
              Contact Us
            </Button>
            <Button href="/contact" variant="secondary" size="md">
              Start a Project
            </Button>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
