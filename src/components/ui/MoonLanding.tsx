'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Launch profile: hold on the pad through a T-minus count, light the engines
 * before the vehicle moves, then accelerate along the surface normal until
 * the rocket and plume clear the top of the page.
 */
const LAUNCH_EASE = [0.45, 0.0, 0.75, 0.2] as const;
const LAUNCH_DURATION = 5.8;
const COUNTDOWN_FROM = 5;
const IGNITE_AT = 2;
const HUD_FADE_MS = 800;
/**
 * Minimum flight distance along the surface normal, in viewport heights. On
 * small screens the pad sits below the fold, so the destination is pushed
 * further up until the rocket and its plume clear the top of the page;
 * otherwise it would stall mid-viewport behind the hero copy.
 */
const FLIGHT_MIN_VH = 90;
/** Pre-measurement fallback: far enough up to be offscreen on any device. */
const FLIGHT_END_FALLBACK_VH = 300;
/** How far the full-throttle plume hangs below the rocket, in rocket heights. */
const PLUME_OVERHANG = 1.75;
const LEGS_RETRACT_AT = 0.22;

/**
 * Where the rocket's base sits on the limb, in the moon's own box. Radius is
 * fractionally under 50% so the feet bed into the regolith rather than
 * hovering on the anti-aliased edge of the disc.
 */
const LANDING_ANCHOR = {
  left: 'calc(50% + 49.55% * sin(var(--tilt)))',
  top: 'calc(50% - 49.55% * cos(var(--tilt)))',
} as const;

type CountPhase = number | 'liftoff' | null;

type SmokePuff = {
  dx: number;
  dy: number;
  w: number;
  h: number;
  duration: number;
  delay: number;
  scale: number;
  warm?: boolean;
};

const SMOKE_IGNITION: readonly SmokePuff[] = [
  {
    dx: -36,
    dy: -10,
    w: 72,
    h: 40,
    duration: 3.2,
    delay: 0,
    scale: 2.2,
    warm: true,
  },
  {
    dx: 40,
    dy: -8,
    w: 78,
    h: 42,
    duration: 3.4,
    delay: 0.04,
    scale: 2.3,
    warm: true,
  },
  {
    dx: -12,
    dy: -4,
    w: 90,
    h: 48,
    duration: 2.8,
    delay: 0.02,
    scale: 2.0,
    warm: true,
  },
  {
    dx: 8,
    dy: -6,
    w: 86,
    h: 44,
    duration: 3.0,
    delay: 0.08,
    scale: 2.1,
    warm: true,
  },
  { dx: -90, dy: -18, w: 110, h: 56, duration: 4.0, delay: 0.1, scale: 2.5 },
  { dx: 95, dy: -16, w: 118, h: 58, duration: 4.2, delay: 0.12, scale: 2.6 },
  { dx: -140, dy: -8, w: 130, h: 52, duration: 4.5, delay: 0.18, scale: 2.4 },
  { dx: 148, dy: -10, w: 136, h: 54, duration: 4.6, delay: 0.16, scale: 2.5 },
  { dx: -70, dy: -28, w: 88, h: 44, duration: 3.6, delay: 0.22, scale: 2.2 },
  { dx: 74, dy: -26, w: 92, h: 46, duration: 3.7, delay: 0.2, scale: 2.3 },
  { dx: -40, dy: 4, w: 220, h: 36, duration: 4.8, delay: 0.06, scale: 1.8 },
  { dx: 50, dy: 6, w: 240, h: 38, duration: 5.0, delay: 0.1, scale: 1.9 },
];

