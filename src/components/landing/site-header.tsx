'use client';

import * as React from 'react';
import Image from 'next/image';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { EASE_OUT, Magnetic } from '@/components/shared/motion-primitives';
import { ThemeToggle } from '@/components/ui/theme-toggle';

/* Mirrors the rebuilt section order. "How Trust Moves" is gone — that section
 * is now "How escrow works", and the nav has to name what is on the page.
 * Order matters: it has to match document order, or the spy pill slides
 * backwards as you scroll forwards. */
const NAV_LINKS = [
  { id: 'flow', label: 'How it works' },
  { id: 'benefits', label: 'Benefits' },
  { id: 'industries', label: 'Industries' },
  { id: 'security', label: 'Security' },
];

export function SiteHeader() {
  const { scrollY } = useScroll();
  const reduced = useReducedMotion();
  const [condensed, setCondensed] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState<string | null>(null);

  /*
   * The logo is driven straight off scroll position rather than off the
   * `condensed` boolean. Toggling a boolean made the lockup snap between two
   * states, and animating it with framer's `layout` while a CSS height
   * transition ran on the same box made the two systems fight — that was the
   * stutter. Here one spring-smoothed value runs the whole collapse, and every
   * property it drives is a transform or an opacity, so no frame reflows.
   *
   * 1 = full lockup, 0 = mark alone.
   */
  const expansion = useTransform(scrollY, [0, 90], [1, 0], { clamp: true });
  const eased = useSpring(expansion, { stiffness: 190, damping: 30, mass: 0.55 });
  const progress = reduced ? expansion : eased;

  const shieldScale = useTransform(progress, [0, 1], [0.78, 1]);
  // The wordmark is gone well before the collapse finishes, so the mark is
  // never sitting under a half-faded word.
  const wordOpacity = useTransform(progress, [0.45, 1], [0, 1]);
  const wordScale = useTransform(progress, [0, 1], [0.9, 1]);
  // Reserved space below the shield, so only ONE value affects layout.
  const wordReserve = useTransform(progress, (value) => `calc(var(--tb-word-block) * ${value})`);

  /*
   * The glass panel is a discrete state, so it keeps a boolean — but with
   * hysteresis. A bare `scrollY > 40` flickered on and off whenever a scroll
   * settled near the threshold, which Lenis' inertia makes easy to land on.
   */
  useMotionValueEvent(scrollY, 'change', (value) => {
    setCondensed((previous) => (previous ? value > 30 : value > 76));
  });

  /*
   * Section spy — drives the sliding pill in the floating nav.
   *
   * Two things this has to get right, both of which the ratio-sorting version
   * got wrong. An observer callback receives only the entries that CHANGED,
   * not every observed section, so ranking just those picked whichever section
   * happened to cross a threshold last rather than the one actually on screen
   * — that is the pill jumping around under you. And a section that scrolls
   * out of the band never cleared the state, so the last id stayed lit over
   * the hero and the footer, where nothing is active at all.
   *
   * So: keep the live intersecting set across callbacks, and resolve it in
   * document order. The band is a thin strip at the middle of the viewport, so
   * the lowest section touching it is the one being read.
   *
   * And clearing has to be narrower than "nothing is in the band". Features and
   * Network sit between Benefits and Security without appearing in the nav, so
   * crossing them emptied the set, unmounted the pill and re-mounted it further
   * along — a layoutId can only glide while its element stays mounted, which is
   * why the indicator vanished mid-scroll instead of sliding. The pill is only
   * cleared above the first nav section, where genuinely nothing is current.
   */
  React.useEffect(() => {
    const sections = NAV_LINKS.map((link) => document.getElementById(link.id))
      .filter((node): node is HTMLElement => Boolean(node))
      .sort((a, b) => a.offsetTop - b.offsetTop);

    const order = sections.map((section) => section.id);
    const onScreen = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) onScreen.add(entry.target.id);
          else onScreen.delete(entry.target.id);
        });

        let current: string | null = null;
        order.forEach((id) => {
          if (onScreen.has(id)) current = id;
        });

        setActive((previous) => {
          if (current) return current;
          // Above the first nav section — the hero — nothing is current.
          const first = sections[0];
          if (first && window.scrollY + window.innerHeight / 2 < first.offsetTop) return null;
          // Otherwise hold the last section, so the pill rides through the
          // sections the nav does not list rather than blinking out.
          return previous;
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: EASE_OUT, delay: 0.15 }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 sm:pt-3.5"
      >
        <div
          className={cn(
            'flex w-full max-w-[1200px] items-center justify-between gap-3 rounded-2xl px-3.5 py-2 transition-[background-color,box-shadow,border-color,backdrop-filter] duration-500 ease-out sm:gap-4 sm:px-5 sm:py-2.5',
            condensed
              ? 'tb-glass tb-glass-hi shadow-[0_20px_60px_-30px_rgba(0,0,0,0.95)]'
              : 'border border-transparent'
          )}
        >
          <a
            href="#top"
            aria-label="TrustBrig home"
            className="flex shrink-0 items-center"
          >
            {/*
              One shield, one wordmark, drawn from the lockup's own 395:82:117
              proportions — not two composite files cross-faded, which put two
              shields on screen at different sizes and smeared into each other.

              The wordmark is absolutely positioned, so the container's width is
              the shield's width and never changes: the mark cannot drift
              sideways as the lockup collapses. The only layout-affecting value
              in the whole animation is the reserved space below the shield;
              everything else is transform and opacity.

              Unoptimized on purpose: the pipeline re-encodes these as lossy
              WebP, which shatters the mark's flat brand colours into hundreds
              of near-miss values. Serving the PNGs as-is keeps them exact.
            */}
            <motion.span
              style={{ paddingBottom: wordReserve }}
              className="relative flex flex-col items-center [--tb-word-block:20px] sm:[--tb-word-block:23px] xl:[--tb-word-block:25px]"
            >
              <motion.span style={{ scale: shieldScale }} className="block origin-center">
                <Image
                  src="/logo-mark.png"
                  alt="TrustBrig"
                  width={381}
                  height={395}
                  priority
                  unoptimized
                  draggable={false}
                  className="h-[40px] w-auto select-none sm:h-[46px] xl:h-[50px]"
                />
              </motion.span>

              <motion.span
                aria-hidden
                style={{ opacity: wordOpacity, scale: wordScale, x: '-50%' }}
                className="pointer-events-none absolute bottom-0 left-1/2 block origin-bottom"
              >
                <Image
                  src="/logo-wordmark.png"
                  alt=""
                  width={983}
                  height={117}
                  priority
                  unoptimized
                  draggable={false}
                  className="h-[12px] w-auto max-w-none select-none sm:h-[14px] xl:h-[15px]"
                />
              </motion.span>
            </motion.span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                aria-current={active === link.id ? 'true' : undefined}
                className="relative whitespace-nowrap rounded-full px-3 py-2.5 text-[13px] font-medium text-[var(--tb-ink-dim)] transition-colors hover:text-[var(--tb-strong)] xl:px-3.5 xl:text-[13.5px]"
              >
                {active === link.id ? (
                  <motion.span
                    layoutId="tb-nav-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-full border border-[var(--tb-line-strong)] bg-[var(--tb-fill-2)]"
                  />
                ) : null}
                <span className="relative">{link.label}</span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            <Magnetic className="hidden sm:inline-block" strength={0.22}>
              <a
                href="#access"
                className="tb-btn tb-btn-brand tb-btn-lift group gap-1.5 rounded-full px-4 py-2.5 text-[13px] xl:px-[18px] xl:text-[13.5px]"
              >
                Request Access
                <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Magnetic>

            <button
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="tb-mobile-nav"
              onClick={() => setOpen((value) => !value)}
              className="tb-tap tb-glass flex size-11 items-center justify-center rounded-full text-[var(--tb-strong)] lg:hidden"
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="tb-mobile-nav"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.32, ease: EASE_OUT }}
            className="fixed inset-0 z-40 overflow-y-auto bg-[var(--tb-bg)]/97 backdrop-blur-xl lg:hidden"
          >
            <nav className="flex h-full flex-col justify-center gap-0.5 px-7 pb-10 pt-24">
              {NAV_LINKS.map((link, index) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.06 + index * 0.055,
                    type: 'spring',
                    stiffness: 260,
                    damping: 26,
                  }}
                  className="tb-tap flex items-center justify-between border-b border-[var(--tb-line)] py-[18px]"
                >
                  <span className="text-[24px] font-semibold leading-tight text-[var(--tb-strong)]">
                    {link.label}
                  </span>
                  <span className="tb-mono text-[11px] text-[var(--tb-mute)]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </motion.a>
              ))}

              <motion.a
                href="#access"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, type: 'spring', stiffness: 260, damping: 26 }}
                className="tb-tap tb-btn tb-btn-brand mt-9 h-[54px] rounded-full text-[15px]"
              >
                Request an invitation
                <ArrowUpRight className="size-4" />
              </motion.a>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55, duration: 0.5 }}
                className="mt-5 text-center text-[12px] font-medium text-[var(--tb-mute)]"
              >
                Launching Q4 2026
              </motion.p>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
