// script.js

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// FAQ toggle
document.querySelectorAll('.faq-item button').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.nextElementSibling.classList.toggle('open');
  });
});

// Tracking placeholder
document.querySelectorAll('[data-track]').forEach(el => {
  el.addEventListener('click', () => {
    console.log('Evento:', el.dataset.track);

    // FUTURE:
    // gtag('event', 'click_whatsapp');
    // fbq('track', 'Lead');
  });
});

// script.js (no change needed, already optimized)

// OPTIONAL improvement: auto-fix WhatsApp links in cards
document.querySelectorAll('[data-track="whatsapp"]').forEach(el => {
  el.setAttribute(
    'href',
    'https://wa.me/5521995461760?text=Ol%C3%A1%2C%20sou%20advogado%20e%20realizo%20atendimento%20jur%C3%ADdico%20particular.%20Para%20entender%20o%20seu%20caso%20e%20te%20orientar%20desde%20o%20in%C3%ADcio%2C%20me%20diga%20por%20gentileza%2C%20qual%20%C3%A9%20o%20seu%20caso.'
  );
});