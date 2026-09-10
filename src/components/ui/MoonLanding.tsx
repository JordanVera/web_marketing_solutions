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
 * Descent profile: comes in quick from above the viewport, then bleeds speed
 * off continuously into a soft touchdown with no visible hover.
 */
const LANDING_EASE = [0.22, 0.5, 0.55, 0.92] as const;
const DESCENT_DURATION = 5.8;
const DESCENT_DELAY = 0.5;
/**
 * Minimum flight distance along the surface normal, in viewport heights. On
 * small screens the pad sits below the fold, so the real start is pushed
 * further up until the rocket and its plume clear the top of the page;
 * otherwise it would sit parked mid-viewport behind the hero copy.
 */
const DESCENT_MIN_VH = 90;
/** Pre-measurement fallback: far enough up to be offscreen on any device. */
const DESCENT_START_FALLBACK_VH = 300;
/** How far the full-throttle plume hangs below the rocket, in rocket heights. */
const PLUME_OVERHANG = 1.75;
const LEGS_DEPLOY_AT = 0.6;

/**
 * Where the rocket's base sits on the limb, in the moon's own box. Radius is
 * fractionally under 50% so the feet bed into the regolith rather than
 * hovering on the anti-aliased edge of the disc.
 */
const LANDING_ANCHOR = {
  left: 'calc(50% + 49.55% * sin(var(--tilt)))',
  top: 'calc(50% - 49.55% * cos(var(--tilt)))',
} as const;

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
 * flies in from above the viewport, throttles down, deploys its legs and
 * settles on the limb. The whole sequence is driven from one motion value so
 * every layer stays in sync. Under reduced motion it renders landed.
 *
 * Position and size the moon with `className`; `--tilt` sets where on the
 * limb the rocket lands (0deg = top of the disc) and the rocket is rotated to
 * stand perpendicular to the surface there.
 */
