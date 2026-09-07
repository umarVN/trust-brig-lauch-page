import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';

import { ThemeProvider } from '@/components/theme-provider';

import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const TITLE = 'TrustBrig — Early Access | The Operating System For Secure Global Transactions';
const DESCRIPTION =
  'TrustBrig is escrow infrastructure being built to hold consideration in segregated custody, verify every counterparty and release value only when conditions are certified — for international trade, real estate, energy, commodities and government contracts. Launching Q4 2026: request an invitation for priority early access.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'escrow service',
    'secure payments',
    'online escrow',
    'payment protection',
    'freelance payments',
    'real estate escrow',
    'international payments',
    'smart contracts',
    'KYC verification',
    'dispute resolution',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'TrustBrig',
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

/* Mirrors --tb-canvas in globals.css. The browser chrome colour has to be a
 * literal here — a meta tag cannot read a custom property. */
const CANVAS = { light: '#F6F9FE', dark: '#0A111F' } as const;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',

  /* Keyed to the app's own default rather than prefers-color-scheme:
   * enableSystem is off, so the page ignores the OS setting entirely.
   * ThemeColorSync updates this when the visitor uses the toggle. */
  themeColor: CANVAS.light,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} bg-[var(--tb-canvas)] font-sans antialiased`}
        suppressHydrationWarning
      >
        {/* Light is the default canvas; the header toggles to dark. */}
        <ThemeProvider defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
