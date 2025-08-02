// Simple service worker for SoundStream PWA - Install prompts only
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';

// Precache static assets only
precacheAndRoute(self.__WB_MANIFEST);

// Clean up old caches
cleanupOutdatedCaches();

// Skip waiting to activate new service worker immediately
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
