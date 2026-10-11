(function () {
  "use strict";
  document.addEventListener("DOMContentLoaded", function () {
    var toggle = document.querySelector("[data-theme-toggle]");
    if (toggle) toggle.addEventListener("click", function () {
      var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem("cactus-theme", next); } catch (e) {}
    });
    var menu = document.querySelector("[data-menu-toggle]");
    var header = document.getElementById("main-header");
    if (!menu || !header) return;
    function setMenu(open) {
      menu.setAttribute("aria-expanded", String(open));
      header.classList.toggle("menu-open", open);
      document.body.classList.toggle("is-menu-open", open);
    }
    menu.addEventListener("click", function () {
      setMenu(menu.getAttribute("aria-expanded") !== "true");
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && menu.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        menu.focus();
      }
    });
    window.matchMedia("(min-width: 640px)").addEventListener("change", function (event) {
      if (event.matches) setMenu(false);
    });
  });
})();
