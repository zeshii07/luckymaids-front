/**
 * Eyebrow — small uppercase context label (blueprint §03 Typography).
 *
 * Spec: 11–13 px uppercase sparingly; used for section index, category,
 * location and small context labels. Syne display weight, 0.14em tracking.
 *
 * Color defaults to coral (brand emphasis on light surfaces). Pass `tone`
 * for indigo / mint / ink variants.
 */
export default function Eyebrow({
  children,
  as: Tag = "p",
  tone = "coral",
  className = "",
  ...rest
}) {
  const tones = {
    coral: "text-coral",
    indigo: "text-indigo",
    mint: "text-mint-deep",
    ink: "text-ink-muted",
    white: "text-white/70",
  };
  return (
    <Tag
      className={`text-[12px] font-bold uppercase tracking-[0.18em] ${tones[tone] || tones.coral} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
