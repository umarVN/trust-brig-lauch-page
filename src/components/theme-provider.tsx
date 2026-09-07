'use client';

import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes';
import { useEffect } from 'react';
import type { ComponentProps } from 'react';

/* Mirrors --tb-canvas in globals.css and CANVAS in app/layout.tsx. */
const CANVAS = { light: '#F6F9FE', dark: '#0A111F' } as const;

/**
 * Holds <meta name="theme-color"> on the theme the page is actually showing.
 * The tag is rendered server-side against the default, so it only needs
 * correcting once the visitor toggles.
 */
function ThemeColorSync() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const color = resolvedTheme === 'dark' ? CANVAS.dark : CANVAS.light;
    document
      .querySelectorAll('meta[name="theme-color"]')
      .forEach((tag) => tag.setAttribute('content', color));
  }, [resolvedTheme]);

  return null;
}

export function ThemeProvider({ children, ...props }: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      <ThemeColorSync />
      {children}
    </NextThemesProvider>
  );
}
