'use client';

import { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { ArrowRight, MapPin, Play } from 'lucide-react';
import { Starfield } from './ui/Starfield';
import { Button } from './ui/Button';
import { RocketMark } from './Logo';
import { heroStats } from '@/lib/content';

const HEADLINE = ['Web', 'Marketing', 'Solutions', 'for'];
const HEADLINE_ACCENT = ['Ambitious', 'Brands'];

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Drives every parallax layer: 0 at the top of the hero, 1 once scrolled past.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const starsY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const nebulaY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const horizonY = useTransform(scrollYProgress, [0, 1], ['0%', '-14%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  const parallax = (value: typeof starsY) =>
    prefersReducedMotion ? undefined : value;

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-svh flex-col justify-center overflow-hidden pt-28 pb-16"
    >
      {/* ---------- Background layers, back to front ---------- */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-10%,#12244a_0%,#0a1628_38%,#050b16_78%)]" />

      <motion.div style={{ y: parallax(starsY) }} className="absolute inset-0">
        <Starfield density={0.17} speed={4} shootingStars />
      </motion.div>

      <motion.div
        style={{ y: parallax(nebulaY) }}
        className="absolute inset-0"
        aria-hidden="true"
      >
        <div className="animate-drift absolute -top-24 -left-32 size-[38rem] rounded-full bg-[radial-gradient(circle,rgba(0,102,255,0.28),transparent_65%)] blur-3xl" />
        <div className="animate-drift absolute -top-10 right-[-10rem] size-[34rem] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.26),transparent_65%)] blur-3xl [animation-delay:-9s]" />
        <div className="animate-drift absolute bottom-10 left-1/3 size-[26rem] rounded-full bg-[radial-gradient(circle,rgba(255,51,51,0.14),transparent_65%)] blur-3xl [animation-delay:-16s]" />
      </motion.div>

      {/* <div className="bg-grid absolute inset-0" aria-hidden="true" /> */}

      {/* Planetary horizon anchoring the bottom of the scene */}
      <motion.div
        style={{ y: parallax(horizonY) }}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -bottom-[58vw] flex justify-center"
      >
        <div className="relative h-[80vw] w-[190vw] rounded-[50%] bg-[radial-gradient(ellipse_at_50%_0%,#16294a_0%,#0a1628_45%,#050b16_70%)] shadow-[inset_0_2px_0_0_rgba(124,178,255,0.45),0_-24px_80px_-20px_rgba(0,102,255,0.45)]">
          <div className="absolute inset-x-0 -top-px h-40 rounded-[50%] bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,102,255,0.35),transparent_70%)] blur-2xl" />
        </div>
      </motion.div>

      {/* Blend the scene into the next section instead of ending on a hard edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-64 bg-gradient-to-b from-transparent via-void/70 to-void"
      />

      {/* ---------- Foreground ---------- */}
      <motion.div
        style={{
          y: parallax(contentY),
          opacity: prefersReducedMotion ? 1 : contentOpacity,
        }}
        className="container-shell relative z-10"
      >
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-sm"
            >
              <MapPin className="size-3.5 text-rocket" aria-hidden="true" />
              <span className="font-mono text-[0.6875rem] tracking-[0.2em] text-cream/90 uppercase">
                Houston, Texas — Mission Control for Growth
              </span>
            </motion.div>

            <h1 className="text-display mt-8 font-semibold">
              <span className="sr-only">
                Web Marketing Solutions for Ambitious Brands
              </span>
              <span
                aria-hidden="true"
                className="flex flex-wrap gap-x-[0.28em] gap-y-1"
              >
                {HEADLINE.map((word, index) => (
                  <motion.span
                    key={word}
                    initial={{ opacity: 0, y: 34 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.85,
                      delay: 0.12 + index * 0.075,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                ))}
                {HEADLINE_ACCENT.map((word, index) => (
                  <motion.span
                    key={word}
                    initial={{ opacity: 0, y: 34 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.85,
                      delay: 0.12 + (HEADLINE.length + index) * 0.075,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="text-gradient-hero inline-block"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.55,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-7 max-w-xl text-lg leading-relaxed text-muted"
            >
              We design and engineer websites and search programs from Space
              City. Same discipline that launches rockets down the road —
              checklists, telemetry, and a hard go/no-go before anything ships.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.68,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button href="#contact" size="lg">
                Start Your Launch
                <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Button>
              <Button href="#services" variant="secondary" size="lg">
                <Play className="size-3.5 fill-current" />
                Learn More
              </Button>
            </motion.div>

            <motion.dl
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.82,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-12 grid max-w-xl grid-cols-3 gap-4 border-t border-white/[0.08] pt-6"
            >
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block font-display text-2xl font-bold text-cream sm:text-3xl">
                      {stat.value}
                    </span>
                    <span className="mt-1.5 block text-xs leading-snug text-muted-dim">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* Orbit visual — decorative, hidden from assistive tech */}
          <div
            className="relative hidden lg:col-span-5 lg:block"
            aria-hidden="true"
          >
            <OrbitVisual prefersReducedMotion={Boolean(prefersReducedMotion)} />
          </div>
        </div>
      </motion.div>

      <ScrollIndicator />
    </section>
  );
}

function OrbitVisual({
  prefersReducedMotion,
}: {
  prefersReducedMotion: boolean;
}) {
  const rings = [
    { size: '100%', duration: 44, border: 'rgba(124,178,255,0.30)' },
    { size: '74%', duration: 32, border: 'rgba(124,178,255,0.22)' },
    { size: '48%', duration: 22, border: 'rgba(255,107,92,0.22)' },
  ];

  return (
    <div className="relative mx-auto flex aspect-square w-full max-w-[30rem] items-center justify-center">
      <div className="absolute inset-8 rounded-full bg-[radial-gradient(circle,rgba(0,102,255,0.22),transparent_62%)] blur-2xl" />

      {rings.map((ring, index) => (
        <motion.div
          key={ring.size}
          className="absolute rounded-full border border-dashed"
          style={{
            width: ring.size,
            height: ring.size,
            borderColor: ring.border,
          }}
          animate={
            prefersReducedMotion
              ? undefined
              : { rotate: index % 2 === 0 ? 360 : -360 }
          }
          transition={{
            duration: ring.duration,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {/* Satellite riding the orbit */}
          <span className="absolute top-1/2 -right-1 size-2 -translate-y-1/2 rounded-full bg-electric-300 shadow-[0_0_12px_2px_rgba(59,140,255,0.9)]" />
        </motion.div>
      ))}

      {/* Rocket: launches in on load, then holds a gentle float */}
      <motion.div
        initial={{ opacity: 0, y: 160, scale: 0.7 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        <motion.div
          animate={prefersReducedMotion ? undefined : { y: [0, -14, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="absolute top-1/2 left-1/2 h-72 w-24 -translate-x-1/2 bg-[linear-gradient(to_bottom,rgba(0,102,255,0.55),transparent_70%)] blur-2xl" />
          <RocketMark className="relative size-40 drop-shadow-[0_0_36px_rgba(0,102,255,0.55)] xl:size-48" />
        </motion.div>
      </motion.div>

      {/* Telemetry chips */}
      <TelemetryChip
        className="absolute top-6 -left-2"
        label="Status"
        value="GO FOR LAUNCH"
        accent="text-emerald-300"
        delay={1.1}
        prefersReducedMotion={prefersReducedMotion}
      />
      <TelemetryChip
        className="absolute right-0 bottom-16"
        label="Organic lift"
        value="+148%"
        accent="text-electric-300"
        delay={1.3}
        prefersReducedMotion={prefersReducedMotion}
      />
      <TelemetryChip
        className="absolute bottom-2 left-4"
        label="LCP"
        value="0.9s"
        accent="text-rocket-400"
        delay={1.5}
        prefersReducedMotion={prefersReducedMotion}
      />
    </div>
  );
}

function TelemetryChip({
  className,
  label,
  value,
  accent,
  delay,
  prefersReducedMotion,
}: {
  className?: string;
  label: string;
  value: string;
  accent: string;
  delay: number;
  prefersReducedMotion: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      <motion.div
        animate={prefersReducedMotion ? undefined : { y: [0, -7, 0] }}
        transition={{
          duration: 5 + delay,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="rounded-xl border border-white/10 bg-navy/70 px-3.5 py-2.5 backdrop-blur-md"
      >
        <p className="font-mono text-[0.5625rem] tracking-[0.2em] text-muted-dim uppercase">
          {label}
        </p>
        <p className={`mt-1 font-display text-sm font-semibold ${accent}`}>
          {value}
        </p>
      </motion.div>
    </motion.div>
  );
}

function ScrollIndicator() {
  return (
    <motion.a
      href="#services"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1.6 }}
      className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
      aria-label="Scroll to services"
    >
      <span className="font-mono text-[0.625rem] tracking-[0.32em] text-muted-dim uppercase">
        Scroll
      </span>
      <span className="relative block h-14 w-px overflow-hidden bg-white/15">
        <motion.span
          animate={{ y: ['-100%', '180%'] }}
          transition={{ duration: 2.1, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-x-0 h-6 bg-gradient-to-b from-transparent via-electric-400 to-transparent"
        />
      </span>
    </motion.a>
  );
}
