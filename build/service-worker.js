const l = [
  "/svg/_app/immutable/start-d561048f.js",
  "/svg/_app/immutable/components/layout.svelte-0d3dbdca.js",
  "/svg/_app/immutable/components/error.svelte-0414e704.js",
  "/svg/_app/immutable/components/pages/_page.svelte-ba00819d.js",
  "/svg/_app/immutable/assets/_page-bbc74562.css",
  "/svg/_app/immutable/modules/pages/_layout.js-7b9cbfbc.js",
  "/svg/_app/immutable/chunks/singletons-573d817d.js",
  "/svg/_app/immutable/chunks/preload-helper-aa6bc0ce.js",
  "/svg/_app/immutable/chunks/index-6a903410.js",
  "/svg/_app/immutable/chunks/_layout-8d2a742b.js",
  "/svg/_app/immutable/chunks/0-f980f9e6.js",
  "/svg/_app/immutable/chunks/1-8e8eac71.js",
  "/svg/_app/immutable/chunks/2-608e24eb.js",
  "/svg/_app/immutable/chunks/codejar-f2b93de5.js",
  "/svg/_app/immutable/chunks/prism-1372a240.js"
], h = [
  "/svg/favicon.png"
], n = "1665110302981", o = `cache${n}`, i = l.concat(h), u = new Set(i);
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
async function m(s) {
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
  const e = new URL(s.request.url), t = e.protocol.startsWith("http"), a = e.hostname === self.location.hostname && e.port !== self.location.port, c = e.host === self.location.host && u.has(e.pathname), p = s.request.cache === "only-if-cached" && !c;
  t && !a && !p && s.respondWith(
    (async () => c && await caches.match(s.request) || m(s.request))()
  );
});
