import { motion, useReducedMotion } from "framer-motion";

/**
 * Marquee — slow horizontal proof rail (guide §3.2 Section 2).
 *
 *   - Default 32s loop, pause on hover/focus, content duplicated for the loop.
 *   - Static (no animation) under reduced-motion — content simply overflows.
 *   - Use ONLY for logos/genuine proof, never for text that must be read.
 */
export default function Marquee({
  children,
  speed = 32, // seconds per loop
  className = "",
  ...rest
}) {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) {
    // Render once, no loop. Container is a simple flex that wraps.
    return (
      <div className={`flex flex-wrap gap-8 ${className}`} {...rest}>
        {children}
      </div>
    );
  }
  return (
    <div className={`marquee-pause relative overflow-hidden ${className}`} {...rest}>
      <div
        className="marquee-track flex w-max gap-8"
        style={{
          animation: `marquee-scroll ${speed}s linear infinite`,
        }}
      >
        <div className="flex shrink-0 gap-8">{children}</div>
        <div className="flex shrink-0 gap-8" aria-hidden="true">
          {children}
        </div>
      </div>
      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
