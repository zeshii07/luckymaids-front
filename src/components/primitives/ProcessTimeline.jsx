import { motion, useReducedMotion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * ProcessTimeline — line-based process with numbered steps (guide §3.2 Section 5).
 *
 *   Desktop: horizontal connected path with active step highlight.
 *   Mobile: vertical timeline with numbered nodes.
 *   Motion: connecting line draws via SVG stroke-dashoffset tied to viewport
 *   entry. Step labels reveal in sequence. Never pins the page.
 *
 * Props:
 *   steps: [{ title, detail, icon? }]
 *   tone:  "light" | "dark"  (background context)
 */
export default function ProcessTimeline({
  steps = [],
  tone = "light",
  className = "",
}) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  const lineColor = tone === "dark" ? "#BDE8D4" : "#5D50E8";
  const nodeActiveBg = tone === "dark" ? "#F46E57" : "#5D50E8";
  const textColor = tone === "dark" ? "text-white" : "text-ink";
  const mutedColor = tone === "dark" ? "text-white/60" : "text-ink-muted";

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Desktop: horizontal */}
      <div className="hidden md:block">
        <svg
          className="absolute left-0 right-0 top-7 h-1 w-full"
          viewBox="0 0 100 1"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <line
            x1="0"
            y1="0.5"
            x2="100"
            y2="0.5"
            stroke={lineColor}
            strokeOpacity="0.2"
            strokeWidth="0.6"
          />
          <line
            x1="0"
            y1="0.5"
            x2="100"
            y2="0.5"
            stroke={lineColor}
            strokeWidth="0.6"
            strokeLinecap="round"
            style={{
              pathLength: prefersReducedMotion ? 1 : inView ? 1 : 0,
              transition: prefersReducedMotion
                ? "none"
                : "pathLength 1.2s cubic-bezier(0.16,1,0.3,1)",
            }}
          />
        </svg>

        <ol className="grid grid-cols-4 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.li
                key={step.title}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  duration: 0.5,
                  delay: prefersReducedMotion ? 0 : 0.15 + i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative flex flex-col items-center text-center"
              >
                <span
                  className="section-numeral relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 border-current bg-paper text-lg text-indigo"
                  style={{ background: nodeActiveBg, borderColor: nodeActiveBg, color: "#fff" }}
                >
                  {Icon ? <Icon className="h-6 w-6" /> : i + 1}
                </span>
                <h3 className={`mt-5 text-lg font-bold ${textColor}`}>
                  {step.title}
                </h3>
                {step.detail && (
                  <p className={`mt-2 text-sm leading-relaxed ${mutedColor}`}>
                    {step.detail}
                  </p>
                )}
              </motion.li>
            );
          })}
        </ol>
      </div>

      {/* Mobile: vertical */}
      <ol className="relative space-y-8 border-l-2 border-current/15 pl-8 md:hidden">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.li
              key={step.title}
              initial={prefersReducedMotion ? false : { opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                duration: 0.45,
                delay: prefersReducedMotion ? 0 : i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative"
            >
              <span
                className="section-numeral absolute -left-[2.7rem] flex h-9 w-9 items-center justify-center rounded-full text-sm text-white"
                style={{ background: nodeActiveBg }}
              >
                {Icon ? <Icon className="h-4 w-4" /> : i + 1}
              </span>
              <h3 className={`text-base font-bold ${textColor}`}>{step.title}</h3>
              {step.detail && (
                <p className={`mt-1 text-sm leading-relaxed ${mutedColor}`}>
                  {step.detail}
                </p>
              )}
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
