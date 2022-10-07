const p = [
  "/svg/_app/immutable/start-9ed642c3.js",
  "/svg/_app/immutable/components/layout.svelte-0d3dbdca.js",
  "/svg/_app/immutable/components/error.svelte-f567bb91.js",
  "/svg/_app/immutable/components/pages/_page.svelte-ba00819d.js",
  "/svg/_app/immutable/assets/_page-bbc74562.css",
  "/svg/_app/immutable/modules/pages/_layout.js-7b9cbfbc.js",
  "/svg/_app/immutable/chunks/singletons-df8c70aa.js",
  "/svg/_app/immutable/chunks/preload-helper-aa6bc0ce.js",
  "/svg/_app/immutable/chunks/index-6a903410.js",
  "/svg/_app/immutable/chunks/_layout-8d2a742b.js",
  "/svg/_app/immutable/chunks/0-f980f9e6.js",
  "/svg/_app/immutable/chunks/1-59480de5.js",
  "/svg/_app/immutable/chunks/2-608e24eb.js",
  "/svg/_app/immutable/chunks/codejar-f2b93de5.js",
  "/svg/_app/immutable/chunks/prism-1372a240.js"
], h = [
  "/svg/favicon.png"
], o = "1665110252030", i = `cache${o}`, c = p.concat(h), u = new Set(c);
self.addEventListener("install", (s) => {
  console.log(c), s.waitUntil(
    caches.open(i).then((e) => e.addAll(c)).then(() => {
      self.skipWaiting();
    })
  );
});
self.addEventListener("activate", (s) => {
  s.waitUntil(
    caches.keys().then(async (e) => {
      for (const t of e)
        t !== i && await caches.delete(t);
      self.clients.claim();
    })
  );
});
async function m(s) {
  const e = await caches.open(`offline${o}`);
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
  const e = new URL(s.request.url), t = e.protocol.startsWith("http"), a = e.hostname === self.location.hostname && e.port !== self.location.port, n = e.host === self.location.host && u.has(e.pathname), l = s.request.cache === "only-if-cached" && !n;
  t && !a && !l && s.respondWith(
    (async () => n && await caches.match(s.request) || m(s.request))()
  );
});
