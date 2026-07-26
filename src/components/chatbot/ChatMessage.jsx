import { UserRound } from "lucide-react";
import AIAvatar from "./AIAvatar";

function renderMessageContent(content) {
  return content.split("\n").map((line, index) => {
    const trimmedLine = line.trim();
    const isBullet =
      trimmedLine.startsWith("• ") ||
      trimmedLine.startsWith("- ");

    if (isBullet) {
      return (
        <div key={`${trimmedLine}-${index}`} className="flex gap-2">
          <span aria-hidden="true">•</span>
          <span>{trimmedLine.slice(2)}</span>
        </div>
      );
    }

    return trimmedLine ? (
      <p key={`${trimmedLine}-${index}`}>{trimmedLine}</p>
    ) : (
      <span
        key={`break-${index}`}
        className="block h-2"
        aria-hidden="true"
      />
    );
  });
}

export default function ChatMessage({ message }) {
  const isAssistant = message.role === "assistant";

  return (
    <div
      className={[
        "flex items-end gap-2.5",
        isAssistant ? "justify-start" : "justify-end",
      ].join(" ")}
    >
      {isAssistant && <AIAvatar size="sm" />}

      <div
        className={[
          "max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm",
          isAssistant
            ? "rounded-bl-md border border-gray-100 bg-white text-gray-700"
            : "rounded-br-md bg-crystal-600 text-white",
        ].join(" ")}
      >
        <div className="space-y-1">
          {renderMessageContent(message.content)}
        </div>

        {message.createdAt && (
          <time
            dateTime={message.createdAt}
            className={[
              "mt-2 block text-[10px]",
              isAssistant ? "text-gray-400" : "text-crystal-100",
            ].join(" ")}
          >
            {new Intl.DateTimeFormat("en-AE", {
              hour: "numeric",
              minute: "2-digit",
            }).format(new Date(message.createdAt))}
          </time>
        )}
      </div>

      {!isAssistant && (
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gray-900 text-white shadow-sm">
          <UserRound className="h-4 w-4" aria-hidden="true" />
        </span>
      )}
    </div>
  );
}
