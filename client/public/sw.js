self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());

self.addEventListener('message', event => {
  const { title, options } = event.data || {};
  if (title) {
    self.registration.showNotification(title, options);
  }
});
