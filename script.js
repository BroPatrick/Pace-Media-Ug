document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('#main-nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      mainNav.classList.toggle('open');
    });
  }

  // Subscription confirmation and real FormSubmit submission
  const subscribeForms = document.querySelectorAll('.subscribe-form');
  subscribeForms.forEach((form) => {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      if (!emailInput || !emailInput.value.trim()) {
        if (emailInput) emailInput.focus();
        return;
      }

      const formData = new FormData(form);
      const endpoint = form.getAttribute('action');
      let success = false;
      if (endpoint && endpoint.includes('formsubmit.co')) {
        try {
          const response = await fetch(endpoint, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
          });
          success = response.ok;
        } catch (error) {
          success = false;
        }
      }

      const message = document.createElement('div');
      message.className = 'form-message';
      if (success) {
        message.textContent = `Thank you! Subscription request sent for ${emailInput.value.trim()}.`;
        emailInput.value = '';
      } else {
        message.textContent = 'Thanks! We received your request. If it does not go through, please mail pacestudios26@gmail.com.';
        message.classList.add('error');
      }
      form.appendChild(message);
      setTimeout(() => message.remove(), 5000);
    });
  });

  // Simple featured slider
  const slides = Array.from(document.querySelectorAll('.featured-slider .slide'));
  let current = 0;
  function showSlide(i) {
    slides.forEach((s, idx) => s.classList.toggle('active', idx === i));
  }
  if (slides.length) {
    showSlide(0);
    let sliderInterval = setInterval(() => {
      current = (current + 1) % slides.length;
      showSlide(current);
    }, 4500);

    const sliderEl = document.querySelector('.featured-slider');
    sliderEl.addEventListener('mouseenter', () => clearInterval(sliderInterval));
    sliderEl.addEventListener('mouseleave', () => {
      sliderInterval = setInterval(() => {
        current = (current + 1) % slides.length;
        showSlide(current);
      }, 4500);
    });
  }
});
