const p = [
  "/svg/_app/immutable/start-e82fef79.js",
  "/svg/_app/immutable/components/layout.svelte-2c883673.js",
  "/svg/_app/immutable/components/error.svelte-06971f0b.js",
  "/svg/_app/immutable/components/pages/_page.svelte-9217c3c0.js",
  "/svg/_app/immutable/assets/_page-ddda075e.css",
  "/svg/_app/immutable/modules/pages/_layout.js-7b9cbfbc.js",
  "/svg/_app/immutable/chunks/singletons-f00ccfb5.js",
  "/svg/_app/immutable/chunks/index-24e60947.js",
  "/svg/_app/immutable/chunks/_layout-8d2a742b.js",
  "/svg/_app/immutable/chunks/0-13e997ee.js",
  "/svg/_app/immutable/chunks/1-3106edc1.js",
  "/svg/_app/immutable/chunks/2-94d04500.js"
], h = [
  "/svg/favicon.png"
], n = "1665210962901", o = `cache${n}`, i = p.concat(h), r = new Set(i);
self.addEventListener("install", (s) => {
  s.waitUntil(
    caches.open(o).then((e) => e.addAll(i)).then(() => {
      self.skipWaiting();
    })
  );
});
self.addEventListener("activate", (s) => {
  s.waitUntil(
    caches.keys().then(async (e) => {
      for (const t of e)
        t !== o && await caches.delete(t);
      self.clients.claim();
    })
  );
});
async function u(s) {
  const e = await caches.open(`offline${n}`);
  try {
    const t = await fetch(s);
    return e.put(s, t.clone()), t;
  } catch (t) {
    const a = await e.match(s);
    if (a)
      return a;
    throw t;
  }
}
self.addEventListener("fetch", (s) => {
  if (s.request.method !== "GET" || s.request.headers.has("range"))
    return;
  const e = new URL(s.request.url), t = e.protocol.startsWith("http"), a = e.hostname === self.location.hostname && e.port !== self.location.port, c = e.host === self.location.host && r.has(e.pathname), l = s.request.cache === "only-if-cached" && !c;
  t && !a && !l && s.respondWith(
    (async () => c && await caches.match(s.request) || u(s.request))()
  );
});
