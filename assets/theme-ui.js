(function () {
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  var btns = document.querySelectorAll("[data-mode-btn]");
  function paint() {
    document.documentElement.setAttribute("data-mode", window.__resolveMode(window.__mode));
    btns.forEach(function (b) {
      b.setAttribute("aria-pressed", b.dataset.modeBtn === window.__mode ? "true" : "false");
    });
  }
  btns.forEach(function (b) {
    b.addEventListener("click", function () {
      window.__mode = b.dataset.modeBtn;
      try { localStorage.setItem("fd-color-mode", window.__mode); } catch (e) {}
      paint();
    });
  });
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", paint);
  setInterval(paint, 600000);
  paint();
})();
