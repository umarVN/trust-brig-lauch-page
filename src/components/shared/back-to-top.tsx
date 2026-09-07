'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

import { cn } from '@/lib/utils';
import { scrollToTop } from './smooth-scroll';

/** Floating scroll-to-top control, revealed once the reader is past the hero. */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setVisible(window.scrollY > window.innerHeight * 0.9);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      // Routed through Lenis: a native smooth scroll is disabled by the
      // .lenis-smooth rule and would fight the inertia loop.
      onClick={scrollToTop}
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={cn(
        'tb-glass fixed bottom-5 end-5 z-50 flex size-11 items-center justify-center rounded-full text-[var(--tb-strong)]',
        'shadow-[var(--tb-shadow-lift)] backdrop-blur',
        'transition-[opacity,transform] duration-300 ease-out hover:scale-110 hover:bg-[var(--tb-fill-3)] active:scale-95',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tb-glow)]',
        'motion-reduce:transition-none motion-reduce:hover:scale-100',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      )}
    >
      <ArrowUp className="size-4" aria-hidden />
    </button>
  );
}
