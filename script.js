(function () {
  var root = document.documentElement;
  root.classList.add("js");

  // ---- theme toggle with persistence ----
  var key = "lw-theme";
  var saved = null;
  try { saved = localStorage.getItem(key); } catch (e) {}
  if (saved) root.setAttribute("data-theme", saved);

  var toggle = document.getElementById("themeToggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var current = root.getAttribute("data-theme");
      if (!current) {
        current = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      }
      var next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem(key, next); } catch (e) {}
      document.dispatchEvent(new Event("lw-theme-change"));
    });
  }


  // ---- mobile menu ----
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");
  if (navToggle && navLinks) {
    var closeMenu = function () {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    };
    navToggle.addEventListener("click", function () {
      var open = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // close after tapping a link
    navLinks.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
    // close on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  // ---- contact form (Web3Forms, AJAX) ----
  var form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = document.getElementById("cf-status");
      var btn = document.getElementById("cf-submit");

      // form not wired up yet (no Web3Forms key) — degrade gracefully
      var keyEl = form.querySelector('input[name="access_key"]');
      if (!keyEl || keyEl.value === "YOUR_WEB3FORMS_ACCESS_KEY") {
        status.className = "form-status err";
        status.textContent = "The contact form is being set up. For now, please reach me on LinkedIn.";
        return;
      }

      if (!form.checkValidity()) {
        status.className = "form-status err";
        status.textContent = "Please fill in your name, a valid email, and a message.";
        form.reportValidity();
        return;
      }

      status.className = "form-status";
      status.textContent = "Sending…";
      btn.disabled = true;

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: new FormData(form)
      })
        .then(function (r) { return r.json(); })
        .then(function (j) {
          if (j.success) {
            status.className = "form-status ok";
            status.textContent = "Thanks — your message was sent. I'll get back to you.";
            form.reset();
          } else {
            status.className = "form-status err";
            status.textContent = (j.message || "Something went wrong.") + " You can also reach me on LinkedIn.";
          }
        })
        .catch(function () {
          status.className = "form-status err";
          status.textContent = "Network error — please try again, or reach me on LinkedIn.";
        })
        .finally(function () { btn.disabled = false; });
    });
  }

  // ---- scroll reveal ----
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var items = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  }

  // aurora breathes in on each page load via pure CSS (see styles.css); navigation stays instant.
})();
