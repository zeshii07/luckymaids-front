import { useCallback, useEffect, useRef, useState } from "react";
import { GripVertical } from "lucide-react";

/**
 * BeforeAfterSlider — accessible before/after comparison (guide §3.4 + §4).
 *
 *   - Draggable divider with keyboard controls (←/→ arrows, Home/End).
 *   - Both images labelled. Position stored as percentage 0-100.
 *   - Works with pointer drag and touch.
 *
 * Use ONLY for genuine, honest before/after pairs.
 *
 * Props:
 *   before: { src, alt, label }
 *   after:  { src, alt, label }
 *   initial?: number (0-100, default 50)
 */
export default function BeforeAfterSlider({
  before,
  after,
  initial = 50,
  className = "",
}) {
  const [pos, setPos] = useState(initial);
  const containerRef = useRef(null);

  const updateFromClientX = useCallback((clientX) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, pct)));
  }, []);

  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPos((p) => Math.max(0, p - 4));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPos((p) => Math.min(100, p + 4));
    } else if (e.key === "Home") {
      e.preventDefault();
      setPos(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setPos(100);
    }
  };

  // Pointer drag support (mouse + touch) without external libs.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let dragging = false;
    const start = (e) => {
      dragging = true;
      updateFromClientX(e.touches ? e.touches[0].clientX : e.clientX);
    };
    const move = (e) => {
      if (!dragging) return;
      updateFromClientX(e.touches ? e.touches[0].clientX : e.clientX);
    };
    const end = () => {
      dragging = false;
    };
    el.addEventListener("mousedown", start);
    el.addEventListener("touchstart", start, { passive: true });
    window.addEventListener("mousemove", move);
    window.addEventListener("touchmove", move, { passive: true });
    window.addEventListener("mouseup", end);
    window.addEventListener("touchend", end);
    return () => {
      el.removeEventListener("mousedown", start);
      el.removeEventListener("touchstart", start);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("mouseup", end);
      window.removeEventListener("touchend", end);
    };
  }, [updateFromClientX]);

  return (
    <div
      ref={containerRef}
      className={`relative aspect-[16/10] w-full select-none overflow-hidden rounded-[var(--radius-image)] border border-[var(--line)] ${className}`}
    >
      {/* After image (full) */}
      <img
        src={after.src}
        alt={after.alt}
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <span className="absolute right-3 top-3 rounded-full bg-ink/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
        {after.label || "After"}
      </span>

      {/* Before image (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${pos}%` }}
      >
        <img
          src={before.src}
          alt={before.alt}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ width: `${100 / (pos / 100)}%`, maxWidth: "none" }}
          loading="lazy"
        />
        <span className="absolute left-3 top-3 rounded-full bg-indigo/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
          {before.label || "Before"}
        </span>
      </div>

      {/* Divider handle */}
      <button
        type="button"
        role="slider"
        aria-label="Reveal more of the after image"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        onKeyDown={onKeyDown}
        className="absolute top-0 bottom-0 flex w-10 -translate-x-1/2 cursor-ew-resize items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo"
        style={{ left: `${pos}%` }}
      >
        <span className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgba(23,36,50,0.15)]" />
        <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white text-indigo shadow-lg">
          <GripVertical className="h-5 w-5" />
        </span>
      </button>
    </div>
  );
}
