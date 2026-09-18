'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  AnimatePresence,
  motion,
  useScroll,
  useMotionValueEvent,
} from 'framer-motion';
import { Menu, Phone, X } from 'lucide-react';
import { Logo } from './Logo';
import { scrollToPageTop } from './ScrollToTop';
import { company, navLinks, socials } from '@/lib/content';
import { serviceNavLinks, servicePath } from '@/lib/services';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const PHONE_HREF = `tel:${company.phone.replace(/[^\d+]/g, '')}`;

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

type NavItemProps = {
  href: string;
  label: string;
  isActive: boolean;
  className?: string;
  onClick?: () => void;
};

function NavItem({ href, label, isActive, className, onClick }: NavItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'relative rounded-full px-2.5 py-1.5 text-sm transition-colors duration-300 xl:px-3',
        isActive ? 'text-cream' : 'text-muted hover:text-cream',
        className,
      )}
    >
      {isActive && (
        <motion.span
          layoutId="nav-active-pill"
          className="absolute inset-0 -z-10 rounded-full border border-electric/25 bg-electric/10"
          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
        />
      )}
      {label}
    </Link>
  );
}

function isPathActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navigation() {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 24);
  });

  useEffect(() => {
    setMounted(true);
    setScrolled(window.scrollY > 24);
  }, []);

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

  const shellWidth = scrolled ? 'max-w-6xl' : 'max-w-7xl';
  const closeMenu = () => setMenuOpen(false);

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
          scroll={false}
          onClick={() => {
            if (pathname === '/') scrollToPageTop('smooth');
          }}
          className="group shrink-0 rounded-lg pl-1"
          aria-label={`${company.name} — home`}
        >
          <Image
            src="/logo.png"
            alt={company.name}
            height={120}
            width={120}
            className="h-12 w-auto"
          />
        </Link>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {serviceNavLinks.map((link) => {
            const href = servicePath(link.slug);
            return (
              <li key={link.slug}>
                <NavItem
                  href={href}
                  label={link.label}
                  isActive={isPathActive(pathname, href)}
                />
              </li>
            );
          })}
          {navLinks.map((link) => (
            <li key={link.href}>
              <NavItem
                href={link.href}
                label={link.label}
                isActive={isPathActive(pathname, link.href)}
              />
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5">
          <ul className=" flex gap-2.5 mr-1">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${company.name} on ${social.label}`}
                  className="grid size-7 place-items-center rounded-full border border-white/10  text-muted transition-all duration-300 hover:text-cream"
                >
                  <img
                    src={social.image}
                    alt={social.label}
                    className="invert"
                  />
                </a>
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            className="hidden items-center rounded-full border border-electric px-3.5 py-1.5 text-[10px] tracking-[0.2em] text-electric uppercase transition-all duration-200 hover:bg-electric hover:text-white sm:inline-flex"
          >
            Free Consultation
          </Link>
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

      {mounted
        ? createPortal(
            <AnimatePresence>
              {menuOpen ? (
                <motion.button
                  type="button"
                  aria-label="Close menu"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={closeMenu}
                  className="fixed inset-0 z-40 bg-void/40 backdrop-blur-md lg:hidden"
                />
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className={cn(
              'mx-auto mt-2 max-h-[min(70vh,32rem)] overflow-y-auto rounded-3xl border border-white/15 bg-void/95 p-4 shadow-xl backdrop-blur-xl xl:hidden',
              shellWidth,
            )}
          >
            <div className="flex flex-col">
              {serviceNavLinks.map((link) => {
                const href = servicePath(link.slug);
                return (
                  <NavItem
                    key={link.slug}
                    href={href}
                    label={link.label}
                    isActive={isPathActive(pathname, href)}
                    onClick={closeMenu}
                    className="rounded-xl px-3 py-2.5 font-medium"
                  />
                );
              })}
              {navLinks.map((link) => (
                <NavItem
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  isActive={isPathActive(pathname, link.href)}
                  onClick={closeMenu}
                  className="rounded-xl px-3 py-2.5 font-medium"
                />
              ))}
            </div>

            <div className="mt-3 grid gap-2 border-t border-white/10 pt-3">
              <Link
                href="/contact"
                onClick={closeMenu}
                className="rounded-xl bg-white px-4 py-3 text-center text-sm font-semibold tracking-[0.15em] text-navy uppercase"
              >
                Schedule Your Free Consultation
              </Link>
              {/* <a
                href={PHONE_HREF}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/40 px-4 py-3 text-center text-sm font-medium text-cream"
              >
                <Phone className="size-3.5" aria-hidden="true" />
                {company.phone}
              </a> */}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
