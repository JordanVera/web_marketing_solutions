'use client';

import { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Starfield } from './ui/Starfield';
import { Atmosphere } from './ui/Atmosphere';
import { Button } from './ui/Button';
import { homePage } from '@/lib/content';

const EASE = [0.16, 1, 0.3, 1] as const;
const AMBER_SHEEN =
  'shadow-[0_8px_36px_-8px_rgba(255,92,0,0.5),0_8px_30px_-8px_rgba(26,212,238,0.55)]';

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const starsY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);
  const nebulaY = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const eclipseY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const parallax = (value: typeof starsY) =>
    prefersReducedMotion ? undefined : value;

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-svh flex-col justify-center overflow-hidden pt-28 pb-36"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-10%,#12244a_0%,#0a1628_38%,#050b16_78%)]" />

      <motion.div style={{ y: parallax(starsY) }} className="absolute inset-0">
        <Starfield density={0.15} speed={3} shootingStars />
      </motion.div>

      <motion.div
        style={{ y: parallax(nebulaY) }}
        className="absolute inset-0"
      >
        <Atmosphere variant="hero" />
      </motion.div>

      <motion.div
        style={{ y: parallax(eclipseY) }}
        className="absolute inset-0"
      >
        <Eclipse prefersReducedMotion={Boolean(prefersReducedMotion)} />
      </motion.div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-40 bg-gradient-to-b from-transparent via-void/50 to-void"
      />

      <motion.div
        style={{
          y: parallax(contentY),
          opacity: prefersReducedMotion ? 1 : contentOpacity,
        }}
        className="container-shell relative z-10"
      >
        <div className="relative max-w-3xl lg:max-w-[38rem] xl:max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="inline-flex items-center gap-3"
          >
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-amber shadow-[0_0_10px_2px_rgba(255,92,0,0.65)]"
            />
            <span className="font-mono text-[0.6875rem] tracking-[0.22em] text-muted uppercase">
              {homePage.hero.eyebrow}
            </span>
          </motion.p>

          <h1 className="text-display mt-8 font-semibold">
            <span className="sr-only">{homePage.hero.h1}</span>
            <span
              aria-hidden="true"
              className="flex flex-col gap-1"
            >
              {homePage.hero.headline.map((phrase, index) => (
                <motion.span
                  key={phrase}
                  initial={{ opacity: 0, y: 34 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.85,
                    delay: 0.12 + index * 0.08,
                    ease: EASE,
                  }}
                  className="block"
                >
                  {phrase}
                </motion.span>
              ))}
              {homePage.hero.headlineAccent.map((phrase, index) => (
                <motion.span
                  key={phrase}
                  initial={{ opacity: 0, y: 34 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.85,
                    delay:
                      0.12 +
                      (homePage.hero.headline.length + index) * 0.08,
                    ease: EASE,
                  }}
                  className="text-gradient-hero block"
                >
                  {phrase}
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
            className="mt-7 max-w-xl text-base leading-relaxed text-muted md:text-lg"
          >
            {homePage.hero.lede}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.64, ease: EASE }}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button
              href={homePage.hero.primaryHref}
              size="lg"
              className={AMBER_SHEEN}
            >
              {homePage.hero.primaryCta}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </Button>
            <Button
              href={homePage.hero.secondaryHref}
              variant="secondary"
              size="lg"
            >
              {homePage.hero.secondaryCta}
            </Button>
          </motion.div>
        </div>
      </motion.div>

      <ScrollIndicator />
    </section>
  );
}

function Eclipse({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute top-[46%] right-[-18%] hidden w-[min(72vw,38rem)] -translate-y-1/2 lg:block xl:right-[-8%]"
    >
      <motion.div
        animate={prefersReducedMotion ? undefined : { y: [0, -14, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        className="relative aspect-square"
      >
        <div className="absolute inset-[-12%] rounded-full bg-[radial-gradient(circle,rgba(26,212,238,0.2),transparent_62%)] blur-3xl" />
        <div className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle_at_28%_30%,rgba(244,247,251,0.16),transparent_32%),radial-gradient(circle_at_72%_58%,#050b16_0%,#07101c_46%,#0c1c34_72%)] shadow-[0_0_80px_-12px_rgba(26,212,238,0.35)]" />
        <div className="absolute inset-[8%] rounded-full bg-[linear-gradient(118deg,transparent_40%,rgba(255,92,0,0.42)_50%,transparent_60%)] mix-blend-screen" />
        <div className="absolute inset-[8%] rounded-full shadow-[inset_0_0_0_1px_rgba(26,212,238,0.28),inset_-18px_-10px_40px_rgba(26,212,238,0.12)]" />
        <div className="absolute top-[18%] left-[22%] size-24 rounded-full bg-[radial-gradient(circle,rgba(244,247,251,0.22),transparent_70%)] blur-xl" />
      </motion.div>
    </div>
  );
}

function ScrollIndicator() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.a
      href="#proof"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1.4 }}
      className="absolute bottom-32 left-1/2 z-10 hidden -translate-x-1/2 md:flex"
      aria-label="Scroll to proof"
    >
      <span className="relative block h-16 w-px overflow-hidden bg-white/12">
        <motion.span
          animate={
            prefersReducedMotion ? undefined : { y: ['-100%', '180%'] }
          }
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-x-0 h-7 bg-gradient-to-b from-transparent via-electric-400 to-amber/80"
        />
      </span>
    </motion.a>
  );
}
