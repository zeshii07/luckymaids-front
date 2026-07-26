import { motion, useReducedMotion } from "framer-motion";
import { Gem, Sparkles } from "lucide-react";

export default function PageLoader({
  message = "Preparing your page",
  fullScreen = true,
}) {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className={[
        "flex items-center justify-center bg-white/95 backdrop-blur-xl",
        fullScreen ? "fixed inset-0 z-[100]" : "min-h-[420px] w-full",
      ].join(" ")}
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      <div className="relative flex flex-col items-center px-6 text-center">
        <div className="relative flex h-24 w-24 items-center justify-center">
          {!reducedMotion && (
            <>
              <motion.span
                className="absolute inset-0 rounded-[2rem] border border-crystal-200"
                animate={{ scale: [0.85, 1.18, 0.85], opacity: [0.8, 0, 0.8] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.span
                className="absolute inset-2 rounded-[1.6rem] border border-crystal-300/70"
                animate={{ scale: [0.9, 1.12, 0.9], opacity: [0.7, 0.1, 0.7] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
              />
            </>
          )}

          <motion.div
            className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-crystal-400 to-crystal-700 text-white shadow-xl shadow-crystal-500/25"
            animate={reducedMotion ? undefined : { y: [0, -5, 0], rotate: [0, 2, -2, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Gem className="h-8 w-8" aria-hidden="true" />

            {!reducedMotion && (
              <motion.span
                className="absolute -left-10 top-0 h-full w-7 rotate-12 bg-white/35 blur-sm"
                animate={{ x: [0, 110] }}
                transition={{ duration: 1.35, repeat: Infinity, repeatDelay: 0.35, ease: "easeInOut" }}
              />
            )}
          </motion.div>

          {!reducedMotion && (
            <>
              <motion.span
                className="absolute -right-1 top-1 text-crystal-500"
                animate={{ scale: [0.6, 1.1, 0.6], opacity: [0.3, 1, 0.3], rotate: [0, 15, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles className="h-5 w-5" aria-hidden="true" />
              </motion.span>

              <motion.span
                className="absolute bottom-2 left-0 h-2.5 w-2.5 rounded-full bg-crystal-300"
                animate={{ y: [0, -8, 0], opacity: [0.35, 1, 0.35] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: 0.25 }}
              />
            </>
          )}
        </div>

        <p className="mt-6 font-display text-xl font-bold text-gray-900">
          Lucky Crystal Maids
        </p>
        <p className="mt-2 text-sm font-medium text-gray-500">{message}</p>

        <div className="mt-5 h-1.5 w-44 overflow-hidden rounded-full bg-gray-100">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-crystal-400 via-crystal-500 to-crystal-700"
            animate={
              reducedMotion
                ? { width: "65%" }
                : { x: ["-100%", "180%"], width: ["35%", "65%", "35%"] }
            }
            transition={{ duration: 1.25, repeat: reducedMotion ? 0 : Infinity, ease: "easeInOut" }}
          />
        </div>

        <span className="sr-only">{message}</span>
      </div>
    </div>
  );
}