const SMOKE_LIFTOFF: readonly SmokePuff[] = [
  {
    dx: -55,
    dy: -14,
    w: 100,
    h: 50,
    duration: 3.6,
    delay: 0,
    scale: 2.6,
    warm: true,
  },
  {
    dx: 58,
    dy: -12,
    w: 108,
    h: 52,
    duration: 3.8,
    delay: 0.03,
    scale: 2.7,
    warm: true,
  },
  {
    dx: -20,
    dy: -8,
    w: 96,
    h: 48,
    duration: 3.2,
    delay: 0.05,
    scale: 2.4,
    warm: true,
  },
  {
    dx: 24,
    dy: -9,
    w: 100,
    h: 50,
    duration: 3.3,
    delay: 0.02,
    scale: 2.5,
    warm: true,
  },
  { dx: -120, dy: -22, w: 140, h: 64, duration: 4.4, delay: 0.08, scale: 2.8 },
  { dx: 128, dy: -20, w: 148, h: 66, duration: 4.5, delay: 0.1, scale: 2.9 },
  { dx: -180, dy: -6, w: 132, h: 50, duration: 4.8, delay: 0.14, scale: 2.5 },
  { dx: 188, dy: -8, w: 140, h: 52, duration: 4.9, delay: 0.12, scale: 2.6 },
  { dx: -85, dy: -32, w: 104, h: 48, duration: 3.9, delay: 0.16, scale: 2.4 },
  { dx: 90, dy: -30, w: 110, h: 50, duration: 4.0, delay: 0.18, scale: 2.5 },
  { dx: -10, dy: 2, w: 260, h: 42, duration: 5.0, delay: 0.04, scale: 2.0 },
  { dx: 16, dy: 4, w: 280, h: 44, duration: 5.2, delay: 0.08, scale: 2.1 },
];

const DUST = [
  { dx: -140, dy: -38, size: 4, duration: 1.5, delay: 0 },
  { dx: -95, dy: -58, size: 3, duration: 1.3, delay: 0.05 },
  { dx: -58, dy: -26, size: 3.5, duration: 1.1, delay: 0.02 },
  { dx: 62, dy: -30, size: 3.5, duration: 1.15, delay: 0.03 },
  { dx: 104, dy: -54, size: 3, duration: 1.35, delay: 0.06 },
  { dx: 150, dy: -34, size: 4, duration: 1.55, delay: 0.01 },
  { dx: -180, dy: -16, size: 2.5, duration: 1.7, delay: 0.1 },
  { dx: 188, dy: -14, size: 2.5, duration: 1.75, delay: 0.08 },
  { dx: -30, dy: -70, size: 2, duration: 1.2, delay: 0.04 },
  { dx: 34, dy: -64, size: 2, duration: 1.25, delay: 0.07 },
] as const;

type MoonLandingProps = {
  className?: string;
};

/**
 * Photoreal Moon (NASA/GSFC LRO render, public domain) with a rocket that
 * sits on the limb through a T-minus count, ignites, then retracts its legs
 * and accelerates off-screen. Flight is driven from one motion value so
 * every layer stays in sync. Under reduced motion it renders parked on the
 * pad.
 *
 * Position and size the moon with `className`; `--tilt` sets where on the
 * limb the pad sits (0deg = top of the disc) and the rocket is rotated to
 * stand perpendicular to the surface there.
 */
