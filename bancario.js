'use strict';
// Reutiliza a ação secundária existente. Não envia relato, telefone ou dados do caso.
document.querySelectorAll('.bank-whatsapp').forEach(function (link) {
  link.addEventListener('click', function () {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'whatsapp_click',
      cta_location: 'bancario-' + link.dataset.position
    });
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', {
        send_to: 'AW-17997476689/5roOCI_M76MdENHm7oVD'
      });
    }
  });
});
