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

    const sliderEl = d/* =================================
   PACE MEDIA UG NEWS MANAGEMENT
================================= */

document.addEventListener("DOMContentLoaded", function () {

    const cards = document.querySelectorAll(".news-card");
    const filters = document.querySelectorAll(".news-filter");

    // Automatically create article previews
    cards.forEach(card => {

        const body = card.querySelector(".card-body");
        const article = body.querySelector("p:not(.muted)");

        if (!article) return;

        // Preserve the complete original article
        const fullArticle = article.cloneNode(true);

        const originalText = article.textContent.trim();

        // Create a short highlight without deleting original content
        const words = originalText.split(/\s+/);
        const highlight = words.slice(0, 35).join(" ");

        article.textContent =
            highlight + (words.length > 35 ? "..." : "");

        article.classList.add("article-excerpt");

        // Create expandable full article
        const details = document.createElement("details");
        details.className = "article-details";

        const summary = document.createElement("summary");
        summary.innerHTML = 'Read More <span>＋</span>';

        const fullContent = document.createElement("div");
        fullContent.className = "full-article";

        fullContent.appendChild(fullArticle);

        details.appendChild(summary);
        details.appendChild(fullContent);

        // Insert after the highlight
        article.after(details);

    });


    // News category filtering
    filters.forEach(button => {

        button.addEventListener("click", function () {

            const category = this.dataset.filter;

            filters.forEach(filter => {
                filter.classList.remove("active");
            });

            this.classList.add("active");

            let visible = 0;

            cards.forEach(card => {

                const matches =
                    category === "all" ||
                    card.dataset.category === category;

                card.hidden = !matches;

                if (matches) visible++;

            });

            const emptyMessage =
                document.getElementById("noNewsMessage");

            if (emptyMessage) {
                emptyMessage.hidden = visible !== 0;
            }

        });

});ocument.querySelector('.featured-slider');
    sliderEl.addEventListener('mouseenter', () => clearInterval(sliderInterval));
    sliderEl.addEventListener('mouseleave', () => {
      sliderInterval = setInterval(() => {
        current = (current + 1) % slides.length;
        showSlide(current);
      }, 4500);
    });
  }
});