export function MoonLanding({ className }: MoonLandingProps) {
  const prefersReducedMotion = useReducedMotion();
  const padRef = useRef<HTMLDivElement | null>(null);
  // On small screens the pad sits below the fold, so hold the launch until
  // it scrolls into view rather than lifting off unseen.
  const padInView = useInView(padRef, { once: true, amount: 'some' });
  const progress = useMotionValue(0);
  // Flight distance in px; 0 until the pad has been measured.
  const flightDistance = useMotionValue(0);
  const [count, setCount] = useState<CountPhase>(null);
  const [hudVisible, setHudVisible] = useState(false);
  const [ignited, setIgnited] = useState(false);
  const [launching, setLaunching] = useState(false);
  const [legsRetracted, setLegsRetracted] = useState(false);
  const legsOut = !legsRetracted;

  // Measure how far the rocket must travel so it (and the plume) clear the
  // top of the page, however tall the hero ends up.
  useEffect(() => {
    const pad = padRef.current;
    if (!pad) return;
    const measure = () => {
      const rect = pad.getBoundingClientRect();
      const padBottom = rect.bottom + window.scrollY;
      const clearance = padBottom + rect.height * PLUME_OVERHANG;
      flightDistance.set(
        Math.max(window.innerHeight * (FLIGHT_MIN_VH / 100), clearance),
      );
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [flightDistance]);

  useEffect(() => {
    if (prefersReducedMotion || !padInView) return;
    let remaining = COUNTDOWN_FROM;
    setCount(remaining);
    setHudVisible(true);
    const id = window.setInterval(() => {
      remaining -= 1;
      if (remaining === IGNITE_AT) setIgnited(true);
      if (remaining <= 0) {
        window.clearInterval(id);
        setCount('liftoff');
        setLaunching(true);
        return;
      }
      setCount(remaining);
    }, 1000);
    return () => window.clearInterval(id);
  }, [padInView, prefersReducedMotion]);

  useEffect(() => {
    if (count !== 'liftoff') return;
    const fade = window.setTimeout(() => setHudVisible(false), HUD_FADE_MS);
    return () => window.clearTimeout(fade);
  }, [count]);

  useEffect(() => {
    if (prefersReducedMotion) {
      progress.set(0);
      return;
    }
    if (!launching) return;
    const controls = animate(progress, 1, {
      duration: LAUNCH_DURATION,
      ease: LAUNCH_EASE,
    });
    return () => controls.stop();
  }, [launching, prefersReducedMotion, progress]);

  useMotionValueEvent(progress, 'change', (value) => {
    if (value >= LEGS_RETRACT_AT) setLegsRetracted(true);
  });

  // Travel along the rocket's own "up" axis, so the ascent follows the
  // surface normal at the pad rather than screen-vertical.
  const y = useTransform([progress, flightDistance], ([p, start]) =>
    (start as number) > 0
      ? `${(p as number) * -(start as number)}px`
      : `${(p as number) * -FLIGHT_END_FALLBACK_VH}vh`,
  );
  // Lateral drift is a share of the rocket's own width so it stays on the
  // plume's axis at every size.
  const x = useTransform(progress, [0, 0.3, 1], ['0%', '9%', '38%']);
  const attitude = useTransform(progress, [0, 0.35, 1], [0, -2.5, -7]);
  const throttle = useTransform(progress, [0, 0.2, 1], [0.55, 1, 1.35]);
  // Bright on the pad through hold-down, then fade as the vehicle leaves.
  const surfaceGlow = useTransform(progress, [0, 0.08, 0.28], [0.85, 0.75, 0]);

  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none aspect-square [--tilt:0deg] lg:[--tilt:-14deg]',
        className,
      )}
    >
      {/* Backlight so the disc separates from the void. */}
      <div className="absolute inset-[-8%] rounded-full bg-[radial-gradient(circle,rgba(251,146,60,0.14),transparent_62%)] blur-3xl" />

      {/* The Moon. */}
      <div className="absolute inset-0 overflow-hidden rounded-full bg-[#0b0f16] shadow-[0_0_120px_-24px_rgba(251,146,60,0.3)]">
        <Image
          src="/moon/full-moon.webp"
          alt=""
          fill
          preload
          draggable={false}
          sizes="(min-width: 1024px) 1200px, 180vw"
          className="scale-[1.012] object-cover select-none"
        />
        {/* Warm key light from the upper left, then the terminator falling
            away toward the lower right. */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_18%,rgba(255,133,51,0.16),transparent_50%)] mix-blend-soft-light" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_18%,transparent_34%,rgba(5,11,22,0.26)_58%,rgba(5,11,22,0.9)_92%)]" />
        <div className="absolute inset-0 rounded-full shadow-[inset_0_0_70px_rgba(253,186,116,0.08),inset_0_0_2px_rgba(244,247,251,0.28)]" />
      </div>

      {/* Launch pad: bottom-centre of this box sits on the limb, rotated to
          the surface normal. Everything inside moves in the rocket's frame. */}
      <div
        className="absolute w-[6%] origin-bottom"
        style={{
          left: LANDING_ANCHOR.left,
          top: LANDING_ANCHOR.top,
          transform: 'translate(-50%, -100%) rotate(var(--tilt))',
        }}
      >
        {/* Container so blurs/shadows below can be sized in cqw and scale
            with the rocket instead of fixed px (which swamps the small
            mobile rocket and visually detaches the plume). */}
        <div ref={padRef} className="relative @container aspect-80/186 w-full">
          {/* Exhaust washing over the regolith at ignition. */}
          {ignited && (
            <motion.div
              style={{ opacity: surfaceGlow }}
              className="absolute bottom-0 left-1/2 h-[30%] w-[420%] -translate-x-1/2 translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(244,247,251,0.9)_0%,rgba(253,186,116,0.6)_22%,rgba(244,63,154,0.22)_48%,transparent_72%)] blur-md"
            />
          )}

          {/* Plume, clipped at the surface so it never paints across the moon. */}
          <div className="absolute inset-x-[-200%] top-[-400vh] bottom-0 overflow-hidden">
            <motion.div
              style={{ y }}
              className="absolute bottom-0 left-1/2 aspect-80/186 w-[20%] -translate-x-1/2"
            >
              <motion.div
                style={{
                  opacity: ignited ? 1 : 0,
                  scaleY: throttle,
                }}
                className="absolute top-[93%] left-1/2 h-[120%] w-[140%] origin-top -translate-x-1/2"
              >
                <motion.div
                  animate={
                    prefersReducedMotion
                      ? undefined
                      : {
                          scaleY: [1, 1.14, 0.93, 1.09, 1],
                          scaleX: [1, 0.95, 1.06, 0.97, 1],
                        }
                  }
                  transition={{
                    duration: 0.38,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-0 origin-top"
                >
                  {/* Soft outer haze: a cone that widens as it leaves the nozzles. */}
                  <div className="absolute inset-x-0 top-0 h-full bg-[linear-gradient(to_bottom,rgba(253,186,116,0.55)_0%,rgba(251,146,60,0.32)_35%,rgba(244,63,154,0.12)_70%,transparent_100%)] blur-[8.5cqw] [clip-path:polygon(38%_0,62%_0,100%_100%,0_100%)]" />
                  {/* Hot core. */}
                  <div className="absolute top-0 left-1/2 h-[72%] w-[52%] -translate-x-1/2 bg-[linear-gradient(to_bottom,#ffffff_0%,#fff0e6_22%,rgba(253,186,116,0.85)_55%,rgba(251,146,60,0.3)_85%,transparent_100%)] blur-[2.2cqw] [clip-path:polygon(34%_0,66%_0,92%_100%,8%_100%)]" />
                  {/* Mach diamonds. */}
                  <div className="absolute top-0 left-1/2 h-[42%] w-[16%] -translate-x-1/2 bg-[repeating-linear-gradient(to_bottom,rgba(255,255,255,0.95)_0_18%,rgba(255,255,255,0.35)_30%_50%)] blur-[0.9cqw] [clip-path:polygon(30%_0,70%_0,100%_100%,0_100%)]" />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* Dust and booster smoke at ignition; a second dump at liftoff.
              Parent is the pad, not the rocket, so clouds stay on the limb. */}
          {ignited && !prefersReducedMotion && (
            <div className="absolute bottom-0 left-1/2">
              <motion.span
                initial={{ scaleX: 0.25, scaleY: 0.5, opacity: 0.7 }}
                animate={{ scaleX: 1.6, scaleY: 1, opacity: 0 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -bottom-1.5 left-0 h-3 w-55 -translate-x-1/2 rounded-full border border-cream/40 blur-[1px]"
              />
              <motion.span
                initial={{ scaleX: 0.3, scaleY: 0.4, opacity: 0.5 }}
                animate={{ scaleX: 1.35, scaleY: 1.1, opacity: 0 }}
                transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -bottom-2.5 left-0 h-6.5 w-50 -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(203,213,225,0.55),transparent_70%)] blur-md"
              />
              {DUST.map((particle, index) => (
                <motion.span
                  key={index}
                  initial={{ x: 0, y: 0, opacity: 0 }}
                  animate={{
                    x: particle.dx,
                    y: [0, particle.dy, 2],
                    opacity: [0, 0.9, 0],
                  }}
                  transition={{
                    duration: particle.duration,
                    delay: particle.delay,
                    ease: 'easeOut',
                    y: { duration: particle.duration, ease: 'easeOut' },
                  }}
                  style={{ width: particle.size, height: particle.size }}
                  className="absolute bottom-0 left-0 rounded-full bg-cream/80"
                />
              ))}
              <SmokeCloud puffs={SMOKE_IGNITION} />
              {launching && <SmokeCloud puffs={SMOKE_LIFTOFF} />}
            </div>
          )}

          {/* The rocket itself. */}
          <motion.div
            style={{ y, x, rotate: attitude }}
            className="absolute inset-0 origin-bottom"
          >
            <motion.div
              animate={
                ignited && !prefersReducedMotion
                  ? { scaleY: [1, 0.985, 1] }
                  : undefined
              }
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="absolute inset-0 origin-bottom"
            >
              <RocketSvg legsOut={legsOut} />

              {/* Engine light under the skirt. */}
              <motion.div
                style={{ opacity: ignited ? 1 : 0 }}
                className="absolute top-[88%] left-1/2 h-[12%] w-[95%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(253,186,116,0.85),transparent_70%)] blur-[11.5cqw]"
              />

              {/* Nav beacon. */}
              <motion.span
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { opacity: [0.15, 1, 0.15] }
                }
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute top-[13.5%] left-1/2 size-[7%] -translate-x-1/2 rounded-full bg-rocket-400 shadow-[0_0_6px_2px_rgba(255,107,92,0.7)]"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Countdown HUD, desktop only. */}
      <motion.div
        initial={false}
        animate={{
          opacity: hudVisible ? 1 : 0,
          x: hudVisible ? 0 : 10,
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute hidden font-mono text-[0.625rem] leading-relaxed tracking-[0.18em] uppercase lg:block"
        style={{
          left: `calc(${LANDING_ANCHOR.left} + 4.5rem)`,
          top: `calc(${LANDING_ANCHOR.top} - 6.5rem)`,
        }}
      >
        <div className="flex items-center gap-2 text-electric-300">
          <span className="size-1.5 rounded-full bg-electric-400 shadow-[0_0_8px_2px_rgba(253,186,116,0.6)]" />
          <motion.span
            key={String(count)}
            initial={{ opacity: 0.35, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            {count === 'liftoff' ? 'Liftoff' : `T-minus ${count ?? ''}`}
          </motion.span>
        </div>
        <div className="pl-3.5 text-muted-dim">Pad 01 &middot; Moon Base</div>
        {/* Leader line back toward the rocket. */}
        <span className="absolute top-[0.55rem] right-full h-px w-12 bg-linear-to-l from-electric/50 via-electric/30 to-transparent" />
      </motion.div>
    </div>
  );
}

function SmokeCloud({ puffs }: { puffs: readonly SmokePuff[] }) {
  return (
    <>
      {puffs.map((puff, index) => (
        <motion.span
          key={index}
          initial={{ x: 0, y: 0, scale: 0.2, opacity: 0 }}
          animate={{
            x: puff.dx,
            y: [0, puff.dy, puff.dy * 0.35],
            scale: puff.scale,
            opacity: [0, 0.82, 0],
          }}
          transition={{
            duration: puff.duration,
            delay: puff.delay,
            ease: 'easeOut',
          }}
          style={{ width: puff.w, height: puff.h }}
          className={cn(
            'absolute bottom-0 left-0 -translate-x-1/2 rounded-full blur-lg',
            puff.warm
              ? 'bg-[radial-gradient(ellipse_at_center,rgba(253,186,116,0.55)_0%,rgba(226,232,240,0.4)_42%,transparent_72%)]'
              : 'bg-[radial-gradient(ellipse_at_center,rgba(241,245,249,0.75)_0%,rgba(148,163,184,0.4)_45%,transparent_74%)]',
          )}
        />
      ))}
    </>
  );
}

function RocketSvg({ legsOut }: { legsOut: boolean }) {
  const legClass =
    'transition-transform duration-700 ease-[var(--ease-out-expo)] [transform-box:fill-box]';

  return (
    <svg
      viewBox="0 0 80 186"
      className="absolute inset-0 h-full w-full overflow-visible drop-shadow-[0_8.5cqw_20cqw_rgba(0,0,0,0.55)]"
    >
      <defs>
        <linearGradient id="ml-hull" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#3f4a5a" />
          <stop offset="0.16" stopColor="#c9d3df" />
          <stop offset="0.4" stopColor="#f8fafc" />
          <stop offset="0.62" stopColor="#c3ccd8" />
          <stop offset="0.84" stopColor="#5b6879" />
          <stop offset="1" stopColor="#1c2532" />
        </linearGradient>
        <linearGradient id="ml-dark" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#111827" />
          <stop offset="0.45" stopColor="#334155" />
          <stop offset="1" stopColor="#0b1220" />
        </linearGradient>
        <linearGradient id="ml-tiles" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#0f172a" />
          <stop offset="1" stopColor="#334155" />
        </linearGradient>
        <linearGradient id="ml-visor" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#0a1628" />
          <stop offset="0.5" stopColor="#fb923c" />
          <stop offset="1" stopColor="#062033" />
        </linearGradient>
        <linearGradient id="ml-bell" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#1f2937" />
          <stop offset="1" stopColor="#64748b" />
        </linearGradient>
        <linearGradient id="ml-leg" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#94a3b8" />
          <stop offset="1" stopColor="#1e293b" />
        </linearGradient>
      </defs>

      {/* Legs hinge at the hull. Stowed, they fold in behind the body so
          retraction reads as them tucking away after leaving the surface. */}
      <g
        className={cn(
          legClass,
          'origin-top-right',
          legsOut ? 'rotate-0' : 'rotate-[-44deg]',
        )}
      >
        <path d="M26 128 L12 181 L16 182.5 L30 134 Z" fill="url(#ml-leg)" />
        <rect x="7" y="181" width="13" height="3.2" rx="1" fill="#0f172a" />
        <rect x="7" y="181" width="13" height="1.2" rx="0.6" fill="#94a3b8" />
      </g>
      <g
        className={cn(
          legClass,
          'origin-top-left',
          legsOut ? 'rotate-0' : 'rotate-44',
        )}
      >
        <path d="M54 128 L68 181 L64 182.5 L50 134 Z" fill="url(#ml-leg)" />
        <rect x="60" y="181" width="13" height="3.2" rx="1" fill="#0f172a" />
        <rect x="60" y="181" width="13" height="1.2" rx="0.6" fill="#94a3b8" />
      </g>

      {/* Canards */}
      <path d="M25 60 L11 71 L13.5 75 L26 69 Z" fill="url(#ml-dark)" />
      <path d="M55 60 L69 71 L66.5 75 L54 69 Z" fill="url(#ml-dark)" />

      {/* Fins */}
      <path d="M24 118 L6 172 L15 174 L25.5 150 Z" fill="url(#ml-dark)" />
      <path d="M56 118 L74 172 L65 174 L54.5 150 Z" fill="url(#ml-dark)" />

      {/* Hull */}
      <path
        d="M40 4 C46 14 55 34 56 62 L56 148 C56 154 52 158 46 158 L34 158 C28 158 24 154 24 148 L24 62 C25 34 34 14 40 4 Z"
        fill="url(#ml-hull)"
      />
      {/* Specular edge */}
      <path
        d="M40 5 C35 14 27.5 32 26.5 60 L26.5 146"
        fill="none"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
      {/* Heat-shield nose */}
      <path
        d="M40 4 C43 9.5 46.5 18 48.6 30 L31.4 30 C33.5 18 37 9.5 40 4 Z"
        fill="url(#ml-tiles)"
      />
      {/* Visor */}
      <path
        d="M30.6 42 L49.4 42 L50 50 L30 50 Z"
        fill="url(#ml-visor)"
        opacity="0.95"
      />
      <path
        d="M31 43.2 L49 43.2"
        stroke="rgba(230,251,255,0.7)"
        strokeWidth="0.8"
      />
      {/* Panel seams */}
      <path
        d="M24.6 78 L55.4 78 M24 112 L56 112 M24 134 L56 134"
        stroke="rgba(15,23,42,0.32)"
        strokeWidth="0.8"
      />
      <path d="M40 78 L40 112" stroke="rgba(15,23,42,0.18)" strokeWidth="0.6" />

      {/* Engine skirt + bells */}
      <path d="M30 158 L50 158 L48.5 166 L31.5 166 Z" fill="#0f172a" />
      <path
        d="M32.5 166 L36.8 166 L38.6 174 L30.4 174 Z"
        fill="url(#ml-bell)"
      />
      <path
        d="M37.6 166 L42.4 166 L43.4 174.5 L36.6 174.5 Z"
        fill="url(#ml-bell)"
      />
      <path
        d="M43.2 166 L47.5 166 L49.6 174 L41.4 174 Z"
        fill="url(#ml-bell)"
      />
    </svg>
  );
}
