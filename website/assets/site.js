(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      toggle.setAttribute("aria-label", open ? "Open menu" : "Close menu");
      nav.classList.toggle("is-open", !open);
      document.body.classList.toggle("nav-open", !open);
    });
    function closeNav() {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
      nav.classList.remove("is-open");
      document.body.classList.remove("nav-open");
    }
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -36px 0px" }
    );
    document.querySelectorAll(".reveal").forEach(function (el) {
      io.observe(el);
    });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("in");
    });
  }

  var params = new URLSearchParams(window.location.search);
  var track = params.get("track");
  if (track) {
    var select = document.querySelector("select[name='track']");
    if (select) {
      var needle = track.replace(/[-_]/g, " ").toLowerCase();
      var best = -1;
      var bestScore = -1;
      for (var i = 0; i < select.options.length; i++) {
        var text = select.options[i].text.toLowerCase();
        if (!text) continue;
        var score = -1;
        if (text === needle) score = 4;
        else if (text.indexOf(needle + " ") === 0 || text.indexOf(needle + " (") === 0) score = 3;
        else if (text.indexOf(needle) === 0) score = 2;
        else if (text.indexOf(needle) !== -1) score = 1;
        if (score > bestScore) {
          bestScore = score;
          best = i;
        }
      }
      if (best >= 0) select.selectedIndex = best;
    }
  }
})();
