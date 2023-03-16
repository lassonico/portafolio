// Para configurar el caché con código JS y almacenar archivos JS, podemos usar la API de Service Workers y el objeto Cache. Aquí hay un ejemplo de cómo hacerlo:

// 1. Registrando el Service Worker:


if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js')
        .then(registration => {
          console.log('Service worker registered:', registration);
        })
        .catch(error => {
          console.log('Service worker registration failed:', error);
        });
    });
  }

  // 2. Creando el archivo SW.js:
  
  const CACHE_NAME = 'my-site-cache-v1';
  const urlsToCache = [
    'aos.js',
    'appmin.js',
    'lord.js',
    'modernizer.js'
  ];
  
  self.addEventListener('install', event => {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then(cache => {
          console.log('Cache opened');
          return cache.addAll(urlsToCache);
        })
    );
  });
  
  self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          if (response) {
            console.log('Cache hit:', event.request.url);
            return response;
          }
  
          console.log('Cache miss:', event.request.url);
          return fetch(event.request);
        })
    );
  });