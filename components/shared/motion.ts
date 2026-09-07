import type { Transition, Variants } from "framer-motion";

/** Soft ease — professional, not bouncy */
export const easeOut = [0.22, 1, 0.36, 1] as const;

export const fadeTransition: Transition = {
  duration: 0.5,
  ease: easeOut,
};

/** Subtle rise + fade for section content */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: fadeTransition,
  },
};

/** Soft fade only (images / overlays) */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.55, ease: easeOut },
  },
};

/** Slight scale for hero media */
export const fadeScale: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: easeOut },
  },
};

/** Parent for staggered children */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

/** Slightly slower stagger for larger grids */
export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.06,
    },
  },
};

/** Fire once when ~15% visible — works on mobile, tablet, desktop */
export const inView = {
  once: true,
  amount: 0.15,
} as const;

export const inViewLoose = {
  once: true,
  amount: 0.1,
} as const;
