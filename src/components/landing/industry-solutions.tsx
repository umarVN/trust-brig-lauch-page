'use client';

import * as React from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Bitcoin,
  Building2,
  Fuel,
  Gem,
  Globe,
  Landmark,
  Leaf,
  Palette,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { EASE_OUT, Reveal } from '@/components/shared/motion-primitives';
import { MOBILE_QUERY, useMediaQuery } from '@/hooks/use-media-query';

/*
 * Accents are a hue sweep across the brand arc at one fixed OKLCH lightness and
 * chroma, so every industry reads as the same family and holds the same contrast
 * against the dark stage. They are not free-form picks.
 */
interface Industry {
  id: string;
  title: string;
  /* Optional: an industry with no artwork yet falls back to IndustryPlate's
   * accent field rather than a broken <Image>. */
  image?: string;
  icon: LucideIcon;
  accent: string;
  blurb: string;
  stats: Array<[string, string]>;
}

const INDUSTRIES: Industry[] = [
  {
    id: 'internationalTrade',
    title: 'International Trade',
    image: '/images/international.png',
    icon: Globe,
    accent: '#1B9ED6',
    blurb:
      'Documentary conditions, inspection certificates and bills of lading resolved into a single release event — so cargo and consideration move in step.',
    stats: [['Designed for', '$10K–10M+'], ['Launch wave', 'Wave 1']],
  },
  {
    id: 'realEstate',
    title: 'Real Estate',
    image: '/images/state.png',
    icon: Building2,
    accent: '#00A6C2',
    blurb:
      'Deposits held in segregated custody through diligence, searches and completion, released only on registered transfer of title.',
    stats: [['Designed for', '$10K–5M+'], ['Milestones', 'Up to 5']],
  },
  {
    id: 'agro',
    title: 'Agro Commodities',
    image: '/images/agro.png',
    icon: Leaf,
    accent: '#00A9B4',
    blurb:
      'Harvest, weighbridge and quality certificates convert into staged disbursements across seasonal supply chains.',
    stats: [['Designed for', '$10K–2M+'], ['Staged payouts', '3–6']],
  },
  {
    id: 'energy',
    title: 'Energy, Oil & Gas',
    image: '/images/energy.png',
    icon: Fuel,
    accent: '#4099DD',
    blurb:
      'High-value lifting and offtake agreements with independent inspection gates and multi-party release authority.',
    stats: [['Designed for', '$10K–25M+'], ['Approvers', 'Up to 6']],
  },
  {
    id: 'gemsMetals',
    title: 'Gems & Metals',
    image: '/images/gems.png',
    icon: Gem,
    accent: '#00A2CE',
    blurb:
      'Assay results and chain-of-custody evidence anchor every release, with insured transit conditions written into the escrow.',
    stats: [['Designed for', '$10K–10M+'], ['Assay gates', '2']],
  },
  {
    id: 'government',
    title: 'Government',
    image: '/images/government.png',
    icon: Landmark,
    accent: '#5F92E2',
    blurb:
      'Procurement contracts with auditable disbursement schedules, statutory retention and a public-record-grade trail.',
    stats: [['Designed for', '$10K–50M+'], ['Retention', 'Configurable']],
  },
  {
    id: 'arts',
    title: 'Arts & Collectibles',
    image: '/images/arts.png',
    icon: Palette,
    accent: '#718DE3',
    blurb:
      'Provenance, authentication and condition reporting gate the release — with a cooling-off window built into the terms.',
    stats: [['Designed for', '$10K–2M+'], ['Authentication', 'Required']],
  },
  {
    id: 'crypto',
    title: 'Crypto Marketplace',
    image: '/images/crypto.png',
    icon: Bitcoin,
    accent: '#7E85E6',
    blurb:
      'Wallet screening and confirmation thresholds gate every release, with on-chain settlement reconciled against the fiat leg inside the same escrow.',
    stats: [['Designed for', '$10K–5M+'], ['Wallet screening', 'Required']],
  },
];

/**
 * The plate behind a slide. An industry with no artwork yet renders an accent
 * field carrying its own mark, so a missing asset reads as a deliberate panel
 * instead of a broken image. Drop the file in and set `image` to swap it.
 */
function IndustryPlate({
  industry,
  sizes,
  priority,
}: {
  industry: Industry;
  sizes: string;
  priority?: boolean;
}) {
  const Icon = industry.icon;

  if (industry.image) {
    return (
      <Image
        src={industry.image}
        alt={industry.title}
        fill
        priority={priority}
        quality={95}
        sizes={sizes}
        className="object-cover"
      />
    );
  }

  return (
    <div
      aria-hidden
      className="absolute inset-0"
      style={{
        background: `radial-gradient(110% 95% at 76% 24%, ${industry.accent}59, transparent 64%), linear-gradient(140deg, ${industry.accent}24, rgb(var(--tb-scrim)) 74%)`,
      }}
    >
      <Icon
        className="absolute right-[8%] top-1/2 size-[46%] -translate-y-1/2"
        style={{ color: industry.accent, opacity: 0.17 }}
      />
    </div>
  );
}

