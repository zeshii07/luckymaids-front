import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MapPin, Star, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import cleanerImg from "../assets/cleaner.png";
import Eyebrow from "./primitives/Eyebrow";

/**
 * Hero — homepage flagship.
 *
 * Full-bleed editorial hero: the cleaner portrait is the background image,
 * with a left-to-right gradient scrim so the overlaid headline and CTAs stay
 * fully legible while the cleaner remains visible on the right side.
 *
 * The section is self-contained (no negative margins, fixed min-height) so it
 * never overlaps the cards/sections below it.
 *
 * Motion: headline words reveal in two short beats; the proof chip and badge
 * fade in; respects prefers-reduced-motion.
 */
export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[88vh] items-center overflow-hidden bg-paper pt-24 sm:min-h-screen sm:pt-28"
    >
      {/* Background cleaner portrait — anchored to the right on desktop,
          centered on mobile. Slightly scaled up so the transparent PNG reads
          as a real hero image rather than a small framed photo. */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <img
          src={cleanerImg}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          decoding="async"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[110%] w-auto max-w-none -translate-x-1/2 -translate-y-1/2 object-contain sm:left-auto sm:right-[-6%] sm:h-[118%] sm:translate-x-0 sm:translate-y-0 lg:right-[-4%]"
        />
      </div>

      {/* Scrim: stronger on the left where the text sits, fading toward the
          right so the cleaner stays visible. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(247,247,242,0.97)_0%,rgba(247,247,242,0.94)_38%,rgba(247,247,242,0.62)_58%,rgba(247,247,242,0.18)_78%,rgba(247,247,242,0)_100%)] sm:bg-[linear-gradient(90deg,rgba(247,247,242,0.98)_0%,rgba(247,247,242,0.96)_34%,rgba(247,247,242,0.55)_54%,rgba(247,247,242,0.08)_80%,rgba(247,247,242,0)_100%)]"
      />
      {/* Mobile vertical scrim so the cleaner doesn't fight the headline */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(247,247,242,0.30)_0%,rgba(247,247,242,0.10)_40%,rgba(247,247,242,0.55)_78%,rgba(247,247,242,0.85)_100%)] sm:hidden"
      />

      <div className="container relative mx-auto px-4 sm:px-6">
        <div className="max-w-2xl">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-20 text-center sm:text-left"
          >
            <Eyebrow tone="coral" className="justify-center sm:justify-start">
              <span className="inline-flex items-center gap-2">
                <Star className="h-3.5 w-3.5 fill-current" />
                Premium cleaning across Dubai
              </span>
            </Eyebrow>

            <h1 className="mt-4 font-display text-[2.2rem] font-bold leading-[1.08] tracking-tight text-ink xs:text-[2.6rem] sm:text-[3.4rem] sm:leading-[1.05] lg:text-[3.9rem]">
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

            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink-muted sm:mt-5 sm:text-lg sm:leading-relaxed lg:mx-0">
              Byt Cleaning Services transforms apartments, villas and offices
              across Dubai into pristine, comfortable spaces — so you can focus
              on what matters most.
            </p>

            <div className="mt-6 flex flex-col items-stretch gap-3 sm:mt-7 sm:flex-row sm:items-center sm:gap-4">
              <Link
                to="/request-a-quote"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-coral px-7 py-3.5 text-base font-bold text-ink shadow-lg shadow-coral/30 transition hover:-translate-y-0.5 hover:bg-coral-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2"
              >
                Get a Free Quote
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/cleaning-services-dubai"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 bg-white/90 px-7 py-3.5 text-base font-semibold text-ink backdrop-blur-sm transition hover:border-indigo hover:text-indigo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo focus-visible:ring-offset-2"
              >
                Our Services
              </Link>
            </div>

            {/* Inline trust proof */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-ink-muted sm:justify-start">
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

      {/* Floating proof chip (desktop only — sits over the cleaner) */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="absolute bottom-8 right-6 z-20 hidden items-center gap-3 rounded-2xl border border-white/40 bg-white/85 px-4 py-3 backdrop-blur-md shadow-xl lg:flex lg:max-w-[15rem]"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-coral text-ink">
          <Sparkles className="h-5 w-5" />
        </span>
        <span>
          <span className="block text-sm font-bold text-ink">Same-day availability</span>
          <span className="block text-xs text-ink-muted">Book online in under 2 minutes</span>
        </span>
      </motion.div>
    </section>
  );
}
