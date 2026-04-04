// script.js

// FAQ accordion
document.querySelectorAll(".faq-question").forEach(btn => {
  btn.addEventListener("click", () => {
    const answer = btn.nextElementSibling;
    answer.style.display = answer.style.display === "block" ? "none" : "block";
  });
});

// Tracking placeholders
document.querySelectorAll(".whatsapp-link").forEach(link => {
  link.addEventListener("click", () => {
    console.log("WhatsApp click");
    // integrar Google Analytics aqui
  });
});