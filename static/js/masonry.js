(function () {
  "use strict";
  document.querySelectorAll("[data-masonry]").forEach(function (feed) {
    var cards = Array.from(feed.querySelectorAll(".grid-item"));
    if (!cards.length) return;
    var frame = 0;
    function schedule() {
      if (!frame) frame = requestAnimationFrame(layout);
    }
    function layout() {
      frame = 0;
      var style = getComputedStyle(feed);
      var columns = parseInt(style.getPropertyValue("--photo-columns"), 10) || 1;
      var gap = parseFloat(style.getPropertyValue("--photo-gap")) || 0;
      var width = feed.clientWidth;
      if (!width) return;
      var cardWidth = (width - gap * (columns - 1)) / columns;
      cards.forEach(function (card) { card.style.width = cardWidth + "px"; });
      feed.classList.add("is-masonry");
      var heights = new Array(columns).fill(0);
      cards.forEach(function (card) {
        var column = heights.indexOf(Math.min.apply(null, heights));
        card.style.transform = "translate(" + column * (cardWidth + gap) + "px," + heights[column] + "px)";
        heights[column] += card.getBoundingClientRect().height + gap;
      });
      feed.style.height = Math.max(0, Math.max.apply(null, heights) - gap) + "px";
    }
    // Repack as lazy images arrive, including failures, without waiting for the whole gallery.
    feed.querySelectorAll("img").forEach(function (img) {
      img.addEventListener("load", schedule);
      img.addEventListener("error", schedule);
    });
    if (window.ResizeObserver) {
      var previousWidth = 0;
      new ResizeObserver(function () {
        if (feed.clientWidth !== previousWidth) {
          previousWidth = feed.clientWidth;
          schedule();
        }
      }).observe(feed);
      var cardObserver = new ResizeObserver(schedule);
      cards.forEach(function (card) { cardObserver.observe(card); });
    }
    window.addEventListener("resize", schedule);
    schedule();
  });
})();