const AUTOPLAY_MS = 5200;

export function IndustrySolutions() {
  const [index, setIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(1);
  const [paused, setPaused] = React.useState(false);
  const [dragging, setDragging] = React.useState(false);
  const reduce = useReducedMotion();
  // Below `lg` the stage is hidden and the card rail drives `index` instead,
  // so the autoplay timer would be animating an offscreen tree for nothing.
  const isMobile = useMediaQuery(MOBILE_QUERY);

  const held = paused || dragging || isMobile;

  const go = React.useCallback((next: number, dir: number) => {
    setDirection(dir);
    setIndex((next + INDUSTRIES.length) % INDUSTRIES.length);
  }, []);

  React.useEffect(() => {
    if (held || reduce) return;
    const id = window.setTimeout(() => go(index + 1, 1), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [index, held, reduce, go]);

  const active = INDUSTRIES[index];

  return (
    <section
      id="industries"
      className="tb-section relative"
    >
      <div className="tb-shell">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="tb-display tb-display-section text-[clamp(2.4rem,4.2vw,2.75rem)] text-[var(--tb-strong)]">
              Built for the <span className="tb-title-accent">hardest escrows</span>
            </h2>
            <p className="tb-body mt-6 max-w-[54ch] text-[15px]">
              Escrow logic being shaped to the evidence each industry actually settles on.
            </p>
          </div>

          <div
            className="flex items-center gap-2"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <button
              type="button"
              aria-label="Previous industry"
              onClick={() => go(index - 1, -1)}
              className="tb-glass flex size-11 items-center justify-center rounded-full text-[var(--tb-strong)] transition-colors hover:bg-[var(--tb-fill-3)]"
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Next industry"
              onClick={() => go(index + 1, 1)}
              className="tb-glass flex size-11 items-center justify-center rounded-full text-[var(--tb-strong)] transition-colors hover:bg-[var(--tb-fill-3)]"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </Reveal>
      </div>

      {/* ---------- full-bleed stage ---------- */}
      <Reveal delay={0.08} className="mt-10 hidden lg:block">
        <div className="tb-shell relative">
          <motion.div
            drag={reduce ? false : 'x'}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.14}
            onDragStart={() => setDragging(true)}
            onDragEnd={(_, info) => {
              setDragging(false);
              if (info.offset.x < -60) go(index + 1, 1);
              else if (info.offset.x > 60) go(index - 1, -1);
            }}
            // tb-invert: the photographic stage stays a dark canvas in both themes,
            // so its overlay grade and type keep their contrast.
            className="tb-invert relative h-[420px] cursor-grab overflow-hidden rounded-[32px] border border-[var(--tb-line)] active:cursor-grabbing sm:h-[450px] lg:h-[480px]"
          >
            <AnimatePresence initial={false} custom={direction} mode="sync">
              <motion.div
                key={active.id}
                custom={direction}
                initial={{ opacity: 0, scale: 1.14, x: direction * 90 }}
                animate={
                  reduce
                    ? { opacity: 1, scale: 1, x: 0 }
                    : {
                        opacity: 1,
                        // Slide in, then keep drifting for the whole slide so
                        // the stage reads as alive, not as a static photograph.
                        scale: [1.14, 1, 1.07],
                        x: [direction * 90, 0, direction * -14],
                      }
                }
                exit={{ opacity: 0, scale: 1.05, x: direction * -70 }}
                transition={{
                  opacity: { duration: 1.1, ease: EASE_OUT },
                  scale: { duration: AUTOPLAY_MS / 1000 + 1.2, times: [0, 0.19, 1], ease: EASE_OUT },
                  x: { duration: AUTOPLAY_MS / 1000 + 1.2, times: [0, 0.19, 1], ease: EASE_OUT },
                }}
                className="absolute inset-0"
              >
                <IndustryPlate
                  industry={active}
                  priority={index === 0}
                  sizes="(min-width: 1260px) 1200px, calc(100vw - 2.5rem)"
                />
              </motion.div>
            </AnimatePresence>

            {/* Cinematic grade over the photography */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgb(var(--tb-scrim)/0.94)_0%,rgb(var(--tb-scrim)/0.72)_38%,rgb(var(--tb-scrim)/0.15)_72%,rgb(var(--tb-scrim)/0.55)_100%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgb(var(--tb-scrim)/0.9)_0%,transparent_45%)]" />
            <div
              className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen transition-colors duration-700"
              style={{
                background: `radial-gradient(60% 60% at 12% 40%, ${active.accent}55, transparent 70%)`,
              }}
            />
            <div className="tb-grid pointer-events-none absolute inset-0 opacity-25" />

            {/* ---------- content ---------- */}
            <div className="relative flex h-full flex-col justify-end p-7 sm:p-10 lg:p-14">
              <div className="max-w-xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, y: 26, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -18, filter: 'blur(8px)' }}
                    transition={{ duration: 0.6, ease: EASE_OUT }}
                  >
                    <h3 className="tb-display tb-display-section text-[clamp(2rem,4.2vw,2.5rem)] text-[var(--tb-strong)]">
                      {active.title}
                    </h3>

                    <p className="mt-4 max-w-[52ch] text-[14.5px] leading-relaxed text-[var(--tb-ink-dim)]">
                      {active.blurb}
                    </p>

                    <dl className="mt-7 flex flex-wrap gap-x-9 gap-y-4">
                      {active.stats.map(([label, value]) => (
                        <div key={label}>
                          <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--tb-mute)]">
                            {label}
                          </dt>
                          <dd className="tb-mono mt-1 text-[18px] font-semibold tracking-[0] text-[var(--tb-strong)]">
                            {value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* ---------- thumbnail rail ---------- */}
              <div
                className="mt-9 flex flex-wrap items-center gap-x-1.5 gap-y-2"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
              >
                {INDUSTRIES.map((item, itemIndex) => {
                  const isActive = itemIndex === index;
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => go(itemIndex, itemIndex > index ? 1 : -1)}
                      aria-label={item.title}
                      aria-current={isActive ? 'true' : undefined}
                      className={cn(
                        'group relative flex shrink-0 items-center gap-2 overflow-hidden rounded-full border px-3 py-2 text-[12px] font-medium transition-all duration-500',
                        isActive
                          ? 'border-transparent bg-[var(--tb-invert-bg)] text-[var(--tb-invert-fg)]'
                          : 'border-[var(--tb-line)] bg-[var(--tb-fill-2)] text-[var(--tb-ink-dim)] hover:bg-[var(--tb-fill-3)] hover:text-[var(--tb-strong)]'
                      )}
                    >
                      <Icon
                        className="size-3.5"
                        style={{ color: isActive ? item.accent : undefined }}
                      />
                      <span className="whitespace-nowrap">{item.title}</span>

                      {/* Autoplay progress rides the active pill. */}
                      {isActive && !reduce ? (
                        <motion.span
                          key={`${item.id}-progress`}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: held ? 0 : 1 }}
                          transition={{ duration: held ? 0.25 : AUTOPLAY_MS / 1000, ease: 'linear' }}
                          className="absolute inset-x-0 bottom-0 h-[2px] origin-left"
                          style={{ background: item.accent }}
                        />
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </Reveal>
      <div className="mt-8 lg:hidden">
        <div className="tb-shell"><div className="tb-rail tb-bleed gap-4 pb-3">
          {INDUSTRIES.map((item, itemIndex) => {
            const Icon = item.icon;

            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px -10% 0px -10%' }}
                transition={{ duration: 0.6, ease: EASE_OUT }}
                onViewportEnter={() => setIndex(itemIndex)}
                className="tb-invert w-[84vw] max-w-[360px] overflow-hidden rounded-[26px] border border-[var(--tb-line)]"
              >
                <div className="relative h-[260px] w-full">
                  <IndustryPlate industry={item} sizes="84vw" />
                  <div className="absolute inset-0 bg-[linear-gradient(0deg,rgb(var(--tb-scrim)/0.94)_0%,rgb(var(--tb-scrim)/0.25)_60%,transparent_100%)]" />

                  <span
                    className="absolute left-3.5 top-3.5 flex size-8 items-center justify-center rounded-lg"
                    style={{ background: `${item.accent}2b`, color: item.accent }}
                  >
                    <Icon className="size-[18px]" />
                  </span>

                  <h3 className="tb-display absolute bottom-4 left-4 right-4 text-[26px] text-[var(--tb-strong)]">
                    {item.title}
                  </h3>
                </div>

                <div className="bg-[var(--tb-ground)] px-4 pb-5 pt-4">
                  <p className="text-[13.5px] leading-[1.6] text-[var(--tb-ink-dim)]">
                    {item.blurb}
                  </p>

                  <div className="mt-3.5 flex items-end justify-between gap-3 border-t border-[var(--tb-line)] pt-3">
                    <div>
                      <p className="text-[9.5px] font-semibold uppercase tracking-[0.12em] text-[var(--tb-mute)]">
                        {item.stats[0][0]}
                      </p>
                      <p className="tb-mono mt-1.5 text-[18px] font-semibold tracking-[0] text-[var(--tb-strong)]">
                        {item.stats[0][1]}
                      </p>
                    </div>

                    <span
                      className="tb-mono rounded-full px-2 py-1 text-[9.5px] font-semibold uppercase tracking-[0.1em]"
                      style={{ color: item.accent, background: `${item.accent}1f` }}
                    >
                      {item.stats[1][1]}
                    </span>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div></div>

        {/* Position dots — the rail has no visible scrollbar. */}
        <div className="tb-shell mt-1 flex items-center gap-1.5">
          {INDUSTRIES.map((item, itemIndex) => (
            <span
              key={item.id}
              className="h-[3px] flex-1 rounded-full transition-colors duration-300"
              style={{
                background: itemIndex === index ? item.accent : 'var(--tb-fill-3)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
