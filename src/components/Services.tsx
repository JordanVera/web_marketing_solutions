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
    src: '/space/amber-nebula.webp',
    imageClass: 'object-center',
    overlayClass:
      'bg-linear-to-r from-void/88 via-void/70 to-void/40 md:via-void/55 md:to-void/25',
  },
  'web-app-development': {
    src: '/space/carina-nebula.webp',
    imageClass: 'object-center',
    overlayClass: 'bg-linear-to-t from-void via-void/70 to-navy/45',
  },
  'native-app-development': {
    src: '/space/amber-nebula.webp',
    imageClass: 'object-center',
    overlayClass: 'bg-linear-to-t from-void via-void/70 to-navy/45',
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
  const spotlight = useMotionTemplate`radial-gradient(320px circle at ${mouseX}px ${mouseY}px, rgba(251,146,60,0.14), rgba(244,63,154,0.08) 42%, transparent 72%)`;

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
        <CardBackdrop
          src={art.src}
          imageClass={art.imageClass}
          overlayClass={art.overlayClass}
          sizes={
            featured
              ? '(min-width: 768px) 80rem, 100vw'
              : '(min-width: 768px) 33vw, 100vw'
          }
        />
      )}

      <motion.div
        aria-hidden="true"
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-0 z-1 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className={cn('relative z-10', featured && 'md:max-w-xl md:flex-1')}>
        <h3 className="relative text-xl font-semibold tracking-tight text-cream drop-shadow-[0_2px_14px_rgba(5,11,22,0.85)] md:text-[1.35rem]">
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

        <span className="inline-flex items-center gap-1.5 font-mono text-[0.6875rem] tracking-[0.16em] text-amber uppercase transition-colors duration-300">
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

function CardBackdrop({
  src,
  imageClass,
  overlayClass,
  sizes,
}: {
  src: string;
  imageClass?: string;
  overlayClass: string;
  sizes: string;
}) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-px overflow-hidden rounded-[inherit]"
    >
      <Image
        src={src}
        alt=""
        fill
        sizes={sizes}
        className={cn(
          'object-cover opacity-70 saturate-125 transition-opacity duration-700 ease-out group-hover:opacity-90',
          imageClass,
        )}
      />
      <div
        className={cn(
          'absolute inset-0 transition-opacity duration-700 group-hover:opacity-80',
          overlayClass,
        )}
      />
    </div>
  );
}

function FlightCheckPanel() {
  return (
    <a
      href="/contact"
      className="group border-gradient glass-panel relative flex flex-col justify-between overflow-hidden rounded-2xl bg-void/50 p-7 transition-transform duration-500 ease-out hover:-translate-y-1.5 active:scale-[0.98] md:flex-row md:items-end md:p-8 motion-reduce:transform-none"
    >
      <CardBackdrop
        src="/space/consultation-nebula.webp"
        imageClass="object-center"
        overlayClass="bg-linear-to-r from-void/88 via-void/70 to-void/40 md:via-void/55 md:to-void/30"
        sizes="(min-width: 768px) 80rem, 100vw"
      />
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-10 h-px bg-linear-to-r from-transparent via-amber/70 to-transparent"
      />
      <div
        aria-hidden="true"
        className="animate-drift glow-amber absolute -right-16 -bottom-16 z-1 size-52 rounded-full blur-2xl"
      />

      <div className="relative z-10 max-w-xl">
        <h3 className="text-xl font-semibold tracking-tight text-cream drop-shadow-[0_2px_14px_rgba(5,11,22,0.85)]">
          {homePage.services.flightCheckTitle}
        </h3>
        <p className="mt-3.5 text-[0.9375rem] leading-relaxed text-cream/75 drop-shadow-[0_2px_12px_rgba(5,11,22,0.9)]">
          {homePage.services.flightCheckBody}
        </p>
      </div>

      <span className="relative z-10 mt-7 inline-flex items-center gap-2 font-mono text-xs tracking-[0.18em] text-amber uppercase drop-shadow-[0_2px_12px_rgba(5,11,22,0.9)] md:mt-0">
        {homePage.services.flightCheckCta}
        <ArrowUpRight
          className="size-4 transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:translate-x-1 motion-reduce:transform-none"
          aria-hidden="true"
        />
      </span>
    </a>
  );
}
