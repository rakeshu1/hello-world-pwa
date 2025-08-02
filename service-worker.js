self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/style.css',
        '/script.js',
        '/manifest.json',
        '/icons/hello-world-icon.png',   // Ensure these files exist
        '/icons/hello-world-icon-512.png' // Ensure these files exist
      ]).catch((error) => {
        // If a file fails to load or cache, log the error
        console.error('Failed to cache one or more files:', error);
      });
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
