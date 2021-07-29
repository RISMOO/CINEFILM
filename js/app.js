/**
    * @description      : 
    * @author           : mauri
    * @group            : 
    * @created          : 29/07/2021 - 07:21:53
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 29/07/2021
    * - Author          : mauri
    * - Modification    : 
**/
if ("serviceWorker" in navigator) { //si il y a un service worker 
    //si le service worker peu etre accepter par le navigateur de notre utilisateur
    navigator.serviceWorker.register("/apps/cinefilm/serviceWorker.js");
    //si il est present il'enregistre dans le navigateur
}

var tl=gsap.timeline();
tl.from('.logo', {duration: 1.5, y:150, ease:"back", opacity:0, scale:0.3, stragger:0.25});
tl.from('.btn', {duration: 1.5, y:150, opacity:0, scale:0.3, stragger:0.25});
//gsap.to('.logo', {duration: 1.5, y:150, ease:"back", opacity:0, scale:0.3});

//étape obligatoire pour le check