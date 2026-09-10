import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { AMBER_SHEEN } from '@/components/services/theme';
import { NebulaBackdrop } from '@/components/services/NebulaBackdrop';

export function FlightCheckCta({
  title,
  action,
}: {
  title: string;
  action: string;
}) {
  return (
    <section className="relative py-8 md:py-12">
      <div className="container-shell">
        <Reveal direction="up">
          <div className="border-gradient glass-panel relative flex flex-col justify-between overflow-hidden rounded-2xl bg-void/50 p-7 md:flex-row md:items-end md:p-8">
            <NebulaBackdrop
              src="/space/consultation-nebula.webp"
              imageClass="object-center"
              overlayClass="bg-linear-to-r from-void/88 via-void/70 to-void/40 md:via-void/55 md:to-void/30"
              sizes="(min-width: 768px) 80rem, 100vw"
            />
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 z-10 h-px bg-linear-to-r from-transparent via-electric/70 to-transparent"
            />
            <div className="relative z-10 max-w-xl">
              <p className="font-mono text-[0.625rem] tracking-[0.22em] text-electric-300 uppercase">
                Next step
              </p>
              <p className="mt-2 text-xl font-semibold tracking-tight text-cream drop-shadow-[0_2px_14px_rgba(5,11,22,0.85)]">
                {title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-cream/75 drop-shadow-[0_2px_12px_rgba(5,11,22,0.9)]">
                Bring the outcome you need. We will reply with scope,
                timeline, and price within two business days.
              </p>
            </div>
            <div className="relative z-10 mt-7 md:mt-0">
              <Button href="/contact" size="lg" className={AMBER_SHEEN}>
                {action}
                <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
