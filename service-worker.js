/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "43ffdd2da59bfba475204442ea51e195"
  },
  {
    "url": "assets/css/0.styles.bab33f1c.css",
    "revision": "5bd4ed88e786899dc55bd57c5b50b207"
  },
  {
    "url": "assets/js/10.3fdadc02.js",
    "revision": "7612a6405c6bb3c395482c57ba6e7964"
  },
  {
    "url": "assets/js/11.340bd3c7.js",
    "revision": "3163ad0cee14cc901dd230442237821e"
  },
  {
    "url": "assets/js/12.8343f876.js",
    "revision": "442717680fc0a57a5edbfe95cc1060f6"
  },
  {
    "url": "assets/js/13.ce6bc503.js",
    "revision": "44f0e31e12dc077f27eb702dc19d1841"
  },
  {
    "url": "assets/js/14.221ddeaa.js",
    "revision": "f45db978ebe5d6ca554b28ab0a9bc1c0"
  },
  {
    "url": "assets/js/15.b2f76c22.js",
    "revision": "b694630208f27f252f8da257f3c33ee6"
  },
  {
    "url": "assets/js/16.d6eae074.js",
    "revision": "2c0bac17532f914e391132e4804ab158"
  },
  {
    "url": "assets/js/17.c05ee6ef.js",
    "revision": "6682fc0586d1ceda09983a6c99710b64"
  },
  {
    "url": "assets/js/18.83e58c45.js",
    "revision": "3a5945e13ca3fe13a56be112e5c988a6"
  },
  {
    "url": "assets/js/19.bf9b58b4.js",
    "revision": "4182e9081f5dfc9afa25abff2b1962f9"
  },
  {
    "url": "assets/js/2.5a6264fb.js",
    "revision": "a4e6f70bb6996a8fabd52f622c3fb4a3"
  },
  {
    "url": "assets/js/20.1c8def8b.js",
    "revision": "ba682089c4e9df7499387f292e81f11f"
  },
  {
    "url": "assets/js/21.bc40fca1.js",
    "revision": "b2cb769c22c27df26530fa0580a74282"
  },
  {
    "url": "assets/js/3.13759209.js",
    "revision": "a438bd5c27bf664d91c6a4bd3986cd81"
  },
  {
    "url": "assets/js/4.338599f4.js",
    "revision": "2741411092679866222b258b20775aac"
  },
  {
    "url": "assets/js/5.870ce4dd.js",
    "revision": "ae261256ae69d20fb8ac264b206eddcf"
  },
  {
    "url": "assets/js/6.dc37490f.js",
    "revision": "e69059d1f020fb5cbce6bbc2693b93d0"
  },
  {
    "url": "assets/js/7.9ec360b1.js",
    "revision": "a133c303433d08547475ecfdcdd9963d"
  },
  {
    "url": "assets/js/8.42cd7141.js",
    "revision": "8b4ebbe6c1fc8efbbb910237643d0352"
  },
  {
    "url": "assets/js/9.4939c12c.js",
    "revision": "373f4d557acd494cfa99759d10bc9a4c"
  },
  {
    "url": "assets/js/app.25d5115b.js",
    "revision": "ca1ce1fb935df778f1d86d49ee84a78f"
  },
  {
    "url": "derech-hapeima/index.html",
    "revision": "7235816fc155fd53e69716104705595c"
  },
  {
    "url": "images/axis-z.jpg",
    "revision": "c47c2a6c9b0f6a43158a3f30dc40fa30"
  },
  {
    "url": "images/caressing.jpg",
    "revision": "c541e98c21a9498d58ef56159f8220b3"
  },
  {
    "url": "images/classification.jpg",
    "revision": "3ebf9bbc67cbf96df99468e175b716dc"
  },
  {
    "url": "images/constant-m.jpg",
    "revision": "3c35e26284643ce36ae1099c14d50fde"
  },
  {
    "url": "images/constant-n.jpg",
    "revision": "e05525552d556cf974cb905fc2fd35b0"
  },
  {
    "url": "images/cover.jpg",
    "revision": "dd6abdc164369c0546079dbaa1178653"
  },
  {
    "url": "images/darwish.jpg",
    "revision": "20025b59c22750083cbae02ea76b1a25"
  },
  {
    "url": "images/david-symbol.jpg",
    "revision": "affe75354121d1e561da150390a5ec9a"
  },
  {
    "url": "images/david.jpg",
    "revision": "759e4b032232de81f4572a4fe18867f7"
  },
  {
    "url": "images/disentanglement.jpg",
    "revision": "756e297babe121f50633d3154b9844bb"
  },
  {
    "url": "images/drainage-divide.jpg",
    "revision": "4b4b8a98400fdc298967b367de8b2529"
  },
  {
    "url": "images/equation-balance.jpg",
    "revision": "2e69c8cf09f240a416db1e712fc97f95"
  },
  {
    "url": "images/equation-human.jpg",
    "revision": "8d66f6b80e1550e2f82a777a73fa0309"
  },
  {
    "url": "images/equation-i.jpg",
    "revision": "d9613fcc5033cf035b4c1ac55072c11b"
  },
  {
    "url": "images/equation-maaseh-merkavah.jpg",
    "revision": "d23aa892f8e6d66c8febc9ed2dc794b3"
  },
  {
    "url": "images/equation-one.jpg",
    "revision": "07a3096dce422dc0d6db28f4207f07fb"
  },
  {
    "url": "images/equation-soul.jpg",
    "revision": "1bc0db0f2097f786048807cdce1f4b06"
  },
  {
    "url": "images/equation-two.jpg",
    "revision": "4ec331ee1466bdb7f9fc002da0a3dd2c"
  },
  {
    "url": "images/equation-way.jpg",
    "revision": "189b11142c096d2dc05c7d5e959d55dd"
  },
  {
    "url": "images/equation-zero.jpg",
    "revision": "e01c2d80380672dfc64f3d03b04f8022"
  },
  {
    "url": "images/filipe.jpg",
    "revision": "a0c74a1aeb3b2c874bd54c6cb78b12ed"
  },
  {
    "url": "images/forcefulness.jpg",
    "revision": "3f202f49d02bcd031f454ddc8f2964e8"
  },
  {
    "url": "images/icons/icon-128x128.png",
    "revision": "0c8237c855acba25c523cc8e52a073b4"
  },
  {
    "url": "images/icons/icon-144x144.png",
    "revision": "383ad0288ab7620592bc009dc0d52ee1"
  },
  {
    "url": "images/icons/icon-152x152.png",
    "revision": "d52025e499efcbcf2c520a1b5bb6c3a8"
  },
  {
    "url": "images/icons/icon-192x192.png",
    "revision": "d52025e499efcbcf2c520a1b5bb6c3a8"
  },
  {
    "url": "images/icons/icon-384x384.png",
    "revision": "d52025e499efcbcf2c520a1b5bb6c3a8"
  },
  {
    "url": "images/icons/icon-512x512.png",
    "revision": "d52025e499efcbcf2c520a1b5bb6c3a8"
  },
  {
    "url": "images/icons/icon-72x72.png",
    "revision": "0bb61341f0df4f6868f079e2c29175fe"
  },
  {
    "url": "images/icons/icon-96x96.png",
    "revision": "6e82055b409889b3db66cbd278dea64a"
  },
  {
    "url": "images/kissing.jpg",
    "revision": "9bd8030c6c78c6a292a9f73c1e561610"
  },
  {
    "url": "images/merkavah-arrows.jpg",
    "revision": "2f4905059edc68854f7742498e7dbfd6"
  },
  {
    "url": "images/merkavah-axes.jpg",
    "revision": "133bd90f618b452ffe6f34cfbc7dac96"
  },
  {
    "url": "images/merkavah-body.jpg",
    "revision": "8841797a891d519f321018b9c5442b46"
  },
  {
    "url": "images/merkavah-letter-values.jpg",
    "revision": "82bdac2a0388fa6d1561ce0902167625"
  },
  {
    "url": "images/merkavah-logo.jpg",
    "revision": "0e6fc47637f1772d6b9adbffa995917d"
  },
  {
    "url": "images/merkavah-mapping.jpg",
    "revision": "ef032425543696d3d03336370951185f"
  },
  {
    "url": "images/merkavah-personal.jpg",
    "revision": "c84a18c5d1f50aad457dae98f09ab848"
  },
  {
    "url": "images/mountain.jpg",
    "revision": "f62410b19320cfd43f6335a8b8b07a29"
  },
  {
    "url": "images/movement.jpg",
    "revision": "b32466f352524ebab4aadca92edf4b90"
  },
  {
    "url": "images/nostalgia.jpg",
    "revision": "fa8f3a9f0a5a378edc93c1045b61816e"
  },
  {
    "url": "images/paradoxality.jpg",
    "revision": "3173060aee833c95a9cc11d7d0800883"
  },
  {
    "url": "images/sanity.jpg",
    "revision": "75c44bc76eba1408f7e1997e5e049197"
  },
  {
    "url": "images/spacer.png",
    "revision": "f9fb1d9849c9caa5f81dac4f1418151a"
  },
  {
    "url": "images/system-axes-values.jpg",
    "revision": "ec599df73dab7e16674b715489f3d35c"
  },
  {
    "url": "images/system-mapping.jpg",
    "revision": "a6edcd2d6294fc2454d11cb3e8005629"
  },
  {
    "url": "images/variable-m.jpg",
    "revision": "74b03d0c8ea4e6de0c2418bcfe8d0343"
  },
  {
    "url": "images/west.jpg",
    "revision": "4f71e726f26bbfb83745fe414b513822"
  },
  {
    "url": "index.html",
    "revision": "0b22e775f04c1d8d2f6e03b20e731e26"
  },
  {
    "url": "mishvaot-hapeima/index.html",
    "revision": "e8366cd5f2089c4daa586ea10d353fbf"
  },
  {
    "url": "sefer-yetzira/index.html",
    "revision": "a5485b3c8250abfc2391f91a072954ad"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
