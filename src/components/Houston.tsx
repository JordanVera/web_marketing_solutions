"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { Radio } from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "./ui/Reveal";
import { Starfield } from "./ui/Starfield";
import { company, houstonHighlights } from "@/lib/content";
import { seededRandom } from "@/lib/utils";

const TELEMETRY = [
  { label: "Organic sessions", readout: "+148%", fill: 0.92 },
  { label: "Core Web Vitals", readout: "98/100", fill: 0.98 },
  { label: "Conversion rate", readout: "+38%", fill: 0.74 },
  { label: "Client retention", readout: "94%", fill: 0.94 },
];

export function Houston() {
  return (
    <section id="houston" className="relative scroll-mt-24 overflow-hidden pt-16 pb-0 md:pt-24">
      <Starfield density={0.07} speed={2} className="opacity-60" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_20%_50%,rgba(124,58,237,0.13),transparent_70%)]"
      />

      <div className="container-shell relative">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              align="left"
              eyebrow="02 — Why Houston"
              title={
                <>
                  Built in <span className="text-gradient">Space City</span>
                </>
              }
              description="Houston doesn't do incremental. It's the city that put people on the moon and still runs every mission from a room full of screens. We build marketing the same way."
            />

            <Stagger className="mt-8 flex flex-col gap-8">
              {houstonHighlights.map((item) => {
                const Icon = item.icon;
                return (
                  <StaggerItem key={item.title} className="flex gap-5">
                    <span className="mt-0.5 inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                      <Icon className="size-5 text-electric-300" strokeWidth={1.6} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight text-cream">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
                        {item.description}
                      </p>
                    </div>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>

          <Reveal direction="left" amount={0.2}>
            <MissionControlConsole />
          </Reveal>
        </div>
      </div>

      <Skyline />
    </section>
  );
}

/** A stylized flight-console panel: chrome, coordinates, telemetry, trend trace. */
function MissionControlConsole() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      ref={ref}
      className="border-gradient relative overflow-hidden rounded-2xl bg-navy/60 backdrop-blur-md"
    >
      {/* Slow scanline sweep for a CRT-console feel */}
      {!prefersReducedMotion && (
        <div
          aria-hidden="true"
          className="animate-scan pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-transparent via-electric/[0.07] to-transparent"
        />
      )}

      <header className="flex items-center justify-between gap-4 border-b border-white/[0.07] px-5 py-3.5">
        <div className="flex items-center gap-2" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-rocket/70" />
          <span className="size-2.5 rounded-full bg-amber-400/60" />
          <span className="size-2.5 rounded-full bg-emerald-400/60" />
        </div>
        <p className="font-mono text-[0.625rem] tracking-[0.22em] text-muted uppercase">
          Mission control · HOU
        </p>
        <span className="inline-flex items-center gap-1.5 font-mono text-[0.625rem] tracking-[0.14em] text-emerald-300 uppercase">
          <Radio className="size-3" aria-hidden="true" />
          Live
        </span>
      </header>

      <div className="relative p-5 md:p-7">
        <dl className="grid grid-cols-2 gap-4">
          <Readout label="Latitude" value={`${company.coordinates.lat.toFixed(4)}° N`} />
          <Readout label="Longitude" value={`${Math.abs(company.coordinates.lng).toFixed(4)}° W`} />
        </dl>

        <div className="mt-7 flex flex-col gap-5">
          {TELEMETRY.map((metric, index) => (
            <div key={metric.label}>
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-muted uppercase">
                  {metric.label}
                </span>
                <span className="font-display text-sm font-semibold text-cream">
                  {metric.readout}
                </span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-electric to-electric-300"
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: metric.fill } : { scaleX: 0 }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 1.2,
                    delay: prefersReducedMotion ? 0 : 0.25 + index * 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{ originX: 0 }}
                />
              </div>
            </div>
          ))}
        </div>

        <TrendTrace inView={inView} prefersReducedMotion={Boolean(prefersReducedMotion)} />

        <footer className="mt-6 flex items-end justify-between gap-4 border-t border-white/[0.07] pt-5">
          <div>
            <p className="font-mono text-[0.625rem] tracking-[0.2em] text-muted-dim uppercase">
              Launches completed
            </p>
            <p className="mt-1.5 font-display text-3xl font-bold text-cream">
              <Counter to={60} inView={inView} prefersReducedMotion={Boolean(prefersReducedMotion)} />+
            </p>
          </div>
          <div className="text-right">
            <p className="font-mono text-[0.625rem] tracking-[0.2em] text-muted-dim uppercase">
              Since
            </p>
            <p className="mt-1.5 font-display text-3xl font-bold text-cream">{company.founded}</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

