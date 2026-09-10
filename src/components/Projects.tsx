'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { SectionHeading } from './ui/SectionHeading';
import { Atmosphere } from './ui/Atmosphere';
import { Reveal } from './ui/Reveal';
import {
  homePage,
  isExternalHref,
  projectCategories,
  projects,
  type Project,
} from '@/lib/content';
import { cn } from '@/lib/utils';

export function Projects() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const prefersReducedMotion = useReducedMotion();
  const showFilter = projectCategories.length > 2;

  const visibleProjects = useMemo(
    () =>
      activeCategory === 'All'
        ? projects
        : projects.filter((project) => project.category === activeCategory),
    [activeCategory],
  );

  const isPair = visibleProjects.length === 2;

  return (
    <section id="work" className="relative scroll-mt-24 overflow-hidden py-16 md:py-24">
      <Atmosphere variant="cyan" className="opacity-70" />

      <div className="container-shell relative">
        <SectionHeading
          eyebrow={homePage.results.eyebrow}
          title={
            <>
              {homePage.results.title}{' '}
              <span className="text-gradient">{homePage.results.titleAccent}</span>
            </>
          }
          description={homePage.results.description}
        />

        {showFilter && (
          <Reveal direction="up" delay={0.1} className="mt-8 flex justify-center">
            <div
              role="group"
              aria-label="Filter projects by category"
              className="flex flex-wrap justify-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] p-1.5 backdrop-blur-sm"
            >
              {projectCategories.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    aria-pressed={isActive}
                    className={cn(
                      'relative rounded-full px-4 py-2 text-sm transition-colors duration-300',
                      isActive ? 'text-void' : 'text-muted hover:text-cream',
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="project-filter-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-electric"
                        transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                      />
                    )}
                    {category}
                  </button>
                );
              })}
            </div>
          </Reveal>
        )}

        <motion.div
          layout={!prefersReducedMotion}
          className={cn(
            'mt-12 grid gap-6',
            isPair
              ? 'lg:grid-cols-12'
              : projects.length > 2
                ? 'md:grid-cols-2 lg:grid-cols-3'
                : 'mx-auto max-w-5xl md:grid-cols-2',
          )}
        >
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout={!prefersReducedMotion}
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.6,
                  delay: Math.min(index, 5) * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={cn(
                  isPair && (index === 0 ? 'lg:col-span-7' : 'lg:col-span-5'),
                )}
              >
                <ProjectCard project={project} featured={isPair && index === 0} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <Reveal direction="up" className="mt-10 text-center">
          <p className="text-sm text-muted-dim">
            {homePage.results.footerPrompt}{' '}
            <a
              href="/contact"
              className="text-electric-300 underline decoration-electric/40 underline-offset-4 transition-colors hover:text-cream"
            >
              {homePage.results.footerLink}
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  const isVector = project.image.endsWith('.svg');
  const isExternal = isExternalHref(project.href);

  return (
    <article className="group h-full">
      <a
        href={project.href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        aria-label={
          isExternal ? `${project.title} (opens in a new tab)` : undefined
        }
        className={cn(
          'border-gradient glass-panel relative flex h-full flex-col overflow-hidden rounded-2xl',
          'transition-transform duration-500 ease-out hover:-translate-y-1.5 active:scale-[0.98] motion-reduce:transform-none',
        )}
      >
        <div
          className={cn(
            'relative overflow-hidden',
            featured ? 'aspect-[16/10] md:aspect-[21/9] lg:aspect-[16/10]' : 'aspect-[4/3]',
          )}
        >
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            unoptimized={isVector}
            sizes={
              featured
                ? '(min-width: 1024px) 58vw, 100vw'
                : '(min-width: 1024px) 42vw, 100vw'
            }
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.06] motion-reduce:transform-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-void via-navy/25 to-transparent" />

          <span className="absolute top-4 left-4 rounded-full border border-white/15 bg-void/70 px-3 py-1.5 font-mono text-[0.625rem] tracking-[0.16em] text-cream uppercase backdrop-blur-sm">
            {project.category}
          </span>

          <span className="absolute bottom-4 left-4 font-display text-sm font-semibold text-amber">
            {project.metric}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-lg font-semibold tracking-tight text-cream transition-colors duration-300 group-hover:text-electric-300">
            {project.title}
          </h3>
          <p className="mt-2.5 text-sm leading-relaxed text-muted">
            {project.description}
          </p>

          <span className="mt-6 inline-flex items-center gap-1.5 font-mono text-[0.6875rem] tracking-[0.16em] text-muted uppercase transition-colors duration-300 group-hover:text-cream">
            {isExternal ? 'Visit site' : 'View case study'}
            <ArrowUpRight
              className="size-3.5 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none"
              aria-hidden="true"
            />
          </span>
        </div>
      </a>
    </article>
  );
}
