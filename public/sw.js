if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return n[e]||(s=new Promise((async s=>{if("document"in self){const n=document.createElement("script");n.src=e,document.head.appendChild(n),n.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!n[e])throw new Error(`Module ${e} didn’t register its module`);return n[e]}))},s=(s,n)=>{Promise.all(s.map(e)).then((e=>n(1===e.length?e[0]:e)))},n={require:Promise.resolve(s)};self.define=(s,t,i)=>{n[s]||(n[s]=Promise.resolve().then((()=>{let n={};const c={uri:location.origin+s.slice(1)};return Promise.all(t.map((s=>{switch(s){case"exports":return n;case"module":return c;default:return e(s)}}))).then((e=>{const s=i(...e);return n.default||(n.default=s),n}))})))}}define("./sw.js",["./workbox-a8b10d99"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/Puntos-min.png",revision:"d84d4983dd9bda3b1b9a587bf844a2e8"},{url:"/T.png",revision:"b9d75fdb31ca2f0f99be822ee8d12606"},{url:"/_next/static/chunks/0c428ae2.8e4977aa37c93eaad8e1.js",revision:"qlM4hFtosYLq4617p7USM"},{url:"/_next/static/chunks/0e1f167d.3bc7f342547bdc259440.js",revision:"qlM4hFtosYLq4617p7USM"},{url:"/_next/static/chunks/17007de1.6d5f315cf3a579c103de.js",revision:"qlM4hFtosYLq4617p7USM"},{url:"/_next/static/chunks/1bfc9850.9367c579b7e937847843.js",revision:"qlM4hFtosYLq4617p7USM"},{url:"/_next/static/chunks/252f366e.24a486259360384c1483.js",revision:"qlM4hFtosYLq4617p7USM"},{url:"/_next/static/chunks/278d1eb0.015f9d8058e98413823a.js",revision:"qlM4hFtosYLq4617p7USM"},{url:"/_next/static/chunks/278f5882fefc8c93784df9bc6c160a28798a7533.82dc3f4c759210e710d5.js",revision:"qlM4hFtosYLq4617p7USM"},{url:"/_next/static/chunks/2e0aa3972b1359af88efa79f517041d36ccbd9d1.fe9d0216111bbbf911d6.js",revision:"qlM4hFtosYLq4617p7USM"},{url:"/_next/static/chunks/6bd6c7c438c618db9f62cb35c317d36d7dc388fe.86a09c57a331b62653b2.js",revision:"qlM4hFtosYLq4617p7USM"},{url:"/_next/static/chunks/78e521c3.333d81285ffa03103ba3.js",revision:"qlM4hFtosYLq4617p7USM"},{url:"/_next/static/chunks/7f0c75c1.64ba43438ec4f0127d36.js",revision:"qlM4hFtosYLq4617p7USM"},{url:"/_next/static/chunks/870acb3374b024ed75cfed50430faa2ac371187d.cbf8660594e6a8c2ef1d.js",revision:"qlM4hFtosYLq4617p7USM"},{url:"/_next/static/chunks/commons.578ed11c2a8ad82c02ea.js",revision:"qlM4hFtosYLq4617p7USM"},{url:"/_next/static/chunks/d64684d8.323cc521563584533d25.js",revision:"qlM4hFtosYLq4617p7USM"},{url:"/_next/static/chunks/d7eeaac4.544ab85ef971d8cc9c28.js",revision:"qlM4hFtosYLq4617p7USM"},{url:"/_next/static/chunks/de71a805.6a18474e731f5d051c81.js",revision:"qlM4hFtosYLq4617p7USM"},{url:"/_next/static/chunks/fffb764079a7714d7f0cbca27b828bb00fba0642.dc34ef25198368b691d8.js",revision:"qlM4hFtosYLq4617p7USM"},{url:"/_next/static/chunks/framework.9d524150d48315f49e80.js",revision:"qlM4hFtosYLq4617p7USM"},{url:"/_next/static/chunks/main-03d6d32a1e27c2de2973.js",revision:"qlM4hFtosYLq4617p7USM"},{url:"/_next/static/chunks/pages/_app-5f86c55fa18269d731a5.js",revision:"qlM4hFtosYLq4617p7USM"},{url:"/_next/static/chunks/pages/_error-69c73f1adcf6bd979022.js",revision:"qlM4hFtosYLq4617p7USM"},{url:"/_next/static/chunks/pages/artist/%5Btype%5D/contact-info-a906ea6d7d1b77bf7fbe.js",revision:"qlM4hFtosYLq4617p7USM"},{url:"/_next/static/chunks/pages/artist/%5Btype%5D/main-info-425b42a9a684d026fd3e.js",revision:"qlM4hFtosYLq4617p7USM"},{url:"/_next/static/chunks/pages/artist/%5Btype%5D/picture-info-ac317fee5baa34e40df7.js",revision:"qlM4hFtosYLq4617p7USM"},{url:"/_next/static/chunks/pages/artist/%5Btype%5D/working-info-9861efd6993bd0478065.js",revision:"qlM4hFtosYLq4617p7USM"},{url:"/_next/static/chunks/pages/artistas-a7b5d87bf66608c44764.js",revision:"qlM4hFtosYLq4617p7USM"},{url:"/_next/static/chunks/pages/index-6a6d09e96a82eb6a4416.js",revision:"qlM4hFtosYLq4617p7USM"},{url:"/_next/static/chunks/pages/new-profile-028e22fc29a448e50d31.js",revision:"qlM4hFtosYLq4617p7USM"},{url:"/_next/static/chunks/pages/post-48ce48c585d1b31fe33e.js",revision:"qlM4hFtosYLq4617p7USM"},{url:"/_next/static/chunks/pages/profile-f88d1a663f9ea3cb03fd.js",revision:"qlM4hFtosYLq4617p7USM"},{url:"/_next/static/chunks/pages/profile-menu-ce53f359624ae5c0f725.js",revision:"qlM4hFtosYLq4617p7USM"},{url:"/_next/static/chunks/pages/profile2-9a47ec247c5d87491a2c.js",revision:"qlM4hFtosYLq4617p7USM"},{url:"/_next/static/chunks/pages/step1-af6b22bc0cf4bf471ed8.js",revision:"qlM4hFtosYLq4617p7USM"},{url:"/_next/static/chunks/pages/step2-201520b6bdb7d31009db.js",revision:"qlM4hFtosYLq4617p7USM"},{url:"/_next/static/chunks/pages/step3-141ec8fece341abab699.js",revision:"qlM4hFtosYLq4617p7USM"},{url:"/_next/static/chunks/pages/step4-870e39d68c67a98c6a44.js",revision:"qlM4hFtosYLq4617p7USM"},{url:"/_next/static/chunks/polyfills-9833fce64ddcd9890799.js",revision:"qlM4hFtosYLq4617p7USM"},{url:"/_next/static/chunks/webpack-50bee04d1dc61f8adf5b.js",revision:"qlM4hFtosYLq4617p7USM"},{url:"/_next/static/css/1361d88b780a7ed7ec67.css",revision:"qlM4hFtosYLq4617p7USM"},{url:"/_next/static/css/4bd8b273f328ef1b7d09.css",revision:"qlM4hFtosYLq4617p7USM"},{url:"/_next/static/qlM4hFtosYLq4617p7USM/_buildManifest.js",revision:"qlM4hFtosYLq4617p7USM"},{url:"/_next/static/qlM4hFtosYLq4617p7USM/_ssgManifest.js",revision:"qlM4hFtosYLq4617p7USM"},{url:"/favicon.png",revision:"66db7b6834e7f070360837bbc38de48f"},{url:"/favicon/android/android-launchericon-144-144.png",revision:"1dcef07a339ce00ed91763854c13eb85"},{url:"/favicon/android/android-launchericon-192-192.png",revision:"81134444fb3817bb769acaaa8c0ba6e8"},{url:"/favicon/android/android-launchericon-48-48.png",revision:"7f7d4d917ce963fb4e3b282d34d69681"},{url:"/favicon/android/android-launchericon-512-512.png",revision:"340becf0eb3974b4de21b7c7dee55f12"},{url:"/favicon/android/android-launchericon-72-72.png",revision:"34c5331ee2d8f4f2a1326a82b7dcce1c"},{url:"/favicon/android/android-launchericon-96-96.png",revision:"ebb2134a2c706ee59fdccfeb3b98dfe0"},{url:"/fonts/inter-var-latin.woff2",revision:"812b3dd29751112389e93387c4f7dd0a"},{url:"/logo.jpg",revision:"9a9bdeb38a625f44ea324208e5e00b7a"},{url:"/logo2.jpg",revision:"7b385990d2b459b6bcee096ad0bb34bc"},{url:"/logotipo.jpeg",revision:"ba33ac238996e8fb7b84dffa5bdf056f"},{url:"/logotipo.jpg",revision:"5219790ed7d5d487cb6805e20ed52c0b"},{url:"/manifest.json",revision:"5374b8a04c220a86258a4fcd3e899bd5"},{url:"/newlogo.png",revision:"88ab9c6447eef8768e8434ef462528e3"},{url:"/newlogo2.png",revision:"88ab9c6447eef8768e8434ef462528e3"},{url:"/short-logo.png",revision:"db39ed78742d3730810d6cf30c010956"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[new e.ExpirationPlugin({maxEntries:1,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/api\/.*$/i,new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/.*/i,new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
