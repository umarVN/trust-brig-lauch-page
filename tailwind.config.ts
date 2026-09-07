import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import tailwindcssAnimate from 'tailwindcss-animate';

const token = (name: string) =>
  `color-mix(in srgb, var(${name}) calc(<alpha-value> * 100%), transparent)`;

const contentPalette = {
  heading: { cssVar: '--title', light: '#1A2634', dark: '#E8EDF2' },
  paragraph: { cssVar: '--paragraph', light: '#4B5565', dark: '#9CA3AF' },
  label: { cssVar: '--label', light: '#434656', dark: '#96A1AB' },
  placeholder: { cssVar: '--placeholder', light: '#94A3B8', dark: '#6B7280' },
} as const;

const paletteEntries = Object.values(contentPalette);

const contentPaletteColors = Object.fromEntries(
  Object.entries(contentPalette).map(([name, { cssVar }]) => [name, token(cssVar)]),
);

const contentPaletteBase = {
  ':root': Object.fromEntries(paletteEntries.map((c) => [c.cssVar, c.light])),
  '.dark': Object.fromEntries(paletteEntries.map((c) => [c.cssVar, c.dark])),
};

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        '3xl': '1940px',
        '4xl': '2560px',
      },
      fontSize: {
        '3xs': ['0.625rem', { lineHeight: '0.875rem' }], // 10px
        '2xs': ['0.6875rem', { lineHeight: '1rem' }], // 11px
      },
      spacing: {
        section: 'var(--section-gap)',
        'section-heading': 'var(--section-heading-gap)',
        'page-block': 'var(--page-block-gap)',
        'page-gutter': 'var(--page-gutter)',
      },
      fontFamily: {
        sans: [
          'var(--font-inter)',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        display: ['var(--font-inter)', 'ui-sans-serif', 'sans-serif'],
        mono: ['var(--font-inter)', 'ui-sans-serif', 'sans-serif'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        ...contentPaletteColors,
        brand: {
          DEFAULT: token('--brand-button'),
          hover: token('--brand-button-hover'),
        },
        surface: {
          DEFAULT: 'hsl(var(--surface))',
          muted: 'hsl(var(--surface-muted))',
        },
        primary: {
          50: 'hsl(var(--primary-50))',
          100: 'hsl(var(--primary-100))',
          200: 'hsl(var(--primary-200))',
          300: 'hsl(var(--primary-300))',
          400: 'hsl(var(--primary-400))',
          500: 'hsl(var(--primary-500))',
          600: 'hsl(var(--primary-600))',
          700: 'hsl(var(--primary-700))',
          800: 'hsl(var(--primary-800))',
          900: 'hsl(var(--primary-900))',
          DEFAULT: 'color-mix(in srgb, var(--primary) calc(<alpha-value> * 100%), transparent)',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          50: 'hsl(var(--secondary-50))',
          100: 'hsl(var(--secondary-100))',
          200: 'hsl(var(--secondary-200))',
          300: 'hsl(var(--secondary-300))',
          400: 'hsl(var(--secondary-400))',
          500: 'hsl(var(--secondary-500))',
          600: 'hsl(var(--secondary-600))',
          700: 'hsl(var(--secondary-700))',
          800: 'hsl(var(--secondary-800))',
          900: 'hsl(var(--secondary-900))',
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        danger: {
          DEFAULT: 'hsl(var(--danger-solid))',
          hover: 'hsl(var(--danger-solid-hover))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        success: {
          50: 'hsl(var(--success-50))',
          100: 'hsl(var(--success-100))',
          200: 'hsl(var(--success-200))',
          300: 'hsl(var(--success-300))',
          400: 'hsl(var(--success-400))',
          500: 'hsl(var(--success-500))',
          600: 'hsl(var(--success-600))',
          700: 'hsl(var(--success-700))',
          800: 'hsl(var(--success-800))',
          900: 'hsl(var(--success-900))',
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
        },
        warning: {
          50: 'hsl(var(--warning-50))',
          100: 'hsl(var(--warning-100))',
          200: 'hsl(var(--warning-200))',
          300: 'hsl(var(--warning-300))',
          400: 'hsl(var(--warning-400))',
          500: 'hsl(var(--warning-500))',
          600: 'hsl(var(--warning-600))',
          700: 'hsl(var(--warning-700))',
          800: 'hsl(var(--warning-800))',
          900: 'hsl(var(--warning-900))',
          DEFAULT: 'hsl(var(--warning))',
          foreground: 'hsl(var(--warning-foreground))',
        },
        error: {
          50: 'hsl(var(--error-50))',
          100: 'hsl(var(--error-100))',
          200: 'hsl(var(--error-200))',
          300: 'hsl(var(--error-300))',
          400: 'hsl(var(--error-400))',
          500: 'hsl(var(--error-500))',
          600: 'hsl(var(--error-600))',
          700: 'hsl(var(--error-700))',
          800: 'hsl(var(--error-800))',
          900: 'hsl(var(--error-900))',
          DEFAULT: 'hsl(var(--error))',
          foreground: 'hsl(var(--error-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        control: 'var(--control-radius)',
      },
      height: {
        control: 'var(--control-height)',
      },
      width: {
        control: 'var(--control-height)',
      },
      keyframes: {
        orbFloat: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -30px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
        },
        particleFloat: {
          '0%, 100%': { opacity: '0', transform: 'translateY(0)' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { opacity: '0', transform: 'translateY(-100px)' },
        },
        shieldPulse: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        checkPulse: {
          '0%, 100%': { strokeDashoffset: '0', opacity: '1' },
          '50%': { strokeDashoffset: '0', opacity: '0.6' },
        },
      },
      animation: {
        orbFloat: 'orbFloat 8s ease-in-out infinite',
        particleFloat: 'particleFloat 5s ease-in-out infinite',
        shieldPulse: 'shieldPulse 3s ease-in-out infinite',
        checkPulse: 'checkPulse 2s ease-in-out infinite',
      },
    },
  },
  plugins: [
    tailwindcssAnimate,
    plugin(({ addBase }) => {
      addBase(contentPaletteBase);
    }),
  ],
};

export default config;
