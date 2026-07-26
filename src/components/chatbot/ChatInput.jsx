import { useRef, useState } from "react";
import { SendHorizontal } from "lucide-react";

const MAX_MESSAGE_LENGTH = 800;

export default function ChatInput({ onSend, disabled = false }) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);
  const trimmedMessage = message.trim();
  const canSend = trimmedMessage.length > 0 && !disabled;

  const submitMessage = () => {
    if (!canSend) return;
    onSend(trimmedMessage);
    setMessage("");

    window.requestAnimationFrame(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.focus();
      }
    });
  };

  const handleChange = (event) => {
    const nextValue = event.target.value.slice(0, MAX_MESSAGE_LENGTH);
    setMessage(nextValue);
    event.target.style.height = "auto";
    event.target.style.height = `${Math.min(event.target.scrollHeight, 120)}px`;
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      submitMessage();
    }
  };

  return (
    <div className="border-t border-gray-100 bg-white p-3.5">
      <div className="flex items-end gap-2 rounded-2xl border border-gray-200 bg-gray-50 p-2 transition focus-within:border-crystal-300 focus-within:bg-white focus-within:ring-2 focus-within:ring-crystal-100">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          rows={1}
          maxLength={MAX_MESSAGE_LENGTH}
          placeholder="Ask about cleaning services..."
          aria-label="Message Lucky Crystal assistant"
          className="max-h-[120px] min-h-[42px] flex-1 resize-none bg-transparent px-2 py-2.5 text-sm leading-5 text-gray-900 outline-none placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-60"
        />

        <button
          type="button"
          onClick={submitMessage}
          disabled={!canSend}
          aria-label="Send message"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-crystal-600 text-white shadow-sm transition hover:bg-crystal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crystal-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          <SendHorizontal className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-2 flex items-center justify-between gap-3 px-1 text-[10px] text-gray-400">
        <span>Enter to send · Shift + Enter for a new line</span>
        <span>{message.length}/{MAX_MESSAGE_LENGTH}</span>
      </div>
    </div>
  );
}