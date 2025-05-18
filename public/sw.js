self.addEventListener('install', (event) => {
    self.skipWaiting()
})

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim())
})

self.addEventListener('push', (event) => {
    const options = {
        body: event.data.text(),
        icon: '/vite.svg',
        badge: '/vite.svg'
    }

    event.waitUntil(
        self.registration.showNotification('Verification Code', options)
    )
}) 