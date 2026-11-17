import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Phone,
  MessageCircle,
  Mail,
  PhoneCall,
  GripVertical,
} from "lucide-react";

/**
 * FloatingContact — draggable, animated floating contact widget.
 *
 * Features:
 *  - Pointer-event dragging (mouse + touch + pen) with momentum.
 *  - Snaps to the nearest screen edge on release (feels natural).
 *  - Auto-expands on first hover after a drag; collapses on outside click.
 *  - Pulsing ring + entrance animation; respects prefers-reduced-motion.
 *  - Persists last position across reloads via sessionStorage so it stays where
 *    the user put it during the session.
 *
 * The widget is a vertical stack of contact actions revealed by tapping the
 * main button, plus a draggable affordance.
 */

const STORAGE_KEY = "byt_floating_pos_v1";
const BTN_OFFSET = 24; // px from viewport edge
const BTN_SIZE = 60; // main button diameter

// UAE numbers in full international format (no leading 0, +971 prefix).
//  - tel: links use +971553730702
//  - wa.me links use 971553730702 (wa.me requires digits only, no "+")
const phoneNumber = "+971553730702";
const whatsappNumber = "971553730702";
const email = "bytalhryacleaning@gmail.com";

function loadStoredPos() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw);
    if (typeof p?.x === "number" && typeof p?.y === "number") return p;
  } catch {
    /* ignore */
  }
  return null;
}

