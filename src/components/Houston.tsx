import { SectionHeading } from './ui/SectionHeading';
import { Atmosphere } from './ui/Atmosphere';
import { Stagger, StaggerItem } from './ui/Reveal';
import { homePage, houstonHighlights } from '@/lib/content';

export function Houston() {
  return (
    <section
      id="houston"
      className="relative scroll-mt-24 overflow-hidden py-16 md:py-24"
    >
      <Atmosphere variant="violet" />

      <div className="container-shell relative">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              align="left"
              eyebrow={homePage.houston.eyebrow}
              title={
                <>
                  {homePage.houston.title}{' '}
                  <span className="text-gradient">
                    {homePage.houston.titleAccent}
                  </span>
                </>
              }
              description={homePage.houston.description}
            />
          </div>

          <Stagger className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {houstonHighlights.map((item) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={item.title}>
                  <article className="border-gradient glass-panel group h-full rounded-2xl p-6 transition-transform duration-500 ease-out hover:-translate-y-1 active:scale-[0.98] motion-reduce:transform-none md:p-7">
                    <span className="inline-flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] transition-colors duration-500 group-hover:border-electric/30">
                      <Icon
                        className="size-5 text-electric-300"
                        strokeWidth={1.6}
                        aria-hidden="true"
                      />
                    </span>
                    <h3 className="mt-5 text-lg font-semibold tracking-tight text-cream">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted">
                      {item.description}
                    </p>
                  </article>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
