import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

/**
 * QuoteSpotlight — oversized editorial testimonial (guide §3.2 Section 7).
 *
 *   - Large quote set in display type, author identity/role, optional portrait.
 *   - Manual carousel only (no rapid auto-rotation). Keyboard accessible.
 *   - Crossfade/slide between quotes; no per-character animation.
 *
 * Props:
 *   quotes: [{ body, author, role, image? }]
 */
export default function QuoteSpotlight({ quotes = [], className = "" }) {
  const prefersReducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(0);
  const count = quotes.length;
  if (!count) return null;

  const go = (next) => {
    setDir(next > index ? 1 : -1);
    setIndex((next + count) % count);
  };

  const current = quotes[index];

  return (
    <div className={`relative ${className}`}>
      <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="relative min-h-[14rem]">
          <Quote
            className="absolute -left-2 -top-6 h-16 w-16 text-coral/20"
            aria-hidden="true"
          />
          <AnimatePresence mode="wait" custom={dir}>
            <motion.figure
              key={index}
              custom={dir}
              initial={prefersReducedMotion ? false : { opacity: 0, x: dir * 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, x: dir * -24 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <blockquote className="font-display text-2xl font-semibold leading-snug tracking-tight text-ink sm:text-3xl lg:text-[2.5rem] lg:leading-[1.15]">
                “{current.body}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-4">
                {current.image && (
                  <img
                    src={current.image}
                    alt=""
                    className="h-12 w-12 rounded-full object-cover"
                    loading="lazy"
                  />
                )}
                <span>
                  <span className="block font-bold text-ink">
                    {current.author}
                  </span>
                  {current.role && (
                    <span className="block text-sm text-ink-muted">
                      {current.role}
                    </span>
                  )}
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        {count > 1 && (
          <div className="flex items-center gap-3 lg:flex-col">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-white text-ink transition hover:border-indigo hover:text-indigo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="section-numeral text-sm text-ink-muted" aria-live="polite">
              {index + 1} / {count}
            </span>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-white text-ink transition hover:border-indigo hover:text-indigo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
