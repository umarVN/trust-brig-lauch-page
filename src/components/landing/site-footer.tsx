import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

import { cn } from '@/lib/utils';
import { SITE_FOOTER_SECTIONS, SITE_FOOTER_SOCIAL_LINKS } from './site-footer-items';

const BRAND_DESCRIPTION =
  'The operating ecosystem for secure global transactions — segregated custody, verified counterparties and condition-based disbursement. Launching Q4 2026; early access invitations are open now.';

const YEAR = new Date().getFullYear();

export function SiteFooter({ containerClassName }: { containerClassName?: string } = {}) {
  return (
    <footer className="relative overflow-hidden border-t border-[var(--tb-line)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_120%_at_50%_120%,rgb(var(--tb-brand)/0.35),transparent_70%)]"
      />

      <div className={cn('tb-shell relative pb-10 pt-9 sm:pb-16 sm:pt-10', containerClassName)}>
        <div className="grid gap-9 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.6fr)_minmax(0,0.9fr)] lg:gap-12">
          <div className="max-w-sm">
            {/* Unoptimized for the same reason as the header mark. The footer
                has vertical room, so the stacked lockup runs larger here. */}
            <Image
              src="/logo-stacked.png"
              alt="TrustBrig"
              width={983}
              height={595}
              unoptimized
              draggable={false}
              className="h-[82px] w-auto select-none"
            />

            <p className="mt-5 hidden text-[13px] leading-relaxed text-[var(--tb-mute)] sm:block">
              {BRAND_DESCRIPTION}
            </p>

            <div className="mt-7 flex items-center gap-5">
              {SITE_FOOTER_SOCIAL_LINKS.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.key}
                    href={item.href}
                    aria-label={item.label}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[var(--tb-mute)] transition-all duration-300 hover:-translate-y-0.5 hover:text-[var(--tb-glow)]"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                );
              })}
            </div>
          </div>

          {SITE_FOOTER_SECTIONS.map((section) => (
            <div key={section.key}>
              <h2 className="tb-eyebrow">{section.title}</h2>

              <nav
                className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 sm:mt-5 lg:flex lg:flex-col lg:gap-3"
                aria-label={section.title}
              >
                {section.links.map((item) => (
                  <a
                    key={item.key}
                    href={item.href}
                    className="w-fit text-[13.5px] text-[var(--tb-ink-dim)] transition-colors hover:text-[var(--tb-strong)]"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          ))}

          <div>
            <h2 className="tb-eyebrow">Get access</h2>

            <p className="mt-4 hidden max-w-xs text-[13px] leading-relaxed text-[var(--tb-mute)] sm:mt-5 sm:block">
              Subscribe once and we&apos;ll email your invitation the moment TrustBrig opens.
            </p>

            <a
              href="#access"
              className="tb-tap tb-btn tb-btn-brand tb-btn-lift group mt-4 h-[50px] w-full rounded-full px-5 text-[14.5px] sm:mt-6 sm:h-auto sm:w-auto sm:py-2.5 sm:text-[13.5px]"
            >
              Request an invitation
              <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

        <div className="tb-rule my-7 sm:my-10" />

        <div className="flex flex-col gap-3 text-[12px] text-[var(--tb-mute)] sm:flex-row sm:items-center sm:justify-between">
          <p>© {YEAR} TrustBrig. All rights reserved.</p>
          <p className="text-[12px] font-medium">
            Secure global transactions
          </p>
        </div>
      </div>
    </footer>
  );
}
