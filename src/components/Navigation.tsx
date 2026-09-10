"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "./ui/Button";
import { company, navLinks } from "@/lib/content";
import { servicePages, servicePath } from "@/lib/services";
import { cn } from "@/lib/utils";

const HOME_SECTION_IDS = ["services", "houston", "work", "process", "testimonials"] as const;

export function Navigation() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const onServices = pathname.startsWith("/services");

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  useEffect(() => {
    if (!isHome) {
      setActiveSection("");
      return;
    }

    const elements = HOME_SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const servicesActive = onServices || (isHome && activeSection === "services");

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-white/[0.07] bg-void/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <nav
          aria-label="Primary"
          className="container-shell flex h-18 items-center justify-between gap-6"
        >
          <Link href="/" className="group rounded-lg" aria-label={`${company.name} — home`}>
            <Logo />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            <ServicesDropdown active={servicesActive} />
            {navLinks.map((link) => {
              const section = link.href.split("#")[1];
              const isActive = isHome && activeSection === section;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={cn(
                      "relative rounded-full px-4 py-2 text-sm transition-colors duration-300",
                      isActive ? "text-cream" : "text-muted hover:text-cream",
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 -z-10 rounded-full border border-electric/25 bg-electric/10"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <Button href="/#contact" variant="primary" size="sm">
              Start Your Launch
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="inline-flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-cream transition-colors hover:border-electric-400/50 hover:bg-white/10 lg:hidden"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-void/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="container-shell flex h-full flex-col overflow-y-auto pt-28 pb-10">
              <MobileNav
                servicesActive={servicesActive}
                onNavigate={() => setMenuOpen(false)}
              />

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 0.5 }}
                className="mt-auto flex flex-col gap-4 pt-8"
              >
                <Button href="/#contact" size="lg" className="w-full">
                  Start Your Launch
                </Button>
                <p className="text-center font-mono text-xs tracking-widest text-muted-dim uppercase">
                  Houston, TX · 29.55° N, 95.10° W
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ServicesDropdown({ active }: { active: boolean }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLLIElement | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuId = useId();

  const clearClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openMenu = () => {
    clearClose();
    setOpen(true);
  };

  const scheduleClose = () => {
    clearClose();
    closeTimer.current = setTimeout(() => setOpen(false), 160);
  };

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => () => clearClose(), []);

  return (
    <li
      ref={wrapRef}
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
    >
      <div className="relative flex items-center">
        {active && (
          <motion.span
            layoutId="nav-active-pill"
            className="absolute inset-0 -z-10 rounded-full border border-electric/25 bg-electric/10"
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
          />
        )}
        <Link
          href="/services"
          className={cn(
            "rounded-full py-2 pr-1 pl-4 text-sm transition-colors duration-300",
            active ? "text-cream" : "text-muted hover:text-cream",
          )}
        >
          Services
        </Link>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={menuId}
          aria-haspopup="menu"
          aria-label="Open services menu"
          onClick={() => setOpen((value) => !value)}
          className={cn(
            "rounded-full py-2 pr-3 pl-1 text-sm transition-colors duration-300",
            active ? "text-cream" : "text-muted hover:text-cream",
          )}
        >
          <ChevronDown
            className={cn("size-3.5 transition-transform duration-300", open && "rotate-180")}
            aria-hidden="true"
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            role="menu"
            aria-label="Services"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-0 z-50 mt-3 w-[22.5rem] overflow-hidden rounded-2xl border border-white/[0.08] bg-navy/95 p-2 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.8)] backdrop-blur-xl"
          >
            {servicePages.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.slug}
                  href={servicePath(service.slug)}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className="group flex items-start gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-white/[0.05]"
                >
                  <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04]">
                    <Icon className="size-4 text-electric-300" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-cream">{service.navLabel}</span>
                    <span className="mt-0.5 block text-xs leading-relaxed text-muted">
                      {service.navDescription}
                    </span>
                  </span>
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

function MobileNav({
  servicesActive,
  onNavigate,
}: {
  servicesActive: boolean;
  onNavigate: () => void;
}) {
  const [servicesOpen, setServicesOpen] = useState(true);

  return (
    <ul className="flex flex-col gap-1">
      <motion.li
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <button
          type="button"
          aria-expanded={servicesOpen}
          onClick={() => setServicesOpen((open) => !open)}
          className="flex w-full items-baseline justify-between gap-4 border-b border-white/[0.07] py-5 font-display text-3xl font-semibold text-cream"
        >
          <span className="flex items-baseline gap-4">
            <span className={cn("font-mono text-xs", servicesActive ? "text-electric-300" : "text-muted-dim")}>
              01
            </span>
            Services
          </span>
          <ChevronDown
            className={cn(
              "size-6 text-muted-dim transition-transform duration-300",
              servicesOpen && "rotate-180",
            )}
            aria-hidden="true"
          />
        </button>
        <AnimatePresence initial={false}>
          {servicesOpen && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <li>
                <Link
                  href="/services"
                  onClick={onNavigate}
                  className="flex border-b border-white/[0.05] py-3.5 pl-12 text-base text-muted transition-colors hover:text-cream"
                >
                  All services
                </Link>
              </li>
              {servicePages.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={servicePath(service.slug)}
                    onClick={onNavigate}
                    className="flex border-b border-white/[0.05] py-3.5 pl-12 text-base text-muted transition-colors hover:text-cream"
                  >
                    {service.navLabel}
                  </Link>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </motion.li>

      {navLinks.map((link, index) => (
        <motion.li
          key={link.href}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14 + index * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            href={link.href}
            onClick={onNavigate}
            className="flex items-baseline gap-4 border-b border-white/[0.07] py-5 font-display text-3xl font-semibold text-cream"
          >
            <span className="font-mono text-xs text-electric-300">0{index + 2}</span>
            {link.label}
          </a>
        </motion.li>
      ))}
    </ul>
  );
}
