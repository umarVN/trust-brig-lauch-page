'use client';

import { ArrowUpRight } from 'lucide-react';

import { Reveal } from '@/components/shared/motion-primitives';
import { SubscribeForm } from './subscribe-form';

/*
 * Rebuilt in the reference's idiom: statement on the left, the actual signup on
 * the right, proof underneath. The previous hero led with an abstract node mesh
 * and floating stat cards — decorative, and the main reason the page read as
 * machine-generated. Nothing here is invented: the figures are the pre-launch
 * ones already used elsewhere on the site, and the faces are the real team.
 */
const PROOF = [
  ['2,480+', 'Registered interest'],
  ['5', 'Markets planned'],
  ['Q4 2026', 'Expected launch'],
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* One quiet wash, no mesh and no floating shapes. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_82%_8%,rgb(var(--tb-accent)/0.10),transparent_62%)]"
      />

      <div className="tb-shell relative grid items-center gap-10 pb-10 pt-[calc(var(--tb-header-offset)+0.75rem)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 lg:pb-16 lg:pt-[calc(var(--tb-header-offset)+1.25rem)]">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--tb-line)] bg-[var(--tb-fill-1)] px-3 py-1.5 text-[11.5px] font-medium text-[var(--tb-ink-dim)]">
              <span className="size-1.5 rounded-full bg-[var(--tb-mint)]" />
              Early access · priority invitations are open
            </span>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="tb-title mt-6 text-[clamp(2.1rem,5vw,3.4rem)]">
              Secure every escrow
              <br />
              with <span className="tb-title-accent">confidence</span>
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="tb-body mt-5 max-w-[52ch] text-[15px] sm:text-[16px]">
              TrustBrig holds consideration in segregated custody, verifies every counterparty, and
              releases value only when conditions are certified from first handshake to final
              disbursement.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#access" className="tb-cta">
                Request early access
                <span aria-hidden className="tb-cta__badge">
                  <ArrowUpRight className="size-4" />
                </span>
              </a>

              <a
                href="#flow"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--tb-line-strong)] px-5 py-3 text-[14px] font-medium text-[var(--tb-strong)] transition-colors hover:bg-[var(--tb-fill-2)]"
              >
                Explore how it works
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <dl className="mt-9 grid max-w-lg grid-cols-3 gap-4 border-t border-[var(--tb-line)] pt-6">
              {PROOF.map(([value, label]) => (
                <div key={label}>
                  <dt className="tb-mono text-[20px] font-semibold text-[var(--tb-strong)] sm:text-[23px]">
                    {value}
                  </dt>
                  <dd className="mt-1 text-[11.5px] leading-snug text-[var(--tb-mute)]">{label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* The signup is the hero's product shot — it is what the page is for.
            It carries #access because every CTA on the page targets that, and
            there is now exactly one form to send them to. */}
        <Reveal delay={0.15}>
          <div id="access" className="scroll-mt-[calc(var(--tb-header-offset)+1rem)]">
            <SubscribeForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
