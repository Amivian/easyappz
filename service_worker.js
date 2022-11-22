// Change this to your repository name
var GHPATH = '/easyappz';
 
// Choose a different app prefix name
var APP_PREFIX = 'eafoa_';
 
// The version of the cache. Every time you change any of the files
// you need to change this version (version_01, version_02…). 
// If you don't change the version, the service worker will give your
// users the old files!
var VERSION = 'version_04';
 
// The files to make available for offline use. make sure to add 
// others to this list
var URLS = [    
  `${GHPATH}/`,
  `${GHPATH}/index.html`,
  `${GHPATH}/contact.html`,
  `${GHPATH}/faq.html`,
  `${GHPATH}/css/styles.css`,
  `${GHPATH}/js/index.js`,
  `${GHPATH}/js/script.js`,
  `${GHPATH}/pay-with-card-online/index.html`,
  `${GHPATH}/pay-with-card-on-delivery/index.html`,
  `${GHPATH}/vendor/boostrap/css/boostrap.min.css`,
  `${GHPATH}/vendor/boostrap/js/boostrap.min.js`,
  `${GHPATH}/vendor/dmenu/css/menu.css`,
  `${GHPATH}/vendor/easing/js/easing.min.js`,
  `${GHPATH}/vendor/float-labels/css/float-labels.min.css`,
  `${GHPATH}/vendor/float-labels/js/float-labels.min.js`,
  `${GHPATH}/vendor/font-awesome/css/font-awesome.min.css`,
  `${GHPATH}/vendor/font-awesome/fonts/fontawesome-webfont3e6e-2.html`,
  `${GHPATH}/vendor/font-awesome/fonts/fontawesome-webfont3e6e-3.html`,
  `${GHPATH}/vendor/font-awesome/fonts/fontawesome-webfont3e6e-2.eot`,
  `${GHPATH}/vendor/font-awesome/fonts/fontawesome-webfont3e6e.html`,
  `${GHPATH}/vendor/font-awesome/fonts/fontawesome-webfont3e6e.svg`,
  `${GHPATH}/vendor/font-awesome/fonts/fontawesome-webfont41d-2.eot`,
  `${GHPATH}/vendor/font-awesome/fonts/fontawesome-webfont3e6e-2.html`,
  `${GHPATH}/vendor/hamburgers/css/hamburgers.min.css`,
  `${GHPATH}/vendor/icomoon/css/iconfont.min.css`,
  `${GHPATH}/vendor/icomoon/fonts/icomoon9c00-2.html`,
  `${GHPATH}/vendor/icomoon/fonts/icomoon9c00.eot`,
  `${GHPATH}/vendor/icomoon/fonts/icomoon9c00.html`,
  `${GHPATH}/vendor/icomoon/fonts/icomoon9c00.svg`,
  `${GHPATH}/vendor/infobox/js/infobox.js`,
  `${GHPATH}/vendor/isotope/js/isotop.pkgd.min.js`,
  `${GHPATH}/vendor/jquery/jquery.min.js`,
  `${GHPATH}/vendor/jquery-wizard/js/jquery-ui-1.8.22.min.js`,
  `${GHPATH}/vendor/jquery-wizard/js/jquery.wizard.js`,
  `${GHPATH}/vendor/lazyload/js/lazyload.min.js`,
  `${GHPATH}/vendor/magnific-popup/css/magnific-popup.css`,
  `${GHPATH}/vendor/magnific-popup/js/jquery.magnific-popup.min.js`,
  `${GHPATH}/vendor/mmenu/css/mmenu.min.css`,
  `${GHPATH}/vendor/mmenu/js/mmenu.min.js`,
  `${GHPATH}/vendor/nice-select/js/jquery.nice-select.min.js`,
  `${GHPATH}/vendor/parsley/js/parsley.min.js`,
  `${GHPATH}/vendor/price-format/js/jquery.priceformate.min.js`,
  `${GHPATH}/vendor/scrollreveal/js/scrollreveal.min.js`,
  `${GHPATH}/vendor/sticky-kit/js/sticky-kit.min.js`,
  `${GHPATH}/vendor/theia-sticky-sidebar/js/ResizeSensor.min.js`,
  `${GHPATH}/vendor/theia-sticky-sidebar/js/theia-sticky-sidebar.min.js`,
]

// const cacheName = "pwa-conf-v1";

// self.addEventListener("install", async (event) => {
//   const cache = await caches.open(cacheName);
//   await cache.addAll(staticAssets);
// });
// self.addEventListener("fetch", (event) => {
//   const req = event.request;
//   event.respondWith(cacheFirst(req));
// });

// async function cacheFirst(req) {
//   const cache = await caches.open(cacheName);
//   const cachedResponse = await cache.match(req);
//   return cachedResponse || fetch(req);
// }

// Cached core static resources 
self.addEventListener("install",e=>{
    e.waitUntil(
      caches.open("static").then(cache=>{
        return cache.addAll(["./",'./img/logo192.png']);
      })
    );
  });
  
  // Fatch resources
  self.addEventListener("fetch",e=>{
    e.respondWith(
      caches.match(e.request).then(response=>{
        return response||fetch(e.request);
      })
    );
  });
