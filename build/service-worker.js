const l = [
  "/_app/immutable/start-a7344730.js",
  "/_app/immutable/components/layout.svelte-0d3dbdca.js",
  "/_app/immutable/components/error.svelte-5c3b3d0f.js",
  "/_app/immutable/components/pages/_page.svelte-ba00819d.js",
  "/_app/immutable/assets/_page-bbc74562.css",
  "/_app/immutable/modules/pages/_layout.js-7b9cbfbc.js",
  "/_app/immutable/chunks/singletons-75861422.js",
  "/_app/immutable/chunks/preload-helper-aa6bc0ce.js",
  "/_app/immutable/chunks/index-6a903410.js",
  "/_app/immutable/chunks/_layout-8d2a742b.js",
  "/_app/immutable/chunks/0-f980f9e6.js",
  "/_app/immutable/chunks/1-d7a4226e.js",
  "/_app/immutable/chunks/2-608e24eb.js",
  "/_app/immutable/chunks/codejar-f2b93de5.js",
  "/_app/immutable/chunks/prism-1372a240.js"
], h = [
  "/favicon.png"
], n = "1665051890321", o = `cache${n}`, i = l.concat(h), u = new Set(i);
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(o).then((s) => s.addAll(i)).then(() => {
      self.skipWaiting();
    })
  );
});
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then(async (s) => {
      for (const t of s)
        t !== o && await caches.delete(t);
      self.clients.claim();
    })
  );
});
async function m(e) {
  const s = await caches.open(`offline${n}`);
  try {
    const t = await fetch(e);
    return s.put(e, t.clone()), t;
  } catch (t) {
    const a = await s.match(e);
    if (a)
      return a;
    throw t;
  }
}
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET" || e.request.headers.has("range"))
    return;
  const s = new URL(e.request.url), t = s.protocol.startsWith("http"), a = s.hostname === self.location.hostname && s.port !== self.location.port, c = s.host === self.location.host && u.has(s.pathname), p = e.request.cache === "only-if-cached" && !c;
  t && !a && !p && e.respondWith(
    (async () => c && await caches.match(e.request) || m(e.request))()
  );
});
