//mise en cache 
//self fait reference a notre serviceWorker
const staticCacheName = "cache-v2";
const assets = ["/apps/cinefilm/", "/apps/cinefilm/index.html"];
//ajout de fichier en cache
self.addEventListener('install', (e) => {
    // console.log('service worker installé') //cette evenement est executé lorque le service worker est installé
    e.waitUntil(
        caches.open(staticCacheName).then((cache) => {
            //des que tu a le cache tu lui ajoute les assets
            cache.addAll(assets);

        })
        //on ajoute un objet en cache
    );


});
// va chercher avec fecth
self.addEventListener("fetch", (event) => {
    event.respondWith(
        //si le cache match avec la requete il l'affiche
        caches.match(event.request).then(function(response) {
            // Cache hit - return response
            if (response) {
                return response;
            }

            // IMPORTANT: Cloner la requête.
            // Une requete est un flux et est à consommation unique
            // Il est donc nécessaire de copier la requete pour pouvoir l'utiliser et la servir
            var fetchRequest = event.request.clone();

            return fetch(fetchRequest).then(function(response) {
                if (!response || response.status !== 200 || response.type !== "basic") {
                    return response;
                }

                // IMPORTANT: Même constat qu'au dessus, mais pour la mettre en cache
                var responseToCache = response.clone();

                caches.open(staticCacheName).then(function(cache) {
                    cache.put(event.request, responseToCache);
                });

                return response;
            });
        })
    );
});
// supprimer caches
self.addEventListener("activate", (e) => {
    e.waitUntil(
        caches.keys().then((keys) => { //keys=cache-v1
            return Promise.add(
                keys
                .filter((key) => key !== staticCacheName)
                //on filtre toute les clés qui ne correspondent pas 
                .map((key) => caches.delete(key))
            );
        })
    );
});