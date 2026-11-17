import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";
import logo from "../assets/byt-logo.jpeg";

/**
 * AppLoader — full-screen initial loading animation shown on first app mount.
 *
 * Why this exists (and why it is NOT a per-route loader):
 *  - The previous per-route `<RouteLoader minimumDuration={350} />` overlay sat
 *    on top of every route transition. On hosts that gate requests with a JS
 *    challenge (e.g. InfinityFree's AES anti-bot), the route swap + overlay
 *    flash produced a visible "blank then loader then content" stutter that
 *    looked like the app was broken.
 *  - This loader only shows ONCE per full page load (a real reload / first
 *    visit), then fades out the moment React has mounted the first route. It
 *    does not interfere with client-side SPA navigation afterwards, so the
 *    eager-import blank-page fix stays intact.
 *
 * Behaviour:
 *  - Renders immediately (synchronous, no suspense) so there is never a flash
 *    of unstyled/empty content before React hydrates.
 *  - Hides after `minVisibleMs` (default 600ms) AND after the document has
 *    finished loading, whichever is later — guarantees the animation is
 *    actually seen, but never lingers longer than needed.
 *  - Respects prefers-reduced-motion (static logo, no spin).
 */
export default function AppLoader({ minVisibleMs = 600 }) {
  const reduceMotion = useReducedMotion();
  const [done, setDone] = useState(false);

  useEffect(() => {
    let raf1;
    let raf2;
    const start = performance.now();

    const hide = () => {
      const elapsed = performance.now() - start;
      const remaining = Math.max(0, minVisibleMs - elapsed);
      // Defer the hide so the spinner is visible for at least minVisibleMs.
      raf2 = window.setTimeout(() => setDone(true), remaining);
    };

    // If the document is already loaded (cached visit), schedule the hide on
    // the next frame. Otherwise wait for the window load event.
    if (document.readyState === "complete") {
      raf1 = window.requestAnimationFrame(hide);
    } else {
      window.addEventListener("load", hide, { once: true });
      // Safety net: never wait longer than 2.5s for the load event.
      raf2 = window.setTimeout(hide, 2500);
    }

    return () => {
      if (raf1) cancelAnimationFrame(raf1);
      if (raf2) clearTimeout(raf2);
      window.removeEventListener("load", hide);
    };
  }, [minVisibleMs]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="app-loader"
          role="status"
          aria-live="polite"
          aria-label="Loading Byt Cleaning Services"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-gradient-to-br from-violet-soft via-paper to-mint-soft"
        >
          {/* Ambient glow blobs */}
          {!reduceMotion && (
            <>
              <motion.span
                aria-hidden="true"
                className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-violet/25 blur-3xl"
                animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.span
                aria-hidden="true"
                className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-coral/25 blur-3xl"
                animate={{ x: [0, -25, 0], y: [0, 25, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              />
            </>
          )}

          <div className="relative flex flex-col items-center px-6 text-center">
            <div className="relative flex h-28 w-28 items-center justify-center">
              {!reduceMotion && (
                <>
                  <motion.span
                    className="absolute inset-0 rounded-[2rem] border-2 border-violet/30"
                    animate={{ scale: [0.85, 1.2, 0.85], opacity: [0.8, 0, 0.8] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.span
                    className="absolute inset-3 rounded-[1.7rem] border-2 border-mint/70"
                    animate={{ scale: [0.9, 1.14, 0.9], opacity: [0.7, 0.1, 0.7] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                  />
                  <motion.span
                    className="absolute inset-6 rounded-[1.4rem] border-2 border-coral/60"
                    animate={{ scale: [0.95, 1.08, 0.95], opacity: [0.6, 0.1, 0.6] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                  />
                </>
              )}

              <motion.div
                className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-violet to-indigo-deep shadow-xl shadow-violet/30 ring-2 ring-white/40"
                animate={
                  reduceMotion
                    ? undefined
                    : { y: [0, -6, 0], rotate: [0, 3, -3, 0] }
                }
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              >
                <img
                  src={logo}
                  alt="Byt Cleaning Services logo"
                  className="h-full w-full object-cover"
                  width="64"
                  height="64"
                />

                {!reduceMotion && (
                  <motion.span
                    className="absolute -left-10 top-0 h-full w-7 rotate-12 bg-white/40 blur-sm"
                    animate={{ x: [0, 120] }}
                    transition={{
                      duration: 1.35,
                      repeat: Infinity,
                      repeatDelay: 0.4,
                      ease: "easeInOut",
                    }}
                  />
                )}
              </motion.div>
            </div>

            <motion.p
              className="mt-6 font-display text-lg font-black tracking-tight text-ink"
              animate={reduceMotion ? undefined : { opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            >
              Byt Cleaning Services
            </motion.p>

            <div className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-ink-muted">
              <Sparkles className="h-4 w-4 text-coral" />
              <span>Sparkling clean, on the way</span>
              {!reduceMotion && (
                <motion.span
                  aria-hidden="true"
                  className="inline-flex"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="px-0.5">.</span>
                  <span className="px-0.5">.</span>
                  <span className="px-0.5">.</span>
                </motion.span>
              )}
            </div>

            {/* Progress bar */}
            <div className="mt-5 h-1.5 w-44 overflow-hidden rounded-full bg-ink/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-violet via-coral to-mint-deep"
                initial={{ width: "0%" }}
                animate={{ width: reduceMotion ? "100%" : ["0%", "70%", "90%", "98%"] }}
                transition={
                  reduceMotion
                    ? { duration: 0.3 }
                    : { duration: 2, times: [0, 0.4, 0.8, 1], repeat: Infinity, ease: "easeInOut" }
                }
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
