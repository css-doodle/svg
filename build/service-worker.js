const p = [
  "/svg/_app/immutable/start-34aa6194.js",
  "/svg/_app/immutable/components/layout.svelte-2c883673.js",
  "/svg/_app/immutable/components/error.svelte-b984def4.js",
  "/svg/_app/immutable/components/pages/_page.svelte-350d1c6e.js",
  "/svg/_app/immutable/assets/_page-ddda075e.css",
  "/svg/_app/immutable/modules/pages/_layout.js-7b9cbfbc.js",
  "/svg/_app/immutable/chunks/singletons-a557ad40.js",
  "/svg/_app/immutable/chunks/index-24e60947.js",
  "/svg/_app/immutable/chunks/_layout-8d2a742b.js",
  "/svg/_app/immutable/chunks/0-13e997ee.js",
  "/svg/_app/immutable/chunks/1-376c9786.js",
  "/svg/_app/immutable/chunks/2-1f45dd86.js"
], h = [
  "/svg/favicon.png"
], n = "1665198923399", o = `cache${n}`, i = p.concat(h), r = new Set(i);
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
