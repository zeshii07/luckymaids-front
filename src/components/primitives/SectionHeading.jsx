import Eyebrow from "./Eyebrow";

/**
 * SectionHeading — consistent section hierarchy (blueprint §04 + §13).
 *
 * Keeps eyebrow + H2 + optional paragraph + optional action, aligned left
 * or center. Composes with Reveal at the section level for entrance.
 *
 * Typography: H2 34–44 px desktop / 28–34 px mobile, Manrope display weight.
 */
export default function SectionHeading({
  eyebrow,
  title,
  titleAs: Title = "h2",
  paragraph,
  action,
  align = "left",
  tone = "coral",
  className = "",
}) {
  const alignClass =
    align === "center" ? "text-center mx-auto" : "text-left";
  const isCenter = align === "center";
  return (
    <div className={`max-w-2xl ${alignClass} ${className}`}>
      {eyebrow && (
        <Eyebrow tone={tone} className={isCenter ? "justify-center" : ""}>
          {eyebrow}
        </Eyebrow>
      )}
      <Title className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        {title}
      </Title>
      {paragraph && (
        <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
          {paragraph}
        </p>
      )}
      {action && (
        <div className={`mt-6 ${isCenter ? "flex justify-center" : ""}`}>
          {action}
        </div>
      )}
    </div>
  );
}
