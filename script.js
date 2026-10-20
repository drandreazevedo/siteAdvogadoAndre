/**
 * script.js – Andre de Azevedo, Advogado
 * Versão: 1.0
 *
 * Funcionalidades:
 * 1. Sticky header com classe .scrolled
 * 2. Menu mobile toggle
 * 3. FAQ accordion acessível
 * 4. Smooth scroll com offset do header
 * 5. Animações de entrada via IntersectionObserver
 * 6. Hooks de tracking para WhatsApp e Instagram CTAs
 * 7. Ano dinâmico no footer
 */

'use strict';

/* ================================================================
   TRACKING HOOKS
   Substitua as funções abaixo pelo seu código real de tracking
   (Google Analytics, GTM, Meta Pixel, etc.)
   ================================================================ */

/**
 * Dispara evento de clique em CTA de WhatsApp.
 * @param {string} location - Identificador da localização na página (ex: 'hero', 'area-saude').
 */
function trackWhatsAppClick(location) {
  // Evento local para uso futuro pelo Google Tag Manager, quando configurado.
  // Clique no WhatsApp não é contrato nem conversão confirmada.
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: 'whatsapp_click', cta_location: location });
  // A conversão só é enviada após um clique real no botão. As CTAs abrem nova aba,
  // portanto não é necessário atrasar ou redirecionar a navegação com event_callback.
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', {
      send_to: 'AW-17997476689/5roOCI_M76MdENHm7oVD'
    });
  }
  console.log('[Tracking] WhatsApp CTA clicado:', location);

}

/**
 * Dispara evento de clique em CTA de Instagram.
 * @param {string} location - Identificador da localização na página.
 */
function trackInstagramClick(location) {
  // Google Analytics 4 (GA4)
  // if (typeof gtag === 'function') {
  //   gtag('event', 'instagram_click', { event_category: 'Social', event_label: location });
  // }

  // Google Tag Manager (via dataLayer)
  // if (window.dataLayer) {
  //   window.dataLayer.push({ event: 'instagram_click', cta_location: location });
  // }

  console.log('[Tracking] Instagram CTA clicado:', location);
}

/* ================================================================
   HELPERS
   ================================================================ */

/** Retorna a altura atual do header sticky. */
function getHeaderHeight() {
  const header = document.querySelector('.site-header');
  return header ? header.offsetHeight : 70;
}

/** Encontra o identificador de seção mais próximo para uso no tracking. */
function getSectionId(element) {
  const area = element.closest('#bancario, #saude, #familia');
  if (area) return area.id;
  const section = element.closest('section[id], header[id]');
  return section ? section.id : 'unknown';
}

/* ================================================================
   1. STICKY HEADER
   ================================================================ */
(function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  function onScroll() {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on init in case page is pre-scrolled
})();

/* ================================================================
   2. MENU MOBILE
   ================================================================ */
(function initMobileMenu() {
  const toggle    = document.querySelector('.menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!toggle || !mobileMenu) return;

  function closeMenu() {
    toggle.setAttribute('aria-expanded', 'false');
    mobileMenu.hidden = true;
  }

  toggle.addEventListener('click', function () {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMenu();
    } else {
      toggle.setAttribute('aria-expanded', 'true');
      mobileMenu.hidden = false;
    }
  });

  // Fechar ao clicar em link do menu
  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Fechar ao pressionar Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });
})();

/* ================================================================
   3. FAQ ACCORDION
   ================================================================ */
(function initFAQ() {
  const triggers = document.querySelectorAll('.faq-trigger');
  if (!triggers.length) return;

  triggers.forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      const answerId   = trigger.getAttribute('aria-controls');
      const answer     = document.getElementById(answerId);
      if (!answer) return;

      // Toggle este item
      trigger.setAttribute('aria-expanded', String(!isExpanded));
      answer.hidden = isExpanded;
    });
  });
})();

/* ================================================================
   4. SMOOTH SCROLL COM OFFSET DO HEADER
   ================================================================ */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      if (!targetId) return;

      const target = document.getElementById(targetId);
      if (!target) return;

      e.preventDefault();

      const offset      = getHeaderHeight() + 16;
      const targetTop   = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });
})();

/* ================================================================
   5. ANIMAÇÕES DE ENTRADA (IntersectionObserver)
   ================================================================ */
(function initScrollAnimations() {
  // Respeita prefers-reduced-motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const targets = document.querySelectorAll('.why-card, .area-card, .faq-item');
  if (!targets.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach(function (el, i) {
    // Stagger delay para cards em grid
    el.style.transitionDelay = (i % 6) * 70 + 'ms';
    observer.observe(el);
  });
})();

/* ================================================================
   6. TRACKING CTAs – WhatsApp e Instagram
   ================================================================ */
(function initCTATracking() {
  // As mensagens pré-preenchidas deixam claro o assunto, sem oferecer consulta gratuita.
  var temas = { saude: 'Direito da Saúde', familia: 'divórcio ou inventário', bancario: 'Direito Bancário' };
  document.querySelectorAll('.js-whatsapp-cta').forEach(function (el) {
    var area = el.closest('#saude, #familia, #bancario');
    var tema = area ? temas[area.id] : null;
    var mensagem = tema
      ? 'Olá, gostaria de solicitar atendimento jurídico particular sobre ' + tema + '.'
      : 'Olá, gostaria de solicitar atendimento jurídico particular.';
    el.href = 'https://wa.me/5521995461760?text=' + encodeURIComponent(mensagem);
  });

  // WhatsApp CTAs
  document.querySelectorAll('.js-whatsapp-cta').forEach(function (el) {
    el.addEventListener('click', function () {
      var location = getSectionId(el);
      trackWhatsAppClick(location);
    });
  });

  // Instagram CTAs
  document.querySelectorAll('.js-instagram-cta').forEach(function (el) {
    el.addEventListener('click', function () {
      var location = getSectionId(el);
      trackInstagramClick(location);
    });
  });
})();

/* ================================================================
   7. ANO DINÂMICO NO FOOTER
   ================================================================ */
(function setFooterYear() {
  var yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
