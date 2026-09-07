import { ArrowLeftRight, Check, ScrollText, ShieldCheck, SignalHigh } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { Reveal } from '@/components/shared/motion-primitives';
import styles from './feature-rows.module.css';

/*
 * Four cards, read left to right, one selected at a time. Copy is deliberately
 * short here: the long-form version of each feature is what the security and
 * network sections carry, and four dense paragraphs side by side was what made
 * this section unreadable.
 */
interface Feature {
  title: string;
  body: string;
  /** Shown only on the selected card — the commitment behind the feature. */
  guarantee: string;
  icon: LucideIcon;
}

const FEATURES: Feature[] = [
  {
    title: 'Secure disbursement handling',
    body: 'Consideration sits in regulated accounts, apart from platform assets, until conditions are certified.',
    guarantee: 'Segregated custody, reconciled continuously',
    icon: ShieldCheck,
  },
  {
    title: 'Structured dispute resolution',
    body: 'The escrow already holds the terms, the milestones and the filings against them.',
    guarantee: 'Disputes open from a shared record',
    icon: ScrollText,
  },
  {
    title: 'Real-time transaction state',
    body: 'Both sides read the same position at the same moment — funded, certified, outstanding.',
    guarantee: 'No status calls, no reconciliation by email',
    icon: SignalHigh,
  },
  {
    title: 'Multi-currency corridors',
    body: 'Built for cross-border escrows from the start, with corridors and currencies opening in waves.',
    guarantee: 'Verification and settlement rules per corridor',
    icon: ArrowLeftRight,
  },
];

export function FeatureRows() {
  return (
    <section id="features" className={styles.section}>
      <div className="tb-shell">
        <Reveal className={styles.head}>
          <h2 className="tb-title text-[clamp(1.9rem,3.6vw,2.5rem)]">
            Our <span className="tb-title-accent">features</span>
          </h2>
          <p className={styles.lede}>
            Four mechanisms carry every escrow, from where the money sits to which corridors it
            settles across.
          </p>
        </Reveal>

        {/*
          Static cards. Every guarantee is on show, so there is nothing left to
          select — and a card that highlights under the cursor but leads nowhere
          reads as a control the reader can act on. The markup is a plain list
          again rather than four buttons with no action behind them.
        */}
        <ul className={styles.grid}>
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <Reveal key={feature.title} as="li" delay={index * 0.07}>
                <article className={styles.card}>
                  <span className={styles.plate}>
                    <Icon strokeWidth={1.5} aria-hidden />
                  </span>

                  <span className={styles.number} aria-hidden>
                    0{index + 1}
                  </span>

                  <h3 className={styles.title}>{feature.title}</h3>
                  <p className={styles.body}>{feature.body}</p>

                  <p className={styles.guarantee}>
                    <Check strokeWidth={3} aria-hidden />
                    {feature.guarantee}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
