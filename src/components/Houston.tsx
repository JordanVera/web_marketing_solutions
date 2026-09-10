import { SectionHeading } from './ui/SectionHeading';
import { Atmosphere } from './ui/Atmosphere';
import { Stagger, StaggerItem } from './ui/Reveal';
import { StatusDot } from './ui/StatusDot';
import { Telemetry } from './ui/Telemetry';
import { MissionClock } from './ui/MissionClock';
import { homePage, houstonHighlights } from '@/lib/content';

export function Houston() {
  const { callsign, station, coordinates } = homePage.houston.console;

  return (
    <section
      id="houston"
      className="relative scroll-mt-24 overflow-hidden py-16 md:py-24"
    >
      <Atmosphere variant="aurora" />
      <RadarSweep />

      <div className="container-shell relative">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-3 border-y border-white/[0.06] py-3">
          <p className="inline-flex items-center gap-3 font-mono text-[0.625rem] tracking-[0.22em] text-muted uppercase">
            <StatusDot tone="nominal" />
            {callsign} · {station} · {coordinates}
          </p>
          <p className="inline-flex items-center gap-2 font-mono text-[0.625rem] tracking-[0.18em] text-aurora-300 uppercase">
            <span className="text-muted-dim">CST</span>
            <MissionClock
              timeZone="America/Chicago"
              className="tabular-nums text-cream"
            />
          </p>
        </div>

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

          <div className="grid gap-4 lg:col-span-7">
            <Stagger className="grid gap-4 sm:grid-cols-2">
              {houstonHighlights.map((item, index) => {
                const Icon = item.icon;
                const sys = `SYS-${String(index + 1).padStart(2, '0')}`;
                return (
                  <StaggerItem key={item.title}>
                    <article className="border-gradient glass-panel group relative h-full overflow-hidden rounded-2xl p-6 transition-transform duration-500 ease-out hover:-translate-y-1 active:scale-[0.98] motion-reduce:transform-none md:p-7">
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
                      <span className="relative mt-5 inline-flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] transition-colors duration-500 group-hover:border-aurora/30">
                        <Icon
                          className="size-5 text-aurora-300"
                          strokeWidth={1.6}
                          aria-hidden="true"
                        />
                      </span>
                      <h3 className="relative mt-5 text-lg font-semibold tracking-tight text-cream">
                        {item.title}
                      </h3>
                      <p className="relative mt-2.5 text-[0.9375rem] leading-relaxed text-muted">
                        {item.description}
                      </p>
                    </article>
                  </StaggerItem>
                );
              })}
            </Stagger>

            {/* <Telemetry rows={homePage.telemetry} /> */}
          </div>
        </div>
      </div>
    </section>
  );
}

function RadarSweep() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute top-1/2 right-[-8rem] size-[36rem] -translate-y-1/2 opacity-40 lg:right-[4%] lg:opacity-70"
    >
      <div className="absolute inset-0 rounded-full border border-aurora/15" />
      <div className="absolute inset-[12%] rounded-full border border-aurora/10" />
      <div className="absolute inset-[28%] rounded-full border border-aurora/10" />
      <div className="absolute inset-[48%] rounded-full border border-electric/10" />
      <div className="absolute inset-x-0 top-1/2 h-px bg-aurora/10" />
      <div className="absolute inset-y-0 left-1/2 w-px bg-aurora/10" />
      <div className="animate-sweep motion-reduce:animate-none absolute inset-0 origin-center rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,rgba(45,212,191,0.28)_22deg,transparent_48deg)]" />
    </div>
  );
}
