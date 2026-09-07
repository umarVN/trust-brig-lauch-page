'use client';

import Image from 'next/image';
import { FileCheck2, Layers, ShieldCheck, Scale } from 'lucide-react';

import { Reveal } from '@/components/shared/motion-primitives';

/*
 * The reference's "Benefits of" block: a plain icon list on one side, real
 * photography on the other. Deliberately conventional — this is the pattern
 * every established fintech uses, and being recognisable is the point.
 */
const BENEFITS = [
  {
    icon: ShieldCheck,
    title: 'Dispute prevention',
    body: 'Terms, evidence and release conditions are agreed up front, so most disputes never start.',
  },
  {
    icon: Layers,
    title: 'Flexible by escrow',
    body: 'Milestones, staged payouts and approver rules bend to the transaction rather than the reverse.',
  },
  {
    icon: FileCheck2,
    title: 'Simplified settlement',
    body: 'One protected path from agreement to disbursement, with every step recorded as it happens.',
  },
  {
    icon: Scale,
    title: 'Reduced exposure',
    body: 'Consideration sits in segregated custody, released only when obligations are certified.',
  },
];

export function Benefits() {
  return (
    <section id="benefits" className="tb-section relative">
      <div className="tb-shell grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
        <div>
          <Reveal>
            <h2 className="tb-title text-[clamp(1.9rem,3.6vw,2.5rem)]">
              Benefits of <span className="tb-title-accent">TrustBrig</span>
            </h2>
            <p className="tb-body mt-4 max-w-[46ch] text-[15px]">
              Infrastructure for escrows where the money and the goods move on different days.
            </p>
          </Reveal>

          <ul className="mt-8 space-y-6">
            {BENEFITS.map((benefit, index) => {
              const Icon = benefit.icon;

              return (
                <Reveal key={benefit.title} delay={index * 0.07}>
                  <li className="flex gap-4">
                    <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl border border-[var(--tb-line)] bg-[var(--tb-fill-1)]">
                      <Icon className="size-[18px] text-[var(--tb-cyan)]" />
                    </span>
                    <div>
                      <p className="text-[15.5px] font-semibold text-[var(--tb-strong)]">
                        {benefit.title}
                      </p>
                      <p className="mt-1 max-w-[46ch] text-[13.5px] leading-[1.6] text-[var(--tb-mute)]">
                        {benefit.body}
                      </p>
                    </div>
                  </li>
                </Reveal>
              );
            })}
          </ul>

          <Reveal delay={0.3}>
            <a href="#access" className="tb-cta mt-9">
              Request an invitation
              <span aria-hidden className="tb-cta__badge">
                <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          </Reveal>
        </div>

        {/* Photo collage — the reference's right-hand block. Real imagery is
            what stops a page reading as machine-made. */}
        <Reveal delay={0.12}>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="relative col-span-2 aspect-[16/9] overflow-hidden rounded-2xl border border-[var(--tb-line)]">
              <Image
                src="/images/international.png"
                alt="Container terminal handling international trade cargo"
                fill
                sizes="(min-width: 1024px) 620px, 92vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--tb-line)]">
              <Image
                src="/images/state.png"
                alt="Residential property development"
                fill
                sizes="(min-width: 1024px) 300px, 45vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--tb-line)]">
              <Image
                src="/images/gems.png"
                alt="Precious stones and metals under assay"
                fill
                sizes="(min-width: 1024px) 300px, 45vw"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