export function MoonLanding({ className }: MoonLandingProps) {
  const prefersReducedMotion = useReducedMotion();
  const padRef = useRef<HTMLDivElement | null>(null);
  // On small screens the landing site sits below the fold, so hold the
  // descent until the pad scrolls into view rather than landing unseen.
  const padInView = useInView(padRef, { once: true, amount: 'some' });
  const progress = useMotionValue(prefersReducedMotion ? 1 : 0);
  // Flight distance in px; 0 until the pad has been measured.
  const descentStart = useMotionValue(0);
  const [touchedDown, setTouchedDown] = useState(false);
  const [legsDeployed, setLegsDeployed] = useState(false);
  // Reduced motion skips the flight entirely and renders the settled state.
  const landed = touchedDown || Boolean(prefersReducedMotion);
  const legsOut = legsDeployed || landed;

  // Measure where the pad sits on the page so the parked rocket (and plume)
  // always start above the document, however tall the hero ends up.
  useEffect(() => {
    const pad = padRef.current;
    if (!pad) return;
    const measure = () => {
      const rect = pad.getBoundingClientRect();
      const padBottom = rect.bottom + window.scrollY;
      const clearance = padBottom + rect.height * PLUME_OVERHANG;
      descentStart.set(
        Math.max(window.innerHeight * (DESCENT_MIN_VH / 100), clearance),
      );
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [descentStart]);

  useEffect(() => {
    if (prefersReducedMotion) {
      progress.set(1);
      return;
    }
    if (!padInView) return;
    const controls = animate(progress, 1, {
      duration: DESCENT_DURATION,
      delay: DESCENT_DELAY,
      ease: LANDING_EASE,
      onComplete: () => setTouchedDown(true),
    });
    return () => controls.stop();
  }, [padInView, prefersReducedMotion, progress]);

  useMotionValueEvent(progress, 'change', (value) => {
    if (value >= LEGS_DEPLOY_AT) setLegsDeployed(true);
  });

  // Travel along the rocket's own "up" axis, so the descent follows the
  // surface normal at the landing site rather than screen-vertical.
  const y = useTransform([progress, descentStart], ([p, start]) =>
    (start as number) > 0
      ? `${(1 - (p as number)) * -(start as number)}px`
      : `${(1 - (p as number)) * -DESCENT_START_FALLBACK_VH}vh`,
  );
  const x = useTransform(progress, [0, 0.7, 1], [26, 6, 0]);
  const attitude = useTransform(progress, [0, 0.65, 1], [-7, -2.5, 0]);
  // Engine stays lit right through contact, then cuts.
  const plumeOpacity = useTransform(progress, [0, 0.994, 1], [1, 1, 0]);
  const throttle = useTransform(progress, [0, 0.75, 1], [1.35, 1, 0.55]);
  const surfaceGlow = useTransform(
    progress,
    [0.7, 0.94, 0.994, 1],
    [0, 0.85, 0.75, 0],
  );

  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none aspect-square [--tilt:0deg] lg:[--tilt:-14deg]',
        className,
      )}
    >
      {/* Backlight so the disc separates from the void. */}
      <div className="absolute inset-[-8%] rounded-full bg-[radial-gradient(circle,rgba(26,212,238,0.14),transparent_62%)] blur-3xl" />

      {/* The Moon. */}
      <div className="absolute inset-0 overflow-hidden rounded-full bg-[#0b0f16] shadow-[0_0_120px_-24px_rgba(26,212,238,0.3)]">
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
        <div className="absolute inset-0 rounded-full shadow-[inset_0_0_70px_rgba(154,237,248,0.08),inset_0_0_2px_rgba(244,247,251,0.28)]" />
      </div>

      {/* Landing zone: bottom-centre of this box sits on the limb, rotated to
          the surface normal. Everything inside moves in the rocket's frame. */}
      <div
        className="absolute w-[6%] origin-bottom"
        style={{
          left: LANDING_ANCHOR.left,
          top: LANDING_ANCHOR.top,
          transform: 'translate(-50%, -100%) rotate(var(--tilt))',
        }}
      >
        <div ref={padRef} className="relative aspect-80/186 w-full">
          {/* Exhaust washing over the regolith as the rocket gets close. */}
          <motion.div
            style={{ opacity: surfaceGlow }}
            className="absolute bottom-0 left-1/2 h-[30%] w-[420%] -translate-x-1/2 translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(244,247,251,0.9)_0%,rgba(154,237,248,0.6)_22%,rgba(255,133,51,0.22)_48%,transparent_72%)] blur-md"
          />

          {/* Plume, clipped at the surface so it never paints across the moon. */}
          <div className="absolute inset-x-[-200%] top-[-400vh] bottom-0 overflow-hidden">
            <motion.div
              style={{ y }}
              className="absolute bottom-0 left-1/2 aspect-80/186 w-[20%] -translate-x-1/2"
            >
              <motion.div
                style={{ opacity: plumeOpacity, scaleY: throttle }}
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
                  <div className="absolute inset-x-0 top-0 h-full bg-[linear-gradient(to_bottom,rgba(154,237,248,0.55)_0%,rgba(26,212,238,0.32)_35%,rgba(94,228,245,0.12)_70%,transparent_100%)] blur-[6px] [clip-path:polygon(38%_0,62%_0,100%_100%,0_100%)]" />
                  {/* Hot core. */}
                  <div className="absolute top-0 left-1/2 h-[72%] w-[52%] -translate-x-1/2 bg-[linear-gradient(to_bottom,#ffffff_0%,#e6fbff_22%,rgba(154,237,248,0.85)_55%,rgba(26,212,238,0.3)_85%,transparent_100%)] blur-[1.5px] [clip-path:polygon(34%_0,66%_0,92%_100%,8%_100%)]" />
                  {/* Mach diamonds. */}
                  <div className="absolute top-0 left-1/2 h-[42%] w-[16%] -translate-x-1/2 bg-[repeating-linear-gradient(to_bottom,rgba(255,255,255,0.95)_0_18%,rgba(255,255,255,0.35)_30%_50%)] blur-[0.6px] [clip-path:polygon(30%_0,70%_0,100%_100%,0_100%)]" />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* Dust kicked up on contact. */}
          {landed && !prefersReducedMotion && (
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
            </div>
          )}

          {/* The rocket itself. */}
          <motion.div
            style={{ y, x, rotate: attitude }}
            className="absolute inset-0 origin-bottom"
          >
            <motion.div
              animate={
                landed && !prefersReducedMotion
                  ? { scaleY: [1, 0.985, 1] }
                  : undefined
              }
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="absolute inset-0 origin-bottom"
            >
              <RocketSvg legsOut={legsOut} />

              {/* Engine light under the skirt. */}
              <motion.div
                style={{ opacity: plumeOpacity }}
                className="absolute top-[88%] left-1/2 h-[12%] w-[95%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(154,237,248,0.85),transparent_70%)] blur-sm"
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

      {/* HUD readout, desktop only. */}
      <motion.div
        initial={false}
        animate={{ opacity: landed ? 1 : 0, x: landed ? 0 : 10 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="absolute hidden font-mono text-[0.625rem] leading-relaxed tracking-[0.18em] uppercase lg:block"
        style={{
          left: `calc(${LANDING_ANCHOR.left} + 4.5rem)`,
          top: `calc(${LANDING_ANCHOR.top} - 6.5rem)`,
        }}
      >
        <div className="flex items-center gap-2 text-electric-300">
          <span className="size-1.5 rounded-full bg-electric-400 shadow-[0_0_8px_2px_rgba(94,228,245,0.6)]" />
          Touchdown confirmed
        </div>
        <div className="pl-3.5 text-muted-dim">LZ-01 &middot; Moon Base</div>
        {/* Leader line back toward the rocket. */}
        <span className="absolute top-[0.55rem] right-full h-px w-12 bg-linear-to-l from-electric/50 via-electric/30 to-transparent" />
      </motion.div>
    </div>
  );
}

function RocketSvg({ legsOut }: { legsOut: boolean }) {
  const legClass =
    'transition-transform duration-700 ease-[var(--ease-out-expo)] [transform-box:fill-box]';

  return (
    <svg
      viewBox="0 0 80 186"
      className="absolute inset-0 h-full w-full overflow-visible drop-shadow-[0_6px_14px_rgba(0,0,0,0.55)]"
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
          <stop offset="0.5" stopColor="#1ad4ee" />
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
          deployment reads as them unfolding out during final approach. */}
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
