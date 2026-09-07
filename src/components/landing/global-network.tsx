import { ArrowRight, ArrowUpRight } from 'lucide-react';

import { Reveal } from '@/components/shared/motion-primitives';

/*
 * Rebuilt to the page's idiom: a heading, a lede, and a row of cards.
 *
 * What was here before was a console — a corridor index down the left driving a
 * stage on the right, with a selected state, an escrow rail and a step detail
 * panel. It was the only interactive set piece left on the page, so it read as a
 * different product from the sections above and below it, and its two columns
 * could never stay the same height: five short rows on the left against a tall
 * stage on the right is what left the dead space under the list.
 *
 * The per-corridor escrow stages went with it. Every corridor ran the same
 * three — agree, hold, release — which is what "How escrow works" already
 * explains, in more detail, a few sections earlier.
 */
interface Corridor {
  from: string;
  to: string;
  fromCurrency: string;
  toCurrency: string;
  sector: string;
  wave: string;
  /** The human story behind the corridor — why anyone would open it. */
  headline: string;
}

const CORRIDORS: Corridor[] = [
  {
    from: 'Canada',
    to: 'United States',
    fromCurrency: 'CAD',
    toCurrency: 'USD',
    sector: 'Institutional trade',
    wave: 'Wave 1',
    headline: 'A first order. A new trading partner.',
  },
  {
    from: 'United States',
    to: 'Brazil',
    fromCurrency: 'USD',
    toCurrency: 'BRL',
    sector: 'Real estate',
    wave: 'Wave 1',
    headline: 'A new property. A clear handover.',
  },
  {
    from: 'Brazil',
    to: 'South Africa',
    fromCurrency: 'BRL',
    toCurrency: 'ZAR',
    sector: 'Agro commodities',
    wave: 'Wave 1',
    headline: 'A harvest sold. A promise kept.',
  },
  {
    from: 'South Africa',
    to: 'Djibouti',
    fromCurrency: 'ZAR',
    toCurrency: 'DJF',
    sector: 'Gems & metals',
    wave: 'Wave 2',
    headline: 'Precious cargo. Shared certainty.',
  },
  {
    from: 'Djibouti',
    to: 'United States',
    fromCurrency: 'DJF',
    toCurrency: 'USD',
    sector: 'International trade',
    wave: 'Wave 2',
    headline: 'A long journey. One shared agreement.',
  },
];

export function GlobalNetwork() {
  return (
    <section id="network" aria-labelledby="network-title" className="tb-section relative">
      <div className="tb-shell">
        <Reveal className="max-w-[640px]">
          <h2 id="network-title" className="tb-title text-[clamp(1.9rem,3.6vw,2.5rem)]">
            The future transaction <span className="tb-title-accent">network</span>
          </h2>
          <p className="tb-body mt-4 max-w-[56ch] text-[15px]">
            Different countries. Familiar ambitions. A business to grow, a property to buy, a
            partnership to build. These are the connections we are working towards.
          </p>
          <a
            href="#access"
            className="mt-5 inline-flex items-center gap-2 text-[14px] font-semibold text-[var(--tb-strong)] transition-colors hover:text-[var(--tb-cyan)]"
          >
            Be part of what comes next
            <ArrowUpRight className="size-4" />
          </a>
        </Reveal>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-5">
          {CORRIDORS.map((corridor, index) => (
            <Reveal key={`${corridor.from}-${corridor.to}`} as="li" delay={index * 0.06}>
              <article className="tb-panel flex h-full flex-col px-5 pb-5 pt-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="tb-mono text-[11px] font-semibold text-[var(--tb-mute)]">
                    0{index + 1}
                  </span>
                  <span className="tb-mono rounded-full border border-[var(--tb-line)] px-2.5 py-1 text-[10.5px] font-semibold text-[var(--tb-mute)]">
                    {corridor.wave}
                  </span>
                </div>

                <h3 className="mt-3.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[16px] font-semibold text-[var(--tb-strong)]">
                  {corridor.from}
                  <ArrowRight className="size-4 shrink-0 text-[var(--tb-cyan)]" aria-hidden />
                  {corridor.to}
                </h3>

                <p className="mt-1.5 text-[12.5px] text-[var(--tb-mute)]">
                  {corridor.sector}
                  <span className="tb-mono">
                    {' · '}
                    {corridor.fromCurrency}/{corridor.toCurrency}
                  </span>
                </p>

                <p className="mt-auto border-t border-[var(--tb-line)] pt-4 text-[13.5px] leading-[1.6] text-[var(--tb-ink-dim)]">
                  {corridor.headline}
                </p>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
