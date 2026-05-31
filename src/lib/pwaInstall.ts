// PWA install trigger using only native browser interfaces.
// - Android/Chrome/Desktop: capture beforeinstallprompt and trigger on first user click.
// - iOS Safari: no programmatic prompt exists; the browser only exposes the native
//   Share → Add to Home Screen flow. We intentionally do not render custom UI.
// - Guarded against Lovable preview iframes (per platform PWA guidance).

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const SW_PATH = "/sw.js";

function isInIframe(): boolean {
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
}

function isPreviewHost(): boolean {
  const h = window.location.hostname;
  return h.includes("id-preview--") || h.includes("lovableproject.com");
}

export function initPwaInstall() {
  if (typeof window === "undefined") return;

  // Never register SW or wire install prompt inside Lovable preview/iframe.
  if (isInIframe() || isPreviewHost()) {
    // Clean up any previously-registered worker in preview contexts.
    navigator.serviceWorker?.getRegistrations().then((regs) => {
      regs.forEach((r) => r.unregister());
    }).catch(() => {});
    return;
  }

  // Register the minimal service worker (required for Chrome/Edge install criteria).
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register(SW_PATH).catch(() => {});
    });
  }

  let deferredPrompt: BeforeInstallPromptEvent | null = null;

  window.addEventListener("beforeinstallprompt", (e) => {
    // Stash the event so the native prompt can be triggered on first user gesture.
    e.preventDefault();
    deferredPrompt = e as BeforeInstallPromptEvent;
  });

  const tryPrompt = async () => {
    if (!deferredPrompt) return;
    const evt = deferredPrompt;
    deferredPrompt = null;
    try {
      await evt.prompt();
      await evt.userChoice;
    } catch {
      // ignore — user dismissed or browser rejected
    }
  };

  // Fire on the first user gesture anywhere on the site (required by browsers).
  const handler = () => {
    void tryPrompt();
  };
  window.addEventListener("click", handler, { once: false, capture: true });
  window.addEventListener("touchend", handler, { once: false, capture: true });

  window.addEventListener("appinstalled", () => {
    deferredPrompt = null;
  });
}
