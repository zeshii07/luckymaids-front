import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  ExternalLink,
  Gem,
  Minus,
  RefreshCw,
  Sparkles,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

import AIAvatar from "./AIAvatar";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import SuggestedQuestions from "./SuggestedQuestions";
import { sendChatMessage } from "../../services/chatApi";

const WELCOME_MESSAGE = {
  id: "welcome",
  role: "assistant",
  content:
    "Hello! I’m the Lucky Crystal assistant. I can help with our cleaning services, service areas, quotations, and booking steps.",
  createdAt: new Date().toISOString(),
};

const ERROR_MESSAGE =
  "I’m having trouble connecting right now. Please try again or contact our team on WhatsApp.";

const WHATSAPP_URL =
  "https://wa.me/971552488588?text=Hello%20Lucky%20Crystal%20Maids%2C%20I%20need%20help%20with%20a%20cleaning%20service.";

function createMessage(role, content) {
  return {
    id:
      globalThis.crypto?.randomUUID?.() ||
      `${role}-${Date.now()}-${Math.random()}`,
    role,
    content,
    createdAt: new Date().toISOString(),
  };
}

export default function ChatBot() {
  const reducedMotion = useReducedMotion();
  const messagesEndRef = useRef(null);
  const requestControllerRef = useRef(null);
  const dragBoundaryRef = useRef(null);
  const wasDraggedRef = useRef(false);

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnreadReply, setHasUnreadReply] = useState(false);

  const scrollToLatestMessage = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "end",
    });
  }, [reducedMotion]);

  useEffect(() => {
    if (isOpen) {
      setHasUnreadReply(false);
      window.requestAnimationFrame(scrollToLatestMessage);
    }
  }, [isOpen, messages, scrollToLatestMessage]);

  useEffect(() => {
    return () => {
      requestControllerRef.current?.abort();
    };
  }, []);

  const sendMessage = async (content) => {
    if (!content.trim() || isLoading) return;

    const userMessage = createMessage("user", content.trim());

    const history = messages
      .filter((message) =>
        ["user", "assistant"].includes(message.role),
      )
      .map(({ role, content: messageContent }) => ({
        role,
        content: messageContent,
      }));

    setMessages((current) => [...current, userMessage]);
    setIsLoading(true);

    requestControllerRef.current?.abort();

    const controller = new AbortController();
    requestControllerRef.current = controller;

    try {
      const result = await sendChatMessage({
        message: userMessage.content,
        history,
        signal: controller.signal,
      });

      const assistantMessage = createMessage(
        "assistant",
        result.reply,
      );

      setMessages((current) => [
        ...current,
        assistantMessage,
      ]);

      if (!isOpen) {
        setHasUnreadReply(true);
      }
    } catch (error) {
      if (!controller.signal.aborted) {
        setMessages((current) => [
          ...current,
          createMessage(
            "assistant",
            error.message || ERROR_MESSAGE,
          ),
        ]);
      }
    } finally {
      if (requestControllerRef.current === controller) {
        requestControllerRef.current = null;
        setIsLoading(false);
      }
    }
  };

  const resetConversation = () => {
    requestControllerRef.current?.abort();
    requestControllerRef.current = null;

    setIsLoading(false);
    setMessages([
      {
        ...WELCOME_MESSAGE,
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  const toggleChat = () => {
    if (wasDraggedRef.current) {
      wasDraggedRef.current = false;
      return;
    }

    setIsOpen((open) => !open);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.section
            id="lucky-crystal-chatbot"
            initial={
              reducedMotion
                ? { opacity: 1 }
                : { opacity: 0, y: 20, scale: 0.97 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 16, scale: 0.97 }
            }
            transition={{
              duration: reducedMotion ? 0 : 0.22,
              ease: "easeOut",
            }}
            className="fixed bottom-28 right-4 z-[70] flex h-[min(680px,calc(100dvh-9rem))] w-[calc(100vw-2rem)] max-w-[390px] flex-col overflow-hidden rounded-[1.75rem] border border-gray-200/80 bg-gray-50 shadow-[0_28px_90px_-30px_rgba(15,23,42,0.55)] sm:bottom-32 sm:right-6"
            role="dialog"
            aria-modal="false"
            aria-label="Lucky Crystal customer assistant"
          >
            <header className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-crystal-900 px-4 py-4 text-white">
              <Sparkles className="absolute -right-4 -top-4 h-24 w-24 text-white/[0.04]" />

              <div className="relative flex items-center gap-3">
                <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-crystal-400 to-crystal-600 text-white shadow-lg shadow-crystal-500/20">
                  <Gem className="h-6 w-6" aria-hidden="true" />
                  <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-gray-900 bg-emerald-400" />
                </span>

                <div className="min-w-0 flex-1">
                  <h2 className="truncate font-display text-lg font-bold">
                    Lucky Crystal Assistant
                  </h2>
                  <p className="mt-0.5 text-xs text-gray-300">
                    Cleaning support and booking guidance
                  </p>
                </div>

                <button
                  type="button"
                  onClick={resetConversation}
                  disabled={isLoading}
                  aria-label="Start a new conversation"
                  title="New conversation"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-gray-200 transition hover:bg-white/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crystal-300 disabled:opacity-50"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Minimize chat"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-gray-200 transition hover:bg-white/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crystal-300"
                >
                  <Minus className="h-4 w-4" />
                </button>
              </div>
            </header>

            <div
              className="flex-1 space-y-5 overflow-y-auto px-4 py-5"
              aria-live="polite"
              aria-busy={isLoading}
            >
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                />
              ))}

              {messages.length === 1 && (
                <SuggestedQuestions
                  onSelect={sendMessage}
                  disabled={isLoading}
                />
              )}

              {isLoading && (
                <div className="flex items-end gap-2.5">
                  <AIAvatar size="sm" />

                  <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-gray-100 bg-white px-4 py-4 shadow-sm">
                    {[0, 1, 2].map((dot) => (
                      <motion.span
                        key={dot}
                        className="h-1.5 w-1.5 rounded-full bg-crystal-500"
                        animate={
                          reducedMotion
                            ? undefined
                            : {
                                y: [0, -4, 0],
                                opacity: [0.45, 1, 0.45],
                              }
                        }
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          delay: dot * 0.12,
                        }}
                      />
                    ))}

                    <span className="sr-only">
                      Assistant is typing
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-gray-100 bg-white px-4 py-3">
              <div className="flex items-center justify-between gap-3 text-[11px]">
                <Link
                  to="/quote"
                  onClick={() => setIsOpen(false)}
                  className="font-bold text-crystal-700 transition hover:text-crystal-800"
                >
                  Request a quote
                </Link>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-gray-500 transition hover:text-gray-800"
                >
                  Human support
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>

            <ChatInput
              onSend={sendMessage}
              disabled={isLoading}
            />

            <p className="bg-white px-4 pb-3 text-center text-[9px] leading-4 text-gray-400">
              Automated answers may be incomplete. Confirm prices
              and availability with our team.
            </p>
          </motion.section>
        )}
      </AnimatePresence>

      <div
        ref={dragBoundaryRef}
        className="pointer-events-none fixed inset-3 z-[71]"
        aria-hidden="false"
      >
        <motion.div
          drag
          dragConstraints={dragBoundaryRef}
          dragElastic={0.04}
          dragMomentum={false}
          onDragStart={() => {
            wasDraggedRef.current = true;
          }}
          onDragEnd={() => {
            window.setTimeout(() => {
              wasDraggedRef.current = false;
            }, 80);
          }}
          className="pointer-events-auto absolute bottom-24 right-1 cursor-grab touch-none active:cursor-grabbing sm:bottom-28 sm:right-3"
          title="Drag to move the AI assistant"
        >
          <motion.button
            type="button"
            onClick={toggleChat}
            whileHover={
              reducedMotion ? undefined : { scale: 1.025 }
            }
            whileTap={
              reducedMotion ? undefined : { scale: 0.98 }
            }
            aria-expanded={isOpen}
            aria-controls="lucky-crystal-chatbot"
            aria-label={
              isOpen
                ? "Close customer assistant"
                : "Open customer assistant"
            }
            className="group flex items-center gap-2.5 rounded-2xl border border-gray-800 bg-gray-950 p-1.5 pr-4 text-white shadow-[0_18px_45px_-15px_rgba(13,148,136,0.8)] transition hover:border-crystal-500/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crystal-500 focus-visible:ring-offset-2"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isOpen ? "close" : "avatar"}
                initial={
                  reducedMotion
                    ? false
                    : {
                        opacity: 0,
                        rotate: -20,
                        scale: 0.7,
                      }
                }
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={
                  reducedMotion
                    ? { opacity: 0 }
                    : {
                        opacity: 0,
                        rotate: 20,
                        scale: 0.7,
                      }
                }
                transition={{
                  duration: reducedMotion ? 0 : 0.15,
                }}
                className="flex h-12 w-12 shrink-0 items-center justify-center"
              >
                {isOpen ? (
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-crystal-600">
                    <X className="h-5 w-5" />
                  </span>
                ) : (
                  <AIAvatar
                    size="md"
                    showStatus
                    className="h-12 w-12 rounded-xl shadow-none"
                  />
                )}
              </motion.span>
            </AnimatePresence>

            <span className="min-w-0 text-left">
              <span className="block whitespace-nowrap text-xs font-bold text-white">
                Chat with our AI assistant
              </span>
              <span className="mt-0.5 block whitespace-nowrap text-[10px] font-medium text-gray-400">
                Drag me anywhere
              </span>
            </span>

            {hasUnreadReply && !isOpen && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-rose-500 px-1 text-[10px] font-bold text-white">
                1
              </span>
            )}
          </motion.button>
        </motion.div>
      </div>
    </>
  );
}