import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";

/**
 * PricingCompare — comparison-table style layout (guide §3.7 + §4).
 *
 *   Replaces identical pricing cards with a structured table: each pricing
 *   section becomes a row with its factors laid out as a checklist beside a
 *   description. One "recommended" highlight (first by default) gets the
 *   accent treatment. NOT a grid of identical cards.
 *
 * Props:
 *   sections: [{ icon, title, description, items: string[], recommended? }]
 */
export default function PricingCompare({ sections = [], className = "" }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={`overflow-hidden rounded-[var(--radius-panel)] border border-[var(--line)] bg-white ${className}`}>
      {/* Table header row (desktop) */}
      <div className="hidden grid-cols-[1.2fr_2fr_2fr] gap-4 border-b border-[var(--line)] bg-paper px-6 py-4 sm:grid lg:grid-cols-[1fr_1.6fr_2fr]">
        <span className="eyebrow text-ink-muted">Service</span>
        <span className="eyebrow text-ink-muted">How pricing is set</span>
        <span className="eyebrow text-ink-muted">What affects the quote</span>
      </div>

      <ul className="divide-y divide-[var(--line)]">
        {sections.map((section, i) => {
          const Icon = section.icon;
          const recommended = section.recommended || i === 0;
          return (
            <motion.li
              key={section.title}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.45,
                delay: prefersReducedMotion ? 0 : Math.min(i * 0.06, 0.24),
                ease: [0.16, 1, 0.3, 1],
              }}
              className="grid gap-4 px-6 py-6 sm:grid-cols-[1.2fr_2fr_2fr] lg:grid-cols-[1fr_1.6fr_2fr]"
            >
              {/* Service name + icon */}
              <div className="flex items-start gap-3">
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                    recommended
                      ? "bg-coral text-ink"
                      : "bg-indigo-soft text-indigo"
                  }`}
                >
                  {Icon ? <Icon className="h-5 w-5" /> : null}
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold leading-tight text-ink">
                    {section.title}
                  </h3>
                  {recommended && (
                    <span className="mt-1 inline-block rounded-full bg-coral-soft px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-coral-deep">
                      Most requested
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm leading-relaxed text-ink-muted sm:pt-1">
                {section.description}
              </p>

              {/* Factors checklist */}
              <ul className="grid gap-2 sm:grid-cols-2">
                {section.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm leading-5 text-ink"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-indigo" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
