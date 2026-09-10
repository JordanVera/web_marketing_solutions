'use client';

import { useEffect, useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Jump to the top of the document, bypassing `html { scroll-behavior: smooth }`.
 * Next.js 16 keeps the current offset when the new page still intersects the
 * viewport, which is why the home hero can lose to the footer after a logo click.
 */
export function scrollToPageTop(
  behavior: ScrollBehavior = 'instant',
) {
  const root = document.scrollingElement ?? document.documentElement;

  if (behavior === 'smooth') {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    return;
  }

  const html = document.documentElement;
  const previousBehavior = html.style.scrollBehavior;
  html.style.scrollBehavior = 'auto';
  root.scrollTop = 0;
  html.scrollTop = 0;
  document.body.scrollTop = 0;
  window.scrollTo(0, 0);
  html.style.scrollBehavior = previousBehavior;
}

function resetScrollAfterNavigation() {
  if (window.location.hash) return;
  scrollToPageTop();
  // Next.js can still call scrollIntoView after our layout effect; run again
  // on the next frames so the hero wins over a preserved footer offset.
  requestAnimationFrame(() => {
    scrollToPageTop();
    requestAnimationFrame(() => scrollToPageTop());
  });
}

export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    history.scrollRestoration = 'manual';
  }, []);

  useLayoutEffect(() => {
    resetScrollAfterNavigation();
  }, [pathname]);

  return null;
}
