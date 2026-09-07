'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Vertical space the floating header occupies at desktop sizes (its `pt-5`
 * offset plus the bar itself). Anchor scrolling stops short of it, and
 * anything that pins to the top of the viewport must clear it or its first
 * ~100px render underneath the bar. Mirrored by --tb-header-offset in
 * globals.css for the CSS-only cases.
 */
export const HEADER_OFFSET = 116;

/**
 * The live Lenis instance. Anything that scrolls programmatically must go
 * through it — a raw `window.scrollTo` fights the inertia loop, and the
 * `.lenis-smooth` rule disables native smooth behaviour outright, so a plain
 * call either jumps or stalls.
 */
let activeLenis: Lenis | null = null;

/** Scrolls the page to the top, whether or not Lenis is running. */
export function scrollToTop() {
  if (activeLenis) {
    activeLenis.scrollTo(0, { duration: 1.2 });
    return;
  }

  // Reduced motion, or Lenis not mounted yet.
  window.scrollTo({ top: 0, behavior: 'auto' });
}

/**
 * Scrolls a section into view under the header, for the cases an `<a href="#">`
 * cannot cover — a form submit, say. Mirrors what the anchor handler below does.
 */
export function scrollToSection(selector: string) {
  const destination = document.querySelector(selector);
  if (!destination) return;

  if (activeLenis) {
    activeLenis.scrollTo(destination as HTMLElement, { offset: -HEADER_OFFSET, duration: 1.4 });
    return;
  }

  // Reduced motion, or Lenis not mounted yet. scrollIntoView would ignore the
  // header, so the offset is applied by hand.
  const top = destination.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  window.scrollTo({ top, behavior: 'auto' });
}

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.6,
    });

    activeLenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      const href = anchor?.getAttribute('href');
      if (!href || href === '#') return;
      const destination = document.querySelector(href);
      if (!destination) return;
      event.preventDefault();
      lenis.scrollTo(destination as HTMLElement, { offset: -HEADER_OFFSET, duration: 1.4 });
    };

    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
      gsap.ticker.remove(tick);
      activeLenis = null;
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return null;
}
