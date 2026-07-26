import { Bot, Sparkles } from "lucide-react";

export default function AIAvatar({
  size = "md",
  showStatus = false,
  className = "",
}) {
  const sizeClasses = {
    sm: "h-8 w-8 rounded-xl",
    md: "h-11 w-11 rounded-2xl",
    lg: "h-14 w-14 rounded-[1.25rem]",
  };

  const iconClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  return (
    <span
      className={[
        "relative inline-flex shrink-0 items-center justify-center",
        "overflow-visible bg-gradient-to-br from-violet-500 via-crystal-500 to-cyan-500",
        "text-white shadow-lg shadow-crystal-500/20",
        sizeClasses[size] || sizeClasses.md,
        className,
      ].join(" ")}
      aria-hidden="true"
    >
      <span className="absolute inset-[2px] rounded-[inherit] bg-gradient-to-br from-gray-950 via-gray-900 to-crystal-950" />

      <span className="relative flex items-center justify-center">
        <Bot className={iconClasses[size] || iconClasses.md} />
        <Sparkles className="absolute -right-2 -top-2 h-3.5 w-3.5 text-cyan-200" />
      </span>

      {showStatus && (
        <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-gray-900 bg-emerald-400" />
      )}
    </span>
  );
}