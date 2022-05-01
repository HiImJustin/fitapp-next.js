const withPWA = require("next-pwa");

module.exports = withPWA({
    pwa: {
        // cacheOnFrontEndNav: true,
        dest: "public",
        swSrc: "service-worker.js",
        register: true,
        // skipWaiting: true,
        disable: process.env.NODE_ENV === "development",
    },
});
