const { assets } = global.serviceWorkerOption
const CACHE_NAME = new Date().toISOString()

let assetsToCache = [...assets, './']

assetsToCache = assetsToCache.map(path => {
  return new URL(path, global.location).toString()
})

self.addEventListener('install', event => {

  event.waitUntil(
    global.caches
      .open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(assetsToCache)
      })
      .catch(error => {
        throw error
      })
  )
})

// After the install event.
self.addEventListener('activate', event => {

  // Clean the caches
  event.waitUntil(
    global.caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // Delete the caches that are not the current one.
          if (cacheName.indexOf(CACHE_NAME) === 0) {
            return null
          }

          return global.caches.delete(cacheName)
        })
      )
    })
  )
})

self.addEventListener('message', event => {
  switch (event.data.action) {
    case 'skipWaiting':
      if (self.skipWaiting) {
        self.skipWaiting()
        self.clients.claim()
      }
      break
    default:
      break
  }
})

self.addEventListener('fetch', event => {
  const request = event.request

  if (request.method !== 'GET') {
    return
  }

  const requestUrl = new URL(request.url)

  if (requestUrl.origin !== location.origin) {
    return
  }

  const resource = global.caches.match(request).then(response => {
    if (response) {
      return response
    }

    return fetch(request)
      .then(responseNetwork => {
        if (!responseNetwork || !responseNetwork.ok) {
          return responseNetwork
        }

        const responseCache = responseNetwork.clone()

        global.caches
          .open(CACHE_NAME)
          .then(cache => {
            return cache.put(request, responseCache)
          })

        return responseNetwork
      })
      .catch(() => {
        // User is landing on our page.
        if (event.request.mode === 'navigate') {
          return global.caches.match('./')
        }

        return null
      })
  })

  event.respondWith(resource)
})
