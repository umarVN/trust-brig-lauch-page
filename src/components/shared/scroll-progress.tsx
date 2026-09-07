'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/** Hairline beam across the top of the viewport tracking read progress. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-[var(--tb-primary)] via-[var(--tb-glow)] to-[var(--tb-mint)] shadow-[var(--tb-glow-shadow-sm)]"
    />
  );
}
