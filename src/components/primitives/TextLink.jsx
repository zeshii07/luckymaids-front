import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/**
 * TextLink — tertiary text link with an optional directional arrow (guide §4).
 * Inline animated underline that never disappears on touch.
 */
export default function TextLink({
  children,
  to,
  href,
  withArrow = false,
  className = "",
  tone = "indigo",
  ...rest
}) {
  const tones = {
    indigo: "text-indigo hover:text-indigo-deep",
    coral: "text-coral hover:text-coral-deep",
    ink: "text-ink hover:text-indigo",
    white: "text-white hover:text-mint",
  };
  const classes = [
    "group inline-flex items-center gap-1.5 font-semibold underline-offset-4 transition-colors duration-[var(--motion-ui)]",
    "underline decoration-current/30 decoration-1 hover:decoration-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo rounded",
    tones[tone] || tones.indigo,
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
  return (
    <a href={href} className={classes} {...rest}>
      {inner}
    </a>
  );
}
