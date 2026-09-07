'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, Loader2, ShieldCheck } from 'lucide-react';

import { cn } from '@/lib/utils';
import { EASE_OUT } from '@/components/shared/motion-primitives';
import { subscriberSchema, type SubscriberInput } from '@/lib/subscriber-schema';
import { onEmailHandoff } from '@/lib/signup-handoff';

type Status = 'idle' | 'success' | 'error';

const FALLBACK_ERROR = 'Something went wrong while subscribing. Please try again.';

const FIELD_CLASS =
  'h-12 w-full rounded-xl border border-[var(--tb-line-strong)] bg-[var(--tb-fill-2)] px-4 text-[14px] text-[var(--tb-strong)] outline-none transition-all duration-300 placeholder:text-[var(--tb-mute)] focus:border-[var(--tb-line-strong)] focus:bg-[var(--tb-fill-2)] focus:ring-2 focus:ring-[var(--tb-glow)]/25';

export function SubscribeForm({ className }: { className?: string }) {
  const [status, setStatus] = React.useState<Status>('idle');
  const [errorMessage, setErrorMessage] = React.useState(FALLBACK_ERROR);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SubscriberInput>({
    resolver: zodResolver(subscriberSchema),
    defaultValues: { name: '', email: '', company: '' },
    mode: 'onTouched',
  });

  /* react-hook-form owns the name input's ref, so keep our own alongside it in
   * order to move focus there once an address arrives from the hero. */
  const { ref: registerName, ...nameField } = register('name');
  const nameInput = React.useRef<HTMLInputElement | null>(null);

  const focusTimer = React.useRef<number | null>(null);

  React.useEffect(() => {
    const stopListening = onEmailHandoff((email) => {
      setValue('email', email, { shouldValidate: true });
      // If this form was already showing its success panel, put the fields back.
      setStatus('idle');

      // Land on the one field still empty, once the scroll has arrived.
      if (focusTimer.current) window.clearTimeout(focusTimer.current);
      focusTimer.current = window.setTimeout(
        () => nameInput.current?.focus({ preventScroll: true }),
        1200
      );
    });

    return () => {
      stopListening();
      if (focusTimer.current) window.clearTimeout(focusTimer.current);
    };
  }, [setValue]);

  const onSubmit = handleSubmit(async (values) => {
    setStatus('idle');
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        // The route returns a caller-safe `error` string for rate limiting and
        // rejected input; anything else falls back to the generic message.
        const body = (await response.json().catch(() => null)) as { error?: string } | null;
        setErrorMessage(body?.error ?? FALLBACK_ERROR);
        setStatus('error');
        return;
      }

      setStatus('success');
      reset();
    } catch {
      setErrorMessage(FALLBACK_ERROR);
      setStatus('error');
    }
  });

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
        className={cn(
          'tb-glass tb-glass-hi flex flex-col items-center gap-3 rounded-[24px] p-8 text-center sm:p-10',
          className
        )}
      >
        <span className="flex size-14 items-center justify-center rounded-full bg-[var(--tb-mint)]/12">
          <CheckCircle2 className="size-7 text-[var(--tb-mint)]" />
        </span>

        <p className="text-[19px] font-semibold text-[var(--tb-strong)]">Invitation requested</p>

        <p className="max-w-sm text-[13.5px] leading-relaxed text-[var(--tb-ink-dim)]">
          We&apos;ve sent a confirmation to your email. Your invitation to create an account follows
          as soon as TrustBrig opens.
        </p>

        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-2 rounded-full border border-[var(--tb-line-strong)] px-4 py-2 text-[12.5px] font-medium text-[var(--tb-strong)] transition-colors hover:bg-[var(--tb-fill-2)]"
        >
          Subscribe another address
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={cn('tb-glass tb-glass-hi rounded-[24px] p-6 sm:p-8', className)}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="tb-eyebrow">Early access</p>
          <p className="mt-2 text-[19px] font-semibold text-[var(--tb-strong)]">Request an invitation</p>
        </div>

        <span className="hidden shrink-0 rounded-full border border-[var(--tb-line)] px-2.5 py-1 text-[11px] font-medium text-[var(--tb-mute)] sm:block">
          Invitation only
        </span>
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <label htmlFor="name" className="mb-2 block text-[12.5px] font-medium text-[var(--tb-ink-dim)]">
            Full name <span className="text-[var(--tb-glow)]">*</span>
          </label>
          <input
            id="name"
            autoComplete="name"
            placeholder="Jane Doe"
            aria-invalid={errors.name ? 'true' : undefined}
            className={FIELD_CLASS}
            {...nameField}
            ref={(element) => {
              registerName(element);
              nameInput.current = element;
            }}
          />
          {errors.name ? (
            <p className="mt-1.5 text-[11.5px] text-[var(--tb-danger)]">{errors.name.message}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-[12.5px] font-medium text-[var(--tb-ink-dim)]">
            Email address <span className="text-[var(--tb-glow)]">*</span>
          </label>
          <input
            id="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="jane@company.com"
            aria-invalid={errors.email ? 'true' : undefined}
            className={FIELD_CLASS}
            {...register('email')}
          />
          {errors.email ? (
            <p className="mt-1.5 text-[11.5px] text-[var(--tb-danger)]">{errors.email.message}</p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="company"
            className="mb-2 block text-[12.5px] font-medium text-[var(--tb-ink-dim)]"
          >
            Company <span className="text-[var(--tb-mute)]">(optional)</span>
          </label>
          <input
            id="company"
            autoComplete="organization"
            placeholder="TrustBrig Ltd."
            aria-invalid={errors.company ? 'true' : undefined}
            className={FIELD_CLASS}
            {...register('company')}
          />
          {errors.company ? (
            <p className="mt-1.5 text-[11.5px] text-[var(--tb-danger)]">{errors.company.message}</p>
          ) : null}
        </div>
      </div>

      <div className="mt-5 flex items-start gap-3 rounded-xl border border-[var(--tb-line)] bg-[var(--tb-fill-1)] p-3.5">
        <ShieldCheck className="mt-0.5 size-4 shrink-0 text-[var(--tb-glow)]" />
        <p className="text-[11.5px] leading-relaxed text-[var(--tb-mute)]">
          Your information is encrypted in transit and at rest, and used only for your TrustBrig
          early access invitation.
        </p>
      </div>

      {status === 'error' ? (
        <p role="alert" className="mt-4 text-[12.5px] text-[var(--tb-danger)]">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="tb-btn tb-btn-brand group mt-5 flex h-12 w-full rounded-xl text-[14.5px] hover:shadow-[var(--tb-glow-shadow)]"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Subscribing…
          </>
        ) : (
          <>
            Notify me at launch
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </>
        )}
      </button>
    </form>
  );
}
