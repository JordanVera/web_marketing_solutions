import { Reveal } from '@/components/ui/Reveal';
import type { ServiceBlock } from '@/lib/services';

export function ProcessRail({ steps }: { steps: ServiceBlock[] }) {
  return (
    <div className="relative mt-14">
      <div
        aria-hidden="true"
        className="absolute top-8 bottom-8 left-[1.35rem] w-px bg-white/8"
      >
        <span className="block h-full w-full bg-linear-to-b from-electric via-aurora to-aurora-500" />
      </div>
      <ol className="flex flex-col gap-5">
        {steps.map((step, index) => (
          <Reveal
            key={step.title}
            direction="up"
            delay={index * 0.06}
            as="li"
            className="relative flex gap-5"
          >
            <span className="relative z-10 grid size-11 shrink-0 place-items-center rounded-full border border-electric/40 bg-void font-mono text-[0.625rem] tracking-[0.16em] text-electric-300">
              {String(index + 1).padStart(2, '0')}
            </span>
            <article className="border-gradient glass-panel min-w-0 flex-1 rounded-2xl px-5 py-5 md:px-6">
              <p className="font-mono text-[0.625rem] tracking-[0.22em] text-aurora-300 uppercase">
                Step {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight text-cream">
                {step.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">
                {step.body}
              </p>
            </article>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
