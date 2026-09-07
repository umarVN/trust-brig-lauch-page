'use client';

import * as React from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from 'framer-motion';

import { cn } from '@/lib/utils';

export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.85, ease: EASE_OUT } },
};

/** Standard in-view wrapper: fires once, slightly early, with a blur-up entrance. */
export function Reveal({
  children,
  className,
  delay = 0,
  as = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'li' | 'section' | 'span';
}) {
  const Comp = motion[as] as typeof motion.div;

  return (
    <Comp
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-10% 0px -6% 0px' }}
      variants={{
        hidden: { opacity: 0, y: 26, filter: 'blur(6px)' },
        show: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: { duration: 0.85, ease: EASE_OUT, delay },
        },
      }}
      className={className}
    >
      {children}
    </Comp>
  );
}

/** Headline that resolves word by word — the hero's opening gesture. */
export function WordReveal({
  text,
  className,
  delay = 0,
  highlight,
}: {
  text: string;
  className?: string;
  delay?: number;
  highlight?: string[];
}) {
  const words = text.split(' ');

  return (
    <span className={cn('inline', className)}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="inline-block overflow-hidden pb-[0.1em] align-bottom"
        >
          <motion.span
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 1.05, ease: EASE_OUT, delay: delay + index * 0.07 }}
            className={cn('inline-block', highlight?.includes(word) && 'tb-title-accent')}
          >
            {word}
            {index < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Cursor-magnetised wrapper for primary CTAs and nav affordances. */
export function Magnetic({
  children,
  className,
  strength = 0.3,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const x = useSpring(0, { stiffness: 220, damping: 18, mass: 0.35 });
  const y = useSpring(0, { stiffness: 220, damping: 18, mass: 0.35 });

  return (
    <motion.span
      ref={ref}
      onMouseMove={(event) => {
        if (reduce || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
        y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x, y }}
      className={cn('inline-block', className)}
    >
      {children}
    </motion.span>
  );
}

/** Pointer-tracked 3D tilt with a specular highlight that follows the cursor. */
export function TiltCard({
  children,
  className,
  innerClassName,
  max = 8,
}: {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  max?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const [hovered, setHovered] = React.useState(false);

  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), {
    stiffness: 170,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), {
    stiffness: 170,
    damping: 18,
  });

  const glareX = useTransform(px, (v) => `${v * 100}%`);
  const glareY = useTransform(py, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(240px circle at ${glareX} ${glareY}, var(--tb-glow-glare), transparent 68%)`;

  return (
    <div className={cn('tb-scene', className)}>
      <motion.div
        ref={ref}
        onMouseEnter={() => setHovered(true)}
        onMouseMove={(event) => {
          if (reduce || !ref.current) return;
          const rect = ref.current.getBoundingClientRect();
          px.set((event.clientX - rect.left) / rect.width);
          py.set((event.clientY - rect.top) / rect.height);
        }}
        onMouseLeave={() => {
          setHovered(false);
          px.set(0.5);
          py.set(0.5);
        }}
        style={{ rotateX, rotateY }}
        className={cn('tb-3d relative h-full w-full', innerClassName)}
      >
        {children}
        <motion.span
          aria-hidden
          style={{ background: glare, opacity: hovered && !reduce ? 1 : 0 }}
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
        />
      </motion.div>
    </div>
  );
}

/** Counts up to `value` once, on demand — callers wire it to an in-view trigger. */
export function useCountUp(value: number, decimals = 0) {
  const format = React.useCallback(
    (n: number) =>
      n.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }),
    [decimals]
  );

  const [display, setDisplay] = React.useState(() => format(0));
  const started = React.useRef(false);

  const start = React.useCallback(() => {
    if (started.current) return;
    started.current = true;

    const begin = performance.now();
    const duration = 1900;

    const step = (now: number) => {
      const t = Math.min((now - begin) / duration, 1);
      // easeOutExpo keeps the final digits from crawling.
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setDisplay(format(value * eased));
      if (t < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [format, value]);

  return { display, start };
}

/** Continuously advancing 0→1 value used for orbits and packet travel. */
export function useOrbit(speed = 0.00018): MotionValue<number> {
  const t = useMotionValue(0);
  const reduce = useReducedMotion();

  useAnimationFrame((time) => {
    if (reduce) return;
    t.set((time * speed) % 1);
  });

  return t;
}
