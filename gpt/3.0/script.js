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