import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";
import cleanerImg from "../assets/cleaner.png";
import Eyebrow from "./primitives/Eyebrow";

/**
 * Hero — homepage flagship (blueprint §05 PAGE BLUEPRINT A).
 *
 * Asymmetric 55/45 split. Left: eyebrow, benefit headline, concise supporting
 * sentence, primary coral CTA + secondary text link. Right: authentic cleaner
 * image frame with a floating proof chip.
 *
 * Motion: headline words reveal in two short beats; image clip reveals; CTA
 * hover uses 2-3 px lift. Respects prefers-reduced-motion.
 */
export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="relative flex min-h-[88vh] items-center overflow-hidden bg-paper pt-28 pb-16 sm:min-h-screen sm:pt-32"
    >
      {/* Brand-tinted ambient backdrop */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_22%,rgba(93,80,232,0.10),transparent_45%),radial-gradient(circle_at_12%_88%,rgba(189,232,212,0.30),transparent_42%)]"
      />

      <div className="container mx-auto px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          {/* LEFT — copy 55% */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-20 text-center lg:text-left"
          >
            <Eyebrow tone="coral" className="justify-center lg:justify-start">
              <span className="inline-flex items-center gap-2">
                <Star className="h-3.5 w-3.5 fill-current" />
                Premium cleaning across Dubai
              </span>
            </Eyebrow>

            <h1 className="mt-5 font-display text-[2.6rem] font-bold leading-[1.04] tracking-tight text-ink sm:text-5xl lg:text-[3.7rem]">
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

            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg lg:mx-0">
              Byt Cleaning Services transforms apartments, villas and offices
              across Dubai into pristine, comfortable spaces — so you can focus
              on what matters most.
            </p>

            <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              <Link
                to="/request-a-quote"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-coral px-8 py-4 text-base font-bold text-ink shadow-lg shadow-coral/30 transition hover:-translate-y-0.5 hover:bg-coral-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2"
              >
                Get a Free Quote
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/cleaning-services-dubai"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 bg-white px-8 py-4 text-base font-semibold text-ink transition hover:border-indigo hover:text-indigo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo focus-visible:ring-offset-2"
              >
                Our Services
              </Link>
            </div>

            {/* Inline trust proof */}
            <div className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-ink-muted lg:justify-start">
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

          {/* RIGHT — authentic image frame 45% */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.04, clipPath: "inset(8% 0 8% 0)" }}
            animate={{ opacity: 1, scale: 1, clipPath: "inset(0% 0 0% 0)" }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="relative z-10 mx-auto w-full max-w-md lg:max-w-none"
          >
            <div className="relative overflow-hidden rounded-[1.75rem] border border-ink/10 bg-mint-soft shadow-[0_40px_80px_-50px_rgba(23,36,50,0.45)]">
              <img
                src={cleanerImg}
                alt="Confident professional cleaner from Byt Cleaning Services"
                width={800}
                height={1000}
                fetchPriority="high"
                decoding="async"
                className="aspect-[4/5] w-full object-cover object-top"
              />

              {/* Floating proof chip */}
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-2xl border border-white/40 bg-white/85 px-4 py-3 backdrop-blur-md sm:right-auto sm:max-w-[15rem]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-coral text-ink">
                  <Star className="h-5 w-5 fill-current" />
                </span>
                <span>
                  <span className="block text-sm font-bold text-ink">Same-day availability</span>
                  <span className="block text-xs text-ink-muted">Book online in under 2 minutes</span>
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