function Readout({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-void/50 px-4 py-3">
      <dt className="font-mono text-[0.5625rem] tracking-[0.2em] text-muted-dim uppercase">
        {label}
      </dt>
      <dd className="mt-1.5 font-mono text-sm text-electric-300">{value}</dd>
    </div>
  );
}

/** Sparkline that draws itself once the console scrolls into view. */
function TrendTrace({
  inView,
  prefersReducedMotion,
}: {
  inView: boolean;
  prefersReducedMotion: boolean;
}) {
  const points = [4, 18, 12, 30, 24, 42, 38, 56, 62, 78, 72, 92];
  const path = points
    .map((value, index) => {
      const x = (index / (points.length - 1)) * 100;
      const y = 100 - value;
      return `${index === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");

  return (
    <div className="mt-7 rounded-xl border border-white/[0.07] bg-void/50 p-4">
      <p className="font-mono text-[0.5625rem] tracking-[0.2em] text-muted-dim uppercase">
        12-month growth trace
      </p>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="mt-3 h-24 w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="trace-stroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0066ff" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
        {[25, 50, 75].map((y) => (
          <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="rgba(147,164,191,0.12)" strokeWidth="0.4" />
        ))}
        <motion.path
          d={path}
          fill="none"
          stroke="url(#trace-stroke)"
          strokeWidth="1.6"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 1.8, ease: "easeInOut", delay: 0.4 }}
        />
      </svg>
    </div>
  );
}

function Counter({
  to,
  inView,
  prefersReducedMotion,
}: {
  to: number;
  inView: boolean;
  prefersReducedMotion: boolean;
}) {
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    if (!inView || prefersReducedMotion) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setAnimated(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, to, prefersReducedMotion]);

  return <span>{prefersReducedMotion ? to : animated}</span>;
}

/** Houston's skyline, drawn from data so the silhouette is easy to tweak. */
function Skyline() {
  const random = seededRandom(77058);

  // [x, width, height] on a 1440 x 280 canvas with the baseline at y = 280.
  const buildings: Array<[number, number, number]> = [
    [20, 58, 88],
    [84, 40, 128],
    [130, 68, 68],
    [204, 46, 162],
    [256, 34, 108],
    [400, 50, 138],
    [548, 44, 118],
    [598, 64, 178],
    [668, 38, 98],
    [712, 72, 196],
    [790, 50, 142],
    [938, 40, 102],
    [982, 68, 168],
    [1056, 46, 128],
    [1200, 42, 112],
    [1248, 64, 158],
    [1318, 50, 92],
    [1374, 58, 132],
  ];

  return (
    <div aria-hidden="true" className="pointer-events-none relative mt-12 md:mt-16">
      <svg
        viewBox="0 0 1440 280"
        preserveAspectRatio="none"
        className="h-40 w-full md:h-56"
        role="presentation"
      >
        <defs>
          <linearGradient id="skyline-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#16294a" />
            <stop offset="100%" stopColor="#050b16" />
          </linearGradient>
          <linearGradient id="skyline-rim" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0066ff" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#7cb2ff" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        <g fill="url(#skyline-fill)">
          {buildings.map(([x, width, height]) => (
            <rect key={`b-${x}`} x={x} y={280 - height} width={width} height={height} rx="1" />
          ))}

          {/* Sloped-top tower, a nod to the Chase Tower */}
          <path d="M312 280V72l52-20 26 20v208Z" />
          {/* Tallest tower with a spire */}
          <path d="M452 280V44h88v236Z" />
          <path d="M494 44V16h2v28Z" />
          {/* Twin-setback tower */}
          <path d="M846 280V62h84v218Zm12-218V40h60v22Z" />
          {/* Stepped tower */}
          <path d="M1108 280V70h88v210Zm18-210V48h52v22Z" />
        </g>

        {/* Lit rim along the rooftops */}
        <g stroke="url(#skyline-rim)" strokeWidth="1.5">
          {buildings.map(([x, width, height]) => (
            <line key={`r-${x}`} x1={x} y1={280 - height} x2={x + width} y2={280 - height} />
          ))}
          <line x1="452" y1="44" x2="540" y2="44" />
          <line x1="846" y1="40" x2="930" y2="40" />
          <line x1="1108" y1="48" x2="1196" y2="48" />
        </g>

        {/* Scattered office windows */}
        <g fill="#7cb2ff">
          {buildings.flatMap(([x, width, height]) => {
            const count = Math.floor(random() * 5) + 2;
            return Array.from({ length: count }, (_, i) => (
              <rect
                key={`w-${x}-${i}`}
                x={x + 6 + random() * (width - 14)}
                y={280 - height + 10 + random() * (height - 24)}
                width="3"
                height="4"
                opacity={0.2 + random() * 0.5}
              />
            ));
          })}
        </g>
      </svg>

      {/* Ground haze blending the skyline into the next section */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-void via-void/70 to-transparent" />
    </div>
  );
}
