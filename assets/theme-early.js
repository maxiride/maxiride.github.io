/* Color mode: saved choice, else after local sunset or OS preference.
   Coordinates: Rome. Runs synchronously in <head> to avoid a flash of the wrong theme. */
(function () {
  var LAT = 41.9, LON = 12.5;
  function afterSunset() {
    var now = new Date(), rad = Math.PI / 180;
    var doy = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
    var dec = 23.44 * Math.sin(rad * 360 * (doy - 81) / 365);
    var cosH = -Math.tan(LAT * rad) * Math.tan(dec * rad);
    if (cosH <= -1) return false;
    if (cosH >= 1) return true;
    var h = Math.acos(cosH) / rad / 15;
    var noon = 12 + (-now.getTimezoneOffset() / 60 - LON / 15);
    var local = now.getHours() + now.getMinutes() / 60;
    return local >= noon + h || local < noon - h;
  }
  window.__resolveMode = function (mode) {
    if (mode === "dark" || mode === "light") return mode;
    var prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return (afterSunset() || prefers) ? "dark" : "light";
  };
  var saved = null;
  try { saved = localStorage.getItem("fd-color-mode"); } catch (e) {}
  window.__mode = ["auto", "light", "dark"].indexOf(saved) > -1 ? saved : "auto";
  document.documentElement.setAttribute("data-mode", window.__resolveMode(window.__mode));
})();
