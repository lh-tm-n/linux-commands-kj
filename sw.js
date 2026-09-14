/* Linux Commands — offline service worker.
 * App shell is precached; assets are cache-first, navigations network-first
 * with offline fallback to the cached shell. Bump CACHE when assets change. */
const CACHE = "linux-cmd-ref-v4";

const ASSETS = [
  "index.html",
  "styles.css",
  "app.js",
  "data-part1.js",
  "data-part2.js",
  "man-part1.js",
  "man-part2.js",
  "man-part3.js",
  "man-part4.js",
  "man-part5.js",
  "man-part6.js",
  "ex-part1.js",
  "ex-part2.js",
  "ex-part3.js",
  "examples-part1.js",
  "examples-part2.js",
  "examples-part3.js",
  "i18n.js",
  "id-part1.js",
  "id-part2.js",
  "id-part3.js",
  "manifest.webmanifest",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/icon-maskable-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) =>
      /* cache each asset independently so one failure cannot break install */
      Promise.all(ASSETS.map((url) => cache.add(url).catch(() => {})))
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  /* Navigations: network-first so users get updates when online,
   * cached shell when offline. */
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((cache) => cache.put("index.html", copy));
          return res;
        })
        .catch(() => caches.match("index.html"))
    );
    return;
  }

  /* Everything else: cache-first with background fill. */
  event.respondWith(
    caches.match(req).then(
      (hit) =>
        hit ||
        fetch(req).then((res) => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((cache) => cache.put(req, copy));
          }
          return res;
        })
    )
  );
});
