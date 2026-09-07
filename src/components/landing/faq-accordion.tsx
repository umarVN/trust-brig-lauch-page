'use client';

import * as React from 'react';
import { AnimatePresence, motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Plus } from 'lucide-react';

import { cn } from '@/lib/utils';
import { EASE_OUT, Reveal } from '@/components/shared/motion-primitives';

interface FaqItem {
  id: string;
  index: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'what-happens',
    index: '01',
    question: 'What happens after I subscribe?',
    answer:
      'Nothing is required from you. Your details join the priority access list, and when TrustBrig opens we email your invitation with a link and the steps to create your account.',
  },
  {
    id: 'account',
    index: '02',
    question: 'Am I creating an account right now?',
    answer:
      'No. This form only subscribes you to the launch list. There is no password, no verification, and no account until you accept the invitation we send you.',
  },
  {
    id: 'when',
    index: '03',
    question: 'When will I receive my invitation?',
    answer:
      'Invitations go out in batches as we open access. We contact subscribers in the order they joined, so subscribing earlier means hearing from us sooner.',
  },
  {
    id: 'cost',
    index: '04',
    question: 'Does subscribing cost anything or commit me?',
    answer: 'No. Requesting an invitation is free and carries no obligation.',
  },
  {
    id: 'company-field',
    index: '05',
    question: 'Why do you ask for a company name?',
    answer:
      'It is optional. If you provide it we can prepare the right verification path for your account in advance, since businesses complete a different check to individuals.',
  },
  {
    id: 'data',
    index: '06',
    question: 'How is my personal data handled?',
    answer:
      'Your details are stored securely and used only to send your launch invitation and prepare your account. We never sell or share them with third parties, and you can ask us to delete them at any time.',
  },
];

/** Glass card with a cursor-following spotlight and an expanding answer. */
function FaqCard({
  item,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);
  const spotlight = useMotionTemplate`radial-gradient(300px circle at ${mx}px ${my}px, var(--tb-glow-spot), transparent 72%)`;

  return (
    <motion.div
      ref={ref}
      layout
      onMouseMove={(event) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        mx.set(event.clientX - rect.left);
        my.set(event.clientY - rect.top);
      }}
      onMouseLeave={() => {
        mx.set(-200);
        my.set(-200);
      }}
      data-active={isOpen ? 'true' : 'false'}
      transition={{ layout: { duration: 0.45, ease: EASE_OUT } }}
      className={cn(
        'tb-glass tb-beam relative overflow-hidden rounded-2xl transition-colors duration-500',
        isOpen && 'bg-[var(--tb-fill-2)]'
      )}
    >
      <motion.span
        aria-hidden
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-0"
      />

      <h3>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={`faq-panel-${item.id}`}
          onClick={onToggle}
          className="tb-tap relative flex w-full items-start gap-4 px-4 py-[18px] text-left sm:px-6 sm:py-5"
        >
          <span className="tb-mono mt-1 shrink-0 text-[11px] text-[var(--tb-mute)]">
            {item.index}
          </span>

          <span className="flex-1 text-[15.5px] font-medium leading-[1.35] text-[var(--tb-strong)] sm:text-[17px]">
            {item.question}
          </span>

          <span
            className={cn(
              'mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border transition-all duration-500',
              isOpen
                ? 'rotate-45 border-transparent bg-[var(--tb-invert-bg)] text-[var(--tb-invert-fg)]'
                : 'border-[var(--tb-line-strong)] text-[var(--tb-ink-dim)]'
            )}
          >
            <Plus className="size-3.5" strokeWidth={2.4} />
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            id={`faq-panel-${item.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE_OUT }}
            className="relative overflow-hidden"
          >
            <p className="tb-body px-5 pb-6 pl-[3.4rem] text-[13.5px] sm:px-6 sm:pl-[3.9rem]">
              {item.answer}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}

export function FaqAccordion() {
  const [openId, setOpenId] = React.useState<string | null>(FAQ_ITEMS[0].id);

  return (
    <section id="faq" className="tb-section relative">
      <div className="tb-shell">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="tb-display tb-display-section text-[clamp(2.4rem,4.2vw,2.75rem)] text-[var(--tb-strong)]">
              Before you <span className="tb-title-accent">join</span>
            </h2>
            <p className="tb-body mt-6 max-w-[38ch] text-[15px]">
              What subscribing means, and exactly what happens next.
            </p>

            {/* <a
              href="#access"
              className="mt-7 inline-flex items-center gap-2 text-[13.5px] font-medium text-[var(--tb-glow)] transition-colors hover:text-[var(--tb-strong)]"
            >
              Still have a question? Talk to us
            </a> */}
          </Reveal>

          <div className="grid gap-2.5 sm:gap-3">
            {FAQ_ITEMS.map((item, index) => (
              <Reveal key={item.id} delay={index * 0.05}>
                <FaqCard
                  item={item}
                  isOpen={openId === item.id}
                  onToggle={() => setOpenId(openId === item.id ? null : item.id)}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
