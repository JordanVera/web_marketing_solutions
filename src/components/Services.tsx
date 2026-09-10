"use client";

import type { MouseEvent } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ArrowUpRight, Rocket } from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { Stagger, StaggerItem } from "./ui/Reveal";
import { services, type Service } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Services() {
  return (
    <section id="services" className="relative scroll-mt-24 overflow-hidden py-28 md:py-36">
      {/* Soft ambient glow behind the grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 h-[40rem] w-[64rem] -translate-x-1/2 bg-[radial-gradient(ellipse_50%_40%_at_50%_40%,rgba(0,102,255,0.10),transparent_70%)]"
      />

      <div className="container-shell relative">
        <SectionHeading
          eyebrow="01 — Capabilities"
          title={
            <>
              Four systems that move <span className="text-gradient">the needle</span>
            </>
          }
          description="No retainer padding, no channel we can't defend with data. Each engagement combines the pieces you actually need to grow."
        />

        <Stagger className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <StaggerItem
              key={service.id}
              className={cn(service.featured && "md:col-span-2 lg:col-span-2")}
            >
              <ServiceCard service={service} />
            </StaggerItem>
          ))}
          <StaggerItem>
            <FlightCheckPanel />
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;

  // Cursor-tracked spotlight. Motion values keep this off the React render path.
  const mouseX = useMotionValue(-400);
  const mouseY = useMotionValue(-400);
  const spotlight = useMotionTemplate`radial-gradient(320px circle at ${mouseX}px ${mouseY}px, rgba(0,102,255,0.16), transparent 72%)`;

  const handleMouseMove = ({ currentTarget, clientX, clientY }: MouseEvent<HTMLElement>) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const handleMouseLeave = () => {
    mouseX.set(-400);
    mouseY.set(-400);
  };

  return (
    <article
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group border-gradient relative flex h-full flex-col overflow-hidden rounded-2xl",
        "bg-navy/40 p-7 backdrop-blur-sm transition-transform duration-500 ease-out",
        "hover:-translate-y-1.5 md:p-8",
      )}
    >
      <motion.div
        aria-hidden="true"
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="relative flex items-start justify-between gap-4">
        <div className="relative">
          {/* Glow that blooms out from behind the icon on hover */}
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-xl bg-electric/40 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
          />
          <span className="relative inline-flex size-13 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.12] to-white/[0.02]">
            <Icon
              className="size-6 text-electric-300 transition-all duration-500 ease-out group-hover:scale-110 group-hover:text-cream motion-reduce:transform-none"
              strokeWidth={1.6}
              aria-hidden="true"
            />
          </span>
        </div>

        <ArrowUpRight
          className="size-5 shrink-0 text-muted-dim transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-electric-300 motion-reduce:transform-none"
          aria-hidden="true"
        />
      </div>

      <h3
        className={cn(
          "relative mt-7 font-semibold tracking-tight text-cream",
          service.featured ? "text-2xl md:text-[1.75rem]" : "text-xl",
        )}
      >
        {service.title}
      </h3>

      <p
        className={cn(
          "relative mt-3.5 leading-relaxed text-muted",
          service.featured ? "max-w-xl text-base" : "text-[0.9375rem]",
        )}
      >
        {service.description}
      </p>

      <ul className="relative mt-auto flex flex-wrap gap-2 pt-7">
        {service.capabilities.map((capability) => (
          <li
            key={capability}
            className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 font-mono text-[0.6875rem] tracking-wide text-muted transition-colors duration-500 group-hover:border-electric/20 group-hover:text-cream/80"
          >
            {capability}
          </li>
        ))}
      </ul>
    </article>
  );
}

/** Fills the final bento cell with a low-commitment conversion path. */
function FlightCheckPanel() {
  return (
    <a
      href="#contact"
      className="group border-gradient relative flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-electric/18 via-nebula/10 to-transparent p-7 transition-transform duration-500 ease-out hover:-translate-y-1.5 md:p-8"
    >
      <div
        aria-hidden="true"
        className="animate-drift absolute -right-16 -bottom-16 size-52 rounded-full bg-[radial-gradient(circle,rgba(255,51,51,0.22),transparent_65%)] blur-2xl"
      />

      <div className="relative">
        <span className="inline-flex size-13 items-center justify-center rounded-xl border border-white/15 bg-white/10">
          <Rocket
            className="size-6 text-cream transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:rotate-12 motion-reduce:transform-none"
            strokeWidth={1.6}
            aria-hidden="true"
          />
        </span>
        <h3 className="mt-7 text-xl font-semibold tracking-tight text-cream">
          Not sure where to start?
        </h3>
        <p className="mt-3.5 text-[0.9375rem] leading-relaxed text-cream/70">
          Book a 20-minute flight check. We&apos;ll audit your site live and tell you the three
          things worth fixing first — no pitch deck.
        </p>
      </div>

      <span className="relative mt-7 inline-flex items-center gap-2 font-mono text-xs tracking-[0.18em] text-cream uppercase">
        Book a flight check
        <ArrowUpRight
          className="size-4 transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:translate-x-1 motion-reduce:transform-none"
          aria-hidden="true"
        />
      </span>
    </a>
  );
}
