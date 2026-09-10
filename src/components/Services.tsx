'use client';

import type { MouseEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { SectionHeading } from './ui/SectionHeading';
import { Atmosphere } from './ui/Atmosphere';
import { Stagger, StaggerItem, Reveal } from './ui/Reveal';
import { homePage, services, type Service } from '@/lib/content';
import { cn } from '@/lib/utils';

const SERVICE_ART: Record<
  string,
  { src: string; imageClass: string; overlayClass: string }
> = {
  'website-development': {
    src: '/space/earth-orbit.webp',
    imageClass: 'object-[72%_center]',
    overlayClass:
      'bg-linear-to-r from-void/88 via-void/72 to-void/40 md:via-void/55 md:to-transparent',
  },
  'web-app-development': {
    src: '/space/carina-nebula.webp',
    imageClass: 'object-center',
    overlayClass: 'bg-linear-to-t from-void via-void/70 to-navy/45',
  },
  'native-app-development': {
    src: '/space/jupiter.webp',
    imageClass: 'object-[center_30%]',
    overlayClass: 'bg-linear-to-t from-void via-void/75 to-navy/50',
  },
  'seo-campaigns': {
    src: '/space/pillars-of-creation.webp',
    imageClass: 'object-[40%_center]',
    overlayClass: 'bg-linear-to-t from-void via-void/70 to-navy/45',
  },
};

export function Services() {
  const [featured, ...rest] = services;

  return (
    <section
      id="services"
      className="relative scroll-mt-24 overflow-hidden py-16 md:py-24"
    >
      <Atmosphere variant="cyan" />

      <div className="container-shell relative">
        <SectionHeading
          eyebrow={homePage.services.eyebrow}
          title={
            <>
              {homePage.services.title}{' '}
              <span className="text-gradient">
                {homePage.services.titleAccent}
              </span>
            </>
          }
          description={homePage.services.description}
        />

        {featured && (
          <Reveal direction="up" className="mt-12">
            <ServiceCard service={featured} featured />
          </Reveal>
        )}

        <Stagger className="mt-5 grid gap-5 md:grid-cols-3">
          {rest.map((service) => (
            <StaggerItem key={service.id}>
              <ServiceCard service={service} />
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-5">
          <FlightCheckPanel />
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  featured = false,
}: {
  service: Service;
  featured?: boolean;
}) {
  const Icon = service.icon;

  const mouseX = useMotionValue(-400);
  const mouseY = useMotionValue(-400);
  const spotlight = useMotionTemplate`radial-gradient(320px circle at ${mouseX}px ${mouseY}px, rgba(26,212,238,0.14), rgba(124,58,237,0.08) 42%, transparent 72%)`;

  const handleMouseMove = ({
    currentTarget,
    clientX,
    clientY,
  }: MouseEvent<HTMLElement>) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const handleMouseLeave = () => {
    mouseX.set(-400);
    mouseY.set(-400);
  };

  const art = SERVICE_ART[service.id];

  return (
    <Link
      href={service.href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'group border-gradient glass-panel relative flex h-full overflow-hidden rounded-2xl bg-void/50 p-7 transition-transform duration-500 ease-out hover:-translate-y-1.5 active:scale-[0.98] md:p-8 motion-reduce:transform-none',
        featured ? 'flex-col md:flex-row md:items-end md:gap-12' : 'flex-col',
      )}
    >
      {art && (
        <div
          aria-hidden="true"
          className="absolute inset-px overflow-hidden rounded-[inherit]"
        >
          <Image
            src={art.src}
            alt=""
            fill
            sizes={
              featured
                ? '(min-width: 768px) 80rem, 100vw'
                : '(min-width: 768px) 33vw, 100vw'
            }
            className={cn(
              'object-cover opacity-70 saturate-125 transition-[transform,opacity] duration-700 ease-out group-hover:scale-105 group-hover:opacity-90 motion-reduce:transform-none',
              art.imageClass,
            )}
          />
          <div
            className={cn(
              'absolute inset-0 transition-opacity duration-700 group-hover:opacity-80',
              art.overlayClass,
            )}
          />
        </div>
      )}

      <motion.div
        aria-hidden="true"
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-0 z-1 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className={cn('relative z-10', featured && 'md:max-w-xl md:flex-1')}>
        <div className="flex items-start justify-between gap-4">
          <div className="relative">
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-xl bg-electric/30 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
            />
            <span className="relative inline-flex size-13 items-center justify-center rounded-xl border border-white/10 bg-void/55 backdrop-blur-sm">
              <Icon
                className="size-6 text-electric-300 transition-all duration-500 ease-out group-hover:scale-110 group-hover:text-cream motion-reduce:transform-none"
                strokeWidth={1.6}
                aria-hidden="true"
              />
            </span>
          </div>

          {!featured && (
            <ArrowUpRight
              className="size-5 shrink-0 text-muted-dim transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-electric-300 motion-reduce:transform-none"
              aria-hidden="true"
            />
          )}
        </div>

        <h3 className="relative mt-7 text-xl font-semibold tracking-tight text-cream drop-shadow-[0_2px_14px_rgba(5,11,22,0.85)] md:text-[1.35rem]">
          {service.title}
        </h3>

        <p className="relative mt-3.5 text-[0.9375rem] leading-relaxed text-cream/75 drop-shadow-[0_2px_12px_rgba(5,11,22,0.9)]">
          {service.description}
        </p>
      </div>

      <div
        className={cn(
          'relative z-10 mt-auto flex flex-col gap-6 pt-7',
          featured && 'md:items-end md:pt-0',
        )}
      >
        <ul className="flex flex-wrap gap-2">
          {service.capabilities.map((capability) => (
            <li
              key={capability}
              className="rounded-full border border-white/12 bg-void/60 px-3 py-1.5 font-mono text-[0.6875rem] tracking-wide text-cream/80 backdrop-blur-sm transition-colors duration-500 group-hover:border-electric/30 group-hover:text-cream"
            >
              {capability}
            </li>
          ))}
        </ul>

        <span className="inline-flex items-center gap-1.5 font-mono text-[0.6875rem] tracking-[0.16em] text-muted uppercase transition-colors duration-300 group-hover:text-cream">
          Explore
          <ArrowUpRight
            className="size-3.5 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  );
}

function FlightCheckPanel() {
  return (
    <a
      href="/contact"
      className="group border-gradient glass-panel relative flex flex-col justify-between overflow-hidden rounded-2xl p-7 transition-transform duration-500 ease-out hover:-translate-y-1.5 active:scale-[0.98] md:flex-row md:items-end md:p-8 motion-reduce:transform-none"
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber/70 to-transparent"
      />
      <div
        aria-hidden="true"
        className="animate-drift glow-amber absolute -right-16 -bottom-16 size-52 rounded-full blur-2xl"
      />

      <div className="relative max-w-xl">
        <h3 className="text-xl font-semibold tracking-tight text-cream">
          {homePage.services.flightCheckTitle}
        </h3>
        <p className="mt-3.5 text-[0.9375rem] leading-relaxed text-cream/70">
          {homePage.services.flightCheckBody}
        </p>
      </div>

      <span className="relative mt-7 inline-flex items-center gap-2 font-mono text-xs tracking-[0.18em] text-amber uppercase md:mt-0">
        {homePage.services.flightCheckCta}
        <ArrowUpRight
          className="size-4 transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:translate-x-1 motion-reduce:transform-none"
          aria-hidden="true"
        />
      </span>
    </a>
  );
}
