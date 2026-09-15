import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Atmosphere } from '@/components/ui/Atmosphere';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PricingGrid } from '@/components/pricing/PricingGrid';
import { SERVICE_THEME } from '@/components/services/theme';
import type { ServiceSlug } from '@/lib/services';
import { getPackagesByServiceSlug } from '@/lib/pricing';

type ServicePricingSectionProps = {
  slug: ServiceSlug;
  eyebrow: string;
};

export function ServicePricingSection({
  slug,
  eyebrow,
}: ServicePricingSectionProps) {
  const packages = getPackagesByServiceSlug(slug);
  if (packages.length === 0) return null;

  const theme = SERVICE_THEME[slug];
  const columns = packages.length <= 2 ? 2 : 3;

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <Atmosphere variant={theme.atmosphere} className="opacity-35" />
      <div className="container-shell relative">
        <SectionHeading
          align="left"
          eyebrow={eyebrow}
          title={
            <>
              Packages & <span className="text-electric">starting prices.</span>
            </>
          }
          description="Starting packages for common scopes. Every engagement is scoped to your goals — these are launch points, not rigid boxes."
        />

        <PricingGrid packages={packages} columns={columns} className="mt-14" />

        <Reveal direction="up" className="mt-10">
          <Link
            href="/pricing"
            className="group inline-flex items-center gap-1.5 font-mono text-[0.6875rem] tracking-[0.16em] text-muted uppercase transition-colors hover:text-cream"
          >
            View all pricing
            <ArrowUpRight
              className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
