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
import { MoonLanding } from './ui/MoonLanding';
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
  const moonY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const parallax = (value: typeof starsY) =>
    prefersReducedMotion ? undefined : value;

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-svh flex-col justify-center overflow-hidden pt-20 pb-55 lg:pt-28 lg:pb-36"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-10%,#12244a_0%,#0a1628_38%,#050b16_78%)]" />

      <motion.div style={{ y: parallax(starsY) }} className="absolute inset-0">
        <Starfield density={0.15} speed={3} shootingStars />
      </motion.div>

      <motion.div style={{ y: parallax(nebulaY) }} className="absolute inset-0">
        <Atmosphere variant="hero" />
      </motion.div>

      {/* Below lg the moon is a horizon along the bottom edge with the rocket
          landing at its apex; from lg up it swings to the lower right and the
          rocket lands on the limb at the 11 o'clock mark. The section's
          bottom padding below lg reserves room for the crest plus a standing
          rocket, so the hero fits a phone viewport and the moon stays at the
          bottom of the screen. */}
      <motion.div style={{ y: parallax(moonY) }} className="absolute inset-0">
        <MoonLanding className="absolute top-[calc(100%-7rem)] left-1/2 w-[180vw] -translate-x-1/2 lg:top-[112%] lg:left-[82%] lg:w-[min(128svh,110vw)] lg:-translate-y-1/2" />
      </motion.div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-16 bg-gradient-to-b from-transparent via-void/50 to-void lg:h-40"
      />

      <motion.div
        style={{
          y: parallax(contentY),
          opacity: prefersReducedMotion ? 1 : contentOpacity,
        }}
        className="container-shell relative z-10"
      >
        <div className="relative max-w-3xl lg:max-w-[38rem] xl:max-w-3xl">
          {/* <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="items-center gap-3 hidden lg:inline-flex"
          >
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-amber shadow-[0_0_10px_2px_rgba(255,92,0,0.65)]"
            />
            <span className="font-mono text-[0.6875rem] tracking-[0.22em] text-muted uppercase">
              {homePage.hero.eyebrow}
            </span>
          </motion.p> */}

          {/* Below sm the display floor (2.75rem) wraps "Web Development"
              onto two lines; scale with the viewport so the h1 stays four
              lines on phones. */}
          <h1 className="text-display mt-2 font-semibold max-sm:text-[clamp(2rem,10.2vw,2.75rem)] lg:mt-8">
            <span className="sr-only">{homePage.hero.h1}</span>
            <span aria-hidden="true" className="flex flex-col gap-1">
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
                      0.12 + (homePage.hero.headline.length + index) * 0.08,
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
            className="mt-4 max-w-xl text-base leading-relaxed text-muted md:text-lg lg:mt-7"
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
    </section>
  );
}
