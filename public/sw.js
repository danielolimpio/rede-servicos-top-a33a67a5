// Minimal service worker — required for Chrome/Edge install criteria.
// Network-only fetch handler (no caching) to avoid stale content in preview/production.
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Pass-through — required so the browser detects a fetch handler for installability.
  return;
});
