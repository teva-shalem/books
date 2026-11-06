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
    "revision": "b92b85ac9cfedba1d6184da3e148dd97"
  },
  {
    "url": "assets/css/0.styles.d9089a02.css",
    "revision": "3cc37f962353c98ce7d14aa963153539"
  },
  {
    "url": "assets/fonts/KaTeX_AMS-Regular.2dbe16b4.ttf",
    "revision": "2dbe16b4f4662798159f8d62c8d2509d"
  },
  {
    "url": "assets/fonts/KaTeX_AMS-Regular.38a68f7d.woff2",
    "revision": "38a68f7d18d292349a6e802a66136eae"
  },
  {
    "url": "assets/fonts/KaTeX_AMS-Regular.7d307e83.woff",
    "revision": "7d307e8337b9559e4040c5fb76819789"
  },
  {
    "url": "assets/fonts/KaTeX_Caligraphic-Bold.33d26881.ttf",
    "revision": "33d26881e4dd89321525c43b993f136c"
  },
  {
    "url": "assets/fonts/KaTeX_Caligraphic-Regular.5e7940b4.ttf",
    "revision": "5e7940b4ed250e98a512f520e39c867d"
  },
  {
    "url": "assets/fonts/KaTeX_Fraktur-Bold.4de87d40.woff",
    "revision": "4de87d40f0389255d975c69d45a0a7e7"
  },
  {
    "url": "assets/fonts/KaTeX_Fraktur-Bold.7a3757c0.woff2",
    "revision": "7a3757c0bfc580d91012d092ec8f06cb"
  },
  {
    "url": "assets/fonts/KaTeX_Fraktur-Bold.ed330126.ttf",
    "revision": "ed330126290a846bf0bb78f61aa6a080"
  },
  {
    "url": "assets/fonts/KaTeX_Fraktur-Regular.450cc4d9.woff2",
    "revision": "450cc4d9319c4a438dd00514efac941b"
  },
  {
    "url": "assets/fonts/KaTeX_Fraktur-Regular.82d05fe2.ttf",
    "revision": "82d05fe2abb0da9d1077110efada0f6e"
  },
  {
    "url": "assets/fonts/KaTeX_Fraktur-Regular.dc4e330b.woff",
    "revision": "dc4e330b6334767a16619c60d9ebce8c"
  },
  {
    "url": "assets/fonts/KaTeX_Main-Bold.2e1915b1.ttf",
    "revision": "2e1915b1a2f33c8ca9d1534193e934d7"
  },
  {
    "url": "assets/fonts/KaTeX_Main-Bold.62c69756.woff",
    "revision": "62c69756b3f1ca7b52fea2bea1030cd2"
  },
  {
    "url": "assets/fonts/KaTeX_Main-Bold.78b0124f.woff2",
    "revision": "78b0124fc13059862cfbe4c95ff68583"
  },
  {
    "url": "assets/fonts/KaTeX_Main-BoldItalic.0d817b48.ttf",
    "revision": "0d817b487b7fc993bda7dddba745d497"
  },
  {
    "url": "assets/fonts/KaTeX_Main-BoldItalic.a2e3dcd2.woff",
    "revision": "a2e3dcd2316f5002ee2b5f35614849a8"
  },
  {
    "url": "assets/fonts/KaTeX_Main-BoldItalic.c7213ceb.woff2",
    "revision": "c7213ceb79250c2ca46cc34ff3b1aa49"
  },
  {
    "url": "assets/fonts/KaTeX_Main-Italic.081073fd.woff",
    "revision": "081073fd6a7c66073ad231db887de944"
  },
  {
    "url": "assets/fonts/KaTeX_Main-Italic.767e06e1.ttf",
    "revision": "767e06e1df6abd16e092684bffa71c38"
  },
  {
    "url": "assets/fonts/KaTeX_Main-Italic.eea32672.woff2",
    "revision": "eea32672f64250e9d1dfb68177c20a26"
  },
  {
    "url": "assets/fonts/KaTeX_Main-Regular.689bbe6b.ttf",
    "revision": "689bbe6b67f22ffb51b15cc6cfa8facf"
  },
  {
    "url": "assets/fonts/KaTeX_Main-Regular.756fad0d.woff",
    "revision": "756fad0d6f3dff1062cfa951751d744c"
  },
  {
    "url": "assets/fonts/KaTeX_Main-Regular.f30e3b21.woff2",
    "revision": "f30e3b213e9a74cf7563b0c3ee878436"
  },
  {
    "url": "assets/fonts/KaTeX_Math-BoldItalic.753ca3df.woff2",
    "revision": "753ca3dfa44302604bec8e08412ad1c1"
  },
  {
    "url": "assets/fonts/KaTeX_Math-BoldItalic.b3e80ff3.woff",
    "revision": "b3e80ff3816595ffb07082257d30b24f"
  },
  {
    "url": "assets/fonts/KaTeX_Math-BoldItalic.d9377b53.ttf",
    "revision": "d9377b53f267ef7669fbcce45a74d4c7"
  },
  {
    "url": "assets/fonts/KaTeX_Math-Italic.0343f93e.ttf",
    "revision": "0343f93ed09558b81aaca43fc4386462"
  },
  {
    "url": "assets/fonts/KaTeX_Math-Italic.2a39f382.woff2",
    "revision": "2a39f3827133ad0aeb2087d10411cbf2"
  },
  {
    "url": "assets/fonts/KaTeX_Math-Italic.67710bb2.woff",
    "revision": "67710bb2357b8ee5c04d169dc440c69d"
  },
  {
    "url": "assets/fonts/KaTeX_SansSerif-Bold.59b37733.woff2",
    "revision": "59b3773389adfb2b21238892c08322ca"
  },
  {
    "url": "assets/fonts/KaTeX_SansSerif-Bold.dfcc59ad.ttf",
    "revision": "dfcc59ad994a0513b07ef3309b8b5159"
  },
  {
    "url": "assets/fonts/KaTeX_SansSerif-Bold.f28c4fa2.woff",
    "revision": "f28c4fa28f596796702fea3716d82052"
  },
  {
    "url": "assets/fonts/KaTeX_SansSerif-Italic.3ab5188c.ttf",
    "revision": "3ab5188c9aadedf425ea63c6b6568df7"
  },
  {
    "url": "assets/fonts/KaTeX_SansSerif-Italic.99ad93a4.woff2",
    "revision": "99ad93a4600c7b00b961d70943259032"
  },
  {
    "url": "assets/fonts/KaTeX_SansSerif-Italic.9d0fdf5d.woff",
    "revision": "9d0fdf5d7d27b0e3bdc740d90b40ec57"
  },
  {
    "url": "assets/fonts/KaTeX_SansSerif-Regular.6c3bd5b5.woff",
    "revision": "6c3bd5b57f7eba215a2d37e2e28077f1"
  },
  {
    "url": "assets/fonts/KaTeX_SansSerif-Regular.badf3598.woff2",
    "revision": "badf3598c22478fd9155a49391ecd396"
  },
  {
    "url": "assets/fonts/KaTeX_SansSerif-Regular.d511ebce.ttf",
    "revision": "d511ebcef253ab53775576f28315f350"
  },
  {
    "url": "assets/fonts/KaTeX_Script-Regular.082640ca.ttf",
    "revision": "082640ca4242bb2aade86855e4d7d5f6"
  },
  {
    "url": "assets/fonts/KaTeX_Script-Regular.4edf4e0f.woff",
    "revision": "4edf4e0fd49c8a5680dd541c05f16a4c"
  },
  {
    "url": "assets/fonts/KaTeX_Script-Regular.af7bc98b.woff2",
    "revision": "af7bc98b2200573686405dc784f53cf2"
  },
  {
    "url": "assets/fonts/KaTeX_Size1-Regular.2c2dc3b0.ttf",
    "revision": "2c2dc3b057bb48b80bc785ac3d87ecf8"
  },
  {
    "url": "assets/fonts/KaTeX_Size2-Regular.114ad198.ttf",
    "revision": "114ad19833311359052ad1a174159262"
  },
  {
    "url": "assets/fonts/KaTeX_Size4-Regular.70174da7.ttf",
    "revision": "70174da79d1707501c10e07872e84667"
  },
  {
    "url": "assets/fonts/KaTeX_Typewriter-Regular.35fe2cce.ttf",
    "revision": "35fe2cce0791c276b8e919decd873f5b"
  },
  {
    "url": "assets/fonts/KaTeX_Typewriter-Regular.53dcf861.woff",
    "revision": "53dcf861876aae6f3a6a6004dc3bc758"
  },
  {
    "url": "assets/fonts/KaTeX_Typewriter-Regular.641339e2.woff2",
    "revision": "641339e2cd86c7816bfb8028ee7f86e0"
  },
  {
    "url": "assets/fonts/ShofarRegular.f4e6d5ee.ttf",
    "revision": "f4e6d5ee90ac7f46c16331e203683c65"
  },
  {
    "url": "assets/fonts/ShofarRegularOblique.b91783bb.ttf",
    "revision": "b91783bbb41395b47c9af2b74c43e1a7"
  },
  {
    "url": "assets/js/1.8673133c.js",
    "revision": "27edfd9b7f259ba810fafd198fc98ef8"
  },
  {
    "url": "assets/js/10.2c16bf10.js",
    "revision": "b3a06a049aa8a88316c66540c165e949"
  },
  {
    "url": "assets/js/11.495d11cb.js",
    "revision": "1fb17b208119d311d1b1fb3f231768ca"
  },
  {
    "url": "assets/js/12.c3401156.js",
    "revision": "edcf35cb2746e7c9f6a549068cdd8c17"
  },
  {
    "url": "assets/js/13.4d5dfbd7.js",
    "revision": "8e090909419af3c5a8031f7baf2a5ad7"
  },
  {
    "url": "assets/js/14.96fa3d81.js",
    "revision": "facad2520a7d283a5fea540424581f48"
  },
  {
    "url": "assets/js/15.478a460d.js",
    "revision": "89db08a06d576bdab2fff47e48f34175"
  },
  {
    "url": "assets/js/16.60ff7a0b.js",
    "revision": "2d902cb3f92af648117d427c36247576"
  },
  {
    "url": "assets/js/17.c3498001.js",
    "revision": "cafd11b27d224d10159fdea7fe9fc0b5"
  },
  {
    "url": "assets/js/18.74ea2357.js",
    "revision": "ceea1bf2b25296ae458ac9e070244b89"
  },
  {
    "url": "assets/js/19.7d05a11c.js",
    "revision": "cc7c08f906efff0a622666cdab3de1b4"
  },
  {
    "url": "assets/js/2.1081625a.js",
    "revision": "bb9905c21dacdfaebba917be714a447f"
  },
  {
    "url": "assets/js/20.74a6b08a.js",
    "revision": "71bab17f2d35686f2bbf9475ca67fbe6"
  },
  {
    "url": "assets/js/21.a7b30ffe.js",
    "revision": "9055259e15683ede4bcfd7e6dc2e29db"
  },
  {
    "url": "assets/js/22.a1895cfd.js",
    "revision": "208c1928fa215b8a7c9e74461709643f"
  },
  {
    "url": "assets/js/23.4084236d.js",
    "revision": "8086b22c6e8e59d643d4054614b36417"
  },
  {
    "url": "assets/js/24.70e91d57.js",
    "revision": "04eea9fbf6578d81e504b0d3235e0c11"
  },
  {
    "url": "assets/js/25.f6abe364.js",
    "revision": "b9abe581c6865ca6be5586b62361df72"
  },
  {
    "url": "assets/js/26.edf25289.js",
    "revision": "e39a30dbc991f2f883cc5a735a031788"
  },
  {
    "url": "assets/js/27.fe1f7781.js",
    "revision": "042ec6014c328fb2d8aaf21c946d5c3b"
  },
  {
    "url": "assets/js/28.a1db7f62.js",
    "revision": "46f58170fcaffac88cf6ffd80f974c33"
  },
  {
    "url": "assets/js/29.fb5848f6.js",
    "revision": "bb60e8fa612098488a2a1fe584806949"
  },
  {
    "url": "assets/js/3.a7cb83d7.js",
    "revision": "277b3245c665fc797d2b8e355d6d4ba6"
  },
  {
    "url": "assets/js/30.a212050d.js",
    "revision": "815d1114247c98db74e8c32a165eef3a"
  },
  {
    "url": "assets/js/31.76618571.js",
    "revision": "e0e868ce474a1a98ac2193b33c2eb975"
  },
  {
    "url": "assets/js/32.cd4cfd09.js",
    "revision": "9758d0ca8085c52cc48a9780ec975ff8"
  },
  {
    "url": "assets/js/33.7510ce65.js",
    "revision": "113033f91b4fa746051bd7735960f105"
  },
  {
    "url": "assets/js/34.09bcc84c.js",
    "revision": "b6e4f446f9bc8dadcf84cc13468ce360"
  },
  {
    "url": "assets/js/35.2be54323.js",
    "revision": "a41ce51b91cd3a5cbc311402e6cff974"
  },
  {
    "url": "assets/js/36.d9a1a7e0.js",
    "revision": "fe65c37e52078376957dfe92fd790553"
  },
  {
    "url": "assets/js/37.bc1d47dc.js",
    "revision": "b64eddc21685f24769f739456325c091"
  },
  {
    "url": "assets/js/5.0a8810de.js",
    "revision": "03490fdd1bcbec67b67b9cfea44bd5c4"
  },
  {
    "url": "assets/js/6.de0f4c7b.js",
    "revision": "c7b716be72ed415cc4b82c1ac280f6d4"
  },
  {
    "url": "assets/js/7.a0709697.js",
    "revision": "63ed881a8dfa29f4bc42ee8924660848"
  },
  {
    "url": "assets/js/8.9955c70b.js",
    "revision": "044f61242ea9a2047ac339fc5bb75908"
  },
  {
    "url": "assets/js/9.09f8ccf4.js",
    "revision": "426864310c8f949376480ff606db1abb"
  },
  {
    "url": "assets/js/app.a0c0dc95.js",
    "revision": "5bbb695655eb8ae6e4fae72cd3a6c3f6"
  },
  {
    "url": "composition-book/index.html",
    "revision": "d978a52bf775d8852b842587e541245a"
  },
  {
    "url": "derech-hapeima/index.html",
    "revision": "a06ec0d9c04e139c9a8985f915e7317f"
  },
  {
    "url": "images/david-symbol-transparent.png",
    "revision": "0d70757a5f1ffead6bfe3b4e5ac412f5"
  },
  {
    "url": "images/derech-hapeima/caressing.jpg",
    "revision": "c541e98c21a9498d58ef56159f8220b3"
  },
  {
    "url": "images/derech-hapeima/classification.jpg",
    "revision": "3ebf9bbc67cbf96df99468e175b716dc"
  },
  {
    "url": "images/derech-hapeima/cover.jpg",
    "revision": "dd6abdc164369c0546079dbaa1178653"
  },
  {
    "url": "images/derech-hapeima/darwish.jpg",
    "revision": "20025b59c22750083cbae02ea76b1a25"
  },
  {
    "url": "images/derech-hapeima/david-symbol.jpg",
    "revision": "affe75354121d1e561da150390a5ec9a"
  },
  {
    "url": "images/derech-hapeima/david.jpg",
    "revision": "759e4b032232de81f4572a4fe18867f7"
  },
  {
    "url": "images/derech-hapeima/disentanglement.jpg",
    "revision": "756e297babe121f50633d3154b9844bb"
  },
  {
    "url": "images/derech-hapeima/drainage-divide.jpg",
    "revision": "4b4b8a98400fdc298967b367de8b2529"
  },
  {
    "url": "images/derech-hapeima/filipe.jpg",
    "revision": "a0c74a1aeb3b2c874bd54c6cb78b12ed"
  },
  {
    "url": "images/derech-hapeima/forcefulness.jpg",
    "revision": "3f202f49d02bcd031f454ddc8f2964e8"
  },
  {
    "url": "images/derech-hapeima/kissing.jpg",
    "revision": "9bd8030c6c78c6a292a9f73c1e561610"
  },
  {
    "url": "images/derech-hapeima/merkavah-arrows.jpg",
    "revision": "2f4905059edc68854f7742498e7dbfd6"
  },
  {
    "url": "images/derech-hapeima/merkavah-body.jpg",
    "revision": "8841797a891d519f321018b9c5442b46"
  },
  {
    "url": "images/derech-hapeima/merkavah-personal.jpg",
    "revision": "c84a18c5d1f50aad457dae98f09ab848"
  },
  {
    "url": "images/derech-hapeima/mountain.jpg",
    "revision": "f62410b19320cfd43f6335a8b8b07a29"
  },
  {
    "url": "images/derech-hapeima/movement.jpg",
    "revision": "b32466f352524ebab4aadca92edf4b90"
  },
  {
    "url": "images/derech-hapeima/nostalgia.jpg",
    "revision": "fa8f3a9f0a5a378edc93c1045b61816e"
  },
  {
    "url": "images/derech-hapeima/paradoxality.jpg",
    "revision": "3173060aee833c95a9cc11d7d0800883"
  },
  {
    "url": "images/derech-hapeima/sanity.jpg",
    "revision": "75c44bc76eba1408f7e1997e5e049197"
  },
  {
    "url": "images/derech-hapeima/west.jpg",
    "revision": "4f71e726f26bbfb83745fe414b513822"
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
    "url": "images/intro/hapeima-model.png",
    "revision": "3eb39cf15e0f036f3ac7849ae5c20a38"
  },
  {
    "url": "images/intro/merkavah-qualities-mapping.png",
    "revision": "3b753e0930be0dbf9c7d91eb86734306"
  },
  {
    "url": "images/intro/sacred-geometry.png",
    "revision": "47a36f1493af679ee1d0cdc910edce05"
  },
  {
    "url": "images/intro/soul-healing-model.png",
    "revision": "af384ea377fea8611985041783b7c4d6"
  },
  {
    "url": "images/mishvaot-hapeima/axis-z.jpg",
    "revision": "c47c2a6c9b0f6a43158a3f30dc40fa30"
  },
  {
    "url": "images/mishvaot-hapeima/constant-m.jpg",
    "revision": "3c35e26284643ce36ae1099c14d50fde"
  },
  {
    "url": "images/mishvaot-hapeima/constant-n.jpg",
    "revision": "e05525552d556cf974cb905fc2fd35b0"
  },
  {
    "url": "images/mishvaot-hapeima/equation-balance.jpg",
    "revision": "2e69c8cf09f240a416db1e712fc97f95"
  },
  {
    "url": "images/mishvaot-hapeima/equation-human.jpg",
    "revision": "8d66f6b80e1550e2f82a777a73fa0309"
  },
  {
    "url": "images/mishvaot-hapeima/equation-i.jpg",
    "revision": "d9613fcc5033cf035b4c1ac55072c11b"
  },
  {
    "url": "images/mishvaot-hapeima/equation-maaseh-merkavah.jpg",
    "revision": "d23aa892f8e6d66c8febc9ed2dc794b3"
  },
  {
    "url": "images/mishvaot-hapeima/equation-one.jpg",
    "revision": "07a3096dce422dc0d6db28f4207f07fb"
  },
  {
    "url": "images/mishvaot-hapeima/equation-soul.jpg",
    "revision": "0bbe65342cbe85710db33955db954743"
  },
  {
    "url": "images/mishvaot-hapeima/equation-two.jpg",
    "revision": "4ec331ee1466bdb7f9fc002da0a3dd2c"
  },
  {
    "url": "images/mishvaot-hapeima/equation-way.jpg",
    "revision": "5d80bbbb04385aafb4f51f200c0deedb"
  },
  {
    "url": "images/mishvaot-hapeima/equation-zero.jpg",
    "revision": "e01c2d80380672dfc64f3d03b04f8022"
  },
  {
    "url": "images/mishvaot-hapeima/merkavah-axes.jpg",
    "revision": "133bd90f618b452ffe6f34cfbc7dac96"
  },
  {
    "url": "images/mishvaot-hapeima/merkavah-letter-values.jpg",
    "revision": "82bdac2a0388fa6d1561ce0902167625"
  },
  {
    "url": "images/mishvaot-hapeima/merkavah-logo.jpg",
    "revision": "0e6fc47637f1772d6b9adbffa995917d"
  },
  {
    "url": "images/mishvaot-hapeima/merkavah-mapping.jpg",
    "revision": "ef032425543696d3d03336370951185f"
  },
  {
    "url": "images/mishvaot-hapeima/system-axes-values.jpg",
    "revision": "ec599df73dab7e16674b715489f3d35c"
  },
  {
    "url": "images/mishvaot-hapeima/system-mapping.jpg",
    "revision": "a6edcd2d6294fc2454d11cb3e8005629"
  },
  {
    "url": "images/mishvaot-hapeima/variable-m.jpg",
    "revision": "74b03d0c8ea4e6de0c2418bcfe8d0343"
  },
  {
    "url": "images/rosetta-stone/icon-down-arrow.png",
    "revision": "077613251f4f68c2c8e07f7bda643a86"
  },
  {
    "url": "images/rosetta-stone/legend-composition.jpg",
    "revision": "a4bfe1b9a960a620e9d401bacff3f7bd"
  },
  {
    "url": "images/rosetta-stone/ndd/10.svg",
    "revision": "e8bb83392b34a6f4d668d2824924ca77"
  },
  {
    "url": "images/rosetta-stone/ndd/5.svg",
    "revision": "fe6d12f6cf09e16549510f1a79477a84"
  },
  {
    "url": "images/rosetta-stone/ndd/6.svg",
    "revision": "f6cae1eb90aa25d28e227ba6b295c2f1"
  },
  {
    "url": "images/rosetta-stone/ndd/7.svg",
    "revision": "fe95414ae6244766dce1b71a7f06ed1d"
  },
  {
    "url": "images/rosetta-stone/ndd/8.svg",
    "revision": "61626bd1a511daab4333f742a8f4691c"
  },
  {
    "url": "images/rosetta-stone/ndd/9.svg",
    "revision": "dcfed7e0bbb29357c33003a41cfb002f"
  },
  {
    "url": "images/rosetta-stone/ndd/Air.svg",
    "revision": "1c555cca3f5a21e81318a60058783560"
  },
  {
    "url": "images/rosetta-stone/ndd/Dot.svg",
    "revision": "b3f1c6bef11a504641ca2fb27157bd54"
  },
  {
    "url": "images/rosetta-stone/ndd/Eternity.svg",
    "revision": "9123157d8fb355371d62ca5908c513fd"
  },
  {
    "url": "images/rosetta-stone/ndd/Fire.svg",
    "revision": "4bbe8b2a250413b2f13523ffeb0ba003"
  },
  {
    "url": "images/rosetta-stone/ndd/Insight.svg",
    "revision": "f38a31c85dec690d7fff02805535913a"
  },
  {
    "url": "images/rosetta-stone/ndd/Love.svg",
    "revision": "7b9e7afbce7299ed7bb7a82049af0a8c"
  },
  {
    "url": "images/rosetta-stone/ndd/Pulse.svg",
    "revision": "09878a9e4e51fc4aac0851cd224ad19d"
  },
  {
    "url": "images/rosetta-stone/ndd/Water.svg",
    "revision": "12aea4a2423dedf8adf25b6f9ecc69ff"
  },
  {
    "url": "images/rosetta-stone/ndd/ג.svg",
    "revision": "7e13a40d4b3928707dc613e7d3e784e3"
  },
  {
    "url": "images/rosetta-stone/ndd/ד.svg",
    "revision": "6840ef85ba3adfaf20181907b9cd2353"
  },
  {
    "url": "images/rosetta-stone/ndd/ה.svg",
    "revision": "37cf36c7bd11da7020da889fb2256b18"
  },
  {
    "url": "images/rosetta-stone/ndd/ו.svg",
    "revision": "aaa9fb467dd9ac3ce90368f759af5bbf"
  },
  {
    "url": "images/rosetta-stone/ndd/ז.svg",
    "revision": "ca10e9d7b07a8b43cb76a6038d58466b"
  },
  {
    "url": "images/rosetta-stone/ndd/ח.svg",
    "revision": "e064eae1e6ff8cc49c60101fe722c67a"
  },
  {
    "url": "images/rosetta-stone/ndd/ט.svg",
    "revision": "c112fb72299d92128b533305e1ab9cef"
  },
  {
    "url": "images/rosetta-stone/ndd/י.svg",
    "revision": "0c645641c98e7df57fbe3aaf512468f3"
  },
  {
    "url": "images/rosetta-stone/ndd/כ.svg",
    "revision": "4d962a31ac4e22952c8bf6b2722458c0"
  },
  {
    "url": "images/rosetta-stone/ndd/ל.svg",
    "revision": "64011dea5640d3cc40f838cffd8058ef"
  },
  {
    "url": "images/rosetta-stone/ndd/נ.svg",
    "revision": "6b4be5517b4953edc2fb1ab8a0ea1c8f"
  },
  {
    "url": "images/rosetta-stone/ndd/ס.svg",
    "revision": "83ac197d286c867f406db95adb6aac7c"
  },
  {
    "url": "images/rosetta-stone/ndd/ע.svg",
    "revision": "0eed18beb51f908cef7234fe5e6606c7"
  },
  {
    "url": "images/rosetta-stone/ndd/פ.svg",
    "revision": "f9079985304e3a1618807df8eb94061c"
  },
  {
    "url": "images/rosetta-stone/ndd/צ.svg",
    "revision": "bcbba1ac733136796be58a47d87e118e"
  },
  {
    "url": "images/rosetta-stone/ndd/ק.svg",
    "revision": "7dacb9ffd1f16d5fd8316f396e06af82"
  },
  {
    "url": "images/rosetta-stone/ndd/ר.svg",
    "revision": "c53e0920f4890b7deb788f04b41c699a"
  },
  {
    "url": "images/rosetta-stone/ndd/ת.svg",
    "revision": "4b2b89c0acb665803dc0a610dafe7f1b"
  },
  {
    "url": "images/sipur-hayahhid/applicative-philosophy.jpg",
    "revision": "2db7904fb9f15f1a5645f06fada638c5"
  },
  {
    "url": "images/sipur-hayahhid/cover.jpg",
    "revision": "40107ac0add9b298299d6074c0a09728"
  },
  {
    "url": "images/sipur-hayahhid/cycle-mentoring.jpg",
    "revision": "e8fdc072ed994e8f855901bdb3fe11ab"
  },
  {
    "url": "images/sipur-hayahhid/hachildhood.jpg",
    "revision": "93a3bb92a93fcf1ac35eaf5ffd02772c"
  },
  {
    "url": "images/sipur-hayahhid/hacore.jpg",
    "revision": "6154561b6e038f49e36a823cfc33ce25"
  },
  {
    "url": "images/sipur-hayahhid/hacreation.jpg",
    "revision": "c70e82718528364c4eeec636abb954d3"
  },
  {
    "url": "images/sipur-hayahhid/hafamily.jpg",
    "revision": "3f0952d8335264548adc1d00e71702f0"
  },
  {
    "url": "images/sipur-hayahhid/hahome.jpg",
    "revision": "61609de57a0f30a41eebc393aff33536"
  },
  {
    "url": "images/sipur-hayahhid/hame.jpg",
    "revision": "1e8fc413203580836b39a3a898399825"
  },
  {
    "url": "images/sipur-hayahhid/hatrauma.jpg",
    "revision": "19a8e93a3b9adb1288d6ebac7e82c5e0"
  },
  {
    "url": "images/sipur-hayahhid/kingdom-spheres.jpg",
    "revision": "d6959b0d955ccb5abe98909eccf19f9d"
  },
  {
    "url": "images/sipur-hayahhid/map-body-of-soul.jpg",
    "revision": "2829744c4b74b0281d75e55ab039935e"
  },
  {
    "url": "images/sipur-hayahhid/principles-pulsetherapy.jpg",
    "revision": "dc957535dc106d7f757457cc9263e210"
  },
  {
    "url": "images/sipur-hayahhid/shelter-parvati.jpg",
    "revision": "b42264d9453bd9f9c629ab23e5daa2cd"
  },
  {
    "url": "images/sipur-hayahhid/shelter-sinai.jpg",
    "revision": "7c81a7f12df4a6dc34ed95b5e62f3602"
  },
  {
    "url": "images/sipur-hayahhid/space-school.jpg",
    "revision": "dc5ad0d388d7dc470b4d6c2843a095dd"
  },
  {
    "url": "images/sipur-hayahhid/turnover.jpg",
    "revision": "b2dd4215f7a2ae6a2dbf702e1cf67275"
  },
  {
    "url": "images/slideshow/cosmology-model.jpg",
    "revision": "a8747aafef0d86182ff38e1beca4efdf"
  },
  {
    "url": "images/slideshow/equation-terra-dynamics.jpg",
    "revision": "3cb5d29bb0d5418144b97cd5eda77912"
  },
  {
    "url": "images/slideshow/layered-model.jpg",
    "revision": "594d5c02f8708489ba7d814715a83102"
  },
  {
    "url": "images/slideshow/osi-model.svg",
    "revision": "02e9fbf43294065e23c0bd8a2686f79c"
  },
  {
    "url": "images/spacer.png",
    "revision": "f9fb1d9849c9caa5f81dac4f1418151a"
  },
  {
    "url": "index.html",
    "revision": "15ac9f3b9f654dad5c4b6dc2e1d8ebd1"
  },
  {
    "url": "intro/index.html",
    "revision": "481aa3055b8be0a5d07476ed3d0c7784"
  },
  {
    "url": "mishvaot-hapeima/index.html",
    "revision": "d3b5ba2d7f237d875dcee6b814842125"
  },
  {
    "url": "print-all/index.html",
    "revision": "70cc1e08bfdf203f16050c8cad216acf"
  },
  {
    "url": "rosetta-stone/index.html",
    "revision": "9047ebb060a99fa580633d171f174388"
  },
  {
    "url": "sefer-yetzira/index.html",
    "revision": "0a1616c84eb36beba1d3de11261276bc"
  },
  {
    "url": "sipur-hayahhid/index.html",
    "revision": "8ad93187eceed0e2d20c44926799671e"
  },
  {
    "url": "slideshow/index.html",
    "revision": "70184e2be6cc949108d351d64425fe5d"
  },
  {
    "url": "sod-haiibur/index.html",
    "revision": "217ee9793f9efed47d1596295c616296"
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
