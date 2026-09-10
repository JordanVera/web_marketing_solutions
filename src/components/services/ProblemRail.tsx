import {
  Atmosphere,
  type AtmosphereVariant,
} from '@/components/ui/Atmosphere';
import { Reveal } from '@/components/ui/Reveal';
import type { ServiceBlock } from '@/lib/services';

export function ProblemRail({
  items,
  atmosphere,
}: {
  items: ServiceBlock[];
  atmosphere: AtmosphereVariant;
}) {
  return (
    <div className="relative mt-14">
      <Atmosphere variant={atmosphere} className="opacity-50" />
      <ol className="relative flex flex-col gap-10 md:gap-12">
        {items.map((block, index) => (
          <Reveal
            key={block.title}
            direction="up"
            delay={index * 0.06}
            as="li"
          >
            <article className="grid gap-4 md:grid-cols-[5.5rem_minmax(0,1fr)] md:gap-10">
              <span className="font-mono text-sm tracking-[0.22em] text-electric-300">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="border-t border-white/8 pt-4 md:border-t-0 md:border-l md:pt-0 md:pl-10">
                <h3 className="text-xl font-semibold tracking-tight text-cream md:text-2xl">
                  {block.title}
                </h3>
                <p className="mt-3 max-w-3xl text-[0.9375rem] leading-relaxed text-muted md:text-base">
                  {block.body}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
