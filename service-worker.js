self.addEventListener('install', event => {	
	event.waitUntil(
		caches
			.open('app-v1')
			.then(cache => {
				cache.addAll([
					'./manifest.json',
					'./index.html',
					'./index.js',
					'./assets/icons/144x144.jpg',
					'./cat.png'
				]);
			})
			.catch(error => console.error(error))
	);
});

self.addEventListener('fetch', event => {
	event.respondWith(
		caches
			.match(event.request)
			.then(response => {
				if (response === undefined) {
					return fetch(event.request);
				}

				return response;
			})
			.catch(error => {
				const url = new URL(event.request.url);

				if (url.pathname === '/') {
					return caches.match('/index.html');
				}
			})
	);
});