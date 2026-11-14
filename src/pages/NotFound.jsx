import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ArrowRight, Home as HomeIcon, Sparkles } from "lucide-react";
import { Eyebrow, PrimaryButton } from "../components/primitives";

/**
 * NotFound — branded 404 composition (guide §3.12).
 *
 *   - Large typographic "404", short explanation, recovery links.
 *   - Returns a real 404 HTTP status when served via SSR/hosting config
 *     (client-rendered SPA marks the route; hosting must emit 404).
 *   - Simple animated line/shape accent; no particle storm.
 */
export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page not found | Byt Cleaning Services</title>
        <meta name="description" content="The page you were looking for could not be found. Return to the homepage or explore our cleaning services across Dubai." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink px-6 py-24 text-white">
        {/* Decorative brand accent shapes (simple, no canvas) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(244,110,87,0.18),transparent_45%),radial-gradient(circle_at_70%_70%,rgba(93,80,232,0.18),transparent_45%)]"
        />
        <svg
          aria-hidden="true"
          className="absolute left-1/2 top-1/3 h-40 w-40 -translate-x-1/2 opacity-10"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M20 80 Q50 10 80 80" className="text-mint" />
          <circle cx="50" cy="50" r="38" className="text-coral" />
        </svg>

        <div className="relative z-10 mx-auto max-w-xl text-center">
          <Eyebrow tone="coral" className="justify-center">
            <span className="inline-flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5" />
              Lost in the clean
            </span>
          </Eyebrow>

          <p className="section-numeral mt-6 text-[7rem] font-bold leading-none text-coral sm:text-[10rem]">
            404
          </p>

          <h1 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl">
            This page could not be found.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-white/70">
            The page you were looking for may have moved, been renamed, or never
            existed. Let us get you back to a cleaner space.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <PrimaryButton to="/" variant="coral" size="lg" withArrow>
              Back to homepage
            </PrimaryButton>
            <PrimaryButton to="/cleaning-services-dubai" variant="ghost" size="lg">
              Browse services
            </PrimaryButton>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/60">
            <Link to="/about-us" className="inline-flex items-center gap-1.5 transition hover:text-mint">
              <ArrowLeft className="h-3.5 w-3.5" /> About us
            </Link>
            <Link to="/pricing" className="transition hover:text-mint">Pricing</Link>
            <Link to="/contact-us" className="transition hover:text-mint">Contact</Link>
            <Link to="/blog" className="transition hover:text-mint">Blog</Link>
          </div>

          <p className="mt-12 inline-flex items-center gap-2 text-xs text-white/40">
            <HomeIcon className="h-3.5 w-3.5" />
            Byt Cleaning Services · Dubai
          </p>
        </div>
      </main>
    </>
  );
}
