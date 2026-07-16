// Melhor Digital Agency — interações do site

// Menu mobile
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('menu-mobile');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', function () {
    var isHidden = menu.hasAttribute('hidden');
    if (isHidden) {
      menu.removeAttribute('hidden');
      toggle.setAttribute('aria-expanded', 'true');
    } else {
      menu.setAttribute('hidden', '');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // fecha o menu ao clicar em um link
  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      menu.setAttribute('hidden', '');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

// Ano atual no rodapé
(function () {
  var el = document.getElementById('ano-atual');
  if (el) el.textContent = new Date().getFullYear();
})();

// Reveal on scroll
(function () {
  var items = document.querySelectorAll('[data-reveal]');
  if (!items.length) return;

  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach(function (el) { observer.observe(el); });
})();

// Envio do formulário de contato (Formspree, via fetch)
(function () {
  var form = document.getElementById('form-contato');
  var status = document.getElementById('form-status');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    status.textContent = 'Enviando...';

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    })
      .then(function (res) {
        if (res.ok) {
          status.textContent = 'Recebemos sua solicitação! Em breve entraremos em contato.';
          form.reset();
        } else {
          status.textContent = 'Não foi possível enviar agora. Tente novamente ou fale no WhatsApp.';
        }
      })
      .catch(function () {
        status.textContent = 'Não foi possível enviar agora. Tente novamente ou fale no WhatsApp.';
      });
  });
})();
