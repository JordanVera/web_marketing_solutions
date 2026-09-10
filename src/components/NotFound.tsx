import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { Starfield } from '@/components/ui/Starfield';
import { Atmosphere } from '@/components/ui/Atmosphere';
import { Button } from '@/components/ui/Button';

export function NotFound() {
  return (
    <main
      id="main"
      className="relative flex min-h-[calc(100svh-5rem)] flex-col items-center justify-center overflow-hidden px-4 pt-24 pb-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-10%,#12244a_0%,#0a1628_38%,#050b16_78%)]" />

      <div className="absolute inset-0">
        <Starfield density={0.12} speed={2} shootingStars />
      </div>

      <div className="absolute inset-0">
        <Atmosphere variant="hero" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-void"
      />

      <div className="container-shell relative z-10 flex flex-col items-center text-center">
        <p className="font-mono text-[0.6875rem] tracking-[0.28em] text-electric-300 uppercase">
          Houston, we have a problem
        </p>

        <div
          className="mt-8 flex items-center justify-center gap-[clamp(0.25rem,1.5vw,1rem)]"
          aria-label="404"
        >
          <span
            aria-hidden="true"
            className="font-display text-[clamp(5.5rem,22vw,14rem)] leading-none font-bold tracking-tighter text-cream select-none"
          >
            4
          </span>

          <span className="relative shrink-0">
            {/* <span
              aria-hidden="true"
              className="absolute -inset-[12%] rounded-full bg-electric/20 blur-2xl"
            /> */}
            <span className="relative block size-52 overflow-hidden">
              <Image
                src="/moon/dark-side.png"
                alt="The dark side of the Moon"
                fill
                priority
                sizes="(max-width: 768px) 20vw, 200px"
                className="object-cover object-center"
              />
              <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_28%,transparent_42%,rgba(5,11,22,0.55)_100%)]" />
            </span>
          </span>

          <span
            aria-hidden="true"
            className="font-display text-[clamp(5.5rem,22vw,14rem)] leading-none font-bold tracking-tighter text-cream select-none"
          >
            4
          </span>
        </div>

        <h1 className="text-heading mt-10 max-w-2xl font-semibold text-cream">
          You&apos;ve landed on the dark side of the Moon
        </h1>

        <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
          You can&apos;t land here — this page drifted off course or never
          existed. Plot a return trajectory before your oxygen runs low.
        </p>

        <div className="mt-10">
          <Button href="/" size="lg">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Return to Earth
          </Button>
        </div>
      </div>
    </main>
  );
}
