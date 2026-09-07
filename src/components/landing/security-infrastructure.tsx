import { Fingerprint, KeyRound, ScrollText, ShieldCheck } from 'lucide-react';

import { Reveal } from '@/components/shared/motion-primitives';

/*
 * Single column. The left half of this section carried a spec table, then an
 * audit-trail ledger, and neither earned its place — both restated in a panel
 * what the four pillars beside them already said, and there is no security
 * imagery in the project to put there instead.
 *
 * Dropping it gives the four claims the full measure. They are the argument;
 * they no longer have to make it from a half-width column.
 */
const PILLARS = [
  {
    icon: ShieldCheck,
    title: 'Segregated custody',
    body: 'Consideration is held apart from platform assets in regulated accounts — never commingled, never lent.',
  },
  {
    icon: KeyRound,
    title: 'Encryption in depth',
    body: 'Envelope keys are rotated on a schedule and never co-located with the data they protect.',
  },
  {
    icon: Fingerprint,
    title: 'Verified counterparties',
    body: 'KYC and KYB clear before an escrow proceeds, with enhanced tiers reviewed by people.',
  },
  {
    icon: ScrollText,
    title: 'Immutable audit trail',
    body: 'Every action is hash-chained and timestamped, replayable for a dispute or a regulator.',
  },
];

export function SecurityInfrastructure() {
  return (
    <section id="security" className="tb-section relative">
      <div className="tb-shell">
        <Reveal className="mx-auto max-w-[620px] text-center">
          <h2 className="tb-title text-[clamp(1.9rem,3.6vw,2.5rem)]">
            Security is the <span className="tb-title-accent">product</span>
          </h2>
          <p className="tb-body mx-auto mt-4 max-w-[52ch] text-[15px]">
            Custody, cryptography, identity and audit are not features bolted onto a disbursement flow.
            They are the substrate every escrow runs on.
          </p>
        </Reveal>

        <ul className="mt-9 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:mt-10 lg:grid-cols-4 lg:gap-x-10">
          {PILLARS.map((pillar, index) => {
            const Icon = pillar.icon;

            return (
              <Reveal key={pillar.title} as="li" delay={index * 0.07}>
                <span className="flex size-11 items-center justify-center rounded-2xl border border-[var(--tb-line)] bg-[var(--tb-fill-1)]">
                  <Icon className="size-5 text-[var(--tb-cyan)]" strokeWidth={1.75} />
                </span>
                <h3 className="mt-4 text-[15.5px] font-semibold text-[var(--tb-strong)]">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-[1.65] text-[var(--tb-mute)]">
                  {pillar.body}
                </p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
