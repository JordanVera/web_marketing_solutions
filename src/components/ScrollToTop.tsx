'use client';

import { useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Jump to the top of the document, bypassing `html { scroll-behavior: smooth }`.
 * Next.js 16 keeps the current offset when the new page still intersects the
 * viewport, which is why the home hero can lose to the footer after a logo click.
 */
export function scrollToPageTop(
  behavior: ScrollBehavior = 'instant',
) {
  if (behavior === 'smooth') {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    return;
  }

  const html = document.documentElement;
  const previousBehavior = html.style.scrollBehavior;
  html.style.scrollBehavior = 'auto';
  window.scrollTo(0, 0);
  html.scrollTop = 0;
  document.body.scrollTop = 0;
  html.style.scrollBehavior = previousBehavior;
}

export function ScrollToTop() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (window.location.hash) return;
    scrollToPageTop();
  }, [pathname]);

  return null;
}
