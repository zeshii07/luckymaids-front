import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";

/**
 * MetricCallout — oversized verified figure with caption (guide §4 + §5 pattern F).
 *
 *   - Count-up animation runs ONCE when 15-25% visible, respects reduced motion.
 *   - Use ONLY for real, supportable metrics. Never for fake social proof.
 *
 * Props:
 *   value: numeric target (e.g. 1200)
 *   suffix?: string (e.g. "+", "%")
 *   label: caption text
 *   prefix?: string (e.g. "AED ")
 *   duration?: ms (default 1400)
 */
export default function MetricCallout({
  value,
  suffix = "",
  prefix = "",
  label,
  duration = 1400,
  className = "",
}) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [display, setDisplay] = useState(prefersReducedMotion ? value : 0);

  useEffect(() => {
    if (prefersReducedMotion || !inView) {
      setDisplay(value);
      return;
    }
    if (!inView) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration, prefersReducedMotion]);

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      <p className="section-numeral text-4xl font-bold tracking-tight text-indigo sm:text-5xl lg:text-6xl">
        {prefix}
        {display.toLocaleString()}
        {suffix}
      </p>
      <p className="mt-2 text-sm text-ink-muted">{label}</p>
    </motion.div>
  );
}
