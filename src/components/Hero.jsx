import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MapPin, Star, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import cleanerImg from "../assets/cleaner.png";
import Eyebrow from "./primitives/Eyebrow";

/**
 * Hero — homepage flagship (blueprint §05 PAGE BLUEPRINT A).
 *
 * Asymmetric 55/45 split. Left: eyebrow, benefit headline, concise supporting
 * sentence, primary coral CTA + secondary text link. Right: authentic cleaner
 * portrait on a tinted editorial backdrop with a floating proof chip and a
 * decorative coral orb, giving the portrait real presence.
 *
 * Motion: headline words reveal in two short beats; portrait clips in; proof
 * chip and orb float with a gentle loop. Respects prefers-reduced-motion.
 */
export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-paper pt-24 pb-12 sm:flex sm:min-h-screen sm:items-center sm:pt-28 sm:pb-16"
    >
      {/* Brand-tinted ambient backdrop */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_82%_20%,rgba(93,80,232,0.12),transparent_45%),radial-gradient(circle_at_10%_90%,rgba(189,232,212,0.34),transparent_42%)]"
      />

      <div className="container mx-auto px-5 sm:px-6">
        <div className="grid items-center gap-6 sm:gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          {/* RIGHT — cleaner portrait (rendered first on mobile for visual anchor) */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="relative z-10 order-1 mx-auto w-full max-w-[16rem] sm:order-2 sm:max-w-sm lg:order-2 lg:max-w-none"
          >
            <div className="relative">
              {/* Decorative coral orb behind the portrait */}
              <motion.div
                aria-hidden="true"
                initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.3 }}
                className="absolute -right-2 -top-3 -z-10 h-24 w-24 rounded-full bg-coral/30 blur-2xl sm:h-36 sm:w-36"
              />
              <motion.div
                aria-hidden="true"
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { y: [0, -8, 0] }
                }
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-2 -top-3 -z-10 h-24 w-24 rounded-full bg-coral/25 sm:h-36 sm:w-36"
              />

              {/* Portrait stage: tinted backdrop so the transparent PNG reads as a hero */}
              <div className="relative overflow-hidden rounded-[1.75rem] border border-ink/10 bg-gradient-to-b from-mint-soft via-mint-soft to-indigo-soft/60 shadow-[0_50px_90px_-55px_rgba(23,36,50,0.5)] sm:rounded-[2rem] sm:shadow-[0_50px_90px_-55px_rgba(23,36,50,0.5)]">
                <img
                  src={cleanerImg}
                  alt="Confident professional cleaner from Byt Cleaning Services"
                  width={477}
                  height={523}
                  fetchPriority="high"
                  decoding="async"
                  className="relative z-10 mx-auto block aspect-[4/5] w-full object-contain object-top"
                />

                {/* Floating proof chip */}
                <motion.div
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="absolute bottom-3 left-3 right-3 flex items-center gap-2.5 rounded-2xl border border-white/40 bg-white/85 px-3.5 py-2.5 backdrop-blur-md sm:bottom-4 sm:left-4 sm:right-4 sm:max-w-[15rem] sm:gap-3 sm:px-4 sm:py-3"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-coral text-ink sm:h-10 sm:w-10">
                    <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
                  </span>
                  <span>
                    <span className="block text-xs font-bold text-ink sm:text-sm">Same-day availability</span>
                    <span className="block text-[0.65rem] text-ink-muted sm:text-xs">Book online in under 2 minutes</span>
                  </span>
                </motion.div>
              </div>

              {/* Floating rating badge */}
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="absolute -left-2 top-6 flex items-center gap-1.5 rounded-xl border border-ink/10 bg-white px-3 py-2 shadow-xl sm:-left-5 sm:top-8 sm:gap-2 sm:px-3.5 sm:py-2.5 sm:rounded-2xl"
              >
                <span className="flex" aria-hidden="true">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-3 w-3 fill-coral text-coral sm:h-3.5 sm:w-3.5" />
                  ))}
                </span>
                <span className="text-[0.65rem] font-bold text-ink sm:text-xs">5.0 · Dubai</span>
              </motion.div>
            </div>
          </motion.div>

          {/* LEFT — copy 55% */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-20 order-2 text-center lg:order-1 lg:text-left"
          >
            <Eyebrow tone="coral" className="justify-center lg:justify-start">
              <span className="inline-flex items-center gap-2">
                <Star className="h-3.5 w-3.5 fill-current" />
                Premium cleaning across Dubai
              </span>
            </Eyebrow>

            <h1 className="mt-4 font-display text-[2.1rem] font-bold leading-[1.08] tracking-tight text-ink xs:text-[2.4rem] sm:text-[3.2rem] lg:text-[3.7rem] sm:leading-[1.05]">
              <motion.span
                className="block"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.08 }}
              >
                Sparkling clean homes,
              </motion.span>
              <motion.span
                className="block text-indigo"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                effortlessly delivered.
              </motion.span>
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink-muted sm:text-lg lg:mx-0">
              Byt Cleaning Services transforms apartments, villas and offices
              across Dubai into pristine, comfortable spaces — so you can focus
              on what matters most.
            </p>

            <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center lg:justify-start sm:gap-4">
              <Link
                to="/request-a-quote"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-coral px-7 py-3.5 text-base font-bold text-ink shadow-lg shadow-coral/30 transition hover:-translate-y-0.5 hover:bg-coral-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2"
              >
                Get a Free Quote
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/cleaning-services-dubai"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 bg-white px-7 py-3.5 text-base font-semibold text-ink transition hover:border-indigo hover:text-indigo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo focus-visible:ring-offset-2"
              >
                Our Services
              </Link>
            </div>

            {/* Inline trust proof */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-ink-muted lg:justify-start">
              <span className="inline-flex items-center gap-2">
                <span className="flex" aria-hidden="true">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-coral text-coral" />
                  ))}
                </span>
                <span className="font-semibold text-ink">Trusted service</span>
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-indigo" />
                Serving all Dubai communities
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
