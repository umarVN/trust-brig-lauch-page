'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { cn } from '@/lib/utils';

/**
 * Two-state switch for the landing canvas. Renders a stable placeholder until
 * mounted, because `resolvedTheme` is unknown during SSR and a mismatched icon
 * would flash on hydration.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const isDark = mounted ? resolvedTheme === 'dark' : true;

  return (
    <button
      type="button"
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={isDark}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn(
        'relative flex h-9 w-[62px] shrink-0 items-center rounded-full border border-[var(--tb-line)] bg-[var(--tb-fill-1)] px-1 transition-colors duration-500 hover:bg-[var(--tb-fill-2)]',
        className
      )}
    >
      {/* Sliding knob */}
      <motion.span
        aria-hidden
        animate={{ x: isDark ? 26 : 0 }}
        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
        className="absolute left-1 flex size-7 items-center justify-center rounded-full bg-[var(--tb-invert-bg)] text-[var(--tb-invert-fg)] shadow-[0_4px_14px_-4px_rgba(0,0,0,0.6)]"
      >
        {isDark ? <Moon className="size-3.5" /> : <Sun className="size-3.5" />}
      </motion.span>

      {/* Static rail icons, dimmed behind the knob */}
      <span className="pointer-events-none flex w-full items-center justify-between px-[7px] text-[var(--tb-mute)]">
        <Sun className={cn('size-3.5 transition-opacity duration-300', !isDark && 'opacity-0')} />
        <Moon className={cn('size-3.5 transition-opacity duration-300', isDark && 'opacity-0')} />
      </span>
    </button>
  );
}
