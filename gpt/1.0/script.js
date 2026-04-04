// script.js

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// FAQ accordion
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
  });
});

// Tracking placeholders
document.querySelectorAll('[data-track]').forEach(el => {
  el.addEventListener('click', () => {
    const type = el.getAttribute('data-track');
    console.log('Tracked:', type);

    // Example:
    // gtag('event', 'click', { 'event_category': type });
  });
});