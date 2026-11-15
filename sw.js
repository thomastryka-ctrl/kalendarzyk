// Wygenerowane przy buildzie — nie edytować.
const CACHE = 'aniol-vs-diabel-afd7a93ecd7e';
const FILES = ["./","assets/index-DFmK6Q4N.js","assets/index-BkSkLsGG.css","icon-180.png","icon-192.png","icon-512.png","icon.svg","manifest.webmanifest"];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;
  event.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const navigation = request.mode === 'navigate';
      // ignoreVary: serwery dodają nagłówek Vary, przez który skrypty i style
      // nie trafiałyby w pamięć podręczną mimo identycznego adresu.
      const hit =
        (await cache.match(request, { ignoreSearch: navigation, ignoreVary: true })) ||
        (navigation && (await cache.match('./', { ignoreVary: true })));
      return hit || fetch(request);
    }),
  );
});
