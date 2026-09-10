'use client';

import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { SectionHeading } from './ui/SectionHeading';
import { Atmosphere } from './ui/Atmosphere';
import { Reveal, Stagger, StaggerItem } from './ui/Reveal';
import { StatusDot } from './ui/StatusDot';
import {
  homePage,
  isExternalHref,
  projects,
  type Project,
} from '@/lib/content';
import { cn } from '@/lib/utils';

export function Projects() {
  return (
    <section
      id="work"
      className="relative scroll-mt-24 overflow-hidden py-16 md:py-24"
    >
      <Atmosphere variant="cyan" className="opacity-70" />

      <div className="container-shell relative">
        <SectionHeading
          eyebrow={homePage.results.eyebrow}
          title={
            <>
              {homePage.results.title}{' '}
              <span className="text-gradient">
                {homePage.results.titleAccent}
              </span>
            </>
          }
          description={homePage.results.description}
        />

        {/* <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {homePage.results.metrics.map((metric) => (
            <StaggerItem key={metric.label}>
              <article className="border-gradient glass-panel rounded-2xl px-5 py-4">
                <p className="font-display text-2xl font-semibold tracking-tight text-cream md:text-[1.75rem]">
                  {metric.value}
                </p>
                <p className="mt-1 font-mono text-[0.625rem] tracking-[0.18em] text-muted uppercase">
                  {metric.label}
                </p>
              </article>
            </StaggerItem>
          ))}
        </Stagger> */}

        <Stagger
          className={cn(
            'mt-8 grid gap-6',
            projects.length === 2
              ? 'lg:grid-cols-12'
              : projects.length > 2
                ? 'md:grid-cols-2 lg:grid-cols-3'
                : 'mx-auto max-w-5xl md:grid-cols-2',
          )}
        >
          {projects.map((project, index) => (
            <StaggerItem
              key={project.id}
              className={cn(
                projects.length === 2 &&
                  (index === 0 ? 'lg:col-span-7' : 'lg:col-span-5'),
              )}
            >
              <ProjectCard
                project={project}
                index={index}
                featured={projects.length === 2 && index === 0}
              />
            </StaggerItem>
          ))}
        </Stagger>

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
  index,
  featured = false,
}: {
  project: Project;
  index: number;
  featured?: boolean;
}) {
  const isVector = project.image.endsWith('.svg');
  const isExternal = isExternalHref(project.href);
  const logId = `LOG-${String(index + 1).padStart(2, '0')}`;

  return (
    <article className="group h-full">
      <a
        href={project.href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        aria-label={
          isExternal ? `${project.title} (opens in a new tab)` : undefined
        }
        className="border-gradient glass-panel relative flex h-full flex-col overflow-hidden rounded-2xl transition-transform duration-500 ease-out hover:-translate-y-1.5 active:scale-[0.98] motion-reduce:transform-none"
      >
        <div
          className={cn(
            'relative overflow-hidden',
            featured
              ? 'aspect-[16/10] md:aspect-[21/9] lg:aspect-[16/10]'
              : 'aspect-[4/3]',
          )}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-3 z-10 rounded-[1.25rem] border border-white/15 shadow-[inset_0_0_40px_rgba(5,11,22,0.35)]"
          />
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
          <span
            aria-hidden="true"
            className="animate-scan pointer-events-none absolute inset-x-6 top-0 z-10 h-px bg-gradient-to-r from-transparent via-electric/70 to-transparent opacity-0 group-hover:opacity-100 motion-reduce:hidden"
          />

          <span className="absolute top-5 left-5 z-20 font-mono text-[0.625rem] tracking-[0.2em] text-cream uppercase">
            {logId}
          </span>

          {isExternal && (
            <span className="absolute top-5 right-5 z-20 inline-flex items-center gap-1.5 rounded-full border border-aurora/30 bg-void/70 px-2.5 py-1 font-mono text-[0.625rem] tracking-[0.16em] text-aurora-300 uppercase backdrop-blur-sm">
              <StatusDot />
              In orbit
            </span>
          )}

          <span className="absolute bottom-5 left-5 z-20 font-display text-sm font-semibold text-amber">
            {project.metric}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <p className="font-mono text-[0.625rem] tracking-[0.18em] text-muted-dim uppercase">
            {project.category}
          </p>
          <h3 className="mt-2 text-lg font-semibold tracking-tight text-cream transition-colors duration-300 group-hover:text-electric-300">
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
