import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * ServiceIndex — numbered editorial service directory (guide §3.2 Section 3 + §3.3).
 *
 *   - Full-width stacked rows (NOT a card grid).
 *   - Desktop: hover/focus a row to reveal its image in a fixed visual stage.
 *   - Mobile: each row shows a compact thumbnail inline (no hover-only content).
 *   - Row background nudges subtly; arrow translates on hover.
 *   - Rows enter with a small stagger on first viewport entry.
 *
 * Props:
 *   services: [{ number?, title, benefit, href, image, imageAlt }]
 */
export default function ServiceIndex({ services = [], className = "" }) {
  const prefersReducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  return (
    <div className={`grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start ${className}`}>
      {/* ROWS — numbered editorial directory */}
      <ul className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
        {services.map((service, i) => {
          const isActive = active === i;
          return (
            <motion.li
              key={service.title}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.5,
                delay: prefersReducedMotion ? 0 : i * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Link
                to={service.href}
                onFocus={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                className="group flex items-center gap-5 px-2 py-6 transition-colors duration-[var(--motion-ui)] hover:bg-white/60 focus-visible:bg-white/60 sm:px-4"
              >
                {/* Mobile thumbnail (desktop uses the visual stage) */}
                {service.image && (
                  <img
                    src={service.image}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="h-14 w-14 shrink-0 rounded-xl object-cover sm:hidden"
                  />
                )}
                <span
                  className="section-numeral hidden w-12 shrink-0 text-2xl text-coral transition-transform duration-[var(--motion-ui)] group-hover:scale-110 sm:block"
                  aria-hidden="true"
                >
                  {service.number ?? String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">
                    {service.title}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-ink-muted">
                    {service.benefit}
                  </span>
                </span>
                <ArrowUpRight className="h-6 w-6 shrink-0 text-indigo transition-transform duration-[var(--motion-ui)] group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </motion.li>
          );
        })}
      </ul>

      {/* DESKTOP visual stage — fixed image that crossfades on row hover/focus */}
      <div className="sticky top-28 hidden h-[28rem] overflow-hidden rounded-[var(--radius-image)] border border-[var(--line)] bg-white lg:block">
        <AnimatePresence mode="wait">
          <motion.img
            key={active}
            src={services[active]?.image}
            alt={services[active]?.imageAlt || services[active]?.title}
            loading="lazy"
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent p-6">
          <p className="eyebrow text-mint">
            {String(active + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
          </p>
          <p className="mt-1 font-display text-2xl font-bold text-white">
            {services[active]?.title}
          </p>
        </div>
      </div>
    </div>
  );
}
