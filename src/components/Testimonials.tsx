'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { SectionHeading } from './ui/SectionHeading';
import { Reveal } from './ui/Reveal';
import { clientLogos, homePage, testimonials } from '@/lib/content';
import { cn } from '@/lib/utils';

const AUTOPLAY_MS = 7500;

const slideVariants: Variants = {
  enter: (direction: number) => ({ opacity: 0, x: direction > 0 ? 56 : -56 }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({ opacity: 0, x: direction > 0 ? -56 : 56 }),
};

export function Testimonials() {
  const [[index, direction], setSlide] = useState<[number, number]>([0, 0]);
  const [paused, setPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const paginate = useCallback((delta: number) => {
    setSlide(([current]) => [
      (current + delta + testimonials.length) % testimonials.length,
      delta,
    ]);
  }, []);

  const goTo = useCallback((next: number) => {
    setSlide(([current]) => [next, next > current ? 1 : -1]);
  }, []);

  // Auto-advance, unless the user is interacting or prefers reduced motion.
  useEffect(() => {
    if (paused || prefersReducedMotion) return;
    const timer = window.setInterval(() => paginate(1), AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [paused, prefersReducedMotion, paginate]);

  const active = testimonials[index];
  const initials = active.name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('');

  return (
    <section id="testimonials" className="relative scroll-mt-24 py-16 md:py-24">
      <div className="container-shell">
        <SectionHeading
          eyebrow={homePage.testimonials.eyebrow}
          title={
            <>
              {homePage.testimonials.title}{' '}
              <span className="text-gradient">
                {homePage.testimonials.titleAccent}
              </span>
            </>
          }
        />

        <div
          className="relative mx-auto mt-10 max-w-4xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          onKeyDown={(event) => {
            if (event.key === 'ArrowRight') paginate(1);
            if (event.key === 'ArrowLeft') paginate(-1);
          }}
          role="group"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
        >
          <div className="border-gradient relative min-h-[26rem] overflow-hidden rounded-3xl bg-navy/45 p-8 backdrop-blur-sm sm:min-h-[22rem] md:p-12">
            <Quote
              className="absolute top-8 right-8 size-16 text-electric/10 md:size-24"
              aria-hidden="true"
            />

            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.blockquote
                key={active.id}
                custom={direction}
                variants={prefersReducedMotion ? undefined : slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex h-full flex-col"
              >
                <div className="flex gap-1" aria-label="Rated 5 out of 5">
                  {Array.from({ length: 5 }, (_, starIndex) => (
                    <Star
                      key={starIndex}
                      className="size-4 fill-electric-300 text-electric-300"
                      aria-hidden="true"
                    />
                  ))}
                </div>

                <p className="mt-7 font-display text-xl leading-snug font-medium text-cream md:text-[1.75rem]">
                  &ldquo;{active.quote}&rdquo;
                </p>

                <footer className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-4 pt-10">
                  <span
                    aria-hidden="true"
                    className="grid size-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-electric to-nebula font-display text-sm font-bold text-void"
                  >
                    {initials}
                  </span>
                  <div>
                    <cite className="block font-display text-base font-semibold text-cream not-italic">
                      {active.name}
                    </cite>
                    <span className="mt-0.5 block text-sm text-muted">
                      {active.role}, {active.company}
                    </span>
                  </div>
                  <span className="ml-auto rounded-full border border-electric/25 bg-electric/10 px-3.5 py-1.5 font-mono text-[0.6875rem] tracking-[0.14em] text-electric-300 uppercase">
                    {active.result}
                  </span>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-between gap-6">
            <div
              className="flex gap-2.5"
              role="tablist"
              aria-label="Choose a testimonial"
            >
              {testimonials.map((testimonial, dotIndex) => {
                const isActive = dotIndex === index;
                return (
                  <button
                    key={testimonial.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Testimonial from ${testimonial.name}`}
                    onClick={() => goTo(dotIndex)}
                    className={cn(
                      'h-1.5 rounded-full transition-all duration-500',
                      isActive
                        ? 'w-10 bg-electric'
                        : 'w-4 bg-white/15 hover:bg-white/30',
                    )}
                  />
                );
              })}
            </div>

            <div className="flex gap-2.5">
              <CarouselButton
                label="Previous testimonial"
                onClick={() => paginate(-1)}
              >
                <ChevronLeft className="size-5" aria-hidden="true" />
              </CarouselButton>
              <CarouselButton
                label="Next testimonial"
                onClick={() => paginate(1)}
              >
                <ChevronRight className="size-5" aria-hidden="true" />
              </CarouselButton>
            </div>
          </div>
        </div>

        {/* Client wordmarks — swap for real logo files when available */}
        <Reveal direction="up" className="mt-12">
          <p className="text-center font-mono text-[0.625rem] tracking-[0.28em] text-muted-dim uppercase">
            Trusted by teams across Texas
          </p>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-14">
            {clientLogos.map((logo) => (
              <li
                key={logo}
                className="font-display text-sm font-bold tracking-[0.16em] text-muted-dim transition-colors duration-300 hover:text-cream md:text-base"
              >
                {logo}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function CarouselButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid size-11 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-electric-400/50 hover:bg-white/10 hover:text-cream"
    >
      {children}
    </button>
  );
}
