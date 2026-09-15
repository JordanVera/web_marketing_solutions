'use client';

import { useState } from 'react';
import { PricingGrid, PricingCustomCta } from '@/components/pricing/PricingGrid';
import { Reveal } from '@/components/ui/Reveal';
import { pricingCategories, type PricingCategory } from '@/lib/pricing';
import { cn } from '@/lib/utils';

type PricingCategoryFilterProps = {
  categories?: PricingCategory[];
};

export function PricingCategoryFilter({
  categories = pricingCategories,
}: PricingCategoryFilterProps) {
  const [activeId, setActiveId] = useState(categories[0]?.id ?? '');

  const activeCategory =
    categories.find((category) => category.id === activeId) ?? categories[0];

  return (
    <>
      <Reveal direction="up">
        <div
          role="tablist"
          aria-label="Pricing categories"
          className="flex flex-wrap gap-2"
        >
          {categories.map((category) => {
            const isActive = category.id === activeId;
            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveId(category.id)}
                className={cn(
                  'rounded-full border px-4 py-2 font-mono text-[0.6875rem] tracking-[0.14em] uppercase transition-all duration-300',
                  isActive
                    ? 'border-electric/40 bg-electric/15 text-cream'
                    : 'border-white/10 bg-white/[0.03] text-muted hover:border-white/20 hover:text-cream',
                )}
              >
                {category.label}
              </button>
            );
          })}
        </div>
      </Reveal>

      {activeCategory && (
        <div
          key={activeCategory.id}
          role="tabpanel"
          aria-label={`${activeCategory.label} pricing`}
          className="mt-12"
        >
          <PricingGrid packages={activeCategory.packages} immediate />
        </div>
      )}

      <PricingCustomCta className="mt-16" />
    </>
  );
}
