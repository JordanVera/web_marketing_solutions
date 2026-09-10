'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  AnimatePresence,
  motion,
  useScroll,
  useMotionValueEvent,
} from 'framer-motion';
import { ChevronDown, Menu, Phone, X } from 'lucide-react';
import { Logo } from './Logo';
import { company, navLinks } from '@/lib/content';
import { servicePages, servicePath } from '@/lib/services';
import { cn } from '@/lib/utils';

const HOME_SECTION_IDS = [
  'services',
  'houston',
  'work',
  'process',
  'testimonials',
] as const;

const PHONE_HREF = `tel:${company.phone.replace(/[^\d+]/g, '')}`;

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export function Navigation() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const onServices = pathname.startsWith('/services');

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 24);
  });

  useEffect(() => {
    setScrolled(window.scrollY > 24);
  }, []);

  useEffect(() => {
    if (!isHome) return;

    const elements = HOME_SECTION_IDS.map((id) =>
      document.getElementById(id),
    ).filter((el): el is HTMLElement => Boolean(el));
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  const currentSection = isHome ? activeSection : '';
  const servicesActive = onServices || currentSection === 'services';
  const shellWidth = scrolled ? 'max-w-5xl' : 'max-w-6xl';

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:pt-4"
    >
      <nav
        aria-label="Primary"
        className={cn(
          'mx-auto flex items-center justify-between rounded-full border px-3 py-2 transition-all duration-300 sm:px-4',
          shellWidth,
          scrolled
            ? 'border-white/15 bg-void/95 shadow-lg shadow-black/40 backdrop-blur-xl'
            : 'border-transparent bg-transparent',
        )}
      >
        <Link
          href="/"
          className="group shrink-0 rounded-lg pl-1"
          aria-label={`${company.name} — home`}
        >
          <Logo />
        </Link>

        <ul className="hidden items-center gap-0.5 lg:flex">
          <ServicesDropdown active={servicesActive} />
          {navLinks.map((link) => {
            const section = link.href.split('#')[1];
            const isActive = currentSection === section;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={cn(
                    'relative rounded-full px-2.5 py-1.5 text-sm transition-colors duration-300 xl:px-3',
                    isActive ? 'text-cream' : 'text-muted hover:text-cream',
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 -z-10 rounded-full border border-electric/25 bg-electric/10"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 32,
                      }}
                    />
                  )}
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1.5">
          <a
            href="/#contact"
            className="hidden items-center rounded-full border border-white px-3.5 py-1.5 text-[10px] tracking-[0.2em] text-white uppercase transition-all duration-200 hover:bg-white hover:text-navy sm:inline-flex"
          >
            Start Your Launch
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="inline-flex size-9 items-center justify-center rounded-full text-cream lg:hidden"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className={cn(
              'mx-auto mt-2 max-h-[min(70vh,32rem)] overflow-y-auto rounded-3xl border border-white/15 bg-void/95 p-4 shadow-xl backdrop-blur-xl lg:hidden',
              shellWidth,
            )}
          >
            <MobileNav
              servicesActive={servicesActive}
              onNavigate={() => setMenuOpen(false)}
            />
            <div className="mt-3 grid gap-2 border-t border-white/10 pt-3">
              <a
                href="/#contact"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl bg-white px-4 py-3 text-center text-sm font-semibold tracking-[0.15em] text-navy uppercase"
              >
                Start Your Launch
              </a>
              <a
                href={PHONE_HREF}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/40 px-4 py-3 text-center text-sm font-medium text-cream"
              >
                <Phone className="size-3.5" aria-hidden="true" />
                {company.phone}
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
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
      if (event.key === 'Escape') setOpen(false);
    };

    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('keydown', onKeyDown);
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
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
          />
        )}
        <Link
          href="/services"
          className={cn(
            'rounded-full py-1.5 pr-1 pl-3 text-sm transition-colors duration-300',
            active ? 'text-cream' : 'text-muted hover:text-cream',
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
            'rounded-full py-1.5 pr-3 pl-1 text-sm transition-colors duration-300',
            active ? 'text-cream' : 'text-muted hover:text-cream',
          )}
        >
          <ChevronDown
            className={cn(
              'size-3.5 transition-transform duration-300',
              open && 'rotate-180',
            )}
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
            transition={{ duration: 0.2, ease: EASE_OUT }}
            className="absolute top-full left-0 z-50 mt-3 w-90 overflow-hidden rounded-2xl border border-white/8 bg-navy/95 p-2 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.8)] backdrop-blur-xl"
          >
            {servicePages.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.slug}
                  href={servicePath(service.slug)}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className="group flex items-start gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-white/5"
                >
                  <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/4">
                    <Icon
                      className="size-4 text-electric-300"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-cream">
                      {service.navLabel}
                    </span>
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
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = useState(true);

  return (
    <div className="flex flex-col">
      <button
        type="button"
        aria-expanded={servicesOpen}
        onClick={() => setServicesOpen((open) => !open)}
        className={cn(
          'flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition hover:bg-white/10',
          servicesActive ? 'text-cream' : 'text-white/80 hover:text-cream',
        )}
      >
        Services
        <ChevronDown
          className={cn(
            'size-4 text-muted-dim transition-transform duration-300',
            servicesOpen && 'rotate-180',
          )}
          aria-hidden="true"
        />
      </button>
      <AnimatePresence initial={false}>
        {servicesOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: EASE_OUT }}
            className="overflow-hidden"
          >
            <Link
              href="/services"
              onClick={onNavigate}
              className={cn(
                'block rounded-xl py-2 pr-3 pl-6 text-sm transition hover:bg-white/10',
                pathname === '/services'
                  ? 'text-cream'
                  : 'text-white/70 hover:text-cream',
              )}
            >
              All services
            </Link>
            {servicePages.map((service) => (
              <Link
                key={service.slug}
                href={servicePath(service.slug)}
                onClick={onNavigate}
                className={cn(
                  'block rounded-xl py-2 pr-3 pl-6 text-sm transition hover:bg-white/10',
                  pathname === servicePath(service.slug)
                    ? 'text-cream'
                    : 'text-white/70 hover:text-cream',
                )}
              >
                {service.navLabel}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {navLinks.map((link) => (
        <a
          key={link.href}
          href={link.href}
          onClick={onNavigate}
          className="rounded-xl px-3 py-2.5 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-cream"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}
