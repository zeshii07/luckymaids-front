import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useId, useState } from "react";
import { Plus } from "lucide-react";

/**
 * FAQAccordion — accessible divided accordion (guide §3.2 Section 8 + §3.9).
 *
 *   - Two-column: title/intro on one side, accordion list on the other.
 *   - Thin dividers between rows instead of separate cards.
 *   - Height/opacity transition; respects reduced motion.
 *   - Multiple items may stay open simultaneously.
 *
 * Props:
 *   title: section heading
 *   intro?: supporting paragraph
 *   items: [{ q, a }]
 */
export default function FAQAccordion({
  title = "Frequently asked questions",
  intro,
  items = [],
  className = "",
}) {
  const prefersReducedMotion = useReducedMotion();
  const [open, setOpen] = useState(null);
  const panelId = useId();

  return (
    <div className={`grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 ${className}`}>
      <div>
        <p className="eyebrow text-coral">FAQ</p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {title}
        </h2>
        {intro && (
          <p className="mt-4 max-w-md text-base leading-relaxed text-ink-muted">
            {intro}
          </p>
        )}
      </div>

      <ul className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <li key={item.q}>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${panelId}-panel-${i}`}
                id={`${panelId}-button-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo"
              >
                <span className="font-display text-lg font-semibold text-ink sm:text-xl">
                  {item.q}
                </span>
                <Plus
                  className={`h-5 w-5 shrink-0 text-indigo transition-transform duration-[var(--motion-ui)] ${
                    isOpen ? "rotate-45" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`${panelId}-panel-${i}`}
                    role="region"
                    aria-labelledby={`${panelId}-button-${i}`}
                    initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={prefersReducedMotion ? undefined : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 pr-10 text-base leading-relaxed text-ink-muted">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
