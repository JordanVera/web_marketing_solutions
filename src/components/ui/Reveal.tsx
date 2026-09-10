'use client';

import { useState, type ReactNode } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

const OFFSET: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 28 },
  down: { x: 0, y: -28 },
  left: { x: 28, y: 0 },
  right: { x: -28, y: 0 },
  none: { x: 0, y: 0 },
};

type RevealProps = {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  /** Fraction of the element that must be visible before animating. */
  amount?: number;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'span' | 'article';
};

/** Fade + slide an element into view the first time it is scrolled to. */
export function Reveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.7,
  amount = 0.25,
  className,
  as = 'div',
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const offset = prefersReducedMotion ? OFFSET.none : OFFSET[direction];
  const MotionTag = motion[as];
  const [complete, setComplete] = useState(false);

  return (
    <MotionTag
      className={cn(className)}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        willChange:
          prefersReducedMotion || complete ? 'auto' : 'transform, opacity',
      }}
      onAnimationComplete={() => setComplete(true)}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Parent/child pair for staggered lists. Wrap the list in <Stagger> and each
 * item in <StaggerItem>.
 */
export function Stagger({
  children,
  className,
  delayChildren = 0.05,
  staggerChildren = 0.11,
  amount = 0.15,
}: {
  children: ReactNode;
  className?: string;
  delayChildren?: number;
  staggerChildren?: number;
  amount?: number;
}) {
  const variants: Variants = {
    hidden: {},
    visible: { transition: { delayChildren, staggerChildren } },
  };

  return (
    <motion.div
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  direction = 'up',
}: {
  children: ReactNode;
  className?: string;
  direction?: Direction;
}) {
  const prefersReducedMotion = useReducedMotion();
  const offset = prefersReducedMotion ? OFFSET.none : OFFSET[direction];

  const variants: Variants = {
    hidden: { opacity: 0, ...offset },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div className={cn(className)} variants={variants}>
      {children}
    </motion.div>
  );
}
