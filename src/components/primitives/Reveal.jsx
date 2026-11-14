import { motion, useReducedMotion } from "framer-motion";

/**
 * Reveal — scroll-aware entrance wrapper (blueprint §04 + §12).
 *
 * Motion tokens per blueprint:
 *   - Reveal duration 420–650 ms, stagger 60–100 ms.
 *   - Animate transform + opacity only (never layout dimensions).
 *   - Respect prefers-reduced-motion: render children static.
 *
 * Usage:
 *   <Reveal>...content...</Reveal>
 *   <Reveal delay={120} y={16}>...content...</Reveal>
 *   <Reveal as="li">...list item...</Reveal>
 */
export default function Reveal({
  children,
  as = "div",
  delay = 0,
  y = 12,
  x = 0,
  once = true,
  amount = 0.2,
  className,
  ...rest
}) {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = motion[as] || motion.div;

  if (prefersReducedMotion) {
    return (
      <MotionTag as={as} className={className} {...rest}>
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      as={as}
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.52, delay: delay / 1000, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
