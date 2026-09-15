import { Check, Phone } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import {
  formatPrice,
  getBadgeLabel,
  getPeriodLabel,
  type PricingPackage,
} from '@/lib/pricing';
import { company } from '@/lib/content';
import { cn } from '@/lib/utils';

const PHONE_HREF = `tel:${company.phone.replace(/[^\d+]/g, '')}`;

type PricingCardProps = {
  pkg: PricingPackage;
  className?: string;
};

export function PricingCard({ pkg, className }: PricingCardProps) {
  const isHighlighted = pkg.highlighted || Boolean(pkg.badge);

  return (
    <article
      className={cn(
        'border-gradient relative flex h-full flex-col overflow-hidden rounded-2xl',
        isHighlighted ? 'glass-panel' : 'bg-navy/40',
        className,
      )}
    >
      {pkg.badge && (
        <span className="absolute top-0 right-0 rounded-bl-xl bg-electric px-3.5 py-1.5 font-mono text-[0.625rem] tracking-[0.16em] text-void uppercase">
          {getBadgeLabel(pkg.badge)}
        </span>
      )}

      <div className="flex flex-1 flex-col p-7 md:p-8">
        <h3 className="text-xl font-semibold tracking-tight text-cream">
          {pkg.name}
        </h3>

        <div className="mt-5 flex items-baseline gap-2">
          {pkg.price !== null ? (
            <span className="font-display text-4xl font-semibold tracking-tight text-cream">
              {formatPrice(pkg.price)}
            </span>
          ) : (
            <span className="font-display text-4xl font-semibold tracking-tight text-cream">
              Custom
            </span>
          )}
        </div>
        <p className="mt-1 font-mono text-[0.6875rem] tracking-[0.16em] text-muted uppercase">
          {getPeriodLabel(pkg.period)}
        </p>

        <ul className="mt-8 flex-1 space-y-3.5">
          {pkg.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full border border-electric/30 bg-electric/10">
                <Check
                  className="size-3 text-electric-300"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
              </span>
              <span className="text-[0.9375rem] leading-relaxed text-muted">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col gap-3">
          <Button href="/contact" size="md" className="w-full">
            Get Started
          </Button>
          <Button
            href={PHONE_HREF}
            variant="secondary"
            size="sm"
            className="w-full"
          >
            <Phone className="size-3.5" aria-hidden="true" />
            {company.phone}
          </Button>
        </div>
      </div>
    </article>
  );
}
