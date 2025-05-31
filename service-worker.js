const CACHE_NAME = 'training-calendar-cache-v1';
const urlsToCache = [
    '/', // Caches the root path if your index.html is there
    '/training_calendar.html', // Your main HTML file
    '/service-worker.js',
    '/manifest.json',
    // Add paths to your icons if you create them
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png'
    // You might also add the Tailwind CSS CDN URL here if you want it cached for offline,
    // though that's generally not recommended for CDN assets unless you have a robust strategy.
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});