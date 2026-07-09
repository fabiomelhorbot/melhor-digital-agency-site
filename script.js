(function () {
  "use strict";

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var mobileNav = document.getElementById("menu-mobile");
  if (toggle && mobileNav) {
    toggle.addEventListener("click", function () {
      var isOpen = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!isOpen));
      if (isOpen) {
        mobileNav.setAttribute("hidden", "");
      } else {
        mobileNav.removeAttribute("hidden");
      }
    });
    mobileNav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        toggle.setAttribute("aria-expanded", "false");
        mobileNav.setAttribute("hidden", "");
      });
    });
  }

  // Footer year
  var yearEl = document.getElementById("ano-atual");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Reveal on scroll
  var revealTargets = document.querySelectorAll(
    ".pipeline-step, .card, .diff-item, .plan-card, .contact-form"
  );
  revealTargets.forEach(function (el) { el.setAttribute("data-reveal", ""); });

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealTargets.forEach(function (el) { observer.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("is-visible"); });
  }

  // Contact form — envia via Formspree (https://formspree.io)
  var form = document.getElementById("form-contato");
  var status = document.getElementById("form-status");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var submitBtn = form.querySelector("button[type=submit]");
      status.textContent = "Enviando...";
      if (submitBtn) submitBtn.disabled = true;

      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      })
        .then(function (response) {
          if (response.ok) {
            status.textContent = "Recebemos sua solicitação. Em breve entraremos em contato.";
            form.reset();
          } else {
            response.json().then(function (data) {
              if (data && data.errors) {
                status.textContent = "Não foi possível enviar. Verifique os campos e tente novamente.";
              } else {
                status.textContent = "Erro ao enviar. Tente novamente ou chame no WhatsApp.";
              }
            }).catch(function () {
              status.textContent = "Erro ao enviar. Tente novamente ou chame no WhatsApp.";
            });
          }
        })
        .catch(function () {
          status.textContent = "Erro de conexão. Tente novamente ou chame no WhatsApp.";
        })
        .finally(function () {
          if (submitBtn) submitBtn.disabled = false;
        });
    });
  }
})();
