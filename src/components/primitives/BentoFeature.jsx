import { motion, useReducedMotion } from "framer-motion";

/**
 * BentoFeature — one signature asymmetric composition (guide §3.2 Section 4).
 *
 *   The ONE place a small number of varied panels can work. Each panel must
 *   have a different content type and scale. Do NOT render four identical tiles.
 *
 *   Layout (desktop):
 *     ┌───────────────┬─────────┐
 *     │  A (large     │  B      │
 *     │  proposition  │ (metric)│
 *     │  + image)     │         │
 *     ├───────────────┼─────────┤
 *     │  C (process   │  D      │
 *     │   feature)    │ (quote) │
 *     └───────────────┴─────────┘
 *
 * Props:
 *   panels: [{ id, span, tone, children }] — caller decides content per panel
 *   className
 *
 *   Or pass `proposition`, `metric`, `feature`, `quote` shorthand slots.
 */
export default function BentoFeature({
  panels = [],
  proposition,
  metric,
  feature,
  quote,
  className = "",
}) {
  const prefersReducedMotion = useReducedMotion();

  // Shorthand slot mode: build a default asymmetric 2x2.
  if (panels.length === 0 && (proposition || metric || feature || quote)) {
    panels = [
      { id: "prop", span: "lg:col-span-7 lg:row-span-2", tone: "ink", children: proposition },
      { id: "metric", span: "lg:col-span-5", tone: "mint", children: metric },
      { id: "feature", span: "lg:col-span-7", tone: "white", children: feature },
      { id: "quote", span: "lg:col-span-5", tone: "violet", children: quote },
    ].filter((p) => p.children);
  }

  const tones = {
    ink: "bg-ink text-white",
    white: "bg-white text-ink border border-[var(--line)]",
    mint: "bg-mint-soft text-ink",
    violet: "bg-indigo text-white",
    coral: "bg-coral text-ink",
    paper: "bg-paper text-ink",
  };

  return (
    <div
      className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[14rem] ${className}`}
    >
      {panels.map((panel, i) => (
        <motion.div
          key={panel.id}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.5,
            delay: prefersReducedMotion ? 0 : i * 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={`relative flex flex-col justify-end overflow-hidden rounded-[var(--radius-panel)] p-6 sm:p-8 ${
            panel.span || ""
          } ${tones[panel.tone] || tones.paper}`}
        >
          {panel.children}
        </motion.div>
      ))}
    </div>
  );
}
