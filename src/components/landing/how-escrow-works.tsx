'use client';

import { FileSignature, Landmark, PackageCheck, Wallet } from 'lucide-react';

import { Reveal } from '@/components/shared/motion-primitives';

/*
 * The reference's "How escrow works" row: four numbered cards, icon above,
 * read left to right. It replaces the orbital ring that used to explain this —
 * that visual was the single most machine-made thing on the page, and a plain
 * numbered sequence is both more legible and the industry convention.
 */
const STEPS = [
  {
    label: 'Step 1',
    title: 'Agreement',
    body: 'Both parties agree the terms, milestones and what evidence releases the money.',
    icon: FileSignature,
  },
  {
    label: 'Step 2',
    title: 'Fund the escrow',
    body: 'The initiating counterparty funds the escrow. Consideration moves into segregated custody, not to the responding counterparty.',
    icon: Wallet,
  },
  {
    label: 'Step 3',
    title: 'Deliver',
    body: 'The responding counterparty performs and files the agreed proof — documents, inspection or transfer of title.',
    icon: PackageCheck,
  },
  {
    label: 'Step 4',
    title: 'Release disbursement',
    body: 'On certification the disbursement executes, logged end to end on an immutable trail.',
    icon: Landmark,
  },
];

export function HowEscrowWorks() {
  return (
    <section id="flow" className="tb-section relative">
      {/* Tinted band, as in the reference, so the sequence reads as its own
          chapter without needing a decorative backdrop. */}
      <div className="tb-bleed bg-[var(--tb-fill-1)] py-10 sm:py-12 lg:py-14">
        <div className="tb-shell">
          <Reveal className="text-center">
            <h2 className="tb-title text-[clamp(1.9rem,3.6vw,2.5rem)]">
              How escrow <span className="tb-title-accent">works</span>
            </h2>
            <p className="tb-body mx-auto mt-4 max-w-[52ch] text-[15px]">
              Every TrustBrig transaction follows the same four steps, in the same order, whatever
              the corridor or the industry.
            </p>
          </Reveal>

          {/* The badge overhangs each card by 32px (size-16 pulled up by -top-8), so
              the row gap has to clear it or the next card's badge lands on the
              previous card. Only the horizontal gap can stay tight. */}
          <ol className="mt-12 grid gap-x-4 gap-y-12 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-x-5">
            {STEPS.map((step, index) => {
              const Icon = step.icon;

              return (
                <Reveal key={step.title} delay={index * 0.08}>
                  <li className="tb-panel relative h-full px-5 pb-6 pt-12">
                    {/* Icon badge straddling the card's top edge. */}
                    <span className="absolute -top-8 left-1/2 flex size-16 -translate-x-1/2 items-center justify-center rounded-full border border-[var(--tb-line)] bg-[var(--tb-surface-card)] shadow-[var(--tb-shadow-card)]">
                      <Icon className="size-7 text-[var(--tb-cyan)]" strokeWidth={2} />
                    </span>

                    <p className="tb-mono text-center text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[var(--tb-mute)]">
                      {step.label}
                    </p>
                    <p className="mt-2 text-center text-[15px] font-semibold uppercase tracking-[0.08em] text-[var(--tb-cyan)]">
                      {step.title}
                    </p>
                    <p className="mt-2.5 text-center text-[13px] leading-[1.6] text-[var(--tb-mute)]">
                      {step.body}
                    </p>
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
