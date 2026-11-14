/**
 * SectionContainer — page section wrapper (guide §2 Shape language).
 *
 *   - 1200–1320px max content width
 *   - 88–128px desktop / 56–80px mobile vertical rhythm
 *   - optional `tone` switches background between paper / white / mint / ink
 *   - optional `numeral` shows the large section number (signature element)
 */
export default function SectionContainer({
  children,
  tone = "paper",
  numeral,
  className = "",
  id,
  as: Tag = "section",
}) {
  const tones = {
    paper: "bg-paper text-ink",
    white: "bg-white text-ink",
    mint: "bg-mint-soft text-ink",
    ink: "bg-ink text-white",
    violet: "bg-indigo text-white",
  };
  const padY =
    "py-16 sm:py-24 lg:py-28";
  return (
    <Tag
      id={id}
      className={`relative ${padY} ${tones[tone] || tones.paper} ${className}`}
    >
      <div className="container mx-auto max-w-[1320px] px-6 sm:px-8">
        {numeral != null && (
          <span
            aria-hidden="true"
            className="section-numeral pointer-events-none absolute right-6 top-8 select-none text-[6rem] leading-none text-current opacity-[0.05] sm:text-[9rem] lg:right-12 lg:text-[12rem]"
          >
            {String(numeral).padStart(2, "0")}
          </span>
        )}
        {children}
      </div>
    </Tag>
  );
}
