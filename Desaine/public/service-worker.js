const SHELL_CACHE = 'aura-shell-v1'
const ASSET_CACHE = 'aura-assets-v1'
const BASE_URL = new URL('./', self.location.href)

const coreRoutes = [
  './',
  './index.html',
  './privacy.html',
  './offline.html',
  './manifest.webmanifest',
  './icons/icon-180.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './assets/logo.svg',
]

function toAbsoluteUrl(pathname) {
  return new URL(pathname, BASE_URL).toString()
}

async function cacheCoreShell() {
  const cache = await caches.open(SHELL_CACHE)
  await cache.addAll(coreRoutes.map(toAbsoluteUrl))
}

self.addEventListener('install', (event) => {
  event.waitUntil(cacheCoreShell())
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys()
    await Promise.all(
      keys
        .filter((key) => ![SHELL_CACHE, ASSET_CACHE].includes(key))
        .map((key) => caches.delete(key))
    )
    await self.clients.claim()
  })())
})

async function handleNavigation(request) {
  const shellCache = await caches.open(SHELL_CACHE)

  try {
    const networkResponse = await fetch(request)

    if (networkResponse.ok) {
      shellCache.put(request, networkResponse.clone())
    }

    return networkResponse
  } catch {
    const cachedResponse = await shellCache.match(request)

    if (cachedResponse) {
      return cachedResponse
    }

    if (request.url.endsWith('/privacy.html')) {
      return shellCache.match(toAbsoluteUrl('./privacy.html'))
    }

    return (
      await shellCache.match(toAbsoluteUrl('./index.html')) ||
      await shellCache.match(toAbsoluteUrl('./offline.html'))
    )
  }
}

async function handleAsset(request) {
  const assetCache = await caches.open(ASSET_CACHE)
  const cachedResponse = await assetCache.match(request)

  const networkPromise = fetch(request)
    .then((networkResponse) => {
      if (networkResponse.ok) {
        assetCache.put(request, networkResponse.clone())
      }

      return networkResponse
    })
    .catch(() => cachedResponse)

  return cachedResponse || networkPromise
}

self.addEventListener('fetch', (event) => {
  const { request } = event

  if (request.method !== 'GET') {
    return
  }

  const url = new URL(request.url)

  if (url.origin !== self.location.origin) {
    return
  }

  if (request.mode === 'navigate') {
    event.respondWith(handleNavigation(request))
    return
  }

  if (
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'image' ||
    request.destination === 'font' ||
    request.destination === 'manifest'
  ) {
    event.respondWith(handleAsset(request))
  }
})
