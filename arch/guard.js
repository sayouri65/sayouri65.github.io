// Archive gate guard — include this as the FIRST script in <head>,
// before any stylesheet or content, on every page under /arch that
// should require the password. Uses document.currentScript so it works
// no matter how deeply nested the including page is.
(function () {
    "use strict";

    var AUTH_KEY = "archAuth";
    var MAX_AGE_MS = 3 * 60 * 60 * 1000; // 3 hours

    function isAuthed() {
        try {
            var raw = sessionStorage.getItem(AUTH_KEY);
            if (!raw) return false;
            var data = JSON.parse(raw);
            return typeof data.ts === "number" && (Date.now() - data.ts) < MAX_AGE_MS;
        } catch (e) {
            return false;
        }
    }

    if (isAuthed()) return;

    var scriptEl = document.currentScript;
    var base = scriptEl ? scriptEl.src.replace(/guard\.js(\?.*)?$/, "") : "/arch/";
    var gateUrl = base + "index.html?redirect=" + encodeURIComponent(location.href);

    location.replace(gateUrl);
})();
