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
    'app.js',
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
  
  
  // Aquí estamos almacenando en caché los archivos `/`, `/styles/main.css` y `/script/main.js` en el objeto `urlsToCache`. En el evento `install`, estamos abriendo la caché y almacenando los archivos allí. En el evento `fetch`, estamos comprobando si la solicitud coincide con un archivo almacenado en caché. Si es así, devolvemos el archivo almacenado en caché. Si no, realizamos la solicitud de red.
  
  // Con esta configuración de caché, los archivos JavaScript se almacenarán en caché en el navegador del usuario, lo que reducirá el tiempo de carga de la página y mejorará el rendimiento de nuestro sitio web