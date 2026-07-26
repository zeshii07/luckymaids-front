import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLocation } from "react-router-dom";
import PageLoader from "./PageLoader";

export default function RouteLoader({ minimumDuration = 350 }) {
  const location = useLocation();
  const reducedMotion = useReducedMotion();
  const firstRender = useRef(true);
  const timeoutRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return undefined;
    }

    setLoading(true);

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setLoading(false);
    }, reducedMotion ? 0 : minimumDuration);

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [location.pathname, location.search, minimumDuration, reducedMotion]);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key={`${location.pathname}${location.search}`}
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.18 }}
        >
          <PageLoader message="Loading your page" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}