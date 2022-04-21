if (!self.define) {
    let e,
        s = {};
    const a = (a, c) => (
        (a = new URL(a + ".js", c).href),
        s[a] ||
            new Promise((s) => {
                if ("document" in self) {
                    const e = document.createElement("script");
                    (e.src = a), (e.onload = s), document.head.appendChild(e);
                } else (e = a), importScripts(a), s();
            }).then(() => {
                let e = s[a];
                if (!e)
                    throw new Error(`Module ${a} didn’t register its module`);
                return e;
            })
    );
    self.define = (c, n) => {
        const t =
            e ||
            ("document" in self ? document.currentScript.src : "") ||
            location.href;
        if (s[t]) return;
        let i = {};
        const r = (e) => a(e, t),
            o = { module: { uri: t }, exports: i, require: r };
        s[t] = Promise.all(c.map((e) => o[e] || r(e))).then(
            (e) => (n(...e), i)
        );
    };
}
define(["./workbox-6316bd60"], function (e) {
    "use strict";
    importScripts("fallback-XLNZMfjtg27On_KjLZejv.js"),
        self.skipWaiting(),
        e.clientsClaim(),
        e.precacheAndRoute(
            [
                {
                    url: "/_next/static/XLNZMfjtg27On_KjLZejv/_buildManifest.js",
                    revision: "789202adf1d7346c63dfa16306917cdc",
                },
                {
                    url: "/_next/static/XLNZMfjtg27On_KjLZejv/_middlewareManifest.js",
                    revision: "fb2823d66b3e778e04a3f681d0d2fb19",
                },
                {
                    url: "/_next/static/XLNZMfjtg27On_KjLZejv/_ssgManifest.js",
                    revision: "b6652df95db52feb4daf4eca35380933",
                },
                {
                    url: "/_next/static/chunks/317-c61febbbb411190e.js",
                    revision: "c61febbbb411190e",
                },
                {
                    url: "/_next/static/chunks/framework-5f4595e5518b5600.js",
                    revision: "5f4595e5518b5600",
                },
                {
                    url: "/_next/static/chunks/main-a50daa4b550c2bff.js",
                    revision: "a50daa4b550c2bff",
                },
                {
                    url: "/_next/static/chunks/pages/Register-00815aa9a99dfa87.js",
                    revision: "00815aa9a99dfa87",
                },
                {
                    url: "/_next/static/chunks/pages/Register/details-1cc30efb3f82a83b.js",
                    revision: "1cc30efb3f82a83b",
                },
                {
                    url: "/_next/static/chunks/pages/Routines-4b54e516a470cb3c.js",
                    revision: "4b54e516a470cb3c",
                },
                {
                    url: "/_next/static/chunks/pages/Routines/%5BStartworkoutid%5D-208ce60f16147c5a.js",
                    revision: "208ce60f16147c5a",
                },
                {
                    url: "/_next/static/chunks/pages/Routines/Createroutine-b0024b0fe856c605.js",
                    revision: "b0024b0fe856c605",
                },
                {
                    url: "/_next/static/chunks/pages/_app-727761ecac9cf3c2.js",
                    revision: "727761ecac9cf3c2",
                },
                {
                    url: "/_next/static/chunks/pages/_error-2280fa386d040b66.js",
                    revision: "2280fa386d040b66",
                },
                {
                    url: "/_next/static/chunks/pages/_offline-7cf691d0b47b9d07.js",
                    revision: "7cf691d0b47b9d07",
                },
                {
                    url: "/_next/static/chunks/pages/addFood-45273d017fe8be64.js",
                    revision: "45273d017fe8be64",
                },
                {
                    url: "/_next/static/chunks/pages/admin-09cde1bdc0cfb4dc.js",
                    revision: "09cde1bdc0cfb4dc",
                },
                {
                    url: "/_next/static/chunks/pages/foodLog-b3ac0fa2b33bcb26.js",
                    revision: "b3ac0fa2b33bcb26",
                },
                {
                    url: "/_next/static/chunks/pages/index-99cbbc320cf889f3.js",
                    revision: "99cbbc320cf889f3",
                },
                {
                    url: "/_next/static/chunks/pages/profile-aa8f80c0665b8911.js",
                    revision: "aa8f80c0665b8911",
                },
                {
                    url: "/_next/static/chunks/pages/settings-6dd5aca45035fda7.js",
                    revision: "6dd5aca45035fda7",
                },
                {
                    url: "/_next/static/chunks/pages/signin-a9d9741934fb0297.js",
                    revision: "a9d9741934fb0297",
                },
                {
                    url: "/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",
                    revision: "99442aec5788bccac9b2f0ead2afdd6b",
                },
                {
                    url: "/_next/static/chunks/webpack-2e51481b1d484a05.js",
                    revision: "2e51481b1d484a05",
                },
                {
                    url: "/_next/static/css/0cbf4ebd92fdf3fb.css",
                    revision: "0cbf4ebd92fdf3fb",
                },
                {
                    url: "/_next/static/css/0fa65e8f01aefdfa.css",
                    revision: "0fa65e8f01aefdfa",
                },
                {
                    url: "/_next/static/css/15ce461bc57877bb.css",
                    revision: "15ce461bc57877bb",
                },
                {
                    url: "/_next/static/css/1affee27953e5e37.css",
                    revision: "1affee27953e5e37",
                },
                {
                    url: "/_next/static/css/56cac28e0b98c79d.css",
                    revision: "56cac28e0b98c79d",
                },
                {
                    url: "/_next/static/css/83965d89d925f5b5.css",
                    revision: "83965d89d925f5b5",
                },
                {
                    url: "/_next/static/css/8f5890ec7f2593c4.css",
                    revision: "8f5890ec7f2593c4",
                },
                {
                    url: "/_next/static/css/96b6cc07c574afcd.css",
                    revision: "96b6cc07c574afcd",
                },
                {
                    url: "/_next/static/css/ae7b7181d5462d0a.css",
                    revision: "ae7b7181d5462d0a",
                },
                {
                    url: "/_next/static/css/bfca2566df8632f5.css",
                    revision: "bfca2566df8632f5",
                },
                {
                    url: "/_next/static/css/c262057df832615b.css",
                    revision: "c262057df832615b",
                },
                {
                    url: "/_next/static/css/e7a573aab0cbcebd.css",
                    revision: "e7a573aab0cbcebd",
                },
                { url: "/_offline", revision: "XLNZMfjtg27On_KjLZejv" },
                {
                    url: "/favicon.ico",
                    revision: "c30c7d42707a47a3f4591831641e50dc",
                },
                {
                    url: "/icon-192x192.png",
                    revision: "a31e991900f95236ee1c988d80d6801c",
                },
                {
                    url: "/icon-256x256.png",
                    revision: "ae7f0e1c117abfebba4a8cc1ba63a959",
                },
                {
                    url: "/icon-384x384.png",
                    revision: "165aaab5835b5ebdca3a05c5936c7a9d",
                },
                {
                    url: "/icon-512x512.png",
                    revision: "faa5a5dae49598598eae804f0a274ea7",
                },
                {
                    url: "/manifest.json",
                    revision: "bf303cb1dc4af4a4b8687e7de115cd4c",
                },
                {
                    url: "/vercel.svg",
                    revision: "4b4f1876502eb6721764637fe5c41702",
                },
            ],
            { ignoreURLParametersMatching: [] }
        ),
        e.cleanupOutdatedCaches(),
        e.registerRoute(
            "/",
            new e.NetworkFirst({
                cacheName: "start-url",
                plugins: [
                    {
                        cacheWillUpdate: async ({
                            request: e,
                            response: s,
                            event: a,
                            state: c,
                        }) =>
                            s && "opaqueredirect" === s.type
                                ? new Response(s.body, {
                                      status: 200,
                                      statusText: "OK",
                                      headers: s.headers,
                                  })
                                : s,
                    },
                    {
                        handlerDidError: async ({ request: e }) =>
                            self.fallback(e),
                    },
                ],
            }),
            "GET"
        ),
        e.registerRoute(
            /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
            new e.CacheFirst({
                cacheName: "google-fonts-webfonts",
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 4,
                        maxAgeSeconds: 31536e3,
                    }),
                    {
                        handlerDidError: async ({ request: e }) =>
                            self.fallback(e),
                    },
                ],
            }),
            "GET"
        ),
        e.registerRoute(
            /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
            new e.StaleWhileRevalidate({
                cacheName: "google-fonts-stylesheets",
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 4,
                        maxAgeSeconds: 604800,
                    }),
                    {
                        handlerDidError: async ({ request: e }) =>
                            self.fallback(e),
                    },
                ],
            }),
            "GET"
        ),
        e.registerRoute(
            /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
            new e.StaleWhileRevalidate({
                cacheName: "static-font-assets",
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 4,
                        maxAgeSeconds: 604800,
                    }),
                    {
                        handlerDidError: async ({ request: e }) =>
                            self.fallback(e),
                    },
                ],
            }),
            "GET"
        ),
        e.registerRoute(
            /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
            new e.StaleWhileRevalidate({
                cacheName: "static-image-assets",
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 64,
                        maxAgeSeconds: 86400,
                    }),
                    {
                        handlerDidError: async ({ request: e }) =>
                            self.fallback(e),
                    },
                ],
            }),
            "GET"
        ),
        e.registerRoute(
            /\/_next\/image\?url=.+$/i,
            new e.StaleWhileRevalidate({
                cacheName: "next-image",
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 64,
                        maxAgeSeconds: 86400,
                    }),
                    {
                        handlerDidError: async ({ request: e }) =>
                            self.fallback(e),
                    },
                ],
            }),
            "GET"
        ),
        e.registerRoute(
            /\.(?:mp3|wav|ogg)$/i,
            new e.CacheFirst({
                cacheName: "static-audio-assets",
                plugins: [
                    new e.RangeRequestsPlugin(),
                    new e.ExpirationPlugin({
                        maxEntries: 32,
                        maxAgeSeconds: 86400,
                    }),
                    {
                        handlerDidError: async ({ request: e }) =>
                            self.fallback(e),
                    },
                ],
            }),
            "GET"
        ),
        e.registerRoute(
            /\.(?:mp4)$/i,
            new e.CacheFirst({
                cacheName: "static-video-assets",
                plugins: [
                    new e.RangeRequestsPlugin(),
                    new e.ExpirationPlugin({
                        maxEntries: 32,
                        maxAgeSeconds: 86400,
                    }),
                    {
                        handlerDidError: async ({ request: e }) =>
                            self.fallback(e),
                    },
                ],
            }),
            "GET"
        ),
        e.registerRoute(
            /\.(?:js)$/i,
            new e.StaleWhileRevalidate({
                cacheName: "static-js-assets",
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 32,
                        maxAgeSeconds: 86400,
                    }),
                    {
                        handlerDidError: async ({ request: e }) =>
                            self.fallback(e),
                    },
                ],
            }),
            "GET"
        ),
        e.registerRoute(
            /\.(?:css|less)$/i,
            new e.StaleWhileRevalidate({
                cacheName: "static-style-assets",
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 32,
                        maxAgeSeconds: 86400,
                    }),
                    {
                        handlerDidError: async ({ request: e }) =>
                            self.fallback(e),
                    },
                ],
            }),
            "GET"
        ),
        e.registerRoute(
            /\/_next\/data\/.+\/.+\.json$/i,
            new e.StaleWhileRevalidate({
                cacheName: "next-data",
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 32,
                        maxAgeSeconds: 86400,
                    }),
                    {
                        handlerDidError: async ({ request: e }) =>
                            self.fallback(e),
                    },
                ],
            }),
            "GET"
        ),
        e.registerRoute(
            /\.(?:json|xml|csv)$/i,
            new e.NetworkFirst({
                cacheName: "static-data-assets",
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 32,
                        maxAgeSeconds: 86400,
                    }),
                    {
                        handlerDidError: async ({ request: e }) =>
                            self.fallback(e),
                    },
                ],
            }),
            "GET"
        ),
        e.registerRoute(
            ({ url: e }) => {
                if (!(self.origin === e.origin)) return !1;
                const s = e.pathname;
                return !s.startsWith("/api/auth/") && !!s.startsWith("/api/");
            },
            new e.NetworkFirst({
                cacheName: "apis",
                networkTimeoutSeconds: 10,
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 16,
                        maxAgeSeconds: 86400,
                    }),
                    {
                        handlerDidError: async ({ request: e }) =>
                            self.fallback(e),
                    },
                ],
            }),
            "GET"
        ),
        e.registerRoute(
            ({ url: e }) => {
                if (!(self.origin === e.origin)) return !1;
                return !e.pathname.startsWith("/api/");
            },
            new e.NetworkFirst({
                cacheName: "others",
                networkTimeoutSeconds: 10,
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 32,
                        maxAgeSeconds: 86400,
                    }),
                    {
                        handlerDidError: async ({ request: e }) =>
                            self.fallback(e),
                    },
                ],
            }),
            "GET"
        ),
        e.registerRoute(
            ({ url: e }) => !(self.origin === e.origin),
            new e.NetworkFirst({
                cacheName: "cross-origin",
                networkTimeoutSeconds: 10,
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 32,
                        maxAgeSeconds: 3600,
                    }),
                    {
                        handlerDidError: async ({ request: e }) =>
                            self.fallback(e),
                    },
                ],
            }),
            "GET"
        );
});
