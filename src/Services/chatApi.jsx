const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "https://lucky-backend-woad.vercel.app"
).replace(/\/$/, "");

const CHAT_ENDPOINT = `${API_BASE_URL}/api/chat`;
const REQUEST_TIMEOUT = 30000;

export async function sendChatMessage({ message, history = [], signal }) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT);
  const abortRequest = () => controller.abort();

  if (signal) {
    if (signal.aborted) abortRequest();
    else signal.addEventListener("abort", abortRequest, { once: true });
  }

  try {
    const response = await fetch(CHAT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        history: history.slice(-10).map(({ role, content }) => ({ role, content })),
      }),
      signal: controller.signal,
    });

    const payload = await response.json().catch(() => null);

    if (!response.ok) {
      const error = new Error(
        payload?.message || payload?.error || "The assistant could not respond.",
      );
      error.status = response.status;
      throw error;
    }

    if (!payload?.reply || typeof payload.reply !== "string") {
      throw new Error("The assistant returned an invalid response.");
    }

    return { reply: payload.reply.trim() };
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("The request took too long. Please try again.");
    }
    throw error;
  } finally {
    window.clearTimeout(timeoutId);
    if (signal) signal.removeEventListener("abort", abortRequest);
  }
}
