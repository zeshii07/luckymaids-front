import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/**
 * PrimaryButton — the single primary CTA component (guide §3.1 + §4).
 *
 * Variants:
 *   - "coral"  : warm attention colour, primary conversion CTA (default)
 *   - "violet"  : energetic primary, alternative accent CTA
 *   - "ink"     : deep anchor, used on light surfaces for strong CTAs
 *   - "outline" : secondary indigo outline action
 *   - "ghost"   : tertiary text-link affordance on dark surfaces
 *
 * Uses motion tokens (--motion-ui 200ms). Renders as <Link> when `to` is set,
 * otherwise as <button>.
 */
const VARIANTS = {
  coral: "bg-coral text-ink hover:bg-coral-deep shadow-lg shadow-coral/25",
  violet: "bg-indigo text-white hover:bg-indigo-deep shadow-lg shadow-indigo/25",
  ink: "bg-ink text-white hover:bg-ink-soft shadow-lg shadow-ink/25",
  outline:
    "border border-indigo/40 bg-white text-indigo hover:border-indigo hover:bg-indigo-soft",
  ghost:
    "border border-white/25 bg-white/10 text-white backdrop-blur hover:bg-white/20",
};

export default function PrimaryButton({
  children,
  to,
  href,
  variant = "coral",
  size = "md",
  withArrow = false,
  className = "",
  ...rest
}) {
  const sizes = {
    sm: "px-5 py-2.5 text-sm",
    md: "px-7 py-3.5 text-sm",
    lg: "px-8 py-4 text-base",
  };
  const classes = [
    "group inline-flex items-center justify-center gap-2 rounded-full font-bold tracking-tight",
    "transition duration-[var(--motion-ui)] ease-[var(--ease-standard)]",
    "hover:-translate-y-0.5 active:translate-y-0",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    variant === "coral" || variant === "violet" || variant === "ink"
      ? "focus-visible:ring-current"
      : "focus-visible:ring-indigo",
    VARIANTS[variant] || VARIANTS.coral,
    sizes[size] || sizes.md,
    className,
  ].join(" ");

  const inner = (
    <>
      {children}
      {withArrow && (
        <ArrowRight className="h-4 w-4 transition-transform duration-[var(--motion-ui)] group-hover:translate-x-1" />
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {inner}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {inner}
      </a>
    );
  }
  return (
    <button type="button" className={classes} {...rest}>
      {inner}
    </button>
  );
}
