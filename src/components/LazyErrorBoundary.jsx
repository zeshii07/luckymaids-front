import { Component } from "react";

/**
 * LazyErrorBoundary — catches errors thrown by lazy/Suspense chunk imports.
 *
 * The #1 cause of "navigate to a page → blank, refresh → loads" is a stale
 * chunk: after a redeploy the browser's cached index.html references JS chunk
 * hashes that no longer exist on the server, so the dynamic `import()` rejects
 * with "Failed to fetch dynamically imported module". Suspense turns that into
 * a blank screen. This boundary detects that specific failure and reloads the
 * page once so the fresh index.html + chunks are fetched.
 *
 * Also guards against infinite reload loops via a session counter.
 */
const RELOAD_KEY = "byt_lazy_reload_count";
const MAX_RELOADS = 1;

function isChunkLoadError(error) {
  if (!error) return false;
  const msg = String(error?.message || error);
  return (
    msg.includes("Failed to fetch dynamically imported module") ||
    msg.includes("Importing a module script failed") ||
    msg.includes("error loading dynamically imported module") ||
    msg.includes("Unable to preload CSS") ||
    // Firefox variant
    msg.includes("error loading dynamically imported module") ||
    /Loading chunk \S+ failed/.test(msg) ||
    /Loading CSS chunk \S+ failed/.test(msg)
  );
}

export default class LazyErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // eslint-disable-next-line no-console
    console.error("[LazyErrorBoundary] render error:", error, errorInfo);
    if (isChunkLoadError(error)) {
      try {
        const count = Number(sessionStorage.getItem(RELOAD_KEY) || "0");
        if (count < MAX_RELOADS) {
          sessionStorage.setItem(RELOAD_KEY, String(count + 1));
          // Hard reload to pull the fresh index.html + chunks.
          window.location.reload();
          return;
        }
      } catch {
        // sessionStorage may be unavailable (private mode) — fall through to UI.
      }
    }
    // Non-chunk error (or exhausted retries): surface a friendly fallback.
    // eslint-disable-next-line no-console
    console.error("Page load error:", error);
  }

  handleManualReload = () => {
    try {
      sessionStorage.removeItem(RELOAD_KEY);
    } catch {
      /* ignore */
    }
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-20 text-center"
        >
          <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">
            Let&apos;s try that again
          </h1>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-muted sm:text-base">
            We couldn&apos;t load this page — this usually clears up with a
            quick refresh after an update.
          </p>
          <button
            type="button"
            onClick={this.handleManualReload}
            className="mt-7 inline-flex items-center justify-center rounded-full bg-coral px-7 py-3.5 text-base font-bold text-ink shadow-lg shadow-coral/30 transition hover:-translate-y-0.5 hover:bg-coral-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2"
          >
            Refresh page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