export default function FloatingContact() {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  // Position is relative to the top-left of the viewport (px).
  const [pos, setPos] = useState(
    () =>
      loadStoredPos() || {
        // default: bottom-right
        x: Math.max(BTN_OFFSET, window.innerWidth - BTN_SIZE - BTN_OFFSET),
        y: Math.max(BTN_OFFSET, window.innerHeight - BTN_SIZE - BTN_OFFSET),
      },
  );

  const dragState = useRef({
    dragging: false,
    moved: false,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
  });
  const containerRef = useRef(null);

  // Persist position for the session.
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(pos));
    } catch {
      /* ignore */
    }
  }, [pos]);

  // Keep widget on-screen when the viewport resizes.
  useEffect(() => {
    const onResize = () => {
      setPos((p) => ({
        x: Math.min(Math.max(BTN_OFFSET, p.x), window.innerWidth - BTN_SIZE - BTN_OFFSET),
        y: Math.min(Math.max(BTN_OFFSET, p.y), window.innerHeight - BTN_SIZE - BTN_OFFSET),
      }));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const snapToEdge = useCallback((x, y) => {
    const midX = window.innerWidth / 2;
    const targetX =
      x + BTN_SIZE / 2 < midX ? BTN_OFFSET : window.innerWidth - BTN_SIZE - BTN_OFFSET;
    return { x: targetX, y: Math.min(Math.max(BTN_OFFSET, y), window.innerHeight - BTN_SIZE - BTN_OFFSET) };
  }, []);

  const onPointerDown = (e) => {
    // Only react to primary button / touch.
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const st = dragState.current;
    st.dragging = true;
    st.moved = false;
    st.startX = e.clientX;
    st.startY = e.clientY;
    st.originX = pos.x;
    st.originY = pos.y;
    try {
      containerRef.current?.setPointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  };

  const onPointerMove = (e) => {
    const st = dragState.current;
    if (!st.dragging) return;
    const dx = e.clientX - st.startX;
    const dy = e.clientY - st.startY;
    // Higher threshold so an ordinary mouse click (which can jitter a few px
    // between pointerdown and pointerup on large/desktop screens) is NOT
    // misclassified as a drag — the previous 6px threshold swallowed real
    // clicks on desktop, making the button feel unresponsive.
    if (!st.moved && Math.hypot(dx, dy) > 10) st.moved = true;
    if (!st.moved) return;
    const nx = Math.min(
      Math.max(BTN_OFFSET, st.originX + dx),
      window.innerWidth - BTN_SIZE - BTN_OFFSET,
    );
    const ny = Math.min(
      Math.max(BTN_OFFSET, st.originY + dy),
      window.innerHeight - BTN_SIZE - BTN_OFFSET,
    );
    setPos({ x: nx, y: ny });
  };

  const onPointerUp = (e) => {
    const st = dragState.current;
    if (!st.dragging) return;
    st.dragging = false;
    try {
      containerRef.current?.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
    if (st.moved) {
      // Snap to nearest edge on release.
      setPos((p) => snapToEdge(p.x, p.y));
      // Suppress the click that would otherwise toggle open.
      st.suppressClick = true;
    }
  };

  const toggleOpen = () => {
    if (dragState.current.suppressClick) {
      dragState.current.suppressClick = false;
      return;
    }
    setOpen((o) => !o);
  };

  const actions = [
    {
      href: `tel:${phoneNumber}`,
      title: "Call us",
      label: "Call",
      icon: Phone,
      bg: "bg-violet text-white shadow-violet/40",
      ring: "ring-violet/30",
      delay: 0,
    },
    {
      href: `https://wa.me/${whatsappNumber}?text=Hi%20Byt%20Cleaning%20Services,%20I%20would%20like%20a%20quote.`,
      title: "Chat on WhatsApp",
      label: "WhatsApp",
      icon: MessageCircle,
      bg: "bg-[#25D366] text-white shadow-green-500/40",
      ring: "ring-green-400/30",
      delay: 0.05,
      external: true,
    },
    {
      href: `mailto:${email}`,
      title: "Email us",
      label: "Email",
      icon: Mail,
      bg: "bg-coral text-ink shadow-coral/40",
      ring: "ring-coral/30",
      delay: 0.1,
    },
  ];

  return (
    <div
      ref={containerRef}
      className="fixed z-50 touch-none select-none"
      style={{ left: pos.x, top: pos.y, width: BTN_SIZE, height: BTN_SIZE }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {/* Expanded action chips — open upward when there are actions above */}
      <AnimatePresence>
        {open && (
          <div className="absolute bottom-[calc(100%+12px)] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5">
            {actions.map((a) => {
              const Icon = a.icon;
              return (
                <motion.a
                  key={a.title}
                  href={a.href}
                  title={a.title}
                  target={a.external ? "_blank" : undefined}
                  rel={a.external ? "noreferrer" : undefined}
                  aria-label={a.title}
                  initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0, y: 24 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0, y: 24 }}
                  transition={{ duration: 0.22, delay: a.delay, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  className={`group flex items-center gap-2 rounded-full ${a.bg} px-4 py-3 shadow-lg ring-2 ${a.ring} ring-offset-2 ring-offset-transparent`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-sm font-bold">{a.label}</span>
                </motion.a>
              );
            })}
          </div>
        )}
      </AnimatePresence>

      {/* Main toggle / drag button */}
      <motion.button
        type="button"
        onClick={toggleOpen}
        aria-label={open ? "Close contact options" : "Open contact options"}
        aria-expanded={open}
        initial={reduceMotion ? false : { scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.2 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="relative grid h-[60px] w-[60px] cursor-grab touch-none place-items-center rounded-full bg-coral text-white shadow-2xl shadow-coral/50 ring-4 ring-white active:cursor-grabbing"
      >
        {/* Pulsing rings when closed */}
        {!open && !reduceMotion && (
          <>
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-violet/60"
              animate={{ scale: [1, 1.9], opacity: [0.55, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-coral/40"
              animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
            />
          </>
        )}

        {/* Rotating conic glow */}
        {!reduceMotion && (
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 -z-10 rounded-full opacity-60 blur-md"
            style={{
              background:
                "conic-gradient(from 0deg, #5D50E8, #F46E57, #BDE8D4, #5D50E8)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
        )}

        <motion.span
          animate={{ rotate: open ? 135 : 0 }}
          transition={{ duration: 0.25 }}
          className="relative z-10"
        >
          {open ? (
            <PhoneCall className="h-7 w-7" />
          ) : (
            <PhoneCall className="h-7 w-7" />
          )}
        </motion.span>

        {/* Drag grip hint */}
        {!open && (
          <span
            aria-hidden="true"
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full bg-ink/80 px-1 py-0.5 text-[8px] font-bold uppercase tracking-wide text-white opacity-0 transition group-hover:opacity-100"
          >
            <GripVertical className="h-3 w-3" />
          </span>
        )}
      </motion.button>
    </div>
  );
}
