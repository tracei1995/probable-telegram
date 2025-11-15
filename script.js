// script.js — simple UX enhancements: modal, smooth scroll, form submit (Formspree), WhatsApp CTA
(function () {
  // Elements
  const openModalBtn = document.getElementById("openLeadModal");
  const leadModal = document.getElementById("leadModal");
  const closeModalBtn = document.getElementById("closeModal");
  const modalForm = document.getElementById("modalForm");
  const modalStatus = document.getElementById("modalStatus");
  const leadForm = document.getElementById("leadForm");
  const formStatus = document.getElementById("formStatus");
  const whatsappBtn = document.getElementById("whatsappBtn");

  // Replace with your number (country code + number, no +)
  const WHATSAPP_NUMBER = ""; // e.g. "18681234567"

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Modal handling
  function openModal() {
    leadModal.setAttribute("aria-hidden", "false");
    leadModal.style.display = "flex";
    setTimeout(() => leadModal.querySelector("input, textarea, button").focus(), 60);
  }
  function closeModal() {
    leadModal.setAttribute("aria-hidden", "true");
    setTimeout(() => (leadModal.style.display = "none"), 220);
  }
  if (openModalBtn) openModalBtn.addEventListener("click", (e) => { e.preventDefault(); openModal(); });
  if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
  leadModal && leadModal.addEventListener("click", (e) => { if (e.target === leadModal) closeModal(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

  // Async form submit helper (Formspree)
  async function handleFormSubmit(e, formEl, statusEl) {
    e.preventDefault();
    statusEl.textContent = "Sending…";
    const action = formEl.getAttribute("action");
    const formData = new FormData(formEl);
    try {
      // POST to Formspree or any URL that accepts form-data
      const res = await fetch(action, {
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        statusEl.textContent = "Thanks — we received your message and will be in touch soon.";
        formEl.reset();
        // small delay then close modal if it's the modal form
        if (formEl === modalForm) setTimeout(closeModal, 900);
      } else {
        const data = await res.json();
        statusEl.textContent = data.error || "Sorry, there was a problem sending the form.";
      }
    } catch (err) {
      console.error(err);
      statusEl.textContent = "Network error. Please try again or contact us on WhatsApp.";
    }
  }

  // Wire forms if present
  if (modalForm) modalForm.addEventListener("submit", (e) => handleFormSubmit(e, modalForm, modalStatus));
  if (leadForm) leadForm.addEventListener("submit", (e) => handleFormSubmit(e, leadForm, formStatus));

  // WhatsApp CTA
  if (whatsappBtn) {
    whatsappBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const msg = encodeURIComponent("Hi — I’d like to learn more about your services.");
      const url = WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}` : `https://api.whatsapp.com/send?text=${msg}`;
      window.open(url, "_blank");
    });
  }

  // Small progressive enhancement: reveal animation for cards
  const revealItems = document.querySelectorAll(".card");
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.transition = "transform 360ms ease, opacity 360ms ease";
        e.target.style.transform = "translateY(0)";
        e.target.style.opacity = 1;
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(i => {
    i.style.transform = "translateY(12px)";
    i.style.opacity = 0;
    obs.observe(i);
  });
})();
